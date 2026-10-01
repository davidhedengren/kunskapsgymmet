-- =====================================================================
-- Kunskapsgymmet: elever kan skapa egna klasser
-- Kräver att sql/2026-10-01-klasser.sql redan är körd.
-- Kör hela filen i Supabase → SQL Editor. Den kan köras om utan skada.
--
--   * kg_klass får kolumnen skapad_av (vem som skapade klassen).
--   * kg_skapa_klass(p_namn): eleven skapar en klass och går med i den.
--       - namn 2–30 tecken: bokstäver, siffror, mellanslag och - _ . ( )
--       - högst en ny klass per konto och 7 dagar
--       - samma regel för byte som kg_valj_klass (en gång per 7 dagar)
--   * kg_admin_klasser visar vem som skapade varje klass.
--   * kg_valj_klass: klassen Lärare godkänner samma lärare som
--     Uppgiftslabbet (ul_ar_larare): godkända lärarkonton, UL-admin,
--     e-post i kg_larare och behöriga mönster i ul_behorig.
--   * Lärare kopplas automatiskt till klassen Lärare:
--       - nu, för alla befintliga lärarkonton i Kunskapsgymmet utan klass
--       - vid varje inloggning via kg_auto_lararklass()
--     En lärare som själv valt en annan klass flyttas tillbaka; en lärare
--     som admin har placerat i en annan klass lämnas där.
-- =====================================================================

begin;

alter table public.kg_klass add column if not exists skapad_av uuid;

CREATE OR REPLACE FUNCTION public.kg_skapa_klass(p_namn text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); v_namn text; v_id bigint; m kg_private.klassmedlem%rowtype;
begin
  if uid is null then return jsonb_build_object('ok',false,'code','ej_inloggad'); end if;
  v_namn := regexp_replace(btrim(coalesce(p_namn,'')), '\s+', ' ', 'g');
  if char_length(v_namn) not between 2 and 30
     or v_namn !~ '^[A-Za-zÅÄÖåäöÉéÜü0-9 ._()-]+$' then
    return jsonb_build_object('ok',false,'code','namn');
  end if;
  -- Samma regel som vid byte: en gång per vecka (admin undantagen).
  select * into m from kg_private.klassmedlem where user_id = uid;
  if found and m.satt > now() - interval '7 days' and not public.kg_ar_admin() then
    return jsonb_build_object('ok',false,'code','for_tidigt','tidigast',m.satt + interval '7 days');
  end if;
  if not public.kg_ar_admin() and exists (
       select 1 from public.kg_klass
        where skapad_av = uid and skapad > now() - interval '7 days') then
    return jsonb_build_object('ok',false,'code','for_manga');
  end if;
  begin
    insert into public.kg_klass(namn, ordning, larare, skapad_av)
    values (v_namn, 100, false, uid)
    returning id into v_id;
  exception when unique_violation then
    return jsonb_build_object('ok',false,'code','namn_upptaget');
  end;
  insert into kg_private.klassmedlem(user_id,klass_id,satt,satt_av) values(uid,v_id,now(),uid)
    on conflict (user_id) do update set klass_id = excluded.klass_id, satt = now(), satt_av = uid;
  return jsonb_build_object('ok',true,'klass',jsonb_build_object('id',v_id,'namn',v_namn,'larare',false));
end $function$;

CREATE OR REPLACE FUNCTION public.kg_admin_klasser()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if auth.uid() is null then raise exception 'kg:ej_inloggad'; end if;
  if not public.kg_ar_admin() then raise exception 'kg:ej_admin'; end if;
  return jsonb_build_object(
    'klasser', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id',k.id,'namn',k.namn,'ordning',k.ordning,'larare',k.larare,'skapad',k.skapad,
        'skapad_av', case when k.skapad_av is null then null else jsonb_build_object(
            'user_id',k.skapad_av,
            'namn',coalesce(nullif(cs.data->>'namn',''), split_part(cu.email,'@',1)),
            'epost',cu.email) end,
        'elever', coalesce((
          select jsonb_agg(jsonb_build_object(
            'user_id',m.user_id,
            'namn',coalesce(nullif(s.data->>'namn',''), split_part(u.email,'@',1)),
            'epost',u.email,
            'xp',coalesce((s.data->>'xp')::bigint,0),
            'satt',m.satt) order by lower(coalesce(nullif(s.data->>'namn',''), u.email)))
            from kg_private.klassmedlem m
            left join kg_private.state s on s.id = m.user_id
            left join auth.users u on u.id = m.user_id
           where m.klass_id = k.id), '[]'::jsonb)
      ) order by k.ordning, lower(k.namn))
      from public.kg_klass k
      left join kg_private.state cs on cs.id = k.skapad_av
      left join auth.users cu on cu.id = k.skapad_av), '[]'::jsonb),
    'utan_klass', coalesce((
      select jsonb_agg(jsonb_build_object(
        'user_id',s.id,
        'namn',coalesce(nullif(s.data->>'namn',''), split_part(u.email,'@',1)),
        'epost',u.email,
        'xp',coalesce((s.data->>'xp')::bigint,0)) order by lower(coalesce(nullif(s.data->>'namn',''), u.email)))
        from kg_private.state s
        left join auth.users u on u.id = s.id
       where not exists (select 1 from kg_private.klassmedlem m where m.user_id = s.id)), '[]'::jsonb)
  );
