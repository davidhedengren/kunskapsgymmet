/* ══════════════════════════════════════════════════════════════
   TYPUPPGIFTER MED GENOMGÅNG — Fysik 1
   Används av Kunskapsgymmets kort "Det här behöver du kunna".

   Urvalsregel: typuppgiften ska ligga på E-nivå och vara den
   absoluta grunden i delmomentet — omvandla en enhet, läsa av ett
   diagram, sätta in i sambandet. Allt som kräver en andragrads-
   ekvation, två samtidiga rörelser eller ett flerstegsresonemang
   hör hemma i träningen, inte här. Delmoment som saknar E-uppgifter
   får inget kort alls.

   Frågetexten hämtas ur banken via fältet "uppgift", så att
   typuppgiften aldrig glider isär från den uppgift eleven möter i
   träningen. Lösningen skrivs här och är avsiktligt mer utförlig
   än det vanliga facit: den ska läsas som en genomgång.

   Fälten:
     uppgift   uppgiftens id i banken (måste vara niva E)
     ram       vad delmomentet handlar om, före räkningen
     steg      [{rubrik, text, matte}] — matte är valfri
     svar      svarsmeningen
     fallgrop  det vanligaste felet
     komihag   regeln att bära med sig
   ══════════════════════════════════════════════════════════════ */
