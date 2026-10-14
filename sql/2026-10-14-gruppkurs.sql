-- Gruppens kurs för den godkända lärarvyn.
-- Kör efter tidigare lärargrupp-/skol-/klassmigrationer (2026-10-03–06).
-- Klassimport använder fortsatt 2026-10-14-grupper-klassimport.sql.
-- Kan köras igen. Ändrar inte befintliga medlemskap, pass, resultat eller klasser.
begin;

alter table public.kg_grupp add column if not exists kurs text;

CREATE OR REPLACE FUNCTION public.kg_lar_grupp_kurs(p_grupp bigint, p_kurs text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
begin
  if auth.uid() is null or not kg_private.prov_larare()
     or not kg_private.lar_har_grupp(p_grupp) then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  if p_kurs is not null and p_kurs not in ('ma1','ma2','mato1','mato2','matf1','fy1','fy2') then
    return jsonb_build_object('ok',false,'code','kurs');
  end if;
  update public.kg_grupp set kurs=p_kurs where id=p_grupp;
  return jsonb_build_object('ok',true);
end $function$;

-- Separat namn undviker tvetydiga PostgREST-overloads för den äldre klienten.
-- Den befintliga skapandefunktionen sköter namn, behörighet och frekvensgräns.
CREATE OR REPLACE FUNCTION public.kg_lar_grupp_skapa_kurs(p_namn text, p_kurs text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO ''
AS $function$
declare v_resultat jsonb;
begin
  if auth.uid() is null or not kg_private.prov_larare() then
    return jsonb_build_object('ok',false,'code','larare_kravs');
  end if;
  if p_kurs is null or p_kurs not in ('ma1','ma2','mato1','mato2','matf1','fy1','fy2') then
    return jsonb_build_object('ok',false,'code','kurs');
  end if;
  v_resultat := public.kg_lar_grupp_skapa(p_namn);
  if v_resultat->>'ok' = 'true' then
    update public.kg_grupp set kurs=p_kurs where id=(v_resultat->>'id')::bigint;
    v_resultat := v_resultat || jsonb_build_object('kurs',p_kurs);
  end if;
  return v_resultat;
end $function$;

CREATE OR REPLACE FUNCTION public.kg_lar_grupper()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare uid uuid := auth.uid();
begin
  if uid is null or not kg_private.prov_larare() then return jsonb_build_object('ok',false,'code','larare_kravs'); end if;
  return jsonb_build_object('ok',true,'kursstod',true,'grupper',coalesce((
    select jsonb_agg(jsonb_build_object(
             'id',g.id,'kurs',g.kurs,'namn',g.namn,'kod',g.kod,'skapad',g.skapad,'egen',g.skapad_av = uid,'synlig',g.synlig,
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


revoke all on function public.kg_lar_grupp_kurs(bigint,text) from public, anon;
revoke all on function public.kg_lar_grupp_skapa_kurs(text,text) from public, anon;
revoke all on function public.kg_lar_grupper() from public, anon;
grant execute on function public.kg_lar_grupp_kurs(bigint,text) to authenticated;
grant execute on function public.kg_lar_grupp_skapa_kurs(text,text) to authenticated;
grant execute on function public.kg_lar_grupper() to authenticated;

notify pgrst, 'reload schema';
commit;
