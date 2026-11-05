# Ma2 – normalfördelning med skärmbilder, omgång 2, 5 november 2026

Detta är en fortsättning på `MA2_NORMALFORDELNING_GEOGEBRA_BILDER_2026-11-05.md`. Användaren bad om resterande uppgifter där Sannolikhetskalkylatorn används. Omgången omfattar 55 uppgifter med 75 beräkningar i GeoGebra.

## Två arbetssätt

**Bilder infogade, texten behållen (44 uppgifter).** Här fanns redan steg med rubriker, och flera hade nyligen arbetats om i en parallell session. Texten ändras därför inte.

- Före det första GeoGebra-steget läggs ett steg in med vägen Meny → Perspektiv → Sannolikhet och den gemensamma bilden. Om steget redan börjar med ”Öppna …” läggs vägen in där i stället.
- I det steg där facit nämner GeoGebras värde läggs en mening till: ”Så ser det ut i GeoGebra: 1 μ, 2 σ, 3 knappen …, 4 indata och 5 svaret”. Steget får också en inringad bild av just den beräkningen.
- Fristående delkort får egna öppningssteg och bilder. Huvudfacit visar vägen till kalkylatorn en gång.

Uppgifterna är 4.07, 4.08, 4.13, 4.19, 4.26, 4.27, 4.37, 4.38, 4.45, 4.51, 4.53, 4.57, 4.69, 4.70, 4.87, 4.95, 4.104, 4.116, 4.117, 4.153, 4.176, 4.177, 4.178, 4.216, 4.218, 4.231, 4.260, 4.261, 4.263, 4.285, 4.287, 4.304, 4.2043, 4.2045, 4.2046, 4.2049, 4.2051, 4.2093, 4.2094, 4.2120, 4.2123, 4.2125, 4.2126 och 4.2127.

**Omskrivna enligt FACITMALL (11 uppgifter).** Här var facit en till tre rader utan rubriker, och i 4.217 saknades svarsraden helt. Dessa facit följer nu pilotens mönster med steglista, bilder och svarsrad. Uppgifterna är 4.58, 4.110, 4.217, 4.523, 4.526, 4.530, 4.2087, 4.2088, 4.2089, 4.2091 och 4.2095. I 4.58 räknar man baklänges: sannolikheten 0,90 till vänster ger gränsen.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 44 uppgifter med infogade bilder | Åtgärdad | Facit visar nu med skärmbilder var μ, σ, området och gränsen eller sannolikheten skrivs in i GeoGebra och var svaret står. |
| 11 omskrivna uppgifter | Åtgärdad | Facit har nu tydliga steg med skärmbilder från GeoGebra och en svarsrad. |

Svar, `rättSvar`, toleranser, nivåer, frågor och ledtrådar är oförändrade.

**Hoppas över:**

- 4.213: svaret för buss 1 kräver sex decimaler, och med GeoGebras standardvisning blir det 0.
- 4.288: det finns inget GeoGebra-steg.
- 4.528 och 4.529: det är begreppsfrågor utan beräkning.

I 4.285 har bara baklängesräkningen fått bild. Facit anger den tidigare andelen som 0,022750, men GeoGebra visar 0.0228 med standardinställningen.

## Kontroll

- `tools/geogebra-skarmbilder.js` körde alla 75 beräkningar i GeoGebra 5.4.916 på svenska. Ett tillfälligt avläsningsfel i 4.2043 a gjordes om automatiskt. Varje bild kontrollerades mot indata.
- `tools/geogebra-normalfordelning2-2026-11-05.py` avbryter om GeoGebras svar avviker från facits värde med mer än en halv enhet i facits sista decimal. Den avbryter också om GeoGebras femdecimalsvärde avviker från en oberoende exakt beräkning, eller om ett sökt steg saknas. Alla 75 beräkningar stämde, liksom summan 0,0956 i 4.87 a.
- **Avrundning i bildtexten:** urklippet ger fem decimaler, och värden som −3,01145 avrundades först nedåt till −3,0114. GeoGebra visar −3.0115. Det visade värdet räknas nu från det exakta värdet med avrundning uppåt vid 5, och bildtexterna stämmer med skärmen och faciten (−3,0115, −1,6449, 2,3263, −2,0537).
- **Formeltestet:** bildtexten ”5 gränsen -1.6449” träffade mönstret för n − 1 i `ma2-utan-standardavvikelseformel-2026-11-05`. Texten lyder nu ”5 svaret (gränsen blir …)”, och testet passerar.
- Den ursprungliga texten finns kvar ordagrant i alla 44 infogade facit. Det kontrollerades genom att ta bort tilläggen och jämföra med föregående version. Bara `s` har ändrats.
- Alla 83 facit renderades i 390 px med Kunskapsgymmets CSS utan KaTeX-fel, trasiga bilder eller för breda element. Åtta delkort saknar bild eftersom de inte använder kalkylatorn, till exempel 4.07 b med (100 − 95,4)/2.
- Testet `tools/ma2-geogebra-normalfordelning2-bilder-2026-11-05.test.js` passerar. Valideraren ger samma 86 fynd för Ma2. Testen som redan var röda (bland annat `ma2-kap4-lagesmatt`, `ma2-statistik-diagram` och `ma2-geogebra-sx-jamforelse`) är röda även utan denna ändring.
