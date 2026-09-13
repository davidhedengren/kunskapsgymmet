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
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Dagbok, vintern 1718–19</div>
    <p>Vi har nu gått fjorton dagar utan bröd. Många av mina kamrater blev
    liggande i snön och orkade inte upp igen. Officerarna red, vi gick. Den
    som klagade fick höra att kungen visste bäst.</p>
    <div class="kall-ref">Referat i modern svenska av anteckningar från en
    karolinsk soldat under fälttåget mot Norge. Förkortat.</div>
  </div>
  <p class="fragan">En historiker vill undersöka <em>hur meniga svenska
  soldater upplevde fälttåget</em>. Vilka bedömningar av källan är
  rimliga?</p>`,
  alternativ:[
    {txt:"Källan är oanvändbar eftersom soldaten uppenbart är partisk mot befälen.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"En tendentiös källa är inte en dålig källa. Tendensen berättar något i sig: att motsättningen mellan meniga och befäl fanns och upplevdes."},
    {txt:"Källan är användbar just för den här frågan — den ger en deltagares egen upplevelse. Att det är <em>en</em> soldat gör däremot att den inte automatiskt visar hur alla upplevde fälttåget.",
     ratt:true,
     kommentar:"Precis. Frågan gäller upplevelsen, och då är soldatens perspektiv poängen. Urvalet är däremot en enda person."},
    {txt:"Att anteckningarna gjordes under fälttåget stärker dem, eftersom minnet inte hunnit formas om av vad som hände sedan.",
     ratt:true,
     kommentar:"Närhet i tid är ett styrkeskäl. Det gör inte källan sann, men minskar risken för efterhandskonstruktion."},
    {txt:"Källan är en sekundärkälla, eftersom soldaten själv var med om det han beskriver.",
     ratt:false, miss:"primar_sekundar_forvaxlad",
     kommentar:"Tvärtom. Att han var med gör den till en primärkälla för fälttåget."},
    {txt:"Källan är tillförlitlig eftersom den är samtida, och kan därför användas rakt av.",
     ratt:false, miss:"samtida_lika_med_sant",
     kommentar:"Samtidighet är ett argument bland flera, inte en kvalitetsstämpel. En samtida källa kan minnas fel, överdriva eller bara se en liten del."},
    {txt:"Källan bör avfärdas eftersom den är förkortad och återgiven i modern svenska.",
     ratt:false, miss:"bearbetning_som_diskvalificering",
     kommentar:"Bearbetningen är värd att notera — ordval kan ha glidit — men den gör inte innehållet oanvändbart. Du går till originalet när ordvalen spelar roll."}
  ],
  ledtrad:"Fråga dig först: vad vill historikern veta? Användbarhet avgörs alltid mot en frågeställning.",
  s:`<p>Tendens diskvalificerar inte en källa. Den styr vad källan kan
  användas <em>till</em>. Här är frågan hur soldater upplevde kriget — då
  är soldatens eget perspektiv precis det som efterfrågas.</p>
  <p>Det som däremot begränsar källan är urvalet: en enskild röst.
  Närheten i tid är ett styrkeskäl, inte en garanti.</p>`
},

{
  id:"hi-kk-102", kap:1, omr:"kk_tendens",
  familj:["tendens_bestallare","kvarleva_vs_berattande"], niva:"E",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Krönika, 1560-talet</div>
    <p>Krönikan skildrar Gustav Vasas flykt undan danskarna och hans väg till
    makten. Motståndarna framställs som trolösa, och att flykten lyckades
    förklaras med Guds försyn.</p>
    <div class="kall-ref">Referat. Krönikan skrevs av Peder Swart, Gustav
    Vasas hovpredikant, på kungens uppdrag.</div>
  </div>
  <p class="fragan">Vilka bedömningar av krönikan är rimliga?</p>`,
  alternativ:[
    {txt:"Krönikan har en tydlig tendens: den är beställd av den person den handlar om. Uppgifter som gynnar Gustav Vasa måste stödjas av annat material innan de används som fakta.",
     ratt:true,
     kommentar:"Ja. Beställarförhållandet är det första du noterar."},
    {txt:"Krönikan är en förstklassig källa till en annan fråga: hur Gustav Vasa ville att hans maktövertagande skulle uppfattas.",
     ratt:true,
     kommentar:"Här används krönikan som kvarleva — en rest av det den var med om att skapa, nämligen en bild av kungen."},
    {txt:"Krönikan är värdelös eftersom den är beställd.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Beställd betyder styrd, inte tom. Den är utmärkt för frågan om självbild."},
    {txt:"Krönikan är en primärkälla till Gustav Vasas flykt 1520–21, eftersom den handlar om den.",
     ratt:false, miss:"handlar_om_lika_med_primar",
     kommentar:"Vad en källa handlar om avgör inte om den är primär. Krönikan skrevs fyrtio år senare av någon som inte var med."},
    {txt:"Eftersom krönikan skrevs av en präst kan man utgå från att den är sanningsenlig.",
     ratt:false, miss:"auktoritet_lika_med_sant",
     kommentar:"Yrke och ställning är ingen garanti. Här är hovpredikanten dessutom beroende av kungen."},
    {txt:"Att krönikan skrevs långt efter händelserna spelar ingen roll, eftersom den bygger på Gustav Vasas egna minnen.",
     ratt:false, miss:"beroende_missad",
     kommentar:"Det är ett beroendeproblem, inte en garanti: uppgifterna kommer från huvudpersonen själv och har dessutom passerat fyrtio år."}
  ],
  s:`<p>En källa som är styrd av sin beställare kan sällan användas rakt av
  som <em>berättande</em> källa om vad som hände. Men som <em>kvarleva</em>
  av en maktkamp om historieskrivningen är den ofta oöverträffad.</p>
  <p>Skilj på "vad säger källan hände?" och "vad är källan i sig ett spår
  av?".</p>`
},

