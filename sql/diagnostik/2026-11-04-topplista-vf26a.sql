-- Endast läsning. Kör i Supabase SQL Editor med administratörens behörighet.
-- Ändra klassnamnet nedan vid behov. Inga poäng eller elevprofiler ändras.
-- "historik_idag" är endast de försök som fortfarande finns i profilhistoriken,
-- alltså inte en ersättning för den beständiga dygnsbokföringen.
with vald as (
 select m.user_id,k.namn as klass,s.data,s.review_required
 from kg_private.klassmedlem m
 join public.kg_klass k on k.id=m.klass_id
 join kg_private.state s on s.id=m.user_id
 where lower(k.namn)=lower('VF26A')
), idag as (
 select (now() at time zone 'Europe/Stockholm')::date as dag
)
select v.klass,v.data->>'namn' as namn,
 v.review_required as profil_kraver_granskning,
 coalesce((v.data->>'xp')::bigint,0) as sparad_total_xp_utan_medaljer,
 coalesce((v.data->>'attempts')::bigint,0) as sparat_totalt_antal_uppgifter,
 p.xp as topplista_xp_idag,p.uppgifter as topplista_uppgifter_idag,
 least(p.xp,kg_private.klass_tak('dag')) as klassbidrag_idag,
 d.xp_start,d.xp_slut,d.upp_start,d.upp_slut,
 (select count(*) from kg_private.elev_forsok(v.user_id) f
   where (f.tid at time zone 'Europe/Stockholm')::date=i.dag) as historik_idag,
 (select max(h.saved_at) from kg_private.history h where h.user_id=v.user_id) as senaste_profilsparning,
 r.reason as senaste_avvisningsorsak,r.last_at as senaste_avvisning
from vald v cross join idag i
cross join lateral kg_private.klass_period(v.user_id,kg_private.klass_start('dag')) p
left join kg_private.xp_dag d on d.user_id=v.user_id and d.dag=i.dag
left join kg_private.rejections r on r.user_id=v.user_id
order by lower(v.data->>'namn');

-- Dygnsbokföringens trigger ska finnas och vara aktiverad (tgenabled = O).
select t.tgname,t.tgenabled,pg_get_triggerdef(t.oid) as definition
from pg_trigger t
where t.tgrelid='kg_private.state'::regclass and not t.tgisinternal;
