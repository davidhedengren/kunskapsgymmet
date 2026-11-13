# Få feedback på din lösning (AI-feedback)

Eleven fotograferar en uppgift (eller skriver den som text) och sin egen handskrivna lösning. En AI-modell bedömer lösningen ungefär som en lärare som rättar:

- **sammanfattning**, t.ex. "Du fick rätt svar, men du behöver förklara hur du kom fram till ekvationen."
- **Det här har du gjort rätt**
- **Här tänkte du fel**: steg, feltyp och förklaring av felet. Följdfel räknas inte som nya fel.
- **För att få full poäng behöver du**: motiveringar, mellanled, enheter, svarsmening och liknande.

Eleven kan ställa ett fåtal följdfrågor och starta en ny granskning. Funktionen är fristående från uppgiftsbankerna.

> **Status:** koden är testad mot mockat API och en riktig Postgres (PGlite). Livefunktionen är **inte verifierad** förrän stegen i *Installation* är gjorda och en riktig granskning har körts.

## Arkitektur

```
webbläsare (ai-feedback.js)
   │  Bearer <elevens Supabase-token>, bilder komprimerade i klienten (≤1600 px, JPEG)
   ▼
Supabase Edge Function  supabase/functions/ai-feedback
   1. avstängd om AI_FEEDBACK_AKTIV ≠ true eller OPENAI_API_KEY saknas
   2. identitet: GET /auth/v1/user med elevens token (klientens user-id används aldrig)
   3. validering av bilder (magiska byte, storlek, antal) och text
   4. rpc kg_ai_reservera  → dagsgräns, följdfrågegräns, månadsbudget (atomiskt)
   5. OpenAI Responses API (store:false, strikt JSON-schema, timeout 90 s)
   6. rpc kg_ai_avrakna    → faktisk kostnad från usage, reservationen släpps
   ▼
Postgres: kg_ai_konfig, kg_ai_manad, kg_ai_granskning, kg_ai_anrop
```

- OpenAI-nyckeln finns bara som hemlighet i Supabase och aldrig i klientkod eller repo.
- Tabellerna har RLS påslaget utan policyer, och anon/authenticated har inga rättigheter. Eleverna når bara `kg_ai_status()`, som returnerar deras egen kvot.
- Bara admin (`kg_ar_admin()`) når `kg_ai_oversikt()` och `kg_ai_satt_konfig()`.

### Budget och gränser

| Inställning | Standard | Var |
|---|---|---|
| Månadsbudget | 150 kr (kan inte sättas till 200 kr eller mer) | `kg_ai_konfig.manadsbudget_sek` / adminvyn |
| Granskningar per elev och dag | 3 | adminvyn |
| Följdfrågor per granskning | 2 | adminvyn |
| Modell och priser | gpt-5.4-mini, $0,75 / $0,075 / $4,50 per 1M token | `kg_ai_konfig` |
| Växelkurs | 12 kr/USD (sätt gärna lite högre än aktuell kurs) | `kg_ai_konfig.usd_sek` |

**Reservation och avräkning:**

- Före varje anrop reserveras en övre gräns: (bilder × 3000 + tecken/2 + 600) input-token plus max output-token, × 1,25.
- Reservationen görs med ett enda villkorat `UPDATE … WHERE reserverat + förbrukat + belopp <= budget`. Samtidiga anrop kan därför aldrig tillsammans gå över budgeten.
- Efter anropet avräknas den faktiska kostnaden × 1,05.
- Om OpenAI svarar med serverfel eller timeout räknas hela reservationen som förbrukad.
- Reservationer som inte avräknats inom 10 minuter räknas också som förbrukade.
- Om budgetkontrollen inte går att göra (databasfel) nekas begäran.
- En misslyckad granskning räknas inte mot elevens dagsgräns.

**Kostnad:** en granskning reserverar cirka 0,4 kr och kostar i praktiken cirka 0,15–0,3 kr.

**Budgeten slut:** eleverna ser "AI-feedback är tillfälligt pausad eftersom månadens budget är förbrukad. Funktionen blir tillgänglig igen nästa månad."

**Viktigt om fakturan:** den interna budgeten bygger på uppskattade priser och växelkurs. OpenAI rapporterar förbrukning med fördröjning, och kronkursen varierar. Därför kan ingen kod garantera att fakturan blir högst exakt 200 kr. Det verkliga skyddet är **den hårda gränsen i OpenAI-projektet** (se nedan) tillsammans med den interna budgeten på 150 kr.

## Personuppgifter och lagring

