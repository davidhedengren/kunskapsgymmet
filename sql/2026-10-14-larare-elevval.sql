-- Läraren kan välja skolans elever och lägga till/flytta dem till egna klasser.
-- Kräver lärargrupper, skolor, elevskola och grupp-klass-migrationerna (2026-10-03–06).
-- Kör hela filen i Supabase SQL Editor. Kan köras om.
-- Namn och egna gruppnamn lämnas ut, inte e-post eller global aktivitetsstatistik.
begin;

create or replace function kg_private.lar_valbar_elev(p_user uuid)
returns boolean language sql stable security definer set search_path to '' as $$
  select auth.uid() is not null
    and exists(select 1 from auth.users u where u.id=p_user)
    and not kg_private.ar_larare(p_user)
    and not exists(select 1 from kg_private.larprofil l where l.user_id=p_user and l.aktiv)
    and (
      exists(select 1 from kg_private.elevskola e join kg_private.larprofil l on l.skola_id=e.skola_id
        where e.user_id=p_user and l.user_id=auth.uid() and l.aktiv)
      or exists(select 1 from kg_private.gruppmedlem m join kg_private.grupplarare l on l.grupp_id=m.grupp_id
        where m.user_id=p_user and l.user_id=auth.uid())
    )
$$;
revoke all on function kg_private.lar_valbar_elev(uuid) from public, anon, authenticated;

create or replace function public.kg_lar_elevlista(p_grupp bigint)
returns jsonb language plpgsql stable security definer set search_path to '' as $$
begin
  if auth.uid() is null or not kg_private.prov_larare() or not kg_private.lar_har_grupp(p_grupp) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  return jsonb_build_object('ok',true,'elever',coalesce((
    select jsonb_agg(jsonb_build_object('id',u.id,'namn',kg_private.anv_namn(u.id),
      'medlem',exists(select 1 from kg_private.gruppmedlem m where m.grupp_id=p_grupp and m.user_id=u.id),
      'grupper',coalesce((select jsonb_agg(jsonb_build_object('id',g.id,'namn',g.namn) order by g.namn)
        from public.kg_grupp g join kg_private.gruppmedlem m on m.grupp_id=g.id
        join kg_private.grupplarare l on l.grupp_id=g.id
        where m.user_id=u.id and l.user_id=auth.uid()),'[]'::jsonb)) order by kg_private.anv_namn(u.id),u.id)
    from auth.users u where kg_private.lar_valbar_elev(u.id)), '[]'::jsonb));
end $$;

create or replace function public.kg_lar_elever_lagg_till(p_grupp bigint,p_elever uuid[],p_fran bigint default null)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare ids uuid[]; n integer;
begin
  if auth.uid() is null or not kg_private.prov_larare() or not kg_private.lar_har_grupp(p_grupp) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  if p_fran is not null and (p_fran=p_grupp or not kg_private.lar_har_grupp(p_fran)) then
    return jsonb_build_object('ok',false,'code','kallklass');
  end if;
  if p_elever is null or cardinality(p_elever) not between 1 and 500 or array_position(p_elever,null) is not null then
    return jsonb_build_object('ok',false,'code','elever');
  end if;
  select array_agg(distinct x) into ids from unnest(p_elever) x;
  -- Allt valideras före första ändringen: ingen halv flytt eller partiellt sparande.
  if exists(select 1 from unnest(ids) x where not kg_private.lar_valbar_elev(x)) then
    return jsonb_build_object('ok',false,'code','elev_behorighet');
  end if;
  -- Lås källmedlemskap under flytten. En samtidig borttagning får inte återinföra eleven.
  if p_fran is not null then
    perform 1 from kg_private.gruppmedlem m where m.grupp_id=p_fran and m.user_id=any(ids) order by m.user_id for update;
    select count(*) into n from kg_private.gruppmedlem m where m.grupp_id=p_fran and m.user_id=any(ids);
    if n<>cardinality(ids) then return jsonb_build_object('ok',false,'code','kallklass'); end if;
  end if;
  insert into kg_private.gruppmedlem(grupp_id,user_id) select p_grupp,x from unnest(ids) x
    on conflict(grupp_id,user_id) do nothing;
  get diagnostics n=row_count;
  -- Befintlig grupp-klass-trigger hanterar en eventuell topplisteklass.
  if p_fran is not null then delete from kg_private.gruppmedlem where grupp_id=p_fran and user_id=any(ids); end if;
  return jsonb_build_object('ok',true,'tillagda',n,'valda',cardinality(ids),'flyttade',case when p_fran is null then 0 else cardinality(ids) end);
end $$;
revoke all on function public.kg_lar_elevlista(bigint) from public, anon;
revoke all on function public.kg_lar_elever_lagg_till(bigint,uuid[],bigint) from public, anon;
grant execute on function public.kg_lar_elevlista(bigint) to authenticated;
grant execute on function public.kg_lar_elever_lagg_till(bigint,uuid[],bigint) to authenticated;
commit;