{
  id:"hi-kk-103", kap:1, omr:"kk_beroende",
  familj:["beroende_tradering","avstand_i_tid"], niva:"C",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Kungasagor, ca 1230</div>
    <p>Snorre Sturlassons <em>Heimskringla</em> skildrar norska kungar på
    900- och 1000-talen, med detaljerade scener och repliker. Snorre bygger
    på äldre skaldekväden och på muntlig tradition.</p>
    <div class="kall-ref">Nedtecknat på Island omkring 1230.</div>
  </div>
  <p class="fragan">Vilka slutsatser om källäget är rimliga?</p>`,
  alternativ:[
    {txt:"Det ligger 250–300 år mellan händelserna och nedteckningen. Uppgifterna har passerat många led muntligt, och varje led kan ha ändrat dem.",
     ratt:true,
     kommentar:"Avstånd i tid plus muntlig tradering är kärnan i problemet."},
    {txt:"Skaldekvädena kan ändå ha bevarat vissa uppgifter förhållandevis väl, eftersom bunden vers med rim och stavrim är svårare att ändra i än fri berättelse.",
     ratt:true,
     kommentar:"Just därför väger forskare kvädena annorlunda än de berättande partierna. Källkritik är inte allt-eller-inget."},
    {txt:"Eftersom Snorre använde äldre källor är hans uppgifter förstahandsuppgifter.",
     ratt:false, miss:"anvander_kallor_lika_med_primar",
     kommentar:"Att använda källor gör en författare till andrahandsberättare, inte till ögonvittne."},
    {txt:"Heimskringla är oanvändbar för vikingatiden och bör inte användas alls.",
     ratt:false, miss:"beroende_som_diskvalificering",
     kommentar:"Den används — men med försiktighet, och helst i kombination med arkeologi och samtida källor."},
    {txt:"Om två av Snorres berättelser säger samma sak är uppgiften bekräftad av två oberoende källor.",
     ratt:false, miss:"beroende_missad",
     kommentar:"Två uppgifter från samma författare, eller ur samma muntliga tradition, är beroende av varandra. Bekräftelse kräver oberoende ursprung."},
    {txt:"Snorre var islänning och skrev om norska kungar, vilket gör honom neutral.",
     ratt:false, miss:"utanforskap_lika_med_neutralitet",
     kommentar:"Att stå utanför skyddar inte mot tendens. Snorre skrev inom en politisk kultur med egna intressen och för en publik med förväntningar."}
  ],
  s:`<p>Beroende handlar om varifrån uppgifterna kommer. Fem berättelser som
  alla går tillbaka på samma muntliga tradition är i källkritisk mening
  <em>en</em> källa.</p>
  <p>Samtidigt är avstånd i tid inte samma sak som värdelöshet. Olika delar
  av samma verk kan bedömas olika.</p>`
},

{
  id:"hi-kk-104", kap:1, omr:"kk_narhet",
  familj:["narhet_i_rum","tendens_religios"], niva:"E",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Kyrkohistoriskt verk, ca 1075</div>
    <p>Adam av Bremen beskriver ett tempel i Uppsala med gudabilder av guld,
    och en helig lund där människor och djur offrades och hängdes upp i
    träden.</p>
    <div class="kall-ref">Referat. Adam var kristen domherre i Bremen, besökte
    aldrig Uppsala och byggde bland annat på uppgifter från den danske
    kungen Sven Estridsen. Verket skrevs som en historia över ärkestiftets
    mission i Norden.</div>
  </div>
  <p class="fragan">Vilka källkritiska problem är relevanta här?</p>`,
  alternativ:[
    {txt:"Adam var aldrig på plats. Uppgifterna är andrahandsuppgifter, förmedlade av personer med egna intressen.",
     ratt:true,
     kommentar:"Närhet i rum. Den som inte var där är beroende av någon annans berättelse."},
    {txt:"Adam skriver som kristen om hedendom, i ett verk som ska motivera mission. Det gör framställningen tendentiös på ett sätt som kan ha förstärkt det främmande och skrämmande.",
     ratt:true,
     kommentar:"Syftet med texten styr urvalet. Här finns ett intresse av att hedendomen framstår som barbarisk."},
    {txt:"Problemet är att texten är skriven på latin.",
     ratt:false, miss:"sprak_som_problem",
     kommentar:"Språket försvårar läsningen men är inget källkritiskt problem i sig. Latin var vetenskapens och kyrkans språk."},
    {txt:"Eftersom Adam levde på 1000-talet är han samtida med templet och därmed ett säkert vittne.",
     ratt:false, miss:"samtida_lika_med_sant",
     kommentar:"Samtida, ja. Vittne, nej — han var inte där."},
    {txt:"Uppgiften är trovärdig eftersom en av sagesmännen var kung.",
     ratt:false, miss:"auktoritet_lika_med_sant",
     kommentar:"En kung med intresse av att framställa grannriket på ett visst sätt är ingen neutral sagesman."},
    {txt:"Texten kan inte säga någonting alls om förhållandena i Uppsala.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Den säger åtminstone en sak: att det fanns en kristen bild av Uppsala som hedendomens centrum. Det är i sig en historisk uppgift."}
  ],
  s:`<p>Två problem sammanfaller: avstånd i rum (Adam var aldrig där) och
  tendens (texten ska motivera mission).</p>
  <p>Men källan blir inte tom. Den är en förstklassig källa till hur
  kristna i Nordtyskland såg på Norden på 1070-talet.</p>`
},

{
  id:"hi-kk-105", kap:1, omr:"kk_beroende",
  familj:["beroende_samma_upphov"], niva:"C",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa A och B · Två dagstidningar, maj 1931</div>
    <p>Två svenska dagstidningar publicerar samma dag varsin notis om skotten
    i Ådalen. Texterna är nästan ordagrant lika: båda bygger på samma telegram
    från Tidningarnas Telegrambyrå.</p>
  </div>
  <p class="fragan">Vilka slutsatser är rimliga?</p>`,
  alternativ:[
    {txt:"Att två tidningar skriver samma sak är här ingen bekräftelse — notiserna har samma upphov.",
     ratt:true,
     kommentar:"Det här är beroendeprincipen i sin renaste form."},
    {txt:"För att pröva uppgiften behövs material med annat ursprung: polisens och militärens rapporter, protokoll eller ögonvittnen.",
     ratt:true,
     kommentar:"Oberoende betyder att uppgifterna inte går tillbaka på varandra."},
    {txt:"Två tidningar som skriver likadant styrker uppgiften.",
     ratt:false, miss:"beroende_missad",
     kommentar:"Bara om de kommit fram till den oberoende av varandra. Här har de kopierat samma telegram."},
    {txt:"Dagstidningar kan aldrig användas som historiska källor.",
     ratt:false, miss:"kalltyp_som_diskvalificering",
     kommentar:"Tidningar används hela tiden — som källor både till händelser och till hur händelser framställdes."},
    {txt:"Eftersom notiserna är samtida med händelsen är de tillförlitliga.",
     ratt:false, miss:"samtida_lika_med_sant",
     kommentar:"De första rapporterna från en kaotisk händelse är ofta de mest felaktiga."},
    {txt:"Tidningarnas politiska färg saknar betydelse när texten är ett telegram.",
     ratt:false, miss:"tendens_bara_i_ordval",
     kommentar:"Telegramtexten är densamma, men rubrik, placering, bildval och vad som stryks är tidningens egna beslut — och där syns tendensen ofta tydligast."}
  ],
  s:`<p>Antalet källor som säger samma sak betyder ingenting förrän du vet om
  de är oberoende. Fem tidningar med samma telegram är en källa, inte fem.</p>`
},

{
  id:"hi-kk-106", kap:1, omr:"kk_anvandbarhet",
  familj:["anvandbarhet_vs_fraga"], niva:"E",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Husförhörslängd, 1880-talet</div>
    <p>Kyrkoboken listar varje hushåll i socknen: namn, födelseår, relation
    till husbonden, in- och utflyttningar samt prästens noteringar om hur
    personerna klarat förhöret i katekesen.</p>
  </div>
  <p class="fragan">Vad kan materialet användas till?</p>`,
  alternativ:[
    {txt:"Att undersöka hushållens storlek och sammansättning i socknen.",
     ratt:true,
     kommentar:"Det här är precis vad materialet systematiskt registrerar."},
    {txt:"Att kartlägga flyttmönster — vilka som kom och vilka som lämnade socknen.",
     ratt:true,
     kommentar:"In- och utflyttningsnoteringarna gör detta möjligt, ofta år för år."},
    {txt:"Att ta reda på vad enskilda personer kände inför att flytta.",
     ratt:false, miss:"kalla_svarar_pa_allt",
     kommentar:"Listan registrerar att någon flyttade, inte varför eller hur det kändes. För det behövs brev, dagböcker eller intervjuer."},
    {txt:"Att avgöra varför emigrationen från Sverige ökade på 1880-talet.",
     ratt:false, miss:"beskrivning_lika_med_forklaring",
     kommentar:"Materialet visar <em>att</em> och <em>vilka</em>. Orsaker kräver andra källor och en argumentation."},
    {txt:"Ingenting, eftersom listorna fördes av prästen och därför är partiska.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Prästen hade litet intresse av att förfalska födelseår. Administrativt material hör till det mest användbara vi har."},
    {txt:"Att fastställa hur stor andel av socknen som var läskunnig — prästens noteringar är en objektiv mätning.",
     ratt:false, miss:"officiell_lika_med_objektiv",
     kommentar:"Noteringarna är en bedömning gjord av en person med ett bestämt syfte: att pröva kunskaper i katekesen. De går att använda, men måste tolkas."}
  ],
  s:`<p>Användbarhet är alltid användbarhet <em>till något</em>. Samma källa
  kan vara utmärkt för en fråga och oanvändbar för nästa.</p>
  <p>Administrativa källor är starka på struktur och svaga på upplevelse.</p>`
},

