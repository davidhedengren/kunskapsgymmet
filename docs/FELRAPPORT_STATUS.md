# Felrapporternas status och återkoppling

**Åtgärdad** betyder att ett fel faktiskt har rättats. **Granskad – inget fel** betyder att uppgiften var korrekt; den statusen ger ingen felrapportsbonus. Statusarna visas i lärar-/adminvyn, loggexporten och elevens **Mina felrapporter** i kontomenyn.

När granskaren väljer någon av de två statusarna öppnas ett formulär med **Kommentar till den som rapporterat**. Kommentaren ska vara 1–1000 tecken och förklara bedömningen. **Spara granskning** sparar kommentar och status tillsammans. **Avbryt** gör ingen ändring. Ett misslyckat serveranrop behåller texten och visar ett felmeddelande; rapporten avslutas inte lokalt som om sparandet hade lyckats.

Kommentaren gäller de öppna rapporter på samma kurs och uppgifts-ID som omfattas av granskningen, enligt den befintliga loggens gruppering. Alla inloggade rapportörer i gruppen kan läsa kommentaren under **Mina felrapporter**. Admin och godkända lärare kan också läsa den i lärar-/adminloggen. Kommentarer behandlas som vanlig text, inte HTML. En anonym rapport utan konto kan inte läsas från elevens kontohistorik.

Avslutade rapporter har knappen **Kommentera** för att lägga till eller redigera återkoppling. Redigering ändrar inte beslutet, ger ingen ytterligare bonus och avslutar inte nya öppna rapporter på samma uppgift. Äldre logg-RPC:er som bara lämnar `atgardad` kompletteras med explicit status från granskningen eller admin-auditen. Saknad eller motstridig information visas som **Avslutad**. Den får aldrig felaktigt märkas som Åtgärdad.

## Installation i Supabase

Kör hela `sql/2026-10-09-felrapport-kommentar.sql` i Supabase → SQL Editor. Filen kan köras om och kräver den befintliga felrapporttabellen och funktionerna som identifierar admin/godkända lärare. Den lägger till kommentarsfält och RPC:er för granskning, elevens egna rapporter och lärarloggens återkoppling. Befintliga rapporter bedöms inte automatiskt.

Appen behöver SQL-tillägget för att spara granskningar med kommentarer. Innan installationen visas ett tydligt fel vid sparande och formulärtexten behålls. Den vanliga felloggen kan fortfarande läsas. Vi gör inte en separat äldre statusändring som riskerar att avsluta rapporten utan att kommentaren sparas.

Ingen Supabase-installation eller elevkontakt har genomförts från utvecklingsmiljön. SQL-filen är testad lokalt med PostgreSQL/PGlite. Bonusreglerna bygger fortfarande på `atgardad=true` och `ignorerad IS NOT TRUE`. Elevvyn läser endast rapporter vars `anvandare` är det inloggade kontot. RPC:erna har uttryckliga behörighetskontroller och tillåter inte självregistrerade, ej godkända lärarprofiler att granska.

## Verifiering

- `node --test tools/*.test.js`: 90 tester passerar.
- `node tools/felrapport-kommentar.integration.js [sökväg till @electric-sql/pglite]`: 39 databaskontroller passerar, inklusive verkliga databasroller, kontoavgränsning, ny rapport efter äldre granskning, bevarade beslut/bonusgränser och återställning när audit-synk misslyckas.
- `python tools/felrapport-kommentar.browser.py`: sparande/redigering, avbryt, tom kommentar, saknad migration, dubbelklick, textinjektion, elevens kontomeny och utloggning kontrolleras. Formulär och elevvy visas vid 390 och 1174 bildpunkter. Ingen verklig rapport eller XP ändras; backend-anropen är mockade.
- `python tools/felrapport-status.browser.py`: tidigare statusseparation, loggexport och mobil-/datorvisning passerar med det nya formuläret.
