-- =====================================================================
-- Kunskapsgymmet: Tränarens uppdrag (XP) och uppdragsmedaljerna
-- Kör hela filen i Supabase → SQL Editor. Den är skriven för att kunna
-- köras om utan skada (create or replace / add column if not exists).
--
-- Vad den gör
--   1. kg_private.state får fyra kolumner som bokför dagens uppdrag.
--   2. kg_private.profile_error godtar uppdrags-XP och nya räknare.
--   3. kg_private.normalise ger medaljerna Ung padawan, Padawan,
--      Jediriddare, Jedimästare och Kraften är stark.
--   4. public.kg_profile släpper igenom uppdrags-XP, men bara inom
--      dagens tak: högst 3 uppdrag, 1 huvuduppdrag och 1 klar dag per dygn.
--   5. public.kg_topp_snapshot_nu: den automatiska spärren tål dagens
--      högsta uppdrags-XP (300).
--   6. public.kg_medalj_antal räknar de nya medaljerna.
--
-- XP-regler (samma konstanter som i index.html):
--   huvuduppdrag 50 + 50 = 100, övriga uppdrag 50, alla tre klara +100.
--   XP = 50*uppdragKlara + 50*uppdragHuvud + 100*uppdragDagar
-- Avvisade sparningar får koden 'uppdrag_delta'/'uppdrag_order', som
-- INTE finns i mark_suspected_cheat, så ingen elev flaggas av dem.
-- =====================================================================

begin;

-- 1. Bokföring per dygn -------------------------------------------------
alter table kg_private.state
  add column if not exists uppdrag_dag date,
  add column if not exists uppdrag_idag integer not null default 0,
  add column if not exists uppdrag_huvud_idag integer not null default 0,
  add column if not exists uppdrag_dagar_dag date;

-- 2. profile_error ------------------------------------------------------
CREATE OR REPLACE FUNCTION kg_private.profile_error(p jsonb)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
 SET search_path TO ''
AS $function$
declare k text; v numeric; a numeric; c numeric; x numeric; item record; course record; area_count int := 0;
  uk numeric; uh numeric; ud numeric;
begin
  if p is null or jsonb_typeof(p) <> 'object' then return 'profile_type'; end if;
  if octet_length(p::text) > 2000000 then return 'profile_size'; end if;
  foreach k in array array['xp','attempts','correct','run','bestRun','aCorrect','today',
    'streak','bestStreak','pass','felfria','utanFacit','morgon','bestKapitel','bestKurs','bestNiva3','reparerade',
    'uppdragKlara','uppdragHuvud','uppdragDagar'] loop
    if p ? k then
      if jsonb_typeof(p->k) <> 'number' then return 'number_type:'||k; end if;
      v := (p->>k)::numeric;
      if v < 0 or v <> trunc(v) or v > 1000000000 then return 'number_range:'||k; end if;
    end if;
  end loop;
  a := coalesce((p->>'attempts')::numeric,0);
  c := coalesce((p->>'correct')::numeric,0);
  x := coalesce((p->>'xp')::numeric,0);
  uk := coalesce((p->>'uppdragKlara')::numeric,0);
  uh := coalesce((p->>'uppdragHuvud')::numeric,0);
  ud := coalesce((p->>'uppdragDagar')::numeric,0);
  -- Uppdragen: varje uppdrag kräver minst ett försök, ett huvuduppdrag är
  -- ett av uppdragen och en klar dag kräver tre klara uppdrag.
  if uh > uk or 3*ud > uk or uk > a then return 'uppdrag_order'; end if;
  -- Passbonus: 100 XP per pass, högst ett pass per 4 försök (samma regel som kg_profile).
  -- Uppdrag: 50 per uppdrag, +50 per huvuduppdrag, +100 per helt klar dag.
  if c > a or x > 80*c + 50*(a-c)
       + 100*least(coalesce((p->>'pass')::numeric,0), floor(a/4))
       + 50*uk + 50*uh + 100*ud
    then return 'xp_attempts'; end if;
  foreach k in array array['run','bestRun','aCorrect','utanFacit','reparerade'] loop
    if coalesce((p->>k)::numeric,0) > c then return 'correct_counter:'||k; end if;
  end loop;
  foreach k in array array['today','streak','bestStreak','pass'] loop
    if coalesce((p->>k)::numeric,0) > a then return 'attempt_counter:'||k; end if;
  end loop;
  if coalesce((p->>'run')::numeric,0) > coalesce((p->>'bestRun')::numeric,0)
    or coalesce((p->>'streak')::numeric,0) > coalesce((p->>'bestStreak')::numeric,0)
    or coalesce((p->>'felfria')::numeric,0) > coalesce((p->>'pass')::numeric,0)
    or coalesce((p->>'felfria')::numeric,0) > c then return 'counter_order'; end if;
  foreach k in array array['bestKapitel','bestKurs','bestNiva3'] loop
    if coalesce((p->>k)::numeric,0) > 100 then return 'percentage:'||k; end if;
  end loop;
  if coalesce((p->>'morgon')::numeric,0) > 1 then return 'morning'; end if;
  if p->>'lastDay' is not null then
    if p->>'lastDay' !~ '^\d{4}-\d{2}-\d{2}$' then return 'date'; end if;
    perform (p->>'lastDay')::date;
  elsif coalesce((p->>'streak')::numeric,0) > 0 then return 'date_missing'; end if;
  if jsonb_typeof(coalesce(p->'courses','{}')) <> 'object' then return 'courses_type'; end if;
  for course in select * from jsonb_each(coalesce(p->'courses','{}')) loop
    if jsonb_typeof(course.value) <> 'object' then return 'course_type'; end if;
    foreach k in array array['areas','families'] loop
      if jsonb_typeof(coalesce(course.value->k,'{}')) <> 'object' then return 'mastery_type'; end if;
      for item in select * from jsonb_each(coalesce(course.value->k,'{}')) loop
        if jsonb_typeof(item.value) <> 'number' then return 'mastery_number'; end if;
        v := item.value::text::numeric;
        if v < 0 or v > 1 then return 'mastery_range'; end if;
        if k='areas' then area_count := area_count+1; end if;
      end loop;
    end loop;
    if jsonb_typeof(coalesce(course.value->'history','[]')) <> 'array' then return 'history_type'; end if;
  end loop;
  if area_count > a then return 'area_count'; end if;
  return null;
