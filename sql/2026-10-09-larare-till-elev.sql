-- Admin kan ändra en självregistrerad lärarprofil till elevkonto.
-- Kräver 2026-10-04-skolor-och-larare.sql och 2026-10-05-elevskola.sql.
-- Kör hela filen i Supabase SQL Editor. Den kan köras om.
-- Kontot, träningsresultaten, elevgrupper och befintliga träningspass bevaras.
-- Godkända lärarkonton hanteras separat; deras behörighet kommer inte från rollvalet.

begin;

alter table kg_private.larprofil
  add column if not exists roll text not null default 'larare'
  check (roll in ('larare','elev'));

CREATE OR REPLACE FUNCTION public.kg_min_larprofil()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select jsonb_build_object(
    'larare', auth.uid() is not null and kg_private.prov_larare(),
    'elev', exists (select 1 from kg_private.larprofil l where l.user_id = auth.uid() and l.roll = 'elev'),
    'godkand', auth.uid() is not null and kg_private.ar_larare(auth.uid()),
    'profil', (select jsonb_build_object('namn',l.namn,'aktiv',l.aktiv,
                 'skola',(select jsonb_build_object('id',s.id,'namn',s.namn) from public.kg_skola s where s.id = l.skola_id))
                 from kg_private.larprofil l where l.user_id = auth.uid() and l.roll = 'larare'))
$function$;

CREATE OR REPLACE FUNCTION public.kg_bli_larare(p_namn text, p_skola text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); v_namn text; v_skola text; v_sid bigint; v_aktiv boolean; v_roll text;
begin
  if uid is null then return jsonb_build_object('ok',false,'code','ej_inloggad'); end if;
  v_namn := regexp_replace(btrim(coalesce(p_namn,'')), '\s+', ' ', 'g');
  v_skola := regexp_replace(btrim(coalesce(p_skola,'')), '\s+', ' ', 'g');
  if char_length(v_namn) not between 3 and 80 or v_namn !~ ' ' then
    return jsonb_build_object('ok',false,'code','namn');
  end if;
  if char_length(v_skola) not between 2 and 80 then return jsonb_build_object('ok',false,'code','skola'); end if;
  select aktiv, roll into v_aktiv, v_roll from kg_private.larprofil where user_id = uid for update;
  if v_roll = 'elev' then return jsonb_build_object('ok',false,'code','elev'); end if;
  if v_aktiv = false then return jsonb_build_object('ok',false,'code','avstangd'); end if;
  select id into v_sid from public.kg_skola where lower(btrim(namn)) = lower(v_skola);
  if v_sid is null then
    insert into public.kg_skola(namn,skapad_av) values (v_skola, uid)
    on conflict ((lower(btrim(namn)))) do nothing
    returning id into v_sid;
    if v_sid is null then select id into v_sid from public.kg_skola where lower(btrim(namn)) = lower(v_skola); end if;
  end if;
  insert into kg_private.larprofil(user_id,namn,skola_id) values (uid, v_namn, v_sid)
  on conflict (user_id) do update set namn = excluded.namn, skola_id = excluded.skola_id, andrad = now();
  return jsonb_build_object('ok',true) || public.kg_min_larprofil();
end $function$;

CREATE OR REPLACE FUNCTION public.kg_admin_larare()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  return jsonb_build_object('ok',true,'larare',coalesce((
    select jsonb_agg(jsonb_build_object(
             'id',l.user_id,'namn',l.namn,'aktiv',l.aktiv,'skapad',l.skapad,
             'epost',(select u.email from auth.users u where u.id = l.user_id),
             'skola',(select s.namn from public.kg_skola s where s.id = l.skola_id),
             'godkand',kg_private.ar_larare(l.user_id),
             'grupper',(select count(*) from kg_private.grupplarare gl where gl.user_id = l.user_id),
             'elever',(select count(distinct m.user_id) from kg_private.gruppmedlem m
                        join kg_private.grupplarare gl on gl.grupp_id = m.grupp_id where gl.user_id = l.user_id))
           order by l.skapad desc)
      from kg_private.larprofil l where l.roll = 'larare'), '[]'::jsonb));
end $function$;

CREATE OR REPLACE FUNCTION public.kg_admin_larare_aktiv(p_user uuid, p_aktiv boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  update kg_private.larprofil set aktiv = coalesce(p_aktiv,true), andrad = now() where user_id = p_user and roll = 'larare';
  if not found then return jsonb_build_object('ok',false,'code','okant_konto'); end if;
  return jsonb_build_object('ok',true);
end $function$;

CREATE OR REPLACE FUNCTION kg_private.prov_lar_kan(p public.kg_provtraning)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select auth.uid() is not null
    and not exists (select 1 from kg_private.larprofil l where l.user_id = auth.uid() and l.roll = 'elev')
    and (
    p.larare = auth.uid()
    or coalesce(public.kg_ar_admin(),false)
    or exists (select 1 from kg_private.grupplarare l where l.user_id = auth.uid() and l.grupp_id = any(p.grupper)))
$function$;

CREATE OR REPLACE FUNCTION public.kg_admin_larare_till_elev(p_user uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_profil kg_private.larprofil%rowtype;
begin
  if not coalesce(public.kg_ar_admin(),false) then
    return jsonb_build_object('ok',false,'code','admin_kravs');
  end if;
  if p_user = auth.uid() then
    return jsonb_build_object('ok',false,'code','eget_konto');
  end if;
  if coalesce(kg_private.ar_larare(p_user),false) then
    return jsonb_build_object('ok',false,'code','godkand_larare');
  end if;
  select * into v_profil from kg_private.larprofil where user_id = p_user for update;
  if not found then return jsonb_build_object('ok',false,'code','okant_konto'); end if;

  -- En bestående elevroll skiljer rollbytet från en tillfällig avstängning.
  -- Den hindrar både självregistrering och den gamla aktiveringsknappen.
  update kg_private.larprofil set roll = 'elev', aktiv = false, andrad = now()
   where user_id = p_user;

  -- Behåll redan vald elevskola. Annars följer lärarprofilens skola med.
  if v_profil.skola_id is not null then
    insert into kg_private.elevskola(user_id,skola_id) values (p_user,v_profil.skola_id)
    on conflict (user_id) do nothing;
  end if;

  -- Bara kopplingen SOM lärare tas bort. Grupper och elevmedlemskap bevaras.
  delete from kg_private.grupplarare where user_id = p_user;

  -- En eventuell lärarklass lämnas; befintlig vanlig elevklass behålls.
  delete from kg_private.klassmedlem m using public.kg_klass k
   where m.user_id = p_user and m.klass_id = k.id and k.larare;

  return jsonb_build_object('ok',true,'roll','elev');
end $function$;

revoke all on function public.kg_admin_larare_till_elev(uuid) from public, anon;
grant execute on function public.kg_admin_larare_till_elev(uuid) to authenticated;
notify pgrst, 'reload schema';

commit;
