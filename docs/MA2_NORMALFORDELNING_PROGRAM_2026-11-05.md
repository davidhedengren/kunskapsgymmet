# Ma2 – programanknutna normalfördelningsuppgifter, 5 november 2026

Sex uppgifter har granskats och åtgärdats. De visar nu konkreta steg i GeoGebras sannolikhetskalkylator. Samtliga huvuduppgifter och delkort tillåter GeoGebra och miniräknare. Ingen lämnades som granskad – inget fel.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 5.17 a–c | Åtgärdad | Varje delkort visar hur sannolikhet, 90:e percentil och förväntat antal tas fram i GeoGebra. |
| 5.24 | Åtgärdad | Facit visar högerområdet över 15 000 kr och omvandlar sannolikheten till cirka 14,9 %. |
| 5.38 | Åtgärdad | Frågan anger nu de mittersta 95,4 %. GeoGebra ger cirka 8,01–19,99 minuter; även 8–20 godtas. |
| 5.48 | Åtgärdad | Frågan anger nu de mittersta 68,2 %. GeoGebra ger cirka 25,01–34,99 minuter; även 25–35 godtas. |
| 5.53 a–c och fyra delkort | Åtgärdad | Mittenintervallet är tydligt på båda gränskorten. Det tidigare otydliga kortet ”den övre gränsen” anger nu vilket intervall som avses. GeoGebra visar cirka 16,02–31,98 minuter. |
| 5.65 a–c och fem delkort | Åtgärdad | Båda mittenintervallen är entydiga och varje delkort visar sin egen avläsning; uppskattat antal utanför intervallet beräknas i GeoGebra. |

Svarsnycklarna är bevarade. För de tidigare heltals- eller avrundade intervallgränserna i 5.38, 5.48, 5.53 och 5.65 har tolerans 0,05 lagts till så att både gamla svar och GeoGebras precisare avläsningar godtas. Tidigare instruktion om formelbladets normalfördelningsfigur har ersatts av GeoGebra i 5.38/5.48 och facit i 5.53 c. Tidigare korrekta beslut om att σ är normalmodellens parameter, inte rådatamåttet Sx, bevaras.

Sannolikheter och percentiler har kontrollerats oberoende i `tools/ma2-normalfordelning-program-2026-11-05.test.js`; Kunskapsgymmets riktiga rättning och kortexpansion har testats med avrundade och precisare svar. Tidigare regressioner passerar. Alla 18 huvudfacit och delkort har renderats i mobilbredd med båda apparnas CSS. Ingen rapportstatus har ändrats. Statistikbanken är inte färdiggranskad.
