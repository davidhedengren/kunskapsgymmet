-- FIX för sparfel 42702 och tomma granskningskommentarer.
-- Kör HELA denna fil i Supabase SQL Editor efter felrapport-kommentar.sql.
-- Ersätter sparfunktionen. Befintliga rapporter, kommentarer och XP bevaras.
begin;

create or replace function public.kg_felrapport_granska(
  p_kurs text, p_uppgift text, p_status text, p_kommentar text, p_redigera boolean default false
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v_granskare uuid := auth.uid(); v_kommentar text := nullif(btrim(coalesce(p_kommentar,'')),'');
  v_antal integer; v_har_oppna boolean;
begin
  if v_granskare is null or not (coalesce(public.kg_ar_admin(),false)
    or coalesce(kg_private.ar_larare(v_granskare),false)) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  if p_status is null or p_status not in ('atgardad','ignorerad') then
    return jsonb_build_object('ok',false,'code','status');
  end if;
  if char_length(v_kommentar)>1000 then
    return jsonb_build_object('ok',false,'code','kommentar');
  end if;
  -- Lås hela gruppen. Samtidiga granskare kan inte skriva olika beslut i samma
  -- rapport. Redigering av kommentar till ett tidigare beslut byter inte status.
  perform 1 from public.kg_felrapport r
    where r.kurs=p_kurs and r.uppgift=p_uppgift for update;
  select exists(select 1 from public.kg_felrapport r
    where r.kurs=p_kurs and r.uppgift=p_uppgift
      and r.atgardad is not true and r.ignorerad is not true) into v_har_oppna;
  if v_har_oppna and not coalesce(p_redigera,false) then
    update public.kg_felrapport r
      set atgardad=true, ignorerad=(p_status='ignorerad'),
          granskningskommentar=v_kommentar, granskad_tid=now(), granskad_av=v_granskare
      where r.kurs=p_kurs and r.uppgift=p_uppgift
        and r.atgardad is not true and r.ignorerad is not true;
  elsif coalesce(p_redigera,false) then
    update public.kg_felrapport r
      set granskningskommentar=v_kommentar, granskad_tid=now(), granskad_av=v_granskare
      where r.kurs=p_kurs and r.uppgift=p_uppgift and r.atgardad is true
        and (case when r.ignorerad is true then 'ignorerad' else 'atgardad' end)=p_status;
  else
    return jsonb_build_object('ok',false,'code','ingen_rapport');
  end if;
  get diagnostics v_antal = row_count;
  if v_antal=0 then return jsonb_build_object('ok',false,'code','ingen_rapport'); end if;
  -- Bonusreglerna läser redan atgardad=true AND ignorerad IS NOT TRUE.
  -- Inga XP/profiler ändras här. Admin-auditen synkas inom samma transaktion.
  if v_har_oppna and not coalesce(p_redigera,false) and pg_catalog.to_regprocedure('public.kg_synka_felstatus(text,text,text)') is not null then
    perform public.kg_synka_felstatus(p_kurs,p_uppgift,p_status);
  end if;
  return jsonb_build_object('ok',true,'antal',v_antal,'status',p_status);
end;
$$;

revoke all on function public.kg_felrapport_granska(text,text,text,text,boolean) from public, anon;
grant execute on function public.kg_felrapport_granska(text,text,text,text,boolean) to authenticated;
notify pgrst, 'reload schema';
commit;