exception when invalid_text_representation or numeric_value_out_of_range or datetime_field_overflow or invalid_datetime_format then
  return 'invalid_value';
end $function$;

-- 3. normalise: medaljregler --------------------------------------------
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
  return jsonb_set(q,'{badges}',badges);
end $function$;

-- 4. kg_profile ---------------------------------------------------------
CREATE OR REPLACE FUNCTION public.kg_profile(p_action text, p_data jsonb DEFAULT NULL::jsonb, p_revision bigint DEFAULT NULL::bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); s kg_private.state%rowtype; q jsonb; err text; k text;
  da numeric; dc numeric; dx numeric; credit_now numeric; delta numeric; name_value text;
  bonus_cap numeric := 0; bonus_left numeric := 0; bonus_use numeric := 0;
  pass_cap numeric := 0; pass_left numeric := 0; pass_use numeric := 0;
  dk numeric := 0; dh numeric := 0; dd numeric := 0; upp_xp numeric := 0;
  upp_idag int := 0; huv_idag int := 0; ny_dag boolean := false;
  local_day date := (now() at time zone 'Europe/Stockholm')::date;
begin
  if uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
  insert into kg_private.state(id,data) values(uid,kg_private.normalise('{}')) on conflict do nothing;
  select * into strict s from kg_private.state where id=uid for update;
  if p_action = 'read' then
    return jsonb_build_object('ok',true,'data',s.data,'revision',s.revision,'review',s.review_required);
  elsif p_action = 'settings' then
    name_value := trim(p_data->>'namn');
    if name_value is null or name_value !~ '^[A-Za-zÅÄÖåäö0-9_-]{3,16}$'
      or jsonb_typeof(p_data->'visaTopplista') is distinct from 'boolean' then
      return jsonb_build_object('ok',false,'code','name_format');
    end if;
    q := s.data || jsonb_build_object('namn',name_value,'visaTopplista',p_data->'visaTopplista','toppValt',true);
  elsif p_action = 'save' then
    if p_revision is distinct from s.revision then
      return jsonb_build_object('ok',false,'code','conflict','data',s.data,'revision',s.revision);
    end if;
    err := kg_private.profile_error(p_data);
    if s.review_required then err := 'review_required'; end if;
    if err is null then
      da := (p_data->>'attempts')::numeric - (s.data->>'attempts')::numeric;
      dc := (p_data->>'correct')::numeric - (s.data->>'correct')::numeric;
      dx := (p_data->>'xp')::numeric - (s.data->>'xp')::numeric;
      -- Tränarens uppdrag: tak per dygn i stället för förtroende för klienten.
      dk := coalesce((p_data->>'uppdragKlara')::numeric,0) - coalesce((s.data->>'uppdragKlara')::numeric,0);
      dh := coalesce((p_data->>'uppdragHuvud')::numeric,0) - coalesce((s.data->>'uppdragHuvud')::numeric,0);
      dd := coalesce((p_data->>'uppdragDagar')::numeric,0) - coalesce((s.data->>'uppdragDagar')::numeric,0);
      ny_dag := s.uppdrag_dag is distinct from local_day;
      upp_idag := (case when ny_dag then 0 else s.uppdrag_idag end) + greatest(dk,0)::int;
      huv_idag := (case when ny_dag then 0 else s.uppdrag_huvud_idag end) + greatest(dh,0)::int;
      if dk < 0 or dh < 0 or dd < 0 or dh > dk or dd > 1
         or (dk > 0 and coalesce(da,0) <= 0)
         or upp_idag > 3 or huv_idag > 1
         or (dd = 1 and (upp_idag < 3 or s.uppdrag_dagar_dag is not distinct from local_day)) then
        err := 'uppdrag_delta';
      end if;
      upp_xp := 50*greatest(dk,0) + 50*greatest(dh,0) + 100*greatest(dd,0);
      -- Bonus för åtgärdade felrapporter: 50 XP per rapport, en gång var.
      bonus_cap := 50 * (
        select count(distinct (r.kurs, r.uppgift))
        from public.kg_felrapport r
        where r.atgardad is true and r.ignorerad is not true and r.anvandare = uid
      );
      bonus_left := greatest(0, bonus_cap - coalesce(s.bonus_paid,0));
      bonus_use := least(bonus_left, greatest(0, dx - (80*dc+50*(da-dc)) - upp_xp));
      -- Bonus för hela pass: 100 XP per pass, högst ett pass per 4 försök.
      pass_cap := 100 * least(
        greatest(0, coalesce((p_data->>'pass')::numeric,0)),
        floor(greatest(0, coalesce((p_data->>'attempts')::numeric,0)) / 4)
      );
      pass_left := greatest(0, pass_cap - coalesce(s.pass_bonus_paid,0));
      pass_use := least(pass_left, greatest(0, dx - (80*dc+50*(da-dc)) - upp_xp - bonus_use));
      if err is null and (da is null or dc is null or dx is null or da < 0 or dc < 0 or dc > da or dx < 0
         or dx > 80*dc+50*(da-dc)+upp_xp+bonus_use+pass_use) then err := 'score_delta'; end if;
      foreach k in array array['bestRun','aCorrect','utanFacit','reparerade','bestStreak','bestKapitel','bestKurs','bestNiva3','pass','felfria','morgon',
                               'uppdragKlara','uppdragHuvud','uppdragDagar'] loop
        delta := coalesce((p_data->>k)::numeric,0)-coalesce((s.data->>k)::numeric,0);
        if delta < 0 then err := 'counter_decrease:'||k; end if;
        if k in ('aCorrect','utanFacit','reparerade') and delta > dc then err := 'counter_delta:'||k; end if;
        if k='bestRun' and delta > dc then err := 'run_delta'; end if;
      end loop;
      if (p_data->>'lastDay')::date > local_day+1 then err := 'future_date'; end if;
      if coalesce((p_data->>'bestStreak')::int,0)-coalesce((s.data->>'bestStreak')::int,0)
        > greatest(0,local_day+1-coalesce((s.data->>'lastDay')::date,local_day)) then err := 'streak_delta'; end if;
      credit_now := least(1200,s.credit+greatest(0,extract(epoch from now()-s.credit_at))/5);
      if da > credit_now then err := 'rate_limit'; end if;
    end if;
    if err is not null then
      insert into kg_private.rejections(user_id,reason) values(uid,err)
        on conflict(user_id) do update set reason=excluded.reason,last_at=now(),count=kg_private.rejections.count+1;
      return jsonb_build_object('ok',false,'code',err,'data',s.data,'revision',s.revision,'review',s.review_required);
    end if;
    q := kg_private.normalise(p_data,s.data) || jsonb_build_object(
      'namn',s.data->'namn','visaTopplista',coalesce(s.data->'visaTopplista','false'),'toppValt',true);
  else
    raise exception 'Unknown action' using errcode='22023';
  end if;
  if q = s.data then
    return jsonb_build_object('ok',true,'data',s.data,'revision',s.revision,'review',s.review_required);
  end if;
  -- Även profil, topplista och historik ingår i samma transaktion.
  begin
    insert into kg_private.history(user_id,revision,data,reason) values(uid,s.revision,s.data,p_action);
    update kg_private.state set data=q,revision=revision+1,
      credit=case when p_action='save' then credit_now-da else credit end,
      credit_at=case when p_action='save' then now() else credit_at end,
      bonus_paid=case when p_action='save' then coalesce(bonus_paid,0)+bonus_use else bonus_paid end,
      pass_bonus_paid=case when p_action='save' then coalesce(pass_bonus_paid,0)+pass_use else pass_bonus_paid end,
      uppdrag_dag=case when p_action='save' and dk > 0 then local_day else uppdrag_dag end,
      uppdrag_idag=case when p_action='save' and dk > 0 then upp_idag else uppdrag_idag end,
      uppdrag_huvud_idag=case when p_action='save' and dk > 0 then huv_idag else uppdrag_huvud_idag end,
      uppdrag_dagar_dag=case when p_action='save' and dd = 1 then local_day else uppdrag_dagar_dag end
      where id=uid;
    perform kg_private.publish(uid);
  exception when unique_violation then
    return jsonb_build_object('ok',false,'code','name_taken');
  end;
  -- Behåll de senaste 100 versionerna per konto samt installationskopian.
  delete from kg_private.history where user_id=uid and id in
    (select id from kg_private.history where user_id=uid order by id desc offset 100);
  return jsonb_build_object('ok',true,'data',q,'revision',s.revision+1,'review',s.review_required);
