/* strukturma1.js — Gemensam struktur för Matematik nivå 1a, 1b och 1c.
   Kapitel 0 är ett gemensamt grundkapitel för alla tre spår.
   Vilka uppgifter som hör till respektive inriktning styrs i uppgifterma1.js
   med fältet kurs: ["1a","1b","1c"]. Index.html döljer automatiskt områden
   som saknar uppgifter för den valda inriktningen. */

window.KAPNAMNMA1 = {
  "0": "Grundläggande tal och beräkningar",
  "1": "Algebra och ekvationer",
  "2": "Funktioner och modeller",
  "3": "Potenser, procent och förändringar",
  "4": "Geometri, trigonometri och vektorer",
  "5": "Sannolikhet och statistik",
  "6": "Digitala verktyg, problemlösning och modellering",
  "7": "Program- och yrkesspecifikt innehåll"
};

window.OMRMA1 = {
  "0": {
    "tal_rakneordning": "Tal och räkneordning",
    "negativa_tal": "Negativa tal",
    "decimaltal_positionssystem": "Decimaltal och positionssystem",
    "avrundning": "Avrundning",
    "overslag_grunder": "Överslagsräkning och uppskattning",
    "enhetsbyten": "Enhetsbyten",
    "tiopotenser_prefix": "Tiopotenser och prefix",
    "brakrakning": "Bråkräkning"
  },
  "1": {
    "algebraiska_uttryck": "Algebraiska uttryck",
    "multiplicera_uttryck": "Multiplicera uttryck",
    "faktorisering": "Faktorisering",
    "formler": "Formler och formelhantering",
    "linjara_ekvationer": "Linjära ekvationer",
    "intervall": "Intervall",
    "linjara_olikheter": "Linjära olikheter"
  },
  "2": {
    "funktionsbegreppet": "Funktionsbegreppet",
    "representationer": "Funktioner: ord, uttryck, tabell och graf",
    "definitionsmangd_vardemangd": "Definitionsmängd och värdemängd",
    "funktionsvarden": "Funktionsvärden",
    "grafisk_ekvationslosning": "Grafisk ekvationslösning",
    "linjara_funktioner": "Linjära funktioner",
    "rata_linjens_ekvation": "Räta linjens ekvation",
    "bestamma_linjar_funktion": "Bestämma en linjär funktion",
    "exponentialfunktioner": "Exponentialfunktioner",
    "potensfunktioner": "Potensfunktioner",
    "jamfora_modeller": "Jämföra linjära, exponentiella och potensmodeller"
  },
  "3": {
    "potensregler": "Potenser och potensregler",
    "potensekvationer": "Potensekvationer",
    "procent": "Procent och andelar",
    "index": "Index",
    "forandringsfaktor": "Förändringsfaktor",
    "upprepade_forandringar": "Förändringar i flera steg",
    "genomsnittlig_forandring": "Genomsnittlig procentuell förändring",
    "ranta": "Ränta",
    "amortering": "Amortering och lån"
  },
  "4": {
    "pythagoras": "Pythagoras sats",
    "sinus_cosinus_tangens": "Sinus, cosinus och tangens",
    "arcusfunktioner": "Bestämma vinklar med arcusfunktioner",
    "strackor_vinklar": "Sträckor och vinklar i rätvinkliga trianglar",
    "koordinatgeometri": "Sträckor och vinklar i koordinatsystem",
    "vektorer": "Vektorer och koordinatform",
    "vektor_addition_subtraktion": "Addition och subtraktion av vektorer",
    "vektor_absolutbelopp": "Vektorers absolutbelopp",
    "vektor_skalar": "Multiplikation av vektor med skalär"
  },
  "5": {
    "grundlaggande_sannolikhet": "Grundläggande sannolikhet",
    "oberoende_handelser": "Oberoende händelser",
    "beroende_handelser": "Beroende händelser",
    "komplementhandelse": "Komplementhändelse",
    "sannolikhet_flera_steg": "Sannolikhet i flera steg",
    "risk_sakerhet": "Risk- och säkerhetsbedömningar",
    "korrelation": "Korrelation",
    "kausalitet": "Kausalitet",
    "signifikans": "Signifikans",
    "urvalsmetoder": "Urvalsmetoder",
    "felkallor": "Felkällor och kritisk granskning av statistik"
  },
  "6": {
    "kalkylprogram": "Kalkylprogram – bland annat ränta och amortering",
    "digital_grafritning": "Digital grafritning",
    "digital_ekvationslosning": "Digital ekvationslösning",
    "programmering": "Programmering som matematiskt verktyg",
    "generella_samband": "Upptäcka och uttrycka generella samband",
    "problemlosning": "Problemlösning",
    "privatekonomi": "Privatekonomi",
    "samhallsliv": "Matematik i samhällslivet",
    "hallbar_utveckling": "Hållbar utveckling",
    "kritisk_granskning": "Kritisk granskning av fakta och påståenden",
    "modellering": "Matematisk modellering",
    "modellers_begransningar": "Modellers egenskaper och begränsningar",
    "matematikens_historia": "Matematikens historia"
  },
  "7": {
    "proportionalitet_yrke": "Proportionalitet i arbetslivet",
    "skala_likformighet": "Skala och likformighet",
    "matning_enheter": "Mätning, storheter och enheter",
    "uppskattning_overslag": "Uppskattning och överslagsräkning",
    "matfel_felmarginal": "Mätfel och felmarginaler",
    "spill_svinnostnad": "Spill, svinn och materialåtgång",
    "kostnadsberakningar": "Kostnadsberäkningar",
    "sakerhetsmarginaler": "Säkerhetsmarginaler",
    "yrkesformler": "Yrkesrelaterade formler",
    "yrkesverktyg": "Matematiska hjälpmedel i arbetslivet"
  }
};

