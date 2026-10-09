# Pedagogiska regler

## Självständig bedömning

Befintlig metadata, facit, strukturplacering och närliggande uppgifter är jämförelsematerial. De får inte behandlas som facit för klassificeringen. Agenten ska först analysera uppgiften självständigt och därefter jämföra med projektets konventioner.

## Fyra separata beslut

Följande ska bedömas var för sig:

1. **Matematisk förmåga** – vad eleven faktiskt måste förstå och göra.
2. **Nivå/svårighet** – komplexitet, antal steg, strategival, abstraktionsgrad och krav på motivering.
3. **Självrättningsbarhet** – om elevens slutsvar kan representeras och bedömas entydigt.
4. **Tekniskt svarsformat** – hur det matematiska svaret säkert uttrycks i Kunskapsgymmets datamodell och gränssnitt.

Ett beslut inom en dimension får inte automatiskt bestämma de andra. Särskilt gäller:

- `resonemang` eller `problemlösning` innebär inte automatiskt manuell rättning,
- hög nivå innebär inte automatiskt manuell rättning,
- ett numeriskt slutsvar innebär inte automatiskt att uppgiften främst prövar procedur,
- ett tekniskt lättformat svar får inte sänka eller förändra den pedagogiska avsikten.

## Matematisk verifiering

Före ändring av svar eller rättningsmetadata ska agenten:

- lösa uppgiften självständigt,
- kontrollera definitionsmängd och eventuella extralösningar,
- avgöra om svaret är ordnat eller oordnat,
- identifiera alla giltiga lösningar och likvärdiga representationer,
- kontrollera enheter, avrundning och rimlig tolerans,
- verifiera att uppgiftstext, facit och maskinellt rätt svar beskriver samma matematik.

Numeriska kontroller får stödja analysen men ersätter inte matematisk argumentation när exakthet eller fullständighet är avgörande.

## Förmåga

Förmågeklassificeringen ska grundas på elevens huvudsakliga kognitiva arbete. Flera förmågor får anges när de faktiskt prövas, men listan ska inte fyllas med förmågor som bara förekommer perifert.

Exempel på frågor att ställa:

- Krävs främst en känd algoritm eller metod? Då talar det för procedur.
- Krävs förståelse av samband, representationer eller villkor? Då kan begrepp vara relevant.
- Krävs val eller konstruktion av strategi i en obekant situation? Då kan problemlösning vara relevant.
- Krävs förklaring, värdering, generalisering eller logiskt sammanhängande argument? Då kan resonemang vara relevant.

## Nivå

Nivån ska bedömas oberoende av aktuell etikett. Beakta bland annat:

- hur bekant metoden rimligen är,
- hur många beroende steg som krävs,
- om strategi är given eller måste väljas,
- om representationer måste växlas,
- hur stor risken är för relevanta felslut,
- om eleven måste motivera, generalisera eller värdera.

Ändra inte nivå enbart för att rättningsformatet ändras.

### Träningsnivå 1 och 2

**Träningsnivå 1 ska innehålla de allra enklaste uppgifterna.** Eleven ska kunna
känna igen ett grundbegrepp eller använda ett direkt, tydligt samband med enkla
tal. Exempel är att identifiera en sträcka, läsa av en motsvarande vinkel,
halvera en given medelpunktsvinkel eller multiplicera en sida med en given enkel
längdskala. Nivå 1 ska vara en trygg ingång till ett nytt delmoment.

**Träningsnivå 2 är lite svårare men kan fortfarande vara E.** Hit hör till
exempel att först bestämma en längdskala och sedan använda den, summera en hel
sida före topptriangelsatsen, lösa en proportion med kordasatsen eller
bisektrissatsen, kombinera två vinkelregler eller beräkna koordinatskillnader
före avståndsformeln. Krångligare tal eller flera beroende steg kan också
motivera nivå 2. Fler rutinberäkningar är inte i sig skäl att ändra E till C.

Bedöm varje uppgift och varje delkort för sig. Ett kort som redan anger
längdskalan eller ett mellanresultat kan vara nivå 1 även när hela uppgiften
är svårare. Ett nivå 1-kort får inte kräva att eleven först löser en osynlig
tidigare del. Alla nödvändiga givna uppgifter och figurer ska följa med kortet.

I fysik ska nivå 1–2 ha en kort, konkret situation och en tydlig fråga.
Visa bara de tal och materialdata som behövs för den aktuella frågan.
Ett kort om fjäderenergi behöver exempelvis inte uppgifterna för ett senare
kast, och ett kort om uppvärmning behöver inte smältvärmet. Om ett tidigare
mellanresultat behövs, ange det direkt och med tillräcklig precision för
självrättningen. Facit ska då utgå från det givna mellanresultatet.
Behåll nödvändiga fysikaliska villkor, referensriktning och nollnivå.
Säg vem kraften verkar på och vad eleven ska bestämma. Förklara skillnaden
mellan övertryck och absolut tryck när den annars kan missförstås.
Kontrollera alltid den visade svarsenheten mot `svarEnhet`.

I Fysik 1 ska nivå 1 till exempel kunna vara en direkt beräkning av tryck från
kraft och area i rätt enheter, rörelsemängd från massa och fart, eller effekt
från arbete och tid. En direkt energi- eller lyftkraftsformel med enkla tal kan
också vara nivå 1. En kvadrering är alltså inte ensam skäl att höja nivån.
Enhetsomvandling tillsammans med en fysikberäkning, flera beroende steg,
procenter eller mer krävande tal hör normalt till nivå 2. Även dessa kan vara E.
Stötar med två rörliga kroppar och riktningsval, eller problem som kombinerar
rörelsemängd vid en stöt med energibevarande efteråt, kan motivera nivå 3.
Givna mellanresultat ska vägas in när nivån på ett separat kort bedöms.

