# Ma2 – gränser och sannolikheter i GeoGebra, 5 november 2026

Sex uppgifter har granskats och åtgärdats. Facit visar vilka parametrar, områden och fält som används i GeoGebras sannolikhetskalkylator. Samtliga uppgifter tillåter GeoGebra och miniräknare. Ingen lämnades som granskad – inget fel.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.153 a–c | Åtgärdad | Facit visar hur vänsterareorna 0,10 och 0,90 ger percentilerna och förklarar symmetrin och andelen mellan dem. |
| 4.2092 | Åtgärdad | Facit visar intervallet i GeoGebra för båda maskinerna och subtraherar de kasserade andelarna i procentenheter. |
| 4.2093 | Åtgärdad | Facit visar hur 2 %-gränsen läses av direkt i en jämförelsefördelning och används för medelvärdet. |
| 4.2094 | Åtgärdad | Facit visar 90 %-gränsen och hur den största standardavvikelsen bestäms utan att prova sig fram. |
| 4.2126 | Åtgärdad | Frågan anger nu att innehållet är normalfördelat, vilket behövs för metoden. Facit visar GeoGebra och gränsen σ ≈ 0,8597 cl. |
| 4.2127 | Åtgärdad | Facit visar en svans i GeoGebra och använder symmetrin för att räkna båda svansarna. |

Svar, toleranser, nivåer och spelmetadata är bevarade. Normalfördelningens σ är en modellparameter och ska inte bytas ut mot stickprovets Sx. Numeriska värden har kontrollerats oberoende; det nya testet är `tools/ma2-normalfordelning-granser2-2026-11-05.test.js`. Sex facit har renderats i mobilbredd med båda apparnas CSS. Tidigare statistik- och normalfördelningstester passerar, med undantag av `tools/ma2-s5-2026-10-25.test.js`: dess fasta förväntan om 27 figurer hittar 28. Samma test och fel har verifierats mot bankens oförändrade version före denna omgång. Ingen rapportstatus har ändrats. Statistikbanken är inte färdiggranskad.
