# Fy1: ems, polspänning och inre resistans – 2026-11-04

## Omfattning

**48 huvuduppgifter och 48 explicita delkort**, hela familjen Ems, polspänning och inre resistans. Baslinje master `cbf389d`. Samtliga frågor, facit och ledtrådar manuellt genomlästa och beräkningarna kontrollerade. Alla 96 facit följer nu FACITMALL.md. Redigeringsplan: `tools/fy1-facit-kap23/ems.py`; inga automatiskt gissade rubriker.

**Åtgärdade: alla 48 nedan. Granskad – inget fel: inga**, eftersom samtliga behövde ny facitstruktur. Detta betyder inte att alla hade räknefel. Samtliga numeriska rättningsmål är korrekta och bevarade. Det konkreta enhetsfelet i 8.225 är rättat i både facit och metadata.

Frågetexter, nivåer, numeriska mål och toleranser är bevarade. Förutom facit och ledtrådar ändras `8.225.svarEnhet` A → Ω och `8.13.geogebra` till true. Grafkortet 8.13 a tillåter GeoGebra, rutinberäkningen b har uttryckligt false. Alla tillåter miniräknare. 8.10 förblir endast i Uppgiftslabbet, med GeoGebra.

## Fynd och följdgranskning

- **Fel enhet:** 8.225 frågar efter yttre resistans men svarade A. Sju jämförelser 8.209, 8.235, 8.238, 8.241, 8.399, 8.400 och 8.401 har korrekta Ω och behålls.
- **Ofullständiga svar:** 8.162 och 8.164 saknade fullständiga dubbelsvar. Kontrollerade också 8.10, 8.398, 8.403, 8.406 och 8.525; varje efterfrågad storhet ska återkomma i rätt svarsruta.
- **Fristående kort:** 8.99 c ska inte kräva en resistans som bara anges i huvuduppgiften. Det räcker att samma R och olika I ger olika I²R. 8.44 c ska beskriva sitt eget resistorkort. Egna avrundade givna värden kontrollerade i 8.95 b, 8.162 b, 8.402 b–d, 8.403 b–c, 8.407 a–b och 8.409 b. Dessa ska inte ersättas av huvuduppgiftens fullprecisionstal.
- **Grafiska lösningar:** 8.10 får två grafer (linjeanpassning och kortslutning), 8.13 en effektgraf med markerat maximum. 8.13 a redovisar inte det numeriska svaret till b. Jämfört med tidigare granskade grafuppgifter 2.301 c, 2.303, 2.315 och densitetsgranskningens linjeanpassningar: grafarbete ska tillåta GeoGebra och visa en faktisk graf. Ren kvadratrotsomskrivning i 8.402 a kräver inte GeoGebra.
- **Modellförståelse:** 8.162 lovar inte att bilen säkert vägrar starta; det kräver en okänd startgräns. 8.406 får inte återanvända lampströmmen från a efter att polspänningen ändrats. 8.401 delar totalström mellan identiska parallella batterier. 8.525 använder samma ems och inre resistans i båda försöken.
- **Nivå:** befintliga beslut bevaras efter granskning. 8.13:s maximering och 8.525:s omvända tvåförsöksmodell ligger kvar på nivå 4. 8.239:s två mätningar ligger kvar på nivå 3. Grundläggande enstegsuppgifter behåller låg nivå.

## Verifiering

- `fysik1-kopplingar.test.js`: oberoende fysikmodeller för numeriska huvudnycklar och egna delkortsvärden. Nytt test kompletterar med 8.525, linjeanpassning, maxeffekt, alla 96 facitstrukturer, dubbelsvar, enheter och verktyg.
- Tidigare tester för blandade kopplingar, elektrisk effekt/energi, enkla kopplingar och elektricitet passerar. Fördjupningstestets äldre förbud mot numrerade steg ersätts enligt FACITMALL.md 2026-11-04 av formatkontroller för de omarbetade uppgifterna 8.524, 8.525 och 8.528. Samtliga fysik-, figur-, enhets- och nivåkontroller behålls.
- Kunskapsgymmets verkliga `friAvrundningRatt` accepterar 7,3, 7.30, 7,3 Ω och 7.3 ohm för 8.225; avvisar 7.3 A, 8 Ω och 7.2. Test: `tools/fysik1-ems-rattning-2026-11-04.test.js` i konsumentrepot.
- Alla **96 facit och ledtrådar** renderade med KaTeX vid 390 px med **båda apparnas CSS**: inga formelfel eller överflödande rader. Browserharness: `tools/fysik1-ems-facit-2026-11-04.browser.py`.
- Alla **16 befintliga frågefigurer** och de **tre nya facitgraferna** visuellt granskade: topologi, axlar, mätpunkter, etiketter och läsbarhet. Graferna visar endast relevant avläsning i respektive del.

## Samtliga granskade/åtgärdade och kommentarsförslag

Kommentarerna är förslag; inga rapportstatusar eller elevmeddelanden ändras av bankpushen.