{
  id:"hi-kk-107", kap:1, omr:"kk_tendens",
  familj:["tendens_kommersiell","motstridiga_kallor"], niva:"C",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Broschyr från en emigrantagent, 1885</div>
    <p>Amerika beskrivs som det fria landet. Jorden sägs vara fet och billig,
    lönerna höga, och den som arbetar hårt lovas bli sin egen på några år.</p>
    <div class="kall-ref">Referat. Agenten fick provision per såld biljett.</div>
  </div>
  <div class="kalla">
    <div class="kall-topp">Källa B · Brev hem från Minnesota, 1887</div>
    <p>Skribenten berättar om långa arbetsdagar, kyla på vintern, och att han
    saknar syskonen. Han skriver också att han tjänar mer än han någonsin
    gjorde som dräng i Sverige.</p>
    <div class="kall-ref">Referat.</div>
  </div>
  <p class="fragan">Vilka bedömningar av de båda källorna är rimliga?</p>`,
  alternativ:[
    {txt:"Broschyren har ett kommersiellt syfte — agenten tjänade på varje biljett — och bilden är därför medvetet ljus.",
     ratt:true,
     kommentar:"Ekonomiskt intresse är en av de starkaste tendensindikatorerna."},
    {txt:"Broschyren är samtidigt en förstklassig källa till en annan fråga: hur emigrationen marknadsfördes i Sverige.",
     ratt:true,
     kommentar:"Tendensen är inte problemet utan svaret, om frågan handlar om marknadsföring."},
    {txt:"Brevet är objektivt eftersom det är privat.",
     ratt:false, miss:"privat_lika_med_sant",
     kommentar:"Privata brev har också tendens. Man skriver till en mottagare, och kan tona ned motgångar för att inte oroa eller för att inte medge ett misstag."},
    {txt:"Eftersom källorna säger emot varandra måste den ena ljuga.",
     ratt:false, miss:"motsagelse_lika_med_logn",
     kommentar:"De kan båda ha rätt om olika saker. Att lönen var högre och att arbetet var hårt är inte varandras motsatser."},
    {txt:"Broschyren är oanvändbar eftersom den är reklam.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Reklam är ett av de rikaste källmaterialen vi har — till frågan om vad som såldes in och till vem."},
    {txt:"Brevet väger tyngre eftersom det skrevs senare och skribenten därmed var bättre informerad.",
     ratt:false, miss:"senare_lika_med_battre",
     kommentar:"Senare är inte automatiskt bättre. Här är det två olika slags källor med olika syften, inte två versioner av samma sak."}
  ],
  s:`<p>Två källor som pekar åt olika håll är inte automatiskt en konflikt. Steg
  ett är att fråga vad var och en faktiskt påstår, och om påståendena ens
  gäller samma sak.</p>`
},

{
  id:"hi-kk-108", kap:1, omr:"kk_akthet",
  familj:["bildkalla","arrangerad_kalla"], niva:"C",
  svarstyp:"alternativ",
  t:`<div class="kalla bild">
    <div class="kall-topp">Källa A · Fotografi, ca 1900</div>
    <p>Ett trettiotal arbetare står uppställda i tre raka led framför en
    verkstadsbyggnad. Alla ser in i kameran. Flera bär rena förkläden.
    Maskiner och en travers syns bakom dem.</p>
    <div class="kall-ref">Fotografiet beställdes av fabriksledningen.</div>
  </div>
  <p class="fragan">Vilka bedömningar av bilden är rimliga?</p>`,
  alternativ:[
    {txt:"Bilden är arrangerad. Den visar hur fabriken ville visa upp sig, inte hur en arbetsdag såg ut.",
     ratt:true,
     kommentar:"Uppställningen, blickarna i kameran och de rena förklädena är alla spår av arrangemanget."},
    {txt:"Bilden kan ändå användas som källa till maskinparken, byggnadens utseende och till vilka kategorier av arbetare som fanns på plats.",
     ratt:true,
     kommentar:"Det oavsiktliga i en bild är ofta det mest användbara: det som råkade komma med."},
    {txt:"Ett fotografi kan inte ljuga och är därför den säkraste typen av källa.",
     ratt:false, miss:"foto_lika_med_sanning",
     kommentar:"Ett foto visar vad som fanns framför kameran i ett ögonblick — valt av någon, för något."},
    {txt:"Att ledningen beställt bilden gör den oanvändbar.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Beställningen styr motivet men raderar inte innehållet."},
    {txt:"Bilden visar att arbetsmiljön var ren och ordnad.",
     ratt:false, miss:"arrangerat_lika_med_verklighet",
     kommentar:"Den visar att arbetsmiljön kunde framställas som ren och ordnad. Det är något annat."},
    {txt:"Eftersom bilden saknar text kan den inte användas som källa.",
     ratt:false, miss:"text_kravs_for_kalla",
     kommentar:"Bilder är källor på samma villkor som texter, och läses med samma frågor: vem, när, varför, för vem?"}
  ],
  s:`<p>Fråga alltid en bild vem som höll i kameran och varför. Det avsiktliga
  budskapet är en sak; det oavsiktliga innehållet — verktyg, kläder, lokaler,
  vilka som är med — är ofta det historiskt mest givande.</p>`
},

{
  id:"hi-kk-109", kap:1, omr:"kk_anvandbarhet",
  familj:["anvandbarhet_vs_fraga","tvangssituation"], niva:"A",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Domboksprotokoll, Mora 1669</div>
    <p>Protokollet återger hur barn och vuxna berättar om resor till Blåkulla:
    om att ha förts dit, om vad som skedde där och om vilka som var med.
    Utsagorna kom fram under förhör där de anklagade visste att ett erkännande
    kunde påverka utgången, och att förnekande kunde kosta livet.</p>
  </div>
  <p class="fragan">Två historiker arbetar med varsin fråga.
  <strong>Fråga 1:</strong> Reste kvinnorna i Mora till Blåkulla?
  <strong>Fråga 2:</strong> Vilka föreställningar om trolldom fanns i Mora
  1669, och hur gick en process till? Vilka påståenden om källans
  användbarhet håller?</p>`,
  alternativ:[
    {txt:"För fråga 2 är protokollet en mycket god källa: det visar vilka föreställningar som fanns och hur rätten arbetade.",
     ratt:true,
     kommentar:"Här är protokollet nära nog en idealkälla — det är en kvarleva av just den process frågan gäller."},
    {txt:"För fråga 1 duger protokollet inte som belägg, eftersom utsagorna tillkom under press och i en situation där ett visst svar belönades.",
     ratt:true,
     kommentar:"Tvångssituationen gör utsagorna otillförlitliga som beskrivning av vad som faktiskt hänt."},
    {txt:"Eftersom många personer oberoende av varandra berättade samma sak är uppgifterna bekräftade.",
     ratt:false, miss:"beroende_missad",
     kommentar:"De var inte oberoende. Vittnena hörde varandras berättelser, förhördes efter samma mall och delade samma föreställningsvärld."},
    {txt:"Protokollet är en officiell handling och därför objektivt.",
     ratt:false, miss:"officiell_lika_med_objektiv",
     kommentar:"Officiell betyder att någon myndighet står bakom, inte att innehållet är neutralt. Protokollet skrevs av rätten, med rättens ord."},
    {txt:"Protokollet är oanvändbart för historisk forskning.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Det är ett av de mest använda materialen för forskning om tidigmodern rättskultur och mentalitet."},
    {txt:"Eftersom vi i dag vet att Blåkulla inte finns saknar utsagorna historiskt värde.",
     ratt:false, miss:"falskt_lika_med_ointressant",
     kommentar:"Osanna utsagor är förstklassiga källor till vad människor trodde, fruktade och tvingades säga."}
  ],
  ledtrad:"Samma källa, två frågor. Pröva den mot en fråga i taget.",
  s:`<p>Detta är kärnan i användbarhetsbegreppet: samma källa är svag för den
  ena frågan och stark för den andra.</p>
  <p>En utsaga som inte beskriver verkligheten kan ändå vara ett exakt spår
  av vad man trodde — och av hur makten fick fram svaren.</p>`
},

