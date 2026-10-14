-- Uppdragsbok: äldre uppdrag ger halva ursprungliga belöningen, en gång.
-- Kräver profil/molnsparning, uppdrag/topplistemedaljer och fyra-uppdrag-SQL.
-- Bevarar dagens belöningar, revisioner, kreditgräns, felrapports-/passbonus.
begin;
create table if not exists kg_private.uppdragsbok_beloning (
  user_id uuid not null,
  dag date not null,
  kurs text not null,
  nr integer not null check(nr between 0 and 4),
  xp integer not null check(xp in (25,50)),
  betald timestamptz not null default now(),
  primary key(user_id,dag,kurs,nr)
);
revoke all on kg_private.uppdragsbok_beloning from public,anon,authenticated;

CREATE OR REPLACE FUNCTION kg_private.uppdragsbok_delta(p_user uuid,p_fore jsonb,p_efter jsonb,p_idag date)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
declare d record; c record; fore jsonb; efter jsonb; a jsonb; b jsonb;
  v_dag date; i integer; n numeric; gam_n numeric; mal numeric; dc numeric;
  betald boolean; bonus_betald boolean; alla boolean; krav jsonb:='[]'; belopp integer; total integer:=0;
begin
  if jsonb_typeof(coalesce(p_efter->'uppdragsVecka','{}'))<>'object' then return jsonb_build_object('ok',false);end if;
  dc:=coalesce((p_efter->>'correct')::numeric,0)-coalesce((p_fore->>'correct')::numeric,0);
  for d in select * from jsonb_each(coalesce(p_efter->'uppdragsVecka','{}')) loop
    if d.key !~ '^\d{4}-\d{2}-\d{2}$' then return jsonb_build_object('ok',false);end if;
    v_dag:=d.key::date;
    -- Klientens aktuella datum kan skilja en v_dag från Stockholm vid midnatt.
    if v_dag<p_idag-7 or v_dag>p_idag+1 then return jsonb_build_object('ok',false);end if;
    if d.key=p_efter->'uppdrag'->>'nyckel' then continue;end if;
    if v_dag>p_idag then return jsonb_build_object('ok',false);end if;
    if jsonb_typeof(d.value->'kurser')<>'object' then return jsonb_build_object('ok',false);end if;
    if (select count(*) from jsonb_object_keys(d.value->'kurser'))>3 then return jsonb_build_object('ok',false);end if;
    for c in select * from jsonb_each(d.value->'kurser') loop
      if c.key not in ('ma1','ma2','mato1','mato2','matf1','fy1','fy2','hist') then return jsonb_build_object('ok',false);end if;
      fore:=p_fore->'uppdragsVecka'->d.key->'kurser'->c.key;
      if fore is null and p_fore->'uppdrag'->>'nyckel'=d.key then fore:=p_fore->'uppdrag'->'kurser'->c.key;end if;
      efter:=c.value;
      -- Äldre uppdrag måste redan vara kända för servern. Inga fabricerade bakåtdagar.
      if fore is null or jsonb_typeof(fore->'lista')<>'array' or jsonb_typeof(efter->'lista')<>'array'
         or jsonb_array_length(fore->'lista') not between 1 and 4
         or jsonb_array_length(fore->'lista')<>jsonb_array_length(efter->'lista')
         or (fore-'lista'-'klar'-'bonusBetald') is distinct from (efter-'lista'-'klar'-'bonusBetald') then
        return jsonb_build_object('ok',false);
      end if;
      alla:=true;
      for i in 0..jsonb_array_length(fore->'lista')-1 loop
        a:=fore->'lista'->i;b:=efter->'lista'->i;
        if (a-'n'-'klar'-'betald') is distinct from (b-'n'-'klar'-'betald') then return jsonb_build_object('ok',false);end if;
        mal:=(a->>'mal')::numeric;gam_n:=coalesce((a->>'n')::numeric,0);n:=(b->>'n')::numeric;
        if mal is null or mal<1 or n is null or n<0 or n>mal or n<>trunc(n)
           or n-gam_n>greatest(dc,0) or jsonb_typeof(b->'klar')<>'boolean'
           or jsonb_typeof(b->'betald')<>'boolean' then return jsonb_build_object('ok',false);end if;
        if (b->>'klar')::boolean and n<>mal then return jsonb_build_object('ok',false);end if;
        betald:=coalesce((a->>'betald')::boolean,(a->>'klar')::boolean,false);
        if betald and not (b->>'betald')::boolean then return jsonb_build_object('ok',false);end if;
        if coalesce((a->>'klar')::boolean,false) and not (b->>'klar')::boolean then return jsonb_build_object('ok',false);end if;
        if (b->>'betald')::boolean and not (b->>'klar')::boolean then return jsonb_build_object('ok',false);end if;
        if not (b->>'betald')::boolean then alla:=false;end if;
        if not betald and (b->>'betald')::boolean then
          if dc<=0 or exists(select 1 from kg_private.uppdragsbok_beloning l where l.user_id=p_user and l.dag=v_dag and l.kurs=c.key and l.nr=i) then return jsonb_build_object('ok',false);end if;
          belopp:=case when coalesce((a->>'huvud')::boolean,false) then 50 else 25 end;
          krav:=krav||jsonb_build_array(jsonb_build_object('dag',v_dag,'kurs',c.key,'nr',i,'xp',belopp));total:=total+belopp;
        end if;
      end loop;
      bonus_betald:=coalesce((fore->>'bonusBetald')::boolean,(fore->>'klar')::boolean,false);
      if jsonb_typeof(efter->'bonusBetald')<>'boolean' or jsonb_typeof(efter->'klar')<>'boolean'
         or ((efter->>'bonusBetald')::boolean and not alla)
         or (bonus_betald and not (efter->>'bonusBetald')::boolean) then return jsonb_build_object('ok',false);end if;
      if not bonus_betald and (efter->>'bonusBetald')::boolean then
        if dc<=0 or exists(select 1 from kg_private.uppdragsbok_beloning l where l.user_id=p_user and l.dag=v_dag and l.kurs=c.key and l.nr=4) then return jsonb_build_object('ok',false);end if;
        krav:=krav||jsonb_build_array(jsonb_build_object('dag',v_dag,'kurs',c.key,'nr',4,'xp',50));total:=total+50;
      end if;
    end loop;
  end loop;
  if coalesce((p_efter->>'uppdragRetroXp')::numeric,0)-coalesce((p_fore->>'uppdragRetroXp')::numeric,0)<>total then return jsonb_build_object('ok',false);end if;
  return jsonb_build_object('ok',true,'xp',total,'krav',krav);
