-- Antal uppgifter i lärarens "Just nu".
-- Kräver 2026-11-03-fokus.sql och dygnsbokföringen i
-- 2026-10-01-topplistemedaljer.sql. Kör hela filen i Supabase SQL Editor.
-- Kan köras om. Ändrar inga elevresultat, poäng eller fokusloggar.
-- Antalet gäller godkända profilförsök i alla kurser under dagens svenska datum,
-- samma beständiga underlag som topplistans uppgiftsantal.
begin;
create or replace function public.kg_lar_fokus(p_grupp bigint)
returns jsonb language plpgsql stable security definer set search_path to '' as $$
begin
  if auth.uid() is null or not kg_private.prov_larare() or not kg_private.lar_har_grupp(p_grupp) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  return jsonb_build_object('ok',true,'nu',now(),
    'uppgifter_dag',(now() at time zone 'Europe/Stockholm')::date,
    'elever',coalesce((
      select jsonb_agg(jsonb_build_object(
          'id',m.user_id,'namn',kg_private.anv_namn(m.user_id),
          'uppgifter_idag',greatest(0,coalesce(d.upp_slut-d.upp_start,0)))
          || kg_private.fokus_rad(m.user_id)
          order by kg_private.anv_namn(m.user_id),m.user_id)
      from kg_private.gruppmedlem m
      left join kg_private.xp_dag d on d.user_id=m.user_id
        and d.dag=(now() at time zone 'Europe/Stockholm')::date
      where m.grupp_id=p_grupp),'[]'::jsonb));
end $$;
revoke all on function public.kg_lar_fokus(bigint) from public, anon;
grant execute on function public.kg_lar_fokus(bigint) to authenticated;
notify pgrst, 'reload schema';
commit;
