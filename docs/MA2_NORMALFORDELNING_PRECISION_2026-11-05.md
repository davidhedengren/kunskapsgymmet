# Ma2 – normalfördelning, precision och GeoGebra, 5 november 2026

Sju uppgifter har granskats och åtgärdats. De sex uppgifter som beräknar andelar eller gränser tillåter nu GeoGebra och miniräknare och har konkret arbetsgång i sannolikhetskalkylatorn. Ingen lämnades som granskad – inget fel.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.2042 | Åtgärdad | GeoGebra ger andelen cirka 0,6827, vilket motsvarar ungefär 1 707 av 2 500 ägg. |
| 4.2043 | Åtgärdad | GeoGebra ger gränserna cirka 165,28 och 192,72 cm. Även det tidigare avrundade intervallet 165–193 cm godtas. |
| 4.2044 | Åtgärdad | Andelen över gränsen är cirka 2,275 %, vilket ger ungefär 27 flaskor. Det tidigare ungefärliga svaret 26 godtas också. |
| 4.2047 | Åtgärdad | GeoGebra ger ungefär 84,0 % mellan de två gränserna; tidigare 83,9 % godtas. |
| 4.2049 | Åtgärdad | Facit visar hur sannolikheten 0,977 matas in och gränsen cirka 0,3298 s läses av. |
| 4.2050 | Åtgärdad | Facit jämför hur många standardavvikelser över respektive medelvärde eleverna ligger, utan att anta en percentil för en grupp vars fördelning inte anges. |
| 4.2051 | Åtgärdad | GeoGebra ger gränsen σ ≈ 4,965 g för 2,2 %. Vid 5 g blir andelen cirka 2,275 %. Eftersom frågan efterfrågar ett ungefärligt svar godtas även avrundningen 5 g. |

Tidigare beslut i `MA2_STATISTIK_S1_2026-10-25.md` använde avrundade tumregelandelar. Denna självständiga kontroll ersätter dem där de exakta angivna procentsatserna ger ett annat resultat. 4.2044:s rättningsmål är nu 27,300158… med tolerans 1,5; tidigare 26 och det precisare svaret accepteras. 4.2043 behåller 165 och 193 men toleransen 0,4 medger GeoGebras cirka 165,28/192,72. 4.2051:s tidigare mål 5 ersätts av 4,965019… och tolerans 0,05; 4,97 och 5 godtas. Testet `ma2-statistik-s1-2026-10-25.test.js` har uppdaterats för den matematiskt motiverade ändringen och kontrollerar fortsatt att 5 godtas.

Självrättningen har testats med korrekta avrundningar och felaktiga svar i Kunskapsgymmet. Oberoende numerisk kontroll finns i `tools/ma2-normalfordelning-precision-2026-11-05.test.js`. Relevanta regressioner passerar och sju facit har renderats i mobilbredd med båda apparnas CSS. Ingen rapportstatus har ändrats. Statistikbanken är inte färdiggranskad.
