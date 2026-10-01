-- =====================================================================
-- Kunskapsgymmet: medaljer för topplistan
-- Kräver att 2026-10-01-uppdrag-och-medaljer.sql och 2026-10-01-klasser.sql
-- redan är körda. Kör hela filen i Supabase → SQL Editor. Den kan köras om
-- utan skada.
--
-- Sex medaljer, som bara servern delar ut:
--   toppdag   Dagens etta     vinn dagens topplista
--   toppvecka Veckans etta    vinn veckans topplista
--   toppmanad Månadens etta   vinn månadens topplista
--   lagdag    Dagens lag      din klass vinner dagens klasstopplista
--   lagvecka  Veckans lag     din klass vinner veckans klasstopplista
--   lagmanad  Månadens lag    din klass vinner månadens klasstopplista
--
-- Så fungerar det
--   * kg_private.xp_dag bokför XP, uppgifter och medaljer per konto och
--     dygn (en trigger på kg_private.state). Historiken rensas till 100
--     versioner per konto och räcker därför inte för att avgöra vem som
--     vann en hel vecka eller månad.
--   * När en period är slut avgörs vinnaren första gången någon loggar in
--     (kg_topp_medaljer). Samma beräkning som topplistorna:
--       individ: XP + 100 per ny medalj, bara synliga och ej flaggade konton
--       klass:   snitt-XP per medlem med periodens tak (400/2000/6000).
--                Klassen måste ha minst 3 elever som tränat under perioden.
--                Medaljen går till dem i klassen som tränat under perioden.
--   * Bara perioder som börjar samma dag som filen körs eller senare räknas.
--   * Konton med vinster får medaljen i profilen via kg_topp_medaljer().
--     profile.toppMedaljer = {toppdag:{n:antal vinster,senast:ms}, ...}
--   * normalise behåller medaljerna och toppMedaljer från servern, så
--     appen kan inte skicka in dem själv.
-- =====================================================================

begin;

create table if not exists kg_private.xp_dag (
  user_id   uuid not null,
  dag       date not null,
  xp_start  bigint not null default 0,
  xp_slut   bigint not null default 0,
  upp_start bigint not null default 0,
  upp_slut  bigint not null default 0,
  med_start bigint not null default 0,
  med_slut  bigint not null default 0,
  primary key (user_id, dag)
);
create index if not exists xp_dag_dag_idx on kg_private.xp_dag (dag);

create table if not exists kg_private.topp_start (
  id  int primary key default 1 check (id = 1),
  dag date not null
);
insert into kg_private.topp_start(id,dag)
values (1,(now() at time zone 'Europe/Stockholm')::date)
on conflict (id) do nothing;

create table if not exists kg_private.topp_period (
  typ    text not null,          -- dag, vecka, manad
  period date not null,          -- periodens första dag
  klar   timestamptz not null default now(),
  primary key (typ, period)
);

create table if not exists kg_private.topp_vinst (
  medalj   text not null,        -- toppdag ... lagmanad
  period   date not null,
  user_id  uuid not null,
  klass_id bigint,
  xp       bigint not null default 0,
  utdelad  timestamptz not null default now(),
  primary key (medalj, period, user_id)
);
create index if not exists topp_vinst_user_idx on kg_private.topp_vinst (user_id);

-- Bokföring per dygn ---------------------------------------------------
CREATE OR REPLACE FUNCTION kg_private.bokfor_xp_dag()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare d date := (now() at time zone 'Europe/Stockholm')::date;
  nx bigint := coalesce((new.data->>'xp')::bigint,0);
  nu bigint := coalesce((new.data->>'attempts')::bigint,0);
  nm bigint := (select count(*) from jsonb_object_keys(coalesce(new.data->'badges','{}'::jsonb)));
  ox bigint := nx; ou bigint := nu; om bigint := nm;
begin
  if tg_op = 'UPDATE' then
    ox := coalesce((old.data->>'xp')::bigint,0);
    ou := coalesce((old.data->>'attempts')::bigint,0);
    om := (select count(*) from jsonb_object_keys(coalesce(old.data->'badges','{}'::jsonb)));
  end if;
  insert into kg_private.xp_dag(user_id,dag,xp_start,xp_slut,upp_start,upp_slut,med_start,med_slut)
  values (new.id,d,ox,nx,ou,nu,om,nm)
  on conflict (user_id,dag) do update
    set xp_slut = excluded.xp_slut, upp_slut = excluded.upp_slut, med_slut = excluded.med_slut;
  return null;