exception when invalid_text_representation or invalid_datetime_format or datetime_field_overflow or numeric_value_out_of_range then
  return jsonb_build_object('ok',false);
end $function$;
revoke all on function kg_private.uppdragsbok_delta(uuid,jsonb,jsonb,date) from public,anon,authenticated;

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
    'uppdragKlara','uppdragHuvud','uppdragDagar','uppdragRetroXp'] loop
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
       + 50*uk + 50*uh + 100*ud + coalesce((p->>'uppdragRetroXp')::numeric,0)
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
  upp_idag int := 0; huv_idag int := 0; dag_idag int := 0; ny_dag boolean := false;
  retro jsonb; retro_xp numeric:=0; betalning jsonb;
  local_day date := (now() at time zone 'Europe/Stockholm')::date;
begin
  if uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
  insert into kg_private.state(id,data) values(uid,kg_private.normalise('{}')) on conflict do nothing;
  select * into strict s from kg_private.state where id=uid for update;
  if p_action = 'read' then
    return jsonb_build_object('uppdragsbok',true,'ok',true,'data',s.data,'revision',s.revision,'review',s.review_required);
  elsif p_action = 'settings' then
    name_value := trim(p_data->>'namn');
    if name_value is null or name_value !~ '^[A-Za-zÅÄÖåäö0-9_-]{3,16}$'
      or jsonb_typeof(p_data->'visaTopplista') is distinct from 'boolean' then
      return jsonb_build_object('uppdragsbok',true,'ok',false,'code','name_format');
    end if;
    q := s.data || jsonb_build_object('namn',name_value,'visaTopplista',p_data->'visaTopplista','toppValt',true);
  elsif p_action = 'save' then
    if p_revision is distinct from s.revision then
      return jsonb_build_object('uppdragsbok',true,'ok',false,'code','conflict','data',s.data,'revision',s.revision);
    end if;
    err := kg_private.profile_error(p_data);
    if s.review_required then err := 'review_required'; end if;
    if err is null then
      da := (p_data->>'attempts')::numeric - (s.data->>'attempts')::numeric;
      dc := (p_data->>'correct')::numeric - (s.data->>'correct')::numeric;
      dx := (p_data->>'xp')::numeric - (s.data->>'xp')::numeric;
      retro:=kg_private.uppdragsbok_delta(uid,s.data,p_data,local_day);
      if not coalesce((retro->>'ok')::boolean,false) then err:='uppdragsbok_delta';end if;
      retro_xp:=coalesce((retro->>'xp')::numeric,0);
      -- Tränarens uppdrag: tak per dygn (högst tre kurser med egna uppdrag).
      dk := coalesce((p_data->>'uppdragKlara')::numeric,0) - coalesce((s.data->>'uppdragKlara')::numeric,0);
      dh := coalesce((p_data->>'uppdragHuvud')::numeric,0) - coalesce((s.data->>'uppdragHuvud')::numeric,0);
      dd := coalesce((p_data->>'uppdragDagar')::numeric,0) - coalesce((s.data->>'uppdragDagar')::numeric,0);
      ny_dag := s.uppdrag_dag is distinct from local_day;
      upp_idag := (case when ny_dag then 0 else s.uppdrag_idag end) + greatest(dk,0)::int;
      huv_idag := (case when ny_dag then 0 else s.uppdrag_huvud_idag end) + greatest(dh,0)::int;
      dag_idag := (case when ny_dag then 0 else s.uppdrag_dagar_idag end) + greatest(dd,0)::int;
      if dk < 0 or dh < 0 or dd < 0 or dh > dk or dd > 1
         or (dk > 0 and coalesce(da,0) <= 0)
         or upp_idag > 12 or huv_idag > 3 or dag_idag > 3
         or (dd = 1 and upp_idag < 3*dag_idag) then
        err := 'uppdrag_delta';
      end if;
      upp_xp := 50*greatest(dk,0) + 50*greatest(dh,0) + 100*greatest(dd,0)+retro_xp;
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
      return jsonb_build_object('uppdragsbok',true,'ok',false,'code',err,'data',s.data,'revision',s.revision,'review',s.review_required);
    end if;
    q := kg_private.normalise(p_data,s.data) || jsonb_build_object(
      'namn',s.data->'namn','visaTopplista',coalesce(s.data->'visaTopplista','false'),'toppValt',true);
  else
    raise exception 'Unknown action' using errcode='22023';
  end if;
  if q = s.data then
    return jsonb_build_object('uppdragsbok',true,'ok',true,'data',s.data,'revision',s.revision,'review',s.review_required);
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
      uppdrag_dagar_idag=case when p_action='save' and dk > 0 then dag_idag else uppdrag_dagar_idag end,
      uppdrag_dagar_dag=case when p_action='save' and dd = 1 then local_day else uppdrag_dagar_dag end
      where id=uid;
    if p_action='save' then
      for betalning in select value from jsonb_array_elements(coalesce(retro->'krav','[]')) loop
        insert into kg_private.uppdragsbok_beloning(user_id,dag,kurs,nr,xp)
        values(uid,(betalning->>'dag')::date,betalning->>'kurs',(betalning->>'nr')::integer,(betalning->>'xp')::integer);
      end loop;
    end if;
    perform kg_private.publish(uid);
  exception when unique_violation then
    return jsonb_build_object('uppdragsbok',true,'ok',false,'code','name_taken');
  end;
  -- Behåll de senaste 100 versionerna per konto samt installationskopian.
  delete from kg_private.history where user_id=uid and id in
    (select id from kg_private.history where user_id=uid order by id desc offset 100);
  return jsonb_build_object('uppdragsbok',true,'ok',true,'data',q,'revision',s.revision+1,'review',s.review_required);
