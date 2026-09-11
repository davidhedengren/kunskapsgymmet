/* Grundgenomgångar för Matematik – fortsättning nivå 1 i Kunskapsgymmet.
 * Objektens ordning är kursens pedagogiska läsordning. kurs styr 1b/1c.
 */
(() => {
  const ALL = ["1b", "1c"];
  const B = ["1b"];
  const C = ["1c"];
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

  /* Alla figurer använder indexfilens temasäkra dg-klasser. */
  const funktionsFigur = '<svg class="dg" viewBox="0 0 340 278" role="img" aria-label="Parabel som skär x-axeln vid 0 och 4 och har minimipunkten 2, minus 4." style="display:block;width:min(100%,330px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M32 24V244M76 24V244M120 24V244M164 24V244M208 24V244M252 24V244M296 24V244M32 244H296M32 204H296M32 164H296M32 124H296M32 84H296M32 44H296"/><path class="dg-axel" d="M32 84H306M76 254V14"/><path class="dg-pil" d="M314 84l-10-4.5v9zM76 6l-4.5 10h9z"/><g class="dg-txt"><text x="32" y="103" text-anchor="middle">−1</text><text x="120" y="103" text-anchor="middle">1</text><text x="164" y="103" text-anchor="middle">2</text><text x="208" y="103" text-anchor="middle">3</text><text x="252" y="103" text-anchor="middle">4</text><text x="296" y="103" text-anchor="middle">5</text><text x="68" y="129" text-anchor="end">−1</text><text x="68" y="169" text-anchor="end">−2</text><text x="68" y="209" text-anchor="end">−3</text><text x="68" y="249" text-anchor="end">−4</text><text x="310" y="75" text-anchor="end" font-style="italic">x</text><text x="86" y="18" font-style="italic">y</text></g><polyline class="dg-linje" points="76,84 98,154 120,204 142,234 164,244 186,234 208,204 230,154 252,84"/><circle class="dg-matt" cx="76" cy="84" r="5"/><circle class="dg-matt" cx="252" cy="84" r="5"/><circle class="dg-vald" cx="164" cy="244" r="5.5"/><text class="dg-etikett" x="174" y="236">(2, −4)</text></svg>';
  const absolutFigur = '<svg class="dg" viewBox="0 0 340 254" role="img" aria-label="V-formad graf till y lika med absolutbeloppet av x minus 2. Grafens spets är 2, 0." style="display:block;width:min(100%,330px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M32 24V216M76 24V216M120 24V216M164 24V216M208 24V216M252 24V216M296 24V216M32 216H296M32 176H296M32 136H296M32 96H296M32 56H296"/><path class="dg-axel" d="M32 216H306M76 226V14"/><path class="dg-pil" d="M314 216l-10-4.5v9zM76 6l-4.5 10h9z"/><g class="dg-txt"><text x="32" y="235" text-anchor="middle">−1</text><text x="120" y="235" text-anchor="middle">1</text><text x="164" y="235" text-anchor="middle">2</text><text x="208" y="235" text-anchor="middle">3</text><text x="252" y="235" text-anchor="middle">4</text><text x="296" y="235" text-anchor="middle">5</text><text x="68" y="181" text-anchor="end">1</text><text x="68" y="141" text-anchor="end">2</text><text x="68" y="101" text-anchor="end">3</text><text x="68" y="61" text-anchor="end">4</text><text x="310" y="207" text-anchor="end" font-style="italic">x</text><text x="86" y="18" font-style="italic">y</text></g><polyline class="dg-linje" points="32,56 164,216 296,56"/><circle class="dg-vald" cx="164" cy="216" r="5.5"/><text class="dg-etikett" x="174" y="207">(2, 0)</text></svg>';
  const tangentFigur = '<svg class="dg" viewBox="0 0 360 276" role="img" aria-label="En kurva med en tangent i punkten P och en sekant genom P och en närliggande punkt Q." style="display:block;width:min(100%,350px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M36 24V236M86 24V236M136 24V236M186 24V236M236 24V236M286 24V236M336 24V236M36 236H336M36 196H336M36 156H336M36 116H336M36 76H336M36 36H336"/><path class="dg-axel" d="M36 236H346M36 246V14"/><path class="dg-pil" d="M354 236l-10-4.5v9zM36 6l-4.5 10h9z"/><path class="dg-linje" d="M52 220C108 214 146 194 181 154C216 114 258 72 328 38"/><path class="dg-hjalp" d="M90 222L300 72"/><path class="dg-delta" d="M82 226L292 105"/><circle class="dg-vald" cx="181" cy="154" r="5.5"/><circle class="dg-matt" cx="258" cy="72" r="5"/><g class="dg-etikett"><text x="170" y="145">P</text><text x="266" y="66">Q</text><text x="274" y="124">tangent</text><text x="267" y="85">sekant</text></g></svg>';
  const derivataFigur = '<svg class="dg" viewBox="0 0 360 276" role="img" aria-label="Graf till derivatan. Grafen ligger under x-axeln före x lika med 2, skär axeln vid 2 och ligger över axeln efter 2." style="display:block;width:min(100%,350px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M36 24V236M86 24V236M136 24V236M186 24V236M236 24V236M286 24V236M336 24V236M36 236H336M36 196H336M36 156H336M36 116H336M36 76H336M36 36H336"/><path class="dg-axel" d="M36 156H346M86 246V14"/><path class="dg-pil" d="M354 156l-10-4.5v9zM86 6l-4.5 10h9z"/><g class="dg-txt"><text x="136" y="175" text-anchor="middle">1</text><text x="186" y="175" text-anchor="middle">2</text><text x="236" y="175" text-anchor="middle">3</text><text x="286" y="175" text-anchor="middle">4</text><text x="350" y="147" text-anchor="end" font-style="italic">x</text><text x="96" y="18" font-style="italic">f′(x)</text></g><path class="dg-linje" d="M56 226L316 70"/><circle class="dg-skar" cx="186" cy="156" r="5.5"/><text class="dg-etikett" x="196" y="147">f′(2) = 0</text></svg>';
  const integralFigur = '<svg class="dg" viewBox="0 0 360 270" role="img" aria-label="Grafen y lika med x minus 1 från x lika med 0 till x lika med 2. En triangel under x-axeln och en lika stor triangel över x-axeln är markerade." style="display:block;width:min(100%,350px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M46 30V222M106 30V222M166 30V222M226 30V222M286 30V222M346 30V222M46 222H346M46 174H346M46 126H346M46 78H346M46 30H346"/><path class="dg-axel" d="M46 126H352M106 232V20"/><path class="dg-pil" d="M358 126l-9-4.5v9zM106 12l-4.5 10h9z"/><path d="M106 126L166 174L166 126Z" fill="var(--badSoft)" stroke="var(--bad)" stroke-width="1.4"/><path d="M166 126L226 78L226 126Z" fill="var(--goodSoft)" stroke="var(--good)" stroke-width="1.4"/><path class="dg-linje" d="M76 198L256 54"/><g class="dg-txt"><text x="106" y="145" text-anchor="middle">0</text><text x="166" y="145" text-anchor="middle">1</text><text x="226" y="145" text-anchor="middle">2</text><text x="350" y="117" text-anchor="end" font-style="italic">x</text><text x="116" y="24" font-style="italic">y</text></g></svg>';
  const enhetscirkelFigur = '<svg class="dg" viewBox="0 0 330 300" role="img" aria-label="Enhetscirkel med vinkeln 120 grader och punkten minus en halv, roten ur tre genom två." style="display:block;width:min(100%,320px);height:auto;margin:14px auto 4px"><circle class="dg-form" cx="165" cy="148" r="105"/><path class="dg-axel" d="M38 148H292M165 275V21"/><path class="dg-pil" d="M300 148l-10-4.5v9zM165 13l-4.5 10h9z"/><path class="dg-hjalp" d="M112.5 57.1V148M112.5 57.1H165"/><path class="dg-linje" d="M165 148L112.5 57.1"/><path class="dg-delta" d="M201 148A36 36 0 0 0 147 116.8"/><circle class="dg-vald" cx="112.5" cy="57.1" r="5.5"/><g class="dg-txt"><text x="304" y="140" font-style="italic">x</text><text x="175" y="18" font-style="italic">y</text><text x="105" y="47" text-anchor="end">(−1/2, √3/2)</text></g><text class="dg-etikett" x="189" y="116">120°</text></svg>';
  const triangelFigur = '<svg class="dg" viewBox="0 0 360 250" role="img" aria-label="Triangel ABC med sidan a lika med 8, vinkeln A lika med 40 grader och vinkeln B lika med 65 grader." style="display:block;width:min(100%,350px);height:auto;margin:14px auto 4px"><path class="dg-form" d="M42 208L310 208L212 42Z"/><path class="dg-delta" d="M82 208A40 40 0 0 0 75 185M270 208A40 40 0 0 1 289 174"/><g class="dg-txt"><text x="30" y="224">A</text><text x="316" y="224">B</text><text x="212" y="30" text-anchor="middle">C</text><text x="270" y="119">a = 8</text></g><g class="dg-etikett"><text x="86" y="190">40°</text><text x="263" y="188">65°</text></g></svg>';
  const optimeringFigur = '<svg class="dg" viewBox="0 0 360 286" role="img" aria-label="Koordinatsystem med ett markerat tillåtet område vars hörn är 0,0, 5,0, 2,6 och 0,8." style="display:block;width:min(100%,350px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M46 26V246M76 26V246M106 26V246M136 26V246M166 26V246M196 26V246M226 26V246M256 26V246M286 26V246M316 26V246M346 26V246M46 246H346M46 216H346M46 186H346M46 156H346M46 126H346M46 96H346M46 66H346M46 36H346"/><path class="dg-axel" d="M46 246H352M46 252V18"/><path class="dg-pil" d="M358 246l-9-4.5v9zM46 10l-4.5 10h9z"/><polygon points="46,246 196,246 106,66 46,6" fill="var(--accSoft)" stroke="var(--acc)" stroke-width="2"/><g class="dg-vald"><circle cx="46" cy="246" r="5"/><circle cx="196" cy="246" r="5"/><circle cx="106" cy="66" r="5"/><circle cx="46" cy="6" r="5"/></g><g class="dg-txt"><text x="76" y="265" text-anchor="middle">1</text><text x="106" y="265" text-anchor="middle">2</text><text x="136" y="265" text-anchor="middle">3</text><text x="166" y="265" text-anchor="middle">4</text><text x="196" y="265" text-anchor="middle">5</text><text x="38" y="71" text-anchor="end">6</text><text x="38" y="11" text-anchor="end">8</text><text x="352" y="237" text-anchor="end" font-style="italic">x</text><text x="56" y="20" font-style="italic">y</text></g></svg>';

  // Kapitel 1: Algebra och funktioner
  add("mato1-grund-1-01", 1, "polynom", ALL,
    "Tolka och beräkna ett polynom",
    "<p>Polynomet är P(x) = 2x³ − 3x² + 1. Ange grad och ledande koefficient samt beräkna P(2).</p>",
    "Polynomets grad är den största exponenten med en koefficient som inte är noll. Den ledande koefficienten hör till termen med högst grad.",
    [steg("Läs av grad och koefficient", "Högst exponent är 3 och koefficienten framför x³ är 2.", "\\[\\deg P=3,\\qquad a_3=2\\]"),
     steg("Sätt in x = 2", "Ersätt varje x med 2. Det insatta värdet markeras rött.", "\\[P({\\color{#D1495B}{2}})=2\\cdot{\\color{#D1495B}{2}}^3-3\\cdot{\\color{#D1495B}{2}}^2+1=16-12+1=5\\]")],
    "Polynomet har grad 3, ledande koefficient 2 och \\(P(2)=5\\).",
    "En term som saknas har koefficienten noll och ändrar inte polynomets grad.", "Polynombegrepp och polynomvärden");

  add("mato1-grund-1-02", 1, "polynom", ALL,
    "Faktorisera och lös en polynomekvation",
    "<p>Lös ekvationen x³ − 4x = 0.</p>",
    "Bryt först ut en gemensam faktor. Fortsätt faktorisera och använd sedan nollproduktmetoden.",
    [steg("Bryt ut x", "Båda termerna innehåller x.", "\\[x^3-4x=x(x^2-4)\\]"),
     steg("Faktorisera differensen", "Använd konjugatregeln baklänges.", "\\[x(x^2-4)=x(x-2)(x+2)\\]"),
     steg("Använd nollproduktmetoden", "Minst en faktor måste vara noll.", "\\[x=0\\quad\\text{eller}\\quad x=2\\quad\\text{eller}\\quad x=-2\\]")],
    "Lösningarna är \\(x=-2\\), \\(x=0\\) och \\(x=2\\).",
    "Nollproduktmetoden kan användas först när ena ledet är noll och det andra är faktoriserat.", "Faktorisera och lösa polynomekvationer");

  add("mato1-grund-1-03", 1, "funktioner", ALL,
    "Beräkna ett funktionsvärde",
    "<p>Funktionen ges av f(x) = 2x² − 5. Beräkna f(−3).</p>",
    "Ett funktionsvärde fås genom att ersätta varje x i funktionsuttrycket med det givna talet.",
    [steg("Sätt in −3", "Skriv det negativa talet inom parentes. Båda insättningarna markeras röda.", "\\[f({\\color{#D1495B}{-3}})=2({\\color{#D1495B}{-3}})^2-5\\]"),
     steg("Beräkna i rätt ordning", "Kvadrera först och multiplicera sedan.", "\\[2\\cdot9-5=13\\]")],
    "\\(f(-3)=13\\).",
    "\\(f(-3)\\) betyder inte \\(-f(3)\\). Det negativa talet är det x-värde som sätts in.", "Beräkna och tolka funktionsvärden");

  add("mato1-grund-1-04", 1, "funktioner", ALL,
    "Läs viktiga egenskaper ur en graf",
    "<p>Grafen visar y = f(x). Bestäm nollställena, minimipunkten och funktionens minsta värde.</p>" + funktionsFigur,
    "Nollställen finns där grafen skär x-axeln. En minimipunkt anges med två koordinater; det minsta värdet är punktens y-koordinat.",
    [steg("Läs av nollställena", "Grafen skär x-axeln vid x = 0 och x = 4.", "\\[f(0)=0,\\qquad f(4)=0\\]"),
     steg("Läs av minimipunkten", "Parabelns lägsta punkt är markerad.", "\\[(2,-4)\\]"),
     steg("Skilj punkt från värde", "Minimipunkten är (2, −4), medan det minsta funktionsvärdet är −4.")],
    "Nollställena är 0 och 4, minimipunkten är \\((2,-4)\\) och det minsta värdet är −4.",
    "Svara inte bara med x = 2 när frågan gäller en punkt; en punkt behöver både x- och y-koordinat.", "Tolka och jämföra funktionsgrafer");

  add("mato1-grund-1-05", 1, "funktioner", ALL,
    "Kvadratkomplettera och tolka",
    "<p>Skriv f(x) = x² − 6x + 5 på formen (x − a)² + b och bestäm extrempunkten.</p>",
    "Halvera koefficienten framför x och lägg till samt dra ifrån kvadraten av det talet.",
    [steg("Skapa en jämn kvadrat", "Halva −6 är −3. Lägg till och dra ifrån 9.", "\\[x^2-6x+5=x^2-6x+9-9+5\\]"),
     steg("Skriv vertexformen", "De tre första termerna bildar en kvadrat.", "\\[f(x)=(x-3)^2-4\\]"),
     steg("Läs av extrempunkten", "Kvadraten är minst noll och blir noll när x = 3.", "\\[(3,-4)\\]")],
    "\\(f(x)=(x-3)^2-4\\) och minimipunkten är \\((3,-4)\\).",
    "Det tal som läggs till måste också dras ifrån, annars ändras uttryckets värde.", "Kvadratkomplettera och tolka andragradsfunktioner");

  add("mato1-grund-1-05b", 1, "funktioner", ALL,
    "Bestäm en funktion från givna villkor",
    "<p>En andragradsfunktion har nollställena 1 och 3 och går genom punkten (0, 6). Bestäm funktionen.</p>",
    "Nollställena ger varsin faktor. En ytterligare punkt behövs för att bestämma faktorn framför parenteserna.",
    [steg("Skriv funktionen med en okänd faktor", "Nollställena 1 och 3 ger faktorerna x − 1 och x − 3.", "\\[f(x)=a(x-1)(x-3)\\]"),
     steg("Använd punkten (0, 6)", "Sätt in x = 0 och f(0) = 6. Det insatta x-värdet markeras rött.", "\\[f({\\color{#D1495B}{0}})=a({\\color{#D1495B}{0}}-1)({\\color{#D1495B}{0}}-3)=6\\Rightarrow3a=6\\Rightarrow a=2\\]"),
     steg("Skriv den färdiga funktionen", "Behåll den faktoriserade formen eller utveckla den.", "\\[f(x)=2(x-1)(x-3)=2x^2-8x+6\\]")],
    "Funktionen är \\(f(x)=2(x-1)(x-3)\\), alltså \\(f(x)=2x^2-8x+6\\).",
    "Nollställena bestämmer faktorerna men inte den lodräta skalan; därför behövs den extra punkten.", "Bestämma polynomfunktion från villkor");

  add("mato1-grund-1-06", 1, "rationella_uttryck", ALL,
    "Bestäm definitionsmängden",
    "<p>Bestäm definitionsmängden för f(x) = 3/(x − 2).</p>",
    "Ett rationellt uttryck är inte definierat när nämnaren är noll.",
    [steg("Sätt nämnaren lika med noll", "Hitta det värde som inte är tillåtet.", "\\[x-2=0\\Rightarrow x=2\\]"),
     steg("Skriv definitionsmängden", "Alla reella tal utom 2 är tillåtna.", "\\[D_f=\\mathbb R\\setminus\\{2\\}\\]")],
    "Definitionsmängden är alla reella tal utom \\(x=2\\).",
    "Kontrollera alltid den ursprungliga nämnaren, även om en faktor senare förkortas bort.", "Bestämma definitionsmängd för rationella uttryck");

  add("mato1-grund-1-07", 1, "rationella_uttryck", ALL,
    "Förkorta ett rationellt uttryck",
    "<p>Förenkla (x² − 9)/(x² − 3x) och ange villkoren på x.</p>",
    "Förkorta faktorer, inte enskilda termer. Faktorisera därför både täljare och nämnare först.",
    [steg("Faktorisera", "Använd konjugatregeln i täljaren och bryt ut x i nämnaren.", "\\[\\frac{x^2-9}{x^2-3x}=\\frac{(x-3)(x+3)}{x(x-3)}\\]"),
     steg("Förkorta faktorn", "Faktorn x − 3 kan förkortas när x inte är 3.", "\\[\\frac{x+3}{x}\\]"),
     steg("Behåll ursprungliga villkor", "Den ursprungliga nämnaren är noll för x = 0 och x = 3.", "\\[x\\ne0,\\quad x\\ne3\\]")],
    "Uttrycket förenklas till \\((x+3)/x\\), med villkoren \\(x\\ne0\\) och \\(x\\ne3\\).",
    "Ett förbjudet värde blir inte tillåtet bara för att faktorn förkortas bort.", "Förenkla rationella uttryck och ange definitionsmängd");

  add("mato1-grund-1-08", 1, "rationella_uttryck", ALL,
    "Lös en rationell ekvation",
    "<p>Lös ekvationen 2/(x − 1) = 3.</p>",
    "Börja med villkoret på x. Multiplicera sedan bort nämnaren och kontrollera lösningen.",
    [steg("Ange villkoret", "Nämnaren får inte vara noll.", "\\[x\\ne1\\]"),
     steg("Multiplicera med x − 1", "Samma faktor multipliceras i båda led.", "\\[2=3(x-1)\\]"),
     steg("Lös och kontrollera", "Lösningen bryter inte mot villkoret.", "\\[2=3x-3\\Rightarrow3x=5\\Rightarrow x=\\frac53\\]")],
    "\\(x=5/3\\).",
    "En lösning som gör någon ursprunglig nämnare noll måste förkastas.", "Lösa rationella ekvationer");

  add("mato1-grund-1-09", 1, "gransvarde_kontinuitet", ALL,
    "Beräkna ett gränsvärde genom faktorisering",
    "<p>Beräkna gränsvärdet när x går mot 3 av (x² − 9)/(x − 3).</p>",
    "Direkt insättning ger 0/0, vilket betyder att uttrycket behöver förenklas innan gränsvärdet kan bestämmas.",
    [steg("Faktorisera täljaren", "Använd konjugatregeln.", "\\[\\frac{x^2-9}{x-3}=\\frac{(x-3)(x+3)}{x-3}\\]"),
     steg("Förkorta nära x = 3", "För x ≠ 3 är uttrycket lika med x + 3.", "\\[\\frac{(x-3)(x+3)}{x-3}=x+3\\]"),
     steg("Låt x närma sig 3", "Nu kan värdet läsas av genom insättning.", "\\[\\lim_{x\\to3}(x+3)=6\\]")],
    "Gränsvärdet är 6.",
    "Ett gränsvärde beskriver vad uttrycket närmar sig; själva funktionsvärdet i punkten kan saknas.", "Beräkna och tolka gränsvärden");

  add("mato1-grund-1-10", 1, "gransvarde_kontinuitet", ALL,
    "Gör en funktion kontinuerlig",
    "<p>För x ≠ 1 är f(x) = (x² − 1)/(x − 1). Vilket värde ska f(1) få för att funktionen ska vara kontinuerlig?</p>",
    "Kontinuitet i x = 1 kräver att funktionsvärdet är lika med gränsvärdet där.",
    [steg("Förenkla uttrycket", "Faktorisera och förkorta för x ≠ 1.", "\\[\\frac{x^2-1}{x-1}=\\frac{(x-1)(x+1)}{x-1}=x+1\\]"),
     steg("Beräkna gränsvärdet", "När x närmar sig 1 närmar sig x + 1 värdet 2.", "\\[\\lim_{x\\to1}f(x)=2\\]"),
     steg("Välj funktionsvärdet", "Sätt f(1) lika med gränsvärdet.", "\\[f(1)=2\\]")],
    "Funktionen blir kontinuerlig om \\(f(1)=2\\).",
    "Kontinuitet kräver både att gränsvärdet finns och att det är samma som funktionsvärdet.", "Kontinuitet och hål i grafer");

  add("mato1-grund-1-11", 1, "gransvarde_kontinuitet", ALL,
    "Bestäm en parameter för kontinuitet",
    "<p>Funktionen är f(x) = kx + 1 när x &lt; 2 och f(x) = 7 när x ≥ 2. Bestäm k så att f är kontinuerlig i x = 2.</p>",
    "Vid skarvpunkten måste uttrycken från vänster och höger ge samma värde.",
    [steg("Sätt uttrycken lika", "Vänster uttryck ska närma sig värdet 7 vid x = 2.", "\\[2k+1=7\\]"),
     steg("Lös ut k", "Subtrahera 1 och dela med 2.", "\\[2k=6\\Rightarrow k=3\\]"),
     steg("Kontrollera", "Vänster uttryck ger 3·2 + 1 = 7, samma som höger del.")],
    "\\(k=3\\).",
    "Kontrollera skarvpunkten från båda håll; en bild kan se sammanhängande ut trots ett litet hopp.", "Bestämma parametrar för kontinuitet");

  add("mato1-grund-1-12", 1, "absolutbelopp", C,
    "Tolka en absolutbeloppsfunktion",
    "<p>Grafen visar f(x) = |x − 2|. Ange minimipunkt och skriv funktionen utan absolutbelopp som en styckvis funktion.</p>" + absolutFigur,
    "Absolutbeloppet gör negativa värden positiva. Uttrycket x − 2 byter tecken vid x = 2.",
    [steg("Läs av minimipunkten", "Grafens spets ligger där x − 2 = 0.", "\\[(2,0)\\]"),
     steg("Dela upp vid x = 2", "Till höger är x − 2 positivt. Till vänster byter uttrycket tecken.", "\\[|x-2|=\\begin{cases}2-x,&x<2\\\\x-2,&x\\ge2\\end{cases}\\]")],
    "Minimipunkten är \\((2,0)\\), och funktionen är \\(2-x\\) för \\(x<2\\) samt \\(x-2\\) för \\(x\\ge2\\).",
    "Brytpunkten finns där uttrycket inuti absolutbeloppet är noll.", "Tolka och skriva funktioner med absolutbelopp");

  add("mato1-grund-1-13", 1, "absolutbelopp", C,
    "Lös en ekvation med absolutbelopp",
    "<p>Lös |2x − 3| = 5.</p>",
    "Om ett absolutbelopp är 5 kan uttrycket inuti vara 5 eller −5.",
    [steg("Skriv två fall", "Ta med både det positiva och negativa fallet.", "\\[2x-3=5\\quad\\text{eller}\\quad2x-3=-5\\]"),
     steg("Lös båda ekvationerna", "Behandla fallen var för sig.", "\\[x=4\\quad\\text{eller}\\quad x=-1\\]")],
    "\\(x=-1\\) eller \\(x=4\\).",
    "En ekvation |u| = a har två fall när a är positivt, men inga lösningar när a är negativt.", "Lösa ekvationer med absolutbelopp");

  add("mato1-grund-1-14", 1, "absolutbelopp", C,
    "Lös en olikhet med absolutbelopp",
    "<p>Lös |x − 1| &lt; 3.</p>",
    "Olikheten säger att avståndet mellan x och 1 är mindre än 3.",
    [steg("Skriv som dubbel olikhet", "Uttrycket ska ligga mellan −3 och 3.", "\\[-3<x-1<3\\]"),
     steg("Addera 1 i alla tre led", "Samma operation görs i varje del.", "\\[-2<x<4\\]")],
    "Lösningen är \\(-2<x<4\\).",
    "Tecknet < ger intervallet mellan gränserna; tecknet > ger områdena utanför.", "Lösa olikheter med absolutbelopp");

  // Kapitel 2: Derivata
  add("mato1-grund-2-01", 2, "derivatabegrepp", ALL,
    "Beräkna en förändringskvot",
    "<p>Funktionen är f(x) = x². Beräkna den genomsnittliga förändringskvoten från x = 1 till x = 3.</p>",
    "Förändringskvoten är förändringen i funktionsvärde delad med förändringen i x. Geometriskt är den sekantens lutning.",
    [steg("Beräkna funktionsvärdena", "Sätt in intervallets ändpunkter.", "\\[f(1)=1,\\qquad f(3)=9\\]"),
     steg("Dividera förändringarna", "Använd samma ordning i täljare och nämnare.", "\\[\\frac{f(3)-f(1)}{3-1}=\\frac{9-1}{2}=4\\]")],
    "Den genomsnittliga förändringskvoten är 4.",
    "En förändringskvot gäller ett intervall; derivatan i en punkt fås när intervallet krymper mot punkten.", "Beräkna och tolka förändringskvot");

  add("mato1-grund-2-02", 2, "derivatabegrepp", ALL,
    "Bestäm derivatan från definitionen",
    "<p>Använd derivatans definition för att bestämma f′(2) när f(x) = x².</p>",
    "Derivatan i x = a är gränsvärdet av förändringskvoten när steget h går mot noll.",
    [steg("Skriv differenskvoten", "Här är a = 2.", "\\[f'(2)=\\lim_{h\\to0}\\frac{f(2+h)-f(2)}{h}\\]"),
     steg("Utveckla och förenkla", "Sätt in f(x) = x² och förkorta h.", "\\[\\frac{(2+h)^2-4}{h}=\\frac{4h+h^2}{h}=4+h\\]"),
     steg("Låt h gå mot noll", "Uttrycket 4 + h närmar sig 4.", "\\[f'(2)=\\lim_{h\\to0}(4+h)=4\\]")],
    "f′(2) = 4.",
    "Sätt inte h = 0 innan faktorn h har förkortats; då uppstår division med noll.", "Bestämma derivata från definitionen");

  add("mato1-grund-2-03", 2, "derivatabegrepp", ALL,
    "Förstå derivata som tangentlutning",
    "<p>Figuren visar en sekant genom P och Q samt tangenten i P. Vad händer med sekanten när Q flyttas mot P?</p>" + tangentFigur,
    "Sekantens lutning är en förändringskvot över ett intervall. När den andra punkten närmar sig P närmar sig sekanten tangenten.",
    [steg("Låt intervallet krympa", "När Q flyttas mot P blir skillnaden i x allt mindre."),
     steg("Ta gränsvärdet", "Sekantlutningens gränsvärde är tangentens lutning och därmed derivatan i P.", "\\[f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h}\\]")],
    "Sekanten närmar sig tangenten, och sekantens lutning närmar sig f′(a).",
    "Derivatan är ett lokalt värde i en punkt; förändringskvoten beskriver ett helt intervall.", "Derivata som förändringshastighet och tangentlutning");

  add("mato1-grund-2-04", 2, "deriveringsregler", ALL,
    "Derivera ett polynom",
    "<p>Derivera f(x) = 4x³ − 5x² + 7x − 9.</p>",
    "Potensregeln säger att exponenten flyttas ner som faktor och sedan minskas med 1. Konstanter får derivatan noll.",
    [steg("Derivera term för term", "Använd potensregeln.", "\\[f'(x)=4\\cdot3x^2-5\\cdot2x+7\\]"),
     steg("Förenkla", "Samla de numeriska faktorerna.", "\\[f'(x)=12x^2-10x+7\\]")],
    "f′(x) = 12x² − 10x + 7.",
    "Minska exponenten först efter att den gamla exponenten har flyttats ner som faktor.", "Derivera polynom med potensregeln");

  add("mato1-grund-2-05", 2, "deriveringsregler", ALL,
    "Derivera rötter och negativa potenser",
    "<p>Derivera f(x) = 3√x − 2/x.</p>",
    "Skriv först om rötter och bråk som potenser. Då kan samma potensregel användas.",
    [steg("Skriv med exponenter", "√x = x^(1/2) och 1/x = x^(−1).", "\\[f(x)=3x^{1/2}-2x^{-1}\\]"),
     steg("Använd potensregeln", "Multiplicera med exponenten och minska den med 1.", "\\[f'(x)=\\frac32x^{-1/2}+2x^{-2}\\]"),
     steg("Skriv om", "Negativa exponenter kan skrivas som bråk.", "\\[f'(x)=\\frac{3}{2\\sqrt{x}}+\\frac{2}{x^2}\\]")],
    "f′(x) = 3/(2√x) + 2/x², för x > 0.",
    "Minustecknet i −2x⁻¹ och exponenten −1 ger tillsammans en positiv derivataterm.", "Derivera potensfunktioner med bråk- och negativa exponenter");

  add("mato1-grund-2-06", 2, "deriveringsregler", ALL,
    "Beräkna ett derivatavärde",
    "<p>Funktionen är p(x) = x³ − 3x. Beräkna p′(2).</p>",
    "Bestäm först derivatafunktionen. Sätt därefter in det givna x-värdet i derivatan.",
    [steg("Derivera", "Använd potensregeln term för term.", "\\[p'(x)=3x^2-3\\]"),
     steg("Sätt in x = 2", "Det insatta värdet markeras rött.", "\\[p'({\\color{#D1495B}{2}})=3\\cdot{\\color{#D1495B}{2}}^2-3=12-3=9\\]")],
    "p′(2) = 9.",
    "Skilj på p(2), som är ett funktionsvärde, och p′(2), som är en lutning eller förändringshastighet.", "Beräkna derivatavärden");

  add("mato1-grund-2-07", 2, "tangenter_derivata", ALL,
    "Bestäm tangentens ekvation",
    "<p>Bestäm ekvationen för tangenten till f(x) = x² i punkten där x = 1.</p>",
    "Tangenten behöver en punkt och en lutning. Punkten fås från f(a) och lutningen från f′(a).",
    [steg("Bestäm punkten", "Sätt in x = 1 i funktionen.", "\\[f({\\color{#D1495B}{1}})={\\color{#D1495B}{1}}^2=1\\]"),
     steg("Bestäm lutningen", "Derivera och sätt in samma x-värde.", "\\[f'(x)=2x,\\qquad f'({\\color{#D1495B}{1}})=2\\]"),
     steg("Skriv linjens ekvation", "Använd punkt–riktningsformen med punkten (1, 1).", "\\[y-1=2(x-1)\\Rightarrow y=2x-1\\]")],
    "Tangenten har ekvationen y = 2x − 1.",
    "Använd funktionsvärdet som punktens y-koordinat och derivatavärdet som linjens k-värde.", "Bestämma tangentens ekvation med derivata");

  add("mato1-grund-2-08", 2, "tangenter_derivata", ALL,
    "Läs av en tangentlutning",
    "<p>En tangent går genom punkterna (0, 1) och (2, 5). Bestäm tangentens lutning och derivatavärdet i tangeringspunkten.</p>",
    "Derivatavärdet i tangeringspunkten är samma tal som tangentens riktningskoefficient.",
    [steg("Beräkna tangentens lutning", "Använd två punkter på tangenten.", "\\[k=\\frac{5-1}{2-0}=2\\]"),
     steg("Koppla till derivatan", "Om tangenten tangerar grafen vid x = a gäller f′(a) = k.", "\\[f'(a)=2\\]")],
    "Tangentens lutning och derivatavärdet är 2.",
    "Punkterna som används för k-beräkningen ska ligga på tangenten, inte nödvändigtvis båda på funktionskurvan.", "Läsa av tangent och tangentlutning från graf");

  add("mato1-grund-2-09", 2, "funktion_derivata_grafer", ALL,
    "Koppla derivatans tecken till funktionens graf",
    "<p>Grafen visar y = f′(x). Beskriv hur f förändras före och efter x = 2.</p>" + derivataFigur,
    "När f′(x) är negativ avtar f. När f′(x) är positiv växer f. Ett teckenbyte från minus till plus ger en minimipunkt.",
    [steg("Studera vänster om 2", "Derivatans graf ligger under x-axeln, alltså är f′(x) < 0 och f avtar."),
     steg("Studera höger om 2", "Derivatans graf ligger över x-axeln, alltså är f′(x) > 0 och f växer."),
     steg("Tolka nollstället", "Vid x = 2 byter derivatan från negativ till positiv.", "\\[f'(2)=0\\]")],
    "f avtar före x = 2, växer efter x = 2 och har en minimipunkt vid x = 2.",
    "Att f′(x) = 0 ger en möjlig extrempunkt; kontrollera alltid teckenbytet.", "Koppla samman funktionens graf och derivatans graf");

  add("mato1-grund-2-10", 2, "funktion_derivata_grafer", ALL,
    "Använd första och andra derivatan",
    "<p>Funktionen är f(x) = x³ − 3x. Bestäm de stationära punkternas typ.</p>",
    "Stationära punkter finns där f′(x) = 0. Tecknet på f′′ i punkten kan avgöra om det är maximum eller minimum.",
    [steg("Bestäm stationära x-värden", "Derivera och lös f′(x) = 0.", "\\[f'(x)=3x^2-3=3(x-1)(x+1)\\Rightarrow x=\\pm1\\]"),
     steg("Beräkna andra derivatan", "Derivera en gång till.", "\\[f''(x)=6x\\]"),
     steg("Klassificera", "Negativ andra derivata ger maximum och positiv ger minimum.", "\\[f''(-1)=-6<0,\\qquad f''(1)=6>0\\]")],
    "f har en lokal maximipunkt vid x = −1 och en lokal minimipunkt vid x = 1.",
    "Andraderivatatestet fungerar inte när f′′ också är noll; då behövs en annan teckenkontroll.", "Grafanalys med första och andra derivatan");

  add("mato1-grund-2-11", 2, "exponential_ln_derivata", ALL,
    "Derivera funktioner med e och ln",
    "<p>Derivera f(x) = 5eˣ + 2 ln x.</p>",
    "Derivatan av eˣ är eˣ och derivatan av ln x är 1/x.",
    [steg("Derivera exponentialtermen", "Konstanten 5 följer med.", "\\[(5e^x)'=5e^x\\]"),
     steg("Derivera logaritmtermen", "Använd derivatan av ln x.", "\\[(2\\ln x)'=\\frac2x\\]"),
     steg("Sätt ihop", "Addera de deriverade termerna.", "\\[f'(x)=5e^x+\\frac2x\\]")],
    "f′(x) = 5eˣ + 2/x, för x > 0.",
    "Funktionen ln x och dess derivata är bara definierade för x > 0.", "Derivera exponentialfunktioner");

  add("mato1-grund-2-12", 2, "exponential_ln_derivata", ALL,
    "Lös en exponentialekvation med ln",
    "<p>Lös 4e^(0,3x) = 10.</p>",
    "Isolera exponentialuttrycket, ta ln i båda led och använd att ln(eᵘ) = u.",
    [steg("Isolera exponentialuttrycket", "Dela båda led med 4.", "\\[e^{0{,}3x}=2{,}5\\]"),
     steg("Logaritmera", "Ta ln i båda led.", "\\[0{,}3x=\\ln2{,}5\\]"),
     steg("Lös ut x", "Dividera med 0,3.", "\\[x=\\frac{\\ln2{,}5}{0{,}3}\\approx3{,}05\\]")],
    "x ≈ 3,05.",
    "Isolera e-potensen innan du logaritmerar; ln av en summa kan inte delas upp termvis.", "Lösa exponentialekvationer med naturlig logaritm");

  add("mato1-grund-2-13", 2, "exponential_ln_derivata", ALL,
    "Skriv en exponentialmodell med basen e",
    "<p>Skriv modellen N(t) = 200 · 1,05ᵗ på formen N(t) = 200e^(kt).</p>",
    "Alla positiva exponentialbaser kan skrivas som en e-potens eftersom aᵗ = e^(t ln a).",
    [steg("Använd omskrivningen", "Ersätt 1,05ᵗ med en e-potens.", "\\[1{,}05^t=e^{t\\ln1{,}05}\\]"),
     steg("Bestäm k", "Beräkna ln 1,05.", "\\[k=\\ln1{,}05\\approx0{,}0488\\]"),
     steg("Skriv modellen", "Behåll startvärdet 200.", "\\[N(t)\\approx200e^{0{,}0488t}\\]")],
    "N(t) ≈ 200e^(0,0488t).",
    "Tillväxttakten k är inte samma tal som procenttalet 5 %, även om de ligger nära vid små förändringar.", "Skriva exponentialfunktioner med basen e");

  add("mato1-grund-2-14", 2, "derivering_digitalt", ALL,
    "Bestäm derivata och tangent digitalt",
    "<p>Använd ett digitalt verktyg för att bestämma derivatan av f(x) = x⁴ − 3x² + 2 och tangentens lutning vid x = 1.</p>",
    "Ett CAS kan derivera symboliskt. Kontrollera att verktyget tolkar hela funktionsuttrycket rätt och skilj på f′(x) och f′(1).",
    [steg("Definiera funktionen", "Skriv funktionen med tydliga parenteser och exponenter.", "\\[f(x)=x^4-3x^2+2\\]"),
     steg("Derivera", "Verktyget ger derivatafunktionen.", "\\[f'(x)=4x^3-6x\\]"),
     steg("Beräkna lutningen", "Sätt in x = 1 i derivatan.", "\\[f'({\\color{#D1495B}{1}})=4\\cdot{\\color{#D1495B}{1}}^3-6\\cdot{\\color{#D1495B}{1}}=-2\\]")],
    "f′(x) = 4x³ − 6x och tangentens lutning är −2.",
    "Ett digitalt svar ska fortfarande redovisas med funktion, kommando och tolkning.", "Derivata och tangenter med digitalt verktyg");

  add("mato1-grund-2-15", 2, "derivering_digitalt", ALL,
    "Analysera en funktion digitalt",
    "<p>Använd ett digitalt verktyg för att hitta de stationära x-värdena för f(x) = x³ − 3x och klassificera dem.</p>",
    "Arbetsgången är: derivera, lös f′(x) = 0 och kontrollera derivatans tecken eller funktionens graf kring varje punkt.",
    [steg("Derivera och lös", "Låt verktyget lösa derivataekvationen.", "\\[f'(x)=3x^2-3=0\\Rightarrow x=-1\\text{ eller }x=1\\]"),
     steg("Kontrollera teckenbyten", "f′ går från plus till minus vid −1 och från minus till plus vid 1."),
     steg("Beräkna punkterna", "Sätt in x-värdena i f.", "\\[f(-1)=2,\\qquad f(1)=-2\\]")],
    "Funktionen har lokal maximipunkt (−1, 2) och lokal minimipunkt (1, −2).",
    "Verktygets nollställen för f och f′ betyder olika saker; här ska derivatans nollställen användas.", "Analysera funktioner med derivata digitalt");

  // Kapitel 3: Kurvor, derivator och integraler
  add("mato1-grund-3-01", 3, "grafanalys_derivata", ALL,
    "Gör en teckentabell för derivatan",
    "<p>Undersök var f(x) = x³ − 3x är växande respektive avtagande.</p>",
    "Funktionen växer där f′(x) är positiv och avtar där f′(x) är negativ. Derivatans nollställen delar tallinjen i testintervall.",
    [steg("Derivera och faktorisera", "Bestäm derivatans nollställen.", "\\[f'(x)=3x^2-3=3(x-1)(x+1)\\Rightarrow x=-1,1\\]"),
     steg("Bestäm tecknen", "Testa ett x-värde i vart och ett av de tre intervallen.", "\\[f'(x):\\quad +\\;|_{-1}\\;-\\;|_{1}\\;+\\]"),
     steg("Tolka", "Plus betyder växande och minus betyder avtagande.", "\\[\\text{växer: }x<-1\\text{ och }x>1;\\quad\\text{avtar: }-1<x<1\\]")],
    "f växer för x < −1 och x > 1 samt avtar för −1 < x < 1.",
    "Teckentabellen gäller derivatan; slutsatsen ska formuleras för den ursprungliga funktionen.", "Göra teckentabell för derivatan");

  add("mato1-grund-3-02", 3, "grafanalys_derivata", ALL,
    "Bestäm extrempunkter med derivata",
    "<p>Bestäm lokala extrempunkter för f(x) = x³ − 6x² + 9x.</p>",
    "Hitta först stationära x-värden med f′(x) = 0. Bestäm sedan punktens typ och beräkna dess y-värde.",
    [steg("Lös derivataekvationen", "Derivera och faktorisera.", "\\[f'(x)=3x^2-12x+9=3(x-1)(x-3)\\Rightarrow x=1,3\\]"),
     steg("Kontrollera teckenbyten", "f′ byter + till − vid 1 och − till + vid 3. Därför fås maximum respektive minimum."),
     steg("Beräkna punkterna", "Sätt in x-värdena i f.", "\\[f(1)=4,\\qquad f(3)=0\\]")],
    "Den lokala maximipunkten är (1, 4) och den lokala minimipunkten är (3, 0).",
    "Ett extremvärde är y-värdet; en extrempunkt ska anges med båda koordinaterna.", "Bestämma extrempunkter med derivata");

  add("mato1-grund-3-03", 3, "extremvardesproblem", ALL,
    "Optimera en rektangel",
    "<p>En rektangel har omkretsen 20 cm. Bestäm de sidlängder som ger största möjliga area.</p>",
    "Skriv först arean som en funktion av en enda variabel. Bestäm sedan funktionens maximum med derivata.",
    [steg("Uttryck båda sidorna", "Låt ena sidan vara x. Då ger 2x + 2y = 20 att y = 10 − x.", "\\[y=10-x\\]"),
     steg("Skriv och derivera arean", "Area är längd gånger bredd.", "\\[A(x)=x(10-x)=10x-x^2,\\qquad A'(x)=10-2x\\]"),
     steg("Bestäm maximum", "Lös A′(x) = 0 och kontrollera att parabeln öppnar nedåt.", "\\[10-2x=0\\Rightarrow x=5,\\qquad y=5\\]")],
    "Störst area fås av en kvadrat med sidlängderna 5 cm och 5 cm.",
    "Kontrollera definitionsmängden: här måste 0 < x < 10 för att båda sidlängderna ska vara positiva.", "Geometrisk optimering med derivata");

  add("mato1-grund-3-04", 3, "extremvardesproblem", ALL,
    "Optimera en andragradsmodell",
    "<p>Vinsten i tusen kronor beskrivs av V(x) = −2x² + 80x − 300. För vilket x är vinsten störst, och hur stor är den?</p>",
    "Ett maximum finns där derivatan är noll när andraderivatan är negativ.",
    [steg("Derivera", "Bestäm vinstens förändring.", "\\[V'(x)=-4x+80\\]"),
     steg("Lös V′(x) = 0", "Bestäm det kritiska x-värdet.", "\\[-4x+80=0\\Rightarrow x=20\\]"),
     steg("Beräkna och kontrollera", "Sätt in x = 20 och notera att V′′(x) = −4 < 0.", "\\[V({\\color{#D1495B}{20}})=-2\\cdot{\\color{#D1495B}{20}}^2+80\\cdot{\\color{#D1495B}{20}}-300=500\\]")],
    "Vinsten är störst när x = 20 och är då 500 tusen kronor.",
    "Tolka alltid både x-värdet och funktionsvärdet med sina enheter.", "Optimera tillämpade andragradsmodeller");

  add("mato1-grund-3-05", 3, "derivata_tillampningar", ALL,
    "Tolka derivata i en rörelse",
    "<p>En rörelse beskrivs av s(t) = t³ − 6t² + 9t meter. Bestäm hastigheten vid t = 2 s och tolka tecknet.</p>",
    "När s(t) är läget är derivatan s′(t) den momentana hastigheten.",
    [steg("Derivera läget", "Bestäm hastighetsfunktionen.", "\\[v(t)=s'(t)=3t^2-12t+9\\]"),
     steg("Sätt in t = 2", "Det insatta tidsvärdet markeras rött.", "\\[v({\\color{#D1495B}{2}})=3\\cdot{\\color{#D1495B}{2}}^2-12\\cdot{\\color{#D1495B}{2}}+9=-3\\]")],
    "Hastigheten är −3 m/s. Minustecknet betyder rörelse i koordinatsystemets negativa riktning.",
    "Negativ hastighet betyder riktning, inte att farten är negativ; farten är |v| = 3 m/s.", "Analysera rörelse och förändringshastighet med derivata");

  add("mato1-grund-3-06", 3, "derivata_tillampningar", ALL,
    "Tolka marginalkostnad",
    "<p>Kostnaden i tusen kronor för att tillverka x enheter är K(x) = 0,02x² + 4x + 100. Beräkna och tolka K′(50).</p>",
    "Derivatan av en kostnadsfunktion beskriver den momentana kostnadsökningen per ytterligare enhet.",
    [steg("Derivera", "Bestäm marginalkostnadsfunktionen.", "\\[K'(x)=0{,}04x+4\\]"),
     steg("Sätt in x = 50", "Det insatta värdet markeras rött.", "\\[K'({\\color{#D1495B}{50}})=0{,}04\\cdot{\\color{#D1495B}{50}}+4=6\\]"),
     steg("Tolka enheten", "K mäts i tusen kronor och x i enheter, alltså är derivatans enhet tusen kronor per enhet.")],
    "K′(50) = 6, alltså ökar kostnaden där med ungefär 6 000 kr per ytterligare enhet.",
    "Derivatan är en lokal uppskattning och behöver inte vara exakt samma som kostnaden för ett helt extra steg.", "Ekonomisk optimering med derivata");

  add("mato1-grund-3-07", 3, "deriverbarhet", ALL,
    "Avgör deriverbarhet i en spets",
    "<p>Är f(x) = |x| deriverbar i x = 0?</p>",
    "En funktion är deriverbar i en punkt bara om lutningen från vänster och höger närmar sig samma värde.",
    [steg("Undersök vänster sida", "För x < 0 är |x| = −x, så lutningen är −1.", "\\[f'_-(0)=-1\\]"),
     steg("Undersök höger sida", "För x > 0 är |x| = x, så lutningen är 1.", "\\[f'_+(0)=1\\]"),
     steg("Jämför", "Sidoderivatorna är olika, vilket motsvarar grafens spets.", "\\[-1\\ne1\\]")],
    "Funktionen är inte deriverbar i x = 0.",
    "Kontinuitet räcker inte för deriverbarhet; en kontinuerlig graf kan ha en spets eller lodrät tangent.", "Undersöka deriverbarhet för absolutbeloppsfunktioner");

  add("mato1-grund-3-08", 3, "deriverbarhet", ALL,
    "Bestäm parametrar för deriverbarhet",
    "<p>Funktionen är f(x) = x² för x ≤ 1 och f(x) = ax + b för x > 1. Bestäm a och b så att f är deriverbar i x = 1.</p>",
    "Deriverbarhet kräver både kontinuitet och samma derivata från vänster och höger.",
    [steg("Krav på kontinuitet", "Funktionsdelarna ska mötas vid x = 1.", "\\[a+b=1\\]"),
     steg("Krav på lutningen", "Vänster derivata är 2x och har värdet 2 vid x = 1. Höger derivata är a.", "\\[a=2\\]"),
     steg("Bestäm b", "Sätt a = 2 i kontinuitetsvillkoret.", "\\[2+b=1\\Rightarrow b=-1\\]")],
    "a = 2 och b = −1.",
    "Kontrollera både höjden och lutningen i skarvpunkten; samma funktionsvärde räcker inte.", "Bestämma parametrar för deriverbarhet");

  add("mato1-grund-3-09", 3, "primitiva_funktioner", ALL,
    "Bestäm en primitiv funktion",
    "<p>Bestäm alla primitiva funktioner till f(x) = 3x² − 4x + 2.</p>",
    "Att hitta en primitiv funktion är att derivera baklänges. Höj exponenten med 1 och dividera med den nya exponenten.",
    [steg("Integrera term för term", "Använd potensregeln baklänges.", "\\[F(x)=x^3-2x^2+2x+C\\]"),
     steg("Kontrollera", "Derivera svaret.", "\\[F'(x)=3x^2-4x+2=f(x)\\]")],
    "Alla primitiva funktioner är F(x) = x³ − 2x² + 2x + C.",
    "Glöm inte konstanten C; alla konstanter får derivatan noll.", "Bestämma och tolka primitiva funktioner");

  add("mato1-grund-3-10", 3, "primitiva_funktioner", ALL,
    "Bestäm konstanten med ett begynnelsevillkor",
    "<p>F′(x) = 2x + 3 och F(0) = 5. Bestäm F(x).</p>",
    "Integrera först med en okänd konstant. Använd sedan det givna funktionsvärdet för att bestämma konstanten.",
    [steg("Bestäm den allmänna formen", "Integrera 2x + 3.", "\\[F(x)=x^2+3x+C\\]"),
     steg("Använd F(0) = 5", "Sätt in x = 0. Det insatta värdet markeras rött.", "\\[F({\\color{#D1495B}{0}})={\\color{#D1495B}{0}}^2+3\\cdot{\\color{#D1495B}{0}}+C=5\\Rightarrow C=5\\]")],
    "F(x) = x² + 3x + 5.",
    "Begynnelsevillkoret bestämmer vilken av alla möjliga primitiva funktioner som avses.", "Bestämma primitiv funktion med begynnelsevillkor");

  add("mato1-grund-3-11", 3, "integraler", ALL,
    "Beräkna en bestämd integral",
    "<p>Beräkna integralen från 0 till 2 av (3x² + 1) dx.</p>",
    "Använd integralkalkylens huvudsats: bestäm en primitiv funktion och beräkna övre värdet minus undre värdet.",
    [steg("Bestäm en primitiv funktion", "Integrera term för term.", "\\[F(x)=x^3+x\\]"),
     steg("Sätt in gränserna", "Beräkna F(2) − F(0).", "\\[\\int_0^2(3x^2+1)\\,dx=[x^3+x]_0^2=(8+2)-0=10\\]")],
    "Integralen är 10.",
    "Ordningen är alltid övre gränsens värde minus undre gränsens värde.", "Beräkna bestämda integraler");

  add("mato1-grund-3-12", 3, "integraler", ALL,
    "Skilj på integral och geometrisk area",
    "<p>Grafen visar f(x) = x − 1 på intervallet 0 ≤ x ≤ 2. Bestäm integralen och arean mellan grafen och x-axeln.</p>" + integralFigur,
    "En bestämd integral räknar area över x-axeln positivt och area under x-axeln negativt. Geometrisk area är alltid positiv.",
    [steg("Beräkna integralen", "Använd en primitiv funktion.", "\\[\\int_0^2(x-1)\\,dx=\\left[\\frac{x^2}{2}-x\\right]_0^2=0\\]"),
     steg("Beräkna delareorna", "Båda trianglarna har bas 1 och höjd 1.", "\\[A_1=A_2=\\frac{1\\cdot1}{2}=0{,}5\\]"),
     steg("Addera geometrisk area", "Negativa y-värden gör inte geometrisk area negativ.", "\\[A=0{,}5+0{,}5=1\\]")],
    "Integralen är 0, medan den geometriska arean är 1 areaenhet.",
    "Dela intervallet vid funktionens nollställen när frågan gäller area.", "Beräkna area med integral");

  add("mato1-grund-3-13", 3, "integraler_digitalt", ALL,
    "Beräkna en integral digitalt",
    "<p>Beräkna med ett digitalt verktyg integralen från 0 till 1 av e^(−x²) dx.</p>",
    "Vissa funktioner saknar en primitiv funktion som kan skrivas med kursens vanliga elementära funktioner. Då används numerisk integration.",
    [steg("Skriv integralen korrekt", "Använd parentes kring exponenten −x².", "\\[\\int_0^1 e^{-x^2}\\,dx\\]"),
     steg("Välj numeriskt värde", "Verktyget ger ett decimalvärde.", "\\[\\int_0^1 e^{-x^2}\\,dx\\approx0{,}7468\\]"),
     steg("Rimlighetskontroll", "På intervallet ligger funktionen mellan e⁻¹ och 1, så svaret ska ligga mellan ungefär 0,37 och 1.")],
    "Integralen är ungefär 0,7468.",
    "Kontrollera integrationsgränser, parenteser och om verktyget visar exakt eller numeriskt svar.", "Beräkna integraler och area digitalt");

  add("mato1-grund-3-14", 3, "integraler_digitalt", ALL,
    "Bestäm en integrationsgräns",
    "<p>Bestäm a ≥ 0 så att integralen från 0 till a av 2x dx är 9.</p>",
    "När en integrationsgräns är okänd blir integralens värde en funktion av gränsen. Sätt den funktionen lika med det givna värdet.",
    [steg("Beräkna integralen med a", "Använd x² som primitiv funktion.", "\\[\\int_0^a2x\\,dx=[x^2]_0^a=a^2\\]"),
     steg("Lös ekvationen", "Sätt integralvärdet lika med 9.", "\\[a^2=9\\Rightarrow a=\\pm3\\]"),
     steg("Använd villkoret", "Eftersom a ≥ 0 väljs den positiva lösningen.", "\\[a=3\\]")],
    "a = 3.",
    "En integrationsgräns kan behöva begränsas av problemets villkor; här utesluter a ≥ 0 lösningen −3.", "Bestämma integrationsgräns digitalt");

  add("mato1-grund-3-15", 3, "integraltillampningar", ALL,
    "Bestäm förflyttning och sträcka från hastighet",
    "<p>Hastigheten är v(t) = 3t² − 6t m/s under 0 ≤ t ≤ 3. Bestäm förflyttningen och den tillryggalagda sträckan.</p>",
    "Integralen av hastigheten ger förflyttningen. För sträckan ska hastighetens belopp integreras, så intervallet delas där v byter tecken.",
    [steg("Hitta teckenbytet", "Faktorisera hastigheten.", "\\[v(t)=3t(t-2)\\Rightarrow t=0,2\\]"),
     steg("Beräkna förflyttningen", "Integrera med tecken från 0 till 3.", "\\[\\int_0^3(3t^2-6t)\\,dt=[t^3-3t^2]_0^3=0\\]"),
     steg("Beräkna sträckan", "Mellan 0 och 2 är integralen −4, och mellan 2 och 3 är den 4. Addera beloppen.", "\\[s=|-4|+|4|=8\\]")],
    "Förflyttningen är 0 m och den tillryggalagda sträckan är 8 m.",
    "Förflyttning kan ta ut sig när rörelsen byter riktning; sträcka kan inte vara negativ.", "Beräkna sträcka och förflyttning från hastighet");

  add("mato1-grund-3-16", 3, "integraltillampningar", ALL,
    "Beräkna en ackumulerad mängd",
    "<p>Vatten strömmar in i en tank med hastigheten r(t) = 5 + 2t liter per minut. Hur mycket vatten tillkommer under de första 4 minuterna?</p>",
    "När r(t) är en förändringshastighet ger integralen den sammanlagda förändringen under tidsintervallet.",
    [steg("Skriv integralen", "Integrera hastigheten från t = 0 till t = 4.", "\\[\\Delta V=\\int_0^4(5+2t)\\,dt\\]"),
     steg("Bestäm en primitiv funktion", "En primitiv funktion är 5t + t².", "\\[\\Delta V=[5t+t^2]_0^4\\]"),
     steg("Beräkna", "Sätt in gränserna.", "\\[\\Delta V=20+16=36\\]")],
    "Det tillkommer 36 liter vatten.",
    "Integralen ger förändringen. Tankens slutliga volym kräver dessutom att startvolymen är känd.", "Beräkna ackumulerad mängd från en förändringshastighet");

  // Kapitel 4: Trigonometri (1c) respektive linjär optimering och summor (1b)
  add("mato1-grund-4-01", 4, "enhetscirkeln_trig", C,
    "Läs av sinus och cosinus i enhetscirkeln",
    "<p>Punkten i enhetscirkeln motsvarar vinkeln 120°. Bestäm cos 120° och sin 120°.</p>" + enhetscirkelFigur,
    "I enhetscirkeln är punktens x-koordinat cosinus för vinkeln och y-koordinaten sinus.",
    [steg("Läs av koordinaterna", "Punkten vid 120° ligger i andra kvadranten.", "\\[P=\\left(-\\frac12,\\frac{\\sqrt3}{2}\\right)\\]"),
     steg("Koppla till cosinus och sinus", "x-koordinaten är cos v och y-koordinaten är sin v.", "\\[\\cos120^\\circ=-\\frac12,\\qquad\\sin120^\\circ=\\frac{\\sqrt3}{2}\\]")],
    "cos 120° = −1/2 och sin 120° = √3/2.",
    "Bestäm tecknen med hjälp av kvadranten innan du använder referensvinkeln.", "Läsa av trigonometriska värden i enhetscirkeln");

  add("mato1-grund-4-02", 4, "enhetscirkeln_trig", C,
    "Använd exakta trigonometriska värden",
    "<p>Bestäm exakt sin 30°, cos 60° och tan 45°.</p>",
    "Standardvinklarna 30°, 45° och 60° har exakta värden som kan härledas från liksidiga och likbenta rätvinkliga trianglar.",
    [steg("Använd värdena för 30° och 60°", "Sinus för 30° och cosinus för 60° är båda 1/2.", "\\[\\sin30^\\circ=\\frac12,\\qquad\\cos60^\\circ=\\frac12\\]"),
     steg("Använd 45°-triangeln", "Kateterna är lika långa, så deras kvot är 1.", "\\[\\tan45^\\circ=1\\]")],
    "sin 30° = 1/2, cos 60° = 1/2 och tan 45° = 1.",
    "Exakta svar skrivs med bråk och rötter, inte som avrundade decimaler.", "Exakta trigonometriska värden och symmetri i enhetscirkeln");

  add("mato1-grund-4-03", 4, "enhetscirkeln_trig", C,
    "Lös en trigonometrisk ekvation",
    "<p>Lös sin x = 1/2 för 0° ≤ x &lt; 360°.</p>",
    "Sinus är y-koordinaten i enhetscirkeln. Samma positiva y-värde förekommer i första och andra kvadranten.",
    [steg("Bestäm referensvinkeln", "Standardvärdet sin 30° = 1/2 ger vinkeln i första kvadranten.", "\\[x_1=30^\\circ\\]"),
     steg("Bestäm den andra vinkeln", "I andra kvadranten är vinkeln 180° − 30°.", "\\[x_2=150^\\circ\\]"),
     steg("Kontrollera intervallet", "Båda vinklarna ligger i det givna varvet.")],
    "x = 30° eller x = 150°.",
    "Miniräknarens inversa sinus visar normalt bara en huvudlösning; använd enhetscirkeln för att hitta alla lösningar.", "Lösa trigonometriska ekvationer");

  add("mato1-grund-4-04", 4, "triangelsatser", C,
    "Använd sinussatsen",
    "<p>I triangeln är A = 40°, B = 65° och sidan a = 8 cm. Bestäm sidan b.</p>" + triangelFigur,
    "Sinussatsen används när du känner ett motstående par av sida och vinkel och dessutom en annan sida eller vinkel.",
    [steg("Skriv motsvarande par", "Sidan a ligger mot vinkeln A och sidan b mot vinkeln B.", "\\[\\frac{a}{\\sin A}=\\frac{b}{\\sin B}\\]"),
     steg("Sätt in värdena", "Behåll sida och motstående vinkel i samma kvot.", "\\[\\frac8{\\sin40^\\circ}=\\frac b{\\sin65^\\circ}\\]"),
     steg("Lös ut b", "Multiplicera med sin 65°.", "\\[b=\\frac{8\\sin65^\\circ}{\\sin40^\\circ}\\approx11{,}3\\]")],
    "b ≈ 11,3 cm.",
    "Para alltid ihop en sida med vinkeln mitt emot den, inte med en närliggande vinkel.", "Använda sinussatsen");

  add("mato1-grund-4-05", 4, "triangelsatser", C,
    "Använd cosinussatsen",
    "<p>Två sidor i en triangel är 7 cm och 10 cm. Vinkeln mellan dem är 60°. Bestäm den tredje sidan c.</p>",
    "Cosinussatsen passar när två sidor och den mellanliggande vinkeln är kända.",
    [steg("Skriv cosinussatsen", "Sidan c ligger mot den kända vinkeln.", "\\[c^2=a^2+b^2-2ab\\cos C\\]"),
     steg("Sätt in värdena", "Här är a = 7, b = 10 och C = 60°.", "\\[c^2=7^2+10^2-2\\cdot7\\cdot10\\cos60^\\circ=79\\]"),
     steg("Ta kvadratroten", "En längd är positiv.", "\\[c=\\sqrt{79}\\approx8{,}9\\]")],
    "Den tredje sidan är ungefär 8,9 cm.",
    "Vinkeln i cosinustermen ska ligga mellan de två kända sidorna.", "Använda cosinussatsen");

  add("mato1-grund-4-06", 4, "triangelsatser", C,
    "Beräkna triangelarea med sinus",
    "<p>Två sidor i en triangel är 8 cm och 12 cm. Vinkeln mellan dem är 35°. Bestäm arean.</p>",
    "När två sidor och deras mellanliggande vinkel är kända kan arean beräknas med halva sidprodukten gånger vinkelns sinus.",
    [steg("Skriv areaformeln", "Använd de två sidor som omsluter vinkeln.", "\\[A=\\frac{ab\\sin C}{2}\\]"),
     steg("Sätt in värdena", "Kontrollera att miniräknaren använder grader.", "\\[A=\\frac{8\\cdot12\\sin35^\\circ}{2}\\approx27{,}5\\]")],
    "Arean är ungefär 27,5 cm².",
    "Formeln kräver den mellanliggande vinkeln; använd inte en annan vinkel utan att först bestämma rätt sida–vinkel-samband.", "Beräkna triangelarea med två sidor och mellanliggande vinkel");

  add("mato1-grund-4-07", 4, "trig_tillampningar_bevis", C,
    "Välj rätt trigonometrisk metod",
    "<p>Vilken metod passar bäst i varje fall: a) två sidor och vinkeln mellan dem är kända, b) en sida och dess motstående vinkel samt ytterligare en vinkel är kända?</p>",
    "Metoden bestäms av vilka uppgifter som är kända och vad som söks, inte av vilken formel som senast användes.",
    [steg("Fall a", "Två sidor och mellanliggande vinkel ger den tredje sidan med cosinussatsen."),
     steg("Fall b", "Ett känt motstående sida–vinkel-par gör att sinussatsen kan användas."),
     steg("Kontrollera areaalternativet", "Om area söks i fall a kan areaformeln med sinus användas direkt.")],
    "a) Cosinussatsen för en sida, eller areaformeln om area söks. b) Sinussatsen.",
    "Rita en tydlig figur och markera motstående par innan du väljer formel.", "Trigonometrisk problemlösning och metodval");

  add("mato1-grund-4-08", 4, "trig_tillampningar_bevis", C,
    "Bestäm en höjd med trigonometri",
    "<p>Från en punkt 50 m från ett torn är höjdvinkeln till toppen 32°. Bestäm tornets höjd. Bortse från ögonhöjden.</p>",
    "Situationen bildar en rätvinklig triangel. Den sökta höjden är motstående katet och 50 m är närliggande katet.",
    [steg("Välj tangens", "Tangens kopplar motstående och närliggande katet.", "\\[\\tan32^\\circ=\\frac h{50}\\]"),
     steg("Lös ut höjden", "Multiplicera med 50.", "\\[h=50\\tan32^\\circ\\approx31{,}2\\]")],
    "Tornet är ungefär 31,2 m högt.",
    "Om mätningen görs från ögonhöjd ska den höjden läggas till sist.", "Trigonometrisk problemlösning i rätvinkliga trianglar");

  add("mato1-grund-4-09", 4, "linjar_optimering", B,
    "Formulera och kontrollera bivillkor",
    "<p>Variablerna x och y uppfyller x ≥ 0, y ≥ 0, x + y ≤ 8 och 2x + y ≤ 10. Ligger punkten (3, 4) i det tillåtna området?</p>" + optimeringFigur,
    "Bivillkoren beskriver alla tillåtna lösningar. En punkt är tillåten bara om den uppfyller samtliga olikheter.",
    [steg("Kontrollera icke-negativitet", "Båda koordinaterna är positiva."),
     steg("Pröva första resursvillkoret", "Sätt in x = 3 och y = 4.", "\\[3+4=7\\le8\\]"),
     steg("Pröva andra resursvillkoret", "Punkten ligger på gränslinjen.", "\\[2\\cdot3+4=10\\le10\\]")],
    "Ja, punkten (3, 4) ligger i det tillåtna området.",
    "Alla bivillkor måste vara uppfyllda samtidigt; det räcker inte att punkten klarar ett av dem.", "Formulera bivillkor i linjär optimering");

  add("mato1-grund-4-10", 4, "linjar_optimering", B,
    "Optimera en målfunktion i hörnpunkterna",
    "<p>Det tillåtna området har hörnpunkterna (0, 0), (5, 0), (2, 6) och (0, 8). Maximera P = 40x + 30y.</p>" + optimeringFigur,
    "En linjär målfunktion får sitt största eller minsta värde i någon av det tillåtna områdets hörnpunkter.",
    [steg("Beräkna P i hörnen", "Sätt in varje punkt i målfunktionen.", "\\[P(0,0)=0,\\;P(5,0)=200,\\;P(2,6)=260,\\;P(0,8)=240\\]"),
     steg("Jämför värdena", "Det största värdet är 260 vid punkten (2, 6).")],
    "Maximum är P = 260 och fås vid (x, y) = (2, 6).",
    "Glöm inte hörnpunkter på koordinataxlarna när målfunktionen jämförs.", "Optimera en målfunktion grafiskt");

  add("mato1-grund-4-11", 4, "geometriska_summor", B,
    "Identifiera en geometrisk talföljd",
    "<p>Talföljden är 3, 6, 12, 24, … Bestäm kvoten och skriv en formel för det n:te talet.</p>",
    "I en geometrisk talföljd fås varje nytt tal genom multiplikation med samma kvot k.",
    [steg("Bestäm kvoten", "Dividera ett tal med föregående tal.", "\\[k=\\frac63=\\frac{12}{6}=2\\]"),
     steg("Skriv formeln", "Första talet är a₁ = 3.", "\\[a_n=a_1k^{n-1}=3\\cdot2^{n-1}\\]")],
    "Kvoten är 2 och aₙ = 3 · 2^(n−1).",
    "Exponentens n − 1 gör att formeln ger första talet när n = 1.", "Identifiera och beskriva geometriska talföljder");

  add("mato1-grund-4-12", 4, "geometriska_summor", B,
    "Beräkna en geometrisk summa",
    "<p>Beräkna summan av de sex första talen i följden 3, 6, 12, 24, …</p>",
    "För en geometrisk summa med första term a och kvot k gäller Sₙ = a(kⁿ − 1)/(k − 1) när k ≠ 1.",
    [steg("Identifiera värdena", "Här är a = 3, k = 2 och n = 6."),
     steg("Sätt in i formeln", "Beräkna potensen före divisionen.", "\\[S_6=3\\cdot\\frac{2^6-1}{2-1}=3(64-1)=189\\]"),
     steg("Kontrollera", "Direkt addition ger 3 + 6 + 12 + 24 + 48 + 96 = 189.")],
    "Summan är 189.",
    "Blanda inte ihop formeln för den n:te termen med formeln för summan av de n första termerna.", "Beräkna och analysera geometriska summor");

  add("mato1-grund-4-13", 4, "geometriska_summor", B,
    "Använd en geometrisk summa i en modell",
    "<p>En video får 1 000 visningar första dagen. Varje följande dag får den 80 % så många nya visningar som dagen före. Hur många visningar får den sammanlagt under de första fem dagarna?</p>",
    "De dagliga nytillskotten bildar en geometrisk följd med första term 1 000 och kvot 0,8.",
    [steg("Skriv summan", "Använd a = 1 000, k = 0,8 och n = 5.", "\\[S_5=1000\\cdot\\frac{1-0{,}8^5}{1-0{,}8}\\]"),
     steg("Beräkna", "Summan blir 3 361,6 innan avrundning.", "\\[S_5=3361{,}6\\]"),
     steg("Tolka", "Antal visningar anges som heltal, så modellen ger ungefär 3 362 visningar.")],
    "Sammanlagt blir det ungefär 3 362 visningar under de fem dagarna.",
    "Kvoten 0,8 betyder 80 % av föregående dags nya visningar, inte en minskning med 80 %.", "Använda geometriska summor i tillämpningar");

  window.TYPUPPGIFTER_MATO1 = bank;
})();