window.TYPUPPGIFTER_FY1 = {

/* ─────────────────── Kapitel 2 ─────────────────── */
  "Enhetsomvandling": {
  uppgift:"2.208",
  ram:"Att omvandla mellan km/h och m/s är den vanligaste enhetsomvandlingen i hela fysikkursen. Nästan alla formler kräver m/s, medan uppgifterna nästan alltid är skrivna i km/h.",
  steg:[
    {rubrik:"Se varför faktorn är 3,6",
     text:"En kilometer är 1000 meter och en timme är 3600 sekunder. Att gå från km/h till m/s betyder alltså att multiplicera med 1000 och dividera med 3600, vilket är samma sak som att dividera med 3,6."},
    {rubrik:"Dividera med 3,6",
     text:"Från km/h till m/s dividerar du. Från m/s till km/h multiplicerar du.",
     matte:"\\\\[v=\\\\frac{72}{3{,}6}=20\\\\ \\\\mathrm{m/s}\\\\]"},
    {rubrik:"Kontrollera att svaret blev mindre",
     text:"Ett tal i m/s ska alltid vara <em>mindre</em> än samma fart i km/h. Blev svaret större har du multiplicerat i stället för att dividera."}
  ],
  svar:"Cyklistens fart är \\\\(20\\\\ \\\\mathrm{m/s}\\\\).",
  fallgrop:"Att multiplicera med 3,6 i stället för att dividera. Kom ihåg riktningen: km/h är det stora talet, m/s det lilla.",
  komihag:"\\\\(\\\\mathrm{km/h}\\\\div 3{,}6=\\\\mathrm{m/s}\\\\) och \\\\(\\\\mathrm{m/s}\\\\times 3{,}6=\\\\mathrm{km/h}\\\\). Lär dig 36 km/h = 10 m/s som riktmärke."
},

  "Prefix, tiopotenser och storleksordning": {
  uppgift:"2.204",
  ram:"Ett prefix är inget annat än en tiopotens i förklädnad. Byter du ut prefixet mot sin tiopotens blir varje omvandling en enkel multiplikation.",
  steg:[
    {rubrik:"Slå upp prefixets tiopotens",
     text:"Mikro betyder \\\\(10^{-6}\\\\). Andra vanliga: milli \\\\(10^{-3}\\\\), centi \\\\(10^{-2}\\\\), kilo \\\\(10^{3}\\\\), mega \\\\(10^{6}\\\\), nano \\\\(10^{-9}\\\\)."},
    {rubrik:"Byt ut prefixet mot tiopotensen",
     text:"Skriv om måttet med grundenheten meter och behåll siffervärdet oförändrat.",
     matte:"\\\\[3{,}6\\\\ \\\\mu\\\\mathrm m=3{,}6\\\\cdot 10^{-6}\\\\ \\\\mathrm m\\\\]"},
    {rubrik:"Rimlighetsbedöm storleksordningen",
     text:"En mikrometer är en tusendels millimeter. Att en tunn plastfilm är några miljondels meter tjock är rimligt — hade svaret blivit några meter vore något fel."}
  ],
  svar:"Tjockleken är \\\\(3{,}6\\\\cdot 10^{-6}\\\\ \\\\mathrm m\\\\).",
  fallgrop:"Att flytta decimaltecknet åt fel håll. Ett litet prefix ger ett litet tal i grundenheten — mikro kan aldrig ge ett stort svar i meter.",
  komihag:"Byt prefixet mot dess tiopotens direkt. Då blir omvandlingen aldrig en gissning."
},

  "Area- och volymenheter": {
  uppgift:"2.205",
  ram:"Area- och volymenheter är den vanligaste fällan i hela enhetsläran, eftersom omvandlingsfaktorn ska upphöjas. Går man från m till cm med faktorn 100, går man från m² till cm² med \\\\(100^2\\\\).",
  steg:[
    {rubrik:"Skriv upp längdomvandlingen först",
     text:"En meter är 100 centimeter."},
    {rubrik:"Upphöj faktorn till samma potens som enheten",
     text:"Eftersom kvadratmeter är meter i kvadrat ska även faktorn kvadreras.",
     matte:"\\\\[1\\\\ \\\\mathrm{m^2}=(100\\\\ \\\\mathrm{cm})^2=10\\\\,000\\\\ \\\\mathrm{cm^2}\\\\]"},
    {rubrik:"Multiplicera",
     text:"Nu är det bara att sätta in.",
     matte:"\\\\[0{,}045\\\\ \\\\mathrm{m^2}=0{,}045\\\\cdot 10\\\\,000=450\\\\ \\\\mathrm{cm^2}\\\\]"},
    {rubrik:"Notera mönstret för volym",
     text:"För kubikenheter upphöjs faktorn till tre i stället: \\\\(1\\\\ \\\\mathrm{m^3}=10^6\\\\ \\\\mathrm{cm^3}\\\\)."}
  ],
  svar:"Arean är \\\\(450\\\\ \\\\mathrm{cm^2}\\\\).",
  fallgrop:"Att använda faktorn 100 rakt av och svara 4,5 cm². Faktorn måste upphöjas till samma potens som enheten.",
  komihag:"\\\\(1\\\\ \\\\mathrm{m^2}=10^4\\\\ \\\\mathrm{cm^2}\\\\) och \\\\(1\\\\ \\\\mathrm{m^3}=10^6\\\\ \\\\mathrm{cm^3}\\\\). Exponenten på enheten är exponenten på faktorn."
},

  "Omvandla densitetsenheter": {
  uppgift:"2.107",
  ram:"Densitet är en sammansatt enhet, massa per volym. Vid omvandling måste båda enheterna följas med — det är därför faktorn blir tusen och inte något annat.",
  steg:[
    {rubrik:"Ta massan och volymen var för sig",
     text:"Ett gram är \\\\(10^{-3}\\\\) kg. En kubikcentimeter är \\\\(10^{-6}\\\\) m³."},
    {rubrik:"Sätt ihop faktorn",
     text:"Massan i täljaren och volymen i nämnaren ger tillsammans faktorn tusen.",
     matte:"\\\\[1\\\\ \\\\mathrm{g/cm^3}=\\\\frac{10^{-3}\\\\ \\\\mathrm{kg}}{10^{-6}\\\\ \\\\mathrm{m^3}}=10^{3}\\\\ \\\\mathrm{kg/m^3}\\\\]"},
    {rubrik:"Multiplicera siffervärdet med tusen",
     text:"Nu går omvandlingen på ett steg.",
     matte:"\\\\[2{,}7\\\\ \\\\mathrm{g/cm^3}=2700\\\\ \\\\mathrm{kg/m^3}\\\\]"},
    {rubrik:"Använd vatten som facit",
     text:"Vatten har densiteten 1,0 g/cm³, alltså 1000 kg/m³. Kommer du ihåg det paret kan du alltid kontrollera åt vilket håll faktorn ska gå."}
  ],
  svar:"Aluminiums densitet är \\\\(2700\\\\ \\\\mathrm{kg/m^3}\\\\).",
  fallgrop:"Att dividera med 1000 i stället för att multiplicera. Talet i kg/m³ är alltid tusen gånger större.",
  komihag:"\\\\(1\\\\ \\\\mathrm{g/cm^3}=1000\\\\ \\\\mathrm{kg/m^3}\\\\). Vatten: 1,0 respektive 1000."
},

  "Massa, volym och densitet": {
  uppgift:"2.38",
  ram:"Densitetssambandet \\\\(\\\\rho=m/V\\\\) innehåller tre storheter. Känner du två av dem kan du alltid få den tredje — det gäller bara att lösa ut rätt.",
  steg:[
    {rubrik:"Skriv upp sambandet och det givna",
     text:"Densiteten är 7870 kg/m³ och volymen 0,25 m³. Det som söks är massan."},
    {rubrik:"Lös ut massan",
     text:"Multiplicera båda leden med volymen.",
     matte:"\\\\[\\\\rho=\\\\frac mV\\\\quad\\\\Longrightarrow\\\\quad m=\\\\rho V\\\\]"},
    {rubrik:"Kontrollera att enheterna passar ihop",
     text:"Densiteten är i kg/m³ och volymen i m³, så kubikmetrarna tar ut varandra och kvar blir kilogram. Hade volymen varit i liter måste den omvandlas först."},
    {rubrik:"Sätt in",
     text:"Nu kan massan beräknas.",
     matte:"\\\\[m=7870\\\\cdot 0{,}25=1967{,}5\\\\approx 1970\\\\ \\\\mathrm{kg}\\\\]"},
    {rubrik:"Skriv om i ton",
     text:"Ett ton är 1000 kg, alltså knappt två ton. Att en kvarts kubikmeter järn väger så mycket är rimligt — järn är tungt."}
  ],
  svar:"Balkens massa är cirka \\\\(1970\\\\ \\\\mathrm{kg}\\\\), det vill säga \\\\(2{,}0\\\\ \\\\mathrm{ton}\\\\).",
  fallgrop:"Att dividera i stället för att multiplicera. Kontrollera med enheterna: kg/m³ gånger m³ ger kg, medan kg/m³ delat med m³ ger något helt annat.",
  komihag:"\\\\(\\\\rho=\\\\dfrac mV\\\\), \\\\(m=\\\\rho V\\\\), \\\\(V=\\\\dfrac m\\\\rho\\\\). Kontrollera alltid att densitetens och volymens enheter hör ihop."
},

  "Densitet med geometri och volymberäkning": {
  uppgift:"2.17",
  ram:"Här kommer densiteten i två steg: först måste volymen räknas fram ur kroppens mått, sedan används densitetssambandet. Massan är given, volymen måste du skaffa själv.",
  steg:[
    {rubrik:"Beräkna volymen ur måtten",
     text:"Ett rätblocks volym är längd gånger bredd gånger höjd. Alla tre måtten är i centimeter, så volymen faller ut i kubikcentimeter direkt.",
     matte:"\\\\[V=10\\\\cdot 6{,}0\\\\cdot 4{,}0=240\\\\ \\\\mathrm{cm^3}\\\\]"},
    {rubrik:"Använd densitetssambandet",
     text:"Massan står i figuren, 288 g. Densitet är massa per volym.",
     matte:"\\\\[\\\\rho=\\\\frac mV=\\\\frac{288}{240}=1{,}20\\\\ \\\\mathrm{g/cm^3}\\\\]"},
    {rubrik:"Omvandla till kg/m³",
     text:"Faktorn mellan g/cm³ och kg/m³ är tusen.",
     matte:"\\\\[1{,}20\\\\ \\\\mathrm{g/cm^3}=1200\\\\ \\\\mathrm{kg/m^3}\\\\]"},
    {rubrik:"Bedöm rimligheten",
     text:"Materialet är alltså något tyngre än vatten. Ett svar på 12 eller 0,12 g/cm³ hade avslöjat ett fel i volymen."}
  ],
  svar:"Volymen är \\\\(240\\\\ \\\\mathrm{cm^3}\\\\) och densiteten \\\\(1{,}20\\\\ \\\\mathrm{g/cm^3}=1200\\\\ \\\\mathrm{kg/m^3}\\\\).",
  fallgrop:"Att blanda enheter i volymberäkningen, till exempel två mått i cm och ett i mm. Skriv om alla mått till samma enhet <em>innan</em> du multiplicerar.",
  komihag:"Volym först, densitet sedan. Håll alla längdmått i samma enhet, så blir volymens enhet given."
},

  "Densitet från diagram och mätdata": {
  uppgift:"2.39",
  ram:"När massan mäts för olika stora bitar av samma material ligger punkterna på en rät linje genom origo. Linjens lutning <em>är</em> densiteten — det är samma samband \\\\(m=\\\\rho V\\\\), bara ritat.",
  steg:[
    {rubrik:"Läs av en punkt i diagrammet",
     text:"Gå upp från 20 cm³ på volymaxeln till linjen och därifrån vågrätt till massaxeln.",
     matte:"\\\\[m=160\\\\ \\\\mathrm g\\\\]"},
    {rubrik:"Beräkna densiteten ur punkten",
     text:"Densitet är massa delad med volym, precis som vanligt.",
     matte:"\\\\[\\\\rho=\\\\frac{160}{20}=8{,}0\\\\ \\\\mathrm{g/cm^3}\\\\]"},
    {rubrik:"Beräkna densiteten ur lutningen",
     text:"Ta två punkter långt ifrån varandra på linjen — det ger bättre noggrannhet än två närliggande. Samma svar som förut, vilket bekräftar avläsningen.",
     matte:"\\\\[k=\\\\frac{400-0}{50-0}=8{,}0\\\\ \\\\mathrm{g/cm^3}\\\\]"},
    {rubrik:"Tolka att linjen går genom origo",
     text:"En rät linje genom origo betyder proportionalitet: dubbel volym ger dubbel massa. Det är precis vad \\\\(m=\\\\rho V\\\\) säger, och det är därför lutningen kan avläsas som densiteten."}
  ],
  svar:"En bit på \\\\(20\\\\ \\\\mathrm{cm^3}\\\\) väger \\\\(160\\\\ \\\\mathrm g\\\\), och båda metoderna ger \\\\(\\\\rho=8{,}0\\\\ \\\\mathrm{g/cm^3}\\\\).",
  fallgrop:"Att räkna lutningen som volym delat med massa. Titta på axlarna: massan står på den lodräta axeln, så lutningen är massa per volym.",
  komihag:"I ett massa–volym-diagram är lutningen densiteten. Rät linje genom origo betyder proportionalitet."
},

  "Densitet och flytförmåga": {
  uppgift:"2.41",
  ram:"Om ett ämne flyter eller sjunker avgörs inte av hur tungt det är, utan av hur det står sig mot vätskan det ligger i. Jämförelsen görs alltid mellan två densiteter.",
  steg:[
    {rubrik:"Skriv om massa och volym till samma enheter",
     text:"En liter är 1000 cm³ och 1,03 kg är 1030 g. Nu passar enheterna ihop för g/cm³."},
    {rubrik:"Beräkna densiteten",
     text:"Densitet är massa per volym.",
     matte:"\\\\[\\\\rho=\\\\frac{1030}{1000}=1{,}03\\\\ \\\\mathrm{g/cm^3}\\\\]"},
    {rubrik:"Jämför med vattnets densitet",
     text:"Vatten har densiteten 1,00 g/cm³. Mjölken är alltså något tätare än vatten och sjunker därför i vatten. Skillnaden är liten, vilket är varför mjölk och vatten blandar sig lätt i stället för att lägga sig i tydliga skikt.",
     matte:"\\\\[1{,}03>1{,}00\\\\]"}
  ],
  svar:"Mjölkens densitet är \\\\(1{,}03\\\\ \\\\mathrm{g/cm^3}\\\\), alltså något högre än vattnets, och mjölk sjunker i vatten.",
  fallgrop:"Att jämföra massor i stället för densiteter. Ett kilo bly och ett kilo kork väger lika mycket, men bara det ena flyter.",
  komihag:"Lägre densitet än vätskan ger flytande, högre ger sjunkande. Vatten: 1,00 g/cm³ = 1000 kg/m³."
},

  "Värdesiffror och avrundning": {
  uppgift:"2.230",
  ram:"Värdesiffror talar om hur noggrant ett värde är känt. Vid avrundning ska antalet siffror räknas från den första siffran som inte är en inledande nolla.",
  steg:[
    {rubrik:"Räkna ut vilka tre siffror som ska behållas",
     text:"Talet är 7,8463. De tre första värdesiffrorna är 7, 8 och 4."},
    {rubrik:"Titta på nästa siffra",
     text:"Siffran efter är 6. Eftersom den är 5 eller större rundas den sista behållna siffran uppåt, från 4 till 5."},
    {rubrik:"Skriv svaret",
     text:"Behåll exakt tre värdesiffror — varken fler eller färre.",
     matte:"\\\\[7{,}8463\\\\approx 7{,}85\\\\]"}
  ],
  svar:"\\\\(7{,}8463\\\\approx 7{,}85\\\\)",
  fallgrop:"Att avrunda i flera steg: först 7,8463 till 7,846, sedan till 7,85. Titta bara på den första siffran som faller bort.",
  komihag:"Avrunda alltid från originalvärdet, i ett enda steg. Nästa siffra 5 eller mer ger uppåt, annars nedåt."
},

  "Mätosäkerhet, värdesiffror och felgränser": {
  uppgift:"2.16",
  ram:"Att räkna värdesiffror handlar om vilka nollor som bär information. Nollor som bara markerar var decimaltecknet ligger räknas inte, medan nollor som är resultatet av en mätning gör det.",
  steg:[
    {rubrik:"Inledande nollor räknas aldrig",
     text:"I 0,04 m är nollorna bara platshållare — de talar om storleken, inte noggrannheten. Värdet har en värdesiffra."},
    {rubrik:"Nollor efter decimaltecknet räknas",
     text:"I 0,040 m är den sista nollan utskriven med avsikt: mätningen är gjord till tusendels meter. Två värdesiffror. Samma sak skiljer 25 kg från 25,0 kg."},
    {rubrik:"Avslutande nollor i ett heltal är tvetydiga",
     text:"3000 cm kan vara mätt till närmaste tusental eller till närmaste centimeter. Vill man vara tydlig skriver man \\\\(3{,}0\\\\cdot 10^3\\\\) cm för två värdesiffror."},
    {rubrik:"Gå igenom listan",
     text:"Med de tre reglerna faller alla värdena ut.",
     matte:"\\\\[\\\\begin{aligned}25\\\\ \\\\mathrm{kg}&:2 & 25{,}0\\\\ \\\\mathrm{kg}&:3\\\\\\\\ 0{,}04\\\\ \\\\mathrm m&:1 & 0{,}040\\\\ \\\\mathrm m&:2\\\\\\\\ 3000\\\\ \\\\mathrm{cm}&:\\\\text{tvetydigt} & 3{,}000\\\\ \\\\mathrm m&:4\\\\end{aligned}\\\\]"}
  ],
  svar:"Antalen är 2, 3, 1, 2, tvetydigt (1–4) samt 4 värdesiffror.",
  fallgrop:"Att räkna de inledande nollorna i 0,040 och svara fyra värdesiffror. Bara siffror från och med den första nollskilda räknas.",
  komihag:"Inledande nollor: nej. Nollor efter decimaltecknet: ja. Avslutande nollor i heltal: skriv med tiopotens så slipper du tvetydigheten."
},

  "Mätintervall och absolut osäkerhet": {
  uppgift:"2.234",
  ram:"Ett instruments upplösning är det minsta steg det kan visa. Den sätter en undre gräns för hur noggrant du kan mäta, oavsett hur försiktig du är.",
  steg:[
    {rubrik:"Titta på sista decimalen i avläsningen",
     text:"Vågen visar 83,42 g. Den sista siffran står på hundradels grams plats."},
    {rubrik:"Upplösningen är ett steg i den decimalen",
     text:"Displayen kan alltså ändras från 83,42 till 83,43, men inte till något däremellan.",
     matte:"\\\\[\\\\text{upplösning}=0{,}01\\\\ \\\\mathrm g\\\\]"},
    {rubrik:"Skilj upplösning från noggrannhet",
     text:"Att vågen visar hundradels gram betyder inte att den är rätt på hundradels gram. En våg kan visa många decimaler och ändå ha ett systematiskt fel."}
  ],
  svar:"Vågens upplösning är \\\\(0{,}01\\\\ \\\\mathrm g\\\\).",
  fallgrop:"Att svara 0,42 g eller 83,42 g. Frågan gäller stegets storlek, inte avläsningen.",
  komihag:"Upplösningen är ett steg i den sista visade decimalen. Hög upplösning garanterar inte hög noggrannhet."
},

  "Relativ och procentuell osäkerhet": {
  uppgift:"2.239",
  ram:"Den absoluta osäkerheten anges i mätvärdets egen enhet, den relativa som en andel av mätvärdet. Den relativa säger mer om mätningens kvalitet, eftersom 0,5 g är mycket på ett gram men lite på ett kilo.",
  steg:[
    {rubrik:"Identifiera de två talen",
     text:"Mätvärdet är 50,0 g och den absoluta osäkerheten 0,5 g. Det är talet efter plusminustecknet som är osäkerheten."},
    {rubrik:"Dividera osäkerheten med mätvärdet",
     text:"Kvoten är den relativa osäkerheten, ett rent tal utan enhet.",
     matte:"\\\\[\\\\frac{0{,}5}{50{,}0}=0{,}010\\\\]"},
    {rubrik:"Skriv om i procent",
     text:"Multiplicera med 100 procent.",
     matte:"\\\\[0{,}010\\\\cdot 100\\\\,\\\\%=1{,}0\\\\,\\\\%\\\\]"}
  ],
  svar:"Den procentuella osäkerheten är \\\\(1{,}0\\\\,\\\\%\\\\).",
  fallgrop:"Att dividera mätvärdet med osäkerheten och få 100. Osäkerheten står alltid i täljaren.",
  komihag:"Relativ osäkerhet \\\\(=\\\\dfrac{\\\\text{absolut osäkerhet}}{\\\\text{mätvärde}}\\\\), gånger 100 % om svaret ska vara i procent."
},

  "Upprepade mätningar och spridning": {
  uppgift:"2.240",
  ram:"Upprepade mätningar av samma storhet ger sällan exakt samma värde. Medelvärdet är det bästa enskilda skattningen, och spridningen mellan värdena säger hur säker den är.",
  steg:[
    {rubrik:"Summera mätvärdena",
     text:"Lägg ihop alla tre.",
     matte:"\\\\[5{,}12+5{,}15+5{,}14=15{,}41\\\\ \\\\mathrm{cm}\\\\]"},
    {rubrik:"Dividera med antalet mätningar",
     text:"Tre mätningar ger division med tre.",
     matte:"\\\\[\\\\bar x=\\\\frac{15{,}41}{3}=5{,}1367\\\\ \\\\mathrm{cm}\\\\]"},
    {rubrik:"Avrunda till mätningarnas noggrannhet",
     text:"Mätvärdena är angivna med hundradels centimeter, och medelvärdet kan inte bli noggrannare än de värden det bygger på. Svara därför med lika många decimaler.",
     matte:"\\\\[\\\\bar x\\\\approx 5{,}14\\\\ \\\\mathrm{cm}\\\\]"}
  ],
  svar:"Medelvärdet är \\\\(5{,}14\\\\ \\\\mathrm{cm}\\\\).",
  fallgrop:"Att skriva ut hela miniräknarens svar, 5,136666… Ett medelvärde blir inte noggrannare än mätningarna bakom det.",
  komihag:"Medelvärde = summan delad med antalet, avrundat till samma noggrannhet som mätvärdena."
},

  "Mätmetod och experimentdesign": {
  uppgift:"2.243",
  ram:"Att mäta flera perioder på en gång och sedan dela är ett standardgrepp i laborationer. Reaktionstiden vid start och stopp blir densamma oavsett hur många svängningar man mäter, så felet per period krymper.",
  steg:[
    {rubrik:"Se vad som faktiskt mättes",
     text:"Klockan mätte tiden för 10 hela svängningar, inte för en. Perioden är tiden för <em>en</em> svängning."},
    {rubrik:"Dividera med antalet perioder",
     text:"Total tid delas med antalet svängningar.",
     matte:"\\\\[T=\\\\frac{14{,}8}{10}=1{,}48\\\\ \\\\mathrm s\\\\]"},
    {rubrik:"Förstå varför metoden används",
     text:"Om du missar med 0,2 s vid start och stopp blir felet 0,2 s på en enda period, men bara 0,02 s per period när tio mäts. Samma mätfel, tio gånger mindre inverkan."}
  ],
  svar:"Pendelns period är \\\\(1{,}48\\\\ \\\\mathrm s\\\\).",
  fallgrop:"Att svara 14,8 s. Det är tiden för tio svängningar, inte för en.",
  komihag:"Mät många perioder och dela med antalet. Det minskar reaktionstidens inverkan utan extra utrustning."
},

  "Systematiska och slumpmässiga fel": {
  uppgift:"2.245",
  ram:"Ett systematiskt fel drar alla mätvärden åt samma håll och försvinner därför inte av att man mäter fler gånger. Ett slumpmässigt fel varierar och kan minskas med upprepade mätningar. Kan man bestämma det systematiska felet kan man räkna bort det.",
  steg:[
    {rubrik:"Bestäm felets riktning",
     text:"Vågen visar 0,20 kg för mycket vid varje vägning. Det är ett positivt nollfel, och det är lika stort oavsett vem som väger sig."},
    {rubrik:"Korrigera åt motsatt håll",
     text:"Eftersom vågen lägger till 0,20 kg drar du bort lika mycket från avläsningen.",
     matte:"\\\\[m=72{,}40-0{,}20=72{,}20\\\\ \\\\mathrm{kg}\\\\]"},
    {rubrik:"Lägg märke till att fler vägningar inte hjälper",
     text:"Väger personen sig tio gånger visar vågen 72,40 kg varje gång. Det är just detta som skiljer ett systematiskt fel från ett slumpmässigt."}
  ],
  svar:"Den korrigerade massan är \\\\(72{,}20\\\\ \\\\mathrm{kg}\\\\).",
  fallgrop:"Att addera felet i stället för att subtrahera. Visar instrumentet för mycket ska du dra bort, inte lägga till.",
  komihag:"Systematiskt fel: samma åt samma håll varje gång, kan korrigeras bort. Slumpmässigt fel: varierar, minskas av upprepade mätningar."
},

/* ─────────────────── Kapitel 3 ─────────────────── */

  "Likformig rörelse": {
  uppgift:"3.99",
  ram:"Likformig rörelse betyder konstant fart, och då gäller \\\\(s=vt\\\\). Sambandet kan användas åt alla håll — det gäller bara att lösa ut rätt storhet och att ha enheterna på plats först.",
  steg:[
    {rubrik:"Omvandla farten till m/s",
     text:"Sträckan är given i meter och tiden i sekunder, så farten måste vara i m/s. Dividera km/h med 3,6.",
     matte:"\\\\[v=\\\\frac{80}{3{,}6}=22{,}2\\\\ \\\\mathrm{m/s}\\\\]"},
    {rubrik:"a) Lös ut tiden",
     text:"Ur \\\\(v=s/t\\\\) fås tiden genom att dividera sträckan med farten.",
     matte:"\\\\[t=\\\\frac sv=\\\\frac{150}{22{,}2}=6{,}75\\\\approx 6{,}8\\\\ \\\\mathrm s\\\\]"},
    {rubrik:"b) Lös ut sträckan",
     text:"Åt andra hållet är det bara en multiplikation.",
     matte:"\\\\[s=vt=22{,}2\\\\cdot 2{,}5=55{,}6\\\\approx 56\\\\ \\\\mathrm m\\\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"22 m/s är drygt tjugo meter per sekund, så 150 m borde ta knappt sju sekunder och 2,5 s borde räcka till ungefär femtio meter. Båda svaren stämmer med den känslan."}
  ],
  svar:"Det tar cirka \\\\(6{,}8\\\\ \\\\mathrm s\\\\) att köra 150 m, och bilen hinner cirka \\\\(56\\\\ \\\\mathrm m\\\\) på 2,5 s.",
  fallgrop:"Att sätta in 80 direkt i formeln. Blandas km/h med meter och sekunder blir svaret fel med en faktor 3,6.",
  komihag:"\\\\(s=vt\\\\), \\\\(v=\\\\dfrac st\\\\), \\\\(t=\\\\dfrac sv\\\\). Kontrollera enheterna innan du räknar, inte efteråt."
},

  "Medelhastighet": {
  uppgift:"3.126",
  ram:"Medelhastighet är hela sträckan delad med hela tiden. Den är inte medelvärdet av farterna under resan, och den säger ingenting om hur farten varierat på vägen.",
  steg:[
    {rubrik:"Skriv upp det givna",
     text:"Sträckan är 340 km och tiden 2 timmar och 50 minuter. Svaret ska anges i km/h."},
    {rubrik:"Gör om tiden till en enda enhet",
     text:"Eftersom svaret ska vara i km/h måste tiden uttryckas i timmar. Femtio minuter är femtio sextiondelar av en timme.",
     matte:"\\\\[t=2+\\\\frac{50}{60}=2{,}833\\\\ \\\\mathrm h\\\\]"},
    {rubrik:"Dividera sträckan med tiden",
     text:"Med både sträcka och tid i rätt enheter faller svaret ut direkt.",
     matte:"\\\\[v_{\\\\mathrm{med}}=\\\\frac st=\\\\frac{340}{2{,}833}=120\\\\ \\\\mathrm{km/h}\\\\]"},
    {rubrik:"Kontrollera baklänges",
     text:"Multiplicera tillbaka: \\\\(120\\\\cdot 2{,}833\\\\approx 340\\\\). Det stämmer. En sådan kontroll tar fem sekunder och fångar nästan alla enhetsfel."}
  ],
  svar:"Tågets medelhastighet är \\\\(120\\\\ \\\\mathrm{km/h}\\\\).",
  fallgrop:"Att skriva 2 h 50 min som 2,50 h. Minuter är sextiondelar, inte hundradelar — 2,50 h är 2 timmar och 30 minuter.",
  komihag:"\\\\(v_{\\\\mathrm{med}}=s_{\\\\mathrm{tot}}/t_{\\\\mathrm{tot}}\\\\). Enheten som svaret ska ha bestämmer vilken enhet tiden måste skrivas i."
},

  "Relativ hastighet": {
  uppgift:"3.175",
  ram:"En hastighet är alltid angiven i förhållande till något. Här finns tre olika: planet relativt luften, luften relativt marken, och planet relativt marken. Att hålla isär dem är hela poängen.",
  steg:[
    {rubrik:"Namnge de tre hastigheterna",
     text:"Planets fart genom luften är 240 km/h. Luften rör sig med 40 km/h, och eftersom det är motvind rör den sig <em>mot</em> planets färdriktning. Det som söks är farten relativt marken."},
    {rubrik:"Välj en positiv riktning",
     text:"Sätt planets färdriktning som positiv. Då är planets fart genom luften \\\\(+240\\\\) km/h och vindens hastighet \\\\(-40\\\\) km/h."},
    {rubrik:"Addera hastigheterna",
     text:"Hastigheter relativt olika saker adderas som riktade storheter längs samma linje.",
     matte:"\\\\[v_{\\\\text{plan/mark}}=240+(-40)=200\\\\ \\\\mathrm{km/h}\\\\]"},
    {rubrik:"Pröva mot två gränsfall",
     text:"Vid vindstilla skulle svaret bli 240 km/h och med 40 km/h medvind 280 km/h. Motvind måste ge något mindre än 240, och 200 ligger rätt."}
  ],
  svar:"Planets fart relativt marken är \\\\(200\\\\ \\\\mathrm{km/h}\\\\).",
  fallgrop:"Att lära sig att vind alltid subtraheras. Det är riktningen som avgör: medvind adderas, motvind subtraheras. Sätt ut tecknen först, räkna sedan.",
  komihag:"\\\\(v_{A/C}=v_{A/B}+v_{B/C}\\\\). Ge varje riktning ett tecken, så blir all relativ rörelse addition."
},

  "Konstant acceleration": {
  uppgift:"3.190",
  ram:"Acceleration är hastighetsändring per tidsenhet. Enheten m/s² läses som meter per sekund, per sekund: hur många m/s farten ändras varje sekund.",
  steg:[
    {rubrik:"Skriv upp begynnelse- och sluttillstånd",
     text:"Geparden startar från vila, alltså \\\\(v_1=0\\\\), och når \\\\(v_2=30{,}0\\\\ \\\\mathrm{m/s}\\\\). Förloppet tar \\\\(\\\\Delta t=7{,}00\\\\ \\\\mathrm s\\\\)."},
    {rubrik:"Använd definitionen av acceleration",
     text:"Accelerationen är hastighetsändringen delad med tiden det tog.",
     matte:"\\\\[a=\\\\frac{\\\\Delta v}{\\\\Delta t}=\\\\frac{v_2-v_1}{\\\\Delta t}=\\\\frac{30{,}0-0}{7{,}00}=4{,}29\\\\ \\\\mathrm{m/s^2}\\\\]"},
    {rubrik:"Läs svaret i ord",
     text:"Farten ökar med 4,29 m/s varje sekund. Efter en sekund håller geparden alltså drygt 4 m/s, efter två drygt 8 m/s, och så vidare — det är precis vad konstant acceleration betyder."},
    {rubrik:"Notera vad tecknet betyder",
     text:"Här är accelerationen positiv eftersom farten ökar. Hade djuret bromsat hade \\\\(v_2\\\\) varit mindre än \\\\(v_1\\\\), och accelerationen blivit negativ."}
  ],
  svar:"Gepardens acceleration är \\\\(4{,}29\\\\ \\\\mathrm{m/s^2}\\\\).",
  fallgrop:"Att dividera sluthastigheten med tiden utan att tänka på begynnelsehastigheten. Här går det bra eftersom starten sker från vila, men så fort \\\\(v_1\\\\neq 0\\\\) blir svaret fel.",
  komihag:"\\\\(a=\\\\dfrac{v_2-v_1}{\\\\Delta t}\\\\). Det är alltid <em>ändringen</em> i hastighet som ska stå i täljaren."
},

  "Reaktions- och bromssträcka": {
  uppgift:"3.185",
  ram:"En stoppsträcka består av två helt olika rörelser efter varandra: likformig rörelse under förarens reaktionstid, och likformigt retarderad rörelse under själva bromsningen. De måste räknas var för sig.",
  steg:[
    {rubrik:"Omvandla farten till m/s",
     text:"Accelerationen är given i m/s², så farten måste vara i m/s.",
     matte:"\\\\[v=\\\\frac{72}{3{,}6}=20{,}0\\\\ \\\\mathrm{m/s}\\\\]"},
    {rubrik:"Beräkna reaktionssträckan",
     text:"Under reaktionstiden händer ingenting med farten — bilen rullar vidare oförändrat medan föraren hinner uppfatta och reagera. Det är likformig rörelse.",
     matte:"\\\\[s_r=v\\\\,t_r=20{,}0\\\\cdot 0{,}9=18{,}0\\\\ \\\\mathrm m\\\\]"},
    {rubrik:"Beräkna bromssträckan",
     text:"Nu börjar retardationen. Tiden för bromsningen är inte given, så använd sambandet som saknar tid. Vid stopp är sluthastigheten noll.",
     matte:"\\\\[s_b=\\\\frac{v^2}{2a}=\\\\frac{20{,}0^2}{2\\\\cdot 6{,}0}=33{,}3\\\\ \\\\mathrm m\\\\]"},
    {rubrik:"Lägg ihop delarna",
     text:"Stoppsträckan är summan av de två sträckorna.",
     matte:"\\\\[s=18{,}0+33{,}3=51{,}3\\\\approx 51\\\\ \\\\mathrm m\\\\]"},
    {rubrik:"Se vad resultatet betyder",
     text:"Vid 72 km/h behövs alltså drygt femtio meter för att stanna, och en tredjedel av sträckan går åt innan bromsen ens har gripit."}
  ],
  svar:"Den totala stoppsträckan är cirka \\\\(51\\\\ \\\\mathrm m\\\\).",
  fallgrop:"Att låta bilen bromsa under hela förloppet och räkna \\\\(s=v^2/(2a)\\\\) rakt av. Under reaktionstiden bromsar bilen inte alls.",
  komihag:"\\\\(s_{\\\\text{stopp}}=v\\\\,t_r+\\\\dfrac{v^2}{2a}\\\\). Dubblad fart ger dubbelt så lång reaktionssträcka men <em>fyra gånger</em> så lång bromssträcka."
},

  "Lodrät kast och fritt fall": {
  uppgift:"3.72",
  ram:"Vid fritt fall från vila gäller två samband: höjden växer som \\\\(h=gt^2/2\\\\) och farten som \\\\(v=gt\\\\). Accelerationen är \\\\(g=9{,}82\\\\ \\\\mathrm{m/s^2}\\\\) hela vägen ned, och massan spelar ingen roll.",
  steg:[
    {rubrik:"Välj riktning och skriv upp det givna",
     text:"Räkna nedåt som positiv riktning. Stenen släpps, alltså är begynnelsefarten noll, och fallhöjden är 45 m."},
    {rubrik:"a) Lös ut falltiden",
     text:"Ur \\\\(h=gt^2/2\\\\) fås tiden genom att flytta om och dra roten ur.",
     matte:"\\\\[t=\\\\sqrt{\\\\frac{2h}{g}}=\\\\sqrt{\\\\frac{2\\\\cdot 45}{9{,}82}}=3{,}03\\\\ \\\\mathrm s\\\\]"},
    {rubrik:"b) Beräkna farten vid marken",
     text:"Farten växer linjärt med tiden när accelerationen är konstant.",
     matte:"\\\\[v=gt=9{,}82\\\\cdot 3{,}03=29{,}7\\\\ \\\\mathrm{m/s}\\\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"Knappt 30 m/s är ungefär 107 km/h. Att ett fall från fyrtiofem meter — en fjortonvåningshus — ger motorvägsfart är rimligt, och visar varför fallhöjd är farligt."}
  ],
  svar:"Fallet tar cirka \\\\(3{,}0\\\\ \\\\mathrm s\\\\), och stenen träffar marken med farten cirka \\\\(30\\\\ \\\\mathrm{m/s}\\\\).",
  fallgrop:"Att glömma tvåan under rottecknet och räkna \\\\(t=\\\\sqrt{h/g}\\\\). Kontrollera alltid formeln innan du sätter in.",
  komihag:"Fritt fall från vila: \\\\(h=\\\\dfrac{gt^2}{2}\\\\) och \\\\(v=gt\\\\). Massan påverkar inte fallet när luftmotståndet försummas."
},

  "Lutning och area i rörelsediagram": {
  uppgift:"3.241",
  ram:"Ett rörelsediagram besvarar två sorters frågor: en om <em>lutningen</em> och en om <em>arean</em>. Vilken som är den rätta beror helt på vad axlarna visar, så läs alltid axlarna innan du räknar.",
  steg:[
    {rubrik:"Läs av axlarna",
     text:"Den lodräta axeln visar hastigheten i m/s och den vågräta tiden i sekunder. Det är alltså ett hastighet–tid-diagram."},
    {rubrik:"Avgör om det är lutning eller area som söks",
     text:"Frågan gäller förflyttningen, alltså en sträcka. Titta på enheterna: hastighet gånger tid ger \\\\(\\\\mathrm{m/s}\\\\cdot\\\\mathrm s=\\\\mathrm m\\\\). Det är en area i diagrammet. Lutningen hade gett \\\\(\\\\mathrm{m/s^2}\\\\), alltså acceleration."},
    {rubrik:"Beräkna arean under kurvan",
     text:"Hastigheten är konstant, så området under kurvan är en rektangel med höjden 4 m/s och bredden 5 s.",
     matte:"\\\\[s=v\\\\,t=4\\\\cdot 5=20\\\\ \\\\mathrm m\\\\]"},
    {rubrik:"Lär dig de fyra fallen på en gång",
     text:"I ett läge–tid-diagram är lutningen hastigheten, och arean betyder ingenting. I ett hastighet–tid-diagram är lutningen accelerationen och arean förflyttningen."}
  ],
  svar:"Föremålet förflyttas \\\\(20\\\\ \\\\mathrm m\\\\).",
  fallgrop:"Att räkna ut lutningen när förflyttningen efterfrågas. I ett hastighet–tid-diagram är lutningen accelerationen, inte sträckan.",
  komihag:"Läge–tid: lutning = hastighet. Hastighet–tid: lutning = acceleration, area = förflyttning."
},

  "Tolka och rita rörelsediagram": {
  uppgift:"3.40",
  ram:"Ur ett läge–tid-diagram läses tre saker av: kurvans värde talar om var föremålet är, kurvans lutning hur fort det rör sig, och lutningens tecken åt vilket håll.",
  steg:[
    {rubrik:"a) Läs av läget vid en given tidpunkt",
     text:"Gå upp från \\\\(t=4{,}0\\\\ \\\\mathrm s\\\\) på tidsaxeln till kurvan, och därifrån vågrätt till lägesaxeln. Här är det bara ett avläsningsvärde, ingen lutning.",
     matte:"\\\\[s(4{,}0)=8{,}0\\\\ \\\\mathrm m\\\\]"},
    {rubrik:"b) Tolka den vågräta delen",
     text:"Mellan 4 och 7 sekunder ligger kurvan vågrätt. Läget ändras inte alls, och då är hastigheten noll — personen står stilla. Vågrät kurva betyder alltså inte konstant fart, utan ingen fart.",
     matte:"\\\\[\\\\Delta s=0\\\\quad\\\\Longrightarrow\\\\quad v=0\\\\]"},
    {rubrik:"c) Bestäm hastigheten ur lutningen",
     text:"Under den sista delen går läget från 8,0 m tillbaka till 0, mellan 7 s och 12 s. Hastigheten är lutningen, alltså lägesändringen delad med tidsändringen.",
     matte:"\\\\[v=\\\\frac{\\\\Delta s}{\\\\Delta t}=\\\\frac{0-8{,}0}{12-7}=-1{,}6\\\\ \\\\mathrm{m/s}\\\\]"},
    {rubrik:"Tolka minustecknet",
     text:"Den negativa hastigheten betyder att personen rör sig tillbaka mot startpunkten. Farten är konstant hela vägen — det är riktningen som är omvänd, inte hastigheten som avtar."}
  ],
  svar:"Personen är 8,0 m från start efter 4,0 s, står stilla mellan 4 och 7 s och går sedan tillbaka med hastigheten \\\\(-1{,}6\\\\ \\\\mathrm{m/s}\\\\).",
  fallgrop:"Att läsa en fallande linje som att farten minskar. En rät fallande linje i ett läge–tid-diagram betyder konstant fart i negativ riktning.",
  komihag:"Vågrät linje: stillastående. Rät lutande linje: konstant hastighet. Krökt kurva: hastigheten ändras, alltså acceleration."
}
};
