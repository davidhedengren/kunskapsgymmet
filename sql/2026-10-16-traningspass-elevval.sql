-- Individuella mottagare för träningspass. Kör hela filen i Supabase SQL Editor.
-- Kräver befintliga pass-/grupp-/lärarmigrationer (2026-10-02–09).
-- Kan köras om. Befintliga RPC-signaturer och delning med kod behålls.
begin;
alter table public.kg_provtraning add column if not exists elever uuid[] not null default '{}';

-- Endast namn och grupp-ID:n för elever i lärarens egna grupper.
CREATE OR REPLACE FUNCTION public.kg_prov_elevval()
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO '' AS $function$
begin
  if auth.uid() is null or not kg_private.prov_larare() then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  return jsonb_build_object('ok',true,'elevval',true,'elever',coalesce((
    select jsonb_agg(jsonb_build_object('id',e.user_id,'namn',kg_private.anv_namn(e.user_id),'grupper',e.grupper)
      order by kg_private.anv_namn(e.user_id)) from (
      select m.user_id, array_agg(distinct m.grupp_id) grupper
      from kg_private.gruppmedlem m
      join kg_private.grupplarare l on l.grupp_id=m.grupp_id and l.user_id=auth.uid()
      where not exists(select 1 from kg_private.larprofil lp where lp.user_id=m.user_id and lp.roll='larare')
      group by m.user_id
    ) e), '[]'::jsonb));
end $function$;

CREATE OR REPLACE FUNCTION kg_private.prov_valbara_elever(p_elever uuid[], p_tidigare uuid[] DEFAULT '{}')
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO '' AS $function$
  select p_elever is not null and cardinality(p_elever)<=500 and not exists (
    select 1 from unnest(p_elever) e where e is null or (
      not (e=any(p_tidigare)) and not exists (
        select 1 from kg_private.gruppmedlem m
        join kg_private.grupplarare l on l.grupp_id=m.grupp_id and l.user_id=auth.uid()
        where m.user_id=e
          and not exists(select 1 from kg_private.larprofil lp where lp.user_id=e and lp.roll='larare')
      )
    )
  )
$function$;

CREATE OR REPLACE FUNCTION public.kg_prov_skapa_med_elever(
  p_titel text,p_kurs text,p_spar text,p_omraden text[],p_nivaer text[],p_antal integer,
  p_alla boolean,p_datum date,p_grupper bigint[],p_kod text,p_elever uuid[])
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '' AS $function$
declare r jsonb;
begin
  if auth.uid() is null or not kg_private.prov_larare() then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  if not kg_private.prov_valbara_elever(p_elever) then
    return jsonb_build_object('ok',false,'code','elev_behorighet');
  end if;
  r:=public.kg_prov_skapa(p_titel,p_kurs,p_spar,p_omraden,p_nivaer,p_antal,p_alla,p_datum,p_grupper,p_kod);
  if (r->>'ok')::boolean then
    update public.kg_provtraning set elever=ARRAY(select distinct e from unnest(p_elever) e order by e)
      where id=(r->>'id')::bigint;
  end if;
  return r;
end $function$;

CREATE OR REPLACE FUNCTION public.kg_prov_andra_med_elever(
  p_prov bigint,p_titel text,p_spar text,p_omraden text[],p_nivaer text[],p_antal integer,
  p_alla boolean,p_datum date,p_grupper bigint[],p_elever uuid[])
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '' AS $function$
declare p public.kg_provtraning%rowtype; r jsonb;
begin
  select * into p from public.kg_provtraning where id=p_prov for update;
  if not found or not kg_private.prov_lar_kan(p) or not kg_private.prov_larare() then
    return jsonb_build_object('ok',false,'code','okand');
  end if;
  if not kg_private.prov_valbara_elever(p_elever,p.elever) then
    return jsonb_build_object('ok',false,'code','elev_behorighet');
  end if;
  r:=public.kg_prov_andra(p_prov,p_titel,p_spar,p_omraden,p_nivaer,p_antal,p_alla,p_datum,p_grupper);
  if (r->>'ok')::boolean then
    update public.kg_provtraning set elever=ARRAY(select distinct e from unnest(p_elever) e order by e) where id=p_prov;
  end if;
  return r;
end $function$;

