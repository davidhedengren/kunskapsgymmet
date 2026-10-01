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
  const cirkelFigur = '<svg class="dg" viewBox="0 0 330 300" role="img" aria-label="Enhetscirkel med vinkeln 120 grader och punkten minus en halv, roten ur tre genom två." style="display:block;width:min(100%,320px);height:auto;margin:14px auto 4px"><circle class="dg-form" cx="165" cy="148" r="105"/><path class="dg-axel" d="M38 148H292M165 275V21"/><path class="dg-pil" d="M300 148l-10-4.5v9zM165 13l-4.5 10h9z"/><path class="dg-hjalp" d="M112.5 57.1V148M112.5 57.1H165"/><path class="dg-linje" d="M165 148L112.5 57.1"/><path class="dg-delta" d="M201 148A36 36 0 0 0 147 116.8"/><circle class="dg-vald" cx="112.5" cy="57.1" r="5.5"/><g class="dg-txt"><text x="304" y="140" font-style="italic">x</text><text x="175" y="18" font-style="italic">y</text><text x="105" y="47" text-anchor="end">(−1/2, √3/2)</text></g><text class="dg-etikett" x="188" y="115">120°</text></svg>';
  const sinusFigur = '<svg class="dg" viewBox="0 0 390 250" role="img" aria-label="Sinuskurva med amplitud två, medellinje ett och period två pi." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M44 24V214M94 24V214M144 24V214M194 24V214M244 24V214M294 24V214M344 24V214M44 214H364M44 174H364M44 134H364M44 94H364M44 54H364"/><path class="dg-axel" d="M44 174H370M44 224V14"/><path class="dg-pil" d="M378 174l-10-4.5v9zM44 6l-4.5 10h9z"/><path class="dg-hjalp" stroke-dasharray="7 6" d="M44 134H364"/><path class="dg-linje" d="M44 134C69 54 119 54 144 134S219 214 244 134S319 54 344 134"/><g class="dg-txt"><text x="44" y="193" text-anchor="middle">0</text><text x="144" y="193" text-anchor="middle">π</text><text x="244" y="193" text-anchor="middle">2π</text><text x="336" y="126">y = 1</text><text x="374" y="165" font-style="italic">x</text><text x="54" y="18" font-style="italic">y</text></g></svg>';
  const asymptotFigur = '<svg class="dg" viewBox="0 0 370 260" role="img" aria-label="Rationell graf med lodrät asymptot x lika med ett och vågrät asymptot y lika med två." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M40 24V224M90 24V224M140 24V224M190 24V224M240 24V224M290 24V224M340 24V224M40 224H340M40 184H340M40 144H340M40 104H340M40 64H340M40 24H340"/><path class="dg-axel" d="M40 184H348M90 234V14"/><path class="dg-pil" d="M356 184l-10-4.5v9zM90 6l-4.5 10h9z"/><path class="dg-hjalp" stroke-dasharray="7 6" d="M140 18V230M34 104H348"/><path class="dg-linje" d="M46 127C82 132 112 145 130 220M150 24C163 67 198 87 338 99"/><g class="dg-txt"><text x="140" y="203" text-anchor="middle">1</text><text x="82" y="109" text-anchor="end">2</text><text x="348" y="96" text-anchor="end">y = 2</text><text x="148" y="32">x = 1</text></g></svg>';
  const areaFigur = '<svg class="dg" viewBox="0 0 370 255" role="img" aria-label="Området mellan parabeln y lika med x kvadrat och linjen y lika med två x från noll till två är markerat." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 24V218M102 24V218M162 24V218M222 24V218M282 24V218M342 24V218M42 218H342M42 170H342M42 122H342M42 74H342M42 26H342"/><path class="dg-axel" d="M42 218H350M102 228V14"/><path class="dg-pil" d="M358 218l-10-4.5v9zM102 6l-4.5 10h9z"/><path d="M102 218L222 26Q162 218 102 218Z" fill="var(--accSoft)" stroke="none"/><path class="dg-linje" d="M102 218Q162 218 222 26"/><path class="dg-delta" d="M102 218L222 26"/><g class="dg-txt"><text x="162" y="237" text-anchor="middle">1</text><text x="222" y="237" text-anchor="middle">2</text><text x="229" y="34">y = 2x</text><text x="226" y="92">y = x²</text></g></svg>';
  const tathetFigur = '<svg class="dg" viewBox="0 0 370 245" role="img" aria-label="En triangelformad täthetsfunktion på intervallet noll till två med hela området markerat." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M42 24V208M102 24V208M162 24V208M222 24V208M282 24V208M342 24V208M42 208H342M42 162H342M42 116H342M42 70H342M42 24H342"/><path class="dg-axel" d="M42 208H350M102 218V14"/><path class="dg-pil" d="M358 208l-10-4.5v9zM102 6l-4.5 10h9z"/><polygon points="102,208 222,24 222,208" fill="var(--accSoft)" stroke="var(--acc)" stroke-width="2"/><g class="dg-txt"><text x="162" y="227" text-anchor="middle">1</text><text x="222" y="227" text-anchor="middle">2</text><text x="94" y="29" text-anchor="end">k</text><text x="238" y="42">f(x) = kx</text></g></svg>';
  const rotationFigur = '<svg class="dg" viewBox="0 0 370 250" role="img" aria-label="Området under linjen y lika med x från noll till två roteras kring x-axeln och bildar en kon." style="display:block;width:min(100%,360px);height:auto;margin:14px auto 4px"><path class="dg-axel" d="M42 132H350M102 228V20"/><path class="dg-pil" d="M358 132l-10-4.5v9zM102 12l-4.5 10h9z"/><path d="M102 132L282 40A48 92 0 0 1 282 224Z" fill="var(--accSoft)" stroke="var(--acc)" stroke-width="1.8"/><ellipse class="dg-form" cx="282" cy="132" rx="22" ry="92"/><path class="dg-linje" d="M102 132L282 40"/><path class="dg-hjalp" d="M102 132L282 224"/><g class="dg-txt"><text x="192" y="150" text-anchor="middle">x</text><text x="282" y="240" text-anchor="middle">2</text><text x="290" y="76">y = x</text></g></svg>';
  const komplexFigur = '<svg class="dg" viewBox="0 0 350 285" role="img" aria-label="Komplexa talplanet med talet tre plus fyra i markerat som punkten tre, fyra och en pil från origo." style="display:block;width:min(100%,340px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M38 24V244M88 24V244M138 24V244M188 24V244M238 24V244M288 24V244M338 24V244M38 244H338M38 194H338M38 144H338M38 94H338M38 44H338"/><path class="dg-axel" d="M38 244H344M88 254V14"/><path class="dg-pil" d="M350 244l-9-4.5v9zM88 6l-4.5 10h9zM238 44l-10 2 6 8z"/><path class="dg-linje" d="M88 244L238 44"/><path class="dg-hjalp" stroke-dasharray="6 5" d="M238 44V244M88 44H238"/><circle class="dg-vald" cx="238" cy="44" r="5.5"/><g class="dg-txt"><text x="238" y="263" text-anchor="middle">3</text><text x="80" y="49" text-anchor="end">4i</text><text x="342" y="235" text-anchor="end">Re</text><text x="98" y="18">Im</text><text x="248" y="38">3 + 4i</text></g></svg>';

  // Kapitel 1: Trigonometri
  add("mato2-grund-1-01", 1, "enhetscirkeln",
    "Läs exakta värden i enhetscirkeln",
    "<p>Bestäm exakt cos 120°, sin 120° och tan 120°.</p>" + cirkelFigur,
    "I enhetscirkeln är cosinus punktens x-koordinat och sinus dess y-koordinat. Tangens är kvoten sinus genom cosinus.",
    [steg("Bestäm referensvinkeln", "120° har referensvinkeln 60°. Punkten ligger i andra kvadranten."),
     steg("Läs koordinaterna", "Cosinus är negativ och sinus positiv.", "\\[\\cos120^\\circ=-\\frac12,\\qquad\\sin120^\\circ=\\frac{\\sqrt3}{2}\\]"),
     steg("Beräkna tangens", "Dividera sinus med cosinus.", "\\[\\tan120^\\circ=\\frac{\\sqrt3/2}{-1/2}=-\\sqrt3\\]")],
    "cos 120° = −1/2, sin 120° = √3/2 och tan 120° = −√3.",
    "Bestäm först kvadranten och tecknen; använd sedan standardvinkeln.", "Exakta trigonometriska värden i enhetscirkeln");
  add("mato2-grund-1-02", 1, "enhetscirkeln",
    "Använd symmetri och periodicitet",
    "<p>Bestäm exakt sin(−30°) och cos 390°.</p>",
    "Sinus är en udda funktion, cosinus är en jämn funktion och båda upprepar sig efter ett helt varv, 360°.",
    [steg("Använd sinus symmetri", "sin(−v) = −sin v.", "\\[\\sin(-30^\\circ)=-\\sin30^\\circ=-\\frac12\\]"),
     steg("Reducera vinkeln", "390° är ett helt varv mer än 30°.", "\\[390^\\circ-360^\\circ=30^\\circ\\]"),
     steg("Använd periodiciteten", "Cosinus har samma värde efter ett helt varv.", "\\[\\cos390^\\circ=\\cos30^\\circ=\\frac{\\sqrt3}{2}\\]")],
    "sin(−30°) = −1/2 och cos 390° = √3/2.",
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

  // Kapitel 2.1: Trigonometriska kurvor i grader
  add("mato2-grund-1-21", 2, "trig_funktioner",
    "Läs av amplitud, period och medellinje i grader",
    "<p>Bestäm amplitud, period och medellinje för \\(y=3\\sin(2x)+1\\), där \\(x\\) är i grader.</p>" + '<svg class="dg" viewBox="0 0 390 236" role="img" aria-label="Grafen till y lika med 3 sinus 2x plus 1 från 0 till 360 grader. Medellinjen y lika med 1 är streckad. Maximum 4 vid 45 grader och minimum minus 2 vid 135 grader är markerade." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M44 20V210M84 20V210M124 20V210M164 20V210M204 20V210M244 20V210M284 20V210M324 20V210M364 20V210M44 210H364M44 186.3H364M44 162.5H364M44 138.8H364M44 115H364M44 91.3H364M44 67.5H364M44 43.8H364M44 20H364"/><path class="dg-axel" d="M44 138.8H370M44 210V12"/><path class="dg-pil" d="M378 138.8l-10-4.5v9zM44 4l-4.5 10h9z"/><path class="dg-hjalp" d="M44 115H364"/><path class="dg-linje" d="M44 115L45.3 111.3L46.7 107.6L48 103.9L49.3 100.2L50.7 96.6L52 93L53.3 89.5L54.7 86L56 82.7L57.3 79.4L58.7 76.2L60 73.1L61.3 70.2L62.7 67.3L64 64.6L65.3 62.1L66.7 59.6L68 57.4L69.3 55.2L70.7 53.3L72 51.5L73.3 49.9L74.7 48.5L76 47.2L77.3 46.2L78.7 45.3L80 44.6L81.3 44.1L82.7 43.8L84 43.8L85.3 43.8L86.7 44.1L88 44.6L89.3 45.3L90.7 46.2L92 47.2L93.3 48.5L94.7 49.9L96 51.5L97.3 53.3L98.7 55.2L100 57.4L101.3 59.6L102.7 62.1L104 64.6L105.3 67.3L106.7 70.2L108 73.1L109.3 76.2L110.7 79.4L112 82.7L113.3 86L114.7 89.5L116 93L117.3 96.6L118.7 100.2L120 103.9L121.3 107.6L122.7 111.3L124 115L125.3 118.7L126.7 122.4L128 126.1L129.3 129.8L130.7 133.4L132 137L133.3 140.5L134.7 144L136 147.3L137.3 150.6L138.7 153.8L140 156.9L141.3 159.8L142.7 162.7L144 165.4L145.3 167.9L146.7 170.4L148 172.6L149.3 174.8L150.7 176.7L152 178.5L153.3 180.1L154.7 181.5L156 182.8L157.3 183.8L158.7 184.7L160 185.4L161.3 185.9L162.7 186.2L164 186.3L165.3 186.2L166.7 185.9L168 185.4L169.3 184.7L170.7 183.8L172 182.8L173.3 181.5L174.7 180.1L176 178.5L177.3 176.7L178.7 174.8L180 172.6L181.3 170.4L182.7 167.9L184 165.4L185.3 162.7L186.7 159.8L188 156.9L189.3 153.8L190.7 150.6L192 147.3L193.3 144L194.7 140.5L196 137L197.3 133.4L198.7 129.8L200 126.1L201.3 122.4L202.7 118.7L204 115L205.3 111.3L206.7 107.6L208 103.9L209.3 100.2L210.7 96.6L212 93L213.3 89.5L214.7 86L216 82.7L217.3 79.4L218.7 76.2L220 73.1L221.3 70.2L222.7 67.3L224 64.6L225.3 62.1L226.7 59.6L228 57.4L229.3 55.2L230.7 53.3L232 51.5L233.3 49.9L234.7 48.5L236 47.2L237.3 46.2L238.7 45.3L240 44.6L241.3 44.1L242.7 43.8L244 43.8L245.3 43.8L246.7 44.1L248 44.6L249.3 45.3L250.7 46.2L252 47.2L253.3 48.5L254.7 49.9L256 51.5L257.3 53.3L258.7 55.2L260 57.4L261.3 59.6L262.7 62.1L264 64.6L265.3 67.3L266.7 70.2L268 73.1L269.3 76.2L270.7 79.4L272 82.7L273.3 86L274.7 89.5L276 93L277.3 96.6L278.7 100.2L280 103.9L281.3 107.6L282.7 111.3L284 115L285.3 118.7L286.7 122.4L288 126.1L289.3 129.8L290.7 133.4L292 137L293.3 140.5L294.7 144L296 147.3L297.3 150.6L298.7 153.8L300 156.9L301.3 159.8L302.7 162.7L304 165.4L305.3 167.9L306.7 170.4L308 172.6L309.3 174.8L310.7 176.7L312 178.5L313.3 180.1L314.7 181.5L316 182.8L317.3 183.8L318.7 184.7L320 185.4L321.3 185.9L322.7 186.2L324 186.3L325.3 186.2L326.7 185.9L328 185.4L329.3 184.7L330.7 183.8L332 182.8L333.3 181.5L334.7 180.1L336 178.5L337.3 176.7L338.7 174.8L340 172.6L341.3 170.4L342.7 167.9L344 165.4L345.3 162.7L346.7 159.8L348 156.9L349.3 153.8L350.7 150.6L352 147.3L353.3 144L354.7 140.5L356 137L357.3 133.4L358.7 129.8L360 126.1L361.3 122.4L362.7 118.7L364 115"/><circle class="dg-vald" cx="84" cy="43.8" r="4.5"/><circle class="dg-vald" cx="164" cy="186.3" r="4.5"/><g class="dg-txt"><text x="124" y="228" text-anchor="middle">90°</text><text x="204" y="228" text-anchor="middle">180°</text><text x="284" y="228" text-anchor="middle">270°</text><text x="364" y="228" text-anchor="middle">360°</text><text x="37" y="47.8" text-anchor="end">4</text><text x="37" y="119" text-anchor="end">1</text><text x="37" y="190.3" text-anchor="end">−2</text><text x="376" y="129.8" font-style="italic">x</text><text x="53" y="14" font-style="italic">y</text></g></svg>',
    "För y = a sin(bx) + d är amplituden |a|, perioden 360°/|b| och medellinjen y = d.",
    [steg("Läs amplituden", "Grafen går lika långt upp som ned från medellinjen. Avståndet är talet framför sinus.", "\\[A=|3|=3\\]"),
     steg("Bestäm perioden", "Argumentet 2x går ett helt varv, 360°, redan när x har ökat 180°.", "\\[T=\\frac{360^\\circ}{2}=180^\\circ\\]"),
     steg("Läs medellinjen", "Konstanten 1 flyttar hela grafen ett steg uppåt.", "\\[y=1\\]"),
     steg("Kontrollera i grafen", "Största värdet är 1 + 3 = 4 vid 45° och minsta värdet 1 − 3 = −2 vid 135°. Avståndet mellan dem är en halv period.", "\\[135^\\circ-45^\\circ=90^\\circ=\\tfrac12\\cdot180^\\circ\\]")],
    "Amplituden är 3, perioden är 180° och medellinjen är y = 1.",
    "Talet framför x ändrar perioden, inte amplituden. Ett tal större än 1 ger kortare period.", "Amplitud, period och medellinje för trigonometriska funktioner");
  add("mato2-grund-1-22", 2, "trig_funktioner",
    "Bestäm en funktion från grafen i grader",
    "<p>Grafen visar \\(y=a\\cos(bx)+c\\), där \\(a\\gt0\\) och \\(b\\gt0\\). Bestäm \\(a\\), \\(b\\) och \\(c\\).</p>" + '<svg class="dg" viewBox="0 0 390 236" role="img" aria-label="Cosinuskurva från 0 till 360 grader med största värde 1 och minsta värde minus 3. Två maximipunkter vid 0 och 120 grader är markerade och medellinjen y lika med minus 1 är streckad." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M44 20V210M70.7 20V210M97.3 20V210M124 20V210M150.7 20V210M177.3 20V210M204 20V210M230.7 20V210M257.3 20V210M284 20V210M310.7 20V210M337.3 20V210M364 20V210M44 210H364M44 178.3H364M44 146.7H364M44 115H364M44 83.3H364M44 51.7H364M44 20H364"/><path class="dg-axel" d="M44 83.3H370M44 210V12"/><path class="dg-pil" d="M378 83.3l-10-4.5v9zM44 4l-4.5 10h9z"/><path class="dg-hjalp" d="M44 115H364"/><path class="dg-linje" d="M44 51.7L45.3 51.9L46.7 52.4L48 53.4L49.3 54.8L50.7 56.5L52 58.6L53.3 61L54.7 63.8L56 66.8L57.3 70.2L58.7 73.9L60 77.8L61.3 81.9L62.7 86.2L64 90.8L65.3 95.4L66.7 100.2L68 105.1L69.3 110L70.7 115L72 120L73.3 124.9L74.7 129.8L76 134.6L77.3 139.2L78.7 143.8L80 148.1L81.3 152.2L82.7 156.1L84 159.8L85.3 163.2L86.7 166.2L88 169L89.3 171.4L90.7 173.5L92 175.2L93.3 176.6L94.7 177.6L96 178.1L97.3 178.3L98.7 178.1L100 177.6L101.3 176.6L102.7 175.2L104 173.5L105.3 171.4L106.7 169L108 166.2L109.3 163.2L110.7 159.8L112 156.1L113.3 152.2L114.7 148.1L116 143.8L117.3 139.2L118.7 134.6L120 129.8L121.3 124.9L122.7 120L124 115L125.3 110L126.7 105.1L128 100.2L129.3 95.4L130.7 90.8L132 86.2L133.3 81.9L134.7 77.8L136 73.9L137.3 70.2L138.7 66.8L140 63.8L141.3 61L142.7 58.6L144 56.5L145.3 54.8L146.7 53.4L148 52.4L149.3 51.9L150.7 51.7L152 51.9L153.3 52.4L154.7 53.4L156 54.8L157.3 56.5L158.7 58.6L160 61L161.3 63.8L162.7 66.8L164 70.2L165.3 73.9L166.7 77.8L168 81.9L169.3 86.2L170.7 90.8L172 95.4L173.3 100.2L174.7 105.1L176 110L177.3 115L178.7 120L180 124.9L181.3 129.8L182.7 134.6L184 139.2L185.3 143.8L186.7 148.1L188 152.2L189.3 156.1L190.7 159.8L192 163.2L193.3 166.2L194.7 169L196 171.4L197.3 173.5L198.7 175.2L200 176.6L201.3 177.6L202.7 178.1L204 178.3L205.3 178.1L206.7 177.6L208 176.6L209.3 175.2L210.7 173.5L212 171.4L213.3 169L214.7 166.2L216 163.2L217.3 159.8L218.7 156.1L220 152.2L221.3 148.1L222.7 143.8L224 139.2L225.3 134.6L226.7 129.8L228 124.9L229.3 120L230.7 115L232 110L233.3 105.1L234.7 100.2L236 95.4L237.3 90.8L238.7 86.2L240 81.9L241.3 77.8L242.7 73.9L244 70.2L245.3 66.8L246.7 63.8L248 61L249.3 58.6L250.7 56.5L252 54.8L253.3 53.4L254.7 52.4L256 51.9L257.3 51.7L258.7 51.9L260 52.4L261.3 53.4L262.7 54.8L264 56.5L265.3 58.6L266.7 61L268 63.8L269.3 66.8L270.7 70.2L272 73.9L273.3 77.8L274.7 81.9L276 86.2L277.3 90.8L278.7 95.4L280 100.2L281.3 105.1L282.7 110L284 115L285.3 120L286.7 124.9L288 129.8L289.3 134.6L290.7 139.2L292 143.8L293.3 148.1L294.7 152.2L296 156.1L297.3 159.8L298.7 163.2L300 166.2L301.3 169L302.7 171.4L304 173.5L305.3 175.2L306.7 176.6L308 177.6L309.3 178.1L310.7 178.3L312 178.1L313.3 177.6L314.7 176.6L316 175.2L317.3 173.5L318.7 171.4L320 169L321.3 166.2L322.7 163.2L324 159.8L325.3 156.1L326.7 152.2L328 148.1L329.3 143.8L330.7 139.2L332 134.6L333.3 129.8L334.7 124.9L336 120L337.3 115L338.7 110L340 105.1L341.3 100.2L342.7 95.4L344 90.8L345.3 86.2L346.7 81.9L348 77.8L349.3 73.9L350.7 70.2L352 66.8L353.3 63.8L354.7 61L356 58.6L357.3 56.5L358.7 54.8L360 53.4L361.3 52.4L362.7 51.9L364 51.7"/><circle class="dg-vald" cx="44" cy="51.7" r="4.5"/><circle class="dg-vald" cx="150.7" cy="51.7" r="4.5"/><g class="dg-txt"><text x="97.3" y="228" text-anchor="middle">60°</text><text x="150.7" y="228" text-anchor="middle">120°</text><text x="204" y="228" text-anchor="middle">180°</text><text x="257.3" y="228" text-anchor="middle">240°</text><text x="310.7" y="228" text-anchor="middle">300°</text><text x="364" y="228" text-anchor="middle">360°</text><text x="37" y="55.7" text-anchor="end">1</text><text x="37" y="119" text-anchor="end">−1</text><text x="37" y="182.3" text-anchor="end">−3</text><text x="376" y="74.3" font-style="italic">x</text><text x="53" y="14" font-style="italic">y</text></g></svg>',
    "Största och minsta värde ger medellinje och amplitud. Avståndet mellan två maximipunkter som ligger bredvid varandra är perioden.",
    [steg("Läs av extremvärdena", "Största värdet är 1 och minsta värdet är −3."),
     steg("Bestäm medellinjen", "Medellinjen ligger mitt emellan extremvärdena.", "\\[c=\\frac{1+(-3)}{2}=-1\\]"),
     steg("Bestäm amplituden", "Amplituden är halva avståndet mellan extremvärdena.", "\\[a=\\frac{1-(-3)}{2}=2\\]"),
     steg("Bestäm b från perioden", "Maximipunkterna ligger vid 0° och 120°, så perioden är 120°.", "\\[\\frac{360^\\circ}{b}=120^\\circ\\;\\Rightarrow\\; b=3\\]")],
    "a = 2, b = 3 och c = −1, alltså y = 2cos(3x) − 1.",
    "Kontrollera svaret genom att läsa tillbaka: har din funktion samma största värde, minsta värde och period som grafen?", "Bestäm trigonometrisk funktion från graf och egenskaper");
  add("mato2-grund-1-23", 2, "trig_funktioner",
    "Bestäm period och asymptoter för tangens i grader",
    "<p>Bestäm perioden och de lodräta asymptoterna till \\(y=\\tan(2x)\\) i intervallet \\(0^\\circ\\le x\\lt180^\\circ\\).</p>",
    "tan x = sin x / cos x har perioden 180° och lodräta asymptoter där cos x = 0, alltså vid 90° + n · 180°.",
    [steg("Bestäm perioden", "Argumentet 2x ökar dubbelt så snabbt som x, så perioden halveras.", "\\[T=\\frac{180^\\circ}{2}=90^\\circ\\]"),
     steg("Ställ upp villkoret för asymptoter", "Tangens saknar värde där cosinus av argumentet är noll.", "\\[2x=90^\\circ+n\\cdot180^\\circ\\]"),
     steg("Lös ut x", "Dela med 2.", "\\[x=45^\\circ+n\\cdot90^\\circ\\]"),
     steg("Välj värden i intervallet", "n = 0 och n = 1 ger värden mellan 0° och 180°.", "\\[x=45^\\circ\\quad\\text{och}\\quad x=135^\\circ\\]")],
    "Perioden är 90° och asymptoterna är x = 45° och x = 135°.",
    "Tangens upprepar sig efter ett halvt varv, 180°, inte efter ett helt varv som sinus och cosinus.", "Period och asymptoter för tangensfunktioner");
  add("mato2-grund-1-24", 2, "trig_funktioner",
    "Räkna lösningar med hjälp av en graf",
    "<p>Hur många lösningar har \\(\\sin(2x)=0{,}5\\) i intervallet \\(0^\\circ\\le x\\lt360^\\circ\\)?</p>" + '<svg class="dg" viewBox="0 0 390 236" role="img" aria-label="Grafen till y lika med sinus 2x från 0 till 360 grader och den streckade linjen y lika med 0,5. De fyra skärningspunkterna vid 15, 75, 195 och 255 grader är markerade." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M44 20V210M84 20V210M124 20V210M164 20V210M204 20V210M244 20V210M284 20V210M324 20V210M364 20V210M44 210H364M44 162.5H364M44 115H364M44 67.5H364M44 20H364"/><path class="dg-axel" d="M44 115H370M44 210V12"/><path class="dg-pil" d="M378 115l-10-4.5v9zM44 4l-4.5 10h9z"/><path class="dg-hjalp" d="M44 91.3H364"/><path class="dg-linje" d="M44 115L45.3 112.5L46.7 110L48 107.6L49.3 105.1L50.7 102.7L52 100.3L53.3 98L54.7 95.7L56 93.4L57.3 91.3L58.7 89.1L60 87.1L61.3 85.1L62.7 83.2L64 81.4L65.3 79.7L66.7 78.1L68 76.6L69.3 75.2L70.7 73.9L72 72.7L73.3 71.6L74.7 70.7L76 69.8L77.3 69.1L78.7 68.5L80 68.1L81.3 67.8L82.7 67.6L84 67.5L85.3 67.6L86.7 67.8L88 68.1L89.3 68.5L90.7 69.1L92 69.8L93.3 70.7L94.7 71.6L96 72.7L97.3 73.9L98.7 75.2L100 76.6L101.3 78.1L102.7 79.7L104 81.4L105.3 83.2L106.7 85.1L108 87.1L109.3 89.1L110.7 91.3L112 93.4L113.3 95.7L114.7 98L116 100.3L117.3 102.7L118.7 105.1L120 107.6L121.3 110L122.7 112.5L124 115L125.3 117.5L126.7 120L128 122.4L129.3 124.9L130.7 127.3L132 129.7L133.3 132L134.7 134.3L136 136.6L137.3 138.8L138.7 140.9L140 142.9L141.3 144.9L142.7 146.8L144 148.6L145.3 150.3L146.7 151.9L148 153.4L149.3 154.8L150.7 156.1L152 157.3L153.3 158.4L154.7 159.3L156 160.2L157.3 160.9L158.7 161.5L160 161.9L161.3 162.2L162.7 162.4L164 162.5L165.3 162.4L166.7 162.2L168 161.9L169.3 161.5L170.7 160.9L172 160.2L173.3 159.3L174.7 158.4L176 157.3L177.3 156.1L178.7 154.8L180 153.4L181.3 151.9L182.7 150.3L184 148.6L185.3 146.8L186.7 144.9L188 142.9L189.3 140.9L190.7 138.8L192 136.6L193.3 134.3L194.7 132L196 129.7L197.3 127.3L198.7 124.9L200 122.4L201.3 120L202.7 117.5L204 115L205.3 112.5L206.7 110L208 107.6L209.3 105.1L210.7 102.7L212 100.3L213.3 98L214.7 95.7L216 93.4L217.3 91.3L218.7 89.1L220 87.1L221.3 85.1L222.7 83.2L224 81.4L225.3 79.7L226.7 78.1L228 76.6L229.3 75.2L230.7 73.9L232 72.7L233.3 71.6L234.7 70.7L236 69.8L237.3 69.1L238.7 68.5L240 68.1L241.3 67.8L242.7 67.6L244 67.5L245.3 67.6L246.7 67.8L248 68.1L249.3 68.5L250.7 69.1L252 69.8L253.3 70.7L254.7 71.6L256 72.7L257.3 73.9L258.7 75.2L260 76.6L261.3 78.1L262.7 79.7L264 81.4L265.3 83.2L266.7 85.1L268 87.1L269.3 89.1L270.7 91.3L272 93.4L273.3 95.7L274.7 98L276 100.3L277.3 102.7L278.7 105.1L280 107.6L281.3 110L282.7 112.5L284 115L285.3 117.5L286.7 120L288 122.4L289.3 124.9L290.7 127.3L292 129.7L293.3 132L294.7 134.3L296 136.6L297.3 138.7L298.7 140.9L300 142.9L301.3 144.9L302.7 146.8L304 148.6L305.3 150.3L306.7 151.9L308 153.4L309.3 154.8L310.7 156.1L312 157.3L313.3 158.4L314.7 159.3L316 160.2L317.3 160.9L318.7 161.5L320 161.9L321.3 162.2L322.7 162.4L324 162.5L325.3 162.4L326.7 162.2L328 161.9L329.3 161.5L330.7 160.9L332 160.2L333.3 159.3L334.7 158.4L336 157.3L337.3 156.1L338.7 154.8L340 153.4L341.3 151.9L342.7 150.3L344 148.6L345.3 146.8L346.7 144.9L348 142.9L349.3 140.9L350.7 138.8L352 136.6L353.3 134.3L354.7 132L356 129.7L357.3 127.3L358.7 124.9L360 122.4L361.3 120L362.7 117.5L364 115"/><circle class="dg-skar" cx="57.3" cy="91.3" r="4.5"/><circle class="dg-skar" cx="110.7" cy="91.3" r="4.5"/><circle class="dg-skar" cx="217.3" cy="91.3" r="4.5"/><circle class="dg-skar" cx="270.7" cy="91.3" r="4.5"/><g class="dg-txt"><text x="124" y="228" text-anchor="middle">90°</text><text x="204" y="228" text-anchor="middle">180°</text><text x="284" y="228" text-anchor="middle">270°</text><text x="364" y="228" text-anchor="middle">360°</text><text x="37" y="71.5" text-anchor="end">1</text><text x="37" y="166.5" text-anchor="end">−1</text><text x="376" y="106" font-style="italic">x</text><text x="53" y="14" font-style="italic">y</text><text x="362" y="84.3" text-anchor="end">y = 0,5</text></g></svg>',
    "Lösningarna till f(x) = k är x-koordinaterna för skärningspunkterna mellan grafen y = f(x) och linjen y = k.",
    [steg("Bestäm perioden", "sin(2x) har perioden 360°/2 = 180°, så två hela perioder ryms i intervallet."),
     steg("Räkna skärningar per period", "Linjen y = 0,5 ligger mellan −1 och 1. Den skärs en gång på väg upp och en gång på väg ned under varje period.", "\\[2\\cdot2=4\\]"),
     steg("Kontrollera med beräkning", "2x = 30° eller 2x = 150°, plus hela varv. Dela med 2 och välj värden i intervallet.", "\\[x=15^\\circ,\\ 75^\\circ,\\ 195^\\circ,\\ 255^\\circ\\]")],
    "Ekvationen har 4 lösningar: 15°, 75°, 195° och 255°.",
    "Fler perioder i intervallet ger fler lösningar. Räkna perioderna innan du räknar lösningarna.", "Grundläggande trigonometriska ekvationer");

  // Kapitel 2.1: Fasförskjutning i grader
  add("mato2-grund-1-25", 2, "trig_fasforskjutning",
    "Tolka en fasförskjutning i grader",
    "<p>Beskriv hur grafen till \\(y=\\sin(x-30^\\circ)\\) fås från grafen till \\(y=\\sin x\\). Var hamnar maximipunkten \\((90^\\circ,\\,1)\\)?</p>" + '<svg class="dg" viewBox="0 0 390 236" role="img" aria-label="Grafen till y lika med sinus x streckad och grafen till y lika med sinus av x minus 30 grader heldragen, från 0 till 360 grader. Maximipunkten flyttas från 90 till 120 grader." style="display:block;width:min(100%,380px);height:auto;margin:14px auto 4px"><path class="dg-rut" d="M44 20V210M84 20V210M124 20V210M164 20V210M204 20V210M244 20V210M284 20V210M324 20V210M364 20V210M44 210H364M44 162.5H364M44 115H364M44 67.5H364M44 20H364"/><path class="dg-axel" d="M44 115H370M44 210V12"/><path class="dg-pil" d="M378 115l-10-4.5v9zM44 4l-4.5 10h9z"/><path class="dg-spegel" d="M44 115L45.3 113.8L46.7 112.5L48 111.3L49.3 110L50.7 108.8L52 107.6L53.3 106.3L54.7 105.1L56 103.9L57.3 102.7L58.7 101.5L60 100.3L61.3 99.1L62.7 98L64 96.8L65.3 95.7L66.7 94.6L68 93.4L69.3 92.3L70.7 91.3L72 90.2L73.3 89.1L74.7 88.1L76 87.1L77.3 86.1L78.7 85.1L80 84.2L81.3 83.2L82.7 82.3L84 81.4L85.3 80.5L86.7 79.7L88 78.9L89.3 78.1L90.7 77.3L92 76.6L93.3 75.9L94.7 75.2L96 74.5L97.3 73.9L98.7 73.3L100 72.7L101.3 72.1L102.7 71.6L104 71.1L105.3 70.7L106.7 70.2L108 69.8L109.3 69.5L110.7 69.1L112 68.8L113.3 68.5L114.7 68.3L116 68.1L117.3 67.9L118.7 67.8L120 67.6L121.3 67.6L122.7 67.5L124 67.5L125.3 67.5L126.7 67.6L128 67.6L129.3 67.8L130.7 67.9L132 68.1L133.3 68.3L134.7 68.5L136 68.8L137.3 69.1L138.7 69.5L140 69.8L141.3 70.2L142.7 70.7L144 71.1L145.3 71.6L146.7 72.1L148 72.7L149.3 73.3L150.7 73.9L152 74.5L153.3 75.2L154.7 75.9L156 76.6L157.3 77.3L158.7 78.1L160 78.9L161.3 79.7L162.7 80.5L164 81.4L165.3 82.3L166.7 83.2L168 84.2L169.3 85.1L170.7 86.1L172 87.1L173.3 88.1L174.7 89.1L176 90.2L177.3 91.3L178.7 92.3L180 93.4L181.3 94.6L182.7 95.7L184 96.8L185.3 98L186.7 99.1L188 100.3L189.3 101.5L190.7 102.7L192 103.9L193.3 105.1L194.7 106.3L196 107.6L197.3 108.8L198.7 110L200 111.3L201.3 112.5L202.7 113.8L204 115L205.3 116.2L206.7 117.5L208 118.7L209.3 120L210.7 121.2L212 122.4L213.3 123.7L214.7 124.9L216 126.1L217.3 127.3L218.7 128.5L220 129.7L221.3 130.9L222.7 132L224 133.2L225.3 134.3L226.7 135.4L228 136.6L229.3 137.7L230.7 138.8L232 139.8L233.3 140.9L234.7 141.9L236 142.9L237.3 143.9L238.7 144.9L240 145.8L241.3 146.8L242.7 147.7L244 148.6L245.3 149.5L246.7 150.3L248 151.1L249.3 151.9L250.7 152.7L252 153.4L253.3 154.1L254.7 154.8L256 155.5L257.3 156.1L258.7 156.7L260 157.3L261.3 157.9L262.7 158.4L264 158.9L265.3 159.3L266.7 159.8L268 160.2L269.3 160.5L270.7 160.9L272 161.2L273.3 161.5L274.7 161.7L276 161.9L277.3 162.1L278.7 162.2L280 162.4L281.3 162.4L282.7 162.5L284 162.5L285.3 162.5L286.7 162.4L288 162.4L289.3 162.2L290.7 162.1L292 161.9L293.3 161.7L294.7 161.5L296 161.2L297.3 160.9L298.7 160.5L300 160.2L301.3 159.8L302.7 159.3L304 158.9L305.3 158.4L306.7 157.9L308 157.3L309.3 156.7L310.7 156.1L312 155.5L313.3 154.8L314.7 154.1L316 153.4L317.3 152.7L318.7 151.9L320 151.1L321.3 150.3L322.7 149.5L324 148.6L325.3 147.7L326.7 146.8L328 145.8L329.3 144.9L330.7 143.9L332 142.9L333.3 141.9L334.7 140.9L336 139.8L337.3 138.8L338.7 137.7L340 136.6L341.3 135.4L342.7 134.3L344 133.2L345.3 132L346.7 130.9L348 129.7L349.3 128.5L350.7 127.3L352 126.1L353.3 124.9L354.7 123.7L356 122.4L357.3 121.2L358.7 120L360 118.7L361.3 117.5L362.7 116.2L364 115"/><path class="dg-linje" d="M44 138.8L45.3 137.7L46.7 136.6L48 135.4L49.3 134.3L50.7 133.2L52 132L53.3 130.9L54.7 129.7L56 128.5L57.3 127.3L58.7 126.1L60 124.9L61.3 123.7L62.7 122.4L64 121.2L65.3 120L66.7 118.7L68 117.5L69.3 116.2L70.7 115L72 113.8L73.3 112.5L74.7 111.3L76 110L77.3 108.8L78.7 107.6L80 106.3L81.3 105.1L82.7 103.9L84 102.7L85.3 101.5L86.7 100.3L88 99.1L89.3 98L90.7 96.8L92 95.7L93.3 94.6L94.7 93.4L96 92.3L97.3 91.3L98.7 90.2L100 89.1L101.3 88.1L102.7 87.1L104 86.1L105.3 85.1L106.7 84.2L108 83.2L109.3 82.3L110.7 81.4L112 80.5L113.3 79.7L114.7 78.9L116 78.1L117.3 77.3L118.7 76.6L120 75.9L121.3 75.2L122.7 74.5L124 73.9L125.3 73.3L126.7 72.7L128 72.1L129.3 71.6L130.7 71.1L132 70.7L133.3 70.2L134.7 69.8L136 69.5L137.3 69.1L138.7 68.8L140 68.5L141.3 68.3L142.7 68.1L144 67.9L145.3 67.8L146.7 67.6L148 67.6L149.3 67.5L150.7 67.5L152 67.5L153.3 67.6L154.7 67.6L156 67.8L157.3 67.9L158.7 68.1L160 68.3L161.3 68.5L162.7 68.8L164 69.1L165.3 69.5L166.7 69.8L168 70.2L169.3 70.7L170.7 71.1L172 71.6L173.3 72.1L174.7 72.7L176 73.3L177.3 73.9L178.7 74.5L180 75.2L181.3 75.9L182.7 76.6L184 77.3L185.3 78.1L186.7 78.9L188 79.7L189.3 80.5L190.7 81.4L192 82.3L193.3 83.2L194.7 84.2L196 85.1L197.3 86.1L198.7 87.1L200 88.1L201.3 89.1L202.7 90.2L204 91.3L205.3 92.3L206.7 93.4L208 94.6L209.3 95.7L210.7 96.8L212 98L213.3 99.1L214.7 100.3L216 101.5L217.3 102.7L218.7 103.9L220 105.1L221.3 106.3L222.7 107.6L224 108.8L225.3 110L226.7 111.3L228 112.5L229.3 113.8L230.7 115L232 116.2L233.3 117.5L234.7 118.7L236 120L237.3 121.2L238.7 122.4L240 123.7L241.3 124.9L242.7 126.1L244 127.3L245.3 128.5L246.7 129.7L248 130.9L249.3 132L250.7 133.2L252 134.3L253.3 135.4L254.7 136.6L256 137.7L257.3 138.8L258.7 139.8L260 140.9L261.3 141.9L262.7 142.9L264 143.9L265.3 144.9L266.7 145.8L268 146.8L269.3 147.7L270.7 148.6L272 149.5L273.3 150.3L274.7 151.1L276 151.9L277.3 152.7L278.7 153.4L280 154.1L281.3 154.8L282.7 155.5L284 156.1L285.3 156.7L286.7 157.3L288 157.9L289.3 158.4L290.7 158.9L292 159.3L293.3 159.8L294.7 160.2L296 160.5L297.3 160.9L298.7 161.2L300 161.5L301.3 161.7L302.7 161.9L304 162.1L305.3 162.2L306.7 162.4L308 162.4L309.3 162.5L310.7 162.5L312 162.5L313.3 162.4L314.7 162.4L316 162.2L317.3 162.1L318.7 161.9L320 161.7L321.3 161.5L322.7 161.2L324 160.9L325.3 160.5L326.7 160.2L328 159.8L329.3 159.3L330.7 158.9L332 158.4L333.3 157.9L334.7 157.3L336 156.7L337.3 156.1L338.7 155.5L340 154.8L341.3 154.1L342.7 153.4L344 152.7L345.3 151.9L346.7 151.1L348 150.3L349.3 149.5L350.7 148.6L352 147.7L353.3 146.8L354.7 145.8L356 144.9L357.3 143.9L358.7 142.9L360 141.9L361.3 140.9L362.7 139.8L364 138.8"/><circle class="dg-matt" cx="124" cy="67.5" r="4.5"/><circle class="dg-vald" cx="150.7" cy="67.5" r="4.5"/><g class="dg-txt"><text x="124" y="228" text-anchor="middle">90°</text><text x="204" y="228" text-anchor="middle">180°</text><text x="284" y="228" text-anchor="middle">270°</text><text x="364" y="228" text-anchor="middle">360°</text><text x="37" y="71.5" text-anchor="end">1</text><text x="37" y="166.5" text-anchor="end">−1</text><text x="376" y="106" font-style="italic">x</text><text x="53" y="14" font-style="italic">y</text><text x="158.7" y="61.5">(120°, 1)</text></g></svg>',
    "En förändring inne i argumentet flyttar grafen i x-led. Minus inne i parentesen ger förskjutning åt höger.",
    [steg("Hitta den nya startpunkten", "y = sin x börjar en period där argumentet är 0°. Här är argumentet 0° när x = 30°.", "\\[x-30^\\circ=0^\\circ\\;\\Rightarrow\\; x=30^\\circ\\]"),
     steg("Beskriv förskjutningen", "Varje punkt på grafen hamnar 30° längre åt höger. Amplitud, period och medellinje ändras inte."),
     steg("Flytta maximipunkten", "Argumentet ska vara 90° för att sinus ska bli 1.", "\\[x-30^\\circ=90^\\circ\\;\\Rightarrow\\; x=120^\\circ\\]")],
    "Grafen flyttas 30° åt höger. Maximipunkten hamnar i (120°, 1).",
    "Fråga dig: vilket x ger samma argument som tidigare? Då ser du åt vilket håll grafen har flyttats.", "Fasförskjutning i trigonometriska funktioner");
  add("mato2-grund-1-26", 2, "trig_fasforskjutning",
    "Fasförskjutning när x har en faktor",
    "<p>Hur många grader är grafen till \\(y=\\sin(2x-60^\\circ)\\) förskjuten jämfört med \\(y=\\sin(2x)\\)? Bestäm också perioden.</p>",
    "Bryt ut faktorn framför x. I formen sin(b(x − v)) är förskjutningen v och perioden 360°/b.",
    [steg("Bryt ut faktorn 2", "Skriv argumentet som 2 gånger en parentes.", "\\[\\sin(2x-60^\\circ)=\\sin\\bigl(2(x-30^\\circ)\\bigr)\\]"),
     steg("Läs av förskjutningen", "Parentesen x − 30° visar att grafen flyttas 30° åt höger, inte 60°."),
     steg("Kontrollera med en punkt", "y = sin(2x) går upp genom x-axeln vid x = 0. Den nya grafen gör det när 2x − 60° = 0.", "\\[x=30^\\circ\\]"),
     steg("Bestäm perioden", "Förskjutningen påverkar inte perioden.", "\\[T=\\frac{360^\\circ}{2}=180^\\circ\\]")],
    "Grafen är förskjuten 30° åt höger och perioden är 180°.",
    "Dela fasvinkeln med faktorn framför x. Annars blir förskjutningen för stor.", "Fasförskjutning i trigonometriska funktioner");

  add("mato2-grund-1-04", 2, "radianer",
    "Omvandla mellan grader och radianer",
    "<p>Omvandla 150° till radianer och 7π/6 radianer till grader.</p>",
    "Ett halvt varv är både 180° och π radianer. Det ger omvandlingsfaktorerna π/180 och 180/π.",
    [steg("Grader till radianer", "Multiplicera med π/180.", "\\[150^\\circ\\cdot\\frac{\\pi}{180^\\circ}=\\frac{5\\pi}{6}\\]"),
     steg("Radianer till grader", "Multiplicera med 180/π.", "\\[\\frac{7\\pi}{6}\\cdot\\frac{180^\\circ}{\\pi}=210^\\circ\\]")],
    "150° = 5π/6 rad och 7π/6 rad = 210°.",
    "Kontrollera rimligheten mot π rad = 180°.", "Omvandling mellan grader och radianer");

  add("mato2-grund-1-05", 2, "radianer",
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
    "<p>Lös sin x = 1/2 för 0° ≤ x &lt; 360°.</p>",
    "Sinus är y-koordinaten i enhetscirkeln. Ett positivt värde fås i första och andra kvadranten.",
    [steg("Bestäm referensvinkeln", "sin 30° = 1/2 ger den första lösningen.", "\\[x_1=30^\\circ\\]"),
     steg("Bestäm lösningen i andra kvadranten", "Använd 180° − 30°.", "\\[x_2=180^\\circ-30^\\circ=150^\\circ\\]"),
     steg("Kontrollera intervallet", "Båda lösningarna ligger mellan 0° och 360°.")],
    "x = 30° eller x = 150°.",
    "Miniräknarens arcsin ger bara huvudlösningen; enhetscirkeln ger alla lösningar i intervallet.", "Grundläggande trigonometriska ekvationer");
  add("mato2-grund-1-10", 1, "trig_ekvationer",
    "Skriv den generella lösningen",
    "<p>Lös cos x = −1/2. Ange alla lösningar.</p>",
    "Hitta lösningarna under ett varv och lägg sedan till hela varv.",
    [steg("Lös under ett varv", "Cosinus är −1/2 vid 120° och 240°.", "\\[x=120^\\circ\\quad\\text{eller}\\quad x=240^\\circ\\]"),
     steg("Lägg till hela varv", "Cosinus upprepar sig efter 360°.", "\\[x=120^\\circ+n\\cdot360^\\circ\\quad\\text{eller}\\quad x=240^\\circ+n\\cdot360^\\circ\\]")],
    "x = 120° + n · 360° eller x = 240° + n · 360°, där n är ett heltal.",
    "En generell lösning måste innehålla en heltalsparameter.", "Trigonometriska ekvationer med generell lösning");
  add("mato2-grund-1-11", 1, "trig_ekvationer",
    "Faktorisera en trigonometrisk ekvation",
    "<p>Lös 2sin²x − sin x = 0 för 0° ≤ x &lt; 360°.</p>",
    "Behandla sin x som en gemensam faktor och använd nollproduktmetoden.",
    [steg("Faktorisera", "Bryt ut sin x.", "\\[\\sin x(2\\sin x-1)=0\\]"),
     steg("Lös första faktorn", "sin x = 0 i intervallet.", "\\[x=0^\\circ,\\ 180^\\circ\\]"),
     steg("Lös andra faktorn", "2sin x − 1 = 0 ger sin x = 1/2.", "\\[x=30^\\circ,\\ 150^\\circ\\]")],
    "x = 0°, 30°, 150° eller 180°.",
    "Efter faktorisering ska varje faktor sättas lika med noll; tappa inte lösningen sin x = 0.", "Trigonometriska ekvationer med identiteter och faktorisering");
  add("mato2-grund-1-12", 1, "trig_ekvationer",
    "Använd andragradssubstitution",
    "<p>Lös 2cos²x − 3cos x + 1 = 0 för 0° ≤ x &lt; 360°.</p>",
    "Sätt u = cos x. Lös först andragradsekvationen i u och därefter de trigonometriska ekvationerna.",
    [steg("Substituera", "Sätt u = cos x.", "\\[2u^2-3u+1=0\\]"),
     steg("Faktorisera", "Bestäm de möjliga cosinusvärdena.", "\\[(2u-1)(u-1)=0\\Rightarrow u=\\frac12\\text{ eller }u=1\\]"),
     steg("Gå tillbaka till x", "Lös cos x = 1/2 och cos x = 1 i intervallet.", "\\[x=60^\\circ,\\ 300^\\circ,\\ 0^\\circ\\]")],
    "x = 0°, 60° eller 300°.",
    "Kontrollera att varje u-värde ligger mellan −1 och 1 innan du löser för vinkeln.", "Trigonometriska ekvationer med andragradssubstitution");
  add("mato2-grund-1-13", 2, "trig_kurvor_radianer",
    "Bestäm amplitud, period och medellinje",
    "<p>Bestäm amplitud, period och medellinje för f(x) = 2sin x + 1.</p>" + sinusFigur,
    "För y = a sin(bx) + d är amplituden |a|, perioden 2π/|b| och medellinjen y = d.",
    [steg("Läs amplituden", "Koefficienten framför sinus är 2.", "\\[A=|2|=2\\]"),
     steg("Bestäm perioden", "Här är b = 1.", "\\[T=\\frac{2\\pi}{1}=2\\pi\\]"),
     steg("Läs medellinjen", "Den lodräta förskjutningen är 1.", "\\[y=1\\]")],
    "Amplituden är 2, perioden är 2π och medellinjen är y = 1.",
    "Amplituden är alltid positiv; ett negativt a speglar grafen men ger inte negativ amplitud.", "Amplitud, period och medellinje för trigonometriska funktioner");

  add("mato2-grund-1-14", 2, "trig_kurvor_radianer",
    "Tolka en fasförskjutning",
    "<p>Beskriv hur grafen till g(x) = sin(x − π/4) fås från y = sin x.</p>",
    "En förändring inne i funktionsargumentet verkar i motsatt riktning mot tecknet.",
    [steg("Identifiera förskjutningen", "Argumentet är x − π/4."),
     steg("Flytta grafen", "Grafen förskjuts π/4 åt höger.", "\\[g(x)=\\sin\\left(x-\\frac\\pi4\\right)\\]")],
    "Grafen y = sin x flyttas π/4 åt höger.",
    "Minus inne i parentesen ger förskjutning åt höger, inte åt vänster.", "Fasförskjutning i trigonometriska funktioner");

  add("mato2-grund-1-14b", 2, "trig_kurvor_radianer",
    "Bestäm en sinusfunktion från dess egenskaper",
    "<p>En sinuskurva har största värdet 5, minsta värdet 1 och perioden π. Vid x = 0 skär den medellinjen på väg uppåt. Bestäm en möjlig funktion.</p>",
    "Extremvärdena ger amplitud och medellinje. Perioden bestämmer koefficienten framför x.",
    [steg("Bestäm amplituden", "Ta halva skillnaden mellan största och minsta värde.", "\\[A=\\frac{5-1}{2}=2\\]"),
     steg("Bestäm medellinjen", "Ta medelvärdet av extremvärdena.", "\\[d=\\frac{5+1}{2}=3\\]"),
     steg("Bestäm b", "För sinus gäller perioden 2π/|b|.", "\\[\\frac{2\\pi}{|b|}=\\pi\\Rightarrow b=2\\]"),
     steg("Välj fas", "Kurvan passerar medellinjen uppåt vid x = 0, precis som en vanlig sinuskurva.", "\\[f(x)=2\\sin(2x)+3\\]")],
    "En möjlig funktion är f(x) = 2sin(2x) + 3.",
    "Kontrollera modellen genom att läsa tillbaka amplitud, medellinje och period ur din funktion.", "Bestäm trigonometrisk funktion från graf och egenskaper");

  add("mato2-grund-1-15", 2, "trig_kurvor_radianer",
    "Bestäm period och asymptoter för tangens",
    "<p>Bestäm perioden och de två närmaste lodräta asymptoterna till f(x) = tan(2x).</p>",
    "Tangens har grundperioden π och saknar värde när cosinus i argumentet är noll.",
    [steg("Bestäm perioden", "För tan(bx) är perioden π/|b|.", "\\[T=\\frac\\pi2\\]"),
     steg("Bestäm asymptoterna", "2x = π/2 + nπ.", "\\[x=\\frac\\pi4+\\frac{n\\pi}{2}\\]"),
     steg("Välj de närmaste kring origo", "Ta n = 0 och n = −1.", "\\[x=\\frac\\pi4\\quad\\text{och}\\quad x=-\\frac\\pi4\\]")],
    "Perioden är π/2 och de närmaste asymptoterna är x = −π/4 och x = π/4.",
    "Tangens period är π, inte 2π.", "Period och asymptoter för tangensfunktioner");

  add("mato2-grund-2-06", 2, "trig_derivator",
    "Derivera trigonometriska funktioner",
    "<p>Derivera f(x) = 4sin x − 3cos x.</p>",
    "I radianmått gäller (sin x)′ = cos x och (cos x)′ = −sin x.",
    [steg("Derivera sinustermen", "Konstanten 4 följer med.", "\\[(4\\sin x)'=4\\cos x\\]"),
     steg("Derivera cosinustermen", "De två minustecknen ger plus.", "\\[(-3\\cos x)'=3\\sin x\\]"),
     steg("Sätt ihop", "Addera resultaten.", "\\[f'(x)=4\\cos x+3\\sin x\\]")],
    "f′(x) = 4cos x + 3sin x.",
    "Deriveringsformlerna i denna form förutsätter att vinkeln mäts i radianer.", "Derivering av trigonometriska funktioner");

  add("mato2-grund-1-17", 2, "trig_modeller",
    "Tolka en trigonometrisk modell",
    "<p>Temperaturen modelleras av T(t) = 6sin(πt/12 − π/2) + 14, där t är timmar efter midnatt. Bestäm medeltemperatur, amplitud och period.</p>",
    "I en sinusmodell är konstanten utanför sinus medellinjen, koefficientens belopp amplituden och perioden fås från koefficienten framför t.",
    [steg("Läs medelvärde och amplitud", "Den lodräta förskjutningen är 14 och sinuskoefficienten är 6.", "\\[T_{medel}=14,\\qquad A=6\\]"),
     steg("Bestäm perioden", "Här är b = π/12.", "\\[P=\\frac{2\\pi}{\\pi/12}=24\\text{ h}\\]"),
     steg("Tolka variationen", "Temperaturen varierar mellan 14 − 6 och 14 + 6.", "\\[8^\\circ\\text{C}\\le T\\le20^\\circ\\text{C}\\]")],
    "Medeltemperaturen är 14 °C, amplituden 6 °C och perioden 24 timmar.",
    "Fasförskjutningen påverkar när maximum inträffar, men inte amplitud eller period.", "Tolka och bestämma trigonometriska modeller");

  add("mato2-grund-1-18", 2, "trig_modeller",
    "Bestäm en tidpunkt i en periodisk modell",
    "<p>För modellen T(t) = 6sin(πt/12 − π/2) + 14, bestäm första tidpunkten efter midnatt då T = 14 °C.</p>",
    "När temperaturen är lika med medellinjen måste sinusdelen vara noll.",
    [steg("Sätt modellen lika med 14", "Subtrahera medellinjen och dividera med amplituden.", "\\[6\\sin\\left(\\frac{\\pi t}{12}-\\frac\\pi2\\right)=0\\]"),
     steg("Lös första nollstället", "Första möjliga argument efter midnatt är 0.", "\\[\\frac{\\pi t}{12}-\\frac\\pi2=0\\]"),
     steg("Lös ut tiden", "Addera π/2 och multiplicera med 12/π.", "\\[t=6\\]")],
    "Temperaturen är 14 °C första gången klockan 06.00.",
    "I en modell ska den matematiska lösningen alltid översättas tillbaka till tid och enhet.", "Tidpunkter och intervall i trigonometriska modeller");

  // Kapitel 2: Derivata
  add("mato2-grund-2-01", 3, "deriveringsregler",
    "Använd produktregeln",
    "<p>Derivera f(x) = x²eˣ.</p>",
    "När två funktioner multipliceras används produktregeln: (uv)′ = u′v + uv′.",
    [steg("Välj faktorer", "Låt u = x² och v = eˣ.", "\\[u'=2x,\\qquad v'=e^x\\]"),
     steg("Använd produktregeln", "Ta derivatan av en faktor i taget.", "\\[f'(x)=2xe^x+x^2e^x\\]"),
     steg("Faktorisera", "Bryt ut den gemensamma faktorn xeˣ.", "\\[f'(x)=xe^x(x+2)\\]")],
    "f′(x) = xeˣ(x + 2).",
    "Produktens derivata är inte produkten av derivatorna.", "Derivering med produktregeln");

  add("mato2-grund-2-02", 3, "deriveringsregler",
    "Använd kvotregeln",
    "<p>Derivera f(x) = (x + 1)/(x − 2).</p>",
    "För en kvot gäller (u/v)′ = (u′v − uv′)/v².",
    [steg("Bestäm delarna", "Låt u = x + 1 och v = x − 2.", "\\[u'=1,\\qquad v'=1\\]"),
     steg("Använd kvotregeln", "Täljaren kommer i ordningen u′v − uv′.", "\\[f'(x)=\\frac{1(x-2)-(x+1)1}{(x-2)^2}\\]"),
     steg("Förenkla", "Samla termerna i täljaren.", "\\[f'(x)=\\frac{-3}{(x-2)^2}\\]")],
    "f′(x) = −3/(x − 2)², för x ≠ 2.",
    "Nämnaren kvadreras, och minustecknet mellan täljarens produkter är avgörande.", "Derivering med kvotregeln");

  add("mato2-grund-2-03", 3, "kedjeregel_sammansatta",
    "Beräkna en sammansatt funktion",
    "<p>Funktionerna är f(x) = x² + 1 och g(x) = 3x − 2. Bestäm f(g(2)) och g(f(2)).</p>",
    "I f(g(x)) beräknas den inre funktionen g först. Ordningen kan inte bytas fritt.",
    [steg("Beräkna f(g(2))", "Börja med g(2) och sätt sedan resultatet i f.", "\\[g({\\color{#D1495B}{2}})=4,\\qquad f(4)=4^2+1=17\\]"),
     steg("Beräkna g(f(2))", "Börja nu med f(2).", "\\[f({\\color{#D1495B}{2}})=5,\\qquad g(5)=3\\cdot5-2=13\\]")],
    "f(g(2)) = 17 och g(f(2)) = 13.",
    "Sammansättning är normalt inte kommutativ: f(g(x)) och g(f(x)) är olika funktioner.", "Beräkna sammansatta funktioner");

  add("mato2-grund-2-04", 3, "kedjeregel_sammansatta",
    "Använd kedjeregeln",
    "<p>Derivera f(x) = (3x² − 1)⁵.</p>",
    "Kedjeregeln säger: derivera den yttre funktionen och multiplicera med den inre funktionens derivata.",
    [steg("Identifiera inre och yttre funktion", "Den inre funktionen är u = 3x² − 1 och den yttre är u⁵."),
     steg("Derivera båda nivåerna", "Yttre derivata är 5u⁴ och inre derivata är 6x.", "\\[f'(x)=5(3x^2-1)^4\\cdot6x\\]"),
     steg("Förenkla", "Multiplicera de numeriska faktorerna.", "\\[f'(x)=30x(3x^2-1)^4\\]")],
    "f′(x) = 30x(3x² − 1)⁴.",
    "Den inre derivatan 6x måste följa med; det är den vanligaste missade faktorn.", "Derivering med kedjeregeln");

  add("mato2-grund-2-05", 3, "derivator_specialfunktioner",
    "Derivera exponential- och logaritmfunktioner",
    "<p>Derivera f(x) = e^(2x) + ln(3x).</p>",
    "Använd standardderivatorna för eᵘ och ln u tillsammans med kedjeregeln.",
    [steg("Derivera exponentialtermen", "Den inre derivatan av 2x är 2.", "\\[(e^{2x})'=2e^{2x}\\]"),
     steg("Derivera logaritmtermen", "För ln u gäller derivatan u′/u.", "\\[(\\ln(3x))'=\\frac3{3x}=\\frac1x\\]"),
     steg("Sätt ihop", "Addera termernas derivator.", "\\[f'(x)=2e^{2x}+\\frac1x\\]")],
    "f′(x) = 2e^(2x) + 1/x, för x > 0.",
    "ln(3x) har inte derivatan 1/(3x); den inre derivatan 3 ska också multipliceras in.", "Derivering av logaritmfunktioner");

  add("mato2-grund-2-07", 3, "derivator_specialfunktioner",
    "Bestäm en tangent till en specialfunktion",
    "<p>Bestäm tangenten till f(x) = ln x vid x = 1.</p>",
    "En tangent bestäms av punkten (a, f(a)) och lutningen f′(a).",
    [steg("Bestäm punkten", "Sätt in x = 1 i funktionen.", "\\[f({\\color{#D1495B}{1}})=\\ln {\\color{#D1495B}{1}}=0\\]"),
     steg("Bestäm lutningen", "Derivatan är 1/x.", "\\[f'(x)=\\frac1x,\\qquad f'({\\color{#D1495B}{1}})=1\\]"),
     steg("Skriv tangenten", "Använd punkt–riktningsformen.", "\\[y-0=1(x-1)\\Rightarrow y=x-1\\]")],
    "Tangenten är y = x − 1.",
    "Funktionsvärdet ger punktens höjd; derivatavärdet ger tangentens lutning.", "Tangentproblem med specialfunktioner");

  add("mato2-grund-2-10", 3, "tillampningar_derivata",
    "Tolka en tangent i en tillämpning",
    "<p>Mängden läkemedel i kroppen modelleras av M(t) = 100e^(−0,2t) mg. Bestäm och tolka M′(3).</p>",
    "Derivatan ger den momentana förändringen av mängden per tidsenhet.",
    [steg("Derivera modellen", "Använd kedjeregeln.", "\\[M'(t)=-20e^{-0{,}2t}\\]"),
     steg("Sätt in t = 3", "Det insatta tidsvärdet markeras rött.", "\\[M'({\\color{#D1495B}{3}})=-20e^{-0{,}2\\cdot{\\color{#D1495B}{3}}}\\approx-11{,}0\\]"),
     steg("Tolka", "Minustecknet visar att mängden minskar.")],
    "Efter 3 timmar minskar mängden med ungefär 11,0 mg per timme.",
    "Ett derivatavärde ska tolkas med både tecken och enhet.", "Tangentproblem i tillämpningar");

  add("mato2-grund-2-11", 3, "grafer_asymptoter",
    "Analysera en graf med derivata",
    "<p>Undersök växande, avtagande och extrempunkter för f(x) = x³ − 3x.</p>",
    "Derivatans nollställen delar tallinjen i intervall där funktionen växer eller avtar.",
    [steg("Derivera och lös", "Bestäm de stationära x-värdena.", "\\[f'(x)=3x^2-3=3(x-1)(x+1)=0\\Rightarrow x=\\pm1\\]"),
     steg("Gör teckenkontroll", "Derivatan har tecknen plus, minus, plus.", "\\[f'(x):\\quad +\\;|_{-1}\\;-\\;|_1\\;+\\]"),
     steg("Beräkna punkterna", "Sätt in x-värdena i f.", "\\[f(-1)=2,\\qquad f(1)=-2\\]")],
    "f växer för x < −1 och x > 1, avtar för −1 < x < 1, har maximum (−1, 2) och minimum (1, −2).",
    "Derivatans tecken beskriver funktionens förändring, inte om själva funktionsvärdet är positivt eller negativt.", "Grafanalys med derivata");

  add("mato2-grund-2-12", 3, "grafer_asymptoter",
    "Bestäm asymptoter för en rationell funktion",
    "<p>Bestäm lodrät och vågrät asymptot till f(x) = (2x + 1)/(x − 1).</p>" + asymptotFigur,
    "En lodrät asymptot uppstår där nämnaren är noll utan att faktorn förkortas bort. När täljare och nämnare har samma grad ger kvoten mellan ledande koefficienter den vågräta asymptoten.",
    [steg("Bestäm lodrät asymptot", "Sätt nämnaren lika med noll.", "\\[x-1=0\\Rightarrow x=1\\]"),
     steg("Bestäm vågrät asymptot", "Kvoten mellan ledande koefficienter är 2/1.", "\\[y=2\\]"),
     steg("Kontrollera med omskrivning", "Polynomdivision visar avståndet till asymptoten.", "\\[f(x)=2+\\frac3{x-1}\\]")],
    "Asymptoterna är x = 1 och y = 2.",
    "Ett förbjudet x-värde kan ge ett hål i stället för en asymptot om motsvarande faktor förkortas bort.", "Asymptoter för rationella funktioner");

  add("mato2-grund-2-13", 3, "grafer_asymptoter",
    "Bestäm en sned asymptot med polynomdivision",
    "<p>Bestäm den sneda asymptoten till f(x) = (x² + 1)/(x − 1).</p>",
    "När täljarens grad är exakt ett större än nämnarens ger kvoten i polynomdivisionen en sned asymptot.",
    [steg("Dividera polynomen", "Skriv om täljaren med hjälp av nämnaren.", "\\[x^2+1=(x-1)(x+1)+2\\]"),
     steg("Skriv om funktionen", "Dela varje del med x − 1.", "\\[f(x)=x+1+\\frac2{x-1}\\]"),
     steg("Låt |x| växa", "Resttermen går mot noll.", "\\[y=x+1\\]")],
    "Den sneda asymptoten är y = x + 1.",
    "Den sneda asymptoten är kvoten, inte resten från polynomdivisionen.", "Asymptoter med polynomdivision");

  // Kapitel 3: Integraler
  add("mato2-grund-3-01", 4, "integralberakning",
    "Bestäm en primitiv funktion",
    "<p>Bestäm alla primitiva funktioner till f(x) = 3x² + 2cos x.</p>",
    "Integrera term för term. Potenser integreras med potensregeln baklänges och cosinus har sinus som primitiv funktion.",
    [steg("Integrera polynomtermen", "Höj exponenten och dividera med den nya exponenten.", "\\[\\int3x^2\\,dx=x^3\\]"),
     steg("Integrera cosinustermen", "Derivatan av sin x är cos x.", "\\[\\int2\\cos x\\,dx=2\\sin x\\]"),
     steg("Lägg till konstanten", "Alla primitiva funktioner skiljer sig med en konstant.", "\\[F(x)=x^3+2\\sin x+C\\]")],
    "F(x) = x³ + 2sin x + C.",
    "Glöm inte integrationskonstanten C när ingen undre och övre gräns finns.", "Bestäm primitiva funktioner");

  add("mato2-grund-3-02", 4, "integralberakning",
    "Beräkna en bestämd integral",
    "<p>Beräkna integralen från 0 till 2 av (3x² + 1) dx.</p>",
    "Bestäm först en primitiv funktion och beräkna sedan övre gränsens värde minus undre gränsens värde.",
    [steg("Bestäm en primitiv funktion", "Integrera term för term.", "\\[F(x)=x^3+x\\]"),
     steg("Sätt in gränserna", "Använd F(2) − F(0).", "\\[\\int_0^2(3x^2+1)\\,dx=[x^3+x]_0^2=(8+2)-0=10\\]")],
    "Integralen är 10.",
    "Ordningen är alltid övre gräns minus undre gräns.", "Beräkna bestämda integraler");

  add("mato2-grund-3-03", 4, "integralberakning",
    "Integrera en trigonometrisk funktion",
    "<p>Beräkna integralen från 0 till π av sin x dx.</p>",
    "Eftersom derivatan av cos x är −sin x är en primitiv funktion till sin x lika med −cos x.",
    [steg("Bestäm primitiv funktion", "Behåll minustecknet.", "\\[\\int\\sin x\\,dx=-\\cos x+C\\]"),
     steg("Sätt in gränserna", "Beräkna övre minus undre värde.", "\\[\\int_0^\\pi\\sin x\\,dx=[-\\cos x]_0^\\pi=-\\cos\\pi-(-\\cos0)=2\\]")],
    "Integralen är 2.",
    "Derivatan av −cos x är +sin x.", "Bestämda integraler med trigonometriska funktioner");

  add("mato2-grund-3-04", 4, "area_integraler",
    "Beräkna area mot x-axeln",
    "<p>Bestäm arean mellan grafen y = x − 1 och x-axeln för 0 ≤ x ≤ 2.</p>",
    "Grafen byter tecken vid x = 1. Geometrisk area kräver att delarna under och över x-axeln räknas positivt.",
    [steg("Dela vid nollstället", "x − 1 = 0 ger x = 1."),
     steg("Beräkna vänster del", "Funktionen är negativ mellan 0 och 1.", "\\[A_1=-\\int_0^1(x-1)\\,dx=\\frac12\\]"),
     steg("Beräkna höger del", "Funktionen är positiv mellan 1 och 2.", "\\[A_2=\\int_1^2(x-1)\\,dx=\\frac12\\]"),
     steg("Addera", "Båda delareorna är positiva.", "\\[A=A_1+A_2=1\\]")],
    "Arean är 1 areaenhet.",
    "En integral kan vara negativ eller noll; geometrisk area är alltid positiv.", "Area mot x-axeln med integral");

  add("mato2-grund-3-05", 4, "area_integraler",
    "Beräkna area mellan två kurvor",
    "<p>Bestäm arean mellan y = 2x och y = x².</p>" + areaFigur,
    "Bestäm först skärningspunkterna. Integrera sedan övre funktion minus undre funktion mellan dessa gränser.",
    [steg("Hitta skärningarna", "Sätt funktionerna lika.", "\\[2x=x^2\\Rightarrow x(x-2)=0\\Rightarrow x=0,2\\]"),
     steg("Avgör vilken graf som ligger överst", "Mellan 0 och 2 är 2x större än x²."),
     steg("Beräkna arean", "Integrera övre minus undre.", "\\[A=\\int_0^2(2x-x^2)\\,dx=\\left[x^2-\\frac{x^3}{3}\\right]_0^2=\\frac43\\]")],
    "Arean är 4/3 areaenheter.",
    "Skärningspunkternas x-värden blir integrationsgränserna.", "Area mellan kurvor med integral");

  add("mato2-grund-3-07", 4, "integral_tillampningar",
    "Beräkna volym från ett flöde",
    "<p>Vatten strömmar in med flödet q(t) = 3 + 2t liter per minut. Hur mycket vatten tillkommer under de första 5 minuterna?</p>",
    "Integralen av ett flöde över tid ger den sammanlagda volymförändringen.",
    [steg("Skriv integralen", "Integrera från t = 0 till t = 5.", "\\[\\Delta V=\\int_0^5(3+2t)\\,dt\\]"),
     steg("Beräkna", "En primitiv funktion är 3t + t².", "\\[\\Delta V=[3t+t^2]_0^5=15+25=40\\]")],
    "Det tillkommer 40 liter.",
    "Flöde multiplicerat med tid ger volym; enhetskontrollen hjälper dig välja rätt metod.", "Volym som integral av flöde");

  add("mato2-grund-3-08", 4, "integral_tillampningar",
    "Bestäm förflyttning och sträcka",
    "<p>En partikel har hastigheten v(t) = t − 2 m/s för 0 ≤ t ≤ 4. Bestäm förflyttning och tillryggalagd sträcka.</p>",
    "Integralen av hastigheten ger förflyttningen. För sträckan delas intervallet där hastigheten byter tecken och delarnas belopp adderas.",
    [steg("Hitta riktningsbytet", "v(t) = 0 när t = 2."),
     steg("Beräkna förflyttningen", "Integrera med tecken.", "\\[\\int_0^4(t-2)\\,dt=\\left[\\frac{t^2}{2}-2t\\right]_0^4=0\\]"),
     steg("Beräkna sträckan", "Delintegralerna är −2 och 2.", "\\[s=|-2|+|2|=4\\text{ m}\\]")],
    "Förflyttningen är 0 m och sträckan är 4 m.",
    "Rörelse åt olika håll kan ta ut sig i förflyttningen men aldrig i sträckan.", "Sträcka som integral av hastighet");

  add("mato2-grund-3-09", 4, "integral_tillampningar",
    "Beräkna energi från effekt",
    "<p>Effekten är P(t) = 100 + 20t watt under 0 ≤ t ≤ 10 sekunder. Bestäm energin.</p>",
    "Energi är integralen av effekt med avseende på tiden. Watt gånger sekund blir joule.",
    [steg("Skriv integralen", "Integrera effekten över tidsintervallet.", "\\[E=\\int_0^{10}(100+20t)\\,dt\\]"),
     steg("Beräkna", "En primitiv funktion är 100t + 10t².", "\\[E=[100t+10t^2]_0^{10}=1000+1000=2000\\text{ J}\\]")],
    "Energin är 2 000 J.",
    "Skriv enheten efter integrationen; W·s är samma sak som J.", "Energi som integral av effekt");

  add("mato2-grund-3-10", 4, "sannolikhetsintegraler",
    "Normalisera en täthetsfunktion",
    "<p>Funktionen f(x) = kx för 0 ≤ x ≤ 2 och f(x) = 0 annars ska vara en täthetsfunktion. Bestäm k.</p>" + tathetFigur,
    "En täthetsfunktion är aldrig negativ och den totala arean under grafen måste vara 1.",
    [steg("Sätt total integral till 1", "Integrera över hela intervallet.", "\\[\\int_0^2kx\\,dx=1\\]"),
     steg("Beräkna integralen", "k är en konstant.", "\\[k\\left[\\frac{x^2}{2}\\right]_0^2=2k=1\\]"),
     steg("Lös ut k", "Dela med 2.", "\\[k=\\frac12\\]")],
    "k = 1/2.",
    "Funktionsvärdet f(x) är en täthet, medan sannolikhet motsvarar area under grafen.", "Normalisera täthetsfunktion och bestäm parameter");

  add("mato2-grund-3-11", 4, "sannolikhetsintegraler",
    "Beräkna sannolikhet från en täthet",
    "<p>En stokastisk variabel har tätheten f(x) = x/2 för 0 ≤ x ≤ 2. Bestäm P(X ≤ 1).</p>",
    "Sannolikheten för ett intervall är integralen av täthetsfunktionen över intervallet.",
    [steg("Skriv sannolikheten som integral", "Använd gränserna 0 och 1.", "\\[P(X\\le1)=\\int_0^1\\frac{x}{2}\\,dx\\]"),
     steg("Beräkna", "En primitiv funktion är x²/4.", "\\[P(X\\le1)=\\left[\\frac{x^2}{4}\\right]_0^1=\\frac14\\]")],
    "P(X ≤ 1) = 1/4 = 0,25.",
    "En sannolikhet ska alltid ligga mellan 0 och 1.", "Sannolikhet och kvantiler från täthetsfunktion");

  add("mato2-grund-3-12", 4, "rotationsvolymer",
    "Beräkna en rotationsvolym",
    "<p>Området under y = x för 0 ≤ x ≤ 2 roteras kring x-axeln. Bestäm volymen.</p>" + rotationFigur,
    "Vid rotation kring x-axeln bildar varje funktionsvärde en cirkelskiva med area π[f(x)]².",
    [steg("Skriv volymintegralen", "Kvadrera radien y = x.", "\\[V=\\pi\\int_0^2x^2\\,dx\\]"),
     steg("Beräkna", "En primitiv funktion till x² är x³/3.", "\\[V=\\pi\\left[\\frac{x^3}{3}\\right]_0^2=\\frac{8\\pi}{3}\\]")],
    "Volymen är 8π/3 volymenheter.",
    "Det är funktionsvärdet som kvadreras, inte integrationsgränserna.", "Rotationsvolymer");

  // Kapitel 4: Komplexa tal
  add("mato2-grund-4-01", 5, "komplex_aritmetik",
    "Räkna med komplexa tal",
    "<p>Låt z = 3 + 4i och w = 1 − 2i. Bestäm z + w och zw.</p>",
    "Reella delar räknas tillsammans och imaginära delar tillsammans. Vid multiplikation används i² = −1.",
    [steg("Addera", "Samla realdel och imaginärdel var för sig.", "\\[z+w=(3+1)+(4-2)i=4+2i\\]"),
     steg("Multiplicera", "Multiplicera parenteserna och ersätt i² med −1.", "\\[zw=(3+4i)(1-2i)=3-6i+4i-8i^2=11-2i\\]")],
    "z + w = 4 + 2i och zw = 11 − 2i.",
    "Skriv alltid om i² till −1 innan du samlar real- och imaginärdel.", "Räkna med komplexa tal");

  add("mato2-grund-4-02", 5, "komplex_aritmetik",
    "Bestäm konjugat och absolutbelopp",
    "<p>Bestäm konjugatet och absolutbeloppet till z = 3 + 4i.</p>" + komplexFigur,
    "Konjugatet byter tecken på imaginärdelen. Absolutbeloppet är avståndet från origo till punkten i det komplexa talplanet.",
    [steg("Bestäm konjugatet", "Behåll realdelen och byt tecken på imaginärdelen.", "\\[\\bar z=3-4i\\]"),
     steg("Bestäm absolutbeloppet", "Använd Pythagoras sats.", "\\[|z|=\\sqrt{3^2+4^2}=5\\]")],
    "Konjugatet är 3 − 4i och |z| = 5.",
    "Absolutbeloppet av ett komplext tal är ett icke-negativt reellt tal.", "Konjugat och absolutbelopp av komplexa tal");

  add("mato2-grund-4-03", 5, "komplex_aritmetik",
    "Dividera komplexa tal",
    "<p>Beräkna (3 + 4i)/(1 − i) och skriv svaret på formen a + bi.</p>",
    "Förläng bråket med nämnarens konjugat. Då blir nämnaren reell.",
    [steg("Förläng med konjugatet", "Konjugatet till 1 − i är 1 + i.", "\\[\\frac{3+4i}{1-i}\\cdot\\frac{1+i}{1+i}\\]"),
     steg("Beräkna täljare och nämnare", "Använd i² = −1.", "\\[\\frac{(3+4i)(1+i)}{(1-i)(1+i)}=\\frac{-1+7i}{2}\\]"),
     steg("Skriv på standardform", "Dela båda termerna med 2.", "\\[-\\frac12+\\frac72i\\]")],
    "Kvoten är −1/2 + (7/2)i.",
    "Förläng både täljare och nämnare med samma konjugat.", "Division av komplexa tal");

  add("mato2-grund-4-04", 5, "komplex_aritmetik",
    "Beräkna en potens av i",
    "<p>Beräkna i²³.</p>",
    "Potenserna av i upprepas i en cykel med fyra steg: i, −1, −i, 1.",
    [steg("Dela exponenten med 4", "23 = 4·5 + 3, så resten är 3."),
     steg("Använd cykeln", "i²³ har samma värde som i³.", "\\[i^{23}=i^{20}i^3=(i^4)^5i^3=-i\\]")],
    "i²³ = −i.",
    "Det är resten vid division med 4 som bestämmer vilken potens i cykeln du får.", "Potenser med komplexa tal");

  add("mato2-grund-4-05", 5, "komplexa_talplanet",
    "Tolka komplexa tal som punkter",
    "<p>Markera z = 3 + 4i i det komplexa talplanet och bestäm avståndet till origo.</p>" + komplexFigur,
    "Realdelen är den vågräta koordinaten och imaginärdelen är den lodräta koordinaten.",
    [steg("Läs koordinaterna", "z = 3 + 4i motsvarar punkten (3, 4)."),
     steg("Beräkna avståndet", "Använd Pythagoras sats.", "\\[d=|z|=\\sqrt{3^2+4^2}=5\\]")],
    "Punkten är (3, 4) och avståndet till origo är 5.",
    "Imaginärdelen 4 är en reell koordinat på Im-axeln; koordinaten skrivs inte som 4i.", "Geometri och ortslinjer i komplexa talplanet");

  add("mato2-grund-4-06", 5, "komplexa_talplanet",
    "Tolka en ortslinje",
    "<p>Beskriv mängden av komplexa tal som uppfyller |z − 2| = 3.</p>",
    "Uttrycket |z − z₀| är avståndet mellan punkten z och den fasta punkten z₀.",
    [steg("Identifiera centrum", "z₀ = 2 + 0i motsvarar punkten (2, 0)."),
     steg("Identifiera avståndet", "Alla punkter ska ligga på avståndet 3 från centrum."),
     steg("Beskriv ortslinjen", "Ett fast avstånd från en punkt ger en cirkel.", "\\[(x-2)^2+y^2=9\\]")],
    "Ortslinjen är cirkeln med centrum (2, 0) och radie 3.",
    "Likhet ger själva cirkeln; ≤ skulle ge hela cirkelskivan.", "Geometri och ortslinjer i komplexa talplanet");

  add("mato2-grund-4-07", 5, "komplexa_talplanet",
    "Tolka multiplikation som rotation",
    "<p>Punkten z = 2 + i multipliceras med i. Bestäm den nya punkten och beskriv avbildningen.</p>",
    "Multiplikation med i roterar ett komplext tal 90° moturs kring origo utan att ändra längden.",
    [steg("Multiplicera", "Använd i² = −1.", "\\[iz=i(2+i)=2i+i^2=-1+2i\\]"),
     steg("Läs den nya punkten", "−1 + 2i motsvarar (−1, 2)."),
     steg("Beskriv transformationen", "Punkten (2, 1) har roterats 90° moturs till (−1, 2).")],
    "Den nya punkten är (−1, 2); avbildningen är en rotation 90° moturs.",
    "Multiplikation med ett komplext tal kan både skala och rotera; i har absolutbelopp 1 och argument π/2.", "Avbildningar, rotation och skalning med komplexa tal");

  add("mato2-grund-4-08", 5, "polar_exponentiell",
    "Växla till polär form",
    "<p>Skriv z = −1 + √3i på polär och exponentiell form.</p>",
    "Polär form bestäms av absolutbeloppet r och argumentet v. Punkten ligger här i andra kvadranten.",
    [steg("Bestäm absolutbeloppet", "Använd Pythagoras sats.", "\\[r=\\sqrt{(-1)^2+(\\sqrt3)^2}=2\\]"),
     steg("Bestäm argumentet", "Referensvinkeln är π/3 och punkten ligger i andra kvadranten.", "\\[v=\\frac{2\\pi}{3}\\]"),
     steg("Skriv formerna", "Använd cos v + i sin v respektive e^(iv).", "\\[z=2\\left(\\cos\\frac{2\\pi}{3}+i\\sin\\frac{2\\pi}{3}\\right)=2e^{i2\\pi/3}\\]")],
    "z = 2(cos(2π/3) + i sin(2π/3)) = 2e^(i2π/3).",
    "Arctan ensam kan ge fel kvadrant; använd tecknen på real- och imaginärdel.", "Växla mellan former för komplexa tal");

  add("mato2-grund-4-09", 5, "polar_exponentiell",
    "Använd Eulers formel",
    "<p>Visa med Eulers formel att e^(iπ) = −1.</p>",
    "Eulers formel kopplar exponentialformen till trigonometri: e^(iv) = cos v + i sin v.",
    [steg("Sätt in v = π", "Använd Eulers formel.", "\\[e^{i\\pi}=\\cos\\pi+i\\sin\\pi\\]"),
     steg("Använd exakta värden", "cos π = −1 och sin π = 0.", "\\[e^{i\\pi}=-1+i\\cdot0=-1\\]")],
    "e^(iπ) = −1.",
    "Exponentens vinkel är argumentet; absolutbeloppet för e^(iv) är 1.", "Eulers formel");

  add("mato2-grund-4-10", 5, "polar_exponentiell",
    "Multiplicera i exponentiell form",
    "<p>Beräkna (2e^(iπ/3))(3e^(−iπ/6)).</p>",
    "Vid multiplikation multipliceras absolutbeloppen och argumenten adderas.",
    [steg("Multiplicera absolutbeloppen", "2·3 = 6."),
     steg("Addera argumenten", "π/3 − π/6 = π/6.", "\\[\\frac\\pi3-\\frac\\pi6=\\frac\\pi6\\]"),
     steg("Skriv resultatet", "Behåll exponentiell form.", "\\[6e^{i\\pi/6}\\]")],
    "Produkten är 6e^(iπ/6).",
    "Vid division divideras absolutbeloppen och argumenten subtraheras.", "Multiplikation och division i polär form");

  add("mato2-grund-4-11", 5, "potenser_rotter",
    "Beräkna en potens med de Moivres formel",
    "<p>Beräkna (1 + i)⁶.</p>",
    "Skriv talet i polär form. De Moivres formel säger att (r(cos v + i sin v))ⁿ = rⁿ(cos nv + i sin nv).",
    [steg("Skriv basen i polär form", "Absolutbeloppet är √2 och argumentet π/4.", "\\[1+i=\\sqrt2\\left(\\cos\\frac\\pi4+i\\sin\\frac\\pi4\\right)\\]"),
     steg("Upphöj", "Upphöj r och multiplicera vinkeln med 6.", "\\[(1+i)^6=(\\sqrt2)^6\\left(\\cos\\frac{3\\pi}{2}+i\\sin\\frac{3\\pi}{2}\\right)\\]"),
     steg("Förenkla", "(√2)⁶ = 8, cos(3π/2) = 0 och sin(3π/2) = −1.", "\\[(1+i)^6=-8i\\]")],
    "(1 + i)⁶ = −8i.",
    "Både absolutbeloppet och argumentet påverkas av exponenten.", "Potenser av komplexa tal med de Moivres formel");

  add("mato2-grund-4-12", 5, "potenser_rotter",
    "Bestäm alla komplexa rötter",
    "<p>Lös z³ = 8 i de komplexa talen.</p>",
    "En tredjegradsekvation av typen z³ = re^(iv) har tre rötter med samma absolutbelopp och jämnt fördelade argument.",
    [steg("Skriv högerledet polärt", "8 har argumentet 0, men även 2πk.", "\\[8=8e^{i2\\pi k}\\]"),
     steg("Ta tredje roten", "Absolutbeloppet blir 2 och vinklarna delas med 3.", "\\[z_k=2e^{i2\\pi k/3},\\qquad k=0,1,2\\]"),
     steg("Skriv på rektangulär form", "Använd vinklarna 0, 2π/3 och 4π/3.", "\\[z=2,\\quad z=-1+i\\sqrt3,\\quad z=-1-i\\sqrt3\\]")],
    "Rötterna är 2, −1 + i√3 och −1 − i√3.",
    "En n:tegradsekvation ger n jämnt fördelade rötter när högerledet inte är noll.", "Komplexa rötter med de Moivres formel");

  add("mato2-grund-4-13", 5, "polynom_komplexa",
    "Använd faktorsatsen",
    "<p>Visa att x = 2 är ett nollställe till p(x) = x³ − 4x² + x + 6 och faktorisera polynomet helt.</p>",
    "Faktorsatsen säger att p(a) = 0 precis när x − a är en faktor.",
    [steg("Kontrollera nollstället", "Sätt in x = 2. Det insatta värdet markeras rött.", "\\[p({\\color{#D1495B}{2}})={\\color{#D1495B}{2}}^3-4\\cdot{\\color{#D1495B}{2}}^2+{\\color{#D1495B}{2}}+6=0\\]"),
     steg("Dividera med x − 2", "Kvoten blir x² − 2x − 3.", "\\[p(x)=(x-2)(x^2-2x-3)\\]"),
     steg("Faktorisera kvoten", "Sök två tal med produkt −3 och summa −2.", "\\[p(x)=(x-2)(x-3)(x+1)\\]")],
    "p(x) = (x − 2)(x − 3)(x + 1).",
    "Att ett insatt värde ger noll visar både ett nollställe och en motsvarande faktor.", "Faktorsatsen, faktorisering och polynomrötter");

  add("mato2-grund-4-14", 5, "polynom_komplexa",
    "Utför polynomdivision",
    "<p>Dividera 2x³ + 3x² − 5x + 6 med x + 2.</p>",
    "Polynomdivision ger en kvot och en rest vars grad är lägre än nämnarens grad.",
    [steg("Bestäm första termen", "2x³/x = 2x². Multiplicera tillbaka och subtrahera."),
     steg("Fortsätt term för term", "Nästa termer i kvoten blir −x och −3."),
     steg("Skriv resultatet", "Resten blir 12.", "\\[2x^3+3x^2-5x+6=(x+2)(2x^2-x-3)+12\\]")],
    "Kvoten är 2x² − x − 3 och resten är 12.",
    "Kontrollera genom att multiplicera nämnaren med kvoten och sedan lägga till resten.", "Polynomdivision");

  add("mato2-grund-4-15", 5, "polynom_komplexa",
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
    "Läs exakta värden i enhetscirkeln":"<p>Bestäm exakt \\(\\cos120^\\circ\\), \\(\\sin120^\\circ\\) och \\(\\tan120^\\circ\\).</p>",
    "Använd symmetri och periodicitet":"<p>Bestäm exakt \\(\\sin(-30^\\circ)\\) och \\(\\cos390^\\circ\\).</p>",
    "Bestäm ett trigonometriskt värde från ett annat":"<p>Vinkeln \\(v\\) ligger i andra kvadranten och \\(\\sin v=3/5\\). Bestäm \\(\\cos v\\) exakt.</p>",
    "Omvandla mellan grader och radianer":"<p>Omvandla \\(150^\\circ\\) till radianer och \\(7\\pi/6\\) radianer till grader.</p>",
    "Beräkna båglängd och sektorarea":"<p>En cirkel har radien \\(6\\) cm och medelpunktsvinkeln \\(\\pi/3\\) radianer. Bestäm båglängden och sektorns area.</p>",
    "Använd trigonometriska ettan":"<p>Förenkla uttrycket \\(1-\\sin^2x\\).</p>",
    "Använd en additionsformel":"<p>Bestäm exakt \\(\\sin75^\\circ\\).</p>",
    "Använd formeln för dubbla vinkeln":"<p>Vinkeln \\(x\\) ligger i första kvadranten och \\(\\sin x=3/5\\). Bestäm \\(\\sin2x\\) exakt.</p>",
    "Lös en grundläggande trigonometrisk ekvation":"<p>Lös \\(\\sin x=1/2\\) för \\(0^\\circ\\le x<360^\\circ\\).</p>",
    "Skriv den generella lösningen":"<p>Lös \\(\\cos x=-1/2\\). Ange alla lösningar.</p>",
    "Faktorisera en trigonometrisk ekvation":"<p>Lös \\(2\\sin^2x-\\sin x=0\\) för \\(0^\\circ\\le x<360^\\circ\\).</p>",
    "Använd andragradssubstitution":"<p>Lös \\(2\\cos^2x-3\\cos x+1=0\\) för \\(0^\\circ\\le x<360^\\circ\\).</p>",
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

/* Moment och delmoment enligt Planering Ma4 24-25/25-26 (2026-10-01).
   Varje genomgång pekar på sitt nya moment (omr) och delmoment (traningsfamilj). */
(() => {
  const bank=window.TYPUPPGIFTER_MATO2;
  const nya=[
    ["mato2-grund-1-01",1,"enhetscirkeln_trianglar","Exakta trigonometriska värden i enhetscirkeln"],
    ["mato2-grund-1-02",1,"enhetscirkeln_formler","Symmetrier och periodicitet i enhetscirkeln"],
    ["mato2-grund-1-03",1,"enhetscirkeln_formler","Bestäm trigonometriska värden från ett givet värde"],
    ["mato2-grund-1-21",2,"sinus_cosinuskurvor","Sinus- och cosinuskurvor i grader"],
    ["mato2-grund-1-22",2,"sinusformad_kurva","Bestäm trigonometrisk funktion från graf och egenskaper"],
    ["mato2-grund-1-23",2,"tan_kurvan","Period och asymptoter för tangensfunktioner"],
    ["mato2-grund-1-24",2,"sinus_cosinuskurvor","Sinus- och cosinuskurvor i grader"],
    ["mato2-grund-1-25",2,"forskjutna_kurvor","Fasförskjutning i trigonometriska funktioner"],
    ["mato2-grund-1-26",2,"forskjutna_kurvor","Fasförskjutning i trigonometriska funktioner"],
    ["mato2-grund-1-04",2,"radianbegreppet","Omvandling mellan grader och radianer"],
    ["mato2-grund-1-05",2,"cirkelsektorn","Båglängd, sektorarea och radianer"],
    ["mato2-grund-1-06",1,"trig_identiteter","Trigonometriska ettan och identiteter"],
    ["mato2-grund-1-07",1,"additionsformler","Använda additionsformler för sinus och cosinus"],
    ["mato2-grund-1-08",1,"dubbla_vinkeln","Använda formler för dubbla vinkeln"],
    ["mato2-grund-1-09",1,"trig_grundekvationer","Grundläggande trigonometriska ekvationer"],
    ["mato2-grund-1-10",1,"trig_grundekvationer","Trigonometriska ekvationer med generell lösning"],
    ["mato2-grund-1-11",1,"trig_ekv_formler","Trigonometriska ekvationer med identiteter och faktorisering"],
    ["mato2-grund-1-12",1,"trig_ekv_formler","Trigonometriska ekvationer med andragradssubstitution"],
    ["mato2-grund-1-13",2,"kurvor_radianer","Amplitud, period och medellinje för trigonometriska funktioner"],
    ["mato2-grund-1-14",2,"kurvor_radianer","Fasförskjutning i trigonometriska funktioner"],
    ["mato2-grund-1-14b",2,"kurvor_radianer","Bestäm trigonometrisk funktion från graf och egenskaper"],
    ["mato2-grund-1-15",2,"kurvor_radianer","Period och asymptoter för tangensfunktioner"],
    ["mato2-grund-2-06",2,"derivatan_sin_cos","Derivering av trigonometriska funktioner"],
    ["mato2-grund-1-17",2,"trig_problemlosning_2","Tolka och bestämma trigonometriska modeller"],
    ["mato2-grund-1-18",2,"trig_problemlosning_2","Tidpunkter och intervall i trigonometriska modeller"],
    ["mato2-grund-2-01",3,"produktregeln","Derivering med produktregeln"],
    ["mato2-grund-2-02",3,"kvotregeln","Derivering med kvotregeln"],
    ["mato2-grund-2-03",2,"derivata_sammansatta","Beräkna sammansatta funktioner"],
    ["mato2-grund-2-04",2,"derivata_sammansatta","Derivering med kedjeregeln"],
    ["mato2-grund-2-05",3,"exp_log_derivata","Derivering av specialfunktioner"],
    ["mato2-grund-2-07",3,"exp_log_derivata","Tangentproblem med specialfunktioner"],
    ["mato2-grund-2-10",3,"derivata_problemlosning","Tangentproblem i tillämpningar"],
    ["mato2-grund-2-11",3,"grafer_derivator","Grafanalys med derivata"],
    ["mato2-grund-2-12",3,"kurvor_asymptoter","Asymptoter för rationella funktioner"],
    ["mato2-grund-2-13",3,"sneda_asymptoter","Asymptoter med polynomdivision"],
    ["mato2-grund-3-01",4,"integraler_primitiva","Bestäm primitiva funktioner"],
    ["mato2-grund-3-02",4,"integraler_primitiva","Beräkna bestämda integraler"],
    ["mato2-grund-3-03",4,"integraler_primitiva","Bestämda integraler med trigonometriska funktioner"],
    ["mato2-grund-3-04",4,"integraler_areor","Area mot x-axeln med integral"],
    ["mato2-grund-3-05",4,"areor_mellan_kurvor","Area mellan kurvor med integral"],
    ["mato2-grund-3-07",4,"integraler_storheter","Volym som integral av flöde"],
    ["mato2-grund-3-08",4,"integraler_storheter","Sträcka som integral av hastighet"],
    ["mato2-grund-3-09",4,"integraler_storheter","Energi som integral av effekt"],
    ["mato2-grund-3-10",4,"sannolikhetsfordelning","Normalisera täthetsfunktion och bestäm parameter"],
    ["mato2-grund-3-11",4,"sannolikhetsfordelning","Sannolikhet och kvantiler från täthetsfunktion"],
    ["mato2-grund-3-12",4,"skivmetoden","Rotationsvolymer"],
    ["mato2-grund-4-01",5,"konjugat_raknesatt","Räkna med komplexa tal"],
    ["mato2-grund-4-02",5,"konjugat_raknesatt","Konjugat och absolutbelopp av komplexa tal"],
    ["mato2-grund-4-03",5,"konjugat_raknesatt","Division av komplexa tal"],
    ["mato2-grund-4-04",5,"imaginara_tal","Imaginära tal och potenser av i"],
    ["mato2-grund-4-05",5,"komplexa_vektorer","Komplexa tal som punkter och vektorer"],
    ["mato2-grund-4-06",5,"avlasa_rita","Ortslinjer och områden i komplexa talplanet"],
    ["mato2-grund-4-07",5,"mult_div_polar","Avbildningar, rotation och skalning med komplexa tal"],
    ["mato2-grund-4-08",5,"polar_form","Växla mellan former för komplexa tal"],
    ["mato2-grund-4-09",5,"eulers_formel","Eulers formel"],
    ["mato2-grund-4-10",5,"mult_div_polar","Multiplikation och division i polär form"],
    ["mato2-grund-4-11",5,"de_moivre","Potenser av komplexa tal med de Moivres formel"],
    ["mato2-grund-4-12",5,"ekvationen_zn","Komplexa rötter med de Moivres formel"],
    ["mato2-grund-4-13",5,"faktorsatsen","Faktorsatsen och faktorisering"],
    ["mato2-grund-4-14",5,"polynomdivision","Polynomdivision"],
    ["mato2-grund-4-15",5,"andragradsekv_komplexa","Andragradsekvationer med komplexa lösningar"]
  ];
  nya.forEach(([nyckel,kap,omr,familj])=>{
    const g=bank[nyckel];
    if(!g) return;
    g.kap=kap; g.omr=omr; g.traningsfamilj=familj;
  });
})();
