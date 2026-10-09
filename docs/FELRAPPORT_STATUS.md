# Granskad – inget fel

Felrapporteringens befintliga status `ignorerad` betyder enligt den tidigare knappens beskrivning att uppgiften inte var fel. Den visas nu som **Granskad – inget fel**, i stället för Ignorera/Ignorerad, i åtgärdsknappen, bekräftelsen, administrationens status och statusfilter. Åtgärdad finns kvar för uppgifter som faktiskt har rättats.

Lärarloggens knapp heter **Visa avslutade**, eftersom den kan innehålla båda typerna. Avslutade rader visar status. Kopierad och nedladdad logg innehåller också status. Äldre logg-RPC:er som enbart lämnar `atgardad` kan inte skilja rättat från avslutat utan fel. För admin kompletteras då status från den befintliga admin-auditen, när den ger ett entydigt svar. Saknad eller motstridig information visas neutralt som **Avslutad**; den får aldrig felaktigt märkas Åtgärdad. Öppna nya rapporter påverkas inte av tidigare avslutningar.

Befintliga RPC:er, statuskoder, behörigheter och bonusregler behålls. Ingen Supabase-migration behövs. Granskad utan fel anropar inte belöningsfunktionen. Äldre ignorerade rapporter får den tydligare benämningen där statusen är känd. Ingen automatisk bedömning eller stängning av rapporter sker.

Detta ändrar lärar-/adminvyn och loggexporten. Det tillför inte ett nytt elevmeddelande eller lagring av en fri motivering. Sådan återkoppling kräver en separat databasfunktion; vi presenterar inte lokal text som ett sparat besked till eleven.

Verifierat med `tools/felrapport-status.test.js` och `tools/felrapport-status.browser.py`: statusseparation, auditfallback, avbruten åtgärd, korrekta RPC-anrop utan belöning, export samt mobil- och datorvisning. Webbläsartesterna använder mockade rapporter och skriver inte till Supabase.
