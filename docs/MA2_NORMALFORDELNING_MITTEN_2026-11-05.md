# Ma2 – mittersta värden och antal i GeoGebra, 5 november 2026

Fem uppgifter frågade efter ett intervall som innehåller en viss andel, utan att ange var intervallet ska ligga. Det finns flera möjliga sådana intervall. Frågorna söker nu de mittersta värdena, vilket ger lika stora ytterområden. Facit visar hur gränserna läses av med vänsterareor i GeoGebras sannolikhetskalkylator. Tidigare heltalssvar bevaras och toleransen tillåter även GeoGebras mer precisa gränser. GeoGebra och miniräknare tillåts.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.38 | Åtgärdad | De mittersta 95,4 % ger vänsterareorna 0,023 och 0,977. Gränserna är cirka 30 och 50 cm. |
| 4.176 | Åtgärdad | De mittersta 95,4 % ger vänsterareorna 0,023 och 0,977. Temperaturgränserna är cirka 22 och 38 °C. |
| 4.177 | Åtgärdad | De mittersta 68 % lämnar 16 % på varje sida. Gränserna är cirka 64 och 76 min. |
| 4.216 | Åtgärdad | De mittersta 95,4 % ger cirka 80 och 120 g. GeoGebras mer precisa gränser godtas också. |
| 4.231 | Åtgärdad | De mittersta 68,2 % lämnar 15,9 % på varje sida. Gränserna är cirka 53 och 67 g. |
| 4.44 | Åtgärdad | GeoGebra ger andelen cirka 0,8186. Det ger cirka 654,9 av 800, alltså 655 kattungar. Ett tidigare avrundningssteg har rättats. |

## Kontroll och tidigare beslut

Den tidigare beräkningen i 4.44 skrev 0,818·800 = 654,4 och avrundade felaktigt detta till 655. GeoGebras mer precisa andel är cirka 0,818595 och ger cirka 654,876, vilket avrundas till 655. Kontexten och svarsenheten kattungar bevaras enligt MA2_NORMALFORDELNING_2026-10-22.md. Frågan ber nu uttryckligen om GeoGebra, vilket användaren har önskat för statistikfacit.

För de fem mittintervallen är ursprungliga svar och ordning bevarade. Toleransen är 0,1 per gräns eftersom de angivna 68 %, 68,2 % och 95,4 % är avrundade; både ursprungliga heltalsgränser och GeoGebras gränser godtas. Inga nivåer eller självrättningsflaggor har ändrats. Rättningsmotorn har testats med båda svarstyperna samt felaktiga gränser.

Alla sex facit renderades i 390 px med båda apparnas CSS utan KaTeX-fel eller överströmmande formler. Bankvalideringen har samma 86 tidigare fynd. Tidigare tester för statistikens sammanhang och självständiga delkort passerar. Test: `tools/ma2-normalfordelning-mitten-2026-11-05.test.js`. Inga rapportstatusar eller kommentarer har skickats i appen. Den breda statistikgranskningen återstår.