end $function$;

CREATE OR REPLACE FUNCTION public.kg_topp_snapshot_nu()
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  insert into public.kg_topp_snapshot (id, dag, xp, uppgifter, medaljer)
  select t.id::text,
         (now() at time zone 'Europe/Stockholm')::date,
         coalesce(t.xp, 0),
         coalesce(t.uppgifter, 0),
         public.kg_medalj_antal(t.medaljer)
    from public.topplista t
  on conflict (id, dag) do nothing;

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
         public.kg_max_xp_per_uppgift() * greatest(coalesce(t.uppgifter, 0) - k.uppgifter, 0) + 100 + 1050
           + coalesce((select sum(l.xp) from kg_private.uppdragsbok_beloning l
                        where l.user_id::text=t.id::text
                          and (l.betald at time zone 'Europe/Stockholm')::date=(now() at time zone 'Europe/Stockholm')::date),0)
  on conflict (id) do update
     set sparrad = true, auto = true, orsak = excluded.orsak,
         namn = excluded.namn, andrad = now()
   where kg_sparr.sparrad = false
     and (kg_sparr.godkand_till is null
          or kg_sparr.godkand_till < (now() at time zone 'Europe/Stockholm')::date);

  delete from public.kg_topp_snapshot
   where dag < (now() at time zone 'Europe/Stockholm')::date - 40;
$function$;


revoke all on function public.kg_profile(text,jsonb,bigint) from public,anon;
grant execute on function public.kg_profile(text,jsonb,bigint) to authenticated;
notify pgrst, 'reload schema';
commit;