exception when others then
  return null;   -- bokföringen får aldrig stoppa en sparning
end $function$;

drop trigger if exists kg_bokfor_xp_dag on kg_private.state;
create trigger kg_bokfor_xp_dag
  after insert or update of data on kg_private.state
  for each row execute function kg_private.bokfor_xp_dag();

-- Startvärden för idag: samma utgångsläge som topplista_period
-- (första sparningen idag i historiken, annars nuvarande värde).
insert into kg_private.xp_dag(user_id,dag,xp_start,xp_slut,upp_start,upp_slut,med_start,med_slut)
select s.id, (now() at time zone 'Europe/Stockholm')::date,
       coalesce((b.data->>'xp')::bigint, coalesce((s.data->>'xp')::bigint,0)),
       coalesce((s.data->>'xp')::bigint,0),
       coalesce((b.data->>'attempts')::bigint, coalesce((s.data->>'attempts')::bigint,0)),
       coalesce((s.data->>'attempts')::bigint,0),
       coalesce((select count(*) from jsonb_object_keys(coalesce(b.data->'badges','{}'::jsonb))),
                (select count(*) from jsonb_object_keys(coalesce(s.data->'badges','{}'::jsonb)))),
       (select count(*) from jsonb_object_keys(coalesce(s.data->'badges','{}'::jsonb)))
  from kg_private.state s
  left join lateral (
    select h.data from kg_private.history h
     where h.user_id = s.id
       and h.saved_at >= date_trunc('day', now() at time zone 'Europe/Stockholm') at time zone 'Europe/Stockholm'
     order by h.saved_at, h.id limit 1) b on true
on conflict (user_id,dag) do nothing;

-- Avgör vinnare för perioder som är slut ------------------------------
CREATE OR REPLACE FUNCTION kg_private.avgor_period(p_typ text, p_start date)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_slut date; v_tak bigint; v_vinnare uuid; v_xp bigint; v_klass bigint;
begin
  v_slut := case p_typ when 'dag' then p_start + 1
                       when 'vecka' then p_start + 7
                       else (p_start + interval '1 month')::date end;
  v_tak := kg_private.klass_tak(p_typ);

  -- Individ
  select p.user_id, p.xp into v_vinnare, v_xp
    from (select x.user_id,
                 sum(greatest(0,x.xp_slut-x.xp_start) + 100*greatest(0,x.med_slut-x.med_start))::bigint as xp,
                 sum(greatest(0,x.upp_slut-x.upp_start))::bigint as upp
            from kg_private.xp_dag x
           where x.dag >= p_start and x.dag < v_slut
           group by x.user_id) p
    join public.topplista t on t.id = p.user_id and t.visa
    join kg_private.state s on s.id = p.user_id and s.review_required = false
   where p.xp > 0
   order by p.xp desc, p.upp desc, lower(t.namn)
   limit 1;
  if v_vinnare is not null then
    insert into kg_private.topp_vinst(medalj,period,user_id,xp)
    values ('topp'||p_typ, p_start, v_vinnare, v_xp)
    on conflict do nothing;
  end if;

  -- Klass
  with medlem as (
    select m.klass_id, m.user_id,
           coalesce(sum(greatest(0,x.xp_slut-x.xp_start) + 100*greatest(0,x.med_slut-x.med_start)),0)::bigint as xp,
           coalesce(sum(greatest(0,x.upp_slut-x.upp_start)),0)::bigint as upp
      from kg_private.klassmedlem m
      join kg_private.state s on s.id = m.user_id and s.review_required = false
      left join kg_private.xp_dag x on x.user_id = m.user_id and x.dag >= p_start and x.dag < v_slut
     group by m.klass_id, m.user_id
  ), per_klass as (
    select k.id, k.namn, round(avg(least(md.xp, v_tak)))::bigint as poang,
           count(*) filter (where md.upp > 0) as aktiva
      from public.kg_klass k join medlem md on md.klass_id = k.id
     group by k.id, k.namn
  )
  select id, poang into v_klass, v_xp from per_klass
   where aktiva >= 3 and poang > 0
   order by poang desc, aktiva desc, lower(namn)
   limit 1;
  if v_klass is not null then
    insert into kg_private.topp_vinst(medalj,period,user_id,klass_id,xp)
    select 'lag'||p_typ, p_start, md.user_id, v_klass, v_xp
      from kg_private.klassmedlem md
      join kg_private.state s on s.id = md.user_id and s.review_required = false
     where md.klass_id = v_klass
       and exists (select 1 from kg_private.xp_dag x
                    where x.user_id = md.user_id and x.dag >= p_start and x.dag < v_slut
                      and x.upp_slut > x.upp_start)
    on conflict do nothing;
  end if;
