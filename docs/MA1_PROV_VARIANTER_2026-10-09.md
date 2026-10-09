# Ma1: provuppgifter och varianter, 2026-10-09

## Källa och omfattning

Användarens DOCX ”Prov Matematik 1a – Kap 1 – HT2026 (v2)” innehåller 30 uppgifter i Tal och beräkningar. Filen har inte något separat kapitel 2. Samtliga 30 ingår med två varianter vardera: 90 nya huvuduppgifter och 114 självständiga elevkort. Del B:s tillämpningar har särskilt granskats. Uppgifterna har placerats efter sitt matematiska innehåll i bankens befintliga områden; tabelluppgifterna ligger i kapitel 2. Den uppladdade provfilen sparas inte i det offentliga repot.

Bankens 3 878 tidigare uppgifter är objekt för objekt oförändrade. Uppgiftslabbet är master och Kunskapsgymmet har samma bankfil. Källspårning finns i `kallaProv` med uppgiftsnummer och variant 0/1/2. Originalens poängsumma är fortfarande 52. Del A har ingen räknare, Del B har räknare. GeoGebra är inte tillåtet. Kursgrenar följer områdenas befintliga struktur; alla ingår i 1a.

## Redaktionell bedömning

Matematik, enheter, avrundning och vilka svar som är giltiga har granskats för samtliga original och varianter. Träningsnivå bedöms separat från E/C/A: nivå 1 gäller de lättaste direkta beräkningarna; nivå 2 gäller rutinuppgifter som kombinerar enkla moment; nivå 3 gäller sammansatta samband och resonemang. Varianten med två inflöden och ett utlopp ligger på nivå 4. Negativ exponent vid utveckling av en tiopotens ligger på nivå 2. Varje delkort har alla egna givna värden, egen lösning och ledtråd.

Lösningarna visar nödvändiga mellanled utan numrerade steg: exempelvis den ursprungliga längden och kapade längden, skatt i kronor och rätt jämförelselön, antal sekunder och droppar, samt kvarvarande andel före den andra målningsdagen. Kalkyler med negativa tal förklarar teckenreglerna. Minut-/sekundsfrågan avrundar den totala tiden innan uppdelningen. En för lång mobilrad har delats i två beräkningar.

Varianterna har även innehållslig variation: andra prefix och enheter, addition/subtraktion av bråk, en faktor större än 1, en tank med vatten från början, flera blandningsförhållanden, en radiosignal till månen samt två arbetstakter och ett utlopp. Två närliggande övningsvarianter per förlaga är avsiktligt enligt uppdraget.

## Anpassningar för tydlighet och självrättning

- Överslag (5): båda tal avrundas till tiotal. Detta gör bedömningen entydig; originalfrågan tillät flera överslag.
- Avrundningsgräns (13): antalet decimaler står uttryckligen i frågan.
- Negativa talpar (15): frågan anger ordningen `(a;b)` och `a−b`. Alla två negativa heltal, decimaler och bråk med rätt differens godtas, inte endast exemplet i facit.
- Storleksordning och motivering (17): klickbara alternativ innehåller både ordning och förklaring. Rätt ordning med fel förklaring underkänns. Alternativen blandas i träningen.
- Bråktal mellan gränser (19): öppet intervall rättas exakt med rationell aritmetik. Alla representerbara giltiga bråk och ändliga decimaler inom intervallet godtas. Gränserna underkänns även med mycket stora heltal. Facit visar ett möjligt exempel.
- Tabell (23): originalbladets motivering bevaras. Elevens a-kort har alternativ med förklaringar; b-kortet innehåller hela tabellen och rättas numeriskt. Varianten med 6 liter vid tiden 0 är linjär men inte proportionell.
- Grundpotensform (11) och förkortade bråk (9, 28) har avgränsade format som kontrollerar både värde och begärd talform. Vanliga tangentbords-, LaTeX- och exponentnotationer stöds. Felåterkopplingen visar grundpotensform och markerar öppna exempel som ”Till exempel”.
- Literpris (21), skatt (22), droppar (27) och signaler (29) har tydliga avrundningsinstruktioner och toleranser som motsvarar dem. Längd/bredd och minuter/sekunder har namngivna svarsfält i bestämd ordning.

## Kontroller

