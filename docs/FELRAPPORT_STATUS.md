# Felrapporternas status och återkoppling

**Åtgärdad** betyder att ett fel faktiskt har rättats. **Granskad – inget fel** betyder att uppgiften var korrekt; den statusen ger ingen felrapportsbonus. Statusarna visas i lärar-/adminvyn, loggexporten och elevens **Mina felrapporter** i kontomenyn.

Kommentar skrivs direkt på rapportens rad i samma fönster, till höger på dator
eller under rapporttexten på mobil. Kommentaren är **valfri**, högst 1000 tecken.
Klick på **Åtgärdad** eller **Granskad – inget fel** sparar statusen och eventuell
kommentar tillsammans, utan extra fönster eller bekräftelsesteg. Tom eller enbart
blank text sparas som null. Eleven ser då statusen utan någon kommentarsruta.
Sparade rader ligger kvar så nästa rapport kan hanteras direkt. Utkast på andra
rader behålls och samtidiga sparningar skyddas mot dubbelklick. Sparfel visas på
raden och texten behålls. Appen skiljer på utgången inloggning, behörighetsfel,
saknad SQL-installation och övriga serverfel med felkod.
Inloggningen förnyas vid behov före anropet, precis som i appens övriga adminfunktioner.

Kommentaren gäller de öppna rapporter på samma kurs och uppgifts-ID som omfattas av granskningen, enligt den befintliga loggens gruppering. Alla inloggade rapportörer i gruppen kan läsa kommentaren under **Mina felrapporter**. Admin och godkända lärare kan också läsa den i lärar-/adminloggen. Kommentarer behandlas som vanlig text, inte HTML. En anonym rapport utan konto kan inte läsas från elevens kontohistorik.

Avslutade rapporter har samma textfält och knappen **Spara kommentar** för att lägga till, redigera eller ta bort återkoppling. Redigering ändrar inte beslutet, ger ingen ytterligare bonus och avslutar inte nya öppna rapporter på samma uppgift. Äldre logg-RPC:er som bara lämnar `atgardad` kompletteras med explicit status från granskningen eller admin-auditen. Saknad eller motstridig information visas som **Avslutad**. Den får aldrig felaktigt märkas som Åtgärdad.

## Installation i Supabase

**Om funktionen redan är installerad men sparandet ger 42702 eller avvisar tom
kommentar:** kör hela `sql/2026-10-09-felrapport-sparfix.sql` i Supabase SQL Editor.
Den ersätter bara sparfunktionen och bevarar befintliga rapporter och återkoppling.
Den rättar namnkonflikten mellan SQL-variabeln `kommentar` och tabellens kolumn
`kommentar`. Variablerna har nu egna namn med prefixet `v_`. Samma fix finns
i grundinstallationen nedan.

Kör hela `sql/2026-10-09-felrapport-kommentar.sql` i Supabase → SQL Editor. Filen kan köras om och kräver den befintliga felrapporttabellen och funktionerna som identifierar admin/godkända lärare. Den uppdaterade filen måste köras igen även om den tidigare versionen redan installerats, eftersom tomma kommentarer nu ska tillåtas. Den lägger till kommentarsfält och RPC:er för granskning, elevens egna rapporter och lärarloggens återkoppling. Befintliga rapporter bedöms inte automatiskt.

Appen behöver SQL-tillägget för att spara granskningar med kommentarer. Innan installationen visas ett tydligt fel vid sparande och formulärtexten behålls. Den vanliga felloggen kan fortfarande läsas. Vi gör inte en separat äldre statusändring som riskerar att avsluta rapporten utan att kommentaren sparas.

Ingen Supabase-installation eller elevkontakt har genomförts från utvecklingsmiljön. SQL-filen är testad lokalt med PostgreSQL/PGlite. Bonusreglerna bygger fortfarande på `atgardad=true` och `ignorerad IS NOT TRUE`. Elevvyn läser endast rapporter vars `anvandare` är det inloggade kontot. RPC:erna har uttryckliga behörighetskontroller och tillåter inte självregistrerade, ej godkända lärarprofiler att granska.

## Verifiering

- `node --test tools/*.test.js`: 92 tester passerade vid senaste appgranskningen.
- `node tools/felrapport-kommentar.integration.js [sökväg till @electric-sql/pglite]`: 60 databaskontroller passerar. Testtabellen innehåller nu även rapportörens ursprungliga `kommentar`-kolumn, som saknades i det tidigare testet. Det återskapar båda rapporterade felen med den gamla funktionen och installerar sedan fixfilen. Kontroller omfattar båda statusarna med null, tom text, blanksteg och vanlig kommentar, bevarad ursprunglig rapporttext, verkliga databasroller, kontoavgränsning, ny rapport efter äldre granskning, bevarade beslut/bonusgränser och återställning när audit-synk misslyckas.
- `python tools/felrapport-kommentar.browser.py`: sparande/redigering, valfri kommentar, bevarade utkast, samtidiga sparningar, förnyad inloggning, saknad migration, dubbelklick, textinjektion, elevens kontomeny och utloggning kontrolleras. Rapportrader och elevvy visas vid 390 och 1174 bildpunkter. Ingen verklig rapport eller XP ändras; backend-anropen är mockade.
- `python tools/felrapport-status.browser.py`: tidigare statusseparation, loggexport och mobil-/datorvisning passerar med det nya flödet.
