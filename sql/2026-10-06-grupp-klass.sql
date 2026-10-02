-- =====================================================================
-- Kunskapsgymmet: koppla en lärargrupp till en klass på topplistan
-- Kräver att 2026-10-01-klasser.sql, 2026-10-01-egna-klasser.sql,
-- 2026-10-03-larargrupper.sql och 2026-10-04-skolor-och-larare.sql redan är
-- körda. Kör hela filen i Supabase → SQL Editor. Den kan köras om utan skada.
--
--   * kg_grupp.klass_id      gruppens klass på topplistan
--   * kg_lar_grupp_klass     läraren kopplar gruppen till en befintlig eller ny
--                            klass. Alla elever i gruppen läggs i klassen.
--   * trigger                elever som går med i gruppen senare hamnar i
--                            klassen automatiskt
--   * Veckospärren för klassbyte gäller nu bara elevens egna byten, så att en
--     elev som läraren har placerat ändå kan byta själv.
--   * topplista_klass_elever räknar också klassmedlemmar som inte syns med
--     namn (de bidrar redan till klassens poäng).
-- =====================================================================

begin;

alter table public.kg_grupp add column if not exists klass_id bigint references public.kg_klass(id) on delete set null;

-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.kg_lar_grupp_klass(p_grupp bigint, p_klass bigint DEFAULT NULL, p_namn text DEFAULT NULL)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid(); k public.kg_klass%rowtype; v_namn text; n_flytt int; n_elever int;
begin
  if uid is null or not kg_private.lar_har_grupp(p_grupp) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  -- Ingen klass och inget namn: ta bort kopplingen (eleverna ligger kvar i klassen).
  if p_klass is null and btrim(coalesce(p_namn,'')) = '' then
    update public.kg_grupp set klass_id = null where id = p_grupp;
    return jsonb_build_object('ok',true,'klass',null);
  end if;
  if p_klass is not null then
    select * into k from public.kg_klass where id = p_klass;
    if not found then return jsonb_build_object('ok',false,'code','okand_klass'); end if;
  else
    v_namn := regexp_replace(btrim(p_namn), '\s+', ' ', 'g');
    if char_length(v_namn) not between 2 and 30
       or v_namn !~ '^[A-Za-zÅÄÖåäöÉéÜü0-9 ._()-]+$' then
      return jsonb_build_object('ok',false,'code','namn');
    end if;
    select * into k from public.kg_klass where lower(btrim(namn)) = lower(v_namn);
    if not found then
      insert into public.kg_klass(namn, ordning, larare, skapad_av)
      values (v_namn, 100, false, uid)
      returning * into k;
    end if;
  end if;
  if k.larare then return jsonb_build_object('ok',false,'code','lararklass'); end if;

  update public.kg_grupp set klass_id = k.id where id = p_grupp;
  select count(*) into n_elever from kg_private.gruppmedlem m
   where m.grupp_id = p_grupp and not kg_private.ar_larare(m.user_id);
  with flytt as (
    insert into kg_private.klassmedlem(user_id, klass_id, satt, satt_av)
    select m.user_id, k.id, now(), uid
      from kg_private.gruppmedlem m
     where m.grupp_id = p_grupp and not kg_private.ar_larare(m.user_id)
    on conflict (user_id) do update
       set klass_id = excluded.klass_id, satt = now(), satt_av = excluded.satt_av
     where kg_private.klassmedlem.klass_id is distinct from excluded.klass_id
    returning 1)
  select count(*) into n_flytt from flytt;
  return jsonb_build_object('ok',true,'klass',jsonb_build_object('id',k.id,'namn',k.namn),
                            'elever',n_elever,'flyttade',n_flytt);
end $function$;

-- Nya medlemmar i en kopplad grupp hamnar i gruppens klass.
CREATE OR REPLACE FUNCTION kg_private.grupp_klass_ny_medlem()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_klass bigint;
begin
  select g.klass_id into v_klass from public.kg_grupp g where g.id = new.grupp_id;
  if v_klass is not null and not kg_private.ar_larare(new.user_id) then
    insert into kg_private.klassmedlem(user_id, klass_id, satt, satt_av)
    values (new.user_id, v_klass, now(), null)
    on conflict (user_id) do update set klass_id = excluded.klass_id, satt = now(), satt_av = null;
  end if;
  return new;
end $function$;

