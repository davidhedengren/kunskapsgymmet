-- =====================================================================
-- Kunskapsgymmet: dra tillbaka dagens passbonus som betalats ut för fel svar
-- Kör i Supabase → SQL Editor, en del i taget.
--
-- Bakgrund
--   Fram till 2026-10-06 gav varje helt pass 100 XP i bonus oavsett hur
--   många svar som var rätt, och det gick att samla XP genom att klicka
--   sig igenom pass med fel svar. Appen ger nu bonusen i proportion till
--   andelen rätt i passet (100 × rätt/försök).
--
-- Korrigeringen gäller bara idag och bara elever med många fel idag
--   En första version räknade på kontots alla pass och hela andel fel. Den
--   drabbade ärliga elever brett och kördes aldrig skarpt.
--
--   Dagens utgångsläge per konto:
--     * kg_private.xp_dag: XP och antal försök vid dygnets start (exakt).
--     * Första versionen i kg_private.history sparad idag: rätt och pass
--       vid dygnets start. Historiken rensas till 100 versioner, så för den
--       som sparat mycket idag täcker den bara en del av dagen. Andelen fel
--       räknas då på den delen och antalet pass skalas upp till hela dagen.
--   avdrag = 100 × min(pass idag, försök idag/4) × andel fel idag,
--            högst den XP kontot tjänat idag.
--   Bara konton med minst min_fel fel svar idag och minst min_andel_fel
--   andel fel korrigeras. Ändra gränserna i "p" i båda delarna.
--
--   Varje korrigerat konto får en ny revision, så appen hämtar den nya
--   profilen och skriver inte tillbaka den gamla XP:n. Avdraget bokförs i
--   kg_private.xp_korrigering, en gång per konto och dygn.
-- =====================================================================


-- ── Del 1: förhandsgranska (ändrar ingenting) ─────────────────────────
with p as (
  select 20 as min_fel, 0.5 as min_andel_fel,
         (now() at time zone 'Europe/Stockholm')::date as dag,
         date_trunc('day', now() at time zone 'Europe/Stockholm') at time zone 'Europe/Stockholm' as t0
), nu as (
  select s.id, s.data->>'namn' as namn, u.email,
         coalesce((s.data->>'xp')::bigint,0)       as xp,
         coalesce((s.data->>'attempts')::bigint,0) as forsok,
         coalesce((s.data->>'correct')::bigint,0)  as ratt,
         coalesce((s.data->>'pass')::bigint,0)     as pass
  from kg_private.state s
  left join auth.users u on u.id = s.id
), bas as (
  select distinct on (h.user_id) h.user_id,
         coalesce((h.data->>'attempts')::bigint,0) as forsok,
         coalesce((h.data->>'correct')::bigint,0)  as ratt,
         coalesce((h.data->>'pass')::bigint,0)     as pass
  from kg_private.history h, p
  where h.saved_at >= p.t0
  order by h.user_id, h.saved_at, h.id
), est as (
  select nu.namn, nu.email, nu.xp,
         nu.xp - d.xp_start         as xp_idag,
         nu.forsok - d.upp_start    as forsok_idag,
         (nu.forsok - b.forsok - (nu.ratt - b.ratt))::numeric / nullif(nu.forsok - b.forsok,0) as andel_fel,
         round((nu.pass - b.pass)::numeric * (nu.forsok - d.upp_start) / nullif(nu.forsok - b.forsok,0)) as pass_idag
  from nu
  join p on true
  join kg_private.xp_dag d on d.user_id = nu.id and d.dag = p.dag
  join bas b on b.user_id = nu.id
)
select namn, email, xp, xp_idag, forsok_idag,
       round(100*andel_fel) as procent_fel_idag,
       round(forsok_idag*andel_fel) as fel_idag,
       pass_idag,
       greatest(0, least(xp_idag, round(100*least(pass_idag, forsok_idag/4)*andel_fel)))::bigint as avdrag
from est, p
where forsok_idag*andel_fel >= p.min_fel and andel_fel >= p.min_andel_fel
order by avdrag desc;


-- ── Del 2: genomför avdraget ──────────────────────────────────────────
begin;

create table if not exists kg_private.xp_korrigering (
  user_id uuid not null,
  dag     date not null,
  avdrag  bigint not null,
  xp_fore bigint not null,
  gjord   timestamptz not null default now(),
  primary key (user_id, dag)
);

with p as (
  select 20 as min_fel, 0.5 as min_andel_fel,
         (now() at time zone 'Europe/Stockholm')::date as dag,
         date_trunc('day', now() at time zone 'Europe/Stockholm') at time zone 'Europe/Stockholm' as t0
), nu as (
  select s.id, s.revision, s.data,
         coalesce((s.data->>'xp')::bigint,0)       as xp,
         coalesce((s.data->>'attempts')::bigint,0) as forsok,
         coalesce((s.data->>'correct')::bigint,0)  as ratt,
         coalesce((s.data->>'pass')::bigint,0)     as pass
  from kg_private.state s
  for update of s
), bas as (
  select distinct on (h.user_id) h.user_id,
         coalesce((h.data->>'attempts')::bigint,0) as forsok,
         coalesce((h.data->>'correct')::bigint,0)  as ratt,
         coalesce((h.data->>'pass')::bigint,0)     as pass
  from kg_private.history h, p
  where h.saved_at >= p.t0
  order by h.user_id, h.saved_at, h.id
), est as (
  select nu.id, nu.revision, nu.data, nu.xp,
         nu.xp - d.xp_start         as xp_idag,
         nu.forsok - d.upp_start    as forsok_idag,
         (nu.forsok - b.forsok - (nu.ratt - b.ratt))::numeric / nullif(nu.forsok - b.forsok,0) as andel_fel,
         round((nu.pass - b.pass)::numeric * (nu.forsok - d.upp_start) / nullif(nu.forsok - b.forsok,0)) as pass_idag
  from nu
  join p on true
  join kg_private.xp_dag d on d.user_id = nu.id and d.dag = p.dag
  join bas b on b.user_id = nu.id
  where not exists (select 1 from kg_private.xp_korrigering x where x.user_id = nu.id and x.dag = p.dag)
), a as (
  select est.*,
         greatest(0, least(xp_idag, round(100*least(pass_idag, forsok_idag/4)*andel_fel)))::bigint as avdrag
  from est, p
  where forsok_idag*andel_fel >= p.min_fel and andel_fel >= p.min_andel_fel
), bokford as (
  insert into kg_private.xp_korrigering(user_id,dag,avdrag,xp_fore)
  select a.id, p.dag, a.avdrag, a.xp from a, p where a.avdrag > 0
), historik as (
  insert into kg_private.history(user_id,revision,data,reason)
  select a.id, a.revision, a.data, 'xp_korrigering' from a where a.avdrag > 0
)
update kg_private.state s
   set data = jsonb_set(s.data,'{xp}',to_jsonb(a.xp - a.avdrag)),
       revision = s.revision + 1
  from a
 where a.id = s.id and a.avdrag > 0;

select kg_private.publish(user_id) from kg_private.xp_korrigering
 where dag = (now() at time zone 'Europe/Stockholm')::date;

commit;

select x.user_id, s.data->>'namn' as namn, x.xp_fore, x.avdrag, (s.data->>'xp')::bigint as xp_nu
  from kg_private.xp_korrigering x join kg_private.state s on s.id = x.user_id
 where x.dag = (now() at time zone 'Europe/Stockholm')::date
 order by x.avdrag desc;
