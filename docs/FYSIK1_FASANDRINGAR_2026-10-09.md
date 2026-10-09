# Fysik 1: fasändringar – 2026-10-09

Alla 103 huvuduppgifter om fasändringar i kapitel 7 har granskats manuellt i två omgångar. Granskningen omfattar frågetexter, facit, ledtrådar, beräkningar, nivåer och de 124 fristående spelkorten. Samma uppgifts-ID:n och samma antal uppgifter finns kvar.

## Språk, pedagogik och nivåer

Frågorna säger direkt vad eleven ska bestämma. Tekniska inledningar har kortats. Materialdata och fysikaliska villkor som behövs för lösningen finns kvar. Deluppgifter står på egna rader, och varje spelkort innehåller de uppgifter som behövs för att lösa just det kortet.

Alla 103 facit har reviderats. Lösningarna visar relevanta temperaturändringar, energier vid uppvärmning och fasändring samt energibalansen där den behövs. Mellanberäkningar används utan för tidig avrundning. Numrerade stegmallslistor används inte. Formler har fått radbrytningar där de annars skulle bli för breda på mobil.

27 huvuduppgifter och 18 delkort har fått ändrad träningsnivå. Delkort bedöms efter sin egen fråga. Antalet spelkort på nivå 1 ökar från 19 till 27 och på nivå 2 från 35 till 41. Flertalet direkta beräkningar med en fasändringsformel ligger på nivå 1–2. Energibalanser, flera temperaturintervall och mer krävande resonemang ligger högre.

## Fysik och variation

- **7.224b:** vatten som förångas vid normalt tryck kan inte samtidigt kyla silvret till 20 °C. Silver kyls nu till 100 °C. Vattnet värms från 10 °C till 100 °C och förångas. Energibalansen ger cirka 0,0065 kg vatten. Fristående delkort innehåller samtliga materialdata.
- **7.118:** facit skiljer mellan is som smälter helt, en blandning av is och vatten vid 0 °C samt tillräckligt mycket kall is för att frysa allt vatten och ge en temperatur under 0 °C. Det tidigare alltför generella påståendet om 0 °C har rättats.
- **7.120 och 7.48:** slutsatser om mätfel och värmeförluster har korrigerats. Ett avvikande mätvärde räcker inte för att entydigt bestämma felorsaken.
- **7.23:** isbitens massa beräknas med densiteten innan energin bestäms. Facit visar uppvärmning och smältning var för sig.
- **7.198b och 7.212:** återstående tid, uppvärmningsenergi och förångningsenergi visas tydligt. Mikrovågsuppgiften skiljer på energin som når vattnet och apparatens elektriska effekt.
- **7.129, 7.130, 7.135 och 7.136:** begreppsfrågor har riktiga textalternativ med återkoppling, i stället för att eleven ska skriva en sifferkod.
- **7.132, 7.133, 7.94 och 7.104:** fyra uppgifter har varierats. De tränar energi per kilogram, antal isbitar, energin vid frysning respektive mängden flytande vatten som finns kvar. Övriga uppgifter har jämförts efter innehåll och lösningsidé, inte enbart efter siffror.

## Självrättning och figurer

Numeriska facit följer fysikrelationerna med oavrundade värden. Toleranser följer den efterfrågade avrundningen, och både korrekta exakta värden och korrekta avrundade svar har prövats med Kunskapsgymmets riktiga rättningsfunktion. Avsiktligt felaktiga värden och fel tecken har också prövats.

Alla nio huvudfigurer i området har granskats visuellt. Diagrammet i 7.52 har ritats om med tydligare axlar och större text. Temperaturplatåer och energiintervall stämmer med facit. Faktiska elevkort har granskats i mobil- och datorbredd; alla uppgifter och spelkort har dessutom mätts i mobilgränssnittet med laddade typsnitt.

## Verifiering

- 86 självständigt uppställda numeriska modeller kontrollerar 115 svarsfält i sju nya kontraktstester.
- Uppgiftslabbet: 176 automatiska tester och 47 separata SVG-tester passerar. SVG-testerna kördes med riktig Chromium via Playwright eftersom miljön blockerar öppning av lokala file://-adresser; samma genererade analys-HTML och samma testassertioner användes.
- Kunskapsgymmet: 80 automatiska tester passerar.
- Fasändringar i det riktiga elevgränssnittet: 575 numeriska rättningskontroller och 32 kontroller av svarsalternativ passerar.
- 227 visningar av huvuduppgifter och spelkort i mobilbredd: inga för breda lösningsformler och inga sidöverskridningar.
- Hela Fysik 1: 4 985 spelkort och 32 756 rättningskontroller utan fel i de prövade svaren.
- Hela Fysik 1-bankens matematik renderas utan KaTeX-fel i båda apparna.
- Teknisk bankgranskning: noll ERROR och inga nya fynd. Åtta befintliga varningar om likadana rörelseuppgifter i kapitel 3 kvarstår utanför denna revision.
- Alla sju delade bankfiler är identiska mellan repona. Kunskapsgymmets bankversion har höjts så att den nya banken laddas.

Detta är en full manuell genomgång av fasändringsområdet. De automatiska kontrollerna av hela Fysik 1 ersätter inte en manuell genomgång av senare kapitel och garanterar inte att inga andra fel återstår.

Exakta ändrade ID:n, fält och nivåer finns i [JSON-rapporten](FYSIK1_FASANDRINGAR_2026-10-09.json). Testerna finns i `tools/fysik1-fasandring.test.js` och `tools/fysik1-fasandring.browser.py` i Uppgiftslabbet.
