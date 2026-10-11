# Adminstatistik – 2026-10-11

## Aktivering

Koden för översikten finns i `index.html` och `admin-statistik.js`.
Kör **hela `sql/2026-10-11-admin-statistik.sql`** i Supabase SQL Editor i samma
projekt som Kunskapsgymmet. Uppdatera sedan sidan och öppna Administration →
Statistik. Migreringen är idempotent och kan köras igen.

Befintlig adminstatistik v8 krävs: `kg_admin_anvandare()`,
`kg_admin_anvandarstat(uuid,integer)`, `kg_statistik()` och `kg_ar_admin()`.
Migreringen återanvänder deras faktiska JSON-/radresultat och behöver inte anta
namn på de äldre interna dagsstatistiktabellerna. Den lagrar ingen ny elevdata.

Migreringen har **inte** körts i produktion från molnmiljön: här saknas
anslutning till produktionsdatabasen. Vid saknad migrering visar översikten
aktiveringshjälp; användarfliken fortsätter fungera.

## Åtgärdslista

- Alla användarkort är hopfällda vid varje ny öppning. Klick eller tangentbord
  öppnar ett enskilt kort. Öppningsläget bevaras under sökning och sortering.
- Statistikknappen öppnar en gemensam adminöversikt i samma dialog som användare,
  rapporter, skolor och klasser.
- Sex huvudmått: totalt antal registrerade konton, dagens uppgifter, aktiva
  konton, aktiv tid per aktivt konto samt uppgifter och unika aktiva konton under
  senaste sju **hela** dagarna.
- Nya konton idag och senaste sju kalenderdagarna visas under kontototalen.
- Dagens uppgifter jämförs med igår och samma veckodag förra veckan. Pågående
  dag markeras tydligt. Veckokorten jämför två avslutade sjudagarsperioder.
- Fyra dagliga grafer: uppgifter, aktiva konton, nya konton och uppskattad aktiv
  tid per aktivt konto. 14/30 dagar kan väljas. Staplar väljer jämförelsedag och
  fungerar med tangentbord. Axlar, värden och datum syns; staplarna ryms även i
  30-dagarsläget på mobil.
- Två valfria datum jämför antal uppgifter, konton, inloggningar och tid med
  differens/procent. Nollbas ger ingen oändlig procent. Saknat underlag visas
  som saknat, inte som en säker nolla.
- Återkommande konton mellan veckorna, uppgifter per aktivt konto och andel rätt
  ger mer information än enbart råa totaler.
- Befintlig timstatistik och inloggad/anonym fördelning finns kvar när den äldre
  globala RPC:n ger dessa fält. Kursfördelningen gäller inloggad träning/30 dagar.
- CSV-export innehåller samtliga 30 dagars mätvärden, tydliga kolumnnamn och
  separata kolumner för alla uppgifter och inloggade uppgifter.
- Återöppning under dialogens stängningsanimation har rättats så att gamla
  dialog-ID:n inte kan fånga den nya laddningen.

## Definitioner och gränser

Kalenderdagar använder `Europe/Stockholm` i databasen. En registrering räknas
utifrån kontots skapandetid i den befintliga adminlistan. Konton som bara hör
till en annan app ska inte introduceras i denna lista av den nya översikten.

Aktiva konton har uppgifter, inloggningar eller synlig heartbeat under dagen.
Periodmåttet deduplicerar deras användar-ID:n över alla dagar. Anonyma
webbläsarnycklar är inte identifierade personer och får inte adderas till antalet
konton. Alla uppgifter kommer från den globala händelsestatistiken när den har
värden för datumet; annars redovisas uttryckligen inloggad träning.

Aktiv tid kommer från befintlig uppskattad synlig heartbeat-tid. Den är varken
exakt skärmtid, tid med användarinteraktion eller tiden mellan inloggning och
utloggning. Sparade inloggningar kan leva länge utan att eleven tränar.
Dagens snitt = summerade aktiva minuter / aktiva konton den dagen. Ett
periodsnitt använder **aktiva kontodagar**, inte unika konton i hela perioden.
Återkommande konton är de som är aktiva i båda jämförda veckorna.

Tidigare dagar kan sakna insamlad aktivitet. Första registrerade aktivitet
används som en försiktig gräns för veckojämförelser. Den anger inte att all
äldre statistik kan återskapas. Den nya översikten hämtar högst 30 dagar.
Konton som raderats och inte längre finns i adminlistan ingår inte i dess
kontobaserade historik. Den globala händelsestatistiken har sin egen omfattning.
Öppna identifierade rapporter räknas från befintlig hämtning, högst 1 000 rader.

Appens befintliga användningsdata saknar tillförlitlig geografisk position.
E-postleverantör och vald skola är inte personens plats. Ingen IP-loggning,
positionsfråga eller geografisk tjänst har lagts till. En separat serverlösning
skulle behövas för ungefärlig IP-baserad region; den kan inte härledas säkert
från den här statistiken.

## Behörigheter

`oppnaAdmin` kontrollerar adminstatus server-side före visning. `kgAdminRpc` och
`hamtaStatistik` avvisar icke-admin även vid direkta frontend-anrop. Menyer visar
globala funktioner enbart för admin.

SQL:s `kg_admin_oversikt()` har `SECURITY DEFINER`, tom `search_path` och ett
explicit krav på både `auth.uid()` och `kg_ar_admin()`. `anon` och `PUBLIC`
får inte exekvera den. Den äldre globala `kg_statistik()` får också en
serverkontrollerad adminspärr, med bevarad resultattyp. Dess tidigare
implementation ligger i `kg_private` utan exekveringsrätt för vanliga konton.
En lärare får inte global åtkomst genom att vara lärare. Befintlig klass- och
gruppstatistik och felrapportgranskningens lärarbehörighet har inte ändrats.

## Verifiering

- Samtliga Node-tester: 115/115 passerar, inklusive fyra nya tester för kalender-
  dagar, nollbas, deduplicering, aktiva kontodagar och anonym/inloggad statistik.
- Lokal PostgreSQL/PGlite-integration: 17 kontroller passerar. Migreringen körs
  två gånger, adminresultat jämförs mot oberoende fixturevärden, svenska
  kalenderdagar kontrolleras och lärare/utloggade nekas med SQLSTATE 42501.
  PUBLIC/anon och privata källfunktionens behörigheter kontrolleras. Både
  TABLE-rader och JSON-array från användar-RPC:n testas.
- Faktisk webbläsare: fyra grafer, 14/30 dagar, klickbara staplar, datumval,
  oberoende dagsskillnad, CSV med 30 datarader, tre hopfällda konton, öppning,
  sökning, återöppning, saknad migrering och avvisad lärare verifierade. Inga
  JavaScript-fel. Mobilens hela graf ryms i panelen; jämförelsetabellen kan
  scrollas separat. Mörkt och ljust tema har granskats visuellt med fiktiva data.
- Ingen produktionsdatabas, autentisering eller elevdata har använts i testerna.
- Uppgiftsbankerna, deras facit och nivåer är oförändrade i detta uppdrag.

Kör tester reproducerbart:

```sh
node --test tools/*.test.js
npm install --prefix /tmp/kg-admin-stat-tests --cache /tmp/kg-admin-stat-npm @electric-sql/pglite --no-audit --no-fund
node tools/admin-statistik.integration.js /tmp/kg-admin-stat-tests/node_modules/@electric-sql/pglite
# Starta appen på 8082 och kör, med Playwright och Chromium installerade:
python tools/admin-statistik.browser.py
```