/* Ämnesdidaktisk och visuell slutjustering av Matematik – fortsättning nivå 1. */
(() => {
  const bank=window.TYPUPPGIFTER_MATO1;
  const hitta=rubrik=>Object.values(bank).find(g=>g.rubrik===rubrik);
  const taBort=rubrik=>{
    const nyckel=Object.keys(bank).find(k=>bank[k].rubrik===rubrik);
    if(nyckel) delete bank[nyckel];
  };
  const utanSvg=html=>String(html||"").replace(/<svg[\s\S]*?<\/svg>/i,"");

  [
    "Kvadratkomplettera och tolka",
    "Bestäm en funktion från givna villkor",
    "Bestäm derivatan från definitionen",
    "Läs av en tangentlutning",
    "Tolka marginalkostnad",
    "Avgör deriverbarhet i en spets",
    "Bestäm parametrar för deriverbarhet",
    "Bestäm en integrationsgräns"
  ].forEach(taBort);

  const tangentKorrekt='<svg class="dg" viewBox="0 0 650 410" role="img" aria-label="Parabeln y lika med x kvadrat med punkten P, en tangent i P och två sekantlägen när Q närmar sig P">'
    +'<path class="dg-rut" d="M40 40V340M100 40V340M160 40V340M220 40V340M280 40V340M340 40V340M400 40V340M460 40V340M520 40V340M580 40V340M40 340H580M40 280H580M40 220H580M40 160H580M40 100H580M40 40H580"/>'
    +'<path class="dg-axel" d="M30 340H610M100 360V20"/><path class="dg-pil" d="M620 340l-13-6v12zM100 9l-6 13h12z"/>'
    +'<path class="dg-linje" d="M60 330.4 Q190 392.8 320 49.6"/><line class="dg-delta" x1="125" y1="370" x2="380" y2="64"/><line class="dg-hjalp" x1="150" y1="370" x2="355" y2="1"/><line class="dg-hjalp" x1="140" y1="370" x2="380" y2="10" stroke-dasharray="8 6"/>'
    +'<circle class="dg-vald" cx="200" cy="280" r="8"/><circle class="dg-matt" cx="300" cy="100" r="7"/><circle class="dg-matt" cx="250" cy="205" r="6"/>'
    +'<text class="dg-etikett" x="167" y="274">P(1, 1)</text><text class="dg-etikett" x="311" y="94">Q(2, 4)</text><text class="dg-etikett" x="260" y="199">Q närmare P</text><text class="dg-etikett" x="390" y="78">tangent i P</text><text class="dg-txt" x="365" y="28">sekant P–Q</text><text class="dg-txt" x="388" y="145">närmare sekant</text>'
    +'<text class="dg-txt" x="615" y="332">x</text><text class="dg-txt" x="111" y="20">y</text><text class="dg-not" x="325" y="397" text-anchor="middle">När Q närmar sig P närmar sig sekantens lutning tangentens lutning.</text></svg>';

  const derivataTeckenFigur='<svg class="dg" viewBox="0 0 680 470" role="img" aria-label="Två samordnade grafer visar funktionen f med en minimipunkt vid x lika med 2 och derivatan f prim som byter tecken från minus till plus där">'
    +'<text class="dg-rubrik" x="35" y="35">Funktionen f</text><path class="dg-rut" d="M80 55V215M180 55V215M280 55V215M380 55V215M480 55V215M580 55V215M80 215H580M80 175H580M80 135H580M80 95H580M80 55H580"/><path class="dg-axel" d="M65 175H610M80 225V45"/>'
    +'<path class="dg-linje" d="M80 55 Q330 295 580 55"/><line class="dg-hjalp" x1="330" y1="45" x2="330" y2="420" stroke-dasharray="7 6"/><circle class="dg-vald" cx="330" cy="175" r="8"/><text class="dg-etikett" x="345" y="164">minimum vid x = 2</text><text class="dg-txt" x="135" y="105">f avtar</text><text class="dg-txt" x="455" y="105">f växer</text>'
    +'<text class="dg-rubrik" x="35" y="285">Derivatan f′</text><path class="dg-rut" d="M80 300V420M180 300V420M280 300V420M380 300V420M480 300V420M580 300V420M80 420H580M80 380H580M80 340H580M80 300H580"/><path class="dg-axel" d="M65 360H610M80 430V290"/><line class="dg-linje" x1="80" y1="420" x2="580" y2="300"/><circle class="dg-skar" cx="330" cy="360" r="8"/>'
    +'<text class="dg-etikett" x="345" y="350">f′(2) = 0</text><text class="dg-txt" x="155" y="404">f′(x) &lt; 0</text><text class="dg-txt" x="455" y="326">f′(x) &gt; 0</text><text class="dg-not" x="330" y="458" text-anchor="middle">Negativ derivata → f avtar. Positiv derivata → f växer.</text></svg>';

  const teckentabellFigur='<svg class="dg" viewBox="0 0 820 330" role="img" aria-label="Fullständig teckentabell för f prim lika med 3 gånger x minus 1 gånger x plus 1">'
    +'<rect class="dg-rut" x="15" y="20" width="790" height="275" rx="12"/><path class="dg-form" d="M135 20V295M15 75H805M15 125H805M15 175H805M15 225H805M15 275H805M275 20V295M385 20V295M525 20V295M635 20V295"/>'
    +'<g class="dg-rubrik"><text x="75" y="55" text-anchor="middle">x</text><text x="75" y="108" text-anchor="middle">testvärde</text><text x="75" y="158" text-anchor="middle">f′(test)</text><text x="75" y="208" text-anchor="middle">tecken f′</text><text x="75" y="258" text-anchor="middle">f</text></g>'
    +'<g class="dg-txt" text-anchor="middle"><text x="205" y="55">x &lt; −1</text><text x="330" y="55">−1</text><text x="455" y="55">−1 &lt; x &lt; 1</text><text x="580" y="55">1</text><text x="720" y="55">x &gt; 1</text><text x="205" y="108">−2</text><text x="330" y="108">—</text><text x="455" y="108">0</text><text x="580" y="108">—</text><text x="720" y="108">2</text><text x="205" y="158">9</text><text x="330" y="158">0</text><text x="455" y="158">−3</text><text x="580" y="158">0</text><text x="720" y="158">9</text></g>'
    +'<g class="dg-etikett" text-anchor="middle" font-size="20"><text x="205" y="210">+</text><text x="330" y="210">0</text><text x="455" y="210">−</text><text x="580" y="210">0</text><text x="720" y="210">+</text></g>'
    +'<g class="dg-txt" text-anchor="middle"><text x="205" y="260">↗ växer</text><text x="330" y="248">lokalt max</text><text x="330" y="268">f(−1)=2</text><text x="455" y="260">↘ avtar</text><text x="580" y="248">lokalt min</text><text x="580" y="268">f(1)=−2</text><text x="720" y="260">↗ växer</text></g>'
    +'<text class="dg-not" x="410" y="322" text-anchor="middle">Exempel: f′(−2)=9, f′(0)=−3 och f′(2)=9 bestämmer tecknen i intervallen.</text></svg>';

  const integralKorrekt='<svg class="dg" viewBox="0 0 580 360" role="img" aria-label="Grafen y lika med x minus 1 från noll till två med korrekt markerad triangel under x-axeln från noll till ett och triangel över x-axeln från ett till två">'
    +'<path class="dg-rut" d="M70 35V300M150 35V300M230 35V300M310 35V300M390 35V300M470 35V300M550 35V300M70 300H550M70 235H550M70 170H550M70 105H550M70 40H550"/><path class="dg-axel" d="M55 170H565M150 315V22"/>'
    +'<path d="M150 170 L150 235 L230 170 Z" fill="var(--badSoft,rgba(225,85,85,.18))" stroke="var(--bad,#e06464)" stroke-width="2"/><path d="M230 170 L310 105 L310 170 Z" fill="var(--goodSoft,rgba(70,190,145,.18))" stroke="var(--good,#55c49a)" stroke-width="2"/><line class="dg-linje" x1="95" y1="280" x2="365" y2="60"/>'
    +'<text class="dg-rubrik" x="167" y="205">−0,5</text><text class="dg-rubrik" x="263" y="145">+0,5</text><text class="dg-etikett" x="235" y="158">nollställe x = 1</text><g class="dg-txt"><text x="150" y="191" text-anchor="middle">0</text><text x="230" y="191" text-anchor="middle">1</text><text x="310" y="191" text-anchor="middle">2</text><text x="565" y="161">x</text><text x="161" y="24">y</text></g>'
    +'<text class="dg-not" x="290" y="340" text-anchor="middle">Integralen: −0,5 + 0,5 = 0. Geometrisk area: 0,5 + 0,5 = 1.</text></svg>';

  const sinTvaFallFigur='<svg class="dg" viewBox="0 0 720 360" role="img" aria-label="Två skalenligt illustrerade trianglar med samma givna sida vinkel sida-data i sinussatsens tvetydiga fall">'
    +'<text class="dg-rubrik" x="175" y="35" text-anchor="middle">Fall 1: B = 38,7°</text><path class="dg-form" d="M25 290 L323 290 L198 190 Z"/><path class="dg-delta" d="M65 290 A40 40 0 0 0 60 270 M283 290 A40 40 0 0 1 292 265"/><text class="dg-etikett" x="68" y="272">A = 30°</text><text class="dg-etikett" x="251" y="267">B₁ = 38,7°</text><text class="dg-txt" x="92" y="235">b = 10</text><text class="dg-txt" x="264" y="230">a = 8</text><text class="dg-txt" x="188" y="177">C₁ = 111,3°</text>'
    +'<text class="dg-rubrik" x="535" y="35" text-anchor="middle">Fall 2: B = 141,3°</text><path class="dg-form" d="M390 290 L448 290 L598 170 Z"/><text class="dg-etikett" x="362" y="274">A = 30°</text><text class="dg-etikett" x="454" y="258">B₂ = 141,3°</text><text class="dg-txt" x="487" y="222">b = 10</text><text class="dg-txt" x="530" y="244">a = 8</text><text class="dg-txt" x="592" y="157">C₂ = 8,7°</text>'
    +'<text class="dg-not" x="360" y="340" text-anchor="middle">Samma sinusvärde: sin 38,7° = sin 141,3°. Båda vinkelsummorna blir möjliga.</text></svg>';

  const tangent=hitta("Förstå derivata som tangentlutning");
  tangent.t=utanSvg(tangent.t);
  tangent.figur=tangentKorrekt;
  tangent.ram="Sekantens lutning är en förändringskvot över ett intervall. När punkten Q flyttas längs kurvan mot P närmar sig sekanten tangenten i P. Derivatan i P är tangentens lutning.";
  tangent.steg=[
    {rubrik:"Börja med sekanten",text:"Sekanten går genom två punkter på kurvan, P och Q. Dess lutning beskriver den genomsnittliga förändringen mellan punkterna."},
    {rubrik:"Flytta Q mot P",text:"När avståndet mellan punkterna minskar vrids sekanten mot tangenten. Figuren visar också ett mellanläge för Q."},
    {rubrik:"Tolka gränsläget",text:"I gränsläget sammanfaller sekantens lutning med tangentens lutning. Den lutningen är derivatan i P."}
  ];

  const graftecken=hitta("Koppla derivatans tecken till funktionens graf");
  graftecken.t="<p>Figuren visar \\(f(x)=(x-2)^2\\) och derivatan \\(f'(x)=2x-4\\). Förklara hur derivatans tecken hänger samman med funktionens graf.</p>";
  graftecken.figur=derivataTeckenFigur;
  graftecken.ram="När \\(f'(x)<0\\) avtar funktionen. När \\(f'(x)>0\\) växer den. Om derivatan byter från minus till plus där \\(f'(x)=0\\), har funktionen en lokal minimipunkt.";
  graftecken.steg=[
    {rubrik:"Till vänster om x = 2",text:"Derivatans graf ligger under x-axeln. Alltså är \\(f'(x)<0\\), och funktionsgrafen går nedåt när x ökar."},
    {rubrik:"Vid x = 2",text:"Derivatans graf skär x-axeln, så \\(f'(2)=0\\). Samtidigt har f en horisontell tangent och en minimipunkt."},
    {rubrik:"Till höger om x = 2",text:"Derivatans graf ligger över x-axeln. Alltså är \\(f'(x)>0\\), och funktionsgrafen går uppåt när x ökar."}
  ];
  graftecken.svar="f avtar före x = 2, har en minimipunkt vid x = 2 och växer efter x = 2.";

  const forstaAndra=hitta("Använd första och andra derivatan");
  forstaAndra.t="<p>Funktionen är \\(f(x)=x^3-3x\\). Bestäm funktionens lokala extrempunkter.</p>";
  forstaAndra.ram="Kandidater till extrempunkter finns där \\(f'(x)=0\\). Andraderivatan kan sedan visa om punkten är en maximi- eller minimipunkt.";
  forstaAndra.steg[0].rubrik="Bestäm kandidater till extrempunkter";
  forstaAndra.steg[0].text="Derivera och lös \\(f'(x)=0\\).";

  const digitalDerivata=hitta("Bestäm derivata och tangent digitalt");
  digitalDerivata.ram="Ett digitalt verktyg, exempelvis GeoGebra, kan derivera symboliskt. Kontrollera att hela funktionsuttrycket tolkas rätt och skilj på \\(f'(x)\\) och \\(f'(1)\\).";

  const digitalAnalys=hitta("Analysera en funktion digitalt");
  digitalAnalys.t="<p>Använd ett digitalt verktyg, exempelvis GeoGebra, för att hitta extrempunkterna för \\(f(x)=x^3-3x\\) och klassificera dem.</p>";
  digitalAnalys.ram="Arbetsgången är: derivera, lös \\(f'(x)=0\\), kontrollera derivatans tecken eller funktionens graf och beräkna extrempunkternas koordinater.";

  const teckentabell=hitta("Gör en teckentabell för derivatan");
  teckentabell.steg=[
    {rubrik:"Derivera och hitta gränserna",text:"Derivatans nollställen delar tallinjen i tre intervall.",matte:"\\[f'(x)=3x^2-3=3(x-1)(x+1)\\Rightarrow x=-1,1\\]"},
    {rubrik:"Välj testvärden",text:"Använd till exempel \\(x=-2\\), \\(x=0\\) och \\(x=2\\), ett värde i varje intervall.",matte:"\\[f'(-2)=9,\\qquad f'(0)=-3,\\qquad f'(2)=9\\]"},
    {rubrik:"Fyll i hela teckentabellen",text:"Skriv in nollställena, testvärdena, derivatans värden och tecken. Avsluta med vad tecknen innebär för f.",figur:teckentabellFigur},
    {rubrik:"Formulera slutsatsen",text:"Funktionen växer där derivatan är positiv och avtar där derivatan är negativ.",matte:"\\[\\text{växer: }x<-1\\text{ och }x>1;\\qquad\\text{avtar: }-1<x<1\\]"}
  ];
  teckentabell.svar="f växer för \\(x<-1\\) och \\(x>1\\), avtar för \\(-1<x<1\\), har lokal maximipunkt \\((-1,2)\\) och lokal minimipunkt \\((1,-2)\\).";

  const extrem=hitta("Bestäm extrempunkter med derivata");
  extrem.ram="Hitta först kandidater till extrempunkter genom att lösa \\(f'(x)=0\\). Kontrollera sedan teckenbytet och beräkna punktens y-värde.";

  const integral=hitta("Skilj på integral och geometrisk area");
  integral.t=utanSvg(integral.t);
  integral.figur=integralKorrekt;

  const problem=hitta("Tolka derivata i en rörelse");
  problem.rubrik="Tolka derivata i problemlösning";
  problem.ram="I ett tillämpat problem beskriver derivatan hur snabbt en storhet förändras. Här är \\(s(t)\\) läget, så \\(s'(t)\\) är den momentana hastigheten. Tecknet visar rörelsens riktning.";
  problem.komihag="Börja alltid med att ange vad derivatan betyder och vilken enhet den har i just problemet. Ett negativt värde visar här rörelse i negativ riktning.";

  const ack=hitta("Beräkna en ackumulerad mängd");
  ack.rubrik="Tolka en integrals värde";
  ack.t="<p>Vatten strömmar in i en tank med flödet \\(r(t)=5+2t\\) liter per minut. Tolka och beräkna \\(\\int_0^4 r(t)\\,dt\\).</p>";
  ack.ram="När integranden är en förändringshastighet beskriver integralen den sammanlagda förändringen under intervallet. Här omvandlas liter per minut till liter.";
  ack.steg=[
    {rubrik:"Tolka integranden och gränserna",text:"\\(r(t)\\) är inflödet i liter per minut och intervallet 0 till 4 betyder de första fyra minuterna."},
    {rubrik:"Beräkna integralen",text:"En primitiv funktion till \\(5+2t\\) är \\(5t+t^2\\).",matte:"\\[\\int_0^4(5+2t)\\,dt=[5t+t^2]_0^4=20+16=36\\]"},
    {rubrik:"Svara med betydelse och enhet",text:"Integralens värde är den volym som har tillkommit, inte tankens totala volym."}
  ];
  ack.svar="Integralen har värdet 36 liter. Det betyder att 36 liter vatten tillkommer under de första fyra minuterna.";
  ack.komihag="En integral av en förändringshastighet ger den sammanlagda förändringen. Slutvärdet kräver dessutom att startvärdet är känt.";

  const sinTvaFall={
    kap:4,omr:"triangelsatser",kurs:["1c"],rubrik:"När sinussatsen ger två fall",niva:"E",
    t:"<p>I en triangel är \\(A=30^\\circ\\), \\(a=8\\) cm och \\(b=10\\) cm. Bestäm de möjliga värdena på vinkeln \\(B\\).</p>",
    ram:"När två sidor och en vinkel som inte ligger mellan sidorna är kända kan sinussatsen ge två trianglar. Det beror på att \\(\\sin B=\\sin(180^\\circ-B)\\).",
    figur:sinTvaFallFigur,
    steg:[
      {rubrik:"Använd det kända motstående paret",text:"Sidan a ligger mot A och sidan b mot B.",matte:"\\[\\frac{\\sin B}{b}=\\frac{\\sin A}{a}\\Rightarrow\\sin B=\\frac{10\\sin30^\\circ}{8}=0{,}625\\]"},
      {rubrik:"Bestäm den första vinkeln",text:"Miniräknarens inversa sinus ger den spetsiga lösningen.",matte:"\\[B_1=\\sin^{-1}(0{,}625)\\approx38{,}7^\\circ\\]"},
      {rubrik:"Kontrollera supplementvinkeln",text:"Sinus är lika stor för vinkeln och dess supplementvinkel.",matte:"\\[B_2=180^\\circ-B_1\\approx141{,}3^\\circ\\]"},
      {rubrik:"Kontrollera båda trianglarna",text:"Båda fungerar eftersom vinkelsumman lämnar en positiv tredje vinkel.",matte:"\\[C_1=111{,}3^\\circ,\\qquad C_2=8{,}7^\\circ\\]"}
    ],
    svar:"Det finns två möjliga vinklar: \\(B\\approx38{,}7^\\circ\\) eller \\(B\\approx141{,}3^\\circ\\).",
    komihag:"När du använder invers sinus: pröva alltid också \\(180^\\circ-B\\). Behåll det andra fallet bara om triangelns vinkelsumma och sidlängder gör triangeln möjlig.",
    traningsfamilj:"Använda sinussatsen"
  };

  const poster=[];
  Object.entries(bank).forEach(([nyckel,kort])=>{
    poster.push([nyckel,kort]);
    if(kort.rubrik==="Använd sinussatsen") poster.push(["mato1-grund-4-04b",sinTvaFall]);
  });
  window.TYPUPPGIFTER_MATO1=Object.fromEntries(poster);
})();
