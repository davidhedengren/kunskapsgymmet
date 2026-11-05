# Ma2 – gränser och fyllningsmodeller, 5 november 2026

Fem uppgifter har granskats och fått förklaringar med GeoGebra. Samtliga tillåter GeoGebra och miniräknare. Ingen lämnades som granskad – inget fel.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.256 | Åtgärdad | Facit jämför intervallets gränser med en standardnormalfördelning och visar att standardavvikelsen är ungefär 6 km/h. Även precisare svar godtas. |
| 4.257 | Åtgärdad | Facit visar en intervallberäkning i GeoGebra och använder symmetrin för att välja det mindre medelvärdet cirka 5,90 mm. Frågan anger att svaret är ungefärligt. |
| 4.261 | Åtgärdad | Den angivna gränsen 2,3 % ger medelvärdet cirka 257,98 g. Både det och den tidigare avrundningen 258 g godtas. |
| 4.285 a–c | Åtgärdad | Hela lösningen använder nu den angivna andelen 0,13 %: medelvärdet cirka 504,05 g, ungefär 429 färre påsar och cirka 80,9 kg extra mjöl. Tidigare rimligt avrundade svar godtas också. |
| 4.286 | Åtgärdad | Facit visar hur GeoGebra ger respektive underkända andel och varför dessa måste vägas med maskinernas olika produktionsantal. |

Tidigare facit för 4.261 och 4.285 behandlade avrundade standardandelar som exakta. För 4.261 har rättningsmålet ändrats till 257,981573… med tolerans 0,05, som också godtar 258. För 4.285 är målen 504,045815…, 429,0026… och 80,9163…; toleranserna 0,5, 2 och 1 godtar även tidigare 504, 428 och 80. 4.256 behåller målet 6 men toleransen 0,05 godtar den precisare lösningen cirka 6,002. Svaren har testats i Kunskapsgymmets rättningsmotor, inklusive tydligt felaktiga värden. Frågorna 4.257 och 4.261 betonar nu att gränserna efterfrågas ungefärligt.

Oberoende numerisk kontroll finns i `tools/ma2-normalfordelning-fyllning-2026-11-05.test.js`. Relevanta tidigare regressioner passerar. Fem facit har renderats i mobilbredd med båda apparnas CSS. Ingen rapportstatus har ändrats. Statistikbanken är inte färdiggranskad.