end $function$;

-- 5. Automatisk spärr: ge plats för dagens högsta uppdrags-XP (300) ----
CREATE OR REPLACE FUNCTION public.kg_topp_snapshot_nu()
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  -- a) Dagens startvärden (bara första gången varje dygn).
  insert into public.kg_topp_snapshot (id, dag, xp, uppgifter, medaljer)
  select t.id::text,
         (now() at time zone 'Europe/Stockholm')::date,
         coalesce(t.xp, 0),
         coalesce(t.uppgifter, 0),
         public.kg_medalj_antal(t.medaljer)
    from public.topplista t
  on conflict (id, dag) do nothing;

  -- b) Spärra den som idag fått mer XP än uppgifterna kan ge,
  --    eller löst orimligt många uppgifter. +100 är passmarginalen,
  --    +300 är dagens högsta möjliga uppdrags-XP.
  insert into public.kg_sparr (id, namn, orsak, sparrad, auto, andrad)
  select t.id::text, t.namn,
         format('Automatiskt: %s XP på %s uppgifter idag',
                coalesce(t.xp, 0) - k.xp, coalesce(t.uppgifter, 0) - k.uppgifter),
         true, true, now()
    from public.topplista t
    join public.kg_topp_snapshot k
      on k.id = t.id::text
     and k.dag = (now() at time zone 'Europe/Stockholm')::date
   where coalesce(t.uppgifter, 0) - k.uppgifter > public.kg_max_uppg_per_dag()
      or coalesce(t.xp, 0) - k.xp >
         public.kg_max_xp_per_uppgift() * greatest(coalesce(t.uppgifter, 0) - k.uppgifter, 0) + 100 + 300
  on conflict (id) do update
     set sparrad = true, auto = true, orsak = excluded.orsak,
         namn = excluded.namn, andrad = now()
   where kg_sparr.sparrad = false
     and (kg_sparr.godkand_till is null
          or kg_sparr.godkand_till < (now() at time zone 'Europe/Stockholm')::date);

  -- c) Städning.
  delete from public.kg_topp_snapshot
   where dag < (now() at time zone 'Europe/Stockholm')::date - 40;
$function$;

-- 6. Medaljräkning i ögonblicksbilden ------------------------------------
CREATE OR REPLACE FUNCTION public.kg_medalj_antal(m anyelement)
 RETURNS integer
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select count(distinct e.id)::int
    from json_array_elements_text(
           case when json_typeof(to_json(m)) = 'array' then to_json(m) else '[]'::json end
         ) as e(id)
   where e.id = any (array[
     'start','warm','form','jarn','serie','serie20','felfri','sjalv',
     'vecka','manad','pass10','tidig','bredd','bredd20','tvakurser','xp1000',
     'lagat5','lagat10','lagat20','omr','topp','niva3','kapitel','provklar',
     'gg1','gg10','ggkap','ggtrana',
     'upp1','upp5','upp20','upp50','kraften'
   ])
$function$;

commit;

-- Kontroll efteråt (ska ge en rad per funktion):
-- select proname from pg_proc p join pg_namespace n on n.oid=p.pronamespace
--  where (n.nspname,p.proname) in (('kg_private','profile_error'),('kg_private','normalise'),
--        ('public','kg_profile'),('public','kg_topp_snapshot_nu'),('public','kg_medalj_antal'));
