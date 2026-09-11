/* Grundgenomgångar för Matematik – fördjupning nivå 1 (MATF1000X).
 * Ordningen följer en pedagogisk progression genom Gy25-innehållet.
 * Kapitel 3 konkretiserar ämnesplanens öppna formulering om problem som
 * fördjupar kunskaper om derivata och integraler.
 */
(() => {
  const bank = {};
  const steg = (rubrik, text, matte, figur) => {
    const s = { rubrik, text };
    if (matte) s.matte = matte;
    if (figur) s.figur = figur;
    return s;
  };
  const add = (id, kap, omr, rubrik, t, ram, steglista, svar, komihag, traningsfamilj) => {
    bank[id] = { kap, omr, rubrik, niva: "E", t, ram, steg: steglista, svar, komihag };
    if (traningsfamilj) bank[id].traningsfamilj = traningsfamilj;
  };

  const vennFigur = '<svg class="dg" viewBox="0 0 390 250" role="img" aria-label="Venn-diagram med två överlappande mängder A och B i en grundmängd U." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><rect class="dg-form" x="24" y="20" width="342" height="206" rx="12"/><circle cx="154" cy="124" r="72" fill="var(--accSoft)" stroke="var(--acc)" stroke-width="2"/><circle cx="236" cy="124" r="72" fill="var(--goodSoft)" stroke="var(--good)" stroke-width="2"/><g class="dg-txt"><text x="42" y="45">U</text><text x="119" y="83">A</text><text x="263" y="83">B</text><text x="195" y="130" text-anchor="middle">A ∩ B</text><text x="95" y="150">A ∖ B</text><text x="268" y="150">B ∖ A</text></g></svg>';
  const pascalFigur = '<svg class="dg" viewBox="0 0 390 245" role="img" aria-label="De fem första raderna i Pascals triangel." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-hjalp" d="M195 30L75 210M195 30L315 210"/><g class="dg-txt" font-size="18" text-anchor="middle"><text x="195" y="42">1</text><text x="165" y="82">1</text><text x="225" y="82">1</text><text x="135" y="122">1</text><text x="195" y="122">2</text><text x="255" y="122">1</text><text x="105" y="162">1</text><text x="165" y="162">3</text><text x="225" y="162">3</text><text x="285" y="162">1</text><text x="75" y="202">1</text><text x="135" y="202">4</text><text x="195" y="202">6</text><text x="255" y="202">4</text><text x="315" y="202">1</text></g></svg>';
  const generaliseradFigur = '<svg class="dg" viewBox="0 0 390 250" role="img" aria-label="Grafen y lika med ett genom x kvadrat och området från x lika med ett mot oändligheten." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 22V214M102 22V214M162 22V214M222 22V214M282 22V214M342 22V214M42 214H362M42 166H362M42 118H362M42 70H362M42 22H362"/><path class="dg-axel" d="M42 214H368M102 224V12"/><path class="dg-pil" d="M376 214l-10-4.5v9zM102 4l-4.5 10h9z"/><path d="M162 54C185 123 230 176 362 203L362 214L162 214Z" fill="var(--accSoft)"/><path class="dg-linje" d="M130 20C150 24 158 44 162 54C185 123 230 176 362 203"/><path class="dg-hjalp" stroke-dasharray="6 5" d="M162 28V214"/><g class="dg-txt"><text x="162" y="233" text-anchor="middle">1</text><text x="348" y="194">1/x²</text><text x="371" y="205">x</text></g></svg>';
  const linjarFigur = '<svg class="dg" viewBox="0 0 390 250" role="img" aria-label="En kurva och dess tangent nära punkten x lika med ett visar linjär approximation." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 22V214M102 22V214M162 22V214M222 22V214M282 22V214M342 22V214M42 214H362M42 166H362M42 118H362M42 70H362M42 22H362"/><path class="dg-axel" d="M42 214H368M102 224V12"/><path class="dg-pil" d="M376 214l-10-4.5v9zM102 4l-4.5 10h9z"/><path class="dg-linje" d="M42 203C106 196 155 178 202 134S286 49 360 31"/><path class="dg-delta" d="M92 220L338 38"/><circle class="dg-vald" cx="202" cy="134" r="5.5"/><g class="dg-txt"><text x="202" y="232" text-anchor="middle">a</text><text x="212" y="125">(a, f(a))</text><text x="292" y="76">tangent</text></g></svg>';
  const riktningFigur = '<svg class="dg" viewBox="0 0 390 260" role="img" aria-label="Riktningsfält för differentialekvationen y prim lika med minus y med en avtagande lösningskurva." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 24V224M92 24V224M142 24V224M192 24V224M242 24V224M292 24V224M342 24V224M42 224H362M42 184H362M42 144H362M42 104H362M42 64H362M42 24H362"/><path class="dg-axel" d="M42 224H368M92 234V14"/><path class="dg-pil" d="M376 224l-10-4.5v9zM92 6l-4.5 10h9z"/><g class="dg-hjalp"><path d="M76 51l32 18M126 51l32 18M176 51l32 18M226 51l32 18M276 51l32 18M326 51l32 18M76 98l32 12M126 98l32 12M176 98l32 12M226 98l32 12M276 98l32 12M326 98l32 12M76 144h32M126 144h32M176 144h32M226 144h32M276 144h32M326 144h32M76 190l32-12M126 190l32-12M176 190l32-12M226 190l32-12M276 190l32-12M326 190l32-12"/></g><path class="dg-linje" d="M92 54C145 103 201 128 362 143"/><circle class="dg-vald" cx="92" cy="54" r="5"/><text class="dg-etikett" x="102" y="46">y(0) = 2</text></svg>';
  const diffFigur = '<svg class="dg" viewBox="0 0 390 250" role="img" aria-label="Tre exponentiella lösningskurvor till y prim lika med k y med olika startvärden." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 22V214M102 22V214M162 22V214M222 22V214M282 22V214M342 22V214M42 214H362M42 166H362M42 118H362M42 70H362M42 22H362"/><path class="dg-axel" d="M42 214H368M102 224V12"/><path class="dg-pil" d="M376 214l-10-4.5v9zM102 4l-4.5 10h9z"/><path class="dg-linje" d="M102 184C173 177 243 145 354 54M102 166C179 153 257 102 330 24M102 198C186 194 276 179 360 137"/><g class="dg-txt"><text x="344" y="48">C &gt; 0</text><text x="370" y="205">x</text><text x="112" y="18">y</text></g></svg>';

  // Kapitel 1: Mängdlära och kombinatorik
  add("matf1-grund-1-01", 1, "mangder_venn", "Tolka mängdnotation",
    "<p>Låt U = {1,2,3,4,5,6}, A = {1,2,3,4} och B = {3,4,5}. Bestäm A ∩ B, A ∪ B och Aᶜ.</p>" + vennFigur,
    "Snittet innehåller element som finns i båda mängderna, unionen element som finns i minst en och komplementet element i grundmängden som inte finns i A.",
    [steg("Bestäm snittet", "Välj elementen som finns i både A och B.", "\\[A\\cap B=\\{3,4\\}\\]"),
     steg("Bestäm unionen", "Ta med varje element en gång.", "\\[A\\cup B=\\{1,2,3,4,5\\}\\]"),
     steg("Bestäm komplementet", "Utgå från U och ta bort elementen i A.", "\\[A^c=\\{5,6\\}\\]")],
    "A ∩ B = {3,4}, A ∪ B = {1,2,3,4,5} och Aᶜ = {5,6}.",
    "Komplementet kan bara bestämmas när grundmängden är känd.", "Mängder och Venn-diagram");

  add("matf1-grund-1-03", 1, "additionsprincipen_mangder", "Använd inklusion–exklusion",
    "<p>I en grupp läser 18 elever franska, 14 spanska och 6 båda språken. Hur många läser minst ett av språken?</p>",
    "När två grupper överlappar räknas snittet två gånger i summan och måste därför dras bort en gång.",
    [steg("Skriv formeln", "Använd antalet element i unionen.", "\\[|A\\cup B|=|A|+|B|-|A\\cap B|\\]"),
     steg("Sätt in värdena", "Dra bort de sex som räknades dubbelt.", "\\[18+14-6=26\\]")],
    "26 elever läser minst ett av språken.",
    "Addera inte grupperna rakt av när samma personer kan finnas i båda.", "Inklusion–exklusion och mängdproblem");

  add("matf1-grund-1-04", 1, "kombinatoriska_principer", "Använd multiplikationsprincipen",
    "<p>En kod består av två bokstäver följda av tre siffror. Bokstäver och siffror får upprepas. Hur många koder finns?</p>",
    "När ett val görs i flera efterföljande steg multipliceras antalet möjligheter i varje steg.",
    [steg("Räkna valen", "Varje bokstav har 26 möjligheter och varje siffra 10."),
     steg("Multiplicera", "Alla fem valen ska göras.", "\\[26\\cdot26\\cdot10\\cdot10\\cdot10=676000\\]")],
    "Det finns 676 000 möjliga koder.",
    "Additionsprincipen används mellan alternativa fall; multiplikationsprincipen används mellan när valen följer efter varandra.", "Multiplikationsprincipen");

  add("matf1-grund-1-05", 1, "kombinatoriska_principer", "Använd lådprincipen",
    "<p>Visa att minst två av 13 personer måste vara födda samma månad.</p>",
    "Om fler föremål än lådor fördelas bland lådorna måste minst en låda innehålla minst två föremål.",
    [steg("Identifiera föremål och lådor", "Personerna är 13 föremål och årets månader är 12 lådor."),
     steg("Jämför antalen", "Eftersom 13 > 12 kan inte varje månad innehålla högst en person."),
     steg("Dra slutsatsen", "Minst en månad innehåller minst två födelsedagar.")],
    "Minst två av personerna är födda samma månad.",
    "Lådprincipen garanterar att något händer men säger inte i vilken låda.", "Använda lådprincipen");

  add("matf1-grund-1-06", 1, "permutationer_kombinationer", "Räkna permutationer",
    "<p>På hur många sätt kan fem olika böcker placeras i en rad?</p>",
    "En permutation ordnar alla objekt och ordningen spelar roll.",
    [steg("Räkna valen plats för plats", "Första platsen har 5 val, sedan 4, 3, 2 och 1."),
     steg("Skriv med fakultet", "Produkten förkortas med 5!.", "\\[5!=5\\cdot4\\cdot3\\cdot2\\cdot1=120\\]")],
    "Böckerna kan placeras på 120 sätt.",
    "n! räknar ordningar av n olika objekt.", "Permutationer och ordnade urval");

  add("matf1-grund-1-07", 1, "permutationer_kombinationer", "Räkna ordnade urval",
    "<p>Av åtta löpare ska guld, silver och brons delas ut. På hur många sätt kan prispallen se ut?</p>",
    "När några objekt väljs och ordningen spelar roll används n!/(n−k)!.",
    [steg("Identifiera n och k", "Det finns n = 8 löpare och k = 3 olika placeringar."),
     steg("Beräkna", "Välj en löpare till varje plats.", "\\[P(8,3)=\\frac{8!}{5!}=8\\cdot7\\cdot6=336\\]")],
    "Prispallen kan se ut på 336 sätt.",
    "Guld, silver och brons är olika roller, så ordningen spelar roll.", "Permutationer och ordnade urval");

  add("matf1-grund-1-08", 1, "permutationer_kombinationer", "Räkna kombinationer",
    "<p>Ur en klass med tio elever väljs tre representanter. På hur många sätt kan gruppen väljas?</p>",
    "I en kombination väljs en grupp utan inbördes ordning.",
    [steg("Identifiera n och k", "Välj k = 3 av n = 10."),
     steg("Använd kombinationsformeln", "Dividera bort de 3! ordningarna inom varje grupp.", "\\[\\binom{10}{3}=\\frac{10!}{3!7!}=120\\]")],
    "Gruppen kan väljas på 120 sätt.",
    "Fråga alltid först om ordningen spelar roll: ja ger permutation, nej ger kombination.", "Kombinationer och urval");

  add("matf1-grund-1-09", 1, "binomialsatsen", "Använd binomialsatsen",
    "<p>Utveckla (x + 2)⁴.</p>" + pascalFigur,
    "Binomialsatsen använder koefficienterna i rad 4 i Pascals triangel: 1, 4, 6, 4, 1.",
    [steg("Skriv termerna", "Exponenterna på x minskar medan exponenterna på 2 ökar.", "\\[(x+2)^4=x^4+4x^3\\cdot2+6x^2\\cdot2^2+4x\\cdot2^3+2^4\\]"),
     steg("Förenkla", "Beräkna de numeriska koefficienterna.", "\\[x^4+8x^3+24x^2+32x+16\\]")],
    "(x + 2)⁴ = x⁴ + 8x³ + 24x² + 32x + 16.",
    "Varje term har sammanlagd grad 4.", "Använda binomialsatsen");

  add("matf1-grund-1-10", 1, "binomialsatsen", "Bestäm en koefficient med binomialsatsen",
    "<p>Bestäm koefficienten framför x³ i utvecklingen av (1 + x)⁷.</p>",
    "I (a + b)ⁿ är koefficienten till a^(n−k)bᵏ lika med binomialkoefficienten n över k.",
    [steg("Välj rätt k", "Termen x³ fås när k = 3."),
     steg("Beräkna binomialkoefficienten", "Använd kombinationsformeln.", "\\[\\binom73=\\frac{7!}{3!4!}=35\\]")],
    "Koefficienten framför x³ är 35.",
    "I (1 + x)ⁿ är koefficienterna exakt raden n i Pascals triangel.", "Använda binomialsatsen");

  add("matf1-grund-1-11", 1, "kombinatorik_sannolikhet", "Beräkna kombinatorisk sannolikhet",
    "<p>Fem kort dras ur en vanlig kortlek. Vad är sannolikheten att exakt två är ess?</p>",
    "När alla femkortshänder är lika sannolika kan gynnsamma kombinationer divideras med alla kombinationer.",
    [steg("Räkna alla händer", "Välj 5 av 52 kort.", "\\[\\binom{52}{5}\\]"),
     steg("Räkna gynnsamma händer", "Välj 2 av 4 ess och 3 av de 48 övriga korten.", "\\[\\binom42\\binom{48}{3}\\]"),
     steg("Dividera", "Skriv sannolikheten som en kvot.", "\\[P=\\frac{\\binom42\\binom{48}{3}}{\\binom{52}{5}}\\approx0{,}0399\\]")],
    "Sannolikheten är ungefär 0,0399, alltså 3,99 %.",
    "Täljaren och nämnaren måste räkna utfall på samma sätt — här som oordnade femkortshänder.", "Kombinatorisk sannolikhet");

  // Kapitel 2: Talteori, rekursion och bevis
  add("matf1-grund-2-01", 2, "delbarhet", "Primtalsfaktorisera och bestäm SGD",
    "<p>Primtalsfaktorisera 84 och 126 och bestäm deras största gemensamma delare.</p>",
    "Primtalsfaktoriseringen visar vilka primfaktorer talen delar. SGD byggs av de gemensamma faktorerna med minsta exponent.",
    [steg("Faktorisera talen", "Dela successivt med primtal.", "\\[84=2^2\\cdot3\\cdot7,\\qquad126=2\\cdot3^2\\cdot7\\]"),
     steg("Välj gemensamma faktorer", "Ta 2¹, 3¹ och 7¹.", "\\[\\operatorname{SGD}(84,126)=2\\cdot3\\cdot7=42\\]")],
    "SGD(84, 126) = 42.",
    "För SGD används minsta exponent; för MGM används största exponent.", "Delbarhet, primtalsfaktorisering och SGD/MGM");

  add("matf1-grund-2-02", 2, "delbarhet", "Euklides algoritm – metod och historia",
    "<p>Bestäm SGD(252, 105) med Euklides algoritm.</p>",
    "Euklides algoritm ersätter talparet med divisor och rest tills resten blir noll. Den sista icke-nollresten är SGD.",
    [steg("Dividera med rest", "Börja med det största talet.", "\\[252=2\\cdot105+42\\]"),
     steg("Fortsätt", "Använd 105 och resten 42.", "\\[105=2\\cdot42+21\\]"),
     steg("Avsluta när resten är noll", "Den sista icke-nollresten är 21.", "\\[42=2\\cdot21+0\\]"),
     steg("Se den historiska kopplingen", "Algoritmen beskrivs i Euklides Elementa och visar hur en gammal matematisk idé fortfarande används som effektiv beräkningsmetod.")],
    "SGD(252, 105) = 21.",
    "Metoden är ett historiskt exempel på en algoritm och brukar knytas till Euklides Elementa.", "Delbarhet, primtalsfaktorisering och SGD/MGM");

  add("matf1-grund-2-03", 2, "talbaser", "Omvandla från en annan talbas",
    "<p>Skriv talet 101101₂ i bas 10.</p>",
    "Varje position i ett tal med bas b motsvarar en potens av b.",
    [steg("Skriv platsvärdena", "Högersta siffran hör till 2⁰.", "\\[101101_2=1\\cdot2^5+0\\cdot2^4+1\\cdot2^3+1\\cdot2^2+0\\cdot2+1\\]"),
     steg("Beräkna", "Addera de aktiva platsvärdena.", "\\[32+8+4+1=45\\]")],
    "101101₂ = 45₁₀.",
    "Basen anger vilka potenser positionerna representerar; siffrorna måste vara mindre än basen.", "Talbaser och basomvandling");

  add("matf1-grund-2-04", 2, "talbaser", "Omvandla till en annan talbas",
    "<p>Skriv talet 45₁₀ i bas 2.</p>",
    "Dela upp talet i tvåpotenser eller dividera upprepade gånger med 2 och läs resterna bakifrån.",
    [steg("Välj tvåpotenser", "45 = 32 + 8 + 4 + 1.", "\\[45=2^5+2^3+2^2+2^0\\]"),
     steg("Skriv siffrorna", "Markera vilka potenser från 2⁵ till 2⁰ som används.", "\\[45_{10}=101101_2\\]")],
    "45₁₀ = 101101₂.",
    "Kontrollera genom att omvandla svaret tillbaka till bas 10.", "Talbaser och basomvandling");

  add("matf1-grund-2-05", 2, "kongruens", "Räkna med kongruenser",
    "<p>Bestäm resten när 7³⁵ divideras med 5.</p>",
    "I moduloräkning får ett tal ersättas med ett kongruent, enklare tal.",
    [steg("Reducera basen", "7 har samma rest som 2 modulo 5.", "\\[7\\equiv2\\pmod5\\]"),
     steg("Hitta en cykel", "2⁴ = 16 ≡ 1 (mod 5).", "\\[35=4\\cdot8+3\\]"),
     steg("Reducera exponenten", "Varje grupp om fyra bidrar med faktorn 1.", "\\[7^{35}\\equiv2^{35}\\equiv2^3=8\\equiv3\\pmod5\\]")],
    "Resten är 3.",
    "Likhet modulo n betyder samma rest vid division med n, inte vanlig likhet.", "Räkna med modularitet och kongruenser");

  add("matf1-grund-2-06", 2, "kongruens", "Lös en enkel kongruens",
    "<p>Lös 3x ≡ 1 (mod 7).</p>",
    "Sök ett tal som multiplicerat med 3 ger resten 1 modulo 7. Det är 3:s multiplikativa invers.",
    [steg("Prova små multiplar", "3·5 = 15 och 15 ger resten 1 vid division med 7.", "\\[3\\cdot5\\equiv1\\pmod7\\]"),
     steg("Multiplicera med inversen", "Multiplicera båda led med 5.", "\\[x\\equiv5\\pmod7\\]")],
    "x ≡ 5 (mod 7), alltså x = 5 + 7k för heltal k.",
    "Division i kongruenser ersätts säkrast med multiplikation med en invers.", "Restklasser och tillämpningar av modulo");

  add("matf1-grund-2-07", 2, "talfoljder_sigma", "Tolka sigma-notation",
    "<p>Beräkna summan från k = 1 till 5 av (2k + 1).</p>",
    "Sigma betyder att uttrycket beräknas för varje heltalsvärde på indexet och sedan adderas.",
    [steg("Skriv ut termerna", "Sätt in k = 1, 2, 3, 4 och 5.", "\\[\\sum_{k=1}^{5}(2k+1)=3+5+7+9+11\\]"),
     steg("Addera", "Summera termerna.", "\\[3+5+7+9+11=35\\]")],
    "Summan är 35.",
    "Indexet k är en lokal räknare; byt inte samman det med antalet termer.", "Talföljder och sigmanotation");

  add("matf1-grund-2-08", 2, "aritmetiska_geometriska", "Beskriv en aritmetisk talföljd",
    "<p>Talföljden är 5, 8, 11, 14, … Bestäm en formel för aₙ och beräkna a₂₀.</p>",
    "I en aritmetisk talföljd är differensen d mellan två efterföljande termer konstant.",
    [steg("Bestäm differensen", "Varje term ökar med 3.", "\\[d=3\\]"),
     steg("Skriv den explicita formeln", "Använd aₙ = a₁ + (n − 1)d.", "\\[a_n=5+3(n-1)=3n+2\\]"),
     steg("Sätt in n = 20", "Det insatta indexet markeras rött.", "\\[a_{{\\color{#D1495B}{20}}}=3\\cdot{\\color{#D1495B}{20}}+2=62\\]")],
    "aₙ = 3n + 2 och a₂₀ = 62.",
    "Formeln ska ge första termen när n = 1.", "Aritmetiska och geometriska talföljder och summor");

  add("matf1-grund-2-09", 2, "aritmetiska_geometriska", "Beräkna en geometrisk summa",
    "<p>Beräkna summan 3 + 6 + 12 + … + 3·2⁹.</p>",
    "En geometrisk summa har en konstant kvot. Här är första termen 3, kvoten 2 och antalet termer 10.",
    [steg("Identifiera värdena", "Exponenterna går från 0 till 9, alltså finns 10 termer."),
     steg("Använd summan", "För k ≠ 1 gäller Sₙ = a(kⁿ − 1)/(k − 1).", "\\[S_{10}=3\\frac{2^{10}-1}{2-1}=3(1024-1)=3069\\]")],
    "Summan är 3 069.",
    "Högsta exponenten 9 innebär 10 termer när den första exponenten är 0.", "Aritmetiska och geometriska talföljder och summor");

  add("matf1-grund-2-10", 2, "rekursiva_talfoljder", "Beräkna en rekursiv talföljd",
    "<p>Talföljden ges av a₁ = 2 och aₙ₊₁ = 3aₙ − 1. Bestäm de fyra första termerna.</p>",
    "En rekursiv formel beskriver nästa term med hjälp av tidigare termer. Startvärdet behövs för att beräkningen ska börja.",
    [steg("Beräkna a₂", "Sätt in a₁ = 2.", "\\[a_2=3\\cdot2-1=5\\]"),
     steg("Fortsätt stegvis", "Använd alltid den senast beräknade termen.", "\\[a_3=3\\cdot5-1=14,\\qquad a_4=3\\cdot14-1=41\\]")],
    "De fyra första termerna är 2, 5, 14 och 41.",
    "En rekursiv regel utan tillräckliga startvärden bestämmer inte en unik talföljd.", "Rekursiva talföljder och modeller");

  add("matf1-grund-2-11", 2, "rekursiva_talfoljder", "Programmera en rekursion",
    "<p>Skriv pseudokod som beräknar den tionde termen när a₁ = 2 och aₙ₊₁ = 3aₙ − 1.</p>",
    "Ett program kan upprepa samma rekursiva steg. Variabeln a lagrar den aktuella termen.",
    [steg("Sätt startvärdet", "Börja med a = 2."),
     steg("Upprepa nio gånger", "Från första till tionde termen behövs nio uppdateringar.", "<pre>a = 2\nupprepa 9 gånger:\n    a = 3*a - 1\nskriv a</pre>"),
     steg("Kontrollera principen", "Varje varv använder föregående värde på a innan det ersätts.")],
    "Pseudokoden beräknar a₁₀ genom nio rekursiva uppdateringar.",
    "Programmering är ett verktyg i ämnesplanen; förklara också vad variablerna och loopen betyder matematiskt.", "Rekursiva talföljder och modeller");

  add("matf1-grund-2-12", 2, "bevismetoder", "Genomför ett direkt bevis",
    "<p>Visa att summan av två jämna heltal är jämn.</p>",
    "I ett direkt bevis börjar du med definitionerna och härleder det som ska visas.",
    [steg("Skriv de jämna talen", "Om a och b är jämna finns heltal m och n så att a = 2m och b = 2n."),
     steg("Addera", "Faktorisera ut 2.", "\\[a+b=2m+2n=2(m+n)\\]"),
     steg("Avsluta med definitionen", "Eftersom m + n är ett heltal är a + b delbart med 2 och alltså jämnt.")],
    "Summan av två jämna heltal är jämn.",
    "Ett bevis ska gälla alla tillåtna tal; några numeriska exempel räcker inte.", "Direkta bevis, kontraposition och metodval");

  add("matf1-grund-2-13", 2, "bevismetoder", "Genomför ett motsägelsebevis",
    "<p>Visa att det inte finns något största heltal.</p>",
    "I ett motsägelsebevis antar du motsatsen till påståendet och visar att antagandet leder till en omöjlighet.",
    [steg("Anta motsatsen", "Anta att N är det största heltalet."),
     steg("Konstruera ett större heltal", "Talet N + 1 är också ett heltal och N + 1 > N."),
     steg("Identifiera motsägelsen", "N kan då inte vara det största heltalet, vilket motsäger antagandet.")],
    "Antagandet leder till en motsägelse, alltså finns inget största heltal.",
    "Skriv tydligt vilket motsatsantagande som görs och exakt var motsägelsen uppstår.", "Motsägelsebevis");

  add("matf1-grund-2-14", 2, "bevismetoder", "Genomför ett induktionsbevis",
    "<p>Visa att 1 + 2 + … + n = n(n + 1)/2 för alla positiva heltal n.</p>",
    "Induktion består av ett basfall och ett induktionssteg från n = k till n = k + 1.",
    [steg("Basfall", "För n = 1 ger båda led värdet 1.", "\\[1=\\frac{1(1+1)}2\\]"),
     steg("Induktionsantagande", "Anta att formeln gäller för n = k.", "\\[1+2+\\cdots+k=\\frac{k(k+1)}2\\]"),
     steg("Visa nästa fall", "Lägg till k + 1 och förenkla.", "\\[\\frac{k(k+1)}2+(k+1)=\\frac{(k+1)(k+2)}2\\]"),
     steg("Dra slutsatsen", "Formeln gäller för k + 1 om den gäller för k, och basfallet startar kedjan.")],
    "Formeln gäller för alla positiva heltal n.",
    "Induktionsantagandet får användas i steget men är inte i sig ett bevis för nästa fall.", "Matematiska induktionsbevis");

  // Kapitel 3: Exempel på fördjupande problem med derivata och integraler
  add("matf1-grund-3-01", 3, "partiell_integration", "Integrera med partiell integration",
    "<p>Bestäm en primitiv funktion till f(x) = xeˣ.</p>",
    "Partiell integration flyttar deriveringen från en faktor till den andra: ∫u v′ dx = uv − ∫u′v dx.",
    [steg("Välj u och v′", "Välj u = x eftersom det blir enklare när det deriveras, och v′ = eˣ.", "\\[u=x,\\quad u'=1,\\quad v'=e^x,\\quad v=e^x\\]"),
     steg("Använd formeln", "Sätt in delarna.", "\\[\\int xe^x\\,dx=xe^x-\\int e^x\\,dx\\]"),
     steg("Integrera resten", "Lägg till integrationskonstanten.", "\\[\\int xe^x\\,dx=xe^x-e^x+C\\]")],
    "En primitiv funktion är xeˣ − eˣ + C.",
    "Välj normalt u som den faktor som blir enklare när den deriveras.", "Partiell integration");

  add("matf1-grund-3-02", 3, "partiell_integration", "Beräkna en bestämd integral partiellt",
    "<p>Beräkna integralen från 0 till 1 av xeˣ dx.</p>",
    "Använd en primitiv funktion från partiell integration och sätt sedan in gränserna.",
    [steg("Bestäm en primitiv funktion", "Från partiell integration fås F(x) = xeˣ − eˣ."),
     steg("Sätt in gränserna", "Beräkna F(1) − F(0).", "\\[\\int_0^1xe^x\\,dx=[xe^x-e^x]_0^1=0-(-1)=1\\]")],
    "Integralen är 1.",
    "Integrationskonstanten behövs inte i en bestämd integral eftersom den tar ut sig.", "Partiell integration");

  add("matf1-grund-3-03", 3, "generaliserade_integraler", "Beräkna en konvergent generaliserad integral",
    "<p>Beräkna integralen från 1 till ∞ av 1/x² dx.</p>" + generaliseradFigur,
    "Oändlighet är inte ett tal som sätts in. Ersätt den med en gräns b och låt b gå mot oändligheten.",
    [steg("Skriv som gränsvärde", "Ersätt ∞ med b.", "\\[\\int_1^\\infty\\frac1{x^2}\\,dx=\\lim_{b\\to\\infty}\\int_1^b x^{-2}\\,dx\\]"),
     steg("Integrera", "En primitiv funktion är −1/x.", "\\[\\lim_{b\\to\\infty}\\left[-\\frac1x\\right]_1^b=\\lim_{b\\to\\infty}\\left(1-\\frac1b\\right)=1\\]")],
    "Integralen konvergerar och har värdet 1.",
    "Skriv alltid den generaliserade integralen som ett gränsvärde innan du räknar.", "Generaliserade integraler");

  add("matf1-grund-3-04", 3, "generaliserade_integraler", "Avgör om en integral divergerar",
    "<p>Undersök integralen från 1 till ∞ av 1/x dx.</p>",
    "En generaliserad integral konvergerar bara om det tillhörande gränsvärdet är ändligt.",
    [steg("Skriv gränsvärdet", "Ersätt ∞ med b.", "\\[\\lim_{b\\to\\infty}\\int_1^b\\frac1x\\,dx\\]"),
     steg("Integrera", "En primitiv funktion är ln x.", "\\[\\lim_{b\\to\\infty}[\\ln x]_1^b=\\lim_{b\\to\\infty}\\ln b\\]"),
     steg("Bedöm gränsvärdet", "ln b växer utan gräns, så inget ändligt värde finns.")],
    "Integralen divergerar.",
    "Att grafen närmar sig x-axeln räcker inte för att arean mot oändligheten ska vara ändlig.", "Generaliserade integraler");

  add("matf1-grund-3-05", 3, "derivata_tillampningar", "Koppla samman förändringshastigheter",
    "<p>En cirkels radie ökar med 0,5 cm/s. Hur snabbt ökar arean när radien är 4 cm?</p>",
    "När flera storheter beror på tiden deriveras sambandet med avseende på tiden.",
    [steg("Skriv sambandet", "Cirkelns area är A = πr²."),
     steg("Derivera med avseende på tiden", "Eftersom r beror på t behövs kedjeregeln.", "\\[\\frac{dA}{dt}=2\\pi r\\frac{dr}{dt}\\]"),
     steg("Sätt in värdena", "Använd r = 4 och dr/dt = 0,5.", "\\[\\frac{dA}{dt}=2\\pi\\cdot4\\cdot0{,}5=4\\pi\\]")],
    "Arean ökar med 4π cm²/s, ungefär 12,6 cm²/s.",
    "Sätt in det aktuella radievärdet först efter att sambandet har deriverats.", "Relaterade förändringshastigheter");

  add("matf1-grund-3-06", 3, "derivata_tillampningar", "Använd linjär approximation",
    "<p>Approximera √4,1 utan miniräknare med en tangent kring x = 4.</p>" + linjarFigur,
    "Nära x = a kan f(x) approximeras med tangentlinjen L(x) = f(a) + f′(a)(x − a).",
    [steg("Välj funktion och närliggande punkt", "Låt f(x) = √x och välj a = 4.", "\\[f(4)=2,\\qquad f'(x)=\\frac1{2\\sqrt x},\\qquad f'(4)=\\frac14\\]"),
     steg("Skriv approximationen", "Sätt x = 4,1 i tangentlinjen.", "\\[\\sqrt{4{,}1}\\approx2+\\frac14(4{,}1-4)=2{,}025\\]")],
    "√4,1 ≈ 2,025.",
    "Linjär approximation fungerar bäst nära den punkt där tangenten bestäms.", "Linjär approximation med derivata");

  add("matf1-grund-3-07", 3, "fordjupad_analys", "Analysera en modell digitalt",
    "<p>En digital graf visar f(x) = xe^(−x) för x ≥ 0. Bestäm funktionens maximum och förklara hur det kan kontrolleras analytiskt.</p>",
    "Digitala verktyg kan ge en hypotes. Derivatan används sedan för att verifiera resultatet och tolka modellen.",
    [steg("Läs en digital hypotes", "Grafen antyder ett maximum nära x = 1."),
     steg("Derivera analytiskt", "Använd produktregeln.", "\\[f'(x)=e^{-x}-xe^{-x}=e^{-x}(1-x)\\]"),
     steg("Verifiera maximum", "e^(−x) är positiv och 1 − x byter från plus till minus vid x = 1.", "\\[f(1)=e^{-1}\\approx0{,}368\\]")],
    "Maximum fås vid x = 1 och är 1/e ≈ 0,368.",
    "Ett digitalt resultat ska följas av metod, kontroll och rimlighetsbedömning — inte bara en skärmbild.", "Fördjupad analys med derivata och integral");

  add("matf1-grund-3-08", 3, "fordjupad_analys", "Utvärdera en matematisk modell",
    "<p>Modellen f(x) = xe^(−x) beskriver en storhet för x ≥ 0. Ange en styrka och en begränsning hos modellen.</p>",
    "En modellvärdering handlar både om vad modellen fångar och om vilka antaganden eller användningsområden som begränsar den.",
    [steg("Beskriv en styrka", "Modellen kan beskriva en storhet som först växer, når ett maximum och sedan avtar."),
     steg("Beskriv en begränsning", "Modellen antar ett kontinuerligt förlopp och är bara meningsfull om x ≥ 0 passar den verkliga situationen."),
     steg("Knyt till data", "Parametrar och giltighetsintervall måste kontrolleras mot observationer innan modellen används för prognoser.")],
    "Modellen fångar ett tydligt växande–avtagande förlopp men bygger på antaganden och bör bara användas inom ett verifierat intervall.",
    "Ett korrekt beräknat värde kan ändå vara en dålig prognos om modellen används utanför sitt giltighetsområde.", "Fördjupad analys med derivata och integral");

  // Kapitel 4: Differentialekvationer
  add("matf1-grund-4-01", 4, "diffekv_grunder", "Förstå och verifiera en differentialekvation",
    "<p>Visa att y = 3e^(2x) är en lösning till differentialekvationen y′ = 2y.</p>" + diffFigur,
    "En funktion är en lösning om den tillsammans med sina derivator gör differentialekvationen sann för alla x i intervallet.",
    [steg("Derivera den föreslagna lösningen", "Använd kedjeregeln.", "\\[y'=6e^{2x}\\]"),
     steg("Beräkna högerledet", "Sätt in y = 3e^(2x) i 2y.", "\\[2y=2\\cdot3e^{2x}=6e^{2x}\\]"),
     steg("Jämför leden", "Vänsterled och högerled är lika för alla x.")],
    "Funktionen är en lösning eftersom y′ = 2y = 6e^(2x).",
    "Att funktionen fungerar i en enstaka punkt räcker inte; identiteten ska gälla på hela intervallet.", "Verifiera och bestämma differentialekvation från lösning");

  add("matf1-grund-4-02", 4, "diffekv_grunder", "Ställ upp en differentialekvation",
    "<p>En population N(t) växer med en hastighet som är proportionell mot populationens storlek. Skriv en differentialekvation och tolka konstanten.</p>",
    "Proportionell förändringshastighet betyder att derivatan är en konstant gånger den aktuella storleken.",
    [steg("Översätt orden", "Förändringshastigheten är N′(t) och storleken är N(t).", "\\[N'(t)=kN(t)\\]"),
     steg("Tolka k", "k > 0 ger tillväxt, k < 0 ger minskning och k har enheten per tidsenhet."),
     steg("Lägg till startvärde vid behov", "Ett begynnelsevärde N(0) = N₀ bestämmer en unik lösning.")],
    "Modellen är N′(t) = kN(t), tillsammans med ett startvärde om en bestämd lösning ska fås.",
    "Differentialekvationen beskriver förändringslagen; begynnelsevillkoret väljer en särskild lösningskurva.", "Grundläggande analys av differentialekvationer");

  add("matf1-grund-4-03", 4, "forsta_ordningen", "Lös en separabel differentialekvation",
    "<p>Lös differentialekvationen y′ = 3y.</p>",
    "När y och x kan separeras placeras alla y-uttryck på ena sidan och alla x-uttryck på den andra innan integration.",
    [steg("Separera variablerna", "För y ≠ 0 kan ekvationen skrivas dy/y = 3 dx.", "\\[\\frac{dy}{y}=3\\,dx\\]"),
     steg("Integrera", "Integrera båda led.", "\\[\\ln|y|=3x+C\\]"),
     steg("Lös ut y", "Konstanten kan skrivas om efter exponentiering.", "\\[y=Ce^{3x}\\]")],
    "Den allmänna lösningen är y = Ce^(3x).",
    "Lösningen y = 0 ingår när C = 0.", "Differentialekvationer av första ordningen");

  add("matf1-grund-4-04", 4, "forsta_ordningen", "Lös en linjär differentialekvation",
    "<p>Lös y′ + 2y = 6.</p>",
    "Lösningen består av den homogena lösningen och en partikulär lösning.",
    [steg("Lös den homogena ekvationen", "y′ + 2y = 0 ger en avtagande exponentialfunktion.", "\\[y_h=Ce^{-2x}\\]"),
     steg("Sök en konstant partikulär lösning", "Sätt y = A. Då är y′ = 0.", "\\[2A=6\\Rightarrow A=3\\]"),
     steg("Sätt ihop", "Addera homogen och partikulär lösning.", "\\[y=Ce^{-2x}+3\\]")],
    "Den allmänna lösningen är y = Ce^(−2x) + 3.",
    "Sätt gärna tillbaka lösningen i ekvationen för att kontrollera den.", "Differentialekvationer av första ordningen");

  add("matf1-grund-4-05", 4, "andra_ordningen", "Lös en homogen differentialekvation av andra ordningen",
    "<p>Lös y″ − 5y′ + 6y = 0.</p>",
    "För en linjär homogen ekvation med konstanta koefficienter används den karakteristiska ekvationen.",
    [steg("Skriv karakteristiska ekvationen", "Ersätt y″, y′ och y med r², r och 1.", "\\[r^2-5r+6=0\\]"),
     steg("Bestäm rötterna", "Faktorisera andragradspolynomet.", "\\[(r-2)(r-3)=0\\Rightarrow r=2,3\\]"),
     steg("Skriv allmän lösning", "Varje rot ger en exponentialterm.", "\\[y=C_1e^{2x}+C_2e^{3x}\\]")],
    "y = C₁e^(2x) + C₂e^(3x).",
    "En differentialekvation av andra ordningen ger normalt två fria konstanter.", "Homogena differentialekvationer av andra ordningen");

  add("matf1-grund-4-06", 4, "andra_ordningen", "Lös en inhomogen differentialekvation",
    "<p>Lös y″ + y = 2.</p>",
    "Den allmänna lösningen är summan av den homogena lösningen och en partikulär lösning.",
    [steg("Lös homogena ekvationen", "r² + 1 = 0 har rötterna ±i.", "\\[y_h=C_1\\cos x+C_2\\sin x\\]"),
     steg("Sök en konstant partikulär lösning", "Sätt y = A, vilket ger y″ = 0.", "\\[A=2\\]"),
     steg("Sätt ihop lösningen", "Addera delarna.", "\\[y=C_1\\cos x+C_2\\sin x+2\\]")],
    "y = C₁cos x + C₂sin x + 2.",
    "Den partikulära lösningen ska passa högerledets form; kontrollera alltid genom insättning.", "Inhomogena differentialekvationer av andra ordningen");

  add("matf1-grund-4-07", 4, "begynnelsevillkor", "Lös ett begynnelsevärdesproblem",
    "<p>Lös y′ = 2y med begynnelsevillkoret y(0) = 3.</p>",
    "Den allmänna lösningen innehåller en konstant. Begynnelsevillkoret bestämmer dess värde.",
    [steg("Skriv allmän lösning", "Ekvationen y′ = 2y ger exponentiallösningar.", "\\[y=Ce^{2x}\\]"),
     steg("Sätt in x = 0 och y = 3", "Det insatta x-värdet markeras rött.", "\\[y({\\color{#D1495B}{0}})=Ce^{2\\cdot{\\color{#D1495B}{0}}}=C=3\\]"),
     steg("Skriv den bestämda lösningen", "Ersätt C med 3.", "\\[y=3e^{2x}\\]")],
    "Lösningen är y = 3e^(2x).",
    "Kontrollera både differentialekvationen och begynnelsevillkoret.", "Begynnelsevärdesproblem för differentialekvationer");

  add("matf1-grund-4-08", 4, "begynnelsevillkor", "Använd två begynnelsevillkor",
    "<p>Lös y″ + y = 0 när y(0) = 2 och y′(0) = 0.</p>",
    "En differentialekvation av andra ordningen har två konstanter och behöver därför två oberoende villkor för en unik lösning.",
    [steg("Skriv allmän lösning", "Den homogena lösningen är en kombination av sinus och cosinus.", "\\[y=C_1\\cos x+C_2\\sin x\\]"),
     steg("Använd y(0) = 2", "cos 0 = 1 och sin 0 = 0.", "\\[C_1=2\\]"),
     steg("Derivera och använd y′(0) = 0", "y′ = −C₁sin x + C₂cos x.", "\\[C_2=0\\]"),
     steg("Skriv lösningen", "Sätt in konstanterna.", "\\[y=2\\cos x\\]")],
    "Lösningen är y = 2cos x.",
    "Villkoren kan gälla både funktionen och dess derivata.", "Begynnelsevärdesproblem för differentialekvationer");

  add("matf1-grund-4-09", 4, "riktningsfalt_euler", "Tolka ett riktningsfält",
    "<p>Riktningsfältet hör till y′ = −y. Beskriv lösningen som går genom (0, 2).</p>" + riktningFigur,
    "Varje litet streck visar lutningen som en lösningskurva ska ha i den punkten.",
    [steg("Läs tecknet ovanför x-axeln", "När y > 0 är y′ = −y < 0, så lösningen avtar."),
     steg("Läs jämvikten", "När y = 0 är lutningen noll."),
     steg("Beskriv kurvan", "Från (0, 2) avtar lösningen och närmar sig y = 0 utan att korsa den.")],
    "Lösningen är positiv, avtagande och närmar sig jämvikten y = 0.",
    "Ett riktningsfält visar lokala lutningar; följ strecken mjukt när lösningskurvan skissas.", "Tolka riktningsfält och lösningskurvor");

  add("matf1-grund-4-10", 4, "riktningsfalt_euler", "Använd Eulers stegmetod",
    "<p>Använd Eulers metod på y′ = x + y med y(0) = 1 och steglängden h = 0,5. Approximera y(1).</p>",
    "Eulers metod går från en punkt längs tangentens lutning: yₙ₊₁ = yₙ + h·f(xₙ,yₙ).",
    [steg("Första steget", "Vid (0, 1) är lutningen 0 + 1 = 1.", "\\[y_1=1+0{,}5\\cdot1=1{,}5\\]"),
     steg("Andra steget", "Vid (0,5; 1,5) är lutningen 0,5 + 1,5 = 2.", "\\[y_2=1{,}5+0{,}5\\cdot2=2{,}5\\]")],
    "Euler-approximationen är y(1) ≈ 2,5.",
    "Mindre steg ger ofta bättre noggrannhet men kräver fler beräkningar.", "Eulers metod");

  add("matf1-grund-4-11", 4, "modellering_digitalt", "Modellera avsvalning",
    "<p>Ett föremål med temperaturen 80 °C placeras i ett rum som håller 20 °C. Modellen är T′ = −0,2(T − 20), där tiden mäts i minuter. Bestäm T efter 5 minuter.</p>",
    "Newtons avsvalningsmodell säger att temperaturens förändringshastighet är proportionell mot skillnaden till omgivningen.",
    [steg("Skriv lösningens form", "Jämviktstemperaturen är 20 °C.", "\\[T(t)=20+Ce^{-0{,}2t}\\]"),
     steg("Använd startvärdet", "T(0) = 80 ger C = 60."),
     steg("Sätt in t = 5", "Det insatta tidsvärdet markeras rött.", "\\[T({\\color{#D1495B}{5}})=20+60e^{-0{,}2\\cdot{\\color{#D1495B}{5}}}\\approx42{,}1\\]")],
    "Efter 5 minuter är temperaturen ungefär 42,1 °C.",
    "Modellen antar bland annat konstant rumstemperatur och samma avsvalningskoefficient under hela förloppet.", "Tillväxt, sönderfall och avsvalning med differentialekvationer");

  add("matf1-grund-4-12", 4, "modellering_digitalt", "Kontrollera en digital lösning",
    "<p>Ett digitalt verktyg ger y = 20 + 60e^(−0,2t) som lösning till T′ = −0,2(T − 20), T(0) = 80. Kontrollera svaret.</p>",
    "Ett digitalt svar verifieras genom att kontrollera både differentialekvationen och begynnelsevillkoret.",
    [steg("Derivera lösningen", "Derivera exponentialtermen.", "\\[T'(t)=-12e^{-0{,}2t}\\]"),
     steg("Kontrollera högerledet", "Sätt in T i −0,2(T − 20).", "\\[-0{,}2(T-20)=-0{,}2\\cdot60e^{-0{,}2t}=-12e^{-0{,}2t}\\]"),
     steg("Kontrollera startvärdet", "Sätt t = 0.", "\\[T(0)=20+60=80\\]")],
    "Den digitala lösningen uppfyller både ekvationen och startvillkoret.",
    "Digitala verktyg effektiviserar arbetet men ersätter inte kontroll och tolkning.", "Tolka och kontrollera digitala differentialekvationslösningar");

  window.TYPUPPGIFTER_MATF1 = bank;
})();

/* Slutrevision: kort som inte ska ligga i ”Det här behöver du kunna”. */
(() => {
  const bank = window.TYPUPPGIFTER_MATF1 || {};
  const bort = new Set([
    "Euklides algoritm – metod och historia",
    "Programmera en rekursion",
    "Analysera en modell digitalt",
    "Utvärdera en matematisk modell"
  ]);
  Object.keys(bank).forEach(nyckel => {
    if (bort.has(bank[nyckel].rubrik)) delete bank[nyckel];
  });
  window.TYPUPPGIFTER_MATF1 = bank;
})();
