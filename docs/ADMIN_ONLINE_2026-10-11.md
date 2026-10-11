# Admins onlineräknare – 2026-10-11

En grön cirkel bredvid XP-baren visar antalet användare online. Den finns i
toppmenyn och i träningspass, både numeriska frågor och flervalsfrågor. Endast
ett verifierat administratörskonto får knappen och anropar närvarohämtningen.
Vanliga lärare och elever får den inte.

- Hovring öppnar en lista med namn och aktuell kurs. Det går att flytta musen
  till listan utan att den stängs.
- Klick fäster listan så att den kan läsas även på mobil. Ett nytt klick,
  klick utanför eller Escape stänger. Enter/Space fungerar på knappen och
  Escape återför tangentbordsfokus till den.
- Närvaro hämtas vid verifierad admininloggning, sedan via den befintliga
  heartbeat-cykeln på 45 sekunder när fliken är synlig. En äldre lista hämtas
  också när den öppnas. Samtidiga hämtningar delar ett anrop.
- Online använder samma tvåminutersgräns som adminstatistiken. Serverns
  onlineflagga filtreras även mot senaste signalen om en sådan tid finns.
  Flera rader för samma konto räknas en gång.
- Nätverksfel och okänt/utgånget underlag visas som **–**, aldrig som en säker
  nolla. Listan erbjuder nytt försök genom ett klick på cirkeln. **0** betyder
  att en lyckad hämtning gav noll aktuella konton.
- Namn hämtas från den befintliga `kg_admin_anvandare` genom `kgAdminRpc`.
  Ingen ny SQL behövs. Den befintliga användar-RPC:n och dess adminbehörighet
  måste redan finnas. Koden introducerar inga publika databasläsningar.
- Endast namn (eller e-post om namn saknas), kurs och närvarotid behålls i
  listans minne; ingenting sparas i lokal lagring. Namn och kurser HTML-escapas.
  Listan rensas direkt vid utloggning, kontobyte eller nekad adminbehörighet.
  Sena svar från det gamla kontot/versionen ignoreras.
- Navigering stänger listan. På små skärmar får XP-baren en kompakt form så
  räknaren ryms; adminmenyn döljer färglägesknappen under 430 px. Träningspass
  behåller färglägesknappen och har räknaren bredvid XP på en egen rad på mobil.

## Filer och verifiering

`index.html` innehåller presentation, roll-/kontolivscykel och närvarohämtning.
Bankerna och Uppgiftslabbet ändras inte. `tools/admin-online.test.js` skyddar
unika konton, sortering, behörighet, dolda flikar, samtidiga anrop, kontobyte,
nätverksfel och utgångna data. Den befintliga heartbeat-regressionen i
`tools/felnotis.test.js` kontrollerar nu även närvarouppdateringen.

`tools/admin-online.browser.py` testar den faktiska appen med lokala RPC-svar,
utan produktionskonton eller databas-/XP-skrivningar: hovring, klick,
tangentbord, HTML-escaping, automatisk uppdatering, fel/nytt försök, noll
användare, admin utan tidigare XP, kontobyte och nekad vanlig lärare. Den
kontrollerar 20 toppmenylayouter (320–1440 px, båda färglägena) och tio
träningslayouter för numeriska kort och flervalskort. De ändrade kontrollerna
och listan ryms utan kollisioner. Skärmbilder på dator och mobil är granskade.

Den tidigare instrumentpanelen har separata breddproblem vid vissa storlekar:
HEAD före denna ändring hade dokumentbredder 937 px vid 900 px, 642 px vid
600 px och 349 px vid 320 px; tränarens pratbubbla gick utanför vid 320 px.
Responsivkontrollen här avgränsas därför uttryckligen till den ändrade
toppmenyn och närvaropanelen. Dessa äldre problem ändras inte i denna leverans.

Alla 128 Node-tester passerar. Webbläsarkontrollen har inga JavaScriptfel.
Även den tidigare statistikvyns webbläsarkontroll passerar: grafer, export,
hopfällda användarkort, saknad statistikmigrering och nekad vanlig lärare.
Produktionsdatabasen har inte anropats i verifieringen; testerna ersätter
RPC-svaren lokalt och blockerar övriga Supabase-anrop.
