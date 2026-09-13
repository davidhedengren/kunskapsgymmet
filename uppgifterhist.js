/* =====================================================================
   uppgifterhist.js  —  Historia nivå 1, Kunskapsgymmet
   PROTOTYP 2 — 96 uppgifter

   FORMAT
     id            unik sträng
     kap           kapitel = förmåga (se strukturhist.js)
     omr           elevens synliga träningsområde inom förmågan
     kriterier     underliggande analysverktyg (diagnostik; visas inte som ledtråd)
     familj        delmoment (används av den adaptiva motorn)
     niva          intern kod: E = nivå 1, C = nivå 2, A = nivå 3 (inte betyg)
     svarstyp      "alternativ"  → flervalsmotorn i index.html
     t             uppgiftstexten (HTML). Källor i <div class="kalla">.
     alternativ    sex objekt: {txt, ratt, kommentar, miss}
                     ratt      true om alternativet ska markeras
                     kommentar visas efter rättning för valda alternativ
                               och för rätta alternativ eleven missade
                     miss      id för missuppfattningen — logga och
                               senare grund för riktad repetition
     s             sammanfattande facittext ("Visa svar")
     ledtrad       valfri

   POÄNG: (antal rätt markerade − antal fel markerade) / antal rätta.
   Andelen går in i den vanliga XP-motorn, så ett av två rätt ger halva
   poängen och alla rätt utan felmarkeringar ger full.

   SVARSBALANS: Rätta och felaktiga alternativ ska vara parallella i
   längd, detaljnivå och grammatisk form. Ett rätt svar får aldrig kännas
   igen på fler förklarande bisatser, försiktigare språk eller högre
   precision. Kör `granskaSvarsalternativHist()` vid redigering.

   OM KÄLLTEXTERNA: texterna är förkortade och återgivna i modern
   svenska. Där det står "Referat" är innehållet sammanfattat, inte
   ordagrant. Gå till originalet innan enskilda ordval används i
   undervisningen.
   ===================================================================== */

var BANKHIST = [

/* =====================================================================
   KAPITEL 1 — KÄLLKRITIK

   De rena nivå 1-uppgifterna får lära ut ett verktyg i taget. Senare
   uppgifter sorteras efter vad eleven GÖR (bedömer, jämför, kopplar till
   frågeställning), medan `kriterier` håller reda på vilka verktyg som
   faktiskt behövdes. Därmed kan motorn diagnostisera utan att rubriken
   avslöjar lösningsmetoden.
   ===================================================================== */

{
  id:"hi-kk-101", kap:1, omr:"kk_bedom",
  kriterier:["tendens","narhet","anvandbarhet","urval"],
  familj:["tendens_vs_anvandbarhet","narhet_i_tid"], niva:"E",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Dagboksanteckningar från fälttåget mot Norge",
    typ:"Dagbok, vintern 1718–19",
    akthet:"konstruerad",
    text:`<p><em>Den 3 januari.</em> Vi har nu gått fjorton dagar utan
    bröd. Det som fanns kvar av mjölet blandades med bark. Kvällen kom med
    yrväder och vi låg i snön utan eld, ty ingen ved stod att finna på
    fjället.</p>
    <p><em>Den 5 januari.</em> I morse fattades sexton man av vårt
    kompani. Några blev liggande och orkade icke upp igen, hur vi än ropade
    på dem. Jag såg en av mina kamrater sitta upprätt mot en sten såsom
    han sovit, men han var stelnad.</p>
    <p><em>Den 7 januari.</em> Officerarna rida, vi gå. Löjtnanten har
    fått sig en fäll av ett hemman i dalen, och vi andra ingenting. Den som
    klagade fick höra att Hans Majestät vet bäst vad riket tarvar, och att
    knorr är detsamma som förräderi.</p>
    <p><em>Den 11 januari.</em> Gud vet varför vi fördes hit. Jag har
    tjänat i nio år och aldrig sett något likt detta.</p>`,
    om:`<p>Texten är skriven som en menig soldats dagbok under fälttåget
    mot Norge vintern 1718–19, då stora delar av den svenska armén
    förfrös under återtåget.</p>
    <p>Anteckningarna är daterade dag för dag under pågående marsch.</p>`,
    referens:"Konstruerad källa. Texten är inte ett äkta dokument utan är skriven utifrån återkommande drag i bevarade karolinska dagböcker och fångberättelser. Använd den för att öva bedömning, aldrig som belägg."
  }],
  t:`<p>En historiker vill undersöka <em>hur meniga svenska soldater
  upplevde fälttåget</em>.</p>
  <p class="fragan">Vilka bedömningar av källan är rimliga?</p>`,
  alternativ:[
    {txt:"Källan är användbar just för den frågan — den ger en deltagares egen upplevelse. Att det är <em>en</em> soldat gör däremot att den inte visar hur alla upplevde fälttåget.",
     ratt:true,
     kommentar:"Tendensen är här inte ett hinder utan innehållet. Begränsningen ligger i urvalet: en röst."},
    {txt:"Att anteckningarna fördes dag för dag under marschen stärker dem, eftersom minnet inte hunnit formas om av vad som hände sedan.",
     ratt:true,
     kommentar:"Närhet i tid är ett styrkeskäl. Jämför med en memoar skriven trettio år senare, när utgången är känd."},
    {txt:"Källan är oanvändbar eftersom soldaten uppenbart är partisk mot sina befäl.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"En tendentiös källa är inte en dålig källa. Att motsättningen mot befälen finns där är i sig en historisk uppgift."},
    {txt:"Källan är en sekundärkälla, eftersom soldaten skriver om något han själv var med om.",
     ratt:false, miss:"primar_sekundar_forvaxlat",
     kommentar:"Tvärtom. Den som var med och själv berättar är en förstahandskälla. Påståendet motsäger sig självt."},
    {txt:"Källan är tillförlitlig eftersom den är samtida och kan därför användas rakt av.",
     ratt:false, miss:"samtida_lika_med_tillforlitlig",
     kommentar:"Samtidighet gör källan närmare, inte automatiskt riktig. En soldat kan ha fel om hur många som fattades."},
    {txt:"Uppgiften om att sexton man saknades ett visst datum kan användas för att räkna ut hur många som dog under hela återtåget.",
     ratt:false, miss:"enskild_uppgift_generaliserad",
     kommentar:"Ett kompani en morgon säger inget säkert om hela armén. Till den frågan behövs rullor och mönstringslistor."}
  ],
  s:`<p>Tendens diskvalificerar inte. Den styr vad källan kan användas
  <em>till</em>. Är frågan hur soldater upplevde kriget är soldatens eget
  perspektiv precis det som efterfrågas.</p>
  <p>Det som faktiskt begränsar källan här är något annat: en enda röst,
  och siffror som inte kan generaliseras.</p>`,
  ledtrad:"Fråga dig först vad historikern vill veta. Användbarhet avgörs alltid mot en frågeställning."
},

{
  id:"hi-kk-102", kap:1, omr:"kk_bedom",
  kriterier:["tendens","narhet","anvandbarhet"],
  familj:["tendens_bestallare","kvarleva_vs_berattande"], niva:"E",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Peder Swarts krönika om Gustav Vasa",
    typ:"Krönika, 1560-talet",
    akthet:"autentisk",
    text:`<p>Sedan herr Gustav förnummit vad som skett i Stockholm, och
    huru den blodgirige tyrannen låtit halshugga så många av rikets bästa
    män, drog han undan i skogarna i Dalarna, där han måste tjäna som en
    ringa dräng och tröska i logen.</p>
    <p>Konung Kristierns fogdar sökte honom med stor flit, och mången gång
    var han dem så nära att han hörde deras röster. Men Gud, som hade
    utsett honom till att frälsa sitt folk, förblindade deras ögon så att
    de icke funno honom.</p>
    <p>De danske hade svurit dyra eder om fred och försäkran, men höllo
    intet. Så är deras art, att de med sötma i munnen bära svek i hjärtat.
    Och när dalkarlarna omsider förnummo vad som timat i Stockholm,
    ångrade de sig bitterligen att de icke genast följt herr Gustav, och
    sände efter honom två snabba män på skidor.</p>`,
    om:`<p>Peder Swart var Gustav Vasas hovpredikant och senare biskop.
    Krönikan skrevs på 1560-talet, alltså fyra decennier efter de
    händelser den skildrar, och på kungens eget uppdrag.</p>
    <p>Gustav Vasa hade då regerat i fyrtio år och behövde en berättelse
    som förklarade varför just han blivit kung.</p>`,
    referens:"Peder Swart, Konung Gustaf I:s krönika. Sammandrag i modern svenska; inte ordagrant citat."
  }],
  t:`<p class="fragan">Vilka bedömningar av krönikan är rimliga?</p>`,
  alternativ:[
    {txt:"Krönikan har en tydlig tendens: den är beställd av den person den handlar om. Uppgifter som gynnar Gustav Vasa måste stödjas av annat material innan de används som fakta.",
     ratt:true,
     kommentar:"Beställarens intresse är det första du ska leta efter. Här sammanfaller beställare och huvudperson."},
    {txt:"Krönikan är en förstklassig källa till en annan fråga: hur Gustav Vasa ville att hans maktövertagande skulle uppfattas.",
     ratt:true,
     kommentar:"Som kvarleva av en maktkamp om historieskrivningen är den svår att slå. Byt fråga, så byter källan värde."},
    {txt:"Att Gud beskrivs ingripa till Gustavs förmån är ett drag som säger mer om textens syfte än om vad som hände i Dalarna.",
     ratt:true,
     kommentar:"Precis — försynen är ett argument, inte en iakttagelse. Den som räddas av Gud är utsedd att härska."},
    {txt:"Krönikan är värdelös eftersom den är beställd av kungen.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Samma feltänk som alltid. Beställd betyder styrd, inte tom."},
    {txt:"Krönikan är en förstahandskälla till flykten 1520–21, eftersom Peder Swart kände Gustav Vasa personligen.",
     ratt:false, miss:"narhet_till_person_lika_med_narhet_till_handelse",
     kommentar:"Swart var inte med i Dalarna 1520. Att känna någon fyrtio år senare gör inte hans berättelse till ett ögonvittne."},
    {txt:"Att krönikan skrevs fyrtio år efteråt spelar mindre roll, eftersom den bygger på Gustav Vasas egna minnen.",
     ratt:false, miss:"minnets_palitlighet",
     kommentar:"Fyrtio års minne är i sig ett källkritiskt problem — och här dessutom ett minne med starkt intresse av en viss version."}
  ],
  s:`<p>Skilj på två frågor: <em>vad säger källan hände?</em> och <em>vad
  är källan i sig ett spår av?</em></p>
  <p>Som berättande källa om 1520 är krönikan svag. Som kvarleva av
  1560-talets officiella historieskrivning är den utmärkt.</p>`
},

{
  id:"hi-kk-103", kap:1, omr:"kk_jamfora",
  kriterier:["beroende","narhet","tendens"],
  familj:["beroende_tradering","avstand_i_tid"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Snorre Sturlasson om slaget vid Stiklestad år 1030",
    typ:"Kungasaga, nedtecknad ca 1230",
    akthet:"autentisk",
    text:`<p>Konungen hade gått fram ur sköldborgen framför fylkingen. Då
    kom Torsten Knarresmed emot honom och högg med sin yxa i konungens
    vänstra ben ovan knäet. Finn Arnesson fällde genast Torsten.</p>
    <p>Vid det såret lutade konungen sig mot en sten, kastade svärdet ifrån
    sig och bad Gud hjälpa sig. Då stack Tore Hund till honom med spjutet,
    och stöten gick in under brynjan och upp i buken.</p>
    <p>Så säger skalden Sigvat om detta:</p>
    <blockquote><p><em>Dyrt fick Tore köpa<br>
    den dust han drev med kungen —<br>
    föga fromma följde<br>
    den färd som hunden valde.</em></p></blockquote>
    <p>Solen var klar innan detta skedde, men sedan blev himlen mörk som
    om natten kommit, och den blev åter ljus då konungen fallit.</p>`,
    om:`<p>Snorre Sturlasson var islänning, hövding och lagman. Han
    nedtecknade Heimskringla omkring 1230, alltså två sekler efter
    Stiklestad.</p>
    <p>Snorre anger själv att han bygger dels på muntlig tradition, dels
    på skaldekväden som diktades av män i kungarnas närhet. Skaldekväden
    är bunden vers med fasta regler för stavrim och stavelsetal.</p>
    <p>Olav Haraldsson helgonförklarades kort efter slaget. Berättelsen om
    honom traderades därefter i kyrklig miljö.</p>`,
    referens:"Snorre Sturlasson, Heimskringla, Olav den heliges saga. Sammandrag i modern svenska; inte ordagrant citat."
  }],
  t:`<p class="fragan">Vilka slutsatser om källäget är rimliga?</p>`,
  alternativ:[
    {txt:"Det ligger omkring 200 år mellan slaget och nedteckningen. Uppgifterna har passerat många led muntligt, och varje led kan ha ändrat dem.",
     ratt:true,
     kommentar:"Avstånd i tid är här det tyngsta problemet — särskilt för repliker och detaljer i själva stridsögonblicket."},
    {txt:"Skaldestrofen kan ha bevarats bättre än den omgivande prosan, eftersom bunden vers med stavrim och fast stavelsetal är svårare att ändra i utan att den går sönder.",
     ratt:true,
     kommentar:"Ett fint exempel på att olika delar av samma verk bedöms olika. Versformen är en slags felkontroll."},
    {txt:"Uppgiften om att himlen mörknade bör prövas mot annat material — den kan vara en iakttagelse, men den är också ett vanligt drag i helgonberättelser.",
     ratt:true,
     kommentar:"Bra läsning. Solmörker vid en helig mans död är ett litterärt motiv, och Olav blev helgon."},
    {txt:"Eftersom Snorre uttryckligen bygger på äldre källor är hans uppgifter i praktiken förstahandsuppgifter.",
     ratt:false, miss:"beroende_forbisett",
     kommentar:"Att använda äldre källor gör en berättelse beroende, inte förstahands. Snorre står sist i en kedja."},
    {txt:"Om två av Snorres berättelser säger samma sak är uppgiften bekräftad av två oberoende källor.",
     ratt:false, miss:"beroende_forbisett",
     kommentar:"Två avsnitt i samma verk, av samma författare, ur samma tradition. Det är en källa."},
    {txt:"Att Snorre var islänning som skrev om norska kungar gör honom neutral i förhållande till stoffet.",
     ratt:false, miss:"utanforskap_lika_med_neutralitet",
     kommentar:"Att komma utifrån är inte samma sak som att sakna intressen. Snorre rörde sig själv i norsk hövdingapolitik."}
  ],
  s:`<p>Beroende handlar om varifrån uppgifterna kommer. Fem berättelser
  som alla går tillbaka på samma tradition är i källkritisk mening
  <em>en</em> källa.</p>
  <p>Men avstånd i tid är inte detsamma som värdelöshet, och olika delar
  av samma verk kan bedömas olika. Versen, prosan och undret är tre olika
  källkritiska fall.</p>`
},

{
  id:"hi-kk-104", kap:1, omr:"kk_jamfora",
  kriterier:["narhet","beroende","tendens","urval"],
  familj:["narhet_i_rum","tendens_religios"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Adam av Bremen om templet i Uppsala",
    typ:"Kyrkohistoriskt verk, latin, ca 1075",
    akthet:"autentisk",
    text:`<p>Detta folk har ett mycket berömt tempel, som kallas Uppsala.
    Där dyrkar folket bilder av tre gudar: Tor, Oden och Frej.</p>
    <p>Vart nionde år hålls en gemensam fest. Kungar och folk sänder gåvor,
    och de som antagit kristendomen måste friköpa sig från ceremonierna.</p>
    <p>Kropparna av de offrade hängs upp i en lund intill templet. Där
    hänger hundar och hästar tillsammans med människor. En kristen har
    berättat för mig att han sett sjuttiotvå kroppar hänga där.</p>
    <p>Sångerna vid offret är mångahanda och oanständiga. Därför är det bäst
    att förbigå dem med tystnad.</p>`,
    om:`<p>Adam var magister och domherre vid domkapitlet i Bremen. Han
    skrev på 1070-talet, på uppdrag inifrån ärkestiftet, en historia över
    ärkebiskoparna i Hamburg-Bremen och deras missionsarbete i Norden.</p>
    <p>Han var aldrig i Uppsala och kunde inte fornnordiska. Bland hans
    uppgiftslämnare fanns den danske kungen Sven Estridsen, som han
    uttryckligen tackar i förordet.</p>
    <p>Ärkestiftet Hamburg-Bremen gjorde vid samma tid anspråk på kyrklig
    överhöghet över hela Norden, ett anspråk som var omtvistat.</p>`,
    referens:"Adam av Bremen, Gesta Hammaburgensis ecclesiae pontificum, bok IV. Sammandrag i modern svensk översättning; inte ordagrant citat."
  }],
  t:`<p>Det här är den utförligaste beskrivning vi har av förkristen kult i
  Uppsala. Läs källan innan du svarar.</p>
  <p class="fragan">Vilka källkritiska bedömningar kan du <em>belägga i
  materialet</em>?</p>`,
  alternativ:[
    {txt:"Adam markerar själv att delar av framställningen är andrahandsuppgifter — han skriver att någon annan berättat för honom vad denne sett.",
     ratt:true,
     kommentar:"Just den meningen är nyckeln. Sjuttiotvå kroppar är inte Adams iakttagelse utan en uppgift han fått vidare, och han säger det rakt ut."},
    {txt:"Adam väljer bort delar av det han vet, och säger det öppet: sångerna förbigås med tystnad eftersom han finner dem oanständiga.",
     ratt:true,
     kommentar:"Ett urval som görs av moraliska skäl. Vad som inte står i en källa är ofta lika avslöjande som det som står."},
    {txt:"Det enda relevanta problemet är att texten är skriven på latin och måste översättas.",
     ratt:false, miss:"sprak_som_kallkritiskt_problem",
     kommentar:"Översättning kan påverka nyanser, men tillkomst, urval och andrahandsuppgifter är minst lika viktiga."},
    {txt:"Eftersom Adam levde på 1000-talet kan detaljerna behandlas som hans egna iakttagelser.",
     ratt:false, miss:"narhet_i_tid_racker",
     kommentar:"Han var nära i tid men långt bort i rum och hade aldrig varit i Uppsala. Samtidighet gör honom inte till ögonvittne."},
    {txt:"Att en av sagesmännen var kung gör uppgifterna säkrare, eftersom en kung har bättre insyn än andra.",
     ratt:false, miss:"auktoritet_som_belagg",
     kommentar:"Sven Estridsen var dansk kristen kung med egna intressen i hur Sverige framställdes. Hög ställning är inte samma sak som oberoende."},
    {txt:"Att beskrivningen är detaljerad — antalet gudar, antalet offer, antalet kroppar — talar för att den bygger på egna iakttagelser.",
     ratt:false, miss:"detaljrikedom_som_belagg",
     kommentar:"Detaljer kan lika gärna komma från en berättartradition som från ett ögonvittne. Adam anger själv att uppgiften förmedlats av någon annan."}
  ],
  s:`<p>Två saker går att visa direkt i texten: Adam skriver ut att en del
  är hörsägen (<em>en kristen har berättat för mig</em>), och han talar om
  att han utelämnar sådant han ogillar.</p>
  <p>Till det kommer det du får veta om tillkomsten: en kristen domherre
  skriver missionshistoria för ett ärkestift som gör anspråk på Norden.
  Det gör inte uppgifterna påhittade — men det förklarar varför det
  främmande och skrämmande får stort utrymme.</p>
  <p>Och källan blir inte tom. Den är förstklassig för frågan <em>hur såg
  nordtyska kristna på Norden på 1070-talet?</em></p>`,
  ledtrad:"Leta efter ställen där Adam säger något om sig själv och sitt eget arbete — inte bara om Uppsala."
},

{
  id:"hi-kk-105", kap:1, omr:"kk_jamfora",
  kriterier:["beroende","narhet"],
  familj:["beroende_samma_upphov"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Notis i en dagstidning",
    typ:"Dagstidning, 15 maj 1931",
    akthet:"konstruerad",
    text:`<p><strong>Blodiga uppträden i Ådalen</strong></p>
    <p>Vid ett demonstrationståg mot Lunde i Ådalen på torsdagen kom det
    till sammanstötning med utkommenderad militär. Enligt uppgift avlossades
    skott mot tåget, varvid fyra personer dödades och fem sårades.</p>
    <p>Läget i orten betecknas alltjämt som spänt. Ytterligare trupp har
    beordrats till platsen.</p>`,
    om:`<p>Notisen bygger på ett telegram från Tidningarnas Telegrambyrå,
    TT, som distribuerades till landets redaktioner samma kväll.</p>`,
    referens:"Konstruerad källa, skriven efter mönstret för samtida telegramnotiser om skotten i Ådalen den 14 maj 1931."
  },{
    bet:"B",
    titel:"Notis i en annan dagstidning, samma dag",
    typ:"Dagstidning, 15 maj 1931",
    akthet:"konstruerad",
    text:`<p><strong>Blodiga uppträden i Ådalen</strong></p>
    <p>Vid ett demonstrationståg mot Lunde i Ådalen i torsdags kom det till
    sammanstötning med utkommenderad militär. Enligt uppgift avlossades
    skott mot tåget, varvid fyra personer dödades och fem sårades.</p>
    <p>Läget i orten betecknas fortfarande som spänt.</p>`,
    om:`<p>Tidningen har annan ägare och annan politisk färg än A, och
    redaktionerna ligger i olika städer.</p>
    <p>Även denna notis bygger på TT-telegrammet.</p>`,
    referens:"Konstruerad källa, skriven efter mönstret för samtida telegramnotiser om skotten i Ådalen den 14 maj 1931."
  }],
  t:`<p>Två tidningar rapporterar samma dag om skotten i Ådalen. Jämför
  texterna.</p>
  <p class="fragan">Vilka slutsatser är rimliga?</p>`,
  alternativ:[
    {txt:"Att båda tidningarna skriver samma sak är här ingen bekräftelse — notiserna har samma upphov.",
     ratt:true,
     kommentar:"Beroendet syns i formuleringarna: de är nästan ordagrant lika, ända ner till <em>enligt uppgift</em>."},
    {txt:"För att pröva uppgiften behövs material med annat ursprung: militärens och polisens rapporter, protokoll eller ögonvittnen.",
     ratt:true,
     kommentar:"Att gå uppströms mot oberoende material är standardgreppet när beroende har konstaterats."},
    {txt:"Att tidningarna har olika politisk färg gör dem till oberoende källor i det här fallet.",
     ratt:false, miss:"olik_avsandare_lika_med_oberoende",
     kommentar:"Politisk färg spelar stor roll för urval och rubriker — men här har båda vidarebefordrat samma telegram utan egen prövning."},
    {txt:"Uttrycket <em>enligt uppgift</em> visar att redaktionerna själva markerar att de inte kontrollerat siffrorna.",
     ratt:true,
     kommentar:"Bra iakttagelse. Tidningen tar inte ansvar för talet — den för vidare vad någon annan uppgett."},
    {txt:"Eftersom notiserna är samtida med händelsen är sifferuppgifterna tillförlitliga.",
     ratt:false, miss:"samtida_lika_med_tillforlitlig",
     kommentar:"Tidiga siffror i ett oklart läge revideras nästan alltid. Samtidighet är närhet, inte riktighet."},
    {txt:"Skillnaden mellan <em>på torsdagen</em> och <em>i torsdags</em> visar att texterna skrivits oberoende av varandra.",
     ratt:false, miss:"sma_skillnader_lika_med_oberoende",
     kommentar:"Redaktionell putsning av ett telegram skapar små skillnader. Kärnan — ordval, ordföljd, siffror — är densamma."}
  ],
  s:`<p>Antalet källor som säger samma sak betyder ingenting förrän du vet
  om de är oberoende. Fem tidningar med samma telegram är en källa, inte
  fem.</p>
  <p>Jämför alltid formuleringarna, inte bara innehållet. Ordagranna
  likheter är det tydligaste spåret av gemensamt upphov.</p>`
},

{
  id:"hi-kk-106", kap:1, omr:"kk_fraga",
  kriterier:["anvandbarhet","urval"],
  familj:["anvandbarhet_vs_fraga"], niva:"E",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Uppslag ur en husförhörslängd",
    typ:"Kyrkobok, 1880-talet",
    akthet:"konstruerad",
    text:`<p><strong>Norrgården nr 2</strong></p>
    <table>
      <tr><th>Namn</th><th>Född</th><th>Ställning</th><th>Läser</th><th>Anteckning</th></tr>
      <tr><td>Anders Persson</td><td>1841</td><td>husbonde</td><td>försvarligt</td><td></td></tr>
      <tr><td>Kristina Andersdotter</td><td>1845</td><td>hustru</td><td>väl</td><td></td></tr>
      <tr><td>Per Andersson</td><td>1868</td><td>son</td><td>väl</td><td>utfl. Amerika 1886</td></tr>
      <tr><td>Anna Andersdotter</td><td>1871</td><td>dotter</td><td>försvarligt</td><td>utfl. sn. 1889</td></tr>
      <tr><td>Johan Ersson</td><td>1863</td><td>dräng</td><td>svagt</td><td>infl. 1884</td></tr>
      <tr><td>Maja Lisa Jansdotter</td><td>1859</td><td>piga</td><td>försvarligt</td><td>infl. 1885, utfl. 1887</td></tr>
    </table>
    <p><strong>Backstugan vid Kärret</strong></p>
    <table>
      <tr><th>Namn</th><th>Född</th><th>Ställning</th><th>Läser</th><th>Anteckning</th></tr>
      <tr><td>Brita Nilsdotter</td><td>1818</td><td>änka, inhyses</td><td>svagt</td><td>fattigunderstöd</td></tr>
    </table>`,
    om:`<p>Prästen kallade sockenborna till husförhör hushåll för hushåll
    och förde in namn, födelseår, ställning i hushållet samt in- och
    utflyttningar. Kolumnen <em>Läser</em> är prästens omdöme om hur
    personen klarat förhöret i katekesen.</p>
    <p>Anteckningarna fördes löpande under flera år och rättades efter
    hand.</p>`,
    referens:"Konstruerad källa, uppställd efter mönstret för svenska husförhörslängder."
  }],
  t:`<p class="fragan">Vad kan materialet användas till?</p>`,
  alternativ:[
    {txt:"Att undersöka hushållens storlek och sammansättning i socknen.",
     ratt:true,
     kommentar:"Exakt vad längden registrerar, och den gör det för varje hushåll — alltså går det att räkna."},
    {txt:"Att kartlägga flyttmönster — vilka som kom, vilka som lämnade och vart.",
     ratt:true,
     kommentar:"In- och utflyttningarna står i klartext, inklusive Amerika. Ett av materialets starkaste användningsområden."},
    {txt:"Att ta reda på vad enskilda personer kände inför att flytta.",
     ratt:false, miss:"kalla_overtolkad",
     kommentar:"En notering om utflyttning säger ingenting om skäl eller känslor. Till det behövs brev eller bouppteckningar efter familjen."},
    {txt:"Att avgöra varför emigrationen från Sverige ökade på 1880-talet.",
     ratt:false, miss:"enskild_kalla_for_stor_fraga",
     kommentar:"En sockens längd kan visa <em>att</em> och <em>vilka</em>, inte <em>varför</em> i riksskala."},
    {txt:"Att mäta läskunnigheten i socknen, eftersom kolumnen <em>Läser</em> ger ett mått för varje person.",
     ratt:false, miss:"omdome_som_matning",
     kommentar:"Kolumnen är prästens omdöme om katekeskunskap, inte ett prov i läsförmåga. Olika präster bedömde olika."},
    {txt:"Ingenting, eftersom längden fördes av prästen och därmed speglar kyrkans intressen.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Att prästen förde längden gör den inte oanvändbar. Uppgifterna behövdes i församlingens löpande administration och registrerades därför systematiskt, men fel, luckor och eftersläpning kan fortfarande förekomma."}
  ],
  s:`<p>Användbarhet är alltid användbarhet <em>till något</em>. Samma
  källa är utmärkt för en fråga och oanvändbar för nästa.</p>
  <p>Administrativa källor är starka på struktur — vem, var, hur många —
  och svaga på upplevelse och orsak.</p>`
},

{
  id:"hi-kk-107", kap:1, omr:"kk_jamfora",
  kriterier:["tendens","anvandbarhet"],
  familj:["tendens_kommersiell","motstridiga_kallor"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Broschyr från en emigrantagent",
    typ:"Trycksak, 1885",
    akthet:"konstruerad",
    text:`<p><strong>TILL DET FRIA AMERIKA</strong></p>
    <p>I Minnesota och Dakota ligger jorden fet och svart så långt ögat
    når, och den kostar mindre än en dagsverkslön per tunnland. Ingen
    herre, ingen statare, ingen fattigvård.</p>
    <p>Den arbetsamme svensken är efterfrågad överallt. Dagspenningen är
    tre gånger den svenska. Mången som for ut med tomma händer sitter i dag
    på egen gård efter fem år.</p>
    <p>Biljett tecknas hos undertecknad. Fri resa med järnväg från
    New York ända fram till nybygget.</p>`,
    om:`<p>Agenten var anställd av ett rederi och fick provision för varje
    såld biljett. Broschyren delades ut vid marknader och utanför kyrkor.</p>`,
    referens:"Konstruerad källa, skriven efter mönstret för samtida emigrantagenters reklamtryck."
  },{
    bet:"B",
    titel:"Brev hem från Minnesota",
    typ:"Privatbrev, 1887",
    akthet:"konstruerad",
    text:`<p>Käre broder,</p>
    <p>Du frågar hur jag har det. Arbetet börjar klockan fem och slutar när
    det mörknar. Vintern är hårdare än hemma, och i januari frös vattnet i
    hinken inne i stugan.</p>
    <p>Men jag förtjänar mer än jag någonsin gjorde som dräng hos
    nämndemannen, och jag har lagt undan till en ko. Hälsa mor att hon icke
    skall oroa sig.</p>
    <p>Jag saknar er alla mycket. Ibland om kvällarna vet jag icke om jag
    gjorde rätt.</p>`,
    om:`<p>Brevet är skrivet av en utvandrad dräng till hans bror i
    Sverige, två år efter avresan.</p>
    <p>Brev hem lästes ofta högt för släkt och grannar.</p>`,
    referens:"Konstruerad källa, skriven efter mönstret för bevarade amerikabrev."
  }],
  t:`<p class="fragan">Vilka bedömningar av de båda källorna är
  rimliga?</p>`,
  alternativ:[
    {txt:"Broschyren har ett kommersiellt syfte — agenten tjänade på varje biljett — och bilden är därför medvetet ljus.",
     ratt:true,
     kommentar:"Avsändarens intresse syns rakt igenom: allt som kan avskräcka saknas."},
    {txt:"Broschyren är samtidigt en förstklassig källa till en annan fråga: hur emigrationen marknadsfördes i Sverige.",
     ratt:true,
     kommentar:"Byt fråga, så byter källan värde. Som reklam är den ett perfekt exemplar av sitt slag."},
    {txt:"Att brev hem ofta lästes högt för släkt och grannar kan ha påverkat vad skribenten valde att skriva.",
     ratt:true,
     kommentar:"En skarp iakttagelse. Ett privatbrev är inte alltid privat, och den som misslyckats skriver ogärna det inför hela byn."},
    {txt:"Brevet är opåverkat av avsändarens intressen eftersom det är privat.",
     ratt:false, miss:"privat_lika_med_objektiv",
     kommentar:"Också privatbrev skrivs till någon, med ett syfte. Här bland annat för att lugna modern."},
    {txt:"Eftersom källorna säger emot varandra måste den ena vara osann.",
     ratt:false, miss:"motsagelse_kraver_logn",
     kommentar:"De säger inte emot varandra. Båda kan stämma: hårt arbete <em>och</em> högre lön än i Sverige."},
    {txt:"Brevet väger tyngre eftersom det skrevs senare, och skribenten hade då bättre överblick.",
     ratt:false, miss:"senare_lika_med_battre",
     kommentar:"Källorna handlar inte om samma sak. Den ena säljer en resa, den andra beskriver ett liv."}
  ],
  s:`<p>Två källor som pekar åt olika håll är inte automatiskt en konflikt.
  Steg ett är att fråga vad var och en faktiskt påstår — och om påståendena
  ens gäller samma sak.</p>
  <p>Steg två: vem skrev till vem, och vad ville avsändaren uppnå? Den
  frågan gäller reklamtrycket och privatbrevet lika mycket.</p>`
},