/* =====================================================================
   KAPITEL 2 — ORSAK OCH KONSEKVENS
   ===================================================================== */

{
  id:"hi-ok-201", kap:2, omr:"ok_typer",
  familj:["utlosande_vs_bakomliggande"], niva:"E",
  svarstyp:"alternativ",
  t:`<p>Sommaren 1914 sköts den österrikiske tronföljaren Frans Ferdinand i
  Sarajevo. Inom sex veckor var Europas stormakter i krig.</p>
  <p class="fragan">Vilka påståenden om orsakerna är rimliga?</p>`,
  alternativ:[
    {txt:"Skotten i Sarajevo var den utlösande faktorn — det som satte igång förloppet.",
     ratt:true,
     kommentar:"Utlösande faktorer ligger nära i tid och fungerar som tändsticka."},
    {txt:"Alliansystemet gjorde att en lokal konflikt kunde dra in flera stormakter, och är därför en bakomliggande orsak.",
     ratt:true,
     kommentar:"Bakomliggande orsaker är de som byggts upp under lång tid och gör utfallet möjligt."},
    {txt:"Skotten i Sarajevo var den grundläggande orsaken till kriget.",
     ratt:false, miss:"utlosande_lika_med_grundorsak",
     kommentar:"Mordet förklarar tidpunkten, inte varför Europa var laddat för krig."},
    {txt:"Kapprustningen till sjöss mellan Storbritannien och Tyskland var en utlösande faktor.",
     ratt:false, miss:"bakomliggande_kallad_utlosande",
     kommentar:"Kapprustningen pågick i över ett decennium. Den hör till bakgrunden."},
    {txt:"Eftersom kriget bröt ut kort efter mordet var mordet den enda orsaken.",
     ratt:false, miss:"efter_alltsa_pga",
     kommentar:"Att B följer på A gör inte A till enda orsak. Annars vore varje dag orsak till nästa."},
    {txt:"Versaillesfreden 1919 bidrog till att kriget bröt ut.",
     ratt:false, miss:"kronologi_omvand",
     kommentar:"Freden kom efter kriget. En konsekvens kan inte orsaka det den är en konsekvens av."}
  ],
  s:`<p>Utlösande faktor: nära i tid, konkret, ofta en enskild händelse.
  Bakomliggande orsak: långsiktig, strukturell, gör utfallet möjligt.</p>
  <p>Utan bakgrunden hade skotten i Sarajevo blivit en notis.</p>`
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
  t:`<p>Digerdöden nådde Norden 1350. På många håll dog mellan en fjärdedel och
  hälften av befolkningen inom några år.</p>
  <p class="fragan">Vilka påståenden om konsekvenserna är rimliga?</p>`,
  alternativ:[
    {txt:"Arbetskraften blev knapp, vilket på sikt stärkte de överlevande böndernas och landbornas förhandlingsläge.",
     ratt:true,
     kommentar:"Ett klassiskt exempel på att en katastrof kan förbättra villkoren för dem som blir kvar."},
    {txt:"Gårdar lades öde och odlingsgränsen drogs tillbaka, särskilt i skogs- och randbygder.",
     ratt:true,
     kommentar:"Ödegårdarna är ett av de tydligaste spåren i materialet."},
    {txt:"Digerdöden orsakade reformationen.",
     ratt:false, miss:"lang_kedja_utan_lankar",
     kommentar:"Nästan tvåhundra år och många led emellan. En kedja måste kunna visas, inte bara påstås."},
    {txt:"Eftersom befolkningen minskade blev alla fattigare.",
     ratt:false, miss:"enkel_riktning",
     kommentar:"Den totala produktionen minskade, men per överlevande kunde läget bli bättre. Konsekvenser går sällan bara åt ett håll."},
    {txt:"Digerdöden fick inga långsiktiga konsekvenser, eftersom befolkningen till slut återhämtade sig.",
     ratt:false, miss:"aterhamtning_raderar_konsekvens",
     kommentar:"Återhämtningen tog över hundra år, och under tiden ändrades ägande, arbetsvillkor och bebyggelsemönster varaktigt."},
    {txt:"Digerdöden var en konsekvens av att jordbruket expanderat för långt.",
     ratt:false, miss:"kronologi_omvand",
     kommentar:"Befolkningstrycket före 1350 diskuteras som en försvagande faktor, men pesten orsakades av smitta — inte av odlingsgränsen."}
  ],
  s:`<p>Skilj på omedelbara och långsiktiga konsekvenser, och räkna med att de
  kan peka åt olika håll för olika grupper.</p>
  <p>Att påstå en lång orsakskedja kräver att du kan visa länkarna.</p>`
},