end $function$;

CREATE OR REPLACE FUNCTION kg_private.dela_ut_topp()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare idag date := (now() at time zone 'Europe/Stockholm')::date; v_start date; p record; ny boolean;
begin
  select dag into v_start from kg_private.topp_start where id = 1;
  if v_start is null then return; end if;
  for p in
    select * from (
    select 'dag'::text as typ, d::date as period from generate_series(v_start, idag - 1, interval '1 day') d
    union all
    select 'vecka', d::date from generate_series(date_trunc('week', v_start::timestamp), idag::timestamp - interval '7 days', interval '7 days') d
     where d::date >= v_start
    union all
    select 'manad', d::date from generate_series(date_trunc('month', v_start::timestamp), (idag::timestamp - interval '1 month'), interval '1 month') d
     where d::date >= v_start
    ) alla
    where not exists (select 1 from kg_private.topp_period tp where tp.typ = alla.typ and tp.period = alla.period)
    order by 2
  loop
    insert into kg_private.topp_period(typ,period) values (p.typ,p.period)
      on conflict do nothing returning true into ny;
    if ny then perform kg_private.avgor_period(p.typ,p.period); end if;
    ny := null;
  end loop;
end $function$;

-- Elevens medaljer -----------------------------------------------------
CREATE OR REPLACE FUNCTION public.kg_topp_medaljer()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); s kg_private.state%rowtype; v_topp jsonb; v_badges jsonb; v_nya jsonb; q jsonb;
  stamp numeric := floor(extract(epoch from now())*1000);
begin
  if uid is null then return jsonb_build_object('ok',false,'code','ej_inloggad'); end if;
  perform kg_private.dela_ut_topp();
  select * into s from kg_private.state where id = uid for update;
  if not found then return jsonb_build_object('ok',true,'nya','[]'::jsonb); end if;
  select coalesce(jsonb_object_agg(medalj, jsonb_build_object(
           'n', n, 'senast', floor(extract(epoch from senast)*1000))), '{}'::jsonb)
    into v_topp
    from (select medalj, count(*) as n, max(utdelad) as senast
            from kg_private.topp_vinst where user_id = uid group by medalj) v;
  v_badges := coalesce(s.data->'badges','{}'::jsonb);
  select coalesce(jsonb_agg(k order by k),'[]'::jsonb) into v_nya
    from jsonb_object_keys(v_topp) k where not v_badges ? k;
  if v_topp is distinct from coalesce(s.data->'toppMedaljer','{}'::jsonb) or jsonb_array_length(v_nya) > 0 then
    select v_badges || coalesce(jsonb_object_agg(k, to_jsonb(stamp)),'{}'::jsonb) into v_badges
      from jsonb_array_elements_text(v_nya) k;
    q := jsonb_set(jsonb_set(s.data,'{toppMedaljer}',v_topp),'{badges}',v_badges);
    insert into kg_private.history(user_id,revision,data,reason) values(uid,s.revision,s.data,'topp');
    update kg_private.state set data = q, revision = revision + 1 where id = uid;
    perform kg_private.publish(uid);
    -- Ny revision: appen sätter in samma fält lokalt och sparar vidare på den.
    return jsonb_build_object('ok',true,'nya',v_nya,'toppMedaljer',v_topp,
      'revision',s.revision+1,'fran',s.revision);
  end if;
  return jsonb_build_object('ok',true,'nya',v_nya,'toppMedaljer',v_topp);
end $function$;

grant execute on function public.kg_topp_medaljer() to authenticated;

