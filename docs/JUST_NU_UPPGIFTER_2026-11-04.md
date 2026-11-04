# Just nu: antal besvarade uppgifter i dag

Lärarens gruppflik **Just nu** visar nu kolumnen **Uppgifter i dag** bredvid elevens status. Antalet omfattar både rätta och felaktiga svar i alla kurser under det svenska kalenderdygnet. Det är godkända profilförsök från `kg_private.xp_dag`, samma beständiga räkning som topplistan använder. Repetition utan nytt registrerat försök ger inget nytt antal. Det är inte en räknare som nollställs när läraren öppnar vyn.

Antalet uppdateras med fokusstatus var åttonde sekund. Offline-elever visar fortfarande dagens antal, och 0 visas som 0. Om den nya databaskolumnen i RPC-svaret saknas visas ett streck och en text om att funktionen behöver aktiveras. Nätverksfel behåller föregående data med befintlig felnotis. Mobil visar uppgiftsantalet; gruppens flikrad får egen horisontell scroll.

## Aktivering

Kör hela `sql/2026-11-04-fokus-uppgifter.sql` i Supabase SQL Editor. Den kräver den befintliga fokusmigreringen och dygnsbokföringen. Den ersätter endast `kg_lar_fokus`, är omkörbar och ändrar inga elevresultat eller poäng. Läraren måste fortfarande ha behörighet till gruppen; elever/anonyma får inte läsa, och direktåtkomst till privata tabeller öppnas inte.

SQL-filen är lokalt testad men **inte körd mot produktionsdatabasen**. Klienten kan publiceras före SQL utan att felaktigt visa nollor.

## Verifiering

- 17 kontroller i lokal PostgreSQL/PGlite: bara dagens differens, noll och saknad dagsrad, uppdaterade antal, offline/fokusstatus, inga andra gruppers elever, nekad elev/obehörig lärare/anon, adminåtkomst, tom grupp, omkörning och inga nya tabellrättigheter.
- Riktig app med påhittade RPC-svar: antal/0/streck, uppdatering, nätverksfel, äldre SQL samt 1440/390/320 px utan sidöverflöde. Ingen produktionsåtkomst eller skrivning i browserprovet.
- Tester: `tools/fokus-uppgifter-2026-11-04.integration.js` och `tools/fokus-uppgifter-2026-11-04.browser.py`.
