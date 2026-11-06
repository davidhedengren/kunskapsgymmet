# Ma2 kapitel 4: genomgångar med GeoGebra och en fördjupning i normalfördelning, 6 november 2026

## Uppdrag

Användaren vill att statistikkapitlets genomgångar i ”Det här behöver du kunna” för Ma2 visar tydligare hur man gör i GeoGebra, med skärmbilder som i facit. Formeln för standardavvikelse ska inte användas. Sist ska det finnas en genomgång som heter ”Normalfördelning fördjupning”. Den ska visa ett exempel där man sätter μ = 0 och σ = 1 och förklara varför man gör så.

## Ändrade genomgångar (`typuppgifter-ma2.js`)

| ID | Rubrik | Ändring |
|---|---|---|
| `ma2-grund-4-01` | Bestäm medelvärde, median och typvärde | Handräkningen är kvar. Två nya steg visar hur man gör i GeoGebra: kalkylblad och Envariabelanalys, och sedan Σx med Medel och Median inringade. |
| `ma2-grund-4-02` | Bestäm median och kvartiler | Två nya steg visar GeoGebra med Q1, Median och Q3 inringade. GeoGebra ger samma kvartiler som handmetoden (4 och 11). |
| `ma2-grund-4-06b` | Beräkna standardavvikelse med GeoGebra | Helt omskriven, utan formel. Den nya uppgiften har sex värden (12, 15, 11, 14, 18, 16) och fem steg med bild: perspektiv, inmatning, Envariabelanalys, Σx och raden s. Svaret är s ≈ 2,58 (Sx, n − 1). Raden σ ska inte användas. |
| `ma2-grund-4-07` | Använd 68–95–99,7-regeln | Ett nytt steg kontrollerar svaret i Sannolikhetskalkylatorn: intervallet 70–130 ger 0,9545. Träningsfamiljen pekar nu på det befintliga delmomentet ”Andel i ett intervall”. |
| `ma2-grund-4-08` | Beräkna normalfördelningssannolikhet med GeoGebra | Nytt exempel, eftersom det gamla var identiskt med bankuppgift 4.81: μ = 168, σ = 7 och P(160 ≤ X ≤ 180) ≈ 0,830. Steg för steg med bild, och en ruta som förklarar de tre knapparna. |
| `ma2-grund-4-09` (ny, sist i kapitlet) | Normalfördelning fördjupning | Juiceflaskor: σ = 6 ml och högst 3 % under 990 ml. Det lägsta medelvärdet söks. |

Fördjupningen förklarar varför man räknar med μ = 0 och σ = 1:

1. **Varför det inte går att räkna direkt:** kalkylatorn behöver μ, men μ är det som söks.
2. **Varför vi sätter μ = 0 och σ = 1:** alla normalfördelningar har samma form. Andelen under en gräns beror bara på hur många standardavvikelser gränsen ligger från medelvärdet. Med μ = 0 och σ = 1 räknar x-axeln direkt i standardavvikelser.
3. **Figur:** en egen SVG har två skalor, antal standardavvikelser och milliliter. Den visar att −1,88 och 990 ml är samma punkt.
4. **GeoGebra:** Öppet åt vänster och 0,03 i sannolikhetsrutan ger −1,8808 (bild).
5. **Ekvationen:** μ − 1,8808 · 6 = 990, alltså μ ≈ 1001,3 ml.
6. **Kontroll:** med μ = 1001,3 och σ = 6 ger X ≤ 990 andelen 0,0298 (bild).
7. **Ta med dig:** metoden i tre steg, och samma ekvation när σ är okänd (σ ≈ 5,3).

## Bilder

- **Nya bilder:** elva i `bilder/geogebra-genomgang-4-*.png`, plus tre befintliga perspektiv- och menybilder.
- **Hur de togs fram:** med Uppgiftslabbets `tools/geogebra-skarmbilder.js` mot ett lokalt GeoGebra Classic 5.4.916, eftersom geogebra.org inte går att nå från molnmiljön. Bilderna är komprimerade med `geogebra-skarmbilder-komprimera.py`. Specifikationen finns i `tools/genomgang-ma2-kap4-2026-11-06.geogebra-spec.json` och kördes med `NVIEW_H=680`.
- **Värden som GeoGebra visade:** 4-01 Medel 5 och Median 4. 4-02 Q1 4, Median 7.5 och Q3 11. 4-06 Medel 14.3333 och s 2.582. 4-07 0.9545. 4-08 0.8302. 4-09 −1.8808 och 0.0298. Alla stämmer med Pythons `statistics`.
- **Rättad etikett:** i bilder där en gräns söks utifrån en sannolikhet låg etiketten ”5 Svaret” tidigare ovanför sannolikhetsrutan. Nu ligger den under gränsrutan, där svaret faktiskt står. Ändringen gäller `geogebra-skarmbilder.js` i Uppgiftslabbet.

## Kontroll

- **Byggskript:** genomgångarna byggs med `tools/genomgang-ma2-kap4-2026-11-06.py`, som kan köras flera gånger med samma resultat. Skriptet kontrollerar z-värdet, medelvärdet och kontrollandelen.
- **Rendering:** genomgångarna har renderats i lokalt Kunskapsgymmet (Ma2, spår 2c) i 390 px och 1100 px. Inga KaTeX-fel, trasiga bilder eller konsolvarningar uppstod, och alla tio genomgångar i kapitlet visas. Skärmbilder av 4-06b och 4-09 i mobilbredd är granskade.
- **Version:** `BANK_VERSION` är höjd så att den nya genomgångsfilen laddas.