CREATE OR REPLACE FUNCTION kg_private.prov_elev_kan(p public.kg_provtraning, p_uid uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select p_uid=any(p.elever) or exists (select 1 from kg_private.klassmedlem m where m.user_id = p_uid and m.klass_id = p.klass_id)
      or exists (select 1 from kg_private.provdeltagare d where d.user_id = p_uid and d.prov_id = p.id)
      or exists (select 1 from kg_private.gruppmedlem g where g.user_id = p_uid and g.grupp_id = any(p.grupper))
$function$;

CREATE OR REPLACE FUNCTION public.kg_prov_mina()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid();
begin
  if uid is null or not kg_private.prov_larare() then return jsonb_build_object('ok',false,'code','larare_kravs'); end if;
  return jsonb_build_object('ok',true,'prov',coalesce((
    select jsonb_agg(kg_private.prov_json(p, uid) || jsonb_build_object(
             'tranat',(select count(*) from kg_private.provresultat r where r.prov_id=p.id and r.klara>0),
             'egen',p.larare = uid,
             'elever',(select coalesce(jsonb_agg(jsonb_build_object('id',e,'namn',kg_private.anv_namn(e)) order by kg_private.anv_namn(e)),'[]'::jsonb) from unnest(p.elever) e),
             'elevgrupper',(select coalesce(jsonb_agg(distinct m.grupp_id),'[]'::jsonb) from kg_private.gruppmedlem m
               join kg_private.grupplarare l on l.grupp_id=m.grupp_id and l.user_id=uid where m.user_id=any(p.elever)),
             'grupper',(select coalesce(jsonb_agg(jsonb_build_object('id',g.id,'namn',g.namn) order by g.namn),'[]'::jsonb)
                          from public.kg_grupp g where g.id = any(p.grupper)))
           order by p.aktiv desc, p.skapad desc)
      from public.kg_provtraning p
     where p.larare = uid
        or exists (select 1 from kg_private.grupplarare l where l.user_id = uid and l.grupp_id = any(p.grupper))),
    '[]'::jsonb));
end $function$;

CREATE OR REPLACE FUNCTION public.kg_prov_sammanstallning(p_prov bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); p public.kg_provtraning%rowtype; v_elever int; v_tranat int; v_omr jsonb; v_klara int; v_lista jsonb;
begin
  if uid is null then return jsonb_build_object('ok',false,'code','ej_inloggad'); end if;
  select * into p from public.kg_provtraning where id = p_prov;
  if not found then return jsonb_build_object('ok',false,'code','okand'); end if;
  if not kg_private.prov_lar_kan(p) then return jsonb_build_object('ok',false,'code','larare_kravs'); end if;
  with elever as (
    select unnest(p.elever) user_id
    union
    select m.user_id from kg_private.klassmedlem m
      join public.kg_klass k on k.id = m.klass_id
     where p.klass_id is not null and m.klass_id = p.klass_id and not k.larare
    union select d.user_id from kg_private.provdeltagare d where d.prov_id = p.id
    union select r.user_id from kg_private.provresultat r where r.prov_id = p.id
    union select g.user_id from kg_private.gruppmedlem g where g.grupp_id = any(p.grupper)
  )
  select count(*), coalesce(jsonb_agg(jsonb_build_object(
           'id',e.user_id,'namn',kg_private.anv_namn(e.user_id),
           'klara',coalesce(r.klara,0),'ratt',coalesce(r.ratt,0),
           'dold',exists (select 1 from kg_private.provdold d where d.prov_id = p.id and d.user_id = e.user_id))
         order by kg_private.anv_namn(e.user_id)), '[]'::jsonb)
    into v_elever, v_lista
    from elever e left join kg_private.provresultat r on r.prov_id = p.id and r.user_id = e.user_id;
  select count(*), coalesce(sum(klara),0) into v_tranat, v_klara
    from kg_private.provresultat where prov_id = p.id and klara > 0;
  select coalesce(jsonb_object_agg(o, jsonb_build_object('forsok',f,'ratt',r,'elever',e)), '{}'::jsonb) into v_omr
    from (
      select o.key as o,
             sum(coalesce((o.value->>'f')::int,0)) as f,
             sum(coalesce((o.value->>'r')::int,0)) as r,
             count(*) filter (where coalesce((o.value->>'f')::int,0) > 0) as e
        from kg_private.provresultat res, jsonb_each(res.per_omr) o
       where res.prov_id = p.id
       group by o.key
    ) x;
  return jsonb_build_object('ok',true,'elever',v_elever,'tranat',v_tranat,'uppgifter',v_klara,
                            'omraden',v_omr,'elevlista',v_lista,'prov',kg_private.prov_json(p, uid));
end $function$;
CREATE OR REPLACE FUNCTION public.kg_lar_elev(p_grupp bigint, p_user uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare s kg_private.state%rowtype; v_kurser jsonb; v_dagar jsonb; v_pass jsonb;
begin
  if not kg_private.lar_har_grupp(p_grupp) then return jsonb_build_object('ok',false,'code','larare_kravs'); end if;
  if not exists (select 1 from kg_private.gruppmedlem where grupp_id = p_grupp and user_id = p_user) then
    return jsonb_build_object('ok',false,'code','ej_medlem');
  end if;
  select * into s from kg_private.state where id = p_user;

  -- Per kurs: försök i historiken och behärskning per område.
  select coalesce(jsonb_agg(k order by (k->>'senast') desc nulls last), '[]'::jsonb) into v_kurser
    from (
      select jsonb_build_object(
               'kurs',c.key,
               'forsok',(select count(*) from kg_private.elev_forsok(p_user) f where f.kurs = c.key),
               'ratt',(select count(*) from kg_private.elev_forsok(p_user) f where f.kurs = c.key and f.ok),
               'vecka',(select count(*) from kg_private.elev_forsok(p_user) f where f.kurs = c.key and f.tid > now() - interval '7 days'),
               'senast',(select max(f.tid) from kg_private.elev_forsok(p_user) f where f.kurs = c.key),
               'omraden',(
                 select coalesce(jsonb_agg(jsonb_build_object(
                          'omr',a.key,
                          'm',round((a.value)::numeric,3),
                          'f',(select count(*) from kg_private.elev_forsok(p_user) f where f.kurs = c.key and f.omr = a.key),
                          'r',(select count(*) from kg_private.elev_forsok(p_user) f where f.kurs = c.key and f.omr = a.key and f.ok))
                        order by (a.value)::numeric), '[]'::jsonb)
                   from jsonb_each(case when jsonb_typeof(c.value->'areas')='object' then c.value->'areas' else '{}'::jsonb end) a
                  where jsonb_typeof(a.value) = 'number')) as k
        from jsonb_each(case when jsonb_typeof(s.data->'courses')='object' then s.data->'courses' else '{}'::jsonb end) c
       where c.key <> 'none'
    ) x;

  -- Antal uppgifter per dag de senaste 14 dagarna (svensk tid).
  select coalesce(jsonb_object_agg(d, n), '{}'::jsonb) into v_dagar
    from (select to_char(f.tid at time zone 'Europe/Stockholm','YYYY-MM-DD') d, count(*) n
            from kg_private.elev_forsok(p_user) f
           where f.tid > now() - interval '14 days'
           group by 1) y;

  -- Träningspass i gruppen eller där eleven har resultat hos den här läraren.
  select coalesce(jsonb_agg(jsonb_build_object('id',p.id,'titel',p.titel,'kurs',p.kurs,'antal',p.antal,
           'klara',coalesce(r.klara,0),'ratt',coalesce(r.ratt,0),'aktiv',p.aktiv) order by p.skapad desc), '[]'::jsonb)
    into v_pass
    from public.kg_provtraning p
    left join kg_private.provresultat r on r.prov_id = p.id and r.user_id = p_user
   where p_grupp = any(p.grupper) or (r.user_id is not null and p.larare = auth.uid())
      or (p_user=any(p.elever) and kg_private.prov_lar_kan(p));

  return jsonb_build_object('ok',true,
    'namn',kg_private.anv_namn(p_user),
    'epost',(select u.email from auth.users u where u.id = p_user),
    'xp',coalesce((s.data->>'xp')::bigint,0),
    'uppgifter',coalesce((s.data->>'attempts')::bigint,0),
    'streak',coalesce((s.data->>'streak')::int,0),
    'kurser',v_kurser,'dagar',v_dagar,'pass',v_pass);
end $function$;

REVOKE ALL ON FUNCTION public.kg_prov_elevval() FROM public,anon;
GRANT EXECUTE ON FUNCTION public.kg_prov_elevval() TO authenticated;
REVOKE ALL ON FUNCTION public.kg_prov_skapa_med_elever(text,text,text,text[],text[],integer,boolean,date,bigint[],text,uuid[]) FROM public,anon;
GRANT EXECUTE ON FUNCTION public.kg_prov_skapa_med_elever(text,text,text,text[],text[],integer,boolean,date,bigint[],text,uuid[]) TO authenticated;
REVOKE ALL ON FUNCTION public.kg_prov_andra_med_elever(bigint,text,text,text[],text[],integer,boolean,date,bigint[],uuid[]) FROM public,anon;
GRANT EXECUTE ON FUNCTION public.kg_prov_andra_med_elever(bigint,text,text,text[],text[],integer,boolean,date,bigint[],uuid[]) TO authenticated;
REVOKE ALL ON FUNCTION kg_private.prov_valbara_elever(uuid[],uuid[]) FROM public,anon,authenticated;
NOTIFY pgrst, 'reload schema';
commit;