-- normalise: som i 2026-10-01-uppdrag-och-medaljer.sql, men behåller
-- topplistemedaljerna från den sparade profilen.
CREATE OR REPLACE FUNCTION kg_private.normalise(p jsonb, previous jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
 SET search_path TO ''
AS $function$
declare q jsonb := p; badges jsonb := '{}'; rule record; course record; area record;
  area_count int := 0; area_max numeric := 0; courses int := 0;
  gg_count int := 0; ggkap_count int := 0;
  stamp numeric := floor(extract(epoch from now())*1000); k text;
begin
  foreach k in array array['xp','attempts','correct','run','bestRun','aCorrect','today',
    'streak','bestStreak','pass','felfria','utanFacit','morgon','bestKapitel','bestKurs','bestNiva3','reparerade',
    'ggTranat','felFynd','femmor','kvall','upplasta','uppdragKlara','uppdragHuvud','uppdragDagar'] loop
    q := jsonb_set(q,array[k],coalesce(q->k,'0'));
  end loop;
  for course in select * from jsonb_each(coalesce(q->'courses','{}')) loop
    courses := courses+1;
    for area in select * from jsonb_each(coalesce(course.value->'areas','{}')) loop
      area_count := area_count+1; area_max := greatest(area_max,area.value::text::numeric);
    end loop;
  end loop;
  select count(*) into gg_count from jsonb_object_keys(coalesce(q->'genomgangar','{}'::jsonb));
  select count(*) into ggkap_count from jsonb_object_keys(coalesce(q->'ggKapKlara','{}'::jsonb));
  for rule in select * from (values
    -- volym
    ('start','attempts',1),('warm','attempts',10),('form','attempts',100),('jarn','attempts',250),
    ('veteran','attempts',500),('maraton','attempts',1000),
    -- serier och precision
    ('serie','bestRun',10),('serie20','bestRun',20),('serie35','bestRun',35),
    ('felfri','felfria',1),('felfri10','felfria',10),
    ('sjalv','utanFacit',25),('sjalv100','utanFacit',100),
    -- uthållighet och vanor
    ('vecka','bestStreak',7),('manad','bestStreak',30),('streak100','bestStreak',100),
    ('pass10','pass',10),('pass50','pass',50),
    ('tidig','morgon',1),('natt','kvall',1),
    -- poäng
    ('xp1000','xp',1000),('xp5000','xp',5000),('xp15000','xp',15000),
    -- reparationer
    ('lagat5','reparerade',5),('lagat10','reparerade',10),('lagat20','reparerade',20),
    ('lagat50','reparerade',50),
    -- djup
    ('topp','aCorrect',25),('topp100','aCorrect',100),
    ('femma10','femmor',10),('femma25','femmor',25),
    ('upplast5','upplasta',5),('upplast15','upplasta',15),
    ('niva3','bestNiva3',80),('kapitel','bestKapitel',80),('provklar','bestKurs',80),
    -- felrapportering och genomgångar
    ('beta1','felFynd',1),('beta5','felFynd',5),('beta10','felFynd',10),
    ('ggtrana','ggTranat',5),
    -- tränarens uppdrag (2026-10-01)
    ('upp1','uppdragDagar',1),('upp5','uppdragDagar',5),('upp20','uppdragDagar',20),
    ('upp50','uppdragDagar',50),('kraften','uppdragKlara',25)
  ) r(id,field,threshold) loop
    if (q->>rule.field)::numeric >= rule.threshold then
      badges := badges || jsonb_build_object(rule.id,coalesce(previous->'badges'->rule.id,to_jsonb(stamp)));
    end if;
  end loop;
  for rule in select * from (values
    ('bredd',area_count >= 8),('bredd20',area_count >= 20),('bredd40',area_count >= 40),
    ('tvakurser',courses >= 2),
    ('omr',round(area_max*100) >= 85 or coalesce(previous->'badges' ? 'omr',false)),
    ('gg1',gg_count >= 1),('gg10',gg_count >= 10),('ggkap',ggkap_count >= 1)
  ) r(id,earned) loop
    if rule.earned then badges := badges || jsonb_build_object(rule.id,coalesce(previous->'badges'->rule.id,to_jsonb(stamp))); end if;
  end loop;
  -- Topplistemedaljer delas bara ut av servern (kg_topp_medaljer) och kan
  -- inte skickas in av appen: de behålls från den sparade profilen.
  foreach k in array array['toppdag','toppvecka','toppmanad','lagdag','lagvecka','lagmanad'] loop
    if previous->'badges' ? k then badges := badges || jsonb_build_object(k,previous->'badges'->k); end if;
  end loop;
  q := q - 'toppMedaljer';
  if jsonb_typeof(previous->'toppMedaljer') = 'object' then
    q := jsonb_set(q,'{toppMedaljer}',previous->'toppMedaljer');
  end if;
  return jsonb_set(q,'{badges}',badges);
end $function$;

commit;
