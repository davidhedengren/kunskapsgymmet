/* Grundgenomgångar för Matematik nivå 2 i Kunskapsgymmet.
 * Objektens ordning är den pedagogiska läsordningen. kurs styr 2a/2b/2c.
 * omr kan vara en sträng eller en lista med kompatibla områdes-ID:n.
 */
(() => {
  const ALL = ["2a", "2b", "2c"];
  const BC = ["2b", "2c"];
  const C = ["2c"];
  const bank = {};
  const steg = (rubrik, text, matte, figur) => {
    const s = { rubrik, text };
    if (matte) s.matte = matte;
    if (figur) s.figur = figur;
    return s;
  };
  const add = (id, kap, omr, kurs, rubrik, t, ram, steglista, svar, komihag, traningsfamilj) => {
    bank[id] = { kap, omr, kurs, rubrik, niva: "E", t, ram, steg: steglista, svar, komihag };
    if (traningsfamilj) bank[id].traningsfamilj = traningsfamilj;
  };

  /* Figurerna använder samma temaklasser som Kunskapsgymmet. De får därför
     tillräcklig kontrast i både ljust och mörkt läge utan hårdkodad bakgrund. */
  const linjeSystemFigur = '<svg class="dg" viewBox="0 0 360 276" role="img" aria-label="Koordinatsystem med linjerna y lika med x plus 1 och y lika med minus x plus 5. Linjerna skär varandra i punkten 2, 3." style="display:block;width:min(100%,350px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M32 26V236M72 26V236M112 26V236M152 26V236M192 26V236M232 26V236M272 26V236M312 26V236M32 236H312M32 206H312M32 176H312M32 146H312M32 116H312M32 86H312M32 56H312M32 26H312"/><path class="dg-axel" d="M32 236H322M72 246V16"/><path class="dg-pil" d="M330 236l-10-4.5v9zM72 8l-4.5 10h9z"/><g class="dg-txt"><text x="32" y="255" text-anchor="middle">−1</text><text x="112" y="255" text-anchor="middle">1</text><text x="152" y="255" text-anchor="middle">2</text><text x="192" y="255" text-anchor="middle">3</text><text x="232" y="255" text-anchor="middle">4</text><text x="272" y="255" text-anchor="middle">5</text><text x="312" y="255" text-anchor="middle">6</text><text x="64" y="211" text-anchor="end">1</text><text x="64" y="181" text-anchor="end">2</text><text x="64" y="151" text-anchor="end">3</text><text x="64" y="121" text-anchor="end">4</text><text x="64" y="91" text-anchor="end">5</text><text x="64" y="61" text-anchor="end">6</text><text x="64" y="31" text-anchor="end">7</text><text x="326" y="227" text-anchor="end" font-style="italic">x</text><text x="82" y="20" font-style="italic">y</text></g><path class="dg-linje" d="M32 236L312 26"/><path class="dg-form" d="M32 56L272 236"/><circle class="dg-skar" cx="152" cy="146" r="5.5"/><text class="dg-etikett" x="162" y="137">(2, 3)</text></svg>';
  const parabelFigur = '<svg class="dg" viewBox="0 0 340 282" role="img" aria-label="Grafen till f av x lika med x kvadrat minus 4x plus 3. Parabeln skär x-axeln vid 1 och 3 och har minimipunkten 2, minus 1." style="display:block;width:min(100%,330px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M32 24V244M76 24V244M120 24V244M164 24V244M208 24V244M252 24V244M296 24V244M32 244H296M32 200H296M32 156H296M32 112H296M32 68H296M32 24H296"/><path class="dg-axel" d="M32 200H306M76 254V14"/><path class="dg-pil" d="M314 200l-10-4.5v9zM76 6l-4.5 10h9z"/><g class="dg-txt"><text x="32" y="219" text-anchor="middle">−1</text><text x="120" y="219" text-anchor="middle">1</text><text x="164" y="219" text-anchor="middle">2</text><text x="208" y="219" text-anchor="middle">3</text><text x="252" y="219" text-anchor="middle">4</text><text x="296" y="219" text-anchor="middle">5</text><text x="68" y="249" text-anchor="end">−1</text><text x="68" y="161" text-anchor="end">1</text><text x="68" y="117" text-anchor="end">2</text><text x="68" y="73" text-anchor="end">3</text><text x="68" y="29" text-anchor="end">4</text><text x="310" y="191" text-anchor="end" font-style="italic">x</text><text x="86" y="18" font-style="italic">y</text></g><polyline class="dg-linje" points="76,68 98,145 120,200 142,233 164,244 186,233 208,200 230,145 252,68"/><circle class="dg-matt" cx="120" cy="200" r="5"/><circle class="dg-matt" cx="208" cy="200" r="5"/><circle class="dg-vald" cx="164" cy="244" r="5.5"/><text class="dg-etikett" x="174" y="238">(2, −1)</text></svg>';
  const nollstalleFigur = '<svg class="dg" viewBox="0 0 340 272" role="img" aria-label="Parabel med nollställena minus 1 och 4. Punkten 0, minus 8 är markerad på grafen." style="display:block;width:min(100%,330px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M24 24V232M64 24V232M104 24V232M144 24V232M184 24V232M224 24V232M264 24V232M304 24V232M24 120H304M24 88H304M24 56H304M24 24H304M24 152H304M24 184H304M24 216H304"/><path class="dg-axel" d="M24 120H314M104 240V14"/><path class="dg-pil" d="M322 120l-10-4.5v9zM104 6l-4.5 10h9z"/><g class="dg-txt"><text x="24" y="139" text-anchor="middle">−2</text><text x="64" y="139" text-anchor="middle">−1</text><text x="144" y="139" text-anchor="middle">1</text><text x="184" y="139" text-anchor="middle">2</text><text x="224" y="139" text-anchor="middle">3</text><text x="264" y="139" text-anchor="middle">4</text><text x="304" y="139" text-anchor="middle">5</text><text x="96" y="189" text-anchor="end">−8</text><text x="96" y="221" text-anchor="end">−12</text><text x="318" y="111" text-anchor="end" font-style="italic">x</text><text x="114" y="18" font-style="italic">y</text></g><polyline class="dg-linje" points="44,76 64,120 104,184 144,216 164,220 184,216 224,184 264,120 284,76"/><circle class="dg-matt" cx="64" cy="120" r="5"/><circle class="dg-matt" cx="264" cy="120" r="5"/><circle class="dg-vald" cx="104" cy="184" r="5.5"/><text class="dg-etikett" x="113" y="178">(0, −8)</text></svg>';
  const exponentialFigur = '<svg class="dg" viewBox="0 0 360 276" role="img" aria-label="Avtagande exponentialkurva med startvärdet 200. Kurvan går genom punkterna 0, 200, 1, 150 och 2, 112,5." style="display:block;width:min(100%,350px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M54 26V226M90 26V226M126 26V226M162 26V226M198 26V226M234 26V226M270 26V226M306 26V226M342 26V226M54 226H342M54 176H342M54 126H342M54 76H342M54 26H342"/><path class="dg-axel" d="M54 226H348M54 234V16"/><path class="dg-pil" d="M356 226l-10-4.5v9zM54 8l-4.5 10h9z"/><g class="dg-txt"><text x="54" y="245" text-anchor="middle">0</text><text x="90" y="245" text-anchor="middle">1</text><text x="126" y="245" text-anchor="middle">2</text><text x="198" y="245" text-anchor="middle">4</text><text x="270" y="245" text-anchor="middle">6</text><text x="342" y="245" text-anchor="middle">8</text><text x="46" y="181" text-anchor="end">50</text><text x="46" y="131" text-anchor="end">100</text><text x="46" y="81" text-anchor="end">150</text><text x="46" y="31" text-anchor="end">200</text><text x="352" y="217" text-anchor="end" font-style="italic">x</text><text x="64" y="20" font-style="italic">f(x)</text></g><polyline class="dg-linje" points="54,26 90,76 126,113.5 162,141.6 198,162.7 234,178.5 270,190.4 306,199.3 342,206"/><circle class="dg-matt" cx="54" cy="26" r="5"/><circle class="dg-matt" cx="90" cy="76" r="5"/><circle class="dg-matt" cx="126" cy="113.5" r="5"/></svg>';
  const exponentialEkvFigur = '<svg class="dg" viewBox="0 0 380 282" role="img" aria-label="Koordinatsystem med exponentialkurvan y lika med 3 gånger 1,5 upphöjt till x och den vågräta linjen y lika med 10. Graferna skär varandra nära x lika med 2,97." style="display:block;width:min(100%,365px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M50 30V230M106 30V230M162 30V230M218 30V230M274 30V230M330 30V230M50 230H330M50 180H330M50 130H330M50 80H330M50 30H330"/><path class="dg-axel" d="M50 230H340M50 240V20"/><path class="dg-pil" d="M348 230l-10-4.5v9zM50 12l-4.5 10h9z"/><g class="dg-txt"><text x="50" y="249" text-anchor="middle">0</text><text x="106" y="249" text-anchor="middle">1</text><text x="162" y="249" text-anchor="middle">2</text><text x="218" y="249" text-anchor="middle">3</text><text x="274" y="249" text-anchor="middle">4</text><text x="330" y="249" text-anchor="middle">5</text><text x="42" y="184" text-anchor="end">4</text><text x="42" y="134" text-anchor="end">8</text><text x="42" y="84" text-anchor="end">12</text><text x="42" y="34" text-anchor="end">16</text><text x="344" y="220" text-anchor="end" font-style="italic">x</text><text x="60" y="22" font-style="italic">y</text></g><polyline class="dg-linje" points="50,192.5 78,185 106,173.8 134,162.5 162,145.6 190,127.8 218,103.4 246,76.6 274,40.1"/><path class="dg-form" d="M50 105H330"/><circle class="dg-skar" cx="216.3" cy="105" r="5.5"/><text class="dg-etikett" x="224" y="96">(2,97; 10)</text><text class="dg-etikett" x="250" y="119">y = 10</text></svg>';
  const ladaFigur = '<svg class="dg" viewBox="0 0 420 150" role="img" aria-label="Lådagram med minimum 2, undre kvartil 5, median 8, övre kvartil 12 och maximum 17." style="display:block;width:min(100%,410px);height:auto;margin:14px auto 4px"><path class="dg-axel" d="M40 116H390"/><path class="dg-form" d="M80 72H140M280 72H380M80 55V89M380 55V89M140 42H280V102H140Z"/><path class="dg-linje" d="M200 42V102"/><g class="dg-txt"><text x="80" y="135" text-anchor="middle">2</text><text x="140" y="135" text-anchor="middle">5</text><text x="200" y="135" text-anchor="middle">8</text><text x="280" y="135" text-anchor="middle">12</text><text x="380" y="135" text-anchor="middle">17</text></g><g class="dg-etikett"><text x="140" y="28" text-anchor="middle">Q₁</text><text x="200" y="28" text-anchor="middle">median</text><text x="280" y="28" text-anchor="middle">Q₃</text></g></svg>';
  const regressionFigur = '<svg class="dg" viewBox="0 0 380 286" role="img" aria-label="Spridningsdiagram med en redan anpassad stigande regressionslinje. Punkterna ligger nära men inte exakt på linjen." style="display:block;width:min(100%,365px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M46 24V236M96 24V236M146 24V236M196 24V236M246 24V236M296 24V236M346 24V236M46 236H346M46 196H346M46 156H346M46 116H346M46 76H346M46 36H346"/><path class="dg-axel" d="M46 236H356M46 246V14"/><path class="dg-pil" d="M364 236l-10-4.5v9zM46 6l-4.5 10h9z"/><path class="dg-linje" d="M46 214L346 70"/><g class="dg-matt"><circle cx="71" cy="207" r="5"/><circle cx="96" cy="192" r="5"/><circle cx="121" cy="194" r="5"/><circle cx="146" cy="170" r="5"/><circle cx="171" cy="165" r="5"/><circle cx="196" cy="145" r="5"/><circle cx="221" cy="151" r="5"/><circle cx="246" cy="120" r="5"/><circle cx="271" cy="112" r="5"/><circle cx="296" cy="91" r="5"/><circle cx="321" cy="88" r="5"/></g><g class="dg-txt"><text x="352" y="258" text-anchor="end">studietimmar</text><text x="56" y="18">provpoäng</text></g></svg>';
  const korrelationFigur = '<svg class="dg" viewBox="0 0 380 286" role="img" aria-label="Spridningsdiagram med starkt negativt linjärt samband. Punkterna faller från övre vänster till nedre höger." style="display:block;width:min(100%,365px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M46 24V236M96 24V236M146 24V236M196 24V236M246 24V236M296 24V236M346 24V236M46 236H346M46 196H346M46 156H346M46 116H346M46 76H346M46 36H346"/><path class="dg-axel" d="M46 236H356M46 246V14"/><path class="dg-pil" d="M364 236l-10-4.5v9zM46 6l-4.5 10h9z"/><g class="dg-matt"><circle cx="71" cy="52" r="5"/><circle cx="96" cy="67" r="5"/><circle cx="121" cy="71" r="5"/><circle cx="146" cy="96" r="5"/><circle cx="171" cy="104" r="5"/><circle cx="196" cy="126" r="5"/><circle cx="221" cy="132" r="5"/><circle cx="246" cy="157" r="5"/><circle cx="271" cy="165" r="5"/><circle cx="296" cy="193" r="5"/><circle cx="321" cy="202" r="5"/></g><g class="dg-txt"><text x="352" y="258" text-anchor="end">temperatur</text><text x="56" y="18">kostnad</text></g></svg>';

  // Kapitel 1: Algebra
  add("ma2-grund-1-01", 1, ["rata_linjens_ekvation", "linjara_representationer"], ALL,
    "Tolka räta linjens ekvation",
    "<p>Linjen har ekvationen <strong>y = 3x − 2</strong>. Ange riktningskoefficienten, skärningen med y-axeln och beräkna y när x = 4.</p>",
    "I \\(y=kx+m\\) visar \\(k\\) förändringen i y när x ökar med 1. Talet \\(m\\) är y-värdet när \\(x=0\\).",
    [steg("Läs av k och m", "Jämför med formen y = kx + m.", "\\[k=3\\quad\\text{och}\\quad m=-2\\]"),
     steg("Sätt in x-värdet", "Ersätt varje x i formeln med 4.", "\\[y=3\\cdot{\\color{#D1495B}{4}}-2=12-2=10\\]")],
    "\\(k=3\\), \\(m=-2\\) och \\(y=10\\) när \\(x=4\\).",
    "k är förändring per x-enhet; m är startvärdet.", "Använda linjens ekvation och beräkna värden");

  add("ma2-grund-1-02", 1, "bestamma_linjara_funktioner", ALL,
    "Bestäm linjen genom två punkter",
    "<p>Bestäm ekvationen för linjen genom punkterna (1, 3) och (4, 9).</p>",
    "Bestäm först lutningen med förändring i y delat med förändring i x. Sätt sedan in en punkt för att hitta m.",
    [steg("Beräkna k", "Använd samma ordning i täljare och nämnare.", "\\[k=\\frac{9-3}{4-1}=\\frac63=2\\]"),
     steg("Bestäm m", "Sätt in punkten (1, 3) i y = 2x + m.", "\\[3=2\\cdot{\\color{#D1495B}{1}}+m\\Rightarrow m=1\\]"),
     steg("Skriv och kontrollera", "Kontroll med den andra punkten ger 2·4 + 1 = 9.", "\\[y=2x+1\\]")],
    "Linjen har ekvationen \\(y=2x+1\\).",
    "Två olika punkter bestämmer en rät linje.", "Bestämma linjär funktion från två punkter");

  add("ma2-grund-1-03", 1, "rata_linjens_ekvation", ALL,
    "Bestäm linjens skärningar med axlarna",
    "<p>Var skär linjen y = −2x + 6 koordinataxlarna?</p>",
    "På y-axeln är \\(x=0\\). På x-axeln är \\(y=0\\).",
    [steg("Skärningen med y-axeln", "Sätt x = 0.", "\\[y=-2\\cdot0+6=6\\]"),
     steg("Skärningen med x-axeln", "Sätt y = 0 och lös ekvationen.", "\\[0=-2x+6\\Rightarrow 2x=6\\Rightarrow x=3\\]")],
    "Linjen skär y-axeln i \\((0,6)\\) och x-axeln i \\((3,0)\\).",
    "En punkt på en axel har alltid den andra koordinaten 0.", "Bestämma skärningar med koordinataxlar");

  add("ma2-grund-1-04", 1, "linjara_representationer", ALL,
    "Bestäm en linjär funktion från en tabell",
    '<p>Bestäm den linjära funktionen som tabellen beskriver.</p><table aria-label="Värdetabell för en linjär funktion" style="margin:14px auto"><tr><th>x</th><td>0</td><td>1</td><td>3</td></tr><tr><th>y</th><td>2</td><td>5</td><td>11</td></tr></table>',
    "I en linjär tabell är kvoten \\(\\Delta y/\\Delta x\\) konstant.",
    [steg("Bestäm k", "Mellan de två sista kolumnerna ökar y med 6 när x ökar med 2.", "\\[k=\\frac{11-5}{3-1}=\\frac62=3\\]"),
     steg("Bestäm m", "Paret (0, 2) visar direkt värdet när x = 0.", "\\[m=2\\]"),
     steg("Skriv funktionen", "Sätt in k och m i y = kx + m.", "\\[y=3x+2\\]")],
    "Funktionen är \\(y=3x+2\\).",
    "Kontrollera att samma k fås mellan flera tabellrader.", "Bestämma linjär funktion från tabell");

  add("ma2-grund-1-05", 1, ["linjara_ekvationssystem", "grafisk_losning_ekvationssystem"], ALL,
    "Förstå lösningen till ett ekvationssystem",
    "<p>Lös ekvationssystemet grafiskt:</p><p>\\[\\begin{cases}y=x+1\\\\y=-x+5\\end{cases}\\]</p>" + linjeSystemFigur,
    "Lösningen är det talpar som gör båda ekvationerna sanna. I en graf är det linjernas skärningspunkt.",
    [steg("Sätt uttrycken lika", "I skärningspunkten har linjerna samma y-värde.", "\\[x+1=-x+5\\]"),
     steg("Lös ut x", "Samla x-termerna på ena sidan.", "\\[2x=4\\Rightarrow x=2\\]"),
     steg("Bestäm y", "Sätt x = 2 i någon av ekvationerna.", "\\[y=2+1=3\\]")],
    "Skärningspunkten och lösningen är \\((2,3)\\).",
    "Ett ekvationssystem frågar efter värden som fungerar samtidigt.", "Grafisk lösning");

  add("ma2-grund-1-06", 1, "substitutionsmetoden", ALL,
    "Lös ett ekvationssystem med substitution",
    "<p>Lös ekvationssystemet:</p><p>\\[\\begin{cases}y=2x+1\\\\x+y=10\\end{cases}\\]</p>",
    "När en variabel redan är ensam kan dess uttryck sättas in i den andra ekvationen.",
    [steg("Ersätt y", "Sätt in 2x + 1 där y står i den andra ekvationen.", "\\[x+(2x+1)=10\\]"),
     steg("Lös ekvationen", "Förenkla och lös ut x.", "\\[3x+1=10\\Rightarrow 3x=9\\Rightarrow x=3\\]"),
     steg("Bestäm y", "Sätt tillbaka x = 3.", "\\[y=2\\cdot{\\color{#D1495B}{3}}+1=7\\]")],
    "Lösningen är \\(x=3\\), \\(y=7\\).",
    "Substitution betyder att ersätta en variabel med ett lika stort uttryck.", "Substitutionsmetoden");

  add("ma2-grund-1-07", 1, "additionsmetoden", ALL,
    "Lös ett ekvationssystem med addition",
    "<p>Lös ekvationssystemet:</p><p>\\[\\begin{cases}2x+y=11\\\\3x-y=9\\end{cases}\\]</p>",
    "Adderar du leden försvinner en variabel när dess koefficienter är motsatta.",
    [steg("Addera ekvationerna", "y och −y tar ut varandra.", "\\[(2x+y)+(3x-y)=11+9\\Rightarrow5x=20\\]"),
     steg("Bestäm x", "Dela båda led med 5.", "\\[x=4\\]"),
     steg("Bestäm y", "Sätt x = 4 i den första ekvationen.", "\\[2\\cdot4+y=11\\Rightarrow y=3\\]")],
    "Lösningen är \\(x=4\\), \\(y=3\\).",
    "Multiplicera först en ekvation om koefficienterna inte redan är motsatta.", "Additionsmetoden");

  add("ma2-grund-1-08", 1, "speciella_ekvationssystem", ALL,
    "Avgör om ett system saknar eller har oändligt många lösningar",
    "<p>Jämför ekvationssystemen:</p><p>\\[A:\\begin{cases}y=2x+1\\\\y=2x-3\\end{cases}\\qquad B:\\begin{cases}y=2x+1\\\\2y=4x+2\\end{cases}\\]</p>",
    "Parallella olika linjer möts aldrig. Två ekvationer som beskriver samma linje har alla sina punkter gemensamma.",
    [steg("Undersök system A", "Samma k men olika m ger parallella linjer.", "\\[k_1=k_2=2,\\quad m_1\\ne m_2\\]"),
     steg("Förenkla system B", "Dela den andra ekvationen med 2.", "\\[2y=4x+2\\Rightarrow y=2x+1\\]")],
    "A har ingen lösning. B har oändligt många lösningar.",
    "Samma k: jämför m innan du börjar räkna.", "Ingen eller oändligt många lösningar");

  add("ma2-grund-1-09", 1, "ekvationssystem_tillampningar", ALL,
    "Skapa ett ekvationssystem från en text",
    "<p>På en föreställning säljs 40 biljetter. En vuxenbiljett kostar 120 kr och en ungdomsbiljett 80 kr. Intäkten blir 4 000 kr. Hur många av varje sort säljs?</p>",
    "Låt variablerna stå för de okända antalen och översätt en uppgift i taget till en ekvation.",
    [steg("Välj variabler", "Låt x vara antalet vuxenbiljetter och y antalet ungdomsbiljetter.", "\\[x+y=40\\]"),
     steg("Skriv intäktsekvationen", "Pris gånger antal ger intäkten.", "\\[120x+80y=4000\\]"),
     steg("Lös systemet", "De två villkoren bildar systemet nedan. Sätt sedan y = 40 − x i intäktsekvationen.", "\\[\\begin{cases}x+y=40\\\\120x+80y=4000\\end{cases}\\qquad\\Rightarrow\\qquad120x+80(40-x)=4000\\Rightarrow x=20\\]")],
    "Det säljs 20 vuxenbiljetter och 20 ungdomsbiljetter.",
    "Kontrollera både totalantalet och totalsumman.", "Tillämpningar med ekvationssystem");

  add("ma2-grund-1-10", 1, "ekvationssystem_tre_obekanta", C,
    "Lös ett system med tre obekanta",
    "<p>Lös ekvationssystemet:</p><p>\\[\\begin{cases}x+y+z=6\\\\x-y=0\\\\z=2\\end{cases}\\]</p>",
    "Använd den enklaste ekvationen först och minska antalet obekanta steg för steg.",
    [steg("Använd z", "Den tredje ekvationen ger z direkt.", "\\[z=2\\]"),
     steg("Använd sambandet mellan x och y", "x − y = 0 betyder att x = y.", "\\[x=y\\]"),
     steg("Sätt in i första ekvationen", "Ersätt z med 2 och y med x.", "\\[x+x+2=6\\Rightarrow2x=4\\Rightarrow x=y=2\\]")],
    "Lösningen är \\((x,y,z)=(2,2,2)\\).",
    "Eliminera en obekant i taget och kontrollera svaret i alla ekvationer.", "Tre obekanta");

  add("ma2-grund-1-11", 1, "multiplicera_parenteser", ALL,
    "Multiplicera två parenteser",
    "<p>Utveckla och förenkla (x + 3)(x − 2).</p>",
    "Varje term i den första parentesen ska multipliceras med varje term i den andra.",
    [steg("Multiplicera alla termpar", "Skriv ut de fyra produkterna.", "\\[(x+3)(x-2)=x^2-2x+3x-6\\]"),
     steg("Samla liknande termer", "−2x + 3x = x.", "\\[x^2-2x+3x-6=x^2+x-6\\]")],
    "\\(x^2+x-6\\).",
    "Fyra produkter ska med när båda parenteserna har två termer.", "Multiplicera parenteser");

  add("ma2-grund-1-12", 1, "konjugatregeln", ALL,
    "Använd konjugatregeln",
    "<p>Utveckla (x + 5)(x − 5).</p>",
    "Konjugat har samma termer men olika tecken mellan dem. Mittentermerna tar ut varandra.",
    [steg("Känn igen mönstret", "Använd (a + b)(a − b) = a² − b².", "\\[(a+b)(a-b)=a^2-b^2\\]"),
     steg("Sätt a = x och b = 5", "Kvadrera båda termerna.", "\\[(x+5)(x-5)=x^2-25\\]")],
    "\\(x^2-25\\).",
    "Konjugatregeln ger en differens av två kvadrater.", "Använda konjugatregeln");

  add("ma2-grund-1-13", 1, "kvadreringsreglerna", ALL,
    "Kvadrera en summa",
    "<p>Utveckla (x + 4)².</p>",
    "Kvadraten gäller hela parentesen. Regeln innehåller tre termer.",
    [steg("Använd första kvadreringsregeln", "(a + b)² = a² + 2ab + b².", "\\[(a+b)^2=a^2+2ab+b^2\\]"),
     steg("Sätt in x och 4", "Mittentermen blir 2·x·4.", "\\[(x+4)^2=x^2+8x+16\\]")],
    "\\(x^2+8x+16\\).",
    "Glöm inte mittentermen 2ab.", "Använda kvadreringsreglerna");

  add("ma2-grund-1-14", 1, "kvadreringsreglerna", ALL,
    "Kvadrera en differens",
    "<p>Utveckla (x − 3)².</p>",
    "I andra kvadreringsregeln är mittentermen negativ men sista termen positiv.",
    [steg("Använd regeln", "(a − b)² = a² − 2ab + b².", "\\[(a-b)^2=a^2-2ab+b^2\\]"),
     steg("Sätt in x och 3", "Det är bara mittentermen som blir negativ.", "\\[(x-3)^2=x^2-6x+9\\]")],
    "\\(x^2-6x+9\\).",
    "Eftersom (−3)² = 9 är sista termen positiv.", "Använda kvadreringsreglerna");

  add("ma2-grund-1-15", 1, "faktorisering", ALL,
    "Faktorisera ett uttryck",
    "<p>Faktorisera 6x² − 24.</p>",
    "Bryt först ut största gemensamma faktor. Undersök sedan om uttrycket passar en algebraisk regel.",
    [steg("Bryt ut 6", "Båda termerna är delbara med 6.", "\\[6x^2-24=6(x^2-4)\\]"),
     steg("Använd konjugatregeln baklänges", "x² − 4 är en differens av två kvadrater.", "\\[x^2-4=(x+2)(x-2)\\]")],
    "\\(6(x+2)(x-2)\\).",
    "Faktorisering är multiplikation av parenteser baklänges.", "Faktorisering");

  // Kapitel 2: Algebra och icke-linjära modeller
  add("ma2-grund-2-01", 2, "enkla_andragradsekvationer", ALL,
    "Lös en enkel andragradsekvation",
    "<p>Lös 3x² − 12 = 0.</p>",
    "Isolera först x². När du tar kvadratroten måste både en positiv och en negativ lösning tas med.",
    [steg("Isolera x²", "Addera 12 och dela med 3.", "\\[3x^2=12\\Rightarrow x^2=4\\]"),
     steg("Ta kvadratroten", "Både 2 och −2 har kvadraten 4.", "\\[x=\\pm\\sqrt4=\\pm2\\]")],
    "\\(x=2\\) eller \\(x=-2\\).",
    "Ur x² = a följer x = ±√a när a är positivt.", "Kvadratrotmetoden");

  add("ma2-grund-2-02", 2, "nollproduktmetoden", ALL,
    "Använd nollproduktmetoden",
    "<p>Lös (x − 3)(x + 5) = 0.</p>",
    "En produkt är noll om minst en faktor är noll.",
    [steg("Sätt varje faktor lika med noll", "Behandla faktorerna var för sig.", "\\[x-3=0\\quad\\text{eller}\\quad x+5=0\\]"),
     steg("Lös ekvationerna", "Flytta konstanten till andra sidan.", "\\[x=3\\quad\\text{eller}\\quad x=-5\\]")],
    "\\(x=3\\) eller \\(x=-5\\).",
    "Nollproduktmetoden kräver att ena sidan är noll och den andra är faktoriserad.", "Nollproduktmetoden");

  add("ma2-grund-2-03", 2, "losningsformel_andragrad", ALL,
    "Lös med pq-formeln",
    "<p>Lös x² − 6x + 5 = 0.</p>",
    "För ekvationen \\(x^2+px+q=0\\) gäller \\(x=-p/2\\pm\\sqrt{(p/2)^2-q}\\).",
    [steg("Identifiera p och q", "Jämför med x² + px + q = 0.", "\\[p=-6,\\quad q=5\\]"),
     steg("Sätt in i formeln", "Var noga med minustecknet framför p/2.", "\\[x=3\\pm\\sqrt{(-3)^2-5}=3\\pm\\sqrt4\\]"),
     steg("Skriv båda lösningarna", "Beräkna plus- och minusfallet.", "\\[x=3\\pm2\\Rightarrow x=1\\text{ eller }x=5\\]")],
    "\\(x=1\\) eller \\(x=5\\).",
    "Gör först koefficienten framför x² till 1.", "Lösningsformeln");

  add("ma2-grund-2-04", 2, "kvadratkomplettering", C,
    "Kvadratkomplettera",
    "<p>Skriv x² + 6x + 2 på formen (x + a)² + b.</p>",
    "Halvera koefficienten framför x och använd kvadreringsregeln baklänges.",
    [steg("Skapa en jämn kvadrat", "Halva 6 är 3, så lägg till och dra ifrån 3².", "\\[x^2+6x+2=x^2+6x+9-9+2\\]"),
     steg("Skriv om", "De tre första termerna är (x + 3)².", "\\[x^2+6x+2=(x+3)^2-7\\]")],
    "\\((x+3)^2-7\\).",
    "Du får inte ändra värdet: samma tal som läggs till måste också dras ifrån.", "Kvadratkomplettering");

  add("ma2-grund-2-05", 2, ["mer_om_andragradsekvationer", "samband_roter_koefficienter"], BC,
    "Använd sambandet mellan rötter och koefficienter",
    "<p>En andragradsekvation har rötterna 2 och −5. Skriv en ekvation med dessa rötter.</p>",
    "Om rötterna är \\(x_1\\) och \\(x_2\\) kan vänsterledet skrivas \\((x-x_1)(x-x_2)\\).",
    [steg("Skriv faktorerna", "Byt tecken på roten inne i faktorn.", "\\[(x-2)(x-(-5))=(x-2)(x+5)\\]"),
     steg("Utveckla", "Multiplicera parenteserna.", "\\[(x-2)(x+5)=x^2+3x-10\\]")],
    "En möjlig ekvation är \\(x^2+3x-10=0\\).",
    "Roten 2 ger faktorn (x − 2); roten −5 ger faktorn (x + 5).", "Rötter och koefficienter");

  add("ma2-grund-2-06", 2, "andragradsekvationer_tillampningar", ALL,
    "Skapa en andragradsekvation i ett problem",
    "<p>En rektangel har arean 48 cm². Längden är 2 cm större än bredden. Bestäm sidornas längder.</p>",
    "Översätt först sambandet till ett uttryck och använd sedan area = längd · bredd.",
    [steg("Välj variabel", "Låt bredden vara x cm. Då är längden x + 2 cm.", "\\[x(x+2)=48\\]"),
     steg("Lös ekvationen", "Flytta allt till vänster och faktorisera.", "\\[x^2+2x-48=0\\Rightarrow(x+8)(x-6)=0\\]"),
     steg("Tolka lösningarna", "x = −8 saknar mening som en längd. Därför är x = 6.", "\\[x=6,\\quad x+2=8\\]")],
    "Rektangeln är 6 cm bred och 8 cm lång.",
    "Kontrollera alltid om de algebraiska lösningarna är rimliga i situationen.", "Andragradsekvationer i geometri- och areaproblem");

  add("ma2-grund-2-07", 2, "rotekvationer", C,
    "Lös en rotekvation och kontrollera",
    "<p>Lös √(x + 1) = x − 1.</p>",
    "Kvadrering kan skapa falska lösningar. Därför måste alla svar prövas i ursprungsekvationen.",
    [steg("Kvadrera båda led", "Vänsterledet blir x + 1.", "\\[x+1=(x-1)^2=x^2-2x+1\\]"),
     steg("Lös andragradsekvationen", "Förenkla och använd nollproduktmetoden.", "\\[x^2-3x=0\\Rightarrow x(x-3)=0\\Rightarrow x=0\\text{ eller }x=3\\]"),
     steg("Pröva", "x = 0 ger 1 = −1 och är därför en falsk rot. x = 3 ger 2 = 2 och är en lösning.", "\\[x=3\\]")],
    "\\(x=3\\).",
    "En rot är aldrig negativ, så högerledet måste också vara minst noll.", "Rotekvationer och falska rötter");

  add("ma2-grund-2-07b", 2, "funktionsskrivsatt_rep", BC,
    "Tolka funktionsnotation",
    "<p>Funktionen f ges av f(x) = x² − 3. Beräkna f(−2) och lös f(x) = 6.</p>",
    "\\(f(-2)\\) frågar efter ett funktionsvärde. \\(f(x)=6\\) frågar efter de x-värden som ger funktionsvärdet 6.",
    [steg("Beräkna funktionsvärdet", "Ersätt varje x med −2.", "\\[f({\\color{#D1495B}{-2}})=({\\color{#D1495B}{-2}})^2-3=1\\]"),
     steg("Lös ekvationen", "Sätt funktionsuttrycket lika med 6.", "\\[x^2-3=6\\Rightarrow x^2=9\\Rightarrow x=\\pm3\\]")],
    "\\(f(-2)=1\\). Ekvationen \\(f(x)=6\\) har lösningarna \\(x=-3\\) och \\(x=3\\).",
    "Skilj på ett givet x-värde och ett givet funktionsvärde.", "Tolka funktionsnotation och funktionsvärden");

  add("ma2-grund-2-08", 2, ["andragradsfunktioner", "andragradsfunktion_graf", "symmetrilinje_extrempunkt"], ALL,
    "Bestäm nollställen, symmetrilinje och extrempunkt",
    "<p>Undersök funktionen f(x) = x² − 4x + 3.</p>" + parabelFigur,
    "Nollställena visar var grafen skär x-axeln. Symmetrilinjen ligger mitt emellan nollställena.",
    [steg("Bestäm nollställena", "Faktorisera och använd nollproduktmetoden.", "\\[x^2-4x+3=(x-1)(x-3)\\Rightarrow x=1\\text{ eller }x=3\\]"),
     steg("Bestäm symmetrilinjen", "Ta medelvärdet av nollställena.", "\\[x=\\frac{1+3}{2}=2\\]"),
     steg("Bestäm extrempunkten", "Sätt x = 2 i funktionen.", "\\[f({\\color{#D1495B}{2}})={\\color{#D1495B}{2}}^2-4\\cdot{\\color{#D1495B}{2}}+3=-1\\]")],
    "Nollställena är 1 och 3, symmetrilinjen är \\(x=2\\) och minimipunkten är \\((2,-1)\\).",
    "När koefficienten framför x² är positiv öppnar parabeln uppåt.", "Grundegenskaper hos andragradsfunktioner");

  add("ma2-grund-2-10", 2, "fran_graf_till_formel", ALL,
    "Bestäm en andragradsfunktion från nollställen",
    "<p>Parabeln har nollställena −1 och 4 och går genom den markerade punkten (0, −8). Bestäm funktionen.</p>" + nollstalleFigur,
    "Med nollställena \\(x_1\\) och \\(x_2\\) kan funktionen skrivas \\(f(x)=a(x-x_1)(x-x_2)\\).",
    [steg("Skriv faktorformen", "Nollställena ger var sin faktor.", "\\[f(x)=a(x+1)(x-4)\\]"),
     steg("Bestäm a", "Sätt in punkten (0, −8).", "\\[-8=a({\\color{#D1495B}{0}}+1)({\\color{#D1495B}{0}}-4)=-4a\\Rightarrow a=2\\]"),
     steg("Skriv funktionen", "Behåll gärna faktorformen när nollställena är viktiga.", "\\[f(x)=2(x+1)(x-4)\\]")],
    "\\(f(x)=2(x+1)(x-4)\\).",
    "Nollställena bestämmer faktorerna; ytterligare en punkt bestämmer a.", "Bestämma andragradsfunktion från graf");

  add("ma2-grund-2-11", 2, "andragradsfunktioner_tillampningar", ALL,
    "Tolka en andragradsmodell",
    "<p>Höjden i meter för en boll beskrivs av h(t) = −5t² + 20t + 1. När är bollen som högst?</p>",
    "Skriv först andragradsuttrycket på formen \\(t^2+pt+q\\). Då ligger symmetrilinjen vid \\(t=-p/2\\), mitt emellan ekvationens två rötter.",
    [steg("Gör koefficienten framför t² till 1", "Dividera uttrycket med −5. Det ändrar inte symmetrilinjens läge.", "\\[t^2-4t-0{,}2\\quad\\Rightarrow\\quad p=-4\\]"),
     steg("Bestäm tiden med symmetrilinjen", "Använd t = −p/2.", "\\[t=-\\frac p2=-\\frac{-4}{2}=2\\]"),
     steg("Beräkna höjden", "Sätt t = 2 i modellen.", "\\[h({\\color{#D1495B}{2}})=-5\\cdot{\\color{#D1495B}{2}}^2+20\\cdot{\\color{#D1495B}{2}}+1=21\\]")],
    "Bollen är som högst efter 2 s, på höjden 21 m.",
    "Svara med både x-värdets och y-värdets betydelse i situationen.", "Tillämpa andragradsmodeller");

  add("ma2-grund-2-12", 2, "potensregler", ALL,
    "Använd potensreglerna",
    "<p>Förenkla (x³ · x⁵)/x².</p>",
    "Vid multiplikation med samma bas adderas exponenterna. Vid division subtraheras de.",
    [steg("Multiplicera potenserna", "Behåll basen x och addera exponenterna.", "\\[x^3\\cdot x^5=x^{3+5}=x^8\\]"),
     steg("Dividera", "Subtrahera exponenten i nämnaren.", "\\[\\frac{x^8}{x^2}=x^{8-2}=x^6\\]")],
    "\\(x^6\\), för \\(x\\ne0\\).",
    "Reglerna gäller när baserna är lika.", "Potensregler");

  add("ma2-grund-2-13", 2, "potensekvationer", ALL,
    "Lös en potensekvation",
    "<p>Lös x³ = 64.</p>",
    "Ta tredje roten ur båda led för att göra kuben ogjord.",
    [steg("Ta tredje roten", "Tredje roten ur x³ är x.", "\\[x=\\sqrt[3]{64}\\]"),
     steg("Beräkna", "Eftersom 4³ = 64 är tredje roten 4.", "\\[x=4\\]")],
    "\\(x=4\\).",
    "En udda potens kan ha en negativ eller positiv reell lösning beroende på högerledet.", "Potensekvationer");

  add("ma2-grund-2-14", 2, "potensfunktioner", ["2a"],
    "Tolka en potensfunktion",
    "<p>Arean av en cirkel ges av A(r) = πr². Hur förändras arean om radien fördubblas?</p>",
    "I en potensfunktion \\(y=Cx^a\\) multipliceras y med \\(n^a\\) när x multipliceras med n.",
    [steg("Sätt in den nya radien", "Byt r mot 2r.", "\\[A(2r)=\\pi(2r)^2\\]"),
     steg("Förenkla", "Kvadraten gäller både 2 och r.", "\\[A(2r)=4\\pi r^2=4A(r)\\]")],
    "Arean blir fyra gånger så stor.",
    "Dubbelt x ger inte alltid dubbelt y; exponenten avgör.", "Potensfunktioner");

  add("ma2-grund-2-15", 2, "exponentialfunktioner", ALL,
    "Bygg och använd en exponentialmodell",
    "<p>Ett kapital på 5 000 kr ökar med 4 % per år. Skriv en modell och beräkna värdet efter 3 år.</p>",
    "Kapitalet behåller hela sitt tidigare värde och får dessutom 4 % extra varje år. Det betyder att nästa års värde är 104 % av årets värde, alltså 1,04 gånger så stort.",
    [steg("Bestäm startvärde och faktor", "Startvärdet är 5 000. Eftersom 104 % skrivs 1,04 i decimalform är förändringsfaktorn 1,04.", "\\[104\\,\\%=1{,}04\\qquad K(x)=5000\\cdot1{,}04^x\\]"),
     steg("Sätt in tiden", "Exponentens värde är antalet år.", "\\[K({\\color{#D1495B}{3}})=5000\\cdot1{,}04^{\\color{#D1495B}{3}}\\approx5624\\]")],
    "Modellen är \\(K(x)=5000\\cdot1{,}04^x\\), och efter 3 år är värdet cirka 5 624 kr.",
    "Procentuell förändring sker på det nya värdet varje period.", "Bestämma och tolka exponentialfunktioner");

  add("ma2-grund-2-16", 2, "exponentialgraf", ALL,
    "Tolka en exponentialfunktions graf",
    "<p>Grafen visar funktionen f(x) = 200 · 0,75ˣ. Ange startvärde och procentuell förändring per x-enhet.</p>" + exponentialFigur,
    "I \\(f(x)=C\\cdot a^x\\) är C startvärdet och a förändringsfaktorn.",
    [steg("Läs av startvärdet", "När x = 0 är a⁰ = 1.", "\\[f(0)=200\\]"),
     steg("Tolka faktorn", "0,75 = 1 − 0,25 innebär en minskning med 25 %.", "\\[1-0{,}75=0{,}25=25\\,\\%\\]")],
    "Startvärdet är 200 och mängden minskar med 25 % per x-enhet.",
    "En faktor mellan 0 och 1 ger avtagande exponentialfunktion.", "Tolka exponentialfunktion från graf");

  add("ma2-grund-2-17", 2, "exponentialekvationer", ALL,
    "Lös en exponentialekvation grafiskt",
    "<p>Lös 3 · 1,5ˣ = 10 med ett digitalt grafverktyg.</p>" + exponentialEkvFigur,
    "Rita vänsterledet och högerledet som två funktioner. Skärningens x-koordinat är lösningen.",
    [steg("Skriv in två funktioner", "Använd y₁ = 3·1,5ˣ och y₂ = 10.", "\\[y_1=3\\cdot1{,}5^x,\\quad y_2=10\\]"),
     steg("Läs av skärningen", "Grafverktyget ger x ungefär 2,97.", "\\[x\\approx2{,}97\\]"),
     steg("Rimlighetskontroll", "Vid x = 3 blir vänsterledet 10,125, alltså nära 10.", "\\[3\\cdot1{,}5^3=10{,}125\\]")],
    "\\(x\\approx2{,}97\\).",
    "Grafisk lösning ger ofta ett närmevärde; ange rimligt antal decimaler.", "Lösa exponentialekvationer");

  add("ma2-grund-2-18", 2, "logaritmbegreppet", BC,
    "Förstå logaritmer",
    "<p>Beräkna lg 1 000 och förklara vad svaret betyder.</p>",
    "\\(\\lg a\\) är den exponent som 10 ska upphöjas till för att bli a.",
    [steg("Skriv frågan som en potens", "Sök exponenten x i 10ˣ = 1 000.", "\\[10^x=1000\\]"),
     steg("Bestäm exponenten", "1 000 = 10³.", "\\[\\lg1000=3\\]")],
    "\\(\\lg1000=3\\), eftersom \\(10^3=1000\\).",
    "En logaritm är en exponent.", "Logaritmbegreppet och enkla logaritmer");

  add("ma2-grund-2-19", 2, "logaritmlagar", BC,
    "Använd logaritmlagarna",
    "<p>Förenkla lg 4 + lg 25.</p>",
    "En summa av logaritmer med samma bas kan skrivas som logaritmen av en produkt.",
    [steg("Använd produktlagen", "lg a + lg b = lg(ab).", "\\[\\lg4+\\lg25=\\lg(4\\cdot25)\\]"),
     steg("Beräkna produkten", "4·25 = 100 och 100 = 10².", "\\[\\lg100=2\\]")],
    "Uttrycket är 2.",
    "Summa blir produkt; differens blir kvot.", "Logaritmlagar");

  add("ma2-grund-2-20", 2, "exponentialekvationer", BC,
    "Lös en exponentialekvation med logaritmer",
    "<p>Lös 2 · 1,08ˣ = 5.</p>",
    "Isolera potensen, logaritmera båda led och använd att \\(\\lg(a^x)=x\\lg a\\).",
    [steg("Isolera potensen", "Dela båda led med 2.", "\\[1{,}08^x=2{,}5\\]"),
     steg("Logaritmera", "Flytta ner exponenten med logaritmlagen.", "\\[x\\lg1{,}08=\\lg2{,}5\\]"),
     steg("Lös ut x", "Dividera med lg 1,08.", "\\[x=\\frac{\\lg2{,}5}{\\lg1{,}08}\\approx11{,}9\\]")],
    "\\(x\\approx11{,}9\\).",
    "Isolera exponentialuttrycket innan du logaritmerar.", "Lösa exponentialekvationer");

  add("ma2-grund-2-21", 2, "jamfora_exponential_potens", BC,
    "Skilj på potens- och exponentialfunktion",
    "<p>Vilken av funktionerna f(x) = 3x² och g(x) = 3 · 2ˣ är en potensfunktion respektive exponentialfunktion?</p>",
    "Titta på var variabeln står: i basen eller i exponenten.",
    [steg("Klassificera f", "I 3x² är x bas och exponenten 2 är konstant.", "\\[f(x)=3x^2\\quad\\text{potensfunktion}\\]"),
     steg("Klassificera g", "I 3·2ˣ står x i exponenten.", "\\[g(x)=3\\cdot2^x\\quad\\text{exponentialfunktion}\\]")],
    "f är en potensfunktion och g är en exponentialfunktion.",
    "Potensfunktion: variabel bas. Exponentialfunktion: variabel exponent.", "Jämföra potens- och exponentialfunktioner");

  add("ma2-grund-2-22", 2, ["regressionsanalys_olika_modeller", "modellval_regression"], BC,
    "Välj en rimlig regressionsmodell",
    "<p>Ett mätvärde ökar med ungefär samma procent varje år. Ska du i första hand pröva linjär, potens- eller exponentialregression?</p>",
    "Modellval ska bygga på förändringsmönstret, spridningsdiagrammet och vad storheterna betyder i sammanhanget.",
    [steg("Identifiera förändringen", "Samma procent innebär ungefär samma förändringsfaktor mellan mätvärdena."),
     steg("Välj modell", "Konstant förändringsfaktor passar en exponentialmodell.", "\\[y=C\\cdot a^x\\]"),
     steg("Kontrollera", "Granska residualer och om modellens prognoser är rimliga i sammanhanget.")],
    "Pröva i första hand en exponentialmodell.",
    "Konstant skillnad pekar mot linjär modell; konstant faktor pekar mot exponentialmodell.", "Välja och granska regressionsmodeller");

  // Kapitel 3: Geometri
  add("ma2-grund-3-01", 3, "geometriska_begrepp_definitioner", BC,
    "Känna igen geometriska begrepp",
    "<p>Förklara kort begreppen <strong>korda</strong>, <strong>diameter</strong> och <strong>bisektris</strong>.</p>",
    "En tydlig definition ska tala om vad begreppet är, inte bara peka ut ett exempel.",
    [steg("Korda och diameter", "En korda är en sträcka mellan två punkter på en cirkel. En diameter är en korda som går genom medelpunkten."),
     steg("Bisektris", "En bisektris delar en vinkel i två lika stora vinklar.", "\\[\\angle 1=\\angle 2\\]")],
    "En korda förenar två punkter på cirkeln, en diameter går dessutom genom medelpunkten och en bisektris halverar en vinkel.",
    "Alla diametrar är kordor, men alla kordor är inte diametrar.", "Identifiera geometriska begrepp");

  add("ma2-grund-3-02", 3, "sats_bevis", BC,
    "Förstå vad ett bevis visar",
    "<p>Varför räcker inte tre ritade exempel som bevis för att ett påstående gäller för alla trianglar?</p>",
    "Exempel kan visa att ett påstående verkar rimligt. Ett bevis måste bygga på definitioner och kända satser så att alla möjliga fall omfattas.",
    [steg("Se begränsningen", "Tre figurer visar bara att påståendet fungerar i just de tre fallen."),
     steg("Beskriv kravet på ett bevis", "Resonemanget måste visa varför påståendet följer för varje triangel som uppfyller villkoren.")],
    "Exemplen omfattar inte alla trianglar. Det behövs ett generellt logiskt resonemang.",
    "En figur hjälper dig att tänka, men figurens utseende är inte i sig ett bevis.", "Förstå och genomföra geometriska bevis");

  add("ma2-grund-3-03", 3, "implikation_ekvivalens", BC,
    "Skilj på implikation och ekvivalens",
    "<p>Avgör vilket samband som gäller: ”x = 4” och ”x² = 16”, för reella x.</p>",
    "Implikation betyder att det första påståendet medför det andra. Ekvivalens kräver att sambandet gäller åt båda hållen.",
    [steg("Pröva framåt", "Om x = 4 är x² = 16. Den riktningen är sann.", "\\[x=4\\Rightarrow x^2=16\\]"),
     steg("Pröva bakåt", "x² = 16 ger både x = 4 och x = −4. Därför följer inte x = 4.", "\\[x^2=16\\nRightarrow x=4\\]")],
    "Det gäller en implikation \\(x=4\\Rightarrow x^2=16\\), men inte en ekvivalens.",
    "För att använda ⇔ måste du kontrollera båda riktningarna.", "Implikation och ekvivalens");

  add("ma2-grund-3-04", 3, "yttervinkelsatsen", BC,
    "Använd yttervinkelsatsen",
    "<p>En yttervinkel i en triangel är 137°. Den ena motstående inre vinkeln är 58°. Bestäm den andra.</p>",
    "En yttervinkel är lika stor som summan av de två motstående inre vinklarna.",
    [steg("Skriv sambandet", "Låt den okända motstående vinkeln vara x.", "\\[137^\\circ=58^\\circ+x\\]"),
     steg("Lös ut vinkeln", "Subtrahera 58° från båda led.", "\\[x=137^\\circ-58^\\circ=79^\\circ\\]")],
    "Den andra motstående inre vinkeln är \\(79^\\circ\\).",
    "Använd de två inre vinklar som inte ligger intill yttervinkeln.", "Yttervinkelsatsen");

  const cirkelFigur = '<svg class="dg" xmlns="http://www.w3.org/2000/svg" width="360" height="250" viewBox="0 0 360 250" role="img" aria-label="Cirkel med medelpunkten M, punkterna A och B samt randpunkten C"><circle class="dg-form" cx="180" cy="128" r="92"/><line class="dg-grenar" x1="180" y1="128" x2="121" y2="198"/><line class="dg-grenar" x1="180" y1="128" x2="239" y2="198"/><line class="dg-form" x1="180" y1="36" x2="121" y2="198"/><line class="dg-form" x1="180" y1="36" x2="239" y2="198"/><circle class="dg-matt" cx="180" cy="128" r="4"/><circle class="dg-matt" cx="121" cy="198" r="4"/><circle class="dg-matt" cx="239" cy="198" r="4"/><circle class="dg-matt" cx="180" cy="36" r="4"/><text class="dg-txt" x="194" y="124">M</text><text class="dg-txt" x="105" y="216">A</text><text class="dg-txt" x="246" y="216">B</text><text class="dg-txt" x="180" y="24" text-anchor="middle">C</text><text class="dg-etikett" x="180" y="178" text-anchor="middle">80°</text><text class="dg-etikett" x="180" y="72" text-anchor="middle">x</text></svg>';
  add("ma2-grund-3-05", 3, "randvinkel_medelpunkt", BC,
    "Beräkna en randvinkel",
    "<p>Medelpunktsvinkeln ∠AMB är 80°. Bestäm randvinkeln ∠ACB.</p>" + cirkelFigur,
    "En randvinkel är hälften så stor som medelpunktsvinkeln över samma cirkelbåge.",
    [steg("Kontrollera cirkelbågen", "Både ∠AMB och ∠ACB spänner över bågen AB."),
     steg("Halvera medelpunktsvinkeln", "Randvinkeln är hälften av 80°.", "\\[x=\\frac{80^\\circ}{2}=40^\\circ\\]")],
    "Randvinkeln är \\(40^\\circ\\).",
    "Medelpunktsvinkel = 2 · randvinkel, när vinklarna hör till samma båge.", "Randvinkel och medelpunktsvinkel");

  add("ma2-grund-3-06", 3, "pythagoras", ALL,
    "Beräkna en längd med Pythagoras sats",
    "<p>En rätvinklig triangel har kateterna 7 cm och 24 cm. Bestäm hypotenusan.</p>",
    "I en rätvinklig triangel gäller \\(a^2+b^2=c^2\\), där c är hypotenusan mitt emot den räta vinkeln.",
    [steg("Sätt in kateterna", "Hypotenusan är den okända sidan c.", "\\[7^2+24^2=c^2\\]"),
     steg("Beräkna c²", "Addera kvadraterna.", "\\[49+576=625=c^2\\]"),
     steg("Ta kvadratroten", "En längd är positiv.", "\\[c=\\sqrt{625}=25\\]")],
    "Hypotenusan är \\(25\\) cm.",
    "Pythagoras sats får bara användas direkt i rätvinkliga trianglar.", "Beräkna längder med Pythagoras sats");

  add("ma2-grund-3-07", 3, "likformighet", BC,
    "Beräkna med likformighet",
    "<p>Två trianglar är likformiga. En sida på 6 cm i den lilla motsvarar 15 cm i den stora. En annan sida i den lilla är 8 cm. Hur lång är motsvarande sida i den stora?</p>",
    "I likformiga figurer är kvoten mellan motsvarande längder densamma.",
    [steg("Bestäm längdskalan", "Dela en stor sida med motsvarande liten sida.", "\\[k=\\frac{15}{6}=2{,}5\\]"),
     steg("Skala den andra sidan", "Multiplicera den lilla längden med 2,5.", "\\[8\\cdot2{,}5=20\\]")],
    "Sidan i den stora triangeln är \\(20\\) cm.",
    "Skriv motsvarande sidor i samma ordning i alla kvoter.", "Likformighet, skala och indirekt mätning");

  add("ma2-grund-3-08", 3, "topptriangel_transversal", BC,
    "Använd topptriangelsatsen",
    "<p>I triangeln ABC är DE parallell med BC. AD = 4, DB = 8 och DE = 5. Bestäm BC.</p>",
    "När DE är parallell med BC är topptriangeln ADE likformig med hela triangeln ABC.",
    [steg("Bestäm hela sidan AB", "AD och DB ligger efter varandra.", "\\[AB=4+8=12\\]"),
     steg("Skriv en kvot", "DE motsvarar BC och AD motsvarar AB.", "\\[\\frac{DE}{BC}=\\frac{AD}{AB}=\\frac4{12}\\]"),
     steg("Lös ut BC", "Den stora triangeln har tre gånger så långa sidor.", "\\[BC=3\\cdot5=15\\]")],
    "\\(BC=15\\).",
    "Använd hela sidan i den stora triangeln, inte bara den nedre delsträckan.", "Beräkna med topptriangelsatsen");

  add("ma2-grund-3-09", 3, "bevis_likformighet", BC,
    "Visa att två trianglar är likformiga",
    "<p>Två trianglar har vardera en vinkel på 50° och en vinkel på 70°. Förklara varför trianglarna är likformiga.</p>",
    "Två trianglar är likformiga om två vinklar i den ena är lika stora som två vinklar i den andra.",
    [steg("Jämför två vinklar", "Båda trianglarna har vinklarna 50° och 70°."),
     steg("Dra slutsatsen", "Vinkel–vinkel-villkoret är uppfyllt. Den tredje vinkeln blir dessutom 60° i båda.", "\\[180^\\circ-50^\\circ-70^\\circ=60^\\circ\\]")],
    "Trianglarna är likformiga enligt vinkel–vinkel.",
    "Ett likformighetsbevis ska ange både vilka vinklar eller sidkvoter som är lika och vilket villkor som används.", "Bevis med likformighet");

  add("ma2-grund-3-10", 3, "kordasatsen_biskarningssatsen", BC,
    "Använd kordasatsen",
    "<p>Två kordor AB och CD skär varandra i P. AP = 5, PB = 6 och CP = 3. Bestäm PD.</p>",
    "För två kordor som skär varandra inne i en cirkel gäller \\(AP\\cdot PB=CP\\cdot PD\\).",
    [steg("Sätt in längderna", "Låt den okända sträckan PD vara x.", "\\[5\\cdot6=3\\cdot x\\]"),
     steg("Lös ut x", "Dividera båda led med 3.", "\\[x=\\frac{30}{3}=10\\]")],
    "\\(PD=10\\).",
    "Multiplicera de två delarna på samma korda med varandra.", "Beräkna sträckor med kordasatsen");

  add("ma2-grund-3-11", 3, "avstandsformeln_mittpunktsformeln", ALL,
    "Bestäm avstånd och mittpunkt",
    "<p>Punkterna är A(1, 2) och B(7, 10). Bestäm sträckan AB och sträckans mittpunkt.</p>",
    "Koordinatskillnaderna är kateter i en rätvinklig triangel. Mittpunkten fås genom medelvärdet av respektive koordinat.",
    [steg("Beräkna koordinatskillnaderna", "Skillnaden i x-led är 6 och i y-led 8.", "\\[\\Delta x=7-1=6,\\quad\\Delta y=10-2=8\\]"),
     steg("Bestäm avståndet", "Använd Pythagoras sats.", "\\[AB=\\sqrt{6^2+8^2}=\\sqrt{100}=10\\]"),
     steg("Bestäm mittpunkten", "Ta medelvärdet av x-koordinaterna och y-koordinaterna.", "\\[M=\\left(\\frac{1+7}{2},\\frac{2+10}{2}\\right)=(4,6)\\]")],
    "\\(AB=10\\) och mittpunkten är \\((4,6)\\).",
    "Blanda inte ihop x- och y-koordinater när du beräknar mittpunkten.", "Avstånd och mittpunkt i koordinatsystem");

  add("ma2-grund-3-12", 3, "koordinatgeometri_problemlosning", ALL,
    "Kontrollera en rät vinkel med koordinater",
    "<p>Punkterna är A(0, 0), B(4, 0) och C(4, 3). Visa att triangeln ABC är rätvinklig.</p>",
    "Beräkna sidlängderna och kontrollera om den längsta sidan uppfyller Pythagoras sats.",
    [steg("Bestäm sidlängderna", "AB är horisontell och BC vertikal. Avståndsformeln ger AC.", "\\[AB=4,\\quad BC=3,\\quad AC=\\sqrt{4^2+3^2}=5\\]"),
     steg("Kontrollera Pythagoras", "Den längsta sidan är AC.", "\\[AB^2+BC^2=4^2+3^2=25=AC^2\\]")],
    "Triangeln är rätvinklig i B.",
    "När Pythagoras likhet gäller är vinkeln mellan de två kortare sidorna rät.", "Koordinatgeometrisk problemlösning");

  // Kapitel 4: Statistik
  add("ma2-grund-4-01", 4, "lagesmatt", ALL,
    "Bestäm medelvärde, median och typvärde",
    "<p>Bestäm medelvärde, median och typvärde för talen 2, 4, 4, 5, 10.</p>",
    "Medelvärdet använder alla värden. Medianen är det mittersta sorterade värdet. Typvärdet är det vanligaste.",
    [steg("Beräkna medelvärdet", "Addera värdena och dela med antalet.", "\\[\\bar x=\\frac{2+4+4+5+10}{5}=5\\]"),
     steg("Bestäm medianen", "Talen är redan sorterade; det tredje talet ligger i mitten.", "\\[\\text{median}=4\\]"),
     steg("Bestäm typvärdet", "4 förekommer två gånger och övriga en gång.", "\\[\\text{typvärde}=4\\]")],
    "Medelvärdet är 5, medianen 4 och typvärdet 4.",
    "Sortera alltid materialet innan du bestämmer medianen.", "Lägesmått");

  add("ma2-grund-4-02", 4, "kvartiler_percentiler", ALL,
    "Bestäm median och kvartiler",
    "<p>Bestäm median, undre kvartil och övre kvartil för 2, 3, 5, 7, 8, 10, 12, 15.</p>",
    "Medianen delar materialet i två halvor. Kvartilerna är medianerna i den undre respektive övre halvan.",
    [steg("Bestäm medianen", "Det finns åtta värden, så ta medelvärdet av det fjärde och femte.", "\\[Q_2=\\frac{7+8}{2}=7{,}5\\]"),
     steg("Bestäm undre kvartilen", "Medianen i 2, 3, 5, 7 är medelvärdet av 3 och 5.", "\\[Q_1=4\\]"),
     steg("Bestäm övre kvartilen", "Medianen i 8, 10, 12, 15 är medelvärdet av 10 och 12.", "\\[Q_3=11\\]")],
    "\\(Q_1=4\\), medianen är \\(7{,}5\\) och \\(Q_3=11\\).",
    "Olika digitala verktyg kan använda något olika kvartildefinitioner; följ kursens eller verktygets metod konsekvent.", "Bestämma median och kvartiler");

  add("ma2-grund-4-03", 4, "ladagram", ALL,
    "Tolka ett lådagram",
    "<p>Bestäm lådagrammets kvartilavstånd och variationsbredd.</p>" + ladaFigur,
    "Lådan går från Q₁ till Q₃. Hela diagrammet går från minsta till största värdet.",
    [steg("Beräkna kvartilavståndet", "Subtrahera den undre kvartilen från den övre.", "\\[Q_3-Q_1=12-5=7\\]"),
     steg("Beräkna variationsbredden", "Subtrahera minsta värdet från största.", "\\[17-2=15\\]")],
    "Kvartilavståndet är 7 och variationsbredden är 15.",
    "Medianstrecket delar lådan, men behöver inte ligga mitt i den.", "Lådagram");

  add("ma2-grund-4-04", 4, "linjar_regression", BC,
    "Tolka en regressionslinje och göra en prognos",
    "<p>Den redan anpassade linjen i spridningsdiagrammet har ekvationen y = 2,4x + 18, där x är antal studietimmar och y är provpoäng. Tolka koefficienterna och beräkna prognosen för 10 timmar.</p>" + regressionFigur,
    "Riktningskoefficienten beskriver modellens genomsnittliga förändring per x-enhet. Konstanttermen är modellens y-värde när x = 0.",
    [steg("Tolka koefficienterna", "2,4 betyder 2,4 poäng mer per extra studietimme. 18 är modellens poäng vid 0 timmar."),
     steg("Gör prognosen", "Sätt in x = 10.", "\\[y=2{,}4\\cdot{\\color{#D1495B}{10}}+18=42\\]")],
    "Modellen ökar med 2,4 poäng per timme, har startvärdet 18 och ger prognosen 42 poäng vid 10 timmar.",
    "En regressionsmodell beskriver ett mönster i data, inte en exakt regel för varje individ.", "Tolka koefficienter i en regressionsmodell");

  add("ma2-grund-4-05", 4, "korrelation_koefficient", BC,
    "Tolka korrelation utan att påstå kausalitet",
    "<p>Spridningsdiagrammet har korrelationskoefficienten r = −0,92 och visar utomhustemperatur och uppvärmningskostnad. Vad säger värdet – och vad säger det inte?</p>" + korrelationFigur,
    "Tecknet visar sambandets riktning och avståndet från noll visar styrkan i det linjära sambandet.",
    [steg("Tolka tecknet", "Det negativa tecknet betyder att högre temperatur brukar höra ihop med lägre kostnad."),
     steg("Tolka styrkan", "|r| = 0,92 ligger nära 1 och visar ett starkt negativt linjärt samband.", "\\[|r|=0{,}92\\]"),
     steg("Avgränsa slutsatsen", "Korrelationen visar inte ensam att den ena variabeln orsakar den andra. För kausalitet behövs mer kunskap och en rimlig mekanism.")],
    "Det finns ett starkt negativt linjärt samband. r-värdet bevisar inte i sig ett orsakssamband.",
    "Korrelation beskriver samvariation; kausalitet handlar om orsak.", "Tolka korrelationskoefficient");

  add("ma2-grund-4-06", 4, "standardavvikelse", ALL,
    "Tolka standardavvikelse",
    "<p>Två löpare har samma medeltid. Löpare A har standardavvikelsen 0,08 s och löpare B 0,31 s. Vem springer jämnast?</p>",
    "Standardavvikelsen beskriver hur mycket värdena typiskt avviker från medelvärdet. Ett mindre värde betyder mindre spridning.",
    [steg("Jämför spridningen", "0,08 s är mindre än 0,31 s.", "\\[0{,}08<0{,}31\\]"),
     steg("Tolka i sammanhanget", "A:s tider ligger i regel närmare A:s medeltid och är därför jämnare.")],
    "Löpare A springer jämnast.",
    "Standardavvikelsen säger något om spridningen, inte i sig vem som har bäst medelvärde.", "Standardavvikelse");

  add("ma2-grund-4-06b", 4, "standardavvikelse", ALL,
    "Beräkna standardavvikelse",
    "<p>Hela datamaterialet är 2, 4, 4, 6. Beräkna medelvärdet och populationens standardavvikelse.</p>",
    "Standardavvikelsen bygger på avstånden till medelvärdet. Avstånden kvadreras så att negativa och positiva avvikelser inte tar ut varandra.",
    [steg("Beräkna medelvärdet", "Addera värdena och dela med fyra.", "\\[\\bar x=\\frac{2+4+4+6}{4}=4\\]"),
     steg("Beräkna de kvadrerade avvikelserna", "Subtrahera medelvärdet 4 från varje värde och kvadrera.", "\\[(2-4)^2+(4-4)^2+(4-4)^2+(6-4)^2=8\\]"),
     steg("Ta roten ur medelvärdet", "Dividera med antalet värden och ta kvadratroten.", "\\[\\sigma=\\sqrt{\\frac84}=\\sqrt2\\approx1{,}4\\]")],
    "Medelvärdet är 4 och standardavvikelsen är ungefär \\(1{,}4\\).",
    "Om värdena är ett stickprov använder vissa verktyg n − 1 i nämnaren. Kontrollera om uppgiften frågar efter stickprovets eller hela materialets standardavvikelse.", "Standardavvikelse");

  add("ma2-grund-4-07", 4, "normalfordelat_material", ALL,
    "Använd 68–95–99,7-regeln",
    "<p>Ett normalfördelat material har medelvärdet 100 och standardavvikelsen 15. Mellan vilka värden ligger ungefär 95 % av observationerna?</p>",
    "I en normalfördelning ligger ungefär 68 % inom en standardavvikelse och ungefär 95 % inom två standardavvikelser från medelvärdet.",
    [steg("Beräkna två standardavvikelser", "Två standardavvikelser är 2·15 = 30.", "\\[2\\sigma=30\\]"),
     steg("Bestäm gränserna", "Subtrahera och addera 30 till medelvärdet.", "\\[100-30=70,\\quad100+30=130\\]")],
    "Ungefär 95 % ligger mellan 70 och 130.",
    "Rita gärna en enkel normalfördelningskurva och markera medelvärdet innan du räknar.", "Sannolikhet i normalfördelning");

  add("ma2-grund-4-08", 4, "normalfordelning_digitala_verktyg", ALL,
    "Beräkna normalfördelningssannolikhet digitalt",
    "<p>X är normalfördelad med μ = 72 och σ = 8. Bestäm med ett digitalt verktyg P(65 ≤ X ≤ 80).</p>",
    "Välj normalfördelning, skriv in medelvärde och standardavvikelse och ange både en undre och en övre gräns.",
    [steg("Ställ in fördelningen", "Ange μ = 72 och σ = 8."),
     steg("Ange intervallet", "Välj området mellan 65 och 80.", "\\[P(65\\le X\\le80)\\]"),
     steg("Läs av och avrunda", "Verktyget ger ungefär 0,651.", "\\[P\\approx0{,}651=65{,}1\\,\\%\\]")],
    "Sannolikheten är ungefär \\(65{,}1\\,\\%\\).",
    "Kontrollera att du har valt området mellan gränserna och inte de två svansarna.", "Sannolikhet i normalfördelning");

  // Kapitel 5: Programspecifika tillämpningar
  add("ma2-grund-5-01", 5, "ekonomiprogrammet", ["2b"],
    "Tolka en ekonomisk regressionsmodell",
    "<p>En modell för reklamkostnad och veckoförsäljning är y = 18,5x + 240, där båda beloppen anges i tusen kronor. Tolka talen 18,5 och 240.</p>",
    "Koefficienterna ska alltid beskrivas med variablernas enheter och betydelse.",
    [steg("Tolka riktningskoefficienten", "När reklamkostnaden ökar med 1 000 kr förutsäger modellen att försäljningen ökar med 18 500 kr."),
     steg("Tolka konstanttermen", "Vid 0 kr i reklamkostnad förutsäger modellen en veckoförsäljning på 240 000 kr.")],
    "18,5 är modellens ökning i försäljning per extra tusen kronor reklam. 240 är den förutsagda försäljningen utan reklamkostnad.",
    "Skriv aldrig bara ”ökningen är 18,5” – ta med både enhet och per vad.", "Linjär regression och prognoser");

  add("ma2-grund-5-02", 5, "vard_omsorgsprogrammet", ["2a"],
    "Använd en linjär modell i vård och omsorg",
    "<p>Tiden för dokumentation modelleras med T(n) = 14n + 30 minuter, där n är antal ärenden. Tolka talen och beräkna T(12).</p>",
    "I en linjär modell är koefficienten framför variabeln tid per ärende och konstanttermen fast tid.",
    [steg("Tolka modellen", "14 betyder 14 minuter per ärende och 30 betyder 30 minuters fast tid."),
     steg("Sätt in antalet ärenden", "Ersätt n med 12.", "\\[T({\\color{#D1495B}{12}})=14\\cdot{\\color{#D1495B}{12}}+30=198\\]")],
    "Det tar enligt modellen 198 minuter. Talen betyder 14 min/ärende och 30 min fast tid.",
    "Kontrollera om modellens svar är rimligt i den praktiska situationen.", "Växla mellan graf, tabell, formel och situation för linjära funktioner");

  add("ma2-grund-5-03", 5, "vvs_fastighetsprogrammet", ["2a"],
    "Använd en potensmodell för tryckfall",
    "<p>Tryckfallet i en kanal modelleras med Δp = 0,018q², där q är luftflödet i L/s. Beräkna tryckfallet när q = 120 L/s.</p>",
    "Sätt in luftflödet med rätt enhet och räkna kvadraten före multiplikationen.",
    [steg("Sätt in q", "Ersätt q med 120.", "\\[\\Delta p=0{,}018\\cdot{\\color{#D1495B}{120}}^2\\]"),
     steg("Beräkna", "120² = 14 400.", "\\[\\Delta p=0{,}018\\cdot14400=259{,}2\\]")],
    "Tryckfallet är \\(259{,}2\\) Pa.",
    "Om luftflödet fördubblas blir tryckfallet fyra gånger så stort i denna modell.", "Tolka och använda potensfunktioner");

  add("ma2-grund-5-04", 5, "samhallsvetenskapsprogrammet", ["2b"],
    "Lös ett undersökningsproblem med ekvationssystem",
    "<p>En undersökning får 320 svar. Ett webbsvar tar 2 minuter att behandla och ett telefonsvar 6 minuter. Totalt tar behandlingen 960 minuter. Bestäm antalet av varje sort.</p>",
    "Låt variablerna stå för antalen och skriv en ekvation för totalantalet och en för totaltiden.",
    [steg("Skriv systemet", "Låt x vara webbsvar och y telefonsvar.", "\\[\\begin{cases}x+y=320\\\\2x+6y=960\\end{cases}\\]"),
     steg("Substituera", "Använd x = 320 − y i tidsekvationen.", "\\[2(320-y)+6y=960\\Rightarrow4y=320\\Rightarrow y=80\\]"),
     steg("Bestäm x", "Ta resten av de 320 svaren.", "\\[x=320-80=240\\]")],
    "Undersökningen har 240 webbsvar och 80 telefonsvar.",
    "Kontrollera både antalet svar och den sammanlagda tiden.", "Ekvationssystem i tillämpningar");

  window.TYPUPPGIFTER_MA2 = bank;
})();