{
  id:"hi-kk-108", kap:1, omr:"kk_bedom",
  kriterier:["tendens","urval","anvandbarhet"],
  familj:["bildkalla","arrangerad_kalla"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Fotografi från en mekanisk verkstad",
    typ:"Bildbeskrivning, ca 1900",
    akthet:"konstruerad",
    text:`<p><em>Bilden finns inte återgiven här. Läs beskrivningen och
    arbeta med den som om du hade fotografiet framför dig.</em></p>
    <p>Ett trettiotal personer står uppställda i tre raka led framför en
    tegelbyggnad med höga fönster. Alla ser in i kameran. Ingen är i
    rörelse.</p>
    <p>I främre ledet sitter fem män på stolar. De bär kostym, väst och
    urkedja. Bakom dem står arbetare i förkläden som ser nytvättade ut.
    Längst ut till vänster i bakre ledet står fyra pojkar som ser ut att
    vara i tolvårsåldern.</p>
    <p>Innanför den öppna porten skymtar en travers och två svarvar.
    Golvet framför porten är sopat. Ett par verktyg ligger prydligt
    upplagda på en bänk i bildens kant.</p>`,
    om:`<p>Fotografiet beställdes av fabriksledningen och användes i
    företagets katalog.</p>
    <p>Vid tiden krävde kameran flera sekunders exponering, vilket gjorde
    det svårt att fotografera personer i rörelse.</p>`,
    referens:"Konstruerad källa. Beskrivningen följer mönstret för beställda företagsfotografier kring sekelskiftet 1900."
  }],
  t:`<p class="fragan">Vilka bedömningar av bilden är rimliga?</p>`,
  alternativ:[
    {txt:"Bilden är arrangerad. Den visar hur fabriken ville visa upp sig, inte hur en arbetsdag såg ut.",
     ratt:true,
     kommentar:"Uppställningen, de rena förklädena och det sopade golvet är alla spår av iscensättningen."},
    {txt:"Bilden kan ändå användas som källa till maskinparken, byggnadens utseende och vilka kategorier av anställda som fanns.",
     ratt:true,
     kommentar:"Det oavsiktliga innehållet är ofta det historiskt mest givande. Traversen ställde ingen dit för syns skull."},
    {txt:"Att pojkarna finns med på en bild som ledningen själv beställt talar för att barnarbete inte uppfattades som något att dölja.",
     ratt:true,
     kommentar:"Skarpt läst. Vad en avsändare <em>inte</em> bryr sig om att gömma säger mycket om samtidens normer."},
    {txt:"Att personerna står stilla och allvarliga visar att stämningen på arbetsplatsen var tryckt.",
     ratt:false, miss:"teknik_tolkad_som_innehall",
     kommentar:"Stillheten är en följd av lång exponeringstid, inte av stämningen. Tekniken formar bilden."},
    {txt:"Ett fotografi återger det som fanns framför linsen och är därför en säkrare källa än en text.",
     ratt:false, miss:"foto_som_objektivt",
     kommentar:"Kameran ljuger inte, men den som riktar den väljer motiv, tidpunkt och utsnitt."},
    {txt:"Att ledningen beställt bilden gör den oanvändbar som källa till arbetsförhållandena.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Den är oanvändbar som belägg för att det var rent och lugnt. Den är fullt användbar för mycket annat."}
  ],
  s:`<p>Fråga alltid en bild vem som höll i kameran och varför.</p>
  <p>Skilj sedan på tre lager: det avsiktliga budskapet, det oavsiktliga
  innehållet, och de spår som tekniken själv lämnar.</p>`
},

{
  id:"hi-kk-109", kap:1, omr:"kk_fraga",
  kriterier:["anvandbarhet","beroende","tendens"],
  familj:["anvandbarhet_vs_fraga","tvangssituation"], niva:"A",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Protokoll från trolldomskommissionen i Mora",
    typ:"Domboksprotokoll, 1669",
    akthet:"autentisk",
    text:`<p>Framkallades Marit, tolv år gammal, och bekände frivilligt
    att hon blivit förd till Blåkulla av hustru Kerstin, som tagit henne
    ur sängen om natten och farit med henne över skogen.</p>
    <p>Tillfrågad vad som där tilldragit sig svarade hon, att de suttit
    till bords och ätit kål och fläsk, och att den Onde hade givit dem var
    sitt märke. Nämnde därtill sju andra barn som hon sett därstädes.</p>
    <p>Hustru Kerstin nekade först ståndaktigt, men sedan hon förehållits
    barnens vittnesmål och förmanats att icke förhärda sitt hjärta,
    bekände hon omsider och bad om nåd.</p>
    <p>Kommissionen fann att den som bekänner och ångrar må hoppas på
    mildhet, men att den förhärdade icke kan undslippa.</p>`,
    om:`<p>Protokollet fördes av kommissionens skrivare under pågående
    förhör. Både barnen och de anklagade visste att ett erkännande kunde
    mildra utgången, och att fortsatt nekande kunde kosta livet.</p>
    <p>Barnen fick ange andra som de sett i Blåkulla. Angivelserna låg
    sedan till grund för nya förhör.</p>`,
    referens:"Sammandrag i modern svenska av protokollsmaterial från trolldomskommissionen i Mora 1669. Inte ordagrant citat."
  }],
  t:`<p>Två historiker arbetar med varsin fråga.</p>
  <p><strong>Fråga 1:</strong> Reste kvinnorna i Mora till Blåkulla?<br>
  <strong>Fråga 2:</strong> Vilka föreställningar om trolldom fanns i Mora
  1669, och hur gick en process till?</p>
  <p class="fragan">Vilka påståenden om källans användbarhet håller?</p>`,
  alternativ:[
    {txt:"För fråga 2 är protokollet en mycket god källa: det visar vilka föreställningar som fanns och hur rätten arbetade.",
     ratt:true,
     kommentar:"Och det visar det i detalj — ända ner till kålen och fläsket, som är hämtade ur en vardag barnen kände till."},
    {txt:"För fråga 1 duger protokollet inte som belägg, eftersom utsagorna tillkom under press och i en situation där ett visst svar belönades.",
     ratt:true,
     kommentar:"Kommissionen skriver själv ut belöningsstrukturen: den som bekänner får hoppas på mildhet."},
    {txt:"Att barnen angav andra, och att angivelserna ledde till nya förhör, förklarar varför utsagorna liknar varandra.",
     ratt:true,
     kommentar:"Processen producerade sin egen bekräftelse. Likheten är ett spår av förfarandet, inte av händelserna."},
    {txt:"Att många personer oberoende av varandra berättade samma sak gör uppgifterna bekräftade.",
     ratt:false, miss:"beroende_forbisett",
     kommentar:"De var inte oberoende. De förhördes om varandra, i samma rum, av samma kommission."},
    {txt:"Att protokollet skrevs av rättens egen skrivare under pågående förhör gör det till en neutral återgivning.",
     ratt:false, miss:"myndighet_lika_med_neutral",
     kommentar:"Skrivaren var en del av processen och skrev i dess ordval — <em>bekände frivilligt</em>, <em>förhärda sitt hjärta</em>."},
    {txt:"Eftersom vi i dag vet att Blåkulla inte finns saknar utsagorna historiskt värde.",
     ratt:false, miss:"falskt_innehall_lika_med_vardelos",
     kommentar:"En utsaga som inte beskriver verkligheten kan vara ett exakt spår av vad man trodde. Det är ofta det intressantaste."}
  ],
  s:`<p>Detta är kärnan i användbarhetsbegreppet: samma källa är svag för
  den ena frågan och stark för den andra.</p>
  <p>Lägg märke till att protokollets eget språk är en del av materialet.
  <em>Bekände frivilligt</em> är rättens beskrivning av en situation som
  knappast var frivillig.</p>`,
  ledtrad:"Samma källa, två frågor. Pröva den mot en fråga i taget."
},

/* =====================================================================
   KAPITEL 2 — ORSAK OCH KONSEKVENS
   ===================================================================== */

