/* Grundgenomgångar för Matematik – fortsättning nivå 2 i Kunskapsgymmet.
 * Objektens ordning är kursens pedagogiska läsordning.
 */
(() => {
  const KURS = ["2c"];
  const bank = {};
  const steg = (rubrik, text, matte, figur) => {
    const s = { rubrik, text };
    if (matte) s.matte = matte;
    if (figur) s.figur = figur;
    return s;
  };
  const add = (id, kap, omr, rubrik, t, ram, steglista, svar, komihag, traningsfamilj) => {
    bank[id] = { kap, omr, kurs: KURS, rubrik, niva: "E", t, ram, steg: steglista, svar, komihag };
    if (traningsfamilj) bank[id].traningsfamilj = traningsfamilj;
  };

  /* Temasäkra figurer: färgerna kommer från indexfilens dg-klasser. */
  const cirkelFigur = '<svg class="dg" viewBox="0 0 330 300" role="img" aria-label="Enhetscirkel med vinkeln två pi genom tre och punkten minus en halv, roten ur tre genom två." style="display:block;width:min(100%,320px);height:auto;margin:14px auto 4px"><circle class="dg-form" cx="165" cy="148" r="105"/><path class="dg-axel" d="M38 148H292M165 275V21"/><path class="dg-pil" d="M300 148l-10-4.5v9zM165 13l-4.5 10h9z"/><path class="dg-hjalp" d="M112.5 57.1V148M112.5 57.1H165"/><path class="dg-linje" d="M165 148L112.5 57.1"/><path class="dg-delta" d="M201 148A36 36 0 0 0 147 116.8"/><circle class="dg-vald" cx="112.5" cy="57.1" r="5.5"/><g class="dg-txt"><text x="304" y="140" font-style="italic">x</text><text x="175" y="18" font-style="italic">y</text><text x="105" y="47" text-anchor="end">(−1/2, √3/2)</text></g><text class="dg-etikett" x="188" y="115">2π/3</text></svg>';
  const sinusFigur = '<svg class="dg" viewBox="0 0 390 250" role="img" aria-label="Sinuskurva med amplitud två, medellinje ett och period två pi." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M44 24V214M94 24V214M144 24V214M194 24V214M244 24V214M294 24V214M344 24V214M44 214H364M44 174H364M44 134H364M44 94H364M44 54H364"/><path class="dg-axel" d="M44 174H370M44 224V14"/><path class="dg-pil" d="M378 174l-10-4.5v9zM44 6l-4.5 10h9z"/><path class="dg-hjalp" stroke-dasharray="7 6" d="M44 134H364"/><path class="dg-linje" d="M44 134C69 54 119 54 144 134S219 214 244 134S319 54 344 134"/><g class="dg-txt"><text x="44" y="193" text-anchor="middle">0</text><text x="144" y="193" text-anchor="middle">π</text><text x="244" y="193" text-anchor="middle">2π</text><text x="336" y="126">y = 1</text><text x="374" y="165" font-style="italic">x</text><text x="54" y="18" font-style="italic">y</text></g></svg>';
  const asymptotFigur = '<svg class="dg" viewBox="0 0 370 260" role="img" aria-label="Rationell graf med lodrät asymptot x lika med ett och vågrät asymptot y lika med två." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M40 24V224M90 24V224M140 24V224M190 24V224M240 24V224M290 24V224M340 24V224M40 224H340M40 184H340M40 144H340M40 104H340M40 64H340M40 24H340"/><path class="dg-axel" d="M40 184H348M90 234V14"/><path class="dg-pil" d="M356 184l-10-4.5v9zM90 6l-4.5 10h9z"/><path class="dg-hjalp" stroke-dasharray="7 6" d="M140 18V230M34 104H348"/><path class="dg-linje" d="M46 127C82 132 112 145 130 220M150 24C163 67 198 87 338 99"/><g class="dg-txt"><text x="140" y="203" text-anchor="middle">1</text><text x="82" y="109" text-anchor="end">2</text><text x="348" y="96" text-anchor="end">y = 2</text><text x="148" y="32">x = 1</text></g></svg>';
  const areaFigur = '<svg class="dg" viewBox="0 0 370 255" role="img" aria-label="Området mellan parabeln y lika med x kvadrat och linjen y lika med två x från noll till två är markerat." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 24V218M102 24V218M162 24V218M222 24V218M282 24V218M342 24V218M42 218H342M42 170H342M42 122H342M42 74H342M42 26H342"/><path class="dg-axel" d="M42 218H350M102 228V14"/><path class="dg-pil" d="M358 218l-10-4.5v9zM102 6l-4.5 10h9z"/><path d="M102 218L222 26Q162 218 102 218Z" fill="var(--accSoft)" stroke="none"/><path class="dg-linje" d="M102 218Q162 218 222 26"/><path class="dg-delta" d="M102 218L222 26"/><g class="dg-txt"><text x="162" y="237" text-anchor="middle">1</text><text x="222" y="237" text-anchor="middle">2</text><text x="229" y="34">y = 2x</text><text x="226" y="92">y = x²</text></g></svg>';
  const tathetFigur = '<svg class="dg" viewBox="0 0 370 245" role="img" aria-label="En triangelformad täthetsfunktion på intervallet noll till två med hela området markerat." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 24V208M102 24V208M162 24V208M222 24V208M282 24V208M342 24V208M42 208H342M42 162H342M42 116H342M42 70H342M42 24H342"/><path class="dg-axel" d="M42 208H350M102 218V14"/><path class="dg-pil" d="M358 208l-10-4.5v9zM102 6l-4.5 10h9z"/><polygon points="102,208 222,24 222,208" fill="var(--accSoft)" stroke="var(--acc)" stroke-width="2"/><g class="dg-txt"><text x="162" y="227" text-anchor="middle">1</text><text x="222" y="227" text-anchor="middle">2</text><text x="94" y="29" text-anchor="end">k</text><text x="238" y="42">f(x) = kx</text></g></svg>';
  const rotationFigur = '<svg class="dg" viewBox="0 0 370 250" role="img" aria-label="Området under linjen y lika med x från noll till två roteras kring x-axeln och bildar en kon." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-axel" d="M42 132H350M102 228V20"/><path class="dg-pil" d="M358 132l-10-4.5v9zM102 12l-4.5 10h9z"/><path d="M102 132L282 40A48 92 0 0 1 282 224Z" fill="var(--accSoft)" stroke="var(--acc)" stroke-width="1.8"/><ellipse class="dg-form" cx="282" cy="132" rx="22" ry="92"/><path class="dg-linje" d="M102 132L282 40"/><path class="dg-hjalp" d="M102 132L282 224"/><g class="dg-txt"><text x="192" y="150" text-anchor="middle">x</text><text x="282" y="240" text-anchor="middle">2</text><text x="290" y="76">y = x</text></g></svg>';
  const komplexFigur = '<svg class="dg" viewBox="0 0 350 285" role="img" aria-label="Komplexa talplanet med talet tre plus fyra i markerat som punkten tre, fyra och en pil från origo." style="display:block;width:min(100%,340px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M38 24V244M88 24V244M138 24V244M188 24V244M238 24V244M288 24V244M338 24V244M38 244H338M38 194H338M38 144H338M38 94H338M38 44H338"/><path class="dg-axel" d="M38 244H344M88 254V14"/><path class="dg-pil" d="M350 244l-9-4.5v9zM88 6l-4.5 10h9zM238 44l-10 2 6 8z"/><path class="dg-linje" d="M88 244L238 44"/><path class="dg-hjalp" stroke-dasharray="6 5" d="M238 44V244M88 44H238"/><circle class="dg-vald" cx="238" cy="44" r="5.5"/><g class="dg-txt"><text x="238" y="263" text-anchor="middle">3</text><text x="80" y="49" text-anchor="end">4i</text><text x="342" y="235" text-anchor="end">Re</text><text x="98" y="18">Im</text><text x="248" y="38">3 + 4i</text></g></svg>';

  // Kapitel 1: Trigonometri
  add("mato2-grund-1-01", 1, "enhetscirkeln",
    "Läs exakta värden i enhetscirkeln",
    "<p>Bestäm exakt cos(2π/3), sin(2π/3) och tan(2π/3).</p>" + cirkelFigur,
    "I enhetscirkeln är cosinus punktens x-koordinat och sinus dess y-koordinat. Tangens är kvoten sinus genom cosinus.",
    [steg("Bestäm referensvinkeln", "2π/3 motsvarar 120° och har referensvinkeln 60°. Punkten ligger i andra kvadranten."),
     steg("Läs koordinaterna", "Cosinus är negativ och sinus positiv.", "\\[\\cos\\frac{2\\pi}{3}=-\\frac12,\\qquad\\sin\\frac{2\\pi}{3}=\\frac{\\sqrt3}{2}\\]"),
     steg("Beräkna tangens", "Dividera sinus med cosinus.", "\\[\\tan\\frac{2\\pi}{3}=\\frac{\\sqrt3/2}{-1/2}=-\\sqrt3\\]")],
    "cos(2π/3) = −1/2, sin(2π/3) = √3/2 och tan(2π/3) = −√3.",
    "Bestäm först kvadranten och tecknen; använd sedan standardvinkeln.", "Exakta trigonometriska värden i enhetscirkeln");

  add("mato2-grund-1-02", 1, "enhetscirkeln",
    "Använd symmetri och periodicitet",
    "<p>Bestäm exakt sin(−π/6) och cos(13π/6).</p>",
    "Sinus är en udda funktion, cosinus är en jämn funktion och båda har perioden 2π.",
    [steg("Använd sinus symmetri", "sin(−v) = −sin v.", "\\[\\sin\\left(-\\frac\\pi6\\right)=-\\sin\\frac\\pi6=-\\frac12\\]"),
     steg("Reducera vinkeln", "13π/6 är ett helt varv mer än π/6.", "\\[\\frac{13\\pi}{6}-2\\pi=\\frac\\pi6\\]"),
     steg("Använd periodiciteten", "Cosinus har samma värde efter ett helt varv.", "\\[\\cos\\frac{13\\pi}{6}=\\cos\\frac\\pi6=\\frac{\\sqrt3}{2}\\]")],
    "sin(−π/6) = −1/2 och cos(13π/6) = √3/2.",
    "Lägg till eller dra ifrån hela varv tills vinkeln blir lätt att läsa i enhetscirkeln.", "Symmetrier och periodicitet i enhetscirkeln");

  add("mato2-grund-1-03", 1, "enhetscirkeln",
    "Bestäm ett trigonometriskt värde från ett annat",
    "<p>Vinkeln v ligger i andra kvadranten och sin v = 3/5. Bestäm cos v exakt.</p>",
    "Den trigonometriska ettan kopplar samman sinus och cosinus. Kvadranten avgör vilket tecken roten ska få.",
    [steg("Använd trigonometriska ettan", "Sätt in det kända sinusvärdet.", "\\[\\sin^2v+\\cos^2v=1\\Rightarrow\\left(\\frac35\\right)^2+\\cos^2v=1\\]"),
     steg("Lös för cosinus", "Beräkningen ger två möjliga tecken.", "\\[\\cos^2v=\\frac{16}{25}\\Rightarrow\\cos v=\\pm\\frac45\\]"),
     steg("Välj tecken", "I andra kvadranten är cosinus negativ.", "\\[\\cos v=-\\frac45\\]")],
    "cos v = −4/5.",
    "När du tar roten ur cos²v måste du först få ± och sedan välja tecken med kvadranten.", "Bestäm trigonometriska värden från ett givet värde");

  add("mato2-grund-1-04", 1, "radianer",
    "Omvandla mellan grader och radianer",
    "<p>Omvandla 150° till radianer och 7π/6 radianer till grader.</p>",
    "Ett halvt varv är både 180° och π radianer. Det ger omvandlingsfaktorerna π/180 och 180/π.",
    [steg("Grader till radianer", "Multiplicera med π/180.", "\\[150^\\circ\\cdot\\frac{\\pi}{180^\\circ}=\\frac{5\\pi}{6}\\]"),
     steg("Radianer till grader", "Multiplicera med 180/π.", "\\[\\frac{7\\pi}{6}\\cdot\\frac{180^\\circ}{\\pi}=210^\\circ\\]")],
    "150° = 5π/6 rad och 7π/6 rad = 210°.",
    "Kontrollera rimligheten mot π rad = 180°.", "Omvandling mellan grader och radianer");

  add("mato2-grund-1-05", 1, "radianer",
    "Beräkna båglängd och sektorarea",
    "<p>En cirkel har radien 6 cm och medelpunktsvinkeln π/3 rad. Bestäm båglängden och sektorns area.</p>",
    "När vinkeln mäts i radianer gäller båglängden s = rv och sektorarean A = r²v/2.",
    [steg("Beräkna båglängden", "Sätt in r = 6 och v = π/3.", "\\[s=6\\cdot\\frac\\pi3=2\\pi\\text{ cm}\\]"),
     steg("Beräkna sektorarean", "Använd samma radianvinkel.", "\\[A=\\frac{6^2\\cdot(\\pi/3)}2=6\\pi\\text{ cm}^2\\]")],
    "Båglängden är 2π cm och sektorarean är 6π cm².",
    "Formlerna s = rv och A = r²v/2 kräver att v anges i radianer.", "Båglängd, sektorarea och radianer");

  add("mato2-grund-1-06", 1, "trig_formler",
    "Använd trigonometriska ettan",
    "<p>Förenkla uttrycket 1 − sin²x.</p>",
    "Den trigonometriska ettan är sin²x + cos²x = 1. Den kan lösas ut åt båda håll.",
    [steg("Skriv identiteten", "Utgå från trigonometriska ettan.", "\\[\\sin^2x+\\cos^2x=1\\]"),
     steg("Lös ut uttrycket", "Subtrahera sin²x i båda led.", "\\[1-\\sin^2x=\\cos^2x\\]")],
    "Uttrycket förenklas till cos²x.",
    "sin²x betyder (sin x)², inte sin(x²).", "Använda trigonometriska ettan");

  add("mato2-grund-1-07", 1, "trig_formler",
    "Använd en additionsformel",
    "<p>Bestäm exakt sin 75°.</p>",
    "Skriv 75° som en summa av standardvinklar och använd additionsformeln för sinus.",
    [steg("Dela upp vinkeln", "75° = 45° + 30°."),
     steg("Använd formeln", "sin(a + b) = sin a cos b + cos a sin b.", "\\[\\sin75^\\circ=\\sin45^\\circ\\cos30^\\circ+\\cos45^\\circ\\sin30^\\circ\\]"),
     steg("Sätt in exakta värden", "Samla termerna över samma nämnare.", "\\[\\sin75^\\circ=\\frac{\\sqrt2}{2}\\frac{\\sqrt3}{2}+\\frac{\\sqrt2}{2}\\frac12=\\frac{\\sqrt6+\\sqrt2}{4}\\]")],
    "sin 75° = (√6 + √2)/4.",
    "Tecknet mellan termerna i sinus additionsformel följer tecknet i vinkeln.", "Använda additionsformler för sinus och cosinus");

  add("mato2-grund-1-08", 1, "trig_formler",
    "Använd formeln för dubbla vinkeln",
    "<p>Vinkeln x ligger i första kvadranten och sin x = 3/5. Bestäm sin 2x exakt.</p>",
    "Formeln sin 2x = 2 sin x cos x kräver både sinus och cosinus för x.",
    [steg("Bestäm cos x", "Använd en 3–4–5-triangel eller trigonometriska ettan. I första kvadranten är värdet positivt.", "\\[\\cos x=\\frac45\\]"),
     steg("Använd dubbelvinkelformeln", "Sätt in båda värdena.", "\\[\\sin2x=2\\cdot\\frac35\\cdot\\frac45=\\frac{24}{25}\\]")],
    "sin 2x = 24/25.",
    "Formeln innehåller sinus och cosinus för x, medan vänsterledet har vinkeln 2x.", "Använda formler för dubbla vinkeln");

  add("mato2-grund-1-09", 1, "trig_ekvationer",
    "Lös en grundläggande trigonometrisk ekvation",
    "<p>Lös sin x = 1/2 för 0 ≤ x &lt; 2π.</p>",
    "Sinus är y-koordinaten i enhetscirkeln. Ett positivt värde fås i första och andra kvadranten.",
    [steg("Bestäm referensvinkeln", "sin(π/6) = 1/2 ger den första lösningen.", "\\[x_1=\\frac\\pi6\\]"),
     steg("Bestäm lösningen i andra kvadranten", "Använd π − π/6.", "\\[x_2=\\pi-\\frac\\pi6=\\frac{5\\pi}{6}\\]"),
     steg("Kontrollera intervallet", "Båda lösningarna ligger mellan 0 och 2π.")],
    "x = π/6 eller x = 5π/6.",
    "Miniräknarens arcsin ger bara huvudlösningen; enhetscirkeln ger alla lösningar i intervallet.", "Grundläggande trigonometriska ekvationer");

  add("mato2-grund-1-10", 1, "trig_ekvationer",
    "Skriv den generella lösningen",
    "<p>Lös cos x = −1/2 för alla reella x.</p>",
    "Hitta lösningarna under ett varv och lägg sedan till hela perioder.",
    [steg("Lös under ett varv", "Cosinus är −1/2 vid 2π/3 och 4π/3.", "\\[x=\\frac{2\\pi}{3}\\quad\\text{eller}\\quad x=\\frac{4\\pi}{3}\\]"),
     steg("Lägg till perioder", "Cosinus har perioden 2π.", "\\[x=\\frac{2\\pi}{3}+2\\pi n\\quad\\text{eller}\\quad x=\\frac{4\\pi}{3}+2\\pi n,\\quad n\\in\\mathbb Z\\]")],
    "x = 2π/3 + 2πn eller x = 4π/3 + 2πn, där n är ett heltal.",
    "En generell lösning måste innehålla en heltalsparameter.", "Trigonometriska ekvationer med generell lösning");

  add("mato2-grund-1-11", 1, "trig_ekvationer",
    "Faktorisera en trigonometrisk ekvation",
    "<p>Lös 2sin²x − sin x = 0 för 0 ≤ x &lt; 2π.</p>",
    "Behandla sin x som en gemensam faktor och använd nollproduktmetoden.",
    [steg("Faktorisera", "Bryt ut sin x.", "\\[\\sin x(2\\sin x-1)=0\\]"),
     steg("Lös första faktorn", "sin x = 0 i intervallet.", "\\[x=0,\\pi\\]"),
     steg("Lös andra faktorn", "2sin x − 1 = 0 ger sin x = 1/2.", "\\[x=\\frac\\pi6,\\frac{5\\pi}{6}\\]")],
    "x = 0, π/6, 5π/6 eller π.",
    "Efter faktorisering ska varje faktor sättas lika med noll; tappa inte lösningen sin x = 0.", "Trigonometriska ekvationer med identiteter och faktorisering");

  add("mato2-grund-1-12", 1, "trig_ekvationer",
    "Använd andragradssubstitution",
    "<p>Lös 2cos²x − 3cos x + 1 = 0 för 0 ≤ x &lt; 2π.</p>",
    "Sätt u = cos x. Lös först andragradsekvationen i u och därefter de trigonometriska ekvationerna.",
    [steg("Substituera", "Sätt u = cos x.", "\\[2u^2-3u+1=0\\]"),
     steg("Faktorisera", "Bestäm de möjliga cosinusvärdena.", "\\[(2u-1)(u-1)=0\\Rightarrow u=\\frac12\\text{ eller }u=1\\]"),
     steg("Gå tillbaka till x", "Lös cos x = 1/2 och cos x = 1 i intervallet.", "\\[x=\\frac\\pi3,\\frac{5\\pi}{3},0\\]")],
    "x = 0, π/3 eller 5π/3.",
    "Kontrollera att varje u-värde ligger mellan −1 och 1 innan du löser för vinkeln.", "Trigonometriska ekvationer med andragradssubstitution");

  add("mato2-grund-1-13", 1, "trig_funktioner",
    "Bestäm amplitud, period och medellinje",
    "<p>Bestäm amplitud, period och medellinje för f(x) = 2sin x + 1.</p>" + sinusFigur,
    "För y = a sin(bx) + d är amplituden |a|, perioden 2π/|b| och medellinjen y = d.",
    [steg("Läs amplituden", "Koefficienten framför sinus är 2.", "\\[A=|2|=2\\]"),
     steg("Bestäm perioden", "Här är b = 1.", "\\[T=\\frac{2\\pi}{1}=2\\pi\\]"),
     steg("Läs medellinjen", "Den lodräta förskjutningen är 1.", "\\[y=1\\]")],
    "Amplituden är 2, perioden är 2π och medellinjen är y = 1.",
    "Amplituden är alltid positiv; ett negativt a speglar grafen men ger inte negativ amplitud.", "Amplitud, period och medellinje för trigonometriska funktioner");

  add("mato2-grund-1-14", 1, "trig_funktioner",
    "Tolka en fasförskjutning",
    "<p>Beskriv hur grafen till g(x) = sin(x − π/4) fås från y = sin x.</p>",
    "En förändring inne i funktionsargumentet verkar i motsatt riktning mot tecknet.",
    [steg("Identifiera förskjutningen", "Argumentet är x − π/4."),
     steg("Flytta grafen", "Grafen förskjuts π/4 åt höger.", "\\[g(x)=\\sin\\left(x-\\frac\\pi4\\right)\\]")],
    "Grafen y = sin x flyttas π/4 åt höger.",
    "Minus inne i parentesen ger förskjutning åt höger, inte åt vänster.", "Fasförskjutning i trigonometriska funktioner");

  add("mato2-grund-1-14b", 1, "trig_funktioner",
    "Bestäm en sinusfunktion från dess egenskaper",
    "<p>En sinuskurva har största värdet 5, minsta värdet 1 och perioden π. Vid x = 0 skär den medellinjen på väg uppåt. Bestäm en möjlig funktion.</p>",
    "Extremvärdena ger amplitud och medellinje. Perioden bestämmer koefficienten framför x.",
    [steg("Bestäm amplituden", "Ta halva skillnaden mellan största och minsta värde.", "\\[A=\\frac{5-1}{2}=2\\]"),
     steg("Bestäm medellinjen", "Ta medelvärdet av extremvärdena.", "\\[d=\\frac{5+1}{2}=3\\]"),
     steg("Bestäm b", "För sinus gäller perioden 2π/|b|.", "\\[\\frac{2\\pi}{|b|}=\\pi\\Rightarrow b=2\\]"),
     steg("Välj fas", "Kurvan passerar medellinjen uppåt vid x = 0, precis som en vanlig sinuskurva.", "\\[f(x)=2\\sin(2x)+3\\]")],
    "En möjlig funktion är f(x) = 2sin(2x) + 3.",
    "Kontrollera modellen genom att läsa tillbaka amplitud, medellinje och period ur din funktion.", "Bestäm trigonometrisk funktion från graf och egenskaper");

  add("mato2-grund-1-15", 1, "trig_funktioner",
    "Bestäm period och asymptoter för tangens",
    "<p>Bestäm perioden och de två närmaste lodräta asymptoterna till f(x) = tan(2x).</p>",
    "Tangens har grundperioden π och saknar värde när cosinus i argumentet är noll.",
    [steg("Bestäm perioden", "För tan(bx) är perioden π/|b|.", "\\[T=\\frac\\pi2\\]"),
     steg("Bestäm asymptoterna", "2x = π/2 + nπ.", "\\[x=\\frac\\pi4+\\frac{n\\pi}{2}\\]"),
     steg("Välj de närmaste kring origo", "Ta n = 0 och n = −1.", "\\[x=\\frac\\pi4\\quad\\text{och}\\quad x=-\\frac\\pi4\\]")],
    "Perioden är π/2 och de närmaste asymptoterna är x = −π/4 och x = π/4.",
    "Tangens period är π, inte 2π.", "Period och asymptoter för tangensfunktioner");

  add("mato2-grund-1-17", 1, "trig_modeller",
    "Tolka en trigonometrisk modell",
    "<p>Temperaturen modelleras av T(t) = 6sin(πt/12 − π/2) + 14, där t är timmar efter midnatt. Bestäm medeltemperatur, amplitud och period.</p>",
    "I en sinusmodell är konstanten utanför sinus medellinjen, koefficientens belopp amplituden och perioden fås från koefficienten framför t.",
    [steg("Läs medelvärde och amplitud", "Den lodräta förskjutningen är 14 och sinuskoefficienten är 6.", "\\[T_{medel}=14,\\qquad A=6\\]"),
     steg("Bestäm perioden", "Här är b = π/12.", "\\[P=\\frac{2\\pi}{\\pi/12}=24\\text{ h}\\]"),
     steg("Tolka variationen", "Temperaturen varierar mellan 14 − 6 och 14 + 6.", "\\[8^\\circ\\text{C}\\le T\\le20^\\circ\\text{C}\\]")],
    "Medeltemperaturen är 14 °C, amplituden 6 °C och perioden 24 timmar.",
    "Fasförskjutningen påverkar när maximum inträffar, men inte amplitud eller period.", "Tolka och bestämma trigonometriska modeller");

  add("mato2-grund-1-18", 1, "trig_modeller",
    "Bestäm en tidpunkt i en periodisk modell",
    "<p>För modellen T(t) = 6sin(πt/12 − π/2) + 14, bestäm första tidpunkten efter midnatt då T = 14 °C.</p>",
    "När temperaturen är lika med medellinjen måste sinusdelen vara noll.",
    [steg("Sätt modellen lika med 14", "Subtrahera medellinjen och dividera med amplituden.", "\\[6\\sin\\left(\\frac{\\pi t}{12}-\\frac\\pi2\\right)=0\\]"),
     steg("Lös första nollstället", "Första möjliga argument efter midnatt är 0.", "\\[\\frac{\\pi t}{12}-\\frac\\pi2=0\\]"),
     steg("Lös ut tiden", "Addera π/2 och multiplicera med 12/π.", "\\[t=6\\]")],
    "Temperaturen är 14 °C första gången klockan 06.00.",
    "I en modell ska den matematiska lösningen alltid översättas tillbaka till tid och enhet.", "Tidpunkter och intervall i trigonometriska modeller");

  // Kapitel 2: Derivata
  add("mato2-grund-2-01", 2, "deriveringsregler",
    "Använd produktregeln",
    "<p>Derivera f(x) = x²eˣ.</p>",
    "När två funktioner multipliceras används produktregeln: (uv)′ = u′v + uv′.",
    [steg("Välj faktorer", "Låt u = x² och v = eˣ.", "\\[u'=2x,\\qquad v'=e^x\\]"),
     steg("Använd produktregeln", "Ta derivatan av en faktor i taget.", "\\[f'(x)=2xe^x+x^2e^x\\]"),
     steg("Faktorisera", "Bryt ut den gemensamma faktorn xeˣ.", "\\[f'(x)=xe^x(x+2)\\]")],
    "f′(x) = xeˣ(x + 2).",
    "Produktens derivata är inte produkten av derivatorna.", "Derivering med produktregeln");

  add("mato2-grund-2-02", 2, "deriveringsregler",
    "Använd kvotregeln",
    "<p>Derivera f(x) = (x + 1)/(x − 2).</p>",
    "För en kvot gäller (u/v)′ = (u′v − uv′)/v².",
    [steg("Bestäm delarna", "Låt u = x + 1 och v = x − 2.", "\\[u'=1,\\qquad v'=1\\]"),
     steg("Använd kvotregeln", "Täljaren kommer i ordningen u′v − uv′.", "\\[f'(x)=\\frac{1(x-2)-(x+1)1}{(x-2)^2}\\]"),
     steg("Förenkla", "Samla termerna i täljaren.", "\\[f'(x)=\\frac{-3}{(x-2)^2}\\]")],
    "f′(x) = −3/(x − 2)², för x ≠ 2.",
    "Nämnaren kvadreras, och minustecknet mellan täljarens produkter är avgörande.", "Derivering med kvotregeln");

  add("mato2-grund-2-03", 2, "kedjeregel_sammansatta",
    "Beräkna en sammansatt funktion",
    "<p>Funktionerna är f(x) = x² + 1 och g(x) = 3x − 2. Bestäm f(g(2)) och g(f(2)).</p>",
    "I f(g(x)) beräknas den inre funktionen g först. Ordningen kan inte bytas fritt.",
    [steg("Beräkna f(g(2))", "Börja med g(2) och sätt sedan resultatet i f.", "\\[g({\\color{#D1495B}{2}})=4,\\qquad f(4)=4^2+1=17\\]"),
     steg("Beräkna g(f(2))", "Börja nu med f(2).", "\\[f({\\color{#D1495B}{2}})=5,\\qquad g(5)=3\\cdot5-2=13\\]")],
    "f(g(2)) = 17 och g(f(2)) = 13.",
    "Sammansättning är normalt inte kommutativ: f(g(x)) och g(f(x)) är olika funktioner.", "Beräkna sammansatta funktioner");

  add("mato2-grund-2-04", 2, "kedjeregel_sammansatta",
    "Använd kedjeregeln",
    "<p>Derivera f(x) = (3x² − 1)⁵.</p>",
    "Kedjeregeln säger: derivera den yttre funktionen och multiplicera med den inre funktionens derivata.",
    [steg("Identifiera inre och yttre funktion", "Den inre funktionen är u = 3x² − 1 och den yttre är u⁵."),
     steg("Derivera båda nivåerna", "Yttre derivata är 5u⁴ och inre derivata är 6x.", "\\[f'(x)=5(3x^2-1)^4\\cdot6x\\]"),
     steg("Förenkla", "Multiplicera de numeriska faktorerna.", "\\[f'(x)=30x(3x^2-1)^4\\]")],
    "f′(x) = 30x(3x² − 1)⁴.",
    "Den inre derivatan 6x måste följa med; det är den vanligaste missade faktorn.", "Derivering med kedjeregeln");

  add("mato2-grund-2-05", 2, "derivator_specialfunktioner",
    "Derivera exponential- och logaritmfunktioner",
    "<p>Derivera f(x) = e^(2x) + ln(3x).</p>",
    "Använd standardderivatorna för eᵘ och ln u tillsammans med kedjeregeln.",
    [steg("Derivera exponentialtermen", "Den inre derivatan av 2x är 2.", "\\[(e^{2x})'=2e^{2x}\\]"),
     steg("Derivera logaritmtermen", "För ln u gäller derivatan u′/u.", "\\[(\\ln(3x))'=\\frac3{3x}=\\frac1x\\]"),
     steg("Sätt ihop", "Addera termernas derivator.", "\\[f'(x)=2e^{2x}+\\frac1x\\]")],
    "f′(x) = 2e^(2x) + 1/x, för x > 0.",
    "ln(3x) har inte derivatan 1/(3x); den inre derivatan 3 ska också multipliceras in.", "Derivering av logaritmfunktioner");

  add("mato2-grund-2-06", 2, "derivator_specialfunktioner",
    "Derivera trigonometriska funktioner",
    "<p>Derivera f(x) = 4sin x − 3cos x.</p>",
    "I radianmått gäller (sin x)′ = cos x och (cos x)′ = −sin x.",
    [steg("Derivera sinustermen", "Konstanten 4 följer med.", "\\[(4\\sin x)'=4\\cos x\\]"),
     steg("Derivera cosinustermen", "De två minustecknen ger plus.", "\\[(-3\\cos x)'=3\\sin x\\]"),
     steg("Sätt ihop", "Addera resultaten.", "\\[f'(x)=4\\cos x+3\\sin x\\]")],
    "f′(x) = 4cos x + 3sin x.",
    "Deriveringsformlerna i denna form förutsätter att vinkeln mäts i radianer.", "Derivering av trigonometriska funktioner");

  add("mato2-grund-2-07", 2, "derivator_specialfunktioner",
    "Bestäm en tangent till en specialfunktion",
    "<p>Bestäm tangenten till f(x) = ln x vid x = 1.</p>",
    "En tangent bestäms av punkten (a, f(a)) och lutningen f′(a).",
    [steg("Bestäm punkten", "Sätt in x = 1 i funktionen.", "\\[f({\\color{#D1495B}{1}})=\\ln {\\color{#D1495B}{1}}=0\\]"),
     steg("Bestäm lutningen", "Derivatan är 1/x.", "\\[f'(x)=\\frac1x,\\qquad f'({\\color{#D1495B}{1}})=1\\]"),
     steg("Skriv tangenten", "Använd punkt–riktningsformen.", "\\[y-0=1(x-1)\\Rightarrow y=x-1\\]")],
    "Tangenten är y = x − 1.",
    "Funktionsvärdet ger punktens höjd; derivatavärdet ger tangentens lutning.", "Tangentproblem med specialfunktioner");

  add("mato2-grund-2-10", 2, "tillampningar_derivata",
    "Tolka en tangent i en tillämpning",
    "<p>Mängden läkemedel i kroppen modelleras av M(t) = 100e^(−0,2t) mg. Bestäm och tolka M′(3).</p>",
    "Derivatan ger den momentana förändringen av mängden per tidsenhet.",
    [steg("Derivera modellen", "Använd kedjeregeln.", "\\[M'(t)=-20e^{-0{,}2t}\\]"),
     steg("Sätt in t = 3", "Det insatta tidsvärdet markeras rött.", "\\[M'({\\color{#D1495B}{3}})=-20e^{-0{,}2\\cdot{\\color{#D1495B}{3}}}\\approx-11{,}0\\]"),
     steg("Tolka", "Minustecknet visar att mängden minskar.")],
    "Efter 3 timmar minskar mängden med ungefär 11,0 mg per timme.",
    "Ett derivatavärde ska tolkas med både tecken och enhet.", "Tangentproblem i tillämpningar");

  add("mato2-grund-2-11", 2, "grafer_asymptoter",
    "Analysera en graf med derivata",
    "<p>Undersök växande, avtagande och extrempunkter för f(x) = x³ − 3x.</p>",
    "Derivatans nollställen delar tallinjen i intervall där funktionen växer eller avtar.",
    [steg("Derivera och lös", "Bestäm de stationära x-värdena.", "\\[f'(x)=3x^2-3=3(x-1)(x+1)=0\\Rightarrow x=\\pm1\\]"),
     steg("Gör teckenkontroll", "Derivatan har tecknen plus, minus, plus.", "\\[f'(x):\\quad +\\;|_{-1}\\;-\\;|_1\\;+\\]"),
     steg("Beräkna punkterna", "Sätt in x-värdena i f.", "\\[f(-1)=2,\\qquad f(1)=-2\\]")],
    "f växer för x < −1 och x > 1, avtar för −1 < x < 1, har maximum (−1, 2) och minimum (1, −2).",
    "Derivatans tecken beskriver funktionens förändring, inte om själva funktionsvärdet är positivt eller negativt.", "Grafanalys med derivata");

  add("mato2-grund-2-12", 2, "grafer_asymptoter",
    "Bestäm asymptoter för en rationell funktion",
    "<p>Bestäm lodrät och vågrät asymptot till f(x) = (2x + 1)/(x − 1).</p>" + asymptotFigur,
    "En lodrät asymptot uppstår där nämnaren är noll utan att faktorn förkortas bort. När täljare och nämnare har samma grad ger kvoten mellan ledande koefficienter den vågräta asymptoten.",
    [steg("Bestäm lodrät asymptot", "Sätt nämnaren lika med noll.", "\\[x-1=0\\Rightarrow x=1\\]"),
     steg("Bestäm vågrät asymptot", "Kvoten mellan ledande koefficienter är 2/1.", "\\[y=2\\]"),
     steg("Kontrollera med omskrivning", "Polynomdivision visar avståndet till asymptoten.", "\\[f(x)=2+\\frac3{x-1}\\]")],
    "Asymptoterna är x = 1 och y = 2.",
    "Ett förbjudet x-värde kan ge ett hål i stället för en asymptot om motsvarande faktor förkortas bort.", "Asymptoter för rationella funktioner");

  add("mato2-grund-2-13", 2, "grafer_asymptoter",
    "Bestäm en sned asymptot med polynomdivision",
    "<p>Bestäm den sneda asymptoten till f(x) = (x² + 1)/(x − 1).</p>",
    "När täljarens grad är exakt ett större än nämnarens ger kvoten i polynomdivisionen en sned asymptot.",
    [steg("Dividera polynomen", "Skriv om täljaren med hjälp av nämnaren.", "\\[x^2+1=(x-1)(x+1)+2\\]"),
     steg("Skriv om funktionen", "Dela varje del med x − 1.", "\\[f(x)=x+1+\\frac2{x-1}\\]"),
     steg("Låt |x| växa", "Resttermen går mot noll.", "\\[y=x+1\\]")],
    "Den sneda asymptoten är y = x + 1.",
    "Den sneda asymptoten är kvoten, inte resten från polynomdivisionen.", "Asymptoter med polynomdivision");

  // Kapitel 3: Integraler
  add("mato2-grund-3-01", 3, "integralberakning",
    "Bestäm en primitiv funktion",
    "<p>Bestäm alla primitiva funktioner till f(x) = 3x² + 2cos x.</p>",
    "Integrera term för term. Potenser integreras med potensregeln baklänges och cosinus har sinus som primitiv funktion.",
    [steg("Integrera polynomtermen", "Höj exponenten och dividera med den nya exponenten.", "\\[\\int3x^2\\,dx=x^3\\]"),
     steg("Integrera cosinustermen", "Derivatan av sin x är cos x.", "\\[\\int2\\cos x\\,dx=2\\sin x\\]"),
     steg("Lägg till konstanten", "Alla primitiva funktioner skiljer sig med en konstant.", "\\[F(x)=x^3+2\\sin x+C\\]")],
    "F(x) = x³ + 2sin x + C.",
    "Glöm inte integrationskonstanten C när ingen undre och övre gräns finns.", "Bestäm primitiva funktioner");

  add("mato2-grund-3-02", 3, "integralberakning",
    "Beräkna en bestämd integral",
    "<p>Beräkna integralen från 0 till 2 av (3x² + 1) dx.</p>",
    "Bestäm först en primitiv funktion och beräkna sedan övre gränsens värde minus undre gränsens värde.",
    [steg("Bestäm en primitiv funktion", "Integrera term för term.", "\\[F(x)=x^3+x\\]"),
     steg("Sätt in gränserna", "Använd F(2) − F(0).", "\\[\\int_0^2(3x^2+1)\\,dx=[x^3+x]_0^2=(8+2)-0=10\\]")],
    "Integralen är 10.",
    "Ordningen är alltid övre gräns minus undre gräns.", "Beräkna bestämda integraler");

  add("mato2-grund-3-03", 3, "integralberakning",
    "Integrera en trigonometrisk funktion",
    "<p>Beräkna integralen från 0 till π av sin x dx.</p>",
    "Eftersom derivatan av cos x är −sin x är en primitiv funktion till sin x lika med −cos x.",
    [steg("Bestäm primitiv funktion", "Behåll minustecknet.", "\\[\\int\\sin x\\,dx=-\\cos x+C\\]"),
     steg("Sätt in gränserna", "Beräkna övre minus undre värde.", "\\[\\int_0^\\pi\\sin x\\,dx=[-\\cos x]_0^\\pi=-\\cos\\pi-(-\\cos0)=2\\]")],
    "Integralen är 2.",
    "Derivatan av −cos x är +sin x.", "Bestämda integraler med trigonometriska funktioner");

  add("mato2-grund-3-04", 3, "area_integraler",
    "Beräkna area mot x-axeln",
    "<p>Bestäm arean mellan grafen y = x − 1 och x-axeln för 0 ≤ x ≤ 2.</p>",
    "Grafen byter tecken vid x = 1. Geometrisk area kräver att delarna under och över x-axeln räknas positivt.",
    [steg("Dela vid nollstället", "x − 1 = 0 ger x = 1."),
     steg("Beräkna vänster del", "Funktionen är negativ mellan 0 och 1.", "\\[A_1=-\\int_0^1(x-1)\\,dx=\\frac12\\]"),
     steg("Beräkna höger del", "Funktionen är positiv mellan 1 och 2.", "\\[A_2=\\int_1^2(x-1)\\,dx=\\frac12\\]"),
     steg("Addera", "Båda delareorna är positiva.", "\\[A=A_1+A_2=1\\]")],
    "Arean är 1 areaenhet.",
    "En integral kan vara negativ eller noll; geometrisk area är alltid positiv.", "Area mot x-axeln med integral");

  add("mato2-grund-3-05", 3, "area_integraler",
    "Beräkna area mellan två kurvor",
    "<p>Bestäm arean mellan y = 2x och y = x².</p>" + areaFigur,
    "Bestäm först skärningspunkterna. Integrera sedan övre funktion minus undre funktion mellan dessa gränser.",
    [steg("Hitta skärningarna", "Sätt funktionerna lika.", "\\[2x=x^2\\Rightarrow x(x-2)=0\\Rightarrow x=0,2\\]"),
     steg("Avgör vilken graf som ligger överst", "Mellan 0 och 2 är 2x större än x²."),
     steg("Beräkna arean", "Integrera övre minus undre.", "\\[A=\\int_0^2(2x-x^2)\\,dx=\\left[x^2-\\frac{x^3}{3}\\right]_0^2=\\frac43\\]")],
    "Arean är 4/3 areaenheter.",
    "Skärningspunkternas x-värden blir integrationsgränserna.", "Area mellan kurvor med integral");

  add("mato2-grund-3-07", 3, "integral_tillampningar",
    "Beräkna volym från ett flöde",
    "<p>Vatten strömmar in med flödet q(t) = 3 + 2t liter per minut. Hur mycket vatten tillkommer under de första 5 minuterna?</p>",
    "Integralen av ett flöde över tid ger den sammanlagda volymförändringen.",
    [steg("Skriv integralen", "Integrera från t = 0 till t = 5.", "\\[\\Delta V=\\int_0^5(3+2t)\\,dt\\]"),
     steg("Beräkna", "En primitiv funktion är 3t + t².", "\\[\\Delta V=[3t+t^2]_0^5=15+25=40\\]")],
    "Det tillkommer 40 liter.",
    "Flöde multiplicerat med tid ger volym; enhetskontrollen hjälper dig välja rätt metod.", "Volym som integral av flöde");

  add("mato2-grund-3-08", 3, "integral_tillampningar",
    "Bestäm förflyttning och sträcka",
    "<p>En partikel har hastigheten v(t) = t − 2 m/s för 0 ≤ t ≤ 4. Bestäm förflyttning och tillryggalagd sträcka.</p>",
    "Integralen av hastigheten ger förflyttningen. För sträckan delas intervallet där hastigheten byter tecken och delarnas belopp adderas.",
    [steg("Hitta riktningsbytet", "v(t) = 0 när t = 2."),
     steg("Beräkna förflyttningen", "Integrera med tecken.", "\\[\\int_0^4(t-2)\\,dt=\\left[\\frac{t^2}{2}-2t\\right]_0^4=0\\]"),
     steg("Beräkna sträckan", "Delintegralerna är −2 och 2.", "\\[s=|-2|+|2|=4\\text{ m}\\]")],
    "Förflyttningen är 0 m och sträckan är 4 m.",
    "Rörelse åt olika håll kan ta ut sig i förflyttningen men aldrig i sträckan.", "Sträcka som integral av hastighet");

  add("mato2-grund-3-09", 3, "integral_tillampningar",
    "Beräkna energi från effekt",
    "<p>Effekten är P(t) = 100 + 20t watt under 0 ≤ t ≤ 10 sekunder. Bestäm energin.</p>",
    "Energi är integralen av effekt med avseende på tiden. Watt gånger sekund blir joule.",
    [steg("Skriv integralen", "Integrera effekten över tidsintervallet.", "\\[E=\\int_0^{10}(100+20t)\\,dt\\]"),
     steg("Beräkna", "En primitiv funktion är 100t + 10t².", "\\[E=[100t+10t^2]_0^{10}=1000+1000=2000\\text{ J}\\]")],
    "Energin är 2 000 J.",
    "Skriv enheten efter integrationen; W·s är samma sak som J.", "Energi som integral av effekt");

  add("mato2-grund-3-10", 3, "sannolikhetsintegraler",
    "Normalisera en täthetsfunktion",
    "<p>Funktionen f(x) = kx för 0 ≤ x ≤ 2 och f(x) = 0 annars ska vara en täthetsfunktion. Bestäm k.</p>" + tathetFigur,
    "En täthetsfunktion är aldrig negativ och den totala arean under grafen måste vara 1.",
    [steg("Sätt total integral till 1", "Integrera över hela intervallet.", "\\[\\int_0^2kx\\,dx=1\\]"),
     steg("Beräkna integralen", "k är en konstant.", "\\[k\\left[\\frac{x^2}{2}\\right]_0^2=2k=1\\]"),
     steg("Lös ut k", "Dela med 2.", "\\[k=\\frac12\\]")],
    "k = 1/2.",
    "Funktionsvärdet f(x) är en täthet, medan sannolikhet motsvarar area under grafen.", "Normalisera täthetsfunktion och bestäm parameter");

  add("mato2-grund-3-11", 3, "sannolikhetsintegraler",
    "Beräkna sannolikhet från en täthet",
    "<p>En stokastisk variabel har tätheten f(x) = x/2 för 0 ≤ x ≤ 2. Bestäm P(X ≤ 1).</p>",
    "Sannolikheten för ett intervall är integralen av täthetsfunktionen över intervallet.",
    [steg("Skriv sannolikheten som integral", "Använd gränserna 0 och 1.", "\\[P(X\\le1)=\\int_0^1\\frac{x}{2}\\,dx\\]"),
     steg("Beräkna", "En primitiv funktion är x²/4.", "\\[P(X\\le1)=\\left[\\frac{x^2}{4}\\right]_0^1=\\frac14\\]")],
    "P(X ≤ 1) = 1/4 = 0,25.",
    "En sannolikhet ska alltid ligga mellan 0 och 1.", "Sannolikhet och kvantiler från täthetsfunktion");

  add("mato2-grund-3-12", 3, "rotationsvolymer",
    "Beräkna en rotationsvolym",
    "<p>Området under y = x för 0 ≤ x ≤ 2 roteras kring x-axeln. Bestäm volymen.</p>" + rotationFigur,
    "Vid rotation kring x-axeln bildar varje funktionsvärde en cirkelskiva med area π[f(x)]².",
    [steg("Skriv volymintegralen", "Kvadrera radien y = x.", "\\[V=\\pi\\int_0^2x^2\\,dx\\]"),
     steg("Beräkna", "En primitiv funktion till x² är x³/3.", "\\[V=\\pi\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8\\pi}{3}\\]")],
    "Volymen är 8π/3 volymenheter.",
    "Det är funktionsvärdet som kvadreras, inte integrationsgränserna.", "Rotationsvolymer");

  // Kapitel 4: Komplexa tal
  add("mato2-grund-4-01", 4, "komplex_aritmetik",
    "Räkna med komplexa tal",
    "<p>Låt z = 3 + 4i och w = 1 − 2i. Bestäm z + w och zw.</p>",
    "Reella delar räknas tillsammans och imaginära delar tillsammans. Vid multiplikation används i² = −1.",
    [steg("Addera", "Samla realdel och imaginärdel var för sig.", "\\[z+w=(3+1)+(4-2)i=4+2i\\]"),
     steg("Multiplicera", "Multiplicera parenteserna och ersätt i² med −1.", "\\[zw=(3+4i)(1-2i)=3-6i+4i-8i^2=11-2i\\]")],
    "z + w = 4 + 2i och zw = 11 − 2i.",
    "Skriv alltid om i² till −1 innan du samlar real- och imaginärdel.", "Räkna med komplexa tal");

  add("mato2-grund-4-02", 4, "komplex_aritmetik",
    "Bestäm konjugat och absolutbelopp",
    "<p>Bestäm konjugatet och absolutbeloppet till z = 3 + 4i.</p>" + komplexFigur,
    "Konjugatet byter tecken på imaginärdelen. Absolutbeloppet är avståndet från origo till punkten i det komplexa talplanet.",
    [steg("Bestäm konjugatet", "Behåll realdelen och byt tecken på imaginärdelen.", "\\[\\bar z=3-4i\\]"),
     steg("Bestäm absolutbeloppet", "Använd Pythagoras sats.", "\\[|z|=\\sqrt{3^2+4^2}=5\\]")],
    "Konjugatet är 3 − 4i och |z| = 5.",
    "Absolutbeloppet av ett komplext tal är ett icke-negativt reellt tal.", "Konjugat och absolutbelopp av komplexa tal");

  add("mato2-grund-4-03", 4, "komplex_aritmetik",
    "Dividera komplexa tal",
    "<p>Beräkna (3 + 4i)/(1 − i) och skriv svaret på formen a + bi.</p>",
    "Förläng bråket med nämnarens konjugat. Då blir nämnaren reell.",
    [steg("Förläng med konjugatet", "Konjugatet till 1 − i är 1 + i.", "\\[\\frac{3+4i}{1-i}\\cdot\\frac{1+i}{1+i}\\]"),
     steg("Beräkna täljare och nämnare", "Använd i² = −1.", "\\[\\frac{(3+4i)(1+i)}{(1-i)(1+i)}=\\frac{-1+7i}{2}\\]"),
     steg("Skriv på standardform", "Dela båda termerna med 2.", "\\[-\\frac12+\\frac72i\\]")],
    "Kvoten är −1/2 + (7/2)i.",
    "Förläng både täljare och nämnare med samma konjugat.", "Division av komplexa tal");

  add("mato2-grund-4-04", 4, "komplex_aritmetik",
    "Beräkna en potens av i",
    "<p>Beräkna i²³.</p>",
    "Potenserna av i upprepas i en cykel med fyra steg: i, −1, −i, 1.",
    [steg("Dela exponenten med 4", "23 = 4·5 + 3, så resten är 3."),
     steg("Använd cykeln", "i²³ har samma värde som i³.", "\\[i^{23}=i^{20}i^3=(i^4)^5i^3=-i\\]")],
    "i²³ = −i.",
    "Det är resten vid division med 4 som bestämmer vilken potens i cykeln du får.", "Potenser med komplexa tal");

  add("mato2-grund-4-05", 4, "komplexa_talplanet",
    "Tolka komplexa tal som punkter",
    "<p>Markera z = 3 + 4i i det komplexa talplanet och bestäm avståndet till origo.</p>" + komplexFigur,
    "Realdelen är den vågräta koordinaten och imaginärdelen är den lodräta koordinaten.",
    [steg("Läs koordinaterna", "z = 3 + 4i motsvarar punkten (3, 4)."),
     steg("Beräkna avståndet", "Använd Pythagoras sats.", "\\[d=|z|=\\sqrt{3^2+4^2}=5\\]")],
    "Punkten är (3, 4) och avståndet till origo är 5.",
    "Imaginärdelen 4 är en reell koordinat på Im-axeln; koordinaten skrivs inte som 4i.", "Geometri och ortslinjer i komplexa talplanet");

  add("mato2-grund-4-06", 4, "komplexa_talplanet",
    "Tolka en ortslinje",
    "<p>Beskriv mängden av komplexa tal som uppfyller |z − 2| = 3.</p>",
    "Uttrycket |z − z₀| är avståndet mellan punkten z och den fasta punkten z₀.",
    [steg("Identifiera centrum", "z₀ = 2 + 0i motsvarar punkten (2, 0)."),
     steg("Identifiera avståndet", "Alla punkter ska ligga på avståndet 3 från centrum."),
     steg("Beskriv ortslinjen", "Ett fast avstånd från en punkt ger en cirkel.", "\\[(x-2)^2+y^2=9\\]")],
    "Ortslinjen är cirkeln med centrum (2, 0) och radie 3.",
    "Likhet ger själva cirkeln; ≤ skulle ge hela cirkelskivan.", "Geometri och ortslinjer i komplexa talplanet");

  add("mato2-grund-4-07", 4, "komplexa_talplanet",
    "Tolka multiplikation som rotation",
    "<p>Punkten z = 2 + i multipliceras med i. Bestäm den nya punkten och beskriv avbildningen.</p>",
    "Multiplikation med i roterar ett komplext tal 90° moturs kring origo utan att ändra längden.",
    [steg("Multiplicera", "Använd i² = −1.", "\\[iz=i(2+i)=2i+i^2=-1+2i\\]"),
     steg("Läs den nya punkten", "−1 + 2i motsvarar (−1, 2)."),
     steg("Beskriv transformationen", "Punkten (2, 1) har roterats 90° moturs till (−1, 2).")],
    "Den nya punkten är (−1, 2); avbildningen är en rotation 90° moturs.",
    "Multiplikation med ett komplext tal kan både skala och rotera; i har absolutbelopp 1 och argument π/2.", "Avbildningar, rotation och skalning med komplexa tal");

  add("mato2-grund-4-08", 4, "polar_exponentiell",
    "Växla till polär form",
    "<p>Skriv z = −1 + √3i på polär och exponentiell form.</p>",
    "Polär form bestäms av absolutbeloppet r och argumentet v. Punkten ligger här i andra kvadranten.",
    [steg("Bestäm absolutbeloppet", "Använd Pythagoras sats.", "\\[r=\\sqrt{(-1)^2+(\\sqrt3)^2}=2\\]"),
     steg("Bestäm argumentet", "Referensvinkeln är π/3 och punkten ligger i andra kvadranten.", "\\[v=\\frac{2\\pi}{3}\\]"),
     steg("Skriv formerna", "Använd cos v + i sin v respektive e^(iv).", "\\[z=2\\left(\\cos\\frac{2\\pi}{3}+i\\sin\\frac{2\\pi}{3}\\right)=2e^{i2\\pi/3}\\]")],
    "z = 2(cos(2π/3) + i sin(2π/3)) = 2e^(i2π/3).",
    "Arctan ensam kan ge fel kvadrant; använd tecknen på real- och imaginärdel.", "Växla mellan former för komplexa tal");

  add("mato2-grund-4-09", 4, "polar_exponentiell",
    "Använd Eulers formel",
    "<p>Visa med Eulers formel att e^(iπ) = −1.</p>",
    "Eulers formel kopplar exponentialformen till trigonometri: e^(iv) = cos v + i sin v.",
    [steg("Sätt in v = π", "Använd Eulers formel.", "\\[e^{i\\pi}=\\cos\\pi+i\\sin\\pi\\]"),
     steg("Använd exakta värden", "cos π = −1 och sin π = 0.", "\\[e^{i\\pi}=-1+i\\cdot0=-1\\]")],
    "e^(iπ) = −1.",
    "Exponentens vinkel är argumentet; absolutbeloppet för e^(iv) är 1.", "Eulers formel");

  add("mato2-grund-4-10", 4, "polar_exponentiell",
    "Multiplicera i exponentiell form",
    "<p>Beräkna (2e^(iπ/3))(3e^(−iπ/6)).</p>",
    "Vid multiplikation multipliceras absolutbeloppen och argumenten adderas.",
    [steg("Multiplicera absolutbeloppen", "2·3 = 6."),
     steg("Addera argumenten", "π/3 − π/6 = π/6.", "\\[\\frac\\pi3-\\frac\\pi6=\\frac\\pi6\\]"),
     steg("Skriv resultatet", "Behåll exponentiell form.", "\\[6e^{i\\pi/6}\\]")],
    "Produkten är 6e^(iπ/6).",
    "Vid division divideras absolutbeloppen och argumenten subtraheras.", "Multiplikation och division i polär form");

  add("mato2-grund-4-11", 4, "potenser_rotter",
    "Beräkna en potens med de Moivres formel",
    "<p>Beräkna (1 + i)⁶.</p>",
    "Skriv talet i polär form. De Moivres formel säger att (r(cos v + i sin v))ⁿ = rⁿ(cos nv + i sin nv).",
    [steg("Skriv basen i polär form", "Absolutbeloppet är √2 och argumentet π/4.", "\\[1+i=\\sqrt2\\left(\\cos\\frac\\pi4+i\\sin\\frac\\pi4\\right)\\]"),
     steg("Upphöj", "Upphöj r och multiplicera vinkeln med 6.", "\\[(1+i)^6=(\\sqrt2)^6\\left(\\cos\\frac{3\\pi}{2}+i\\sin\\frac{3\\pi}{2}\\right)\\]"),
     steg("Förenkla", "(√2)⁶ = 8, cos(3π/2) = 0 och sin(3π/2) = −1.", "\\[(1+i)^6=-8i\\]")],
    "(1 + i)⁶ = −8i.",
    "Både absolutbeloppet och argumentet påverkas av exponenten.", "Potenser av komplexa tal med de Moivres formel");

  add("mato2-grund-4-12", 4, "potenser_rotter",
    "Bestäm alla komplexa rötter",
    "<p>Lös z³ = 8 i de komplexa talen.</p>",
    "En tredjegradsekvation av typen z³ = re^(iv) har tre rötter med samma absolutbelopp och jämnt fördelade argument.",
    [steg("Skriv högerledet polärt", "8 har argumentet 0, men även 2πk.", "\\[8=8e^{i2\\pi k}\\]"),
     steg("Ta tredje roten", "Absolutbeloppet blir 2 och vinklarna delas med 3.", "\\[z_k=2e^{i2\\pi k/3},\\qquad k=0,1,2\\]"),
     steg("Skriv på rektangulär form", "Använd vinklarna 0, 2π/3 och 4π/3.", "\\[z=2,\\quad z=-1+i\\sqrt3,\\quad z=-1-i\\sqrt3\\]")],
    "Rötterna är 2, −1 + i√3 och −1 − i√3.",
    "En n:tegradsekvation ger n jämnt fördelade rötter när högerledet inte är noll.", "Komplexa rötter med de Moivres formel");

  add("mato2-grund-4-13", 4, "polynom_komplexa",
    "Använd faktorsatsen",
    "<p>Visa att x = 2 är ett nollställe till p(x) = x³ − 4x² + x + 6 och faktorisera polynomet helt.</p>",
    "Faktorsatsen säger att p(a) = 0 precis när x − a är en faktor.",
    [steg("Kontrollera nollstället", "Sätt in x = 2. Det insatta värdet markeras rött.", "\\[p({\\color{#D1495B}{2}})={\\color{#D1495B}{2}}^3-4\\cdot{\\color{#D1495B}{2}}^2+{\\color{#D1495B}{2}}+6=0\\]"),
     steg("Dividera med x − 2", "Kvoten blir x² − 2x − 3.", "\\[p(x)=(x-2)(x^2-2x-3)\\]"),
     steg("Faktorisera kvoten", "Sök två tal med produkt −3 och summa −2.", "\\[p(x)=(x-2)(x-3)(x+1)\\]")],
    "p(x) = (x − 2)(x − 3)(x + 1).",
    "Att ett insatt värde ger noll visar både ett nollställe och en motsvarande faktor.", "Faktorsatsen, faktorisering och polynomrötter");

  add("mato2-grund-4-14", 4, "polynom_komplexa",
    "Utför polynomdivision",
    "<p>Dividera 2x³ + 3x² − 5x + 6 med x + 2.</p>",
    "Polynomdivision ger en kvot och en rest vars grad är lägre än nämnarens grad.",
    [steg("Bestäm första termen", "2x³/x = 2x². Multiplicera tillbaka och subtrahera."),
     steg("Fortsätt term för term", "Nästa termer i kvoten blir −x och −3."),
     steg("Skriv resultatet", "Resten blir 12.", "\\[2x^3+3x^2-5x+6=(x+2)(2x^2-x-3)+12\\]")],
    "Kvoten är 2x² − x − 3 och resten är 12.",
    "Kontrollera genom att multiplicera nämnaren med kvoten och sedan lägga till resten.", "Polynomdivision");

  add("mato2-grund-4-15", 4, "polynom_komplexa",
    "Lös en polynomekvation med komplexa rötter",
    "<p>Lös x² − 4x + 13 = 0.</p>",
    "När diskriminanten är negativ används i² = −1 för att skriva roten ur ett negativt tal.",
    [steg("Använd pq-formeln eller lösningsformeln", "Diskriminanten blir negativ.", "\\[x=\\frac{4\\pm\\sqrt{16-52}}2=\\frac{4\\pm\\sqrt{-36}}2\\]"),
     steg("Skriv med i", "√(−36) = 6i.", "\\[x=\\frac{4\\pm6i}{2}=2\\pm3i\\]")],
    "Lösningarna är x = 2 + 3i och x = 2 − 3i.",
    "Polynom med reella koefficienter får icke-reella rötter i konjugerade par.", "Polynomekvationer med komplexa lösningar");

  window.TYPUPPGIFTER_MATO2 = bank;
})();

