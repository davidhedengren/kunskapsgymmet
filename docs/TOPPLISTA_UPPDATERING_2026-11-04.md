# Topplista: färska resultat och avgränsad felsökning, 2026-11-04

Användaren rapporterade att dagens klasstopplista visade färre XP/uppgifter än elev-/klassvyn. Bilden visade 192 XP för VF26A.

## Vad som faktiskt verifierats

En anonym läsning av de publika RPC:erna visade vid kontrollen 402 XP för klassen. Klassens synliga elevrader stämde med den individuella topplistan för dag, vecka, månad och totalt. Ingen privat elevprofil, adminstatistik, token eller databasadministration har använts. Namn och kontodata sparas inte i denna logg.

Det finns ett avsiktligt tak per elev: 400 XP/dag, 2 000/vecka, 6 000/månad, 30 000 totalt. Klassens poäng summerar de begränsade bidragen, medan de utfällda elevraderna visar obegränsad period-XP. Topplistans XP inkluderar dessutom 100 per ny medalj. Elevprofilens grund-XP och totalantal kan därför inte jämföras direkt med dagens lista. Dessa regler har inte ändrats.

**En skillnad mellan dagens sparade elevresultat och topplistans dygnsbokföring är ännu inte belagd eller utesluten.** Ett exempel från samma elev och samma tidsperiod har efterfrågats. Antal försök i adminstatistik kan komma från en separat händelselogg; topplistan använder godkända profilvärden. Ingen historisk XP har räknats om eller skrivits till.

## Bekräftad visningsbrist och rättning

Topplistan hämtades bara när man öppnade eller bytte flik. En lista som stod öppen kunde därför fortsätta visa gamla resultat medan eleverna tränade.

- Manuell Uppdatera-knapp, senaste hämtningstid och automatisk uppdatering var 30:e sekund.
- Uppdatering när webbläsarfliken åter blir synlig; ingen pollning när den är dold eller när annan vy visas.
- Utfällda klasser och scrollposition bevaras. Öppna elevrader hämtas på nytt.
- Gamla svar från en annan period eller en tidigare stängd klass får inte skriva över den aktuella vyn.
- Vid uppdateringsfel behålls senast hämtade data med tydlig text om att uppdateringen misslyckades.
- Oförändrade XP-regler, databasfunktioner, behörigheter och profilskrivningar.

## Kontroll

`tools/topplista-uppdatering-2026-11-04.browser.py` kör den riktiga sidan med lokala påhittade RPC-resultat. Verifierar manuell/automatisk uppdatering, öppna klasser, byte av period under väntande svar, stängning under uppdatering, nätverksfel, pausad pollning, individuell lista och 390 px mobil. Noll JavaScript-fel och noll profil-/statistikskrivningar. Inline-JavaScript och git diff-kontroll passerar.

`sql/diagnostik/2026-11-04-topplista-vf26a.sql` är en valfri **läsfråga**, ingen migration. Den jämför godkänd profil, dagens bokföring, tillgänglig försökshistorik, tidigare avvisade sparningar och triggerstatus. Den har inte körts mot privata produktionsdata. Inga slutsatser om enskilda elevers förlorade resultat kan dras utan det underlaget.

## Återkoppling från användaren

Användaren bedömde därefter att poängräkningen fungerar som den ska och bad oss återgå till facitgranskningen. Ingen ytterligare privat felsökning eller poängkorrigering görs.