end $function$;

CREATE OR REPLACE FUNCTION public.kg_valj_klass(p_klass bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); k public.kg_klass%rowtype; m kg_private.klassmedlem%rowtype;
begin
  if uid is null then return jsonb_build_object('ok',false,'code','ej_inloggad'); end if;
  select * into m from kg_private.klassmedlem where user_id = uid;
  if found and m.klass_id is not distinct from p_klass then
    return jsonb_build_object('ok',true);
  end if;
  if found and m.satt > now() - interval '7 days' and not public.kg_ar_admin() then
    return jsonb_build_object('ok',false,'code','for_tidigt','tidigast',m.satt + interval '7 days');
  end if;
  if p_klass is null then
    delete from kg_private.klassmedlem where user_id = uid;
    return jsonb_build_object('ok',true);
  end if;
  select * into k from public.kg_klass where id = p_klass;
  if not found then return jsonb_build_object('ok',false,'code','okand_klass'); end if;
  if k.larare and not (public.ul_ar_larare() or public.kg_ar_larare() or public.kg_ar_admin()) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  insert into kg_private.klassmedlem(user_id,klass_id,satt,satt_av) values(uid,p_klass,now(),uid)
    on conflict (user_id) do update set klass_id = excluded.klass_id, satt = now(), satt_av = uid;
  return jsonb_build_object('ok',true,'klass',jsonb_build_object('id',k.id,'namn',k.namn,'larare',k.larare));
end $function$;

-- Samma regler som ul_ar_larare, men för valfritt konto (inte bara auth.uid()).
CREATE OR REPLACE FUNCTION kg_private.ar_larare(p_uid uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
 SET search_path TO ''
AS $function$
  with u as (select lower(trim(email)) as epost from auth.users where id = p_uid)
  select coalesce((
    select exists (select 1 from public.ul_ansokan a where a.user_id = p_uid and a.status = 'godkand')
        or exists (select 1 from public.ul_admin a where lower(trim(a.epost)) = u.epost)
        or exists (select 1 from public.kg_admin a where lower(trim(a.epost)) = u.epost)
        or exists (select 1 from public.kg_larare l where lower(trim(l.epost)) = u.epost)
        or exists (select 1 from public.ul_behorig b
                    where lower(b.monster) = u.epost
                       or (left(b.monster,1) = '@' and u.epost like '%' || lower(b.monster)))
      from u), false)
$function$;

CREATE OR REPLACE FUNCTION public.kg_auto_lararklass()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); v_larare bigint; m kg_private.klassmedlem%rowtype; k_larare boolean;
begin
  if uid is null or not kg_private.ar_larare(uid) then
    return jsonb_build_object('ok',true,'flyttad',false);
  end if;
  select id into v_larare from public.kg_klass where larare order by id limit 1;
  if v_larare is null then return jsonb_build_object('ok',true,'flyttad',false); end if;
  select * into m from kg_private.klassmedlem where user_id = uid;
  if found then
    select larare into k_larare from public.kg_klass where id = m.klass_id;
    -- Redan i en lärarklass, eller placerad av admin i en annan klass: rör inte.
    if k_larare or m.satt_av is distinct from uid then
      return jsonb_build_object('ok',true,'flyttad',false);
    end if;
  end if;
  insert into kg_private.klassmedlem(user_id,klass_id,satt,satt_av) values(uid,v_larare,now(),null)
    on conflict (user_id) do update set klass_id = excluded.klass_id, satt = now(), satt_av = null;
  return jsonb_build_object('ok',true,'flyttad',true);
end $function$;

-- Koppla befintliga lärarkonton som saknar klass.
insert into kg_private.klassmedlem(user_id,klass_id,satt,satt_av)
select s.id, (select id from public.kg_klass where larare order by id limit 1), now(), null
  from kg_private.state s
 where kg_private.ar_larare(s.id)
   and not exists (select 1 from kg_private.klassmedlem m where m.user_id = s.id)
   and exists (select 1 from public.kg_klass where larare)
on conflict (user_id) do nothing;

grant execute on function public.kg_skapa_klass(text) to authenticated;
grant execute on function public.kg_auto_lararklass() to authenticated;

commit;
