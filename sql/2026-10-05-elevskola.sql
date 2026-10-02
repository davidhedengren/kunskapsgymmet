-- =====================================================================
-- Kunskapsgymmet: elevernas skola (frivillig) och skolstatistik för admin
-- Kräver att 2026-10-04-skolor-och-larare.sql redan är körd. Kör hela filen
-- i Supabase → SQL Editor. Den kan köras om utan skada.
--
--   * kg_private.elevskola   elevens skola, frivilligt. Syns bara som antal
--                            i admins statistik, aldrig för lärare.
--   * Alla lärare som finns nu (godkända lärarkonton och lärarprofiler utan
--     skola) får skolan Erik Dahlbergsgymnasiet. Den som redan valt en
--     annan skola behåller den. Lärarna kan ändra under Min lärarprofil.
--
-- Elev:  kg_min_skola(), kg_satt_skola(p_skola), kg_skola_sok(p_sok)
-- Admin: kg_admin_skolor(), kg_admin_skola_namn(p_skola,p_namn),
--        kg_admin_skola_sla_ihop(p_fran,p_till), kg_admin_skola_ta_bort(p_skola)
-- =====================================================================

begin;

create table if not exists kg_private.elevskola (
  user_id   uuid primary key,
  skola_id  bigint not null references public.kg_skola(id) on delete cascade,
  satt      timestamptz not null default now()
);
create index if not exists elevskola_skola_idx on kg_private.elevskola (skola_id);

-- Skolan med ett visst namn, skapas om den inte finns.
CREATE OR REPLACE FUNCTION kg_private.skola_id(p_namn text, p_uid uuid)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_namn text := regexp_replace(btrim(coalesce(p_namn,'')), '\s+', ' ', 'g'); v_sid bigint;
begin
  if char_length(v_namn) not between 2 and 80 then return null; end if;
  select id into v_sid from public.kg_skola where lower(btrim(namn)) = lower(v_namn);
  if v_sid is null then
    insert into public.kg_skola(namn,skapad_av) values (v_namn, p_uid)
    on conflict ((lower(btrim(namn)))) do nothing
    returning id into v_sid;
    if v_sid is null then select id into v_sid from public.kg_skola where lower(btrim(namn)) = lower(v_namn); end if;
  end if;
  return v_sid;
end $function$;

-- ---------------------------------------------------------------------
-- Eleven
CREATE OR REPLACE FUNCTION public.kg_min_skola()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select jsonb_build_object('ok', auth.uid() is not null,
    'skola', (select jsonb_build_object('id',s.id,'namn',s.namn,
                'larare',(select count(*) from kg_private.larprofil l where l.skola_id = s.id and l.aktiv))
                from kg_private.elevskola e join public.kg_skola s on s.id = e.skola_id
               where e.user_id = auth.uid()))
$function$;

-- Tomt namn tar bort elevens skola.
CREATE OR REPLACE FUNCTION public.kg_satt_skola(p_skola text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); v_sid bigint;
begin
  if uid is null then return jsonb_build_object('ok',false,'code','ej_inloggad'); end if;
  if btrim(coalesce(p_skola,'')) = '' then
    delete from kg_private.elevskola where user_id = uid;
    return public.kg_min_skola();
  end if;
  v_sid := kg_private.skola_id(p_skola, uid);
  if v_sid is null then return jsonb_build_object('ok',false,'code','skola'); end if;
  insert into kg_private.elevskola(user_id,skola_id) values (uid, v_sid)
  on conflict (user_id) do update set skola_id = excluded.skola_id, satt = now();
  return public.kg_min_skola();
end $function$;

-- Alla skolor, även de utan lärare, för att välja skola.
CREATE OR REPLACE FUNCTION public.kg_skola_sok(p_sok text DEFAULT '')
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select coalesce(jsonb_agg(jsonb_build_object('id',x.id,'namn',x.namn,'larare',x.larare) order by x.vikt desc, x.namn), '[]'::jsonb)
    from (
      select s.id, s.namn,
             (select count(*) from kg_private.larprofil l where l.skola_id = s.id and l.aktiv) larare,
             (select count(*) from kg_private.larprofil l where l.skola_id = s.id and l.aktiv)
           + (select count(*) from kg_private.elevskola e where e.skola_id = s.id) vikt
        from public.kg_skola s
       where auth.uid() is not null
         and (coalesce(btrim(p_sok),'') = '' or s.namn ilike '%' || btrim(p_sok) || '%')
       order by vikt desc, s.namn
       limit 30
    ) x
$function$;