drop trigger if exists grupp_klass_ny_medlem on kg_private.gruppmedlem;
create trigger grupp_klass_ny_medlem after insert on kg_private.gruppmedlem
  for each row execute function kg_private.grupp_klass_ny_medlem();

-- ---------------------------------------------------------------------
-- Veckospärren gäller bara byten som eleven själv gjort.
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
  if found and m.satt_av = uid and m.satt > now() - interval '7 days' and not public.kg_ar_admin() then
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
  select * into m from kg_private.klassmedlem where user_id = uid;
  if found and m.satt_av = uid and m.satt > now() - interval '7 days' and not public.kg_ar_admin() then
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

-- ---------------------------------------------------------------------
-- Lärarens grupper, nu med kopplad klass.
CREATE OR REPLACE FUNCTION public.kg_lar_grupper()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid();
begin
  if uid is null or not kg_private.prov_larare() then return jsonb_build_object('ok',false,'code','larare_kravs'); end if;
  return jsonb_build_object('ok',true,'grupper',coalesce((
    select jsonb_agg(jsonb_build_object(
             'id',g.id,'namn',g.namn,'kod',g.kod,'skapad',g.skapad,'egen',g.skapad_av = uid,'synlig',g.synlig,
             'klass',(select jsonb_build_object('id',k.id,'namn',k.namn) from public.kg_klass k where k.id = g.klass_id),
             'elever',(select count(*) from kg_private.gruppmedlem m where m.grupp_id = g.id),
             'aktiva',(select count(distinct m.user_id) from kg_private.gruppmedlem m
                        where m.grupp_id = g.id
                          and exists (select 1 from kg_private.elev_forsok(m.user_id) f
                                       where f.tid > now() - interval '7 days')),
             'larare',(select coalesce(jsonb_agg(kg_private.anv_namn(l.user_id) order by l.satt),'[]'::jsonb)
                         from kg_private.grupplarare l where l.grupp_id = g.id))
           order by g.namn)
      from public.kg_grupp g
     where exists (select 1 from kg_private.grupplarare l where l.grupp_id = g.id and l.user_id = uid)),
    '[]'::jsonb));
end $function$;

-- ---------------------------------------------------------------------
-- Klassens elever: synliga med namn, övriga som antal.
CREATE OR REPLACE FUNCTION public.topplista_klass_elever(p_klass bigint, p_period text DEFAULT 'vecka')
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_start timestamptz; v_rader jsonb; v_dolda int; v_dolda_aktiva int;
begin
  if p_period not in ('dag','vecka','manad','alla') then
    raise exception 'Ogiltig period' using errcode='22023';
  end if;
  v_start := kg_private.klass_start(p_period);
  select coalesce(jsonb_agg(jsonb_build_object('namn',x.namn,'xp',x.xp,'uppgifter',x.uppgifter,'niva',x.niva,'rang',x.rang)
                            order by x.xp desc, x.uppgifter desc, lower(x.namn)), '[]'::jsonb)
    into v_rader
    from (
      select t.namn, t.niva, t.rang, p.xp, p.uppgifter
        from kg_private.klassmedlem m
        join kg_private.state s on s.id = m.user_id and s.review_required = false
        join public.topplista t on t.id = m.user_id and t.visa = true
        cross join lateral kg_private.klass_period(m.user_id, v_start) p
       where m.klass_id = p_klass
    ) x;
  select count(*), count(*) filter (where p.uppgifter > 0)
    into v_dolda, v_dolda_aktiva
    from kg_private.klassmedlem m
    join kg_private.state s on s.id = m.user_id and s.review_required = false
    cross join lateral kg_private.klass_period(m.user_id, v_start) p
   where m.klass_id = p_klass
     and not exists (select 1 from public.topplista t where t.id = m.user_id and t.visa = true);
  return jsonb_build_object('rader', v_rader, 'dolda', v_dolda, 'dolda_aktiva', v_dolda_aktiva);
end $function$;

-- ---------------------------------------------------------------------
revoke all on function public.kg_lar_grupp_klass(bigint,bigint,text) from public, anon;
grant execute on function public.kg_lar_grupp_klass(bigint,bigint,text) to authenticated;
revoke all on function kg_private.grupp_klass_ny_medlem() from public, anon, authenticated;
grant execute on function public.kg_valj_klass(bigint) to authenticated;
grant execute on function public.kg_skapa_klass(text) to authenticated;
grant execute on function public.kg_lar_grupper() to authenticated;
grant execute on function public.topplista_klass_elever(bigint, text) to anon, authenticated;

commit;
