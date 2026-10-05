-- =====================================================================
-- Kunskapsgymmet: lärarklassen tävlar inte på klasstopplistan
-- Kräver 2026-10-01-klasser.sql och 2026-10-01-topplistemedaljer.sql.
-- Kör hela filen i Supabase → SQL Editor. Den kan köras om utan skada.
--
--   * topplista_klasser visar inte klasser med larare = true.
--   * kg_private.avgor_period delar inte ut lagmedaljerna (Dagens/Veckans/
--     Månadens lag) till lärarklassen. Medaljer som redan delats ut ändras inte.
-- Lärarna syns fortfarande på den individuella topplistan om de valt det.
-- =====================================================================

begin;

CREATE OR REPLACE FUNCTION public.topplista_klasser(p_period text DEFAULT 'vecka')
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_start timestamptz; v_tak bigint; v_rader jsonb;
begin
  if p_period not in ('dag','vecka','manad','alla') then
    raise exception 'Ogiltig period' using errcode='22023';
  end if;
  v_start := kg_private.klass_start(p_period);
  v_tak := kg_private.klass_tak(p_period);
  with medlem as (
    select m.klass_id, p.xp, p.uppgifter
      from kg_private.klassmedlem m
      join kg_private.state s on s.id = m.user_id and s.review_required = false
      cross join lateral kg_private.klass_period(m.user_id, v_start) p
  ),
  per_klass as (
    select k.id, k.namn, k.larare,
           count(md.klass_id)::int as elever,
           count(md.klass_id) filter (where md.uppgifter > 0)::int as aktiva,
           coalesce(sum(md.xp),0)::bigint as xp,
           coalesce(round(avg(least(md.xp, v_tak))),0)::bigint as poang
      from public.kg_klass k
      left join medlem md on md.klass_id = k.id
     group by k.id, k.namn, k.larare
  ),
  rankad as (
    select *, row_number() over (order by poang desc, aktiva desc, lower(namn)) as plats
      from per_klass where elever > 0 and not larare
  )
  select coalesce(jsonb_agg(jsonb_build_object(
           'id',id,'namn',namn,'larare',larare,'elever',elever,'aktiva',aktiva,
           'xp',xp,'poang',poang,'plats',plats) order by plats), '[]'::jsonb)
    into v_rader from rankad;
  return jsonb_build_object(
    'rader', v_rader,
    'tak', v_tak,
    'min_klass', (select m.klass_id from kg_private.klassmedlem m where m.user_id = auth.uid())
  );
end $function$;

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
     where not k.larare
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

commit;
