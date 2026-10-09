# Matematik 2: blandad geometrisk problemlösning – 2026-10-09

Önskemålet om ett område som bara heter **Problemlösning** är genomfört under Geometri i Matematik 2b och 2c. Området har 15 uppgifter: nio nya och sex befintliga kombinationsproblem som har samlats där. Alla tidigare uppgifts-ID:n är bevarade. De sex flyttade uppgifterna har fått genomgångna lösningar utan numrerade steglistor.

## Innehåll och nivåer

Uppgifterna blandar vinkelregler, randvinklar, Pythagoras sats, likformighet, bisektrissatsen, koordinater, area och andragradsfunktioner. Områdesnamnet anger inte vilken sats eleven ska välja. Ledtrådarna pekar mot nästa tanke utan att servera en färdig ekvation.

| Nivå | Antal | Avsikt |
| --- | ---: | --- |
| 1 | 1 | Trygg ingång: känna igen en randvinkel över en diameter. |
| 2 | 3 | Kombinera enkla vinkelregler eller bestämma en längd efter ett geometriskt metodval. |
| 3 | 2 | Kombinera längder, area eller bisektrissatsen. |
| 4 | 4 | Välja hjälplinje, jämföra deltrianglar eller ställa upp flera samband. |
| 5 | 5 | Mer självständiga strategival och modeller, inklusive största möjliga area. |

De nio nya uppgifterna är 3.531–3.539. De tränar en längd i en cirkel, en vinkel efter vinkeldelning, en triangelarea i en rektangel, en höjd bestämd med två ekvationer, bisektrissatsen tillsammans med Pythagoras, avståndet från diagonalernas skärningspunkt till en trapetsbas, vinklar mellan radier och korda, största möjliga rektangelarea samt en enkel randvinkel.

De sex befintliga problemen är 3.478, 3.479, 3.484, 3.485, 3.486 och 3.530. De omfattar areaskala, likformiga rätvinkliga trianglar, en takstol, ett kvadratiskt fönster, skugga mot en vägg och en bisektris i ett koordinatsystem. Inga duplicerade kopior har skapats. De övriga uppgifterna i de tidigare områdena ligger kvar.

Alla 15 uppgifter har räknats igenom självständigt och granskats i sitt sammanhang. Alla spelkort är hela, fristående frågor. Slutsvaren är entydiga och självrättande. En elev som ser ett numeriskt facit har också en förklaring av varför satserna går att använda.

## Figurer och rättning

Alla 15 uppgifter har figurer. De nio nya figurerna är konstruerade från faktiska koordinater som uppfyller givna längder och vinklar. Befintliga figurer har fått mindre placerings- och marginaljusteringar där text annars låg nära linjer eller kanter. Ingen figur anger ett beräknat svar på uppgiften.

3.535 lagrar det exakta numeriska värdet 30/7 och godtar det efterfrågade avrundade svaret 4,29 cm. 3.479 godtar likvärdiga rotuttryck. 3.530 godtar koordinater med både decimalpunkt och svensk decimal-/semikolonnotation, men underkänner omkastade koordinater. Lösningarnas formler fungerar i mobilkort utan vågrät överskridning.

## Övriga önskemål i den inskickade listan

Följande var redan genomförda och har kontrollerats i befintlig kod:

- Bråk med x på E-nivå: bland annat Ma1 1.1127 (`3x/9`) och 1.1128 (`4x/2 + 2x/4`), samt flera närliggande uppgifter. De ligger under algebra/ekvationer med bråk.
- Bisektrissatsen: tio uppgifter fanns före revisionen. Nio ligger kvar i satsområdet; koordinatproblemet 3.530 finns nu i Problemlösning. Den nya 3.535 kombinerar bisektrissatsen och Pythagoras.
- Analyshanteraren: `studentSummaryText` använder redan rubriken ”Kommentar” vid vanlig kopiering. Namn och provnamn används vid uttryckligt val av sammanställning med namn.
- Toppmenyn har redan ”Mina prov och övningsblad” och en vy för skolans gemensamma bank.

Önskemålsstatus i en extern databas har inte ändrats av denna kodrevision.

## Verifiering

- 179 automatiska tester i Uppgiftslabbet passerar, inklusive tre nya matematiska/strukturella kontraktstester.
- 88 kontroller med Kunskapsgymmets riktiga rättning passerar: exakta och avrundade numeriska svar, enheter, rotuttryck, koordinater samt avsiktligt felaktiga svar.
- Alla 15 uppgifter visas i både mobil- och datorbredd: 30 kortvisningar, inga KaTeX-fel, inga numrerade lösningslistor och inga för breda lösningsformler.
- Alla 15 SVG-figurer har granskats visuellt och med det verkliga SVG-analysverktyget. Inga SVG-fynd återstår i dessa figurer.
- Området är synligt med 15 uppgifter i Uppgiftslabbets riktiga filter. Kunskapsgymmet visar 15 för både 2b och 2c, och noll för 2a enligt områdets kursinnehåll.
- Bankvalidatorn har inga nya fynd. Fyra befintliga ERROR om metadata i 2.636/2.637 och 173 befintliga WARNING ligger utanför de ändrade uppgifterna.
- Bank och struktur är synkroniserade mellan repona. Kunskapsgymmets bankversion har höjts.

Ändrade ID:n och fält finns i [JSON-rapporten](MA2_PROBLEMLOSNING_2026-10-09.json). Tester finns i `tools/ma2-problemlosning.test.js` och `tools/ma2-problemlosning.browser.py` i Uppgiftslabbet.