{
  id:"hi-ok-201", kap:2, omr:"ok_typer",
  familj:["utlosande_vs_bakomliggande"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>I mars 1917 (februari enligt den ryska kalendern) bröt strejker och
  brödupplopp ut i Petrograd. Soldaterna som skulle slå ner dem vägrade
  skjuta och gick över till demonstranterna. Inom en vecka hade tsar
  Nikolaj II abdikerat.</p>
  <p>Sedan 1914 hade Ryssland förlorat miljoner man vid fronten.
  Livsmedelsförsörjningen i städerna hade brutit samman, jordfrågan var
  olöst sedan 1800-talet och tsarens envälde saknade folkvald kontroll.</p>
  <p class="fragan">Vilka påståenden om orsakerna är rimliga?</p>`,
  alternativ:[
    {txt:"Brödköerna och strejkerna i Petrograd var den utlösande faktorn — det som satte förloppet i rörelse en bestämd vecka.",
     ratt:true,
     kommentar:"Konkret, nära i tid, avgränsad. Så ser en utlösande faktor ut."},
    {txt:"Krigströttheten och den olösta jordfrågan är bakomliggande orsaker: de byggdes upp under lång tid och gjorde sammanbrottet möjligt.",
     ratt:true,
     kommentar:"År och decennier, inte dagar. De förklarar varför en brödkö kunde fälla ett envälde."},
    {txt:"Att soldaterna vägrade skjuta var den grundläggande orsaken till att tsardömet föll.",
     ratt:false, miss:"utlosande_som_orsak",
     kommentar:"Det var avgörande för utgången just då — men frågan är varför soldaterna vägrade. Svaret ligger i bakgrunden."},
    {txt:"Bolsjevikernas maktövertagande i november 1917 bidrog till att tsaren abdikerade i mars.",
     ratt:false, miss:"anakronism_i_orsakskedjan",
     kommentar:"Ordningen är omvänd. En orsak kan inte ligga efter sin verkan."},
    {txt:"Eftersom sammanbrottet kom under ett krig är kriget den enda orsak som behöver anföras.",
     ratt:false, miss:"monokausalitet",
     kommentar:"Andra länder förde samma krig utan att falla. Kriget skärpte problem som redan fanns."},
    {txt:"Att förloppet gick snabbt visar att det inte kan ha haft några djupare orsaker.",
     ratt:false, miss:"snabbhet_utesluter_bakgrund",
     kommentar:"Tvärtom — snabba sammanbrott förutsätter nästan alltid att mycket redan var undergrävt."}
  ],
  s:`<p>Utlösande faktor: nära i tid, konkret, ofta en enskild händelse.
  Bakomliggande orsak: långsiktig, strukturell, gör utfallet möjligt.</p>
  <p>Utan bakgrunden hade brödköerna i Petrograd blivit en notis.</p>`,
  ledtrad:"Fråga om varje orsak: hur länge har detta byggts upp? Dagar talar för utlösande, år för bakomliggande."
},

{
  id:"hi-ok-202", kap:2, omr:"ok_typer",
  familj:["utlosande_vs_bakomliggande"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Under 1780-talet var den franska statskassan tömd efter kostsamma krig.
  Skördarna 1788 slog fel och brödpriserna steg kraftigt. Adel och präster var
  fortfarande befriade från flera skatter. I maj 1789 kallade Ludvig XVI samman
  generalständerna för första gången sedan 1614.</p>
  <p class="fragan">Vilka av alternativen beskriver <em>bakomliggande</em>
  orsaker till revolutionen?</p>`,
  alternativ:[
    {txt:"Statens finansiella kris efter decennier av krig.",
     ratt:true,
     kommentar:"Byggdes upp under lång tid och tvingade fram hela situationen."},
    {txt:"Ståndssamhällets skatteprivilegier, som lade bördan på tredje ståndet.",
     ratt:true,
     kommentar:"En strukturell orsak: den fanns i själva samhällsordningen."},
    {txt:"Sammankallandet av generalständerna, som var revolutionens långsiktiga ekonomiska bakgrund.",
     ratt:false, miss:"utlosande_kallad_bakomliggande",
     kommentar:"Det ligger nära i tid och är snarare en följd av krisen — en utlösande faktor."},
    {txt:"Missväxten 1788, som hade försvagat staten under flera årtionden.",
     ratt:false, miss:"utlosande_kallad_bakomliggande",
     kommentar:"Missväxten ligger nära i tid och fungerar som utlösande faktor. Att dåliga skördar slog så hårt beror däremot på strukturer — och där börjar bakgrunden."},
    {txt:"Napoleons maktövertagande, som skapade den politiska krisen år 1789.",
     ratt:false, miss:"kronologi_omvand",
     kommentar:"1799, tio år senare. Kronologin gör det omöjligt."},
    {txt:"Ludvig XVI:s personlighet, som ensam förklarar tredje ståndets växande missnöje.",
     ratt:false, miss:"person_som_ensam_forklaring",
     kommentar:"Kungens person kan ha haft betydelse för förloppet, men förklarar inte varför krisen fanns."}
  ],
  ledtrad:"Fråga: hur länge har detta byggts upp? Veckor talar för utlösande, decennier för bakomliggande.",
  s:`<p>Testet är tidsdjup och riktning. Bakomliggande orsaker byggs upp under
  lång tid och skapar situationen. Utlösande faktorer utnyttjar den.</p>`
},

{
  id:"hi-ok-203", kap:2, omr:"ok_konsekvens",
  familj:["konsekvens_riktning","lang_sikt"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Digerdöden nådde Norden 1350. På många håll dog mellan en fjärdedel
  och hälften av befolkningen inom några år.</p>
  <p class="fragan">Vilka påståenden om konsekvenserna är rimliga?</p>`,
  alternativ:[
    {txt:"Arbetskraften blev knapp, vilket på sikt stärkte de överlevande böndernas och landbornas förhandlingsläge.",
     ratt:true,
     kommentar:"Färre händer om samma jord. Arrenden pressades ner och dagsverken kunde förhandlas."},
    {txt:"Gårdar lades öde och odlingsgränsen drogs tillbaka, särskilt i skogs- och randbygder.",
     ratt:true,
     kommentar:"Den sämsta jorden övergavs först. Ödegårdsforskningen bygger på just det mönstret."},
    {txt:"Jordägande frälse och kyrka fick minskade inkomster när arrendena pressades ner.",
     ratt:true,
     kommentar:"Samma händelse, motsatt riktning för en annan grupp. Konsekvensfrågan måste alltid ställas <em>för vem</em>."},
    {txt:"Eftersom befolkningen minskade försämrades levnadsvillkoren för de grupper som överlevde.",
     ratt:false, miss:"konsekvens_enkelriktad",
     kommentar:"Rimligt att tro, men materialet pekar åt andra hållet för lönearbetare och landbor. Färre människor om samma resurser."},
    {txt:"Digerdöden orsakade reformationen, eftersom förtroendet för kyrkan skadades.",
     ratt:false, miss:"for_lang_orsakskedja",
     kommentar:"Nästan tvåhundra år och många mellanled. En så lång kedja måste beläggas länk för länk, annars är den en gissning."},
    {txt:"Digerdöden var en konsekvens av att jordbruket expanderat in på för mager mark.",
     ratt:false, miss:"orsak_och_verkan_omkastade",
     kommentar:"Expansionen kan ha gjort befolkningen sårbar, men pesten kom med en bakterie, inte med åkerbruket."}
  ],
  s:`<p>Skilj på omedelbara och långsiktiga konsekvenser, och räkna med att
  de pekar åt olika håll för olika grupper.</p>
  <p>Att påstå en lång orsakskedja kräver att du kan visa länkarna. Två
  händelser i samma århundrade är inte en kedja.</p>`
},

{
  id:"hi-ok-204", kap:2, omr:"ok_konsekvens",
  familj:["kort_vs_lang_sikt","samtidighet_vs_orsak"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Mellan 1870 och 1910 industrialiserades Sverige snabbt. Sågverk,
  järnbruk och verkstadsindustri växte, järnvägsnätet byggdes ut och
  städerna fylldes. Under samma period utvandrade omkring en miljon
  svenskar till Nordamerika.</p>
  <p class="fragan">Vilka påståenden skiljer korta och långa konsekvenser
  på ett rimligt sätt?</p>`,
  alternativ:[
    {txt:"På kort sikt flyttade människor från landsbygd till industriort, ofta till trångboddhet och osäkra anställningar.",
     ratt:true,
     kommentar:"Den omedelbara konsekvensen var en omflyttning, och den var för många en försämring av boendet."},
    {txt:"På lång sikt byggdes fackföreningar och partier upp av just de grupper som industrin samlade på samma plats.",
     ratt:true,
     kommentar:"Industrin skapade förutsättningen: många människor med samma intresse på samma ställe."},
    {txt:"Att emigrationen fortsatte under industrialiseringen är förenligt med att de nya arbetstillfällena inte räckte till för alla som sökte försörjning — men samtidigheten räcker inte ensam för att visa det.",
     ratt:true,
     kommentar:"Rimlig hypotes, men inte ett bevis. För att visa sambandet behövs mer material om vilka som emigrerade, arbetsmarknaden och deras alternativ."},
    {txt:"På kort sikt steg reallönerna märkbart för industriarbetarna, som fick del av produktivitetsökningen direkt.",
     ratt:false, miss:"konsekvens_for_tidig",
     kommentar:"Reallönerna steg, men senare och långsammare än produktiviteten. Kort och lång sikt pekar åt olika håll här."},
    {txt:"Industrialiseringen var en konsekvens av den allmänna rösträtten.",
     ratt:false, miss:"anakronism_i_orsakskedjan",
     kommentar:"Rösträtten kom 1918–21, långt efter. Ordningen går inte ihop."},
    {txt:"Eftersom järnvägen byggdes ut samtidigt som industrin växte är järnvägen en konsekvens av industrin.",
     ratt:false, miss:"samtidighet_som_orsak",
     kommentar:"Samtidighet är inte orsakssamband. Här påverkade de dessutom varandra åt båda hållen."}
  ],
  s:`<p>Konsekvensfrågan har alltid tre delar: för vem, hur snart, och hur
  länge.</p>
  <p>Och två saker som händer samtidigt kan vara orsak, verkan, ömsesidiga
  eller helt orelaterade. Samtidighet avgör ingenting i sig.</p>`
},

{
  id:"hi-ok-205", kap:2, omr:"ok_kedjor",
  familj:["samverkande_orsaker","motiv_vs_forklaring"], niva:"A",
  svarstyp:"alternativ",
  t:`<p>Vid riksdagen i Västerås 1527 beslöts att kyrkans "överflödiga" egendom
  skulle dras in till kronan. Gustav Vasa hade stora skulder till Lübeck efter
  befrielsekriget. Samtidigt hade Luthers skrifter börjat spridas i riket, bland
  annat genom Olaus Petri.</p>
  <p class="fragan">Vilka bedömningar av orsakerna är välgrundade?</p>`,
  alternativ:[
    {txt:"Ekonomiska och religiösa orsaker samverkade: kronans behov av inkomster fanns i ett läge där en religiös brytning gjorde indragningen möjlig att försvara.",
     ratt:true,
     kommentar:"Samverkan, inte konkurrens. Det ena gav motiv, det andra gav legitimitet."},
    {txt:"Att en orsak är ekonomisk utesluter inte att den religiösa också var verklig — orsaker konkurrerar inte om en enda plats.",
     ratt:true,
     kommentar:"Det här är det viktigaste steget bort från enkla förklaringar."},
    {txt:"Reformationen berodde enbart på Gustav Vasas skulder eftersom kronan tjänade ekonomiskt på den indragna kyrkoegendomen.",
     ratt:false, miss:"monokausalitet",
     kommentar:"Skulderna förklarar varför pengar behövdes, inte varför just kyrkan kunde angripas utan uppror i hela riket."},
    {txt:"Reformationen berodde enbart på Luthers teologi eftersom religiösa idéer alltid väger tyngre än ekonomiska intressen.",
     ratt:false, miss:"monokausalitet",
     kommentar:"Beslutet togs uppifrån, av politiska och ekonomiska skäl, långt innan lärans innehåll slagit igenom brett."},
    {txt:"De religiösa argumenten kan avfärdas som svepskäl eftersom Gustav Vasa själv fick ekonomisk nytta av beslutet.",
     ratt:false, miss:"motiv_lika_med_forklaring",
     kommentar:"Att någon tjänar på något är ett skäl att granska argumenten — inte ett bevis för att de var oärliga. Det är ett vanligt kortslut."},
    {txt:"Genomförandet uppifrån visar att befolkningen var religiöst likgiltig och att idéernas spridning därför saknade betydelse.",
     ratt:false, miss:"beslut_lika_med_opinion",
     kommentar:"Motståndet var på sina håll kraftigt. Ett beslut uppifrån säger ingenting om vad människor tyckte."}
  ],
  s:`<p>Historiska förlopp har som regel flera orsaker som förstärker varandra.
  Uppgiften är inte att välja en, utan att väga dem och visa hur de hänger
  ihop.</p>
  <p>Och: den som pekar på någons motiv har inte därmed bemött hens argument.</p>`
},

/* =====================================================================
   KAPITEL 3 — AKTÖR OCH STRUKTUR
   ===================================================================== */

{
  id:"hi-as-301", kap:3, omr:"as_aktor",
  familj:["handlingsutrymme"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Gustav Vasa valdes till kung 1523 efter ett uppror mot Kristian II. Under
  hans tid centraliserades förvaltningen, kyrkans egendom drogs in och
  kungamakten gjordes ärftlig 1544.</p>
  <p class="fragan">Vilka påståenden om aktör och struktur är rimliga?</p>`,
  alternativ:[
    {txt:"Gustav Vasa hade ett verkligt handlingsutrymme: flera av besluten hade kunnat fattas annorlunda.",
     ratt:true,
     kommentar:"Aktörsperspektivet: val som faktiskt var val."},
    {txt:"Handlingsutrymmet begränsades samtidigt av strukturer — skulderna till Lübeck, adelns intressen och hur långt en kungs makt praktiskt räckte i ett glest rike.",
     ratt:true,
     kommentar:"Strukturperspektivet: ramarna som gör vissa val möjliga och andra otänkbara."},
    {txt:"Utan Gustav Vasa hade Sverige aldrig blivit ett självständigt rike.",
     ratt:false, miss:"kontrafaktisk_tvarsakerhet",
     kommentar:"Kontrafaktiska påståenden kan diskuteras, men inte slås fast. Vi vet inte vad som hade hänt."},
    {txt:"Eftersom strukturerna var avgörande spelade det ingen roll vem som var kung.",
     ratt:false, miss:"struktur_utraderar_aktor",
     kommentar:"Strukturer sätter ramar. Inom ramarna finns fortfarande val, och de får följder."},
    {txt:"Att Gustav Vasa lyckades bevisar att han var den ende som kunde ha lyckats.",
     ratt:false, miss:"utfall_lika_med_nodvandighet",
     kommentar:"Att något hände betyder inte att det måste ha hänt, eller att bara en person kunde ha åstadkommit det."},
    {txt:"Aktörsperspektiv och strukturperspektiv utesluter varandra; man måste välja ett av dem.",
     ratt:false, miss:"aktor_eller_struktur",
     kommentar:"De är två frågor till samma förlopp, inte två läger. Bra historieskrivning använder båda."}
  ],
  s:`<p>Strukturer sätter ramarna. Aktörer rör sig inom dem — och kan ibland
  flytta dem. Den intressanta frågan är nästan aldrig "vilket av dem", utan
  "hur mycket rörelseutrymme fanns här, och vad gjordes med det?"</p>`
},

{
  id:"hi-as-302", kap:3, omr:"as_samspel",
  familj:["handlingsutrymme","beslut_under_press"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Vad som hände i Ådalen i maj 1931",
    typ:"Sammanställning",
    akthet:"autentisk",
    text:`<p>Vid Marmaverken i Ådalen pågick en konflikt sedan flera
    månader. Arbetsgivarna hade tagit in arbetare utifrån för att driva
    industrin vidare under strejken.</p>
    <p>Sverige saknade vid den här tiden en statlig polisstyrka som kunde
    sättas in vid större oroligheter. När länsstyrelsen bedömde att läget
    inte gick att hantera lokalt begärdes militär hjälp, i enlighet med
    gällande ordning.</p>
    <p>Den 14 maj marscherade flera tusen demonstranter mot Lunde. En
    militärstyrka under befäl av en kapten mötte tåget. Skott avlossades
    mot demonstranterna. Fem personer dödades.</p>
    <p>Händelsen ledde till riksdagsdebatt, rättegångar och till att
    reglerna för militär vid inrikes oroligheter skrevs om.</p>`,
    om:`<p>Sammanställningen bygger på den allmänt vedertagna
    händelsebeskrivningen. Ansvarsfrågan — vem som gav order och vad som
    sades — var omstridd redan i samtiden och prövades i domstol.</p>`,
    referens:"Sammanställning av händelseförloppet i Ådalen den 14 maj 1931."
  }],
  t:`<p class="fragan">Vilka bedömningar av aktör och struktur håller?</p>`,
  alternativ:[
    {txt:"Att militär över huvud taget sattes in hängde samman med en struktur: Sverige saknade en nationell statlig polisorganisation med resurser att förstärka lokala polisstyrkor vid stora konflikter.",
     ratt:true,
     kommentar:"Strukturen hjälper till att förklara varför militär kunde sättas in för en uppgift som i dag normalt skulle hanteras av polis."},
    {txt:"Befälet på platsen hade ändå ett handlingsutrymme. Att en styrka är utkommenderad avgör inte i sig att skott avlossas.",
     ratt:true,
     kommentar:"Här ligger aktörsfrågan. Strukturen skapade situationen; någon fattade beslutet i den."},
    {txt:"Att reglerna skrevs om efteråt visar att samtiden själv uppfattade strukturen som en del av problemet.",
     ratt:true,
     kommentar:"Skarpt. Lagändringen är i sig ett belägg för att ansvaret inte enbart lades på enskilda personer."},
    {txt:"Eftersom militär var utkommenderad var utgången given, och det är meningslöst att fråga efter enskildas ansvar.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Strukturer gör saker möjliga, inte oundvikliga. Annars försvinner ansvaret helt ur historien."},
    {txt:"Eftersom en enskild befälhavare gav order är händelsen fullt förklarad med hans beslut.",
     ratt:false, miss:"aktor_utan_struktur",
     kommentar:"Då blir frågan varför han stod där med en beväpnad styrka obesvarad. Båda leden behövs."},
    {txt:"Att ansvarsfrågan prövades i domstol innebär att den historiska frågan om orsaker därmed är avgjord.",
     ratt:false, miss:"juridiskt_lika_med_historiskt",
     kommentar:"Domstolen prövar skuld enligt lag. Historikern frågar varför förloppet såg ut som det gjorde. Olika frågor."}
  ],
  s:`<p>Ådalen är ett skolexempel på att de två perspektiven behövs
  samtidigt. Strukturen förklarar varför en beväpnad styrka stod framför
  ett demonstrationståg. Aktören förklarar vad som hände i det
  ögonblicket.</p>
  <p>Den som bara ser strukturen får ett förlopp utan ansvar. Den som bara
  ser aktören får ett oförklarligt enskilt övergrepp.</p>`
},

{
  id:"hi-as-303", kap:3, omr:"as_struktur",
  familj:["push_och_pull","kedjemigration"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Mellan 1850 och 1930 utvandrade omkring 1,3 miljoner människor från
  Sverige, de flesta till Nordamerika.</p>
  <p class="fragan">Vilka förklaringar väger aktör och struktur på ett hållbart
  sätt?</p>`,
  alternativ:[
    {txt:"Strukturella villkor — befolkningsökning, brist på jord, billigare atlantresor och arbetskraftsbehov i USA — förklarar varför utvandring blev möjlig och lockande för många samtidigt.",
     ratt:true,
     kommentar:"Strukturerna förklarar mönstret: varför så många, just då."},
    {txt:"Vem som faktiskt reste avgjordes av enskilda beslut i familjer, ofta med biljetter och brev från släktingar som redan rest.",
     ratt:true,
     kommentar:"Aktörsnivån förklarar urvalet: varför just dessa personer, från just dessa byar."},
    {txt:"Eftersom över en miljon människor reste kan utvandringen förklaras som en struktur utan några individuella beslut.",
     ratt:false, miss:"struktur_utraderar_aktor",
     kommentar:"Ett mönster består av enskilda beslut. Att mönstret finns gör inte besluten mindre verkliga."},
    {txt:"Eftersom varje familj fattade ett eget beslut behövs ingen gemensam strukturell förklaring till utvandringens omfattning.",
     ratt:false, miss:"aktor_utraderar_struktur",
     kommentar:"Då blir det obegripligt varför besluten klumpar ihop sig i tid och rum."},
    {txt:"Den stora utvandringen visar att Sverige var Europas fattigaste land och att nästan alla saknade försörjning.",
     ratt:false, miss:"enskilt_matt_generaliserat",
     kommentar:"Utvandringsintensiteten var hög, men det följer inte. Att emigrera kräver dessutom resurser och kontakter — de allra fattigaste reste ofta inte."},
    {txt:"Kedjemigration är en struktur utan aktörer eftersom släktingarnas brev bestämde vart nästa utvandrare måste resa.",
     ratt:false, miss:"struktur_utan_aktorer",
     kommentar:"Kedjemigration är just samspelet: ett nätverk som byggs av enskilda beslut och som sedan styr nästa persons val."}
  ],
  s:`<p>Struktur förklarar mönstret, aktör förklarar urvalet. Kedjemigrationen
  visar hur de två griper in i varandra: varje beslut skapar strukturen för
  nästa.</p>`
},

{
  id:"hi-as-304", kap:3, omr:"as_samspel",
  familj:["mojlighetsfonster","vagning_av_orsaker"], niva:"A",
  svarstyp:"alternativ",
  t:`<p>Beslutet om allmän och lika rösträtt fattades i Sverige 1918–21.
  Bakgrunden var bland annat arbetarrörelsens och kvinnorörelsens långvariga
  kamp, första världskrigets slut, revolutionerna i Ryssland och Tyskland samt
  en liberal–socialdemokratisk regering under Nils Edén och Hjalmar Branting.</p>
  <p class="fragan">Vilka förklaringar väger ihop aktör och struktur på ett
  hållbart sätt?</p>`,
  alternativ:[
    {txt:"Revolutionerna ändrade vad som var politiskt möjligt — men någon måste ändå formulera och driva igenom förslaget.",
     ratt:true,
     kommentar:"Ett möjlighetsfönster öppnas av strukturer och utnyttjas av aktörer."},
    {txt:"Rösträttsrörelsernas långa arbete hade byggt upp organisation och opinion, så att kravet fanns färdigt när läget öppnade sig.",
     ratt:true,
     kommentar:"Beredskapen är avgörande. Fönster stängs snabbt för den som inte har något att lägga fram."},
    {txt:"Rösträtten var en gåva från en klok regering.",
     ratt:false, miss:"aktor_utraderar_struktur",
     kommentar:"Det bortser från decennier av påtryckningar och från trycket utifrån hösten 1918."},
    {txt:"Rösträtten kom automatiskt när samhället moderniserades.",
     ratt:false, miss:"struktur_utraderar_aktor",
     kommentar:"Inget kommer automatiskt. Flera moderna industriländer dröjde betydligt längre."},
    {txt:"Eftersom kvinnor fick rösta i val först 1921 var kvinnorörelsen betydelselös fram till dess.",
     ratt:false, miss:"resultatets_datum_matar_insats",
     kommentar:"Det var i hög grad den rörelsens arbete under decennier som gjorde 1921 möjligt."},
    {txt:"Eftersom flera orsaker samverkade går det inte att säga något om vilka som vägde tyngst.",
     ratt:false, miss:"komplexitet_som_undanflykt",
     kommentar:"Att orsaker samverkar är inte samma sak som att de väger lika. Att väga dem är själva uppgiften."}
  ],
  s:`<p>Tänk i två steg: vad öppnade fönstret, och vem stod redo att gå igenom
  det? Den som bara ser det ena får antingen en gåva från ovan eller en
  automatik utan människor.</p>`
},

/* =====================================================================
   KAPITEL 4 — FÖRÄNDRING OCH KONTINUITET
   ===================================================================== */

{
  id:"hi-fk-401", kap:4, omr:"fk_forandring_kontinuitet",
  familj:["forandring_och_bestandighet"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Under 1789 avskaffade nationalförsamlingen adelns och
  prästerskapets rättsliga privilegier, och antog en förklaring om
  människans och medborgarens rättigheter.</p>
  <p class="fragan">Vilka påståenden om förändring och kontinuitet är
  korrekta?</p>`,
  alternativ:[
    {txt:"Förändring: adelns och prästerskapets rättsliga privilegier togs bort.",
     ratt:true,
     kommentar:"Det är själva kärnan i augustibesluten 1789."},
    {txt:"Kontinuitet: rösträtten omfattade inte kvinnor, och begränsades snart även för fattigare män genom uppdelningen i aktiva och passiva medborgare.",
     ratt:true,
     kommentar:"Rättighetsförklaringens <em>alla människor</em> visade sig i praktiken betyda ganska få."},
    {txt:"Förändring: kyrkans jordegendom förstatligades och prästerskapet blev avlönat av staten.",
     ratt:true,
     kommentar:"Också det 1789–90. En av revolutionens mest långtgående konkreta förändringar."},
    {txt:"Kontinuitet: den katolska kyrkan behöll sin ställning och sina inkomster i stort sett oförändrade.",
     ratt:false, miss:"kontinuitet_felplacerad",
     kommentar:"Här ligger tvärtom en av de största förändringarna. Kontinuiteten finns på andra områden."},
    {txt:"Förändring: rösträtten utvidgades till samtliga vuxna män.",
     ratt:false, miss:"reform_overdriven",
     kommentar:"Allmän rösträtt för män infördes kortvarigt 1792–95, men inte 1789. Året spelar roll."},
    {txt:"Eftersom mycket bestod var revolutionen ingen verklig förändring.",
     ratt:false, miss:"kontinuitet_overdriven",
     kommentar:"Att kontinuitet finns betyder inte att förändringen var skenbar. Båda ska vägas, inte ställas mot varandra."}
  ],
  s:`<p>Ställ alltid båda frågorna till samma förlopp. Det som <em>inte</em>
  förändras är lika historiskt intressant som det som gör det — och ofta
  svårare att få syn på.</p>`
},

{
  id:"hi-fk-402", kap:4, omr:"fk_forandring_kontinuitet",
  familj:["forandring_och_bestandighet","arbete_och_kon"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Under industrialiseringen tog kvinnor arbete i textilfabriker,
  tändsticksfabriker och som hembiträden i städerna.</p>
  <p class="fragan">Vilka påståenden om förändring och kontinuitet
  håller?</p>`,
  alternativ:[
    {txt:"Förändring: arbetet flyttade från hemmet och gården till en arbetsplats med lön, arbetstider och arbetsgivare.",
     ratt:true,
     kommentar:"Det avgörande nya är inte arbetet utan <em>lönearbetet</em> — och att någon annan bestämmer över tiden."},
    {txt:"Kontinuitet: kvinnor hänvisades fortsatt till lägre betalda uppgifter, och lönen förutsattes vara ett tillskott till en mans försörjning.",
     ratt:true,
     kommentar:"Föreställningen om mannen som familjeförsörjare följde med in i fabriken och satte lönenivån."},
    {txt:"Förändring: kvinnor började arbeta, vilket de inte gjort tidigare.",
     ratt:false, miss:"arbete_forvaxlat_med_lonearbete",
     kommentar:"Kvinnor hade alltid arbetat. Det som var nytt var var arbetet utfördes och att det gav lön i pengar."},
    {txt:"Kontinuitet: kvinnors rättsliga ställning stod stilla under 1800-talet.",
     ratt:false, miss:"kontinuitet_overdriven",
     kommentar:"Här rörde det sig faktiskt: lika arvsrätt 1845, ogift kvinna myndig vid 25 år 1863. Kontinuiteten låg i lön och yrkesval, inte i lagen."},
    {txt:"Förändring: lönen sattes nu efter utfört arbete, vilket jämnade ut skillnaden mellan kvinnor och män vid samma maskin.",
     ratt:false, miss:"reform_overdriven",
     kommentar:"Lönetariffer var könsuppdelade långt in på 1900-talet, också vid identiska arbetsuppgifter."},
    {txt:"Eftersom förändringen var stor saknar det mening att fråga efter kontinuitet i samma period.",
     ratt:false, miss:"antingen_eller",
     kommentar:"Frågorna ställs alltid tillsammans. Stora förändringar är just de perioder där kontinuiteten är svårast att se."}
  ],
  s:`<p>Vad som räknas som förändring beror på vad man mäter. Byter man
  från <em>arbete</em> till <em>lönearbete</em> ser samma period helt
  olika ut.</p>`
},

{
  id:"hi-fk-403", kap:4, omr:"fk_periodisering",
  familj:["periodisering_som_konstruktion"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>I svenska läroböcker slutar vikingatiden ofta omkring år 1050, och
  medeltiden tar vid.</p>
  <p class="fragan">Vilka påståenden om periodiseringen är hållbara?</p>`,
  alternativ:[
    {txt:"Gränsen är ett val som forskare gjort utifrån vissa kriterier — främst kristnandet och skriftkulturens införande.",
     ratt:true,
     kommentar:"Periodgränser vilar alltid på valda kriterier. Byter man kriterium flyttar gränsen."},
    {txt:"En människa som levde år 1050 märkte ingen övergång. Periodgränser är verktyg i efterhand, inte händelser.",
     ratt:true,
     kommentar:"Den poängen är lätt att glömma när årtalen står i en tidslinje."},
    {txt:"Gränsen 1050 är fastställd genom en samtida källa som beskriver när vikingatiden faktiskt upphörde.",
     ratt:false, miss:"periodgrans_som_handelse",
     kommentar:"Ingen skrev 1050 att en epok tog slut. Indelningen är gjord långt senare."},
    {txt:"Perioder är godtyckliga och därför meningslösa eftersom olika forskare kan välja olika kriterier och gränser.",
     ratt:false, miss:"konstruktion_lika_med_vardelos",
     kommentar:"Att något är konstruerat gör det inte värdelöst. Perioder gör jämförelser och samtal möjliga — de ska bara inte förväxlas med verkligheten."},
    {txt:"Periodiseringen gäller lika bra för hela Norden eftersom kristnandet och skriftkulturen infördes samtidigt överallt.",
     ratt:false, miss:"periodisering_universell",
     kommentar:"Kristnandet gick olika snabbt i olika områden, vilket är ett av skälen till att gränsen diskuteras."},
    {txt:"Den svenska indelningen är felaktig eftersom en historisk period måste börja och sluta samtidigt i alla länder.",
     ratt:false, miss:"olikhet_lika_med_fel",
     kommentar:"Olika indelningar kan vara rimliga för olika frågor. Det handlar inte om rätt och fel, utan om mer eller mindre användbart."}
  ],
  s:`<p>Periodisering är ett verktyg. Fråga alltid: vilket kriterium bygger den
  på, vem valde det, och vad blir synligt respektive osynligt av det valet?</p>`
},

{
  id:"hi-fk-404", kap:4, omr:"fk_periodisering",
  familj:["brytpunkter","kriterier_for_periodisering"], niva:"A",
  svarstyp:"alternativ",
  t:`<p>Tre årtal återkommer när svensk demokratisering ska periodiseras:
  <strong>1809</strong> (ny regeringsform med maktdelning), <strong>1866</strong>
  (tvåkammarriksdag ersätter ståndsriksdagen) och <strong>1918–21</strong>
  (allmän och lika rösträtt).</p>
  <p class="fragan">Vilka resonemang om brytpunkter håller?</p>`,
  alternativ:[
    {txt:"Vilket årtal som är den viktigaste brytpunkten beror på vad man menar med demokrati — maktdelning, representation eller allmän rösträtt.",
     ratt:true,
     kommentar:"Definitionen avgör svaret. Därför måste den skrivas ut, inte förutsättas."},
    {txt:"1866 var en stor förändring av formen men liten av vilka som fick rösta: rösträtten förblev kraftigt begränsad av inkomst och förmögenhet.",
     ratt:true,
     kommentar:"Ett bra exempel på att en institutionell reform inte behöver vara en demokratisering."},
    {txt:"1809 är den enda riktiga brytpunkten eftersom regeringsformens långa giltighet visar att demokratin infördes då.",
     ratt:false, miss:"varaktighet_lika_med_betydelse",
     kommentar:"Hur länge något varar är inte samma sak som hur mycket det förändrade."},
    {txt:"1918–21 är den enda möjliga brytpunkten eftersom allmän rösträtt är det enda kriteriet som definierar demokrati.",
     ratt:false, miss:"definition_forutsatt",
     kommentar:"Det är en försvarbar hållning — men den måste argumenteras för. Och rösträtten var 1921 fortfarande villkorad på flera sätt."},
    {txt:"Det finns inga användbara brytpunkter eftersom en gradvis demokratisering inte kan delas in med bestämda årtal.",
     ratt:false, miss:"gradvis_utesluter_brytpunkt",
     kommentar:"Gradvisa förlopp kan mycket väl ha punkter där takten eller riktningen ändras. De ska bara motiveras."},
    {txt:"Den viktigaste brytpunkten bör kopplas till ett krig eftersom krig alltid förändrar politiska system mest.",
     ratt:false, miss:"handelsetyp_som_regel",
     kommentar:"Ingen händelsetyp är automatiskt en brytpunkt. Det beror på vad som undersöks."}
  ],
  s:`<p>En brytpunkt är ett påstående som ska försvaras: här ändrades något
  avgörande, mätt med det här kriteriet. Först definition, sedan årtal.</p>`
},

/* =====================================================================
   KAPITEL 5 — HISTORIEBRUK
   Ett alternativ är alltid "Detta är inte ett exempel på ett historiebruk."
   Det är ibland rätt.
   ===================================================================== */

{
  id:"hi-hb-501", kap:5, omr:"hb_typer",
  familj:["kommersiellt_bruk","bruk_vs_korrekthet"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Ett svenskt bryggeri lanserar ölen <em>Vikingablod</em>. På etiketten
  finns ett drakskepp och en runslinga. I reklamfilmen ror skäggiga män in mot
  en fjord.</p>
  <p class="fragan">Hur beskrivs detta bäst?</p>`,
  alternativ:[
    {txt:"Det är kommersiellt historiebruk eftersom vikingabilden används för att sälja en vara.",
     ratt:true,
     kommentar:"Syftet avgör kategorin, och syftet är här försäljning."},
    {txt:"Reklamen återanvänder den nationalromantiska bilden av vikingar som skäggiga krigare i drakskepp.",
     ratt:true,
     kommentar:"Det brukade förflutna är ofta ett tidigare bruk, inte källmaterialet."},
    {txt:"Det är inte historiebruk eftersom reklamen handlar om en nutida produkt, inte om historia.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Jo. Så snart en bild av det förflutna används för ett syfte i nuet är det historiebruk."},
    {txt:"Det är vetenskapligt historiebruk eftersom reklamen bygger på en väl utforskad historisk epok.",
     ratt:false, miss:"amne_bestammer_brukstyp",
     kommentar:"Vilken typ av bruk det rör sig om avgörs av syftet, inte av hur välutforskat ämnet är."},
    {txt:"Det är inte historiebruk eftersom den förenklade vikingabilden inte stämmer med dagens forskning.",
     ratt:false, miss:"felaktig_alltsa_inte_bruk",
     kommentar:"Historiebruk behöver inte vara korrekt. De felaktiga bilderna är ofta de mest använda."},
    {txt:"Det är främst ideologiskt historiebruk eftersom drakskeppet används som en symbol för nationen.",
     ratt:false, miss:"symbol_bestammer_brukstyp",
     kommentar:"Det kan glida åt det hållet, men här är avsändaren ett bryggeri och syftet att sälja öl."}
  ],
  s:`<p>Fråga tre saker: vem är avsändaren, vad används det förflutna till, och
  var kommer bilden ifrån? Här: bryggeri, försäljning, 1800-talsromantik.</p>`
},

{
  id:"hi-hb-502", kap:5, omr:"hb_typer",
  familj:["ideologiskt_bruk","urval_som_stallningstagande"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Artur Hazelius öppnade Skansen 1891. Gårdar och hus flyttades dit från
  olika landskap, och personal i folkdräkt visade hur arbetet gått till.
  Hazelius ville rädda en bondekultur som han menade höll på att försvinna i
  industrialiseringen.</p>
  <p class="fragan">Hur beskrivs detta bäst?</p>`,
  alternativ:[
    {txt:"Det är ideologiskt och nationellt historiebruk eftersom en gemensam bild av Sverige byggs upp.",
     ratt:true,
     kommentar:"Urvalet av byggnader, landskap och tidsskikt bär ett budskap om vad Sverige är."},
    {txt:"Det finns också ett vetenskapligt syfte eftersom byggnader och föremål samlas in och dokumenteras.",
     ratt:true,
     kommentar:"Ett och samma projekt kan tillhöra flera kategorier samtidigt."},
    {txt:"Det är inte historiebruk eftersom Skansen bevarar äldre byggnader i stället för att tolka dem.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Ett friluftsmuseum är historiebruk i närmast renodlad form."},
    {txt:"Det är icke-bruk eftersom syftet är att bevara det förflutna utan att påverka besökaren.",
     ratt:false, miss:"bevara_lika_med_neutralt",
     kommentar:"Icke-bruk är när tillgänglig historia medvetet lämnas oanvänd och tystas. Att bevara är en aktiv handling — och urvalet är ett ställningstagande."},
    {txt:"Det är enbart kommersiellt historiebruk eftersom Skansen tar betalt av dem som besöker området.",
     ratt:false, miss:"pengar_lika_med_kommersiellt_bruk",
     kommentar:"Det finns ett kommersiellt inslag, men det förklarar varken urvalet eller varför museet byggdes just då."},
    {txt:"Det är en objektiv återgivning av bondesamhället eftersom de flyttade byggnaderna är historiskt äkta.",
     ratt:false, miss:"akta_foremal_lika_med_sann_bild",
     kommentar:"Äkta föremål i ett valt urval, i en vald miljö, ger ändå en tolkning."}
  ],
  s:`<p>Titta på urvalet. Vad togs med, vad lämnades kvar, vilken tid fick
  representera det förflutna? Där ligger budskapet — oftare än i texterna på
  skyltarna.</p>`
},

{
  id:"hi-hb-503", kap:5, omr:"hb_syfte",
  familj:["politiskt_moraliskt_bruk","analogins_kraft"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>I en riksdagsdebatt säger en politiker om ett förslag hon motsätter sig:
  "Det här är ingenting annat än ett nytt München 1938."</p>
  <p class="fragan">Hur beskrivs detta bäst?</p>`,
  alternativ:[
    {txt:"Det är politiskt–moraliskt historiebruk eftersom jämförelsen gör motståndarens förslag moraliskt misstänkt.",
     ratt:true,
     kommentar:"Det är inte historien som argumenteras om, utan dagens fråga som laddas med historiens moral."},
    {txt:"Jämförelsen överför den negativa laddningen från Münchenöverenskommelsen till den fråga som diskuteras i dag.",
     ratt:true,
     kommentar:"Den som ska bemöta analogin tvingas först bevisa att hon inte är Chamberlain. Det är själva poängen med greppet."},
    {txt:"Det är inte historiebruk eftersom politikern diskuterar ett nutida förslag och inte andra världskriget.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Historiska analogier i politisk debatt är ett av de vanligaste bruken av alla."},
    {txt:"Det är vetenskapligt historiebruk eftersom jämförelsen utgår från en verklig och dokumenterad händelse.",
     ratt:false, miss:"sant_lika_med_vetenskapligt",
     kommentar:"Att händelsen är verklig säger ingenting om i vilket syfte den används."},
    {txt:"Det är inte historiebruk om likheterna mellan dagens fråga och München 1938 är svaga.",
     ratt:false, miss:"felaktig_alltsa_inte_bruk",
     kommentar:"Haltande jämförelser är fortfarande bruk — ofta de mest verkningsfulla."},
    {txt:"Det är existentiellt historiebruk eftersom politikern uttrycker stark oro inför förslagets möjliga följder.",
     ratt:false, miss:"kansla_lika_med_existentiellt",
     kommentar:"Existentiellt bruk handlar om att orientera sig i vem man är, inte om att argumentera med kraft."}
  ],
  s:`<p>Historiska analogier flyttar över en färdig moralisk dom på en ny fråga.
  Motfrågan är alltid densamma: på vilka punkter liknar fallen varandra, och på
  vilka punkter inte?</p>`
},

{
  id:"hi-hb-504", kap:5, omr:"hb_identifiera",
  familj:["icke_exempel","brukets_grans"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>En geolog daterar bergarter i Skanderna med isotopmetoder för att bestämma
  när bergskedjan veckades. Resultaten publiceras i en geologisk tidskrift.</p>
  <p class="fragan">Hur beskrivs detta bäst?</p>`,
  alternativ:[
    {txt:"Det är inte historiebruk eftersom undersökningen gäller jordens geologiska förflutna, inte människors historia.",
     sist:true, ratt:true,
     kommentar:"Rätt. Här undersöks jordens historia, och ingen bild av det mänskliga förflutna används för ett syfte i nuet."},
    {txt:"Isotopdateringen undersöker när bergarter bildades och använder inte det mänskliga förflutna för något nutida syfte.",
     ratt:true,
     kommentar:"Gränsen går vid bruket. Att undersöka är inte i sig att bruka."},
    {txt:"Det är vetenskapligt historiebruk eftersom forskaren använder vetenskapliga metoder för att undersöka det förflutna.",
     ratt:false, miss:"forskning_lika_med_historiebruk",
     kommentar:"Vetenskapligt historiebruk kan handla om historievetenskapligt arbete med det mänskliga förflutna. Här är studieobjektet i stället berggrund och geologisk tid, alltså naturvetenskap."},
    {txt:"Det är kommersiellt historiebruk eftersom forskningsresultatet publiceras i en tidskrift som säljs till läsare.",
     ratt:false, miss:"pengar_lika_med_kommersiellt_bruk",
     kommentar:"Att något kostar pengar gör det inte till kommersiellt historiebruk."},
    {txt:"Det är historiebruk eftersom samma dateringsmetod även kan användas av arkeologer i historiska undersökningar.",
     ratt:false, miss:"metod_bestammer_brukstyp",
     kommentar:"Metoden avgör inte. Frågan är vad som brukas och i vilket syfte."},
    {txt:"Det är ideologiskt historiebruk eftersom forskningen behandlar en bergskedja som tillhör Sverige och Norge.",
     ratt:false, miss:"geografi_bestammer_brukstyp",
     kommentar:"Var något ligger avgör ingenting om bruket."}
  ],
  ledtrad:"Börja med frågan: handlar det här om människors förflutna eller om naturens?",
  s:`<p>Historiebruk handlar om hur det <em>mänskliga</em> förflutna tolkas och används.</p>
  <p>Att något är gammalt räcker alltså inte. Jordens geologiska historia är inte historiebruk i historieämnets mening.</p>`
},

{
  id:"hi-hb-505", kap:5, omr:"hb_typer",
  familj:["ideologiskt_bruk","icke_bruk"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Under 1930-talet finansierade det nazistiska Tyskland utgrävningar och
  forskningsresor som skulle visa att en germansk "urras" låg bakom de stora
  kulturerna. Slutsatserna var bestämda på förhand, och fynd som inte passade
  valdes bort.</p>
  <p class="fragan">Hur beskrivs detta bäst?</p>`,
  alternativ:[
    {txt:"Det är ideologiskt historiebruk eftersom det förflutna används för att legitimera nazismens raslära.",
     ratt:true,
     kommentar:"Det är läroboksexemplet på ideologiskt bruk."},
    {txt:"Verksamheten är inte vetenskaplig när slutsatserna bestäms före undersökningen och motstridiga fynd väljs bort.",
     ratt:true,
     kommentar:"Vetenskaplighet handlar om att slutsatsen kan falla på materialet. Här kunde den inte det."},
    {txt:"Det är inte historiebruk eftersom slutsatserna var politiskt bestämda och därför historiskt felaktiga.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Det är historiebruk i en av sina mest genomförda former."},
    {txt:"Det är vetenskapligt historiebruk eftersom utbildade arkeologer genomförde utgrävningarna med etablerade metoder.",
     ratt:false, miss:"forskare_lika_med_vetenskap",
     kommentar:"Vem som håller i spaden avgör inte. Det är arbetssättet och förhållandet till materialet som gör något vetenskapligt."},
    {txt:"Det är inte relevant historiebruk eftersom påståendena var falska och därför saknar historiskt värde.",
     ratt:false, miss:"falskt_lika_med_ointressant",
     kommentar:"Tvärtom. Den är en förstklassig källa till nazismens självbild och till hur historia kan sättas i ideologins tjänst."},
    {txt:"Det är främst icke-bruk eftersom forskarna dolde fynd som motsade den germanska ursprungsberättelsen.",
     ratt:false, miss:"icke_bruk_missforstatt",
     kommentar:"Icke-bruk är när historia som finns tillgänglig medvetet lämnas oanvänd och tystas. Här brukas historien intensivt — det är urvalet inom bruket som är manipulerat."}
  ],
  s:`<p>Ideologiskt bruk känns igen på att slutsatsen finns före materialet.
  Notera också skillnaden mot <em>icke-bruk</em>: där är poängen tystnaden,
  här är poängen den höga volymen.</p>`
},

{
  id:"hi-hb-506", kap:5, omr:"hb_syfte",
  familj:["existentiellt_bruk","flera_bruk_samtidigt"], niva:"A",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Fall A</div>
    <p>En person forskar i kyrkböcker för att ta reda på varifrån hennes farfars
    far kom, och reser sedan till byn.</p>
  </div>
  <div class="kalla">
    <div class="kall-topp">Fall B</div>
    <p>En kommun firar 600 år som stad med tåg genom centrum, tal av
    kommunalrådet och en nytryckt bok om stadens historia.</p>
  </div>
  <p class="fragan">Vilka bedömningar är rimliga?</p>`,
  alternativ:[
    {txt:"A är främst existentiellt historiebruk eftersom släktforskningen används för att skapa personlig tillhörighet.",
     ratt:true,
     kommentar:"Existentiellt bruk handlar om identitet och orientering, ofta i det lilla."},
    {txt:"B förenar identitetsskapande, kommersiellt och politiskt historiebruk genom firandet, boken och kommunens marknadsföring.",
     ratt:true,
     kommentar:"Offentliga jubileer är nästan alltid flera bruk i samma paket."},
    {txt:"Varken A eller B är historiebruk eftersom båda återger sådant som faktiskt har hänt.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Båda fallen är historiebruk. Att ett bruk är privat och småskaligt gör det inte till något annat."},
    {txt:"A är främst vetenskapligt historiebruk eftersom personen använder kyrkböcker och följer arkivens uppgifter.",
     ratt:false, miss:"metod_bestammer_brukstyp",
     kommentar:"Materialet avgör inte syftet. Hon söker sitt ursprung, inte ny kunskap för ett forskarsamhälle."},
    {txt:"B är främst icke-bruk eftersom jubileet undviker konflikter och presenterar en gemensam berättelse.",
     ratt:false, miss:"icke_bruk_missforstatt",
     kommentar:"Icke-bruk är tystnad om det som finns, inte frånvaro av konflikt."},
    {txt:"B måste placeras i en enda kategori eftersom olika former av historiebruk utesluter varandra.",
     ratt:false, miss:"kategorier_utesluter_varandra",
     kommentar:"Kategorierna är analysverktyg, inte fack. De flesta verkliga fall är blandningar."}
  ],
  s:`<p>Kategorierna hjälper dig ställa frågan "vad används historien till här?"
  — men svaret är ofta flera saker på en gång, och med olika tyngd för olika
  inblandade.</p>`
},

/* =====================================================================
   KAPITEL 6 — HISTORISK ARGUMENTATION
   ===================================================================== */

{
  id:"hi-ha-601", kap:6, omr:"ha_belagg",
  familj:["slutsats_inom_kallan"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Styrelseprotokoll från ett verkstadsföretag",
    typ:"Protokoll, 1902",
    akthet:"konstruerad",
    text:`<p><strong>§ 4.</strong> Föredrogs frågan om arbetstiden vid
    gjuteriet. Disponenten anmälde att oro bland arbetarna förekommit
    upprepade gånger under året, senast i mars, och att detta menligt
    inverkat på leveranserna.</p>
    <p>Efter överläggning beslöt styrelsen att arbetstiden vid gjuteriet
    från den 1 oktober skall utgöra tio timmar.</p>
    <p>Herr Lindqvist lät till protokollet anteckna att han motsatte sig
    beslutet, enär det enligt hans mening kommer att medföra krav av samma
    slag vid övriga avdelningar.</p>`,
    om:`<p>Protokollet fördes av företagets sekreterare vid ett ordinarie
    styrelsesammanträde och justerades vid nästa möte.</p>`,
    referens:"Konstruerad källa, uppställd efter mönstret för svenska styrelseprotokoll kring sekelskiftet 1900."
  }],
  t:`<p class="fragan">Vilka slutsatser bär källan?</p>`,
  alternativ:[
    {txt:"Att styrelsen själv angav arbetarnas missnöje som skäl för beslutet.",
     ratt:true,
     kommentar:"Det står i klartext i protokollet. Vad styrelsen <em>anförde</em> är källan säker på."},
    {txt:"Att det förekom återkommande missnöje vid gjuteriet före oktober 1902.",
     ratt:true,
     kommentar:"Disponentens anmälan är ett belägg — inte ett neutralt sådant, men företaget hade ingen anledning att hitta på det."},
    {txt:"Att beslutet var omstritt inom styrelsen.",
     ratt:true,
     kommentar:"Reservationen till protokollet är ett direkt belägg för oenighet."},
    {txt:"Att svenska verkstadsarbetare fick tiotimmarsdag 1902.",
     ratt:false, miss:"fran_ett_fall_till_alla",
     kommentar:"Ett gjuteri vid ett företag. Steget till hela branschen kräver helt annat material."},
    {txt:"Att arbetarna vid gjuteriet blev nöjda efter beslutet.",
     ratt:false, miss:"slutsats_utanfor_kallan",
     kommentar:"Protokollet slutar vid beslutet. Vad som hände sedan står inte där."},
    {txt:"Att styrelsen sympatiserade med arbetarnas krav.",
     ratt:false, miss:"motiv_inlast_i_kallan",
     kommentar:"Skälet som anges är leveranserna, inte rättvisan. Att göra en eftergift är inte att hålla med."}
  ],
  s:`<p>Dra gränsen vid vad källan faktiskt kan bära. Två frågor: står det
  där, eller lägger jag till det? Och: gäller det ett fall eller alla?</p>
  <p>Lägg märke till att ett och samma protokoll bär olika säkra slutsatser.
  Att beslutet fattades är säkrast. Varför det fattades är styrelsens egen
  version.</p>`
},

{
  id:"hi-ha-602", kap:6, omr:"ha_tolkning",
  familj:["olika_tolkning_samma_material","kriterier_avgor"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Två historiker arbetar med samma material: avlöningsböcker från ett
  bruk på 1870-talet, där varje arbetares utbetalda lön och avdrag är
  införda vecka för vecka.</p>
  <p>Den ene drar slutsatsen att brukets arbetare levde under knappa men
  stabila villkor. Den andre menar att materialet visar en utbredd
  osäkerhet.</p>
  <p class="fragan">Varför kan de landa olika?</p>`,
  alternativ:[
    {txt:"De kan ställa olika frågor till materialet och därmed leta efter olika saker — den ene efter nivå, den andre efter variation mellan veckorna.",
     ratt:true,
     kommentar:"Samma siffror, olika frågor. Ett genomsnitt och en spridning kan peka åt olika håll."},
    {txt:"De kan dra gränsen för vad som räknas som osäker inkomst på olika sätt, och därmed räkna samma arbetare åt olika håll.",
     ratt:true,
     kommentar:"Definitionen avgör resultatet. Därför ska en historiker alltid redovisa sina gränser."},
    {txt:"De kan ha avgränsat urvalet olika — till exempel räknat in eller ut säsongsanställda och kvinnor.",
     ratt:true,
     kommentar:"Urvalet är det tredje stället där tolkningar skiljer sig åt, och det syns sällan i slutsatsen."},
    {txt:"En av historikerna måste ha läst avlöningsböckerna fel eftersom samma material bara kan ge en riktig tolkning.",
     ratt:false, miss:"oenighet_lika_med_slarv",
     kommentar:"Oenighet mellan historiker beror sällan på läsfel. Nästan alltid på fråga, definition eller urval."},
    {txt:"Avlöningsböckerna kan inte användas för levnadsvillkor eftersom två forskare har dragit olika slutsatser ur samma uppgifter.",
     ratt:false, miss:"oenighet_lika_med_oanvandbart",
     kommentar:"Tvärtom — att två läsningar är möjliga är just varför materialet är värt att arbeta med."},
    {txt:"Båda slutsatserna är lika välgrundade eftersom historiska tolkningar inte kan jämföras med gemensamma krav på belägg.",
     ratt:false, miss:"relativism",
     kommentar:"Att flera tolkningar är möjliga är inte samma sak som att alla är lika bra. Täckning, konsekvens och bemötta invändningar skiljer dem åt."}
  ],
  s:`<p>Skillnader i tolkning kommer oftast från skillnader i fråga,
  definition eller urval — inte från slarv och inte från godtycke.</p>
  <p>Kriterierna för att väga två tolkningar är fortfarande: hur mycket av
  materialet täcks, hur väl hänger resonemanget ihop, och hur bemöts de
  starkaste invändningarna?</p>`,
  ledtrad:"Vad skulle du behöva veta om de två studierna för att kunna avgöra vilken som håller bäst?"
},

{
  id:"hi-ha-603", kap:6, omr:"ha_tolkning",
  familj:["villkor_vs_motiv","vaga_forklaringar"], niva:"A",
  svarstyp:"alternativ",
  t:`<p>Fyra förklaringar till vikingatågen har föreslagits:</p>
  <p>1. Befolkningstryck och brist på jord.<br>
  2. Nya handelsvägar österut och stark efterfrågan på silver.<br>
  3. Förbättrad skeppsteknik.<br>
  4. Politisk centralisering, som fick förlorare i maktkamper att söka sig ut.</p>
  <p class="fragan">Vilka påståenden om hur förklaringarna bör vägas är
  hållbara?</p>`,
  alternativ:[
    {txt:"Skeppstekniken förklarar bättre <em>hur</em> tågen blev möjliga än <em>varför</em> de började — den är ett villkor snarare än ett motiv.",
     ratt:true,
     kommentar:"Skilj villkor (vad som gjorde det möjligt) från motiv (vad som fick någon att vilja). Båda behövs, men de svarar på olika frågor."},
    {txt:"Förklaringarna utesluter inte varandra, men de bör ändå prövas mot varandra: vilken täcker mest av det vi faktiskt ser i materialet?",
     ratt:true,
     kommentar:"Att förklaringar kan samexistera betyder inte att de väger lika."},
    {txt:"Den förklaring som förekommer i flest läroböcker är starkast eftersom många författare då har bekräftat den.",
     ratt:false, miss:"auktoritet_lika_med_belagg",
     kommentar:"Läroböcker släpar efter forskningsläget och kopierar dessutom ofta varandra."},
    {txt:"Alla fyra förklaringarna kan vara rimliga och behöver därför inte vägas mot det historiska materialet.",
     ratt:false, miss:"komplexitet_som_undanflykt",
     kommentar:"Att väga är uppgiften. 'Allt spelade in' är en beskrivning, inte en förklaring."},
    {txt:"Befolkningstrycket kan avfärdas helt eftersom det saknas folkräkningar som visar vikingatidens exakta befolkningstal.",
     ratt:false, miss:"avsaknad_av_siffror_lika_med_avfardat",
     kommentar:"Frånvaro av statistik är inte frånvaro av belägg. Gravar, bebyggelselämningar och odlingsspår används som indikationer."},
    {txt:"Den enklaste förklaringen är alltid bäst eftersom en förklaring med flera samverkande orsaker blir mindre vetenskaplig.",
     ratt:false, miss:"enkelhet_som_regel",
     kommentar:"Enkelhet är ett argument, inte ett avgörande. Den enklaste förklaringen måste ändå täcka materialet."}
  ],
  s:`<p>Två verktyg: skilj <em>villkor</em> från <em>motiv</em>, och väg
  förklaringar efter hur mycket av materialet de faktiskt täcker.</p>
  <p>"Allt spelade in" är där man börjar, inte där man slutar.</p>`
},

{
  id:"hi-ha-604", kap:6, omr:"ha_belagg",
  familj:["invandning_i_sak","historiografisk_debatt"], niva:"A",
  svarstyp:"alternativ",
  t:`<p>År 1961 hävdade den tyske historikern Fritz Fischer att Tyskland medvetet
  drev fram kriget 1914 och hade långtgående erövringsmål. Tesen byggde bland
  annat på tyska regeringsdokument från september 1914. Debatten som följde var
  häftig. Kritiker invände att dokumenten skrevs <em>efter</em> krigsutbrottet
  och därför inte visar vad man ville dessförinnan.</p>
  <p class="fragan">Vilka bedömningar av argumentationen är rimliga?</p>`,
  alternativ:[
    {txt:"Kritikernas invändning är källkritisk: den handlar om vad dokumenten kan belägga, inte om vad man tycker om slutsatsen.",
     ratt:true,
     kommentar:"Det är en invändning i sak, och den måste bemötas i sak."},
    {txt:"För att stärka tesen skulle Fischer behöva material som visar avsikter <em>före</em> krigsutbrottet.",
     ratt:true,
     kommentar:"Att kunna säga vad som skulle stärka eller försvaga en tes är kärnan i historisk argumentation."},
    {txt:"Eftersom debatten var infekterad var den ovetenskaplig.",
     ratt:false, miss:"konflikt_lika_med_ovetenskap",
     kommentar:"Hård debatt är ofta ett tecken på att något viktigt står på spel, inte på bristande vetenskaplighet."},
    {txt:"Eftersom Fischer var tysk och ändå kritisk mot Tyskland måste hans slutsats vara riktig.",
     ratt:false, miss:"avsandare_lika_med_belagg",
     kommentar:"Vem som säger något avgör inte om det är sant. Även obekväma slutsatser måste beläggas."},
    {txt:"Eftersom kritikerna var tyska var deras invändning bara en nationell försvarsreflex.",
     ratt:false, miss:"motiv_lika_med_forklaring",
     kommentar:"Motiv kan ha funnits, men invändningen måste ändå bemötas i sak. Att peka på någons motiv är inte att besvara argumentet."},
    {txt:"Frågan om ansvaret för 1914 är sedan länge avgjord och inte längre omdiskuterad.",
     ratt:false, miss:"debatt_avslutad",
     kommentar:"Den diskuteras fortfarande. Fischer flyttade debatten men avslutade den inte."}
  ],
  s:`<p>En invändning i sak handlar om vad materialet kan bära. En invändning om
  person eller motiv gör det inte — den kan vara intressant, men den besvarar
  inte argumentet.</p>
  <p>Testa alltid en tes med frågan: vad skulle få mig att överge den?</p>`
},

/* =====================================================================
   TILLÄGG — uppgifter med ett respektive tre rätta alternativ.
   Syftet är att antalet rätta svar inte ska gå att gissa sig till.
   ===================================================================== */

{
  id:"hi-kk-110", kap:1, omr:"kk_bedom",
  kriterier:["akthet"],
  familj:["akthet","bevisborda"], niva:"E",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Kensingtonstenen",
    typ:"Runinskrift, funnen 1898",
    akthet:"autentisk",
    text:`<p>Inskriften lyder i översättning ungefär:</p>
    <blockquote><p><em>Åtta götar och tjugotvå norrmän på upptäcktsfärd
    från Vinland västerut. Vi hade läger vid två skär en dagsresa norr om
    denna sten. Vi var ute och fiskade en dag. När vi kom hem fann vi tio
    man röda av blod och döda. Ave Maria, fräls från ondo.</em></p>
    <p><em>Har tio man vid havet att se efter våra skepp, fjorton dagsresor
    från denna ö. År 1362.</em></p></blockquote>`,
    om:`<p>Stenen hittades 1898 av en lantbrukare under en asp på hans
    mark utanför Kensington i Minnesota.</p>
    <p>Runologer har sedan dess pekat på att flera runformer och flera
    språkdrag i inskriften hör hemma i 1800-talets svenska och inte i
    1300-talets. Enstaka forskare har invänt mot den bedömningen.</p>
    <p>Nordbor nådde bevisligen Nordamerika omkring år 1000; en
    vikingatida boplats är utgrävd vid L'Anse aux Meadows på
    Newfoundland.</p>`,
    referens:"Kensingtonstenen, Runestone Museum, Alexandria, Minnesota. Översättningen återgiven i sammandrag."
  }],
  t:`<p class="fragan">Vilken bedömning av stenens äkthet är bäst
  underbyggd?</p>`,
  alternativ:[
    {txt:"Språkets och runornas former hör hemma i 1800-talet, och det väger tyngre än att en resa i sig vore tänkbar.",
     ratt:true,
     kommentar:"Äkthetsprövningen börjar i föremålet självt. Att innehållet <em>kunde</em> ha hänt säger ingenting om när texten höggs."},
    {txt:"Att nordbor bevisligen nådde Nordamerika omkring år 1000 styrker inskriftens äkthet.",
     ratt:false, miss:"mojlighet_som_belagg",
     kommentar:"Att något är möjligt är inte ett belägg för att det inträffade. L'Anse aux Meadows visar bara att resan inte var otänkbar."},
    {txt:"Att stenen låg nedgrävd under ett träd visar att den legat i marken mycket länge.",
     ratt:false, miss:"fyndomstandighet_overtolkad",
     kommentar:"Fyndomständigheter kan ordnas. Ett trädrotssystem daterar inte en inskrift — och rötter kan växa om en sten på få decennier."},
    {txt:"Stenen är en kvarleva, och kvarlevor kan inte vara förfalskade.",
     ratt:false, miss:"kvarleva_alltid_saker",
     kommentar:"En kvarleva kan mycket väl vara tillverkad för att lura. Att den är ett föremål och inte en berättelse hjälper inte."},
    {txt:"Eftersom ingen har kunnat bevisa att stenen är falsk bör den betraktas som äkta.",
     ratt:false, miss:"omvand_bevisborda",
     kommentar:"Bevisbördan ligger hos den som hävdar att fyndet är äkta. Frånvaro av motbevis är inte ett belägg."},
    {txt:"Att enstaka forskare invänt mot runologernas bedömning gör frågan alltför omstridd för att kunna avgöras.",
     ratt:false, miss:"oenighet_lika_med_oavgjort",
     kommentar:"Att någon är oense gör inte ett läge jämnt. Det avgörande är vem som kan bemöta invändningarna i sak."}
  ],
  s:`<p>Äkthet prövas i första hand på källan själv: skrift, språk,
  material, tillkomstsammanhang. Först därefter blir innehållet
  intressant.</p>
  <p>Notera skillnaden mellan <em>möjligt</em> och <em>belagt</em>. Den
  återkommer i nästan varje källkritisk diskussion.</p>`,
  ledtrad:"Vad i det här kan undersökas direkt, utan att man vet något om vad som hände 1362?"
},

{
  id:"hi-kk-111", kap:1, omr:"kk_jamfora",
  kriterier:["beroende"],
  familj:["tradering","ga_uppstroms"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Var kommer hornhjälmen ifrån?",
    typ:"Forskningsöversikt",
    akthet:"autentisk",
    text:`<p>Föreställningen att vikingar bar hjälmar med horn är spridd
    över hela världen. Följer man uppgiften bakåt ser kedjan ut så här:</p>
    <p><strong>I dag.</strong> Horn förekommer i filmer, maskeraddräkter,
    reklam och idrottspublik.</p>
    <p><strong>Sent 1800-tal.</strong> Nationalromantiska målare och
    illustratörer ger nordiska hjältar horn på hjälmarna. Kostymören till
    Wagners operacykel <em>Nibelungens ring</em> (uruppförd 1876) utrustar
    de germanska gestalterna med hornprydda hjälmar, och bilderna sprids
    vida.</p>
    <p><strong>Ännu tidigare.</strong> Hjälmar med horn finns faktiskt
    belagda i Nordeuropa — men från bronsåldern, alltså mer än tusen år
    före vikingatiden, och de förefaller ha använts i kult, inte i strid.</p>
    <p><strong>Vikingatiden själv.</strong> Av de mycket få bevarade
    vikingatida hjälmar som grävts fram har ingen horn. Inga samtida
    bildframställningar och inga samtida texter beskriver horn på
    stridshjälmar.</p>`,
    om:`<p>Uppgiften upprepas i populärkultur, i turistsouvenirer och i
    äldre skolböcker.</p>
    <p>Varje ny återgivning hänvisar i praktiken till den föregående, inte
    till något arkeologiskt fynd.</p>`,
    referens:"Sammanställning efter forskningsläget om vikingatida hjälmar. Använd den som övning, inte som enda underlag för en uppsats."
  }],
  t:`<p>En elev skriver att vikingarna bar hornhjälmar och anger tre
  populärvetenskapliga böcker som källa.</p>
  <p class="fragan">Vilka bedömningar av källäget är rimliga?</p>`,
  alternativ:[
    {txt:"De tre böckerna är inte tre oberoende belägg. Följer man uppgiften uppströms slutar den i 1800-talets bildkonst, inte i ett fynd.",
     ratt:true,
     kommentar:"Så gör man: fråga varje led var <em>det</em> har uppgiften ifrån, tills kedjan tar slut eller når ett original."},
    {txt:"Att uppgiften är mycket spridd är inget stöd för den. Spridning mäter hur ofta något upprepats, inte hur väl det är belagt.",
     ratt:true,
     kommentar:"Ett av de nyttigaste källkritiska greppen överhuvudtaget, långt utanför historieämnet."},
    {txt:"Hornhjälmar från andra tider i Nordeuropa stöder vikingapåståendet eftersom föremål från samma område kan överföras mellan perioder.",
     ratt:false, miss:"fel_period_som_belagg",
     kommentar:"Bronsålder och vikingatid skiljs åt av mer än tusen år. Rätt föremål, fel århundrade, är inget belägg."},
    {txt:"Avsaknaden av bevarade hornhjälmar bevisar att ingen viking någonsin bar en sådan hjälm i något sammanhang.",
     ratt:false, miss:"franvaro_som_slutgiltigt_bevis",
     kommentar:"Frånvaro av fynd är ett starkt skäl men inte ett definitivt bevis — särskilt när bevarade hjälmar är så få."},
    {txt:"Uppgiftens ursprung i opera och måleri visar att konstnärerna medvetet försökte lura sin historiska publik.",
     ratt:false, miss:"misstag_lika_med_bedrageri",
     kommentar:"En kostymör som vill ha dramatisk verkan bedrar ingen. Felet uppstod i konsten och vandrade sedan in i faktatexter."},
    {txt:"De populärvetenskapliga böckerna kan aldrig användas som källor eftersom bara vetenskapliga artiklar innehåller historiskt användbara uppgifter.",
     ratt:false, miss:"genre_som_diskvalificering",
     kommentar:"Genren avgör inte. En populärvetenskaplig bok med tydliga referenser kan vara utmärkt — frågan är alltid vad den stöder sig på."}
  ],
  s:`<p>Beroendekriteriet frågar inte hur många som säger samma sak, utan
  hur många av varandra oberoende iakttagelser som ligger bakom.</p>
  <p>Övningen heter <em>gå uppströms</em>: fråga varje led var det har
  uppgiften ifrån. Ibland tar kedjan slut i ett original. Ibland, som
  här, i en teaterkostym.</p>`
},

{
  id:"hi-kk-112", kap:1, omr:"kk_fraga",
  kriterier:["anvandbarhet","urval"],
  familj:["anvandbarhet","urvalsbias"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Bouppteckning efter en torpare",
    typ:"Bouppteckning, 1834",
    akthet:"konstruerad",
    text:`<p>Bouppteckning efter avlidne torparen Erik Jansson, upprättad
    i närvaro av änkan och två gode män.</p>
    <table>
      <tr><th>Post</th><th>Antal</th><th>Värde (rdr&nbsp;bco)</th></tr>
      <tr><td>Ko, äldre</td><td>1</td><td>12</td></tr>
      <tr><td>Får</td><td>3</td><td>4</td></tr>
      <tr><td>Järngryta</td><td>1</td><td>1</td></tr>
      <tr><td>Tennfat</td><td>2</td><td>2</td></tr>
      <tr><td>Yxa och lie</td><td>2</td><td>1</td></tr>
      <tr><td>Spinnrock</td><td>1</td><td>2</td></tr>
      <tr><td>Säng med halmbotten</td><td>1</td><td>1</td></tr>
      <tr><td>Psalmbok</td><td>1</td><td>—</td></tr>
      <tr><td>Bibel, sliten</td><td>1</td><td>—</td></tr>
      <tr><td><em>Avgår: skuld till handlanden</em></td><td></td><td><em>9</em></td></tr>
    </table>`,
    om:`<p>Bouppteckning upprättades efter dödsfall och listade den dödes
    tillhörigheter post för post med uppskattat värde, samt skulder.</p>
    <p>Bouppteckningar har upprättats i Sverige sedan 1700-talet och finns
    bevarade i mycket stora mängder. Hushåll helt utan egendom av värde
    saknas ofta i materialet.</p>`,
    referens:"Konstruerad källa, uppställd efter mönstret för svenska bouppteckningar från 1800-talets första hälft."
  }],
  t:`<p class="fragan">Vilka frågor kan det här slaget av material faktiskt
  besvara?</p>`,
  alternativ:[
    {txt:"Vilka föremål som fanns i hemmen, och hur det skilde sig mellan hushåll.",
     ratt:true,
     kommentar:"Det är precis vad handlingen registrerar, och den gör det systematiskt nog för att kunna jämföras."},
    {txt:"Hur hemmens innehåll förändrades över tid, eftersom samma slags handling upprättats under mycket lång tid.",
     ratt:true,
     kommentar:"Seriematerial är guld värt just för förändring över tid — formuläret är sig likt i århundraden."},
    {txt:"Skillnader mellan grupper, men med reservationen att de allra fattigaste ofta saknas i materialet.",
     ratt:true,
     kommentar:"Reservationen är poängen. Den som glömmer den läser välstånd där det bara finns ett snedvridet urval."},
    {txt:"Vad människor kände inför sina ägodelar och vilka föremål de höll kära.",
     ratt:false, miss:"kalla_overtolkad",
     kommentar:"Att bibeln är sliten är ett spår värt att notera — men det är en indikation, inte ett belägg för känslor."},
    {txt:"Hur hela befolkningen levde, eftersom bouppteckningar upprättades av myndighet och materialet därför är heltäckande.",
     ratt:false, miss:"myndighet_lika_med_heltackande",
     kommentar:"Myndighetsmaterial är inte automatiskt heltäckande. Här är just de fattigaste underrepresenterade."},
    {txt:"Hur ofta föremålen användes i vardagen.",
     ratt:false, miss:"kalla_overtolkad",
     kommentar:"Förteckningen visar förekomst, inte användning. En spinnrock i boet kan ha stått oanvänd i tjugo år."}
  ],
  s:`<p>Frågan ”är källan trovärdig?” är trubbig. Den skarpare frågan är
  <em>vad</em> källan kan bära: vad registrerade den som skrev, och vad
  registrerade han inte?</p>
  <p>Lägg märke till skuldposten. Ett bo kan se välförsett ut tills man
  läser sista raden.</p>`
},

{
  id:"hi-ok-210", kap:2, omr:"ok_typer",
  familj:["utlosande_vs_bakomliggande"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Den 28 juni 1914 sköts ärkehertig Franz Ferdinand i Sarajevo. Inom
  fem veckor var Europas stormakter i krig. Under de föregående decennierna
  hade alliansblocken vuxit fram, flottrustningen mellan Storbritannien och
  Tyskland pågått och rivaliteten på Balkan skärpts.</p>
  <p class="fragan">Vilken bedömning av orsakerna är hållbar?</p>`,
  alternativ:[
    {txt:"Attentatet var den utlösande faktorn: det satte julikrisen i rörelse, men skapade inte de motsättningar som gjorde ett storkrig möjligt.",
     ratt:true,
     kommentar:"Precis den distinktionen. Utlösande faktorer utlöser något som redan är laddat."},
    {txt:"Attentatet var krigets orsak — utan Gavrilo Princip hade kriget inte kommit.",
     ratt:false, miss:"utlosande_som_orsak",
     kommentar:"Då blir hela förklaringen beroende av ett skott. Motsättningarna fanns oavsett vem som stod på gatan den dagen."},
    {txt:"Allianssystemet var den utlösande faktorn, eftersom det drog in den ena stormakten efter den andra.",
     ratt:false, miss:"struktur_som_utlosande",
     kommentar:"Alliansen är en bakomliggande, långvarig struktur. Den fanns redan och utlöste ingenting i sig."},
    {txt:"Flottrustningen var en utlösande faktor eftersom den pågick ända fram till 1914.",
     ratt:false, miss:"struktur_som_utlosande",
     kommentar:"Något som pågår i decennier är en bakgrund. Det utlösande är det som inträffar och startar förloppet."},
    {txt:"Eftersom Österrike-Ungern förklarade krig först bär landet ensamt orsaksansvaret.",
     ratt:false, miss:"ansvar_lika_med_orsak",
     kommentar:"Ansvar och orsak är olika frågor. Den ena är moralisk, den andra förklarande."},
    {txt:"Skillnaden mellan bakomliggande och utlösande är godtycklig och tillför inget.",
     ratt:false, miss:"distinktion_avfardad",
     kommentar:"Den avgör vad man förklarar: varför kriget var möjligt, eller varför det bröt ut just då."}
  ],
  s:`<p>Bakomliggande orsaker förklarar varför något <em>kunde</em> hända.
  Utlösande faktorer förklarar varför det hände <em>just då</em>.</p>
  <p>Blandas de ihop får man antingen ett krig utan bakgrund eller en
  bakgrund utan startpunkt.</p>`
},

{
  id:"hi-as-310", kap:3, omr:"as_samspel",
  familj:["aktor_och_struktur","handlingsutrymme"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Den 1 december 1955 vägrade Rosa Parks lämna sin plats i en buss i
  Montgomery, Alabama, och greps. Bussbojkotten som följde varade i över ett
  år.</p>
  <div class="kalla">
    <div class="kall-topp">Bakgrund</div>
    <p>Parks var sekreterare i den lokala NAACP-avdelningen och hade samma år
    gått en kurs i organisering. Women's Political Council hade sedan tidigare
    förberett planer på en bussbojkott. Nio månader före Parks hade Claudette
    Colvin, 15 år, gripits för samma sak utan att någon bojkott följde.</p>
  </div>
  <p class="fragan">Vilka bedömningar av aktör och struktur är rimliga?</p>`,
  alternativ:[
    {txt:"Parks handling var ett verkligt val — hon kunde ha rest sig — och det valet avgjorde att förloppet startade just då.",
     ratt:true,
     kommentar:"Strukturer förklarar mycket, men inte allt. Någon måste sitta kvar."},
    {txt:"Handlingen fick genomslag därför att organisationer och nätverk redan fanns och kunde omsätta den i en bojkott.",
     ratt:true,
     kommentar:"Samma handling utan de nätverken hade sannolikt stannat vid ett gripande."},
    {txt:"Att Colvin gripits tidigare utan samma följd visar att en enskild handling inte i sig avgör vad som händer sedan.",
     ratt:true,
     kommentar:"Ett bra litet kontrafaktiskt test: samma handling, annat utfall, alltså kan handlingen inte ensam vara förklaringen."},
    {txt:"Parks var en trött sömmerska som spontant kom att göra historia.",
     ratt:false, miss:"aktor_som_slump",
     kommentar:"Den bilden är spridd men felaktig, och den osynliggör flera års organisering."},
    {txt:"Eftersom strukturerna och planerna redan fanns hade bojkotten kommit ändå, oavsett Parks.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Möjligen — men Colvin-fallet visar att det inte var givet. Strukturer gör saker möjliga, inte oundvikliga."},
    {txt:"Att Parks var organiserad visar att handlingen inte var hennes egen utan organisationens.",
     ratt:false, miss:"aktor_upplost_i_struktur",
     kommentar:"Att ha en organisation bakom sig tar inte ifrån någon valet. Hon fattade beslutet i bussen."}
  ],
  s:`<p>Aktör och struktur är inte två förklaringar att välja mellan utan två
  frågor som hör ihop: vilket handlingsutrymme fanns, och vad gjorde någon
  med det?</p>
  <p>Colvin-jämförelsen är det som gör fallet så användbart — den isolerar
  vad handlingen ensam kunde åstadkomma.</p>`
},

{
  id:"hi-fk-410", kap:4, omr:"fk_forandring_kontinuitet",
  familj:["forandring_och_kontinuitet","reformens_granser"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Folkskolestadgan och åren efter",
    typ:"Sammanställning, 1842 och framåt",
    akthet:"autentisk",
    text:`<p><strong>1842.</strong> Varje socken och stadsförsamling åläggs
    att inom fem år inrätta minst en skola med en godkänd lärare.</p>
    <p><strong>Åren efter.</strong> Många socknar löser kravet med
    flyttande skola, där läraren vandrar mellan byarna och undervisar några
    veckor i taget. Skolgången är kort och oregelbunden, och barnens arbete
    i jordbruket går före under sommarhalvåret.</p>
    <p><strong>Undervisningen.</strong> Kristendomskunskap står i centrum,
    och skolan står under kyrkoherdens tillsyn i församlingen. Katekesen
    och den heliga historien är fortsatt det som kunskap främst mäts i.</p>
    <p><strong>1878.</strong> En normalplan fastställer vad som ska läras
    ut och i vilken ordning, och skolgången blir efter hand mer likartad
    över landet.</p>`,
    om:`<p>Före 1842 fanns undervisning framför allt genom husförhören,
    där prästen kontrollerade läskunnighet och katekeskunskap hushåll för
    hushåll.</p>`,
    referens:"Sammanställning efter huvuddragen i 1842 års folkskolestadga och dess tillämpning."
  }],
  t:`<p class="fragan">Vilka bedömningar av förändring och kontinuitet är
  rimliga?</p>`,
  alternativ:[
    {txt:"Förändring: varje socken blev skyldig att ordna skola och anställa en godkänd lärare, även om undervisning fortfarande kunde ske på andra sätt.",
     ratt:true,
     kommentar:"Det offentliga ansvaret och kraven blev tydligare, men genomförandet varierade och hemundervisning försvann inte över en natt."},
    {txt:"Kontinuitet: innehållet förblev till stor del kyrkans, och det var fortfarande kristendomskunskap som kunskap främst mättes i.",
     ratt:true,
     kommentar:"Formen förändrades snabbare än innehållet. Så är det i de flesta skolreformer."},
    {txt:"Kontinuitet: barnens arbete gick fortsatt före skolgången under stora delar av året.",
     ratt:true,
     kommentar:"Stadgan kunde föreskriva en skola. Den kunde inte ersätta de händer jordbruket behövde i juli."},
    {txt:"Förändring: från 1842 gick i praktiken samtliga svenska barn i skola på ungefär samma sätt.",
     ratt:false, miss:"reform_overdriven",
     kommentar:"Långt ifrån. Flyttande skola och oregelbunden närvaro var vanligt i decennier, och normalplanen kom först 1878."},
    {txt:"Förändring: kyrkans inflytande över undervisningen upphörde i och med stadgan.",
     ratt:false, miss:"kontinuitet_felplacerad",
     kommentar:"Skolan låg kvar under församlingen och kyrkoherdens tillsyn. Det är just här kontinuiteten finns."},
    {txt:"Eftersom mycket bestod i praktiken var stadgan i huvudsak symbolisk.",
     ratt:false, miss:"kontinuitet_overdriven",
     kommentar:"Samma övertramp åt andra hållet. Stadgan skapade den struktur som gjorde 1878 och allt därefter möjligt."}
  ],
  s:`<p>Fråga alltid två saker om en reform: vad förändrades, och för vem
  förändrades ingenting?</p>
  <p>Svaret ligger nästan alltid mittemellan ”ett genombrott” och ”bara
  fasad”. Här: formen ändrades 1842, innehållet betydligt senare.</p>`
},

{
  id:"hi-hb-510", kap:5, omr:"hb_identifiera",
  familj:["identifiera_bruk"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En kommun namnger en ny gata efter en lokal arbetarledare från
  1910-talet. Vid invigningen håller kommunalrådet ett tal om vad hon
  kämpade för och varför det angår oss idag.</p>
  <p class="fragan">Hur beskrivs detta bäst?</p>`,
  alternativ:[
    {txt:"Det är politiskt och identitetsskapande historiebruk eftersom kommunen lyfter fram vissa gemensamma värden.",
     ratt:true,
     kommentar:"Det är kärnan i begreppet. Bruket ligger i användningen, inte i uppgifterna."},
    {txt:"Det är inte historiebruk eftersom uppgifterna om arbetarledaren är historiskt riktiga och kontrollerade.",
     ratt:false, miss:"sanning_utesluter_bruk",
     kommentar:"Sant och brukat är olika saker. Också korrekt historia kan användas för ett syfte."},
    {txt:"Det är vetenskapligt historiebruk eftersom kommunen har tagit reda på fakta om en historisk person.",
     ratt:false, miss:"faktakoll_lika_med_vetenskap",
     kommentar:"Att kontrollera uppgifter gör inte en invigning till forskning. Syftet är att hedra, inte att pröva en tes."},
    {txt:"Det är kommersiellt historiebruk eftersom ett uppmärksammat gatunamn kan göra området mer attraktivt.",
     ratt:false, miss:"fel_brukstyp",
     kommentar:"Möjlig bieffekt, men inte syftet med talet och namngivningen."},
    {txt:"Det är icke-bruk eftersom kommunen lämnar arbetarledarens historia orörd och blickar framåt.",
     ratt:false, miss:"ickebruk_missforstatt",
     kommentar:"Icke-bruk betyder att man medvetet låter bli att använda något ur det förflutna — inte att bruket är frivilligt att lägga märke till."},
    {txt:"Det är inte historiebruk eftersom gatunamnet och invigningstalet tillhör nutiden, inte det förflutna.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Jo. Så snart det förflutna tas i anspråk för ett syfte i nuet är det historiebruk."}
  ],
  s:`<p>Testfrågan är enkel: <em>används</em> en bild av det förflutna för
  något i nuet? Är svaret ja är det historiebruk — oavsett om bilden är
  korrekt, sympatisk eller harmlös.</p>`
},

{
  id:"hi-ha-610", kap:6, omr:"ha_belagg",
  familj:["fran_belagg_till_slutsats","overforing_mellan_omraden"], niva:"A",
  svarstyp:"alternativ",
  kallor:[{
    bet:"X",
    titel:"Historiker X om digerdödens dödlighet",
    typ:"Forskningssammandrag",
    akthet:"konstruerad",
    text:`<p>Engelska godsräkenskaper är ovanligt fylliga för åren kring
    1350. De redovisar godsens landbor namn för namn och noterar när en
    landbo avlidit och vem som övertagit bruket.</p>
    <p>Ur detta material har dödlighetstal på omkring en tredjedel
    beräknats. Eftersom pesten spreds på samma sätt i hela Nordvästeuropa
    finns ingen anledning att anta att Sverige skulle avvika påtagligt.
    Ett rimligt antagande är därför att omkring en tredjedel av
    befolkningen dog också här.</p>`,
    om:`<p>Sammandraget återger ett argument, inte ett citat ur en
    bestämd studie.</p>`,
    referens:"Konstruerad sammanfattning av en argumentationstyp som förekommer i forskningen om digerdöden."
  },{
    bet:"Y",
    titel:"Historiker Y om samma fråga",
    typ:"Forskningssammandrag",
    akthet:"konstruerad",
    text:`<p>Det svenska materialet från perioden består framför allt av
    ödegårdslistor och jordeböcker. De redovisar vilka gårdar som inte
    längre gav skatt eller avrad.</p>
    <p>En gård kunde läggas öde av flera skäl: brukaren dog, brukaren
    flyttade till bättre jord som blivit ledig, eller flera gårdar slogs
    samman. Materialet skiljer inte mellan dessa fall.</p>
    <p>Att räkna om ödegårdar till döda kräver därför ett antagande som
    materialet självt inte kan pröva. En siffra för riket bör inte anges
    med den precision som tredjedelen ger sken av.</p>`,
    om:`<p>Sammandraget återger ett argument, inte ett citat ur en
    bestämd studie.</p>`,
    referens:"Konstruerad sammanfattning av en argumentationstyp som förekommer i forskningen om digerdöden."
  }],
  t:`<p>Läs de båda argumenten.</p>
  <p class="fragan">Vilka bedömningar av oenigheten är rimliga?</p>`,
  alternativ:[
    {txt:"Oenigheten gäller inte sympatier eller moral, utan vad materialet kan bära.",
     ratt:true,
     kommentar:"De flesta verkliga historikerdebatter ser ut så. Det är också därför de går att komma vidare i."},
    {txt:"Y:s invändning är att ödelagd gård inte är detsamma som död brukare — steget från belägg till slutsats är inte självklart.",
     ratt:true,
     kommentar:"Just där ligger den. Belägget mäter något annat än det man vill veta."},
    {txt:"X:s överföring från engelskt material vilar på ett antagande om att förhållandena liknade varandra, och det antagandet måste prövas separat.",
     ratt:true,
     kommentar:"Analogier är tillåtna i historia, men de är ett led i argumentet och måste kunna granskas som ett sådant."},
    {txt:"Eftersom X har en siffra och Y inte har någon är X:s slutsats bättre underbyggd.",
     ratt:false, miss:"siffra_lika_med_belagg",
     kommentar:"En precis siffra kan vila på svagare grund än ett väl motiverat ”det vet vi inte”."},
    {txt:"Eftersom det engelska materialet är fylligare än det svenska bör den engelska siffran gälla tills bättre svenskt material hittas.",
     ratt:false, miss:"battre_material_annanstans",
     kommentar:"Ett bra mått på ett annat område är fortfarande ett mått på det området. Kvaliteten överförs inte med siffran."},
    {txt:"Y hävdar att digerdöden inte drabbade Sverige särskilt hårt.",
     ratt:false, miss:"invandning_missforstadd",
     kommentar:"Y säger inget om hur hårt — bara att just det här materialet inte kan avgöra saken."}
  ],
  s:`<p>Ett historiskt argument har tre led: belägget, slutsatsen och
  steget däremellan. Nästan all verklig oenighet gäller det tredje.</p>
  <p>Fråga därför alltid: vad mäter belägget egentligen, och vad vill
  historikern att det ska visa?</p>`
},

{
  id:"hi-kk-113", kap:1, omr:"kk_grunder",
  kriterier:["akthet"],
  familj:["akthet","materialets_datering"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Ett brev dyker upp på en auktion. Säljaren uppger att det skrevs
  1587. Brevet är skrivet på papper med ett vattenmärke som pappersbruken
  började använda först på 1870-talet.</p>
  <p class="fragan">Vilken slutsats är hållbar?</p>`,
  alternativ:[
    {txt:"Vattenmärket ger en tidigaste möjliga tillkomsttid: brevet kan inte vara äldre än pappret det är skrivet på.",
     ratt:true,
     kommentar:"Materialet sätter en undre gräns. Det är ofta det snabbaste sättet att avgöra äkthet."},
    {txt:"Att innehållet stämmer med kända händelser 1587 gör brevet äkta.",
     ratt:false, miss:"innehall_som_akthetsbevis",
     kommentar:"En förfalskare läser också historia. Att uppgifterna stämmer är precis vad man ska vänta sig av ett skickligt falsarium."},
    {txt:"Handstilen ser gammaldags ut, vilket talar för att brevet är äkta.",
     ratt:false, miss:"utseende_som_belagg",
     kommentar:"Handstil går att härma. Papper och bläck går inte att göra äldre än de är."},
    {txt:"Eftersom säljaren uppger ett årtal bör det gälla tills motsatsen bevisats.",
     ratt:false, miss:"omvand_bevisborda",
     kommentar:"Den som hävdar att något är äkta bär bevisbördan — särskilt när pengar står på spel."},
    {txt:"Brevet är värdelöst och bör kastas.",
     ratt:false, miss:"falsarium_utan_varde",
     kommentar:"Ett falsarium är en utmärkt källa till en annan fråga: vem ville 1870-talet få oss att tro något om 1587, och varför?"},
    {txt:"Frågan kan inte avgöras eftersom ingen levde 1587 som kan intyga något.",
     ratt:false, miss:"krav_pa_ogonvittne",
     kommentar:"Föremålet själv vittnar. Det är hela poängen med att undersöka material."}
  ],
  s:`<p>Äkthet prövas först på föremålet: papper, bläck, skrift, format.
  Materialet kan inte vara yngre än dokumentet.</p>`
},

{
  id:"hi-kk-114", kap:1, omr:"kk_grunder",
  kriterier:["akthet","anvandbarhet"],
  familj:["akthet_vs_sanning"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>På ett arkiv ligger en affisch från 1942. Den är otvivelaktigt
  tryckt 1942 och har legat i arkivet sedan dess. På affischen står att
  ransoneringen inte påverkar tillgången på mat.</p>
  <p class="fragan">Vilka bedömningar är rimliga?</p>`,
  alternativ:[
    {txt:"Affischen är äkta som föremål, men påståendet på den måste prövas för sig.",
     ratt:true,
     kommentar:"Äkthet och sanning är två olika frågor. Ett äkta dokument kan innehålla vad som helst."},
    {txt:"Affischen är en utmärkt källa till vad myndigheterna ville att befolkningen skulle tro 1942.",
     ratt:true,
     kommentar:"Byt fråga, så byter källan värde. Som kvarleva av informationspolitik är den förstklassig."},
    {txt:"Eftersom affischen bevisligen är från 1942 är uppgifterna på den tillförlitliga.",
     ratt:false, miss:"akthet_lika_med_sanning",
     kommentar:"Det vanligaste feltänket i hela kapitlet. Äkta betyder att den är vad den utger sig för — inte att den talar sanning."},
    {txt:"Eftersom påståendet är osant är affischen en förfalskning.",
     ratt:false, miss:"logn_lika_med_forfalskning",
     kommentar:"En förfalskning ljuger om <em>sitt eget ursprung</em>. Den här affischen ljuger om maten, vilket är något annat."},
    {txt:"Affischen saknar värde eftersom den är propaganda.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Propaganda är ett av de mest givande källmaterial som finns — för rätt fråga."},
    {txt:"Att affischen legat i arkivet sedan 1942 gör innehållet kontrollerat.",
     ratt:false, miss:"arkiv_lika_med_granskning",
     kommentar:"Arkivet bevarar, det granskar inte. Ingen har läst affischen och intygat att den stämmer."}
  ],
  s:`<p>Håll isär tre frågor: <em>Är källan vad den utger sig för?</em>
  (äkthet), <em>Stämmer det som står?</em> (tillförlitlighet), och
  <em>Vad kan jag använda den till?</em> (användbarhet).</p>`
},

{
  id:"hi-kk-115", kap:1, omr:"kk_grunder",
  kriterier:["narhet"],
  familj:["narhet_i_tid"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En historiker undersöker vad som hände under en strejk 1909 och
  har två källor om samma dag:</p>
  <p><strong>A.</strong> En anteckning i en strejkandes almanacka,
  skriven samma kväll.<br>
  <strong>B.</strong> En memoar av samma person, utgiven 1951.</p>
  <p class="fragan">Vilka bedömningar av närhet i tid är rimliga?</p>`,
  alternativ:[
    {txt:"A står närmare händelsen och är mindre påverkad av vad som hände sedan.",
     ratt:true,
     kommentar:"Fyrtiotvå år är gott om tid för minnet att sortera om, och för utgången att färga berättelsen."},
    {txt:"B kan ändå vara värdefull — författaren kan ha överblick och sammanhang som saknades i stunden.",
     ratt:true,
     kommentar:"Närhet i tid är ett av flera kriterier, inte ett rangordningssystem. Avstånd ger också något."},
    {txt:"Eftersom A och B har samma upphovsperson är de två oberoende källor.",
     ratt:false, miss:"beroende_forbisett",
     kommentar:"Samma person, samma minne. Om de säger samma sak är det ingen bekräftelse."},
    {txt:"B är säkrare eftersom författaren hunnit tänka igenom saken.",
     ratt:false, miss:"eftertanke_som_tillforlitlighet",
     kommentar:"Eftertanke kan lika gärna innebära efterhandskonstruktion. Det som stämmer med hur det gick blir lättare att minnas."},
    {txt:"A är helt tillförlitlig eftersom den skrevs samma kväll.",
     ratt:false, miss:"samtida_lika_med_tillforlitlig",
     kommentar:"Samtidighet gör källan närmare, inte automatiskt riktig. Den som var mitt i ett tumult ser bara sin del av det."},
    {txt:"B är en sekundärkälla eftersom den skrevs långt efteråt.",
     ratt:false, miss:"tid_avgor_primar_sekundar",
     kommentar:"Den som själv var med är förstahandskälla även fyrtio år senare. Avståndet är ett annat problem än kategorin."}
  ],
  s:`<p>Närhet i tid är ett skäl att lita mer på en uppgift — inte en
  garanti, och inte en rangordning.</p>
  <p>Och tidsavstånd byter aldrig en förstahandskälla till en
  andrahandskälla. Det är två skilda frågor.</p>`
},

{
  id:"hi-kk-116", kap:1, omr:"kk_grunder",
  kriterier:["narhet"],
  familj:["narhet_i_rum"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Under Krimkriget skrev flera europeiska tidningar utförliga
  reportage om striderna. En av dem hade en korrespondent på plats vid
  fronten. En annan skrev sina artiklar i London utifrån inkomna telegram
  och brev.</p>
  <p class="fragan">Vilka bedömningar av närhet i rum är rimliga?</p>`,
  alternativ:[
    {txt:"Korrespondenten på plats kan ha sett saker ingen annan kunde se, men bara från sin egen position i ett stort skeende.",
     ratt:true,
     kommentar:"Närhet i rum ger tillgång — och begränsad utsikt. Den som ligger i ett dike ser inte slaget."},
    {txt:"Skribenten i London arbetar med andrahandsuppgifter och står och faller med vad telegrammen innehöll.",
     ratt:true,
     kommentar:"Avstånd i rum betyder att någon annan gjort iakttagelsen åt en."},
    {txt:"Londonartiklarna kan ändå vara bättre på överblick, eftersom skribenten fick in uppgifter från flera håll.",
     ratt:true,
     kommentar:"Precis som med tid: avstånd kostar detaljer men kan ge sammanhang."},
    {txt:"Korrespondentens närvaro vid fronten gör hela reportaget tillförlitligt eftersom han själv kunde iaktta krigets alla delar.",
     ratt:false, miss:"narvaro_lika_med_tillforlitlig",
     kommentar:"Att vara där löser inte tendens, urval eller begränsad överblick. Han skrev dessutom för en läsekrets hemma."},
    {txt:"Londonartiklarna är förfalskningar eftersom skribenten skrev om strider som han inte själv hade sett på plats.",
     ratt:false, miss:"andrahands_lika_med_falskt",
     kommentar:"Andrahandsuppgifter är inte påhitt. De flesta historiska uppgifter vi har är just andrahandsuppgifter."},
    {txt:"Närhet i rum saknar betydelse eftersom samtidigheten gör både korrespondentens och Londonskribentens uppgifter lika säkra.",
     ratt:false, miss:"rum_forvaxlat_med_tid",
     kommentar:"Tid och rum är två skilda kriterier. Man kan vara samtida och ändå hundra mil bort."}
  ],
  s:`<p>Fråga alltid två saker: hur långt i tid, och hur långt i rum?</p>
  <p>Den som var närmast har den skarpaste bilden av en liten del. Den som
  satt längst bort kan ha den enda överblicken.</p>`
},

{
  id:"hi-kk-117", kap:1, omr:"kk_grunder",
  kriterier:["narhet","tendens"],
  familj:["narhet_i_rum","tendens_syfte"], niva:"E",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Tacitus om germanerna",
    typ:"Etnografiskt verk, latin, ca 98 e.Kr.",
    akthet:"autentisk",
    text:`<p>Folken i Germanien har enligt min mening aldrig blandat sig
    med andra genom giftermål, utan utgör en egen, oblandad och endast sig
    själv lik stam.</p>
    <p>Äktenskapet hålls strängt bland dem. Ingenting i deras seder är
    mer värt beröm. Ty nästan ensamma bland barbarerna nöjer de sig med en
    hustru var.</p>
    <p>Ingen skrattar där åt lasterna, och att förleda och låta sig
    förledas kallas icke tidens sed. Goda seder betyder där mer än goda
    lagar annorstädes.</p>
    <p>De håller det för lättja och feghet att med svett förvärva vad man
    kan vinna med blod.</p>`,
    om:`<p>Tacitus var romersk senator och historiker. Han skrev
    <em>Germania</em> omkring år 98 och hade så vitt känt aldrig varit i
    Germanien. Han byggde på äldre romerska skrifter, på handelsmäns och
    soldaters berättelser.</p>
    <p>Verket skrevs för en romersk publik under en period då romerska
    författare ofta beklagade sedernas förfall i Rom.</p>`,
    referens:"Tacitus, Germania. Sammandrag i modern svensk översättning; inte ordagrant citat."
  }],
  t:`<p class="fragan">Vilka källkritiska problem är relevanta för den som
  vill veta hur germanska folk faktiskt levde?</p>`,
  alternativ:[
    {txt:"Tacitus var aldrig på plats. Uppgifterna är andrahandsuppgifter, förmedlade av handelsmän och soldater.",
     ratt:true,
     kommentar:"Avstånd i rum. Ingen av iakttagelserna är hans egna."},
    {txt:"Beröm av främlingars stränga seder kan vara riktat mot den egna publiken snarare än mot germanerna.",
     ratt:true,
     kommentar:"Ett vanligt grepp i romersk litteratur: den dygdige barbaren som spegel för det egna förfallet."},
    {txt:"Att Tacitus var romare gör honom till ett neutralt vittne, eftersom han inte hade del i germanska stridigheter.",
     ratt:false, miss:"utanforskap_lika_med_neutralitet",
     kommentar:"Att komma utifrån är inte att sakna intressen. Rom förde krig mot dessa folk."},
    {txt:"Att texten är två tusen år gammal gör den oanvändbar för dagens forskning.",
     ratt:false, miss:"alder_som_diskvalificering",
     kommentar:"Ålder är inget fel i sig. Germania är en av de viktigaste texterna vi har om järnålderns Nordeuropa."},
    {txt:"Eftersom Tacitus var senator och välutbildad hade han tillgång till säkrare uppgifter än andra.",
     ratt:false, miss:"auktoritet_som_belagg",
     kommentar:"Ställning ger tillgång till fler berättelser, inte till bättre. Han kunde inte kontrollera dem heller."},
    {txt:"Texten kan inte användas till någonting alls om germanska folk.",
     ratt:false, miss:"kalla_helt_avfardad",
     kommentar:"För vissa frågor duger den inte. För andra — romersk syn på Norden, vilka uppgifter som cirkulerade — är den oöverträffad."}
  ],
  s:`<p>Två problem faller samman: avstånd i rum och ett syfte som inte
  handlar om germanerna.</p>
  <p>Men källan blir inte tom. Den är förstklassig för frågan <em>hur såg
  romare på folken norr om gränsen?</em></p>`
},

{
  id:"hi-kk-118", kap:1, omr:"kk_grunder",
  kriterier:["beroende"],
  familj:["beroende","ga_uppstroms"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En elev skriver att en svensk kung dog av förgiftning och anger
  fyra webbsidor som källa. Tre av dem har hämtat uppgiften från den
  fjärde, som i sin tur inte anger var den fått den ifrån.</p>
  <p class="fragan">Vilka slutsatser är rimliga?</p>`,
  alternativ:[
    {txt:"Eleven har i praktiken en källa, inte fyra.",
     ratt:true,
     kommentar:"Beroendekriteriet räknar oberoende iakttagelser, inte webbsidor."},
    {txt:"Att uppgiften finns på flera ställen säger ingenting om hur väl den är belagd.",
     ratt:true,
     kommentar:"Spridning mäter upprepning. Det är ett av de nyttigaste greppen du kan ta med dig ut från historieämnet."},
    {txt:"Eftersom fyra sidor säger samma sak är uppgiften bekräftad fyra gånger.",
     ratt:false, miss:"beroende_forbisett",
     kommentar:"Bara om de fyra hade kommit fram till det oberoende av varandra. Här har tre kopierat den fjärde."},
    {txt:"Den fjärde sidan är förstahandskälla eftersom de andra hänvisar till den.",
     ratt:false, miss:"forsta_ledet_lika_med_forstahands",
     kommentar:"Att stå först i en kedja av kopior gör ingen till ögonvittne. Sidan är bara den äldsta kopian vi hittat."},
    {txt:"Uppgiften kan avfärdas direkt eftersom den saknar angiven källa.",
     ratt:false, miss:"ej_belagt_lika_med_falskt",
     kommentar:"Obelagt betyder obelagt, inte osant. Nästa steg är att leta i forskningen, inte att avskriva påståendet."},
    {txt:"Eftersom webbsidor kan ändras går det inte att använda dem i historia.",
     ratt:false, miss:"genre_som_diskvalificering",
     kommentar:"Formen är inte problemet. Samma kedja kan lika gärna bestå av tryckta böcker."}
  ],
  s:`<p>Gå uppströms: fråga varje led var <em>det</em> har uppgiften ifrån.
  Kedjan slutar antingen i ett original eller i tomma intet.</p>`
},

{
  id:"hi-kk-119", kap:1, omr:"kk_grunder",
  kriterier:["beroende"],
  familj:["beroende","oberoende_bekraftelse"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En historiker vill kontrollera uppgiften att en brand förstörde
  rådhuset i en stad år 1734. Hon hittar fyra källor.</p>
  <p><strong>1.</strong> Stadens räkenskaper 1735, med en post för
  återuppbyggnad.<br>
  <strong>2.</strong> Ett brev från en handlande i staden, skrivet
  1734.<br>
  <strong>3.</strong> En lokalhistorisk bok från 1890 som hänvisar till
  brevet.<br>
  <strong>4.</strong> En artikel från 1985 som hänvisar till boken från
  1890.</p>
  <p class="fragan">Vilka av källorna ger oberoende stöd?</p>`,
  alternativ:[
    {txt:"Räkenskaperna (1) — de har uppstått ur stadens egen förvaltning, oberoende av brevet.",
     ratt:true,
     kommentar:"Två skilda upphov som pekar åt samma håll. Det är riktig bekräftelse."},
    {txt:"Brevet (2) — det är en samtida iakttagelse av en person i staden.",
     ratt:true,
     kommentar:"Förstahandsuppgift, och upphov till en av de två kedjorna."},
    {txt:"Boken från 1890 (3) tillför inget eget stöd, eftersom den bygger på brevet.",
     ratt:true,
     kommentar:"Den är ett led i kedjan från brevet, inte en ny iakttagelse."},
    {txt:"Artikeln från 1985 (4) stärker uppgiften eftersom den är den senaste forskningen.",
     ratt:false, miss:"senast_lika_med_bast",
     kommentar:"Den står tredje ledet från brevet. Nyare betyder inte närmare."},
    {txt:"Alla fyra stärker uppgiften, eftersom ingen av dem säger emot den.",
     ratt:false, miss:"beroende_forbisett",
     kommentar:"Två av dem kan inte säga emot — de återger den första."},
    {txt:"Räkenskaperna är svagast eftersom de inte nämner branden i ord.",
     ratt:false, miss:"indirekt_belagg_underskattat",
     kommentar:"Ett indirekt spår kan vara starkare än ett direkt påstående, just för att ingen skrev in det för att övertyga någon."}
  ],
  s:`<p>Rita kedjan innan du räknar källor. Här finns fyra texter men bara
  två oberoende upphov: stadens räkenskaper och handlandens brev.</p>`
},

{
  id:"hi-kk-120", kap:1, omr:"kk_grunder",
  kriterier:["beroende"],
  familj:["tradering","siffror_utan_ursprung"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>I en lärobok står att 8 000 personer dog i en belägring på
  1600-talet. Siffran återkommer i flera andra läroböcker. Ingen av dem
  anger varifrån den kommer. I forskningslitteraturen visar det sig att
  talet första gången nämns i en stridsskrift utgiven av den segrande
  sidan kort efter belägringen.</p>
  <p class="fragan">Vilka bedömningar är rimliga?</p>`,
  alternativ:[
    {txt:"Siffran har ett ursprung med tydligt intresse i saken, och bör inte användas utan reservation.",
     ratt:true,
     kommentar:"Segrarens stridsskrift är ungefär den minst oberoende källa som går att tänka sig för en förlustsiffra."},
    {txt:"Att siffran återkommer i många läroböcker gör den inte bättre belagd.",
     ratt:true,
     kommentar:"Läroböcker skriver ofta av varandra. Antalet omtryckningar är inte ett mått på belägg."},
    {txt:"Eftersom siffran är exakt måste någon ha räknat.",
     ratt:false, miss:"precision_som_belagg",
     kommentar:"Precision är ofta ett retoriskt grepp. Runda tal låter uppskattade, exakta tal låter uppmätta."},
    {txt:"Läroböckerna är oberoende källor eftersom de är skrivna av olika författare.",
     ratt:false, miss:"olika_forfattare_lika_med_oberoende",
     kommentar:"Olika författare kan mycket väl ha kopierat samma uppgift. Oberoende gäller uppgiftens väg, inte pennan."},
    {txt:"Siffran bör strykas eftersom den kommer från en part i konflikten.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Den bör redovisas med sitt ursprung, inte tystas. Läsaren ska kunna väga den själv."},
    {txt:"Eftersom ingen modern forskare har räknat om är den ursprungliga siffran den bästa vi har.",
     ratt:false, miss:"enda_uppgift_lika_med_basta",
     kommentar:"Den enda uppgiften kan vara en dålig uppgift. Ibland är rätt svar ett intervall eller ett ”vi vet inte”."}
  ],
  s:`<p>När du möter en siffra: fråga vem som räknade, när, och med vilket
  intresse.</p>
  <p>Läroböckernas samstämmighet är oftast ett spår av avskrift, inte av
  oberoende kontroll.</p>`
},

{
  id:"hi-kk-121", kap:1, omr:"kk_grunder",
  kriterier:["tendens","anvandbarhet"],
  familj:["tendens_identifiera"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En historiker undersöker bostadsförhållandena i en svensk stad på
  1930-talet och har hittat en valaffisch från ett av partierna. På
  affischen syns en trång och mörk källarlägenhet, och texten lovar att
  partiet ska bygga bort bostadsnöden.</p>
  <p class="fragan">Vilka bedömningar av affischen är rimliga?</p>`,
  alternativ:[
    {txt:"Affischen har en tydlig tendens: den ska vinna röster, och väljer därför den mörkaste bilden.",
     ratt:true,
     kommentar:"Syftet styr urvalet. Ingen valaffisch visar det genomsnittliga."},
    {txt:"Affischen visar att bostadsnöd fanns som politisk fråga och ansågs kunna vinna röster.",
     ratt:true,
     kommentar:"Ett parti driver inte frågor som väljarna inte känner igen. Det i sig är en historisk uppgift."},
    {txt:"Affischen kan inte användas för att avgöra hur vanliga sådana lägenheter var.",
     ratt:true,
     kommentar:"Till den frågan behövs bostadsräkningar eller hälsovårdsnämndens material."},
    {txt:"Eftersom affischen är propaganda saknar den värde som historisk källa.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Propaganda är förstklassigt material — för frågor om vad man ville uppnå och vad man trodde gick hem."},
    {txt:"Eftersom lägenheten på bilden fanns i verkligheten är affischens budskap sakligt riktigt.",
     ratt:false, miss:"enskilt_fall_som_belagg",
     kommentar:"Ett verkligt exempel säger inget om hur representativt det är. Tendensen ligger i urvalet, inte i påhitt."},
    {txt:"Affischen är en andrahandskälla eftersom den bygger på andras uppgifter om bostäderna.",
     ratt:false, miss:"primar_sekundar_forvaxlat",
     kommentar:"Som kvarleva av valrörelsen är den en förstahandskälla. Den <em>är</em> det den handlar om."}
  ],
  s:`<p>Tendens betyder att källan har ett intresse i saken. Det gör den
  inte oanvändbar — det avgör vad den kan användas till.</p>
  <p>Ofta ligger tendensen i urvalet snarare än i osanningar.</p>`
},

{
  id:"hi-kk-122", kap:1, omr:"kk_grunder",
  kriterier:["anvandbarhet"],
  familj:["anvandbarhet_vs_fraga"], niva:"E",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Matsedel vid ett lasarett",
    typ:"Institutionshandling, 1893",
    akthet:"konstruerad",
    text:`<p><strong>Spisordning för vecka 14</strong></p>
    <table>
      <tr><th>Dag</th><th>Middag</th><th>Kväll</th></tr>
      <tr><td>Måndag</td><td>Ärtsoppa, bröd</td><td>Mjölk, bröd</td></tr>
      <tr><td>Tisdag</td><td>Kokt sill, potatis</td><td>Gröt</td></tr>
      <tr><td>Onsdag</td><td>Köttsoppa med rotfrukter</td><td>Mjölk, bröd</td></tr>
      <tr><td>Torsdag</td><td>Ärtsoppa, bröd</td><td>Gröt</td></tr>
      <tr><td>Fredag</td><td>Kokt sill, potatis</td><td>Mjölk, bröd</td></tr>
      <tr><td>Lördag</td><td>Kålsoppa</td><td>Gröt</td></tr>
      <tr><td>Söndag</td><td>Stek, potatis, saftsoppa</td><td>Mjölk, bröd</td></tr>
    </table>
    <p><em>Anm. För svaga patienter utbytes middagen mot buljong och
    ägg efter läkares ordination.</em></p>`,
    om:`<p>Spisordningen fastställdes av lasarettsdirektionen och anslogs i
    köket. Den anger vad som skulle lagas, inte vad som faktiskt
    serverades eller åts upp.</p>`,
    referens:"Konstruerad källa, uppställd efter mönstret för svenska lasaretts spisordningar vid slutet av 1800-talet."
  }],
  t:`<p class="fragan">Vad kan källan användas till?</p>`,
  alternativ:[
    {txt:"Att undersöka vad en institution ansåg vara lämplig kost för sjuka på 1890-talet.",
     ratt:true,
     kommentar:"Det är precis vad handlingen är: ett normdokument. Söndagssteken och veckans rytm säger något om värderingar."},
    {txt:"Att se vilka livsmedel som var tillgängliga och billiga nog för en institution att räkna med året runt.",
     ratt:true,
     kommentar:"Sill, potatis, ärter och gröt — en sammanställning som visar vad som fanns att tillgå."},
    {txt:"Att avgöra exakt vad patienterna faktiskt fick serverat och hur mycket av maten de åt upp.",
     ratt:false, miss:"norm_forvaxlad_med_praktik",
     kommentar:"Källan säger vad som skulle lagas. Vad som hamnade på tallriken, och hur mycket som åts upp, står inte där."},
    {txt:"Att fastställa hur hela den svenska befolkningen åt på 1890-talet eftersom lasarettets kost var representativ.",
     ratt:false, miss:"enskild_kalla_for_stor_fraga",
     kommentar:"Ett lasarett är inte ett hushåll. Institutionskost skiljer sig från vad folk lagade hemma."},
    {txt:"Att beräkna patienternas verkliga näringsintag eftersom alla planerade rätter finns angivna dag för dag.",
     ratt:false, miss:"kalla_overtolkad",
     kommentar:"Inga portionsstorlekar anges. Utan mängder går ingen beräkning att göra."},
    {txt:"Att avstå från historisk analys eftersom vardagliga matsedlar inte innehåller betydelsefull information om samhället.",
     ratt:false, miss:"vardagskalla_underskattad",
     kommentar:"Vardagens handlingar är ofta de mest givande, just för att de skrevs utan tanke på eftervärlden."}
  ],
  s:`<p>Skilj på vad en källa <em>föreskriver</em> och vad som
  <em>skedde</em>. Regler, matsedlar och instruktioner beskriver avsikter,
  inte praktik.</p>`
},

{
  id:"hi-kk-123", kap:1, omr:"kk_grunder",
  kriterier:["anvandbarhet","urval"],
  familj:["anvandbarhet_vs_fraga","kartan_som_kalla"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En karta över en svensk provins ritades 1655 på uppdrag av kronan.
  Vägar, gårdar, kyrkor och gränser är utsatta. Kustlinjen är på flera
  ställen felaktig jämfört med hur vi vet att den såg ut, och
  avstånden i inlandet är kraftigt förvrängda.</p>
  <p class="fragan">Vad kan kartan användas till?</p>`,
  alternativ:[
    {txt:"Att ta reda på vilka orter och gårdar som fanns och vad de hette 1655.",
     ratt:true,
     kommentar:"Namnen och bebyggelsen är det kartritaren hade bäst underlag för, eftersom kronan behövde veta var skatten fanns."},
    {txt:"Att se vad kronan ansåg viktigt att veta om provinsen — vad som mättes in och vad som lämnades tomt.",
     ratt:true,
     kommentar:"Ett av de skarpaste sätten att läsa en karta. Det tomma utrymmet är också information."},
    {txt:"Att navigera säkert längs provinsens kust eftersom kartan framställdes på uppdrag av den svenska kronan.",
     ratt:false, miss:"kalla_utanfor_sitt_omrade",
     kommentar:"Kustlinjen är ju just det som visade sig felaktigt. En sjökarta hade ritats med helt andra krav."},
    {txt:"Att mäta de verkliga avstånden mellan orterna eftersom alla viktiga gårdar och vägar finns markerade.",
     ratt:false, miss:"kalla_overtolkad",
     kommentar:"Avstånden är förvrängda. Att en karta ser ut att kunna mätas betyder inte att den tål det."},
    {txt:"Att avstå från all historisk användning eftersom den felaktiga kustlinjen gör hela kartan otillförlitlig.",
     ratt:false, miss:"fel_lika_med_vardelos",
     kommentar:"Nästan alla källor innehåller fel. Frågan är var felen sitter och om de rör det du vill veta."},
    {txt:"Att avgöra provinsens befolkning eftersom varje markerad gård motsvarar ett känt och lika stort hushåll.",
     ratt:false, miss:"fel_kalla_for_fragan",
     kommentar:"Kartan visar gårdar, inte hushållsstorlek. Till befolkningsfrågan behövs mantalslängder."}
  ],
  s:`<p>En källa som är opålitlig i ett avseende kan vara utmärkt i ett
  annat. Lokalisera felet innan du avfärdar helheten.</p>
  <p>Och läs alltid en karta två gånger: en gång för vad som finns där, en
  gång för vad som saknas.</p>`
},

{
  id:"hi-ok-211", kap:2, omr:"ok_kedjor",
  familj:["samverkande_orsaker"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Ett sågverk i Norrland lades ner 1927. Bakgrunden var flera saker
  samtidigt: priset på sågade trävaror hade fallit på världsmarknaden,
  bolagets maskiner var slitna och omoderna, och en ny ångsåg längre ner
  vid älven kunde leverera billigare.</p>
  <p class="fragan">Vilka påståenden om orsakerna är rimliga?</p>`,
  alternativ:[
    {txt:"Nedläggningen har flera orsaker som förstärker varandra, och ingen av dem behöver väljas bort för att de andra ska gälla.",
     ratt:true,
     kommentar:"Orsaker konkurrerar inte om en enda plats. Det är kanske det viktigaste du tar med dig ur kapitlet."},
    {txt:"Prisfallet gjorde läget svårt för hela branschen; de slitna maskinerna förklarar varför just det här sågverket klarade sig sämre.",
     ratt:true,
     kommentar:"Bra uppdelning: en allmän orsak förklarar branschen, en särskild orsak förklarar det enskilda fallet."},
    {txt:"Endast prisfallet är en verklig orsak, eftersom de andra två är interna problem.",
     ratt:false, miss:"monokausalitet",
     kommentar:"Interna problem är också orsaker. De avgör vem som tål ett prisfall och vem som inte gör det."},
    {txt:"Eftersom konkurrenten byggdes samma decennium är konkurrensen orsak till prisfallet.",
     ratt:false, miss:"samtidighet_som_orsak",
     kommentar:"Två saker i samma decennium behöver inte höra ihop. Världsmarknadspriset sattes inte vid älven."},
    {txt:"Eftersom flera orsaker samverkade går det inte att säga något om vilken som vägde tyngst.",
     ratt:false, miss:"vagning_uppgiven",
     kommentar:"Jo. Att väga orsaker är en stor del av arbetet — ”allt spelade in” är där man börjar, inte där man slutar."},
    {txt:"Den verkliga orsaken är den som ligger närmast i tid, alltså konkurrentens etablering.",
     ratt:false, miss:"narhet_i_tid_som_orsaksstyrka",
     kommentar:"Närhet i tid gör en faktor utlösande, inte viktigast."}
  ],
  s:`<p>Historiska förlopp har som regel flera orsaker. Uppgiften är inte
  att välja en, utan att visa hur de hänger ihop och väga dem mot
  varandra.</p>`
},

{
  id:"hi-ok-212", kap:2, omr:"ok_kedjor",
  familj:["samverkande_orsaker","motiv_vs_forklaring"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En elev skriver: ”Den enda verkliga orsaken till att Gustav Vasa
  genomförde reformationen var att han behövde pengar. Allt religiöst prat
  var bara svepskäl.”</p>
  <p class="fragan">Vilka invändningar mot resonemanget är rimliga?</p>`,
  alternativ:[
    {txt:"Att en aktör tjänar på ett beslut visar inte att de andra skälen var påhittade.",
     ratt:true,
     kommentar:"Vinning och övertygelse utesluter inte varandra. De sammanfaller ofta — det är just därför beslut blir av."},
    {txt:"Formuleringen ”den enda verkliga orsaken” utesluter på förhand allt som resonemanget skulle behöva pröva.",
     ratt:true,
     kommentar:"Ett påstående som inte kan motsägas av något material är inte en förklaring utan en ståndpunkt."},
    {txt:"Att peka på någons motiv är inte samma sak som att bemöta hans argument.",
     ratt:true,
     kommentar:"Det gäller i historia och överallt annars. Motivet kan vara intressant och argumentet ändå hålla."},
    {txt:"Invändningen faller, eftersom vi inte kan veta vad Gustav Vasa tänkte inombords.",
     ratt:false, miss:"otillganglig_inre_varld",
     kommentar:"Historiker arbetar med handlingar, beslut och dokument — inte med bekännelser. Annars gick ingen historia att skriva."},
    {txt:"Eleven har rätt, eftersom ekonomiska orsaker alltid är de grundläggande.",
     ratt:false, miss:"forklaringsmodell_som_facit",
     kommentar:"Att på förhand bestämma vilken sorts orsak som väger tyngst är att sluta undersöka."},
    {txt:"Eleven har rätt, eftersom kyrkans egendom faktiskt drogs in till kronan.",
     ratt:false, miss:"utfall_som_motivbevis",
     kommentar:"Vad som blev följden bevisar inte vad som var avsikten. Det är två skilda frågor."}
  ],
  s:`<p>Var uppmärksam på ord som <em>enda</em>, <em>egentligen</em> och
  <em>bara</em> i orsaksresonemang. De gör påståendet omöjligt att pröva.</p>`
},

{
  id:"hi-ok-213", kap:2, omr:"ok_kedjor",
  familj:["push_och_pull","samverkande_orsaker"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Historiker brukar dela in orsakerna till utvandringen från Sverige
  i <em>push</em> — sådant som drev människor bort — och <em>pull</em> —
  sådant som lockade dem till Amerika.</p>
  <p class="fragan">Vilka påståenden om indelningen håller?</p>`,
  alternativ:[
    {txt:"Missväxt, jordbrist och religiöst tvång hör till push: de gör det svårare att stanna.",
     ratt:true,
     kommentar:"Push handlar om villkoren där man är."},
    {txt:"Billig jord, höga löner och brev från redan utvandrade släktingar hör till pull.",
     ratt:true,
     kommentar:"Pull handlar om vad som gör alternativet attraktivt — och trovärdigt."},
    {txt:"De två sidorna verkar oftast samtidigt: det krävs både ett skäl att lämna och ett ställe att komma till.",
     ratt:true,
     kommentar:"Därför är indelningen ett analysverktyg, inte två konkurrerande förklaringar."},
    {txt:"Push förklarar utvandringen bäst, eftersom nöd väger tyngre än förhoppningar.",
     ratt:false, miss:"forklaringsmodell_som_facit",
     kommentar:"De allra fattigaste hade sällan råd med biljett. Push ensamt förklarar varken vem eller vart."},
    {txt:"Att ångbåtstrafiken över Atlanten blev billigare är varken push eller pull.",
     ratt:false, miss:"mojliggorande_villkor_forbisett",
     kommentar:"Det är ett möjliggörande villkor — inte ett skäl i sig, men utan det hade varken push eller pull räckt."},
    {txt:"Indelningen visar att utvandrarna inte fattade egna beslut utan drevs av krafter.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Push och pull beskriver villkoren. Vem som faktiskt reste avgjordes vid köksborden."}
  ],
  s:`<p>Push och pull är ett sätt att sortera orsaker, inte att välja
  mellan dem.</p>
  <p>Lägg till en tredje kolumn när du använder modellen: vad
  <em>möjliggjorde</em> förflyttningen rent praktiskt?</p>`
},

{
  id:"hi-ok-214", kap:2, omr:"ok_konsekvens",
  familj:["konsekvens_riktning","for_vem"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>När järnvägen drogs fram genom en svensk landsortssocken på
  1870-talet växte ett stationssamhälle upp vid spåret. Den gamla
  kyrkbyn låg en mil därifrån.</p>
  <p class="fragan">Vilka påståenden om konsekvenserna är rimliga?</p>`,
  alternativ:[
    {txt:"Handel och hantverk flyttade mot stationen, där varor kunde lastas av och på.",
     ratt:true,
     kommentar:"Transportläget blev viktigare än det gamla läget vid kyrkan."},
    {txt:"Samma händelse kunde innebära tillväxt för stationssamhället och tillbakagång för kyrkbyn.",
     ratt:true,
     kommentar:"Konsekvensfrågan måste alltid ställas <em>för vem</em>. Ett genomsnitt döljer att någon förlorade."},
    {txt:"Bönderna i socknen kunde nu sälja till en större marknad, men mötte samtidigt konkurrens utifrån.",
     ratt:true,
     kommentar:"Järnvägen gick åt båda hållen. Det gäller nästan alla förbättrade kommunikationer."},
    {txt:"Eftersom järnvägen var en förbättring gynnades socknens invånare i stort sett lika.",
     ratt:false, miss:"konsekvens_enkelriktad",
     kommentar:"Var man bodde avgjorde. En mil var lång väg 1875."},
    {txt:"Att kyrkbyn minskade visar att järnvägen var ett misstag för socknen.",
     ratt:false, miss:"delvinst_som_helhetsdom",
     kommentar:"En grupps förlust är inte hela sockens. Att väga samman kräver att man säger vad man väger."},
    {txt:"Järnvägen fick inga långsiktiga konsekvenser, eftersom båda orterna finns kvar i dag.",
     ratt:false, miss:"lang_sikt_underskattad",
     kommentar:"Att något finns kvar säger inget om hur dess betydelse förändrades."}
  ],
  s:`<p>Konsekvensfrågan har tre delar: för vem, hur snart, och hur
  länge.</p>
  <p>Samma händelse pekar nästan alltid åt olika håll för olika
  grupper.</p>`
},

{
  id:"hi-ok-215", kap:2, omr:"ok_konsekvens",
  familj:["kort_vs_lang_sikt"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Franska revolutionen bröt ut 1789. Redan 1799 tog Napoleon makten,
  och 1814 återinsattes kungahuset Bourbon på tronen.</p>
  <p class="fragan">Vilka påståenden skiljer korta och långa konsekvenser
  på ett rimligt sätt?</p>`,
  alternativ:[
    {txt:"På kort sikt följdes revolutionen av krig, terror och till slut envälde under Napoleon.",
     ratt:true,
     kommentar:"De omedelbara konsekvenserna pekade i stor utsträckning bort från det revolutionen utgav sig för att vilja."},
    {txt:"På lång sikt spreds idéer om medborgarskap, lagar lika för alla och folksuveränitet långt utanför Frankrike.",
     ratt:true,
     kommentar:"Och de spreds delvis med Napoleons arméer, vilket gör bilden ytterligare mer sammansatt."},
    {txt:"Att kungahuset återkom 1814 innebar inte att allt återgick till läget före 1789 — ståndsprivilegierna kom inte tillbaka.",
     ratt:true,
     kommentar:"Restauration är sällan återställande. Skarpt sett är det just det som gör perioden intressant."},
    {txt:"Eftersom monarkin återinfördes 1814 blev revolutionen utan varaktiga konsekvenser.",
     ratt:false, miss:"lang_sikt_underskattad",
     kommentar:"Statsskicket är bara ett av flera mått. Rättsordning, förvaltning och ägande såg annorlunda ut."},
    {txt:"Eftersom idéerna spreds var revolutionen i huvudsak en framgång.",
     ratt:false, miss:"vardering_forvaxlad_med_konsekvens",
     kommentar:"Att beskriva följder och att döma dem är två olika uppgifter. Blanda dem inte i samma mening."},
    {txt:"Napoleons maktövertagande var en kortsiktig konsekvens och saknar därför betydelse för långa linjer.",
     ratt:false, miss:"kort_sikt_avfardad",
     kommentar:"Kortsiktiga följder blir ofta orsaker till de långsiktiga. Napoleons lagbok gällde i över hundra år."}
  ],
  s:`<p>Kort och lång sikt kan peka åt helt olika håll. Ange därför alltid
  tidshorisonten när du påstår något om konsekvenser.</p>`
},

{
  id:"hi-ok-216", kap:2, omr:"ok_konsekvens",
  familj:["konsekvens_riktning","oavsedda_foljder"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Potatisen fick sitt genombrott i svenskt jordbruk under slutet av
  1700-talet och början av 1800-talet. Den gav betydligt fler kalorier per
  ytenhet än säd och klarade magrare jordar.</p>
  <p class="fragan">Vilka påståenden om konsekvenserna är rimliga?</p>`,
  alternativ:[
    {txt:"Fler människor kunde försörjas på samma areal, vilket bidrog till att befolkningen kunde växa.",
     ratt:true,
     kommentar:"En av flera faktorer bakom 1800-talets befolkningsökning — freden och vaccinationen mot smittkoppor är andra."},
    {txt:"Som komplement till säden kunde potatisen minska sårbarheten när en spannmålsskörd slog fel.",
     ratt:true,
     kommentar:"Flera grödor med olika egenskaper kunde sprida risken. Frågan ger inget stöd för ett svenskt ensidigt potatisberoende."},
    {txt:"Eftersom potatisen förbättrade försörjningen kan den inte ha haft negativa följder.",
     ratt:false, miss:"konsekvens_enkelriktad",
     kommentar:"Påståendet är för absolut. Positiva följder utesluter inte negativa, men båda måste beläggas i det fall som undersöks."},
    {txt:"Potatisen orsakade industrialiseringen, eftersom den frigjorde arbetskraft.",
     ratt:false, miss:"for_lang_orsakskedja",
     kommentar:"Kedjan är för lång och har för många mellanled för att kunna påstås rakt av. Den behöver beläggas länk för länk."},
    {txt:"Eftersom potatisen kom till Sverige redan på 1600-talet saknar 1700-talets spridning betydelse.",
     ratt:false, miss:"introduktion_forvaxlad_med_genomslag",
     kommentar:"Att något finns och att det används i stor skala är två skilda saker — och ofta åtskilda med ett sekel."},
    {txt:"Befolkningsökningen bevisar att potatisen var den viktigaste orsaken till den.",
     ratt:false, miss:"samvariation_som_orsak",
     kommentar:"Att två kurvor stiger samtidigt gör inte den ena till förklaring till den andra."}
  ],
  s:`<p>Potatisen bidrog till en stabilare och mer produktiv
  livsmedelsförsörjning. Beskriv följder precist och gör inte ett möjligt
  problem i ett annat land till ett belagt svenskt mönster.</p>`
},

{
  id:"hi-as-311", kap:3, omr:"as_aktor",
  familj:["handlingsutrymme"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En svensk bonde år 1750 funderar på att flytta till en annan
  socken. Han är skattebonde och äger sin jord, men jordbruket är bundet
  till byns gemensamma beslut om när sådd och skörd ska ske, och sockenbor
  behövde vid den här tiden intyg för att flytta.</p>
  <p class="fragan">Vilka påståenden om hans handlingsutrymme är
  rimliga?</p>`,
  alternativ:[
    {txt:"Han har ett handlingsutrymme, men det är avgränsat av regler och av byns gemensamma beslut.",
     ratt:true,
     kommentar:"Så ser handlingsutrymme nästan alltid ut: verkligt men inramat."},
    {txt:"Att han äger sin jord ger honom fler valmöjligheter än en landbo eller statare hade.",
     ratt:true,
     kommentar:"Handlingsutrymmet är olika stort för olika människor i samma samhälle. Det är en av de nyttigaste iakttagelserna i kapitlet."},
    {txt:"Han saknar handlingsutrymme, eftersom samhället var strikt reglerat.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Inget samhälle reglerar allt. Människor har valt och förhandlat i alla tider."},
    {txt:"Han kan göra precis som han vill, eftersom han är en fri man som äger sin jord.",
     ratt:false, miss:"aktor_utan_struktur",
     kommentar:"Äganderätt löser varken intygskravet eller byns gemensamma odlingsbeslut."},
    {txt:"Frågan är meningslös eftersom vi inte vet vad just den här bonden valde.",
     ratt:false, miss:"kravet_pa_enskilt_fall",
     kommentar:"Handlingsutrymme är en fråga om vad som var möjligt, inte om vad som faktiskt skedde."},
    {txt:"Eftersom han lever på 1700-talet tänkte han inte i termer av val.",
     ratt:false, miss:"anakronism_omvand",
     kommentar:"Människor har alltid vägt alternativ. Att de vägde andra alternativ än vi är en annan sak."}
  ],
  s:`<p>Handlingsutrymme är alltid en fråga om <em>hur mycket</em>, inte om
  ja eller nej.</p>
  <p>Och det är olika stort för olika människor i samma samhälle och
  samma år.</p>`
},

{
  id:"hi-as-312", kap:3, omr:"as_aktor",
  familj:["handlingsutrymme","aktorens_val"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Drottning Kristina abdikerade 1654, lämnade Sverige och övergick
  till katolicismen. Hon hade regerat i egen rätt sedan 1644 och hade
  ingen arvinge; kusinen Karl Gustav hade dessförinnan utsetts till
  tronföljare.</p>
  <p class="fragan">Vilka påståenden om aktör och struktur är rimliga?</p>`,
  alternativ:[
    {txt:"Abdikationen var ett verkligt val — hon kunde ha suttit kvar.",
     ratt:true,
     kommentar:"Få historiska beslut är så tydligt en enskild persons. Det gör fallet användbart."},
    {txt:"Att en tronföljare redan var utsedd gjorde valet möjligt att genomföra utan att riket föll i tronstrid.",
     ratt:true,
     kommentar:"Strukturen avgör inte beslutet men bestämmer vad ett beslut kostar."},
    {txt:"Att katolicism var förbjudet i Sverige förklarar varför hennes val innebar att hon också måste lämna landet.",
     ratt:true,
     kommentar:"Ramarna bestämde vilka val som gick att kombinera. Hon kunde inte få båda."},
    {txt:"Eftersom hon var drottning saknade strukturer betydelse för hennes handlande.",
     ratt:false, miss:"aktor_utan_struktur",
     kommentar:"Också monarker verkar inom lag, råd, ständer och ekonomi. Makt är inte samma sak som obegränsning."},
    {txt:"Eftersom hon var ensam kvinna på tronen var abdikationen oundviklig.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Andra regerande drottningar satt kvar i decennier. Oundviklighet är ett starkt påstående som behöver beläggas."},
    {txt:"Beslutet var enbart personligt och saknar därför historiskt intresse.",
     ratt:false, miss:"personligt_lika_med_ohistoriskt",
     kommentar:"Personliga beslut med rikspolitiska följder är precis vad aktörsperspektivet finns till för."}
  ],
  s:`<p>Strukturer sätter ramarna. Aktörer rör sig inom dem — och kan
  ibland flytta dem.</p>
  <p>Frågan är sällan ”vilket av dem”, utan ”hur mycket rörelseutrymme
  fanns här, och vad gjordes med det?”</p>`
},

{
  id:"hi-as-313", kap:3, omr:"as_struktur",
  familj:["geografisk_struktur"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>De flesta av Sveriges äldsta städer ligger vid kusten, vid en älv
  eller vid en sjö.</p>
  <p class="fragan">Vilka förklaringar är strukturella?</p>`,
  alternativ:[
    {txt:"Vattenvägar var länge det klart billigaste och mest praktiska sättet att flytta tunga varor över långa sträckor.",
     ratt:true,
     kommentar:"Landtransport var ofta mycket dyrare. Transportkostnaden är en långlivad struktur."},
    {txt:"Vatten gav dessutom kraft till kvarnar och hammare, och fisk till försörjning.",
     ratt:true,
     kommentar:"Flera strukturella fördelar sammanfaller på samma plats. Därför blir mönstret så tydligt."},
    {txt:"Det beror på att de kungar som grundade städerna tyckte om vatten.",
     ratt:false, miss:"struktur_forvaxlad_med_smak",
     kommentar:"En förklaring som bygger på enskildas preferenser förklarar inte ett mönster som återkommer i hela Europa."},
    {txt:"Mönstret är en slump, eftersom Sverige har mycket vatten överallt.",
     ratt:false, miss:"slump_som_forklaring",
     kommentar:"Om läget vore likgiltigt skulle städerna ligga jämnt fördelade. Det gör de inte."},
    {txt:"Eftersom förklaringen är strukturell hade städerna hamnat på exakt samma platser oavsett vad människor gjorde.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Strukturen gör vissa platser mycket sannolika. Vilken av dem som blev stad avgjordes av beslut och tillfälligheter."},
    {txt:"Strukturella förklaringar handlar om naturen, aktörsförklaringar om människor.",
     ratt:false, miss:"struktur_forvaxlad_med_natur",
     kommentar:"Också lagar, ståndsordningar, marknader och normer är strukturer. Geografi är bara en sorts."}
  ],
  s:`<p>En strukturell förklaring pekar på villkor som gäller många
  människor under lång tid, oberoende av vad var och en vill.</p>`
},

{
  id:"hi-as-314", kap:3, omr:"as_struktur",
  familj:["social_struktur","standssamhallet"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>I det svenska ståndssamhället tillhörde man adel, präster, borgare
  eller bönder. Ståndet avgjorde vilken domstol man hörde under, vilka
  skatter man betalade, vilka ämbeten man kunde söka och hur man
  representerades i riksdagen.</p>
  <p class="fragan">Vilka påståenden om ståndssamhället som struktur
  håller?</p>`,
  alternativ:[
    {txt:"Ståndet fungerade som en struktur: det bestämde i förväg vilka vägar som var öppna för en person.",
     ratt:true,
     kommentar:"Och det gjorde det innan personen hunnit vilja något. Det är kärnan i ett strukturbegrepp."},
    {txt:"Två personer med samma begåvning hade olika möjligheter beroende på vilket stånd de föddes i.",
     ratt:true,
     kommentar:"Ett bra sätt att pröva om något är en struktur: skiljer det åt personer som annars är lika?"},
    {txt:"Strukturen var inte helt låst — det förekom att personer adlades eller att bondsöner blev präster.",
     ratt:true,
     kommentar:"Strukturer har öppningar. Att de är få och kända är just vad som gör undantagen omtalade."},
    {txt:"Eftersom det fanns undantag var ståndsindelningen i praktiken utan betydelse.",
     ratt:false, miss:"undantag_upphaver_regel",
     kommentar:"Ett undantag som alla kan räkna upp vid namn bekräftar snarare hur ovanligt det var."},
    {txt:"Ståndet avgjorde helt vad en människa blev, och därför är det meningslöst att tala om enskildas val.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Inom varje stånd fanns stora skillnader och många val. Strukturen sätter ramen, inte utfallet."},
    {txt:"Ståndssamhället är en struktur eftersom det var orättvist.",
     ratt:false, miss:"struktur_forvaxlad_med_orattvisa",
     kommentar:"Struktur är ett beskrivande begrepp, inte ett värderande. En struktur kan vara rättvis eller orättvis."}
  ],
  s:`<p>Pröva om något är en struktur med två frågor: gäller det många
  under lång tid, och gäller det oberoende av vad den enskilde vill?</p>`
},

{
  id:"hi-as-315", kap:3, omr:"as_struktur",
  familj:["struktur_och_mojlighet"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Under 1800-talet blev läs- och skrivkunnigheten i Sverige hög, men
  vidare studier vid läroverk och universitet var länge förbehållna få.
  Läroverken tog fram till 1900-talets början emot nästan enbart pojkar,
  och avgifterna gjorde dem svåråtkomliga för de flesta familjer.</p>
  <p class="fragan">Vilka påståenden om utbildning som struktur är
  rimliga?</p>`,
  alternativ:[
    {txt:"Utbildningssystemet fördelade framtida möjligheter innan den enskilde hunnit välja något.",
     ratt:true,
     kommentar:"Kön och familjens ekonomi avgjorde vilka dörrar som ens var synliga."},
    {txt:"Att hög läskunnighet och låg tillgång till högre studier fanns samtidigt visar att en struktur kan vara öppen på ett plan och stängd på ett annat.",
     ratt:true,
     kommentar:"Skarpt. Sverige var samtidigt ovanligt läskunnigt och ovanligt selektivt i högre utbildning."},
    {txt:"Den som ändå tog sig igenom systemet gjorde det ofta med hjälp av stipendier, släktingar eller en präst som lade sig i.",
     ratt:true,
     kommentar:"Undantag kräver oftast att någon aktivt öppnar dörren. Det är en aktör som verkar inuti strukturen."},
    {txt:"Eftersom läskunnigheten var hög fanns inga strukturella hinder för utbildning.",
     ratt:false, miss:"en_niva_generaliserad",
     kommentar:"Att kunna läsa och att kunna studera vidare är två helt olika trösklar."},
    {txt:"Eftersom några få tog sig fram ändå var hindren i praktiken personliga snarare än strukturella.",
     ratt:false, miss:"undantag_upphaver_regel",
     kommentar:"Om bara några få tar sig fram är det just det mönstret som ska förklaras."},
    {txt:"Strukturen förklarar fullständigt vem som fick en akademisk karriär.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Den förklarar vilka som hade chansen. Vem av dem som tog den är en annan fråga."}
  ],
  s:`<p>Strukturer syns tydligast när man frågar vem som <em>inte</em> fanns
  med, och varför.</p>`
},

{
  id:"hi-as-316", kap:3, omr:"as_samspel",
  familj:["individ_och_rorelse"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Engelbrekt Engelbrektsson ledde 1434 ett uppror mot unionskungen
  Erik av Pommern. Bakgrunden var missnöje med fogdarnas beskattning i
  Bergslagen, en handelsblockad som slagit hårt mot järnexporten, och
  motsättningar mellan kungen och delar av det svenska frälset.</p>
  <p class="fragan">Vilka bedömningar av aktör och struktur är rimliga?</p>`,
  alternativ:[
    {txt:"Missnöjet fanns före Engelbrekt, men någon måste samla det och ge det en riktning.",
     ratt:true,
     kommentar:"Utan missnöjet inget uppror, utan ledningen ingen resning. Båda leden behövs."},
    {txt:"Att upproret fick stöd av delar av frälset förklarar varför det kunde bli mer än en lokal oro.",
     ratt:true,
     kommentar:"En enskild aktör behöver en bärande struktur för att nå utanför sitt eget landskap."},
    {txt:"Utan Engelbrekt hade ingenting hänt i Sverige på 1430-talet.",
     ratt:false, miss:"aktor_utan_struktur",
     kommentar:"Missnöjet med fogdarna och blockaden fanns oavsett. Frågan är vilken form protesten hade tagit."},
    {txt:"Eftersom orsakerna var strukturella hade upproret kommit i exakt samma form ändå.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Formen — tidpunkten, ledningen, vilka som anslöt — är just det aktören avgör."},
    {txt:"Eftersom Engelbrekt mördades 1436 saknade hans insats betydelse.",
     ratt:false, miss:"utfall_bedomer_insats",
     kommentar:"Förloppet fortsatte utan honom. Att en aktör försvinner upphäver inte vad aktören satte igång."},
    {txt:"Att han blev en nationalsymbol på 1800-talet visar hur betydelsefull han var 1434.",
     ratt:false, miss:"eftervarld_som_belagg",
     kommentar:"Eftervärldens bruk av en person säger något om eftervärlden. Om 1434 måste man fråga 1400-talets material."}
  ],
  s:`<p>Fråga alltid: vad fanns redan, och vad tillförde aktören?</p>
  <p>Den som bara ser strukturen får ett uppror utan ledare. Den som bara
  ser aktören får en ledare utan anhängare.</p>`
},

{
  id:"hi-as-317", kap:3, omr:"as_samspel",
  familj:["uppfinning_och_behov"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Johann Gutenberg satte omkring 1450 samman flera redan kända
  tekniker — pressen, metallgjutning, oljebaserat bläck — till ett system
  för tryck med lösa typer. Under samma period växte pappersproduktionen i
  Europa, universiteten blev fler och efterfrågan på böcker steg.</p>
  <p class="fragan">Vilka bedömningar av aktör och struktur är rimliga?</p>`,
  alternativ:[
    {txt:"Gutenbergs insats var att kombinera befintliga delar till något som fungerade i praktiken.",
     ratt:true,
     kommentar:"De flesta genombrott ser ut så. Det gör dem inte mindre betydelsefulla."},
    {txt:"Papperstillgången och den växande efterfrågan förklarar varför tekniken spreds så snabbt just då.",
     ratt:true,
     kommentar:"Uppfinningar som saknar avsättning blir kuriosa. Kinesiska boktryckartekniker fanns långt tidigare."},
    {txt:"Utan Gutenberg hade boktryckarkonsten aldrig uppfunnits i Europa.",
     ratt:false, miss:"aktor_utan_struktur",
     kommentar:"Med alla delar tillgängliga och en tydlig efterfrågan är det svårt att hävda att ingen annan hade kommit fram till det."},
    {txt:"Eftersom behovet fanns var uppfinningen oundviklig, och personen saknar intresse.",
     ratt:false, miss:"strukturdeterminism",
     kommentar:"Behov gör något sannolikt, inte oundvikligt — och säger inget om när eller i vilken form."},
    {txt:"Eftersom teknikerna redan var kända gjorde Gutenberg ingenting nytt.",
     ratt:false, miss:"kombination_underskattad",
     kommentar:"Att få delarna att fungera tillsammans i ett produktionsdugligt system är i sig det svåra."},
    {txt:"Tryckpressens spridning visar att teknik förändrar samhället oberoende av vad människor gör med den.",
     ratt:false, miss:"teknikdeterminism",
     kommentar:"Pressen trycktes med olika saker på olika håll. Vad tekniken användes till avgjordes av människor."}
  ],
  s:`<p>Uppfinningar är ett tacksamt fall för aktör och struktur: någon gör
  något, men bara vissa tider tar emot det.</p>`
},

{
  id:"hi-as-318", kap:3, omr:"as_samspel",
  familj:["individ_och_rorelse","organisationens_betydelse"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>En elev skriver: ”Rösträtten i Sverige infördes av Hjalmar
  Branting.”</p>
  <p class="fragan">Vilka invändningar mot formuleringen är rimliga?</p>`,
  alternativ:[
    {txt:"Beslutet fattades av riksdagen, efter förhandlingar mellan flera partier och i ett bestämt politiskt läge.",
     ratt:true,
     kommentar:"Enskilda personer fattar sällan den sortens beslut ensamma, hur centrala de än är."},
    {txt:"Formuleringen osynliggör de rörelser — arbetarrörelsen och kvinnorörelsen — som drivit kravet i decennier.",
     ratt:true,
     kommentar:"Den långa organiseringen är det som gjorde att ett färdigt krav fanns när läget öppnade sig."},
    {txt:"Att skriva så gör förändringen till en gåva uppifrån i stället för ett resultat av påtryckning.",
     ratt:true,
     kommentar:"Formuleringen bär med sig en hel historiesyn. Därför är den värd att stanna vid."},
    {txt:"Invändningen är onödig — Branting ledde regeringen när principbeslutet fattades och var därför ensam ansvarig.",
     ratt:false, miss:"formell_roll_som_forklaring",
     kommentar:"Principbeslutet 1918 fattades under Nils Edéns regering, där Branting var finansminister. Formell roll är dessutom inte samma sak som ensam historisk förklaring."},
    {txt:"Enskilda personer bör aldrig nämnas i historiska förklaringar.",
     ratt:false, miss:"aktor_bortrensad",
     kommentar:"Motsatt övertramp. Personer spelar roll — de spelar den bara inte ensamma."},
    {txt:"Eftersom vi inte kan veta vem som var viktigast bör frågan lämnas obesvarad.",
     ratt:false, miss:"vagning_uppgiven",
     kommentar:"Att väga betydelse är svårt men fullt möjligt, och det är en stor del av historikerns arbete."}
  ],
  s:`<p>Var uppmärksam på meningar där en person är subjekt och en
  samhällsförändring objekt. De döljer nästan alltid ett helt
  förlopp.</p>`
},

/* =====================================================================
   UTBYGGNAD — jämnare progression och bredare källmaterial
   Svårigheten ska ligga i tänkandet, inte i onödigt tung källtext.
   ===================================================================== */

{
  id:"hi-kk-124", kap:1, omr:"kk_fraga",
  kriterier:["anvandbarhet","urval"],
  familj:["valja_kalla","anvandbarhet_vs_fraga"], niva:"C", svarstyp:"alternativ",
  kallor:[
    {bet:"A", titel:"Fabrikens avlöningslista", typ:"Räkenskaper, 1896", akthet:"konstruerad",
     text:`<p>Listan anger namn, antal arbetade dagar och utbetald lön. Bland de anställda finns 18 pojkar och 7 flickor under 15 år. Ålder, arbetstid och arbetsuppgift saknas.</p>`,
     om:`<p>Listan upprättades för företagets bokföring och omfattar bara personer som fick lön direkt av fabriken.</p>`,
     referens:"Konstruerad källa efter mönstret för svenska avlöningslistor från 1890-talet."},
    {bet:"B", titel:"Brev från en fabriksflicka", typ:"Privatbrev, 1897", akthet:"konstruerad",
     text:`<p>Mor, jag står vid tändsticksaskarna från sex på morgonen. Fingrarna värker mest när limmet torkat. Förmannen säger att jag får gå om jag inte håller takten. Men lönen behövs till hyran.</p>`,
     om:`<p>Brevet är skrivet av en 14-årig anställd till hennes mor. Bara ett brev från flickan är bevarat.</p>`,
     referens:"Konstruerad källa utifrån återkommande drag i arbetarbrev."}
  ],
  t:`<p>En historiker undersöker barns fabriksarbete på 1890-talet.</p><p class="fragan">Vilka val av källa är rimliga?</p>`,
  alternativ:[
    {txt:"För frågan hur många minderåriga som fick lön är A bäst, men den missar barn som arbetade åt familjemedlemmar eller underleverantörer.",ratt:true,kommentar:"Räkenskaper är starka på registrerade antal, men deras administrativa gräns måste synliggöras."},
    {txt:"För frågan hur arbetet kunde upplevas är B relevant, men ett enda brev kan inte representera alla barn.",ratt:true,kommentar:"Källan ger djup, inte bredd."},
    {txt:"Tillsammans kan A och B belysa både omfattning och erfarenhet, men de besvarar olika delar av frågan.",ratt:true,kommentar:"Bra källurval bygger ofta på kompletterande styrkor."},
    {txt:"B är bäst för att räkna alla arbetande barn eftersom flickans närvaro gör brevet heltäckande.",ratt:false,miss:"narhet_anvands_till_fel_fraga",kommentar:"Närhet hjälper inte när källan saknar informationen som frågan kräver."},
    {txt:"A är objektiv och heltäckande eftersom bokföringens siffror registrerar alla barn som arbetade åt fabriken.",ratt:false,miss:"siffra_lika_med_objektiv",kommentar:"Siffror skapas genom urval: här räknas bara direkt avlönade."},
    {txt:"A och B kan inte kombineras eftersom räkenskaper och personliga brev alltid ger oförenliga sorters kunskap.",ratt:false,miss:"olika_kallor_kan_inte_kombineras",kommentar:"Just skillnaden gör att de kompletterar varandra."}
  ],
  s:`<p>Välj källa efter fråga. A ger <em>bredd</em> inom ett bestämt register; B ger <em>djup</em> i en människas erfarenhet. Kombinationen blir stark först när du håller isär vad varje källa bär.</p>`,
  ledtrad:"Dela upp undersökningen i två frågor: hur många och hur upplevdes arbetet?"
},

{
  id:"hi-kk-125", kap:1, omr:"kk_bedom",
  kriterier:["narhet","tendens","anvandbarhet"],
  familj:["muntlig_historia","minnets_palitlighet"], niva:"C", svarstyp:"alternativ",
  kallor:[{bet:"A", titel:"Minne av beredskapsåren", typ:"Intervju gjord 1985", akthet:"konstruerad",
    text:`<p>Jag minns ransoneringen som spännande. Vi barn samlade kuponger och mor lyckades alltid ordna kaffe. Ingen i vårt kvarter gick hungrig. Alla hjälptes åt, så var det på den tiden.</p>`,
    om:`<p>Den intervjuade var nio år 1942. Intervjun gjordes 43 år senare till ett radioprogram om svensk sammanhållning under kriget.</p>`,
    referens:"Konstruerad muntlig källa för källkritisk träning."}],
  t:`<p class="fragan">Vilka bedömningar av intervjun är rimliga?</p>`,
  alternativ:[
    {txt:"Tidsavståndet gör detaljer osäkra; senare berättelser om nationell sammanhållning kan också ha påverkat minnet.",ratt:true,kommentar:"Minnen formas både av tid och av berättelser som finns när de återges."},
    {txt:"Källan är användbar för hur personen mindes och gav mening åt sin barndom 1985.",ratt:true,kommentar:"Ett minne är både en berättelse om då och en källa till när det berättas."},
    {txt:"Påståendet att ingen gick hungrig behöver prövas mot material från fler hushåll och grupper.",ratt:true,kommentar:"Ett barns kvarter kan inte bära en slutsats om hela Sverige."},
    {txt:"Intervjun är oanvändbar eftersom minnet inte är exakt.",ratt:false,miss:"minne_lika_med_vardelos",kommentar:"Osäker detaljprecision gör inte erfarenhet och meningsskapande ointressanta."},
    {txt:"Barn minns bättre än vuxna eftersom barn inte har politiska intressen.",ratt:false,miss:"barn_lika_med_neutral",kommentar:"Ålder tar inte bort urval, perspektiv eller senare påverkan."},
    {txt:"Radioprogrammets tema påverkar inte källan, eftersom orden är den intervjuades egna.",ratt:false,miss:"intervjusituation_forbisedd",kommentar:"Frågor, urval och sammanhang påverkar vad som berättas."}
  ],
  s:`<p>Muntliga minnen kan vara osäkra på detaljer men starka som källor till erfarenhet, identitet och hur det förflutna senare har tolkats.</p>`
},

{
  id:"hi-kk-126", kap:1, omr:"kk_jamfora",
  kriterier:["beroende","tendens","narhet","urval"],
  familj:["motstridiga_kallor","vagning_av_kallor"], niva:"A", svarstyp:"alternativ",
  kallor:[
    {bet:"A", titel:"Polisrapport efter en demonstration", typ:"Tjänsterapport, 1917", akthet:"konstruerad",
     text:`<p>Folkmassan trängde fram mot avspärrningen. Sedan varning givits två gånger skingrades de mest påstridiga med sablarnas flata sida. Ingen större skada iakttogs.</p>`,
     om:`<p>Rapporten skrevs samma kväll av befälet som ansvarade för polisens insats.</p>`,referens:"Konstruerad källa."},
    {bet:"B", titel:"Brev från en demonstrant", typ:"Privatbrev, dagen efter", akthet:"konstruerad",
     text:`<p>Vi stod tätt men fredligt när polisen red in. Jag såg Anna falla med blod i håret. Först då började några kasta sten.</p>`,
     om:`<p>Brevskrivaren deltog i demonstrationen och var medlem i föreningen som ordnade den.</p>`,referens:"Konstruerad källa."}
  ],
  t:`<p>Källorna ger olika bilder av vem som började våldet.</p><p class="fragan">Vilka slutsatser är metodiskt starkast?</p>`,
  alternativ:[
    {txt:"Båda är nära i tid och rum, men båda har begränsad utsikt och intresse av att lägga ansvaret på motparten.",ratt:true,kommentar:"Samma kriterium måste tillämpas på båda sidor."},
    {txt:"Skillnaden kan delvis bero på position: befälet såg avspärrningen, brevskrivaren sin del av folkmassan.",ratt:true,kommentar:"Motstridighet behöver inte betyda att en källa ljuger."},
    {txt:"För att avgöra ordningsföljden bör historikern söka oberoende vittnen, sjukjournaler, fotografier och fler rapporter.",ratt:true,kommentar:"En stark analys formulerar vilket nytt material som kan pröva frågan."},
    {txt:"A väger tyngst eftersom en officiell tjänsterapport alltid är neutral och täcker hela händelseförloppet.",ratt:false,miss:"myndighet_lika_med_neutral",kommentar:"Rapporten är samtidigt befälets redovisning av den egna insatsen."},
    {txt:"B väger tyngst eftersom en namngiven skadad person gör hela brevets händelseförlopp säkert.",ratt:false,miss:"detaljrikedom_som_belagg",kommentar:"Detaljen kan prövas men avgör inte ensam hela ordningsföljden."},
    {txt:"Händelsen går inte att undersöka vidare eftersom två samtida ögonvittnen ger motsägande bilder av våldet.",ratt:false,miss:"motsagelse_lika_med_omojligt",kommentar:"Motsägelser visar vad som behöver prövas vidare."}
  ],
  s:`<p>Väg närhet, position, intresse och oberoende samtidigt. Avsluta med att ange vilket nytt material som faktiskt skulle kunna avgöra frågan.</p>`
},

{
  id:"hi-ok-217", kap:2, omr:"ok_kedjor", familj:["samverkande_orsaker","vagning_av_orsaker"], niva:"C", svarstyp:"alternativ",
  t:`<p>Inför franska revolutionen fanns en statlig skuldkris, skatteprivilegier för de högre stånden, stigande brödpriser och nya idéer om folkets suveränitet.</p><p class="fragan">Vilka resonemang bygger en hållbar orsaksförklaring?</p>`,
  alternativ:[
    {txt:"Skuldkrisen förklarar varför kungen kallade samman generalständerna; privilegierna förklarar varför skattefrågan blev en konflikt mellan stånden.",ratt:true,kommentar:"Orsaker blir starka när deras funktion i kedjan preciseras."},
    {txt:"Brödpriserna bidrog till folklig mobilisering, medan idéerna gav språk och mål åt kritiken.",ratt:true,kommentar:"Materiella villkor och idéer kan samverka."},
    {txt:"Orsakerna bör vägas mot vilka delar av förloppet de kan förklara, inte efter en fast rangordning.",ratt:true,kommentar:"Ingen orsakstyp är alltid djupast."},
    {txt:"Skuldkrisen var den verkliga orsaken; idéerna var bara ord.",ratt:false,miss:"materiellt_lika_med_verkligt",kommentar:"Detta rangordnar utan att visa varför."},
    {txt:"Eftersom alla faktorer behövdes var de exakt lika viktiga.",ratt:false,miss:"flera_orsaker_lika_viktiga",kommentar:"Samverkan betyder inte lika stor betydelse."},
    {txt:"Orsaken närmast stormningen av Bastiljen är automatiskt viktigast.",ratt:false,miss:"narhet_i_tid_som_orsaksstyrka",kommentar:"Närhet säger var i kedjan orsaken ligger, inte hur mycket den förklarar."}
  ],
  s:`<p>En bra orsaksförklaring visar <em>vad varje orsak gjorde</em> i förloppet och hur orsakerna förstärkte varandra.</p>`
},

{
  id:"hi-ok-218", kap:2, omr:"ok_konsekvens", familj:["for_vem","kort_vs_lang_sikt"], niva:"C", svarstyp:"alternativ",
  t:`<p>Slaveriet avskaffades i USA 1865. De tidigare förslavade blev juridiskt fria, men många saknade jord och arrenderade mark mot en stor del av skörden. Under följande årtionden infördes segregation och hinder för svartas rösträtt.</p><p class="fragan">Vilka konsekvensanalyser är rimliga?</p>`,
  alternativ:[
    {txt:"Den juridiska friheten var en avgörande omedelbar förändring, även om ekonomiskt beroende bestod.",ratt:true,kommentar:"Två dimensioner kan förändras olika snabbt."},
    {txt:"På längre sikt begränsade segregation och rösträttshinder möjligheten att omsätta friheten i politisk makt.",ratt:true,kommentar:"Konsekvenser måste följas över tid."},
    {txt:"Markägare kunde bevara billig arbetskraft genom nya avtal trots att slaveriet var förbjudet.",ratt:true,kommentar:"Samma reform får olika följder för olika grupper."},
    {txt:"Eftersom ojämlikheten fortsatte saknade avskaffandet betydelse.",ratt:false,miss:"kontinuitet_upphaver_forandring",kommentar:"Fortsatt ojämlikhet gör inte juridisk frihet oviktig."},
    {txt:"Eftersom lagen ändrades blev de tidigare förslavade genast jämlika i praktiken.",ratt:false,miss:"lag_lika_med_praktik",kommentar:"Formell rätt och faktisk möjlighet måste skiljas åt."},
    {txt:"Segregationen visar att avskaffandet orsakade rasismen.",ratt:false,miss:"senare_foljd_som_ny_orsak",kommentar:"Segregationen byggde vidare på redan etablerade maktförhållanden."}
  ],
  s:`<p>Dela upp konsekvenser efter <em>område, grupp och tid</em>. Juridik, ekonomi och politik kan röra sig olika snabbt.</p>`
},

{
  id:"hi-ok-219", kap:2, omr:"ok_kedjor", familj:["orsakskedja","nodvandig_vs_tillracklig"], niva:"A", svarstyp:"alternativ",
  t:`<p>I Tyskland 1933 utsågs Hitler till rikskansler. Efter riksdagshusbranden upphävdes centrala friheter. Kommunistiska ledamöter greps, och riksdagen antog därefter fullmaktslagen under hot och våld.</p><p class="fragan">Vilka analyser av orsaksförloppet håller?</p>`,
  alternativ:[
    {txt:"Utnämningen gav Hitler tillgång till statsmakten; undantagsåtgärderna förändrade sedan villkoren för fullmaktslagens omröstning.",ratt:true,kommentar:"Detta visar mekanismen steg för steg."},
    {txt:"Den ekonomiska och politiska krisen hjälper till att förklara stödet, men räcker inte ensam för att förklara hur diktaturen byggdes.",ratt:true,kommentar:"Bakgrund är inte en fullständig förloppsförklaring."},
    {txt:"En händelse kan vara nödvändig i den faktiska kedjan utan att ensam vara tillräcklig för utfallet.",ratt:true,kommentar:"Flera länkar kan behövas samtidigt."},
    {txt:"Riksdagshusbranden orsakade diktaturen på egen hand eftersom alla senare beslut följde automatiskt efter branden.",ratt:false,miss:"utlosande_som_ensam_orsak",kommentar:"Branden fick sin betydelse genom hur den användes politiskt."},
    {txt:"Hitlers ideologi räcker som fullständig förklaring eftersom hans mål gjorde maktövertagandets övriga villkor oviktiga.",ratt:false,miss:"motiv_som_hela_forklaringen",kommentar:"Motiv förklarar inte hur maktövertagandet blev möjligt."},
    {txt:"Förloppet var demokratiskt eftersom riksdagen formellt antog fullmaktslagen genom en omröstning enligt gällande beslutsformer.",ratt:false,miss:"form_lika_med_villkor",kommentar:"Gripanden, hot och upphävda friheter förändrade villkoren."}
  ],
  s:`<p>En stark förklaring visar både bakgrunden och mekanismen: hur utnämning, undantagsåtgärder och beslut kopplades ihop.</p>`
},

{
  id:"hi-ok-220", kap:2, omr:"ok_konsekvens", familj:["oavsedda_foljder","lang_sikt"], niva:"A", svarstyp:"alternativ",
  t:`<p>Industrialiseringen byggde på kol, ångkraft och senare olja. Produktionen ökade, varor blev billigare och levnadsstandarden steg för många. Samtidigt ökade utsläppen av växthusgaser under mer än två sekel.</p><p class="fragan">Vilka konsekvensresonemang är hållbara?</p>`,
  alternativ:[
    {txt:"Samma process kan ge kortsiktiga vinster för vissa grupper och långsiktiga kostnader för andra grupper och generationer.",ratt:true,kommentar:"Tid och fördelning är centrala i konsekvensanalysen."},
    {txt:"Klimatförändringen kan beskrivas som en långsiktig och till stor del oavsedd följd av många beslut.",ratt:true,kommentar:"Oavsedd betyder inte orsakslös."},
    {txt:"Ekonomiska, sociala och miljömässiga följder bör hållas isär innan de vägs samman.",ratt:true,kommentar:"En etikett som framsteg eller katastrof döljer fördelningen."},
    {txt:"Eftersom 1800-talets fabriksägare inte avsåg global uppvärmning ingår den inte i konsekvenskedjan.",ratt:false,miss:"avsikt_kravs_for_konsekvens",kommentar:"Konsekvenser kan vara oavsedda."},
    {txt:"Eftersom levnadsstandarden steg var konsekvenserna positiva för alla.",ratt:false,miss:"genomsnitt_lika_med_alla",kommentar:"Genomsnitt döljer grupper, platser och generationer."},
    {txt:"Dagens utsläpp ligger för långt från den tidiga industrialiseringen för att höra till samma förlopp.",ratt:false,miss:"lang_sikt_avskuren",kommentar:"Långa kedjor måste prövas, inte avvisas på avståndet ensamt."}
  ],
  s:`<p>En konsekvensanalys visar <em>vad</em> som förändrades, <em>för vem</em>, <em>var</em> och över <em>vilken tid</em>.</p>`
},

{
  id:"hi-ok-221", kap:2, omr:"ok_typer", familj:["motiv_vs_villkor","mojliggorande_villkor"], niva:"C", svarstyp:"alternativ",
  t:`<p>Europeiska stater byggde under 1800-talet kolonialvälden. Bland förklaringarna finns efterfrågan på råvaror och marknader, nationalism, rasistiska idéer, ångfartyg, telegraf och effektivare vapen.</p><p class="fragan">Vilka sorteringar av orsakerna är rimliga?</p>`,
  alternativ:[
    {txt:"Råvaror, marknader och nationell prestige kan fungera som motiv — sådant aktörer ville uppnå.",ratt:true,kommentar:"Motiv anger riktning."},
    {txt:"Ångfartyg, telegraf och vapen är främst möjliggörande villkor: de gjorde kontroll över stora avstånd lättare.",ratt:true,kommentar:"Möjlighet är inte samma sak som motiv."},
    {txt:"Rasistiska idéer kunde både legitimera erövring och forma hur den genomfördes.",ratt:true,kommentar:"Idéer kan vara verksamma delar av en förklaring."},
    {txt:"Tekniken orsakade kolonialismen eftersom den gjorde erövring möjlig.",ratt:false,miss:"mojlighet_lika_med_motiv",kommentar:"Att något kan göras förklarar inte varför det görs."},
    {txt:"Ekonomiska motiv är mer verkliga än idéer och nationalism.",ratt:false,miss:"materiellt_lika_med_verkligt",kommentar:"Orsakstyper måste prövas i förloppet, inte rangordnas i förväg."},
    {txt:"Eftersom flera stater deltog saknade enskilda beslut betydelse.",ratt:false,miss:"monster_utesluter_beslut",kommentar:"Ett mönster består av många beslut inom gemensamma villkor."}
  ],
  s:`<p>Skilj mellan <em>motiv</em>, <em>legitimering</em> och <em>möjliggörande villkor</em>. Då blir orsakslistan en förklaring.</p>`
},

{
  id:"hi-as-319", kap:3, omr:"as_samspel", familj:["individ_och_rorelse","organisationens_betydelse"], niva:"C", svarstyp:"alternativ",
  t:`<p>Under 1800-talet drev människor i Storbritannien kampanjer mot slaveriet. Tidigare förslavade berättade offentligt om sina erfarenheter, föreningar samlade namn och konsumenter bojkottade socker. Parlamentet förbjöd slavhandeln 1807 och slaveriet i större delen av imperiet 1833.</p><p class="fragan">Vilka analyser av aktör och struktur håller?</p>`,
  alternativ:[
    {txt:"De personliga vittnesmålen kunde förändra opinionen, men fick spridning genom föreningar, tryckpressar och möten.",ratt:true,kommentar:"Aktörens röst och rörelsens infrastruktur samverkade."},
    {txt:"Bojkotten gav många människor ett begränsat men verkligt handlingsutrymme i vardagen.",ratt:true,kommentar:"Handlingsutrymme behöver inte betyda direkt beslutanderätt."},
    {txt:"Parlamentets beslut var slutpunkten i en längre kamp, inte ett bevis på att politiker ensamma skapade förändringen.",ratt:true,kommentar:"Formellt beslut och historisk förklaring är olika saker."},
    {txt:"Eftersom parlamentet stiftade lagen saknade folkrörelsernas arbete betydelse.",ratt:false,miss:"formell_roll_som_forklaring",kommentar:"Beslutet måste förklaras, inte bara namnges."},
    {txt:"Eftersom föreningar organiserade kampanjen var de enskildas handlingar oviktiga.",ratt:false,miss:"organisation_utan_aktorer",kommentar:"Organisationen bestod av och bars av handlingar."},
    {txt:"När slaveriet förbjöds försvann de ekonomiska strukturer som byggt på det omedelbart.",ratt:false,miss:"lag_lika_med_praktik",kommentar:"Ägande, arbetsvillkor och rasistiska hierarkier levde vidare."}
  ],
  s:`<p>Aktörer skapar rörelser, och rörelser gör enskilda handlingar starkare. Beslutet 1833 blir begripligt först när båda nivåerna finns med.</p>`
},

{
  id:"hi-as-320", kap:3, omr:"as_aktor", familj:["handlingsutrymme","motstand_under_tvang"], niva:"C", svarstyp:"alternativ",
  t:`<p>På den franska kolonin Saint-Domingue gjorde förslavade människor uppror 1791. De handlade under extremt tvång men utnyttjade samtidigt konflikter mellan plantageägare, fria färgade, Frankrikes regering och främmande makter. År 1804 blev Haiti självständigt.</p><p class="fragan">Vilka påståenden om handlingsutrymme är rimliga?</p>`,
  alternativ:[
    {txt:"Extremt begränsade livsvillkor utesluter inte handlingsutrymme; upproret visar hur människor kunde agera mot systemet.",ratt:true,kommentar:"Handlingsutrymme är en gradfråga, inte frihet eller ofrihet."},
    {txt:"Konflikterna mellan andra grupper öppnade möjligheter som upprorsledarna kunde använda.",ratt:true,kommentar:"Ett möjlighetsfönster måste både finnas och utnyttjas."},
    {txt:"Självständigheten kan inte förklaras enbart med den franska revolutionens idéer; de förslavades organisering och krigföring var avgörande.",ratt:true,kommentar:"Idéer verkar genom människor."},
    {txt:"Förslavade människor saknade per definition möjlighet att vara historiska aktörer.",ratt:false,miss:"fortryckt_lika_med_passiv",kommentar:"Maktlöshet och fullständig passivitet är inte samma sak."},
    {txt:"Eftersom Frankrike var i kris hade Haiti blivit självständigt utan upproret.",ratt:false,miss:"strukturdeterminism",kommentar:"Krisen skapade en möjlighet, inte ett automatiskt utfall."},
    {txt:"Att upproret lyckades visar att handlingsutrymmet hela tiden var stort.",ratt:false,miss:"utfall_mater_utrymme",kommentar:"Ett osannolikt lyckat utfall bevisar inte goda ursprungsvillkor."}
  ],
  s:`<p>Historisk aktör betyder inte att vara fri från strukturer. Det betyder att göra val och påverka ett förlopp inom — eller mot — de ramar som finns.</p>`
},

{
  id:"hi-as-321", kap:3, omr:"as_samspel", familj:["mojlighetsfonster","vagning_av_orsaker"], niva:"A", svarstyp:"alternativ",
  t:`<p>Den svenska rösträttsreformen beslutades 1918–21 efter årtionden av organisering. Hösten 1918 föll monarkier i Europa, revolutionen i Tyskland kom nära Sverige och regeringen lade fram ett förslag som kunde vinna stöd i riksdagen.</p><p class="fragan">Vilka förklaringar väger aktör och struktur bäst?</p>`,
  alternativ:[
    {txt:"Krigsslutet och revolutionerna ändrade kostnaden för att säga nej, medan rörelsernas arbete gjorde att ett färdigt krav och en organisation redan fanns.",ratt:true,kommentar:"Här kopplas det korta möjlighetsfönstret till den långa mobiliseringen."},
    {txt:"Regeringens och partiledarnas förhandlingar påverkade reformens utformning, men deras handlingsutrymme hade skapats av trycket utanför riksdagen.",ratt:true,kommentar:"Aktörer på flera arenor påverkar varandra."},
    {txt:"Att väga orsaker innebär att fråga vilka som förklarar tidpunkten, vilka som förklarar kravet och vilka som förklarar beslutets form.",ratt:true,kommentar:"Betydelse kan delas upp efter vad som ska förklaras."},
    {txt:"Revolutionerna i Europa orsakade ensamma den svenska demokratin eftersom de tvingade riksdagen att godta reformen.",ratt:false,miss:"utlosande_som_ensam_orsak",kommentar:"De förklarar inte varför just detta reformförslag fanns."},
    {txt:"Folkrörelserna orsakade ensamma reformen eftersom deras långvariga arbete gjorde det politiska läget 1918 oviktigt.",ratt:false,miss:"lang_varaktighet_lika_med_hela_forklaringen",kommentar:"Lång kamp förklarar inte varför beslutet kom just 1918."},
    {txt:"Orsakernas betydelse kan inte vägas eftersom regeringen, partierna och folkrörelserna påverkade varandra genom kompromisser.",ratt:false,miss:"vagning_uppgiven",kommentar:"Dela upp det som ska förklaras och väg därefter."}
  ],
  s:`<p>En förklaring blir skarpare när den delar upp frågan: varför fanns kravet, varför kom beslutet då och varför fick reformen just den formen?</p>`
},

{
  id:"hi-as-322", kap:3, omr:"as_struktur", familj:["social_struktur","struktur_och_mojlighet"], niva:"A", svarstyp:"alternativ",
  kallor:[{bet:"A",titel:"Två livsbanor i samma stad",typ:"Sammanställda personuppgifter, 1880-talet",akthet:"konstruerad",
    text:`<p><strong>Anna:</strong> folkskola, fabriksarbete från 13 års ålder, ogift myndig vid 25.</p><p><strong>Erik:</strong> läroverk, universitet, statlig tjänst. Fadern betalade skolavgifterna och hade kontakter vid länsstyrelsen.</p>`,
    om:`<p>Personerna var lika gamla och hade goda skolomdömen. Anna var arbetardotter och Erik ämbetsmannason.</p>`,referens:"Konstruerad jämförelse för strukturanalys."}],
  t:`<p class="fragan">Vilka slutsatser om struktur kan materialet stödja?</p>`,
  alternativ:[
    {txt:"Kön, familjens ekonomi och tillgång till nätverk gav de två olika uppsättningar av realistiska val.",ratt:true,kommentar:"Strukturer verkar genom att göra vissa vägar möjliga och andra dyra eller stängda."},
    {txt:"Annas goda skolomdömen visar att skillnaden i livsbana inte enkelt kan förklaras med individuell förmåga.",ratt:true,kommentar:"Jämförelsen håller en faktor relativt lika och synliggör andra."},
    {txt:"Materialet illustrerar en mekanism men två personer räcker inte för att fastställa hur vanligt mönstret var.",ratt:true,kommentar:"Fall kan visa hur något gick till, inte ensamma hur ofta."},
    {txt:"Eriks utbildning visar att han gjorde bättre val.",ratt:false,miss:"utfall_som_personlig_egenskap",kommentar:"De hade inte samma valmeny från början."},
    {txt:"Strukturen bestämde fullständigt deras liv och lämnade inga möjliga undantag.",ratt:false,miss:"strukturdeterminism",kommentar:"Ojämlika sannolikheter är inte samma sak som förutbestämda liv."},
    {txt:"Eftersom personerna är påhittade kan uppgiften inte träna historisk analys.",ratt:false,miss:"ovningsfall_lika_med_belagg",kommentar:"Fallet är en modell för att öva analys; det ska däremot inte användas som historiskt belägg."}
  ],
  s:`<p>Struktur syns i <em>fördelningen av möjligheter</em>. Ett jämförande fall kan visa mekanismen, medan större material behövs för att visa omfattningen.</p>`
},

{
  id:"hi-fk-411", kap:4, omr:"fk_forandring_kontinuitet", familj:["forandring_och_bestandighet","vardagsliv"], niva:"E", svarstyp:"alternativ",
  t:`<p>En familj flyttade 1895 från en gård till en industristad. Fadern och den äldsta dottern fick lön på fabrik. Modern tog tvättarbete hemma, lagade mat och skötte de yngre barnen.</p><p class="fragan">Vad är förändring och vad är kontinuitet?</p>`,
  alternativ:[
    {txt:"Förändring: en större del av försörjningen kom från lönearbete utanför hemmet.",ratt:true,kommentar:"Försörjningens form förändrades."},
    {txt:"Kontinuitet: mycket obetalt omsorgs- och hushållsarbete låg fortfarande på modern.",ratt:true,kommentar:"Det osynliga arbetet levde kvar trots miljöbytet."},
    {txt:"Både förändring och kontinuitet kan finnas i samma familj och samma år.",ratt:true,kommentar:"De är två frågor, inte motsatser."},
    {txt:"Förändring: modern började arbeta först efter flytten.",ratt:false,miss:"arbete_forvaxlat_med_lonearbete",kommentar:"Obetalt arbete är också arbete."},
    {txt:"Kontinuitet: familjens vardag var i stort sett oförändrad.",ratt:false,miss:"kontinuitet_overdriven",kommentar:"Boende, tid, försörjning och arbetsplats förändrades."},
    {txt:"När en stor förändring har hittats behöver man inte leta efter kontinuitet.",ratt:false,miss:"antingen_eller",kommentar:"Frågorna ska alltid ställas tillsammans."}
  ],
  s:`<p>Byt måttstock: arbete, lön, bostad och ansvar i hemmet kan förändras i olika takt.</p>`
},

{
  id:"hi-fk-412", kap:4, omr:"fk_forandring_kontinuitet", familj:["reformens_granser","for_vem"], niva:"E", svarstyp:"alternativ",
  t:`<p>År 1866 ersattes Sveriges ståndsriksdag av en tvåkammarriksdag. Rösträtten knöts fortfarande till inkomst och förmögenhet. Kvinnor saknade politisk rösträtt och många män fick inte heller rösta.</p><p class="fragan">Vilka påståenden håller?</p>`,
  alternativ:[
    {txt:"Förändring: representationen byggde inte längre på de fyra stånden.",ratt:true,kommentar:"Institutionens form ändrades tydligt."},
    {txt:"Kontinuitet: politisk makt var fortfarande ojämnt fördelad och de flesta vuxna saknade rösträtt.",ratt:true,kommentar:"Vilka som deltog förändrades betydligt mindre."},
    {txt:"Om 1866 kallas ett demokratiskt genombrott måste det förklaras vilken del av demokrati som avses.",ratt:true,kommentar:"Begreppet behöver ett kriterium."},
    {txt:"Reformen införde allmän rösträtt för män eftersom de fyra ståndens representation avskaffades samtidigt.",ratt:false,miss:"reform_overdriven",kommentar:"Inkomst- och förmögenhetskrav fanns kvar."},
    {txt:"Reformen förändrade ingenting demokratiskt eftersom kvinnor och många män fortfarande saknade politisk rösträtt.",ratt:false,miss:"kontinuitet_upphaver_forandring",kommentar:"Formen förändrades även om deltagandet förblev snävt."},
    {txt:"Förändring och kontinuitet kan inte användas samtidigt eftersom en reform antingen är ett genombrott eller en fasad.",ratt:false,miss:"antingen_eller",kommentar:"Det är just kombinationen som ger en precis bild."}
  ],
  s:`<p>Fråga både <em>vad</em> institutionen blev och <em>vilka</em> som fick tillträde till den.</p>`
},

{
  id:"hi-fk-413", kap:4, omr:"fk_periodisering", familj:["periodisering_som_konstruktion","kulturellt_perspektiv"], niva:"C", svarstyp:"alternativ",
  t:`<p>I europeisk historia används ofta antiken, medeltiden och tidigmodern tid. Samma gränser passar sämre för Kinas, Västafrikas eller Amerikas historia.</p><p class="fragan">Vilka slutsatser om periodisering är rimliga?</p>`,
  alternativ:[
    {txt:"Perioderna bygger på förändringar som varit centrala i europeisk historia och blir därför mindre träffsäkra på andra platser.",ratt:true,kommentar:"Periodisering har alltid ett geografiskt perspektiv."},
    {txt:"En global framställning kan behöva flera parallella periodiseringar eller bredare teman.",ratt:true,kommentar:"Olika frågor kräver olika tidskartor."},
    {txt:"Att en indelning är konstruerad betyder att den ska motiveras, inte att den är meningslös.",ratt:true,kommentar:"Verktyg bedöms efter vad de hjälper oss att se."},
    {txt:"Den europeiska indelningen är korrekt eftersom den används i svenska läroböcker.",ratt:false,miss:"auktoritet_lika_med_belagg",kommentar:"Vanlighet gör inte ett verktyg universellt."},
    {txt:"Varje land måste ha helt unika perioder, annars är indelningen fel.",ratt:false,miss:"olikhet_overdriven",kommentar:"Jämförelse kräver ibland gemensamma ramar."},
    {txt:"Historien själv är indelad i naturliga epoker som forskare bara upptäcker.",ratt:false,miss:"periodgrans_som_natur",kommentar:"Gränser väljs utifrån kriterier och frågor."}
  ],
  s:`<p>Periodisering är en karta. Den kan vara användbar utan att vara neutral eller passa överallt.</p>`
},

{
  id:"hi-fk-414", kap:4, omr:"fk_forandring_kontinuitet", familj:["avkolonisering","forandring_och_bestandighet"], niva:"C", svarstyp:"alternativ",
  t:`<p>Indien blev självständigt från Storbritannien 1947. Den koloniala förvaltningen ersattes av en indisk regering, men engelska språket, järnvägsnätet och många administrativa och rättsliga institutioner levde vidare.</p><p class="fragan">Vilka analyser är rimliga?</p>`,
  alternativ:[
    {txt:"Självständigheten innebar en grundläggande förändring av den politiska suveräniteten.",ratt:true,kommentar:"Vem som ytterst styrde förändrades."},
    {txt:"Institutionell kontinuitet kunde både underlätta styrningen och bära vidare koloniala maktmönster.",ratt:true,kommentar:"Samma kontinuitet kan ha flera följder."},
    {txt:"Om graden av förändring ska bedömas måste politisk, ekonomisk och kulturell nivå skiljas åt.",ratt:true,kommentar:"De rörde sig inte lika snabbt."},
    {txt:"Eftersom järnvägarna fanns kvar var självständigheten bara symbolisk.",ratt:false,miss:"kontinuitet_upphaver_forandring",kommentar:"Materiell kontinuitet upphäver inte ny suveränitet."},
    {txt:"Eftersom landet blev självständigt upphörde kolonialismens konsekvenser 1947.",ratt:false,miss:"brytpunkt_som_total",kommentar:"En brytpunkt avslutar inte alla äldre strukturer."},
    {txt:"Engelska språkets fortsatta roll bevisar att britterna fortfarande styrde.",ratt:false,miss:"spar_lika_med_styrning",kommentar:"Ett historiskt arv är inte samma sak som fortsatt formell kontroll."}
  ],
  s:`<p>En politisk brytpunkt kan vara skarp samtidigt som ekonomiska, kulturella och institutionella mönster lever vidare.</p>`
},

{
  id:"hi-fk-415", kap:4, omr:"fk_periodisering", familj:["brytpunkter","kriterier_for_periodisering"], niva:"A", svarstyp:"alternativ",
  t:`<p>År 1989 föll Berlinmuren, 1991 upplöstes Sovjetunionen. Samtidigt fortsatte kärnvapen, militära allianser och flera regionala konflikter att prägla världen.</p><p class="fragan">Vilka resonemang om kalla krigets slut håller?</p>`,
  alternativ:[
    {txt:"1989 är en stark brytpunkt om fokus ligger på Östeuropas kommunistiska regimer; 1991 är starkare om fokus ligger på supermaktskonflikten.",ratt:true,kommentar:"Olika kriterier ger olika motiverade gränser."},
    {txt:"Att vissa strukturer levde vidare motsäger inte en brytpunkt, men begränsar vad vi påstår tog slut.",ratt:true,kommentar:"Brytpunkten måste preciseras."},
    {txt:"En period kan sluta politiskt före eller efter att människors vardag och institutioner hunnit förändras.",ratt:true,kommentar:"Förändringar är sällan synkroniserade."},
    {txt:"Endast ett av årtalen kan vara historiskt korrekt.",ratt:false,miss:"en_ratt_periodgrans",kommentar:"Kriteriet avgör vilket år som passar frågan."},
    {txt:"Eftersom Nato levde vidare tog kalla kriget aldrig slut.",ratt:false,miss:"kontinuitet_upphaver_brytpunkt",kommentar:"En kvarvarande institution upphäver inte hela förändringen."},
    {txt:"Berlinmurens fall är bäst bara för att det är den mest dramatiska händelsen.",ratt:false,miss:"dramatik_lika_med_betydelse",kommentar:"Dramatik är inget analyskriterium."}
  ],
  s:`<p>En brytpunkt ska skrivas som ett argument: <em>detta</em> ändrades, mätt med <em>detta kriterium</em>, vid <em>denna tid</em>.</p>`
},

{
  id:"hi-fk-416", kap:4, omr:"fk_periodisering", familj:["periodisering_som_konstruktion","miljohistoria"], niva:"A", svarstyp:"alternativ",
  t:`<p>Vissa forskare använder begreppet antropocen för en period då människors verksamhet blivit en kraft som påverkar hela jordens system. Föreslagna startpunkter är bland annat industrialiseringen omkring 1800 och den kraftiga ökningen av produktion och utsläpp efter 1950.</p><p class="fragan">Vilka analyser av periodiseringen är hållbara?</p>`,
  alternativ:[
    {txt:"Valet mellan 1800 och 1950 beror på om kriteriet är fossil industrialisering eller en mätbar global acceleration.",ratt:true,kommentar:"Först kriterium, sedan gräns."},
    {txt:"Namnet människans tidsålder kan dölja att olika samhällen och grupper bidragit mycket olika till förändringen.",ratt:true,kommentar:"En periodetikett kan fördela ansvar på ett visst sätt."},
    {txt:"Begreppet kan vara användbart även om startåret diskuteras, så länge användaren anger kriterium och begränsning.",ratt:true,kommentar:"Oenighet gör inte automatiskt verktyget värdelöst."},
    {txt:"Eftersom geologer deltar är detta inte en historisk periodisering.",ratt:false,miss:"disciplin_bestammer_fraga",kommentar:"Begreppet kan användas historiskt för mänsklig påverkan och ansvar."},
    {txt:"Den tidigaste föreslagna starten är bäst eftersom orsaker alltid är viktigare än konsekvenser.",ratt:false,miss:"tidigast_lika_med_bast",kommentar:"Bästa gräns beror på frågan."},
    {txt:"Ett exakt startår måste finnas för att en period ska vara meningsfull.",ratt:false,miss:"exakthet_kravs",kommentar:"Många historiska övergångar är gradvisa."}
  ],
  s:`<p>Periodiseringar beskriver inte bara tid; de väljer fokus och kan fördela synlighet och ansvar.</p>`
},

{
  id:"hi-hb-511", kap:5, omr:"hb_identifiera", familj:["identifiera_bruk","existentiellt_bruk"], niva:"E", svarstyp:"alternativ",
  t:`<p>En familj samlar gamla fotografier, spelar in mormors berättelser och gör en bok till de yngsta barnen med rubriken <em>Varifrån vi kommer</em>.</p><p class="fragan">Hur kan detta beskrivas?</p>`,
  alternativ:[
    {txt:"Det är historiebruk eftersom familjen använder äldre fotografier och berättelser för ett nutida syfte.",ratt:true,kommentar:"Bruket behöver inte vara offentligt eller politiskt."},
    {txt:"Bruket är främst existentiellt och identitetsskapande eftersom boken skapar tillhörighet mellan generationerna.",ratt:true,kommentar:"Fråga vad historien gör för användarna."},
    {txt:"Familjens urval påverkar berättelsen eftersom både bevarade och utelämnade minnen formar helheten.",ratt:true,kommentar:"Alla berättelser väljer."},
    {txt:"Det är inte historiebruk eftersom fotografierna bara används privat och inte visas för allmänheten.",ratt:false,miss:"offentlighet_kravs",kommentar:"Även vardagsliv och familjer använder historia."},
    {txt:"Det är vetenskapligt historiebruk eftersom intervjuerna spelas in noggrant och sparas för framtiden.",ratt:false,miss:"metod_bestammer_brukstyp",kommentar:"Metoden avgör inte huvudsyftet."},
    {txt:"Det finns inget historiebruk att analysera om alla berättelser i familjeboken är historiskt sanna.",ratt:false,miss:"sanning_utesluter_urval",kommentar:"Sanna uppgifter kan väljas och ordnas till olika berättelser."}
  ],
  s:`<p>Historiebruk finns också i vardagen. Här används familjens förflutna för identitet, minne och gemenskap.</p>`
},

{
  id:"hi-hb-512", kap:5, omr:"hb_typer", familj:["vetenskapligt_bruk","pedagogiskt_bruk"], niva:"E", svarstyp:"alternativ",
  t:`<p>Ett museum gör en utställning om ett skeppsvrak. Arkeologer daterar fynden och redovisar osäkerheter. Pedagoger väljer sedan ut tio föremål och bygger en berättelse som skolklasser kan följa.</p><p class="fragan">Vilka beskrivningar är rimliga?</p>`,
  alternativ:[
    {txt:"Det är vetenskapligt historiebruk när fynden dateras, prövas och redovisas tillsammans med sina osäkerheter.",ratt:true,kommentar:"Syftet är att undersöka och ompröva kunskap."},
    {txt:"Det är också pedagogiskt historiebruk när museets urval gör kunskapen begriplig för skolklasser.",ratt:true,kommentar:"Flera bruk kan finnas samtidigt."},
    {txt:"Museets urval behöver analyseras eftersom äkta föremål ändå kan ordnas till olika berättelser.",ratt:true,kommentar:"Äkta delar skapar inte automatiskt en heltäckande berättelse."},
    {txt:"Det är enbart vetenskapligt historiebruk eftersom arkeologerna ansvarar för dateringen av de utställda fynden.",ratt:false,miss:"yrke_bestammer_brukstyp",kommentar:"Samma projekt kan ha flera syften."},
    {txt:"Det är främst kommersiellt historiebruk eftersom besökarna betalar entré för att se utställningen.",ratt:false,miss:"pengar_lika_med_kommersiellt_bruk",kommentar:"Intäkter finns i många verksamheter utan att vara huvudsyftet."},
    {txt:"Det pedagogiska historiebruket är mindre tillförlitligt eftersom en förenklad berättelse aldrig kan vara vetenskaplig.",ratt:false,miss:"forenkling_lika_med_falskt",kommentar:"Förenkling kan vara sakligt hållbar om urval och osäkerhet hanteras öppet."}
  ],
  s:`<p>Kategorierna beskriver syften, inte yrken eller platser. Ett museum kan förena vetenskapligt, pedagogiskt och ibland kommersiellt bruk.</p>`
},

{
  id:"hi-hb-513", kap:5, omr:"hb_syfte", familj:["minnesmarke","konflikt_om_historia"], niva:"C", svarstyp:"alternativ",
  kallor:[{bet:"A",titel:"Två förslag till en statytext",typ:"Minnesmärke i nutid",akthet:"konstruerad",
    text:`<p><strong>Förslag 1:</strong> Till stadens store grundare, som skapade arbete och välstånd.</p><p><strong>Förslag 2:</strong> Här verkade industrimannen N.N. Hans fabriker gav arbete men byggde också på barnarbete och farliga arbetsmiljöer.</p>`,
    om:`<p>Kommunen diskuterar om en äldre staty ska få en ny skylt.</p>`,referens:"Konstruerad källa för analys av minnespolitik."}],
  t:`<p class="fragan">Vilka analyser av förslagen är rimliga?</p>`,
  alternativ:[
    {txt:"Båda är historiebruk eftersom de väljer olika delar av personens liv till en offentlig berättelse.",ratt:true,kommentar:"Konflikten gäller urval och betydelse."},
    {txt:"Förslag 1 skapar en hjälteberättelse medan förslag 2 visar ett mer konfliktfyllt historiskt arv.",ratt:true,kommentar:"Formuleringarna ger personen olika funktion i nutiden."},
    {txt:"Valet av text kan påverka vilka grupper som känner sig inkluderade i stadens gemensamma minne.",ratt:true,kommentar:"Historiebruk får sociala följder."},
    {txt:"Förslag 2 är en neutral historisk beskrivning eftersom både positiva och negativa uppgifter nämns.",ratt:false,miss:"balans_lika_med_neutral",kommentar:"Även ett balanserande urval är ett urval med syfte."},
    {txt:"Endast ett förslag som innehåller historiska sakfel kan påverka hur personen används i nutiden.",ratt:false,miss:"felaktig_alltsa_bruk",kommentar:"Även korrekta berättelser används."},
    {txt:"Statyn tillhör det förflutna och kan därför inte få en ny betydelse genom dagens värderingar.",ratt:false,miss:"minnesmarke_utan_nutid",kommentar:"Att bevara, ändra eller förklara är nutida val."}
  ],
  s:`<p>Minnesmärken visar att historia inte bara handlar om vad som hänt, utan om vad ett samhälle väljer att hedra, förklara och föra vidare.</p>`
},

{
  id:"hi-hb-514", kap:5, omr:"hb_typer", familj:["kommersiellt_bruk","flera_bruk_samtidigt"], niva:"C", svarstyp:"alternativ",
  t:`<p>En turistort marknadsför sig som <em>den äkta vikingabyn</em>. Företag säljer hjälmar med horn, kommunen finansierar en arkeologisk park och lokala föreningar firar en vikingafestival.</p><p class="fragan">Vilka analyser håller?</p>`,
  alternativ:[
    {txt:"Det är kommersiellt historiebruk när vikingabilden används för att locka besökare och sälja varor.",ratt:true,kommentar:"Syftet är ekonomiskt."},
    {txt:"Projektet kan samtidigt vara identitetsskapande för orten och pedagogiskt i den arkeologiska parken.",ratt:true,kommentar:"Olika aktörer kan använda samma historia på olika sätt."},
    {txt:"Hornhjälmarna är en senare föreställning som används trots att marknadsföringen kallar miljön historiskt äkta.",ratt:true,kommentar:"Historiebrukets bild kan själv ha en historia."},
    {txt:"Hela projektet är kommersiellt historiebruk eftersom alla verksamheter på orten tjänar på turisterna.",ratt:false,miss:"en_kategori_racker",kommentar:"Huvudsyftet varierar mellan aktörerna."},
    {txt:"Den arkeologiska parken är vetenskapligt historiebruk eftersom den visar fynd på en historisk plats.",ratt:false,miss:"plats_bestammer_brukstyp",kommentar:"Metod, urval och syfte måste granskas."},
    {txt:"Souvenirerna är inte historiebruk eftersom hornhjälmarna ger en historiskt felaktig bild av vikingarna.",ratt:false,miss:"felaktig_alltsa_inte_bruk",kommentar:"Felaktighet kan vara central i analysen av bruket."}
  ],
  s:`<p>Utgå från varje aktör: avsändare, målgrupp och syfte. Samma festival kan bära flera bruk samtidigt.</p>`
},

{
  id:"hi-hb-515", kap:5, omr:"hb_syfte", familj:["icke_bruk","urval_som_stallningstagande"], niva:"A", svarstyp:"alternativ",
  t:`<p>Ett företags jubileumsbok beskriver hundra år av uppfinningar, exportframgångar och arbetstillfällen. Boken nämner inte att företaget sålde varor till en diktatur eller att arbetare strejkade efter flera dödsolyckor.</p><p class="fragan">Vilka analyser av tystnaden är rimliga?</p>`,
  alternativ:[
    {txt:"Utelämnandena kan vara icke-bruk eftersom vissa delar av historien stör jubileumsbokens positiva syfte.",ratt:true,kommentar:"Tystnad kan vara ett aktivt urval."},
    {txt:"Medvetet icke-bruk kan beläggas genom att undersöka företagets kunskap och redaktionens dokumenterade urval.",ratt:true,kommentar:"Avsaknad ensam visar inte avsikt."},
    {txt:"Den positiva företagsberättelsen är samtidigt ett kommersiellt och identitetsskapande historiebruk riktat till läsarna.",ratt:true,kommentar:"Bruk och icke-bruk kan finnas i samma produkt."},
    {txt:"Alla händelser som inte får plats i jubileumsboken är exempel på företagets medvetna icke-bruk.",ratt:false,miss:"all_utelamning_lika_med_ickebruk",kommentar:"Begreppet kräver ett meningsfullt eller strategiskt bortval."},
    {txt:"Utelämnandena bevisar att företagsledningen skäms för olyckorna och försöker dölja sitt historiska ansvar.",ratt:false,miss:"motiv_som_faktum",kommentar:"Det är en hypotes som kräver belägg."},
    {txt:"De sanna uppgifterna om framgångarna gör boken till historieskrivning utan något nutida historiebruk.",ratt:false,miss:"sanning_utesluter_bruk",kommentar:"Sanna delar kan ordnas till en starkt styrd helhet."}
  ],
  s:`<p>Icke-bruk är svårare att belägga än bruk. Visa först den betydelsefulla tystnaden, sedan att bortvalet var känt och fyller en funktion.</p>`
},

{
  id:"hi-hb-516", kap:5, omr:"hb_syfte", familj:["minnesdag","flera_bruk_samtidigt"], niva:"A", svarstyp:"alternativ",
  t:`<p>På Förintelsens minnesdag håller överlevande tal, skolor arbetar med vittnesmål, politiker varnar för antisemitism och medier berättar personliga livsöden.</p><p class="fragan">Vilka analyser av historiebruket är rimliga?</p>`,
  alternativ:[
    {txt:"Minnesdagen förenar existentiellt, moraliskt, pedagogiskt och politiskt historiebruk för flera olika målgrupper.",ratt:true,kommentar:"Bruken överlappar och har olika tyngd för olika deltagare."},
    {txt:"Politikerns nutida varning kan granskas samtidigt som minnet av offren och vittnesmålens betydelse erkänns.",ratt:true,kommentar:"Man kan analysera bruket utan att avfärda dess moraliska betydelse."},
    {txt:"Urvalet av röster och erfarenheter påverkar vilken bild av Förintelsen som förs vidare på minnesdagen.",ratt:true,kommentar:"Urval finns även i angeläget minnesarbete."},
    {txt:"Minnesdagens goda och demokratiska syfte gör en analys av dess urval och budskap överflödig.",ratt:false,miss:"gott_syfte_utesluter_analys",kommentar:"Analys är inte samma sak som misstänkliggörande."},
    {txt:"Minnesdagen är främst vetenskapligt historiebruk eftersom tal och undervisning bygger på historiskt belagda händelser.",ratt:false,miss:"sant_lika_med_vetenskapligt",kommentar:"Syftet är bredare än forskning."},
    {txt:"De många olika syftena gör att begreppet historiebruk inte kan användas på minnesdagen.",ratt:false,miss:"komplexitet_som_undanflykt",kommentar:"Kategorierna är frågor att ställa, inte fack som måste vara rena."}
  ],
  s:`<p>En mogen analys frågar inte bara vilken etikett som passar. Den visar vilka aktörer, syften, urval och följder som samverkar.</p>`
},

{
  id:"hi-ha-611", kap:6, omr:"ha_belagg", familj:["slutsats_inom_kallan","belagg_och_pastaende"], niva:"E", svarstyp:"alternativ",
  kallor:[{bet:"A",titel:"Fabriksregel",typ:"Ordningsstadga, 1904",akthet:"konstruerad",
    text:`<p>Arbetet börjar klockan 6. Sen ankomst medför löneavdrag. Samtal vid maskinerna är förbjudna. Skadad arbetare ska genast anmälas till förmannen.</p>`,
    om:`<p>Regeln satt upp på fabrikens vägg. Vi vet inte hur noga den följdes.</p>`,referens:"Konstruerad källa."}],
  t:`<p class="fragan">Vilka slutsatser stöds direkt av källan?</p>`,
  alternativ:[
    {txt:"Fabriksledningen ville att arbetet skulle börja klockan 6.",ratt:true,kommentar:"Regeln belägger ett krav."},
    {txt:"Ledningen försökte kontrollera tid och samtal på arbetsplatsen.",ratt:true,kommentar:"Flera regler pekar mot samma slutsats."},
    {txt:"Skador förekom som en situation reglerna behövde hantera.",ratt:true,kommentar:"Regeln visar att möjligheten var känd, men inte hur ofta det hände."},
    {txt:"Alla arbetare kom i tid.",ratt:false,miss:"regel_lika_med_praktik",kommentar:"En regel visar vad som krävdes, inte vad alla gjorde."},
    {txt:"Arbetarna var missnöjda med reglerna.",ratt:false,miss:"reaktion_utan_belagg",kommentar:"Källan innehåller ingen arbetarreaktion."},
    {txt:"Fabriken hade fler olyckor än andra fabriker.",ratt:false,miss:"jamforelse_utan_material",kommentar:"Jämförelsen saknar både antal och andra fabriker."}
  ],
  s:`<p>Skilj mellan <em>regel</em>, <em>praktik</em> och <em>reaktion</em>. Källan belägger bara den första direkt.</p>`
},

{
  id:"hi-ha-612", kap:6, omr:"ha_belagg", familj:["fakta_och_slutsats","slutsats_inom_kallan"], niva:"E", svarstyp:"alternativ",
  t:`<p>En stads befolkning ökade från 8&nbsp;000 personer år 1850 till 42&nbsp;000 år 1900. Under samma period öppnade tre fabriker och järnvägen nådde staden.</p><p class="fragan">Vilka påståenden håller sig inom beläggen?</p>`,
  alternativ:[
    {txt:"Stadens befolkning ökade kraftigt under perioden.",ratt:true,kommentar:"Det följer direkt av siffrorna."},
    {txt:"Fabriker och järnväg är rimliga delar av en förklaring, men uppgifterna ensamma visar inte hur mycket varje faktor bidrog.",ratt:true,kommentar:"Rimlig hypotes är inte färdig slutsats."},
    {txt:"Mer material behövs om inflyttning, födelsetal, stadsgränser och arbetstillfällen.",ratt:true,kommentar:"Det är precis materialet som kan pröva förklaringen."},
    {txt:"Järnvägen orsakade hela befolkningsökningen eftersom den öppnade under samma period som invånarantalet steg.",ratt:false,miss:"samvariation_som_orsak",kommentar:"Samtidighet räcker inte för storleken på effekten."},
    {txt:"Alla nya invånare arbetade i fabrikerna eftersom fabrikerna var den enda förändring som nämns i underlaget.",ratt:false,miss:"alla_fran_total",kommentar:"Totalsiffran säger inget om yrken."},
    {txt:"Staden blev rikare i samma takt som den blev större eftersom befolkningstal direkt mäter ekonomiskt välstånd.",ratt:false,miss:"vardering_utan_matt",kommentar:"Rikare behöver definieras och beläggas separat."}
  ],
  s:`<p>Ett belägg kan säkert visa förändringen utan att ensamt visa orsaken. Markera skillnaden mellan observation, hypotes och slutsats.</p>`
},

{
  id:"hi-ha-613", kap:6, omr:"ha_tolkning", familj:["olika_tolkning_samma_material","urval"], niva:"C", svarstyp:"alternativ",
  t:`<p>Två historiker studerar svenska strejker 1900–1920. Historiker A räknar antal strejker och ser en växande arbetarrörelse. Historiker B läser polisrapporter från tre industristäder och betonar statens kontroll.</p><p class="fragan">Hur bör tolkningarna jämföras?</p>`,
  alternativ:[
    {txt:"De besvarar delvis olika frågor och behöver därför inte motsäga varandra.",ratt:true,kommentar:"Först identifiera påståendet, sedan jämföra."},
    {txt:"A har större bredd men kan missa hur konflikterna upplevdes; B har mer detalj men ett snävare och myndighetsstyrt urval.",ratt:true,kommentar:"Metodernas styrkor och begränsningar är olika."},
    {txt:"För att avgöra räckvidden bör båda redovisa urval och visa hur väl materialet täcker deras slutsats.",ratt:true,kommentar:"Tolkning vägs mot belägg."},
    {txt:"A är den bättre tolkningen eftersom stora mängder siffror alltid är mer objektiva än myndighetstexter.",ratt:false,miss:"siffra_lika_med_objektiv",kommentar:"Vad som räknas som en strejk och vilka fall som registreras är också tolkningar."},
    {txt:"B är den bättre tolkningen eftersom detaljer från tre städer automatiskt förklarar utvecklingen i hela landet.",ratt:false,miss:"detalj_lika_med_battre",kommentar:"Detalj kan inte ensam bära en nationell slutsats."},
    {txt:"Båda tolkningarna är lika starka eftersom historiska slutsatser aldrig kan jämföras med gemensamma kriterier.",ratt:false,miss:"relativism",kommentar:"Tolkningar kan jämföras genom täckning, logik och invändningar."}
  ],
  s:`<p>Jämför fråga, urval, metod och räckvidd. Olika tolkning betyder inte automatiskt konflikt — och aldrig att allt är lika välgrundat.</p>`
},

{
  id:"hi-ha-614", kap:6, omr:"ha_belagg", familj:["motbelagg","tesprovning"], niva:"C", svarstyp:"alternativ",
  t:`<p>En elev hävdar: ”Industrialiseringen förbättrade genast livet för svenska arbetare.” Som belägg använder eleven att mängden producerade varor ökade snabbt.</p><p class="fragan">Vilka invändningar prövar tesen i sak?</p>`,
  alternativ:[
    {txt:"Ökad produktion visar inte hur löner, arbetstid, bostäder och hälsa förändrades för arbetarna.",ratt:true,kommentar:"Belägget mäter något annat än slutsatsen."},
    {txt:"Ordet genast kräver material från industrialiseringens tidiga skede, inte bara ett långt genomsnitt.",ratt:true,kommentar:"Tidsordet gör tesen prövbar."},
    {txt:"Tesen kan stärkas eller försvagas genom jämförelser mellan grupper och perioder.",ratt:true,kommentar:"Specificera vad som skulle räknas som motbelägg."},
    {txt:"Eleven har fel eftersom industrialisering alltid är dålig för arbetare.",ratt:false,miss:"mottes_med_mottes",kommentar:"Det ersätter en obelagd tes med en annan."},
    {txt:"Elevens politiska åsikt gör belägget oanvändbart.",ratt:false,miss:"personangrepp",kommentar:"Pröva sambandet mellan produktion och levnadsvillkor."},
    {txt:"Eftersom varor blev fler måste levnadsstandarden ha stigit lika mycket.",ratt:false,miss:"produktion_lika_med_fordelning",kommentar:"Produktion säger inte hur resultatet fördelades."}
  ],
  s:`<p>En stark invändning träffar länken mellan belägg och slutsats. Här mäter produktionen inte automatiskt arbetarnas levnadsvillkor.</p>`
},

{
  id:"hi-ha-615", kap:6, omr:"ha_tolkning", familj:["historiografisk_debatt","vagning_av_tolkningar"], niva:"A", svarstyp:"alternativ",
  t:`<p>Historiker A förklarar franska revolutionen främst med klasskonflikter och ståndsprivilegier. Historiker B betonar statens skuldkris och hur politiska beslut bröt sönder monarkin. Båda använder delvis samma händelser.</p><p class="fragan">Hur kan tolkningarna vägas?</p>`,
  alternativ:[
    {txt:"Pröva vilken tolkning som bäst förklarar både den breda mobiliseringen och den exakta politiska krisen 1789.",ratt:true,kommentar:"En stark tolkning bör täcka flera centrala delar av förloppet."},
    {txt:"Undersök om A kan förklara varför konflikten bröt ut just då och om B kan förklara varför så många grupper mobiliserades.",ratt:true,kommentar:"Varje tolkning prövas där den verkar svagast."},
    {txt:"En kombination är stark endast om sambandet mellan förklaringarna visas; att bara skriva båda spelade roll räcker inte.",ratt:true,kommentar:"Syntes kräver en mekanism."},
    {txt:"A och B är lika sanna eftersom historia alltid kan tolkas olika.",ratt:false,miss:"relativism",kommentar:"De kan ha olika förklaringskraft."},
    {txt:"Den nyaste tolkningen bör väljas eftersom forskning alltid går framåt.",ratt:false,miss:"nyast_lika_med_bast",kommentar:"Nytt datum ersätter inte belägg."},
    {txt:"Den enklaste förklaringen är bäst även om den lämnar stora delar oförklarade.",ratt:false,miss:"enkelhet_som_regel",kommentar:"Enkelhet hjälper först när förklaringskraften är tillräcklig."}
  ],
  s:`<p>Väg tolkningar genom räckvidd och prövning: vad förklarar de väl, vad lämnar de öppet och hur möter de den starkaste invändningen?</p>`
},

{
  id:"hi-ha-616", kap:6, omr:"ha_tolkning", familj:["bygga_forklaring","vagning_av_orsaker"], niva:"A", svarstyp:"alternativ",
  t:`<p>En elev ska förklara Sveriges demokratisering och har belägg för folkrörelsernas tillväxt, rösträttsreformerna 1866–1921, industrialisering, internationella revolutioner 1917–18 och partiernas förhandlingar.</p><p class="fragan">Vilka sätt att bygga argumentet är starkast?</p>`,
  alternativ:[
    {txt:"Låt folkrörelserna förklara hur krav och deltagande byggdes upp, och det internationella läget förklara varför motståndet försvagades 1918.",ratt:true,kommentar:"Varje belägg får en tydlig funktion."},
    {txt:"Använd reformerna som en tidslinje, men skilj mellan beslutens form och vilka grupper som faktiskt inkluderades.",ratt:true,kommentar:"Kronologi blir analys när förändringens innebörd preciseras."},
    {txt:"Avsluta med en vägd slutsats som anger både långsiktiga villkor, aktörer och utlösande läge.",ratt:true,kommentar:"Slutsatsen ska besvara hur delarna hänger ihop."},
    {txt:"Rada upp alla belägg i datumordning; sambandet blir då självklart.",ratt:false,miss:"kronologi_lika_med_forklaring",kommentar:"En tidslinje visar när, inte automatiskt varför."},
    {txt:"Välj den enda verkliga orsaken så blir argumentet tydligare.",ratt:false,miss:"monokausalitet",kommentar:"Tydlighet kommer från samband, inte från att radera orsaker."},
    {txt:"Undvik en egen slutsats eftersom historiker kan värdera orsaker olika.",ratt:false,miss:"vagning_uppgiven",kommentar:"En motiverad vägning är själva uppgiften."}
  ],
  s:`<p>Ett historiskt argument är mer än en lista: varje belägg ska göra ett bestämt arbete i förklaringen och slutsatsen ska väga delarna.</p>`
},

{
  id:"hi-ha-617", kap:6, omr:"ha_belagg", familj:["tystnad_som_belagg","argument_fran_franvaro"], niva:"A", svarstyp:"alternativ",
  t:`<p>En historiker har läst 200 bevarade brev från svenska emigranter i Minnesota 1880–1900. Ingen brevskrivare nämner politiska möten. Historikern drar slutsatsen att svenska emigranter inte var politiskt aktiva.</p><p class="fragan">Vilka bedömningar av argumentet håller?</p>`,
  alternativ:[
    {txt:"Tystnad blir starkt belägg först om politiska möten är något man rimligen borde ha nämnt i just dessa brev.",ratt:true,kommentar:"Frånvaro betyder något bara när närvaro vore förväntad."},
    {txt:"Urvalet måste granskas: vilka skrev, till vem, vilka brev bevarades och vilka emigranter saknas?",ratt:true,kommentar:"Bevarandet kan skapa en sned bild."},
    {txt:"Andra källor som föreningsprotokoll, tidningar och medlemslistor kan pröva slutsatsen direkt.",ratt:true,kommentar:"Välj material där aktiviteten lämnar förväntade spår."},
    {txt:"Tvåhundra brev är så många att tystnaden bevisar slutsatsen.",ratt:false,miss:"stor_mangd_ersatter_urval",kommentar:"Ett stort skevt urval är fortfarande skevt."},
    {txt:"Eftersom breven är privata berättar de allt som var viktigt för skribenterna.",ratt:false,miss:"privat_lika_med_fullstandigt",kommentar:"Brev formas av mottagare, syfte och vad som anses värt att berätta."},
    {txt:"Frånvaro kan aldrig användas som historiskt belägg.",ratt:false,miss:"tystnad_aldrig_belagg",kommentar:"Den kan användas när vi kan visa att ett spår borde ha funnits."}
  ],
  s:`<p>Argument från tystnad kräver en kontrollfråga: <em>borde detta ha lämnat ett spår här?</em> Om svaret är osäkert är slutsatsen också osäker.</p>`
}

];

/* Utvecklingskontroll för språkliga ledtrådar. Funktionen ändrar ingenting
   i banken utan returnerar uppgifter som behöver en mänsklig granskning.
   Kvoten jämför rätta och felaktiga alternativs genomsnittliga ordantal. */
function granskaSvarsalternativHist(bank){
  var lista=Array.isArray(bank)?bank:BANKHIST;
  function ord(s){
    return String(s||"").replace(/<[^>]+>/g," ").replace(/&[^;]+;/g," ")
      .trim().split(/\s+/).filter(Boolean).length;
  }
  return lista.map(function(t){
    var ratt=(t.alternativ||[]).filter(function(a){return a.ratt;}).map(function(a){return ord(a.txt);});
    var fel=(t.alternativ||[]).filter(function(a){return !a.ratt;}).map(function(a){return ord(a.txt);});
    if(!ratt.length||!fel.length) return null;
    var r=ratt.reduce(function(a,b){return a+b;},0)/ratt.length;
    var f=fel.reduce(function(a,b){return a+b;},0)/fel.length;
    var kvot=r/f;
    var alla=ratt.concat(fel);
    var spann=Math.max.apply(null,alla)-Math.min.apply(null,alla);
    if(kvot>=0.67&&kvot<=1.50&&spann<=16) return null;
    return {id:t.id,kvot:Number(kvot.toFixed(2)),rattOrd:Number(r.toFixed(1)),felOrd:Number(f.toFixed(1)),spann:spann};
  }).filter(Boolean);
}

if(typeof window!=="undefined"){
  window.BANKHIST=BANKHIST;
  window.granskaSvarsalternativHist=granskaSvarsalternativHist;
}
