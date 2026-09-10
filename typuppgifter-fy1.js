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
     matte:"\\[v=\\frac{72}{3{,}6}=20\\ \\mathrm{m/s}\\]"},
    {rubrik:"Kontrollera att svaret blev mindre",
     text:"Ett tal i m/s ska alltid vara <em>mindre</em> än samma fart i km/h. Blev svaret större har du multiplicerat i stället för att dividera."}
  ],
  svar:"Cyklistens fart är \\(20\\ \\mathrm{m/s}\\).",
  fallgrop:"Att multiplicera med 3,6 i stället för att dividera. Kom ihåg riktningen: km/h är det stora talet, m/s det lilla.",
  komihag:"\\(\\mathrm{km/h}\\div 3{,}6=\\mathrm{m/s}\\) och \\(\\mathrm{m/s}\\times 3{,}6=\\mathrm{km/h}\\). Lär dig 36 km/h = 10 m/s som riktmärke."
},

  "Prefix, tiopotenser och storleksordning": {
  uppgift:"2.204",
  ram:"Ett prefix är inget annat än en tiopotens i förklädnad. Byter du ut prefixet mot sin tiopotens blir varje omvandling en enkel multiplikation.",
  steg:[
    {rubrik:"Slå upp prefixets tiopotens",
     text:"Mikro betyder \\(10^{-6}\\). Andra vanliga: milli \\(10^{-3}\\), centi \\(10^{-2}\\), kilo \\(10^{3}\\), mega \\(10^{6}\\), nano \\(10^{-9}\\)."},
    {rubrik:"Byt ut prefixet mot tiopotensen",
     text:"Skriv om måttet med grundenheten meter och behåll siffervärdet oförändrat.",
     matte:"\\[3{,}6\\ \\mu\\mathrm m=3{,}6\\cdot 10^{-6}\\ \\mathrm m\\]"},
    {rubrik:"Rimlighetsbedöm storleksordningen",
     text:"En mikrometer är en tusendels millimeter. Att en tunn plastfilm är några miljondels meter tjock är rimligt — hade svaret blivit några meter vore något fel."}
  ],
  svar:"Tjockleken är \\(3{,}6\\cdot 10^{-6}\\ \\mathrm m\\).",
  fallgrop:"Att flytta decimaltecknet åt fel håll. Ett litet prefix ger ett litet tal i grundenheten — mikro kan aldrig ge ett stort svar i meter.",
  komihag:"Byt prefixet mot dess tiopotens direkt. Då blir omvandlingen aldrig en gissning."
},

  "Area- och volymenheter": {
  uppgift:"2.205",
  ram:"Area- och volymenheter är den vanligaste fällan i hela enhetsläran, eftersom omvandlingsfaktorn ska upphöjas. Går man från m till cm med faktorn 100, går man från m² till cm² med \\(100^2\\).",
  steg:[
    {rubrik:"Skriv upp längdomvandlingen först",
     text:"En meter är 100 centimeter."},
    {rubrik:"Upphöj faktorn till samma potens som enheten",
     text:"Eftersom kvadratmeter är meter i kvadrat ska även faktorn kvadreras.",
     matte:"\\[1\\ \\mathrm{m^2}=(100\\ \\mathrm{cm})^2=10\\,000\\ \\mathrm{cm^2}\\]"},
    {rubrik:"Multiplicera",
     text:"Nu är det bara att sätta in.",
     matte:"\\[0{,}045\\ \\mathrm{m^2}=0{,}045\\cdot 10\\,000=450\\ \\mathrm{cm^2}\\]"},
    {rubrik:"Notera mönstret för volym",
     text:"För kubikenheter upphöjs faktorn till tre i stället: \\(1\\ \\mathrm{m^3}=10^6\\ \\mathrm{cm^3}\\)."}
  ],
  svar:"Arean är \\(450\\ \\mathrm{cm^2}\\).",
  fallgrop:"Att använda faktorn 100 rakt av och svara 4,5 cm². Faktorn måste upphöjas till samma potens som enheten.",
  komihag:"\\(1\\ \\mathrm{m^2}=10^4\\ \\mathrm{cm^2}\\) och \\(1\\ \\mathrm{m^3}=10^6\\ \\mathrm{cm^3}\\). Exponenten på enheten är exponenten på faktorn."
},

  "Omvandla densitetsenheter": {
  uppgift:"2.107",
  ram:"Densitet är en sammansatt enhet, massa per volym. Vid omvandling måste båda enheterna följas med — det är därför faktorn blir tusen och inte något annat.",
  steg:[
    {rubrik:"Ta massan och volymen var för sig",
     text:"Ett gram är \\(10^{-3}\\) kg. En kubikcentimeter är \\(10^{-6}\\) m³."},
    {rubrik:"Sätt ihop faktorn",
     text:"Massan i täljaren och volymen i nämnaren ger tillsammans faktorn tusen.",
     matte:"\\[1\\ \\mathrm{g/cm^3}=\\frac{10^{-3}\\ \\mathrm{kg}}{10^{-6}\\ \\mathrm{m^3}}=10^{3}\\ \\mathrm{kg/m^3}\\]"},
    {rubrik:"Multiplicera siffervärdet med tusen",
     text:"Nu går omvandlingen på ett steg.",
     matte:"\\[2{,}7\\ \\mathrm{g/cm^3}=2700\\ \\mathrm{kg/m^3}\\]"},
    {rubrik:"Använd vatten som facit",
     text:"Vatten har densiteten 1,0 g/cm³, alltså 1000 kg/m³. Kommer du ihåg det paret kan du alltid kontrollera åt vilket håll faktorn ska gå."}
  ],
  svar:"Aluminiums densitet är \\(2700\\ \\mathrm{kg/m^3}\\).",
  fallgrop:"Att dividera med 1000 i stället för att multiplicera. Talet i kg/m³ är alltid tusen gånger större.",
  komihag:"\\(1\\ \\mathrm{g/cm^3}=1000\\ \\mathrm{kg/m^3}\\). Vatten: 1,0 respektive 1000."
},

  "Massa, volym och densitet": {
  uppgift:"2.38",
  ram:"Densitetssambandet \\(\\rho=m/V\\) innehåller tre storheter. Känner du två av dem kan du alltid få den tredje — det gäller bara att lösa ut rätt.",
  steg:[
    {rubrik:"Skriv upp sambandet och det givna",
     text:"Densiteten är 7870 kg/m³ och volymen 0,25 m³. Det som söks är massan."},
    {rubrik:"Lös ut massan",
     text:"Multiplicera båda leden med volymen.",
     matte:"\\[\\rho=\\frac mV\\quad\\Longrightarrow\\quad m=\\rho V\\]"},
    {rubrik:"Kontrollera att enheterna passar ihop",
     text:"Densiteten är i kg/m³ och volymen i m³, så kubikmetrarna tar ut varandra och kvar blir kilogram. Hade volymen varit i liter måste den omvandlas först."},
    {rubrik:"Sätt in",
     text:"Nu kan massan beräknas.",
     matte:"\\[m=7870\\cdot 0{,}25=1967{,}5\\approx 1970\\ \\mathrm{kg}\\]"},
    {rubrik:"Skriv om i ton",
     text:"Ett ton är 1000 kg, alltså knappt två ton. Att en kvarts kubikmeter järn väger så mycket är rimligt — järn är tungt."}
  ],
  svar:"Balkens massa är cirka \\(1970\\ \\mathrm{kg}\\), det vill säga \\(2{,}0\\ \\mathrm{ton}\\).",
  fallgrop:"Att dividera i stället för att multiplicera. Kontrollera med enheterna: kg/m³ gånger m³ ger kg, medan kg/m³ delat med m³ ger något helt annat.",
  komihag:"\\(\\rho=\\dfrac mV\\), \\(m=\\rho V\\), \\(V=\\dfrac m\\rho\\). Kontrollera alltid att densitetens och volymens enheter hör ihop."
},

  "Densitet med geometri och volymberäkning": {
  uppgift:"2.17",
  ram:"Här kommer densiteten i två steg: först måste volymen räknas fram ur kroppens mått, sedan används densitetssambandet. Massan är given, volymen måste du skaffa själv.",
  steg:[
    {rubrik:"Beräkna volymen ur måtten",
     text:"Ett rätblocks volym är längd gånger bredd gånger höjd. Alla tre måtten är i centimeter, så volymen faller ut i kubikcentimeter direkt.",
     matte:"\\[V=10\\cdot 6{,}0\\cdot 4{,}0=240\\ \\mathrm{cm^3}\\]"},
    {rubrik:"Använd densitetssambandet",
     text:"Massan står i figuren, 288 g. Densitet är massa per volym.",
     matte:"\\[\\rho=\\frac mV=\\frac{288}{240}=1{,}20\\ \\mathrm{g/cm^3}\\]"},
    {rubrik:"Omvandla till kg/m³",
     text:"Faktorn mellan g/cm³ och kg/m³ är tusen.",
     matte:"\\[1{,}20\\ \\mathrm{g/cm^3}=1200\\ \\mathrm{kg/m^3}\\]"},
    {rubrik:"Bedöm rimligheten",
     text:"Materialet är alltså något tyngre än vatten. Ett svar på 12 eller 0,12 g/cm³ hade avslöjat ett fel i volymen."}
  ],
  svar:"Volymen är \\(240\\ \\mathrm{cm^3}\\) och densiteten \\(1{,}20\\ \\mathrm{g/cm^3}=1200\\ \\mathrm{kg/m^3}\\).",
  fallgrop:"Att blanda enheter i volymberäkningen, till exempel två mått i cm och ett i mm. Skriv om alla mått till samma enhet <em>innan</em> du multiplicerar.",
  komihag:"Volym först, densitet sedan. Håll alla längdmått i samma enhet, så blir volymens enhet given."
},

  "Densitet från diagram och mätdata": {
  uppgift:"2.39",
  ram:"När massan mäts för olika stora bitar av samma material ligger punkterna på en rät linje genom origo. Linjens lutning <em>är</em> densiteten — det är samma samband \\(m=\\rho V\\), bara ritat.",
  steg:[
    {rubrik:"Läs av en punkt i diagrammet",
     text:"Gå upp från 20 cm³ på volymaxeln till linjen och därifrån vågrätt till massaxeln.",
     matte:"\\[m=160\\ \\mathrm g\\]"},
    {rubrik:"Beräkna densiteten ur punkten",
     text:"Densitet är massa delad med volym, precis som vanligt.",
     matte:"\\[\\rho=\\frac{160}{20}=8{,}0\\ \\mathrm{g/cm^3}\\]"},
    {rubrik:"Beräkna densiteten ur lutningen",
     text:"Ta två punkter långt ifrån varandra på linjen — det ger bättre noggrannhet än två närliggande. Samma svar som förut, vilket bekräftar avläsningen.",
     matte:"\\[k=\\frac{400-0}{50-0}=8{,}0\\ \\mathrm{g/cm^3}\\]"},
    {rubrik:"Tolka att linjen går genom origo",
     text:"En rät linje genom origo betyder proportionalitet: dubbel volym ger dubbel massa. Det är precis vad \\(m=\\rho V\\) säger, och det är därför lutningen kan avläsas som densiteten."}
  ],
  svar:"En bit på \\(20\\ \\mathrm{cm^3}\\) väger \\(160\\ \\mathrm g\\), och båda metoderna ger \\(\\rho=8{,}0\\ \\mathrm{g/cm^3}\\).",
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
     matte:"\\[\\rho=\\frac{1030}{1000}=1{,}03\\ \\mathrm{g/cm^3}\\]"},
    {rubrik:"Jämför med vattnets densitet",
     text:"Vatten har densiteten 1,00 g/cm³. Mjölken är alltså något tätare än vatten och sjunker därför i vatten. Skillnaden är liten, vilket är varför mjölk och vatten blandar sig lätt i stället för att lägga sig i tydliga skikt.",
     matte:"\\[1{,}03>1{,}00\\]"}
  ],
  svar:"Mjölkens densitet är \\(1{,}03\\ \\mathrm{g/cm^3}\\), alltså något högre än vattnets, och mjölk sjunker i vatten.",
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
     matte:"\\[7{,}8463\\approx 7{,}85\\]"}
  ],
  svar:"\\(7{,}8463\\approx 7{,}85\\)",
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
     text:"3000 cm kan vara mätt till närmaste tusental eller till närmaste centimeter. Vill man vara tydlig skriver man \\(3{,}0\\cdot 10^3\\) cm för två värdesiffror."},
    {rubrik:"Gå igenom listan",
     text:"Med de tre reglerna faller alla värdena ut.",
     matte:"\\[\\begin{aligned}25\\ \\mathrm{kg}&:2 & 25{,}0\\ \\mathrm{kg}&:3\\\\ 0{,}04\\ \\mathrm m&:1 & 0{,}040\\ \\mathrm m&:2\\\\ 3000\\ \\mathrm{cm}&:\\text{tvetydigt} & 3{,}000\\ \\mathrm m&:4\\end{aligned}\\]"}
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
     matte:"\\[\\text{upplösning}=0{,}01\\ \\mathrm g\\]"},
    {rubrik:"Skilj upplösning från noggrannhet",
     text:"Att vågen visar hundradels gram betyder inte att den är rätt på hundradels gram. En våg kan visa många decimaler och ändå ha ett systematiskt fel."}
  ],
  svar:"Vågens upplösning är \\(0{,}01\\ \\mathrm g\\).",
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
     matte:"\\[\\frac{0{,}5}{50{,}0}=0{,}010\\]"},
    {rubrik:"Skriv om i procent",
     text:"Multiplicera med 100 procent.",
     matte:"\\[0{,}010\\cdot 100\\,\\%=1{,}0\\,\\%\\]"}
  ],
  svar:"Den procentuella osäkerheten är \\(1{,}0\\,\\%\\).",
  fallgrop:"Att dividera mätvärdet med osäkerheten och få 100. Osäkerheten står alltid i täljaren.",
  komihag:"Relativ osäkerhet \\(=\\dfrac{\\text{absolut osäkerhet}}{\\text{mätvärde}}\\), gånger 100 % om svaret ska vara i procent."
},

  "Upprepade mätningar och spridning": {
  uppgift:"2.240",
  ram:"Upprepade mätningar av samma storhet ger sällan exakt samma värde. Medelvärdet är det bästa enskilda skattningen, och spridningen mellan värdena säger hur säker den är.",
  steg:[
    {rubrik:"Summera mätvärdena",
     text:"Lägg ihop alla tre.",
     matte:"\\[5{,}12+5{,}15+5{,}14=15{,}41\\ \\mathrm{cm}\\]"},
    {rubrik:"Dividera med antalet mätningar",
     text:"Tre mätningar ger division med tre.",
     matte:"\\[\\bar x=\\frac{15{,}41}{3}=5{,}1367\\ \\mathrm{cm}\\]"},
    {rubrik:"Avrunda till mätningarnas noggrannhet",
     text:"Mätvärdena är angivna med hundradels centimeter, och medelvärdet kan inte bli noggrannare än de värden det bygger på. Svara därför med lika många decimaler.",
     matte:"\\[\\bar x\\approx 5{,}14\\ \\mathrm{cm}\\]"}
  ],
  svar:"Medelvärdet är \\(5{,}14\\ \\mathrm{cm}\\).",
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
     matte:"\\[T=\\frac{14{,}8}{10}=1{,}48\\ \\mathrm s\\]"},
    {rubrik:"Förstå varför metoden används",
     text:"Om du missar med 0,2 s vid start och stopp blir felet 0,2 s på en enda period, men bara 0,02 s per period när tio mäts. Samma mätfel, tio gånger mindre inverkan."}
  ],
  svar:"Pendelns period är \\(1{,}48\\ \\mathrm s\\).",
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
     matte:"\\[m=72{,}40-0{,}20=72{,}20\\ \\mathrm{kg}\\]"},
    {rubrik:"Lägg märke till att fler vägningar inte hjälper",
     text:"Väger personen sig tio gånger visar vågen 72,40 kg varje gång. Det är just detta som skiljer ett systematiskt fel från ett slumpmässigt."}
  ],
  svar:"Den korrigerade massan är \\(72{,}20\\ \\mathrm{kg}\\).",
  fallgrop:"Att addera felet i stället för att subtrahera. Visar instrumentet för mycket ska du dra bort, inte lägga till.",
  komihag:"Systematiskt fel: samma åt samma håll varje gång, kan korrigeras bort. Slumpmässigt fel: varierar, minskas av upprepade mätningar."
},

