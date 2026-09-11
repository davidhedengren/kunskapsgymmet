/* Grundgenomgångar för Fysik nivå 2 i Kunskapsgymmet.
 * Ordningen i filen är den rekommenderade läsordningen.
 * Varje träningslänk pekar på en befintlig E-familj i uppgiftsbanken.
 */
(() => {
  const bank = {};
  let nr = 0;
  const steg = (rubrik, text, matte, figur) => ({rubrik, text, ...(matte ? {matte} : {}), ...(figur ? {figur} : {})});
  const add = (kap, omr, rubrik, t, ram, steglista, svar, komihag, traningsfamilj, fallgrop) => {
    nr += 1;
    bank[`fy2-grund-${String(nr).padStart(2,"0")}`] = {
      kap, omr, rubrik, niva:"E", t, ram, steg:steglista, svar, komihag,
      ...(fallgrop ? {fallgrop} : {}), traningsfamilj
    };
  };

  const cirkelFigur = '<svg class="dg" viewBox="0 0 360 190" role="img" aria-label="Cirkelrörelse med tangentiell hastighet uppåt och acceleration mot centrum"><circle class="dg-linje" cx="180" cy="98" r="62"/><circle class="dg-vald" cx="242" cy="98" r="6"/><line class="dg-hjalp" x1="180" y1="98" x2="242" y2="98"/><line class="dg-vek1" x1="242" y1="91" x2="242" y2="42"/><path class="dg-spets1" d="M242 31l-7 14h14z"/><line class="dg-vek2" x1="235" y1="98" x2="194" y2="98"/><path class="dg-spets2" d="M183 98l14-7v14z"/><text class="dg-txt" x="253" y="43">v</text><text class="dg-txt" x="205" y="88">a</text><text class="dg-txt" x="207" y="116">r</text></svg>';
  const vagFigur = '<svg viewBox="0 0 420 160" role="img" aria-label="Sinusvåg med våglängd och amplitud"><line class="dg-axel" x1="25" y1="82" x2="395" y2="82"/><path class="dg-linje" d="M25 82 C55 22 85 22 115 82 S175 142 205 82 S265 22 295 82 S355 142 385 82"/><line class="dg-delta" x1="85" y1="28" x2="265" y2="28"/><text class="dg-txt" x="175" y="20">λ</text><line class="dg-delta" x1="40" y1="82" x2="40" y2="31"/><text class="dg-txt" x="49" y="55">A</text></svg>';
  const faltFigur = '<svg viewBox="0 0 380 175" role="img" aria-label="Positiv laddning i magnetfält riktat in i skärmen"><g class="dg-txt" font-size="18"><text x="55" y="45">×</text><text x="135" y="45">×</text><text x="215" y="45">×</text><text x="295" y="45">×</text><text x="55" y="125">×</text><text x="135" y="125">×</text><text x="215" y="125">×</text><text x="295" y="125">×</text></g><circle class="dg-vald" cx="120" cy="85" r="9"/><text class="dg-etikett" x="116" y="90">+</text><line class="dg-pil" x1="130" y1="85" x2="210" y2="85"/><line class="dg-pil" x1="120" y1="75" x2="120" y2="25"/><text class="dg-txt" x="215" y="91">v</text><text class="dg-txt" x="128" y="24">F</text></svg>';
  const komponentFigur = '<svg class="dg" viewBox="0 0 420 225" role="img" aria-label="Begynnelsehastigheten uppdelad i en vågrät och en lodrät komponent"><line class="dg-axel" x1="58" y1="181" x2="374" y2="181"/><path class="dg-pil" d="M383 181l-14-7v14z"/><line class="dg-axel" x1="58" y1="181" x2="58" y2="30"/><path class="dg-pil" d="M58 20l-7 14h14z"/><line class="dg-vek1" x1="58" y1="181" x2="302" y2="61"/><path class="dg-spets1" d="M312 56l-15 1 7 13z"/><line class="dg-vek2" x1="58" y1="181" x2="302" y2="181"/><path class="dg-sp2" d="M313 181l-14-7v14z"/><line class="dg-vek3" x1="302" y1="181" x2="302" y2="68"/><path class="dg-spets3" d="M302 57l-7 14h14z"/><line class="dg-hjalp" x1="302" y1="61" x2="302" y2="181"/><path class="dg-vinkel" d="M105 181 A47 47 0 0 0 100 160"/><text class="dg-avl" x="108" y="160">α</text><text class="dg-txt" x="190" y="171">v₀x = v₀ cos α</text><text class="dg-txt" x="310" y="125">v₀y = v₀ sin α</text><text class="dg-txt" x="174" y="94">v₀</text><text class="dg-txt" x="377" y="201">x</text><text class="dg-txt" x="39" y="29">y</text></svg>';
  const strangFigur = '<svg class="dg" viewBox="0 0 500 250" role="img" aria-label="Grundton och två övertoner på en sträng med markerade noder och bukar"><text class="dg-txt" x="16" y="48">grundton</text><line class="dg-hjalp" x1="120" y1="43" x2="472" y2="43"/><path class="dg-linje" d="M120 43 C208 -17 384 -17 472 43"/><g class="dg-nod"><circle cx="120" cy="43" r="5"/><circle cx="472" cy="43" r="5"/></g><text class="dg-avl" x="292" y="17">buk</text><text class="dg-txt" x="16" y="126">1:a övertonen</text><line class="dg-hjalp" x1="120" y1="121" x2="472" y2="121"/><path class="dg-linje" d="M120 121 C164 77 252 77 296 121 C340 165 428 165 472 121"/><g class="dg-nod"><circle cx="120" cy="121" r="5"/><circle cx="296" cy="121" r="5"/><circle cx="472" cy="121" r="5"/></g><text class="dg-avl" x="203" y="88">buk</text><text class="dg-avl" x="382" y="162">buk</text><text class="dg-txt" x="16" y="211">2:a övertonen</text><line class="dg-hjalp" x1="120" y1="206" x2="472" y2="206"/><path class="dg-linje" d="M120 206 C149 174 208 174 237 206 C266 238 325 238 354 206 C383 174 443 174 472 206"/><g class="dg-nod"><circle cx="120" cy="206" r="5"/><circle cx="237" cy="206" r="5"/><circle cx="354" cy="206" r="5"/><circle cx="472" cy="206" r="5"/></g><text class="dg-not" x="391" y="244">● = nod</text></svg>';
  const oppenPipaFigur = '<svg class="dg" viewBox="0 0 500 245" role="img" aria-label="Grundton och övertoner i en öppen pipa med buk vid båda ändarna"><text class="dg-txt" x="16" y="45">grundton f₁</text><line class="dg-form" x1="120" y1="18" x2="120" y2="68"/><line class="dg-form" x1="472" y1="18" x2="472" y2="68"/><line class="dg-hjalp" x1="120" y1="43" x2="472" y2="43"/><path class="dg-linje" d="M120 18 C208 18 208 43 296 43 C384 43 384 68 472 68"/><text class="dg-avl" x="112" y="14">B</text><text class="dg-avl" x="288" y="38">N</text><text class="dg-avl" x="469" y="82">B</text><text class="dg-txt" x="16" y="126">1:a övertonen f₂</text><line class="dg-form" x1="120" y1="96" x2="120" y2="146"/><line class="dg-form" x1="472" y1="96" x2="472" y2="146"/><line class="dg-hjalp" x1="120" y1="121" x2="472" y2="121"/><path class="dg-linje" d="M120 96 C164 96 164 121 208 121 C252 121 252 146 296 146 C340 146 340 121 384 121 C428 121 428 96 472 96"/><text class="dg-avl" x="112" y="92">B</text><text class="dg-avl" x="202" y="116">N</text><text class="dg-avl" x="290" y="160">B</text><text class="dg-avl" x="379" y="116">N</text><text class="dg-avl" x="469" y="92">B</text><text class="dg-txt" x="16" y="210">2:a övertonen f₃</text><line class="dg-form" x1="120" y1="180" x2="120" y2="230"/><line class="dg-form" x1="472" y1="180" x2="472" y2="230"/><line class="dg-hjalp" x1="120" y1="205" x2="472" y2="205"/><path class="dg-linje" d="M120 180 C149 180 149 205 179 205 C208 205 208 230 237 230 C266 230 266 205 296 205 C325 205 325 180 354 180 C383 180 383 205 413 205 C442 205 442 230 472 230"/><text class="dg-not" x="352" y="241">B = buk · N = nod</text></svg>';
  const stangdPipaFigur = '<svg class="dg" viewBox="0 0 500 175" role="img" aria-label="Grundton och första tillåtna överton i en pipa som är stängd i ena änden"><text class="dg-txt" x="16" y="48">grundton f₁</text><line class="dg-form" x1="120" y1="18" x2="120" y2="68"/><line class="dg-form" x1="126" y1="18" x2="126" y2="68"/><line class="dg-form" x1="472" y1="18" x2="472" y2="68"/><line class="dg-hjalp" x1="126" y1="43" x2="472" y2="43"/><path class="dg-linje" d="M126 43 C241 43 357 18 472 18"/><text class="dg-avl" x="116" y="38">N</text><text class="dg-avl" x="469" y="14">B</text><text class="dg-txt" x="16" y="128">nästa resonans f₃</text><line class="dg-form" x1="120" y1="98" x2="120" y2="148"/><line class="dg-form" x1="126" y1="98" x2="126" y2="148"/><line class="dg-form" x1="472" y1="98" x2="472" y2="148"/><line class="dg-hjalp" x1="126" y1="123" x2="472" y2="123"/><path class="dg-linje" d="M126 123 C184 123 184 98 241 98 C299 98 299 123 357 123 C414 123 414 148 472 148"/><text class="dg-avl" x="116" y="118">N</text><text class="dg-avl" x="235" y="94">B</text><text class="dg-avl" x="351" y="118">N</text><text class="dg-avl" x="469" y="162">B</text><text class="dg-not" x="303" y="171">bara f₁, f₃, f₅, …</text></svg>';
  const ledareHandFigur = '<svg class="dg" viewBox="0 0 430 190" role="img" aria-label="Högerhandsregel för magnetfält runt en rak ledare"><circle class="dg-form" cx="175" cy="94" r="62"/><path class="dg-vinkel" d="M175 32 A62 62 0 0 1 237 94"/><path class="dg-spets3" d="M242 98l-13-8 1 15z"/><circle class="dg-vald" cx="175" cy="94" r="18"/><circle class="dg-e1" cx="175" cy="94" r="5"/><text class="dg-txt" x="156" y="128">ström ut</text><text class="dg-txt" x="270" y="66">1. Tummen följer I</text><text class="dg-txt" x="270" y="92">2. Fingrarna visar B</text><text class="dg-not" x="270" y="124">Här blir B moturs.</text></svg>';
  const kraftHandFigur = '<svg class="dg" viewBox="0 0 460 205" role="img" aria-label="Högerhandsregel för kraft på en strömförande ledare"><g class="dg-txt" font-size="20"><text x="55" y="49">×</text><text x="125" y="49">×</text><text x="195" y="49">×</text><text x="55" y="139">×</text><text x="125" y="139">×</text><text x="195" y="139">×</text></g><line class="dg-vek1" x1="45" y1="94" x2="205" y2="94"/><path class="dg-spets1" d="M216 94l-14-7v14z"/><line class="dg-vek3" x1="130" y1="94" x2="130" y2="28"/><path class="dg-spets3" d="M130 17l-7 14h14z"/><text class="dg-txt" x="218" y="99">I</text><text class="dg-txt" x="140" y="27">F</text><text class="dg-txt" x="270" y="54">1. Fingrarna följer I</text><text class="dg-txt" x="270" y="84">2. Vrid mot B (×)</text><text class="dg-txt" x="270" y="114">3. Tummen visar F</text><text class="dg-not" x="270" y="149">× betyder in i skärmen.</text></svg>';

  add(1,"cirkel","Riktningarna i en cirkelrörelse","<p>En bil kör med konstant fart uppåt förbi den högra punkten på en cirkelbana. Åt vilka håll pekar hastigheten och accelerationen?</p>","Vid konstant fart ändras ändå hastigheten, eftersom dess riktning ändras.",[
    steg("Rita hastigheten","Hastigheten är tangent till banan och pekar i rörelseriktningen.","\\[\\vec v:\\quad \\text{tangent uppåt}\\]",cirkelFigur),
    steg("Rita accelerationen","Centripetalaccelerationen pekar alltid mot cirkelns centrum.","\\[\\vec a_c:\\quad \\text{in mot centrum}\\]")
  ],"Hastigheten pekar längs tangenten; accelerationen pekar mot centrum.","Centripetal betyder centrumsökande.","Centripetalacceleration och centripetalkraft");

  add(1,"cirkel","Beräkna centripetalacceleration","<p>En bil kör med farten 12 m/s i en kurva med radien 24 m. Bestäm centripetalaccelerationen.</p>","Fartens riktning ändras snabbare vid hög fart och liten radie.",[
    steg("Välj sambandet","Använd farten och radien.","\\[a_c=\\frac{v^2}{r}\\]"),
    steg("Sätt in värdena","","\\[a_c=\\frac{{\\color{#D1495B}{12}}^2}{{\\color{#D1495B}{24}}}=6{,}0\\ \\mathrm{m/s^2}\\]")
  ],"Centripetalaccelerationen är \\(6{,}0\\ \mathrm{m/s^2}\\), riktad mot centrum.","Kvadrera farten innan du dividerar med radien.","Centripetalacceleration och centripetalkraft");

  add(1,"cirkel","Kraften som håller kvar föremålet","<p>En boll med massan 0,20 kg rör sig med 6,0 m/s i en cirkel med radien 0,90 m. Bestäm den resulterande kraften.</p>","Centripetalkraft är namnet på den resulterande kraft som pekar inåt; det är inte en extra kraft.",[
    steg("Beräkna accelerationen","Börja med cirkelrörelsen.","\\[a_c=\\frac{6{,}0^2}{0{,}90}=40\\ \\mathrm{m/s^2}\\]"),
    steg("Använd Newtons andra lag","Den resulterande kraften är massa gånger acceleration.","\\[F_{res}=ma_c={\\color{#D1495B}{0{,}20}}\\cdot{\\color{#D1495B}{40}}=8{,}0\\ \\mathrm N\\]")
  ],"Kraften är \\(8{,}0\\ \mathrm N\\) mot cirkelns centrum.","Fråga alltid vilken verklig kraft som ger den inåtriktade resultantkraften.","Tillämpningar av cirkelrörelse");

  add(1,"cirkel","Period för en konisk pendel","<p>En kula rör sig som en konisk pendel. Snöret är 1,20 m och bildar vinkeln 30° mot lodlinjen. Bestäm omloppstiden.</p>","Spännkraftens horisontella del ger centripetalkraften och den vertikala delen balanserar tyngdkraften.",[
    steg("Koppla kraftkomponenterna","Dividera ekvationerna så försvinner spännkraften.","\\[S\\cos\\theta=mg,\\quad S\\sin\\theta=m\\omega^2r\\]"),
    steg("Använd geometrin","Med \\(r=L\\sin\\theta\\) fås \\(\\omega^2=g/(L\\cos\\theta)\\).","\\[T=2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}}=2\\pi\\sqrt{\\frac{1{,}20\\cos30^\\circ}{9{,}82}}=2{,}04\\ \\mathrm s\\]")
  ],"Omloppstiden är ungefär \\(2{,}0\\ \mathrm s\\).","Rita spännkraften längs snöret och dela upp den i lodrät och vågrät riktning.","Matematisk och konisk pendel");

  add(1,"kast","Dela upp begynnelsehastigheten","<p>En boll kastas med begynnelsehastigheten 20 m/s i vinkeln 30° över horisontalplanet. Bestäm begynnelsehastighetens komponenter i x- och y-led.</p>","En sned hastighet kan delas i två vinkelräta delar: \\(v_{0x}=v_0\\cos\\alpha\\) och \\(v_{0y}=v_0\\sin\\alpha\\).",[
    steg("Rita en rätvinklig triangel","Vektorn \\(v_0\\) är hypotenusan. Den vågräta komponenten ligger intill vinkeln och den lodräta ligger mittemot.","",komponentFigur),
    steg("Beräkna x-komponenten","Cosinus ger den närliggande kateten.","\\[v_{0x}=v_0\\cos\\alpha={\\color{#D1495B}{20}}\\cos {\\color{#D1495B}{30^\\circ}}=17{,}3\\ \\mathrm{m/s}\\]"),
    steg("Beräkna y-komponenten","Sinus ger den motstående kateten.","\\[v_{0y}=v_0\\sin\\alpha={\\color{#D1495B}{20}}\\sin {\\color{#D1495B}{30^\\circ}}=10{,}0\\ \\mathrm{m/s}\\]")
  ],"Begynnelsehastigheten är \\(17{,}3\\ \\mathrm{m/s}\\) i x-led och \\(10{,}0\\ \\mathrm{m/s}\\) i y-led.","Cosinus hör till komponenten intill vinkeln; sinus hör till komponenten mittemot vinkeln. Tecknet bestäms av axlarnas riktning.","Kastparabler: horisontellt och snett kast");

  add(1,"kast","Dela upp en kaströrelse","<p>En boll kastas horisontellt med 8,0 m/s från 5,0 m höjd. Hur långt från kanten landar den? Bortse från luftmotstånd.</p>","Vågrät och lodrät rörelse har samma tid men behandlas var för sig.",[
    steg("Bestäm falltiden","I lodrät riktning är begynnelsehastigheten noll.","\\[h=\\frac{gt^2}{2}\\Rightarrow t=\\sqrt{\\frac{2h}{g}}=\\sqrt{\\frac{2\\cdot5{,}0}{9{,}82}}=1{,}01\\ \\mathrm s\\]"),
    steg("Beräkna den vågräta sträckan","Den vågräta farten är konstant.","\\[x=v_xt={\\color{#D1495B}{8{,}0}}\\cdot{\\color{#D1495B}{1{,}01}}=8{,}1\\ \\mathrm m\\]")
  ],"Bollen landar ungefär \\(8{,}1\\ \mathrm m\\) från kanten.","Tyngdaccelerationen påverkar bara den lodräta rörelsen.","Kastparabler: horisontellt och snett kast");

  add(2,"fjadrar","Hookes lag och fjäderenergi","<p>En fjäder med fjäderkonstanten 250 N/m dras ut 8,0 cm. Bestäm fjäderkraften och den lagrade energin.</p>","Förlängningen måste anges i meter.",[
    steg("Omvandla längden","Åtta centimeter är 0,080 meter.","\\[x=8{,}0\\ \\mathrm{cm}=0{,}080\\ \\mathrm m\\]"),
    steg("Beräkna kraft och energi","Kraftens belopp är \\(kx\\), medan energin beror på \\(x^2\\).","\\[F=kx=250\\cdot0{,}080=20\\ \\mathrm N\\]\\[E_f=\\frac{kx^2}{2}=0{,}80\\ \\mathrm J\\]")
  ],"Fjäderkraften är \\(20\\ \mathrm N\\) och energin \\(0{,}80\\ \mathrm J\\).","Fjäderkraften är riktad tillbaka mot jämviktsläget.","Hookes lag, fjäderenergi och kopplingar");

  add(2,"svangningar","Amplitud, period och frekvens","<p>En svängning går från största utslaget på ena sidan till största utslaget på den andra på 0,40 s. Amplituden är 6,0 cm. Bestäm period och frekvens.</p>","Från ett ytterläge till motsatt ytterläge går en halv period.",[
    steg("Bestäm perioden","Dubbla tiden för en halv svängning.","\\[T=2\\cdot0{,}40=0{,}80\\ \\mathrm s\\]"),
    steg("Bestäm frekvensen","Frekvens och period är varandras inverser.","\\[f=\\frac1T=\\frac1{0{,}80}=1{,}25\\ \\mathrm{Hz}\\]")
  ],"Perioden är \\(0{,}80\\ \mathrm s\\) och frekvensen \\(1{,}25\\ \mathrm{Hz}\\).","Amplituden är största avståndet från jämviktsläget, inte hela bredden.","Amplitud, period och frekvens");

  add(2,"pendlar","Perioden för en matematisk pendel","<p>En liten pendelkula hänger i en 0,90 m lång tråd. Bestäm perioden för små svängningar.</p>","För små utslag beror perioden på pendellängden och tyngdaccelerationen, inte på massan.",[
    steg("Använd periodformeln","Sätt längden i meter.","\\[T=2\\pi\\sqrt{\\frac{l}{g}}\\]"),
    steg("Sätt in värdena","Behåll flera siffror till slutsvaret.","\\[T=2\\pi\\sqrt{\\frac{{\\color{#D1495B}{0{,}90}}}{9{,}82}}=1{,}90\\ \\mathrm s\\]")
  ],"Perioden är ungefär \\(1{,}9\\ \mathrm s\\).","Formeln gäller små svängningsvinklar.","Matematisk och konisk pendel");

  add(2,"vagrorelser","Vågens fart","<p>En våg har frekvensen 5,0 Hz och våglängden 1,6 m. Bestäm vågens fart.</p>","På en period rör sig vågmönstret en våglängd.",[
    steg("Identifiera storheterna","Frekvensen anger svängningar per sekund och våglängden avståndet mellan två toppar.","\\[f=5{,}0\\ \\mathrm{Hz},\\quad \\lambda=1{,}6\\ \\mathrm m\\]",vagFigur),
    steg("Beräkna farten","Använd vågekvationen.","\\[v=f\\lambda={\\color{#D1495B}{5{,}0}}\\cdot{\\color{#D1495B}{1{,}6}}=8{,}0\\ \\mathrm{m/s}\\]")
  ],"Vågens fart är \\(8{,}0\\ \mathrm{m/s}\\).","I \\(v=f\\lambda\\) är \\(v\\) utbredningsfarten, inte partiklarnas svängningsfart.","Vågrörelsers fart, reflektion och brytning");

  add(2,"vagrorelser","Stående våg på en sträng","<p>En sträng är 1,20 m lång och har noder i båda ändar. Grundtonens frekvens är 75 Hz. Bestäm våglängd och vågfart.</p>","På en fastspänd sträng är ändarna alltid noder. Mellan noderna ligger bukar. De tillåtna frekvenserna är \\(f_n=n\\,v/(2L)\\), där \\(n=1,2,3,\\ldots\\).",[
    steg("Se mönstret","En nod står stilla. I en buk är svängningen som störst. Varje högre svängningsform får en extra buk och kallas nästa överton.","",strangFigur),
    steg("Bestäm våglängden","I grundtonen ryms en halv våglängd på strängen: \\(L=\\lambda/2\\).","\\[\\lambda=2L=2\\cdot1{,}20=2{,}40\\ \\mathrm m\\]"),
    steg("Bestäm farten","Använd vågekvationen.","\\[v=f\\lambda=75\\cdot2{,}40=180\\ \\mathrm{m/s}\\]")
  ],"Våglängden är \\(2{,}40\\ \mathrm m\\) och vågfarten \\(180\\ \mathrm{m/s}\\).","Räkna halva våglängder mellan två fasta ändar.","Superposition och stående vågor");

  add(2,"ljudvagor","Grundton och övertoner i en öppen pipa","<p>En öppen pipa är 0,85 m lång. Ljudhastigheten är 340 m/s. Bestäm grundtonens frekvens.</p>","I en öppen pipa finns en rörelsebuk vid båda ändarna. Alla heltalsmultiplar är möjliga: \\(f_n=n\\,v/(2L)\\), där \\(n=1,2,3,\\ldots\\).",[
    steg("Se noder och bukar","Luftens rörelse är störst vid de öppna ändarna: där finns bukar. När fler halva våglängder får plats bildas övertoner.","",oppenPipaFigur),
    steg("Bestäm våglängden","För grundtonen gäller \\(L=\\lambda/2\\).","\\[\\lambda=2L=1{,}70\\ \\mathrm m\\]"),
    steg("Bestäm frekvensen","Lös ut frekvensen ur vågekvationen.","\\[f=\\frac v\\lambda=\\frac{340}{1{,}70}=200\\ \\mathrm{Hz}\\]")
  ],"Grundtonen är \\(200\\ \mathrm{Hz}\\).","En pipa som är stängd i ena änden har i stället \\(L=\\lambda/4\\) för grundtonen.","Ljudvågors fart, grundton och övertoner");

  add(2,"ljudvagor","Grundton och övertoner i en stängd pipa","<p>Ett rör är stängt i ena änden och 0,425 m långt. Bestäm den lägsta resonansfrekvensen när ljudhastigheten är 340 m/s.</p>","Vid den stängda änden finns en rörelsenod och vid den öppna änden en rörelsebuk. Bara udda multiplar förekommer: \\(f_1,f_3,f_5,\\ldots\\).",[
    steg("Se vilka mönster som passar","Grundtonen är en kvartsvåg. Nästa möjliga resonans är tre kvartsvågor och har frekvensen \\(3f_1\\); \\(2f_1\\) passar inte ändvillkoren.","",stangdPipaFigur),
    steg("Använd kvartsvågen","I grundresonansen ryms en fjärdedels våglängd.","\\[L=\\frac\\lambda4\\Rightarrow\\lambda=4L=1{,}70\\ \\mathrm m\\]"),
    steg("Beräkna frekvensen","Använd \\(f=v/\\lambda\\).","\\[f=\\frac{340}{1{,}70}=200\\ \\mathrm{Hz}\\]")
  ],"Den lägsta resonansfrekvensen är \\(200\\ \mathrm{Hz}\\).","I ett rör stängt i ena änden förekommer bara udda multiplar av grundtonen.","Resonans i luftpelare");

  add(2,"interferens","Avgör konstruktiv interferens","<p>Två högtalare sänder samma ton i fas. Till en punkt är avstånden 4,20 m och 4,70 m. Våglängden är 0,50 m. Blir ljudet starkt eller svagt?</p>","Det är vägskillnaden, inte de två avstånden var för sig, som avgör interferensen.",[
    steg("Beräkna vägskillnaden","Ta absolutbeloppet av avståndens skillnad.","\\[\\Delta s=|4{,}70-4{,}20|=0{,}50\\ \\mathrm m\\]"),
    steg("Jämför med våglängden","En hel våglängd ger konstruktiv interferens för källor i fas.","\\[\\Delta s=1\\lambda\\Rightarrow\\text{konstruktiv interferens}\\]")
  ],"Ljudet blir starkt: vågorna förstärker varandra.","Helt antal våglängder ger maximum; ett udda antal halva våglängder ger minimum.","Interferens från flera källor");

  add(2,"ljud_horsel","Ljudnivå från intensitet","<p>Ljudintensiteten är \\(1{,}0\\cdot10^{-6}\\ \mathrm{W/m^2}\\). Bestäm ljudnivån. Referensintensiteten är \\(I_0=1{,}0\\cdot10^{-12}\\ \mathrm{W/m^2}\\).</p>","Decibelskalan är logaritmisk.",[
    steg("Skriv sambandet","Ljudnivån jämför intensiteten med hörtröskeln.","\\[L=10\\log_{10}\\left(\\frac I{I_0}\\right)\\]"),
    steg("Sätt in värdena","Kvoten är en miljon.","\\[L=10\\log_{10}(10^6)=60\\ \\mathrm{dB}\\]")
  ],"Ljudnivån är \\(60\\ \mathrm{dB}\\).","Tio gånger större intensitet höjer ljudnivån med 10 dB.","Ljudintensitet och ljudnivå");

  add(2,"extrema_frekvenser","Ekolod med ultraljud","<p>En ultraljudspuls återvänder efter 0,040 s. Ljudhastigheten i vattnet är 1500 m/s. Hur djupt är det?</p>","Den uppmätta tiden gäller vägen både ned och upp.",[
    steg("Beräkna hela sträckan","Farten gånger tiden ger tur-och-retur-sträckan.","\\[s_{tot}=vt=1500\\cdot0{,}040=60\\ \\mathrm m\\]"),
    steg("Ta halva sträckan","Djupet är enkel väg.","\\[d=\\frac{s_{tot}}2=30\\ \\mathrm m\\]")
  ],"Djupet är \\(30\\ \mathrm m\\).","Ultraljud har frekvens över människans hörselområde; fysiken för eko är densamma som för annat ljud.","Infraljud och ultraljud");

  add(3,"elektriska_falt","Elektriskt fält och kraft","<p>En positiv laddning \\(q=2{,}0\\ \\mathrm{nC}\\) finns i ett elektriskt fält med styrkan \\(3{,}0\\cdot10^4\\ \mathrm{N/C}\\). Bestäm kraften.</p>","Fältstyrkan anger kraft per coulomb på en positiv provladdning.",[
    steg("Omvandla laddningen","Nano betyder \\(10^{-9}\\).","\\[q=2{,}0\\cdot10^{-9}\\ \\mathrm C\\]"),
    steg("Beräkna kraften","För en positiv laddning är kraften i fältets riktning.","\\[F=qE=2{,}0\\cdot10^{-9}\\cdot3{,}0\\cdot10^4=6{,}0\\cdot10^{-5}\\ \\mathrm N\\]")
  ],"Kraften är \\(6{,}0\\cdot10^{-5}\\ \mathrm N\\) i fältets riktning.","En negativ laddning får kraft i motsatt riktning mot fältet.","Elektriskt fält, potential och kraft");

  add(3,"kondensatorer","Kapacitans och lagrad energi","<p>En kondensator på 220 µF laddas till 12 V. Bestäm laddningen och energin.</p>","Kapacitans beskriver hur mycket laddning som lagras per volt.",[
    steg("Beräkna laddningen","Mikro betyder \\(10^{-6}\\).","\\[Q=CU=220\\cdot10^{-6}\\cdot12=2{,}64\\cdot10^{-3}\\ \\mathrm C\\]"),
    steg("Beräkna energin","Använd spänningen över kondensatorn.","\\[E=\\frac{CU^2}{2}=\\frac{220\\cdot10^{-6}\\cdot12^2}{2}=1{,}58\\cdot10^{-2}\\ \\mathrm J\\]")
  ],"Laddningen är \\(2{,}64\\ \mathrm{mC}\\) och energin \\(15{,}8\\ \mathrm{mJ}\\).","Blanda inte ihop kapacitansen \\(C\\) med laddningen \\(Q\\).","Kondensatorer: kapacitans och energi");

  add(3,"magnetism","Magnetfält kring en rak ledare","<p>Strömmen i en lång rak ledare är 5,0 A. Bestäm magnetfältet 4,0 cm från ledaren.</p>","Fältlinjerna är cirklar runt ledaren.",[
    steg("Omvandla avståndet","Fyra centimeter är 0,040 meter.","\\[r=0{,}040\\ \\mathrm m\\]"),
    steg("Använd fältformeln","För en lång rak ledare gäller följande samband.","\\[B=\\frac{\\mu_0I}{2\\pi r}=\\frac{4\\pi\\cdot10^{-7}\\cdot5{,}0}{2\\pi\\cdot0{,}040}=2{,}5\\cdot10^{-5}\\ \\mathrm T\\]")
  ],"Magnetfältet är \\(25\\ \mathrm{\\mu T}\\).","Höger tumme visar strömmen; böjda fingrar visar fältets riktning.","Magnetfält kring strömledare");

  add(3,"magnetism","Magnetfält i en lång spole","<p>En 0,40 m lång spole har 800 varv och strömmen 0,60 A. Bestäm magnetfältet inuti spolen.</p>","I en lång spole är fältet ungefär homogent långt från ändarna.",[
    steg("Bestäm varvtätheten","Dela antalet varv med spolens längd.","\\[n=\\frac Nl=\\frac{800}{0{,}40}=2000\\ \\mathrm{m^{-1}}\\]"),
    steg("Beräkna fältet","Använd \\(B=\\mu_0nI\\).","\\[B=4\\pi\\cdot10^{-7}\\cdot2000\\cdot0{,}60=1{,}51\\cdot10^{-3}\\ \\mathrm T\\]")
  ],"Magnetfältet är ungefär \\(1{,}5\\ \mathrm{mT}\\).","Fler varv per meter eller större ström ger starkare fält.","Magnetfält i spole");

  add(3,"magnetism","Kraft på en strömförande ledare","<p>En 0,25 m lång ledare för strömmen 3,0 A vinkelrätt mot ett magnetfält på 0,40 T. Bestäm kraftens belopp.</p>","Magnetfältet kan påverka rörliga laddningar och därmed en strömförande ledare.",[
    steg("Kontrollera vinkeln","Ledaren är vinkelrät mot fältet, så \\(\\sin90^\\circ=1\\).","\\[F=BIl\\sin\\theta\\]"),
    steg("Sätt in värdena","Multiplicera fält, ström och ledarlängd.","\\[F=0{,}40\\cdot3{,}0\\cdot0{,}25=0{,}30\\ \\mathrm N\\]")
  ],"Kraften är \\(0{,}30\\ \mathrm N\\).","Kraften är vinkelrät mot både strömmen och magnetfältet.","Magnetfält och magnetisk kraft");

  add(3,"magnetism","Riktning kring en rak ledare","<p>Strömmen går rakt ut ur skärmen. Åt vilket håll går magnetfältet runt ledaren?</p>","Högerhandsregeln kopplar strömriktningen \\(I\\) till magnetfältets riktning \\(B\\): tummen visar strömmen och de böjda fingrarna visar fältet.",[
    steg("Rikta tummen","Använd höger hand. Låt tummen peka ut ur skärmen, i strömmens riktning. Punkten i bilden kan tänkas som spetsen på en pil som kommer mot dig.","\\[I:\\quad \\text{ut ur skärmen}\\]",ledareHandFigur),
    steg("Följ fingrarna","De böjda fingrarna visar fältlinjernas riktning.","\\[B:\\quad \\text{moturs}\\]")
  ],"Magnetfältet går moturs runt ledaren.","Punkt betyder ut ur skärmen; kryss betyder in i skärmen.","Riktningsfrågor: magnetfält kring rak ledare");

  add(3,"magnetism","Riktning på kraften på en ledare","<p>En ledare har ström åt höger och ligger i ett magnetfält in i skärmen. Åt vilket håll verkar kraften?</p>","Kraftens belopp ges av \\(F=BIl\\sin\\alpha\\). Riktningen får du med höger hand: fingrarna följer strömmen, du vrider dem mot fältet och tummen visar kraften.",[
    steg("Ordna riktningarna","Använd höger hand. Rikta fingrarna åt höger längs strömmen och vrid dem in mot skärmen, längs magnetfältet.","\\[I:\\rightarrow,\\qquad B:\\otimes\\]",kraftHandFigur),
    steg("Läs av kraften","Tummen visar kraften på ledaren.","\\[F:\\uparrow\\]")
  ],"Kraften verkar uppåt.","Byter strömmen eller fältet riktning byter kraften riktning.","Riktningsfrågor: kraft på ledare i magnetfält");

  add(3,"magnetism","Bestäm en spoles nordpol","<p>Strömmen går moturs sedd från spolens vänstra ände. Vilken pol finns där?</p>","För en spole låter du högerhandens böjda fingrar följa strömmen runt varven. Tummen pekar då mot spolens nordpol och magnetfältet inuti spolen.",[
    steg("Krök högerhandens fingrar","Låt fingrarna följa strömmens riktning runt varven.","\\[I:\\quad \\text{moturs sedd från vänster}\\]"),
    steg("Läs av tummen","Tummen pekar mot spolens nordpol och fältet inuti spolen.","\\[\\text{vänster ände}=N\\]")
  ],"Den vänstra änden är spolens nordpol.","Moturs ström sedd från en ände betyder nordpol vid den änden.","Riktningsfrågor för spolar och strömslingor");

  add(3,"laddade_partiklar","Laddad partikel i magnetfält","<p>En proton med farten \\(2{,}0\\cdot10^6\\ \mathrm{m/s}\\) går vinkelrätt in i ett fält på 0,30 T. Bestäm magnetkraften.</p>","När hastigheten är vinkelrät mot fältet är kraften störst.",[
    steg("Välj sambandet","Protonens laddning är \\(e=1{,}60\\cdot10^{-19}\\ \mathrm C\\).","\\[F=qvB\\sin90^\\circ=qvB\\]"),
    steg("Sätt in värdena","Magnetkraften ändrar riktningen men inte farten.","\\[F=1{,}60\\cdot10^{-19}\\cdot2{,}0\\cdot10^6\\cdot0{,}30=9{,}6\\cdot10^{-14}\\ \\mathrm N\\]")
  ],"Magnetkraftens belopp är \\(9{,}6\\cdot10^{-14}\\ \mathrm N\\).","Är hastigheten parallell med fältet blir magnetkraften noll.","Laddade partiklar i elektriska och magnetiska fält");

  add(3,"laddade_partiklar","Riktning för en laddad partikel","<p>En proton rör sig åt höger i ett magnetfält in i skärmen. Åt vilket håll verkar magnetkraften?</p>","För en positiv laddning använder du högerhandsregeln direkt.",[
    steg("Peka i hastighetens riktning","Fingrarna pekar åt höger och böjs mot fältet in i skärmen.","\\[\\vec v:\\rightarrow,\\qquad\\vec B:\\otimes\\]",faltFigur),
    steg("Läs av kraften","Tummen pekar uppåt.","\\[\\vec F:\\uparrow\\]")
  ],"Magnetkraften på protonen verkar uppåt.","För en negativ laddning blir riktningen den motsatta.","Riktningsfrågor: kraft på laddad partikel");

  add(3,"jordens_magnetfalt","Kompass och jordens magnetfält","<p>En kompass ställs bredvid en rak ledare. Jordfältets horisontella komponent är 18 µT och ledarens fält vid kompassen är 18 µT vinkelrätt mot jordfältet. Hur mycket vrids nålen?</p>","Kompassnålen lägger sig längs det resulterande magnetfältet.",[
    steg("Rita fältvektorerna","De två fälten är lika stora och vinkelräta.","\\[B_{ledare}=B_{jord}=18\\ \\mathrm{\\mu T}\\]"),
    steg("Bestäm vinkeln","För en rätvinklig triangel gäller tangens.","\\[\\tan\\theta=\\frac{B_{ledare}}{B_{jord}}=1\\Rightarrow\\theta=45^\\circ\\]")
  ],"Kompassnålen vrids \\(45^\\circ\\).","En kompass visar resultantens riktning, inte ett av fälten separat.","Jordens magnetfält och kompass");

  add(3,"induktion","Beräkna inducerad spänning","<p>Magnetflödet genom en spole med 200 varv minskar jämnt från 0,012 Wb till 0 på 0,30 s. Bestäm spänningens belopp.</p>","En förändring av magnetiskt flöde inducerar spänning.",[
    steg("Bestäm flödesändringen","Använd ändringens belopp när bara spänningens storlek efterfrågas.","\\[|\\Delta\\Phi|=0{,}012\\ \\mathrm{Wb}\\]"),
    steg("Använd Faradays lag","Multiplicera ändring per tid med antalet varv.","\\[|U|=N\\frac{|\\Delta\\Phi|}{\\Delta t}=200\\cdot\\frac{0{,}012}{0{,}30}=8{,}0\\ \\mathrm V\\]")
  ],"Den inducerade spänningens belopp är \\(8{,}0\\ \mathrm V\\).","Magnetiskt flöde är \\(\\Phi=BA\\cos\\theta\\), där vinkeln mäts mot ytans normal.","Faradays lag, magnetiskt flöde och induktion");

  add(3,"induktion","Lenz lag: bestäm strömriktningen","<p>En magnets nordpol förs mot en ledande ring. Vilken magnetisk pol skapar ringen på sidan mot magneten?</p>","Den inducerade strömmen motverkar förändringen av magnetflödet.",[
    steg("Beskriv förändringen","När nordpolen närmar sig ökar flödet genom ringen.","\\[\\Phi:\\quad \\text{ökar}\\]"),
    steg("Motverka ökningen","Ringen stöter bort den annalkande nordpolen och måste därför skapa en nordpol mot magneten.","\\[\\text{ringens närmaste sida}=N\\]")
  ],"Ringen skapar en nordpol mot magneten; sedd från magneten går strömmen moturs.","Lenz lag handlar om att motverka förändringen, inte själva fältet.","Riktningsfrågor: inducerad ström enligt Lenz lag");

  add(3,"vaxelstrom","Effektivvärde för växelspänning","<p>En sinusformad växelspänning har toppvärdet 325 V. Bestäm effektivvärdet.</p>","Effektivvärdet ger samma medeleffekt i en resistor som motsvarande likspänning.",[
    steg("Välj sambandet","För en sinusformad spänning gäller \\(U_{eff}=U_{max}/\\sqrt2\\).","\\[U_{eff}=\\frac{U_{max}}{\\sqrt2}\\]"),
    steg("Sätt in toppvärdet","Dividera med roten ur två.","\\[U_{eff}=\\frac{{\\color{#D1495B}{325}}}{\\sqrt2}=230\\ \\mathrm V\\]")
  ],"Effektivvärdet är \\(230\\ \mathrm V\\).","Topp-till-topp-värdet är dubbla toppvärdet.","Sinusformad växelström och effektivvärde");

  add(3,"vaxelstrom_spole_kondensator","Resonans i en LC-krets","<p>En spole på 0,20 H och en kondensator på 50 µF ingår i en krets. Bestäm resonansfrekvensen.</p>","Vid resonans är spolens och kondensatorns reaktanser lika stora.",[
    steg("Omvandla kapacitansen","Mikrofarad skrivs i farad.","\\[C=50\\cdot10^{-6}\\ \\mathrm F\\]"),
    steg("Beräkna resonansfrekvensen","Använd resonansvillkoret.","\\[f_0=\\frac1{2\\pi\\sqrt{LC}}=\\frac1{2\\pi\\sqrt{0{,}20\\cdot50\\cdot10^{-6}}}=50{,}3\\ \\mathrm{Hz}\\]")
  ],"Resonansfrekvensen är ungefär \\(50\\ \mathrm{Hz}\\).","Vid resonans gäller \\(X_L=X_C\\).","Spole, kondensator och resonans i växelström");

  add(4,"em_vagor","Frekvens och våglängd för ljus","<p>En radiovåg har frekvensen 100 MHz. Bestäm våglängden i vakuum.</p>","Alla elektromagnetiska vågor färdas med ljushastigheten i vakuum.",[
    steg("Skriv i hertz","Mega betyder \\(10^6\\).","\\[f=100\\cdot10^6\\ \\mathrm{Hz}\\]"),
    steg("Använd vågekvationen","Sätt \\(c=3{,}00\\cdot10^8\\ \mathrm{m/s}\\).","\\[\\lambda=\\frac cf=\\frac{3{,}00\\cdot10^8}{100\\cdot10^6}=3{,}00\\ \\mathrm m\\]")
  ],"Våglängden är \\(3{,}00\\ \mathrm m\\).","Högre frekvens innebär kortare våglängd.","Elektromagnetiska vågor och spektrum");

  add(4,"vagrorelselara","Gitter och interferensmaximum","<p>Laserljus med våglängden 600 nm träffar ett gitter med 500 linjer/mm. Bestäm vinkeln till första ordningens maximum.</p>","Gitterkonstanten är avståndet mellan två intilliggande spalter.",[
    steg("Bestäm gitterkonstanten","Omvandla linjetätheten till linjer per meter och ta inversen.","\\[d=\\frac1{500\\cdot10^3}=2{,}0\\cdot10^{-6}\\ \\mathrm m\\]"),
    steg("Använd gitterformeln","För första ordningen är \\(m=1\\).","\\[d\\sin\\theta=m\\lambda\\Rightarrow\\theta=\\arcsin\\left(\\frac{600\\cdot10^{-9}}{2{,}0\\cdot10^{-6}}\\right)=17{,}5^\\circ\\]")
  ],"Vinkeln är ungefär \\(17{,}5^\\circ\\).","Om \\(m\\lambda/d>1\\) finns inget maximum av den ordningen.","Dubbelspalt och gitter");

  add(4,"temperaturstralning","Temperatur från strålningsmaximum","<p>En stjärnas spektrum har sitt maximum vid 500 nm. Uppskatta stjärnans yttemperatur.</p>","Wiens förskjutningslag kopplar den mest intensiva våglängden till temperaturen.",[
    steg("Omvandla våglängden","Nanometer skrivs i meter.","\\[\\lambda_{max}=500\\cdot10^{-9}\\ \\mathrm m\\]"),
    steg("Använd Wiens lag","Använd \\(b=2{,}90\\cdot10^{-3}\\ \mathrm{m\\,K}\\).","\\[T=\\frac b{\\lambda_{max}}=\\frac{2{,}90\\cdot10^{-3}}{500\\cdot10^{-9}}=5800\\ \\mathrm K\\]")
  ],"Stjärnans yttemperatur är ungefär \\(5800\\ \mathrm K\\).","Kortare maximumvåglängd betyder högre temperatur.","Temperaturstrålning: Wien och Stefan–Boltzmann");

  add(4,"straloptik","Brytning med Snells lag","<p>Ljus går från luft in i glas med brytningsindex 1,50. Infallsvinkeln är 30°. Bestäm brytningsvinkeln.</p>","Vinklar mäts mot normalen, inte mot ytan.",[
    steg("Skriv Snells lag","För luft kan du använda \\(n_1\\approx1{,}00\\).","\\[n_1\\sin i=n_2\\sin r\\]"),
    steg("Lös ut vinkeln","Ljuset bryts mot normalen när det går in i glas.","\\[r=\\arcsin\\left(\\frac{1{,}00\\sin30^\\circ}{1{,}50}\\right)=19{,}5^\\circ\\]")
  ],"Brytningsvinkeln är ungefär \\(19{,}5^\\circ\\).","Rita alltid normalen innan du märker ut vinklarna.","Snells lag och brytning");

  add(4,"ljus_partikelstrom","Beräkna en fotons energi","<p>Grönt ljus har våglängden 550 nm. Bestäm energin hos en foton.</p>","En fotons energi bestäms av frekvensen eller våglängden.",[
    steg("Välj sambandet","Kombinera \\(E=hf\\) med \\(c=f\\lambda\\).","\\[E=\\frac{hc}{\\lambda}\\]"),
    steg("Sätt in värdena","Använd \\(h=6{,}626\\cdot10^{-34}\\ \mathrm{J\\,s}\\).","\\[E=\\frac{6{,}626\\cdot10^{-34}\\cdot3{,}00\\cdot10^8}{550\\cdot10^{-9}}=3{,}61\\cdot10^{-19}\\ \\mathrm J\\]")
  ],"Fotonens energi är \\(3{,}61\\cdot10^{-19}\\ \mathrm J\\), cirka \\(2{,}25\\ \mathrm{eV}\\).","Högre frekvens och kortare våglängd ger större fotonenergi.","Fotonenergi");

  add(4,"partikelstralar","Radie i ett magnetfält","<p>En proton rör sig vinkelrätt mot ett magnetfält på 0,20 T med farten \\(3{,}0\\cdot10^6\\ \mathrm{m/s}\\). Bestäm banradien.</p>","Magnetkraften fungerar som centripetalkraft.",[
    steg("Sätt krafterna lika","Använd \\(qvB=mv^2/r\\).","\\[qvB=\\frac{mv^2}{r}\\Rightarrow r=\\frac{mv}{qB}\\]"),
    steg("Sätt in protonens data","\\(m_p=1{,}67\\cdot10^{-27}\\ \mathrm{kg}\\) och \\(q=e\\).","\\[r=\\frac{1{,}67\\cdot10^{-27}\\cdot3{,}0\\cdot10^6}{1{,}60\\cdot10^{-19}\\cdot0{,}20}=0{,}157\\ \\mathrm m\\]")
  ],"Banradien är ungefär \\(0{,}16\\ \mathrm m\\).","Magnetfältet böjer banan men utför inget arbete på partikeln.","Styrning och analys av partikelstrålar");

  add(4,"atomstruktur","Emissionslinje från en atom","<p>En elektron faller från energinivån −1,5 eV till −3,4 eV. Bestäm den utsända fotonens energi.</p>","En foton bär bort skillnaden mellan atomens energinivåer.",[
    steg("Ta energiskillnaden","Slutnivån är lägre, så energi avges.","\\[E_\\gamma=E_{före}-E_{efter}=(-1{,}5)-(-3{,}4)=1{,}9\\ \\mathrm{eV}\\]"),
    steg("Tolka svaret","Fotonens energi är positiv även om atomnivåerna skrivs som negativa.","\\[E_\\gamma=1{,}9\\ \\mathrm{eV}\\]")
  ],"Atomen sänder ut en foton med energin \\(1{,}9\\ \mathrm{eV}\\).","Absorption höjer elektronen; emission sänker den.","Bohrs atommodell");

  add(5,"avstandsmatning","Avstånd med parallax","<p>En stjärnas parallaxvinkel är 0,20 bågsekunder. Bestäm avståndet i parsec.</p>","Parallaxen jämför stjärnans läge när jorden befinner sig på motsatta sidor om solen.",[
    steg("Använd parsec-definitionen","När vinkeln anges i bågsekunder blir sambandet enkelt.","\\[d(\\mathrm{pc})=\\frac1{p(\\mathrm{bågsekunder})}\\]"),
    steg("Sätt in vinkeln","Dividera ett med parallaxvinkeln.","\\[d=\\frac1{0{,}20}=5{,}0\\ \\mathrm{pc}\\]")
  ],"Stjärnan ligger \\(5{,}0\\ \mathrm{pc}\\) bort.","Mindre parallaxvinkel betyder större avstånd.","Astronomisk avståndsmätning");

  add(5,"farg_ljusstyrka","Ljusstyrka och avstånd","<p>Två lika starka stjärnor jämförs. Stjärna B ligger dubbelt så långt bort som stjärna A. Hur stor blir den observerade intensiteten från B?</p>","Strålningen sprids över en sfär vars area växer med avståndets kvadrat.",[
    steg("Skriv inversa kvadratlagen","Intensiteten är \\(I=L/(4\\pi r^2)\\).","\\[I\\propto\\frac1{r^2}\\]"),
    steg("Jämför avstånden","När avståndet fördubblas blir nämnaren fyra gånger större.","\\[\\frac{I_B}{I_A}=\\left(\\frac{r_A}{2r_A}\\right)^2=\\frac14\\]")
  ],"Stjärna B ser en fjärdedel så ljusstark ut.","Skenbar ljusstyrka beror både på luminositet och avstånd.","Stjärnors färg, temperatur och ljusstyrka");

  add(5,"exoplaneter","Planetens storlek från en transit","<p>När en planet passerar framför sin stjärna minskar ljusstyrkan med 1,0 %. Uppskatta planetens radie relativt stjärnans.</p>","Transitdjupet är ungefär förhållandet mellan planetens och stjärnans skivareor.",[
    steg("Skriv areaförhållandet","För en central transit kan mörkningen approximeras med radiernas kvadrat.","\\[\\frac{\\Delta I}{I}\\approx\\left(\\frac{R_p}{R_s}\\right)^2\\]"),
    steg("Ta kvadratroten","En procent är 0,010.","\\[\\frac{R_p}{R_s}\\approx\\sqrt{0{,}010}=0{,}10\\]")
  ],"Planetens radie är ungefär 10 % av stjärnans radie.","Transittiden ger omloppsinformation; transitdjupet ger storleksinformation.","Exoplaneter och transitmetoden");

  add(5,"stjarnornas_utveckling","Läs ett HR-diagram","<p>En stjärna är mycket varm men har låg luminositet. Vilken typ av stjärna är den troligast?</p>","HR-diagrammet visar temperatur på den vågräta axeln och luminositet på den lodräta. Temperaturen avtar vanligen åt höger.",[
    steg("Placera egenskaperna","Hög temperatur ger en placering åt vänster och låg luminositet långt ned.","\\[\\text{varm+låg luminositet}\\Rightarrow\\text{nedre vänstra delen}\\]"),
    steg("Identifiera området","I denna del finns vita dvärgar: små, heta stjärnrester.","\\[\\text{vit dvärg}\\]")
  ],"Stjärnan är troligast en vit dvärg.","En stjärnas massa avgör i stor utsträckning dess livslängd och slutstadium.","Stjärnors utveckling och HR-diagram");

  add(5,"kosmologi","Hubbles lag","<p>En galax avlägsnar sig med 1400 km/s. Använd \\(H_0=70\\ \mathrm{km\\,s^{-1}Mpc^{-1}}\\) och bestäm avståndet.</p>","På stora skalor ökar recessionshastigheten ungefär linjärt med avståndet.",[
    steg("Skriv Hubbles lag","Sambandet gäller universums expansion, inte vanlig rörelse genom rymden i närområdet.","\\[v=H_0d\\]"),
    steg("Lös ut avståndet","Enheterna är valda så att svaret blir i megaparsec.","\\[d=\\frac v{H_0}=\\frac{1400}{70}=20\\ \\mathrm{Mpc}\\]")
  ],"Galaxens avstånd är ungefär \\(20\\ \mathrm{Mpc}\\).","Rödförskjutning används för att uppskatta recessionshastigheten.","Hubbles lag och rödförskjutning");

  add(5,"framtiden","Universums framtid","<p>Observationer visar att universums expansion accelererar. Vilken slutsats är rimlig om universums framtid enligt dagens standardmodell?</p>","Universums framtid beror på innehåll, densitet och hur den mörka energin beter sig.",[
    steg("Koppla observation till modell","Accelerationen tillskrivs i standardmodellen mörk energi.","\\[\\ddot a>0\\]"),
    steg("Dra en försiktig slutsats","Om mörk energi fortsätter på samma sätt fortsätter expansionen och avlägsna galaxer skiljs allt mer åt.","\\[\\text{fortsatt accelererad expansion}\\]")
  ],"Den enklaste slutsatsen är att expansionen fortsätter och accelererar.","Skilj mellan observationen och den modellberoende tolkningen.","Universums framtida utveckling");

  add(6,"tidsdilatation","Beräkna tidsdilatation","<p>Ett rymdskepp färdas med \\(0{,}80c\\). Ombord går 3,0 år. Hur lång tid mäter jorden?</p>","Egentiden mäts av den klocka som följer med mellan händelserna.",[
    steg("Beräkna gammafaktorn","Sätt \\(v/c=0{,}80\\).","\\[\\gamma=\\frac1{\\sqrt{1-v^2/c^2}}=\\frac1{\\sqrt{1-0{,}80^2}}=1{,}667\\]"),
    steg("Beräkna jordens tid","Den rörliga klockan går långsammare sedd från jorden.","\\[\\Delta t=\\gamma\\Delta\\tau=1{,}667\\cdot3{,}0=5{,}0\\ \\mathrm{år}\\]")
  ],"På jorden går \\(5{,}0\\) år.","Egentiden är den kortaste tiden mellan de två händelserna.","Tidsdilatation och egentid");

  add(6,"langdkontraktion","Beräkna längdkontraktion","<p>Ett rymdskepp är 100 m långt i vila. Det passerar jorden med \\(0{,}80c\\). Hur långt mäts det från jorden?</p>","Egenlängden mäts i föremålets eget vilosystem.",[
    steg("Använd samma gammafaktor","Vid \\(0{,}80c\\) är \\(\\gamma=1{,}667\\).","\\[\\gamma=1{,}667\\]"),
    steg("Beräkna den kontraherade längden","Kontraktionen sker i rörelseriktningen.","\\[L=\\frac{L_0}{\\gamma}=\\frac{100}{1{,}667}=60\\ \\mathrm m\\]")
  ],"Från jorden mäts skeppet till \\(60\\ \mathrm m\\).","Egenlängden är alltid den största längden.","Längdkontraktion och egenlängd");

  add(6,"tid_och_langd","Händelser och referenssystem","<p>Två blixtar slår ned samtidigt enligt en observatör på marken. Är de automatiskt samtidiga för en observatör som rör sig längs marken?</p>","Samtidighet på olika platser är inte absolut i den speciella relativitetsteorin.",[
    steg("Identifiera händelserna","Varje blixtnedslag är en händelse med en plats och en tid.","\\[(x_1,t_1),\\quad(x_2,t_2)\\]"),
    steg("Byt referenssystem","Lorentztransformationen blandar tid och position. Om platserna skiljer sig kan tidsordningen därför bli annorlunda.","\\[\\Delta t'=\\gamma\\left(\\Delta t-\\frac{v\\Delta x}{c^2}\\right)\\]")
  ],"Nej. Händelser som är samtidiga på marken behöver inte vara samtidiga i det rörliga systemet.","Fråga alltid i vilket referenssystem tid och längd är mätta.","Rumtid och referenssystem");

  add(6,"massa_och_energi","Massa som energi","<p>Hur mycket energi motsvarar massan 1,0 mg?</p>","Massa är en form av energi även när föremålet är i vila.",[
    steg("Omvandla massan","Ett milligram är \\(1{,}0\\cdot10^{-6}\\) kg.","\\[m=1{,}0\\cdot10^{-6}\\ \\mathrm{kg}\\]"),
    steg("Använd massa–energi-ekvivalensen","Sätt \\(c=3{,}00\\cdot10^8\\ \mathrm{m/s}\\).","\\[E=mc^2=1{,}0\\cdot10^{-6}(3{,}00\\cdot10^8)^2=9{,}0\\cdot10^{10}\\ \\mathrm J\\]")
  ],"Massan motsvarar \\(9{,}0\\cdot10^{10}\\ \mathrm J\\).","Eftersom \\(c^2\\) är mycket stort motsvarar en liten massa mycket energi.","Massa–energi-ekvivalens");

  add(6,"relativistisk_energi","Relativistisk rörelseenergi","<p>En partikel med vilomassan \\(m\\) rör sig med \\(0{,}80c\\). Uttryck rörelseenergin i enheten \\(mc^2\\).</p>","Vid höga hastigheter används inte den klassiska formeln \\(mv^2/2\\).",[
    steg("Beräkna gammafaktorn","För \\(v=0{,}80c\\) är \\(\\gamma=1{,}667\\).","\\[\\gamma=\\frac1{\\sqrt{1-0{,}80^2}}=1{,}667\\]"),
    steg("Använd relativistisk energi","Rörelseenergin är total energi minus viloenergi.","\\[E_k=(\\gamma-1)mc^2=(1{,}667-1)mc^2=0{,}667mc^2\\]")
  ],"Rörelseenergin är \\(0{,}667mc^2\\).","Total energi är \\(E=\\gamma mc^2\\), medan viloenergin är \\(E_0=mc^2\\).","Relativistisk energi");

  add(3,"vaxelstrom","Transformatorns spänning","<p>En ideal transformator har 1200 varv på primärsidan och 120 varv på sekundärsidan. Primärspänningen är 230 V. Bestäm sekundärspänningen.</p>","Spänningarnas förhållande är samma som spolarnas varvtalsförhållande.",[
    steg("Skriv sambandet","Koppla sekundärsidan till primärsidan.","\\[\\frac{U_s}{U_p}=\\frac{N_s}{N_p}\\]"),
    steg("Sätt in värdena","Sekundärspolen har en tiondel så många varv.","\\[U_s=230\\cdot\\frac{120}{1200}=23\\ \\mathrm V\\]")
  ],"Sekundärspänningen är \\(23\\ \\mathrm V\\).","Färre varv på sekundärsidan ger lägre spänning.","Generatorer och transformatorer");

  add(4,"ljus_partikelstrom","Fotoelektrisk effekt","<p>En metall belyses med ljus över gränsfrekvensen. Vad händer med elektronernas maximala rörelseenergi när frekvensen ökar?</p>","Varje foton har energin hf. En del går åt till att frigöra elektronen.",[
    steg("Använd energibalansen","Utträdesarbetet W är bestämt av metallen.","\\[E_{k,max}=hf-W\\]"),
    steg("Öka frekvensen","När f ökar blir varje fotons energi större, medan W är oförändrat.","\\[f\\uparrow\\quad\\Rightarrow\\quad E_{k,max}\\uparrow\\]")
  ],"Den maximala rörelseenergin ökar.","Högre intensitet ger främst fler fotoner; högre frekvens ger mer energi per foton.","Fotoelektrisk effekt och våg–partikeldualism");

  add(4,"temperaturstralning","Jordens strålningsbalans","<p>Jorden absorberar i genomsnitt 240 W/m². Hur mycket måste stråla ut om medeltemperaturen är konstant?</p>","En konstant medeltemperatur kräver att systemets energi inte ökar eller minskar.",[
    steg("Använd energiprincipen","I jämvikt är inkommande och utgående effekt lika stora.","\\[P_{in}=P_{ut}\\]"),
    steg("Sätt in absorptionen","Samma effekt per kvadratmeter måste lämna systemet.","\\[P_{ut}=240\\ \\mathrm{W/m^2}\\]")
  ],"Jorden måste stråla ut \\(240\\ \\mathrm{W/m^2}\\).","Om mindre energi lämnar än kommer in stiger systemets energi tills en ny jämvikt kan nås.","Jordens strålningsbalans");

  add(4,"em_vagor","Välj strålning efter användning","<p>Varför passar radiovågor för kommunikation medan röntgenstrålning kan användas för att avbilda skelett?</p>","Olika frekvenser ger olika fotonenergi och olika växelverkan med materia.",[
    steg("Radiovågor","De kan moduleras så att signalen bär information och har låg energi per foton.","\\[E=hf\\]"),
    steg("Röntgenstrålning","Den tränger igenom mjukvävnad bättre än ben. Skillnaden i absorption skapar kontrast, men jonisationsrisken kräver låg dos.")
  ],"Strålslaget väljs efter hur det sprids och växelverkar med material.","Teknisk nytta och risk måste bedömas med frekvens, intensitet, exponering och materialets absorption.","Fysik i kommunikations- och medicinteknik");

  /* Den centrala formeln visas redan i inledningen. Eleven ska inte behöva
     leta efter sambandet inne i lösningen innan resonemanget blir begripligt. */
  const huvudformler = {
    "Beräkna centripetalacceleration":"\\[a_c=\\frac{v^2}{r}\\]",
    "Kraften som håller kvar föremålet":"\\[F_R=ma_c=\\frac{mv^2}{r}\\]",
    "Period för en konisk pendel":"\\[T=2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}}\\]",
    "Dela upp begynnelsehastigheten":"\\[v_{0x}=v_0\\cos\\alpha,\\qquad v_{0y}=v_0\\sin\\alpha\\]",
    "Dela upp en kaströrelse":"\\[x=v_{0x}t,\\qquad y=v_{0y}t-\\frac{gt^2}{2}\\]",
    "Hookes lag och fjäderenergi":"\\[F=kx,\\qquad E_f=\\frac{kx^2}{2}\\]",
    "Amplitud, period och frekvens":"\\[f=\\frac1T\\]",
    "Perioden för en matematisk pendel":"\\[T=2\\pi\\sqrt{\\frac{l}{g}}\\]",
    "Vågens fart":"\\[v=f\\lambda\\]",
    "Stående våg på en sträng":"\\[f_n=n\\frac{v}{2L}\\]",
    "Grundton och övertoner i en öppen pipa":"\\[f_n=n\\frac{v}{2L}\\]",
    "Grundton och övertoner i en stängd pipa":"\\[f_n=(2n-1)\\frac{v}{4L}\\]",
    "Avgör konstruktiv interferens":"\\[\\Delta s=n\\lambda\\]",
    "Ljudnivå från intensitet":"\\[L=10\\log_{10}\\!\\left(\\frac I{I_0}\\right)\\]",
    "Ekolod med ultraljud":"\\[d=\\frac{vt}{2}\\]",
    "Elektriskt fält och kraft":"\\[F=qE\\]",
    "Kapacitans och lagrad energi":"\\[Q=CU,\\qquad E=\\frac{CU^2}{2}\\]",
    "Magnetfält kring en rak ledare":"\\[B=\\frac{\\mu_0I}{2\\pi r}\\]",
    "Magnetfält i en lång spole":"\\[B=\\mu_0nI\\]",
    "Kraft på en strömförande ledare":"\\[F=BIl\\sin\\alpha\\]",
    "Riktning på kraften på en ledare":"\\[F=BIl\\sin\\alpha\\]",
    "Laddad partikel i magnetfält":"\\[F=qvB\\sin\\alpha\\]",
    "Riktning för en laddad partikel":"\\[F=qvB\\sin\\alpha\\]",
    "Kompass och jordens magnetfält":"\\[\\tan\\theta=\\frac{B_{ledare}}{B_{jord}}\\]",
    "Beräkna inducerad spänning":"\\[|U|=N\\frac{|\\Delta\\Phi|}{\\Delta t}\\]",
    "Lenz lag: bestäm strömriktningen":"\\[\\Phi=BA\\cos\\alpha\\]",
    "Effektivvärde för växelspänning":"\\[U_{eff}=\\frac{U_{max}}{\\sqrt2}\\]",
    "Resonans i en LC-krets":"\\[f_0=\\frac1{2\\pi\\sqrt{LC}}\\]",
    "Frekvens och våglängd för ljus":"\\[c=f\\lambda\\]",
    "Gitter och interferensmaximum":"\\[d\\sin\\theta=m\\lambda\\]",
    "Temperatur från strålningsmaximum":"\\[\\lambda_{max}T=b\\]",
    "Brytning med Snells lag":"\\[n_1\\sin i=n_2\\sin r\\]",
    "Beräkna en fotons energi":"\\[E=hf=\\frac{hc}{\\lambda}\\]",
    "Radie i ett magnetfält":"\\[r=\\frac{mv}{qB}\\]",
    "Emissionslinje från en atom":"\\[E_\\gamma=E_{före}-E_{efter}\\]",
    "Avstånd med parallax":"\\[d(\\mathrm{pc})=\\frac1{p(\\mathrm{bågsekunder})}\\]",
    "Ljusstyrka och avstånd":"\\[I=\\frac{L}{4\\pi r^2}\\]",
    "Planetens storlek från en transit":"\\[\\frac{\\Delta I}{I}\\approx\\left(\\frac{R_p}{R_s}\\right)^2\\]",
    "Hubbles lag":"\\[v=H_0d\\]",
    "Beräkna tidsdilatation":"\\[\\Delta t=\\gamma\\Delta\\tau\\]",
    "Beräkna längdkontraktion":"\\[L=\\frac{L_0}{\\gamma}\\]",
    "Händelser och referenssystem":"\\[\\Delta t'=\\gamma\\left(\\Delta t-\\frac{v\\Delta x}{c^2}\\right)\\]",
    "Massa som energi":"\\[E=mc^2\\]",
    "Relativistisk rörelseenergi":"\\[E_k=(\\gamma-1)mc^2\\]",
    "Transformatorns spänning":"\\[\\frac{U_s}{U_p}=\\frac{N_s}{N_p}\\]",
    "Fotoelektrisk effekt":"\\[E_{k,max}=hf-W\\]",
    "Jordens strålningsbalans":"\\[P_{in}=P_{ut}\\]",
    "Välj strålning efter användning":"\\[E=hf\\]"
  };
  Object.values(bank).forEach(g=>{ if(huvudformler[g.rubrik]) g.formel=huvudformler[g.rubrik]; });

  window.TYPUPPGIFTER_FY2 = bank;
})();