/* Slutrevision: tydligare matematisk typografi och fler pedagogiska figurer. */
(() => {
  const bank = window.TYPUPPGIFTER_MATO2 || {};
  const cards = Object.values(bank);
  const find = rubrik => cards.find(kort => kort.rubrik === rubrik);

  Object.keys(bank).forEach(nyckel => {
    if (bank[nyckel].rubrik === "Tolka en ortslinje") delete bank[nyckel];
  });

  const integralPolynomFigur = '<svg class="dg" viewBox="0 0 440 300" role="img" aria-label="Grafen till tre x kvadrat plus ett med området mellan grafen och x-axeln markerat från noll till två">'
    +'<path class="dg-rut" d="M60 30V250M120 30V250M180 30V250M240 30V250M300 30V250M360 30V250M420 30V250M60 250H420M60 205H420M60 160H420M60 115H420M60 70H420"/>'
    +'<path class="dg-axel" d="M45 250H428M100 270V18"/><path class="dg-pil" d="M436 250l-10-4.5v9zM100 10l-4.5 10h9z"/>'
    +'<path d="M100 250L100 235Q200 235 300 55L300 250Z" fill="var(--accSoft,rgba(90,150,245,.18))" stroke="none"/>'
    +'<path class="dg-linje" d="M100 235Q200 235 300 55"/><path class="dg-hjalp" stroke-dasharray="6 5" d="M100 235V250M300 55V250"/>'
    +'<g class="dg-txt"><text x="100" y="271" text-anchor="middle">0</text><text x="300" y="271" text-anchor="middle">2</text><text x="315" y="61">f(x) = 3x² + 1</text><text x="205" y="190">integralens värde</text><text x="428" y="240">x</text><text x="110" y="20">y</text></g></svg>';

  const integralSinusFigur = '<svg class="dg" viewBox="0 0 440 285" role="img" aria-label="Sinuskurvan från noll till pi med den positiva arean under kurvan markerad">'
    +'<path class="dg-rut" d="M50 30V230M100 30V230M150 30V230M200 30V230M250 30V230M300 30V230M350 30V230M400 30V230M50 230H400M50 180H400M50 130H400M50 80H400M50 30H400"/>'
    +'<path class="dg-axel" d="M42 230H415M80 250V18"/><path class="dg-pil" d="M423 230l-10-4.5v9zM80 10l-4.5 10h9z"/>'
    +'<path d="M80 230C135 60 285 60 340 230Z" fill="var(--accSoft,rgba(90,150,245,.18))" stroke="none"/><path class="dg-linje" d="M80 230C135 60 285 60 340 230"/>'
    +'<g class="dg-txt"><text x="80" y="252" text-anchor="middle">0</text><text x="210" y="252" text-anchor="middle">π/2</text><text x="340" y="252" text-anchor="middle">π</text><text x="235" y="76">y = sin x</text><text x="415" y="220">x</text><text x="90" y="20">y</text></g></svg>';

  const integralTeckenFigur = '<svg class="dg" viewBox="0 0 500 310" role="img" aria-label="Linjen y lika med x minus ett med negativ area från noll till ett och positiv area från ett till två">'
    +'<path class="dg-rut" d="M55 35V265M115 35V265M175 35V265M235 35V265M295 35V265M355 35V265M415 35V265M475 35V265M55 265H475M55 210H475M55 155H475M55 100H475M55 45H475"/>'
    +'<path class="dg-axel" d="M45 155H488M115 280V20"/><path class="dg-pil" d="M496 155l-10-4.5v9zM115 12l-4.5 10h9z"/>'
    +'<path d="M115 155L115 220L235 155Z" fill="var(--badSoft,rgba(225,85,85,.20))" stroke="var(--bad,#e06464)" stroke-width="2"/>'
    +'<path d="M235 155L355 90L355 155Z" fill="var(--goodSoft,rgba(70,190,145,.20))" stroke="var(--good,#55c49a)" stroke-width="2"/>'
    +'<path class="dg-linje" d="M80 239L405 63"/><g class="dg-txt"><text x="115" y="177" text-anchor="middle">0</text><text x="235" y="177" text-anchor="middle">1</text><text x="355" y="177" text-anchor="middle">2</text><text x="153" y="205">−0,5</text><text x="290" y="132">+0,5</text><text x="367" y="82">y = x − 1</text></g>'
    +'<text class="dg-not" x="250" y="298" text-anchor="middle">Integral: −0,5 + 0,5 = 0 • geometrisk area: 1</text></svg>';

  const integralFlodeFigur = '<svg class="dg" viewBox="0 0 480 290" role="img" aria-label="Flödet tre plus två t och arean under grafen under de första fem minuterna">'
    +'<path class="dg-rut" d="M60 30V235M120 30V235M180 30V235M240 30V235M300 30V235M360 30V235M420 30V235M60 235H420M60 185H420M60 135H420M60 85H420M60 35H420"/>'
    +'<path class="dg-axel" d="M50 235H440M90 255V18"/><path class="dg-pil" d="M448 235l-10-4.5v9zM90 10l-4.5 10h9z"/>'
    +'<path d="M90 235L90 195L390 65L390 235Z" fill="var(--accSoft,rgba(90,150,245,.18))" stroke="none"/><path class="dg-linje" d="M90 195L390 65"/><path class="dg-hjalp" stroke-dasharray="6 5" d="M390 65V235"/>'
    +'<g class="dg-txt"><text x="90" y="257" text-anchor="middle">0</text><text x="390" y="257" text-anchor="middle">5 min</text><text x="294" y="92">q(t) = 3 + 2t</text><text x="196" y="188">40 liter</text><text x="442" y="225">t</text><text x="100" y="20">q</text></g></svg>';

  const integralRorelseFigur = '<svg class="dg" viewBox="0 0 500 310" role="img" aria-label="Hastighetsgraf som visar negativ förflyttning före två sekunder och positiv efter två sekunder">'
    +'<path class="dg-rut" d="M55 30V260M115 30V260M175 30V260M235 30V260M295 30V260M355 30V260M415 30V260M475 30V260M55 260H475M55 205H475M55 150H475M55 95H475M55 40H475"/>'
    +'<path class="dg-axel" d="M45 150H488M85 275V18"/><path class="dg-pil" d="M496 150l-10-4.5v9zM85 10l-4.5 10h9z"/>'
    +'<path d="M85 150L85 230L245 150Z" fill="var(--badSoft,rgba(225,85,85,.20))" stroke="var(--bad,#e06464)" stroke-width="2"/>'
    +'<path d="M245 150L405 70L405 150Z" fill="var(--goodSoft,rgba(70,190,145,.20))" stroke="var(--good,#55c49a)" stroke-width="2"/>'
    +'<path class="dg-linje" d="M85 230L405 70"/><g class="dg-txt"><text x="85" y="172" text-anchor="middle">0</text><text x="245" y="172" text-anchor="middle">2</text><text x="405" y="172" text-anchor="middle">4</text><text x="130" y="210">−2 m</text><text x="330" y="126">+2 m</text><text x="348" y="62">v(t) = t − 2</text></g>'
    +'<text class="dg-not" x="250" y="298" text-anchor="middle">Förflyttning: −2 + 2 = 0 m • sträcka: 2 + 2 = 4 m</text></svg>';

  const komplexaRotterFigur = '<svg class="dg" viewBox="0 0 520 340" role="img" aria-label="De tre kubikrötterna till åtta jämnt fördelade på en cirkel med radien två i det komplexa talplanet">'
    +'<path class="dg-axel" d="M45 170H485M260 315V25"/><path class="dg-pil" d="M493 170l-10-4.5v9zM260 17l-4.5 10h9z"/><circle class="dg-hjalp" cx="260" cy="170" r="120" fill="none" stroke-dasharray="7 6"/>'
    +'<path class="dg-hjalp" d="M260 170L380 170M260 170L200 66.1M260 170L200 273.9"/><circle class="dg-vald" cx="380" cy="170" r="6"/><circle class="dg-vald" cx="200" cy="66.1" r="6"/><circle class="dg-vald" cx="200" cy="273.9" r="6"/>'
    +'<path class="dg-delta" d="M300 170A40 40 0 0 0 240 135.4"/><g class="dg-txt"><text x="488" y="160">Re</text><text x="270" y="25">Im</text><text x="390" y="165">2</text><text x="190" y="55" text-anchor="end">−1 + i√3</text><text x="190" y="292" text-anchor="end">−1 − i√3</text></g><text class="dg-etikett" x="277" y="128">2π/3</text><text class="dg-not" x="260" y="330" text-anchor="middle">Samma radie 2 • vinkelskillnaden är 2π/3</text></svg>';

  const polynomdivisionFigur = '<svg class="dg" viewBox="0 0 760 430" role="img" aria-label="Fullständig uppställning för division av två x kubik plus tre x kvadrat minus fem x plus sex med x plus två">'
    +'<rect class="dg-rut" x="18" y="18" width="724" height="394" rx="14"/><text class="dg-rubrik" x="470" y="52" text-anchor="middle">2x² − x − 3</text>'
    +'<path class="dg-form" d="M150 66H710M150 66V103"/><text class="dg-rubrik" x="48" y="100">x + 2</text><text class="dg-rubrik" x="177" y="100">2x³ + 3x² − 5x + 6</text>'
    +'<text class="dg-txt" x="250" y="140">− (2x³ + 4x²)</text><path class="dg-hjalp" d="M230 153H520"/><text class="dg-rubrik" x="310" y="184">−x² − 5x</text>'
    +'<text class="dg-txt" x="310" y="224">− (−x² − 2x)</text><path class="dg-hjalp" d="M292 237H560"/><text class="dg-rubrik" x="405" y="268">−3x + 6</text>'
    +'<text class="dg-txt" x="405" y="308">− (−3x − 6)</text><path class="dg-hjalp" d="M390 321H610"/><text class="dg-etikett" x="535" y="357">rest 12</text>'
    +'<g class="dg-txt"><text x="34" y="140">1. multiplicera tillbaka</text><text x="34" y="184">2. subtrahera</text><text x="34" y="224">3. multiplicera tillbaka</text><text x="34" y="268">4. subtrahera</text></g>'
    +'<text class="dg-not" x="380" y="398" text-anchor="middle">Kontroll: (x + 2)(2x² − x − 3) + 12 = 2x³ + 3x² − 5x + 6</text></svg>';

  const primitiv = find("Bestäm en primitiv funktion");
  if (primitiv) primitiv.t = "<p>Bestäm alla primitiva funktioner till \\(f(x)=3x^2+2\\cos x\\).</p>";

  const bestamd = find("Beräkna en bestämd integral");
  if (bestamd) {
    bestamd.t = "<p>Beräkna \\(\\displaystyle \\int_0^2(3x^2+1)\\,dx\\).</p>";
    bestamd.figur = integralPolynomFigur;
  }

  const trigIntegral = find("Integrera en trigonometrisk funktion");
  if (trigIntegral) {
    trigIntegral.t = "<p>Beräkna \\(\\displaystyle \\int_0^\\pi \\sin x\\,dx\\).</p>";
    trigIntegral.figur = integralSinusFigur;
  }

  const areaAxel = find("Beräkna area mot x-axeln");
  if (areaAxel) {
    areaAxel.t = "<p>Bestäm arean mellan grafen \\(y=x-1\\) och \\(x\\)-axeln för \\(0\\le x\\le2\\).</p>";
    areaAxel.figur = integralTeckenFigur;
  }

  const flode = find("Beräkna volym från ett flöde");
  if (flode) {
    flode.t = "<p>Vatten strömmar in med flödet \\(q(t)=3+2t\\) liter per minut. Hur mycket vatten tillkommer under de första fem minuterna?</p>";
    flode.figur = integralFlodeFigur;
  }

  const rorelse = find("Bestäm förflyttning och sträcka");
  if (rorelse) {
    rorelse.t = "<p>En partikel har hastigheten \\(v(t)=t-2\\) m/s för \\(0\\le t\\le4\\). Bestäm förflyttning och sträcka.</p>";
    rorelse.figur = integralRorelseFigur;
  }

  const rotter = find("Bestäm alla komplexa rötter");
  if (rotter) {
    rotter.t = "<p>Lös \\(z^3=8\\) i de komplexa talen.</p>";
    rotter.ram = "Skriv först \\(z=re^{i\\theta}\\). Då blir \\(z^3=r^3e^{i3\\theta}\\): beloppet upphöjs till tre och vinkeln multipliceras med tre. När vi går baklänges tar vi därför kubikroten ur beloppet och delar vinkeln med tre.";
    rotter.figur = komplexaRotterFigur;
    rotter.steg = [
      {rubrik:"Skriv 8 på polär form",text:"Talet 8 ligger på den positiva realaxeln. Samma riktning kan skrivas som 0, ett helt varv, två hela varv och så vidare.",matte:"\\[8=8e^{i(0+2\\pi k)},\\qquad k\\in\\mathbb Z\\]"},
      {rubrik:"Bestäm rötternas belopp",text:"Om \\(z=re^{i\\theta}\\), så har \\(z^3\\) beloppet \\(r^3\\). Därför måste \\(r^3=8\\).",matte:"\\[r=\\sqrt[3]{8}=2\\]"},
      {rubrik:"Bestäm rötternas vinklar",text:"Kubering multiplicerar argumentet med 3. För att få tillbaka \\(\\theta\\) dividerar vi därför hela vinkeln \\(0+2\\pi k\\) med 3.",matte:"\\[3\\theta=0+2\\pi k\\quad\\Rightarrow\\quad\\theta_k=\\frac{2\\pi k}{3}\\]"},
      {rubrik:"Välj tre olika värden på k",text:"Värdena \\(k=0,1,2\\) ger vinklarna \\(0\\), \\(2\\pi/3\\) och \\(4\\pi/3\\). Därefter börjar samma tre riktningar om.",matte:"\\[z_0=2,\\qquad z_1=-1+i\\sqrt3,\\qquad z_2=-1-i\\sqrt3\\]"}
    ];
    rotter.svar = "Rötterna är \\(2\\), \\(-1+i\\sqrt3\\) och \\(-1-i\\sqrt3\\).";
    rotter.komihag = "För \\(z^n=Re^{i\\varphi}\\) får rötterna beloppet \\(\\sqrt[n]{R}\\) och argumenten \\((\\varphi+2\\pi k)/n\\). Divisionen med \\(n\\) beror på att upphöjning till \\(n\\) multiplicerar vinkeln med \\(n\\).";
  }

  const division = find("Utför polynomdivision");
  if (division) {
    division.t = "<p>Dividera \\(2x^3+3x^2-5x+6\\) med \\(x+2\\).</p>";
    division.ram = "Ordna båda polynomen efter fallande grad. I varje omgång dividerar du de ledande termerna, skriver termen i kvoten, multiplicerar tillbaka och subtraherar. Fortsätt tills resten har lägre grad än divisorn.";
    division.figur = polynomdivisionFigur;
    division.steg = [
      {rubrik:"Första termen i kvoten",text:"Fråga vad \\(2x^3\\) ska divideras med för att ge \\(x\\). Svaret är \\(2x^2\\). Multiplicera sedan \\(2x^2(x+2)=2x^3+4x^2\\) och subtrahera.",matte:"\\[(2x^3+3x^2)-(2x^3+4x^2)=-x^2\\]"},
      {rubrik:"Andra termen i kvoten",text:"Ta med nästa term \\(-5x\\). Nu divideras \\(-x^2\\) med \\(x\\), vilket ger \\(-x\\). Multiplicera tillbaka och subtrahera.",matte:"\\[(-x^2-5x)-(-x^2-2x)=-3x\\]"},
      {rubrik:"Tredje termen och resten",text:"Ta med \\(+6\\). Divisionen \\(-3x/x\\) ger \\(-3\\). När \\(-3(x+2)=-3x-6\\) subtraheras återstår 12.",matte:"\\[(-3x+6)-(-3x-6)=12\\]"},
      {rubrik:"Skriv och kontrollera resultatet",text:"Kvoten står överst och resten skrivs som ett bråk över divisorn.",matte:"\\[\\frac{2x^3+3x^2-5x+6}{x+2}=2x^2-x-3+\\frac{12}{x+2}\\]"}
    ];
    division.svar = "Kvoten är \\(2x^2-x-3\\) och resten är \\(12\\).";
  }

  /* Uppgiftstexterna använder konsekvent KaTeX i stället för Unicode-formler
     och uttryck som e^(...) eller snedstrecksbråk. Befintliga SVG-bilder i
     uppgiftstexten bevaras. */
  const snyggaUppgifter = {
    "Läs exakta värden i enhetscirkeln":"<p>Bestäm exakt \\(\\cos(2\\pi/3)\\), \\(\\sin(2\\pi/3)\\) och \\(\\tan(2\\pi/3)\\).</p>",
    "Använd symmetri och periodicitet":"<p>Bestäm exakt \\(\\sin(-\\pi/6)\\) och \\(\\cos(13\\pi/6)\\).</p>",
    "Bestäm ett trigonometriskt värde från ett annat":"<p>Vinkeln \\(v\\) ligger i andra kvadranten och \\(\\sin v=3/5\\). Bestäm \\(\\cos v\\) exakt.</p>",
    "Omvandla mellan grader och radianer":"<p>Omvandla \\(150^\\circ\\) till radianer och \\(7\\pi/6\\) radianer till grader.</p>",
    "Beräkna båglängd och sektorarea":"<p>En cirkel har radien \\(6\\) cm och medelpunktsvinkeln \\(\\pi/3\\) radianer. Bestäm båglängden och sektorns area.</p>",
    "Använd trigonometriska ettan":"<p>Förenkla uttrycket \\(1-\\sin^2x\\).</p>",
    "Använd en additionsformel":"<p>Bestäm exakt \\(\\sin75^\\circ\\).</p>",
    "Använd formeln för dubbla vinkeln":"<p>Vinkeln \\(x\\) ligger i första kvadranten och \\(\\sin x=3/5\\). Bestäm \\(\\sin2x\\) exakt.</p>",
    "Lös en grundläggande trigonometrisk ekvation":"<p>Lös \\(\\sin x=1/2\\) för \\(0\\le x<2\\pi\\).</p>",
    "Skriv den generella lösningen":"<p>Lös \\(\\cos x=-1/2\\) för alla reella \\(x\\).</p>",
    "Faktorisera en trigonometrisk ekvation":"<p>Lös \\(2\\sin^2x-\\sin x=0\\) för \\(0\\le x<2\\pi\\).</p>",
    "Använd andragradssubstitution":"<p>Lös \\(2\\cos^2x-3\\cos x+1=0\\) för \\(0\\le x<2\\pi\\).</p>",
    "Bestäm amplitud, period och medellinje":"<p>Bestäm amplitud, period och medellinje för \\(f(x)=2\\sin x+1\\).</p>",
    "Tolka en fasförskjutning":"<p>Beskriv hur grafen till \\(g(x)=\\sin(x-\\pi/4)\\) fås från \\(y=\\sin x\\).</p>",
    "Bestäm en sinusfunktion från dess egenskaper":"<p>En sinuskurva har största värdet \\(5\\), minsta värdet \\(1\\) och perioden \\(\\pi\\). Vid \\(x=0\\) skär den medellinjen på väg uppåt. Bestäm en möjlig funktion.</p>",
    "Bestäm period och asymptoter för tangens":"<p>Bestäm perioden och de två närmaste lodräta asymptoterna till \\(f(x)=\\tan(2x)\\).</p>",
    "Tolka en trigonometrisk modell":"<p>Temperaturen modelleras av \\(T(t)=6\\sin(\\pi t/12-\\pi/2)+14\\), där \\(t\\) är timmar efter midnatt. Bestäm medeltemperatur, amplitud och period.</p>",
    "Bestäm en tidpunkt i en periodisk modell":"<p>För modellen \\(T(t)=6\\sin(\\pi t/12-\\pi/2)+14\\), bestäm den första tidpunkten efter midnatt då \\(T=14^\\circ\\mathrm C\\).</p>",
    "Använd produktregeln":"<p>Derivera \\(f(x)=x^2e^x\\).</p>",
    "Använd kvotregeln":"<p>Derivera \\(f(x)=\\dfrac{x+1}{x-2}\\).</p>",
    "Beräkna en sammansatt funktion":"<p>Funktionerna är \\(f(x)=x^2+1\\) och \\(g(x)=3x-2\\). Bestäm \\(f(g(2))\\) och \\(g(f(2))\\).</p>",
    "Använd kedjeregeln":"<p>Derivera \\(f(x)=(3x^2-1)^5\\).</p>",
    "Derivera exponential- och logaritmfunktioner":"<p>Derivera \\(f(x)=e^{2x}+\\ln(3x)\\).</p>",
    "Derivera trigonometriska funktioner":"<p>Derivera \\(f(x)=4\\sin x-3\\cos x\\).</p>",
    "Bestäm en tangent till en specialfunktion":"<p>Bestäm tangenten till \\(f(x)=\\ln x\\) vid \\(x=1\\).</p>",
    "Tolka en tangent i en tillämpning":"<p>Mängden läkemedel i kroppen modelleras av \\(M(t)=100e^{-0{,}2t}\\) mg. Bestäm och tolka \\(M'(3)\\).</p>",
    "Analysera en graf med derivata":"<p>Undersök var \\(f(x)=x^3-3x\\) är växande och avtagande samt bestäm funktionens extrempunkter.</p>",
    "Bestäm asymptoter för en rationell funktion":"<p>Bestäm lodrät och vågrät asymptot till \\(f(x)=\\dfrac{2x+1}{x-1}\\).</p>",
    "Bestäm en sned asymptot med polynomdivision":"<p>Bestäm den sneda asymptoten till \\(f(x)=\\dfrac{x^2+1}{x-1}\\).</p>",
    "Beräkna area mellan två kurvor":"<p>Bestäm arean mellan \\(y=2x\\) och \\(y=x^2\\).</p>",
    "Beräkna energi från effekt":"<p>Effekten är \\(P(t)=100+20t\\) watt under \\(0\\le t\\le10\\) sekunder. Bestäm energin.</p>",
    "Normalisera en täthetsfunktion":"<p>Funktionen \\(f(x)=kx\\) för \\(0\\le x\\le2\\), och \\(f(x)=0\\) annars, ska vara en täthetsfunktion. Bestäm \\(k\\).</p>",
    "Beräkna sannolikhet från en täthet":"<p>En stokastisk variabel har tätheten \\(f(x)=x/2\\) för \\(0\\le x\\le2\\). Bestäm \\(P(X\\le1)\\).</p>",
    "Beräkna en rotationsvolym":"<p>Området under \\(y=x\\) för \\(0\\le x\\le2\\) roteras kring \\(x\\)-axeln. Bestäm volymen.</p>",
    "Räkna med komplexa tal":"<p>Låt \\(z=3+4i\\) och \\(w=1-2i\\). Bestäm \\(z+w\\) och \\(zw\\).</p>",
    "Bestäm konjugat och absolutbelopp":"<p>Bestäm konjugatet och absolutbeloppet till \\(z=3+4i\\).</p>",
    "Dividera komplexa tal":"<p>Beräkna \\(\\dfrac{3+4i}{1-i}\\) och skriv svaret på formen \\(a+bi\\).</p>",
    "Beräkna en potens av i":"<p>Beräkna \\(i^{23}\\).</p>",
    "Tolka komplexa tal som punkter":"<p>Markera \\(z=3+4i\\) i det komplexa talplanet och bestäm avståndet till origo.</p>",
    "Tolka multiplikation som rotation":"<p>Punkten \\(z=2+i\\) multipliceras med \\(i\\). Bestäm den nya punkten och beskriv avbildningen.</p>",
    "Växla till polär form":"<p>Skriv \\(z=-1+i\\sqrt3\\) på polär och exponentiell form.</p>",
    "Använd Eulers formel":"<p>Visa med Eulers formel att \\(e^{i\\pi}=-1\\).</p>",
    "Multiplicera i exponentiell form":"<p>Beräkna \\(\\left(2e^{i\\pi/3}\\right)\\left(3e^{-i\\pi/6}\\right)\\).</p>",
    "Beräkna en potens med de Moivres formel":"<p>Beräkna \\((1+i)^6\\).</p>",
    "Använd faktorsatsen":"<p>Visa att \\(x=2\\) är ett nollställe till \\(p(x)=x^3-4x^2+x+6\\) och faktorisera polynomet helt.</p>",
    "Lös en polynomekvation med komplexa rötter":"<p>Lös \\(x^2-4x+13=0\\).</p>"
  };
  Object.entries(snyggaUppgifter).forEach(([rubrik,nyText]) => {
    const kort = find(rubrik);
    if (!kort) return;
    const gammalFigur = (kort.t || "").match(/<svg[\s\S]*$/);
    kort.t = nyText + (gammalFigur ? gammalFigur[0] : "");
  });

  window.TYPUPPGIFTER_MATO2 = bank;
})();
