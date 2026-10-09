# Ändra en felregistrerad lärarprofil till elevkonto

Aktivera funktionen genom att köra hela `sql/2026-10-09-larare-till-elev.sql` i Supabase → SQL Editor och sedan ladda om Kunskapsgymmet. Migrationerna för lärarprofiler och elevskola från 2026-10-04 och 2026-10-05 måste redan vara installerade.

Öppna **Administration → Lärare** och välj **Gör till elev** vid kontot. Det fungerar även för en avstängd lärarprofil. Bekräfta sedan bytet.

Kontot och all träning bevaras. Kontot försvinner från lärarlistan och får elevrollen. Befintlig elevskola och vanlig elevklass behålls; annars följer lärarprofilens skola med. Lärarkopplingar till grupper och eventuell lärarklass tas bort. Grupper, andra lärare, elevmedlemskap, träningspass och passresultat bevaras.

Databasen tar bort läraråtkomsten direkt. En redan inloggad användares gränssnitt uppdateras vid nästa närvarokontroll, normalt inom 45 sekunder på en synlig sida, eller vid omladdning. Eleven kan inte välja lärarrollen igen. Administratörens eget konto och separat godkända lärarkonton kan inte ändras med denna funktion.

## Kontroller

- `node --test tools/*.test.js`: 72 godkända tester, inklusive rollbytesfel, dubbelklick, kontobyte och uppdaterad elevvy.
- `python tools/admin-elevroll.browser.py`: riktiga knappar, bekräftelse, RPC-anrop och vyuppdatering prövas mot testdata på dator och mobil. Alla RPC-anrop fångas; inga produktionskonton ändras.
- `node tools/admin-elevroll.integration.js [sökväg till @electric-sql/pglite]`: 39 kontroller i isolerad PostgreSQL. Testet kör den nya migrationen två gånger och kontrollerar behörigheter, bevarade resultat, skolor, grupper, klasser och spärr mot självregistrering. Det använder en liten testmodell av de befintliga tabellerna och behörighetsfunktionerna.

SQL-testet kräver `@electric-sql/pglite`. I molnmiljön verifierades det med:

```sh
npm install --prefix /tmp/kg-admin-elev-tests --cache /tmp/kg-admin-npm-cache --no-audit --no-fund @electric-sql/pglite
node tools/admin-elevroll.integration.js /tmp/kg-admin-elev-tests/node_modules/@electric-sql/pglite
```

Ingen produktionsanslutning eller databasbehörighet finns i den här molnsessionen. Migrationen har därför verifierats lokalt men måste köras i Supabase för att funktionen ska bli aktiv på webbplatsen.
