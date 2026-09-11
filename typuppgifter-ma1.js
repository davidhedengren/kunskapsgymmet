/* Grundgenomgångar för Matematik 1 i Kunskapsgymmet.
 * kap och omr anger placering; omr kan vara en sträng eller en lista med kompatibla områdes-ID:n.
 * Objektens ordning anger läsordning. kurs anger vilka spår (1a, 1b, 1c) genomgången visas för.
 * Appen visar en genomgång bara när det finns ett motsvarande områdeskort i den valda kursvarianten.
 * t och steg hör ihop och redigeras tillsammans. Ett steg kan ha figur (SVG).
 * traningsfamilj är valfri och använder bankens oförändrade familjenamn.
 * Saknas familj leder träningsknappen till området.
 * Kapitel 6 (digitala verktyg, problemlösning och modellering) används inte som eget träningskapitel här.
 */
window.TYPUPPGIFTER_MA1 = {
  "ma1-grund-0-01": {
    "kap": 0,
    "omr": "decimaltal_positionssystem",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Förstå decimalernas värde",
    "niva": "E",
    "t": "<p>Vilket värde har siffran 7 i talet 3,074?</p>",
    "ram": "En siffras plats avgör dess värde. Direkt efter decimaltecknet kommer tiondelar, sedan hundradelar och tusendelar.",
    "steg": [
      {
        "rubrik": "Hitta siffrans plats",
        "text": "Efter decimaltecknet står 0 på tiondelsplatsen, 7 på hundradelsplatsen och 4 på tusendelsplatsen."
      },
      {
        "rubrik": "Skriv värdet",
        "text": "Sju hundradelar skrivs 0,07.",
        "matte": "\\[3{,}074=3+0{,}07+0{,}004\\]"
      }
    ],
    "svar": "Siffran 7 har värdet \\(0{,}07\\).",
    "komihag": "Skilj mellan siffran och det värde den har på sin plats.",
    "traningsfamilj": "Positionsvärde i decimaltal"
  },
  "ma1-grund-0-02": {
    "kap": 0,
    "omr": "decimaltal_positionssystem",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Jämföra decimaltal",
    "niva": "E",
    "t": "<p>Vilket tal är störst: 0,8 eller 0,75?</p>",
    "ram": "Jämför talen från vänster. Du kan lägga till nollor sist i decimaldelen utan att ändra talets värde.",
    "steg": [
      {
        "rubrik": "Skriv lika många decimaler",
        "text": "0,8 kan skrivas som 0,80."
      },
      {
        "rubrik": "Jämför hundradelarna",
        "text": "80 hundradelar är mer än 75 hundradelar.",
        "matte": "\\[0{,}80>0{,}75\\]"
      }
    ],
    "svar": "\\(0{,}8\\) är störst.",
    "komihag": "Fler decimaler betyder inte att ett tal är större.",
    "traningsfamilj": "Jämföra och ordna decimaltal"
  },
  "ma1-grund-0-03": {
    "kap": 0,
    "omr": "decimaltal_positionssystem",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Läsa av en tallinje",
    "niva": "E",
    "t": "<p>Vilket tal visar punkt A?</p><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"400\" height=\"120\" viewBox=\"0 0 400 120\" role=\"img\" aria-label=\"Tallinje från 0 till 1 delad i tio lika delar. Punkt A ligger på det sjunde skalstrecket efter 0.\" style=\"display:block;width:min(100%,400px);height:auto;margin:16px auto\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M35 65 L365 65 M357.80 68.48 L365 65 L357.80 61.52\"/><path d=\"M45 59 V71\"/><path d=\"M75 59 V71\"/><path d=\"M105 59 V71\"/><path d=\"M135 59 V71\"/><path d=\"M165 59 V71\"/><path d=\"M195 59 V71\"/><path d=\"M225 59 V71\"/><path d=\"M255 59 V71\"/><path d=\"M285 59 V71\"/><path d=\"M315 59 V71\"/><path d=\"M345 59 V71\"/><text x=\"45\" y=\"95\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"currentColor\" stroke=\"none\">0</text><text x=\"345\" y=\"95\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"currentColor\" stroke=\"none\">1</text><circle cx=\"255\" cy=\"65\" r=\"4\" fill=\"#22a899\"/><text x=\"255\" y=\"43\" text-anchor=\"middle\" font-family=\"sans-serif\" font-size=\"14\" fill=\"currentColor\" stroke=\"none\">A</text></g></svg>",
    "ram": "Se först vilket intervall tallinjen visar och hur många lika stora steg det är indelat i.",
    "steg": [
      {
        "rubrik": "Bestäm ett stegs storlek",
        "text": "Från 0 till 1 finns tio lika stora steg. Varje steg är därför 0,1."
      },
      {
        "rubrik": "Räkna fram till punkten",
        "text": "A ligger sju steg till höger om 0.",
        "matte": "\\[7\\cdot0{,}1=0{,}7\\]"
      }
    ],
    "svar": "Punkt A visar \\(0{,}7\\).",
    "komihag": "Räkna mellanrummen mellan skalstrecken, inte antalet streck.",
    "traningsfamilj": "Avläsa och placera decimaltal på tallinjen"
  },
  "ma1-grund-0-04": {
    "kap": 0,
    "omr": "negativa_tal",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Addera och subtrahera negativa tal",
    "niva": "E",
    "t": "<p>Beräkna −3 + 7 och 5 − (−2).</p>",
    "ram": "På en tallinje ligger de negativa talen till vänster om noll. Att addera ett positivt tal flyttar dig åt höger.",
    "steg": [
      {
        "rubrik": "Börja vid −3",
        "text": "Sju steg åt höger tar dig först till noll och sedan fyra steg vidare.",
        "matte": "\\[-3+7=4\\]"
      },
      {
        "rubrik": "Subtrahera ett negativt tal",
        "text": "Att ta bort −2 ger samma förändring som att lägga till 2.",
        "matte": "\\[5-(-2)=5+2=7\\]"
      }
    ],
    "svar": "\\(4\\) och \\(7\\).",
    "komihag": "\\(a-(-b)=a+b\\). Två minustecken efter varandra i en subtraktion blir ett plus.",
    "traningsfamilj": "Addition och subtraktion med negativa tal"
  },
  "ma1-grund-0-05": {
    "kap": 0,
    "omr": "negativa_tal",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Multiplicera negativa tal",
    "niva": "E",
    "t": "<p>Beräkna (−4) · 3 och (−4) · (−3).</p>",
    "ram": "Bestäm först svarets tecken och räkna sedan med talens belopp.",
    "steg": [
      {
        "rubrik": "Olika tecken ger negativ produkt",
        "text": "Fyra gånger tre är tolv.",
        "matte": "\\[(-4)\\cdot3=-12\\]"
      },
      {
        "rubrik": "Lika tecken ger positiv produkt",
        "text": "När båda faktorerna är negativa blir produkten positiv.",
        "matte": "\\[(-4)\\cdot(-3)=12\\]"
      }
    ],
    "svar": "\\(-12\\) och \\(12\\).",
    "komihag": "Samma teckenregler gäller vid division, till exempel (−12)/(−3) = 4. Vid addition gäller de inte: −4 + (−3) = −7."
  },
  "ma1-grund-0-06": {
    "kap": 0,
    "omr": "tal_rakneordning",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Räkneordning och parenteser",
    "niva": "E",
    "t": "<p>Beräkna 3 + 2 · (8 − 5).</p>",
    "ram": "Räkna parenteser först. Därefter kommer potenser, sedan multiplikation och division, och sist addition och subtraktion.",
    "steg": [
      {
        "rubrik": "Börja i parentesen",
        "text": "Skillnaden 8 − 5 är 3.",
        "matte": "\\[3+2\\cdot(8-5)=3+2\\cdot3\\]"
      },
      {
        "rubrik": "Multiplicera före additionen",
        "text": "Räkna 2 · 3 innan du lägger till 3.",
        "matte": "\\[3+6=9\\]"
      }
    ],
    "svar": "Svaret är \\(9\\).",
    "komihag": "Räknesätt med samma prioritet utförs från vänster till höger.",
    "traningsfamilj": "Räkna med prioriteringsregler"
  },
  "ma1-grund-0-07": {
    "kap": 0,
    "omr": "avrundning",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Avrunda ett tal",
    "niva": "E",
    "t": "<p>Avrunda 12,476 till två decimaler.</p>",
    "ram": "När du avrundar bestämmer du först vilken siffra som ska vara den sista. Siffran direkt efter avgör om den ska höjas.",
    "steg": [
      {
        "rubrik": "Hitta hundradelssiffran",
        "text": "Två decimaler betyder att vi ska behålla 12,47."
      },
      {
        "rubrik": "Titta på nästa siffra",
        "text": "Nästa siffra är 6. Höj därför hundradelssiffran från 7 till 8.",
        "matte": "\\[12{,}476\\approx12{,}48\\]"
      }
    ],
    "svar": "\\(12{,}48\\).",
    "komihag": "Avrunda helst i slutet av en beräkning så att mellanleden behåller sin noggrannhet.",
    "traningsfamilj": "Avrunda till angiven noggrannhet"
  },
  "ma1-grund-0-08": {
    "kap": 0,
    "omr": "overslag_grunder",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Göra ett överslag",
    "niva": "E",
    "t": "<p>Gör ett överslag av 49 · 198.</p>",
    "ram": "Ett överslag använder närliggande tal som är enkla att räkna med. Det hjälper dig att bedöma om ett svar är rimligt.",
    "steg": [
      {
        "rubrik": "Välj enkla närliggande tal",
        "text": "49 ligger nära 50 och 198 nära 200."
      },
      {
        "rubrik": "Räkna med de avrundade talen",
        "text": "Båda talen har avrundats uppåt, så överslaget blir lite större än det exakta svaret.",
        "matte": "\\[49\\cdot198\\approx50\\cdot200=10\\,000\\]"
      }
    ],
    "svar": "Produkten är ungefär \\(10\\,000\\).",
    "komihag": "Ett överslag ska visa storleksordningen; det behöver inte vara ett exakt svar.",
    "traningsfamilj": "Göra överslagsberäkningar"
  },
  "ma1-grund-0-09": {
    "kap": 0,
    "omr": "brakrakning",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Förkorta ett bråk",
    "niva": "E",
    "t": "<p>Förkorta 18/24 så långt som möjligt.</p>",
    "ram": "Ett bråk behåller sitt värde om täljare och nämnare divideras med samma tal, skilt från noll.",
    "steg": [
      {
        "rubrik": "Hitta en gemensam faktor",
        "text": "Både 18 och 24 är delbara med 6."
      },
      {
        "rubrik": "Dividera både täljare och nämnare",
        "text": "3 och 4 saknar gemensam faktor större än 1.",
        "matte": "\\[\\frac{18}{24}=\\frac{18/6}{24/6}=\\frac34\\]"
      }
    ],
    "svar": "\\(\\frac34\\).",
    "komihag": "Du måste göra samma förändring i både täljaren och nämnaren.",
    "traningsfamilj": "Förkorta bråk"
  },
  "ma1-grund-0-10": {
    "kap": 0,
    "omr": "brakrakning",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Addera bråk",
    "niva": "E",
    "t": "<p>Beräkna 1/3 + 1/4.</p>",
    "ram": "För att addera bråk behöver delarna vara lika stora. Därför skriver du dem med samma nämnare.",
    "steg": [
      {
        "rubrik": "Välj gemensam nämnare",
        "text": "Tolv är delbart med både tre och fyra.",
        "matte": "\\[\\frac13=\\frac4{12},\\qquad\\frac14=\\frac3{12}\\]"
      },
      {
        "rubrik": "Addera täljarna",
        "text": "Nämnaren är kvar eftersom vi fortfarande räknar tolftedelar.",
        "matte": "\\[\\frac4{12}+\\frac3{12}=\\frac7{12}\\]"
      }
    ],
    "svar": "\\(\\frac7{12}\\).",
    "komihag": "Vid subtraktion gör du på samma sätt men subtraherar täljarna.",
    "traningsfamilj": "Addition och subtraktion med olika nämnare"
  },
  "ma1-grund-0-11": {
    "kap": 0,
    "omr": "brakrakning",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Multiplicera bråk",
    "niva": "E",
    "t": "<p>Beräkna 2/3 · 3/5.</p>",
    "ram": "När du multiplicerar bråk multiplicerar du täljarna med varandra och nämnarna med varandra.",
    "steg": [
      {
        "rubrik": "Multiplicera täljare och nämnare var för sig",
        "text": "Du behöver inte göra nämnarna lika.",
        "matte": "\\[\\frac23\\cdot\\frac35=\\frac{2\\cdot3}{3\\cdot5}=\\frac6{15}\\]"
      },
      {
        "rubrik": "Förkorta svaret",
        "text": "Både 6 och 15 är delbara med 3.",
        "matte": "\\[\\frac6{15}=\\frac25\\]"
      }
    ],
    "svar": "\\(\\frac25\\).",
    "komihag": "Gemensam nämnare behövs vid addition och subtraktion, men inte vid multiplikation."
  },
  "ma1-grund-0-12": {
    "kap": 0,
    "omr": "brakrakning",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Dividera med ett bråk",
    "niva": "E",
    "t": "<p>Beräkna 3/4 dividerat med 1/2.</p>",
    "ram": "Att dividera med ett bråk är samma sak som att multiplicera med bråkets invers: täljare och nämnare byter plats.",
    "steg": [
      {
        "rubrik": "Vänd på bråket som du dividerar med",
        "text": "Det är 1/2 som ska vändas, inte 3/4.",
        "matte": "\\[\\frac{\\frac34}{\\frac12}=\\frac34\\cdot\\frac21\\]"
      },
      {
        "rubrik": "Multiplicera och förkorta",
        "text": "Svaret visar hur många halvor som ryms i tre fjärdedelar.",
        "matte": "\\[\\frac34\\cdot2=\\frac64=\\frac32=1{,}5\\]"
      }
    ],
    "svar": "\\(\\frac32=1{,}5\\).",
    "komihag": "Division med ett positivt tal mindre än 1 ger ett större tal.",
    "traningsfamilj": "Division av bråk"
  },
  "ma1-grund-0-13": {
    "kap": 0,
    "omr": "enhetsbyten",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Byta längd- och massenhet",
    "niva": "E",
    "t": "<p>Skriv 2,4 m i cm och 750 g i kg.</p>",
    "ram": "Utgå från vad enheterna betyder. En meter är 100 centimeter och ett kilogram är 1 000 gram.",
    "steg": [
      {
        "rubrik": "Omvandla metrarna",
        "text": "Varje meter innehåller 100 centimeter.",
        "matte": "\\[2{,}4\\cdot100=240\\ \\mathrm{cm}\\]"
      },
      {
        "rubrik": "Omvandla grammen",
        "text": "Dela med 1 000 för att få antalet kilogram.",
        "matte": "\\[750/1000=0{,}75\\ \\mathrm{kg}\\]"
      }
    ],
    "svar": "\\(240\\ \\mathrm{cm}\\) och \\(0{,}75\\ \\mathrm{kg}\\).",
    "komihag": "En mindre enhet ger ett större mätetal för samma storhet.",
    "traningsfamilj": "Omvandla mellan längd-, massa- och volymenheter"
  },
  "ma1-grund-0-14": {
    "kap": 0,
    "omr": "enhetsbyten",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Area- och volymenheter",
    "niva": "E",
    "t": "<p>Skriv 0,20 m² i cm² och 3,0 liter i dm³.</p>",
    "ram": "En kvadratmeter är en ruta som är 100 cm lång och 100 cm bred. Därför innehåller den 10 000 cm².",
    "steg": [
      {
        "rubrik": "Omvandla arean",
        "text": "Multiplicera med 100 · 100, inte bara med 100.",
        "matte": "\\[0{,}20\\ \\mathrm{m^2}=0{,}20\\cdot10\\,000=2000\\ \\mathrm{cm^2}\\]"
      },
      {
        "rubrik": "Använd sambandet mellan liter och dm³",
        "text": "En liter är exakt en kubikdecimeter.",
        "matte": "\\[3{,}0\\ \\mathrm l=3{,}0\\ \\mathrm{dm^3}\\]"
      }
    ],
    "svar": "\\(2\\,000\\ \\mathrm{cm^2}\\) och \\(3{,}0\\ \\mathrm{dm^3}\\).",
    "komihag": "1 m² = 10 000 cm². 1 m³ = 1 000 dm³ = 1 000 liter.",
    "traningsfamilj": "Omvandla area- och tidsenheter"
  },
  "ma1-grund-0-15": {
    "kap": 0,
    "omr": "tiopotenser_prefix",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Tiopotenser och grundpotensform",
    "niva": "E",
    "t": "<p>Skriv 45 000 och 0,0032 i grundpotensform.</p>",
    "ram": "Grundpotensform skriver ett positivt tal som ett tal från 1 upp till, men inte med, 10 multiplicerat med en tiopotens.",
    "steg": [
      {
        "rubrik": "Skriv 45 000 med första faktorn 4,5",
        "text": "4,5 måste multipliceras med 10 000.",
        "matte": "\\[45\\,000=4{,}5\\cdot10^4\\]"
      },
      {
        "rubrik": "Skriv 0,0032 med första faktorn 3,2",
        "text": "3,2 måste multipliceras med en tusendel.",
        "matte": "\\[0{,}0032=3{,}2\\cdot10^{-3}\\]"
      }
    ],
    "svar": "\\(4{,}5\\cdot10^4\\) och \\(3{,}2\\cdot10^{-3}\\).",
    "komihag": "Ett negativt exponenttecken gör inte talet negativt. Det visar en faktor som är mindre än 1.",
    "traningsfamilj": "Skriva tal i grundpotensform"
  },
  "ma1-grund-1-01": {
    "kap": 1,
    "omr": "algebraiska_uttryck",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna värdet av ett uttryck",
    "niva": "E",
    "t": "<p>Beräkna 3x + 4 när x = 5.</p>",
    "ram": "Ersätt variabeln med det givna värdet och följ sedan den vanliga räkneordningen.",
    "steg": [
      {
        "rubrik": "Sätt in värdet",
        "text": "3x betyder 3 multiplicerat med x.",
        "matte": "\\[3x+4=3\\cdot{\\color{#D1495B}{5}}+4\\]"
      },
      {
        "rubrik": "Räkna ut uttrycket",
        "text": "Multiplicera innan du adderar.",
        "matte": "\\[15+4=19\\]"
      }
    ],
    "svar": "Uttryckets värde är \\(19\\).",
    "komihag": "Om variabeln är negativ är det tydligt att sätta dess värde inom parentes.",
    "traningsfamilj": "Beräkna värdet av ett uttryck"
  },
  "ma1-grund-1-02": {
    "kap": 1,
    "omr": "algebraiska_uttryck",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Förenkla ett uttryck",
    "niva": "E",
    "t": "<p>Förenkla 4x + 3 + 2x − 5.</p>",
    "ram": "Termer av samma slag kan samlas ihop. x-termer räknas tillsammans och vanliga tal tillsammans.",
    "steg": [
      {
        "rubrik": "Samla x-termerna",
        "text": "Fyra x och två x blir sex x.",
        "matte": "\\[4x+2x=6x\\]"
      },
      {
        "rubrik": "Samla de konstanta termerna",
        "text": "Tre minus fem är minus två.",
        "matte": "\\[4x+3+2x-5=6x-2\\]"
      }
    ],
    "svar": "\\(6x-2\\).",
    "komihag": "x och x² är olika slags termer och kan inte läggas ihop till en enda term.",
    "traningsfamilj": "Sammanfoga liknande termer"
  },
  "ma1-grund-1-03": {
    "kap": 1,
    "omr": "algebraiska_uttryck",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Skriva ett uttryck från en text",
    "niva": "E",
    "t": "<p>En penna kostar 12 kr och ett kuvert kostar 5 kr. Skriv ett uttryck för priset på x pennor och ett kuvert.</p>",
    "ram": "En variabel kan beskriva ett antal som får variera. Skriv kostnaden för varje del innan du sätter ihop uttrycket.",
    "steg": [
      {
        "rubrik": "Beskriv pennornas kostnad",
        "text": "Varje penna kostar 12 kr, så x pennor kostar 12x kr."
      },
      {
        "rubrik": "Lägg till kuvertet",
        "text": "Kuvertet köps en gång, oavsett hur många pennor du köper.",
        "matte": "\\[K=12x+5\\]"
      }
    ],
    "svar": "Priset är \\(12x+5\\) kr.",
    "komihag": "Kontrollera uttrycket genom att sätta in ett enkelt värde, till exempel x = 1.",
    "traningsfamilj": "Översätta en situation till ett algebraiskt uttryck"
  },
  "ma1-grund-1-04": {
    "kap": 1,
    "omr": "multiplicera_uttryck",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Multiplicera in i en parentes",
    "niva": "E",
    "t": "<p>Utveckla 3(2x + 4).</p>",
    "ram": "Faktorn framför parentesen ska multipliceras med varje term inne i parentesen.",
    "steg": [
      {
        "rubrik": "Multiplicera med båda termerna",
        "text": "Trean gäller hela summan.",
        "matte": "\\[3(2x+4)=3\\cdot2x+3\\cdot4\\]"
      },
      {
        "rubrik": "Förenkla produkterna",
        "text": "Räkna ut varje produkt.",
        "matte": "\\[6x+12\\]"
      }
    ],
    "svar": "\\(6x+12\\).",
    "komihag": "Det blir inte 6x + 4; även fyran ska multipliceras med tre.",
    "traningsfamilj": "Multiplicera in i parentes"
  },
  "ma1-grund-1-05": {
    "kap": 1,
    "omr": "multiplicera_uttryck",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Minus framför en parentes",
    "niva": "E",
    "t": "<p>Förenkla 8 − (2x − 3).</p>",
    "ram": "Ett minustecken framför en parentes betyder att hela uttrycket i parentesen subtraheras. Det motsvarar multiplikation med −1.",
    "steg": [
      {
        "rubrik": "Byt tecken på varje term i parentesen",
        "text": "−1 · 2x blir −2x och −1 · (−3) blir +3.",
        "matte": "\\[8-(2x-3)=8-2x+3\\]"
      },
      {
        "rubrik": "Samla de vanliga talen",
        "text": "Åtta plus tre är elva.",
        "matte": "\\[8-2x+3=11-2x\\]"
      }
    ],
    "svar": "\\(11-2x\\).",
    "komihag": "Minustecknet påverkar alla termer i parentesen.",
    "traningsfamilj": "Multiplicera in en negativ faktor i parentes"
  },
  "ma1-grund-1-06": {
    "kap": 1,
    "omr": "multiplicera_uttryck",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Multiplicera två parenteser",
    "niva": "E",
    "t": "<p>Utveckla (x + 2)(x + 3).</p>",
    "ram": "Varje term i den första parentesen multipliceras med varje term i den andra.",
    "steg": [
      {
        "rubrik": "Skriv alla fyra produkterna",
        "text": "Ta först x gånger båda termerna, sedan 2 gånger båda termerna.",
        "matte": "\\[(x+2)(x+3)=x^2+3x+2x+6\\]"
      },
      {
        "rubrik": "Samla liknande termer",
        "text": "3x och 2x kan adderas.",
        "matte": "\\[x^2+3x+2x+6=x^2+5x+6\\]"
      }
    ],
    "svar": "\\(x^2+5x+6\\).",
    "komihag": "Kontrollera att varje term i första parentesen har multiplicerats med varje term i den andra.",
    "traningsfamilj": "Multiplicera två parenteser"
  },
  "ma1-grund-1-07": {
    "kap": 1,
    "omr": "faktorisering",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Bryta ut en gemensam faktor",
    "niva": "E",
    "t": "<p>Faktorisera 6x + 9.</p>",
    "ram": "Att faktorisera betyder att skriva ett uttryck som en produkt. Börja med en faktor som finns i alla termer.",
    "steg": [
      {
        "rubrik": "Hitta den gemensamma faktorn",
        "text": "Både 6 och 9 är delbara med 3."
      },
      {
        "rubrik": "Skriv resten i en parentes",
        "text": "6x dividerat med 3 är 2x och 9 dividerat med 3 är 3.",
        "matte": "\\[6x+9=3(2x+3)\\]"
      }
    ],
    "svar": "\\(3(2x+3)\\).",
    "komihag": "Kontrollera genom att multiplicera in faktorn igen.",
    "traningsfamilj": "Bryta ut största gemensamma faktor"
  },
  "ma1-grund-1-08": {
    "kap": 1,
    "omr": "formler",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Använda en formel",
    "niva": "E",
    "t": "<p>En rektangels area ges av A = b · h. Beräkna arean när b = 5,0 cm och h = 3,0 cm.</p>",
    "ram": "Läs först vad variablerna betyder. Sätt sedan in rätt värde på rätt plats.",
    "steg": [
      {
        "rubrik": "Sätt in bas och höjd",
        "text": "Båda längderna är i centimeter.",
        "matte": "\\[A=5{,}0\\cdot3{,}0\\]"
      },
      {
        "rubrik": "Ange arean med rätt enhet",
        "text": "Centimeter gånger centimeter ger kvadratcentimeter.",
        "matte": "\\[A=15\\ \\mathrm{cm^2}\\]"
      }
    ],
    "svar": "Arean är \\(15\\ \\mathrm{cm^2}\\).",
    "komihag": "Se till att enheterna passar ihop innan du räknar.",
    "traningsfamilj": "Sätta in värden i formler"
  },
  "ma1-grund-1-09": {
    "kap": 1,
    "omr": "formler",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Lösa ut en variabel",
    "niva": "E",
    "t": "<p>Lös ut h ur A = b · h. Anta att b ≠ 0.</p>",
    "ram": "När du löser ut en variabel gör du samma räkneoperation i båda leden, precis som vid ekvationslösning.",
    "steg": [
      {
        "rubrik": "Ta bort faktorn framför h",
        "text": "h multipliceras med b. Dividera därför båda leden med b.",
        "matte": "\\[\\frac Ab=\\frac{bh}{b}\\]"
      },
      {
        "rubrik": "Förenkla och skriv h ensamt",
        "text": "I högerledet tar b i täljare och nämnare ut varandra.",
        "matte": "\\[h=\\frac Ab\\]"
      }
    ],
    "svar": "\\(h=A/b\\).",
    "komihag": "Du behöver inga tal för att skriva om en formel.",
    "traningsfamilj": "Lösa ut en variabel ur en formel"
  },
  "ma1-grund-1-10": {
    "kap": 1,
    "omr": "linjara_ekvationer",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Lösa en linjär ekvation",
    "niva": "E",
    "t": "<p>Lös 3x + 5 = 20.</p>",
    "ram": "En ekvation säger att två uttryck är lika stora. Gör samma sak i båda leden för att behålla likheten.",
    "steg": [
      {
        "rubrik": "Subtrahera 5 i båda leden",
        "text": "Då återstår termen med x.",
        "matte": "\\[3x=15\\]"
      },
      {
        "rubrik": "Dividera med 3",
        "text": "Nu blir x ensamt.",
        "matte": "\\[x=5\\]"
      },
      {
        "rubrik": "Kontrollera lösningen",
        "text": "Sätt in x = 5 i den ursprungliga ekvationen.",
        "matte": "\\[3\\cdot5+5=20\\]"
      }
    ],
    "svar": "\\(x=5\\).",
    "komihag": "Kontrollera gärna genom insättning, särskilt om du är osäker på ett tecken."
  },
  "ma1-grund-1-11": {
    "kap": 1,
    "omr": "linjara_ekvationer",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Variabel i båda leden",
    "niva": "E",
    "t": "<p>Lös 5x − 4 = 2x + 8.</p>",
    "ram": "Samla termerna med variabeln i ena ledet och de vanliga talen i det andra.",
    "steg": [
      {
        "rubrik": "Subtrahera 2x i båda leden",
        "text": "Då försvinner x-termen från högerledet.",
        "matte": "\\[3x-4=8\\]"
      },
      {
        "rubrik": "Addera 4 och dividera sedan med 3",
        "text": "Gör operationerna i båda leden.",
        "matte": "\\[3x=12\\quad\\Rightarrow\\quad x=4\\]"
      }
    ],
    "svar": "\\(x=4\\).",
    "komihag": "Att ”flytta över” en term är en förkortning av att göra samma operation i båda leden."
  },
  "ma1-grund-1-12": {
    "kap": 1,
    "omr": "linjara_ekvationer",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Ekvation med parentes",
    "niva": "E",
    "t": "<p>Lös 2(x + 3) = 14.</p>",
    "ram": "Du kan ibland förenkla ekvationen genom att först dividera bort en faktor som står framför hela parentesen.",
    "steg": [
      {
        "rubrik": "Dividera båda leden med 2",
        "text": "Då blir parentesens uttryck ensamt.",
        "matte": "\\[x+3=7\\]"
      },
      {
        "rubrik": "Subtrahera 3 i båda leden",
        "text": "Nu får du värdet på x.",
        "matte": "\\[x=4\\]"
      }
    ],
    "svar": "\\(x=4\\).",
    "komihag": "Du kan också multiplicera in tvåan först. Båda metoderna ska ge samma lösning.",
    "traningsfamilj": "Ekvationer med parenteser"
  },
  "ma1-grund-1-13": {
    "kap": 1,
    "omr": "intervall",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Skriva och tolka intervall",
    "niva": "E",
    "t": "<p>Beskriv vilka tal som ingår i 2 ≤ x &lt; 5. Ingår 2 och 5?</p>",
    "ram": "Ett intervall beskriver alla tal mellan två gränser. Olikhetstecknen visar om gränserna ingår.",
    "steg": [
      {
        "rubrik": "Läs den vänstra gränsen",
        "text": "2 ≤ x betyder att x får vara 2 eller större."
      },
      {
        "rubrik": "Läs den högra gränsen",
        "text": "x &lt; 5 betyder att x måste vara mindre än 5. Även decimaltal mellan gränserna ingår."
      }
    ],
    "svar": "Alla tal från och med 2 till, men inte med, 5. Talet 2 ingår; 5 ingår inte.",
    "komihag": "≤ och ≥ tillåter likhet. &lt; och &gt; gör det inte.",
    "traningsfamilj": "Tolka och skriva intervall"
  },
  "ma1-grund-1-14": {
    "kap": 1,
    "omr": "linjara_olikheter",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Lösa en linjär olikhet",
    "niva": "E",
    "t": "<p>Lös 2x + 3 &lt; 11.</p>",
    "ram": "En olikhet kan ha många lösningar. Du löser den ungefär som en ekvation och skriver sedan vilka tal som uppfyller den.",
    "steg": [
      {
        "rubrik": "Subtrahera 3 i båda leden",
        "text": "Olikhetstecknet behåller sin riktning.",
        "matte": "\\[2x<8\\]"
      },
      {
        "rubrik": "Dividera med 2",
        "text": "Eftersom du dividerar med ett positivt tal behålls tecknet.",
        "matte": "\\[x<4\\]"
      }
    ],
    "svar": "Alla tal som är mindre än 4, alltså \\(x<4\\).",
    "komihag": "Om du multiplicerar eller dividerar båda leden med ett negativt tal måste olikhetstecknet vändas."
  },
  "ma1-grund-1-15": {
    "kap": 1,
    "omr": "linjara_olikheter",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Negativ faktor i en olikhet",
    "niva": "E",
    "t": "<p>Lös −2x &lt; 6.</p>",
    "ram": "När båda leden multipliceras eller divideras med ett negativt tal byter talen ordning på tallinjen. Olikhetstecknet måste därför vändas.",
    "steg": [
      {
        "rubrik": "Dividera båda leden med −2",
        "text": "Kom ihåg att samtidigt vända &lt; till &gt;.",
        "matte": "\\[x>\\frac6{-2}\\]"
      },
      {
        "rubrik": "Förenkla och kontrollera ett värde",
        "text": "Gränsen är −3. Kontrollera med ett tal som ska ingå, till exempel x = 0: −2 · 0 = 0, och 0 &lt; 6 stämmer.",
        "matte": "\\[x>-3\\]"
      }
    ],
    "svar": "\\(x>-3\\).",
    "komihag": "Gränstalet −3 ingår inte, eftersom den ursprungliga olikheten är strikt."
  },
  "ma1-grund-2-01": {
    "kap": 2,
    "omr": [
      "funktionsvarden",
      "funktionsbegreppet"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna ett funktionsvärde",
    "niva": "E",
    "t": "<p>Funktionen f ges av f(x) = 3x − 2. Beräkna f(4) och f(−1).</p>",
    "ram": "En funktion ger exakt ett y-värde för varje x-värde. f(4) betyder funktionens värde när x = 4.",
    "steg": [
      {
        "rubrik": "Sätt in x = 4",
        "text": "Ersätt varje x i formeln med 4.",
        "matte": "\\[f({\\color{#D1495B}{4}})=3\\cdot{\\color{#D1495B}{4}}-2=12-2=10\\]"
      },
      {
        "rubrik": "Sätt in x = −1",
        "text": "Skriv det negativa talet inom parentes, så blir tecknen rätt.",
        "matte": "\\[f({\\color{#D1495B}{-1}})=3\\cdot({\\color{#D1495B}{-1}})-2=-3-2=-5\\]"
      }
    ],
    "svar": "\\(f(4)=10\\) och \\(f(-1)=-5\\).",
    "komihag": "f(4) betyder inte f gånger 4. Talet i parentesen är det x-värde du sätter in."
  },
  "ma1-grund-2-02": {
    "kap": 2,
    "omr": [
      "representationer",
      "funktionsbegreppet"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Läsa av en graf",
    "niva": "E",
    "t": "<p>Figuren visar grafen till y = f(x). Bestäm f(3) och lös ekvationen f(x) = 0.</p><svg class=\"dg\" viewBox=\"0 0 304 298\" role=\"img\" aria-label=\"Graf till en funktion y = f(x) i ett rutat koordinatsystem. Kurvan är en uppåtöppen parabel med lägsta punkt i (1, −1). Den skär x-axeln i x = 0 och x = 2 och går genom punkterna (−1, 3) och (3, 3).\" style=\"display:block;width:min(100%,300px);height:auto;margin:14px auto 4px\"><path class=\"dg-rut\" d=\"M34 28V268M74 28V268M114 28V268M154 28V268M194 28V268M234 28V268M274 28V268M34 268H274M34 228H274M34 188H274M34 148H274M34 108H274M34 68H274M34 28H274\"/><path class=\"dg-axel\" d=\"M34 188H284M114 268V18\"/><path class=\"dg-pil\" d=\"M292 188l-10-4.5v9zM114 10l-4.5 10h9z\"/><g class=\"dg-txt\"><text x=\"34\" y=\"207\" text-anchor=\"middle\">−2</text><text x=\"74\" y=\"207\" text-anchor=\"middle\">−1</text><text x=\"154\" y=\"207\" text-anchor=\"middle\">1</text><text x=\"194\" y=\"207\" text-anchor=\"middle\">2</text><text x=\"234\" y=\"207\" text-anchor=\"middle\">3</text><text x=\"274\" y=\"207\" text-anchor=\"middle\">4</text><text x=\"106\" y=\"273\" text-anchor=\"end\">−2</text><text x=\"106\" y=\"233\" text-anchor=\"end\">−1</text><text x=\"106\" y=\"153\" text-anchor=\"end\">1</text><text x=\"106\" y=\"113\" text-anchor=\"end\">2</text><text x=\"106\" y=\"73\" text-anchor=\"end\">3</text><text x=\"106\" y=\"33\" text-anchor=\"end\">4</text><text x=\"106\" y=\"207\" text-anchor=\"end\">0</text><text x=\"288\" y=\"179\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"124\" y=\"22\" font-style=\"italic\">y</text></g><path class=\"dg-linje\" d=\"M62.79 20L64.31 26.88L65.83 33.64L67.35 40.28L68.87 46.81L70.39 53.22L71.91 59.52L73.43 65.7L74.95 71.77L76.47 77.72L77.99 83.56L79.51 89.28L81.03 94.88L82.55 100.37L84.07 105.74L85.59 111L87.11 116.14L88.63 121.17L90.15 126.08L91.67 130.88L93.19 135.56L94.71 140.12L96.23 144.57L97.75 148.9L99.27 153.12L100.79 157.22L102.31 161.21L103.83 165.08L105.35 168.84L106.87 172.48L108.39 176L109.91 179.41L111.43 182.7L112.95 185.88L114.47 188.94L115.99 191.89L117.51 194.72L119.03 197.44L120.55 200.04L122.08 202.52L123.6 204.89L125.12 207.14L126.64 209.28L128.16 211.3L129.68 213.21L131.2 215L132.72 216.68L134.24 218.24L135.76 219.68L137.28 221.01L138.8 222.22L140.32 223.32L141.84 224.3L143.36 225.17L144.88 225.92L146.4 226.56L147.92 227.08L149.44 227.48L150.96 227.77L152.48 227.94L154 228L155.52 227.94L157.04 227.77L158.56 227.48L160.08 227.08L161.6 226.56L163.12 225.92L164.64 225.17L166.16 224.3L167.68 223.32L169.2 222.22L170.72 221.01L172.24 219.68L173.76 218.24L175.28 216.68L176.8 215L178.32 213.21L179.84 211.3L181.36 209.28L182.88 207.14L184.4 204.89L185.92 202.52L187.45 200.04L188.97 197.44L190.49 194.72L192.01 191.89L193.53 188.94L195.05 185.88L196.57 182.7L198.09 179.41L199.61 176L201.13 172.48L202.65 168.84L204.17 165.08L205.69 161.21L207.21 157.22L208.73 153.12L210.25 148.9L211.77 144.57L213.29 140.12L214.81 135.56L216.33 130.88L217.85 126.08L219.37 121.17L220.89 116.14L222.41 111L223.93 105.74L225.45 100.37L226.97 94.88L228.49 89.28L230.01 83.56L231.53 77.72L233.05 71.77L234.57 65.7L236.09 59.52L237.61 53.22L239.13 46.81L240.65 40.28L242.17 33.64L243.69 26.88L245.21 20\"/><text class=\"dg-etikett\" x=\"244\" y=\"26\"><tspan font-style=\"italic\">y</tspan> = <tspan font-style=\"italic\">f</tspan>(<tspan font-style=\"italic\">x</tspan>)</text></svg>",
    "ram": "I en graf står x-värdena på den vågräta axeln och funktionsvärdena på den lodräta. Varje punkt på grafen är ett par (x, f(x)).",
    "steg": [
      {
        "rubrik": "Läs av f(3)",
        "text": "Börja vid x = 3 på x-axeln. Gå lodrätt till grafen och sedan vågrätt till y-axeln. Där står 3.",
        "matte": "\\[f(3)=3\\]"
      },
      {
        "rubrik": "Lös f(x) = 0",
        "text": "Nu är y-värdet givet. Leta upp de punkter på grafen där y = 0, alltså där grafen skär x-axeln. Det sker på två ställen.",
        "matte": "\\[x=0\\qquad\\text{eller}\\qquad x=2\\]"
      }
    ],
    "svar": "\\(f(3)=3\\). Ekvationen \\(f(x)=0\\) har lösningarna \\(x=0\\) och \\(x=2\\).",
    "komihag": "Söker du f(3) börjar du på x-axeln. Löser du f(x) = 0 börjar du på y-axeln. En sådan ekvation kan ha flera lösningar."
  },
  "ma1-grund-2-03": {
    "kap": 2,
    "omr": [
      "funktionsbegreppet",
      "representationer"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Göra en värdetabell",
    "niva": "E",
    "t": "<p>Gör en värdetabell för y = 2x + 1 där x = −1, 0, 1 och 2.</p>",
    "ram": "En värdetabell visar några x-värden och de y-värden som hör till dem. Punkterna kan sedan ritas i ett koordinatsystem.",
    "steg": [
      {
        "rubrik": "Beräkna y för varje x-värde",
        "text": "Sätt in x-värdena ett i taget och räkna multiplikationen före additionen.",
        "matte": "\\[2\\cdot({\\color{#D1495B}{-1}})+1=-1,\\quad 2\\cdot{\\color{#D1495B}{0}}+1=1,\\quad 2\\cdot{\\color{#D1495B}{1}}+1=3,\\quad 2\\cdot{\\color{#D1495B}{2}}+1=5\\]"
      },
      {
        "rubrik": "Skriv tabellen",
        "text": "Varje kolumn blir en punkt, till exempel (2, 5). Här ökar y med 2 varje gång x ökar med 1, så punkterna ligger på en rät linje.",
        "matte": "\\[\\begin{array}{c|cccc}x&-1&0&1&2\\\\\\hline y&-1&1&3&5\\end{array}\\]"
      }
    ],
    "svar": "Punkterna är (−1, −1), (0, 1), (1, 3) och (2, 5).",
    "komihag": "Välj gärna x-värden som både är negativa, noll och positiva. Då ser du hur grafen går."
  },
  "ma1-grund-2-04": {
    "kap": 2,
    "omr": [
      "linjara_funktioner"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Tolka en linjär modell",
    "niva": "E",
    "t": "<p>Priset y kronor för en taxiresa på x kilometer ges av y = 15x + 45. Vad betyder talen 15 och 45? Vad kostar en resa på 12 km?</p>",
    "ram": "En linjär modell y = kx + m har ett startvärde m och en fast ökning k för varje steg i x.",
    "steg": [
      {
        "rubrik": "Tolka m = 45",
        "text": "När x = 0 har du inte åkt någon sträcka, men priset är ändå 45 kr. Det är startavgiften."
      },
      {
        "rubrik": "Tolka k = 15",
        "text": "För varje kilometer till ökar priset med 15 kr. Det är priset per kilometer."
      },
      {
        "rubrik": "Beräkna priset för 12 km",
        "text": "Sätt in x = 12.",
        "matte": "\\[y=15\\cdot{\\color{#D1495B}{12}}+45=180+45=225\\]"
      }
    ],
    "svar": "15 kr är priset per kilometer och 45 kr är startavgiften. En resa på 12 km kostar \\(225\\) kr.",
    "komihag": "I y = kx + m är m värdet när x = 0, och k är hur mycket y ändras när x ökar med 1."
  },
  "ma1-grund-2-05": {
    "kap": 2,
    "omr": [
      "bestamma_linjar_funktion"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Lutningen från två punkter",
    "niva": "E",
    "t": "<p>En rät linje går genom punkterna (1, 3) och (4, 9). Beräkna linjens lutning k.</p>",
    "ram": "Lutningen visar hur mycket y ändras när x ökar med 1. Du får den genom att dela ändringen i y med ändringen i x.",
    "steg": [
      {
        "rubrik": "Beräkna ändringarna",
        "text": "Ta koordinaterna i samma ordning i båda skillnaderna.",
        "matte": "\\[\\Delta y=9-3=6,\\qquad \\Delta x=4-1=3\\]"
      },
      {
        "rubrik": "Dela Δy med Δx",
        "text": "Lutningen är positiv, så linjen stiger åt höger.",
        "matte": "\\[k=\\frac{\\Delta y}{\\Delta x}=\\frac{6}{3}=2\\]"
      }
    ],
    "svar": "\\(k=2\\).",
    "komihag": "\\(k=\\dfrac{y_2-y_1}{x_2-x_1}\\). Börjar du med den andra punkten i täljaren måste du göra likadant i nämnaren."
  },
  "ma1-grund-2-06": {
    "kap": 2,
    "omr": [
      "rata_linjens_ekvation",
      "bestamma_linjar_funktion"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Räta linjens ekvation",
    "niva": "E",
    "t": "<p>Bestäm ekvationen för den räta linje som går genom punkterna (2, 5) och (6, 13).</p>",
    "ram": "Räta linjens ekvation kan skrivas y = kx + m. Du bestämmer först lutningen k och sedan m med hjälp av en av punkterna.",
    "steg": [
      {
        "rubrik": "Beräkna k",
        "text": "Dela ändringen i y med ändringen i x.",
        "matte": "\\[k=\\frac{13-5}{6-2}=\\frac84=2\\]"
      },
      {
        "rubrik": "Beräkna m",
        "text": "Sätt in k = 2 och punkten (2, 5) i y = kx + m.",
        "matte": "\\[5=2\\cdot{\\color{#D1495B}{2}}+m\\quad\\Rightarrow\\quad m=1\\]"
      },
      {
        "rubrik": "Skriv ekvationen och kontrollera",
        "text": "Den andra punkten ska också passa.",
        "matte": "\\[y=2x+1,\\qquad 2\\cdot6+1=13\\]"
      }
    ],
    "svar": "\\(y=2x+1\\).",
    "komihag": "Kontrollera alltid med den punkt du inte använde när du beräknade m."
  },
  "ma1-grund-2-07": {
    "kap": 2,
    "omr": [
      "linjara_funktioner",
      "rata_linjens_ekvation"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Läsa av k och m i en graf",
    "niva": "E",
    "t": "<p>Bestäm ekvationen för den räta linjen i figuren.</p><svg class=\"dg\" viewBox=\"0 0 368 248\" role=\"img\" aria-label=\"Rät linje i ett rutat koordinatsystem. Linjen skär y-axeln i y = 3 och x-axeln i x = 6. Den går även genom punkten (2, 2).\" style=\"display:block;width:min(100%,340px);height:auto;margin:14px auto 4px\"><path class=\"dg-rut\" d=\"M34 28V218M72 28V218M110 28V218M148 28V218M186 28V218M224 28V218M262 28V218M300 28V218M338 28V218M34 218H338M34 180H338M34 142H338M34 104H338M34 66H338M34 28H338\"/><path class=\"dg-axel\" d=\"M34 180H348M72 218V18\"/><path class=\"dg-pil\" d=\"M356 180l-10-4.5v9zM72 10l-4.5 10h9z\"/><g class=\"dg-txt\"><text x=\"34\" y=\"199\" text-anchor=\"middle\">−1</text><text x=\"110\" y=\"199\" text-anchor=\"middle\">1</text><text x=\"148\" y=\"199\" text-anchor=\"middle\">2</text><text x=\"186\" y=\"199\" text-anchor=\"middle\">3</text><text x=\"224\" y=\"199\" text-anchor=\"middle\">4</text><text x=\"262\" y=\"199\" text-anchor=\"middle\">5</text><text x=\"300\" y=\"199\" text-anchor=\"middle\">6</text><text x=\"338\" y=\"199\" text-anchor=\"middle\">7</text><text x=\"64\" y=\"223\" text-anchor=\"end\">−1</text><text x=\"64\" y=\"147\" text-anchor=\"end\">1</text><text x=\"64\" y=\"109\" text-anchor=\"end\">2</text><text x=\"64\" y=\"71\" text-anchor=\"end\">3</text><text x=\"64\" y=\"33\" text-anchor=\"end\">4</text><text x=\"64\" y=\"199\" text-anchor=\"end\">0</text><text x=\"352\" y=\"171\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"82\" y=\"22\" font-style=\"italic\">y</text></g><path class=\"dg-linje\" d=\"M34 47L186 123L338 199\"/></svg>",
    "ram": "I y = kx + m är m y-värdet där linjen skär y-axeln. k visar hur många steg linjen går upp eller ner för varje steg åt höger.",
    "steg": [
      {
        "rubrik": "Läs av m",
        "text": "Linjen skär y-axeln i y = 3.",
        "matte": "\\[m=3\\]"
      },
      {
        "rubrik": "Läs av k med en trappa",
        "text": "Gå från (0, 3) till en annan punkt där linjen korsar rutnätet. Två steg åt höger ger ett steg nedåt.",
        "figur": "<svg class=\"dg\" viewBox=\"0 0 368 248\" role=\"img\" aria-label=\"Rät linje som skär y-axeln i 3. Från skärningspunkten är en trappa ritad: två steg åt höger och ett steg nedåt tar dig tillbaka till linjen i punkten (2, 2).\" style=\"display:block;width:min(100%,340px);height:auto;margin:14px auto 4px\"><path class=\"dg-rut\" d=\"M34 28V218M72 28V218M110 28V218M148 28V218M186 28V218M224 28V218M262 28V218M300 28V218M338 28V218M34 218H338M34 180H338M34 142H338M34 104H338M34 66H338M34 28H338\"/><path class=\"dg-axel\" d=\"M34 180H348M72 218V18\"/><path class=\"dg-pil\" d=\"M356 180l-10-4.5v9zM72 10l-4.5 10h9z\"/><g class=\"dg-txt\"><text x=\"34\" y=\"199\" text-anchor=\"middle\">−1</text><text x=\"110\" y=\"199\" text-anchor=\"middle\">1</text><text x=\"148\" y=\"199\" text-anchor=\"middle\">2</text><text x=\"186\" y=\"199\" text-anchor=\"middle\">3</text><text x=\"224\" y=\"199\" text-anchor=\"middle\">4</text><text x=\"262\" y=\"199\" text-anchor=\"middle\">5</text><text x=\"300\" y=\"199\" text-anchor=\"middle\">6</text><text x=\"338\" y=\"199\" text-anchor=\"middle\">7</text><text x=\"64\" y=\"223\" text-anchor=\"end\">−1</text><text x=\"64\" y=\"147\" text-anchor=\"end\">1</text><text x=\"64\" y=\"109\" text-anchor=\"end\">2</text><text x=\"64\" y=\"71\" text-anchor=\"end\">3</text><text x=\"64\" y=\"33\" text-anchor=\"end\">4</text><text x=\"64\" y=\"199\" text-anchor=\"end\">0</text><text x=\"352\" y=\"171\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"82\" y=\"22\" font-style=\"italic\">y</text></g><path class=\"dg-linje\" d=\"M34 47L186 123L338 199\"/><path class=\"dg-delta\" d=\"M72 66H148V104\"/><circle class=\"dg-vald\" cx=\"72\" cy=\"66\" r=\"6\"/><circle class=\"dg-vald\" cx=\"148\" cy=\"104\" r=\"6\"/><g class=\"dg-etikett\"><text x=\"110\" y=\"56\" text-anchor=\"middle\">+2</text><text x=\"157\" y=\"91\">−1</text><text x=\"82\" y=\"88\"><tspan font-style=\"italic\">m</tspan> = 3</text></g></svg>",
        "matte": "\\[k=\\frac{-1}{2}=-0{,}5\\]"
      },
      {
        "rubrik": "Skriv ekvationen",
        "text": "Kontrollera med skärningen med x-axeln: när x = 6 blir y = 0.",
        "matte": "\\[y=-0{,}5x+3,\\qquad -0{,}5\\cdot{\\color{#D1495B}{6}}+3=0\\]"
      }
    ],
    "svar": "\\(y=-0{,}5x+3\\).",
    "komihag": "En linje som lutar nedåt åt höger har negativt k."
  },
  "ma1-grund-2-08": {
    "kap": 2,
    "omr": [
      "exponentialfunktioner"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Tolka en exponentiell modell",
    "niva": "E",
    "t": "<p>Värdet y kronor på en bil x år efter köpet ges av y = 240 000 · 0,85<sup>x</sup>. Vad betyder 240 000 och 0,85? Vad är bilen värd efter 3 år?</p>",
    "ram": "En exponentialfunktion y = C · a<sup>x</sup> beskriver något som ändras med samma procent varje steg. C är startvärdet och a är förändringsfaktorn.",
    "steg": [
      {
        "rubrik": "Tolka C",
        "text": "När x = 0 är a<sup>x</sup> = 1. Bilen kostade alltså 240 000 kr när den köptes."
      },
      {
        "rubrik": "Tolka a",
        "text": "Varje år multipliceras värdet med 0,85. Då återstår 85 %, så värdet minskar med 15 % per år.",
        "matte": "\\[0{,}85=1-0{,}15\\]"
      },
      {
        "rubrik": "Beräkna värdet efter 3 år",
        "text": "Sätt in x = 3. Räkna potensen före multiplikationen.",
        "matte": "\\[y=240\\,000\\cdot0{,}85^{\\color{#D1495B}{3}}=240\\,000\\cdot0{,}614125\\approx147\\,000\\]"
      }
    ],
    "svar": "240 000 kr är nypriset och 0,85 betyder att värdet minskar med 15 % per år. Efter 3 år är bilen värd ungefär \\(147\\,000\\) kr.",
    "komihag": "a &gt; 1 ger en ökning och 0 &lt; a &lt; 1 ger en minskning.",
    "fallgrop": "Dra inte av 15 % av nypriset varje år. Det vore en linjär minskning. Här räknas 15 % av det värde bilen har just då."
  },
  "ma1-grund-2-09": {
    "kap": 2,
    "omr": [
      "potensfunktioner"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Potensfunktioner",
    "niva": "E",
    "t": "<p>Funktionen f ges av f(x) = 2x<sup>3</sup>. Beräkna f(3) och bestäm x om f(x) = 16.</p>",
    "ram": "En potensfunktion har formen y = C · x<sup>a</sup>. Variabeln står i basen och exponenten är ett fast tal.",
    "steg": [
      {
        "rubrik": "Beräkna f(3)",
        "text": "Exponenten gäller bara x. Räkna potensen först och multiplicera sedan med 2.",
        "matte": "\\[f(3)=2\\cdot3^3=2\\cdot27=54\\]"
      },
      {
        "rubrik": "Ställ upp ekvationen",
        "text": "Dividera båda leden med 2.",
        "matte": "\\[2x^3=16\\quad\\Rightarrow\\quad x^3=8\\]"
      },
      {
        "rubrik": "Lös potensekvationen",
        "text": "Vilket tal gånger sig självt tre gånger blir 8?",
        "matte": "\\[x=\\sqrt[3]{8}=2\\]"
      }
    ],
    "svar": "\\(f(3)=54\\) och \\(x=2\\).",
    "komihag": "I en potensfunktion står x i basen, till exempel x³. I en exponentialfunktion står x i exponenten, till exempel 2<sup>x</sup>."
  },
  "ma1-grund-2-10": {
    "kap": 2,
    "omr": [
      "grafisk_ekvationslosning",
      "exponentialfunktioner"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Lösa en ekvation grafiskt",
    "niva": "E",
    "t": "<p>Bilens värde ges av y = 240 000 · 0,85<sup>x</sup>, där x är tiden i år. Använd ett digitalt verktyg för att ta reda på när värdet har sjunkit till 100 000 kr.</p>",
    "ram": "En ekvation som är svår att lösa för hand kan lösas grafiskt. Du ritar båda leden som funktioner och läser av var graferna skär varandra.",
    "steg": [
      {
        "rubrik": "Ställ upp ekvationen",
        "text": "Värdet ska vara 100 000 kr.",
        "matte": "\\[240\\,000\\cdot0{,}85^x=100\\,000\\]"
      },
      {
        "rubrik": "Rita båda leden",
        "text": "Skriv in y = 240000·0.85^x och y = 100000 i ett grafritande verktyg, till exempel GeoGebra, Desmos eller en grafräknare. Den andra grafen är en vågrät linje."
      },
      {
        "rubrik": "Läs av skärningspunkten och kontrollera",
        "text": "Skärningspunkten har x ≈ 5,4. Kontrollera med heltal på var sida om svaret.",
        "matte": "\\[240\\,000\\cdot0{,}85^5\\approx106\\,000,\\qquad 240\\,000\\cdot0{,}85^6\\approx91\\,000\\]"
      }
    ],
    "svar": "Efter ungefär \\(5{,}4\\) år, alltså under det sjätte året.",
    "komihag": "Det är x-koordinaten i skärningspunkten som är lösningen. y-koordinaten är bara det värde du redan visste."
  },
  "ma1-grund-3-01": {
    "kap": 3,
    "omr": "potensregler",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Multiplicera potenser med samma bas",
    "niva": "E",
    "t": "<p>Förenkla 2<sup>3</sup> · 2<sup>4</sup> och x<sup>5</sup> · x<sup>2</sup>.</p>",
    "ram": "En potens visar hur många gånger basen multipliceras med sig själv. När två potenser med samma bas multipliceras kan faktorerna räknas ihop.",
    "steg": [
      {
        "rubrik": "Skriv ut faktorerna",
        "text": "Tre tvåor gånger fyra tvåor är sju tvåor.",
        "matte": "\\[2^3\\cdot2^4=(2\\cdot2\\cdot2)\\cdot(2\\cdot2\\cdot2\\cdot2)=2^7=128\\]"
      },
      {
        "rubrik": "Använd potensregeln",
        "text": "Addera exponenterna. Basen x ändras inte.",
        "matte": "\\[x^5\\cdot x^2=x^{5+2}=x^7\\]"
      }
    ],
    "svar": "\\(2^7=128\\) och \\(x^7\\).",
    "komihag": "\\(a^m\\cdot a^n=a^{m+n}\\). Regeln gäller bara när baserna är lika.",
    "fallgrop": "Multiplicera inte exponenterna. 2³ · 2⁴ är 2⁷, inte 2¹²."
  },
  "ma1-grund-3-02": {
    "kap": 3,
    "omr": "potensregler",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Division och potens av en potens",
    "niva": "E",
    "t": "<p>Förenkla 5<sup>6</sup>/5<sup>4</sup> och (x<sup>3</sup>)<sup>2</sup>.</p>",
    "ram": "Vid division med samma bas tar faktorer i täljare och nämnare ut varandra. En potens av en potens betyder att hela potensen multipliceras flera gånger.",
    "steg": [
      {
        "rubrik": "Subtrahera exponenterna vid division",
        "text": "Fyra av de sex femmorna i täljaren tar ut femmorna i nämnaren.",
        "matte": "\\[\\frac{5^6}{5^4}=5^{6-4}=5^2=25\\]"
      },
      {
        "rubrik": "Multiplicera exponenterna vid potens av potens",
        "text": "(x³)² betyder x³ · x³.",
        "matte": "\\[(x^3)^2=x^3\\cdot x^3=x^{3\\cdot2}=x^6\\]"
      }
    ],
    "svar": "\\(25\\) och \\(x^6\\).",
    "komihag": "\\(\\dfrac{a^m}{a^n}=a^{m-n}\\) och \\((a^m)^n=a^{m\\cdot n}\\)."
  },
  "ma1-grund-3-03": {
    "kap": 3,
    "omr": "potensregler",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Exponenten noll och negativa exponenter",
    "niva": "E",
    "t": "<p>Beräkna 7<sup>0</sup> och 2<sup>−3</sup>.</p>",
    "ram": "När exponenten minskar med 1 delas värdet med basen. Mönstret visar vad exponenten noll och negativa exponenter betyder.",
    "steg": [
      {
        "rubrik": "Följ mönstret nedåt",
        "text": "Varje steg åt höger delar med 2.",
        "matte": "\\[2^2=4,\\quad 2^1=2,\\quad 2^0=1,\\quad 2^{-1}=\\frac12\\]"
      },
      {
        "rubrik": "Använd reglerna",
        "text": "Exponenten noll ger alltid 1 när basen inte är noll. En negativ exponent ger det inverterade värdet.",
        "matte": "\\[7^0=1,\\qquad 2^{-3}=\\frac1{2^3}=\\frac18=0{,}125\\]"
      }
    ],
    "svar": "\\(7^0=1\\) och \\(2^{-3}=0{,}125\\).",
    "komihag": "\\(a^0=1\\) och \\(a^{-n}=\\dfrac1{a^n}\\). En negativ exponent gör inte talet negativt."
  },
  "ma1-grund-3-04": {
    "kap": 3,
    "omr": "potensekvationer",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Lösa en enkel potensekvation",
    "niva": "E",
    "t": "<p>Lös ekvationerna x<sup>3</sup> = 125 och x<sup>2</sup> = 49.</p>",
    "ram": "I en potensekvation är det basen som är okänd. Du löser den med en rot som hör ihop med exponenten.",
    "steg": [
      {
        "rubrik": "Ta tredje roten",
        "text": "Sök det tal som multiplicerat med sig själv tre gånger blir 125.",
        "matte": "\\[x^3=125\\quad\\Rightarrow\\quad x=\\sqrt[3]{125}=5\\]"
      },
      {
        "rubrik": "Glöm inte den negativa lösningen",
        "text": "Både 7 · 7 och (−7) · (−7) blir 49.",
        "matte": "\\[x^2=49\\quad\\Rightarrow\\quad x=\\pm\\sqrt{49}=\\pm7\\]"
      }
    ],
    "svar": "\\(x=5\\) respektive \\(x=\\pm7\\).",
    "komihag": "Jämn exponent ger två lösningar om högerledet är positivt. Udda exponent ger en lösning."
  },
  "ma1-grund-3-05": {
    "kap": 3,
    "omr": "potensekvationer",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Potensekvation med räknare",
    "niva": "E",
    "t": "<p>Lös x<sup>5</sup> = 300. Svara med två decimaler.</p>",
    "ram": "När roten inte går jämnt ut använder du räknaren. Att ta femte roten är samma sak som att upphöja till 1/5.",
    "steg": [
      {
        "rubrik": "Upphöj båda leden till 1/5",
        "text": "Då blir exponenten på vänstra sidan 5 · 1/5 = 1.",
        "matte": "\\[x=300^{1/5}\\]"
      },
      {
        "rubrik": "Räkna med digitalt verktyg",
        "text": "Skriv 300^(1/5) på räknaren. Parentesen runt 1/5 behövs.",
        "matte": "\\[x\\approx3{,}13\\]"
      },
      {
        "rubrik": "Kontrollera",
        "text": "Sätt in det avrundade värdet. Det ska bli nära 300.",
        "matte": "\\[3{,}13^5\\approx300\\]"
      }
    ],
    "svar": "\\(x\\approx3{,}13\\).",
    "komihag": "Utan parentes räknar räknaren 300¹ / 5 = 60, vilket är fel."
  },
  "ma1-grund-3-06": {
    "kap": 3,
    "omr": "procent",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna en andel i procent",
    "niva": "E",
    "t": "<p>I en klass cyklar 12 av 30 elever till skolan. Hur många procent är det?</p>",
    "ram": "En andel är delen delad med det hela. Procent betyder hundradelar.",
    "steg": [
      {
        "rubrik": "Dela delen med det hela",
        "text": "Det hela är hela klassen.",
        "matte": "\\[\\frac{12}{30}=0{,}40\\]"
      },
      {
        "rubrik": "Skriv som procent",
        "text": "0,40 är 40 hundradelar.",
        "matte": "\\[0{,}40=40\\ \\%\\]"
      }
    ],
    "svar": "\\(40\\ \\%\\) av eleverna cyklar.",
    "komihag": "Andel = delen / det hela. Kontrollera att du delar med rätt tal."
  },
  "ma1-grund-3-07": {
    "kap": 3,
    "omr": "procent",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna procent av ett tal",
    "niva": "E",
    "t": "<p>Beräkna 35 % av 480 kr.</p>",
    "ram": "Skriv procentsatsen som decimaltal och multiplicera med det hela.",
    "steg": [
      {
        "rubrik": "Skriv 35 % som decimaltal",
        "text": "35 % är 35 hundradelar.",
        "matte": "\\[35\\ \\%=0{,}35\\]"
      },
      {
        "rubrik": "Multiplicera",
        "text": "Delen är andelen gånger det hela.",
        "matte": "\\[0{,}35\\cdot480=168\\]"
      }
    ],
    "svar": "35 % av 480 kr är \\(168\\) kr.",
    "komihag": "Överslag: 35 % är lite mer än en tredjedel, och en tredjedel av 480 är 160."
  },
  "ma1-grund-3-08": {
    "kap": 3,
    "omr": "procent",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna det hela",
    "niva": "E",
    "t": "<p>På en skola åker 180 elever buss. Det är 25 % av alla elever. Hur många elever går på skolan?</p>",
    "ram": "När du vet delen och andelen får du det hela genom att dela delen med andelen.",
    "steg": [
      {
        "rubrik": "Ställ upp sambandet",
        "text": "Andelen gånger det hela ska bli delen.",
        "matte": "\\[0{,}25\\cdot x=180\\]"
      },
      {
        "rubrik": "Dela med andelen",
        "text": "Kontrollera: 25 % av 720 är 180.",
        "matte": "\\[x=\\frac{180}{0{,}25}=720\\]"
      }
    ],
    "svar": "Skolan har \\(720\\) elever.",
    "komihag": "Det hela = delen / andelen. Svaret ska vara större än delen."
  },
  "ma1-grund-3-09": {
    "kap": 3,
    "omr": "procent",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Procent och procentenheter",
    "niva": "E",
    "t": "<p>Räntan på ett lån höjs från 2 % till 3 %. Hur många procentenheter och hur många procent har räntan ökat?</p>",
    "ram": "Procentenheter är skillnaden mellan två procentsatser. Procent jämför ökningen med det ursprungliga värdet.",
    "steg": [
      {
        "rubrik": "Beräkna skillnaden i procentenheter",
        "text": "Subtrahera procentsatserna.",
        "matte": "\\[3-2=1\\ \\text{procentenhet}\\]"
      },
      {
        "rubrik": "Beräkna ökningen i procent",
        "text": "Jämför ökningen med den ursprungliga räntan, 2 %.",
        "matte": "\\[\\frac{1}{2}=0{,}50=50\\ \\%\\]"
      }
    ],
    "svar": "Räntan har ökat med 1 procentenhet, vilket är en ökning med \\(50\\ \\%\\).",
    "komihag": "Använd procentenheter när du jämför två procentsatser med varandra."
  },
  "ma1-grund-3-10": {
    "kap": 3,
    "omr": "forandringsfaktor",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Förändringsfaktor vid ökning och minskning",
    "niva": "E",
    "t": "<p>En jacka kostar 800 kr och priset höjs med 15 %. Ett par skor kostar 600 kr och priset sänks med 30 %. Beräkna de nya priserna.</p>",
    "ram": "Förändringsfaktorn visar hur stor det nya värdet är jämfört med det gamla. Du får det nya värdet med en enda multiplikation.",
    "steg": [
      {
        "rubrik": "Bestäm förändringsfaktorerna",
        "text": "En ökning med 15 % ger 115 %. En minskning med 30 % lämnar 70 %.",
        "matte": "\\[1+0{,}15=1{,}15,\\qquad 1-0{,}30=0{,}70\\]"
      },
      {
        "rubrik": "Multiplicera med förändringsfaktorn",
        "text": "Gamla värdet gånger förändringsfaktorn ger nya värdet.",
        "matte": "\\[800\\cdot1{,}15=920,\\qquad 600\\cdot0{,}70=420\\]"
      }
    ],
    "svar": "Jackan kostar \\(920\\) kr och skorna \\(420\\) kr.",
    "komihag": "Nytt värde = förändringsfaktor · gammalt värde. Faktor större än 1 betyder ökning, mindre än 1 minskning."
  },
  "ma1-grund-3-11": {
    "kap": 3,
    "omr": "forandringsfaktor",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna en procentuell förändring",
    "niva": "E",
    "t": "<p>Ett månadskort höjs från 550 kr till 605 kr. Med hur många procent har priset ökat?</p>",
    "ram": "Dela det nya värdet med det gamla. Då får du förändringsfaktorn, och den visar förändringen i procent.",
    "steg": [
      {
        "rubrik": "Beräkna förändringsfaktorn",
        "text": "Nya värdet delat med gamla värdet.",
        "matte": "\\[\\frac{605}{550}=1{,}10\\]"
      },
      {
        "rubrik": "Tolka förändringsfaktorn",
        "text": "1,10 betyder 110 % av det gamla priset, alltså 10 % mer.",
        "matte": "\\[1{,}10-1=0{,}10=10\\ \\%\\]"
      }
    ],
    "svar": "Priset har ökat med \\(10\\ \\%\\).",
    "komihag": "Jämför alltid med det ursprungliga värdet. Ökningen 55 kr delat med 550 kr ger också 10 %."
  },
  "ma1-grund-3-12": {
    "kap": 3,
    "omr": "forandringsfaktor",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna värdet före en förändring",
    "niva": "E",
    "t": "<p>Efter en rabatt på 20 % kostar en cykel 3 600 kr. Vad kostade cykeln före rabatten?</p>",
    "ram": "Om du vet värdet efter en förändring räknar du baklänges genom att dela med förändringsfaktorn.",
    "steg": [
      {
        "rubrik": "Bestäm förändringsfaktorn",
        "text": "20 % rabatt betyder att 80 % av det gamla priset återstår.",
        "matte": "\\[0{,}80\\cdot x=3\\,600\\]"
      },
      {
        "rubrik": "Dela med förändringsfaktorn",
        "text": "Kontrollera: 20 % av 4 500 är 900, och 4 500 − 900 = 3 600.",
        "matte": "\\[x=\\frac{3\\,600}{0{,}80}=4\\,500\\]"
      }
    ],
    "svar": "Cykeln kostade \\(4\\,500\\) kr.",
    "komihag": "Gammalt värde = nytt värde / förändringsfaktorn.",
    "fallgrop": "Lägg inte till 20 % av 3 600 kr. Rabatten räknades på det gamla priset, inte på det nya."
  },
  "ma1-grund-3-13": {
    "kap": 3,
    "omr": "upprepade_forandringar",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Upprepade förändringar",
    "niva": "E",
    "t": "<p>Ett hus är värt 2 400 000 kr. Värdet ökar med 4 % per år. Vad är huset värt efter 5 år?</p>",
    "ram": "Vid upprepade procentuella förändringar multipliceras värdet med förändringsfaktorn en gång för varje period.",
    "steg": [
      {
        "rubrik": "Bestäm förändringsfaktorn",
        "text": "En ökning med 4 % ger förändringsfaktorn 1,04.",
        "matte": "\\[1+0{,}04=1{,}04\\]"
      },
      {
        "rubrik": "Multiplicera fem gånger",
        "text": "Fem lika förändringar skrivs som en potens.",
        "matte": "\\[2\\,400\\,000\\cdot1{,}04^5\\approx2\\,400\\,000\\cdot1{,}2167\\approx2\\,920\\,000\\]"
      },
      {
        "rubrik": "Kontrollera med kalkylblad",
        "text": "Skriv 2400000 i cell B2 och formeln =B2*1,04 i B3. Kopiera formeln nedåt. På rad 7, efter fem år, står samma värde."
      }
    ],
    "svar": "Huset är värt ungefär \\(2{,}92\\) miljoner kr.",
    "komihag": "Nytt värde = gammalt värde · \\(a^n\\), där a är förändringsfaktorn och n antalet perioder.",
    "fallgrop": "Räkna inte 5 · 4 % = 20 %. Varje ökning räknas på ett nytt, större värde, så den totala ökningen blir mer än 20 %."
  },
  "ma1-grund-3-14": {
    "kap": 3,
    "omr": "upprepade_forandringar",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Två förändringar efter varandra",
    "niva": "E",
    "t": "<p>Ett pris höjs först med 20 % och sänks sedan med 20 %. Är priset då detsamma som från början?</p>",
    "ram": "Två förändringar efter varandra ger en total förändringsfaktor. Den får du genom att multiplicera faktorerna.",
    "steg": [
      {
        "rubrik": "Skriv båda förändringsfaktorerna",
        "text": "En höjning med 20 % ger 1,20 och en sänkning med 20 % ger 0,80."
      },
      {
        "rubrik": "Multiplicera faktorerna",
        "text": "Den totala faktorn visar vad som återstår av det ursprungliga priset.",
        "matte": "\\[1{,}20\\cdot0{,}80=0{,}96\\]"
      },
      {
        "rubrik": "Tolka resultatet",
        "text": "0,96 betyder 96 % av det ursprungliga priset.",
        "matte": "\\[1-0{,}96=0{,}04=4\\ \\%\\]"
      }
    ],
    "svar": "Nej. Priset har totalt sjunkit med \\(4\\ \\%\\).",
    "komihag": "Sänkningen räknas på det höjda priset, som är större. Därför tar den bort mer än höjningen lade till."
  },
  "ma1-grund-3-15": {
    "kap": 3,
    "omr": "index",
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Räkna med index",
    "niva": "E",
    "t": "<p>Ett prisindex var 120 år 2018 och 150 år 2025. En vara kostade 400 kr år 2018. Vad borde den kosta år 2025 om priset har följt index?</p>",
    "ram": "Ett index jämför värden med ett basår. Kvoten mellan två indextal är förändringsfaktorn mellan åren.",
    "steg": [
      {
        "rubrik": "Beräkna förändringsfaktorn",
        "text": "Dela det senare indextalet med det tidigare.",
        "matte": "\\[\\frac{150}{120}=1{,}25\\]"
      },
      {
        "rubrik": "Räkna om priset",
        "text": "Priset ska ändras lika mycket som index.",
        "matte": "\\[400\\cdot1{,}25=500\\]"
      }
    ],
    "svar": "Varan borde kosta \\(500\\) kr.",
    "komihag": "Pris och index är proportionella: nytt pris / gammalt pris = nytt index / gammalt index."
  },
  "ma1-grund-3-16": {
    "kap": 3,
    "omr": [
      "ranta",
      "ranta_lan"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Ränta på sparade pengar",
    "niva": "E",
    "t": "<p>Du sätter in 15 000 kr på ett sparkonto med räntan 2,5 % per år. Räntan läggs till på kontot varje år. Hur mycket finns på kontot efter 1 år och efter 6 år?</p>",
    "ram": "Ränta är en procentuell ökning. När räntan läggs till kapitalet får du ränta på räntan, alltså en upprepad förändring.",
    "steg": [
      {
        "rubrik": "Beräkna beloppet efter ett år",
        "text": "Räntan 2,5 % ger förändringsfaktorn 1,025.",
        "matte": "\\[15\\,000\\cdot1{,}025=15\\,375\\]"
      },
      {
        "rubrik": "Använd förändringsfaktorn sex gånger",
        "text": "Varje år räknas räntan på det nya beloppet.",
        "matte": "\\[15\\,000\\cdot1{,}025^6\\approx17\\,395\\]"
      }
    ],
    "svar": "Efter 1 år finns \\(15\\,375\\) kr och efter 6 år ungefär \\(17\\,395\\) kr.",
    "komihag": "Ränta på ränta gör att ökningen blir lite större för varje år."
  },
  "ma1-grund-3-17": {
    "kap": 3,
    "omr": [
      "amortering",
      "ranta_lan"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Rak amortering",
    "niva": "E",
    "t": "<p>Ett lån på 60 000 kr ska betalas tillbaka med lika stora amorteringar under 5 år. Räntan är 6 % per år. Hur mycket betalar du det första året och det andra året?</p>",
    "ram": "Amortering är den del av lånet du betalar tillbaka. Räntan räknas på den skuld som återstår, så räntan minskar när skulden minskar.",
    "steg": [
      {
        "rubrik": "Beräkna amorteringen",
        "text": "Lånet delas upp på fem lika delar.",
        "matte": "\\[\\frac{60\\,000}{5}=12\\,000\\]"
      },
      {
        "rubrik": "Beräkna första årets betalning",
        "text": "Räntan räknas på hela skulden.",
        "matte": "\\[0{,}06\\cdot60\\,000=3\\,600,\\qquad 12\\,000+3\\,600=15\\,600\\]"
      },
      {
        "rubrik": "Beräkna andra årets betalning",
        "text": "Nu är skulden 60 000 − 12 000 = 48 000 kr.",
        "matte": "\\[0{,}06\\cdot48\\,000=2\\,880,\\qquad 12\\,000+2\\,880=14\\,880\\]"
      }
    ],
    "svar": "Första året betalar du \\(15\\,600\\) kr och andra året \\(14\\,880\\) kr.",
    "komihag": "Årets betalning = amortering + ränta på den skuld som finns kvar."
  },
  "ma1-grund-4-01": {
    "kap": 4,
    "omr": [
      "pythagoras",
      "pythagoras_sats"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna hypotenusan",
    "niva": "E",
    "t": "<p>Beräkna längden x i den rätvinkliga triangeln.</p><svg class=\"dg\" viewBox=\"0 0 312 222\" role=\"img\" aria-label=\"Rätvinklig triangel. Den vågräta kateten är 8 cm och den lodräta kateten är 6 cm. Hypotenusan är markerad med x.\" style=\"display:block;width:min(100%,300px);height:auto;margin:14px auto 4px\"><path class=\"dg-form\" d=\"M34 182L242 182L242 26Z\"/><path class=\"dg-vinkel\" d=\"M228 182V168H242\"/><g class=\"dg-txt dg-mat\"><text x=\"138\" y=\"208\" text-anchor=\"middle\">8 cm</text><text x=\"254\" y=\"109\">6 cm</text><text x=\"127.2\" y=\"94.6\" text-anchor=\"middle\"><tspan font-style=\"italic\">x</tspan></text></g></svg>",
    "ram": "I en rätvinklig triangel är hypotenusan den längsta sidan. Den står mitt emot den räta vinkeln. Pythagoras sats säger att a² + b² = c², där c är hypotenusan.",
    "steg": [
      {
        "rubrik": "Sätt in kateterna",
        "text": "Kateterna är 6 cm och 8 cm. Hypotenusan x är okänd.",
        "matte": "\\[6^2+8^2=x^2\\]"
      },
      {
        "rubrik": "Beräkna och dra roten ur",
        "text": "Längden är positiv, så bara den positiva roten gäller.",
        "matte": "\\[36+64=100\\quad\\Rightarrow\\quad x=\\sqrt{100}=10\\]"
      }
    ],
    "svar": "\\(x=10\\) cm.",
    "komihag": "Hypotenusan står alltid ensam i sitt led: a² + b² = c²."
  },
  "ma1-grund-4-02": {
    "kap": 4,
    "omr": [
      "pythagoras",
      "pythagoras_sats"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna en katet",
    "niva": "E",
    "t": "<p>Beräkna längden x i den rätvinkliga triangeln.</p><svg class=\"dg\" viewBox=\"0 0 332 161\" role=\"img\" aria-label=\"Rätvinklig triangel. Hypotenusan är 13 cm och den lodräta kateten är 5 cm. Den vågräta kateten är markerad med x.\" style=\"display:block;width:min(100%,320px);height:auto;margin:14px auto 4px\"><path class=\"dg-form\" d=\"M34 121L262 121L262 26Z\"/><path class=\"dg-vinkel\" d=\"M248 121V107H262\"/><g class=\"dg-txt dg-mat\"><text x=\"148\" y=\"147\" text-anchor=\"middle\"><tspan font-style=\"italic\">x</tspan></text><text x=\"274\" y=\"78.5\">5 cm</text><text x=\"141.08\" y=\"61.88\" text-anchor=\"middle\">13 cm</text></g></svg>",
    "ram": "När hypotenusan är känd och en katet är okänd använder du samma sats, men du subtraherar i stället för att addera.",
    "steg": [
      {
        "rubrik": "Ställ upp Pythagoras sats",
        "text": "Hypotenusan är 13 cm och ska stå ensam i högerledet.",
        "matte": "\\[x^2+5^2=13^2\\]"
      },
      {
        "rubrik": "Lös ut x",
        "text": "Subtrahera 25 i båda leden och dra roten ur.",
        "matte": "\\[x^2=169-25=144\\quad\\Rightarrow\\quad x=\\sqrt{144}=12\\]"
      }
    ],
    "svar": "\\(x=12\\) cm.",
    "komihag": "En katet är alltid kortare än hypotenusan. Får du ett längre svar har du troligen adderat i stället för att subtrahera."
  },
  "ma1-grund-4-03": {
    "kap": 4,
    "omr": [
      "pythagoras",
      "pythagoras_sats"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Kontrollera en rät vinkel",
    "niva": "E",
    "t": "<p>En snickare vill kontrollera att ett hörn är rätt. Hon mäter 60 cm längs ena väggen och 80 cm längs den andra. Avståndet mellan mätpunkterna är 100 cm. Är vinkeln rät?</p>",
    "ram": "Pythagoras sats gäller åt båda hållen. Om a² + b² = c² för sidorna i en triangel, så är vinkeln mitt emot c rät.",
    "steg": [
      {
        "rubrik": "Beräkna summan av kvadraterna på de korta sidorna",
        "text": "De två sträckorna längs väggarna är triangelns kortare sidor.",
        "matte": "\\[60^2+80^2=3\\,600+6\\,400=10\\,000\\]"
      },
      {
        "rubrik": "Jämför med kvadraten på den längsta sidan",
        "text": "Värdena är lika, så sambandet stämmer.",
        "matte": "\\[100^2=10\\,000\\]"
      }
    ],
    "svar": "Ja, vinkeln är rät eftersom \\(60^2+80^2=100^2\\).",
    "komihag": "3, 4, 5 och alla multiplar av dem, till exempel 60, 80, 100, ger alltid en rät vinkel."
  },
  "ma1-grund-4-04": {
    "kap": 4,
    "omr": [
      "sinus_cosinus_tangens",
      "trigonometri"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna en sida med tangens",
    "niva": "E",
    "t": "<p>Beräkna x i triangeln. Svara med en decimal.</p><svg class=\"dg\" viewBox=\"0 0 344 234.05\" role=\"img\" aria-label=\"Rätvinklig triangel med vinkeln 35 grader nere till vänster. Den närliggande kateten är 12 cm. Den motstående kateten är markerad med x.\" style=\"display:block;width:min(100%,320px);height:auto;margin:14px auto 4px\"><path class=\"dg-form\" d=\"M34 194.05L274 194.05L274 26Z\"/><path class=\"dg-vinkel\" d=\"M260 194.05V180.05H274\"/><path class=\"dg-delta\" d=\"M68 194.05A34 34 0 0 0 61.85 174.55\"/><text class=\"dg-etikett\" x=\"92.98\" y=\"183.42\">35°</text><g class=\"dg-txt dg-mat\"><text x=\"154\" y=\"220.05\" text-anchor=\"middle\">12 cm</text><text x=\"286\" y=\"115.02\"><tspan font-style=\"italic\">x</tspan></text></g></svg>",
    "ram": "I en rätvinklig triangel namnger du kateterna utifrån den vinkel du räknar med. Motstående katet står mitt emot vinkeln, och närliggande katet ligger bredvid den.",
    "steg": [
      {
        "rubrik": "Namnge sidorna",
        "text": "Sett från vinkeln 35° är x motstående katet och 12 cm närliggande katet. Hypotenusan behövs inte."
      },
      {
        "rubrik": "Välj tangens",
        "text": "Tangens kopplar ihop just motstående och närliggande katet.",
        "matte": "\\[\\tan35^\\circ=\\frac{x}{12}\\]"
      },
      {
        "rubrik": "Lös ut x",
        "text": "Multiplicera båda leden med 12. Kontrollera att räknaren står i grader.",
        "matte": "\\[x=12\\cdot\\tan35^\\circ\\approx8{,}4\\]"
      }
    ],
    "svar": "\\(x\\approx8{,}4\\) cm.",
    "komihag": "\\(\\sin v=\\dfrac{\\text{mot}}{\\text{hyp}}\\), \\(\\cos v=\\dfrac{\\text{när}}{\\text{hyp}}\\), \\(\\tan v=\\dfrac{\\text{mot}}{\\text{när}}\\)."
  },
  "ma1-grund-4-05": {
    "kap": 4,
    "omr": [
      "strackor_vinklar",
      "sinus_cosinus_tangens",
      "trigonometri"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Okänd hypotenusa",
    "niva": "E",
    "t": "<p>Beräkna x i triangeln. Svara med en decimal.</p><svg class=\"dg\" viewBox=\"0 0 304.21 234\" role=\"img\" aria-label=\"Rätvinklig triangel med vinkeln 40 grader nere till vänster. Den motstående kateten är 7 cm. Hypotenusan är markerad med x.\" style=\"display:block;width:min(100%,300px);height:auto;margin:14px auto 4px\"><path class=\"dg-form\" d=\"M34 194L234.21 194L234.21 26Z\"/><path class=\"dg-vinkel\" d=\"M220.21 194V180H234.21\"/><path class=\"dg-delta\" d=\"M68 194A34 34 0 0 0 60.05 172.15\"/><text class=\"dg-etikett\" x=\"92.67\" y=\"181.64\">40°</text><g class=\"dg-txt dg-mat\"><text x=\"246.21\" y=\"115\">7 cm</text><text x=\"122.54\" y=\"101.21\" text-anchor=\"middle\"><tspan font-style=\"italic\">x</tspan></text></g></svg>",
    "ram": "När den okända sidan hamnar i nämnaren behöver du ett extra steg när du löser ut den.",
    "steg": [
      {
        "rubrik": "Välj sinus",
        "text": "Sett från vinkeln 40° är 7 cm motstående katet och x hypotenusa.",
        "matte": "\\[\\sin40^\\circ=\\frac{7}{x}\\]"
      },
      {
        "rubrik": "Få bort x ur nämnaren",
        "text": "Multiplicera båda leden med x och dela sedan med sin 40°.",
        "matte": "\\[x\\cdot\\sin40^\\circ=7\\quad\\Rightarrow\\quad x=\\frac{7}{\\sin40^\\circ}\\approx10{,}9\\]"
      }
    ],
    "svar": "\\(x\\approx10{,}9\\) cm.",
    "komihag": "Hypotenusan ska vara längre än kateterna. 10,9 cm är längre än 7 cm, så svaret är rimligt."
  },
  "ma1-grund-4-06": {
    "kap": 4,
    "omr": [
      "arcusfunktioner",
      "trigonometri"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna en vinkel",
    "niva": "E",
    "t": "<p>Beräkna vinkeln v. Svara med en decimal.</p><svg class=\"dg\" viewBox=\"0 0 320 256.49\" role=\"img\" aria-label=\"Rätvinklig triangel med vinkeln v nere till vänster. Den närliggande kateten är 9 cm och hypotenusan är 12 cm.\" style=\"display:block;width:min(100%,300px);height:auto;margin:14px auto 4px\"><path class=\"dg-form\" d=\"M34 216.49L250 216.49L250 26Z\"/><path class=\"dg-vinkel\" d=\"M236 216.49V202.49H250\"/><path class=\"dg-delta\" d=\"M68 216.49A34 34 0 0 0 59.5 194.01\"/><text class=\"dg-etikett\" x=\"92.58\" y=\"203.64\"><tspan font-style=\"italic\">v</tspan></text><g class=\"dg-txt dg-mat\"><text x=\"142\" y=\"242.49\" text-anchor=\"middle\">9 cm</text><text x=\"130.09\" y=\"112.75\" text-anchor=\"middle\">12 cm</text></g></svg>",
    "ram": "När två sidor är kända och vinkeln är okänd räknar du först ut kvoten mellan sidorna. Sedan tar du fram vinkeln med räknarens inversa funktion.",
    "steg": [
      {
        "rubrik": "Välj cosinus",
        "text": "Sett från v är 9 cm närliggande katet och 12 cm hypotenusa.",
        "matte": "\\[\\cos v=\\frac{9}{12}=0{,}75\\]"
      },
      {
        "rubrik": "Använd inversen",
        "text": "Räknarens cos⁻¹ ger den vinkel som har cosinusvärdet 0,75.",
        "matte": "\\[v=\\cos^{-1}(0{,}75)\\approx41{,}4^\\circ\\]"
      }
    ],
    "svar": "\\(v\\approx41{,}4^\\circ\\).",
    "komihag": "cos⁻¹ betyder inte 1/cos. Det är den funktion som går från kvot tillbaka till vinkel."
  },
  "ma1-grund-4-07": {
    "kap": 4,
    "omr": [
      "vektorer",
      "vektor_skalar"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Vektor eller skalär",
    "niva": "E",
    "t": "<p>Vilka av storheterna är vektorer: 20 m/s norrut, 5 kg, 30 N rakt uppåt och 21 °C?</p>",
    "ram": "En skalär beskrivs helt av ett tal med enhet. En vektor har både storlek och riktning.",
    "steg": [
      {
        "rubrik": "Leta efter en riktning",
        "text": "20 m/s norrut och 30 N rakt uppåt anger båda en riktning. De är vektorer."
      },
      {
        "rubrik": "Kontrollera de övriga",
        "text": "Massan 5 kg och temperaturen 21 °C har ingen riktning. De är skalärer."
      }
    ],
    "svar": "20 m/s norrut och 30 N rakt uppåt är vektorer. 5 kg och 21 °C är skalärer.",
    "komihag": "Fråga dig om det är meningsfullt att säga åt vilket håll storheten pekar."
  },
  "ma1-grund-4-08": {
    "kap": 4,
    "omr": [
      "vektor_addition_subtraktion",
      "vektorer"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Addera vektorer",
    "niva": "E",
    "t": "<p>Vektorerna u = (3, 1) och v = (1, 2) är ritade i figuren. Bestäm u + v.</p><svg class=\"dg\" viewBox=\"0 0 294 242\" role=\"img\" aria-label=\"Tre vektorer i ett rutnät. Vektorn u går från origo till (3, 1). Vektorn v börjar där u slutar och går ett steg åt höger och två steg uppåt till (4, 3). Summan u + v går direkt från origo till (4, 3).\" style=\"display:block;width:min(100%,320px);height:auto;margin:14px auto 4px\"><path class=\"dg-rut\" d=\"M34 28V212M80 28V212M126 28V212M172 28V212M218 28V212M264 28V212M34 212H264M34 166H264M34 120H264M34 74H264M34 28H264\"/><path class=\"dg-axel\" d=\"M34 212H274M34 212V18\"/><path class=\"dg-pil\" d=\"M282 212l-10-4.5v9zM34 10l-4.5 10h9z\"/><g class=\"dg-txt\"><text x=\"80\" y=\"231\" text-anchor=\"middle\">1</text><text x=\"126\" y=\"231\" text-anchor=\"middle\">2</text><text x=\"172\" y=\"231\" text-anchor=\"middle\">3</text><text x=\"218\" y=\"231\" text-anchor=\"middle\">4</text><text x=\"264\" y=\"231\" text-anchor=\"middle\">5</text><text x=\"26\" y=\"171\" text-anchor=\"end\">1</text><text x=\"26\" y=\"125\" text-anchor=\"end\">2</text><text x=\"26\" y=\"79\" text-anchor=\"end\">3</text><text x=\"26\" y=\"33\" text-anchor=\"end\">4</text><text x=\"26\" y=\"231\" text-anchor=\"end\">0</text><text x=\"278\" y=\"203\" text-anchor=\"end\" font-style=\"italic\">x</text><text x=\"44\" y=\"22\" font-style=\"italic\">y</text></g><path class=\"dg-vek3\" d=\"M34 212L208.4 81.2\"/><path class=\"dg-spets3\" d=\"M218 74L211.7 85.6L205.1 76.8Z\"/><path class=\"dg-vek1\" d=\"M34 212L160.62 169.79\"/><path class=\"dg-spets1\" d=\"M172 166L162.36 175.01L158.88 164.58Z\"/><path class=\"dg-vek2\" d=\"M172 166L212.63 84.73\"/><path class=\"dg-spets2\" d=\"M218 74L217.55 87.19L207.71 82.27Z\"/><g class=\"dg-etikett\"><text x=\"107.6\" y=\"202.7\" class=\"dg-e1\">u</text><text x=\"209.6\" y=\"120\" class=\"dg-e2\">v</text><text x=\"108.2\" y=\"130.4\" class=\"dg-e3\" text-anchor=\"end\">u + v</text></g></svg>",
    "ram": "En vektor kan skrivas med koordinater: hur långt den går i x-led och i y-led. Du adderar vektorer genom att lägga dem efter varandra.",
    "steg": [
      {
        "rubrik": "Lägg vektorerna efter varandra",
        "text": "Rita v med start där u slutar. Summan går från början av u till slutet av v."
      },
      {
        "rubrik": "Addera koordinaterna",
        "text": "Addera x-koordinaterna för sig och y-koordinaterna för sig.",
        "matte": "\\[u+v=(3+1,\\ 1+2)=(4,\\ 3)\\]"
      }
    ],
    "svar": "\\(u+v=(4,\\,3)\\).",
    "komihag": "Grafiskt: huvud mot svans. Med koordinater: addera x med x och y med y."
  },
  "ma1-grund-4-09": {
    "kap": 4,
    "omr": [
      "vektor_absolutbelopp",
      "vektorer"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "En vektors längd",
    "niva": "E",
    "t": "<p>Beräkna längden av vektorn w = (4, 3).</p>",
    "ram": "En vektor i planet bildar hypotenusan i en rätvinklig triangel där kateterna är vektorns koordinater.",
    "steg": [
      {
        "rubrik": "Använd Pythagoras sats",
        "text": "Kateterna är 4 och 3.",
        "matte": "\\[|w|^2=4^2+3^2=16+9=25\\]"
      },
      {
        "rubrik": "Dra roten ur",
        "text": "Längden är positiv.",
        "matte": "\\[|w|=\\sqrt{25}=5\\]"
      }
    ],
    "svar": "\\(|w|=5\\).",
    "komihag": "Längden av \\((a,\\,b)\\) är \\(\\sqrt{a^2+b^2}\\)."
  },
  "ma1-grund-4-10": {
    "kap": 4,
    "omr": [
      "vektor_skalar",
      "vektorer"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Multiplicera en vektor med ett tal",
    "niva": "E",
    "t": "<p>Låt u = (3, 1) och v = (1, 2). Beräkna 2u − v.</p>",
    "ram": "När en vektor multipliceras med ett tal multipliceras båda koordinaterna. Vektorn får samma riktning men blir längre eller kortare.",
    "steg": [
      {
        "rubrik": "Beräkna 2u",
        "text": "Multiplicera båda koordinaterna med 2.",
        "matte": "\\[2u=(2\\cdot3,\\ 2\\cdot1)=(6,\\ 2)\\]"
      },
      {
        "rubrik": "Subtrahera v",
        "text": "Subtrahera koordinat för koordinat.",
        "matte": "\\[2u-v=(6-1,\\ 2-2)=(5,\\ 0)\\]"
      }
    ],
    "svar": "\\(2u-v=(5,\\,0)\\).",
    "komihag": "Att subtrahera v är samma sak som att addera −v, alltså v med motsatt riktning."
  },
  "ma1-grund-5-01": {
    "kap": 5,
    "omr": [
      "grundlaggande_sannolikhet",
      "sannolikhet"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beräkna en enkel sannolikhet",
    "niva": "E",
    "t": "<p>Du slår en vanlig tärning. Vad är sannolikheten att du får ett tal som är större än 4?</p>",
    "ram": "Om alla utfall är lika sannolika är sannolikheten antalet gynnsamma utfall delat med antalet möjliga utfall.",
    "steg": [
      {
        "rubrik": "Räkna utfallen",
        "text": "En tärning har sex lika sannolika utfall. Talen 5 och 6 är större än 4, så två utfall är gynnsamma."
      },
      {
        "rubrik": "Dela gynnsamma med möjliga",
        "text": "Förkorta bråket.",
        "matte": "\\[P(\\text{större än 4})=\\frac26=\\frac13\\approx0{,}33\\]"
      }
    ],
    "svar": "\\(P=\\frac13\\approx0{,}33\\).",
    "komihag": "En sannolikhet ligger alltid mellan 0 och 1. Den kan skrivas som bråk, decimaltal eller i procent."
  },
  "ma1-grund-5-02": {
    "kap": 5,
    "omr": [
      "komplementhandelse",
      "sannolikhet"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Komplementhändelse",
    "niva": "E",
    "t": "<p>Sannolikheten att en slumpvis vald lampa från en fabrik är trasig är 0,04. Vad är sannolikheten att lampan fungerar?</p>",
    "ram": "Komplementhändelsen är att händelsen inte inträffar. Tillsammans är sannolikheterna alltid 1.",
    "steg": [
      {
        "rubrik": "Se att händelserna är varandras komplement",
        "text": "En lampa är antingen trasig eller hel. Det finns inget tredje utfall."
      },
      {
        "rubrik": "Subtrahera från 1",
        "text": "Sannolikheten för en fungerande lampa är det som återstår av 1.",
        "matte": "\\[P(\\text{fungerar})=1-0{,}04=0{,}96\\]"
      }
    ],
    "svar": "\\(P=0{,}96\\), alltså \\(96\\ \\%\\).",
    "komihag": "\\(P(\\text{inte }A)=1-P(A)\\). Tänk på komplementet när en fråga säger minst en."
  },
  "ma1-grund-5-03": {
    "kap": 5,
    "omr": [
      "oberoende_handelser",
      "flerstegsforsok"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Oberoende händelser",
    "niva": "E",
    "t": "<p>Du slår en tärning och singlar en slant. Vad är sannolikheten att få en sexa och krona?</p>",
    "ram": "Två händelser är oberoende om den ena inte påverkar den andra. Sannolikheten att båda inträffar är produkten av sannolikheterna.",
    "steg": [
      {
        "rubrik": "Bestäm varje sannolikhet för sig",
        "text": "En tärning har sex lika sannolika utfall och en slant har två.",
        "matte": "\\[P(\\text{sexa})=\\frac16,\\qquad P(\\text{krona})=\\frac12\\]"
      },
      {
        "rubrik": "Multiplicera",
        "text": "Myntet påverkas inte av tärningen.",
        "matte": "\\[P(\\text{sexa och krona})=\\frac16\\cdot\\frac12=\\frac1{12}\\approx0{,}083\\]"
      }
    ],
    "svar": "\\(P=\\frac1{12}\\approx0{,}083\\).",
    "komihag": "Och betyder multiplikation när händelserna är oberoende."
  },
  "ma1-grund-5-04": {
    "kap": 5,
    "omr": [
      "beroende_handelser",
      "flerstegsforsok"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Beroende händelser",
    "niva": "E",
    "t": "<p>En påse innehåller 4 röda och 6 blå kulor. Du drar två kulor utan att lägga tillbaka den första. Vad är sannolikheten att båda är röda?</p>",
    "ram": "När du inte lägger tillbaka kulan ändras innehållet i påsen. Den andra dragningen beror då på den första.",
    "steg": [
      {
        "rubrik": "Första dragningen",
        "text": "Fyra av tio kulor är röda.",
        "matte": "\\[P(\\text{röd först})=\\frac4{10}\\]"
      },
      {
        "rubrik": "Andra dragningen",
        "text": "Om den första var röd finns tre röda kvar bland nio kulor.",
        "matte": "\\[P(\\text{röd sedan})=\\frac39\\]"
      },
      {
        "rubrik": "Multiplicera",
        "text": "Båda händelserna måste inträffa längs samma väg.",
        "matte": "\\[\\frac4{10}\\cdot\\frac39=\\frac{12}{90}=\\frac2{15}\\approx0{,}13\\]"
      }
    ],
    "svar": "\\(P=\\frac2{15}\\approx0{,}13\\).",
    "komihag": "Ändra både antalet gynnsamma och antalet möjliga utfall efter varje dragning utan återläggning."
  },
  "ma1-grund-5-05": {
    "kap": 5,
    "omr": [
      "sannolikhet_flera_steg",
      "flerstegsforsok"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Använda träddiagram",
    "niva": "E",
    "t": "<p>Sannolikheten att en buss är sen är 0,2 varje dag, oberoende av andra dagar. Vad är sannolikheten att bussen är sen exakt en av två dagar?</p>",
    "ram": "Ett träddiagram visar alla vägar genom ett försök i flera steg. Längs en väg multiplicerar du, och mellan olika vägar adderar du.",
    "steg": [
      {
        "rubrik": "Rita trädet",
        "text": "Varje dag har två grenar: sen med 0,2 och i tid med 0,8. Två vägar ger exakt en sen dag: sen–i tid och i tid–sen.",
        "figur": "<svg class=\"dg\" viewBox=\"0 0 440 250\" role=\"img\" aria-label=\"Träddiagram i två steg. Första grenparet visar dag 1: sen med sannolikheten 0,2 och i tid med 0,8. Från varje utfall går två nya grenar för dag 2 med samma sannolikheter. Grenarna sen–i tid och i tid–sen är markerade.\" style=\"display:block;width:min(100%,420px);height:auto;margin:14px auto 4px\"><path class=\"dg-grenar\" d=\"M30 125L166 62\"/><text class=\"dg-txt\" x=\"94\" y=\"85.5\" text-anchor=\"middle\">0,2</text><text class=\"dg-txt dg-nod\" x=\"174\" y=\"67\">sen</text><path class=\"dg-grenar\" d=\"M220 62L326 30\"/><text class=\"dg-txt\" x=\"275\" y=\"39\" text-anchor=\"middle\">0,2</text><text class=\"dg-txt dg-nod\" x=\"334\" y=\"35\">sen</text><path class=\"dg-gren-vald\" d=\"M220 62L326 94\"/><text class=\"dg-txt\" x=\"275\" y=\"95\" text-anchor=\"middle\">0,8</text><text class=\"dg-etikett\" x=\"334\" y=\"99\">i tid</text><path class=\"dg-grenar\" d=\"M30 125L166 188\"/><text class=\"dg-txt\" x=\"94\" y=\"174.5\" text-anchor=\"middle\">0,8</text><text class=\"dg-txt dg-nod\" x=\"174\" y=\"193\">i tid</text><path class=\"dg-gren-vald\" d=\"M220 188L326 156\"/><text class=\"dg-txt\" x=\"275\" y=\"165\" text-anchor=\"middle\">0,2</text><text class=\"dg-etikett\" x=\"334\" y=\"161\">sen</text><path class=\"dg-grenar\" d=\"M220 188L326 220\"/><text class=\"dg-txt\" x=\"275\" y=\"221\" text-anchor=\"middle\">0,8</text><text class=\"dg-txt dg-nod\" x=\"334\" y=\"225\">i tid</text><circle class=\"dg-matt\" cx=\"30\" cy=\"125\" r=\"4.5\"/><g class=\"dg-txt\"><text x=\"100\" y=\"16\" text-anchor=\"middle\">dag 1</text><text x=\"275\" y=\"16\" text-anchor=\"middle\">dag 2</text></g></svg>"
      },
      {
        "rubrik": "Multiplicera längs varje väg",
        "text": "Varje markerad väg innehåller en sen dag och en dag i tid.",
        "matte": "\\[0{,}2\\cdot0{,}8=0{,}16,\\qquad 0{,}8\\cdot0{,}2=0{,}16\\]"
      },
      {
        "rubrik": "Addera vägarna",
        "text": "Båda vägarna ger det sökta resultatet.",
        "matte": "\\[0{,}16+0{,}16=0{,}32\\]"
      }
    ],
    "svar": "\\(P=0{,}32\\).",
    "komihag": "Kontrollera trädet: sannolikheterna för alla fyra vägar ska tillsammans bli 1."
  },
  "ma1-grund-5-06": {
    "kap": 5,
    "omr": [
      "urvalsmetoder",
      "statistik_urval"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Bedöma ett urval",
    "niva": "E",
    "t": "<p>Elevkåren vill veta vad skolans 900 elever tycker om maten. De frågar de 40 elever som står först i matkön. Varför kan resultatet bli missvisande, och hur kan urvalet göras bättre?</p>",
    "ram": "Ett urval ska likna hela gruppen, populationen, så mycket som möjligt. Det blir lättast om alla har samma chans att komma med.",
    "steg": [
      {
        "rubrik": "Leta efter vilka som inte kan komma med",
        "text": "De som äter någon annanstans eller kommer sent till lunchen kan inte väljas. Deras åsikter saknas i urvalet."
      },
      {
        "rubrik": "Föreslå ett slumpmässigt urval",
        "text": "Lotta till exempel fram 40 namn ur elevlistan. Då har alla elever samma chans att bli tillfrågade."
      }
    ],
    "svar": "Urvalet är inte slumpmässigt och säger mest om dem som äter i matsalen och kommer tidigt. Ett slumpmässigt urval ur hela elevlistan ger ett säkrare resultat.",
    "komihag": "Ett stort urval hjälper inte om det är skevt. Hur urvalet görs är viktigare än hur stort det är."
  },
  "ma1-grund-5-07": {
    "kap": 5,
    "omr": [
      "felkallor",
      "statistik_urval"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Hitta felkällor i en undersökning",
    "niva": "E",
    "t": "<p>En enkät skickas till 200 personer med frågan: ”Håller du med om att cykelbanorna borde byggas ut, som de flesta redan tycker?” 60 personer svarar. Ge två felkällor.</p>",
    "ram": "En felkälla är något i undersökningen som kan göra resultatet missvisande. Titta både på frågan och på vilka som svarar.",
    "steg": [
      {
        "rubrik": "Granska frågan",
        "text": "Frågan är ledande. Orden ”som de flesta redan tycker” puttar den som svarar mot ja."
      },
      {
        "rubrik": "Granska svaren",
        "text": "Bara 60 av 200 svarar. Det stora bortfallet kan ge ett skevt resultat, eftersom de som bryr sig mest om cykelbanor oftare svarar."
      }
    ],
    "svar": "Frågan är ledande, och bortfallet är stort (140 av 200 svarar inte).",
    "komihag": "Vanliga felkällor är ledande frågor, bortfall och ett urval som inte liknar populationen."
  },
  "ma1-grund-5-08": {
    "kap": 5,
    "omr": [
      "korrelation"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Korrelation och orsakssamband",
    "niva": "E",
    "t": "<p>Diagrammet visar glassförsäljning och antal drunkningsolyckor för tolv månader. Visar diagrammet att glass orsakar drunkningsolyckor?</p><svg class=\"dg\" viewBox=\"0 0 388 344\" role=\"img\" aria-label=\"Spridningsdiagram med tolv punkter, en för varje månad. På den vågräta axeln står antal sålda glassar i tusental och på den lodräta axeln antal drunkningsolyckor. Punkterna ligger nära en uppåtgående linje: månader med mer glassförsäljning har fler olyckor.\" style=\"display:block;width:min(100%,360px);height:auto;margin:14px auto 4px\"><path class=\"dg-rut\" d=\"M46 26V298M63 26V298M80 26V298M97 26V298M114 26V298M131 26V298M148 26V298M165 26V298M182 26V298M199 26V298M216 26V298M233 26V298M250 26V298M267 26V298M284 26V298M301 26V298M318 26V298M335 26V298M352 26V298M46 298H352M46 281H352M46 264H352M46 247H352M46 230H352M46 213H352M46 196H352M46 179H352M46 162H352M46 145H352M46 128H352M46 111H352M46 94H352M46 77H352M46 60H352M46 43H352M46 26H352\"/><path class=\"dg-axel\" d=\"M46 298H362M46 298V16\"/><path class=\"dg-pil\" d=\"M370 298l-10-4.5v9zM46 8l-4.5 10h9z\"/><g class=\"dg-txt\"><text x=\"38\" y=\"317\" text-anchor=\"end\">0</text><text x=\"366\" y=\"289\" text-anchor=\"end\" font-style=\"italic\"></text><text x=\"56\" y=\"20\" font-style=\"italic\"></text></g><g class=\"dg-txt\"><text x=\"97\" y=\"317\" text-anchor=\"middle\">3</text><text x=\"148\" y=\"317\" text-anchor=\"middle\">6</text><text x=\"199\" y=\"317\" text-anchor=\"middle\">9</text><text x=\"250\" y=\"317\" text-anchor=\"middle\">12</text><text x=\"301\" y=\"317\" text-anchor=\"middle\">15</text><text x=\"352\" y=\"317\" text-anchor=\"middle\">18</text><text x=\"38\" y=\"235\" text-anchor=\"end\">4</text><text x=\"38\" y=\"167\" text-anchor=\"end\">8</text><text x=\"38\" y=\"99\" text-anchor=\"end\">12</text><text x=\"38\" y=\"31\" text-anchor=\"end\">16</text><text x=\"358\" y=\"338\" text-anchor=\"end\">sålda glassar (tusental)</text><text x=\"56\" y=\"20\">drunkningsolyckor</text></g><circle class=\"dg-matt\" cx=\"63\" cy=\"264\" r=\"5\"/><circle class=\"dg-matt\" cx=\"80\" cy=\"247\" r=\"5\"/><circle class=\"dg-matt\" cx=\"97\" cy=\"247\" r=\"5\"/><circle class=\"dg-matt\" cx=\"131\" cy=\"213\" r=\"5\"/><circle class=\"dg-matt\" cx=\"148\" cy=\"230\" r=\"5\"/><circle class=\"dg-matt\" cx=\"182\" cy=\"179\" r=\"5\"/><circle class=\"dg-matt\" cx=\"199\" cy=\"162\" r=\"5\"/><circle class=\"dg-matt\" cx=\"233\" cy=\"145\" r=\"5\"/><circle class=\"dg-matt\" cx=\"250\" cy=\"111\" r=\"5\"/><circle class=\"dg-matt\" cx=\"284\" cy=\"94\" r=\"5\"/><circle class=\"dg-matt\" cx=\"301\" cy=\"60\" r=\"5\"/><circle class=\"dg-matt\" cx=\"335\" cy=\"43\" r=\"5\"/></svg>",
    "ram": "Korrelation betyder att två variabler följs åt. Det är inte samma sak som att den ena orsakar den andra.",
    "steg": [
      {
        "rubrik": "Beskriv sambandet",
        "text": "Punkterna ligger nära en uppåtgående linje. Det är en stark positiv korrelation."
      },
      {
        "rubrik": "Sök en tredje variabel",
        "text": "Varma månader säljs det mer glass, och fler människor badar. Vädret påverkar båda variablerna."
      },
      {
        "rubrik": "Dra slutsatsen",
        "text": "Sambandet förklaras av vädret. Glassen orsakar inte olyckorna."
      }
    ],
    "svar": "Nej. Det finns en positiv korrelation, men båda variablerna beror på vädret.",
    "komihag": "Innan du påstår ett orsakssamband ska du fråga dig om någon annan variabel kan påverka båda."
  },
  "ma1-grund-7-01": {
    "kap": 7,
    "omr": [
      "proportionalitet_yrke",
      "proportionalitet"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Proportionalitet",
    "niva": "E",
    "t": "<p>Din timlön är 135 kr. Lönen y kronor är proportionell mot antalet arbetade timmar x. Skriv en formel och beräkna lönen för 7,5 timmar.</p>",
    "ram": "Två storheter är proportionella om den ena är ett fast tal gånger den andra. Dubbelt så lång tid ger då dubbelt så hög lön.",
    "steg": [
      {
        "rubrik": "Skriv formeln",
        "text": "Proportionalitetskonstanten är lönen för en timme.",
        "matte": "\\[y=135x\\]"
      },
      {
        "rubrik": "Sätt in antalet timmar",
        "text": "Multiplicera timlönen med 7,5 timmar.",
        "matte": "\\[y=135\\cdot7{,}5=1\\,012{,}50\\]"
      }
    ],
    "svar": "\\(y=135x\\). För 7,5 timmar blir lönen \\(1\\,012{,}50\\) kr.",
    "komihag": "Grafen till ett proportionellt samband är en rät linje genom origo."
  },
  "ma1-grund-7-02": {
    "kap": 7,
    "omr": [
      "skala_likformighet",
      "skala"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Från ritning till verklighet",
    "niva": "E",
    "t": "<p>På en ritning i skala 1:50 är ett rum 8,4 cm långt. Hur långt är rummet i verkligheten?</p>",
    "ram": "Skalan 1:50 betyder att 1 cm på ritningen motsvarar 50 cm i verkligheten.",
    "steg": [
      {
        "rubrik": "Multiplicera med skalans tal",
        "text": "Verkligheten är 50 gånger större än ritningen.",
        "matte": "\\[8{,}4\\cdot50=420\\ \\mathrm{cm}\\]"
      },
      {
        "rubrik": "Byt till en lämplig enhet",
        "text": "100 cm är 1 m.",
        "matte": "\\[420\\ \\mathrm{cm}=4{,}2\\ \\mathrm m\\]"
      }
    ],
    "svar": "Rummet är \\(4{,}2\\) m långt.",
    "komihag": "Skala = längd på bilden : längd i verkligheten. Mät båda i samma enhet."
  },
  "ma1-grund-7-03": {
    "kap": 7,
    "omr": [
      "skala_likformighet",
      "skala"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Bestämma skalan",
    "niva": "E",
    "t": "<p>En skruv är 4 mm lång. På en ritning är den 2,4 cm lång. Vilken skala är ritningen i?</p>",
    "ram": "Skalan jämför längden på ritningen med längden i verkligheten. En förstorad bild har ett större tal först.",
    "steg": [
      {
        "rubrik": "Använd samma enhet",
        "text": "2,4 cm är 24 mm."
      },
      {
        "rubrik": "Jämför längderna",
        "text": "Ritningen är 6 gånger så stor som verkligheten.",
        "matte": "\\[\\frac{24\\ \\mathrm{mm}}{4\\ \\mathrm{mm}}=6\\]"
      }
    ],
    "svar": "Skalan är \\(6:1\\).",
    "komihag": "1:50 är en förminskning och 6:1 en förstoring."
  },
  "ma1-grund-7-04": {
    "kap": 7,
    "omr": [
      "yrkesformler",
      "volym_flode"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Volym och flöde",
    "niva": "E",
    "t": "<p>En kran ger 12 liter vatten per minut. Hur lång tid tar det att fylla en balja som rymmer 0,18 m³?</p>",
    "ram": "Flöde är volym per tidsenhet. Innan du räknar måste volymen och flödet ha samma volymenhet.",
    "steg": [
      {
        "rubrik": "Byt m³ mot liter",
        "text": "1 m³ är 1 000 liter.",
        "matte": "\\[0{,}18\\ \\mathrm{m^3}=0{,}18\\cdot1\\,000=180\\ \\mathrm l\\]"
      },
      {
        "rubrik": "Dela volymen med flödet",
        "text": "Liter delat med liter per minut ger minuter.",
        "matte": "\\[\\frac{180}{12}=15\\]"
      }
    ],
    "svar": "Det tar \\(15\\) minuter.",
    "komihag": "Tid = volym / flöde. Kontrollera att enheterna tar ut varandra."
  },
  "ma1-grund-7-05": {
    "kap": 7,
    "omr": [
      "matning_enheter",
      "matning_area"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Mäta och beräkna en area",
    "niva": "E",
    "t": "<p>Du mäter ett golv med ett måttband: 4,20 m långt och 3,50 m brett. Hur stor är golvytan?</p>",
    "ram": "När du beställer golv, färg eller kakel behöver du arean. Skriv alla mått i samma enhet innan du multiplicerar.",
    "steg": [
      {
        "rubrik": "Kontrollera enheterna",
        "text": "Båda måtten är i meter. Då blir arean i kvadratmeter."
      },
      {
        "rubrik": "Multiplicera längd och bredd",
        "text": "En rektangels area är längden multiplicerad med bredden.",
        "matte": "\\[4{,}20\\cdot3{,}50=14{,}7\\ \\mathrm{m^2}\\]"
      }
    ],
    "svar": "Golvytan är \\(14{,}7\\ \\mathrm{m^2}\\).",
    "komihag": "m · m = m². Mät gärna två gånger, eftersom ett mätfel följer med i alla senare beräkningar."
  },
  "ma1-grund-7-06": {
    "kap": 7,
    "omr": [
      "spill_svinnostnad"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Räkna med spill",
    "niva": "E",
    "t": "<p>Ett golv är 14,7 m². Vid läggningen räknar man med 10 % spill. Golvet säljs i paket om 2,2 m². Hur många paket behövs?</p>",
    "ram": "Spill är material som går förlorat när det kapas och anpassas. Det läggs till innan du beräknar hur mycket du ska köpa.",
    "steg": [
      {
        "rubrik": "Lägg till spillet",
        "text": "10 % extra ger förändringsfaktorn 1,10.",
        "matte": "\\[14{,}7\\cdot1{,}10=16{,}17\\ \\mathrm{m^2}\\]"
      },
      {
        "rubrik": "Dela med paketstorleken",
        "text": "Kvoten visar hur många paket den beräknade materialåtgången motsvarar.",
        "matte": "\\[\\frac{16{,}17}{2{,}2}\\approx7{,}35\\]"
      },
      {
        "rubrik": "Avrunda uppåt",
        "text": "Du kan inte köpa en del av ett paket, och 7 paket räcker inte."
      }
    ],
    "svar": "Det behövs \\(8\\) paket.",
    "komihag": "När du köper material avrundar du alltid uppåt, även om decimalen är liten."
  },
  "ma1-grund-7-07": {
    "kap": 7,
    "omr": [
      "kostnadsberakningar",
      "kostnader"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Beräkna en totalkostnad",
    "niva": "E",
    "t": "<p>Till ett golv behövs 8 paket som kostar 389 kr per paket inklusive moms. Arbetet tar 3 timmar och kostar 450 kr per timme exklusive moms. Momsen är 25 %. Vad blir totalkostnaden inklusive moms?</p>",
    "ram": "Dela upp kostnaden i delar. Se till att alla delar är inklusive moms innan du lägger ihop dem.",
    "steg": [
      {
        "rubrik": "Materialkostnad",
        "text": "Priset är redan inklusive moms.",
        "matte": "\\[8\\cdot389=3\\,112\\]"
      },
      {
        "rubrik": "Arbetskostnad med moms",
        "text": "25 % moms ger förändringsfaktorn 1,25.",
        "matte": "\\[3\\cdot450\\cdot1{,}25=1\\,687{,}50\\]"
      },
      {
        "rubrik": "Lägg ihop",
        "text": "I ett kalkylblad kan du ha en rad per kostnad och summera med =SUMMA(). Då ser du direkt vad som händer om ett pris ändras.",
        "matte": "\\[3\\,112+1\\,687{,}50=4\\,799{,}50\\]"
      }
    ],
    "svar": "Totalkostnaden är \\(4\\,799{,}50\\) kr.",
    "komihag": "Pris inklusive moms = pris exklusive moms · 1,25 när momsen är 25 %."
  },
  "ma1-grund-7-08": {
    "kap": 7,
    "omr": [
      "sakerhetsmarginaler"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Säkerhetsfaktor",
    "niva": "E",
    "t": "<p>Ett rep går sönder vid 3 000 N. Man använder säkerhetsfaktorn 4. Hur stor kraft får repet belastas med?</p>",
    "ram": "En säkerhetsfaktor ger marginal för slitage, knutar och mätfel. Den största tillåtna lasten är brottlasten delad med säkerhetsfaktorn.",
    "steg": [
      {
        "rubrik": "Dela brottlasten med säkerhetsfaktorn",
        "text": "Säkerhetsfaktorn 4 betyder att bara en fjärdedel av brottlasten tillåts.",
        "matte": "\\[\\frac{3\\,000\\ \\mathrm N}{4}=750\\ \\mathrm N\\]"
      },
      {
        "rubrik": "Tolka svaret",
        "text": "Repet ska alltså bara användas upp till en fjärdedel av den kraft som får det att gå sönder."
      }
    ],
    "svar": "Repet får belastas med högst \\(750\\) N.",
    "komihag": "Tillåten last = brottlast / säkerhetsfaktor. En större säkerhetsfaktor ger en lägre tillåten last."
  },
  "ma1-grund-7-09": {
    "kap": 7,
    "omr": [
      "yrkesformler"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Använda en yrkesformel",
    "niva": "E",
    "t": "<p>För elektrisk effekt gäller P = U · I. En vattenkokare har effekten 2 000 W och ansluts till 230 V. Hur stor är strömmen? Svara med en decimal.</p>",
    "ram": "I en yrkesformel står varje bokstav för en storhet med en bestämd enhet. Här är P effekt i watt, U spänning i volt och I ström i ampere.",
    "steg": [
      {
        "rubrik": "Lös ut I",
        "text": "Dela båda leden med U.",
        "matte": "\\[I=\\frac PU\\]"
      },
      {
        "rubrik": "Sätt in värdena",
        "text": "Watt delat med volt ger ampere.",
        "matte": "\\[I=\\frac{2\\,000}{230}\\approx8{,}7\\ \\mathrm A\\]"
      }
    ],
    "svar": "Strömmen är ungefär \\(8{,}7\\) A.",
    "komihag": "Lös först ut den storhet du söker. Sätt sedan in värdena med rätt enheter."
  },
  "ma1-grund-7-10": {
    "kap": 7,
    "omr": [
      "yrkesformler",
      "ror_fall_vinklar"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Fall på ett rör",
    "niva": "E",
    "t": "<p>Ett avloppsrör ska ha fallet 1:100, alltså 1 cm per meter. Röret är 6,5 m långt. Hur mycket lägre ska rörets slut ligga än dess början?</p>",
    "ram": "Fall anger hur mycket något sjunker per längdenhet. 1:100 betyder att höjden ändras 1 enhet för varje 100 enheter i längd.",
    "steg": [
      {
        "rubrik": "Beräkna fallet per meter",
        "text": "1 m är 100 cm. Fallet är 1 cm per 100 cm, alltså 10 mm per meter."
      },
      {
        "rubrik": "Multiplicera med längden",
        "text": "Röret sjunker 10 mm för var och en av de 6,5 metrarna.",
        "matte": "\\[6{,}5\\cdot10=65\\ \\mathrm{mm}\\]"
      }
    ],
    "svar": "Slutet ska ligga \\(65\\) mm, alltså 6,5 cm, lägre.",
    "komihag": "Fall 1:100 fungerar som en skala. Dela längden med 100 så får du höjdskillnaden."
  },
  "ma1-grund-2-11": {
    "kap": 2,
    "omr": [
      "definitionsmangd_vardemangd"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Definitionsmängd och värdemängd",
    "niva": "E",
    "t": "<p>Funktionen \\(f\\) visas i en graf som börjar i punkten \\((-2,1)\\) och slutar i \\((4,5)\\). Grafen finns bara mellan dessa ändpunkter. Ange definitionsmängd och värdemängd.</p>",
    "ram": "Definitionsmängden beskriver vilka x-värden som är tillåtna. Värdemängden beskriver vilka y-värden funktionen faktiskt antar.",
    "steg": [
      {
        "rubrik": "Läs x-led för definitionsmängden",
        "text": "Grafen finns från x = −2 till x = 4. Ändpunkterna ingår.",
        "matte": "\\[D_f=[-2,4]\\]"
      },
      {
        "rubrik": "Läs y-led för värdemängden",
        "text": "Det minsta y-värdet är 1 och det största är 5.",
        "matte": "\\[V_f=[1,5]\\]"
      }
    ],
    "svar": "\\(D_f=[-2,4]\\) och \\(V_f=[1,5]\\).",
    "komihag": "Definitionsmängd hör till x-axeln. Värdemängd hör till y-axeln."
  },
  "ma1-grund-2-12": {
    "kap": 2,
    "omr": [
      "jamfora_modeller"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Välja mellan linjär och exponentiell modell",
    "niva": "E",
    "t": "<p>En mängd är 100 från början. Därefter är den 120, 144 och 172,8 efter lika långa tidssteg. Är en linjär eller exponentiell modell mest rimlig?</p>",
    "ram": "En linjär modell har ungefär samma förändring i antal varje steg. En exponentiell modell har ungefär samma förändringsfaktor varje steg.",
    "steg": [
      {
        "rubrik": "Kontrollera skillnaderna",
        "text": "Ökningarna är 20, 24 och 28,8. De är inte lika stora."
      },
      {
        "rubrik": "Kontrollera kvoterna",
        "text": "Varje nytt värde är 1,2 gånger det föregående.",
        "matte": "\\[120/100=144/120=172{,}8/144=1{,}2\\]"
      }
    ],
    "svar": "En exponentiell modell är mest rimlig, med förändringsfaktorn \\(1{,}2\\).",
    "komihag": "Samma differens tyder på linjär förändring. Samma kvot eller förändringsfaktor tyder på exponentiell förändring."
  },
  "ma1-grund-3-18": {
    "kap": 3,
    "omr": [
      "genomsnittlig_forandring"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Genomsnittlig procentuell förändring",
    "niva": "E",
    "t": "<p>Ett värde ökar från 100 till 121 på två lika långa perioder. Vilken lika stor procentuell ökning per period ger samma slutvärde?</p>",
    "ram": "Vid flera procentuella förändringar multipliceras förändringsfaktorer. Därför ska den genomsnittliga förändringen bestämmas med en rot, inte genom att dela den totala procentökningen med antalet perioder.",
    "steg": [
      {
        "rubrik": "Bestäm den totala förändringsfaktorn",
        "text": "Från 100 till 121 är faktorn 1,21.",
        "matte": "\\[121/100=1{,}21\\]"
      },
      {
        "rubrik": "Fördela faktorn på två perioder",
        "text": "Samma faktor q ska användas två gånger, alltså q² = 1,21.",
        "matte": "\\[q=\\sqrt{1{,}21}=1{,}10\\]"
      }
    ],
    "svar": "Den genomsnittliga ökningen är \\(10\\,\\%\\) per period.",
    "fallgrop": "Att räkna 21 % / 2 ger 10,5 %, men procentuella förändringar läggs inte ihop på det sättet när de sker efter varandra.",
    "komihag": "Sök först den genomsnittliga förändringsfaktorn. Om det är n perioder använder du n:te roten."
  },
  "ma1-grund-4-11": {
    "kap": 4,
    "omr": [
      "koordinatgeometri"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Avstånd mellan två punkter",
    "niva": "E",
    "t": "<p>Punkterna är \\(A=(1,2)\\) och \\(B=(5,5)\\). Bestäm avståndet \\(AB\\).</p>",
    "ram": "Skillnaden i x-led och skillnaden i y-led bildar kateterna i en rätvinklig triangel. Då kan Pythagoras sats användas.",
    "steg": [
      {
        "rubrik": "Bestäm förändringen i varje riktning",
        "text": "I x-led är skillnaden 5 − 1 = 4 och i y-led 5 − 2 = 3."
      },
      {
        "rubrik": "Använd Pythagoras sats",
        "text": "Avståndet är triangelns hypotenusa.",
        "matte": "\\[AB=\\sqrt{4^2+3^2}=\\sqrt{25}=5\\]"
      }
    ],
    "svar": "Avståndet är \\(5\\) längdenheter.",
    "komihag": "Tecknet på koordinatskillnaden spelar ingen roll efter kvadreringen, men använd samma ordning i båda differenserna."
  },
  "ma1-grund-5-09": {
    "kap": 5,
    "omr": [
      "kausalitet"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Korrelation är inte automatiskt orsak",
    "niva": "E",
    "t": "<p>I en undersökning har elever som sover mer i genomsnitt också högre provresultat. Kan man av detta ensam dra slutsatsen att mer sömn orsakar högre provresultat?</p>",
    "ram": "Ett statistiskt samband visar att två variabler varierar tillsammans. Det säger inte automatiskt varför sambandet finns.",
    "steg": [
      {
        "rubrik": "Identifiera vad data visar",
        "text": "Data visar ett samband mellan sömn och provresultat."
      },
      {
        "rubrik": "Fundera på andra förklaringar",
        "text": "Exempelvis studietid, stress, hälsa eller rutiner kan påverka både sömn och resultat."
      }
    ],
    "svar": "Nej. Undersökningen visar korrelation, men den räcker inte för att fastställa ett orsakssamband.",
    "komihag": "För att tala om orsak behövs starkare underlag än att två variabler samvarierar."
  },
  "ma1-grund-5-10": {
    "kap": 5,
    "omr": [
      "signifikans"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Bedöma om en skillnad är övertygande",
    "niva": "E",
    "t": "<p>I ett litet stickprov svarar 52 % ja och i ett annat 54 % ja. Räcker skillnaden på två procentenheter för att säkert säga att grupperna skiljer sig i populationen?</p>",
    "ram": "Stickprov varierar slumpmässigt. En liten skillnad mellan två stickprov kan därför uppstå även om populationerna egentligen är lika.",
    "steg": [
      {
        "rubrik": "Jämför skillnaden med osäkerheten",
        "text": "Vi känner bara de två procenttalen. Vi saknar bland annat stickprovens storlek och ett mått på osäkerheten."
      },
      {
        "rubrik": "Dra en försiktig slutsats",
        "text": "Två procentenheters skillnad är inte i sig ett bevis för en verklig skillnad i populationen."
      }
    ],
    "svar": "Nej. Mer information om stickprovens storlek och statistisk osäkerhet behövs.",
    "komihag": "Ett observerat avstånd mellan två stickprovsvärden är inte samma sak som en säker skillnad i populationen."
  },
  "ma1-grund-5-11": {
    "kap": 5,
    "omr": [
      "risk_sakerhet"
    ],
    "kurs": [
      "1a",
      "1b",
      "1c"
    ],
    "rubrik": "Tolka risk som sannolikhet",
    "niva": "E",
    "t": "<p>Risken för ett fel vid ett arbetsmoment uppskattas till 3 %. Hur många fel motsvarar det i genomsnitt per 1 000 liknande arbetsmoment?</p>",
    "ram": "En risk angiven i procent kan tolkas som en sannolikhet. Tre procent betyder 3 av 100 i en stor mängd jämförbara situationer.",
    "steg": [
      {
        "rubrik": "Skriv procenten som decimalform",
        "text": "3 % = 0,03."
      },
      {
        "rubrik": "Beräkna det förväntade antalet",
        "text": "Multiplicera antalet tillfällen med sannolikheten.",
        "matte": "\\[1000\\cdot0{,}03=30\\]"
      }
    ],
    "svar": "Det motsvarar ungefär \\(30\\) fel per 1 000 arbetsmoment.",
    "komihag": "Det är ett förväntat antal över många liknande situationer, inte ett löfte om exakt 30 fel i varje serie."
  },
  "ma1-grund-7-11": {
    "kap": 7,
    "omr": [
      "uppskattning_overslag"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Överslag i en arbetssituation",
    "niva": "E",
    "t": "<p>En arbetsplats behöver ungefär 48 längder material som kostar 198 kr styck. Gör ett snabbt överslag av totalkostnaden.</p>",
    "ram": "Ett överslag ska gå snabbt och ge rätt storleksordning. Välj närliggande tal som är enkla att räkna med.",
    "steg": [
      {
        "rubrik": "Avrunda till enkla tal",
        "text": "48 ligger nära 50 och 198 nära 200."
      },
      {
        "rubrik": "Räkna överslaget",
        "text": "Multiplicera de avrundade talen.",
        "matte": "\\[50\\cdot200=10\\,000\\]"
      }
    ],
    "svar": "Totalkostnaden är ungefär \\(10\\,000\\) kr.",
    "komihag": "Ett överslag används för rimlighetskontroll och planering. Det behöver inte ge exakt samma svar som den noggranna beräkningen."
  },
  "ma1-grund-7-12": {
    "kap": 7,
    "omr": [
      "matfel_felmarginal"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Mätvärde och felmarginal",
    "niva": "E",
    "t": "<p>En längd mäts till 2,40 m med felmarginalen ±0,02 m. Mellan vilka värden kan den verkliga längden ligga enligt mätningen?</p>",
    "ram": "En felmarginal ±a betyder att du tar mätvärdet minus a för den nedre gränsen och plus a för den övre.",
    "steg": [
      {
        "rubrik": "Bestäm den nedre gränsen",
        "text": "Dra bort felmarginalen.",
        "matte": "\\[2{,}40-0{,}02=2{,}38\\]"
      },
      {
        "rubrik": "Bestäm den övre gränsen",
        "text": "Lägg till felmarginalen.",
        "matte": "\\[2{,}40+0{,}02=2{,}42\\]"
      }
    ],
    "svar": "Längden ligger enligt mätningen mellan \\(2{,}38\\) m och \\(2{,}42\\) m.",
    "komihag": "Felmarginalen beskriver ett intervall runt mätvärdet; den ska inte läggas till åt båda hållen."
  },
  "ma1-grund-7-13": {
    "kap": 7,
    "omr": [
      "yrkesverktyg"
    ],
    "kurs": [
      "1a"
    ],
    "rubrik": "Välja ett lämpligt matematiskt verktyg",
    "niva": "E",
    "t": "<p>Du ska jämföra kostnaden månad för månad för tre olika abonnemang under ett år. Vilket verktyg är mest lämpligt: huvudräkning, kalkylprogram eller gradskiva?</p>",
    "ram": "Välj verktyg efter uppgiften. När samma beräkning ska upprepas för många värden är ett kalkylprogram ofta effektivt och minskar risken för skrivfel.",
    "steg": [
      {
        "rubrik": "Identifiera arbetssättet",
        "text": "Samma typ av kostnadsberäkning ska göras för många månader och flera alternativ."
      },
      {
        "rubrik": "Välj verktyget",
        "text": "Ett kalkylprogram kan använda formler, kopiera dem mellan rader och jämföra resultaten i tabell eller diagram."
      }
    ],
    "svar": "Ett kalkylprogram är mest lämpligt.",
    "komihag": "Ett digitalt verktyg ersätter inte själva modellen. Du behöver fortfarande veta vilken formel eller beräkning som ska användas."
  }
};

/* Slutlig justering av sannolikhet och statistisk slutsats. */
(() => {
  const bank=window.TYPUPPGIFTER_MA1;
  const hitta=rubrik=>Object.values(bank).find(g=>g.rubrik===rubrik);

  const trad=hitta("Använda träddiagram");
  trad.steg[0].figur='<svg class="dg" viewBox="0 0 560 390" role="img" aria-label="Lodrätt träddiagram för två dagar. Trädet börjar upptill och förgrenas nedåt.">'
    +'<text class="dg-rubrik" x="280" y="24" text-anchor="middle">Start</text><circle class="dg-matt" cx="280" cy="42" r="6"/>'
    +'<path class="dg-grenar" d="M280 48 C280 90 155 90 155 132"/><path class="dg-grenar" d="M280 48 C280 90 405 90 405 132"/>'
    +'<text class="dg-txt" x="205" y="86" text-anchor="middle">0,2</text><text class="dg-txt" x="355" y="86" text-anchor="middle">0,8</text>'
    +'<circle class="dg-matt" cx="155" cy="138" r="6"/><circle class="dg-matt" cx="405" cy="138" r="6"/><text class="dg-txt dg-nod" x="155" y="124" text-anchor="middle">sen</text><text class="dg-txt dg-nod" x="405" y="124" text-anchor="middle">i tid</text>'
    +'<path class="dg-grenar" d="M155 144 C155 186 90 186 90 228"/><path class="dg-gren-vald" d="M155 144 C155 186 220 186 220 228"/><path class="dg-gren-vald" d="M405 144 C405 186 340 186 340 228"/><path class="dg-grenar" d="M405 144 C405 186 470 186 470 228"/>'
    +'<text class="dg-txt" x="112" y="183" text-anchor="middle">0,2</text><text class="dg-txt" x="198" y="183" text-anchor="middle">0,8</text><text class="dg-txt" x="362" y="183" text-anchor="middle">0,2</text><text class="dg-txt" x="448" y="183" text-anchor="middle">0,8</text>'
    +'<circle class="dg-matt" cx="90" cy="234" r="6"/><circle class="dg-matt" cx="220" cy="234" r="6"/><circle class="dg-matt" cx="340" cy="234" r="6"/><circle class="dg-matt" cx="470" cy="234" r="6"/>'
    +'<text class="dg-txt dg-nod" x="90" y="258" text-anchor="middle">sen</text><text class="dg-etikett" x="220" y="258" text-anchor="middle">i tid</text><text class="dg-etikett" x="340" y="258" text-anchor="middle">sen</text><text class="dg-txt dg-nod" x="470" y="258" text-anchor="middle">i tid</text>'
    +'<text class="dg-txt" x="90" y="292" text-anchor="middle">0,04</text><text class="dg-etikett" x="220" y="292" text-anchor="middle">0,16</text><text class="dg-etikett" x="340" y="292" text-anchor="middle">0,16</text><text class="dg-txt" x="470" y="292" text-anchor="middle">0,64</text>'
    +'<rect class="dg-rut" x="174" y="310" width="212" height="52" rx="12"/><text class="dg-not" x="280" y="333" text-anchor="middle">Exakt en sen dag:</text><text class="dg-rubrik" x="280" y="351" text-anchor="middle">0,16 + 0,16 = 0,32</text>'
    +'<text class="dg-not" x="280" y="385" text-anchor="middle">Multiplicera nedåt längs en väg. Addera vägar som passar.</text></svg>';

  const signifikans=hitta("Bedöma om en skillnad är övertygande");
  signifikans.ram="Stickprov varierar slumpmässigt. För att kalla en observerad skillnad statistiskt signifikant behöver man visa att den är så stor i förhållande till slumpvariationen att den knappast förklaras av slumpen ensam.";
  signifikans.steg=[
    {rubrik:"Jämför skillnaden med osäkerheten",text:"Skillnaden är två procentenheter, men vi saknar stickprovens storlek och därmed ett mått på slumpvariationen. Samma skillnad kan vara osäker i små stickprov men tydligare i mycket stora stickprov."},
    {rubrik:"Kan skillnaden kallas statistiskt signifikant?",text:"Nej, inte med de uppgifter vi har. Det krävs exempelvis ett statistiskt test eller ett konfidensintervall som tar hänsyn till stickprovens storlek."},
    {rubrik:"Dra en försiktig slutsats",text:"Resultaten 52 % och 54 % visar en skillnad i just dessa stickprov, men de räcker inte för att säkert påstå att populationerna skiljer sig."}
  ];
  signifikans.svar="Nej. Skillnaden kan inte kallas statistiskt signifikant utan information om stickprovens storlek och en beräkning av den statistiska osäkerheten.";
  signifikans.komihag="Statistiskt signifikant betyder inte automatiskt viktig eller stor. Det betyder att skillnaden är svår att förklara med enbart slumpvariation enligt den valda statistiska metoden.";
})();
