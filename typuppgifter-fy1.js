/* Grundgenomgångar för Fysik 1 i Kunskapsgymmet.
 * kap och omr anger placering; objektens ordning anger läsordning.
 * t och steg hör ihop och redigeras tillsammans.
 * Ett steg kan ha figur (SVG) som visas mellan text och matte. Figurer
 * använder dg-klasserna i index.html så att de följer tema och mörkt läge.
 * traningsfamilj är valfri och använder bankens oförändrade familjenamn.
 * Saknas familj leder träningsknappen till området.
 */
window.TYPUPPGIFTER_FY1 = {
  "fy1-grund-2-01": {
    "kap": 2,
    "omr": "enheter",
    "rubrik": "Omvandla enheter",
    "niva": "E",
    "t": "<p>En bil kör i 72 km/h. Hur stor är farten i m/s?</p>",
    "ram": "Samma fart kan anges i km/h eller m/s. När du räknar med sekunder och meter behöver farten vara i m/s.",
    "steg": [
      {
        "rubrik": "Skriv om kilometer och timmar",
        "text": "En kilometer är 1 000 meter och en timme är 3 600 sekunder.",
        "matte": "\\[72\\ \\mathrm{km/h}=\\frac{72\\cdot1000}{3600}\\ \\mathrm{m/s}\\]"
      },
      {
        "rubrik": "Räkna ut farten",
        "text": "Du kan därför omvandla från km/h till m/s genom att dividera med 3,6.",
        "matte": "\\[v=\\frac{72}{3{,}6}=20\\ \\mathrm{m/s}\\]"
      }
    ],
    "svar": "Farten är \\(20\\ \\mathrm{m/s}\\).",
    "komihag": "Från km/h till m/s: dividera med 3,6. Åt andra hållet: multiplicera med 3,6.",
    "traningsfamilj": "Enhetsomvandling"
  },
  "fy1-grund-2-02": {
    "kap": 2,
    "omr": "enheter",
    "rubrik": "Prefix och tiopotenser",
    "niva": "E",
    "t": "<p>Skriv 3,5 km i meter och 250 mA i ampere.</p>",
    "ram": "Prefixet framför en enhet talar om hur stor eller liten enheten är. Kilo betyder tusen och milli betyder en tusendel.",
    "steg": [
      {
        "rubrik": "Byt ut kilo mot tusen",
        "text": "Varje kilometer innehåller 1 000 meter.",
        "matte": "\\[3{,}5\\ \\mathrm{km}=3{,}5\\cdot10^3\\ \\mathrm m=3500\\ \\mathrm m\\]"
      },
      {
        "rubrik": "Byt ut milli mot en tusendel",
        "text": "Varje milliampere är 0,001 ampere.",
        "matte": "\\[250\\ \\mathrm{mA}=250\\cdot10^{-3}\\ \\mathrm A=0{,}250\\ \\mathrm A\\]"
      }
    ],
    "svar": "\\(3\\,500\\ \\mathrm m\\) och \\(0{,}250\\ \\mathrm A\\).",
    "komihag": "Byt ut prefixet mot dess tiopotens. Vanliga prefix är kilo (10³), centi (10⁻²), milli (10⁻³) och mikro (10⁻⁶).",
    "traningsfamilj": "Prefix, tiopotenser och storleksordning"
  },
  "fy1-grund-2-03": {
    "kap": 2,
    "omr": "enheter",
    "rubrik": "Area och volym i rätt enhet",
    "niva": "E",
    "t": "<p>Skriv 25 cm² i m² och 2,0 liter i m³.</p>",
    "ram": "När en längdenhet är upphöjd till två eller tre måste även omvandlingsfaktorn upphöjas.",
    "steg": [
      {
        "rubrik": "Omvandla arean",
        "text": "En centimeter är 0,01 meter. En kvadratcentimeter är därför 0,01 · 0,01 kvadratmeter.",
        "matte": "\\[25\\ \\mathrm{cm^2}=25\\cdot10^{-4}\\ \\mathrm{m^2}=0{,}0025\\ \\mathrm{m^2}\\]"
      },
      {
        "rubrik": "Omvandla volymen",
        "text": "En liter är en kubikdecimeter. Eftersom en decimeter är 0,1 meter blir en liter 0,001 kubikmeter.",
        "matte": "\\[2{,}0\\ \\mathrm l=2{,}0\\cdot10^{-3}\\ \\mathrm{m^3}=0{,}0020\\ \\mathrm{m^3}\\]"
      }
    ],
    "svar": "\\(0{,}0025\\ \\mathrm{m^2}\\) och \\(0{,}0020\\ \\mathrm{m^3}\\).",
    "komihag": "1 cm² = 10⁻⁴ m². 1 liter = 1 dm³ = 10⁻³ m³.",
    "fallgrop": "Använd inte längdens omvandlingsfaktor direkt för en area eller volym.",
    "traningsfamilj": "Area- och volymenheter"
  },
  "fy1-grund-2-04": {
    "kap": 2,
    "omr": "densitet",
    "rubrik": "Beräkna densitet",
    "niva": "E",
    "t": "<p>En metallbit har massan 156 g och volymen 20 cm³. Vilken densitet har metallen?</p>",
    "ram": "Densitet beskriver hur stor massa en viss volym av ett ämne har. Du delar massan med volymen.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Massan är given i gram och volymen i kubikcentimeter. Då får vi densiteten i g/cm³.",
        "matte": "\\[\\rho=\\frac mV\\]"
      },
      {
        "rubrik": "Sätt in värdena",
        "text": "Dela 156 gram på 20 kubikcentimeter.",
        "matte": "\\[\\rho=\\frac{156}{20}=7{,}8\\ \\mathrm{g/cm^3}\\]"
      }
    ],
    "svar": "Densiteten är \\(7{,}8\\ \\mathrm{g/cm^3}\\).",
    "komihag": "Densitet är massa per volym. En liten och en stor bit av samma homogena material har samma densitet.",
    "traningsfamilj": "Massa, volym och densitet"
  },
  "fy1-grund-2-05": {
    "kap": 2,
    "omr": "densitet",
    "rubrik": "Beräkna massa från densitet",
    "niva": "E",
    "t": "<p>En olja har densiteten 0,80 kg/liter. Vilken massa har 3,0 liter av oljan?</p>",
    "ram": "Om du vet densiteten och volymen kan du beräkna massan. Varje volymenhet bidrar med samma mängd massa.",
    "steg": [
      {
        "rubrik": "Lös ut massan",
        "text": "Multiplicera båda sidor i densitetssambandet med volymen.",
        "matte": "\\[\\rho=\\frac mV\\quad\\Rightarrow\\quad m=\\rho V\\]"
      },
      {
        "rubrik": "Multiplicera densitet och volym",
        "text": "Enheterna kg/liter och liter ger kilogram.",
        "matte": "\\[m=0{,}80\\cdot3{,}0=2{,}4\\ \\mathrm{kg}\\]"
      }
    ],
    "svar": "Oljans massa är \\(2{,}4\\ \\mathrm{kg}\\).",
    "komihag": "\\(m=\\rho V\\). Om du i stället söker volymen använder du \\(V=m/\\rho\\).",
    "traningsfamilj": "Massa, volym och densitet"
  },
  "fy1-grund-2-06": {
    "kap": 2,
    "omr": "densitet",
    "rubrik": "Omvandla densitet",
    "niva": "E",
    "t": "<p>Aluminium har densiteten 2,7 g/cm³. Ange densiteten i kg/m³.</p>",
    "ram": "Vid omvandling av densitet behöver både massenheten och volymenheten räknas om.",
    "steg": [
      {
        "rubrik": "Omvandla ett gram per kubikcentimeter",
        "text": "Ett gram är 0,001 kg och en kubikcentimeter är 0,000001 m³.",
        "matte": "\\[1\\ \\mathrm{g/cm^3}=\\frac{10^{-3}}{10^{-6}}\\ \\mathrm{kg/m^3}=1000\\ \\mathrm{kg/m^3}\\]"
      },
      {
        "rubrik": "Multiplicera med tusen",
        "text": "Samma faktor gäller för 2,7 g/cm³.",
        "matte": "\\[2{,}7\\ \\mathrm{g/cm^3}=2700\\ \\mathrm{kg/m^3}\\]"
      }
    ],
    "svar": "\\(2\\,700\\ \\mathrm{kg/m^3}\\).",
    "komihag": "Från g/cm³ till kg/m³ multiplicerar du med 1 000.",
    "traningsfamilj": "Omvandla densitetsenheter"
  },
  "fy1-grund-2-07": {
    "kap": 2,
    "omr": "densitet",
    "rubrik": "Volym och densitet hos ett rätblock",
    "niva": "E",
    "t": "<p>Ett massivt rätblock har måtten 10 cm × 5,0 cm × 2,0 cm och massan 270 g. Vilken densitet har materialet?</p>",
    "ram": "Om volymen inte är given kan du ibland beräkna den från föremålets mått. För ett rätblock multiplicerar du längd, bredd och höjd.",
    "steg": [
      {
        "rubrik": "Beräkna volymen",
        "text": "Alla längder är i centimeter, så volymen blir i kubikcentimeter.",
        "matte": "\\[V=10\\cdot5{,}0\\cdot2{,}0=100\\ \\mathrm{cm^3}\\]"
      },
      {
        "rubrik": "Dela massan med volymen",
        "text": "Nu använder vi det vanliga densitetssambandet.",
        "matte": "\\[\\rho=\\frac{m}{V}=\\frac{270}{100}=2{,}7\\ \\mathrm{g/cm^3}\\]"
      }
    ],
    "svar": "Densiteten är \\(2{,}7\\ \\mathrm{g/cm^3}\\).",
    "komihag": "Skriv upp alla mått i samma längdenhet innan du multiplicerar dem.",
    "traningsfamilj": "Densitet med geometri och volymberäkning"
  },
  "fy1-grund-2-08": {
    "kap": 2,
    "omr": "densitet",
    "rubrik": "Densitet från mätningar",
    "niva": "E",
    "t": "<p>Elin vill bestämma densiteten hos en vätska. Hon häller olika mycket vätska i ett mätglas och väger mätglaset med vätskan i efter varje påfyllning.</p><table class=\"data\"><tr><th>Volym <i>V</i> (cm³)</th><th>Massa <i>m</i> (g)</th></tr><tr><td>20</td><td>69</td></tr><tr><td>40</td><td>82</td></tr><tr><td>60</td><td>102</td></tr><tr><td>80</td><td>114</td></tr><tr><td>100</td><td>133</td></tr></table><p>Bestäm vätskans densitet genom att anpassa en rät linje till mätvärdena.</p>",
    "ram": "Med flera mätningar får du ett säkrare värde om du ritar en linje genom alla punkterna i stället för att lita på en enda mätning. Linjens lutning visar hur mycket massan ökar för varje kubikcentimeter vätska du fyller på. Det är precis vad densitet betyder.",
    "steg": [
      {
        "rubrik": "Rita mätpunkterna och anpassa en rät linje",
        "text": "Sätt volymen på x-axeln och massan på y-axeln och pricka in de fem mätpunkterna. Lägg sedan linjalen så att linjen följer punkterna så bra som möjligt, med ungefär lika många punkter på varje sida. Linjen behöver inte gå genom någon mätpunkt, och den behöver inte gå genom origo.",
        "figur": "<svg class=\"dg\" viewBox=\"0 0 520 444\" role=\"img\" aria-labelledby=\"dg-dens-t\"><title id=\"dg-dens-t\">Massa mot volym. Fem mätpunkter ligger nära en rät linje. Linjen går genom punkterna A (10 cm³, 60 g) och B (110 cm³, 140 g) och skär m-axeln vid ungefär 50 g.</title><g class=\"dg-txt\"><circle class=\"dg-matt\" cx=\"76\" cy=\"18\" r=\"5\"/><text x=\"88\" y=\"23\">mätvärde</text><circle class=\"dg-vald\" cx=\"182\" cy=\"18\" r=\"6\"/><text x=\"195\" y=\"23\">avläst punkt på linjen</text><line class=\"dg-linje\" x1=\"372\" y1=\"18\" x2=\"396\" y2=\"18\"/><text x=\"404\" y=\"23\">anpassad linje</text></g><path class=\"dg-rut\" d=\"M105 70V390M140 70V390M175 70V390M210 70V390M245 70V390M280 70V390M315 70V390M350 70V390M385 70V390M420 70V390M455 70V390M490 70V390M70 370H490M70 350H490M70 330H490M70 310H490M70 290H490M70 270H490M70 250H490M70 230H490M70 210H490M70 190H490M70 170H490M70 150H490M70 130H490M70 110H490M70 90H490M70 70H490\"/><path class=\"dg-axel\" d=\"M70 390H502M70 390V56\"/><path class=\"dg-pil\" d=\"M510 390l-10-4.5v9zM70 48l-4.5 10h9z\"/><g class=\"dg-txt\"><text x=\"70\" y=\"412\" text-anchor=\"middle\">0</text><text x=\"140\" y=\"412\" text-anchor=\"middle\">20</text><text x=\"210\" y=\"412\" text-anchor=\"middle\">40</text><text x=\"280\" y=\"412\" text-anchor=\"middle\">60</text><text x=\"350\" y=\"412\" text-anchor=\"middle\">80</text><text x=\"420\" y=\"412\" text-anchor=\"middle\">100</text><text x=\"490\" y=\"412\" text-anchor=\"middle\">120</text><text x=\"60\" y=\"395\" text-anchor=\"end\">0</text><text x=\"60\" y=\"355\" text-anchor=\"end\">20</text><text x=\"60\" y=\"315\" text-anchor=\"end\">40</text><text x=\"60\" y=\"235\" text-anchor=\"end\">80</text><text x=\"60\" y=\"195\" text-anchor=\"end\">100</text><text x=\"60\" y=\"155\" text-anchor=\"end\">120</text><text x=\"60\" y=\"75\" text-anchor=\"end\">160</text><text x=\"502\" y=\"436\" text-anchor=\"end\"><tspan font-style=\"italic\">V</tspan> (cm³)</text><text x=\"82\" y=\"62\"><tspan font-style=\"italic\">m</tspan> (g)</text></g><path class=\"dg-hjalp\" d=\"M105 270V390M105 270H70M455 270V390M455 110H70\"/><g class=\"dg-avl\"><text x=\"105\" y=\"412\" text-anchor=\"middle\">10</text><text x=\"455\" y=\"412\" text-anchor=\"middle\">110</text><text x=\"60\" y=\"275\" text-anchor=\"end\">60</text><text x=\"60\" y=\"115\" text-anchor=\"end\">140</text></g><path class=\"dg-delta\" d=\"M105 270H455V110\"/><path class=\"dg-vinkel\" d=\"M444 270V259H455\"/><line class=\"dg-linje\" x1=\"70\" y1=\"286\" x2=\"490\" y2=\"94\"/><circle class=\"dg-skar\" cx=\"70\" cy=\"286\" r=\"4\"/><circle class=\"dg-matt\" cx=\"140\" cy=\"252\" r=\"5.5\"/><circle class=\"dg-matt\" cx=\"210\" cy=\"226\" r=\"5.5\"/><circle class=\"dg-matt\" cx=\"280\" cy=\"186\" r=\"5.5\"/><circle class=\"dg-matt\" cx=\"350\" cy=\"162\" r=\"5.5\"/><circle class=\"dg-matt\" cx=\"420\" cy=\"124\" r=\"5.5\"/><circle class=\"dg-vald\" cx=\"105\" cy=\"270\" r=\"7\"/><circle class=\"dg-vald\" cx=\"455\" cy=\"110\" r=\"7\"/><g class=\"dg-etikett\"><text x=\"96\" y=\"258\" text-anchor=\"end\">A</text><text x=\"443\" y=\"100\" text-anchor=\"end\">B</text><text x=\"280\" y=\"293\" text-anchor=\"middle\">ΔV = 100 cm³</text><text x=\"445\" y=\"196\" text-anchor=\"end\">Δm = 80 g</text></g><text class=\"dg-not\" x=\"80\" y=\"310\">mätglaset ≈ 50 g</text></svg>"
      },
      {
        "rubrik": "Läs av två punkter på linjen",
        "text": "Välj två punkter som ligger på den ritade linjen, inte två av mätpunkterna. Linjen väger ihop alla fem mätningarna, medan en enskild mätpunkt kan ha ett mätfel. Ta punkterna långt ifrån varandra och gärna där linjen korsar rutnätet, så blir avläsningen noggrann. Här väljer vi A och B.",
        "matte": "\\[V_A=10\\ \\mathrm{cm^3},\\quad m_A=60\\ \\mathrm g\\]\\[V_B=110\\ \\mathrm{cm^3},\\quad m_B=140\\ \\mathrm g\\]"
      },
      {
        "rubrik": "Beräkna lutningen k",
        "text": "Lutningen är hur mycket y ändras delat med hur mycket x ändras. I diagrammet är det triangelns lodräta sida delad med den vågräta. Ta med enheterna från axlarna.",
        "matte": "\\[k=\\frac{\\Delta m}{\\Delta V}=\\frac{m_B-m_A}{V_B-V_A}\\]\\[k=\\frac{(140-60)\\ \\mathrm g}{(110-10)\\ \\mathrm{cm^3}}=\\frac{80\\ \\mathrm g}{100\\ \\mathrm{cm^3}}\\]\\[k=0{,}80\\ \\mathrm{g/cm^3}\\]"
      },
      {
        "rubrik": "Koppla k-värdet till densiteten",
        "text": "Lutningen säger att massan ökar med 0,80 g för varje kubikcentimeter vätska som fylls på. Massa per volym är just densitet, så lutningen är vätskans densitet. Mätglaset väger lika mycket i alla mätningar och påverkar därför inte lutningen. Mätglaset syns i stället där linjen skär m-axeln. Vid V = 0 finns ingen vätska, så linjen visar där mätglasets massa, ungefär 50 g.",
        "matte": "\\[\\rho=k=0{,}80\\ \\mathrm{g/cm^3}\\]"
      }
    ],
    "svar": "Vätskans densitet är ungefär \\(0{,}80\\ \\mathrm{g/cm^3}\\), alltså \\(800\\ \\mathrm{kg/m^3}\\).",
    "fallgrop": "Dela inte varje massa med sin volym. Massan innehåller mätglaset, så kvoterna blir för stora och olika för varje mätning: 69/20 ≈ 3,5 g/cm³ men 133/100 ≈ 1,3 g/cm³. Lutningen påverkas inte av mätglaset.",
    "komihag": "I ett diagram med massa på y-axeln och volym på x-axeln är densiteten linjens lutning, \\(\\rho=\\Delta m/\\Delta V\\). Läs av två punkter på linjen långt ifrån varandra. Var linjen skär m-axeln påverkar inte densiteten.",
    "traningsfamilj": "Densitet från diagram och mätdata"
  },
  "fy1-grund-2-09": {
    "kap": 2,
    "omr": "matnogg",
    "rubrik": "Värdesiffror och avrundning",
    "niva": "E",
    "t": "<p>Avrunda 0,037846 till tre värdesiffror.</p>",
    "ram": "Värdesiffror hjälper dig att visa hur noggrant ett mätvärde anges. Inledande nollor räknas inte.",
    "steg": [
      {
        "rubrik": "Hitta de tre första värdesiffrorna",
        "text": "Börja vid den första siffran som inte är noll. De tre första värdesiffrorna är 3, 7 och 8."
      },
      {
        "rubrik": "Titta på nästa siffra",
        "text": "Nästa siffra är 4. Den sista siffra vi behåller ska därför inte höjas.",
        "matte": "\\[0{,}037846\\approx0{,}0378\\]"
      }
    ],
    "svar": "\\(0{,}0378\\).",
    "komihag": "Behåll extra siffror under en beräkning och avrunda slutsvaret. Anpassa noggrannheten till de givna mätvärdena.",
    "traningsfamilj": "Värdesiffror och avrundning"
  },
  "fy1-grund-2-10": {
    "kap": 2,
    "omr": "matnogg",
    "rubrik": "Mätvärde och osäkerhet",
    "niva": "E",
    "t": "<p>En längd anges till (12,4 ± 0,2) cm. Vilket intervall motsvarar det?</p>",
    "ram": "Ett mätresultat med ± anger ett värde och en bedömd osäkerhet. Det beskriver ett intervall kring mätvärdet.",
    "steg": [
      {
        "rubrik": "Beräkna den nedre gränsen",
        "text": "Dra bort osäkerheten från mätvärdet.",
        "matte": "\\[12{,}4-0{,}2=12{,}2\\ \\mathrm{cm}\\]"
      },
      {
        "rubrik": "Beräkna den övre gränsen",
        "text": "Lägg till osäkerheten.",
        "matte": "\\[12{,}4+0{,}2=12{,}6\\ \\mathrm{cm}\\]"
      }
    ],
    "svar": "Intervallet är \\(12{,}2\\text{–}12{,}6\\ \\mathrm{cm}\\).",
    "komihag": "Osäkerheten anges i samma enhet som mätvärdet. Instrumentets upplösning är dess minsta visningssteg; andra felkällor kan ge större osäkerhet.",
    "traningsfamilj": "Mätintervall och absolut osäkerhet"
  },
  "fy1-grund-2-11": {
    "kap": 2,
    "omr": "matnogg",
    "rubrik": "Osäkerhet i procent",
    "niva": "E",
    "t": "<p>En massa mäts till (50,0 ± 0,5) g. Hur stor är osäkerheten i procent?</p>",
    "ram": "Den relativa osäkerheten visar hur stor osäkerheten är jämfört med det uppmätta värdet.",
    "steg": [
      {
        "rubrik": "Jämför osäkerheten med mätvärdet",
        "text": "Dividera 0,5 g med 50,0 g.",
        "matte": "\\[\\frac{0{,}5}{50{,}0}=0{,}010\\]"
      },
      {
        "rubrik": "Skriv andelen i procent",
        "text": "Multiplicera andelen med 100 procent.",
        "matte": "\\[0{,}010\\cdot100\\,\\%=1{,}0\\,\\%\\]"
      }
    ],
    "svar": "Osäkerheten är \\(1{,}0\\,\\%\\).",
    "komihag": "Relativ osäkerhet = absolut osäkerhet / mätvärdets belopp.",
    "traningsfamilj": "Relativ och procentuell osäkerhet"
  },
  "fy1-grund-2-12": {
    "kap": 2,
    "omr": "matnogg",
    "rubrik": "Upprepade mätningar",
    "niva": "E",
    "t": "<p>Tre tidsmätningar ger 2,1 s, 2,3 s och 2,2 s. Bestäm medelvärdet.</p>",
    "ram": "Mätvärden kan variera lite från gång till gång. Ett medelvärde gör resultatet mindre känsligt för slumpmässiga variationer.",
    "steg": [
      {
        "rubrik": "Addera mätvärdena",
        "text": "Alla tider är angivna i sekunder.",
        "matte": "\\[2{,}1+2{,}3+2{,}2=6{,}6\\ \\mathrm s\\]"
      },
      {
        "rubrik": "Dela med antalet mätningar",
        "text": "Det finns tre mätningar.",
        "matte": "\\[\\bar t=\\frac{6{,}6}{3}=2{,}2\\ \\mathrm s\\]"
      }
    ],
    "svar": "Medelvärdet är \\(2{,}2\\ \\mathrm s\\).",
    "komihag": "Fler mätningar kan minska påverkan av slumpmässiga fel. De tar inte bort ett systematiskt fel, till exempel en felinställd våg.",
    "traningsfamilj": "Upprepade mätningar och spridning"
  },
  "fy1-grund-2-13": {
    "kap": 2,
    "omr": "matnogg",
    "rubrik": "Välj en bättre mätmetod",
    "niva": "E",
    "t": "<p>Du vill mäta tiden för en pendels svängning. Varför är det bättre att mäta tio hela svängningar än bara en? Tio svängningar tar 15,0 s. Bestäm perioden.</p>",
    "ram": "Om en händelse går snabbt kan din reaktionstid påverka mätningen mycket. Ibland går det att mäta flera upprepningar tillsammans.",
    "steg": [
      {
        "rubrik": "Fördela tidtagningsfelet",
        "text": "Du startar och stoppar klockan en gång i båda fallen. Vid tio svängningar blir reaktionstidens bidrag en mindre andel av den uppmätta tiden."
      },
      {
        "rubrik": "Beräkna tiden för en svängning",
        "text": "Perioden är tiden för en hel svängning.",
        "matte": "\\[T=\\frac{15{,}0}{10}=1{,}50\\ \\mathrm s\\]"
      }
    ],
    "svar": "Metoden minskar reaktionstidens relativa betydelse. Perioden är \\(1{,}50\\ \\mathrm s\\).",
    "komihag": "Beskriv vad du mäter, hur du mäter och vilka felkällor som kan påverka resultatet.",
    "traningsfamilj": "Mätmetod och experimentdesign"
  },
  "fy1-grund-2-14": {
    "kap": 2,
    "omr": "matnogg",
    "rubrik": "Systematiska och slumpmässiga fel",
    "niva": "E",
    "t": "<p>En tom våg visar 0,20 kg. Med en väska på vågen visar den 4,70 kg. Vilket slags fel är detta, och vilken massa har väskan?</p>",
    "ram": "Ett systematiskt fel förskjuter mätvärden på ett återkommande sätt. Slumpmässiga fel ger variation mellan mätningarna.",
    "steg": [
      {
        "rubrik": "Identifiera felet",
        "text": "Vågen har ett nollpunktsfel: alla visningar blir 0,20 kg för stora. Det är ett systematiskt fel."
      },
      {
        "rubrik": "Korrigera visningen",
        "text": "Ta bort den extra massa som vågen visar även när den är tom.",
        "matte": "\\[m=4{,}70-0{,}20=4{,}50\\ \\mathrm{kg}\\]"
      }
    ],
    "svar": "Ett systematiskt fel. Väskans massa är \\(4{,}50\\ \\mathrm{kg}\\).",
    "komihag": "Kontrollera nollställningen innan du mäter. Att väga samma väska flera gånger tar inte bort vågens nollpunktsfel.",
    "traningsfamilj": "Systematiska och slumpmässiga fel"
  },
  "fy1-grund-3-01": {
    "kap": 3,
    "omr": "hastighet",
    "rubrik": "Rörelse med konstant hastighet",
    "niva": "E",
    "t": "<p>En cyklist kör rakt fram med farten 5,0 m/s i 12 s. Hur långt kommer cyklisten?</p>",
    "ram": "Vid likformig rörelse är hastigheten konstant: både farten och riktningen är oförändrade. Då är sträckan fart gånger tid.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Hastigheten ändras inte under tiden.",
        "matte": "\\[s=vt\\]"
      },
      {
        "rubrik": "Multiplicera fart och tid",
        "text": "Varje sekund färdas cyklisten fem meter.",
        "matte": "\\[s=5{,}0\\cdot12=60\\ \\mathrm m\\]"
      }
    ],
    "svar": "Cyklisten kommer \\(60\\ \\mathrm m\\).",
    "komihag": "Vid konstant fart gäller \\(s=vt\\), \\(v=s/t\\) och \\(t=s/v\\).",
    "traningsfamilj": "Likformig rörelse"
  },
  "fy1-grund-3-02": {
    "kap": 3,
    "omr": "hastighet",
    "rubrik": "Medelfart",
    "niva": "E",
    "t": "<p>Du cyklar 6,0 km på 20 minuter, inklusive ett kort stopp. Vilken medelfart har du i km/h?</p>",
    "ram": "Medelfarten är den totala tillryggalagda sträckan delad med hela restiden. Även pauser räknas in i tiden.",
    "steg": [
      {
        "rubrik": "Skriv tiden i timmar",
        "text": "20 minuter är en tredjedels timme.",
        "matte": "\\[t=\\frac{20}{60}\\ \\mathrm h\\]"
      },
      {
        "rubrik": "Dela hela sträckan med hela tiden",
        "text": "Stoppet ingår redan i de 20 minuterna.",
        "matte": "\\[v_{\\text{medelfart}}=\\frac{6{,}0}{20/60}=18\\ \\mathrm{km/h}\\]"
      }
    ],
    "svar": "Medelfarten är \\(18\\ \\mathrm{km/h}\\).",
    "komihag": "Medelfart använder tillryggalagd sträcka. Medelhastighet använder förflyttning och har riktning. Vid rörelse åt ett håll längs en rak linje har de samma belopp.",
    "traningsfamilj": "Medelhastighet"
  },
  "fy1-grund-3-03": {
    "kap": 3,
    "omr": "konstacc",
    "rubrik": "Beräkna acceleration",
    "niva": "E",
    "t": "<p>En vagn ökar sin hastighet från 2,0 m/s till 8,0 m/s på 3,0 s. Accelerationen är konstant. Hur stor är den?</p>",
    "ram": "Acceleration beskriver hur snabbt hastigheten ändras. En acceleration på 2 m/s² innebär att hastigheten ändras med 2 m/s varje sekund.",
    "steg": [
      {
        "rubrik": "Beräkna hastighetsändringen",
        "text": "Ta sluthastigheten minus starthastigheten.",
        "matte": "\\[\\Delta v=8{,}0-2{,}0=6{,}0\\ \\mathrm{m/s}\\]"
      },
      {
        "rubrik": "Dela ändringen med tiden",
        "text": "Hastigheten ökar med 6,0 m/s under tre sekunder.",
        "matte": "\\[a=\\frac{\\Delta v}{\\Delta t}=\\frac{6{,}0}{3{,}0}=2{,}0\\ \\mathrm{m/s^2}\\]"
      }
    ],
    "svar": "Accelerationen är \\(2{,}0\\ \\mathrm{m/s^2}\\).",
    "komihag": "\\(a=\\Delta v/\\Delta t\\). Vid inbromsning är accelerationen riktad mot rörelsen.",
    "traningsfamilj": "Konstant acceleration"
  },
  "fy1-grund-3-04": {
    "kap": 3,
    "omr": "konstacc",
    "rubrik": "Hastighet efter en viss tid",
    "niva": "E",
    "t": "<p>En vagn startar från vila och accelererar med 1,5 m/s² i 4,0 s. Vilken fart får den?</p>",
    "ram": "Vid konstant acceleration ändras hastigheten lika mycket varje sekund. Du lägger hastighetsändringen till starthastigheten.",
    "steg": [
      {
        "rubrik": "Skriv upp starthastigheten",
        "text": "Från vila betyder att starthastigheten är noll.",
        "matte": "\\[v_0=0\\]"
      },
      {
        "rubrik": "Beräkna sluthastigheten",
        "text": "På fyra sekunder ökar farten med fyra gånger 1,5 m/s.",
        "matte": "\\[v=v_0+at=0+1{,}5\\cdot4{,}0=6{,}0\\ \\mathrm{m/s}\\]"
      }
    ],
    "svar": "Farten blir \\(6{,}0\\ \\mathrm{m/s}\\).",
    "komihag": "\\(v=v_0+at\\) gäller vid konstant acceleration.",
    "traningsfamilj": "Konstant acceleration"
  },
  "fy1-grund-3-05": {
    "kap": 3,
    "omr": "konstacc",
    "rubrik": "Sträcka vid konstant acceleration",
    "niva": "E",
    "t": "<p>En vagn startar från vila och accelererar med 2,0 m/s² i 3,0 s. Hur långt rullar den?</p>",
    "ram": "Ett föremål som startar från vila hinner allt längre under varje sekund när det accelererar. Därför kan du inte använda slutfarten under hela tiden.",
    "steg": [
      {
        "rubrik": "Välj sambandet för sträckan",
        "text": "Starthastigheten är noll, så termen med starthastigheten försvinner.",
        "matte": "\\[s=v_0t+\\frac{at^2}{2}=\\frac{at^2}{2}\\]"
      },
      {
        "rubrik": "Kvadrera tiden och räkna",
        "text": "Tiden tre sekunder ska kvadreras.",
        "matte": "\\[s=\\frac{2{,}0\\cdot3{,}0^2}{2}=9{,}0\\ \\mathrm m\\]"
      }
    ],
    "svar": "Vagnen rullar \\(9{,}0\\ \\mathrm m\\).",
    "komihag": "Från vila och med konstant acceleration: \\(s=at^2/2\\).",
    "fallgrop": "Slutfarten är större än medelfarten under accelerationen.",
    "traningsfamilj": "Konstant acceleration"
  },
  "fy1-grund-3-06": {
    "kap": 3,
    "omr": "konstacc",
    "rubrik": "Fritt fall från vila",
    "niva": "E",
    "t": "<p>En liten sten släpps från vila. Vilken fart har den efter 1,0 s? Bortse från luftmotståndet.</p>",
    "ram": "Vid fritt fall nära jordytan är accelerationen ungefär 9,82 m/s² nedåt. Modellen gäller när vi kan försumma luftmotståndet.",
    "steg": [
      {
        "rubrik": "Välj nedåt som positiv riktning",
        "text": "Starthastigheten är noll och accelerationen är tyngdaccelerationen.",
        "matte": "\\[v_0=0,\\qquad a=g=9{,}82\\ \\mathrm{m/s^2}\\]"
      },
      {
        "rubrik": "Beräkna hastigheten",
        "text": "Använd samma samband som vid annan konstant acceleration.",
        "matte": "\\[v=v_0+gt=0+9{,}82\\cdot1{,}0\\approx9{,}8\\ \\mathrm{m/s}\\]"
      }
    ],
    "svar": "Stenens fart är ungefär \\(9{,}8\\ \\mathrm{m/s}\\), och den rör sig nedåt.",
    "komihag": "Utan luftmotstånd faller olika massor med samma acceleration från samma startvillkor.",
    "traningsfamilj": "Lodrät kast och fritt fall"
  },
  "fy1-grund-3-07": {
    "kap": 3,
    "omr": "diagram",
    "rubrik": "Läs ett läge–tid-diagram",
    "niva": "E",
    "t": "<p>Diagrammet visar en vagns läge. Vilken hastighet har vagnen?</p><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 215\" width=\"400\" height=\"215\" role=\"img\" aria-label=\"Läge mot tid. Rät linje från 0 s, 0 m till 4 s, 8 m.\" style=\"display:block;width:min(100%,400px);height:auto;margin:16px auto;color:inherit\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><g opacity=\"0.18\" stroke-width=\"1\"><path d=\"M115 55 V175\"/><path d=\"M175 55 V175\"/><path d=\"M235 55 V175\"/><path d=\"M295 55 V175\"/><path d=\"M55 145 H295\"/><path d=\"M55 115 H295\"/><path d=\"M55 85 H295\"/><path d=\"M55 55 H295\"/></g><path d=\"M115 171 V179\"/><path d=\"M175 171 V179\"/><path d=\"M235 171 V179\"/><path d=\"M295 171 V179\"/><path d=\"M51 145 H59\"/><path d=\"M51 115 H59\"/><path d=\"M51 85 H59\"/><path d=\"M51 55 H59\"/><path stroke=\"currentColor\" d=\"M55 175 L355 175 M346.90 171.09 L355 175 L346.90 178.91\"/><path stroke=\"currentColor\" d=\"M55 175 L55 20 M51.09 28.10 L55 20 L58.91 28.10\"/><text x=\"51\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">0</text><text x=\"111\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">1</text><text x=\"171\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">2</text><text x=\"231\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">3</text><text x=\"291\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">4</text><text x=\"26\" y=\"179\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">0</text><text x=\"26\" y=\"149\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">2</text><text x=\"26\" y=\"119\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">4</text><text x=\"26\" y=\"89\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">6</text><text x=\"26\" y=\"59\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">8</text><path d=\"M55 175 L295 55\" stroke=\"#36bfb0\" stroke-width=\"3\"/><text x=\"323\" y=\"163\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">t (s)</text><text x=\"65\" y=\"27\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">s (m)</text></g></svg>",
    "ram": "Läget visar var föremålet befinner sig längs en vald riktning. I ett läge–tid-diagram visar lutningen hastigheten.",
    "steg": [
      {
        "rubrik": "Läs av två punkter",
        "text": "Vid 0 s är läget 0 m. Vid 4 s är läget 8 m."
      },
      {
        "rubrik": "Beräkna lutningen",
        "text": "Lägesändringen är 8 m och tidsintervallet är 4 s.",
        "matte": "\\[v=\\frac{\\Delta s}{\\Delta t}=\\frac{8-0}{4-0}=2\\ \\mathrm{m/s}\\]"
      }
    ],
    "svar": "Hastigheten är \\(2\\ \\mathrm{m/s}\\) i positiv riktning.",
    "komihag": "En horisontell linje i ett läge–tid-diagram betyder att föremålet står stilla.",
    "traningsfamilj": "Tolka och rita rörelsediagram"
  },
  "fy1-grund-3-08": {
    "kap": 3,
    "omr": "diagram",
    "rubrik": "Läs ett hastighet–tid-diagram",
    "niva": "E",
    "t": "<p>Hur långt rör sig vagnen under de fem sekunderna i diagrammet?</p><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 215\" width=\"400\" height=\"215\" role=\"img\" aria-label=\"Hastighet mot tid. Konstant hastighet 4 m/s från 0 till 5 s.\" style=\"display:block;width:min(100%,400px);height:auto;margin:16px auto;color:inherit\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><g opacity=\"0.18\" stroke-width=\"1\"><path d=\"M105 55 V175\"/><path d=\"M155 55 V175\"/><path d=\"M205 55 V175\"/><path d=\"M255 55 V175\"/><path d=\"M305 55 V175\"/><path d=\"M55 145 H305\"/><path d=\"M55 115 H305\"/><path d=\"M55 85 H305\"/><path d=\"M55 55 H305\"/></g><path d=\"M105 171 V179\"/><path d=\"M155 171 V179\"/><path d=\"M205 171 V179\"/><path d=\"M255 171 V179\"/><path d=\"M305 171 V179\"/><path d=\"M51 145 H59\"/><path d=\"M51 115 H59\"/><path d=\"M51 85 H59\"/><path d=\"M51 55 H59\"/><path stroke=\"currentColor\" d=\"M55 175 L355 175 M346.90 171.09 L355 175 L346.90 178.91\"/><path stroke=\"currentColor\" d=\"M55 175 L55 20 M51.09 28.10 L55 20 L58.91 28.10\"/><text x=\"51\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">0</text><text x=\"101\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">1</text><text x=\"151\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">2</text><text x=\"201\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">3</text><text x=\"251\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">4</text><text x=\"301\" y=\"197\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">5</text><text x=\"30\" y=\"179\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">0</text><text x=\"30\" y=\"149\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">1</text><text x=\"30\" y=\"119\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">2</text><text x=\"30\" y=\"89\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">3</text><text x=\"30\" y=\"59\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">4</text><path d=\"M55 55 L305 55\" stroke=\"#36bfb0\" stroke-width=\"3\"/><text x=\"323\" y=\"163\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">t (s)</text><text x=\"65\" y=\"27\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">v (m/s)</text></g></svg>",
    "ram": "I ett hastighet–tid-diagram kan du läsa av hastigheten direkt. Arean mellan grafen och tidsaxeln ger förflyttningen.",
    "steg": [
      {
        "rubrik": "Läs av hastighet och tid",
        "text": "Vagnen håller 4 m/s under 5 s. Hastigheten är positiv hela tiden."
      },
      {
        "rubrik": "Beräkna rektangelns area",
        "text": "Bredden är tiden och höjden är hastigheten. Produkten får enheten meter.",
        "matte": "\\[s=4\\cdot5=20\\ \\mathrm m\\]"
      }
    ],
    "svar": "Vagnen rör sig \\(20\\ \\mathrm m\\).",
    "komihag": "Lutningen i ett v–t-diagram ger accelerationen. Arean ger förflyttningen; när hastigheten är positiv hela tiden är den också sträckan.",
    "traningsfamilj": "Lutning och area i rörelsediagram"
  },
  "fy1-grund-3-09": {
    "kap": 3,
    "omr": "konstacc",
    "rubrik": "Reaktionssträcka",
    "niva": "E",
    "t": "<p>En bil kör i 20 m/s. Förarens reaktionstid är 0,80 s. Hur lång är reaktionssträckan?</p>",
    "ram": "Innan föraren börjar bromsa fortsätter bilen ungefär med samma fart. Sträckan under den tiden kallas reaktionssträcka.",
    "steg": [
      {
        "rubrik": "Beskriv rörelsen under reaktionstiden",
        "text": "Bromsningen har ännu inte börjat. Vi räknar med konstant fart."
      },
      {
        "rubrik": "Multiplicera fart och tid",
        "text": "Använd sambandet för likformig rörelse.",
        "matte": "\\[s=vt=20\\cdot0{,}80=16\\ \\mathrm m\\]"
      }
    ],
    "svar": "Reaktionssträckan är \\(16\\ \\mathrm m\\).",
    "komihag": "Stoppsträcka = reaktionssträcka + bromssträcka. Här beräknar vi bara reaktionssträckan.",
    "traningsfamilj": "Reaktions- och bromssträcka"
  },
  "fy1-grund-4-01": {
    "kap": 4,
    "omr": "ritakrafter",
    "rubrik": "Rita krafterna på ett föremål",
    "niva": "E",
    "t": "<p>En bok ligger stilla på ett vågrätt bord. Vilka krafter verkar på boken, och åt vilka håll?</p>",
    "ram": "Börja en kraftuppgift med att välja vilket föremål du undersöker. Rita sedan de krafter som omgivningen utövar på just det föremålet.",
    "steg": [
      {
        "rubrik": "Jorden drar boken nedåt",
        "text": "Tyngdkraften verkar lodrätt nedåt. Den ritas som en pil nedåt från boken."
      },
      {
        "rubrik": "Bordet trycker boken uppåt",
        "text": "Normalkraften verkar vinkelrätt mot bordet, alltså uppåt. Boken är i jämvikt, så de två krafterna är lika stora."
      },
      {
        "rubrik": "Rita lika långa kraftpilar",
        "text": "Här visar pilarnas lika längd att krafterna är lika stora. Kraftdiagrammet gäller boken.<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 220\" width=\"400\" height=\"220\" role=\"img\" aria-label=\"Kraftdiagram för en bok. Lika långa pilar visar normalkraft uppåt och tyngdkraft nedåt.\" style=\"display:block;width:min(100%,400px);height:auto;margin:16px auto;color:inherit\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"150\" y=\"85\" width=\"95\" height=\"40\" rx=\"3\"/><path stroke=\"currentColor\" d=\"M197 105 L197 20 M193.09 28.10 L197 20 L200.91 28.10\"/><path stroke=\"currentColor\" d=\"M197 105 L197 190 M200.91 181.90 L197 190 L193.09 181.90\"/><text x=\"218\" y=\"32\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">Normalkraft</text><text x=\"218\" y=\"189\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">Tyngdkraft</text></g></svg>"
      }
    ],
    "svar": "Tyngdkraft nedåt och lika stor normalkraft uppåt.",
    "komihag": "Rita bara krafter på det valda föremålet. En hastighetspil är inte en kraft.",
    "traningsfamilj": "Friläggning och kraftdiagram"
  },
  "fy1-grund-4-02": {
    "kap": 4,
    "omr": "newton",
    "rubrik": "Newtons första lag",
    "niva": "E",
    "t": "<p>En vagn rullar rakt fram med konstant fart. Dragkraften är 12 N framåt. Hur stor är den sammanlagda motståndskraften?</p>",
    "ram": "Om den resulterande kraften är noll ändras inte hastigheten. Föremålet kan stå stilla eller röra sig rakt fram med konstant fart.",
    "steg": [
      {
        "rubrik": "Koppla rörelsen till kraftsumman",
        "text": "Konstant hastighet betyder att accelerationen är noll. Krafterna måste därför ta ut varandra."
      },
      {
        "rubrik": "Bestäm motståndskraften",
        "text": "För att balansera 12 N framåt behövs 12 N bakåt."
      }
    ],
    "svar": "Motståndskraften är \\(12\\ \\mathrm N\\) bakåt.",
    "komihag": "Det behövs en resulterande kraft för att ändra hastigheten, inte för att behålla en konstant hastighet.",
    "traningsfamilj": "Kraftjämvikt"
  },
  "fy1-grund-4-03": {
    "kap": 4,
    "omr": "newton",
    "rubrik": "Resulterande kraft",
    "niva": "E",
    "t": "<p>Två vågräta krafter verkar på en låda: 30 N åt höger och 10 N åt vänster. Vilken är den resulterande kraften?</p>",
    "ram": "Den resulterande kraften, eller resultanten, är summan av alla krafter på föremålet. Kraftens riktning måste räknas med.",
    "steg": [
      {
        "rubrik": "Välj en positiv riktning",
        "text": "Vi väljer höger som positivt. Kraften åt vänster får då minustecken."
      },
      {
        "rubrik": "Summera krafterna",
        "text": "Krafterna verkar åt motsatta håll, så deras belopp subtraheras.",
        "matte": "\\[F_{\\mathrm{res}}=30-10=20\\ \\mathrm N\\]"
      }
    ],
    "svar": "Resultanten är \\(20\\ \\mathrm N\\) åt höger.",
    "komihag": "Krafter åt samma håll adderas. Krafter åt motsatta håll subtraheras. Ange också resultantens riktning.",
    "traningsfamilj": "Newtons andra lag med motståndskrafter"
  },
  "fy1-grund-4-04": {
    "kap": 4,
    "omr": "newton",
    "rubrik": "Newtons andra lag",
    "niva": "E",
    "t": "<p>En vagn har massan 4,0 kg. Den resulterande kraften på vagnen är 12 N åt höger. Bestäm accelerationen.</p>",
    "ram": "En resulterande kraft ger acceleration. Hur stor accelerationen blir beror både på kraften och på föremålets massa.",
    "steg": [
      {
        "rubrik": "Skriv sambandet",
        "text": "Det är summan av krafterna som ska användas, inte en godtycklig enskild kraft.",
        "matte": "\\[F_{\\mathrm{res}}=ma\\]"
      },
      {
        "rubrik": "Lös ut accelerationen",
        "text": "Dividera båda sidor med massan.",
        "matte": "\\[a=\\frac{F_{\\mathrm{res}}}{m}=\\frac{12}{4{,}0}=3{,}0\\ \\mathrm{m/s^2}\\]"
      }
    ],
    "svar": "Accelerationen är \\(3{,}0\\ \\mathrm{m/s^2}\\) åt höger.",
    "komihag": "\\(F_{\\mathrm{res}}=ma\\). Accelerationen har samma riktning som resultanten.",
    "traningsfamilj": "Newtons andra lag"
  },
  "fy1-grund-4-05": {
    "kap": 4,
    "omr": "newton",
    "rubrik": "Newtons tredje lag",
    "niva": "E",
    "t": "<p>Du trycker på en vägg med kraften 50 N. Med vilken kraft trycker väggen på dig?</p>",
    "ram": "När ett föremål påverkar ett annat med en kraft verkar samtidigt en lika stor kraft tillbaka. Krafterna är motriktade och verkar på olika föremål.",
    "steg": [
      {
        "rubrik": "Identifiera kraftparet",
        "text": "Den ena kraften är din kraft på väggen. Den andra är väggens kraft på dig."
      },
      {
        "rubrik": "Använd tredje lagen",
        "text": "Krafterna är lika stora och motriktade. De tar inte ut varandra på dig, eftersom en av dem verkar på väggen."
      }
    ],
    "svar": "Väggen trycker på dig med \\(50\\ \\mathrm N\\), i motsatt riktning.",
    "komihag": "Kraft och motkraft verkar på olika föremål. Bokens tyngdkraft och normalkraft är därför inte ett sådant kraftpar."
  },
  "fy1-grund-4-06": {
    "kap": 4,
    "omr": "gravitation",
    "rubrik": "Massa och tyngdkraft",
    "niva": "E",
    "t": "<p>En ryggsäck har massan 5,0 kg. Hur stor är tyngdkraften på den nära jordytan? Använd g = 9,82 N/kg.</p>",
    "ram": "Massan anges i kilogram. Tyngdkraften är den kraft som jorden eller en annan himlakropp drar föremålet med och anges i newton.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Tyngdkraften är proportionell mot massan.",
        "matte": "\\[F_g=mg\\]"
      },
      {
        "rubrik": "Multiplicera med tyngdfaktorn",
        "text": "Enheten kg tar ut kg i N/kg, så svaret blir i newton.",
        "matte": "\\[F_g=5{,}0\\cdot9{,}82=49{,}1\\ \\mathrm N\\]"
      }
    ],
    "svar": "Tyngdkraften är ungefär \\(49\\ \\mathrm N\\) nedåt.",
    "komihag": "Samma ryggsäck har samma massa på månen, men mindre tyngdkraft eftersom g är mindre där.",
    "traningsfamilj": "Gravitation, tyngd och cirkulära banor"
  },
  "fy1-grund-4-07": {
    "kap": 4,
    "omr": "ritakrafter",
    "rubrik": "Dela upp en kraft i komposanter",
    "niva": "E",
    "t": "<p>En kraft är 100 N och bildar vinkeln 30° mot den vågräta riktningen. Bestäm den vågräta och den lodräta komposanten.</p><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 215\" width=\"400\" height=\"215\" role=\"img\" aria-label=\"Kraft på 100 N riktad 30 grader över den positiva x-axeln.\" style=\"display:block;width:min(100%,400px);height:auto;margin:16px auto;color:inherit\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke=\"currentColor\" d=\"M70 170 L330 170 M321.90 166.09 L330 170 L321.90 173.91\"/><path stroke=\"currentColor\" d=\"M70 170 L70 25 M66.09 33.10 L70 25 L73.91 33.10\"/><path stroke=\"#36bfb0\" d=\"M70 170 L260 60 M251.03 60.67 L260 60 L254.95 67.45\"/><path d=\"M260 60 V170 M70 60 H260\" stroke-dasharray=\"5 5\"/><path d=\"M112 170 A42 42 0 0 0 106.3 149\"/><text x=\"121\" y=\"157\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">30°</text><text x=\"168\" y=\"88\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">100 N</text><text x=\"322\" y=\"195\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">x</text><text x=\"45\" y=\"30\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">y</text></g></svg>",
    "ram": "En sned kraft kan ersättas av en vågrät och en lodrät komposant. Tillsammans har komposanterna samma verkan som den ursprungliga kraften.",
    "steg": [
      {
        "rubrik": "Utgå från den markerade vinkeln",
        "text": "Kraften är hypotenusan i den rätvinkliga triangeln. Den vågräta komposanten är närliggande katet och den lodräta är motstående katet.",
        "matte": "\\[\\cos30^\\circ=\\frac{F_x}{100},\\qquad\\sin30^\\circ=\\frac{F_y}{100}\\]"
      },
      {
        "rubrik": "Beräkna komposanterna",
        "text": "Använd cosinus för den närliggande kateten och sinus för den motstående. Räknaren ska vara inställd på grader.",
        "matte": "\\[F_x=100\\cos30^\\circ\\approx87\\ \\mathrm N\\qquad F_y=100\\sin30^\\circ=50\\ \\mathrm N\\]"
      }
    ],
    "svar": "Ungefär \\(87\\ \\mathrm N\\) åt höger och \\(50\\ \\mathrm N\\) uppåt.",
    "komihag": "Välj sinus eller cosinus utifrån vilken vinkel som är markerad. Komposanterna är ett annat sätt att beskriva samma kraft, inte två extra krafter."
  },
  "fy1-grund-4-08": {
    "kap": 4,
    "omr": "friktion",
    "rubrik": "Glidfriktion",
    "niva": "E",
    "t": "<p>En låda glider på ett golv. Normalkraften är 200 N och glidfriktionstalet är 0,30. Hur stor är friktionskraften?</p>",
    "ram": "Glidfriktion motverkar glidningen mellan två ytor. I en enkel modell är den proportionell mot normalkraften.",
    "steg": [
      {
        "rubrik": "Välj friktionssambandet",
        "text": "Normalkraften är redan given. Vi behöver därför inte beräkna den från massan.",
        "matte": "\\[F_f=\\mu F_N\\]"
      },
      {
        "rubrik": "Multiplicera",
        "text": "Friktionstalet saknar enhet, så resultatet får enheten newton.",
        "matte": "\\[F_f=0{,}30\\cdot200=60\\ \\mathrm N\\]"
      }
    ],
    "svar": "Friktionskraften är \\(60\\ \\mathrm N\\), riktad mot glidningen.",
    "komihag": "På ett vågrätt golv är normalkraften lika stor som tyngdkraften om inga andra lodräta krafter verkar och den lodräta accelerationen är noll.",
    "traningsfamilj": "Friktionskraft, friktionstal och rörelse"
  },
  "fy1-grund-4-09": {
    "kap": 4,
    "omr": "friktion",
    "rubrik": "Vilofriktion",
    "niva": "E",
    "t": "<p>Du skjuter vågrätt på en låda med 20 N. Lådan står kvar. Den största möjliga vilofriktionen är 35 N. Hur stor är friktionskraften just nu?</p>",
    "ram": "Vilofriktion kan hindra ett föremål från att börja glida. Den anpassar sig till de övriga krafterna, men bara upp till ett gränsvärde.",
    "steg": [
      {
        "rubrik": "Använd att lådan står stilla",
        "text": "Den vågräta kraftsumman är noll. Friktionen måste balansera kraften som du trycker med."
      },
      {
        "rubrik": "Skilj aktuell kraft från största möjliga",
        "text": "Friktionen behöver bara vara 20 N. Värdet 35 N är gränsen för hur stor den kan bli innan lådan börjar glida."
      }
    ],
    "svar": "Friktionskraften är \\(20\\ \\mathrm N\\), mot din tryckkraft.",
    "komihag": "Vilofriktionen är inte alltid lika med sitt maxvärde. Glidfriktion används när ytorna glider mot varandra.",
    "traningsfamilj": "Statisk och glidfriktion"
  },
  "fy1-grund-4-10": {
    "kap": 4,
    "omr": "fjadrar",
    "rubrik": "Fjäderkraft",
    "niva": "E",
    "t": "<p>En fjäder har fjäderkonstanten 100 N/m och förlängs 5,0 cm. Hur stor är fjäderkraften?</p>",
    "ram": "När en fjäder dras ut ökar kraften. Inom fjäderns elastiska område kan vi ofta använda Hookes lag.",
    "steg": [
      {
        "rubrik": "Omvandla förlängningen",
        "text": "Fjäderkonstanten är i N/m, så förlängningen ska vara i meter.",
        "matte": "\\[\\Delta l=5{,}0\\ \\mathrm{cm}=0{,}050\\ \\mathrm m\\]"
      },
      {
        "rubrik": "Använd Hookes lag",
        "text": "Förlängningen mäts från fjäderns obelastade längd.",
        "matte": "\\[F=k\\Delta l=100\\cdot0{,}050=5{,}0\\ \\mathrm N\\]"
      }
    ],
    "svar": "Fjäderkraften är \\(5{,}0\\ \\mathrm N\\).",
    "komihag": "\\(F=k\\Delta l\\). Fjäderkraften är riktad så att fjädern vill återgå till sin obelastade längd.",
    "traningsfamilj": "Fjädrar: kraft, energi och svängning"
  },
  "fy1-grund-4-11": {
    "kap": 4,
    "omr": "moment",
    "rubrik": "Kraftmoment",
    "niva": "E",
    "t": "<p>Du trycker med 40 N vinkelrätt mot en skiftnyckel, 0,20 m från mutterns mitt. Hur stort är kraftmomentet?</p>",
    "ram": "En kraft kan vrida ett föremål kring en axel. Vridverkan beror både på kraften och på dess hävarm.",
    "steg": [
      {
        "rubrik": "Bestäm hävarmen",
        "text": "Hävarmen är det vinkelräta avståndet från vridningsaxeln till kraftens verkningslinje. Här är det 0,20 m."
      },
      {
        "rubrik": "Multiplicera kraft och hävarm",
        "text": "Kraftmoment anges i newtonmeter.",
        "matte": "\\[M=Fl=40\\cdot0{,}20=8{,}0\\ \\mathrm{Nm}\\]"
      }
    ],
    "svar": "Kraftmomentet är \\(8{,}0\\ \\mathrm{Nm}\\).",
    "komihag": "Med längre hävarm behövs mindre kraft för att åstadkomma samma moment.",
    "traningsfamilj": "Kraftmoment"
  },
  "fy1-grund-4-12": {
    "kap": 4,
    "omr": "moment",
    "rubrik": "Jämvikt på en hävstång",
    "niva": "E",
    "t": "<p>En lätt, vågrät hävstång har en nedåtriktad kraft på 60 N, 0,20 m till vänster om stödet. Hur stor nedåtriktad kraft behövs 0,60 m till höger om stödet för jämvikt? Försumma hävstångens tyngd.</p>",
    "ram": "En hävstång i jämvikt har lika stora sammanlagda moment medurs och moturs.",
    "steg": [
      {
        "rubrik": "Beräkna momentet på vänster sida",
        "text": "Kraften är vinkelrät mot hävstången.",
        "matte": "\\[M=60\\cdot0{,}20=12\\ \\mathrm{Nm}\\]"
      },
      {
        "rubrik": "Låt den andra sidan ge samma moment",
        "text": "Den högra kraften vrider åt motsatt håll.",
        "matte": "\\[F\\cdot0{,}60=12\\quad\\Rightarrow\\quad F=20\\ \\mathrm N\\]"
      }
    ],
    "svar": "Det behövs \\(20\\ \\mathrm N\\).",
    "komihag": "Tre gånger längre hävarm kräver en tredjedel så stor kraft för samma moment.",
    "traningsfamilj": "Momentjämvikt"
  },
  "fy1-grund-4-13": {
    "kap": 4,
    "omr": "moment",
    "rubrik": "Tyngdpunkt och stabilitet",
    "niva": "E",
    "t": "<p>Två likadana tomma lådor står på ett plant golv. Den ena står på sin breda sida, den andra på sin smala sida. Vilken behöver lutas mest innan den välter åt sidan? Förklara.</p>",
    "ram": "För att undersöka om ett föremål välter kan du tänka dig att hela tyngdkraften verkar i dess tyngdpunkt.",
    "steg": [
      {
        "rubrik": "Jämför stödytorna",
        "text": "Lådan på den breda sidan har bredare stödyta i den riktning den ska tippas."
      },
      {
        "rubrik": "Följ tyngdpunkten vid tippning",
        "text": "När lådan står på den breda sidan ligger tyngdpunkten också lägre. Lådan behöver tippas mer innan tyngdkraftens lodlinje hamnar utanför stödytan."
      }
    ],
    "svar": "Lådan på den breda sidan behöver lutas mest innan den välter.",
    "komihag": "Bred stödyta och låg tyngdpunkt ger vanligtvis bättre stabilitet.",
    "traningsfamilj": "Tyngdpunkt och stabilitet"
  },
  "fy1-grund-5-01": {
    "kap": 5,
    "omr": "arbete",
    "rubrik": "Mekaniskt arbete",
    "niva": "E",
    "t": "<p>Du drar en vagn 5,0 m med en konstant kraft på 20 N i rörelsens riktning. Hur stort arbete utför du?</p>",
    "ram": "En kraft utför arbete när den verkar under en förflyttning. När kraften är konstant och riktad längs rörelsen är arbetet kraft gånger sträcka.",
    "steg": [
      {
        "rubrik": "Kontrollera kraftens riktning",
        "text": "Kraften och förflyttningen har samma riktning, så hela kraften bidrar till arbetet."
      },
      {
        "rubrik": "Multiplicera kraft och sträcka",
        "text": "Newton gånger meter ger joule.",
        "matte": "\\[W=Fs=20\\cdot5{,}0=100\\ \\mathrm J\\]"
      }
    ],
    "svar": "Du utför arbetet \\(100\\ \\mathrm J\\).",
    "komihag": "\\(W=Fs\\) för en konstant kraft i rörelsens riktning. Utan förflyttning utför kraften inget mekaniskt arbete på föremålet.",
    "traningsfamilj": "Mekaniskt arbete"
  },
  "fy1-grund-5-02": {
    "kap": 5,
    "omr": "arbete",
    "rubrik": "Lägesenergi",
    "niva": "E",
    "t": "<p>En bok med massan 2,0 kg ligger på en hylla 1,5 m över golvet. Vilken lägesenergi har boken om golvet är nollnivå? Använd g = 9,82 N/kg.</p>",
    "ram": "När ett föremål lyfts ökar dess lägesenergi i jordens tyngdfält. Vi behöver ange vilken höjd som räknas som noll.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Höjden mäts från golvet, där vi har valt lägesenergin noll.",
        "matte": "\\[E_p=mgh\\]"
      },
      {
        "rubrik": "Sätt in massan och höjden",
        "text": "Resultatet anges i joule.",
        "matte": "\\[E_p=2{,}0\\cdot9{,}82\\cdot1{,}5=29{,}46\\ \\mathrm J\\]"
      }
    ],
    "svar": "Bokens lägesenergi är ungefär \\(29\\ \\mathrm J\\).",
    "komihag": "Det är skillnaden i höjd som avgör ändringen i lägesenergi.",
    "traningsfamilj": "Arbete och mekanisk energi"
  },
  "fy1-grund-5-03": {
    "kap": 5,
    "omr": "arbete",
    "rubrik": "Rörelseenergi",
    "niva": "E",
    "t": "<p>En vagn med massan 2,0 kg har farten 3,0 m/s. Hur stor är rörelseenergin?</p>",
    "ram": "Ett föremål som rör sig har rörelseenergi. Den beror på massan och på farten i kvadrat.",
    "steg": [
      {
        "rubrik": "Skriv sambandet",
        "text": "Massan ska vara i kilogram och farten i meter per sekund.",
        "matte": "\\[E_k=\\frac{mv^2}{2}\\]"
      },
      {
        "rubrik": "Kvadrera farten",
        "text": "Kvadrera 3,0 innan du multiplicerar med massan.",
        "matte": "\\[E_k=\\frac{2{,}0\\cdot3{,}0^2}{2}=9{,}0\\ \\mathrm J\\]"
      }
    ],
    "svar": "Rörelseenergin är \\(9{,}0\\ \\mathrm J\\).",
    "komihag": "Dubbel fart ger fyra gånger så stor rörelseenergi vid oförändrad massa.",
    "traningsfamilj": "Arbete och mekanisk energi"
  },
  "fy1-grund-5-04": {
    "kap": 5,
    "omr": "arbete",
    "rubrik": "Energiprincipen",
    "niva": "E",
    "t": "<p>En boll släpps från vila. Från början har den lägesenergin 20 J relativt marken. Under fallet är lägesenergin vid ett tillfälle 8 J. Hur stor är rörelseenergin då? Bortse från luftmotståndet.</p>",
    "ram": "Energi kan överföras och omvandlas mellan olika former. Den totala energin bevaras.",
    "steg": [
      {
        "rubrik": "Bestäm den mekaniska energin från början",
        "text": "Bollen startar från vila och har därför ingen rörelseenergi. Den mekaniska energin är 20 J."
      },
      {
        "rubrik": "Fördela energin mellan lägesenergi och rörelseenergi",
        "text": "Utan luftmotstånd är summan oförändrad.",
        "matte": "\\[E_k=20-8=12\\ \\mathrm J\\]"
      }
    ],
    "svar": "Rörelseenergin är \\(12\\ \\mathrm J\\).",
    "komihag": "Mekanisk energi är lägesenergi plus rörelseenergi. Vid friktion kan mekanisk energi omvandlas till inre energi, men den totala energin bevaras.",
    "traningsfamilj": "Arbete och mekanisk energi"
  },
  "fy1-grund-5-05": {
    "kap": 5,
    "omr": "arbete",
    "rubrik": "Arbete mot friktion",
    "niva": "E",
    "t": "<p>En låda dras 4,0 m rakt fram med konstant fart. Friktionskraften är 15 N. Dragkraften är vågrät. Hur stort arbete utför dragkraften?</p>",
    "ram": "När något glider mot ett underlag omvandlas mekanisk energi till inre energi i föremålet och underlaget.",
    "steg": [
      {
        "rubrik": "Bestäm dragkraften",
        "text": "Konstant hastighet ger kraftsumman noll. Dragkraften måste därför vara lika stor som friktionskraften: 15 N."
      },
      {
        "rubrik": "Beräkna arbetet",
        "text": "Multiplicera dragkraften med sträckan.",
        "matte": "\\[W=15\\cdot4{,}0=60\\ \\mathrm J\\]"
      }
    ],
    "svar": "Dragkraften utför arbetet \\(60\\ \\mathrm J\\).",
    "komihag": "Lådans rörelseenergi ökar inte när farten är konstant. Den tillförda energin blir främst inre energi genom friktionen.",
    "traningsfamilj": "Arbete mot friktion"
  },
  "fy1-grund-5-06": {
    "kap": 5,
    "omr": "effekt",
    "rubrik": "Beräkna effekt",
    "niva": "E",
    "t": "<p>En motor utför arbetet 600 J på 3,0 s. Vilken är motorns genomsnittliga nyttiga effekt?</p>",
    "ram": "Effekt beskriver hur snabbt energi överförs eller arbete utförs. En watt betyder en joule per sekund.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Vi känner arbetet och tiden.",
        "matte": "\\[P=\\frac Wt\\]"
      },
      {
        "rubrik": "Dela arbetet med tiden",
        "text": "600 joule fördelat på tre sekunder ger 200 joule per sekund.",
        "matte": "\\[P=\\frac{600}{3{,}0}=200\\ \\mathrm W\\]"
      }
    ],
    "svar": "Den nyttiga effekten är \\(200\\ \\mathrm W\\).",
    "komihag": "Samma arbete utfört på kortare tid innebär större effekt.",
    "traningsfamilj": "Mekanisk effekt"
  },
  "fy1-grund-5-07": {
    "kap": 5,
    "omr": "effekt",
    "rubrik": "Energi från effekt och tid",
    "niva": "E",
    "t": "<p>En lampa har effekten 20 W och lyser i 2,0 timmar. Hur mycket energi använder den, uttryckt i kWh?</p>",
    "ram": "Om effekten är konstant får du energin genom att multiplicera effekt och tid. Välj enheter som passar ihop.",
    "steg": [
      {
        "rubrik": "Skriv effekten i kilowatt",
        "text": "Tiden är redan i timmar.",
        "matte": "\\[P=20\\ \\mathrm W=0{,}020\\ \\mathrm{kW}\\]"
      },
      {
        "rubrik": "Multiplicera effekt och tid",
        "text": "Kilowatt gånger timmar ger kilowattimmar.",
        "matte": "\\[E=Pt=0{,}020\\cdot2{,}0=0{,}040\\ \\mathrm{kWh}\\]"
      }
    ],
    "svar": "Lampan använder \\(0{,}040\\ \\mathrm{kWh}\\).",
    "komihag": "W · s ger J. kW · h ger kWh. Kilowatt är effekt; kilowattimme är energi.",
    "traningsfamilj": "Energi, effekt och tid"
  },
  "fy1-grund-5-08": {
    "kap": 5,
    "omr": "effekt",
    "rubrik": "Verkningsgrad",
    "niva": "E",
    "t": "<p>En motor får 500 J elektrisk energi och utför 350 J mekaniskt arbete. Vilken är verkningsgraden?</p>",
    "ram": "Verkningsgraden anger hur stor del av den tillförda energin som blir nyttig för det vi vill åstadkomma.",
    "steg": [
      {
        "rubrik": "Identifiera nyttig och tillförd energi",
        "text": "Det nyttiga är arbetet på 350 J. Motorn har fått 500 J totalt."
      },
      {
        "rubrik": "Beräkna andelen",
        "text": "Dela nyttig energi med tillförd energi och skriv svaret i procent.",
        "matte": "\\[\\eta=\\frac{350}{500}=0{,}70=70\\,\\%\\]"
      }
    ],
    "svar": "Verkningsgraden är \\(70\\,\\%\\).",
    "komihag": "Den energi som inte blir nyttigt arbete försvinner inte. Den överförs ofta som värme till omgivningen.",
    "traningsfamilj": "Effekt och verkningsgrad"
  },
  "fy1-grund-5-09": {
    "kap": 5,
    "omr": "rorelsemangd",
    "rubrik": "Rörelsemängd",
    "niva": "E",
    "t": "<p>En vagn med massan 3,0 kg rullar åt höger med hastigheten 2,0 m/s. Bestäm rörelsemängden.</p>",
    "ram": "Rörelsemängd är massa gånger hastighet. Till skillnad från energi har rörelsemängden också en riktning.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Massan anges i kilogram och hastigheten i meter per sekund.",
        "matte": "\\[p=mv\\]"
      },
      {
        "rubrik": "Multiplicera och ange riktningen",
        "text": "Rörelsemängden har samma riktning som hastigheten.",
        "matte": "\\[p=3{,}0\\cdot2{,}0=6{,}0\\ \\mathrm{kg\\,m/s}\\]"
      }
    ],
    "svar": "Rörelsemängden är \\(6{,}0\\ \\mathrm{kg\\,m/s}\\) åt höger.",
    "komihag": "Vid jämförelser längs en rak linje kan du välja höger som positivt och vänster som negativt.",
    "traningsfamilj": "Impuls och rörelsemängd"
  },
  "fy1-grund-5-10": {
    "kap": 5,
    "omr": "rorelsemangd",
    "rubrik": "Impuls",
    "niva": "E",
    "t": "<p>En konstant resulterande kraft på 10 N verkar åt höger på en vagn i 0,20 s. Hur stor impuls får vagnen?</p>",
    "ram": "Impuls beskriver hur en kraft ändrar rörelsemängden under den tid den verkar.",
    "steg": [
      {
        "rubrik": "Välj kraft gånger tid",
        "text": "För en konstant kraft är impulsen produkten av kraften och tidsintervallet.",
        "matte": "\\[I=F\\Delta t\\]"
      },
      {
        "rubrik": "Beräkna impulsen",
        "text": "Enheten är newtonsekund.",
        "matte": "\\[I=10\\cdot0{,}20=2{,}0\\ \\mathrm{Ns}\\]"
      }
    ],
    "svar": "Impulsen är \\(2{,}0\\ \\mathrm{Ns}\\) åt höger. Rörelsemängden ökar med \\(2{,}0\\ \\mathrm{kg\\,m/s}\\) åt höger.",
    "komihag": "\\(I=\\Delta p\\). För samma ändring i rörelsemängd ger längre påverkanstid mindre medelkraft.",
    "traningsfamilj": "Impuls och rörelsemängd"
  },
  "fy1-grund-5-11": {
    "kap": 5,
    "omr": "rorelsemangd",
    "rubrik": "Rörelsemängd vid en kollision",
    "niva": "E",
    "t": "<p>En vagn på 1,0 kg rullar med 4,0 m/s in i en stillastående vagn på 1,0 kg. De fastnar i varandra. Vilken gemensam fart får de? Försumma den yttre impulsen under stöten.</p>",
    "ram": "När den yttre impulsen är försumbar bevaras den totala rörelsemängden hos föremålen som kolliderar.",
    "steg": [
      {
        "rubrik": "Beräkna rörelsemängden före stöten",
        "text": "Den stillastående vagnen har rörelsemängden noll.",
        "matte": "\\[p_{\\text{före}}=1{,}0\\cdot4{,}0=4{,}0\\ \\mathrm{kg\\,m/s}\\]"
      },
      {
        "rubrik": "Fördela samma rörelsemängd på den gemensamma massan",
        "text": "Efter stöten rör sig 2,0 kg tillsammans.",
        "matte": "\\[v=\\frac{4{,}0}{1{,}0+1{,}0}=2{,}0\\ \\mathrm{m/s}\\]"
      }
    ],
    "svar": "Vagnarna får farten \\(2{,}0\\ \\mathrm{m/s}\\) i den första vagnens ursprungliga riktning.",
    "komihag": "När vagnar fastnar i varandra bevaras inte rörelseenergin. En del omvandlas till inre energi och deformation.",
    "traningsfamilj": "Kollisioner och rörelsemängd"
  },
  "fy1-grund-5-12": {
    "kap": 5,
    "omr": "blandat_energi",
    "rubrik": "Energiomvandling och energikvalitet",
    "niva": "E",
    "t": "<p>En fläkt kopplas in i ett rum. Beskriv en energiomvandling i fläkten och förklara varför all elektrisk energi inte blir nyttig rörelse hos luften.</p>",
    "ram": "Samma mängd energi kan vara olika användbar. Elektrisk energi kan lätt driva en motor, medan energi som spridits som värme till ett svalt rum är svårare att omvandla till arbete.",
    "steg": [
      {
        "rubrik": "Följ den nyttiga energin",
        "text": "Elektrisk energi omvandlas via motorn till rörelse hos fläktbladen och luften."
      },
      {
        "rubrik": "Följ resten av energin",
        "text": "Motorn och omgivningen värms, och en del energi överförs som ljud. Energin finns kvar, men allt blir inte den rörelse som fläkten ska ge."
      }
    ],
    "svar": "Elektrisk energi blir bland annat rörelseenergi och inre energi. Den totala energin bevaras, men bara en del blir nyttig luftrörelse.",
    "komihag": "När energi sprids som värme till omgivningen minskar ofta möjligheten att använda den till arbete. Det är en viktig del av begreppet energikvalitet."
  },
  "fy1-grund-5-13": {
    "kap": 5,
    "omr": "blandat_energi",
    "rubrik": "Jämför energiresurser",
    "niva": "E",
    "t": "<p>Nämn en fördel och en begränsning med vindkraft. Förklara kort.</p>",
    "ram": "När energislag jämförs behöver du se både hur elen produceras och vilka konsekvenser produktionen har. Ett användbart argument innehåller en förklaring.",
    "steg": [
      {
        "rubrik": "Beskriv en fördel",
        "text": "Vind är en förnybar energiresurs. Elproduktionen behöver ingen förbränning av bränsle i kraftverket."
      },
      {
        "rubrik": "Beskriv en begränsning",
        "text": "Elproduktionen beror på vinden. För att elförsörjningen ska fungera även när det blåser lite behövs till exempel annan produktion, överföring eller lagring."
      }
    ],
    "svar": "En förnybar energiresurs utan bränsleförbränning i driften, men med väderberoende elproduktion.",
    "komihag": "Skilj mellan energi och effekt: energin summeras över tid, medan elsystemet även behöver tillräcklig effekt när elen efterfrågas."
  },
  "fy1-grund-6-01": {
    "kap": 6,
    "omr": "tryck",
    "rubrik": "Tryck är kraft per area",
    "niva": "E",
    "t": "<p>En kraft på 200 N verkar vinkelrätt mot en yta på 0,010 m². Hur stort är trycket?</p>",
    "ram": "Tryck beskriver hur en kraft fördelas över en yta. Samma kraft ger större tryck om ytan är mindre.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Arean är redan angiven i kvadratmeter.",
        "matte": "\\[p=\\frac FA\\]"
      },
      {
        "rubrik": "Dela kraften med arean",
        "text": "Enheten N/m² kallas pascal, Pa.",
        "matte": "\\[p=\\frac{200}{0{,}010}=20\\,000\\ \\mathrm{Pa}=20\\ \\mathrm{kPa}\\]"
      }
    ],
    "svar": "Trycket är \\(20\\ \\mathrm{kPa}\\).",
    "komihag": "\\(p=F/A\\). Kontrollera att du använder newton och m² när svaret ska bli i pascal.",
    "traningsfamilj": "Tryck, kraft, area och hydraulik"
  },
  "fy1-grund-6-02": {
    "kap": 6,
    "omr": "vatsketryck",
    "rubrik": "Vätsketryck",
    "niva": "E",
    "t": "<p>Hur stort är vätsketrycket 2,0 m under vattenytan? Använd vattnets densitet 1 000 kg/m³ och g = 9,82 N/kg. Räkna inte med lufttrycket.</p>",
    "ram": "Trycket från en stillastående vätska ökar med djupet. Det beror på vätskans densitet och hur långt under ytan punkten ligger.",
    "steg": [
      {
        "rubrik": "Välj sambandet för tryckökningen",
        "text": "Djupet h mäts lodrätt ned från vattenytan.",
        "matte": "\\[p=\\rho gh\\]"
      },
      {
        "rubrik": "Sätt in värdena",
        "text": "Resultatet i pascal kan skrivas om till kilopascal.",
        "matte": "\\[p=1000\\cdot9{,}82\\cdot2{,}0=19\\,640\\ \\mathrm{Pa}\\approx20\\ \\mathrm{kPa}\\]"
      }
    ],
    "svar": "Vätsketrycket är ungefär \\(20\\ \\mathrm{kPa}\\).",
    "komihag": "I samma stillastående vätska är trycket lika stort på samma djup, oavsett kärlets form.",
    "traningsfamilj": "Hydrostatiskt tryck"
  },
  "fy1-grund-6-03": {
    "kap": 6,
    "omr": "vatsketryck",
    "rubrik": "Totalt tryck under vatten",
    "niva": "E",
    "t": "<p>Lufttrycket vid vattenytan är 101 kPa. På ett visst djup är vätsketrycket 30 kPa. Vilket är det totala trycket?</p>",
    "ram": "Under en öppen vattenyta tillkommer vätsketrycket utöver lufttrycket vid ytan.",
    "steg": [
      {
        "rubrik": "Identifiera de två bidragen",
        "text": "Lufttrycket verkar redan vid vattenytan. Vattnet ger ytterligare 30 kPa på det aktuella djupet."
      },
      {
        "rubrik": "Addera trycken",
        "text": "Båda värdena har samma enhet.",
        "matte": "\\[p_{\\text{tot}}=101+30=131\\ \\mathrm{kPa}\\]"
      }
    ],
    "svar": "Det totala trycket är \\(131\\ \\mathrm{kPa}\\).",
    "komihag": "Under en öppen vätskeyta gäller \\(p_{\\text{tot}}=p_{\\text{yta}}+\\rho gh\\).",
    "traningsfamilj": "Lufttryck och tryckskillnader"
  },
  "fy1-grund-6-04": {
    "kap": 6,
    "omr": "gaslagen",
    "rubrik": "Temperatur i kelvin",
    "niva": "E",
    "t": "<p>Omvandla 20 °C till kelvin.</p>",
    "ram": "Kelvin är en absolut temperaturskala. Temperatursteg på 1 K och 1 °C är lika stora, men skalornas nollpunkter skiljer sig.",
    "steg": [
      {
        "rubrik": "Lägg till 273,15",
        "text": "Noll grader Celsius motsvarar 273,15 kelvin.",
        "matte": "\\[T=20+273{,}15=293{,}15\\ \\mathrm K\\]"
      },
      {
        "rubrik": "Ange rimlig noggrannhet",
        "text": "Här räcker det att ange temperaturen som ungefär 293 K."
      }
    ],
    "svar": "\\(20\\,{}^\\circ\\mathrm C\\approx293\\ \\mathrm K\\).",
    "komihag": "Använd kelvin i gaslagarna. Skriv K utan gradtecken.",
    "traningsfamilj": "Kelvinskalan"
  },
  "fy1-grund-6-05": {
    "kap": 6,
    "omr": "gaslagen",
    "rubrik": "Tryck och volym hos en gas",
    "niva": "E",
    "t": "<p>En stängd spruta innehåller 60 ml luft vid 100 kPa. Luften trycks långsamt ihop till 30 ml utan temperaturändring. Vilket blir trycket? Använd absoluta tryck.</p>",
    "ram": "För en bestämd mängd gas vid konstant temperatur ökar trycket när volymen minskar. Detta beskrivs av Boyles lag.",
    "steg": [
      {
        "rubrik": "Jämför volymerna",
        "text": "Gasmängden är oförändrad och volymen halveras. Då fördubblas trycket."
      },
      {
        "rubrik": "Visa med gaslagen",
        "text": "Samma volymenhet kan användas på båda sidor.",
        "matte": "\\[p_1V_1=p_2V_2\\quad\\Rightarrow\\quad p_2=\\frac{100\\cdot60}{30}=200\\ \\mathrm{kPa}\\]"
      }
    ],
    "svar": "Trycket blir \\(200\\ \\mathrm{kPa}\\).",
    "komihag": "Boyles lag gäller när temperatur och gasmängd är oförändrade.",
    "traningsfamilj": "Boyles lag"
  },
  "fy1-grund-6-06": {
    "kap": 6,
    "omr": "gaslagen",
    "rubrik": "Tryck och temperatur hos en gas",
    "niva": "E",
    "t": "<p>En gas i en stel, sluten behållare har trycket 100 kPa vid 300 K. Temperaturen höjs till 330 K. Vilket blir trycket? Använd absoluta tryck.</p>",
    "ram": "I en stängd behållare med oförändrad volym ökar gasens tryck när temperaturen stiger. Temperaturerna måste jämföras i kelvin.",
    "steg": [
      {
        "rubrik": "Bestäm vad som är oförändrat",
        "text": "Volymen och gasmängden ändras inte. Då är kvoten p/T konstant."
      },
      {
        "rubrik": "Beräkna det nya trycket",
        "text": "Temperaturen ökar med faktorn 330/300, och trycket ökar med samma faktor.",
        "matte": "\\[\\frac{p_1}{T_1}=\\frac{p_2}{T_2}\\quad\\Rightarrow\\quad p_2=100\\cdot\\frac{330}{300}=110\\ \\mathrm{kPa}\\]"
      }
    ],
    "svar": "Trycket blir \\(110\\ \\mathrm{kPa}\\).",
    "komihag": "För en bestämd mängd ideal gas är \\(pV/T\\) konstant. Börja med att se vilka storheter som inte ändras.",
    "traningsfamilj": "Allmänna gaslagen"
  },
  "fy1-grund-6-07": {
    "kap": 6,
    "omr": "arkimedes",
    "rubrik": "Lyftkraft i vatten",
    "niva": "E",
    "t": "<p>Ett föremål är helt nedsänkt i vatten och tränger undan 0,50 kg vatten. Hur stor är lyftkraften? Använd g = 9,82 N/kg.</p>",
    "ram": "Arkimedes princip säger att lyftkraften är lika stor som tyngden av den vätska föremålet tränger undan.",
    "steg": [
      {
        "rubrik": "Utgå från det undanträngda vattnet",
        "text": "Det är vattnets massa som är given. Föremålets egen massa behövs inte för att beräkna lyftkraften."
      },
      {
        "rubrik": "Beräkna vattnets tyngd",
        "text": "Lyftkraften har samma storlek och verkar uppåt.",
        "matte": "\\[F_{\\text{lyft}}=m_{\\text{vatten}}g=0{,}50\\cdot9{,}82=4{,}91\\ \\mathrm N\\]"
      }
    ],
    "svar": "Lyftkraften är ungefär \\(4{,}9\\ \\mathrm N\\) uppåt.",
    "komihag": "\\(F_{\\text{lyft}}=\\rho_{\\text{vätska}}gV_{\\text{undanträngd}}\\). Använd vätskans densitet och den undanträngda volymen.",
    "traningsfamilj": "Arkimedes princip och flytkraft"
  },
  "fy1-grund-6-08": {
    "kap": 6,
    "omr": "arkimedes",
    "rubrik": "Flyta eller sjunka",
    "niva": "E",
    "t": "<p>En träkloss har densiteten 600 kg/m³ och en massiv metallbit har densiteten 2 700 kg/m³. Vad händer om de läggs i vatten med densiteten 1 000 kg/m³? Bortse från ytspänning.</p>",
    "ram": "För en homogen, massiv kropp kan densiteten jämföras med vätskans densitet för att avgöra om kroppen flyter eller sjunker.",
    "steg": [
      {
        "rubrik": "Jämför träklossen med vattnet",
        "text": "Träets densitet är lägre än vattnets. Klossen kan få tillräcklig lyftkraft innan hela klossen är nedsänkt."
      },
      {
        "rubrik": "Jämför metallbiten med vattnet",
        "text": "Metallens densitet är högre än vattnets. Även helt nedsänkt får metallbiten mindre lyftkraft än sin tyngd."
      }
    ],
    "svar": "Träklossen flyter och metallbiten sjunker.",
    "komihag": "Ett föremål som flyter i vila har lika stor lyftkraft som tyngdkraft. För ihåliga föremål behöver du jämföra hela föremålets medeldensitet med vätskans.",
    "traningsfamilj": "Flytkraft, flytvillkor och densitet"
  },
  "fy1-grund-7-01": {
    "kap": 7,
    "omr": "varme",
    "rubrik": "Temperatur, inre energi och värme",
    "niva": "E",
    "t": "<p>En varm metallsked läggs i svalare vatten. Åt vilket håll överförs energi som värme, och vad händer med temperaturerna? Bortse från omgivningen.</p>",
    "ram": "Temperatur och inre energi beskriver olika saker. Värme är energi som överförs på grund av en temperaturskillnad.",
    "steg": [
      {
        "rubrik": "Jämför temperaturerna",
        "text": "Skeden har högre temperatur än vattnet. Energi överförs därför som värme från skeden till vattnet."
      },
      {
        "rubrik": "Följ temperaturändringarna",
        "text": "Skeden svalnar och vattnet värms. Överföringen fortsätter tills de når samma temperatur."
      }
    ],
    "svar": "Energi överförs från skeden till vattnet. Skeden svalnar och vattnet värms.",
    "komihag": "Temperatur säger inte ensam hur stor den inre energin är. Även bland annat mängden ämne och ämnets egenskaper spelar roll."
  },
  "fy1-grund-7-02": {
    "kap": 7,
    "omr": "varme",
    "rubrik": "Energi för att värma ett ämne",
    "niva": "E",
    "t": "<p>Hur mycket energi behövs för att värma 0,50 kg vatten från 20 °C till 30 °C? Vattnets specifika värmekapacitet är 4 180 J/(kg·K). Bortse från kärlet och värmeförluster.</p>",
    "ram": "Den specifika värmekapaciteten anger hur mycket energi som behövs för att värma ett kilogram av ett ämne en grad.",
    "steg": [
      {
        "rubrik": "Beräkna temperaturändringen",
        "text": "Det är ökningen, inte sluttemperaturen, som ska användas.",
        "matte": "\\[\\Delta T=30-20=10\\ \\mathrm K\\]"
      },
      {
        "rubrik": "Använd värmekapaciteten",
        "text": "En temperaturändring på 10 °C är lika stor som en ändring på 10 K.",
        "matte": "\\[Q=mc\\Delta T=0{,}50\\cdot4180\\cdot10=20\\,900\\ \\mathrm J\\approx21\\ \\mathrm{kJ}\\]"
      }
    ],
    "svar": "Det behövs ungefär \\(21\\ \\mathrm{kJ}\\).",
    "komihag": "\\(Q=mc\\Delta T\\) gäller när ämnet värms eller kyls utan fasövergång.",
    "traningsfamilj": "Värmeenergi och specifik värmekapacitet"
  },
  "fy1-grund-7-03": {
    "kap": 7,
    "omr": "fasandring",
    "rubrik": "Smältning",
    "niva": "E",
    "t": "<p>Hur mycket energi behövs för att smälta 0,20 kg is vid 0 °C till vatten vid 0 °C? Isens smältvärme (specifika smältentalpi) är 334 kJ/kg.</p>",
    "ram": "När is vid smältpunkten smälter går den tillförda energin åt till fasövergången. Temperaturen behöver inte öka.",
    "steg": [
      {
        "rubrik": "Välj sambandet för smältning",
        "text": "Isen är redan vid smältpunkten. Vi ska därför bara beräkna energin för själva smältningen.",
        "matte": "\\[Q=l_s m\\]"
      },
      {
        "rubrik": "Multiplicera energi per kilogram med massan",
        "text": "Smältentalpin är given i kJ/kg, så svaret blir i kJ.",
        "matte": "\\[Q=334\\cdot0{,}20=66{,}8\\ \\mathrm{kJ}\\]"
      }
    ],
    "svar": "Det behövs ungefär \\(67\\ \\mathrm{kJ}\\).",
    "komihag": "Smältning och förångning kräver energi. Stelning och kondensation avger energi. Under smältning eller kokning av ett rent ämne vid konstant tryck är temperaturen konstant.",
    "traningsfamilj": "Fasövergångar och latent värme"
  },
  "fy1-grund-7-04": {
    "kap": 7,
    "omr": "fasandring",
    "rubrik": "Förångning",
    "niva": "E",
    "t": "<p>Hur mycket energi behövs för att förånga 0,10 kg vatten vid kokpunkten? Vattnets ångbildningsvärme (specifika ångbildningsentalpi) är 2 260 kJ/kg. Temperaturen ska vara oförändrad.</p>",
    "ram": "Att förånga ett ämne kräver energi även om temperaturen inte ökar. För vatten går det åt betydligt mer energi per kilogram till förångning än till smältning.",
    "steg": [
      {
        "rubrik": "Utgå från fasövergången",
        "text": "Vattnet är redan vid kokpunkten. Ingen uppvärmning fram till kokpunkten ska räknas med."
      },
      {
        "rubrik": "Multiplicera med massan",
        "text": "Ångbildningsentalpin anger energin för att förånga ett kilogram.",
        "matte": "\\[Q=l_{\\text{å}}m=2260\\cdot0{,}10=226\\ \\mathrm{kJ}\\]"
      }
    ],
    "svar": "Det behövs ungefär \\(230\\ \\mathrm{kJ}\\).",
    "komihag": "Använd värmekapacitet vid temperaturändring och smält- eller ångbildningsentalpi vid fasövergång.",
    "traningsfamilj": "Fasövergångar och latent värme"
  },
  "fy1-grund-7-05": {
    "kap": 7,
    "omr": "varme",
    "rubrik": "Värmeledning, strömning och strålning",
    "niva": "E",
    "t": "<p>Vilket sätt att överföra värme illustreras av varje exempel: en metallsked blir varm i soppa, varmt vatten stiger i en kastrull och solen värmer din hand?</p>",
    "ram": "Värme kan överföras genom ledning, genom strömning i en vätska eller gas och genom strålning.",
    "steg": [
      {
        "rubrik": "Skeden och vattnet",
        "text": "I metallen överförs energi genom värmeledning. När varmt vatten rör sig uppåt transporteras energi med vattnet: strömning, eller konvektion."
      },
      {
        "rubrik": "Solen",
        "text": "Energi når handen som elektromagnetisk strålning. Strålning kan färdas även genom vakuum."
      }
    ],
    "svar": "Skeden: ledning. Vattnet: strömning. Solen: strålning.",
    "komihag": "Flera sätt att överföra värme kan förekomma samtidigt. Välj det som det aktuella exemplet visar tydligast."
  },
  "fy1-grund-7-06": {
    "kap": 7,
    "omr": "varme",
    "rubrik": "Värmebalans",
    "niva": "E",
    "t": "<p>Lika stora massor vatten vid 60 °C och 20 °C blandas. Vilken blir sluttemperaturen? Försumma kärlets värmekapacitet och energiutbyte med omgivningen.</p>",
    "ram": "I ett isolerat system är den energi som ett varmt föremål avger lika stor som den energi ett kallt föremål tar upp.",
    "steg": [
      {
        "rubrik": "Jämför vattenmängderna",
        "text": "Vattnet har samma specifika värmekapacitet i båda delarna. Eftersom massorna är lika stora måste det varma vattnet kylas lika många grader som det kalla värms."
      },
      {
        "rubrik": "Hitta temperaturen mitt emellan",
        "text": "60 °C kyls 20 grader och 20 °C värms 20 grader.",
        "matte": "\\[T=\\frac{60+20}{2}=40\\,{}^\\circ\\mathrm C\\]"
      }
    ],
    "svar": "Sluttemperaturen blir \\(40\\,{}^\\circ\\mathrm C\\).",
    "komihag": "Ett vanligt medelvärde fungerar här eftersom det är samma ämne och lika stora massor. I andra fall behöver energin som avges och tas upp jämföras.",
    "traningsfamilj": "Värmebalans och blandning"
  },
  "fy1-grund-8-01": {
    "kap": 8,
    "omr": "laddning",
    "rubrik": "Elektrisk laddning",
    "niva": "E",
    "t": "<p>En plaststav får extra elektroner när den gnids. Vilket tecken får stavens laddning? Vad händer om två sådana negativt laddade stavar förs nära varandra?</p>",
    "ram": "Elektroner är negativt laddade och protoner positivt laddade. Ett neutralt föremål har lika stor positiv som negativ laddning.",
    "steg": [
      {
        "rubrik": "Följ elektronerna",
        "text": "Staven har fått fler negativa laddningar och blir därför negativt laddad."
      },
      {
        "rubrik": "Jämför stavarnas laddningar",
        "text": "Laddningar med samma tecken stöter bort varandra. De två stavarna repellerar varandra."
      }
    ],
    "svar": "Staven blir negativt laddad. Två negativt laddade stavar stöter bort varandra.",
    "komihag": "Lika laddningar repellerar, olika laddningar attraherar. Vid vanlig laddning genom gnidning flyttas elektroner mellan materialen.",
    "traningsfamilj": "Laddning och antal elektroner"
  },
  "fy1-grund-8-02": {
    "kap": 8,
    "omr": "laddning",
    "rubrik": "Antal elektroner och laddning",
    "niva": "E",
    "t": "<p>Ett föremål har fått ett överskott på 1,0 · 10¹⁰ elektroner. Vilken laddning har det? Använd e = 1,60 · 10⁻¹⁹ C.</p>",
    "ram": "Varje elektron har laddningen −e, där e är elementarladdningen. Laddningens belopp kan därför kopplas till antalet extra eller saknade elektroner.",
    "steg": [
      {
        "rubrik": "Bestäm laddningens tecken",
        "text": "Ett överskott av elektroner ger negativ laddning."
      },
      {
        "rubrik": "Multiplicera antalet med en elektrons laddning",
        "text": "Multiplicera tiopotenser genom att addera exponenterna.",
        "matte": "\\[Q=-Ne=-(1{,}0\\cdot10^{10})(1{,}60\\cdot10^{-19})=-1{,}6\\cdot10^{-9}\\ \\mathrm C\\]"
      }
    ],
    "svar": "Laddningen är \\(-1{,}6\\ \\mathrm{nC}\\).",
    "komihag": "Laddningens belopp är \\(|Q|=Ne\\). Sök antalet med \\(N=|Q|/e\\).",
    "traningsfamilj": "Laddning och antal elektroner"
  },
  "fy1-grund-8-03": {
    "kap": 8,
    "omr": "laddning",
    "rubrik": "Elektrisk kraft mellan laddningar",
    "niva": "E",
    "t": "<p>Två små kulor har laddningarna +1,0 µC vardera och avståndet 0,30 m mellan sina centrum. Beräkna kraftens storlek och ange om de dras mot eller stöts bort från varandra. Behandla kulorna som punktladdningar och använd k = 8,99 · 10⁹ Nm²/C².</p>",
    "ram": "Coulombs lag beskriver kraften mellan två punktladdningar. Kraftens storlek beror på laddningarna och på avståndet mellan dem.",
    "steg": [
      {
        "rubrik": "Omvandla laddningarna",
        "text": "Mikro betyder 10⁻⁶. Laddningarna har samma tecken, så kraften är frånstötande."
      },
      {
        "rubrik": "Använd Coulombs lag",
        "text": "Kvadrera avståndet i nämnaren.",
        "matte": "\\[F=k\\frac{|Q_1Q_2|}{r^2}=8{,}99\\cdot10^9\\frac{(1{,}0\\cdot10^{-6})^2}{0{,}30^2}\\approx0{,}10\\ \\mathrm N\\]"
      }
    ],
    "svar": "Kraften på varje kula är ungefär \\(0{,}10\\ \\mathrm N\\). Kulorna stöter bort varandra.",
    "komihag": "Båda kulorna påverkas av lika stora, motriktade krafter.",
    "traningsfamilj": "Coulombs lag och elektrisk kraft"
  },
  "fy1-grund-8-04": {
    "kap": 8,
    "omr": "kretsar",
    "rubrik": "Vad är elektrisk ström?",
    "niva": "E",
    "t": "<p>Under 3,0 s passerar laddningen 6,0 C genom en ledare. Hur stor är medelströmmen?</p>",
    "ram": "Ström anger hur stor laddning som passerar ett tvärsnitt av en ledare per sekund. En ampere betyder en coulomb per sekund.",
    "steg": [
      {
        "rubrik": "Välj laddning per tid",
        "text": "Vi känner laddningen och hur lång tid den passerar under.",
        "matte": "\\[I=\\frac{Q}{t}\\]"
      },
      {
        "rubrik": "Dividera",
        "text": "Coulomb delat med sekunder ger ampere.",
        "matte": "\\[I=\\frac{6{,}0}{3{,}0}=2{,}0\\ \\mathrm A\\]"
      }
    ],
    "svar": "Strömmen är \\(2{,}0\\ \\mathrm A\\).",
    "komihag": "Strömriktningen definieras som den riktning positiv laddning skulle röra sig. I en metall rör sig elektronerna åt motsatt håll."
  },
  "fy1-grund-8-05": {
    "kap": 8,
    "omr": "potential",
    "rubrik": "Spänning och energi",
    "niva": "E",
    "t": "<p>Ett batteri ger 12 J energi när laddningen 2,0 C passerar genom det. Vilken är spänningen?</p>",
    "ram": "Spänning beskriver energi per laddning. En volt motsvarar en joule per coulomb.",
    "steg": [
      {
        "rubrik": "Dela energin med laddningen",
        "text": "Vi söker hur mycket energi varje coulomb får.",
        "matte": "\\[U=\\frac{E}{Q}\\]"
      },
      {
        "rubrik": "Beräkna kvoten",
        "text": "Joule per coulomb är volt.",
        "matte": "\\[U=\\frac{12}{2{,}0}=6{,}0\\ \\mathrm V\\]"
      }
    ],
    "svar": "Spänningen är \\(6{,}0\\ \\mathrm V\\).",
    "komihag": "\\(E=QU\\) beskriver energiöverföringens storlek när laddningen Q passerar spänningen U.",
    "traningsfamilj": "Elektrisk potential och spänning"
  },
  "fy1-grund-8-06": {
    "kap": 8,
    "omr": "kretsar",
    "rubrik": "Ohms lag",
    "niva": "E",
    "t": "<p>En resistor på 30 Ω ansluts till 6,0 V. Hur stor blir strömmen?</p>",
    "ram": "Resistans beskriver hur mycket en komponent begränsar strömmen. För en resistor med konstant resistans gäller Ohms lag.",
    "steg": [
      {
        "rubrik": "Skriv sambandet mellan spänning, resistans och ström",
        "text": "Vi söker I och löser därför ut strömmen.",
        "matte": "\\[U=RI\\quad\\Rightarrow\\quad I=\\frac UR\\]"
      },
      {
        "rubrik": "Dela spänningen med resistansen",
        "text": "Spänningen är i volt och resistansen i ohm.",
        "matte": "\\[I=\\frac{6{,}0}{30}=0{,}20\\ \\mathrm A\\]"
      }
    ],
    "svar": "Strömmen blir \\(0{,}20\\ \\mathrm A\\), alltså 200 mA.",
    "komihag": "\\(U=RI\\). Vid samma spänning ger större resistans mindre ström.",
    "traningsfamilj": "Ohms lag"
  },
  "fy1-grund-8-07": {
    "kap": 8,
    "omr": "kopplingar",
    "rubrik": "Resistorer i serie",
    "niva": "E",
    "t": "<p>Resistorerna 10 Ω och 20 Ω är seriekopplade till ett batteri på 6,0 V. Bestäm ersättningsresistansen och strömmen. Bortse från batteriets och ledningarnas resistans.</p><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 200\" width=\"400\" height=\"200\" role=\"img\" aria-label=\"Batteri på 6 volt i serie med resistorer på 10 ohm och 20 ohm.\" style=\"display:block;width:min(100%,400px);height:auto;margin:16px auto;color:inherit\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M75 50 H125 M185 50 H225 M285 50 H345 V160 H75 V114 M75 50 V95\"/><rect x=\"125\" y=\"40\" width=\"60\" height=\"20\"/><rect x=\"225\" y=\"40\" width=\"60\" height=\"20\"/><path d=\"M55 95 H95 M63 114 H87\"/><text x=\"127\" y=\"30\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">10 Ω</text><text x=\"227\" y=\"30\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">20 Ω</text><text x=\"16\" y=\"147\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">6,0 V</text><text x=\"100\" y=\"96\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">+</text></g></svg>",
    "ram": "I en seriekoppling finns bara en väg för strömmen. Samma ström går därför genom båda resistorerna.",
    "steg": [
      {
        "rubrik": "Addera resistanserna",
        "text": "I serie är ersättningsresistansen summan.",
        "matte": "\\[R=10+20=30\\ \\Omega\\]"
      },
      {
        "rubrik": "Använd Ohms lag för hela kretsen",
        "text": "Hela spänningen 6,0 V ligger över den sammanlagda resistansen.",
        "matte": "\\[I=\\frac{6{,}0}{30}=0{,}20\\ \\mathrm A\\]"
      }
    ],
    "svar": "Ersättningsresistansen är \\(30\\ \\Omega\\). Strömmen är \\(0{,}20\\ \\mathrm A\\) genom båda resistorerna.",
    "komihag": "I serie är strömmen lika stor genom komponenterna och spänningarna över dem adderas till batteriets spänning.",
    "traningsfamilj": "Seriekoppling"
  },
  "fy1-grund-8-08": {
    "kap": 8,
    "omr": "kopplingar",
    "rubrik": "Resistorer parallellt",
    "niva": "E",
    "t": "<p>Resistorerna 30 Ω och 60 Ω är parallellkopplade till ett batteri på 6,0 V. Bestäm strömmen i varje gren och den totala strömmen. Bortse från batteriets och ledningarnas resistans.</p><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 420 215\" width=\"420\" height=\"215\" role=\"img\" aria-label=\"Batteri på 6 volt anslutet till två parallella grenar med 30 respektive 60 ohm.\" style=\"display:block;width:min(100%,420px);height:auto;margin:16px auto;color:inherit\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M70 45 H320 V80 M70 45 V93 M70 111 V185 H320 V125 M190 45 V80 M190 125 V185\"/><rect x=\"181\" y=\"80\" width=\"18\" height=\"45\"/><rect x=\"311\" y=\"80\" width=\"18\" height=\"45\"/><path d=\"M50 93 H90 M58 111 H82\"/><text x=\"18\" y=\"149\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">6,0 V</text><text x=\"95\" y=\"92\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">+</text><text x=\"211\" y=\"108\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">30 Ω</text><text x=\"336\" y=\"108\" fill=\"currentColor\" stroke=\"none\" font-size=\"15\" font-family=\"sans-serif\">60 Ω</text></g></svg>",
    "ram": "Parallellkopplade resistorer är anslutna mellan samma två punkter. De har därför samma spänning över sig.",
    "steg": [
      {
        "rubrik": "Använd samma spänning i båda grenarna",
        "text": "Varje resistor har 6,0 V över sig.",
        "matte": "\\[I_1=\\frac{6{,}0}{30}=0{,}20\\ \\mathrm A,\\qquad I_2=\\frac{6{,}0}{60}=0{,}10\\ \\mathrm A\\]"
      },
      {
        "rubrik": "Addera grenströmmarna",
        "text": "Batteriet levererar laddning till båda grenarna.",
        "matte": "\\[I_{\\text{tot}}=0{,}20+0{,}10=0{,}30\\ \\mathrm A\\]"
      }
    ],
    "svar": "Strömmarna är \\(0{,}20\\ \\mathrm A\\) och \\(0{,}10\\ \\mathrm A\\). Totalströmmen är \\(0{,}30\\ \\mathrm A\\).",
    "komihag": "I parallellkoppling är spänningen densamma över grenarna. Strömmarna i grenarna adderas.",
    "traningsfamilj": "Parallellkoppling"
  },
  "fy1-grund-8-09": {
    "kap": 8,
    "omr": "kopplingar",
    "rubrik": "Ersättningsresistans parallellt",
    "niva": "E",
    "t": "<p>Två resistorer på 60 Ω vardera är parallellkopplade. Bestäm ersättningsresistansen.</p>",
    "ram": "En parallellkoppling ger fler vägar för strömmen. Vid samma spänning kan därför mer ström gå än genom en ensam resistor.",
    "steg": [
      {
        "rubrik": "Utnyttja att resistorerna är lika",
        "text": "Två lika stora grenar leder tillsammans dubbelt så stor ström som en ensam gren. Den sammanlagda resistansen blir därför hälften."
      },
      {
        "rubrik": "Kontrollera med formeln",
        "text": "Invertera summan för att få själva resistansen.",
        "matte": "\\[\\frac1R=\\frac1{60}+\\frac1{60}=\\frac1{30}\\quad\\Rightarrow\\quad R=30\\ \\Omega\\]"
      }
    ],
    "svar": "Ersättningsresistansen är \\(30\\ \\Omega\\).",
    "komihag": "Vid parallellkoppling är ersättningsresistansen mindre än resistansen i den minsta enskilda grenen.",
    "traningsfamilj": "Parallellkoppling"
  },
  "fy1-grund-8-10": {
    "kap": 8,
    "omr": "kretsar",
    "rubrik": "Elektrisk effekt",
    "niva": "E",
    "t": "<p>En lampa är ansluten till 12 V och strömmen genom den är 0,50 A. Vilken effekt har lampan?</p>",
    "ram": "En elektrisk komponent överför energi med effekten spänning gånger ström.",
    "steg": [
      {
        "rubrik": "Välj sambandet",
        "text": "Både spänning och ström är givna.",
        "matte": "\\[P=UI\\]"
      },
      {
        "rubrik": "Multiplicera",
        "text": "Volt gånger ampere ger watt.",
        "matte": "\\[P=12\\cdot0{,}50=6{,}0\\ \\mathrm W\\]"
      }
    ],
    "svar": "Lampans effekt är \\(6{,}0\\ \\mathrm W\\).",
    "komihag": "Effekten talar om hur mycket energi som överförs varje sekund. 6 W betyder 6 J varje sekund.",
    "traningsfamilj": "Elektrisk effekt och energi"
  },
  "fy1-grund-8-11": {
    "kap": 8,
    "omr": "falt",
    "rubrik": "Elektriskt fält mellan plattor",
    "niva": "E",
    "t": "<p>Spänningen mellan två parallella plattor är 100 V och avståndet är 0,020 m. Bestäm fältstyrkan mellan plattorna. Bortse från kanteffekter.</p>",
    "ram": "Mellan två stora parallella, motsatt laddade plattor är fältet ungefär homogent långt från kanterna. Det betyder att fältstyrka och riktning är ungefär lika överallt där.",
    "steg": [
      {
        "rubrik": "Välj sambandet för ett homogent fält",
        "text": "Spänningen fördelas över avståndet mellan plattorna.",
        "matte": "\\[E=\\frac Ud\\]"
      },
      {
        "rubrik": "Dividera med avståndet i meter",
        "text": "Fältstyrkan anges i V/m, som är samma enhet som N/C.",
        "matte": "\\[E=\\frac{100}{0{,}020}=5000\\ \\mathrm{V/m}\\]"
      }
    ],
    "svar": "Fältstyrkan är \\(5\\,000\\ \\mathrm{V/m}\\).",
    "komihag": "Fältet är riktat från den positiva plattan mot den negativa.",
    "traningsfamilj": "Elektriskt fält och kraft på laddningar"
  },
  "fy1-grund-8-12": {
    "kap": 8,
    "omr": "falt",
    "rubrik": "Kraft på en laddning i ett fält",
    "niva": "E",
    "t": "<p>En positiv laddning på 2,0 µC befinner sig i ett elektriskt fält på 500 N/C åt höger. Vilken kraft verkar på laddningen?</p>",
    "ram": "Elektrisk fältstyrka anger kraft per positiv laddning. En negativ laddning påverkas i motsatt riktning mot fältet.",
    "steg": [
      {
        "rubrik": "Omvandla laddningen",
        "text": "2,0 µC är 2,0 · 10⁻⁶ C. Laddningen är positiv, så kraften pekar åt höger."
      },
      {
        "rubrik": "Multiplicera laddning och fältstyrka",
        "text": "Coulomb och N/C ger newton.",
        "matte": "\\[F=qE=2{,}0\\cdot10^{-6}\\cdot500=1{,}0\\cdot10^{-3}\\ \\mathrm N\\]"
      }
    ],
    "svar": "Kraften är \\(1{,}0\\ \\mathrm{mN}\\) åt höger.",
    "komihag": "En positiv laddning påverkas med en kraft i fältets riktning. För en negativ laddning är riktningen motsatt.",
    "traningsfamilj": "Elektriskt fält och kraft på laddningar"
  },
  "fy1-grund-9-01": {
    "kap": 9,
    "omr": "nuklider",
    "rubrik": "Protoner, neutroner och isotoper",
    "niva": "E",
    "t": "<p>Hur många protoner och neutroner finns i kol-14, som skrivs \\(^{14}_{6}\\mathrm C\\)? Vad har kol-12 och kol-14 gemensamt?</p>",
    "ram": "Atomnumret Z är antalet protoner. Masstalet A är antalet protoner och neutroner tillsammans.",
    "steg": [
      {
        "rubrik": "Läs av protonantalet",
        "text": "Det undre talet är 6. Kärnan innehåller alltså sex protoner."
      },
      {
        "rubrik": "Beräkna neutronantalet",
        "text": "Det övre talet är det totala antalet kärnpartiklar.",
        "matte": "\\[N=A-Z=14-6=8\\]"
      },
      {
        "rubrik": "Jämför isotoperna",
        "text": "Båda är kol och har därför sex protoner. Kol-12 har sex neutroner och kol-14 har åtta."
      }
    ],
    "svar": "Kol-14 har 6 protoner och 8 neutroner. Kol-12 och kol-14 har samma protonantal men olika neutronantal.",
    "komihag": "Isotoper är varianter av samma grundämne med olika antal neutroner.",
    "traningsfamilj": "Nuklider och isotoper"
  },
  "fy1-grund-9-02": {
    "kap": 9,
    "omr": "stralning",
    "rubrik": "Alfa-, beta- och gammastrålning",
    "niva": "E",
    "t": "<p>Vad består alfa-, beta-minus- och gammastrålning av?</p>",
    "ram": "Radioaktiva kärnor kan avge olika slags strålning. Vilken strålning som avges beror på kärnan och sönderfallet.",
    "steg": [
      {
        "rubrik": "Skilj de två partikelstrålningarna åt",
        "text": "En alfapartikel är en heliumkärna med två protoner och två neutroner. Vid beta-minus-sönderfall bildas och avges en elektron när en neutron omvandlas till en proton. Även en antineutrino avges."
      },
      {
        "rubrik": "Beskriv gammastrålningen",
        "text": "Gammastrålning består av fotoner, alltså elektromagnetisk strålning. När en kärna avger en gammafoton ändras dess energi, men inte proton- eller neutronantalet."
      }
    ],
    "svar": "Alfa: heliumkärnor. Beta-minus: elektroner. Gamma: fotoner.",
    "komihag": "Betaelektronen bildas vid sönderfallet i kärnan. Den kommer inte från atomens elektronskal."
  },
  "fy1-grund-9-03": {
    "kap": 9,
    "omr": "karnreaktioner",
    "rubrik": "Skriv ett alfasönderfall",
    "niva": "E",
    "t": "<p>Radium-226 har atomnumret 88 och sönderfaller med alfasönderfall. Skriv sönderfallsformeln. Grundämnet med atomnummer 86 är radon, Rn.</p>",
    "ram": "Vid alfasönderfall lämnar två protoner och två neutroner kärnan. Masstalet minskar med fyra och atomnumret med två.",
    "steg": [
      {
        "rubrik": "Bestäm dotterkärnan",
        "text": "Masstalet blir 226 − 4 = 222. Atomnumret blir 88 − 2 = 86, alltså radon."
      },
      {
        "rubrik": "Skriv och kontrollera formeln",
        "text": "Masstalen och laddningstalen ska ha samma summa på båda sidor.",
        "matte": "\\[{}^{226}_{88}\\mathrm{Ra}\\rightarrow{}^{222}_{86}\\mathrm{Rn}+{}^{4}_{2}\\mathrm{He}\\]"
      }
    ],
    "svar": "\\({}^{226}_{88}\\mathrm{Ra}\\rightarrow{}^{222}_{86}\\mathrm{Rn}+{}^{4}_{2}\\mathrm{He}\\).",
    "komihag": "Vid alfasönderfall minskar A med 4 och Z med 2.",
    "traningsfamilj": "Kärnreaktioner, massa och energi"
  },
  "fy1-grund-9-04": {
    "kap": 9,
    "omr": "karnreaktioner",
    "rubrik": "Skriv ett beta-minus-sönderfall",
    "niva": "E",
    "t": "<p>Kol-14, med atomnummer 6, sönderfaller med beta-minus-sönderfall. Vilken kärna bildas? Grundämnet med atomnummer 7 är kväve, N.</p>",
    "ram": "Vid beta-minus-sönderfall omvandlas en neutron i kärnan till en proton. Antalet kärnpartiklar ändras inte.",
    "steg": [
      {
        "rubrik": "Bestäm masstal och atomnummer",
        "text": "En neutron ersätts av en proton. Masstalet är fortfarande 14 och atomnumret ökar till 7."
      },
      {
        "rubrik": "Skriv sönderfallet",
        "text": "En elektron och en antineutrino avges. Antineutrinon skrivs här för att visa hela sönderfallet.",
        "matte": "\\[{}^{14}_{6}\\mathrm C\\rightarrow{}^{14}_{7}\\mathrm N+{}^{0}_{-1}\\mathrm e+\\bar\\nu_e\\]"
      }
    ],
    "svar": "Kväve-14, \\({}^{14}_{7}\\mathrm N\\), bildas.",
    "komihag": "Vid beta-minus-sönderfall är A oförändrat och Z ökar med 1.",
    "traningsfamilj": "Kärnreaktioner, massa och energi"
  },
  "fy1-grund-9-05": {
    "kap": 9,
    "omr": "aktivitet",
    "rubrik": "Aktivitet och halveringstid",
    "niva": "E",
    "t": "<p>Ett preparat har aktiviteten 800 Bq och halveringstiden 2,0 timmar. Vilken aktivitet har samma preparat efter 6,0 timmar? Ingen ny radioaktiv substans tillförs.</p>",
    "ram": "Aktivitet är antalet sönderfall per sekund och mäts i becquerel, Bq. För en given radionuklid halveras aktiviteten under varje halveringstid.",
    "steg": [
      {
        "rubrik": "Räkna halveringstider",
        "text": "Sex timmar innehåller tre halveringstider.",
        "matte": "\\[n=\\frac{6{,}0}{2{,}0}=3\\]"
      },
      {
        "rubrik": "Halvera tre gånger",
        "text": "Halvera det kvarvarande värdet varje gång, inte ursprungsvärdet.",
        "matte": "\\[800\\rightarrow400\\rightarrow200\\rightarrow100\\ \\mathrm{Bq}\\]"
      }
    ],
    "svar": "Aktiviteten är \\(100\\ \\mathrm{Bq}\\) efter 6,0 timmar.",
    "komihag": "1 Bq betyder i genomsnitt ett sönderfall per sekund. Aktivitet är inte samma sak som stråldos.",
    "traningsfamilj": "Radioaktivt sönderfall, aktivitet och halveringstid"
  },
  "fy1-grund-9-06": {
    "kap": 9,
    "omr": "stralning",
    "rubrik": "Absorberad dos",
    "niva": "E",
    "t": "<p>Ett prov med massan 2,0 kg absorberar 0,0040 J strålningsenergi. Bestäm den absorberade dosen.</p>",
    "ram": "Absorberad dos anger hur mycket strålningsenergi som tas upp per kilogram av det bestrålade materialet.",
    "steg": [
      {
        "rubrik": "Välj energi per massa",
        "text": "Använd massan hos det material som har absorberat energin.",
        "matte": "\\[D=\\frac Em\\]"
      },
      {
        "rubrik": "Dividera och ange enheten",
        "text": "En joule per kilogram är en gray, Gy.",
        "matte": "\\[D=\\frac{0{,}0040}{2{,}0}=0{,}0020\\ \\mathrm{Gy}=2{,}0\\ \\mathrm{mGy}\\]"
      }
    ],
    "svar": "Den absorberade dosen är \\(2{,}0\\ \\mathrm{mGy}\\).",
    "komihag": "Absorberad dos mäts i Gy. Den beskriver energi per massa, inte antalet sönderfall per sekund.",
    "traningsfamilj": "Absorberad och ekvivalent dos"
  },
  "fy1-grund-9-07": {
    "kap": 9,
    "omr": "stralning",
    "rubrik": "Ekvivalent dos",
    "niva": "E",
    "t": "<p>En vävnad får den absorberade dosen 0,10 mGy från ett strålslag med viktfaktorn 20. Bestäm den ekvivalenta dosen.</p>",
    "ram": "Ekvivalent dos tar hänsyn till strålslaget genom en strålningsviktfaktor. Den anges i sievert, Sv.",
    "steg": [
      {
        "rubrik": "Ta med strålningsviktfaktorn",
        "text": "Multiplicera den absorberade dosen med den givna faktorn.",
        "matte": "\\[H=w_R D\\]"
      },
      {
        "rubrik": "Beräkna den ekvivalenta dosen",
        "text": "Faktorn saknar enhet. Dosmåttet byts från absorberad till ekvivalent dos.",
        "matte": "\\[H=20\\cdot0{,}10=2{,}0\\ \\mathrm{mSv}\\]"
      }
    ],
    "svar": "Den ekvivalenta dosen är \\(2{,}0\\ \\mathrm{mSv}\\).",
    "komihag": "Gy och Sv betecknar olika dosmått. Använd strålslagets viktfaktor när ekvivalent dos ska beräknas.",
    "traningsfamilj": "Absorberad och ekvivalent dos"
  },
  "fy1-grund-9-08": {
    "kap": 9,
    "omr": "karnreaktioner",
    "rubrik": "Fission och fusion",
    "niva": "E",
    "t": "<p>Vad är skillnaden mellan fission och fusion? Ge ett exempel på var vardera processen förekommer.</p>",
    "ram": "Kärnreaktioner kan frigöra energi när slutprodukternas sammanlagda massa är mindre än utgångsämnenas.",
    "steg": [
      {
        "rubrik": "Beskriv fission",
        "text": "Vid fission klyvs en tung atomkärna till lättare kärnor. I ett kärnkraftverk kan neutroner som frigörs orsaka fler klyvningar i en kontrollerad kedjereaktion."
      },
      {
        "rubrik": "Beskriv fusion",
        "text": "Vid fusion slås lätta kärnor samman till tyngre. I solen frigörs energi genom reaktioner där vätekärnor i flera steg bildar helium."
      }
    ],
    "svar": "Fission är kärnklyvning, till exempel i kärnkraftverk. Fusion är sammanslagning av lätta kärnor, till exempel i solen.",
    "komihag": "I båda fallen kan frigjord energi kopplas till minskad sammanlagd vilomassa.",
    "traningsfamilj": "Fission och energiutvinning"
  },
  "fy1-grund-9-09": {
    "kap": 9,
    "omr": "nuklider",
    "rubrik": "Massa och energi",
    "niva": "E",
    "t": "<p>Vid en kärnreaktion är slutprodukternas sammanlagda massa 2,0 · 10⁻²⁹ kg mindre än utgångsämnenas. Hur mycket energi frigörs? Använd c = 3,0 · 10⁸ m/s.</p>",
    "ram": "En minskning av den sammanlagda massan vid en kärnreaktion motsvarar frigjord energi. Sambandet är E = Δmc².",
    "steg": [
      {
        "rubrik": "Kvadrera ljushastigheten",
        "text": "Kvadrera både talet 3,0 och tiopotensen.",
        "matte": "\\[c^2=(3{,}0\\cdot10^8)^2=9{,}0\\cdot10^{16}\\ \\mathrm{m^2/s^2}\\]"
      },
      {
        "rubrik": "Multiplicera med masskillnaden",
        "text": "Masskillnaden är redan angiven i kilogram.",
        "matte": "\\[E=\\Delta mc^2=2{,}0\\cdot10^{-29}\\cdot9{,}0\\cdot10^{16}=1{,}8\\cdot10^{-12}\\ \\mathrm J\\]"
      }
    ],
    "svar": "Det frigörs \\(1{,}8\\cdot10^{-12}\\ \\mathrm J\\).",
    "komihag": "Bindningsenergi är den energi som krävs för att dela en kärna i fria protoner och neutroner. En bunden kärnas massa är mindre än de fria kärnpartiklarnas sammanlagda massa.",
    "traningsfamilj": "Nuklider, isotoper och bindningsenergi"
  },
  "fy1-grund-9-10": {
    "kap": 9,
    "omr": "stralning",
    "rubrik": "Joniserande strålning",
    "niva": "E",
    "t": "<p>Vad menas med att strålning är joniserande? Varför kan den vara användbar inom medicin men ändå kräva skydd?</p>",
    "ram": "Joniserande strålning kan slå loss elektroner ur atomer eller molekyler. Det kan förändra ämnen och skada levande celler.",
    "steg": [
      {
        "rubrik": "Beskriv jonisationen",
        "text": "När en elektron lossnar blir atomen eller molekylen en jon. Strålningen har överfört tillräckligt mycket energi för att detta ska ske."
      },
      {
        "rubrik": "Koppla effekten till en tillämpning",
        "text": "Vid strålbehandling utnyttjas joniserande strålning för att skada tumörceller. Även frisk vävnad kan påverkas, så bestrålningen behöver planeras och begränsas."
      }
    ],
    "svar": "Joniserande strålning kan slå loss elektroner. Den kan användas för att behandla tumörer men kan också skada frisk vävnad.",
    "komihag": "Strålslag, absorberad energi, bestrålad vävnad och exponering spelar roll. Enbart källans aktivitet räcker inte för att avgöra påverkan."
  },
  "fy1-grund-9-11": {
    "kap": 9,
    "omr": "nuklider",
    "rubrik": "Elementarpartiklar och protonens laddning",
    "niva": "E",
    "t": "<p>En proton består av två uppkvarkar och en nedkvark. Visa att laddningen blir +1e.</p>",
    "ram": "Kvarkar och leptoner betraktas som elementarpartiklar. Protoner och neutroner är däremot uppbyggda av kvarkar.",
    "steg": [
      {"rubrik":"Skriv kvarkarnas laddningar","text":"En uppkvark har laddningen +2e/3 och en nedkvark −e/3.","matte":"\\[u+u+d=\\frac23e+\\frac23e-\\frac13e\\]"},
      {"rubrik":"Addera","text":"Skriv alla termer med samma nämnare.","matte":"\\[\\frac23e+\\frac23e-\\frac13e=\\frac33e=+e\\]"}
    ],
    "svar": "Protonens tre kvarkar ger tillsammans laddningen \\(+e\\).",
    "komihag": "Elektronen är elementär, men protonen är sammansatt av tre kvarkar.",
    "traningsfamilj": "Standardmodellen och elementarpartiklar"
  },
  "fy1-grund-9-12": {
    "kap": 9,
    "omr": "stralning",
    "rubrik": "Elektromagnetiska spektrumet",
    "niva": "E",
    "t": "<p>En radiovåg har frekvensen 100 MHz. Bestäm våglängden.</p>",
    "ram": "Alla elektromagnetiska vågor rör sig med ljushastigheten i vakuum. Högre frekvens betyder kortare våglängd.",
    "steg": [
      {"rubrik":"Omvandla frekvensen","text":"Mega betyder en miljon.","matte":"\\[100\\ \\mathrm{MHz}=1{,}00\\cdot10^8\\ \\mathrm{Hz}\\]"},
      {"rubrik":"Använd vågekvationen","text":"Lös ut våglängden ur c = fλ.","matte":"\\[\\lambda=\\frac cf=\\frac{3{,}0\\cdot10^8}{1{,}00\\cdot10^8}=3{,}0\\ \\mathrm m\\]"}
    ],
    "svar": "Våglängden är \\(3{,}0\\ \\mathrm m\\).",
    "komihag": "Från låg till hög frekvens: radio, mikrovågor, infrarött, synligt ljus, ultraviolett, röntgen och gamma.",
    "traningsfamilj": "Elektromagnetiska spektrumet"
  },
  "fy1-grund-5-energi": {
    "kap": 5,
    "omr": "arbete",
    "rubrik": "Verkningsgrad och energiresurser",
    "niva": "E",
    "t": "<p>Ett kraftverk tar emot 250 MJ energi och levererar 225 MJ elektrisk energi. Bestäm verkningsgraden.</p>",
    "ram": "Verkningsgraden är den andel av den tillförda energin som blir den önskade energiformen.",
    "steg": [
      {"rubrik":"Välj rätt energier","text":"Elektrisk energi är den nyttiga energin i uppgiften.","matte":"\\[\\eta=\\frac{E_{nyttig}}{E_{tillförd}}\\]"},
      {"rubrik":"Beräkna andelen","text":"Gör om decimaltalet till procent.","matte":"\\[\\eta=\\frac{225}{250}=0{,}90=90\\,\\%\\]"}
    ],
    "svar": "Verkningsgraden är \\(90\\,\\%\\).",
    "komihag": "När energisystem jämförs behövs mer än märkeffekt: även energimängd, reglerbarhet, miljöpåverkan och hela livscykeln spelar roll.",
    "traningsfamilj": "Energiresurser och hållbarhet"
  },
  "fy1-grund-9-kallkritik": {
    "kap": 9,
    "omr": "stralning",
    "rubrik": "Granska ett fysikaliskt påstående",
    "niva": "E",
    "t": "<p>Två saker ökar samtidigt. Räcker det för att säga att den ena orsakar den andra?</p>",
    "ram": "En samtidig förändring är en korrelation. Ett orsakssamband kräver mer underlag.",
    "steg": [
      {"rubrik":"Beskriv vad datan visar","text":"Säg först bara att storheterna samvarierar. Lägg inte till en orsak som mätningen inte visar."},
      {"rubrik":"Pröva andra förklaringar","text":"Fråga om en tredje faktor kan påverka båda och om resultatet återkommer i kontrollerade undersökningar."}
    ],
    "svar": "Nej. Korrelation kan vara en ledtråd, men visar inte ensam vad som orsakar vad.",
    "komihag": "Ett bra påstående anger mätstorhet, metod, osäkerhet och vilket slutsatsstöd resultaten faktiskt ger.",
    "traningsfamilj": "Granska fysikaliska påståenden"
  }
};
