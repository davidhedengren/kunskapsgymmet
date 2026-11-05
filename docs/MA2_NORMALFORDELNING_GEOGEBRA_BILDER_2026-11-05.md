# Ma2 – normalfördelning med skärmbilder från Sannolikhetskalkylatorn, 5 november 2026

Detta följer användarens beslut om GeoGebra-facit med skärmbilder (se `FACITMALL.md`) och gäller normalfördelningsuppgifter där Sannolikhetskalkylatorn används. Detta är en pilotomgång med 18 uppgifter utan delkort och 19 beräkningar.

## Arbetsgång i facit

1. **Öppna Sannolikhetskalkylatorn** genom att välja Meny ☰ → Perspektiv → Sannolikhet. Detta visas på en gemensam, inringad bild.
2. **Ange μ och σ** i rutorna (1) och (2).
3. **Välj område** med knappen Öppet åt vänster, Intervall eller Öppet åt höger (3) och skriv gränsen eller gränserna (4).
4. **Läs av svaret** efter likhetstecknet (5). Den uppgiftsspecifika bilden visar alla fem markeringarna och den skuggade ytan under kurvan. Facit förklarar att GeoGebra skriver decimaltal med punkt.

Uppgiftens egna steg står kvar: omräkning till procent, antal (4.44, 4.2122, 4.2124), jämförelsen i 4.2092, symmetriresonemanget i 4.257 och formelbladet i 4.124. Rubrikerna innehåller uppgiftens sammanhang och enhet, så de delas inte mellan uppgifterna.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.44, 4.81, 4.2086, 4.2121 | Åtgärdad | Facit visar med skärmbilder var μ, σ, knappen Intervall och gränserna skrivs och var svaret står. |
| 4.89, 4.152, 4.237, 4.2122, 4.2124 | Åtgärdad | Facit visar med skärmbilder hur man väljer Öppet åt vänster och läser av andelen. |
| 4.100, 4.123, 4.522, 4.524, 4.525, 4.527 | Åtgärdad | Det tidigare facit var en eller tre korta rader utan rubriker. Nu är det en steglista med skärmbilder och svarsrad. |
| 4.124 | Åtgärdad | Formelbladets 50 % + 34,1 % står kvar med rubriker. GeoGebra-sättet, som frågan ber om, visas nu med bilder. |
| 4.257 | Åtgärdad | Prövningen μ = 5,90 visas i GeoGebra och ger 0,84. Symmetriresonemanget står kvar. |
| 4.2092 | Åtgärdad | Två bilder visar maskin A och maskin B. |

Svar, `rättSvar`, toleranser, nivåer, frågor, ledtrådar och verktygsflaggor är oförändrade. Svarsraderna börjar nu med ”Svar:” även i 4.100, 4.123 och 4.124. I 4.2124 används GeoGebras visade 0,0228 i stället för 0,02275, och svaret 91 är oförändrat.

## Kontroll

- `tools/geogebra-skarmbilder.js` (jobbtyp `normal`) skriver in värdena med tangentbordet och läser fälten via GeoGebras kopiering. Fälten ritas i canvas. Svaret jämförs med en oberoende beräkning, och alla 19 stämde på fyra decimaler.
- Ett fel hittades och åtgärdades: att läsa av sannolikhetsfältet fick GeoGebra att räkna baklänges, så att gränsen 2 blev 2,0006 i bilden. Generatorn skriver nu in elevens indata igen och kontrollerar indatafälten innan bilden tas.
- Byggaren `tools/geogebra-normalfordelning-2026-11-05.py` avbryter om facit och GeoGebra inte stämmer överens. Alla facit renderades i 390 px med Kunskapsgymmets CSS utan fel. Test: `tools/ma2-geogebra-normalfordelning-bilder-2026-11-05.test.js`.

## Återstår

Ett 60-tal normalfördelningsuppgifter med Sannolikhetskalkylatorn finns kvar, bland dem uppgifter med delkort och baklängesräkningar (”skriv 0,977 i sannolikhetsfältet”). Generatorn stöder redan baklängesräkning. Den andra sessionen arbetar också med normalfördelning, så hämta remote och kontrollera överlapp före varje omgång.
