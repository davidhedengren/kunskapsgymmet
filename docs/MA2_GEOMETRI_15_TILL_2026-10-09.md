# Ytterligare 15 geometriproblem – 2026-10-09

Ma2, Geometri → Problemlösning, spår 2b/2c: 3.540–3.554 har lagts till. Området innehåller nu 30 uppgifter. Befintliga uppgifter är oförändrade. Varje ny uppgift har en egen figur, ledtråd, förklarande lösning och självrättning. Lösningarna använder korta resonemang och beräkningar utan numrerade steglistor.

| ID | Innehåll | Nivå | Svar |
|---|---|---:|---|
| 3.540 | Avstånd från cirkelcentrum till korda | 2 | 5 cm |
| 3.541 | Skärande kordor, hela kordans längd | 2 | 10 cm |
| 3.542 | Bisektris och deltriangelns area | 3 | 39 cm² |
| 3.543 | Rektangel inskriven i en cirkel | 2 | 120 cm² |
| 3.544 | Höjd, likformighet och cirkelradie | 4 | 12,5 cm |
| 3.545 | Tangent, radie och likbent triangel | 2 | 55° |
| 3.546 | Parallelltransversal och kvarvarande area | 2 | 32 cm² |
| 3.547 | Trapets, hjälplinje och Pythagoras | 3 | 88 cm² |
| 3.548 | Rombens diagonaler och area | 3 | 96 cm² |
| 3.549 | Median och lika stora areor | 1 | 18 cm² |
| 3.550 | Inskriven cirkel i rätvinklig triangel | 4 | 3 cm |
| 3.551 | Koordinater, mittpunkter och area | 3 | 18 areaenheter |
| 3.552 | Två bisektriser och vinkelsumma | 2 | 120° |
| 3.553 | Kvadrat och två cirklars areaförhållande | 3 | 2 |
| 3.554 | Bisektrissatsen och likformighet | 4 | 7,2 cm |

Nivå 1 kräver en direkt geometrisk observation. Nivå 2 kombinerar välkända samband. De mer självständiga kombinationsproblemen ligger på nivå 3–4. Uppgifterna varierar både sökt storhet och lösningsmetod; de är inte talbyten av en gemensam mall.

## Figurer

Alla 15 figurer har granskats visuellt och deras faktiska koordinater har jämförts med givna längder, vinklar, mittpunkter, parallellitet och tangering. Måttlinjer skiljer hela sträckor från delsträckor. Vinkelbågar ligger mellan de avsedda strålarna. Inga beräknade svar skrivs in i figurerna.

SVG-verktyget lämnar två heuristiska varningar för 3.545: vid A väljer det fel av tre mötande strålar, och det förväntar sig en numerisk gradetikett där uppgiften använder x. Dessa är manuellt kontrollerade falsklarm. Ett separat koordinattest kontrollerar att x-bågens båda ändpunkter ligger på AB respektive AT, att dess radie är 50 bildpunkter och att vinkeln är 55°. Övriga 14 figurer saknar SVG-fynd.

## Verifiering

- 194 automatiska tester i Uppgiftslabbet passerar, inklusive fem nya tester av oberoende svarberäkningar och SVG-geometri.
- 86 tester i Kunskapsgymmet passerar.
- Hela problemlösningsområdet: 178 kontroller av faktisk självrättning, 30 försök via svarsknappen för de nya uppgifterna och 60 kortvisningar i mobil-/datorbredd passerar.
- Rätt spår och lärarvyns områdesantal har kontrollerats. Inga KaTeX-fel, överskjutande formler eller sidöverflöden i dessa visningar.
- Ma2:s bankvalidator är oförändrad: 4 ERROR, 173 WARNING, 95 INFO. Inga nya fynd. De tidigare felen i 2.636/2.637 ingår inte i denna ändring.
- Samma bankfiler i båda repona; uppdaterad bankversion i Kunskapsgymmet.

Reproducerbara kontroller finns i `tools/ma2-problemlosning-15-till.test.js`, `tools/ma2-problemlosning.test.js` och `tools/ma2-problemlosning.browser.py`.
