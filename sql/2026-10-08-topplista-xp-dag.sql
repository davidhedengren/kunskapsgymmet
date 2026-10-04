-- =====================================================================
-- Kunskapsgymmet: topplistans dag/vecka/månad räknas ur xp_dag
-- Kräver 2026-10-01-topplistemedaljer.sql och 2026-10-01-klasser.sql.
-- Kör hela filen i Supabase → SQL Editor. Den kan köras om utan skada.
--
-- Problemet
--   topplista_period och kg_private.klass_period tog periodens utgångsläge
--   från kontots första sparning i kg_private.history efter periodens start.
--   Historiken rensas till de 100 senaste versionerna per konto. Den som
--   tränar mycket har därför bara versioner från idag kvar, och då blev
--   veckans och månadens siffror samma som dagens (t.ex. 95 uppgifter på
--   alla tre flikarna).
--
-- Lösningen
--   kg_private.xp_dag bokför XP, uppgifter och medaljer per konto och dygn
--   och rensas inte. Medaljerna för perioderna räknas redan därifrån
--   (kg_private.avgor_period). Nu gör topplistan och klasslistan likadant:
--     period-XP = summa över dygnen i perioden av (xp_slut - xp_start)
--                 + 100 per ny medalj
--   Dygn före den dag xp_dag installerades (kg_private.topp_start) finns
--   inte med; det påverkar bara perioder som började före installationen.
--
--   * public.topplista_period2(p_period, p_limit, p_namn) ersätter
--     topplista_period i appen. Den gamla funktionen lämnas orörd, så
--     appen faller tillbaka på den om den nya saknas.
--   * kg_private.klass_period skrivs om, vilket rättar klasstopplistan
--     (topplista_klasser och topplista_klass_elever) utan andra ändringar.
-- =====================================================================

begin;

CREATE OR REPLACE FUNCTION kg_private.period_start_dag(p_period text)
 RETURNS date
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  select case p_period
    when 'dag'   then (now() at time zone 'Europe/Stockholm')::date
    when 'vecka' then date_trunc('week',  now() at time zone 'Europe/Stockholm')::date
    when 'manad' then date_trunc('month', now() at time zone 'Europe/Stockholm')::date
    else null end
$function$;

-- Klasslistan: XP och uppgifter för ett konto sedan p_start (null = totalt).
CREATE OR REPLACE FUNCTION kg_private.klass_period(p_uid uuid, p_start timestamptz)
 RETURNS TABLE(xp bigint, uppgifter bigint)
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  with cur as (
    select coalesce((s.data->>'xp')::bigint,0) as x,
           coalesce((s.data->>'attempts')::bigint,0) as a,
           (select count(*)::bigint from jsonb_object_keys(coalesce(s.data->'badges','{}'::jsonb))) as m
      from kg_private.state s where s.id = p_uid
  ),
  per as (
    select coalesce(sum(greatest(0,x.xp_slut-x.xp_start) + 100*greatest(0,x.med_slut-x.med_start)),0)::bigint as xp,
           coalesce(sum(greatest(0,x.upp_slut-x.upp_start)),0)::bigint as upp
      from kg_private.xp_dag x
     where p_start is not null
       and x.user_id = p_uid
       and x.dag >= (p_start at time zone 'Europe/Stockholm')::date
  )
  select case when p_start is null then c.x + 100*c.m else p.xp end,
         case when p_start is null then c.a else p.upp end
    from cur c cross join per p
$function$;

-- Individuella topplistan.
CREATE OR REPLACE FUNCTION public.topplista_period2(p_period text, p_limit integer default 50, p_namn text default null)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare
  v_start date := kg_private.period_start_dag(p_period);
  v_limit integer := greatest(1, least(coalesce(p_limit,50), 200));
  v jsonb;
begin
  with bas as (
    select t.id, t.namn, t.medaljer, t.niva, t.rang,
           coalesce((s.data->>'xp')::bigint,0) as totalxp,
           coalesce((s.data->>'attempts')::bigint,0) as tot_upp,
           (select count(*)::bigint from jsonb_object_keys(coalesce(s.data->'badges','{}'::jsonb))) as tot_med,
           coalesce(s.review_required,false) as flaggad
      from public.topplista t
      join kg_private.state s on s.id = t.id
     where t.visa and t.namn is not null
  ),
  dagar as (
    select x.user_id,
           sum(greatest(0,x.xp_slut-x.xp_start) + 100*greatest(0,x.med_slut-x.med_start))::bigint as xp,
           sum(greatest(0,x.upp_slut-x.upp_start))::bigint as upp
      from kg_private.xp_dag x
     where v_start is not null and x.dag >= v_start
     group by x.user_id
  ),
  per as (
    select b.*,
           case when v_start is null then b.totalxp + 100*b.tot_med else coalesce(d.xp,0) end as xp,
           case when v_start is null then b.tot_upp else coalesce(d.upp,0) end as upp
      from bas b left join dagar d on d.user_id = b.id
  ),
  rang as (
    select p.*, row_number() over (order by p.xp desc, p.upp desc, lower(p.namn)) as plats
      from per p
     where not p.flaggad and p.xp > 0
  )
  select jsonb_build_object(
    'rader', coalesce((select jsonb_agg(jsonb_build_object(
                 'namn',r.namn,'xp',r.xp,'uppgifter',r.upp,'totalxp',r.totalxp,
                 'medaljer',to_jsonb(r.medaljer),'niva',r.niva,'rang',r.rang) order by r.plats)
               from rang r where r.plats <= v_limit), '[]'::jsonb),
    'plats', (select r.plats from rang r where p_namn is not null and r.namn = p_namn limit 1),
    'fuskare', coalesce((select jsonb_agg(jsonb_build_object('namn',p.namn) order by lower(p.namn))
               from per p where p.flaggad and p.xp > 0), '[]'::jsonb)
  ) into v;
  return v;
end $function$;

grant execute on function public.topplista_period2(text, integer, text) to anon, authenticated;

commit;

-- Kontroll efter körningen (valfritt): dag, vecka och månad ska skilja sig
-- för den som tränat flera dagar.
-- select public.topplista_period2('dag',5,null), public.topplista_period2('vecka',5,null), public.topplista_period2('manad',5,null);
