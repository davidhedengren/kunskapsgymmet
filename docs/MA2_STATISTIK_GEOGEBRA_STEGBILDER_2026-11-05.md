# Ma2 – GeoGebra-facit med stegvisa skärmbilder, 5 november 2026

Användarens uppdrag: i statistikuppgifter som är tänkta att lösas med GeoGebra ska facit ha tydliga skärmbilder som visar hur det ser ut i GeoGebra och var man ska trycka, så att eleven kan lära sig verktyget av facit. Beslutet står nu i `FACITMALL.md`.

## Arbetsgång i facit

Varje fristående delkort och varje enkelt facit har nu fem steg, alla med en riktig, inringad skärmbild:

1. **Öppna kalkylbladet i GeoGebra Classic:** Meny ☰ → Perspektiv → Kalkylblad (gemensam bild).
2. **Skriv uppgiftens värden i A1–An och markera dem:** bilden visar uppgiftens egna värden och stapeldiagramknappen.
3. **Välj Envariabelanalys under stapeldiagramknappen** (gemensam bild).
4. **Klicka på Σx för att visa statistiken:** analysfönstret med uppgiftens histogram och Σx inringat.
5. **Läs av raden:** statistikpanelen med de efterfrågade raderna inringade. GeoGebras visning med decimalpunkt förklaras.

För typvärdet visar delkortet i stället hur Histogram byts mot **Stolpdiagram**, och den högsta stapeln är inringad. I huvudfacit med flera delar visas arbetsgången i a). Därefter står ”Använd analysfönstret från a)” följt av avläsningen. Uppgifternas egna steg, till exempel att bestämma x i 4.457 eller beräkna förbättringarna i 4.456, står kvar före GeoGebra-stegen.

**Läckage:** i delkort a och b döljs värdena för Medel, σ, s, Σx, Σx² och för d-delens rader (grå rutor). I c döljs d-delens rader. Bara den sista delen och huvudfacit visar hela panelen. Detta kontrolleras i testet.

## Uppgifter

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.328–4.342 (15 uppgifter, 60 delkort) | Åtgärdad | Facit visar med skärmbilder hur du öppnar kalkylbladet, skriver in och markerar värdena, väljer Envariabelanalys, klickar på Σx och var raden med svaret står. Typvärdet hittas i Stolpdiagram. |
| 4.450, 4.452, 4.453, 4.459, 6.09 | Åtgärdad | Facit visar steg för steg med skärmbilder var du klickar i GeoGebra och var s (Sx) står. |
| 4.451, 4.455, 4.456, 4.457 | Åtgärdad | Uppgiftens egen förberedelse står kvar. Därefter visas GeoGebra-stegen med skärmbilder. |

Svar, svarsrader, `rättSvar`, toleranser, nivåer, frågor, ledtrådar och verktygsflaggor är oförändrade; bara `s` har ändrats. I 4.338 d stod tidigare ”2 − −0,5”, och nu står \(2-(-0{,}5)=2{,}5\). Avläsningsstegen anger nu GeoGebras exakta visning, till exempel ”På raden s står 2.6726”, i stället för ett redan avrundat värde.

## Verktyg och kontroll

- GeoGebra Classic 5.4.916 på svenska körs lokalt från GeoGebra Math Apps-paketet (`npm pack node-geogebra@1.3.2`, icke-kommersiell licens). Gränssnittet stämmer med de skärmbilder som togs på geogebra.org/classic tidigare i dag. Paketet ligger inte i repot.
- `tools/geogebra-skarmbilder.js` klickar sig igenom GeoGebra som en elev, skriver värdena med tangentbordet och kontrollerar varje cell samt n och Σx. Därefter tar verktyget skärmbilder, ritar markeringarna och sparar panelens värden i en logg. Under hög last tappade inmatningen ibland ett Enter-tryck (4.450 gav 4, 46, 8), så kontrollen gör om sådana körningar. Slutkörningen hade inga fel. `tools/geogebra-skarmbilder-komprimera.py` minskar bilderna till i genomsnitt cirka 16 kB.
- `tools/geogebra-statistik-serie-2026-11-05.py` bygger faciten och avbryter om svarsraden inte stämmer med GeoGebras värde. Det gäller median, typvärde (från frekvenserna), Medel, s avrundat som i svaret, Max − Min och Q3 − Q1. Alla 24 uppgifter stämde. GeoGebras kvartiler gav samma kvartilavstånd som faciten.
- Alla 84 huvud- och delfacit renderades i 390 px med Kunskapsgymmets CSS (`tools/geogebra-statistik-facit-2026-11-05.browser.js`). Resultatet: inga KaTeX-fel, trasiga bilder eller för breda element. Utvalda facit har också granskats visuellt.
- Nytt test: `tools/ma2-geogebra-stegbilder-2026-11-05.test.js`. Fyra av dagens tester krävde de gamla panelbilderna och pekar nu på de nya bilderna med samma kontroller. Övriga statistik- och GeoGebra-tester passerar. `facit-delkort-2026-10-26` och `facitgranskning-2026-10-25` misslyckades redan före ändringen (5.681 och en äldre fysikregel) och ger identisk utdata efter den. Ma2-valideraren ger samma 86 fynd.

De fem äldre panelbilderna `geogebra-statistik-*-2026-11-05.png` används inte längre, men de ligger kvar eftersom filer inte raderas utan godkännande. Inga rapportstatusar har ändrats.

## Återstår

Samma bildsteg behövs i de övriga GeoGebra-statistikuppgifterna: 4.343–4.351, 4.05, 4.10, 4.14, 4.28, 4.46, 4.97, 4.157, 4.175, 4.241, 4.299, 4.302, 4.306, 4.360–4.366, 4.371, 4.373, 4.386–4.389 och 4.461. Normalfördelningsuppgifterna behöver bilder av Sannolikhetskalkylatorn, och regressionsuppgifterna bilder av Tvåvariabelanalys. Generatorn behöver byggas ut för dessa två verktyg.

## Uppföljning samma dag

- Bilden i steg 4 (Σx) visar nu hela analysfönstret med histogrammet. Tidigare blev den nästan tom när staplarna låg utanför beskärningen, till exempel i 4.330.
- Rubrikerna är nu skrivna för varje uppgift, till exempel ”Öppna ett kalkylblad i GeoGebra för bussarnas förseningar” och ”Läs av medianen för bussarnas förseningar på raden Median”. Tidigare var verktygsrubrikerna gemensamma för alla 15 uppgifter, vilket strider mot regeln om uppgiftsspecifika rubriker. `ma2-kap4-standardavvikelse-2026-10-27` deltest 4 listar inte längre dessa uppgifter. Kvar finns rubriker från tidigare omgångar (4.343–4.366).
- I 4.338 d stod ett unicode-minus i TeX. Nu står \(2-(-0{,}5)=2{,}5\), och då passerar deltest 3 i samma test.
- Normalfördelning: se `MA2_NORMALFORDELNING_GEOGEBRA_BILDER_2026-11-05.md`.