| Uppgift | Status | Kommentarsförslag |
|---|---|---|
| 8.2 | Åtgärdad | Batteriets inre resistans förklaras som den saknade delen i strömberäkningen. |
| 8.207 | Åtgärdad | Inre spänningsfall beräknas före polspänningen. |
| 8.208 | Åtgärdad | Ohms lag tillämpas på batteriets inre resistans. |
| 8.209 | Åtgärdad | Skillnaden mellan ems och polspänning används för att beräkna inre resistansen. |
| 8.210 | Åtgärdad | Det inre spänningsfallet används för att bestämma strömmen. |
| 8.211 | Åtgärdad | Facit förklarar varför polspänningen närmar sig ems utan belastning. |
| 8.10 | Åtgärdad | Facit visar mätpunkter, anpassad linje och grafisk avläsning av kortslutningsströmmen. |
| 8.212 | Åtgärdad | Facit förklarar varför polspänningen är lägre än ems när batteriet levererar ström. |
| 8.13 | Åtgärdad | Maximal effekt motiveras med graf och algebraisk kontroll. GeoGebra tillåts i grafdelen. |
| 8.213 | Åtgärdad | Kortslutningsströmmen knyts uttryckligen till batterimodellen. |
| 8.216 | Åtgärdad | Inre spänningsfall och polspänning skiljs åt i två tydliga steg. |
| 8.217 | Åtgärdad | Facit visar varför det inre spänningsfallet ska läggas till polspänningen. |
| 8.44 | Åtgärdad | Alla fyra delar har egna svar. Resistanskortet använder endast sina egna givna data. |
| 8.218 | Åtgärdad | Inre resistans kopplas till både spänningsfall och värmeutveckling. |
| 8.219 | Åtgärdad | Strömmen löses ut ur sambandet för inre spänningsfall. |
| 8.220 | Åtgärdad | Strömberäkningen visar först skillnaden mellan ems och polspänning. |
| 8.221 | Åtgärdad | Ökad ström kopplas till större inre spänningsfall och lägre polspänning. |
| 8.223 | Åtgärdad | Den inre och yttre resistansen adderas innan strömmen beräknas. |
| 8.66 | Åtgärdad | Facit skiljer belastad krets från kortslutning. |
| 8.225 | Åtgärdad | Enheten är rättad från A till Ω i både facit och rättningens metadata. Talvärdet 7,3 är oförändrat. |
| 8.227 | Åtgärdad | Facit visar totalresistansen och strömberäkningen. |
| 8.93 | Åtgärdad | Alla delar har tydliga formler och relevanta ledtrådar, inklusive varför kortslutning värmer batteriet. |
| 8.229 | Åtgärdad | Polspänningen beräknas utan mellanavrundning av strömmen. |
| 8.95 | Åtgärdad | Polspänningens betydelse förklaras. Kort b använder sin egen givna ström 0,938 A. |
| 8.231 | Åtgärdad | Facit skiljer totalresistansen i strömberäkningen från den yttre resistansen i effektberäkningen. |
| 8.233 | Åtgärdad | Spänningsfallet beräknas över den inre resistansen med oavrundad ström. |
| 8.235 | Åtgärdad | Kortslutningsmodellen förklaras innan inre resistansen beräknas. |
| 8.236 | Åtgärdad | Facit går från inre spänningsfall till ström och därefter yttre resistans. |
| 8.99 | Åtgärdad | Serie- och parallellkopplade batterier jämförs. Begreppskort c behöver inget saknat resistansvärde. |
| 8.238 | Åtgärdad | Inre resistansen beräknas stegvis och avrundat resultat markeras med ungefär lika med. |
| 8.162 | Åtgärdad | Svarsraderna visar båda temperaturernas strömmar och spänningar. Kort b använder sina egna givna strömmar. |
| 8.239 | Åtgärdad | Facit förklarar varför förändringen i polspänning divideras med förändringen i ström. |
| 8.163 | Åtgärdad | Inre resistans, ems och ny polspänning beräknas i egna tydliga delar. |
| 8.241 | Åtgärdad | Kortslutningsmodellen och resistansens enhet förklaras. |
| 8.164 | Åtgärdad | Kompletta svar för spänning och effekt samt för både två och tre lampor. Svagare ljus förklaras via inre spänningsfall. |
| 8.398 | Åtgärdad | Båda belastningarna får en fullständig beräkning av polspänningen. |
| 8.399 | Åtgärdad | Facit skiljer total inre resistans från resistansen i varje cell. |
| 8.400 | Åtgärdad | Inre resistansen beräknas från spänningssänkningen vid belastning. |
| 8.401 | Åtgärdad | Facit förklarar att två identiska parallella batterier delar på strömmen. |
| 8.402 | Åtgärdad | Alla fyra delar förklaras med rätt belastning och full precision. Delkorten behåller sina egna avrundade givna data. |
| 8.403 | Åtgärdad | Yttre resistans, inre resistans och inre värmeeffekt skiljs åt. Delkorten använder den givna strömmen 1,72 A. |
| 8.404 | Åtgärdad | Facit visar hur inre resistansen bestäms före värmeeffekten. |
| 8.405 | Åtgärdad | Facit skiljer yttre resistans, inre värmeeffekt och total tillförd effekt. |
| 8.406 | Åtgärdad | Startmotorns och lampornas strömmar behandlas tillsammans. Lampströmmen räknas om när polspänningen ändras. |
| 8.407 | Åtgärdad | Strömkvoterna använder hela kretsens resistans. Delkorten utgår från sin givna ursprungsström 0,968 A. |
| 8.408 | Åtgärdad | Batteriernas ems och inre resistanser adderas före ström- och effektberäkningen. |
| 8.409 | Åtgärdad | Tomgångsspänning och belastad spänning skiljs åt. Kort b använder sin egen givna resistans 10,9 Ω. |
| 8.525 | Åtgärdad | De två försöken ger två ekvationer för samma batteri. Både ems och inre resistans redovisas och kontrolleras. |