/* Grupper: varje post blir ETT kort på kurssidan. Områdena finns kvar
   var för sig i punktträningen och i Min utveckling, så småområden som
   Faktorisering går fortfarande att punktträna enskilt.
   Kapitel 6 saknar grupper eftersom det är bortvalt i index.html. */

window.GRUPPMA1 = {
  "0": [
    {
      "id": "tal_raknesatt",
      "namn": "Tal och räknesätt",
      "omr": [
        "tal_rakneordning",
        "negativa_tal",
        "decimaltal_positionssystem",
        "brakrakning"
      ]
    },
    {
      "id": "avrundning_overslag",
      "namn": "Avrundning och överslag",
      "omr": [
        "avrundning",
        "overslag_grunder"
      ]
    },
    {
      "id": "enheter_tiopotenser",
      "namn": "Enheter och tiopotenser",
      "omr": [
        "enhetsbyten",
        "tiopotenser_prefix"
      ]
    }
  ],
  "1": [
    {
      "id": "uttryck_formler",
      "namn": "Uttryck och formler",
      "omr": [
        "algebraiska_uttryck",
        "multiplicera_uttryck",
        "faktorisering",
        "formler"
      ]
    },
    {
      "id": "ekvationer_olikheter",
      "namn": "Ekvationer och olikheter",
      "omr": [
        "linjara_ekvationer",
        "intervall",
        "linjara_olikheter"
      ]
    }
  ],
  "2": [
    {
      "id": "funktionsbegreppet_grupp",
      "namn": "Funktionsbegreppet",
      "omr": [
        "funktionsbegreppet",
        "representationer",
        "definitionsmangd_vardemangd",
        "funktionsvarden",
        "grafisk_ekvationslosning"
      ]
    },
    {
      "id": "linjara_funktioner_grupp",
      "namn": "Linjära funktioner",
      "omr": [
        "linjara_funktioner",
        "rata_linjens_ekvation",
        "bestamma_linjar_funktion"
      ]
    },
    {
      "id": "exponential_potens",
      "namn": "Exponential- och potensfunktioner",
      "omr": [
        "exponentialfunktioner",
        "potensfunktioner",
        "jamfora_modeller"
      ]
    }
  ],
  "3": [
    {
      "id": "potenser_grupp",
      "namn": "Potenser",
      "omr": [
        "potensregler",
        "potensekvationer"
      ]
    },
    {
      "id": "procent_grupp",
      "namn": "Procent och förändringsfaktor",
      "omr": [
        "procent",
        "index",
        "forandringsfaktor"
      ]
    },
    {
      "id": "flera_forandringar",
      "namn": "Förändringar i flera steg",
      "omr": [
        "upprepade_forandringar",
        "genomsnittlig_forandring"
      ]
    },
    {
      "id": "ranta_lan",
      "namn": "Ränta och lån",
      "omr": [
        "ranta",
        "amortering"
      ]
    }
  ],
  "4": [
    {
      "id": "pythagoras_koordinater",
      "namn": "Pythagoras sats och koordinatsystem",
      "omr": [
        "pythagoras",
        "koordinatgeometri"
      ]
    },
    {
      "id": "trigonometri_grupp",
      "namn": "Trigonometri i rätvinkliga trianglar",
      "omr": [
        "sinus_cosinus_tangens",
        "arcusfunktioner",
        "strackor_vinklar"
      ]
    },
    {
      "id": "vektorer_grupp",
      "namn": "Vektorer",
      "omr": [
        "vektorer",
        "vektor_addition_subtraktion",
        "vektor_absolutbelopp",
        "vektor_skalar"
      ]
    }
  ],
  "5": [
    {
      "id": "sannolikhet_grund",
      "namn": "Grundläggande sannolikhet",
      "omr": [
        "grundlaggande_sannolikhet",
        "komplementhandelse"
      ]
    },
    {
      "id": "sannolikhet_steg",
      "namn": "Sannolikhet i flera steg",
      "omr": [
        "oberoende_handelser",
        "beroende_handelser",
        "sannolikhet_flera_steg"
      ]
    },
    {
      "id": "samband_signifikans",
      "namn": "Samband och signifikans",
      "omr": [
        "korrelation",
        "kausalitet",
        "signifikans"
      ]
    },
    {
      "id": "urval_felkallor",
      "namn": "Urval, felkällor och risk",
      "omr": [
        "urvalsmetoder",
        "felkallor",
        "risk_sakerhet"
      ]
    }
  ],
  "7": [
    {
      "id": "proportionalitet_skala",
      "namn": "Proportionalitet och skala",
      "omr": [
        "proportionalitet_yrke",
        "skala_likformighet"
      ]
    },
    {
      "id": "matning_felmarginal",
      "namn": "Mätning, uppskattning och felmarginaler",
      "omr": [
        "matning_enheter",
        "uppskattning_overslag",
        "matfel_felmarginal",
        "sakerhetsmarginaler"
      ]
    },
    {
      "id": "material_kostnad",
      "namn": "Materialåtgång och kostnader",
      "omr": [
        "spill_svinnostnad",
        "kostnadsberakningar"
      ]
    },
    {
      "id": "yrkesformler_verktyg",
      "namn": "Formler och hjälpmedel i yrket",
      "omr": [
        "yrkesformler",
        "yrkesverktyg"
      ]
    }
  ]
};