Fackord som eleven behöver lära sig får användas, men förklara dem när de annars
gör frågan svår att förstå. Skriv till exempel ”pilar som visar krafterna” i en
ritinstruktion och ”utan att temperaturen ändras” i stället för ”isotermt”.
Ange vad en fart mäts i förhållande till i kast- och rekylproblem. Skilj kraften
från ett visst föremål, exempelvis golvet, från summan av alla krafter.
Medelfart som medelvärdet av start- och slutfart förutsätter konstant acceleration;
det villkoret ska stå i uppgiften när beräkningen kräver det.

## Självrättning

En uppgift lämpar sig för självrättning när samtliga godtagbara slutsvar kan representeras utan att det matematiska innehållet förvanskas. Bedöm särskilt:

- antal svarsfält,
- fältens ordning och etiketter,
- om lösningsmängden är ordnad eller oordnad,
- om alternativa exakta uttryck måste godtas,
- om tolerans behövs,
- om enheter eller intervall ingår,
- om elevens motivering är en uttrycklig del av det som ska bedömas.

En svår problemlösnings- eller resonemangsuppgift kan vara självrättande när slutsvaret är entydigt representerbart. Om det däremot är själva argumentationen, modellen eller värderingen som ska bedömas kan manuell bedömning fortfarande behövas.

## Tekniska begränsningar

Kunskapsgymmets faktiska renderings- och rättningskod ska verifieras när ett nytt eller känsligt svarsformat används. Om systemet saknar ett matematiskt korrekt format ska agenten:

1. bevara uppgiftens pedagogiska kvalitet,
2. dokumentera begränsningen,
3. föreslå teknisk utveckling eller redaktionellt beslut,
4. inte skriva om uppgiften enbart för att passa begränsningen utan godkännande.

## ID och redaktionell kontinuitet

Uppgifts-ID ska bevaras när uppgiftens identitet i huvudsak är densamma. Nytt ID kan övervägas vid en så omfattande matematisk eller pedagogisk omarbetning att uppgiften i praktiken blivit en ny uppgift. Ett sådant beslut ska vara uttryckligt och får inte tas som bieffekt av automatisk korrigering.

## Heuristiska fynd

Validatorer får påvisa misstänkta avvikelser, men osäkra regler får inte presenteras som säkra matematiska fel. Heuristiska fynd ska klassificeras med rätt osäkerhetsnivå och får inte masskorrigeras utan redaktionell granskning.

## Kort och naturligt språk i fysikuppgifter

Skriv som i en vanlig gymnasieuppgift. Lägg inte till formella modellförklaringar
som inte hjälper eleven att förstå frågan. I vanliga uppgifter om tryck mot en
yta räcker ”trycket”; skriv inte ”medeltrycket” och lägg inte till ”anta jämnt
tryck över respektive kontaktyta”. Fråga hellre ”hur många gånger större är
trycket?” än ”bestäm kvoten av trycken”. Tekniska inledningar som ”alla effekter
avser nyttig mekanisk effekt i rörelseriktningen” ska ersättas med en konkret
beskrivning när det behövs för att skilja motorns effekt från tillförd el eller
bränsleenergi.

Behåll villkor som påverkar svaret, men skriv dem enkelt. ”Bortse från luftens
massa” är tydligare än ”luften har försumbar massa”. När trycket faktiskt varierar
med djupet kan frågan behöva ett medelvärde; skilj då detta från trycket vid en
viss punkt. Viktiga fackord som eleven ska lära sig får användas. Granska varje
träff i sitt sammanhang och kontrollera även de fristående spelkorten.

## Obligatorisk återrapportering efter granskning

Varje genomförd granskning ska avslutas med en konkret lista som användaren kan
använda för att hantera rapporterna. Detta gäller även när granskningen inte
hittar några fel. Redovisa alltid:

1. **Alla granskade uppgifter:** kurs, uppgifts-ID och berörd deluppgift.
2. **Alla åtgärdade uppgifter:** vad som faktiskt var fel och vad som ändrats.
   Om inga fel har rättats ska det stå uttryckligen.
3. **Alla granskade uppgifter utan fel:** märk dem **Granskad – inget fel** och
   förklara kort varför det befintliga svaret eller beteendet är korrekt.
4. **Förslag på kommentar efter varje rapport:** skriv en kort, färdig svensk
   kommentar som kan återkopplas till den som rapporterat. Ta med den avgörande
   beräkningen eller skillnaden i tolkning när det hjälper eleven.

Listan över alla granskade uppgifter är den fullständiga översikten. De andra
listorna anger utfallet. Eventuella osäkra eller ofullständigt granskade fall ska
redovisas separat som **Kvar att utreda**, med vad som saknas; de får inte markeras
som åtgärdade eller utan fel.

En felrapport bevisar inte att uppgiften är fel. Kontrollera först uppgift,
beräkning, visat facit och faktisk självrättning. Ett förtydligande av en redan
korrekt lösning ska redovisas som ett pedagogiskt förtydligande, inte som ett
rättat svarsfel. Ange vilka texter som förbättrats även om rapportens sakfråga
bedöms som **Granskad – inget fel**. Hitta inte på elevens inmatning när den saknas.

Skilj mellan föreslagen rapportstatus och status som faktiskt har sparats i
rapportsystemet. Påstå inte att rapporter har avslutats eller att kommentarer
har skickats enbart därför att kod eller bankfiler har ändrats och pushats.
