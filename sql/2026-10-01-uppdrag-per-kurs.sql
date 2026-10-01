-- =====================================================================
-- Kunskapsgymmet: Dagens uppdrag per kurs
-- Kräver att sql/2026-10-01-uppdrag-och-medaljer.sql redan är körd.
-- Kör hela filen i Supabase → SQL Editor. Den kan köras om utan skada.
--
-- Varje kurs har egna uppdrag, i högst tre kurser per dygn. Taket per dygn
-- blir därför 9 uppdrag, 3 huvuduppdrag och 3 helt klara uppdragsdagar
-- (högst en ny klar dag per sparning, och bara när minst 3 uppdrag per
-- klar dag är gjorda). Högsta uppdrags-XP per dygn: 3 × 300 = 900.
-- =====================================================================

begin;

alter table kg_private.state
  add column if not exists uppdrag_dagar_idag integer not null default 0;

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
         or upp_idag > 9 or huv_idag > 3 or dag_idag > 3
         or (dd = 1 and upp_idag < 3*dag_idag) then
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
      uppdrag_dagar_idag=case when p_action='save' and dk > 0 then dag_idag else uppdrag_dagar_idag end,
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

-- Automatisk spärr: marginal för dagens högsta uppdrags-XP (3 kurser × 300).
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
         public.kg_max_xp_per_uppgift() * greatest(coalesce(t.uppgifter, 0) - k.uppgifter, 0) + 100 + 900
  on conflict (id) do update
     set sparrad = true, auto = true, orsak = excluded.orsak,
         namn = excluded.namn, andrad = now()
   where kg_sparr.sparrad = false
     and (kg_sparr.godkand_till is null
          or kg_sparr.godkand_till < (now() at time zone 'Europe/Stockholm')::date);

  delete from public.kg_topp_snapshot
   where dag < (now() at time zone 'Europe/Stockholm')::date - 40;
$function$;

commit;
