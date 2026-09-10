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

  // Kapitel 1: Algebra
  add("ma2-grund-1-01", 1, ["rata_linjens_ekvation", "linjara_representationer"], ALL,
    "Tolka räta linjens ekvation",
    "<p>Linjen har ekvationen <strong>y = 3x − 2</strong>. Ange riktningskoefficienten, skärningen med y-axeln och beräkna y när x = 4.</p>",
    "I \\(y=kx+m\\) visar \\(k\\) förändringen i y när x ökar med 1. Talet \\(m\\) är y-värdet när \\(x=0\\).",
    [steg("Läs av k och m", "Jämför med formen y = kx + m.", "\\[k=3\\quad\\text{och}\\quad m=-2\\]"),
     steg("Sätt in x-värdet", "Ersätt varje x i formeln med 4. Det insatta värdet markeras rött.", "\\[y=3\\cdot{\\color{#D1495B}{4}}-2=12-2=10\\]")],
    "\\(k=3\\), \\(m=-2\\) och \\(y=10\\) när \\(x=4\\).",
    "k är förändring per x-enhet; m är startvärdet.", "Använda linjens ekvation och beräkna värden");

  add("ma2-grund-1-02", 1, "bestamma_linjara_funktioner", ALL,
    "Bestäm linjen genom två punkter",
    "<p>Bestäm ekvationen för linjen genom punkterna (1, 3) och (4, 9).</p>",
    "Bestäm först lutningen med förändring i y delat med förändring i x. Sätt sedan in en punkt för att hitta m.",
    [steg("Beräkna k", "Använd samma ordning i täljare och nämnare.", "\\[k=\\frac{9-3}{4-1}=\\frac63=2\\]"),
     steg("Bestäm m", "Sätt in punkten (1, 3) i y = 2x + m.", "\\[3=2\\cdot1+m\\Rightarrow m=1\\]"),
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
    "<p>I en tabell ökar x med 2 samtidigt som y ökar från 5 till 11. Ett av paren är (0, 2). Bestäm funktionen.</p>",
    "I en linjär tabell är kvoten \\(\\Delta y/\\Delta x\\) konstant.",
    [steg("Bestäm k", "y ökar med 6 när x ökar med 2.", "\\[k=\\frac{11-5}{2}=3\\]"),
     steg("Bestäm m", "Paret (0, 2) visar direkt värdet när x = 0.", "\\[m=2\\]"),
     steg("Skriv funktionen", "Sätt in k och m i y = kx + m.", "\\[y=3x+2\\]")],
    "Funktionen är \\(y=3x+2\\).",
    "Kontrollera att samma k fås mellan flera tabellrader.", "Bestämma linjär funktion från tabell");

  add("ma2-grund-1-05", 1, ["linjara_ekvationssystem", "grafisk_losning_ekvationssystem"], ALL,
    "Förstå lösningen till ett ekvationssystem",
    "<p>Linjerna y = x + 1 och y = −x + 5 skär varandra. Bestäm skärningspunkten.</p>",
    "Lösningen är det talpar som gör båda ekvationerna sanna. I en graf är det linjernas skärningspunkt.",
    [steg("Sätt uttrycken lika", "I skärningspunkten har linjerna samma y-värde.", "\\[x+1=-x+5\\]"),
     steg("Lös ut x", "Samla x-termerna på ena sidan.", "\\[2x=4\\Rightarrow x=2\\]"),
     steg("Bestäm y", "Sätt x = 2 i någon av ekvationerna.", "\\[y=2+1=3\\]")],
    "Skärningspunkten och lösningen är \\((2,3)\\).",
    "Ett ekvationssystem frågar efter värden som fungerar samtidigt.", "Grafisk lösning");

  add("ma2-grund-1-06", 1, "substitutionsmetoden", ALL,
    "Lös ett ekvationssystem med substitution",
    "<p>Lös systemet y = 2x + 1 och x + y = 10.</p>",
    "När en variabel redan är ensam kan dess uttryck sättas in i den andra ekvationen.",
    [steg("Ersätt y", "Sätt in 2x + 1 där y står i den andra ekvationen.", "\\[x+(2x+1)=10\\]"),
     steg("Lös ekvationen", "Förenkla och lös ut x.", "\\[3x+1=10\\Rightarrow 3x=9\\Rightarrow x=3\\]"),
     steg("Bestäm y", "Sätt tillbaka x = 3.", "\\[y=2\\cdot3+1=7\\]")],
    "Lösningen är \\(x=3\\), \\(y=7\\).",
    "Substitution betyder att ersätta en variabel med ett lika stort uttryck.", "Substitutionsmetoden");

  add("ma2-grund-1-07", 1, "additionsmetoden", ALL,
    "Lös ett ekvationssystem med addition",
    "<p>Lös systemet 2x + y = 11 och 3x − y = 9.</p>",
    "Adderar du leden försvinner en variabel när dess koefficienter är motsatta.",
    [steg("Addera ekvationerna", "y och −y tar ut varandra.", "\\[(2x+y)+(3x-y)=11+9\\Rightarrow5x=20\\]"),
     steg("Bestäm x", "Dela båda led med 5.", "\\[x=4\\]"),
     steg("Bestäm y", "Sätt x = 4 i den första ekvationen.", "\\[2\\cdot4+y=11\\Rightarrow y=3\\]")],
    "Lösningen är \\(x=4\\), \\(y=3\\).",
    "Multiplicera först en ekvation om koefficienterna inte redan är motsatta.", "Additionsmetoden");

  add("ma2-grund-1-08", 1, "speciella_ekvationssystem", ALL,
    "Avgör om ett system saknar eller har oändligt många lösningar",
    "<p>Jämför systemen A: y = 2x + 1 och y = 2x − 3, samt B: y = 2x + 1 och 2y = 4x + 2.</p>",
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
     steg("Lös systemet", "Sätt y = 40 − x i intäktsekvationen.", "\\[120x+80(40-x)=4000\\Rightarrow40x=800\\Rightarrow x=20\\]")],
    "Det säljs 20 vuxenbiljetter och 20 ungdomsbiljetter.",
    "Kontrollera både totalantalet och totalsumman.", "Tillämpningar med ekvationssystem");

  add("ma2-grund-1-10", 1, "ekvationssystem_tre_obekanta", C,
    "Lös ett system med tre obekanta",
    "<p>Lös x + y + z = 6, x − y = 0 och z = 2.</p>",
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
     steg("Pröva", "x = 0 ger 1 = −1 och förkastas. x = 3 ger 2 = 2.", "\\[x=3\\]")],
    "\\(x=3\\).",
    "En rot är aldrig negativ, så högerledet måste också vara minst noll.", "Rotekvationer och falska rötter");

  add("ma2-grund-2-07b", 2, "funktionsskrivsatt_rep", BC,
    "Tolka funktionsnotation",
    "<p>Funktionen f ges av f(x) = x² − 3. Beräkna f(−2) och lös f(x) = 6.</p>",
    "\\(f(-2)\\) frågar efter ett funktionsvärde. \\(f(x)=6\\) frågar efter de x-värden som ger funktionsvärdet 6.",
    [steg("Beräkna funktionsvärdet", "Ersätt varje x med −2. Det insatta värdet markeras rött.", "\\[f({\\color{#D1495B}{-2}})=({\\color{#D1495B}{-2}})^2-3=1\\]"),
     steg("Lös ekvationen", "Sätt funktionsuttrycket lika med 6.", "\\[x^2-3=6\\Rightarrow x^2=9\\Rightarrow x=\\pm3\\]")],
    "\\(f(-2)=1\\). Ekvationen \\(f(x)=6\\) har lösningarna \\(x=-3\\) och \\(x=3\\).",
    "Skilj på ett givet x-värde och ett givet funktionsvärde.", "Tolka funktionsnotation och funktionsvärden");

  add("ma2-grund-2-08", 2, ["andragradsfunktioner", "andragradsfunktion_graf", "symmetrilinje_extrempunkt"], ALL,
    "Bestäm nollställen, symmetrilinje och extrempunkt",
    "<p>Undersök funktionen f(x) = x² − 4x + 3.</p>",
    "Nollställena visar var grafen skär x-axeln. Symmetrilinjen ligger mitt emellan nollställena.",
    [steg("Bestäm nollställena", "Faktorisera och använd nollproduktmetoden.", "\\[x^2-4x+3=(x-1)(x-3)\\Rightarrow x=1\\text{ eller }x=3\\]"),
     steg("Bestäm symmetrilinjen", "Ta medelvärdet av nollställena.", "\\[x=\\frac{1+3}{2}=2\\]"),
     steg("Bestäm extrempunkten", "Sätt x = 2 i funktionen.", "\\[f({\\color{#D1495B}{2}})={\\color{#D1495B}{2}}^2-4\\cdot{\\color{#D1495B}{2}}+3=-1\\]")],
    "Nollställena är 1 och 3, symmetrilinjen är \\(x=2\\) och minimipunkten är \\((2,-1)\\).",
    "När koefficienten framför x² är positiv öppnar parabeln uppåt.", "Grundegenskaper hos andragradsfunktioner");

  add("ma2-grund-2-09", 2, "symmetrilinje_extrempunkt", ALL,
    "Läs av extrempunkten ur vertexform",
    "<p>Bestäm extrempunkt och största eller minsta värde för f(x) = −2(x − 3)² + 8.</p>",
    "I formen \\(a(x-h)^2+k\\) är extrempunkten \\((h,k)\\). Tecknet på a visar åt vilket håll parabeln öppnar sig.",
    [steg("Läs av h och k", "Jämför med a(x − h)² + k.", "\\[h=3,\\quad k=8\\]"),
     steg("Avgör typen av extrempunkt", "a = −2 är negativt, så parabeln öppnar nedåt.", "\\[a=-2<0\\]")],
    "Extrempunkten är \\((3,8)\\) och funktionens största värde är 8.",
    "I (x − h)² byter h inte tecken när det läses av.", "Symmetrilinje och extrempunkt");

  add("ma2-grund-2-10", 2, "fran_graf_till_formel", ALL,
    "Bestäm en andragradsfunktion från nollställen",
    "<p>En parabel har nollställena −1 och 4 och går genom punkten (0, −8). Bestäm funktionen.</p>",
    "Med nollställena \\(x_1\\) och \\(x_2\\) kan funktionen skrivas \\(f(x)=a(x-x_1)(x-x_2)\\).",
    [steg("Skriv faktorformen", "Nollställena ger var sin faktor.", "\\[f(x)=a(x+1)(x-4)\\]"),
     steg("Bestäm a", "Sätt in punkten (0, −8).", "\\[-8=a(0+1)(0-4)=-4a\\Rightarrow a=2\\]"),
     steg("Skriv funktionen", "Behåll gärna faktorformen när nollställena är viktiga.", "\\[f(x)=2(x+1)(x-4)\\]")],
    "\\(f(x)=2(x+1)(x-4)\\).",
    "Nollställena bestämmer faktorerna; ytterligare en punkt bestämmer a.", "Bestämma andragradsfunktion från graf eller punkter");

  add("ma2-grund-2-11", 2, "andragradsfunktioner_tillampningar", ALL,
    "Tolka en andragradsmodell",
    "<p>Höjden i meter för en boll beskrivs av h(t) = −5t² + 20t + 1. När är bollen som högst?</p>",
    "För \\(at^2+bt+c\\) ligger symmetrilinjen vid \\(t=-b/(2a)\\).",
    [steg("Bestäm tiden", "Här är a = −5 och b = 20.", "\\[t=-\\frac{20}{2\\cdot(-5)}=2\\]"),
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
    "Förändringsfaktorn vid en ökning med p procent är \\(1+p/100\\).",
    [steg("Bestäm startvärde och faktor", "Startvärdet är 5 000 och faktorn är 1,04.", "\\[K(x)=5000\\cdot1{,}04^x\\]"),
     steg("Sätt in tiden", "Exponentens värde är antalet år.", "\\[K({\\color{#D1495B}{3}})=5000\\cdot1{,}04^{\\color{#D1495B}{3}}\\approx5624\\]")],
    "Modellen är \\(K(x)=5000\\cdot1{,}04^x\\), och efter 3 år är värdet cirka 5 624 kr.",
    "Procentuell förändring sker på det nya värdet varje period.", "Bestämma och tolka exponentialfunktioner");

  add("ma2-grund-2-16", 2, "exponentialgraf", ALL,
    "Tolka en exponentialfunktions graf",
    "<p>Funktionen f(x) = 200 · 0,75ˣ beskriver en mängd. Ange startvärde och procentuell förändring per x-enhet.</p>",
    "I \\(f(x)=C\\cdot a^x\\) är C startvärdet och a förändringsfaktorn.",
    [steg("Läs av startvärdet", "När x = 0 är a⁰ = 1.", "\\[f(0)=200\\]"),
     steg("Tolka faktorn", "0,75 = 1 − 0,25 innebär en minskning med 25 %.", "\\[1-0{,}75=0{,}25=25\\,\\%\\]")],
    "Startvärdet är 200 och mängden minskar med 25 % per x-enhet.",
    "En faktor mellan 0 och 1 ger avtagande exponentialfunktion.", "Tolka exponentialfunktion från graf");

  add("ma2-grund-2-17", 2, "exponentialekvationer", ALL,
    "Lös en exponentialekvation grafiskt",
    "<p>Lös 3 · 1,5ˣ = 10 med ett digitalt grafverktyg.</p>",
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
    "Modellval ska bygga på förändringsmönstret och sammanhanget, inte bara på ett högt R²-värde.",
    [steg("Identifiera förändringen", "Samma procent innebär ungefär samma förändringsfaktor mellan mätvärdena."),
     steg("Välj modell", "Konstant förändringsfaktor passar en exponentialmodell.", "\\[y=C\\cdot a^x\\]"),
     steg("Kontrollera", "Granska residualer och om modellens prognoser är rimliga i sammanhanget.")],
    "Pröva i första hand en exponentialmodell.",
    "Konstant skillnad pekar mot linjär modell; konstant faktor pekar mot exponentialmodell.", "Välja och granska regressionsmodeller");

  window.TYPUPPGIFTER_MA2 = bank;
})();
