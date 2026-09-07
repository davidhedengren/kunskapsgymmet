/* strukturma1.js — intern understruktur och elevsynliga träningsområden för Matematik nivå 1.
   OMR-nycklarna bevaras för bank och sparad progression.
   GRUPPMA1 definierar de större områden eleven ser i Kunskapsgymmet; familj är delmoment inom dessa.
   Reviderad 2026-09-07. */

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

window.GRUPPMA1 = {
  "0": [
    {
      "id": "tal_berakningar",
      "namn": "Tal, räkneordning och noggrannhet",
      "omr": [
        "tal_rakneordning",
        "negativa_tal",
        "decimaltal_positionssystem",
        "avrundning",
        "overslag_grunder"
      ]
    },
    {
      "id": "enheter_prefix",
      "namn": "Enheter, prefix och tiopotenser",
      "omr": [
        "enhetsbyten",
        "tiopotenser_prefix"
      ]
    }
  ],
  "1": [
    {
      "id": "algebraiska_uttryck",
      "namn": "Algebraiska uttryck och faktorisering",
      "omr": [
        "algebraiska_uttryck",
        "multiplicera_uttryck",
        "faktorisering"
      ]
    },
    {
      "id": "ekvationer_olikheter",
      "namn": "Ekvationer, olikheter och intervall",
      "omr": [
        "linjara_ekvationer",
        "linjara_olikheter",
        "intervall"
      ]
    }
  ],
  "2": [
    {
      "id": "funktioner_representationer",
      "namn": "Funktioner och representationer",
      "omr": [
        "funktionsbegreppet",
        "representationer",
        "definitionsmangd_vardemangd",
        "funktionsvarden",
        "grafisk_ekvationslosning"
      ]
    },
    {
      "id": "linjara_funktioner",
      "namn": "Räta linjer och linjära funktioner",
      "omr": [
        "linjara_funktioner",
        "rata_linjens_ekvation",
        "bestamma_linjar_funktion"
      ]
    },
    {
      "id": "icke_linjara_modeller",
      "namn": "Exponential-, potens- och andra modeller",
      "omr": [
        "exponentialfunktioner",
        "potensfunktioner",
        "jamfora_modeller"
      ]
    }
  ],
  "3": [
    {
      "id": "potenser",
      "namn": "Potenser och potensekvationer",
      "omr": [
        "potensregler",
        "potensekvationer"
      ]
    },
    {
      "id": "procent_forandring",
      "namn": "Procent, index och förändringsfaktorer",
      "omr": [
        "procent",
        "index",
        "forandringsfaktor",
        "upprepade_forandringar",
        "genomsnittlig_forandring"
      ]
    },
    {
      "id": "ranta_lan",
      "namn": "Ränta, amortering och lån",
      "omr": [
        "ranta",
        "amortering"
      ]
    }
  ],
  "4": [
    {
      "id": "ratvinklig_trigonometri",
      "namn": "Pythagoras och rätvinklig trigonometri",
      "omr": [
        "pythagoras",
        "sinus_cosinus_tangens",
        "arcusfunktioner",
        "strackor_vinklar"
      ]
    },
    {
      "id": "koordinater_vektorer",
      "namn": "Koordinatgeometri och vektorer",
      "omr": [
        "koordinatgeometri",
        "vektorer",
        "vektor_addition_subtraktion",
        "vektor_absolutbelopp",
        "vektor_skalar"
      ]
    }
  ],
  "5": [
    {
      "id": "sannolikhet",
      "namn": "Sannolikhet",
      "omr": [
        "grundlaggande_sannolikhet",
        "oberoende_handelser",
        "beroende_handelser",
        "komplementhandelse",
        "sannolikhet_flera_steg",
        "risk_sakerhet"
      ]
    },
    {
      "id": "statistik_granskning",
      "namn": "Statistik, samband och undersökningar",
      "omr": [
        "korrelation",
        "kausalitet",
        "signifikans",
        "urvalsmetoder",
        "felkallor"
      ]
    }
  ],
  "6": [
    {
      "id": "digitala_verktyg",
      "namn": "Digitala matematiska verktyg",
      "omr": [
        "kalkylprogram",
        "digital_grafritning",
        "digital_ekvationslosning",
        "programmering"
      ]
    },
    {
      "id": "problemlosning_modellering",
      "namn": "Problemlösning och modellering",
      "omr": [
        "generella_samband",
        "problemlosning",
        "modellering",
        "modellers_begransningar"
      ]
    },
    {
      "id": "samhallsekonomi",
      "namn": "Privatekonomi och samhällsfrågor",
      "omr": [
        "privatekonomi",
        "samhallsliv",
        "hallbar_utveckling",
        "kritisk_granskning"
      ]
    }
  ],
  "7": [
    {
      "id": "yrke_proportion_skala",
      "namn": "Proportionalitet, skala och yrkesformler",
      "omr": [
        "proportionalitet_yrke",
        "skala_likformighet",
        "yrkesformler"
      ]
    },
    {
      "id": "yrke_matning",
      "namn": "Mätning, noggrannhet och säkerhetsmarginaler",
      "omr": [
        "matning_enheter",
        "uppskattning_overslag",
        "matfel_felmarginal",
        "sakerhetsmarginaler",
        "yrkesverktyg"
      ]
    },
    {
      "id": "yrke_material_kostnad",
      "namn": "Materialåtgång och kostnadsberäkningar",
      "omr": [
        "spill_svinnostnad",
        "kostnadsberakningar"
      ]
    }
  ]
};