-- ---------------------------------------------------------------------
-- Admin
CREATE OR REPLACE FUNCTION public.kg_admin_skolor()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  return jsonb_build_object('ok',true,
    'utan_skola',(select count(*) from kg_private.state st
                   where not exists (select 1 from kg_private.elevskola e where e.user_id = st.id)
                     and not exists (select 1 from kg_private.larprofil l where l.user_id = st.id)),
    'skolor',coalesce((
    select jsonb_agg(to_jsonb(x) order by x.elever desc, x.larare desc, x.namn)
      from (
        select s.id, s.namn, s.skapad,
               (select count(*) from kg_private.larprofil l where l.skola_id = s.id and l.aktiv) larare,
               (select count(*) from kg_private.elevskola e where e.skola_id = s.id) elever,
               (select count(distinct gm.grupp_id) from kg_private.grupplarare gm
                  join kg_private.larprofil l on l.user_id = gm.user_id where l.skola_id = s.id) grupper,
               v.aktiva, v.uppgifter
          from public.kg_skola s
          cross join lateral (
            select count(distinct e.user_id) filter (where f.tid is not null) aktiva, count(f.tid) uppgifter
              from kg_private.elevskola e
              left join lateral (select f.tid from kg_private.elev_forsok(e.user_id) f
                                  where f.tid > now() - interval '7 days') f on true
             where e.skola_id = s.id) v
      ) x), '[]'::jsonb));
end $function$;

CREATE OR REPLACE FUNCTION public.kg_admin_skola_namn(p_skola bigint, p_namn text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_namn text := regexp_replace(btrim(coalesce(p_namn,'')), '\s+', ' ', 'g');
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  if char_length(v_namn) not between 2 and 80 then return jsonb_build_object('ok',false,'code','namn'); end if;
  if exists (select 1 from public.kg_skola where lower(btrim(namn)) = lower(v_namn) and id <> p_skola) then
    return jsonb_build_object('ok',false,'code','finns');
  end if;
  update public.kg_skola set namn = v_namn where id = p_skola;
  return jsonb_build_object('ok',found);
end $function$;

-- Flyttar lärare och elever från en skola till en annan och tar bort den första.
CREATE OR REPLACE FUNCTION public.kg_admin_skola_sla_ihop(p_fran bigint, p_till bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  if p_fran = p_till or not exists (select 1 from public.kg_skola where id = p_fran)
     or not exists (select 1 from public.kg_skola where id = p_till) then
    return jsonb_build_object('ok',false,'code','okand');
  end if;
  update kg_private.larprofil set skola_id = p_till, andrad = now() where skola_id = p_fran;
  update kg_private.elevskola set skola_id = p_till where skola_id = p_fran;
  delete from public.kg_skola where id = p_fran;
  return jsonb_build_object('ok',true);
end $function$;

-- Lärarna blir utan skola och elevernas skolval tas bort.
CREATE OR REPLACE FUNCTION public.kg_admin_skola_ta_bort(p_skola bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  delete from public.kg_skola where id = p_skola;
  return jsonb_build_object('ok',found);
end $function$;

-- ---------------------------------------------------------------------
-- Nuvarande lärare får Erik Dahlbergsgymnasiet.
do $$
declare v_sid bigint := kg_private.skola_id('Erik Dahlbergsgymnasiet', null);
begin
  update kg_private.larprofil set skola_id = v_sid, andrad = now() where skola_id is null;
  insert into kg_private.larprofil(user_id,namn,skola_id)
  select x.id, x.namn, v_sid
    from (
      select u.id,
             left(coalesce(nullif(btrim(u.raw_user_meta_data->>'full_name'),''),
                           nullif(btrim(u.raw_user_meta_data->>'name'),''),
                           initcap(btrim(regexp_replace(split_part(u.email,'@',1), '[._0-9-]+', ' ', 'g')))), 80) namn
        from auth.users u
       where kg_private.ar_larare(u.id)
         and not exists (select 1 from kg_private.larprofil l where l.user_id = u.id)
    ) x
   where char_length(btrim(x.namn)) >= 3
  on conflict (user_id) do nothing;
end $$;

-- ---------------------------------------------------------------------
revoke all on function kg_private.skola_id(text,uuid) from public, anon, authenticated;
revoke all on function public.kg_min_skola() from public, anon;
revoke all on function public.kg_satt_skola(text) from public, anon;
revoke all on function public.kg_skola_sok(text) from public, anon;
revoke all on function public.kg_admin_skolor() from public, anon;
revoke all on function public.kg_admin_skola_namn(bigint,text) from public, anon;
revoke all on function public.kg_admin_skola_sla_ihop(bigint,bigint) from public, anon;
revoke all on function public.kg_admin_skola_ta_bort(bigint) from public, anon;
grant execute on function public.kg_min_skola() to authenticated;
grant execute on function public.kg_satt_skola(text) to authenticated;
grant execute on function public.kg_skola_sok(text) to authenticated;
grant execute on function public.kg_admin_skolor() to authenticated;
grant execute on function public.kg_admin_skola_namn(bigint,text) to authenticated;
grant execute on function public.kg_admin_skola_sla_ihop(bigint,bigint) to authenticated;
grant execute on function public.kg_admin_skola_ta_bort(bigint) to authenticated;

commit;

-- Kontroll: lärarna och deras skolor.
select l.namn, u.email, s.namn as skola, l.aktiv
  from kg_private.larprofil l
  join auth.users u on u.id = l.user_id
  left join public.kg_skola s on s.id = l.skola_id
 order by s.namn nulls first, l.namn;
