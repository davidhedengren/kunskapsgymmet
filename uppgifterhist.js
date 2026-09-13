/* =====================================================================
   uppgifterhist.js  —  Historia nivå 1, Kunskapsgymmet
   PROTOTYP 1 — 32 uppgifter

   FORMAT
     id            unik sträng
     kap           kapitel = förmåga (se strukturhist.js)
     omr           område inom förmågan
     familj        delmoment (används av den adaptiva motorn)
     niva          E = nivå 1, C = nivå 2, A = nivå 3
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

   OM KÄLLTEXTERNA: texterna är förkortade och återgivna i modern
   svenska. Där det står "Referat" är innehållet sammanfattat, inte
   ordagrant. Gå till originalet innan enskilda ordval används i
   undervisningen.
   ===================================================================== */

var BANKHIST = [

/* =====================================================================
   KAPITEL 1 — KÄLLKRITIK
   ===================================================================== */

{
  id:"hi-kk-101", kap:1, omr:"kk_tendens",
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
  id:"hi-kk-102", kap:1, omr:"kk_tendens",
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
  id:"hi-kk-103", kap:1, omr:"kk_beroende",
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
  id:"hi-kk-104", kap:1, omr:"kk_narhet",
  familj:["narhet_i_rum","tendens_religios"], niva:"C",
  svarstyp:"alternativ",
  kallor:[{
    bet:"A",
    titel:"Adam av Bremen om templet i Uppsala",
    typ:"Kyrkohistoriskt verk, latin, ca 1075",
    akthet:"autentisk",
    text:`<p>Detta folk har ett mycket berömt tempel, som kallas Uppsala
    och ligger inte långt från staden Sigtuna. I detta tempel, som är helt
    och hållet smyckat med guld, dyrkar folket bilderna av tre gudar.</p>
    <p>Den mäktigaste av dem, Tor, har sin plats mitt i rummet. På ömse
    sidor om honom sitter Oden och Frej. Tor råder, säger de, i luften och
    styr åska och blixt, vind och regn, väderlek och gröda. Oden, det vill
    säga Raseriet, för krig och ger människan mod mot fiender. Den tredje,
    Frej, skänker de dödliga fred och lust, och hans bild förses med en
    väldig manslem.</p>
    <p>Alla deras gudar har präster tillsatta, vilka frambär folkets offer.
    Råder hungersnöd och pest offrar man åt Tor, står krig för dörren åt
    Oden, och skall bröllop firas åt Frej.</p>
    <p>Vart nionde år brukar dessutom hållas en gemensam fest i Uppsala för
    alla Sveariket landskap. Ingen får utebli från denna fest. Kungar och
    folk, alla och envar, sänder sina gåvor till Uppsala, och — vilket är
    grymmare än allt annat straff — de som redan antagit kristendomen måste
    friköpa sig från dessa ceremonier.</p>
    <p>Offret går till så, att av varje levande varelse av hankön offras
    nio stycken, med vilkas blod det är sed att blidka gudarna. Kropparna
    hänges upp i en lund som ligger intill templet. Denna lund är så helig
    för folket, att varje träd i den anses gudomligt genom de offrades död
    och förruttnelse. Där hänger också hundar och hästar tillsammans med
    människor, och en kristen har berättat för mig att han sett sjuttiotvå
    sådana kroppar hänga där om varandra.</p>
    <p>Om de sånger som brukar sjungas vid själva offerhandlingen är
    mångahanda och oanständiga, och därför är det bäst att förbigå dem med
    tystnad.</p>`,
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
    {txt:"Problemet är att texten är skriven på latin och därför måste översättas.",
     ratt:false, miss:"sprak_som_kallkritiskt_problem",
     kommentar:"Översättning är ett praktiskt arbete, inte ett källkritiskt problem i sig. Latinet säger inget om uppgifternas kvalitet."},
    {txt:"Eftersom Adam levde på 1000-talet är han samtida med templet och därmed nära i tid.",
     ratt:false, miss:"narhet_i_tid_racker",
     kommentar:"Närhet i tid stämmer. Men han var 80 mil därifrån och hade aldrig varit på plats — närhet i rum är det som fattas."},
    {txt:"Att en av sagesmännen var kung gör uppgifterna säkrare, eftersom en kung har bättre insyn än andra.",
     ratt:false, miss:"auktoritet_som_belagg",
     kommentar:"Sven Estridsen var dansk kristen kung med egna intressen i hur Sverige framställdes. Hög ställning är inte samma sak som oberoende."},
    {txt:"Att beskrivningen är detaljerad — antalet gudar, antalet offer, antalet kroppar — talar för att den bygger på egna iakttagelser.",
     ratt:false, miss:"detaljrikedom_som_belagg",
     kommentar:"Detaljer kan lika gärna komma från en god berättare som från ett ögonvittne. Nio och sjuttiotvå är dessutom talsymbolik."}
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
  id:"hi-kk-105", kap:1, omr:"kk_beroende",
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
  id:"hi-kk-106", kap:1, omr:"kk_anvandbarhet",
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
     kommentar:"Kyrkan hade ingen anledning att ljuga om vem som bodde var. Administrativa källor är ofta starkast just på struktur."}
  ],
  s:`<p>Användbarhet är alltid användbarhet <em>till något</em>. Samma
  källa är utmärkt för en fråga och oanvändbar för nästa.</p>
  <p>Administrativa källor är starka på struktur — vem, var, hur många —
  och svaga på upplevelse och orsak.</p>`
},

{
  id:"hi-kk-107", kap:1, omr:"kk_tendens",
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
  id:"hi-kk-108", kap:1, omr:"kk_akthet",
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
  id:"hi-kk-109", kap:1, omr:"kk_anvandbarhet",
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
    {txt:"Sammankallandet av generalständerna i maj 1789.",
     ratt:false, miss:"utlosande_kallad_bakomliggande",
     kommentar:"Det ligger nära i tid och är snarare en följd av krisen — en utlösande faktor."},
    {txt:"Missväxten 1788.",
     ratt:false, miss:"utlosande_kallad_bakomliggande",
     kommentar:"Missväxten ligger nära i tid och fungerar som utlösande faktor. Att dåliga skördar slog så hårt beror däremot på strukturer — och där börjar bakgrunden."},
    {txt:"Napoleons maktövertagande.",
     ratt:false, miss:"kronologi_omvand",
     kommentar:"1799, tio år senare. Kronologin gör det omöjligt."},
    {txt:"Att Ludvig XVI var en obeslutsam person.",
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
    {txt:"Att emigrationen fortsatte under industrialiseringen visar att industrins arbetstillfällen inte räckte till för alla som saknade försörjning.",
     ratt:true,
     kommentar:"Bra resonemang. Två utvecklingar samtidigt betyder ofta att den ena inte löste det den andra svarade på."},
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
    {txt:"Reformationen i Sverige berodde enbart på Gustav Vasas skulder.",
     ratt:false, miss:"monokausalitet",
     kommentar:"Skulderna förklarar varför pengar behövdes, inte varför just kyrkan kunde angripas utan uppror i hela riket."},
    {txt:"Reformationen i Sverige berodde enbart på att befolkningen övertygades av Luthers teologi.",
     ratt:false, miss:"monokausalitet",
     kommentar:"Beslutet togs uppifrån, av politiska och ekonomiska skäl, långt innan lärans innehåll slagit igenom brett."},
    {txt:"Eftersom Gustav Vasa tjänade på beslutet kan de religiösa argumenten avfärdas som svepskäl.",
     ratt:false, miss:"motiv_lika_med_forklaring",
     kommentar:"Att någon tjänar på något är ett skäl att granska argumenten — inte ett bevis för att de var oärliga. Det är ett vanligt kortslut."},
    {txt:"Att reformationen genomfördes uppifrån visar att befolkningen var likgiltig.",
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
    {txt:"Att militär över huvud taget fanns på plats följde av en struktur: Sverige saknade en ordningsmakt som kunde hantera stora konflikter.",
     ratt:true,
     kommentar:"Strukturen förklarar varför soldater med skarp ammunition stod framför ett demonstrationståg."},
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
    {txt:"Eftersom miljontals reste var besluten inte individuella.",
     ratt:false, miss:"struktur_utraderar_aktor",
     kommentar:"Ett mönster består av enskilda beslut. Att mönstret finns gör inte besluten mindre verkliga."},
    {txt:"Eftersom varje beslut var individuellt behövs ingen strukturell förklaring.",
     ratt:false, miss:"aktor_utraderar_struktur",
     kommentar:"Då blir det obegripligt varför besluten klumpar ihop sig i tid och rum."},
    {txt:"Emigrationens omfattning visar att Sverige var Europas fattigaste land.",
     ratt:false, miss:"enskilt_matt_generaliserat",
     kommentar:"Utvandringsintensiteten var hög, men det följer inte. Att emigrera kräver dessutom resurser och kontakter — de allra fattigaste reste ofta inte."},
    {txt:"Kedjemigration — att man reste dit släktingar redan fanns — är ett exempel på en struktur utan aktörer.",
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
  id:"hi-fk-401", kap:4, omr:"fk_forandring",
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
  id:"hi-fk-402", kap:4, omr:"fk_kontinuitet",
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
    {txt:"Gränsen 1050 är fastställd genom en samtida källa.",
     ratt:false, miss:"periodgrans_som_handelse",
     kommentar:"Ingen skrev 1050 att en epok tog slut. Indelningen är gjord långt senare."},
    {txt:"Perioder är godtyckliga och därför meningslösa.",
     ratt:false, miss:"konstruktion_lika_med_vardelos",
     kommentar:"Att något är konstruerat gör det inte värdelöst. Perioder gör jämförelser och samtal möjliga — de ska bara inte förväxlas med verkligheten."},
    {txt:"Periodiseringen gäller lika bra för hela Norden samtidigt.",
     ratt:false, miss:"periodisering_universell",
     kommentar:"Kristnandet gick olika snabbt i olika områden, vilket är ett av skälen till att gränsen diskuteras."},
    {txt:"Eftersom perioderna delas in olika i olika länder är den svenska indelningen felaktig.",
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
    {txt:"1809 är den rätta brytpunkten eftersom den regeringsformen gällde längst.",
     ratt:false, miss:"varaktighet_lika_med_betydelse",
     kommentar:"Hur länge något varar är inte samma sak som hur mycket det förändrade."},
    {txt:"1918–21 är den enda möjliga brytpunkten, eftersom demokrati per definition betyder allmän rösträtt.",
     ratt:false, miss:"definition_forutsatt",
     kommentar:"Det är en försvarbar hållning — men den måste argumenteras för. Och rösträtten var 1921 fortfarande villkorad på flera sätt."},
    {txt:"Eftersom förändringen skedde gradvis finns det inga brytpunkter.",
     ratt:false, miss:"gradvis_utesluter_brytpunkt",
     kommentar:"Gradvisa förlopp kan mycket väl ha punkter där takten eller riktningen ändras. De ska bara motiveras."},
    {txt:"Brytpunkter bör alltid sättas vid krig, eftersom krig förändrar mest.",
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
    {txt:"Kommersiellt historiebruk: historien används för att sälja en vara.",
     ratt:true,
     kommentar:"Syftet avgör kategorin, och syftet är här försäljning."},
    {txt:"Bruket bygger på en bild av vikingar som formades under 1800-talets nationalromantik, snarare än på vad forskningen visar.",
     ratt:true,
     kommentar:"Det brukade förflutna är ofta ett tidigare bruk, inte källmaterialet."},
    {txt:"Detta är inte ett exempel på ett historiebruk.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Jo. Så snart en bild av det förflutna används för ett syfte i nuet är det historiebruk."},
    {txt:"Vetenskapligt historiebruk, eftersom vikingatiden är ett väl utforskat område.",
     ratt:false, miss:"amne_bestammer_brukstyp",
     kommentar:"Vilken typ av bruk det rör sig om avgörs av syftet, inte av hur välutforskat ämnet är."},
    {txt:"Eftersom bilden är historiskt felaktig är det inget historiebruk.",
     ratt:false, miss:"felaktig_alltsa_inte_bruk",
     kommentar:"Historiebruk behöver inte vara korrekt. De felaktiga bilderna är ofta de mest använda."},
    {txt:"Ideologiskt historiebruk, eftersom drakskeppet är en nationell symbol.",
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
    {txt:"Ideologiskt och nationellt bruk: en bild av det svenska byggs upp och ges en plats att visas på.",
     ratt:true,
     kommentar:"Urvalet av byggnader, landskap och tidsskikt bär ett budskap om vad Sverige är."},
    {txt:"Bruket är samtidigt sammanvävt med ett vetenskapligt syfte — insamling och dokumentation av föremål och byggnader som annars gått förlorade.",
     ratt:true,
     kommentar:"Ett och samma projekt kan tillhöra flera kategorier samtidigt."},
    {txt:"Detta är inte ett exempel på ett historiebruk.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Ett friluftsmuseum är historiebruk i närmast renodlad form."},
    {txt:"Icke-bruk, eftersom syftet var att bevara och inte att påverka.",
     ratt:false, miss:"bevara_lika_med_neutralt",
     kommentar:"Icke-bruk är när tillgänglig historia medvetet lämnas oanvänd och tystas. Att bevara är en aktiv handling — och urvalet är ett ställningstagande."},
    {txt:"Kommersiellt bruk är den enda rimliga beskrivningen, eftersom Skansen tar entré.",
     ratt:false, miss:"pengar_lika_med_kommersiellt_bruk",
     kommentar:"Det finns ett kommersiellt inslag, men det förklarar varken urvalet eller varför museet byggdes just då."},
    {txt:"Eftersom byggnaderna är äkta ger utställningen en objektiv bild av bondesamhället.",
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
    {txt:"Politiskt–moraliskt bruk: en historisk händelse används för att göra motståndarens ståndpunkt moraliskt omöjlig.",
     ratt:true,
     kommentar:"Det är inte historien som argumenteras om, utan dagens fråga som laddas med historiens moral."},
    {txt:"Jämförelsen fungerar genom att den flyttar över laddningen från eftergiftspolitiken till dagens fråga, utan att likheterna behöver prövas.",
     ratt:true,
     kommentar:"Den som ska bemöta analogin tvingas först bevisa att hon inte är Chamberlain. Det är själva poängen med greppet."},
    {txt:"Detta är inte ett exempel på ett historiebruk.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Historiska analogier i politisk debatt är ett av de vanligaste bruken av alla."},
    {txt:"Vetenskapligt bruk, eftersom München 1938 verkligen inträffade.",
     ratt:false, miss:"sant_lika_med_vetenskapligt",
     kommentar:"Att händelsen är verklig säger ingenting om i vilket syfte den används."},
    {txt:"Eftersom jämförelsen historiskt sett haltar är det inte historiebruk.",
     ratt:false, miss:"felaktig_alltsa_inte_bruk",
     kommentar:"Haltande jämförelser är fortfarande bruk — ofta de mest verkningsfulla."},
    {txt:"Existentiellt bruk, eftersom politikern uttrycker starka känslor.",
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
    {txt:"Detta är inte ett exempel på ett historiebruk.",
     sist:true, ratt:true,
     kommentar:"Rätt. Här undersöks jordens historia, och ingen bild av det mänskliga förflutna används för ett syfte i nuet."},
    {txt:"Det som saknas är att en bild av det förflutna <em>används</em> i en samtida fråga — undersökningen stannar vid att ta reda på något.",
     ratt:true,
     kommentar:"Gränsen går vid bruket. Att undersöka är inte i sig att bruka."},
    {txt:"Vetenskapligt historiebruk, eftersom det är forskning om det förflutna.",
     ratt:false, miss:"forskning_lika_med_historiebruk",
     kommentar:"Vetenskapligt historiebruk handlar om att historievetenskapliga resultat används — i ett museum, en debatt, en lärobok. Geologisk datering av berg hör inte dit."},
    {txt:"Kommersiellt bruk, eftersom tidskriften säljs.",
     ratt:false, miss:"pengar_lika_med_kommersiellt_bruk",
     kommentar:"Att något kostar pengar gör det inte till kommersiellt historiebruk."},
    {txt:"Eftersom samma dateringsmetoder används av arkeologer är det historiebruk.",
     ratt:false, miss:"metod_bestammer_brukstyp",
     kommentar:"Metoden avgör inte. Frågan är vad som brukas och i vilket syfte."},
    {txt:"Ideologiskt bruk, eftersom bergskedjan ligger i Sverige och Norge.",
     ratt:false, miss:"geografi_bestammer_brukstyp",
     kommentar:"Var något ligger avgör ingenting om bruket."}
  ],
  ledtrad:"Två frågor: brukas mänsklig historia? Och brukas den till något i nuet?",
  s:`<p>Historiebruk kräver två saker: att det handlar om det <em>mänskliga</em>
  förflutna, och att det <em>används</em> för ett syfte i nuet.</p>
  <p>Faller någon av dem bort är det något annat — forskning, naturvetenskap,
  eller bara en uppgift om vad som hände.</p>`
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
    {txt:"Ideologiskt historiebruk: historien används för att legitimera en politisk ordning och en rasföreställning.",
     ratt:true,
     kommentar:"Det är läroboksexemplet på ideologiskt bruk."},
    {txt:"Att verksamheten kallades forskning gör den inte vetenskaplig — slutsatserna var givna innan materialet undersöktes.",
     ratt:true,
     kommentar:"Vetenskaplighet handlar om att slutsatsen kan falla på materialet. Här kunde den inte det."},
    {txt:"Detta är inte ett exempel på ett historiebruk.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Det är historiebruk i en av sina mest genomförda former."},
    {txt:"Vetenskapligt bruk, eftersom utbildade arkeologer deltog.",
     ratt:false, miss:"forskare_lika_med_vetenskap",
     kommentar:"Vem som håller i spaden avgör inte. Det är arbetssättet och förhållandet till materialet som gör något vetenskapligt."},
    {txt:"Eftersom påståendena var falska saknar verksamheten historiskt intresse.",
     ratt:false, miss:"falskt_lika_med_ointressant",
     kommentar:"Tvärtom. Den är en förstklassig källa till nazismens självbild och till hur historia kan sättas i ideologins tjänst."},
    {txt:"Icke-bruk, eftersom obekväma fynd doldes.",
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
    {txt:"A är i första hand existentiellt bruk: historien används för att förankra vem man är och var man hör hemma.",
     ratt:true,
     kommentar:"Existentiellt bruk handlar om identitet och orientering, ofta i det lilla."},
    {txt:"B rymmer flera bruk samtidigt — identitetsskapande för orten, men också kommersiellt och politiskt, eftersom firandet ska locka besökare och stärka bilden av kommunen.",
     ratt:true,
     kommentar:"Offentliga jubileer är nästan alltid flera bruk i samma paket."},
    {txt:"Detta är inte ett exempel på ett historiebruk.",
     sist:true, ratt:false, miss:"bruk_ej_igenkant",
     kommentar:"Båda fallen är historiebruk. Att ett bruk är privat och småskaligt gör det inte till något annat."},
    {txt:"A är vetenskapligt bruk, eftersom hon använder arkivmaterial.",
     ratt:false, miss:"metod_bestammer_brukstyp",
     kommentar:"Materialet avgör inte syftet. Hon söker sitt ursprung, inte ny kunskap för ett forskarsamhälle."},
    {txt:"B är icke-bruk, eftersom firandet är okontroversiellt.",
     ratt:false, miss:"icke_bruk_missforstatt",
     kommentar:"Icke-bruk är tystnad om det som finns, inte frånvaro av konflikt."},
    {txt:"Ett historiebruk kan bara tillhöra en kategori.",
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
    {txt:"En av dem måste ha läst materialet felaktigt.",
     ratt:false, miss:"oenighet_lika_med_slarv",
     kommentar:"Oenighet mellan historiker beror sällan på läsfel. Nästan alltid på fråga, definition eller urval."},
    {txt:"Eftersom de är oense går materialet inte att använda för den här typen av fråga.",
     ratt:false, miss:"oenighet_lika_med_oanvandbart",
     kommentar:"Tvärtom — att två läsningar är möjliga är just varför materialet är värt att arbeta med."},
    {txt:"Historia bygger på tolkningar, och därför är båda slutsatserna lika välgrundade.",
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
  id:"hi-ha-603", kap:6, omr:"ha_jamfora",
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
    {txt:"Den förklaring som flest läroböcker anger är den mest sannolika.",
     ratt:false, miss:"auktoritet_lika_med_belagg",
     kommentar:"Läroböcker släpar efter forskningsläget och kopierar dessutom ofta varandra."},
    {txt:"Eftersom alla fyra är rimliga behöver man inte välja.",
     ratt:false, miss:"komplexitet_som_undanflykt",
     kommentar:"Att väga är uppgiften. 'Allt spelade in' är en beskrivning, inte en förklaring."},
    {txt:"Befolkningstrycket kan avfärdas eftersom det inte finns folkräkningar från vikingatiden.",
     ratt:false, miss:"avsaknad_av_siffror_lika_med_avfardat",
     kommentar:"Frånvaro av statistik är inte frånvaro av belägg. Gravar, bebyggelselämningar och odlingsspår används som indikationer."},
    {txt:"Den enklaste förklaringen är alltid den bästa.",
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
  id:"hi-kk-110", kap:1, omr:"kk_akthet",
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
  id:"hi-kk-111", kap:1, omr:"kk_beroende",
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
    {txt:"Att hornhjälmar faktiskt finns belagda i Nordeuropa stöder påståendet om vikingatiden.",
     ratt:false, miss:"fel_period_som_belagg",
     kommentar:"Bronsålder och vikingatid skiljs åt av mer än tusen år. Rätt föremål, fel århundrade, är inget belägg."},
    {txt:"Eftersom inga bevarade vikingatida hjälmar har horn är saken bevisad en gång för alla.",
     ratt:false, miss:"franvaro_som_slutgiltigt_bevis",
     kommentar:"Frånvaro av fynd är ett starkt skäl men inte ett definitivt bevis — särskilt när bevarade hjälmar är så få."},
    {txt:"Eftersom uppgiften kommer från opera och måleri är den ett medvetet bedrägeri.",
     ratt:false, miss:"misstag_lika_med_bedrageri",
     kommentar:"En kostymör som vill ha dramatisk verkan bedrar ingen. Felet uppstod i konsten och vandrade sedan in i faktatexter."},
    {txt:"Eftersom böckerna är populärvetenskapliga kan de aldrig användas som källor.",
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
  id:"hi-kk-112", kap:1, omr:"kk_anvandbarhet",
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
  id:"hi-fk-410", kap:4, omr:"fk_kontinuitet",
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
    {txt:"Förändring: ansvaret för barns undervisning flyttades från hemmet till en institution som varje socken var skyldig att hålla.",
     ratt:true,
     kommentar:"Skyldigheten är det nya. Före 1842 fanns undervisning, men ingen som var skyldig att ordna en skola."},
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
    {txt:"Det är historiebruk: en bild av det förflutna används för ett syfte i nuet — här för att säga något om vilka värden orten vill stå för.",
     ratt:true,
     kommentar:"Det är kärnan i begreppet. Bruket ligger i användningen, inte i uppgifterna."},
    {txt:"Det är inte historiebruk, eftersom uppgifterna om arbetarledaren är sanna.",
     ratt:false, miss:"sanning_utesluter_bruk",
     kommentar:"Sant och brukat är olika saker. Också korrekt historia kan användas för ett syfte."},
    {txt:"Det är vetenskapligt bruk, eftersom kommunen tagit reda på fakta om henne.",
     ratt:false, miss:"faktakoll_lika_med_vetenskap",
     kommentar:"Att kontrollera uppgifter gör inte en invigning till forskning. Syftet är att hedra, inte att pröva en tes."},
    {txt:"Det är kommersiellt bruk, eftersom gatunamn kan höja fastighetsvärdet.",
     ratt:false, miss:"fel_brukstyp",
     kommentar:"Möjlig bieffekt, men inte syftet med talet och namngivningen."},
    {txt:"Det är icke-bruk, eftersom ingen tvingas läsa gatuskylten.",
     ratt:false, miss:"ickebruk_missforstatt",
     kommentar:"Icke-bruk betyder att man medvetet låter bli att använda något ur det förflutna — inte att bruket är frivilligt att lägga märke till."},
    {txt:"Detta är inte ett exempel på ett historiebruk.",
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
}

];

if(typeof window!=="undefined") window.BANKHIST=BANKHIST;