{
  id:"hi-ok-204", kap:2, omr:"ok_konsekvens",
  familj:["kort_vs_lang_sikt","samtidighet_vs_orsak"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Mellan 1870 och 1910 industrialiserades Sverige snabbt. Sågverk, järnbruk
  och verkstadsindustri växte, järnvägsnätet byggdes ut och städerna fylldes.</p>
  <p class="fragan">Vilka påståenden skiljer korta och långa konsekvenser på ett
  rimligt sätt?</p>`,
  alternativ:[
    {txt:"På kort sikt flyttade människor från landsbygd till industriort, ofta till trångboddhet och osäkra anställningar.",
     ratt:true,
     kommentar:"Den omedelbara effekten var ofta försämrade bostadsförhållanden, även när lönen steg."},
    {txt:"På lång sikt byggdes fackföreningar och partier upp av just de grupper som industrin samlade på samma plats.",
     ratt:true,
     kommentar:"Koncentrationen av arbetare är en förutsättning för organisering — en långsiktig och delvis oavsiktlig konsekvens."},
    {txt:"På kort sikt höjdes levnadsstandarden för alla samhällsgrupper.",
     ratt:false, miss:"enkel_riktning",
     kommentar:"Vinsterna kom ojämnt och ofta sent. Fråga alltid: bättre för vem, och när?"},
    {txt:"Emigrationen till Amerika upphörde när industrin växte.",
     ratt:false, miss:"faktafel_kronologi",
     kommentar:"Emigrationen var som störst just under industrialiseringen, med toppar på 1880-talet och åren före första världskriget."},
    {txt:"Industrialiseringen var en konsekvens av den allmänna rösträtten.",
     ratt:false, miss:"kronologi_omvand",
     kommentar:"Rösträtten kom 1918–21, efter. Här är kronologin omvänd."},
    {txt:"Eftersom järnvägen byggdes ut samtidigt är järnvägen en konsekvens av industrin.",
     ratt:false, miss:"samtidighet_lika_med_orsak",
     kommentar:"De drev varandra. Att två förlopp sker samtidigt avgör inte vilket som orsakar vilket."}
  ],
  s:`<p>Konsekvensfrågan har alltid tre delar: för vem, hur snart, och hur
  länge.</p>`
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
  familj:["individ_och_rorelse"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>I december 1955 vägrade Rosa Parks lämna sin plats på en buss i
  Montgomery, Alabama. Hon greps, och en bussbojkott inleddes som varade i drygt
  ett år. Parks var sedan flera år aktiv i NAACP och hade gått utbildning i
  icke-våldsmotstånd. Nio månader tidigare hade femtonåriga Claudette Colvin
  gjort samma sak på samma bussbolag, utan att det ledde till någon bojkott.</p>
  <p class="fragan">Vilka slutsatser om aktör och struktur håller?</p>`,
  alternativ:[
    {txt:"Parks handling var ett verkligt val, men den fick genomslag för att det fanns en organisation som kunde omvandla den till en bojkott.",
     ratt:true,
     kommentar:"Handling plus infrastruktur. Ingendera räcker ensam."},
    {txt:"Att Colvins fall inte ledde till samma sak visar att utfallet inte följde automatiskt av handlingen.",
     ratt:true,
     kommentar:"Jämförelsen är det starkaste argumentet i hela uppgiften: samma handling, olika utfall."},
    {txt:"Parks handlade spontant och oplanerat, vilket är poängen med händelsen.",
     ratt:false, miss:"myt_over_kalla",
     kommentar:"Den bilden är spridd men går emot vad vi vet. Parks var en erfaren aktivist. Själva myten är i sig ett intressant exempel på historiebruk."},
    {txt:"Eftersom medborgarrättsrörelsen ändå skulle ha vuxit fram saknar Parks handling betydelse.",
     ratt:false, miss:"struktur_utraderar_aktor",
     kommentar:"Att en rörelse var på väg gör inte enskilda handlingar utbytbara. Tidpunkt, plats och person påverkade förloppet."},
    {txt:"Eftersom Parks var organiserad var hennes handling inte modig.",
     ratt:false, miss:"organisation_minskar_mod",
     kommentar:"Organisation och mod är inte varandras motsatser. Riskerna — gripande, arbetslöshet, hot — var högst reella."},
    {txt:"Colvins fall visar att rörelsen var likgiltig inför yngre aktivister.",
     ratt:false, miss:"enskilt_fall_generaliserat",
     kommentar:"Skälen till att hennes fall inte drevs vidare är flera och omdiskuterade. Ett enskilt fall bär inte den slutsatsen."}
  ],
  s:`<p>Enskilda handlingar blir historiska händelser när det finns strukturer
  som kan bära dem vidare. Den jämförelse som avslöjar det är Colvin:
  samma handling, annat utfall.</p>`
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
  t:`<p>Efter 1789 avskaffades de gamla ståndsprivilegierna i Frankrike, och en
  förklaring om människans och medborgarens rättigheter antogs.</p>
  <p class="fragan">Vilka påståenden om förändring och kontinuitet är korrekta?</p>`,
  alternativ:[
    {txt:"Förändring: adelns och prästerskapets rättsliga privilegier togs bort.",
     ratt:true,
     kommentar:"En av revolutionens mest konkreta och varaktiga förändringar."},
    {txt:"Kontinuitet: rösträtten omfattade inte kvinnor, och kom snart att begränsas även för fattiga män.",
     ratt:true,
     kommentar:"Rättighetsförklaringens 'människa' tolkades snävt. Mycket av den gamla ordningen levde vidare i ny form."},
    {txt:"Förändring: alla vuxna fick rösträtt.",
     ratt:false, miss:"rattigheter_lika_med_alla",
     kommentar:"Långt ifrån. Rösträtten var könsbunden och under perioder inkomstbunden."},
    {txt:"Kontinuitet: Frankrike förblev monarki oavbrutet.",
     ratt:false, miss:"faktafel_kronologi",
     kommentar:"Monarkin avskaffades 1792, ersattes av republik och kejsardöme, och restaurerades 1814. Varken rak förändring eller rak kontinuitet."},
    {txt:"Förändring: kyrkans inflytande i Frankrike upphörde helt och för alltid.",
     ratt:false, miss:"forandring_overdriven",
     kommentar:"Kyrkans ställning förändrades kraftigt, men upphörde inte. Napoleon slöt konkordat med påven 1801."},
    {txt:"Eftersom mycket bestod var revolutionen ingen verklig förändring.",
     ratt:false, miss:"kontinuitet_utraderar_forandring",
     kommentar:"Att fråga efter kontinuitet är inte att förneka förändring. Båda finns alltid samtidigt."}
  ],
  s:`<p>Ställ alltid båda frågorna till samma förlopp. Det som inte förändras
  är lika historiskt intressant som det som gör det — och ofta svårare att
  få syn på.</p>`
},

{
  id:"hi-fk-402", kap:4, omr:"fk_kontinuitet",
  familj:["forandring_och_bestandighet","arbete_och_kon"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Under industrialiseringen tog kvinnor arbete i textilfabriker,
  tändsticksfabriker och som hembiträden i städerna.</p>
  <p class="fragan">Vilka påståenden om förändring och kontinuitet håller?</p>`,
  alternativ:[
    {txt:"Förändring: arbetet flyttade från hemmet och gården till en arbetsplats med lön, arbetstider och arbetsgivare.",
     ratt:true,
     kommentar:"Platsen och formen för arbetet ändrades i grunden."},
    {txt:"Kontinuitet: kvinnor hänvisades fortsatt till lägre betalda uppgifter, och lönen förutsattes vara ett tillskott till en mans försörjning.",
     ratt:true,
     kommentar:"Den gamla arbetsdelningen följde med in i fabriken i ny form."},
    {txt:"Förändring: kvinnor började arbeta, vilket de inte gjort tidigare.",
     ratt:false, miss:"arbete_lika_med_lonearbete",
     kommentar:"Kvinnor har alltid arbetat. Det nya var att arbetet blev lönearbete — och därmed syntes i statistiken."},
    {txt:"Kontinuitet: kvinnors rättsliga ställning var oförändrad genom hela 1800-talet.",
     ratt:false, miss:"kontinuitet_overdriven",
     kommentar:"Ogift kvinna blev myndig 1863, gift kvinna först 1921. Det förändrades påtagligt under perioden."},
    {txt:"Förändring: löneskillnaden mellan kvinnor och män försvann inom industrin.",
     ratt:false, miss:"forandring_overdriven",
     kommentar:"Kvinnolönerna låg genomgående klart under mansslönerna genom hela perioden."},
    {txt:"Eftersom förändringen var stor saknar det mening att fråga efter kontinuitet.",
     ratt:false, miss:"forandring_utraderar_kontinuitet",
     kommentar:"Det är ofta i kontinuiteterna man ser vad som egentligen var svårt att ändra."}
  ],
  s:`<p>Vad som räknas som förändring beror på vad man mäter. Byter man från
  "arbete" till "lönearbete" ser samma period helt olika ut.</p>`
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
  t:`<div class="kalla">
    <div class="kall-topp">Källa A · Styrelseprotokoll, 1902</div>
    <p>Styrelsen beslutar att införa tio timmars arbetsdag vid gjuteriet
    "på grund av upprepad oro bland arbetarna".</p>
    <div class="kall-ref">Referat ur protokoll från ett svenskt verkstadsföretag.</div>
  </div>
  <p class="fragan">Vilka slutsatser <em>bär</em> källan?</p>`,
  alternativ:[
    {txt:"Att styrelsen själv angav arbetarnas missnöje som skäl för beslutet.",
     ratt:true,
     kommentar:"Detta står bokstavligen i källan, och är det säkraste du kan säga."},
    {txt:"Att det förekom återkommande missnöje vid gjuteriet före 1902.",
     ratt:true,
     kommentar:"Ordet 'upprepad' bär den slutsatsen — styrelsen hade ingen anledning att hitta på det."},
    {txt:"Att svenska arbetare fick tiotimmarsdag 1902.",
     ratt:false, miss:"enskilt_fall_generaliserat",
     kommentar:"Ett företags beslut säger ingenting om landet. Hoppet från ett fall till alla är det vanligaste felet i uppsatser."},
    {txt:"Att arbetarna vid gjuteriet blev nöjda efter beslutet.",
     ratt:false, miss:"slutsats_utanfor_kallan",
     kommentar:"Källan tar slut vid beslutet. Vad som hände sedan står inte där."},
    {txt:"Att styrelsen sympatiserade med arbetarnas krav.",
     ratt:false, miss:"motiv_lasas_in",
     kommentar:"Protokollet visar ett beslut och ett angivet skäl. Vad styrelsen kände eller tyckte står inte där."},
    {txt:"Ingenting, eftersom protokollet är skrivet av arbetsgivaren.",
     ratt:false, miss:"tendens_som_diskvalificering",
     kommentar:"Protokoll skrivna av en part är fortfarande utmärkta källor till partens beslut och angivna skäl."}
  ],
  s:`<p>Dra gränsen vid vad källan faktiskt kan bära. Två frågor: står det där,
  eller lägger jag till det? Och: gäller det ett fall eller alla?</p>`
},

{
  id:"hi-ha-602", kap:6, omr:"ha_tolkning",
  familj:["olika_tolkning_samma_material","kriterier_avgor"], niva:"C",
  svarstyp:"alternativ",
  t:`<p>Två historiker arbetar med samma material: bouppteckningar från en socken
  på 1830-talet. Den ene drar slutsatsen att fattigdomen var utbredd. Den andre
  menar att materialet snarare visar en växande grupp med ett visst
  överskott.</p>
  <p class="fragan">Varför kan de landa olika?</p>`,
  alternativ:[
    {txt:"De kan ställa olika frågor till materialet och därmed leta efter olika saker.",
     ratt:true,
     kommentar:"Frågan styr vad man ser. Det är inte slarv utan en förutsättning för all forskning."},
    {txt:"De kan dra gränsen för 'fattig' på olika sätt, och därmed räkna samma hushåll åt olika håll.",
     ratt:true,
     kommentar:"Definitionen avgör resultatet. Därför ska den alltid redovisas."},
    {txt:"En av dem måste ha läst materialet felaktigt.",
     ratt:false, miss:"olika_tolkning_lika_med_fel",
     kommentar:"Olika slutsatser från samma material är normalt, inte ett tecken på misstag."},
    {txt:"Den som publicerade senast har rätt.",
     ratt:false, miss:"senare_lika_med_battre",
     kommentar:"Senare forskning har ofta mer material att gå på, men det avgör inte i sig."},
    {txt:"Eftersom de är oense går materialet inte att använda.",
     ratt:false, miss:"oenighet_lika_med_vardelost",
     kommentar:"Oenighet är forskningens normaltillstånd och ofta det som driver den framåt."},
    {txt:"Historia är åsikter, så båda har lika rätt.",
     ratt:false, miss:"relativism",
     kommentar:"Tolkningar kan prövas. Den som redovisar sina kriterier, täcker mer av materialet och tål invändningar står starkare. Att flera tolkningar finns betyder inte att alla är lika bra."}
  ],
  ledtrad:"Vad skulle du behöva veta om de två studierna för att kunna avgöra vilken som håller bäst?",
  s:`<p>Skillnader i tolkning kommer oftast från skillnader i fråga, definition
  eller urval — inte från slarv och inte från godtycke.</p>
  <p>Att flera tolkningar är möjliga är inte samma sak som att alla är lika
  bra. Kriterierna är fortfarande: täckning, konsekvens och hur väl
  invändningar bemöts.</p>`
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
  t:`<div class="kalla">
    <div class="kall-topp">Källa · Runsten, funnen 1898</div>
    <p>På en gård utanför Kensington i Minnesota hittade lantbrukaren Olof
    Öhman en sten med runinskrift. Inskriften berättar om en grupp
    skandinaver på resa och avslutas med årtalet 1362.</p>
    <div class="kall-ref">Trakten hade under 1800-talets senare hälft tagit
    emot en stor skandinavisk invandring. Runologer har sedan dess pekat på
    att runformer och språkdrag i inskriften hör hemma i 1800-talets
    svenska, inte i 1300-talets.</div>
  </div>
  <p class="fragan">Vilken bedömning av stenens äkthet är bäst underbyggd?</p>`,
  alternativ:[
    {txt:"Språkets och runornas former hör hemma i 1800-talet, och det väger tyngre än att en resa i sig vore tänkbar.",
     ratt:true,
     kommentar:"Äkthetsprövningen börjar i föremålet självt. Att innehållet <em>kunde</em> ha hänt säger inget om när texten skrevs."},
    {txt:"Att nordbor bevisligen nådde Nordamerika omkring år 1000 styrker inskriftens äkthet.",
     ratt:false, miss:"mojlighet_som_belagg",
     kommentar:"Att något är möjligt är inte ett belägg för att det inträffade. Vinland visar bara att resan inte är otänkbar."},
    {txt:"Eftersom stenen hittades av en invandrad svensk måste den vara en förfalskning.",
     ratt:false, miss:"avsandare_lika_med_belagg",
     kommentar:"Vem som hittade stenen avgör inte frågan. Misstanken måste beläggas i materialet, inte i personen."},
    {txt:"Stenen är en kvarleva, och kvarlevor kan inte vara förfalskade.",
     ratt:false, miss:"kvarleva_alltid_saker",
     kommentar:"En kvarleva kan mycket väl vara tillverkad för att lura. Att den är ett föremål och inte en berättelse hjälper inte."},
    {txt:"Eftersom ingen har kunnat bevisa att stenen är falsk bör den betraktas som äkta.",
     ratt:false, miss:"omvand_bevisborda",
     kommentar:"Bevisbördan ligger hos den som hävdar att fyndet är äkta. Frånvaro av motbevis är inte ett belägg."},
    {txt:"Frågan går inte att avgöra eftersom inga ögonvittnen från 1362 finns kvar.",
     ratt:false, miss:"krav_pa_ogonvittne",
     kommentar:"Om det kravet gällde skulle nästan ingen medeltidshistoria gå att skriva. Inskriften själv är material nog."}
  ],
  s:`<p>Äkthet prövas i första hand på källan själv: skrift, språk, material,
  tillkomstsammanhang. Först därefter blir innehållet intressant.</p>
  <p>Notera skillnaden mellan <em>möjligt</em> och <em>belagt</em>. Den
  skillnaden återkommer i nästan varje källkritisk diskussion.</p>`,
  ledtrad:"Vad i det här kan undersökas direkt, utan att man vet något om vad som hände 1362?"
},

{
  id:"hi-kk-111", kap:1, omr:"kk_beroende",
  familj:["beroende","tradering"], niva:"C",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källor A, B och C · Lokaltidningar, hösten 1918</div>
    <p>Tre tidningar i samma län rapporterar om spanska sjukan i staden.
    Formuleringarna är nästan ordagrant desamma i alla tre, och samtliga
    anger att uppgifterna kommer från stadsläkaren.</p>
  </div>
  <p class="fragan">Vilka bedömningar är rimliga?</p>`,
  alternativ:[
    {txt:"Tidningarna är inte tre oberoende källor utan tre återgivningar av en och samma uppgift.",
     ratt:true,
     kommentar:"Just det. Beroendekriteriet handlar om hur många <em>oberoende</em> vägar uppgiften tagit, inte hur många tidningar som tryckt den."},
    {txt:"Att samma formulering återkommer stärker inte uppgiften — den upprepas, den prövas inte.",
     ratt:true,
     kommentar:"Upprepning är inte bekräftelse. Ett fel i ursprungskällan följer med i alla tre."},
    {txt:"Vill historikern komma närmare bör hon söka stadsläkarens eget underlag, till exempel dödböcker.",
     ratt:true,
     kommentar:"Att gå uppströms mot förstahandsmaterialet är standardgreppet när beroende har konstaterats."},
    {txt:"Att tre av varandra oberoende tidningar skriver samma sak gör uppgiften betydligt säkrare.",
     ratt:false, miss:"beroende_forbisett",
     kommentar:"Premissen håller inte: tidningarna är inte oberoende av varandra här."},
    {txt:"Eftersom stadsläkaren var en myndighetsperson behöver uppgiften inte prövas vidare.",
     ratt:false, miss:"auktoritet_som_belagg",
     kommentar:"Ämbetet gör uppgiften rimlig att ta på allvar, inte färdigprövad. Även myndigheter räknade fel 1918."},
    {txt:"Tidningarna är förstahandskällor eftersom de skrevs samtidigt som sjukdomen pågick.",
     ratt:false, miss:"samtida_lika_med_forstahands",
     kommentar:"Samtida är inte samma sak som förstahands. Tidningarna återger någon annans iakttagelser."}
  ],
  s:`<p>Beroendekriteriet frågar inte hur många källor som säger samma sak,
  utan hur många av varandra oberoende iakttagelser som ligger bakom.</p>
  <p>Tre exemplar av samma uppgift är fortfarande en uppgift.</p>`
},

{
  id:"hi-kk-112", kap:1, omr:"kk_anvandbarhet",
  familj:["anvandbarhet","urvalsbias"], niva:"C",
  svarstyp:"alternativ",
  t:`<div class="kalla">
    <div class="kall-topp">Källa · Bouppteckningar</div>
    <p>Efter ett dödsfall upprättades en bouppteckning: en förteckning över
    den dödes tillhörigheter med uppskattat värde, post för post — kläder,
    husgeråd, redskap, djur, böcker, skulder.</p>
    <div class="kall-ref">Bouppteckningar har upprättats i Sverige sedan
    1700-talet och finns bevarade i stora mängder. Hushåll utan egendom av
    värde saknas ofta i materialet.</div>
  </div>
  <p class="fragan">Vilka frågor kan det här materialet faktiskt besvara?</p>`,
  alternativ:[
    {txt:"Vilka föremål som fanns i hemmen, och hur det skilde sig mellan hushåll.",
     ratt:true,
     kommentar:"Detta är vad handlingen faktiskt registrerar, och den gör det systematiskt."},
    {txt:"Hur hemmens innehåll förändrades över tid, eftersom samma slags handling upprättats under mycket lång tid.",
     ratt:true,
     kommentar:"Seriemateriel av det här slaget är guld värt just för förändring över tid — formuläret är sig likt."},
    {txt:"Skillnader mellan grupper, men med reservationen att de allra fattigaste ofta saknas i materialet.",
     ratt:true,
     kommentar:"Rätt, och reservationen är poängen: den som glömmer den läser rikedom där det bara finns ett snedvridet urval."},
    {txt:"Vad människor kände inför sina ägodelar och vilka föremål de höll kära.",
     ratt:false, miss:"kalla_overtolkad",
     kommentar:"Ett värderat föremål i en lista säger inget om känslor. Till det behövs brev, dagböcker eller domstolsmaterial."},
    {txt:"Hur hela befolkningen levde, eftersom bouppteckningar är myndighetshandlingar och därför heltäckande.",
     ratt:false, miss:"myndighet_lika_med_heltackande",
     kommentar:"Myndighetsmaterial är inte automatiskt heltäckande. Här är just de fattigaste underrepresenterade."},
    {txt:"Hur ofta föremålen användes i vardagen.",
     ratt:false, miss:"kalla_overtolkad",
     kommentar:"Förteckningen visar förekomst, inte användning. En vävstol i boet kan ha stått oanvänd i tjugo år."}
  ],
  s:`<p>Frågan ”är källan trovärdig?” är trubbig. Den skarpare frågan är
  <em>vad</em> källan kan bära: vad registrerade den som skrev, och vad
  registrerade han inte?</p>
  <p>En källa kan vara utmärkt för en fråga och värdelös för nästa.</p>`
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
  t:`<p>År 1866 ersattes den svenska ståndsriksdagen av en tvåkammarriksdag.
  Rösträtten till andra kammaren knöts till inkomst och förmögenhet och
  omfattade omkring en femtedel av de vuxna männen. Första kammaren valdes
  indirekt, med graderad röstskala och höga krav för att vara valbar. Kvinnor
  hade ingen rösträtt.</p>
  <p class="fragan">Vilka bedömningar av förändring och kontinuitet är
  rimliga?</p>`,
  alternativ:[
    {txt:"Formen förändrades genomgripande — ståndens riksdag försvann — medan vilka som faktiskt hade inflytande förändrades mindre.",
     ratt:true,
     kommentar:"Den dubbelheten är hela poängen med reformen som exempel."},
    {txt:"En gräns ersattes av en annan: i stället för stånd avgjorde nu inkomst och förmögenhet vem som fick rösta.",
     ratt:true,
     kommentar:"Bra sätt att formulera det. Gränsen flyttades, den togs inte bort."},
    {txt:"Att kvinnor fortfarande saknade rösträtt är kontinuitet mitt i en reform som samtiden uppfattade som stor.",
     ratt:true,
     kommentar:"Kontinuitet syns tydligast när man frågar vem förändringen inte gällde."},
    {txt:"Reformen införde allmän rösträtt för män.",
     ratt:false, miss:"faktafel_rostratt",
     kommentar:"Långt ifrån. Allmän rösträtt för män beslutades först 1907–09 och genomfördes stegvis därefter."},
    {txt:"Eftersom ståndsriksdagen avskaffades var Sverige nu en demokrati.",
     ratt:false, miss:"reform_lika_med_demokrati",
     kommentar:"En folkvald kammare är inte detsamma som demokrati när fyra femtedelar av männen och alla kvinnor står utanför."},
    {txt:"Eftersom det mesta i praktiken bestod var reformen betydelselös.",
     ratt:false, miss:"kontinuitet_overdriven",
     kommentar:"Motsatt övertramp. Reformen skapade den arena där rösträttsstriden sedan kunde föras."}
  ],
  s:`<p>Fråga alltid två saker om en reform: vad förändrades, och för vem
  förändrades ingenting?</p>
  <p>Svaret ligger nästan alltid mittemellan ”ett genombrott” och ”bara
  fasad”.</p>`
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
  t:`<p>Två historiker skriver om digerdödens dödlighet i Sverige.</p>
  <div class="kalla">
    <div class="kall-topp">Historiker X</div>
    <p>Uppskattar att omkring en tredjedel av befolkningen dog, genom att
    överföra dödlighetstal som beräknats ur engelska godsräkenskaper.</p>
  </div>
  <div class="kalla">
    <div class="kall-topp">Historiker Y</div>
    <p>Menar att det svenska materialet — ödegårdslistor och jordeböcker —
    inte tillåter en sådan siffra, eftersom en gård kunde läggas öde av flera
    skäl än att brukaren dog.</p>
  </div>
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
    {txt:"Eftersom historiker är oense går frågan inte att komma närmare — allt är ändå tolkning.",
     ratt:false, miss:"relativism",
     kommentar:"Tolkningar är inte lika goda. Den som redovisar sina antaganden och klarar invändningar står starkare."},
    {txt:"Y hävdar att digerdöden inte drabbade Sverige särskilt hårt.",
     ratt:false, miss:"invandning_missforstadd",
     kommentar:"Y säger inget om hur hårt — bara att just det här materialet inte kan avgöra saken."}
  ],
  s:`<p>Ett historiskt argument har tre led: belägget, slutsatsen och steget
  däremellan. Nästan all verklig oenighet gäller det tredje.</p>
  <p>Fråga därför alltid: vad mäter belägget egentligen, och vad vill
  historikern att det ska visa?</p>`
}

];

if(typeof window!=="undefined") window.BANKHIST=BANKHIST;
