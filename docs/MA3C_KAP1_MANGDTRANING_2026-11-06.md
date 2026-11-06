# Ma3c kapitel 1 – mängdträning på nivå 2–3, 6 november 2026

## Användarens uppdrag

Användaren vill fylla på Ma3c (`mato1`) med många mängdträningsuppgifter, och börja med kapitel 1.

- Uppgifterna ska vara vanliga beräkningar och inte konstigt formulerade.
- Ibland en ensam uppgift, ibland a), b), c) … med varierande antal delar, där a) är enklast och de senare delarna svårare.
- Fokus ligger på nivå 2–3.
- Tillägg under arbetet: ”de får gärna vara många mängdträning också, inte bara varierade utan en del mekaniskt arbete är okej nu”.

Det här är alltså ett medvetet undantag från kravet på unika sammanhang. Uppgiftstyperna återkommer med nya tal och uttryck, men inledningarna varieras och varje del räknas fram för sig.

## Omfattning: 42 uppgifter, 123 kort (1.1004–1.1045)

Momenten är kapitlets inledande lektioner i planeringens ordning. Där fanns minst på nivå 2–3: `algebra_polynom` hade 13/9 och `polynom` 16/9.

| Moment (familj) | Uppgifter | Innehåll |
|---|---|---|
| `algebra_polynom` (Förenkla, utveckla och räkna med potenser) | 1.1004–1.1017 | 8 uppgifter med tre delar: a) produkt av två binom (nivå 2), b) kvadreringsregeln, även med minustecken (nivå 2), c) summa eller differens av produkter med minustecken före en parentes (nivå 3). Sex ensamma uppgifter på nivå 3: kub, 2x(x−3)², konjugatregeln två gånger, binom gånger trinom, två kvadrater och kvadrat minus konjugat. |
| `polynom` (Polynombegrepp, grad och värden) | 1.1018–1.1029 | 6 uppgifter med funktionsvärden: a) och b) p(a), även för negativa a (nivå 2), c) p(u) − 2p(v) (nivå 3). 6 uppgifter med en produkt: a) grad, b) konstantterm (nivå 2), c) koefficienten för x² (nivå 3). |
| `faktorisera_polynom` (Faktorisera polynom) | 1.1030–1.1037 | a) bryt ut största gemensamma faktor, b) konjugatregeln baklänges (båda nivå 2), c) gemensam faktor och konjugatregeln, d) nollställen med pq-formeln och faktorsatsen i varannan uppgift (båda nivå 3). |
| `polynomekvationer` (Lösa polynomekvationer) | 1.1038–1.1045 | a) nollproduktmetoden, b) x³ − kx = 0 (båda nivå 2), c) bryt ut x och lös med pq-formeln, d) ekvation av fjärde graden med t = x² i fem av uppgifterna (båda nivå 3). |

Nivåer och poäng:

- Nivå 2 får E och poängen 1/0/0, nivå 3 får C och 0/1/0.
- Huvuduppgiftens nivå är den högsta delens nivå.
- Spår 1b och 1c.
- Miniräknare och GeoGebra är av för algebran, men på för ekvationerna, som har en grafisk lösning enligt facitmallen.

## Facit, ledtrådar och kort

- Facit följer `FACITMALL.md`. Regeln står i rubriken, till exempel ”Kvadreringsregeln: (a − b)² = a² − 2ab + b²”, ”Konjugatregeln baklänges”, ”pq-formeln” och ”Nollproduktmetoden”. Varje rubrik nämner uppgiftens egna uttryck där det går. Facit visar insättning och mellanled och avslutas med en svarsrad.
- Långa likhetskedjor bryts så att varje likhetstecken börjar en ny rad, och för långa led bryts vid + eller −. Ingen rad är för bred i 390 px.
- Varje ekvationsdel har steget ”Grafisk kontroll” med en SVG av y = p(x) där nollställena är markerade. Y-axeln skalas efter kurvan mellan nollställena, så att extrempunkterna syns.
- Ledtrådarna är skrivna för uppgiftstypen och nämner ofta uppgiftens uttryck, till exempel ”Den mittersta termen är dubbla produkten av 3x och 2”. De ger inte svaret.
- Delkorten byggs av `spelIntro` och delens fråga, så alla delkort börjar med samma inledning. Varje delkort har eget facit, egen ledtråd och egen nivå. Inget delfacit innehåller en senare dels svar, och det kontrolleras i testet.

## Självrättning

- Utvecklingar använder `förenklat_polynom`, faktoriseringar `faktoriserat` och funktionsvärden `numeriskt`.
- Rötter rättas som en lösningsmängd. I huvuduppgiften används nästlade svarsfält, och delkortet får mängden via `expandGameTask`.
- Det nya verktyget `tools/kg-sjalvrattning-kontroll.cjs` laddar Kunskapsgymmet lokalt, utan Supabase, med KaTeX och nerdamer från npm. För varje uppgift och delkort kör det den inbyggda facitkontrollen `kvFacit` och 290 elevsvar.
  - Godtas: termer i stigande ordning, faktorer i annan ordning, ”p(2)=5”, omkastade rotlistor.
  - Underkänns: frågan avskriven, utvecklade svar på faktoriseringsfrågor, (a² + b²) i stället för kvadreringsregeln och felaktiga tal.
  - Alla 159 kort (42 huvuduppgifter, 117 delkort i Kunskapsgymmet) gav noll fel.

