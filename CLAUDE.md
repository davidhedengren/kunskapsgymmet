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

## Tidigare beslut

Läs även `AGENTS.md` och Uppgiftslabbets `agent/FELMONSTER_OCH_BESLUT.md`.
Sök berörda uppgifts-ID:n i tidigare granskningar och kör deras regressionstester.
En ändring av ett tidigare beslut ska ha en ny dokumenterad motivering.

## Figurer vid konstruktion och omarbetning

Användarbeslut 2026-10-13: vid nya eller omarbetade uppgifter ska du alltid sträva efter att ha med en figur, om det är möjligt. Följ masterrepots `CLAUDE.md`, avsnittet ”Figurer vid konstruktion och omarbetning”. Egna SVG-figurer ska hjälpa eleven att förstå situationen och ha tydliga, korrekt placerade beteckningar, sträckor, vinklar, enheter och pilar. Kontrollera modell, geometri och visning på mobil/dator. Varje separat kort behöver sin relevanta figur. Dokumentera kort när en figur inte bidrar till uppgiften.

## Statistik: standardavvikelse

Användarbeslut 2026-10-14: rådataberäkningar använder Sx med n−1, även för frekvenstabeller och histogram. Följ masterrepots `agent/PEDAGOGISKA_REGLER.md`, avsnittet ”Statistik: Sx som räkningsstandard”. Fråga, facit, delkort och maskinsvar ska följa samma mått. Givna normalfördelningsparametrar σ behålls. Återställ inte FP28–29:s historiska σx-facit.

## Verktyg: senaste användarbeslutet 2026-10-14

Vid alla analyser, rättningar och nya/omarbetade uppgifter ska miniräknare och GeoGebra kontrolleras. Läs masterrepots `agent/PEDAGOGISKA_REGLER.md`, ”Verktygsval i varje granskning”. Tillåt miniräknare för beräkningar som inte görs snabbt i huvudet, såsom stora multiplikationer och numerisk trigonometri; neka bara när verktyget tar bort det som faktiskt prövas. Vi testar normalt inte huvudräkning eller aritmetiska handalgoritmer. Tillåt GeoGebra för digital grafanalys/ritning, statistik, regression och avancerade numeriska/symboliska beräkningar när digitala verktyg behövs. **GeoGebra innebär alltid också tillåten miniräknare.** Detta ersätter den tidigare miniräknarspärren för Sx-kort. Kontrollera huvuduppgift och delkort separat, och dokumentera beslut/undantag tillsammans med nivå, facit och självrättning.