- 189 enhets-/kontraktstester i master, 47 SVG-tester och 86 tester i Kunskapsgymmet godkända. SVG-testernas Windowsstandardväg ersattes av den befintliga Chromium-adaptern i molnmiljön.
- Verkliga elevgränssnittet: 380 rätt/fel-kontroller i rättaren, 18 alternativkontroller och 216 försök via knappen Kontrollera. Serveranrop är blockerade och avslutshanteraren ersätts lokalt i testet, så inga elevresultat eller XP sparas.
- Alla 114 elevkort i 390 och 1 174 px: 228 vyer. Alla 90 nya huvuduppgifter i lärarbladens renderingsfunktioner i båda bredderna: 180 vyer. Inga KaTeX-fel, horisontella överflöden eller för långa lösningsrader. Antal svarsfält följer metadata. Utvalda mobilbilder har också granskats visuellt.
- Appens interna facitgranskning (`kvFacit`) passerar alla 114 nya elevkort. Grundpotensform kontrolleras i frågans begärda skrivsätt, inklusive LaTeX med svenskt decimaltecken.
- Tidigare felrapporters browserkontroll har återställts som ett komplett körbart test och passerar 21 rätt/fel-kontroller.
- Ma1-validator: ERROR 0 och WARNING 17 före och efter. Befintliga varningar ligger utanför tillägget. INFO om liknande texter gäller bland annat de beställda varianterna. Inga nya ERROR eller WARNING. Ma2 och Fy2 är oförändrade i denna omgång; deras tidigare validatorfynd kvarstår.
- Diff- och synkkontroll: befintliga objekt och ID:n bevarade, samtliga sju gemensamma banker identiska mellan repona, `git diff --check` utan fynd.

## Uppgifts-ID:n

| Provuppgift | Original-ID | Variant 1 | Variant 2 | Nivå (original) | Område |
| --- | --- | --- | --- | --- | --- |
| 1 | 0.1079 | 0.1080 | 0.1081 | 2 | tal_rakneordning |
| 2 | 0.1082 | 0.1083 | 0.1084 | 2 | negativa_tal |
| 3 | 0.1085 | 0.1086 | 0.1087 | 1 | avrundning |
| 4 | 0.1088 | 0.1089 | 0.1090 | 2 | decimaltal_positionssystem |
| 5 | 0.1091 | 0.1092 | 0.1093 | 2 | overslag_grunder |
| 6 | 0.1094 | 0.1095 | 0.1096 | 2 | enhetsbyten |
| 7 | 0.1100 | 0.1101 | 0.1102 | 1 | tiopotenser_prefix |
| 8 | 0.1097 | 0.1098 | 0.1099 | 2 | prefix |
| 9 | 0.1103 | 0.1104 | 0.1105 | 2 | brakrakning |
| 10 | 0.1106 | 0.1107 | 0.1108 | 1 | andelar |
| 11 | 0.1109 | 0.1110 | 0.1111 | 2 | tiopotenser_prefix |
| 12 | 0.1112 | 0.1113 | 0.1114 | 1 | andelar |
| 13 | 0.1115 | 0.1116 | 0.1117 | 2 | avrundning |
| 14 | 0.1118 | 0.1119 | 0.1120 | 2 | enhetsbyten |
| 15 | 0.1121 | 0.1122 | 0.1123 | 2 | negativa_tal |
| 16 | 0.1124 | 0.1125 | 0.1126 | 2 | enhetsbyten |
| 17 | 0.1127 | 0.1128 | 0.1129 | 2 | decimaltal_positionssystem |
| 18 | 0.1130 | 0.1131 | 0.1132 | 2 | proportionalitet_grunder |
| 19 | 0.1133 | 0.1134 | 0.1135 | 3 | brakform |
| 20 | 0.1136 | 0.1137 | 0.1138 | 2 | enhetsbyten |
| 21 | 0.1139 | 0.1140 | 0.1141 | 2 | proportionalitet_grunder |
| 22 | 3.547 | 3.548 | 3.549 | 2 | procent |
| 23 | 2.550 | 2.551 | 2.552 | 2 | representationer |
| 24 | 3.550 | 3.551 | 3.552 | 2 | procent |
| 25 | 7.544 | 7.545 | 7.546 | 2 | skala_likformighet |
| 26 | 0.1142 | 0.1143 | 0.1144 | 2 | forhallanden |
| 27 | 0.1145 | 0.1146 | 0.1147 | 3 | enhetsbyten |
| 28 | 0.1148 | 0.1149 | 0.1150 | 3 | brakrakning |
| 29 | 0.1151 | 0.1152 | 0.1153 | 3 | tiopotenser_prefix |
| 30 | 0.1154 | 0.1155 | 0.1156 | 3 | proportionalitet_grunder |

Huvuduppgifternas träningsnivåer: 1: 11, 2: 65, 3: 13, 4: 1. Elevkortens träningsnivåer: 1: 23, 2: 76, 3: 14, 4: 1.
