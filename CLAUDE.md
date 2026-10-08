# Kunskapsgymmet – instruktioner för Claude

Regelverket för detta repo finns i Uppgiftslabbet. Läs det **innan** du ändrar något här:

- lokalt: `C:\Users\Hedav\code\Uppgiftslabbet\CLAUDE.md` och `C:\Users\Hedav\code\Uppgiftslabbet\agent\*.md`
- på GitHub: https://github.com/davidhedengren/Uppgiftslabbet/tree/main/agent

## Kärnregler

- De sju uppgiftsbankerna (`uppgifter.js`, `uppgifter2.js`, `uppgifterma1.js`, `uppgifterma2.js`, `uppgiftermatf1.js`, `uppgiftermato1.js`, `uppgiftermato2.js`) har **Uppgiftslabbet som master**.
  - Redigera dem aldrig direkt här.
  - Ändra i Uppgiftslabbet och synka sedan enligt `agent/GIT_OCH_BACKUP.md`.
  - Innan en synk ska du kontrollera att Kunskapsgymmets kopia inte har unika ändringar som saknas i master.
- Övriga filer är Kunskapsgymmets egna: `index.html`, `typuppgifter-*.js`, `uppgifterhist.js`, `strukturhist.js` och `struktur*.js`. Strukturfilerna har egna `GRUPP*`-rader som ska bevaras vid synk.
- Varje kort som skapas med `spelDelning:"deluppgifter"` ska vara självbärande. Det får inte ha någon facitläcka mellan delar och får inte hänvisa till osynliga delar. Se `agent/INNEHALLSREGLER.md` i Uppgiftslabbet.
- Fysikkort på träningsnivå 1–2 ska bara visa tal och materialdata som behövs för just den frågan. Ange nödvändiga mellanresultat direkt med tillräcklig precision, och låt delens facit använda dem. Behåll nödvändiga villkor, riktning och nollnivå. Kontrollera frågans svarsenhet mot `svarEnhet` i det faktiskt visade delkortet.
- Kör `git status` och `git fetch` före redigering. Använd aldrig force push. Gör ingen commit eller push utan användarens godkännande.

## Felrapporter, kursmappning och pågående arbete

Rutinen för att åtgärda felrapporter, formuleringar att undvika, kursmappning (mato1 = Ma3c osv.), planeringarnas plats och moment/delmoment-omstruktureringen står i `C:\Users\Hedav\code\Uppgiftslabbet\CLAUDE.md` (avsnitten "Felrapporter från Kunskapsgymmet", "Kurser och planeringar", "Pågående omstrukturering"). Läs dem först.