/* Visuell och ämnesdidaktisk slutjustering av Ma2. */
(() => {
  const bank=window.TYPUPPGIFTER_MA2;
  const hitta=rubrik=>Object.values(bank).find(g=>g.rubrik===rubrik);
  const utanSvg=html=>String(html||"").replace(/<svg[\s\S]*?<\/svg>/i,"");

  const parabelMjuk='<svg class="dg" viewBox="0 0 390 315" role="img" aria-label="Mjuk parabel med nollställena 1 och 3, symmetrilinjen x lika med 2 och minimipunkten 2, minus 1">'
    +'<path class="dg-rut" d="M34 28V270M78 28V270M122 28V270M166 28V270M210 28V270M254 28V270M298 28V270M342 28V270M34 270H342M34 226H342M34 182H342M34 138H342M34 94H342M34 50H342"/>'
    +'<path class="dg-axel" d="M34 226H354M78 282V18"/><path class="dg-pil" d="M364 226l-12-5v10zM78 8l-5 12h10z"/><line class="dg-hjalp" x1="166" y1="28" x2="166" y2="270" stroke-dasharray="6 6"/>'
    +'<path class="dg-linje" d="M78 94 Q166 446 254 94"/><circle class="dg-skar" cx="122" cy="226" r="7"/><circle class="dg-skar" cx="210" cy="226" r="7"/><circle class="dg-vald" cx="166" cy="270" r="7"/>'
    +'<g class="dg-txt"><text x="34" y="247" text-anchor="middle">−1</text><text x="122" y="247" text-anchor="middle">1</text><text x="166" y="247" text-anchor="middle">2</text><text x="210" y="247" text-anchor="middle">3</text><text x="254" y="247" text-anchor="middle">4</text><text x="298" y="247" text-anchor="middle">5</text><text x="70" y="275" text-anchor="end">−1</text><text x="358" y="217">x</text><text x="88" y="20">y</text></g>'
    +'<text class="dg-etikett" x="108" y="215">(1, 0)</text><text class="dg-etikett" x="216" y="215">(3, 0)</text><text class="dg-etikett" x="176" y="292">min (2, −1)</text><text class="dg-not" x="174" y="45">symmetrilinje x = 2</text></svg>';

  const nollstalleMjuk='<svg class="dg" viewBox="0 0 390 315" role="img" aria-label="Mjuk parabel med nollställena minus 1 och 4 samt punkten 0, minus 8">'
    +'<path class="dg-rut" d="M30 28V270M70 28V270M110 28V270M150 28V270M190 28V270M230 28V270M270 28V270M310 28V270M350 28V270M30 126H350M30 78H350M30 30H350M30 174H350M30 222H350M30 270H350"/>'
    +'<path class="dg-axel" d="M30 126H360M110 280V18"/><path class="dg-pil" d="M370 126l-12-5v10zM110 8l-5 12h10z"/>'
    +'<path class="dg-linje" d="M50 78 Q170 366 290 78"/><circle class="dg-skar" cx="70" cy="126" r="7"/><circle class="dg-skar" cx="270" cy="126" r="7"/><circle class="dg-vald" cx="110" cy="190" r="7"/>'
    +'<g class="dg-txt"><text x="30" y="147" text-anchor="middle">−2</text><text x="70" y="147" text-anchor="middle">−1</text><text x="150" y="147" text-anchor="middle">1</text><text x="190" y="147" text-anchor="middle">2</text><text x="230" y="147" text-anchor="middle">3</text><text x="270" y="147" text-anchor="middle">4</text><text x="310" y="147" text-anchor="middle">5</text><text x="102" y="195" text-anchor="end">−8</text><text x="364" y="117">x</text><text x="120" y="20">y</text></g>'
    +'<text class="dg-etikett" x="45" y="114">x = −1</text><text class="dg-etikett" x="278" y="114">x = 4</text><text class="dg-etikett" x="120" y="184">(0, −8)</text></svg>';

  const yttervinkelFigur='<svg class="dg" viewBox="0 0 620 320" role="img" aria-label="Triangel med en yttervinkel på 137 grader och två motstående inre vinklar på 58 grader och x">'
    +'<path class="dg-form" d="M80 252 L430 252 L245 58 Z"/><line class="dg-linje" x1="430" y1="252" x2="570" y2="252"/><circle class="dg-matt" cx="80" cy="252" r="5"/><circle class="dg-matt" cx="245" cy="58" r="5"/><circle class="dg-matt" cx="430" cy="252" r="5"/>'
    +'<path class="dg-delta" d="M125 252 A45 45 0 0 0 111 220"/><path class="dg-delta" d="M221 87 A40 40 0 0 0 274 88"/><path class="dg-linje" d="M468 252 A38 38 0 0 0 456 225"/>'
    +'<text class="dg-etikett" x="120" y="232">58°</text><text class="dg-rubrik" x="245" y="113" text-anchor="middle">x°</text><text class="dg-etikett" x="475" y="226">137°</text><text class="dg-txt" x="68" y="276">A</text><text class="dg-txt" x="238" y="45">C</text><text class="dg-txt" x="425" y="276">B</text>'
    +'<text class="dg-not" x="310" y="305" text-anchor="middle">Yttervinkeln = summan av de två motstående inre vinklarna.</text></svg>';

  const pythagorasFigur='<svg class="dg" viewBox="0 0 520 300" role="img" aria-label="Rätvinklig triangel med kateterna 7 och 24 centimeter och hypotenusan c">'
    +'<path class="dg-form" d="M105 245 L105 70 L425 245 Z"/><path class="dg-delta" d="M105 215 H135 V245"/><text class="dg-etikett" x="69" y="160">7 cm</text><text class="dg-etikett" x="250" y="270">24 cm</text><text class="dg-etikett" x="279" y="142" transform="rotate(29 279 142)">c</text><text class="dg-not" x="260" y="294" text-anchor="middle">Hypotenusan ligger mitt emot den räta vinkeln.</text></svg>';

  const likformighetFigur='<svg class="dg" viewBox="0 0 650 330" role="img" aria-label="Två likformiga trianglar med markerade motsvarande sidor">'
    +'<path class="dg-form" d="M55 250 L55 112 L225 250 Z"/><path class="dg-form" d="M330 250 L330 55 L585 250 Z"/><path class="dg-delta" d="M55 112 L225 250 M330 55 L585 250"/><path class="dg-linje" d="M55 250 V112 M330 250 V55"/>'
    +'<text class="dg-etikett" x="25" y="184">6 cm</text><text class="dg-etikett" x="116" y="276">8 cm</text><text class="dg-etikett" x="290" y="155">15 cm</text><text class="dg-etikett" x="450" y="276">x</text>'
    +'<path class="dg-delta" d="M55 230 H75 V250 M330 230 H350 V250"/><text class="dg-rubrik" x="140" y="75" text-anchor="middle">liten</text><text class="dg-rubrik" x="458" y="30" text-anchor="middle">stor</text><text class="dg-not" x="325" y="313" text-anchor="middle">Samma färg markerar sidor som motsvarar varandra.</text></svg>';

  const topptriangelFigur='<svg class="dg" viewBox="0 0 620 390" role="img" aria-label="Triangel ABC med en sträcka DE parallell med basen BC">'
    +'<path class="dg-form" d="M300 42 L75 330 L545 330 Z"/><line class="dg-linje" x1="225" y1="138" x2="382" y2="138"/><line class="dg-delta" x1="75" y1="330" x2="545" y2="330"/>'
    +'<text class="dg-txt" x="294" y="30">A</text><text class="dg-txt" x="56" y="350">B</text><text class="dg-txt" x="550" y="350">C</text><text class="dg-txt" x="207" y="136">D</text><text class="dg-txt" x="390" y="136">E</text>'
    +'<text class="dg-etikett" x="238" y="92">AD = 4</text><text class="dg-etikett" x="126" y="244">DB = 8</text><text class="dg-etikett" x="278" y="116">DE = 5</text><text class="dg-etikett" x="290" y="358">BC = x</text>'
    +'<path class="dg-linje" d="M289 132 l10 6 10-6 M289 324 l10 6 10-6"/><text class="dg-not" x="310" y="382" text-anchor="middle">DE ∥ BC ⇒ △ADE är likformig med △ABC.</text></svg>';

  const likformighetsbevisFigur='<svg class="dg" viewBox="0 0 650 300" role="img" aria-label="Två trianglar med lika vinklar 50 och 70 grader">'
    +'<path class="dg-form" d="M55 245 L155 55 L270 245 Z"/><path class="dg-form" d="M350 245 L470 76 L600 245 Z"/>'
    +'<text class="dg-etikett" x="73" y="230">50°</text><text class="dg-etikett" x="160" y="86">70°</text><text class="dg-etikett" x="235" y="230">60°</text><text class="dg-etikett" x="369" y="230">50°</text><text class="dg-etikett" x="472" y="105">70°</text><text class="dg-etikett" x="560" y="230">60°</text>'
    +'<text class="dg-rubrik" x="325" y="280" text-anchor="middle">Två lika vinklar ⇒ trianglarna är likformiga (VV).</text></svg>';

  const kordaFigur='<svg class="dg" viewBox="0 0 520 340" role="img" aria-label="Två kordor AB och CD som skär varandra i punkten P">'
    +'<circle class="dg-form" cx="260" cy="170" r="135"/><line class="dg-form" x1="132" y1="125" x2="390" y2="230"/><line class="dg-linje" x1="160" y1="265" x2="365" y2="70"/><circle class="dg-vald" cx="265" cy="179" r="7"/>'
    +'<text class="dg-txt" x="112" y="118">A</text><text class="dg-txt" x="397" y="241">B</text><text class="dg-txt" x="143" y="282">C</text><text class="dg-txt" x="371" y="64">D</text><text class="dg-etikett" x="276" y="174">P</text>'
    +'<text class="dg-etikett" x="190" y="143">5</text><text class="dg-etikett" x="326" y="212">6</text><text class="dg-etikett" x="208" y="232">3</text><text class="dg-etikett" x="315" y="118">x</text><text class="dg-not" x="260" y="329" text-anchor="middle">AP · PB = CP · PD</text></svg>';

  const koordinatFigur='<svg class="dg" viewBox="0 0 620 390" role="img" aria-label="Koordinatsystem med punkterna A 1,2 och B 7,10 samt en rätvinklig hjälptriangel">'
    +'<path class="dg-rut" d="M70 40V340M120 40V340M170 40V340M220 40V340M270 40V340M320 40V340M370 40V340M420 40V340M470 40V340M520 40V340M570 40V340M70 340H570M70 290H570M70 240H570M70 190H570M70 140H570M70 90H570M70 40H570"/>'
    +'<path class="dg-axel" d="M60 340H590M70 355V25"/><path class="dg-linje" d="M120 290 L420 90"/><path class="dg-hjalp" d="M120 290 H420 V90" stroke-dasharray="7 6"/><circle class="dg-skar" cx="120" cy="290" r="7"/><circle class="dg-skar" cx="420" cy="90" r="7"/><circle class="dg-vald" cx="270" cy="190" r="7"/>'
    +'<text class="dg-etikett" x="88" y="282">A(1, 2)</text><text class="dg-etikett" x="430" y="82">B(7, 10)</text><text class="dg-etikett" x="280" y="183">M(4, 6)</text><text class="dg-txt" x="250" y="315">Δx = 6</text><text class="dg-txt" x="430" y="200">Δy = 8</text></svg>';

  const ratVinkelFigur='<svg class="dg" viewBox="0 0 560 340" role="img" aria-label="Koordinatsystem med triangeln A 0,0, B 4,0 och C 4,3 som är rätvinklig i B">'
    +'<path class="dg-rut" d="M70 45V285M130 45V285M190 45V285M250 45V285M310 45V285M370 45V285M430 45V285M490 45V285M70 285H490M70 225H490M70 165H490M70 105H490M70 45H490"/><path class="dg-axel" d="M55 285H515M70 305V25"/>'
    +'<path class="dg-form" d="M70 285 L310 285 L310 105 Z"/><path class="dg-delta" d="M290 285 V265 H310"/><circle class="dg-skar" cx="70" cy="285" r="6"/><circle class="dg-skar" cx="310" cy="285" r="6"/><circle class="dg-skar" cx="310" cy="105" r="6"/>'
    +'<text class="dg-etikett" x="82" y="276">A(0, 0)</text><text class="dg-etikett" x="320" y="280">B(4, 0)</text><text class="dg-etikett" x="320" y="100">C(4, 3)</text><text class="dg-txt" x="184" y="310">AB = 4</text><text class="dg-txt" x="320" y="205">BC = 3</text><text class="dg-txt" x="172" y="175">AC = 5</text></svg>';

  const grafiskSystemFigur='<svg class="dg" viewBox="0 0 430 330" role="img" aria-label="Koordinatsystem där två räta linjer skär varandra tydligt i punkten 2,3">'
    +'<path class="dg-rut" d="M45 30V280M95 30V280M145 30V280M195 30V280M245 30V280M295 30V280M345 30V280M395 30V280M45 280H395M45 230H395M45 180H395M45 130H395M45 80H395M45 30H395"/><path class="dg-axel" d="M35 280H410M95 295V18"/>'
    +'<path class="dg-linje" d="M45 280 L295 30"/><path class="dg-form" d="M95 30 L345 280"/><circle cx="195" cy="130" r="16" fill="none" class="dg-delta" opacity=".55"/><circle class="dg-skar" cx="195" cy="130" r="8"/><line class="dg-hjalp" x1="195" y1="130" x2="195" y2="280" stroke-dasharray="6 6"/><line class="dg-hjalp" x1="95" y1="130" x2="195" y2="130" stroke-dasharray="6 6"/>'
    +'<text class="dg-etikett" x="212" y="118">skärningspunkt (2, 3)</text><text class="dg-txt" x="300" y="52">y = x + 1</text><text class="dg-txt" x="275" y="248">y = −x + 5</text><text class="dg-txt" x="416" y="273">x</text><text class="dg-txt" x="104" y="18">y</text></svg>';

  const grafiskExponentialFigur='<svg class="dg" viewBox="0 0 450 340" role="img" aria-label="Koordinatsystem där exponentialkurvan y lika med 3 gånger 1,5 upphöjt till x skär linjen y lika med 10 vid x ungefär 2,97">'
    +'<path class="dg-rut" d="M55 30V285M115 30V285M175 30V285M235 30V285M295 30V285M355 30V285M415 30V285M55 285H415M55 225H415M55 165H415M55 105H415M55 45H415"/><path class="dg-axel" d="M45 285H430M55 300V18"/>'
    +'<path class="dg-linje" d="M55 240 C115 232 185 205 233 135 C270 82 320 45 350 25"/><line class="dg-form" x1="55" y1="135" x2="415" y2="135"/><circle cx="233" cy="135" r="17" fill="none" class="dg-delta" opacity=".55"/><circle class="dg-skar" cx="233" cy="135" r="8"/><line class="dg-hjalp" x1="233" y1="135" x2="233" y2="285" stroke-dasharray="6 6"/>'
    +'<text class="dg-etikett" x="248" y="118">skärning (2,97; 10)</text><text class="dg-txt" x="365" y="152">y = 10</text><text class="dg-txt" x="280" y="78">y = 3 · 1,5ˣ</text><text class="dg-txt" x="435" y="279">x</text><text class="dg-txt" x="65" y="20">y</text></svg>';

  const andragrad=hitta("Bestäm nollställen, symmetrilinje och extrempunkt");
  andragrad.t=utanSvg(andragrad.t);
  andragrad.figur=parabelMjuk;

  const franNoll=hitta("Bestäm en andragradsfunktion från nollställen");
  franNoll.kurs=["2c"];
  franNoll.t=utanSvg(franNoll.t);
  franNoll.figur=nollstalleMjuk;

  const system=hitta("Förstå lösningen till ett ekvationssystem");
  system.t=utanSvg(system.t);
  system.figur=grafiskSystemFigur;

  const expGrafiskt=hitta("Lös en exponentialekvation grafiskt");
  expGrafiskt.t=utanSvg(expGrafiskt.t);
  expGrafiskt.figur=grafiskExponentialFigur;

  const figurer={
    "Använd yttervinkelsatsen":yttervinkelFigur,
    "Beräkna en längd med Pythagoras sats":pythagorasFigur,
    "Beräkna med likformighet":likformighetFigur,
    "Använd topptriangelsatsen":topptriangelFigur,
    "Visa att två trianglar är likformiga":likformighetsbevisFigur,
    "Använd kordasatsen":kordaFigur,
    "Bestäm avstånd och mittpunkt":koordinatFigur,
    "Kontrollera en rät vinkel med koordinater":ratVinkelFigur
  };
  Object.entries(figurer).forEach(([rubrik,figur])=>{const kort=hitta(rubrik);if(kort)kort.figur=figur;});

  /* Programspecifika tillämpningar ska inte ingå i ”Det här behöver du kunna”. */
  Object.keys(bank).forEach(nyckel=>{
    if(bank[nyckel].kap===5) delete bank[nyckel];
  });
})();
