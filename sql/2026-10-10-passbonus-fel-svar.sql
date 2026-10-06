-- =====================================================================
-- Kunskapsgymmet: dra tillbaka passbonus som betalats ut för fel svar
-- Kör i Supabase → SQL Editor, en del i taget.
--
-- Bakgrund
--   Fram till 2026-10-06 gav varje helt pass 100 XP i bonus oavsett hur
--   många svar som var rätt. Ett pass med bara fel svar gav alltså lika
--   mycket bonus som ett felfritt, och det gick att samla XP genom att
--   klicka sig igenom pass med fel svar. Appen ger nu bonusen i proportion
--   till andelen rätt i passet (100 × rätt/försök).
--
-- Korrigeringen
--   Servern vet inte hur rätt och fel fördelades mellan passen, så avdraget
--   räknas på kontots totala andel fel:
--     bonuspass = min(pass, floor(attempts/4))   (samma tak som kg_profile)
--     avdrag    = round(100 × bonuspass × (attempts - correct) / attempts)
--   Det är vad kontot skulle ha förlorat om den nya regeln gällt hela
--   tiden, med kontots snitt som andel fel i varje pass.
--
--   Begränsningar:
--   * Pass före 2026-09-23 gav ingen bonus men räknas ändå i "pass". Konton
--     som tränade före dess får därför ett något för stort avdrag.
--   * Dagsmålsuppdraget (50 XP för 8 svar, även fel) och 1 XP för fel svar
--     med ledtråd går inte att skilja ut i efterhand och lämnas orörda.
--   * Redan utdelade topplistemedaljer (dag/vecka/månad) ändras inte.
--
--   Varje korrigerat konto får en ny revision. Appen ser då att profilen
--   ändrats, hämtar den nya och skriver inte tillbaka den gamla XP:n.
--   Avdraget bokförs i kg_private.xp_korrigering, så del 2 kan inte dra
--   av två gånger för samma konto.
-- =====================================================================


-- ── Del 1: förhandsgranska (ändrar ingenting) ─────────────────────────
-- Sortera på avdrag och titta igenom listan innan del 2 körs.
with k as (
  select s.id,
         s.data->>'namn' as namn,
         u.email,
         coalesce((s.data->>'xp')::bigint,0)       as xp,
         coalesce((s.data->>'attempts')::bigint,0) as forsok,
         coalesce((s.data->>'correct')::bigint,0)  as ratt,
         coalesce((s.data->>'pass')::bigint,0)     as pass
  from kg_private.state s
  left join auth.users u on u.id = s.id
)
select namn, email, xp, forsok, ratt,
       round(100.0*ratt/nullif(forsok,0)) as procent_ratt,
       pass,
       least(pass, forsok/4) as bonuspass,
       least(xp, round(100.0*least(pass, forsok/4)*(forsok-ratt)/nullif(forsok,0)))::bigint as avdrag,
       xp - least(xp, round(100.0*least(pass, forsok/4)*(forsok-ratt)/nullif(forsok,0)))::bigint as ny_xp
from k
where forsok > 0
order by avdrag desc nulls last;


-- ── Del 2: genomför avdraget ──────────────────────────────────────────
-- Vill du bara korrigera tydliga utnyttjare, lägg till ett villkor i
-- "where" nedan, t.ex.  and k.ratt < 0.5*k.forsok
begin;

create table if not exists kg_private.xp_korrigering (
  user_id uuid primary key,
  avdrag  bigint not null,
  xp_fore bigint not null,
  gjord   timestamptz not null default now()
);

with k as (
  select s.id, s.revision, s.data,
         coalesce((s.data->>'xp')::bigint,0)       as xp,
         coalesce((s.data->>'attempts')::bigint,0) as forsok,
         coalesce((s.data->>'correct')::bigint,0)  as ratt,
         coalesce((s.data->>'pass')::bigint,0)     as pass
  from kg_private.state s
  where not exists (select 1 from kg_private.xp_korrigering x where x.user_id = s.id)
  for update of s
), a as (
  select k.*,
         least(k.xp, round(100.0*least(k.pass, k.forsok/4)*(k.forsok-k.ratt)/k.forsok))::bigint as avdrag
  from k
  where k.forsok > 0
), bokford as (
  insert into kg_private.xp_korrigering(user_id,avdrag,xp_fore)
  select id, avdrag, xp from a where avdrag > 0
  returning user_id
), historik as (
  insert into kg_private.history(user_id,revision,data,reason)
  select a.id, a.revision, a.data, 'xp_korrigering' from a where a.avdrag > 0
)
update kg_private.state s
   set data = jsonb_set(s.data,'{xp}',to_jsonb(a.xp - a.avdrag)),
       revision = s.revision + 1
  from a
 where a.id = s.id and a.avdrag > 0;

-- Uppdatera topplistan för de korrigerade kontona.
select kg_private.publish(user_id) from kg_private.xp_korrigering
 where gjord > now() - interval '5 minutes';

-- Kontrollera resultatet och kör sedan  commit;  (eller  rollback;  för att ångra).
select x.user_id, s.data->>'namn' as namn, x.xp_fore, x.avdrag, (s.data->>'xp')::bigint as xp_nu
  from kg_private.xp_korrigering x join kg_private.state s on s.id = x.user_id
 order by x.avdrag desc;