## Kontroll

- Byggaren `tools/bygg-ma3c-kap1-mangdtraning-2026-11-06.py` räknar fram varje svar med sympy och kontrollerar de 58 utvecklingarna och faktoriseringarna symboliskt. Faktoriseringarna kontrolleras också vara produkter. För varje ekvation kontrolleras att rotmängden är lika med sympys lösning.
- Regressionstestet `tools/ma3c-kap1-mangdtraning-2026-11-06.test.js` räknar oberoende om alla svar i JavaScript:
  - utvecklingar och faktorer i sex x-värden,
  - att rötterna satta i ekvationen ger noll,
  - funktionsvärden ur polynomet,
  - stigande nivå mellan delarna,
  - rubrik i varje steg,
  - inga senare svar i delfacit.
- Alla 159 facit renderades i 390 px med Kunskapsgymmets CSS, utan KaTeX-fel eller för breda rader. Renderingskontrollen granskar nu också KaTeX-blocken, eftersom de scrollar internt och annars inte upptäcks. Exempel från alla fyra momenten är granskade visuellt.
- Valideraren ger för Ma3c inga fel och samma 47 varningar som före ändringen. Den ger tre nya infofynd av typen `VERY_SIMILAR_TEXT`, vilket är väntat vid mängdträning med återkommande uppgiftstyper.
- Ma3-testerna passerar utom `ma3-sinus-c-2026-10-25`, som var rött redan före ändringen och gäller trigonometri.

## Omgång 2: 32 uppgifter, 102 kort (1.1046–1.1077)

Användaren gav klartecken och bad om fortsättning. Byggare: `tools/bygg-ma3c-kap1-mangdtraning2-2026-11-06.py`. Den återanvänder hjälpfunktionerna från omgång 1, och omgång 1 ger fortfarande exakt samma uppgifter.

| Moment (familj) | Uppgifter | Innehåll |
|---|---|---|
| `rationella_uttryck` (Definitionsmängd för rationella uttryck) | 1.1046–1.1055 | 6 uppgifter med fyra delar: a) nämnare i faktorform, b) x² − k (nivå 2), c) nämnare som löses med pq-formeln, d) bryt ut x ur x³ − kx (nivå 3). 4 ensamma uppgifter på nivå 3 om när ett bråk är lika med noll: täljaren ska vara noll men inte nämnaren. |
| `polynomfunktioner` (Andragradsfunktioner och extremvärden) | 1.1056–1.1063 | a) nollställen med pq-formeln, b) symmetrilinjen (nivå 2), c) största eller minsta värde (nivå 3). Facit för c) har en graf med nollställen och vertex. |
| `polynomfunktioner` (Bestämma polynomfunktion från villkor) | 1.1064–1.1069 | a) nollställen och ledande koefficient 1 (nivå 2), b) nollställen och f(0) (nivå 3), c) tredjegradsfunktion med tre nollställen och ett funktionsvärde (nivå 3). |
| `tangent_sekant` (Sekant, tangent och gränsvärde) | 1.1070–1.1077 | a) sekant mellan två heltalspunkter, b) sekant med steget 0,1 (nivå 2), c) ändringskvoten förenklad i h, d) tangentens lutning som gränsvärde (nivå 3). |

**Kontroll:**

- Alla 130 kort klarar Kunskapsgymmets rättning och mina svarsvarianter. Det gäller också uttryck i h och f(x)-svar med eller utan etikett.
- Alla facit renderas i 390 px utan fel. Positiva tal sätts inte inom parentes i insättningar, och extremvärdet visas med insättning.
- Regressionstestet `tools/ma3c-kap1-mangdtraning2-2026-11-06.test.js` räknar oberoende om:
  - nämnarnas nollställen, med kontroll att inga saknas mellan −12 och 12,
  - nollställen, symmetrilinje och extremvärde,
  - att de bestämda funktionerna uppfyller villkoren,
  - sekant- och tangentlutningar samt ändringskvoten i tre h-värden.
- Valideraren ger för Ma3c inga fel och samma 47 varningar, men fem nya infofynd om likhet.

**Medvetet utelämnat:** förkortning och räkning med rationella uttryck (`forkorta_rationella`, `rakna_rationella`). Kunskapsgymmets format `uttryck` godtar allt som är algebraiskt lika med facit, och då godtas också det oförkortade uttrycket, alltså frågan avskriven. Befintliga uppgifter i dessa moment har samma svaghet. Ett format som också kräver förkortad form behövs i Kunskapsgymmet innan fler sådana uppgifter läggs till.

## Fortsättning

Efter omgång 2 återstår förkortning och räkning med rationella uttryck (se ovan), samt `absolutbelopp`, `gransvarde` och `kontinuitet` om de behöver mer mängdträning. Byggaren kan utökas med fler områden på samma sätt.
