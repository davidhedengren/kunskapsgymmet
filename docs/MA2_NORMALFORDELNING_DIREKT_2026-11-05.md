# Ma2 – normalfördelning utan att prova sig fram, 5 november 2026

Användaren efterfrågar facit som går att följa i GeoGebra utan att justera en okänd parameter om och om igen. Använd därför en jämförelsefördelning med kända parametrar: läs av en gräns direkt från en angiven vänsterarea och överför avståndet från medelvärdet till den sökta fördelningen. Säg uttryckligen att det tillfälliga värdet är ett hjälpmedel, inte den verkliga parametern. Visa även den efterföljande beräkningen.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.13 | Åtgärdad | Medelvärdet är mittpunkten 50. GeoGebra används med tillfällig σ = 1 för att läsa av hur långt 90:e percentilen ligger över medelvärdet; därefter beräknas σ ≈ 6,24 min. Båda delkorten är självständiga. |
| 4.104 | Åtgärdad | Med tillfälligt μ = 0 och given σ = 12 visar GeoGebra avståndet från medelvärdet till 80:e percentilen. Dra av avståndet från 74 för att få cirka 63,9. |
| 4.287 | Åtgärdad | GeoGebra ger direkt gränserna för vänsterareorna 0,05 och 0,99 i en fördelning med μ = 0 och σ = 1. Facit visar sedan ekvationssystemet och svaren. |
| 4.260 | Åtgärdad | GeoGebra används för att bestämma faktorn vid vänsterarea 0,84. Standardavvikelsen blir cirka 20,1 g, vilket också kan avrundas till 20 g. |
| 4.263 | Åtgärdad | Facit visar hur de två vänsterareorna avläses i GeoGebra och ger ett ekvationssystem. Svaren är cirka 510 g och 10 g. |
| 4.2046 | Åtgärdad | GeoGebra ger en gräns cirka 2,014 standardavvikelser under medelvärdet. Den angivna andelen ger cirka 6,95 poäng, ungefär 7. |
| 4.72 och 4.87 | Åtgärdade följdfel | De fristående korten för övre gränsen säger åter uttryckligen vilket intervall som avses, samtidigt som andelarna utanför beskrivs begripligt. Detta återställer ett äldre regressionstest utan att ta bort den förtydligade frågan. |

## Avrundning och svar

4.260:s tidigare nyckel 20 var beräknad med 16 % ≈ 15,87 %. Med exakt 0,84 i GeoGebra fås σ ≈ 20,11146. Nyckeln är ändrad till detta värde med tolerans 0,05 och frågan anger ungefär. Rättningsmotorn är testad med 20, 20,1 och 20,11 g.

4.2046:s 2,2 % ger cirka 6,951 om andelen används direkt. Det äldre svaret 7 behålls men toleransen 0,1 godtar även 6,95. I 4.263 ger de avrundade andelarna cirka 510,004 och 9,998; toleransen 0,02 godtar dessa och de tidigare avrundade svaren 510 och 10. Ändringarna ersätter inte skillnaden mellan populationsparametern σ och stickprovsmåttet Sx.

Övriga svar, nivåer och självrättningsflaggor är bevarade. GeoGebra och miniräknare är nu tillåtna där metoden används. Normalfördelningens faktorer har oberoende kontrollerats med statistisk inversfördelning. Alla 15 berörda huvud-/delfacit renderades i 390 px med båda apparnas CSS utan formlers överströmning eller KaTeX-fel. Tidigare tester för fristående delkort och normalfördelningssammanhang passerar. Rättningskontroll: `tools/ma2-normalfordelning-direkt-rattning-2026-11-05.test.js` i Kunskapsgymmet; bankkontroll: `tools/ma2-normalfordelning-direkt-2026-11-05.test.js`.

Inga statusar eller kommentarer har skickats i appen. Fler normalfördelnings- och statistikfacit återstår att granska.
