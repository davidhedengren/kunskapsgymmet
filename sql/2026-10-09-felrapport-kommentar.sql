-- Sparad återkoppling på felrapporter. Kör hela filen i Supabase SQL Editor.
-- Kräver befintlig public.kg_felrapport, kg_ar_admin() och godkända lärarkonton.
-- Inga befintliga rapporter bedöms automatiskt. Filen kan köras om.
begin;

alter table public.kg_felrapport
  add column if not exists granskningskommentar text,
  add column if not exists granskad_tid timestamptz,
  add column if not exists granskad_av uuid;

create or replace function public.kg_felrapport_granska(
  p_kurs text, p_uppgift text, p_status text, p_kommentar text, p_redigera boolean default false
) returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid(); kommentar text := btrim(coalesce(p_kommentar,''));
  antal integer; har_oppna boolean;
begin
  if uid is null or not (coalesce(public.kg_ar_admin(),false)
    or coalesce(kg_private.ar_larare(uid),false)) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  if p_status is null or p_status not in ('atgardad','ignorerad') then
    return jsonb_build_object('ok',false,'code','status');
  end if;
  if char_length(kommentar) not between 1 and 1000 then
    return jsonb_build_object('ok',false,'code','kommentar');
  end if;
  -- Lås hela gruppen. Samtidiga granskare kan inte skriva olika beslut i samma
  -- rapport. Redigering av kommentar till ett tidigare beslut byter inte status.
  perform 1 from public.kg_felrapport r
    where r.kurs=p_kurs and r.uppgift=p_uppgift for update;
  select exists(select 1 from public.kg_felrapport r
    where r.kurs=p_kurs and r.uppgift=p_uppgift
      and r.atgardad is not true and r.ignorerad is not true) into har_oppna;
  if har_oppna and not coalesce(p_redigera,false) then
    update public.kg_felrapport r
      set atgardad=true, ignorerad=(p_status='ignorerad'),
          granskningskommentar=kommentar, granskad_tid=now(), granskad_av=uid
      where r.kurs=p_kurs and r.uppgift=p_uppgift
        and r.atgardad is not true and r.ignorerad is not true;
  elsif coalesce(p_redigera,false) then
    update public.kg_felrapport r
      set granskningskommentar=kommentar, granskad_tid=now(), granskad_av=uid
      where r.kurs=p_kurs and r.uppgift=p_uppgift and r.atgardad is true
        and (case when r.ignorerad is true then 'ignorerad' else 'atgardad' end)=p_status;
  else
    return jsonb_build_object('ok',false,'code','ingen_rapport');
  end if;
  get diagnostics antal = row_count;
  if antal=0 then return jsonb_build_object('ok',false,'code','ingen_rapport'); end if;
  -- Bonusreglerna läser redan atgardad=true AND ignorerad IS NOT TRUE.
  -- Inga XP/profiler ändras här. Admin-auditen synkas inom samma transaktion.
  if har_oppna and not coalesce(p_redigera,false) and pg_catalog.to_regprocedure('public.kg_synka_felstatus(text,text,text)') is not null then
    perform public.kg_synka_felstatus(p_kurs,p_uppgift,p_status);
  end if;
  return jsonb_build_object('ok',true,'antal',antal,'status',p_status);
end;
$$;

create or replace function public.kg_mina_felrapporter()
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce(jsonb_agg(x.rad order by x.granskad desc nulls last), '[]'::jsonb)
  from (
    select r.granskad_tid as granskad, jsonb_build_object(
      'kurs',r.kurs,'uppgift',r.uppgift,'deluppgift',to_jsonb(r)->>'deluppgift',
      'status',case when r.ignorerad is true then 'ignorerad'
                    when r.atgardad is true then 'atgardad' else 'oppen' end,
      'kommentar',r.granskningskommentar,'granskad',r.granskad_tid,
      'rapporterad',coalesce(to_jsonb(r)->>'tid',to_jsonb(r)->>'skapad')
    ) as rad
    from public.kg_felrapport r
    where auth.uid() is not null and r.anvandare=auth.uid()
    order by r.granskad_tid desc nulls last limit 200
  ) x
$$;

create or replace function public.kg_felrapport_granskningssvar()
returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
  if auth.uid() is null or not (coalesce(public.kg_ar_admin(),false)
    or coalesce(kg_private.ar_larare(auth.uid()),false)) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  return jsonb_build_object('ok',true,'lista',coalesce((
    select jsonb_agg(jsonb_build_object('kurs',x.kurs,'uppgift',x.uppgift,
      'status',case when x.ignorerad is true then 'ignorerad' else 'atgardad' end,
      'kommentar',x.granskningskommentar,'granskad',x.granskad_tid))
    from (select distinct on (r.kurs,r.uppgift) r.* from public.kg_felrapport r
      where r.granskad_tid is not null and r.atgardad is true
      order by r.kurs,r.uppgift,r.granskad_tid desc) x
  ),'[]'::jsonb));
end;
$$;

revoke all on function public.kg_felrapport_granska(text,text,text,text,boolean) from public, anon;
revoke all on function public.kg_mina_felrapporter() from public, anon;
revoke all on function public.kg_felrapport_granskningssvar() from public, anon;
grant execute on function public.kg_felrapport_granska(text,text,text,text,boolean) to authenticated;
grant execute on function public.kg_mina_felrapporter() to authenticated;
grant execute on function public.kg_felrapport_granskningssvar() to authenticated;

notify pgrst, 'reload schema';
commit;