- **Bilder sparas aldrig.** De skickas genom funktionen till OpenAI och kastas sedan.
- Anropen görs med `store:false`.
- Inget namn, ingen e-post och inget användar-id skickas till OpenAI.
- Eleven uppmanas att inte skriva sitt namn på bilderna.
- Sparad *kontext* behövs för följdfrågor. Den består av AI:ns textavskrift av uppgiften och lösningen samt återkopplingen, och den raderas efter 24 timmar.
- Statistikrader (user_id, tidpunkt, status, tokens, kostnad) raderas efter 400 dagar.
- Funktionsloggarna innehåller aldrig bilder, text eller användar-id.

**Skolan/huvudmannen behöver själv bedöma följande innan funktionen slås på:**

- konsekvensbedömning (DPIA) och rättslig grund enligt GDPR
- att eleverna är minderåriga
- personuppgiftsbiträdesavtal och tredjelandsöverföring med OpenAI (OpenAI:s DPA, dataplacering)
- information till elever och vårdnadshavare

## Installation

1. **Skapa ett separat OpenAI-projekt** för Kunskapsgymmet på platform.openai.com.
   - Under *Settings → Limits* (projektets budget), sätt en månadsbudget i USD som motsvarar under 200 kr, t.ex. **15 USD**.
   - Aktivera **"Enforce a hard limit"** (eller motsvarande alternativ som stoppar anrop när budgeten är nådd).
   - Begränsa gärna projektet till modellen gpt-5.4-mini.
   - Skapa en API-nyckel **i det projektet**.
2. **Kör SQL-migreringen** `sql/2026-11-13-ai-feedback.sql` i Supabase SQL Editor.
   - Den förutsätter att `kg_ar_admin()` finns, vilket den redan gör i Kunskapsgymmets databas.
   - Funktionen startar avstängd (`aktiv = false`).
3. **Sätt hemligheterna** (Supabase CLI, inloggad mot projektet):

   ```bash
   supabase secrets set OPENAI_API_KEY=sk-... AI_FEEDBACK_AKTIV=true
   ```

   Valfritt:
   - `AI_FEEDBACK_ORIGINS` (kommaseparerade origins; standard är kunskapsgymmet.se, www.kunskapsgymmet.se och localhost)
   - `AI_FEEDBACK_MODELL`

   `SUPABASE_URL`, `SUPABASE_ANON_KEY` och `SUPABASE_SERVICE_ROLE_KEY` sätts automatiskt i Edge Functions.
4. **Distribuera funktionen:**

   ```bash
   supabase functions deploy ai-feedback
   ```

   Funktionen verifierar själv elevens token mot `/auth/v1/user`. JWT-kontrollen i gatewayen kan ligga kvar påslagen.
5. **Slå på funktionen** i Kunskapsgymmet: logga in som admin, öppna *Få feedback på din lösning* och klicka på **Adminöversikt för AI-feedback** längst ned. Bocka i *Aktiv* och kontrollera budget och gränser.
6. **Verifiera live:**
   - Kör en granskning med en enkel uppgift.
   - Kontrollera att adminvyn visar ett anrop och en rimlig kostnad.
   - Kontrollera att OpenAI-projektets *Usage* visar samma förbrukning.

**Stänga av:** bocka ur *Aktiv* i adminvyn (direkt), eller `supabase secrets set AI_FEEDBACK_AKTIV=false`.

## Tester

```bash
node --test tools/ai-feedback.test.mjs
```

12 tester med mockat OpenAI och mockad Supabase. De täcker:

- inloggning och identitet
- flagga av/på
- budget- och gränsfel
- avräkning vid API-fel
- ogiltiga modellsvar och motsägelser
- bildvalidering
- följdfrågor utan bilder
- schemat och promptens pedagogiska krav
- att ingen nyckel finns i klientkoden

```bash
npm i --no-save @electric-sql/pglite
node --test tools/ai-feedback-sql.test.mjs
```

10 tester mot riktig Postgres (PGlite), bland annat:

- reservation och avräkning
- dagsgräns
- följdfrågegräns
- 40 samtidiga anrop som aldrig tillsammans överskrider budgeten
- budget slut
- spärr vid 200 kr
- städning
- RLS och rättigheter
- admin

Testet hoppas över om PGlite saknas. Alternativt kan `PGLITE_MODUL` sättas till en sökväg.

## Filer

| Fil | Innehåll |
|---|---|
| `ai-feedback.js`, `ai-feedback.css` | elevvy, adminvy, hemkort |
| `index.html` | länkar in filerna, vyer `aifeedback` / `aifeedback-admin` |
| `supabase/functions/ai-feedback/` | `index.ts` (Deno), `hanterare.js` (flöde), `logik.js` (prompt, schema, validering) |
| `sql/2026-11-13-ai-feedback.sql` | tabeller, budget, gränser, RLS |
| `tools/ai-feedback*.test.mjs` | tester |