/* ─────────────────── Kapitel 3 ─────────────────── */

  "Likformig rörelse": {
  uppgift:"3.99",
  ram:"Likformig rörelse betyder konstant fart, och då gäller \\(s=vt\\). Sambandet kan användas åt alla håll — det gäller bara att lösa ut rätt storhet och att ha enheterna på plats först.",
  steg:[
    {rubrik:"Omvandla farten till m/s",
     text:"Sträckan är given i meter och tiden i sekunder, så farten måste vara i m/s. Dividera km/h med 3,6.",
     matte:"\\[v=\\frac{80}{3{,}6}=22{,}2\\ \\mathrm{m/s}\\]"},
    {rubrik:"a) Lös ut tiden",
     text:"Ur \\(v=s/t\\) fås tiden genom att dividera sträckan med farten.",
     matte:"\\[t=\\frac sv=\\frac{150}{22{,}2}=6{,}75\\approx 6{,}8\\ \\mathrm s\\]"},
    {rubrik:"b) Lös ut sträckan",
     text:"Åt andra hållet är det bara en multiplikation.",
     matte:"\\[s=vt=22{,}2\\cdot 2{,}5=55{,}6\\approx 56\\ \\mathrm m\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"22 m/s är drygt tjugo meter per sekund, så 150 m borde ta knappt sju sekunder och 2,5 s borde räcka till ungefär femtio meter. Båda svaren stämmer med den känslan."}
  ],
  svar:"Det tar cirka \\(6{,}8\\ \\mathrm s\\) att köra 150 m, och bilen hinner cirka \\(56\\ \\mathrm m\\) på 2,5 s.",
  fallgrop:"Att sätta in 80 direkt i formeln. Blandas km/h med meter och sekunder blir svaret fel med en faktor 3,6.",
  komihag:"\\(s=vt\\), \\(v=\\dfrac st\\), \\(t=\\dfrac sv\\). Kontrollera enheterna innan du räknar, inte efteråt."
},

  "Medelhastighet": {
  uppgift:"3.126",
  ram:"Medelhastighet är hela sträckan delad med hela tiden. Den är inte medelvärdet av farterna under resan, och den säger ingenting om hur farten varierat på vägen.",
  steg:[
    {rubrik:"Skriv upp det givna",
     text:"Sträckan är 340 km och tiden 2 timmar och 50 minuter. Svaret ska anges i km/h."},
    {rubrik:"Gör om tiden till en enda enhet",
     text:"Eftersom svaret ska vara i km/h måste tiden uttryckas i timmar. Femtio minuter är femtio sextiondelar av en timme.",
     matte:"\\[t=2+\\frac{50}{60}=2{,}833\\ \\mathrm h\\]"},
    {rubrik:"Dividera sträckan med tiden",
     text:"Med både sträcka och tid i rätt enheter faller svaret ut direkt.",
     matte:"\\[v_{\\mathrm{med}}=\\frac st=\\frac{340}{2{,}833}=120\\ \\mathrm{km/h}\\]"},
    {rubrik:"Kontrollera baklänges",
     text:"Multiplicera tillbaka: \\(120\\cdot 2{,}833\\approx 340\\). Det stämmer. En sådan kontroll tar fem sekunder och fångar nästan alla enhetsfel."}
  ],
  svar:"Tågets medelhastighet är \\(120\\ \\mathrm{km/h}\\).",
  fallgrop:"Att skriva 2 h 50 min som 2,50 h. Minuter är sextiondelar, inte hundradelar — 2,50 h är 2 timmar och 30 minuter.",
  komihag:"\\(v_{\\mathrm{med}}=s_{\\mathrm{tot}}/t_{\\mathrm{tot}}\\). Enheten som svaret ska ha bestämmer vilken enhet tiden måste skrivas i."
},

  "Relativ hastighet": {
  uppgift:"3.175",
  ram:"En hastighet är alltid angiven i förhållande till något. Här finns tre olika: planet relativt luften, luften relativt marken, och planet relativt marken. Att hålla isär dem är hela poängen.",
  steg:[
    {rubrik:"Namnge de tre hastigheterna",
     text:"Planets fart genom luften är 240 km/h. Luften rör sig med 40 km/h, och eftersom det är motvind rör den sig <em>mot</em> planets färdriktning. Det som söks är farten relativt marken."},
    {rubrik:"Välj en positiv riktning",
     text:"Sätt planets färdriktning som positiv. Då är planets fart genom luften \\(+240\\) km/h och vindens hastighet \\(-40\\) km/h."},
    {rubrik:"Addera hastigheterna",
     text:"Hastigheter relativt olika saker adderas som riktade storheter längs samma linje.",
     matte:"\\[v_{\\text{plan/mark}}=240+(-40)=200\\ \\mathrm{km/h}\\]"},
    {rubrik:"Pröva mot två gränsfall",
     text:"Vid vindstilla skulle svaret bli 240 km/h och med 40 km/h medvind 280 km/h. Motvind måste ge något mindre än 240, och 200 ligger rätt."}
  ],
  svar:"Planets fart relativt marken är \\(200\\ \\mathrm{km/h}\\).",
  fallgrop:"Att lära sig att vind alltid subtraheras. Det är riktningen som avgör: medvind adderas, motvind subtraheras. Sätt ut tecknen först, räkna sedan.",
  komihag:"\\(v_{A/C}=v_{A/B}+v_{B/C}\\). Ge varje riktning ett tecken, så blir all relativ rörelse addition."
},

  "Konstant acceleration": {
  uppgift:"3.190",
  ram:"Acceleration är hastighetsändring per tidsenhet. Enheten m/s² läses som meter per sekund, per sekund: hur många m/s farten ändras varje sekund.",
  steg:[
    {rubrik:"Skriv upp begynnelse- och sluttillstånd",
     text:"Geparden startar från vila, alltså \\(v_1=0\\), och når \\(v_2=30{,}0\\ \\mathrm{m/s}\\). Förloppet tar \\(\\Delta t=7{,}00\\ \\mathrm s\\)."},
    {rubrik:"Använd definitionen av acceleration",
     text:"Accelerationen är hastighetsändringen delad med tiden det tog.",
     matte:"\\[a=\\frac{\\Delta v}{\\Delta t}=\\frac{v_2-v_1}{\\Delta t}=\\frac{30{,}0-0}{7{,}00}=4{,}29\\ \\mathrm{m/s^2}\\]"},
    {rubrik:"Läs svaret i ord",
     text:"Farten ökar med 4,29 m/s varje sekund. Efter en sekund håller geparden alltså drygt 4 m/s, efter två drygt 8 m/s, och så vidare — det är precis vad konstant acceleration betyder."},
    {rubrik:"Notera vad tecknet betyder",
     text:"Här är accelerationen positiv eftersom farten ökar. Hade djuret bromsat hade \\(v_2\\) varit mindre än \\(v_1\\), och accelerationen blivit negativ."}
  ],
  svar:"Gepardens acceleration är \\(4{,}29\\ \\mathrm{m/s^2}\\).",
  fallgrop:"Att dividera sluthastigheten med tiden utan att tänka på begynnelsehastigheten. Här går det bra eftersom starten sker från vila, men så fort \\(v_1\\neq 0\\) blir svaret fel.",
  komihag:"\\(a=\\dfrac{v_2-v_1}{\\Delta t}\\). Det är alltid <em>ändringen</em> i hastighet som ska stå i täljaren."
},

  "Reaktions- och bromssträcka": {
  uppgift:"3.185",
  ram:"En stoppsträcka består av två helt olika rörelser efter varandra: likformig rörelse under förarens reaktionstid, och likformigt retarderad rörelse under själva bromsningen. De måste räknas var för sig.",
  steg:[
    {rubrik:"Omvandla farten till m/s",
     text:"Accelerationen är given i m/s², så farten måste vara i m/s.",
     matte:"\\[v=\\frac{72}{3{,}6}=20{,}0\\ \\mathrm{m/s}\\]"},
    {rubrik:"Beräkna reaktionssträckan",
     text:"Under reaktionstiden händer ingenting med farten — bilen rullar vidare oförändrat medan föraren hinner uppfatta och reagera. Det är likformig rörelse.",
     matte:"\\[s_r=v\\,t_r=20{,}0\\cdot 0{,}9=18{,}0\\ \\mathrm m\\]"},
    {rubrik:"Beräkna bromssträckan",
     text:"Nu börjar retardationen. Tiden för bromsningen är inte given, så använd sambandet som saknar tid. Vid stopp är sluthastigheten noll.",
     matte:"\\[s_b=\\frac{v^2}{2a}=\\frac{20{,}0^2}{2\\cdot 6{,}0}=33{,}3\\ \\mathrm m\\]"},
    {rubrik:"Lägg ihop delarna",
     text:"Stoppsträckan är summan av de två sträckorna.",
     matte:"\\[s=18{,}0+33{,}3=51{,}3\\approx 51\\ \\mathrm m\\]"},
    {rubrik:"Se vad resultatet betyder",
     text:"Vid 72 km/h behövs alltså drygt femtio meter för att stanna, och en tredjedel av sträckan går åt innan bromsen ens har gripit."}
  ],
  svar:"Den totala stoppsträckan är cirka \\(51\\ \\mathrm m\\).",
  fallgrop:"Att låta bilen bromsa under hela förloppet och räkna \\(s=v^2/(2a)\\) rakt av. Under reaktionstiden bromsar bilen inte alls.",
  komihag:"\\(s_{\\text{stopp}}=v\\,t_r+\\dfrac{v^2}{2a}\\). Dubblad fart ger dubbelt så lång reaktionssträcka men <em>fyra gånger</em> så lång bromssträcka."
},

  "Lodrät kast och fritt fall": {
  uppgift:"3.72",
  ram:"Vid fritt fall från vila gäller två samband: höjden växer som \\(h=gt^2/2\\) och farten som \\(v=gt\\). Accelerationen är \\(g=9{,}82\\ \\mathrm{m/s^2}\\) hela vägen ned, och massan spelar ingen roll.",
  steg:[
    {rubrik:"Välj riktning och skriv upp det givna",
     text:"Räkna nedåt som positiv riktning. Stenen släpps, alltså är begynnelsefarten noll, och fallhöjden är 45 m."},
    {rubrik:"a) Lös ut falltiden",
     text:"Ur \\(h=gt^2/2\\) fås tiden genom att flytta om och dra roten ur.",
     matte:"\\[t=\\sqrt{\\frac{2h}{g}}=\\sqrt{\\frac{2\\cdot 45}{9{,}82}}=3{,}03\\ \\mathrm s\\]"},
    {rubrik:"b) Beräkna farten vid marken",
     text:"Farten växer linjärt med tiden när accelerationen är konstant.",
     matte:"\\[v=gt=9{,}82\\cdot 3{,}03=29{,}7\\ \\mathrm{m/s}\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"Knappt 30 m/s är ungefär 107 km/h. Att ett fall från fyrtiofem meter — en fjortonvåningshus — ger motorvägsfart är rimligt, och visar varför fallhöjd är farligt."}
  ],
  svar:"Fallet tar cirka \\(3{,}0\\ \\mathrm s\\), och stenen träffar marken med farten cirka \\(30\\ \\mathrm{m/s}\\).",
  fallgrop:"Att glömma tvåan under rottecknet och räkna \\(t=\\sqrt{h/g}\\). Kontrollera alltid formeln innan du sätter in.",
  komihag:"Fritt fall från vila: \\(h=\\dfrac{gt^2}{2}\\) och \\(v=gt\\). Massan påverkar inte fallet när luftmotståndet försummas."
},

  "Lutning och area i rörelsediagram": {
  uppgift:"3.241",
  ram:"Ett rörelsediagram besvarar två sorters frågor: en om <em>lutningen</em> och en om <em>arean</em>. Vilken som är den rätta beror helt på vad axlarna visar, så läs alltid axlarna innan du räknar.",
  steg:[
    {rubrik:"Läs av axlarna",
     text:"Den lodräta axeln visar hastigheten i m/s och den vågräta tiden i sekunder. Det är alltså ett hastighet–tid-diagram."},
    {rubrik:"Avgör om det är lutning eller area som söks",
     text:"Frågan gäller förflyttningen, alltså en sträcka. Titta på enheterna: hastighet gånger tid ger \\(\\mathrm{m/s}\\cdot\\mathrm s=\\mathrm m\\). Det är en area i diagrammet. Lutningen hade gett \\(\\mathrm{m/s^2}\\), alltså acceleration."},
    {rubrik:"Beräkna arean under kurvan",
     text:"Hastigheten är konstant, så området under kurvan är en rektangel med höjden 4 m/s och bredden 5 s.",
     matte:"\\[s=v\\,t=4\\cdot 5=20\\ \\mathrm m\\]"},
    {rubrik:"Lär dig de fyra fallen på en gång",
     text:"I ett läge–tid-diagram är lutningen hastigheten, och arean betyder ingenting. I ett hastighet–tid-diagram är lutningen accelerationen och arean förflyttningen."}
  ],
  svar:"Föremålet förflyttas \\(20\\ \\mathrm m\\).",
  fallgrop:"Att räkna ut lutningen när förflyttningen efterfrågas. I ett hastighet–tid-diagram är lutningen accelerationen, inte sträckan.",
  komihag:"Läge–tid: lutning = hastighet. Hastighet–tid: lutning = acceleration, area = förflyttning."
},

  "Tolka och rita rörelsediagram": {
  uppgift:"3.40",
  ram:"Ur ett läge–tid-diagram läses tre saker av: kurvans värde talar om var föremålet är, kurvans lutning hur fort det rör sig, och lutningens tecken åt vilket håll.",
  steg:[
    {rubrik:"a) Läs av läget vid en given tidpunkt",
     text:"Gå upp från \\(t=4{,}0\\ \\mathrm s\\) på tidsaxeln till kurvan, och därifrån vågrätt till lägesaxeln. Här är det bara ett avläsningsvärde, ingen lutning.",
     matte:"\\[s(4{,}0)=8{,}0\\ \\mathrm m\\]"},
    {rubrik:"b) Tolka den vågräta delen",
     text:"Mellan 4 och 7 sekunder ligger kurvan vågrätt. Läget ändras inte alls, och då är hastigheten noll — personen står stilla. Vågrät kurva betyder alltså inte konstant fart, utan ingen fart.",
     matte:"\\[\\Delta s=0\\quad\\Longrightarrow\\quad v=0\\]"},
    {rubrik:"c) Bestäm hastigheten ur lutningen",
     text:"Under den sista delen går läget från 8,0 m tillbaka till 0, mellan 7 s och 12 s. Hastigheten är lutningen, alltså lägesändringen delad med tidsändringen.",
     matte:"\\[v=\\frac{\\Delta s}{\\Delta t}=\\frac{0-8{,}0}{12-7}=-1{,}6\\ \\mathrm{m/s}\\]"},
    {rubrik:"Tolka minustecknet",
     text:"Den negativa hastigheten betyder att personen rör sig tillbaka mot startpunkten. Farten är konstant hela vägen — det är riktningen som är omvänd, inte hastigheten som avtar."}
  ],
  svar:"Personen är 8,0 m från start efter 4,0 s, står stilla mellan 4 och 7 s och går sedan tillbaka med hastigheten \\(-1{,}6\\ \\mathrm{m/s}\\).",
  fallgrop:"Att läsa en fallande linje som att farten minskar. En rät fallande linje i ett läge–tid-diagram betyder konstant fart i negativ riktning.",
  komihag:"Vågrät linje: stillastående. Rät lutande linje: konstant hastighet. Krökt kurva: hastigheten ändras, alltså acceleration."
},

/* ─────────────────── Kapitel 4 ─────────────────── */

  "Newtons andra lag": {
  uppgift:"4.35",
  ram:"Newtons andra lag binder ihop kraft, massa och acceleration. Nästan varje kraftuppgift i kursen slutar i \\(F_{\\mathrm{res}}=ma\\) — det gäller bara att veta vilken av de tre storheterna som är den okända.",
  steg:[
    {rubrik:"Skriv upp lagen och se vad som söks",
     text:"I a) är massan och accelerationen givna och resultanten söks. Enheterna är redan kg och m/s², så ingenting behöver omvandlas.",
     matte:"\\[F_{\\mathrm{res}}=ma\\]"},
    {rubrik:"a) Sätt in och multiplicera",
     text:"Lastbilens massa och den önskade accelerationen ger kraften direkt.",
     matte:"\\[F_{\\mathrm{res}}=3500\\cdot 1{,}4=4900\\ \\mathrm N=4{,}9\\ \\mathrm{kN}\\]"},
    {rubrik:"b) Vänd på sambandet",
     text:"Nu är kraften känd och accelerationen okänd. Dividera i stället för att multiplicera.",
     matte:"\\[a=\\frac{F_{\\mathrm{res}}}{m}=\\frac{4900}{1400}=3{,}5\\ \\mathrm{m/s^2}\\]"},
    {rubrik:"Läs av vad jämförelsen säger",
     text:"Personbilen är 2,5 gånger lättare och får 2,5 gånger större acceleration av samma kraft. Massan är kroppens tröghet: ju mer massa, desto trögare svarar den på en kraft."}
  ],
  svar:"Lastbilen behöver resultanten \\(4{,}9\\ \\mathrm{kN}\\). Samma kraft ger personbilen accelerationen \\(3{,}5\\ \\mathrm{m/s^2}\\).",
  fallgrop:"Att sätta in tyngdkraften \\(mg\\) i stället för resultanten. Kraften i \\(F=ma\\) är alltid summan av alla krafter på kroppen.",
  komihag:"\\(F_{\\mathrm{res}}=ma\\). Samma kraft på dubbla massan ger halva accelerationen."
},

  "Friläggning och kraftdiagram": {
  uppgift:"4.223",
  ram:"Att frilägga betyder att rita en enda kropp för sig och sätta ut alla krafter som verkar <em>på</em> just den kroppen. Krafter som kroppen själv utövar på andra hör inte hemma i figuren.",
  steg:[
    {rubrik:"Bestäm vilken kropp du friläggar",
     text:"Här är det boken, ingenting annat. Bordet ritas inte — det finns bara med genom den kraft det utövar på boken."},
    {rubrik:"Sätt ut alla krafter på kroppen",
     text:"Tyngdkraften från jorden verkar nedåt i tyngdpunkten. Normalkraften från bordet verkar uppåt, vinkelrätt mot ytan, i kontaktytan. Fler krafter finns inte — boken rör ingenting annat."},
    {rubrik:"Använd att boken ligger stilla",
     text:"Vila betyder acceleration noll, alltså kraftsumma noll i lodled.",
     matte:"\\[\\sum F_y=N-F_g=0\\ \\Rightarrow\\ N=F_g\\]"},
    {rubrik:"Blanda inte ihop med kraft och motkraft",
     text:"Normalkraften och tyngdkraften är <em>inte</em> ett par enligt tredje lagen, för båda verkar på boken. Motkraften till normalkraften är bokens tryck på bordet."}
  ],
  svar:"På boken verkar tyngdkraften nedåt och normalkraften uppåt. De är lika stora och motriktade eftersom boken är i vila.",
  fallgrop:"Att rita in bokens tryck på bordet i samma figur. Den kraften verkar på bordet och hör hemma i bordets friläggning, inte i bokens.",
  komihag:"En kropp, alla krafter på den, inga andra. Vila eller konstant fart betyder att kraftsumman är noll."
},

  "Hissproblem med Newtons lagar": {
  uppgift:"4.98",
  ram:"Normalkraften är ingen kopia av tyngdkraften. Den ställer in sig efter allt annat som verkar lodrätt — en hand som trycker, eller en hiss som accelererar. Därför måste den räknas fram ur kraftekvationen, aldrig gissas.",
  steg:[
    {rubrik:"Beräkna tyngdkraften",
     text:"Den är densamma i alla tre deluppgifterna.",
     matte:"\\[F_g=mg=12\\cdot 9{,}82=117{,}8\\ \\mathrm N\\]"},
    {rubrik:"Ställ upp lodrät jämvikt när handen trycker nedåt",
     text:"Lådan står stilla, så kraftsumman är noll. Uppåt verkar normalkraften; nedåt både tyngdkraften och handens 40 N.",
     matte:"\\[N-F_g-40=0\\ \\Rightarrow\\ N=157{,}8\\ \\mathrm N\\]"},
    {rubrik:"Byt tecken när handen lyfter",
     text:"Nu hjälper handen till att bära lådan, så golvet behöver bära mindre.",
     matte:"\\[N+40-F_g=0\\ \\Rightarrow\\ N=77{,}8\\ \\mathrm N\\]"},
    {rubrik:"Koppla till hissen",
     text:"Samma låda och samma golv, men tre olika normalkrafter. I en hiss spelar accelerationen handens roll: \\(N=m(g+a)\\) när hissen accelererar uppåt och \\(N=m(g-a)\\) när den accelererar nedåt."}
  ],
  svar:"Tyngdkraften är \\(118\\ \\mathrm N\\). Normalkraften blir \\(158\\ \\mathrm N\\) vid tryck nedåt och \\(78\\ \\mathrm N\\) vid lyft uppåt.",
  fallgrop:"Att använda \\(N=mg\\) som en regel. Det gäller bara när inga andra lodräta krafter verkar och accelerationen är noll.",
  komihag:"Frilägg, sätt ut alla lodräta krafter med tecken och sätt summan lika med \\(ma\\). Normalkraften faller ut ur ekvationen."
},

  "Kraftjämvikt": {
  uppgift:"4.91",
  ram:"Jämvikt betyder att kraftsumman är noll — vågrätt och lodrätt var för sig. En kraft som lutar måste därför delas upp i komposanter innan den kan summeras med de andra.",
  steg:[
    {rubrik:"Beräkna tyngdkraften",
     text:"Det är den kraft de två vajrarna tillsammans ska bära.",
     matte:"\\[F_g=mg=12\\cdot 9{,}82=117{,}8\\ \\mathrm N\\]"},
    {rubrik:"Utnyttja symmetrin",
     text:"Vajrarna är likadana och lutar lika mycket, så spännkraften \\(S\\) är lika stor i båda. Deras vågräta komposanter är motriktade och tar ut varandra."},
    {rubrik:"Ställ upp den lodräta jämvikten",
     text:"Vinkeln mäts från lodlinjen, så varje vajers lodräta komposant är \\(S\\cos 25^\\circ\\). Tillsammans bär de hela tyngden.",
     matte:"\\[2S\\cos 25^\\circ=117{,}8\\]"},
    {rubrik:"Lös ut spännkraften",
     text:"Dividera med \\(2\\cos 25^\\circ\\).",
     matte:"\\[S=\\frac{117{,}8}{2\\cos 25^\\circ}=65{,}0\\ \\mathrm N\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"Hängde vajrarna rakt upp skulle de bära 58,9 N vardera. Ju mer de lutar, desto större måste spännkraften vara för att den lodräta delen ska räcka till. 65 N vid 25° stämmer med det."}
  ],
  svar:"Spännkraften är \\(65\\ \\mathrm N\\) i vardera vajern.",
  fallgrop:"Att bara dela tyngden på två och svara 58,9 N. Det gäller bara om vajrarna hänger lodrätt — lutar de bär bara komposanten.",
  komihag:"\\(\\sum F_x=0\\) och \\(\\sum F_y=0\\). Kontrollera alltid varifrån vinkeln mäts innan du väljer sinus eller cosinus."
},

  "Newtons andra lag med motståndskrafter": {
  uppgift:"4.235",
  ram:"När flera krafter verkar längs samma linje är det resultanten som bestämmer rörelsen. En drivkraft framåt och ett motstånd bakåt subtraheras — de är riktade storheter, inte bara tal.",
  steg:[
    {rubrik:"Välj en positiv riktning",
     text:"Sätt höger som positiv. Då är dragkraften \\(+45\\) N och motståndet \\(-18\\) N. Utan ett valt tecken blir riktningarna en gissning."},
    {rubrik:"Summera krafterna med tecken",
     text:"Resultanten är summan av alla krafter, med sina tecken.",
     matte:"\\[F_{\\mathrm{res}}=45-18=27\\ \\mathrm N\\]"},
    {rubrik:"Använd Newtons andra lag",
     text:"Resultanten och massan ger accelerationen.",
     matte:"\\[a=\\frac{F_{\\mathrm{res}}}{m}=\\frac{27}{6{,}0}=4{,}5\\ \\mathrm{m/s^2}\\]"},
    {rubrik:"Tolka tecknet",
     text:"Resultanten blev positiv, så accelerationen är riktad åt höger. Vore krafterna lika stora skulle resultanten bli noll — då är farten konstant, vilket inte är samma sak som att farten är noll."}
  ],
  svar:"Resultanten är \\(27\\ \\mathrm N\\) åt höger och accelerationen \\(4{,}5\\ \\mathrm{m/s^2}\\) åt samma håll.",
  fallgrop:"Att addera 45 och 18 för att båda är krafter. Motriktade krafter subtraheras.",
  komihag:"Sätt ut en positiv riktning först, summera sedan. \\(F_{\\mathrm{res}}=ma\\) gäller alltid med resultanten, aldrig med en enskild kraft."
},

  "Gravitation, tyngd och cirkulära banor": {
  uppgift:"4.187",
  ram:"Massa och tyngd är två olika saker. Massan är mängden materia och följer med kroppen överallt; tyngden är den kraft himlakroppen drar med och ändras med tyngdaccelerationen \\(g\\).",
  steg:[
    {rubrik:"Skriv upp sambandet",
     text:"Massan sätts in i kilogram och \\(g\\) i m/s², vilket ger tyngden i newton.",
     matte:"\\[F_g=mg\\]"},
    {rubrik:"Räkna på månen",
     text:"Använd månens tyngdacceleration, inte jordens.",
     matte:"\\[F_{g,\\mathrm m}=65\\cdot 1{,}62=105{,}3\\ \\mathrm N\\]"},
    {rubrik:"Räkna på jorden",
     text:"Samma massa, men ett mycket större \\(g\\).",
     matte:"\\[F_{g,\\mathrm j}=65\\cdot 9{,}82=638{,}3\\ \\mathrm N\\]"},
    {rubrik:"Svara på frågan om massan",
     text:"Massan är fortfarande 65 kg. Det är bara \\(g\\) som skiljer platserna åt. Kvoten \\(9{,}82/1{,}62\\approx 6\\) förklarar varför tyngden blir ungefär sex gånger större på jorden."}
  ],
  svar:"Tyngden är cirka \\(105\\ \\mathrm N\\) på månen och \\(638\\ \\mathrm N\\) på jorden. Massan är \\(65\\ \\mathrm{kg}\\) på båda ställena.",
  fallgrop:"Att säga att astronauten \"väger 65 kg\". Kilogram mäter massa; tyngd är en kraft och mäts i newton.",
  komihag:"\\(F_g=mg\\). Massan följer med kroppen, tyngden följer med platsen."
},

  "Kraftmoment": {
  uppgift:"4.250",
  ram:"Ett moment beskriver hur mycket en kraft vill vrida något: kraft gånger hävarm. Samma kraft ger helt olika moment beroende på var på nyckeln du tar i.",
  steg:[
    {rubrik:"Omvandla hävarmen till meter",
     text:"Momentet ska anges i Nm, så avståndet måste vara i meter.",
     matte:"\\[l=18\\ \\mathrm{cm}=0{,}18\\ \\mathrm m\\]"},
    {rubrik:"Multiplicera kraft och hävarm",
     text:"Kraften drar vinkelrätt mot nyckeln, så hela kraften bidrar till vridningen.",
     matte:"\\[M=Fl=120\\cdot 0{,}18=21{,}6\\ \\mathrm{Nm}\\]"},
    {rubrik:"Vänd på sambandet i b)",
     text:"Muttern kräver samma moment oavsett var du greppar. Med kortare hävarm måste kraften bli större.",
     matte:"\\[F=\\frac Ml=\\frac{21{,}6}{0{,}12}=180\\ \\mathrm N\\]"},
    {rubrik:"Kontrollera proportionaliteten",
     text:"Hävarmen krympte med faktorn \\(18/12=1{,}5\\) och kraften växte med precis samma faktor: \\(120\\cdot 1{,}5=180\\). Det är därför en lång nyckel känns lättare."}
  ],
  svar:"Momentet är \\(21{,}6\\ \\mathrm{Nm}\\), och vid 12 cm hävarm krävs \\(180\\ \\mathrm N\\).",
  fallgrop:"Att räkna med centimeter och få \\(120\\cdot 18=2160\\). Enheten Nm kräver meter — svaret blir hundra gånger för stort.",
  komihag:"\\(M=Fl\\), där \\(l\\) är det vinkelräta avståndet från vridningsaxeln till kraftens verkningslinje."
},

  "Momentjämvikt": {
  uppgift:"4.194",
  ram:"En kropp som inte vrider sig har lika stora moment åt båda hållen. Väljer du stödpunkten som momentpunkt får kraften därifrån hävarmen noll och försvinner ur ekvationen — det är hela poängen med att välja punkt.",
  steg:[
    {rubrik:"Beräkna stenens tyngdkraft",
     text:"Moment räknas med krafter i newton, inte med massor i kilogram.",
     matte:"\\[F_g=mg=25\\cdot 9{,}82=245{,}5\\ \\mathrm N\\]"},
    {rubrik:"Välj momentpunkt",
     text:"Lägg den i stödpunkten. Kraften från underlaget angriper där, får hävarmen noll och behöver aldrig beräknas."},
    {rubrik:"Sätt momenten lika stora",
     text:"Stenen vrider åt ena hållet med hävarmen 0,30 m, handen åt andra hållet med hävarmen 1,2 m.",
     matte:"\\[F\\cdot 1{,}2=245{,}5\\cdot 0{,}30\\]"},
    {rubrik:"Lös ut kraften",
     text:"Dividera med den långa hävarmen.",
     matte:"\\[F=\\frac{245{,}5\\cdot 0{,}30}{1{,}2}=61{,}4\\ \\mathrm N\\]"},
    {rubrik:"Se vad hävstången gjorde",
     text:"Handkraften blev bara en fjärdedel av stenens tyngd, eftersom hävarmen är fyra gånger längre. En hävstång byter kraft mot väg — du drar en kortare bit med större kraft."}
  ],
  svar:"Det krävs cirka \\(61\\ \\mathrm N\\), om spettets egen massa försummas.",
  fallgrop:"Att räkna \\(25\\cdot 0{,}30\\) och blanda ihop kilogram med newton. Massan måste först bli en tyngdkraft.",
  komihag:"Vid momentjämvikt är momenten medurs lika stora som momenten moturs. Lägg momentpunkten där en okänd kraft angriper."
},

  "Tyngdpunkt och stabilitet": {
  uppgift:"4.309",
  ram:"Tyngdpunkten är den punkt där hela kroppens tyngd kan tänkas verka. För punktmassor på en stång är den ett massvägt medelvärde — den dras alltid mot den tunga sidan.",
  steg:[
    {rubrik:"Skriv upp det massvägda medelvärdet",
     text:"Varje position vägs med sin massa, och summan divideras med den totala massan.",
     matte:"\\[x_T=\\frac{m_1x_1+m_2x_2}{m_1+m_2}\\]"},
    {rubrik:"Sätt in värdena",
     text:"Den lätta massan sitter i origo och bidrar därför inte till täljaren.",
     matte:"\\[x_T=\\frac{2{,}0\\cdot 0+6{,}0\\cdot 1{,}0}{2{,}0+6{,}0}=0{,}75\\ \\mathrm m\\]"},
    {rubrik:"Kontrollera mot intuitionen",
     text:"Den tunga massan sitter vid \\(x=1{,}0\\) m, och tyngdpunkten hamnar tre fjärdedelar av vägen dit. Vore massorna lika stora skulle den ligga mitt emellan, vid 0,50 m."},
    {rubrik:"Koppla till stabilitet",
     text:"En kropp välter när tyngdpunktens lodlinje hamnar utanför stödytan. Låg tyngdpunkt och bred stödyta är därför det som gör något stabilt."}
  ],
  svar:"Tyngdpunkten ligger \\(0{,}75\\ \\mathrm m\\) från 2,0-kilosmassan.",
  fallgrop:"Att ta medelvärdet av positionerna och svara 0,50 m. Positionerna måste vägas med massorna.",
  komihag:"\\(x_T=\\dfrac{\\sum m_ix_i}{\\sum m_i}\\). Tyngdpunkten ligger alltid närmare den större massan."
},

  "Friktionskraft, friktionstal och rörelse": {
  uppgift:"4.28",
  ram:"Friktionskraften beror på hur hårt ytorna pressas ihop, alltså normalkraften, och på hur strävt materialparet är, alltså friktionstalet: \\(f=\\mu N\\). Friktionstalet är ett rent tal utan enhet.",
  steg:[
    {rubrik:"Tolka \"jämn fart\"",
     text:"Konstant fart betyder acceleration noll och därmed resultant noll. Dragkraften och friktionen måste vara lika stora.",
     matte:"\\[f=140\\ \\mathrm N\\]"},
    {rubrik:"Beräkna normalkraften",
     text:"Golvet är vågrätt och inga andra lodräta krafter verkar, så normalkraften bär hela tyngden.",
     matte:"\\[N=mg=45\\cdot 9{,}82=441{,}9\\ \\mathrm N\\]"},
    {rubrik:"Lös ut friktionstalet",
     text:"Dividera friktionskraften med normalkraften. Newton delat med newton ger ett tal utan enhet.",
     matte:"\\[\\mu=\\frac fN=\\frac{140}{441{,}9}=0{,}317\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"Vanliga friktionstal ligger mellan ungefär 0,1 och 1. Ett värde större än 1 eller ett med enhet är nästan alltid ett räknefel."}
  ],
  svar:"Friktionstalet är cirka \\(0{,}32\\).",
  fallgrop:"Att dividera med massan i stället för med normalkraften. \\(\\mu\\) är en kvot mellan två krafter.",
  komihag:"\\(f=\\mu N\\), och på vågrätt underlag utan extra lodräta krafter är \\(N=mg\\). Jämn fart betyder att friktionen är lika stor som dragkraften."
},

  "Statisk och glidfriktion": {
  uppgift:"4.105",
  ram:"Det krävs mer kraft för att få något att börja glida än för att hålla det i rörelse. Därför skiljer man på vilofriktion och glidfriktion, med var sitt friktionstal.",
  steg:[
    {rubrik:"Namnge de två fallen",
     text:"De 95 N som får soffan att lossna motsvarar den maximala vilofriktionen. De 70 N som håller den i jämn rörelse är glidfriktionen."},
    {rubrik:"Beräkna normalkraften",
     text:"Golvet är vågrätt och normalkraften är densamma i båda fallen — det är bara friktionstalet som skiljer.",
     matte:"\\[N=mg=40\\cdot 9{,}82=392{,}8\\ \\mathrm N\\]"},
    {rubrik:"Beräkna de två friktionstalen",
     text:"Dividera varje friktionskraft med samma normalkraft.",
     matte:"\\[\\mu_s=\\frac{95}{392{,}8}=0{,}242\\qquad \\mu_k=\\frac{70}{392{,}8}=0{,}178\\]"},
    {rubrik:"Jämför dem",
     text:"Vilofriktionstalet är alltid större än glidfriktionstalet. Det är därför soffan rycker till i det ögonblick den släpper: kraften du drog med är plötsligt större än vad som behövs."}
  ],
  svar:"Vilofriktionstalet är cirka \\(0{,}24\\) och glidfriktionstalet cirka \\(0{,}18\\).",
  fallgrop:"Att tro att vilofriktionen alltid är 95 N. Vilofriktionen är precis så stor som den behöver vara för att hålla emot, upp till maxvärdet \\(\\mu_sN\\).",
  komihag:"\\(f_s\\le \\mu_sN\\) medan kroppen står stilla, \\(f_k=\\mu_kN\\) när den glider, och \\(\\mu_s>\\mu_k\\)."
},

  "Friktion på lutande plan": {
  uppgift:"4.59",
  ram:"På ett lutande plan pekar tyngdkraften fortfarande rakt ned, men planet ligger snett. Tyngdkraften delas därför upp i en komposant längs planet, som drar kroppen nedför, och en vinkelrätt mot planet, som pressar mot underlaget.",
  steg:[
    {rubrik:"Beräkna tyngdkraften",
     text:"Den är riktad rakt nedåt, oberoende av lutningen.",
     matte:"\\[F_g=mg=15\\cdot 9{,}82=147{,}3\\ \\mathrm N\\]"},
    {rubrik:"Dela upp i två komposanter",
     text:"Planets lutningsvinkel återfinns mellan tyngdkraften och normalen till planet. Det ger \\(mg\\sin\\alpha\\) längs planet och \\(mg\\cos\\alpha\\) vinkelrätt mot det."},
    {rubrik:"a) Komposanten längs planet",
     text:"Det är den här delen av tyngdkraften som friktionen måste hålla emot.",
     matte:"\\[F_{g,\\parallel}=147{,}3\\sin 20^\\circ=50{,}4\\ \\mathrm N\\]"},
    {rubrik:"b) Normalkraften",
     text:"Kroppen rör sig inte vinkelrätt ut från planet, så normalkraften balanserar den vinkelräta komposanten.",
     matte:"\\[N=147{,}3\\cos 20^\\circ=138{,}4\\ \\mathrm N\\]"},
    {rubrik:"Pröva mot gränsfallen",
     text:"Vid \\(0^\\circ\\) blir komposanten längs planet noll och \\(N=mg\\), precis som på ett vågrätt golv. Ju brantare planet är, desto mindre blir normalkraften."}
  ],
  svar:"Komposanten längs planet är \\(50{,}4\\ \\mathrm N\\) och normalkraften \\(138\\ \\mathrm N\\).",
  fallgrop:"Att kasta om sinus och cosinus. Vid liten lutning ska den drivande komposanten vara liten — och sinus av en liten vinkel är just liten.",
  komihag:"\\(mg\\sin\\alpha\\) längs planet, \\(mg\\cos\\alpha\\) vinkelrätt. Normalkraften på ett lutande plan är alltid mindre än \\(mg\\)."
},

  "Fjädrar: kraft, energi och svängning": {
  uppgift:"4.43",
  ram:"Hookes lag \\(F=k\\Delta l\\) säger att fjäderkraften växer proportionellt mot förlängningen. Hänger en vikt stilla i fjädern är den i jämvikt: fjäderkraften uppåt är exakt lika stor som tyngdkraften nedåt.",
  steg:[
    {rubrik:"Frilägg vikten",
     text:"Två krafter verkar: tyngdkraften nedåt och fjäderkraften uppåt. Vikten hänger stilla, så de är lika stora."},
    {rubrik:"Beräkna tyngdkraften",
     text:"Det är den kraft som drar ut fjädern.",
     matte:"\\[F_f=F_g=mg=1{,}4\\cdot 9{,}82=13{,}75\\ \\mathrm N\\]"},
    {rubrik:"Lös ut förlängningen ur Hookes lag",
     text:"Fjäderkonstanten är given i N/m, så svaret kommer ut i meter.",
     matte:"\\[\\Delta l=\\frac{F_f}{k}=\\frac{13{,}75}{95}=0{,}145\\ \\mathrm m\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"95 N/m betyder ungefär 1 cm förlängning per newton. Knappt 14 N borde alltså ge knappt 14 cm, vilket stämmer."}
  ],
  svar:"Fjädern dras ut cirka \\(0{,}145\\ \\mathrm m=14{,}5\\ \\mathrm{cm}\\).",
  fallgrop:"Att sätta in massan 1,4 direkt i \\(F=k\\Delta l\\). Det är tyngdkraften i newton som drar i fjädern, inte massan i kilogram.",
  komihag:"\\(F=k\\Delta l\\). En vikt som hänger stilla ger \\(k\\Delta l=mg\\)."
},

  "Fjädrar i serie och parallell": {
  uppgift:"4.274",
  ram:"Fjäderkonstanten säger hur styv en fjäder är. Kopplar man ihop flera ändras styvheten: parallellt blir det styvare, i serie mjukare.",
  steg:[
    {rubrik:"Omvandla förlängningen till meter",
     text:"Fjäderkonstanten ska anges i N/m, så centimetrarna måste bort först.",
     matte:"\\[\\Delta l=25\\ \\mathrm{cm}=0{,}25\\ \\mathrm m\\]"},
    {rubrik:"a) Använd Hookes lag på ett band",
     text:"Kraft delat med förlängning ger fjäderkonstanten.",
     matte:"\\[k=\\frac{F}{\\Delta l}=\\frac{45}{0{,}25}=180\\ \\mathrm{N/m}\\]"},
    {rubrik:"Tänk igenom vad parallellt betyder",
     text:"Två parallella band dras ut lika mycket, och båda drar tillbaka. Vid samma förlängning adderas krafterna.",
     matte:"\\[F=k_1\\Delta l+k_2\\Delta l=(k_1+k_2)\\Delta l\\]"},
    {rubrik:"b) Addera fjäderkonstanterna",
     text:"Jämförelsen med \\(F=k\\Delta l\\) visar att den gemensamma konstanten är summan.",
     matte:"\\[k_{\\mathrm{tot}}=180+180=360\\ \\mathrm{N/m}\\]"},
    {rubrik:"Jämför med seriekoppling",
     text:"Sitter banden efter varandra går samma kraft genom båda medan förlängningarna adderas. Då gäller \\(1/k=1/k_1+1/k_2\\), vilket för de här banden ger 90 N/m — mjukare än ett ensamt band."}
  ],
  svar:"Bandets fjäderkonstant är \\(180\\ \\mathrm{N/m}\\), och två likadana band parallellt ger \\(360\\ \\mathrm{N/m}\\).",
  fallgrop:"Att addera fjäderkonstanterna också vid seriekoppling. I serie adderas inverserna, och resultatet blir alltid mjukare än den mjukaste fjädern.",
  komihag:"Parallellt: \\(k=k_1+k_2\\). I serie: \\(\\dfrac1k=\\dfrac1{k_1}+\\dfrac1{k_2}\\)."
},

/* ─────────────────── Kapitel 5 ─────────────────── */

  "Mekaniskt arbete": {
  uppgift:"5.20",
  ram:"Arbete är kraft gånger sträcka, \\(W=Fs\\), och räknas bara på den del av kraften som pekar längs rörelsen. Enheten är joule: en newton gånger en meter.",
  steg:[
    {rubrik:"Kontrollera att kraften ligger längs rörelsen",
     text:"Ellen drar parallellt med marken och vagnen rör sig åt samma håll. Hela kraften bidrar, så ingen komposant behöver plockas fram."},
    {rubrik:"a) Multiplicera kraft och sträcka",
     text:"Kraften är konstant, så arbetet är en enkel produkt.",
     matte:"\\[W=Fs=45\\cdot 80=3600\\ \\mathrm J=3{,}6\\ \\mathrm{kJ}\\]"},
    {rubrik:"b) Lös ut sträckan",
     text:"Skriv först om 5,4 kJ till joule, annars blir svaret tusen gånger fel.",
     matte:"\\[s=\\frac WF=\\frac{5400}{45}=120\\ \\mathrm m\\]"},
    {rubrik:"Kontrollera proportionaliteten",
     text:"Arbetet skulle växa från 3,6 till 5,4 kJ, alltså med faktorn 1,5. Sträckan växte från 80 till 120 m — samma faktor. Med konstant kraft är arbete och sträcka proportionella."}
  ],
  svar:"Arbetet är \\(3{,}6\\ \\mathrm{kJ}\\), och för \\(5{,}4\\ \\mathrm{kJ}\\) måste vagnen dras \\(120\\ \\mathrm m\\).",
  fallgrop:"Att glömma skriva om kJ till J innan divisionen. Formeln \\(W=Fs\\) förutsätter joule, newton och meter.",
  komihag:"\\(W=Fs\\) när kraften är konstant och riktad längs rörelsen. \\(1\\ \\mathrm J=1\\ \\mathrm{Nm}\\)."
},

  "Arbete och mekanisk energi": {
  uppgift:"5.69",
  ram:"Energiprincipen säger att energi inte försvinner utan byter form. Ett fritt fall utan luftmotstånd är det renaste exemplet: all lägesenergi blir rörelseenergi på vägen ned.",
  steg:[
    {rubrik:"a) Beräkna lägesenergin vid start",
     text:"Höjden räknas från marken, som är nollnivån.",
     matte:"\\[E_p=mgh=2{,}5\\cdot 9{,}82\\cdot 8{,}0=196{,}4\\ \\mathrm J\\]"},
    {rubrik:"b) Använd energiprincipen",
     text:"Luftmotståndet försummas, så ingen energi går till värme. Hela lägesenergin finns kvar som rörelseenergi precis före marken.",
     matte:"\\[E_k=E_p=196{,}4\\ \\mathrm J\\]"},
    {rubrik:"c) Lös ut farten",
     text:"Sätt rörelseenergin lika med \\(mv^2/2\\) och lös ut \\(v\\).",
     matte:"\\[v=\\sqrt{\\frac{2E_k}{m}}=\\sqrt{\\frac{2\\cdot 196{,}4}{2{,}5}}=12{,}5\\ \\mathrm{m/s}\\]"},
    {rubrik:"Notera att massan försvinner",
     text:"Sätter man in \\(E_k=mgh\\) direkt fås \\(v=\\sqrt{2gh}\\) — massan förkortas bort. Alla föremål träffar marken med samma fart när luftmotståndet försummas."}
  ],
  svar:"Lägesenergin vid start och rörelseenergin före marken är båda \\(196\\ \\mathrm J\\), och farten blir \\(12{,}5\\ \\mathrm{m/s}\\).",
  fallgrop:"Att glömma tvåan när farten löses ut och räkna \\(v=\\sqrt{E_k/m}\\). Rörelseenergin har en faktor \\(\\tfrac12\\) som följer med.",
  komihag:"\\(E_p=mgh\\), \\(E_k=\\dfrac{mv^2}{2}\\). Utan förluster gäller \\(E_p+E_k=\\) konstant, vilket för ett fall från vila ger \\(v=\\sqrt{2gh}\\)."
},

  "Mekanisk energi": {
  uppgift:"5.112",
  ram:"Bromsar något ned försvinner inte rörelseenergin — den blir värme genom friktionsarbete. Sambandet \\(W=Fs\\) kopplar ihop den försvunna energin med kraften och sträckan.",
  steg:[
    {rubrik:"a) Beräkna rörelseenergin",
     text:"Farten är redan i m/s och massan i kg.",
     matte:"\\[E_k=\\frac{mv^2}{2}=\\frac{75\\cdot 14^2}{2}=7350\\ \\mathrm J\\]"},
    {rubrik:"b) Sätt friktionsarbetet lika med energin",
     text:"Åkaren stannar helt, så hela rörelseenergin tas upp av bromskraften under de 22 metrarna.",
     matte:"\\[F=\\frac{E_k}{s}=\\frac{7350}{22}=334\\ \\mathrm N\\]"},
    {rubrik:"c) Räkna ut friktionstalet",
     text:"På plant underlag bär normalkraften hela tyngden.",
     matte:"\\[\\mu=\\frac{F}{mg}=\\frac{334}{75\\cdot 9{,}82}=0{,}454\\]"},
    {rubrik:"d) Bestäm tiden",
     text:"Bromskraften är konstant, alltså är retardationen konstant och medelfarten halva startfarten.",
     matte:"\\[t=\\frac{s}{v_{\\mathrm{med}}}=\\frac{22}{7{,}0}=3{,}14\\ \\mathrm s\\]"}
  ],
  svar:"Rörelseenergin är \\(7{,}35\\ \\mathrm{kJ}\\), bromskraften \\(334\\ \\mathrm N\\), friktionstalet \\(0{,}454\\) och inbromsningen tar \\(3{,}14\\ \\mathrm s\\).",
  fallgrop:"Att räkna \\(E_k=mv^2\\) utan halvan, vilket ger dubbelt så stor bromskraft. Kontrollera formeln innan du sätter in.",
  komihag:"Den energi som försvinner är lika med kraftens arbete: \\(E_k=Fs\\). Rörelseenergin växer med kvadraten på farten — dubbel fart ger fyra gånger längre bromssträcka."
},

  "Arbete mot friktion": {
  uppgift:"5.8",
  ram:"Att dra något med konstant fart betyder att dragkraften exakt balanserar friktionen. Arbetet du utför försvinner inte — det blir värme i kontaktytorna, eftersom farten inte ökar.",
  steg:[
    {rubrik:"a) Tolka konstant fart",
     text:"Konstant fart ger acceleration noll och därmed kraftjämvikt. Dragkraften är alltså lika stor som friktionskraften."},
    {rubrik:"Beräkna friktionskraften",
     text:"Golvet är plant, så normalkraften bär hela tyngden.",
     matte:"\\[F_{\\mathrm{drag}}=\\mu mg=0{,}40\\cdot 25\\cdot 9{,}82=98{,}2\\ \\mathrm N\\]"},
    {rubrik:"b) Beräkna arbetet",
     text:"Dragkraften är konstant och parallell med förflyttningen.",
     matte:"\\[W=Fs=98{,}2\\cdot 8{,}0=786\\ \\mathrm J\\]"},
    {rubrik:"c) Följ energin",
     text:"Farten är oförändrad, så rörelseenergin har inte ökat, och golvet är plant, så lägesenergin är oförändrad. Hela arbetet har blivit värme i ytorna mellan låda och golv."}
  ],
  svar:"Dragkraften är \\(98{,}2\\ \\mathrm N\\) och arbetet \\(786\\ \\mathrm J\\approx 0{,}79\\ \\mathrm{kJ}\\). Energin har omvandlats till värme.",
  fallgrop:"Att tro att arbetet blir rörelseenergi. När farten är konstant ökar ingen rörelseenergi — allt går åt till att hålla emot friktionen.",
  komihag:"Konstant fart betyder dragkraft lika med friktion. Arbetet mot friktion blir värme, inte rörelse."
},

  "Mekanisk effekt": {
  uppgift:"5.30",
  ram:"Effekt är arbete per tid, \\(P=W/t\\). Två motorer kan utföra exakt samma arbete men ha helt olika effekt — det är tiden som skiljer dem åt.",
  steg:[
    {rubrik:"a) Beräkna arbetet",
     text:"Lasten lyfts med konstant fart, så lyftkraften är lika stor som tyngdkraften. Arbetet är ökningen i lägesenergi och beror bara på höjden, inte på tiden.",
     matte:"\\[W=mgh=300\\cdot 9{,}82\\cdot 8{,}0=23{,}57\\ \\mathrm{kJ}\\]"},
    {rubrik:"b) Dela arbetet med tiden",
     text:"Joule delat med sekunder ger watt.",
     matte:"\\[P=\\frac Wt=\\frac{23\\,570}{12}=1{,}96\\ \\mathrm{kW}\\]"},
    {rubrik:"c) Halvera tiden",
     text:"Samma last och samma höjd betyder samma arbete. Bara tiden ändras.",
     matte:"\\[P_6=\\frac{23\\,570}{6{,}0}=3{,}93\\ \\mathrm{kW}\\]"},
    {rubrik:"Se sambandet",
     text:"Halverad tid gav dubbel effekt. Arbetet är det som ska uträttas; effekten säger hur snabbt du orkar göra det."}
  ],
  svar:"Arbetet är \\(23{,}6\\ \\mathrm{kJ}\\). Effekten är \\(1{,}96\\ \\mathrm{kW}\\) på 12 s och \\(3{,}93\\ \\mathrm{kW}\\) på 6,0 s.",
  fallgrop:"Att tro att det snabbare lyftet kräver mer arbete. Arbetet är detsamma — det är effekten som ökar.",
  komihag:"\\(P=\\dfrac Wt\\), och för ett lyft är \\(W=mgh\\). \\(1\\ \\mathrm W=1\\ \\mathrm{J/s}\\)."
},

  "Energi, effekt och tid": {
  uppgift:"5.77",
  ram:"Vänder man på effektformeln fås \\(E=Pt\\): energi är effekt gånger tid. Det är så elräkningen fungerar, med den skillnaden att den räknar i kilowattimmar i stället för joule.",
  steg:[
    {rubrik:"a) Omvandla tiden till sekunder",
     text:"Watt är joule per sekund, så tiden måste vara i sekunder innan multiplikationen.",
     matte:"\\[t=25\\cdot 60=1500\\ \\mathrm s\\]"},
    {rubrik:"b) Multiplicera effekt och tid",
     text:"Watt gånger sekunder ger joule.",
     matte:"\\[E=Pt=1200\\cdot 1500=1{,}80\\cdot 10^{6}\\ \\mathrm J=1{,}80\\ \\mathrm{MJ}\\]"},
    {rubrik:"c) Räkna om till kilowattimmar",
     text:"En kilowattimme är en kilowatt i en timme. Använd effekten i kW och tiden i timmar, så faller enheten ut direkt.",
     matte:"\\[E=1{,}2\\cdot\\frac{25}{60}=0{,}500\\ \\mathrm{kWh}\\]"},
    {rubrik:"Håll isär de två enheterna",
     text:"Samma energi, två sätt att skriva den. En kilowattimme är \\(1000\\cdot 3600=3{,}6\\ \\mathrm{MJ}\\), vilket stämmer: halva det är 1,8 MJ."}
  ],
  svar:"Tiden är \\(1500\\ \\mathrm s\\) och energin \\(1{,}80\\ \\mathrm{MJ}=0{,}500\\ \\mathrm{kWh}\\).",
  fallgrop:"Att sätta in 25 minuter direkt och få 30 000 J. Watt är joule per <em>sekund</em> — minuterna måste räknas om först.",
  komihag:"\\(E=Pt\\). Joule kräver watt och sekunder; kilowattimmar kräver kilowatt och timmar. Blanda aldrig i samma uträkning."
},

  "Effekt och verkningsgrad": {
  uppgift:"5.12",
  ram:"Ingen maskin lämnar ut lika mycket som den tar in. Verkningsgraden är kvoten mellan nyttig och tillförd effekt, ett tal mellan 0 och 1 som ofta skrivs i procent.",
  steg:[
    {rubrik:"a) Dela nyttig effekt med tillförd",
     text:"Båda är angivna i watt, så enheterna tar ut varandra och kvoten blir ett rent tal.",
     matte:"\\[\\eta=\\frac{P_{\\text{nyttig}}}{P_{\\text{tillförd}}}=\\frac{600}{750}=0{,}80=80\\ \\%\\]"},
    {rubrik:"b) Beräkna förlusteffekten",
     text:"Det som inte blev nyttigt är skillnaden mellan in och ut.",
     matte:"\\[P_{\\text{förlust}}=750-600=150\\ \\mathrm W\\]"},
    {rubrik:"c) Följ den förlorade energin",
     text:"Energi försvinner inte. De 150 W blir värme i lindningar och lager, och en liten del blir ljud. Därför blir en motor varm när den arbetar."},
    {rubrik:"Kontrollera med procenten",
     text:"20 % av 750 W är 150 W, vilket stämmer med förlusten. Nyttig del plus förlust ska alltid bli 100 %."}
  ],
  svar:"Verkningsgraden är \\(80\\ \\%\\), förlusteffekten \\(150\\ \\mathrm W\\), och den förlorade energin blir främst värme.",
  fallgrop:"Att vända på kvoten och få 1,25. Verkningsgraden kan aldrig bli större än 1 — nyttig effekt står alltid i täljaren.",
  komihag:"\\(\\eta=\\dfrac{P_{\\text{nyttig}}}{P_{\\text{tillförd}}}\\). Det som inte blir nytta blir nästan alltid värme."
},

  "Arbete, energi och effekt": {
  uppgift:"5.91",
  ram:"Vid konstant fart går effektformeln att skriva om till \\(P=Fv\\). Den kopplar ihop motorns effekt med den kraft den orkar hålla vid en viss fart, och är genvägen i nästan alla fordonsuppgifter.",
  steg:[
    {rubrik:"a) Använd \\(P=Fv\\)",
     text:"Skriv om effekten till watt först, så blir kraften i newton.",
     matte:"\\[F=\\frac Pv=\\frac{30\\,000}{25}=1200\\ \\mathrm N\\]"},
    {rubrik:"b) Tolka den konstanta farten",
     text:"Konstant fart betyder resultant noll. Motståndskrafterna måste därför tillsammans vara lika stora som drivkraften, alltså 1200 N bakåt."},
    {rubrik:"c) Beräkna arbetet över en kilometer",
     text:"Drivkraften är konstant och riktad längs vägen.",
     matte:"\\[W=Fs=1200\\cdot 1000=1{,}20\\ \\mathrm{MJ}\\]"},
    {rubrik:"d) Kontrollera med tiden i stället",
     text:"Kilometern tar \\(t=1000/25=40\\) s. Räknar man i stället via effekt och tid ska svaret bli detsamma.",
     matte:"\\[W=Pt=30\\,000\\cdot 40=1{,}20\\ \\mathrm{MJ}\\]"}
  ],
  svar:"Drivkraften och motståndskrafterna är vardera \\(1200\\ \\mathrm N\\), och motorn uträttar \\(1{,}20\\ \\mathrm{MJ}\\) per kilometer.",
  fallgrop:"Att sätta in 30 i stället för 30 000. Effekten måste vara i watt när kraften ska bli i newton.",
  komihag:"\\(P=Fv\\) vid konstant fart. Konstant fart betyder att drivkraft och motstånd är lika stora."
},

  "Impuls och rörelsemängd": {
  uppgift:"5.32",
  ram:"Rörelsemängden \\(p=mv\\) är en riktad storhet, precis som hastigheten. En boll som studsar tillbaka har därför bytt tecken, och ändringen blir mycket större än man först tror.",
  steg:[
    {rubrik:"a) Välj positiv riktning och räkna före och efter",
     text:"Sätt bollens ursprungliga riktning som positiv. Efter studsen rör den sig åt motsatt håll och får negativt tecken.",
     matte:"\\[p_i=0{,}15\\cdot 20=+3{,}00\\qquad p_f=0{,}15\\cdot(-25)=-3{,}75\\ \\mathrm{kg\\,m/s}\\]"},
    {rubrik:"b) Beräkna ändringen",
     text:"Ändringen är alltid efter minus före — inte tvärtom.",
     matte:"\\[\\Delta p=p_f-p_i=-3{,}75-3{,}00=-6{,}75\\ \\mathrm{kg\\,m/s}\\]"},
    {rubrik:"Omvandla kontakttiden",
     text:"Åtta millisekunder måste bli sekunder innan divisionen.",
     matte:"\\[\\Delta t=8{,}0\\ \\mathrm{ms}=0{,}0080\\ \\mathrm s\\]"},
    {rubrik:"c) Använd impulslagen",
     text:"Kraften gånger tiden är lika med rörelsemängdsändringen.",
     matte:"\\[F=\\frac{\\Delta p}{\\Delta t}=\\frac{-6{,}75}{0{,}0080}=-844\\ \\mathrm N\\]"},
    {rubrik:"Tolka minustecknet",
     text:"Kraften är riktad mot bollens ursprungliga rörelseriktning, alltså tillbaka från väggen. Att kraften blir så stor beror på den korta kontakttiden."}
  ],
  svar:"Rörelsemängden ändras med \\(6{,}75\\ \\mathrm{kg\\,m/s}\\) och medelkraften är \\(844\\ \\mathrm N\\), båda riktade mot bollens ursprungliga färdriktning.",
  fallgrop:"Att räkna \\(\\Delta p=0{,}15(25-20)=0{,}75\\) och glömma tecknet. En studs vänder rörelsen, så farterna ska adderas till beloppet, inte subtraheras.",
  komihag:"\\(p=mv\\) med tecken. \\(F\\Delta t=\\Delta p=p_f-p_i\\). Kort kontakttid ger stor kraft."
},

  "Rörelsemängd och impuls": {
  uppgift:"5.109",
  ram:"Impulsen \\(I=F\\Delta t\\) mäter hur mycket en kraft hinner ändra rörelsen. Startar kroppen från vila är hela impulsen lika med den rörelsemängd den får.",
  steg:[
    {rubrik:"a) Beräkna impulsen",
     text:"Kraften är en medelkraft under kontakttiden, så produkten ger impulsen direkt. Enheten Ns är samma sak som kg·m/s.",
     matte:"\\[I=F\\Delta t=90\\cdot 0{,}050=4{,}50\\ \\mathrm{Ns}\\]"},
    {rubrik:"b) Lös ut farten",
     text:"Pucken låg stilla, så rörelsemängden efter slaget är lika med impulsen.",
     matte:"\\[v=\\frac Im=\\frac{4{,}50}{0{,}17}=26{,}5\\ \\mathrm{m/s}\\]"},
    {rubrik:"c) Beräkna rörelseenergin",
     text:"Nu när farten är känd går rörelseenergin att räkna ut som vanligt.",
     matte:"\\[E_k=\\frac{mv^2}{2}=\\frac{0{,}17\\cdot 26{,}5^2}{2}=59{,}6\\ \\mathrm J\\]"},
    {rubrik:"d) Bestäm kontaktsträckan",
     text:"Medelkraften ger konstant acceleration \\(a=90/0{,}17=529\\) m/s², och pucken startar från vila.",
     matte:"\\[s=\\frac{a\\Delta t^2}{2}=\\frac{529\\cdot 0{,}050^2}{2}=0{,}662\\ \\mathrm m\\]"},
    {rubrik:"Kontrollera med arbetet",
     text:"Kraftens arbete över sträckan är \\(90\\cdot 0{,}662\\approx 59{,}6\\) J — precis rörelseenergin i c). Två oberoende vägar som ger samma svar är en stark kontroll."}
  ],
  svar:"Impulsen är \\(4{,}50\\ \\mathrm{Ns}\\), farten \\(26{,}5\\ \\mathrm{m/s}\\), rörelseenergin \\(59{,}6\\ \\mathrm J\\) och kontaktsträckan cirka \\(0{,}66\\ \\mathrm m\\).",
  fallgrop:"Att blanda ihop impuls och arbete. Impuls är kraft gånger <em>tid</em> och ger rörelsemängd; arbete är kraft gånger <em>sträcka</em> och ger energi.",
  komihag:"\\(I=F\\Delta t=\\Delta p\\). Från vila gäller \\(v=I/m\\)."
},

  "Rörelsemängdens bevarande": {
  uppgift:"5.178",
  ram:"Under en kort stöt är de yttre krafterna försumbara, och då bevaras systemets totala rörelsemängd. Rörelseenergin bevaras däremot inte när kropparna fastnar i varandra.",
  steg:[
    {rubrik:"Betrakta vagnarna som ett system",
     text:"Krafterna mellan vagnarna är inre krafter och tar ut varandra. Summan av rörelsemängderna är därför lika stor före och efter."},
    {rubrik:"Håll ordning på tecknen",
     text:"Positiv riktning är åt höger. Vagn 2 rör sig åt vänster och har därför hastigheten \\(-1{,}0\\) m/s. Tecknen är hela knepet i den här uppgiftstypen."},
    {rubrik:"Ställ upp bevarandet",
     text:"Vagnarna fastnar i varandra och får en gemensam sluthastighet.",
     matte:"\\[m_1v_1+m_2v_2=(m_1+m_2)v\\]"},
    {rubrik:"Sätt in och lös ut",
     text:"Räkna täljaren med tecken innan du dividerar.",
     matte:"\\[v=\\frac{1{,}2\\cdot 4{,}0+0{,}8\\cdot(-1{,}0)}{1{,}2+0{,}8}=\\frac{4{,}0}{2{,}0}=2{,}0\\ \\mathrm{m/s}\\]"},
    {rubrik:"Tolka svaret",
     text:"Resultatet är positivt, så ekipaget fortsätter åt höger — den tyngre och snabbare vagnen bestämmer riktningen."}
  ],
  svar:"Den gemensamma hastigheten efter kollisionen är \\(2{,}0\\ \\mathrm{m/s}\\) åt höger.",
  fallgrop:"Att sätta in 1,0 som positivt tal. Rörelsemängd är riktad; en hastighet åt vänster ska in i ekvationen med minustecken.",
  komihag:"\\(\\sum p\\) före \\(=\\sum p\\) efter. Fastnar kropparna i varandra har de samma hastighet efteråt."
},

  "Kollisioner och rörelsemängd": {
  uppgift:"5.14",
  ram:"En kollision där kropparna fastnar i varandra kallas fullständigt oelastisk. Rörelsemängden bevaras, men en del av rörelseenergin blir värme och deformation.",
  steg:[
    {rubrik:"a) Räkna rörelsemängden före",
     text:"Bara den ena vagnen rör sig, så den andra bidrar med noll.",
     matte:"\\[p_i=6{,}0\\cdot 4{,}0+2{,}0\\cdot 0=24\\ \\mathrm{kg\\,m/s}\\]"},
    {rubrik:"b) Bestäm massan efter",
     text:"Vagnarna sitter ihop och rör sig som en enda kropp.",
     matte:"\\[m=6{,}0+2{,}0=8{,}0\\ \\mathrm{kg}\\]"},
    {rubrik:"c) Använd att rörelsemängden bevaras",
     text:"Samma rörelsemängd, större massa — alltså lägre fart.",
     matte:"\\[v=\\frac{p_i}{m}=\\frac{24}{8{,}0}=3{,}0\\ \\mathrm{m/s}\\]"},
    {rubrik:"Kontrollera rörelseenergin",
     text:"Före: \\(6{,}0\\cdot 4{,}0^2/2=48\\) J. Efter: \\(8{,}0\\cdot 3{,}0^2/2=36\\) J. Tolv joule har blivit värme och ljud — rörelsemängden bevarades, men inte energin."}
  ],
  svar:"Rörelsemängden är \\(24\\ \\mathrm{kg\\,m/s}\\), den gemensamma massan \\(8{,}0\\ \\mathrm{kg}\\) och farten efter stöten \\(3{,}0\\ \\mathrm{m/s}\\).",
  fallgrop:"Att anta att rörelseenergin också bevaras. Vid en oelastisk stöt bevaras bara rörelsemängden.",
  komihag:"Rörelsemängden bevaras i varje kollision. Rörelseenergin bevaras bara vid elastiska stötar."
},

  "Kombinerade problem med krafter och rörelse": {
  uppgift:"4.158",
  ram:"Många uppgifter binder ihop rörelselära och kraftlära: rörelsen ger accelerationen, och accelerationen ger kraften via \\(F=ma\\). Ordningen är nästan alltid den — börja i rörelsen.",
  steg:[
    {rubrik:"a) Beräkna accelerationen",
     text:"Sätt färdriktningen som positiv. Slutfarten är noll och startfarten 8,0 m/s.",
     matte:"\\[a=\\frac{v-v_0}{t}=\\frac{0-8{,}0}{5{,}0}=-1{,}60\\ \\mathrm{m/s^2}\\]"},
    {rubrik:"b) Gå från acceleration till kraft",
     text:"Newtons andra lag ger kraften. Minustecknet betyder bakåt, mot färdriktningen.",
     matte:"\\[F=ma=75\\cdot(-1{,}60)=-120\\ \\mathrm N\\]"},
    {rubrik:"c) Beräkna bromssträckan",
     text:"Retardationen är konstant, så medelfarten är precis halva startfarten.",
     matte:"\\[s=\\frac{v_0+v}{2}\\cdot t=\\frac{8{,}0}{2}\\cdot 5{,}0=20\\ \\mathrm m\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"8 m/s är ungefär 29 km/h, och 20 meter på fem sekunder är en lugn inbromsning. Storleksordningen stämmer med hur det känns på en cykel."}
  ],
  svar:"Accelerationen är \\(-1{,}60\\ \\mathrm{m/s^2}\\), bromskraften \\(120\\ \\mathrm N\\) bakåt och bromssträckan \\(20\\ \\mathrm m\\).",
  fallgrop:"Att räkna kraften ur farten i stället för ur accelerationen. Det är hastighetens <em>ändring</em> per sekund som kraften hänger ihop med.",
  komihag:"Rörelse först, kraft sedan: bestäm \\(a\\) ur farterna och tiden, sätt sedan in i \\(F=ma\\)."
},

/* ─────────────────── Kapitel 6 ─────────────────── */

  "Tryck, kraft, area och hydraulik": {
  uppgift:"6.24",
  ram:"Tryck är kraft per area, \\(p=F/A\\). Samma kraft ger högt tryck på en liten yta och lågt tryck på en stor — det är därför en stilettklack lämnar märken men en skida inte gör det.",
  steg:[
    {rubrik:"Summera hela kontaktarean",
     text:"Bordet står på fyra ben, så tyngden fördelas över alla fyra ytorna tillsammans.",
     matte:"\\[A=4\\cdot 3{,}0=12\\ \\mathrm{cm^2}\\]"},
    {rubrik:"Omvandla arean till kvadratmeter",
     text:"Pascal betyder newton per kvadratmeter. Faktorn mellan cm² och m² är \\(10^{4}\\), eftersom enheten är kvadrerad.",
     matte:"\\[A=12\\ \\mathrm{cm^2}=1{,}2\\cdot 10^{-3}\\ \\mathrm{m^2}\\]"},
    {rubrik:"Beräkna kraften",
     text:"Det är bordets tyngdkraft som trycker mot golvet, inte massan.",
     matte:"\\[F=mg=18\\cdot 9{,}82=176{,}8\\ \\mathrm N\\]"},
    {rubrik:"Dividera kraft med area",
     text:"Newton delat med kvadratmeter ger pascal.",
     matte:"\\[p=\\frac FA=\\frac{176{,}8}{1{,}2\\cdot 10^{-3}}=1{,}47\\cdot 10^{5}\\ \\mathrm{Pa}=147\\ \\mathrm{kPa}\\]"}
  ],
  svar:"Bordet ger trycket cirka \\(147\\ \\mathrm{kPa}\\) mot golvet.",
  fallgrop:"Att sätta in arean i cm². Det ger ett svar som är 10 000 gånger för litet — kvadratenheter kräver att faktorn kvadreras.",
  komihag:"\\(p=\\dfrac FA\\), med kraften i newton och arean i m². \\(1\\ \\mathrm{Pa}=1\\ \\mathrm{N/m^2}\\)."
},

  "Hydrostatiskt tryck": {
  uppgift:"6.26",
  ram:"Vätsketrycket beror bara på djupet och vätskans densitet, \\(p=\\rho gh\\) — inte på bassängens form eller på hur mycket vatten som finns. Två meter ned i en pool och två meter ned i en sjö ger exakt samma tryck.",
  steg:[
    {rubrik:"Skriv upp sambandet",
     text:"Densiteten i kg/m³ och djupet i meter ger trycket i pascal.",
     matte:"\\[p=\\rho gh\\]"},
    {rubrik:"a) Sätt in djupet 3,5 m",
     text:"Det här är vätsketrycket, alltså övertrycket utöver lufttrycket.",
     matte:"\\[p=998\\cdot 9{,}82\\cdot 3{,}5=34{,}3\\ \\mathrm{kPa}\\]"},
    {rubrik:"b) Byt bara ut djupet",
     text:"Trycket är proportionellt mot djupet. Går man från 3,5 till 5,0 m växer det med faktorn \\(5{,}0/3{,}5\\).",
     matte:"\\[p=998\\cdot 9{,}82\\cdot 5{,}0=49{,}0\\ \\mathrm{kPa}\\]"},
    {rubrik:"c) Byt bara ut densiteten",
     text:"Olivolja är lättare än vatten, så trycket måste bli mindre vid samma djup.",
     matte:"\\[p=916\\cdot 9{,}82\\cdot 3{,}5=31{,}5\\ \\mathrm{kPa}\\]"}
  ],
  svar:"Trycken blir \\(34\\ \\mathrm{kPa}\\), \\(49\\ \\mathrm{kPa}\\) respektive \\(31\\ \\mathrm{kPa}\\).",
  fallgrop:"Att försöka räkna in bassängens bredd eller vattenmängd. I \\(p=\\rho gh\\) finns varken area eller volym — bara djupet spelar roll.",
  komihag:"\\(p=\\rho gh\\). Dubbelt djup ger dubbelt vätsketryck, oavsett kärlets form."
},

  "Lufttryck och tryckskillnader": {
  uppgift:"6.70",
  ram:"Ovanför vattnet trycker atmosfären, och under ytan tillkommer vattenpelarens tryck. Totaltrycket är summan av de två, medan vätsketrycket ensamt kallas övertryck.",
  steg:[
    {rubrik:"a) Beräkna vattnets bidrag",
     text:"Det hydrostatiska trycket beror bara på djupet och densiteten.",
     matte:"\\[p_v=\\rho gh=998\\cdot 9{,}82\\cdot 30=294\\ \\mathrm{kPa}\\]"},
    {rubrik:"b) Lägg till lufttrycket",
     text:"Atmosfären vilar på vattenytan och trycket förs vidare ned genom vätskan.",
     matte:"\\[p_{\\mathrm{tot}}=101+294=395\\ \\mathrm{kPa}\\]"},
    {rubrik:"Kontrollera med tumregeln",
     text:"Ungefär tio meter vatten motsvarar ett helt lufttryck. Trettio meter ger alltså cirka tre lufttryck vätsketryck plus atmosfären ovanför — nära fyra lufttryck totalt, vilket stämmer med 395 kPa."},
    {rubrik:"Håll isär de två svaren",
     text:"Frågar uppgiften efter vätsketrycket ska lufttrycket inte vara med. Frågar den efter det totala trycket, eller efter trycket på en dykares lungor, måste det med."}
  ],
  svar:"Vätsketrycket är \\(294\\ \\mathrm{kPa}\\) och det totala trycket \\(395\\ \\mathrm{kPa}\\).",
  fallgrop:"Att addera lufttrycket när frågan bara gäller vätsketrycket, eller att glömma det när totaltrycket efterfrågas. Läs vilket av dem som söks.",
  komihag:"\\(p_{\\mathrm{tot}}=p_0+\\rho gh\\). Cirka 10 m vatten motsvarar ett lufttryck."
},

  "Boyles lag": {
  uppgift:"6.143",
  ram:"Vid konstant temperatur är produkten av tryck och volym oförändrad för en instängd gasmängd: \\(p_1V_1=p_2V_2\\). Trycker du ihop gasen till hälften fördubblas trycket.",
  steg:[
    {rubrik:"Kontrollera att villkoret gäller",
     text:"Gasmängden är instängd i sprutan och temperaturen är oförändrad. Då — och bara då — gäller Boyles lag."},
    {rubrik:"Skriv upp sambandet",
     text:"Volymerna får vara i ml på båda sidor, eftersom enheten förkortas bort i kvoten. Trycket kommer ut i samma enhet som det sattes in i.",
     matte:"\\[p_1V_1=p_2V_2\\]"},
    {rubrik:"Lös ut det nya trycket",
     text:"Dividera med den nya volymen.",
     matte:"\\[p_2=\\frac{p_1V_1}{V_2}=\\frac{101\\cdot 60}{30}=202\\ \\mathrm{kPa}\\]"},
    {rubrik:"Kontrollera mot intuitionen",
     text:"Volymen halverades och trycket fördubblades. Ett svar som blivit mindre än 101 kPa hade varit fel — att komprimera en gas kan aldrig sänka trycket."}
  ],
  svar:"Trycket i sprutan blir \\(202\\ \\mathrm{kPa}\\).",
  fallgrop:"Att vända på kvoten och få 50,5 kPa. Mindre volym betyder alltid högre tryck — kontrollera riktningen innan du svarar.",
  komihag:"\\(p_1V_1=p_2V_2\\) vid konstant temperatur. Tryck och volym är omvänt proportionella."
},

  "Allmänna gaslagen": {
  uppgift:"6.188",
  ram:"Ändras både tryck, volym och temperatur hålls i stället kvoten \\(pV/T\\) konstant. Det enda absoluta kravet är att temperaturen räknas i kelvin — celsius fungerar inte i den här formeln.",
  steg:[
    {rubrik:"Räkna om båda temperaturerna till kelvin",
     text:"Kelvin är nödvändigt eftersom formeln innehåller en kvot med temperaturen. En negativ celsiustemperatur skulle annars ge ett meningslöst svar.",
     matte:"\\[T_1=20+273{,}15=293\\ \\mathrm K\\qquad T_2=-10+273{,}15=263\\ \\mathrm K\\]"},
    {rubrik:"Skriv upp allmänna gaslagen",
     text:"Gasmängden är densamma i ballongen före och efter, så kvoten är oförändrad.",
     matte:"\\[\\frac{p_1V_1}{T_1}=\\frac{p_2V_2}{T_2}\\]"},
    {rubrik:"Lös ut det sökta trycket",
     text:"Multiplicera över och isolera \\(p_2\\). Volymerna får stå kvar i m³ på båda sidor.",
     matte:"\\[p_2=p_1\\cdot\\frac{V_1}{V_2}\\cdot\\frac{T_2}{T_1}\\]"},
    {rubrik:"Sätt in värdena",
     text:"Räkna de två kvoterna var för sig, så blir det lättare att se om något hamnat upp och ned.",
     matte:"\\[p_2=101{,}3\\cdot\\frac{4{,}0}{12}\\cdot\\frac{263}{293}=30{,}3\\ \\mathrm{kPa}\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"Volymen tredubblades, vilket ensamt skulle sänka trycket till en tredjedel. Kylningen sänker det ytterligare något. Cirka 30 kPa stämmer — och förklarar varför ballongen växer när den stiger."}
  ],
  svar:"Trycket i ballongen är då cirka \\(30\\ \\mathrm{kPa}\\).",
  fallgrop:"Att sätta in \\(-10\\) i stället för 263 K. Med celsius i nämnaren kan man till och med dividera med noll — kelvin är inte valfritt här.",
  komihag:"\\(\\dfrac{p_1V_1}{T_1}=\\dfrac{p_2V_2}{T_2}\\), alltid med \\(T\\) i kelvin."
},

  "Kelvinskalan": {
  uppgift:"6.38",
  ram:"Kelvinskalan har samma gradstorlek som celsiusskalan men börjar vid den absoluta nollpunkten. Omvandlingen är därför bara en addition eller subtraktion av 273,15 — ingen multiplikation.",
  steg:[
    {rubrik:"Skriv upp sambandet",
     text:"Från celsius till kelvin adderar du; åt andra hållet subtraherar du.",
     matte:"\\[T(\\mathrm K)=t({}^{\\circ}\\mathrm C)+273{,}15\\]"},
    {rubrik:"a) 25 °C till kelvin",
     text:"Addera direkt.",
     matte:"\\[T=25+273{,}15=298\\ \\mathrm K\\]"},
    {rubrik:"b) −40 °C till kelvin",
     text:"Även negativa celsiustemperaturer adderas. Resultatet blir positivt, för ingenting kan vara kallare än 0 K.",
     matte:"\\[T=-40+273{,}15=233\\ \\mathrm K\\]"},
    {rubrik:"c) 195 K till celsius",
     text:"Nu går det åt andra hållet, så subtrahera.",
     matte:"\\[t=195-273{,}15=-78\\ {}^{\\circ}\\mathrm C\\]"},
    {rubrik:"Kontrollera storleksordningen",
     text:"Vanliga rumstemperaturer ligger runt 293–298 K. Ett kelvinsvar nära noll eller ett negativt kelvinsvar är alltid ett räknefel."}
  ],
  svar:"Temperaturerna är \\(298\\ \\mathrm K\\), \\(233\\ \\mathrm K\\) och \\(-78\\ {}^{\\circ}\\mathrm C\\).",
  fallgrop:"Att subtrahera i stället för att addera vid negativa temperaturer och få 313 K för −40 °C. Riktningen bestäms av vilken skala du går <em>till</em>, inte av tecknet.",
  komihag:"\\(T=t+273{,}15\\). Skillnader är lika stora i båda skalorna: en ändring på 10 °C är en ändring på 10 K."
},

  "Arkimedes princip och flytkraft": {
  uppgift:"6.6",
  ram:"Arkimedes princip säger att lyftkraften är lika stor som tyngden av den undanträngda vätskan. Föremålets eget material spelar ingen roll för lyftkraften — bara hur stor volym det tränger undan.",
  steg:[
    {rubrik:"a) Omvandla volymen till kubikmeter",
     text:"Densiteten är given i kg/m³, så volymen måste vara i m³. För kubikenheter är faktorn \\(10^{6}\\).",
     matte:"\\[V=250\\ \\mathrm{cm^3}=250\\cdot 10^{-6}=2{,}50\\cdot 10^{-4}\\ \\mathrm{m^3}\\]"},
    {rubrik:"b) Beräkna den undanträngda massan",
     text:"Föremålet är helt nedsänkt, så det tränger undan exakt sin egen volym vatten.",
     matte:"\\[m_v=\\rho V=998\\cdot 2{,}50\\cdot 10^{-4}=0{,}250\\ \\mathrm{kg}\\]"},
    {rubrik:"c) Gå från massa till lyftkraft",
     text:"Lyftkraften är tyngden av just det undanträngda vattnet.",
     matte:"\\[F_A=m_vg=0{,}250\\cdot 9{,}82=2{,}45\\ \\mathrm N\\]"},
    {rubrik:"Se genvägen",
     text:"Stegen kan slås ihop till \\(F_A=\\rho gV\\). Ett kilo vatten väger knappt 10 N, så en kvarts liter undanträngt vatten ska ge ungefär 2,5 N — vilket stämmer."}
  ],
  svar:"Volymen är \\(2{,}50\\cdot 10^{-4}\\ \\mathrm{m^3}\\), den undanträngda massan \\(0{,}250\\ \\mathrm{kg}\\) och lyftkraften \\(2{,}45\\ \\mathrm N\\).",
  fallgrop:"Att använda föremålets egen densitet i stället för vätskans. Det är den undanträngda <em>vätskan</em> som ger lyftkraften.",
  komihag:"\\(F_A=\\rho_{\\text{vätska}}\\,gV_{\\text{undanträngd}}\\). Helt nedsänkt kropp tränger undan hela sin volym."
},

  "Flytkraft, flytvillkor och densitet": {
  uppgift:"6.115",
  ram:"En kropp flyter när dess densitet är mindre än vätskans. Hur djupt den ligger avgörs av densitetskvoten: den nedsänkta andelen är precis \\(\\rho_{\\text{kropp}}/\\rho_{\\text{vätska}}\\).",
  steg:[
    {rubrik:"Förstå varför kvoten dyker upp",
     text:"Klossen flyter, så lyftkraften bär hela tyngden: \\(\\rho_v gV_{\\text{under}}=\\rho_k gV\\). Både \\(g\\) och areorna förkortas bort, och kvar blir kvoten mellan densiteterna."},
    {rubrik:"a) Beräkna den nedsänkta andelen",
     text:"Sätt in träets och vattnets densitet.",
     matte:"\\[f=\\frac{\\rho_k}{\\rho_v}=\\frac{600}{998}=0{,}601\\]"},
    {rubrik:"b) Räkna om andelen till centimeter",
     text:"Klossen har konstant tvärsnitt, så andelen av volymen är också andelen av höjden.",
     matte:"\\[h_{\\text{under}}=0{,}601\\cdot 12=7{,}21\\ \\mathrm{cm}\\]"},
    {rubrik:"Ta fram det som sticker upp",
     text:"Frågan gäller den del som syns ovanför ytan, inte den nedsänkta.",
     matte:"\\[h_{\\text{över}}=12-7{,}21=4{,}8\\ \\mathrm{cm}\\]"}
  ],
  svar:"Cirka \\(60\\ \\%\\) av klossen ligger under ytan, och \\(4{,}8\\ \\mathrm{cm}\\) sticker upp.",
  fallgrop:"Att svara 7,2 cm på b). Det är den nedsänkta höjden — frågan gäller hur mycket som sticker upp.",
  komihag:"Nedsänkt andel \\(=\\dfrac{\\rho_{\\text{kropp}}}{\\rho_{\\text{vätska}}}\\). Kvoten är alltid mindre än 1 för något som flyter."
},

/* ─────────────────── Kapitel 7 ─────────────────── */

  "Värmeenergi och specifik värmekapacitet": {
  uppgift:"7.4",
  ram:"Specifik värmekapacitet talar om hur mycket energi ett kilo av ett ämne behöver för att bli en grad varmare. Sambandet \\(Q=mc\\Delta T\\) gäller så länge ämnet inte byter fas.",
  steg:[
    {rubrik:"Kontrollera att ingen fasövergång sker",
     text:"Järn som värms 60 °C smälter inte. Då räcker \\(Q=mc\\Delta T\\) — annars hade smältenergi behövt läggas till."},
    {rubrik:"Se att gradskillnaden är densamma i båda skalorna",
     text:"Enheten för \\(c\\) är J/(kg·K), men en temperaturändring på 60 °C är exakt en ändring på 60 K. Ingen omräkning behövs för <em>skillnader</em>."},
    {rubrik:"Sätt in i sambandet",
     text:"Massan i kilogram, \\(c\\) som given och ändringen i kelvin.",
     matte:"\\[Q=mc\\Delta T=2{,}5\\cdot 460\\cdot 60=69\\,000\\ \\mathrm J\\]"},
    {rubrik:"Jämför med vatten",
     text:"Vatten har \\(c=4180\\) J/(kg·K), alltså nio gånger järnets. Samma massa vatten hade krävt nio gånger mer energi — det är därför vatten är så bra på att lagra värme."}
  ],
  svar:"Det krävs \\(69\\ \\mathrm{kJ}\\).",
  fallgrop:"Att räkna om 60 °C till 333 K och sätta in det. \\(\\Delta T\\) är en <em>skillnad</em>, och skillnader är lika stora i celsius och kelvin.",
  komihag:"\\(Q=mc\\Delta T\\). Högt \\(c\\) betyder att ämnet är trögt att värma — och lika trögt att kyla."
},

  "Fasövergångar och latent värme": {
  uppgift:"7.14",
  ram:"Under en fasövergång ändras inte temperaturen, men energi går ändå åt. Smältvärmet bryter bindningarna i iskristallen; först när all is blivit vatten börjar temperaturen stiga igen.",
  steg:[
    {rubrik:"Dela upp förloppet i två delar",
     text:"Först smälter isen vid 0 °C, sedan värms smältvattnet från 0 till 20 °C. De två stegen kräver olika formler och måste räknas var för sig."},
    {rubrik:"Beräkna smältenergin",
     text:"Här används smältentalpin \\(L_f=334\\) kJ/kg. Ingen temperaturändring ingår.",
     matte:"\\[Q_1=mL_f=0{,}250\\cdot 334=83{,}5\\ \\mathrm{kJ}\\]"},
    {rubrik:"Beräkna uppvärmningen av vattnet",
     text:"Nu är det vatten, så vattnets \\(c=4{,}18\\) kJ/(kg·K) gäller — inte isens.",
     matte:"\\[Q_2=mc\\Delta T=0{,}250\\cdot 4{,}18\\cdot 20=20{,}9\\ \\mathrm{kJ}\\]"},
    {rubrik:"Summera",
     text:"Den totala energin är summan av de två stegen.",
     matte:"\\[Q=83{,}5+20{,}9=104{,}4\\ \\mathrm{kJ}\\]"},
    {rubrik:"Lägg märke till proportionerna",
     text:"Att smälta isen kostade fyra gånger mer än att sedan värma vattnet tjugo grader. Fasövergångar är energidyra — därför håller isbitar drinken kall så länge."}
  ],
  svar:"Det krävs cirka \\(104\\ \\mathrm{kJ}\\).",
  fallgrop:"Att räkna med en temperaturändring från 0 till 20 °C rakt igenom och glömma smältsteget. Under smältningen står temperaturen still trots att energi tillförs.",
  komihag:"Fasövergång: \\(Q=mL\\). Temperaturändring: \\(Q=mc\\Delta T\\). Ett förlopp med både och räknas i separata steg."
},

  "Uppvärmning med effekt och verkningsgrad": {
  uppgift:"7.28",
  ram:"En värmare med effekten \\(P\\) levererar energin \\(Pt\\), men bara en del av den hamnar i vattnet. Verkningsgraden avgör hur stor del, och därmed hur lång tid det tar.",
  steg:[
    {rubrik:"Räkna ut energin vattnet behöver",
     text:"En liter vatten väger ungefär ett kilo, så massan är 1,7 kg. Temperaturen ska höjas från 20 till 100 °C, alltså 80 K.",
     matte:"\\[Q=mc\\Delta T=1{,}7\\cdot 4180\\cdot 80=568\\,480\\ \\mathrm J\\]"},
    {rubrik:"Ta hänsyn till verkningsgraden",
     text:"Kokaren drar 2000 W från vägguttaget, men bara 90 % värmer vattnet. Resten värmer kanna, lock och rum.",
     matte:"\\[P_{\\text{nyttig}}=0{,}90\\cdot 2000=1800\\ \\mathrm W\\]"},
    {rubrik:"Dela energin med den nyttiga effekten",
     text:"Joule delat med watt ger sekunder.",
     matte:"\\[t=\\frac{Q}{P_{\\text{nyttig}}}=\\frac{568\\,480}{1800}=316\\ \\mathrm s\\]"},
    {rubrik:"Svara i en begriplig enhet",
     text:"316 sekunder är drygt fem minuter, vilket stämmer väl med en verklig vattenkokare."}
  ],
  svar:"Vattnet kokar efter cirka \\(316\\ \\mathrm s\\), alltså drygt \\(5\\) minuter.",
  fallgrop:"Att dividera med hela 2000 W. Då blir tiden för kort — det är bara den nyttiga effekten som värmer vattnet.",
  komihag:"\\(t=\\dfrac{Q}{\\eta P}\\). Lägre verkningsgrad betyder längre tid, aldrig kortare."
},

  "Värmebalans och blandning": {
  uppgift:"7.55",
  ram:"När varmt och kallt blandas i ett isolerat kärl avger det varma exakt den energi som det kalla tar upp. Det ger en ekvation där sluttemperaturen är den enda okända.",
  steg:[
    {rubrik:"Ställ upp värmebalansen",
     text:"Det varma vattnet svalnar från 80 °C till \\(T\\), det kalla värms från 20 °C till \\(T\\). Avgiven energi är lika med upptagen.",
     matte:"\\[m_1c(80-T)=m_2c(T-20)\\]"},
    {rubrik:"Förkorta bort värmekapaciteten",
     text:"Båda mängderna är vatten och har samma \\(c\\), så den försvinner ur ekvationen. Hade det varit olika ämnen måste \\(c\\) stå kvar."},
    {rubrik:"Lös ut sluttemperaturen",
     text:"Kvar blir ett massvägt medelvärde av de två starttemperaturerna.",
     matte:"\\[T=\\frac{0{,}200\\cdot 80+0{,}300\\cdot 20}{0{,}500}=44\\ {}^{\\circ}\\mathrm C\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"Svaret måste ligga mellan 20 och 80 °C, och närmare 20 eftersom det finns mer kallt vatten. 44 °C uppfyller båda kraven."}
  ],
  svar:"Sluttemperaturen blir \\(44\\ {}^{\\circ}\\mathrm C\\).",
  fallgrop:"Att ta medelvärdet 50 °C. Mängderna är olika stora, så temperaturen dras mot den större mängden.",
  komihag:"Avgiven värme = upptagen värme. Sluttemperaturen ligger alltid mellan de två starttemperaturerna."
},

/* ─────────────────── Kapitel 8 ─────────────────── */

  "Laddning och antal elektroner": {
  uppgift:"8.25",
  ram:"All laddning byggs av elektroner och protoner, och elementarladdningen \\(e=1{,}602\\cdot 10^{-19}\\) C är den minsta biten. En uppmätt laddning är alltid ett helt antal sådana.",
  steg:[
    {rubrik:"Skriv om laddningen i coulomb",
     text:"Nano betyder \\(10^{-9}\\), så \\(-8{,}0\\) nC är \\(-8{,}0\\cdot 10^{-9}\\) C."},
    {rubrik:"Dividera med elementarladdningen",
     text:"Räkna med beloppet. Antalet elektroner är ett rent tal och kan inte bli negativt.",
     matte:"\\[n=\\frac{|Q|}{e}=\\frac{8{,}0\\cdot 10^{-9}}{1{,}602\\cdot 10^{-19}}=5{,}0\\cdot 10^{10}\\]"},
    {rubrik:"Tolka minustecknet",
     text:"Att laddningen är negativ betyder överskott av elektroner. Vore den positiv skulle samma uträkning ge antalet elektroner som <em>saknas</em>."},
    {rubrik:"b) Följ laddningen",
     text:"Elektronerna har inte skapats — de har flyttats från håret till ballongen. Håret får därför lika stor positiv laddning. Total laddning bevaras alltid."}
  ],
  svar:"Ballongen har fått cirka \\(5{,}0\\cdot 10^{10}\\) överskottselektroner, och de kom från håret.",
  fallgrop:"Att multiplicera med \\(e\\) i stället för att dividera. Kontrollera storleksordningen: en nanocoulomb måste svara mot väldigt många elektroner.",
  komihag:"\\(Q=ne\\), alltså \\(n=\\dfrac{|Q|}{e}\\) med \\(e=1{,}602\\cdot 10^{-19}\\) C. Laddning skapas inte, den flyttas."
},

  "Coulombs lag och elektrisk kraft": {
  uppgift:"8.24",
  ram:"Coulombs lag ser ut precis som gravitationslagen: produkten av laddningarna delat med avståndet i kvadrat. Skillnaden är att elektrisk kraft kan vara både attraherande och frånstötande.",
  steg:[
    {rubrik:"a) Avgör riktningen ur tecknen",
     text:"Båda kulorna är positiva. Lika tecken stöter bort varandra, olika tecken drar till sig varandra."},
    {rubrik:"Skriv om laddningar och avstånd till SI-enheter",
     text:"Nanocoulomb blir coulomb och centimeter blir meter, annars stämmer inte konstantens enhet.",
     matte:"\\[q_1=7{,}0\\cdot 10^{-9}\\ \\mathrm C,\\quad q_2=5{,}0\\cdot 10^{-9}\\ \\mathrm C,\\quad r=0{,}060\\ \\mathrm m\\]"},
    {rubrik:"b) Sätt in i Coulombs lag",
     text:"Räkna med laddningarnas belopp; riktningen är redan avgjord i a).",
     matte:"\\[F=k\\frac{q_1q_2}{r^2}=8{,}99\\cdot 10^{9}\\cdot\\frac{7{,}0\\cdot 10^{-9}\\cdot 5{,}0\\cdot 10^{-9}}{0{,}060^{2}}=8{,}7\\cdot 10^{-5}\\ \\mathrm N\\]"},
    {rubrik:"Svara för båda kulorna",
     text:"Enligt Newtons tredje lag är krafterna lika stora och motriktade. Att den ena kulan har större laddning spelar ingen roll — den känner exakt samma kraft."}
  ],
  svar:"Kraften är frånstötande och \\(87\\ \\mu\\mathrm N\\) stor på vardera kulan.",
  fallgrop:"Att sätta in 6,0 cm i stället för 0,060 m. Eftersom avståndet kvadreras blir svaret då 10 000 gånger fel.",
  komihag:"\\(F=k\\dfrac{q_1q_2}{r^2}\\) med \\(k=8{,}99\\cdot 10^{9}\\) Nm²/C². Dubbelt avstånd ger en fjärdedels kraft."
},

  "Elektrisk potential och spänning": {
  uppgift:"8.257",
  ram:"Spänning är energi per laddning: en volt betyder en joule per coulomb. Flyttas en laddning genom en potentialskillnad ändras dess elektriska lägesenergi med \\(qU\\).",
  steg:[
    {rubrik:"Tolka vad en volt betyder",
     text:"\\(U=\\Delta E/q\\). Vänder man på det fås energiändringen som laddning gånger spänning."},
    {rubrik:"Skriv upp sambandet",
     text:"Laddningen i coulomb och spänningen i volt ger energin i joule.",
     matte:"\\[|\\Delta E|=|q|U\\]"},
    {rubrik:"Sätt in värdena",
     text:"Multiplicera rakt av; tiopotenserna hanteras var för sig.",
     matte:"\\[|\\Delta E|=2\\cdot 10^{-6}\\cdot 5=1\\cdot 10^{-5}\\ \\mathrm J\\]"},
    {rubrik:"Rimlighetsbedöm",
     text:"En mikrocoulomb är en mycket liten laddning, så några hundratusendels joule är väntat. Elektriska energier på laddningsnivå är alltid små i joule räknat."}
  ],
  svar:"Den elektriska potentiella energin ändras med \\(1\\cdot 10^{-5}\\ \\mathrm J\\).",
  fallgrop:"Att dividera laddningen med spänningen. Volt <em>är</em> joule per coulomb, så energin fås genom multiplikation.",
  komihag:"\\(U=\\dfrac{\\Delta E}{q}\\), alltså \\(\\Delta E=qU\\). En volt betyder en joule per coulomb."
},

  "Elektriskt fält och kraft på laddningar": {
  uppgift:"8.30",
  ram:"Mellan två parallella plattor är fältet homogent — lika starkt överallt. Då gäller det enkla sambandet \\(E=U/d\\), och fältstyrkan mäts i volt per meter.",
  steg:[
    {rubrik:"Kontrollera att fältet är homogent",
     text:"Parallella plattor med spänning mellan sig ger raka, jämnt fördelade fältlinjer. Bara då får \\(E=U/d\\) användas."},
    {rubrik:"Skriv om avståndet till meter",
     text:"Fältstyrkan anges i V/m, så millimetrarna måste bort.",
     matte:"\\[d=4{,}0\\ \\mathrm{mm}=4{,}0\\cdot 10^{-3}\\ \\mathrm m\\]"},
    {rubrik:"Dividera spänningen med avståndet",
     text:"Volt delat med meter ger volt per meter.",
     matte:"\\[E=\\frac Ud=\\frac{230}{4{,}0\\cdot 10^{-3}}=5{,}8\\cdot 10^{4}\\ \\mathrm{V/m}\\]"},
    {rubrik:"Se vad fältstyrkan används till",
     text:"Kraften på en laddning i fältet är \\(F=qE\\). Ett starkt fält på kort avstånd är alltså vad som krävs för att flytta laddningar effektivt."}
  ],
  svar:"Fältstyrkan är \\(5{,}8\\cdot 10^{4}\\ \\mathrm{V/m}=58\\ \\mathrm{kV/m}\\).",
  fallgrop:"Att sätta in 4,0 mm som 4,0. Svaret blir då tusen gånger för litet — enheten V/m kräver meter.",
  komihag:"Homogent fält: \\(E=\\dfrac Ud\\). Kraften på en laddning i fältet: \\(F=qE\\)."
},

  "Ohms lag": {
  uppgift:"8.38",
  ram:"Ohms lag \\(U=RI\\) binder ihop spänning, ström och resistans. Den används åt alla håll — det gäller bara att lösa ut rätt storhet och hålla enheterna i volt, ampere och ohm.",
  steg:[
    {rubrik:"a) Lös ut strömmen",
     text:"Spänningen och resistansen är kända, så dividera.",
     matte:"\\[I=\\frac UR=\\frac{1{,}5}{400}=3{,}75\\cdot 10^{-3}\\ \\mathrm A\\]"},
    {rubrik:"Svara i lämplig enhet",
     text:"Några tusendels ampere skrivs bekvämare som milliampere: \\(3{,}8\\) mA. Små strömmar anges nästan alltid i mA."},
    {rubrik:"b) Vänd på sambandet",
     text:"Nu är spänningen och den önskade strömmen kända, och resistansen söks.",
     matte:"\\[R=\\frac UI=\\frac{230}{0{,}50}=460\\ \\Omega\\]"},
    {rubrik:"Kontrollera riktningen",
     text:"Högre resistans ger mindre ström vid samma spänning. Ville Fanny ha dubbelt så stor ström skulle resistansen behöva halveras."}
  ],
  svar:"Strömmen blir \\(3{,}8\\ \\mathrm{mA}\\), och produkten ska ha resistansen \\(460\\ \\Omega\\).",
  fallgrop:"Att sätta in strömmen i milliampere utan att räkna om till ampere. Ohms lag kräver grundenheterna volt, ampere och ohm.",
  komihag:"\\(U=RI\\), \\(I=\\dfrac UR\\), \\(R=\\dfrac UI\\). Vid given spänning är ström och resistans omvänt proportionella."
},

  "Seriekoppling": {
  uppgift:"8.55",
  ram:"I en seriekoppling finns bara en väg för strömmen, så samma ström går genom alla komponenter. Spänningen däremot delas upp, och den största resistorn får den största delen.",
  steg:[
    {rubrik:"a) Addera resistanserna",
     text:"Seriekopplade resistorer verkar tillsammans som en enda större.",
     matte:"\\[R_e=280+120=400\\ \\Omega\\]"},
    {rubrik:"b) Räkna ut kretsströmmen",
     text:"Använd batterispänningen och ersättningsresistansen. Strömmen är densamma överallt i kretsen.",
     matte:"\\[I=\\frac{U}{R_e}=\\frac{6{,}0}{400}=15\\ \\mathrm{mA}\\]"},
    {rubrik:"c) Beräkna spänningen över varje resistor",
     text:"Ohms lag på varje resistor för sig, med den gemensamma strömmen.",
     matte:"\\[U_1=0{,}015\\cdot 280=4{,}2\\ \\mathrm V\\qquad U_2=0{,}015\\cdot 120=1{,}8\\ \\mathrm V\\]"},
    {rubrik:"Kontrollera med spänningssumman",
     text:"\\(4{,}2+1{,}8=6{,}0\\) V, alltså precis batteriets spänning. Den kontrollen fångar nästan alla räknefel i seriekretsar."}
  ],
  svar:"\\(R_e=400\\ \\Omega\\), strömmen är \\(15\\ \\mathrm{mA}\\), och spänningarna \\(4{,}2\\ \\mathrm V\\) respektive \\(1{,}8\\ \\mathrm V\\).",
  fallgrop:"Att tro att spänningen delas lika. Den fördelas proportionellt mot resistansen — den större resistorn tar den större delen.",
  komihag:"Serie: \\(R_e=R_1+R_2\\), samma ström överallt, delspänningarna summerar till källans spänning."
},

  "Parallellkoppling": {
  uppgift:"8.51",
  ram:"I en parallellkoppling ligger alla grenar mellan samma två punkter, så alla får samma spänning. Strömmarna delar däremot upp sig, och ersättningsresistansen blir mindre än den minsta grenen.",
  steg:[
    {rubrik:"a) Beräkna grenströmmarna",
     text:"Hela batterispänningen ligger över varje resistor för sig.",
     matte:"\\[I_1=I_2=\\frac{4{,}7}{470}=10\\ \\mathrm{mA}\\]"},
    {rubrik:"b) Summera till totalströmmen",
     text:"Strömmen från batteriet delar upp sig i grenarna och möts igen efteråt.",
     matte:"\\[I=10+10=20\\ \\mathrm{mA}\\]"},
    {rubrik:"c) Bestäm ersättningsresistansen",
     text:"Två lika stora resistorer parallellt ger halva resistansen. Kontrollera med Ohms lag: \\(4{,}7/0{,}020=235\\ \\Omega\\).",
     matte:"\\[R_e=\\frac{470}{2}=235\\ \\Omega\\]"},
    {rubrik:"d) Lägg till en tredje gren",
     text:"Fler parallella vägar betyder mindre motstånd totalt, inte mer.",
     matte:"\\[R_e'=\\frac{470}{3}=157\\ \\Omega\\]"}
  ],
  svar:"Varje gren leder \\(10\\ \\mathrm{mA}\\), totalt \\(20\\ \\mathrm{mA}\\). Ersättningsresistansen är \\(235\\ \\Omega\\), och med tre resistorer \\(157\\ \\Omega\\).",
  fallgrop:"Att addera resistanserna som i en seriekoppling och få 940 Ω. Parallellt blir resultatet alltid <em>mindre</em> än den minsta resistorn.",
  komihag:"Parallellt: samma spänning i alla grenar, strömmarna adderas, \\(\\dfrac1{R_e}=\\dfrac1{R_1}+\\dfrac1{R_2}\\). \\(n\\) lika resistorer ger \\(R/n\\)."
},

  "Kretsanalys och blandade resistorkopplingar": {
  uppgift:"8.87",
  ram:"Första steget i all kretsanalys är att avgöra hur komponenterna sitter. Ligger de mellan samma två punkter är de parallella, och då är spänningen given innan någon räkning börjar.",
  steg:[
    {rubrik:"a) Läs av kopplingen",
     text:"Båda resistorerna är anslutna mellan samma två punkter, alltså parallellt. Då ligger hela batterispänningen över var och en.",
     matte:"\\[U_1=U_2=6{,}0\\ \\mathrm V\\]"},
    {rubrik:"b) Räkna grenströmmarna var för sig",
     text:"Ohms lag på varje gren, med samma spänning men olika resistans.",
     matte:"\\[I_1=\\frac{6{,}0}{200}=30\\ \\mathrm{mA}\\qquad I_2=\\frac{6{,}0}{300}=20\\ \\mathrm{mA}\\]"},
    {rubrik:"c) Bestäm ersättningsresistansen",
     text:"För två resistorer parallellt går det snabbast med produkten delat med summan.",
     matte:"\\[R_e=\\frac{R_1R_2}{R_1+R_2}=\\frac{200\\cdot 300}{500}=120\\ \\Omega\\]"},
    {rubrik:"Kontrollera med totalströmmen",
     text:"Grenströmmarna ger \\(30+20=50\\) mA, och \\(6{,}0/0{,}050=120\\ \\Omega\\). Samma svar två vägar betyder att kopplingen är rätt tolkad."}
  ],
  svar:"Båda resistorerna har \\(6{,}0\\ \\mathrm V\\). Strömmarna är \\(30\\ \\mathrm{mA}\\) och \\(20\\ \\mathrm{mA}\\), och \\(R_e=120\\ \\Omega\\).",
  fallgrop:"Att dela upp spänningen mellan resistorerna. Det gör man i en seriekoppling — parallellt får alla grenar hela spänningen.",
  komihag:"Avgör serie eller parallell först. Parallellt: samma \\(U\\), olika \\(I\\). I serie: samma \\(I\\), olika \\(U\\)."
},

  "Elektrisk effekt och energi": {
  uppgift:"8.75",
  ram:"Elektrisk effekt är spänning gånger ström, \\(P=UI\\). Med Ohms lag kan den skrivas om till \\(P=U^2/R\\) eller \\(P=RI^2\\) — välj den form där du redan har värdena.",
  steg:[
    {rubrik:"a) Använd Ohms lag för strömmen",
     text:"Spänningen och resistansen är givna.",
     matte:"\\[I=\\frac UR=\\frac{230}{52}=4{,}42\\ \\mathrm A\\]"},
    {rubrik:"b) Välj lämplig effektformel",
     text:"Med spänning och resistans kända går det direkt med \\(P=U^2/R\\), utan omvägen via strömmen.",
     matte:"\\[P=\\frac{U^2}{R}=\\frac{230^2}{52}=1017\\ \\mathrm W\\]"},
    {rubrik:"Kontrollera med den andra formen",
     text:"\\(P=UI=230\\cdot 4{,}42\\approx 1017\\) W. Samma svar, vilket bekräftar att strömmen i a) blev rätt."},
    {rubrik:"Rimlighetsbedöm",
     text:"Drygt en kilowatt är precis vad ett vanligt värmeelement drar. En effekt på några watt eller några hundra kilowatt hade avslöjat ett enhetsfel."}
  ],
  svar:"Strömmen är \\(4{,}42\\ \\mathrm A\\) och effekten cirka \\(1{,}02\\ \\mathrm{kW}\\).",
  fallgrop:"Att blanda ihop \\(P=U^2/R\\) och \\(P=RI^2\\). Spänningen hör ihop med division, strömmen med multiplikation.",
  komihag:"\\(P=UI=\\dfrac{U^2}{R}=RI^2\\). Alla tre är samma formel med Ohms lag insatt."
},

  "Elektrisk energi, effekt och batterier": {
  uppgift:"8.63",
  ram:"Märkningen på en lampa anger vid vilken spänning den är byggd för att användas och vilken effekt den då utvecklar. Ur de två går både ström och resistans att räkna fram.",
  steg:[
    {rubrik:"a) Lös ut strömmen ur effektformeln",
     text:"Effekten är spänning gånger ström, så strömmen fås genom division.",
     matte:"\\[I=\\frac PU=\\frac{21}{12}=1{,}75\\ \\mathrm A\\]"},
    {rubrik:"b) Använd Ohms lag",
     text:"Nu är både spänning och ström kända.",
     matte:"\\[R=\\frac UI=\\frac{12}{1{,}75}=6{,}9\\ \\Omega\\]"},
    {rubrik:"Notera vilket värde du fått",
     text:"Det här är resistansen när glödtråden är varm och lyser. Kall är den betydligt lägre — metallers resistans växer med temperaturen."},
    {rubrik:"Se genvägen",
     text:"Stegen kan slås ihop till \\(R=U^2/P=144/21=6{,}9\\ \\Omega\\), vilket ger samma svar utan omvägen via strömmen."}
  ],
  svar:"Lampan drar \\(1{,}75\\ \\mathrm A\\), och resistansen när den lyser är cirka \\(6{,}9\\ \\Omega\\).",
  fallgrop:"Att multiplicera 21 och 12. Effekten är redan produkten av spänning och ström — den okända fås genom att dividera.",
  komihag:"\\(P=UI\\). En märkning \"12 V, 21 W\" betyder att lampan drar 21 W just vid 12 V, inte vid någon annan spänning."
},

  "EMK och inre resistans": {
  uppgift:"8.44",
  ram:"Ett verkligt batteri har resistans även inuti sig. När ström går förloras därför en del av spänningen inne i batteriet, och polspänningen blir mindre än den elektromotoriska spänningen.",
  steg:[
    {rubrik:"a) Beräkna det inre spänningsfallet",
     text:"Ohms lag gäller för den inre resistansen precis som för allt annat.",
     matte:"\\[U_i=rI=0{,}50\\cdot 1{,}2=0{,}60\\ \\mathrm V\\]"},
    {rubrik:"b) Dra bort fallet från emk:n",
     text:"Polspänningen är det som faktiskt når den yttre kretsen.",
     matte:"\\[U_p=\\mathcal E-U_i=9{,}0-0{,}60=8{,}40\\ \\mathrm V\\]"},
    {rubrik:"c) Bestäm den yttre resistansen",
     text:"Det är polspänningen, inte emk:n, som ligger över den yttre kretsen.",
     matte:"\\[R=\\frac{U_p}{I}=\\frac{8{,}40}{1{,}2}=7{,}0\\ \\Omega\\]"},
    {rubrik:"d) Se vad som händer utan ström",
     text:"Med \\(I=0\\) blir det inre spänningsfallet noll och polspänningen lika med emk:n, 9,0 V. Det är därför en obelastad voltmeter visar batteriets fulla spänning."}
  ],
  svar:"Det inre spänningsfallet är \\(0{,}60\\ \\mathrm V\\), polspänningen \\(8{,}40\\ \\mathrm V\\) och den yttre resistansen \\(7{,}0\\ \\Omega\\). Utan ström blir polspänningen \\(9{,}0\\ \\mathrm V\\).",
  fallgrop:"Att räkna den yttre resistansen som \\(9{,}0/1{,}2\\). Emk:n ligger inte över den yttre kretsen — det gör polspänningen.",
  komihag:"\\(U_p=\\mathcal E-rI\\). Ju större ström, desto lägre polspänning. Vid \\(I=0\\) är de lika."
},

  "Resistivitet och ledarresistans": {
  uppgift:"8.80",
  ram:"En ledares resistans beror på materialet, längden och tjockleken: \\(R=\\rho\\dfrac{l}{A}\\). Lång och tunn ledning ger hög resistans, kort och grov ger låg.",
  steg:[
    {rubrik:"a) Skriv om arean i kvadratmeter",
     text:"En millimeter är \\(10^{-3}\\) m, och eftersom arean är kvadrerad blir faktorn \\(10^{-6}\\).",
     matte:"\\[A=1{,}0\\ \\mathrm{mm^2}=1{,}0\\cdot 10^{-6}\\ \\mathrm{m^2}\\]"},
    {rubrik:"b) Sätt in i formeln",
     text:"Resistiviteten i Ωm, längden i meter och arean i m² ger resistansen i ohm.",
     matte:"\\[R=\\rho\\frac lA=1{,}7\\cdot 10^{-8}\\cdot\\frac{10}{1{,}0\\cdot 10^{-6}}=0{,}17\\ \\Omega\\]"},
    {rubrik:"c) Dubblera längden",
     text:"Längden står i täljaren, så resistansen är proportionell mot den.",
     matte:"\\[R_{20}=2\\cdot 0{,}17=0{,}34\\ \\Omega\\]"},
    {rubrik:"d) Dubblera arean",
     text:"Arean står i nämnaren, så en grövre ledare ger mindre resistans.",
     matte:"\\[R_{2A}=\\frac{0{,}17}{2}=0{,}085\\ \\Omega\\]"},
    {rubrik:"Se varför kablar är grova",
     text:"Tio meter koppar ger bara några tiondels ohm. Det är därför en vanlig sladd kan försummas i kretsberäkningar — men också varför kraftledningar måste vara tjocka."}
  ],
  svar:"Arean är \\(1{,}0\\cdot 10^{-6}\\ \\mathrm{m^2}\\). Resistanserna blir \\(0{,}17\\ \\Omega\\), \\(0{,}34\\ \\Omega\\) respektive \\(0{,}085\\ \\Omega\\).",
  fallgrop:"Att sätta in arean i mm². Kvadratenheter kräver att omvandlingsfaktorn kvadreras — svaret blir annars en miljon gånger fel.",
  komihag:"\\(R=\\rho\\dfrac lA\\). Dubbel längd ger dubbel resistans, dubbel area ger halv."
},

/* ─────────────────── Kapitel 9 ─────────────────── */

  "Nuklider och isotoper": {
  uppgift:"9.206",
  ram:"Beteckningen \\({}^{A}_{Z}\\mathrm X\\) rymmer allt du behöver: \\(Z\\) är antalet protoner och \\(A\\) antalet kärnpartiklar totalt. Neutronantalet står aldrig utskrivet — det räknas fram.",
  steg:[
    {rubrik:"Läs av de två talen",
     text:"För \\({}^{23}_{11}\\mathrm{Na}\\) är masstalet \\(A=23\\) och atomnumret \\(Z=11\\). Det övre är alltid det större."},
    {rubrik:"Förstå vad masstalet räknar",
     text:"Masstalet är summan av protoner och neutroner, inte massan i något viktmått. Därför är det alltid ett heltal."},
    {rubrik:"Dra bort protonerna",
     text:"Det som återstår av kärnpartiklarna är neutronerna.",
     matte:"\\[N=A-Z=23-11=12\\]"},
    {rubrik:"Koppla till isotopbegreppet",
     text:"Isotoper av samma grundämne har samma \\(Z\\) men olika \\(A\\). Natrium-24 skulle alltså ha 13 neutroner — samma ämne, en neutron till."}
  ],
  svar:"Kärnan innehåller \\(12\\) neutroner.",
  fallgrop:"Att addera talen i stället för att subtrahera. Masstalet innehåller redan protonerna — de ska dras bort, inte läggas till.",
  komihag:"\\(A=Z+N\\), alltså \\(N=A-Z\\). Atomnumret bestämmer grundämnet, masstalet bestämmer isotopen."
},

  "Nuklider, isotoper och bindningsenergi": {
  uppgift:"9.22",
  ram:"I kärnfysiken mäts massa i atommassenheter, u, och energi i elektronvolt. Eftersom massa och energi hänger ihop via \\(E=mc^2\\) motsvarar 1 u alltid 931,5 MeV — den omräkningen används i varje bindningsenergiuppgift.",
  steg:[
    {rubrik:"Skriv upp de två omräkningarna",
     text:"Båda är enkla multiplikationer med siffervärdet i u.",
     matte:"\\[m_{\\mathrm{kg}}=m_{\\mathrm u}\\cdot 1{,}66054\\cdot 10^{-27}\\qquad E=m_{\\mathrm u}\\cdot 931{,}5\\ \\mathrm{MeV}\\]"},
    {rubrik:"Rad 1: en hel atommassenhet",
     text:"Med \\(m=1{,}000000\\) u faller definitionerna ut direkt.",
     matte:"\\[m=1{,}66054\\cdot 10^{-27}\\ \\mathrm{kg}\\qquad E=931{,}5\\ \\mathrm{MeV}\\]"},
    {rubrik:"Rad 2: en typisk massdefekt",
     text:"0,030000 u är storleksordningen på en massdefekt. Multiplicera med samma två faktorer.",
     matte:"\\[m=4{,}98\\cdot 10^{-29}\\ \\mathrm{kg}\\qquad E=27{,}9\\ \\mathrm{MeV}\\]"},
    {rubrik:"Rad 3: en heliumkärna",
     text:"4,002602 u är massan hos en heliumatom.",
     matte:"\\[m=6{,}65\\cdot 10^{-27}\\ \\mathrm{kg}\\qquad E=3728\\ \\mathrm{MeV}\\]"},
    {rubrik:"Notera varför u är praktiskt",
     text:"En massdefekt i kilogram blir ett obegripligt litet tal. I u ligger den kring hundradelar, och energin faller ut direkt med en multiplikation."}
  ],
  svar:"Raderna blir \\(1{,}66\\cdot 10^{-27}\\ \\mathrm{kg}\\) och \\(931{,}5\\ \\mathrm{MeV}\\); \\(4{,}98\\cdot 10^{-29}\\ \\mathrm{kg}\\) och \\(27{,}9\\ \\mathrm{MeV}\\); \\(6{,}65\\cdot 10^{-27}\\ \\mathrm{kg}\\) och \\(3728\\ \\mathrm{MeV}\\).",
  fallgrop:"Att gå omvägen via kilogram och \\(E=mc^2\\) för att få energin. Faktorn 931,5 MeV per u finns just för att slippa det.",
  komihag:"\\(1\\ \\mathrm u=1{,}66054\\cdot 10^{-27}\\ \\mathrm{kg}=931{,}5\\ \\mathrm{MeV}\\). Multiplicera siffervärdet i u med den faktor du behöver."
},

  "Kärnreaktioner, massa och energi": {
  uppgift:"9.39",
  ram:"En reaktionsformel skrivs så att både masstal och laddning stämmer på båda sidor. De två bevarandelagarna räcker för att lista ut vad dotterkärnan blir, utan att slå upp något.",
  steg:[
    {rubrik:"a) Vad avges vid alfasönderfall?",
     text:"En alfapartikel är en heliumkärna, \\({}^{4}_{2}\\mathrm{He}\\). Modern förlorar alltså 4 i masstal och 2 i atomnummer."},
    {rubrik:"Skriv alfaformeln",
     text:"\\(226-4=222\\) och \\(88-2=86\\), vilket är radon.",
     matte:"\\[{}^{226}_{88}\\mathrm{Ra}\\rightarrow{}^{222}_{86}\\mathrm{Rn}+{}^{4}_{2}\\mathrm{He}\\]"},
    {rubrik:"b) Vad händer vid beta-minus?",
     text:"En neutron omvandlas till en proton, och en elektron plus en antineutrino lämnar kärnan. Masstalet är oförändrat, men atomnumret ökar med ett."},
    {rubrik:"Skriv betaformeln",
     text:"Fosfor blir svavel, med samma masstal 32.",
     matte:"\\[{}^{32}_{15}\\mathrm P\\rightarrow{}^{32}_{16}\\mathrm S+{}^{0}_{-1}e+\\bar\\nu_e\\]"},
    {rubrik:"Kontrollera båda formlerna",
     text:"Summera masstalen och laddningarna på var sida. Stämmer de är formeln rätt — elektronens \\(-1\\) i nedre index är just det som får laddningen att gå ihop."}
  ],
  svar:"Radium-226 blir \\({}^{222}_{86}\\mathrm{Rn}\\), och fosfor-32 blir \\({}^{32}_{16}\\mathrm S\\).",
  fallgrop:"Att minska atomnumret vid beta-minus. Det är en <em>elektron</em> med laddningen \\(-1\\) som lämnar kärnan, så kärnans laddning ökar.",
  komihag:"Alfa: \\(A\\) minskar 4, \\(Z\\) minskar 2. Beta-minus: \\(A\\) oförändrat, \\(Z\\) ökar 1. Kontrollera alltid genom att summera båda leden."
},

  "Radioaktivt sönderfall, aktivitet och halveringstid": {
  uppgift:"9.86",
  ram:"Aktiviteten är antalet sönderfall per sekund och mäts i becquerel. Under varje halveringstid halveras den, oavsett hur mycket som finns kvar — det är därför man räknar i antal halveringstider, inte i timmar.",
  steg:[
    {rubrik:"a) Räkna antalet halveringstider",
     text:"Dela den förflutna tiden med halveringstiden. Svaret är ett rent tal.",
     matte:"\\[j=\\frac{t}{T_{1/2}}=\\frac{12}{3{,}0}=4\\]"},
    {rubrik:"Halvera lika många gånger",
     text:"Fyra halveringstider betyder att aktiviteten halveras fyra gånger i följd: \\(6{,}4\\rightarrow 3{,}2\\rightarrow 1{,}6\\rightarrow 0{,}80\\rightarrow 0{,}40\\) kBq."},
    {rubrik:"b) Räkna med formeln i stället",
     text:"Att halvera \\(j\\) gånger är samma sak som att multiplicera med \\(2^{-j}\\).",
     matte:"\\[A=A_0\\cdot 2^{-j}=6{,}4\\cdot 2^{-4}=\\frac{6{,}4}{16}=0{,}40\\ \\mathrm{kBq}\\]"},
    {rubrik:"Notera att det aldrig blir noll",
     text:"Efter ytterligare fyra halveringstider återstår 25 Bq, sedan drygt 1,5 Bq. Aktiviteten närmar sig noll men når det aldrig i teorin."}
  ],
  svar:"12 timmar är fyra halveringstider, och då återstår \\(0{,}40\\ \\mathrm{kBq}=400\\ \\mathrm{Bq}\\).",
  fallgrop:"Att dela aktiviteten med antalet halveringstider och svara 1,6 kBq. Aktiviteten <em>halveras</em> varje gång — den minskar inte linjärt.",
  komihag:"\\(A=A_0\\cdot 2^{-t/T_{1/2}}\\). Räkna först ut hur många halveringstider som gått, halvera sedan så många gånger."
},

  "Absorberad och ekvivalent dos": {
  uppgift:"9.44",
  ram:"Absorberad dos är energi per kilo kropp och mäts i gray. Ekvivalent dos, i sievert, tar dessutom hänsyn till att olika strålslag skadar olika mycket vid samma energi.",
  steg:[
    {rubrik:"a) Använd definitionen av gray",
     text:"En gray är en joule per kilogram. Skriv om millijoule till joule först.",
     matte:"\\[D=\\frac Em=\\frac{3{,}0\\cdot 10^{-3}}{60}=5{,}0\\cdot 10^{-5}\\ \\mathrm{Gy}\\]"},
    {rubrik:"Svara i lämplig enhet",
     text:"\\(5{,}0\\cdot 10^{-5}\\) Gy skrivs bekvämare som \\(50\\ \\mu\\mathrm{Gy}\\). Doser till människor anges nästan alltid i mikro- eller millienheter."},
    {rubrik:"b) Multiplicera med viktfaktorn",
     text:"Gammastrålning har viktfaktorn 1, så talet ändras inte — men enheten byts från gray till sievert.",
     matte:"\\[H=w_RD=1\\cdot 50=50\\ \\mu\\mathrm{Sv}\\]"},
    {rubrik:"Se när faktorn spelar roll",
     text:"För alfastrålning är viktfaktorn 20. Samma absorberade energi hade då gett \\(1000\\ \\mu\\mathrm{Sv}\\) — alfapartiklar lämnar all sin energi på en mycket kort sträcka."}
  ],
  svar:"Den absorberade dosen är \\(50\\ \\mu\\mathrm{Gy}\\) och den ekvivalenta dosen \\(50\\ \\mu\\mathrm{Sv}\\).",
  fallgrop:"Att tro att gray och sievert alltid är samma tal. Det gäller bara när viktfaktorn är 1, alltså för gamma- och betastrålning.",
  komihag:"\\(D=\\dfrac Em\\) i gray, \\(H=w_RD\\) i sievert. Gamma och beta: \\(w_R=1\\). Alfa: \\(w_R=20\\)."
},

  "Fission och energiutvinning": {
  uppgift:"9.100",
  ram:"Vid en kärnreaktion är produkterna tillsammans något lättare än det man startade med. Den försvunna massan har blivit energi enligt \\(E=\\Delta mc^2\\), och eftersom \\(c^2\\) är enormt räcker milligram långt.",
  steg:[
    {rubrik:"Skriv om massan i kilogram",
     text:"Milli betyder \\(10^{-3}\\) och gram är \\(10^{-3}\\) kg, så faktorn blir \\(10^{-6}\\).",
     matte:"\\[\\Delta m=0{,}80\\ \\mathrm{mg}=8{,}0\\cdot 10^{-7}\\ \\mathrm{kg}\\]"},
    {rubrik:"Sätt in i mass–energi-sambandet",
     text:"Ljushastigheten kvadreras först: \\(c^2=9{,}00\\cdot 10^{16}\\) m²/s².",
     matte:"\\[E=\\Delta mc^2=8{,}0\\cdot 10^{-7}\\cdot 9{,}00\\cdot 10^{16}=7{,}2\\cdot 10^{10}\\ \\mathrm J\\]"},
    {rubrik:"Räkna om till terajoule",
     text:"Tera betyder \\(10^{12}\\), så dividera med den faktorn.",
     matte:"\\[E=\\frac{7{,}2\\cdot 10^{10}}{10^{12}}=0{,}072\\ \\mathrm{TJ}\\]"},
    {rubrik:"Sätt svaret i perspektiv",
     text:"72 gigajoule motsvarar ungefär 20 000 kWh — ett par villors årsförbrukning, ur mindre än ett milligram massa. Det är hela poängen med kärnkraft."}
  ],
  svar:"Det frigörs \\(7{,}2\\cdot 10^{10}\\ \\mathrm J=0{,}072\\ \\mathrm{TJ}\\).",
  fallgrop:"Att glömma kvadrera ljushastigheten och multiplicera med \\(3{,}00\\cdot 10^{8}\\). Svaret blir då hundra miljoner gånger för litet.",
  komihag:"\\(E=\\Delta mc^2\\) med massan i kilogram. Det är massans <em>ändring</em>, inte hela massan, som blir energi."
}
};
