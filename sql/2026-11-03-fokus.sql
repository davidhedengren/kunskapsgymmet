-- Fokusstatus för lektionsbruk: läraren ser om Kunskapsgymmet är aktivt hos eleverna
-- eller ligger i bakgrunden (annan flik, annat fönster, minimerat), och hur länge
-- eleven sammanlagt har varit utflikad i dag.
--
-- Sparas per elev: aktuell status, när den började, senaste signal, dagens
-- sammanlagda utflikade tid och antal gånger eleven lämnat appen i dag.
-- Inga webbadresser, fönsternamn eller andra uppgifter om vad eleven gör sparas.
--
-- Kräver lärargrupperna (kg_private.prov_larare, lar_har_grupp, anv_namn,
-- gruppmedlem) och public.kg_ar_admin(). Kör hela filen i Supabase SQL Editor.
-- Kan köras om.
begin;

create table if not exists kg_private.fokus(
  user_id uuid primary key references auth.users(id) on delete cascade,
  fokus boolean not null,
  sedan timestamptz not null,
  uppdaterad timestamptz not null,
  dag date not null,
  borta_sek integer not null default 0,
  byten integer not null default 0
);
alter table kg_private.fokus enable row level security;
revoke all on table kg_private.fokus from public, anon, authenticated;

-- Elevens app anropar denna när fokus ändras och var 30:e sekund.
-- Utflikad tid räknas mellan två signaler, högst 90 s per intervall, så att en
-- stängd flik eller en dator i viloläge inte räknas som utflikad tid.
create or replace function public.kg_fokus(p_fokus boolean)
returns void language plpgsql security definer set search_path to '' as $$
declare
  u uuid := auth.uid();
  r kg_private.fokus%rowtype;
  idag date := (now() at time zone 'Europe/Stockholm')::date;
  dt integer;
  avbrott boolean;
begin
  if u is null or p_fokus is null then return; end if;
  select * into r from kg_private.fokus where user_id=u for update;
  if not found then
    insert into kg_private.fokus(user_id,fokus,sedan,uppdaterad,dag,borta_sek,byten)
    values(u,p_fokus,now(),now(),idag,0,case when p_fokus then 0 else 1 end)
    on conflict (user_id) do nothing;
    return;
  end if;
  avbrott := now()-r.uppdaterad > interval '90 seconds';
  dt := least(greatest(extract(epoch from now()-r.uppdaterad),0),90)::integer;
  if r.dag<>idag then
    r.borta_sek := 0; r.byten := 0; r.dag := idag;
  elsif not r.fokus and not avbrott then
    r.borta_sek := r.borta_sek + dt;
  end if;
  if not p_fokus and (r.fokus or avbrott) then r.byten := r.byten + 1; end if;
  if p_fokus is distinct from r.fokus or avbrott then r.sedan := now(); end if;
  update kg_private.fokus set fokus=p_fokus, sedan=r.sedan, uppdaterad=now(),
    dag=r.dag, borta_sek=r.borta_sek, byten=r.byten
  where user_id=u;
end $$;
revoke all on function public.kg_fokus(boolean) from public, anon;
grant execute on function public.kg_fokus(boolean) to authenticated;

-- Gemensam beräkning: aktuell status och dagens totaler, inklusive pågående utflikning.
create or replace function kg_private.fokus_rad(p_user uuid)
returns jsonb language sql stable security definer set search_path to '' as $$
  select case when f.user_id is null then
      jsonb_build_object('online',false,'fokus',null,'sedan',null,'senast',null,'borta_sek',0,'byten',0)
    else jsonb_build_object(
      'online', f.uppdaterad > now()-interval '75 seconds',
      'fokus', f.fokus,
      'sedan', f.sedan,
      'senast', f.uppdaterad,
      'borta_sek', case when f.dag<>(now() at time zone 'Europe/Stockholm')::date then 0
        else f.borta_sek + case when not f.fokus and f.uppdaterad > now()-interval '90 seconds'
          then least(greatest(extract(epoch from now()-f.uppdaterad),0),90)::integer else 0 end end,
      'byten', case when f.dag<>(now() at time zone 'Europe/Stockholm')::date then 0 else f.byten end)
    end
  from (select p_user as id) x left join kg_private.fokus f on f.user_id=x.id
$$;
revoke all on function kg_private.fokus_rad(uuid) from public, anon, authenticated;

-- Läraren: gruppens elever med fokusstatus.
create or replace function public.kg_lar_fokus(p_grupp bigint)
returns jsonb language plpgsql stable security definer set search_path to '' as $$
begin
  if auth.uid() is null or not kg_private.prov_larare() or not kg_private.lar_har_grupp(p_grupp) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  return jsonb_build_object('ok',true,'nu',now(),'elever',coalesce((
    select jsonb_agg(jsonb_build_object('id',m.user_id,'namn',kg_private.anv_namn(m.user_id))
        || kg_private.fokus_rad(m.user_id) order by kg_private.anv_namn(m.user_id), m.user_id)
    from kg_private.gruppmedlem m where m.grupp_id=p_grupp),'[]'::jsonb));
end $$;
revoke all on function public.kg_lar_fokus(bigint) from public, anon;
grant execute on function public.kg_lar_fokus(bigint) to authenticated;

-- Admin: fokusstatus för alla som har skickat en signal de senaste tio minuterna.
create or replace function public.kg_admin_fokus()
returns jsonb language plpgsql stable security definer set search_path to '' as $$
begin
  if auth.uid() is null or not coalesce(public.kg_ar_admin(),false) then
    raise exception 'kg:ej_admin' using errcode='42501';
  end if;
  return jsonb_build_object('nu',now(),'elever',coalesce((
    select jsonb_agg(jsonb_build_object('id',f.user_id,'namn',kg_private.anv_namn(f.user_id)) || kg_private.fokus_rad(f.user_id))
    from kg_private.fokus f where f.uppdaterad > now()-interval '10 minutes'),'[]'::jsonb));
end $$;
revoke all on function public.kg_admin_fokus() from public, anon;
grant execute on function public.kg_admin_fokus() to authenticated;

notify pgrst, 'reload schema';
commit;
