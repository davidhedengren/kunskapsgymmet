/* strukturmato2.js — kapitel, moment och elevsynliga grupper för Matematik – fortsättning nivå 2 (Ma4).
   Moment (OMR) = en lektion i Planering Ma4 24-25/25-26; familj är delmoment. Gamla namn sparas i
   uppgifternas omrTidigare/familjTidigare. Kurvor i radianer samlas efter Radianbegreppet så att inget
   moment använder innehåll från en senare lektion. GRUPPMATO2 grupperar momenten efter bokens avsnitt.
   Reviderad 2026-10-01. */

window.KAPNAMNMATO2 = {
  "1": "Trigonometri och formler",
  "2": "Trigonometri och grafer",
  "3": "Derivata",
  "4": "Integraler",
  "5": "Komplexa tal"
};

window.OMRMATO2 = {
  "1": {
    "enhetscirkeln_trianglar": "Enhetscirkeln och trianglar",
    "enhetscirkeln_formler": "Enhetscirkeln och formler",
    "trig_identiteter": "Trigonometriska identiteter",
    "additionsformler": "Additions- och subtraktionsformler",
    "dubbla_vinkeln": "Formler för dubbla vinkeln",
    "trig_grundekvationer": "Trigonometriska grundekvationer",
    "trig_ekv_formler": "Ekvationer som omformas med formler",
    "trig_problemlosning_1": "Tillämpningar och problemlösning – trigonometri och formler"
  },
  "2": {
    "sinus_cosinuskurvor": "Sinus- och cosinuskurvor",
    "forskjutna_kurvor": "Förskjutna kurvor",
    "sinusformad_kurva": "Ekvationen för en sinusformad kurva",
    "tan_kurvan": "Kurvan y = tan x",
    "asinx_bcosx": "Kurvan y = a sin x + b cos x",
    "radianbegreppet": "Radianbegreppet",
    "cirkelsektorn": "Cirkelsektorn och radianer",
    "kurvor_radianer": "Trigonometriska kurvor i radianer",
    "derivatan_sin_cos": "Derivatan av sin x och cos x",
    "derivata_sammansatta": "Derivatan av sammansatta funktioner",
    "trig_problemlosning_2": "Tillämpningar och problemlösning – trigonometri och grafer"
  },
  "3": {
    "kort_om_derivator": "Kort om derivator",
    "produktregeln": "Derivatan av en produkt",
    "kvotregeln": "Derivatan av en kvot",
    "exp_log_derivata": "Exponential- och logaritmfunktioner",
    "forandringshastigheter": "Samband mellan förändringshastigheter",
    "grafer_derivator": "Grafer och derivator",
    "olika_grafer": "Olika typer av grafer",
    "kurvor_asymptoter": "Kurvor och asymptoter",
    "sneda_asymptoter": "Sneda asymptoter",
    "derivata_problemlosning": "Tillämpningar och problemlösning – derivata"
  },
  "4": {
    "integraler_primitiva": "Integraler och primitiva funktioner",
    "grafiska_metoder": "Grafiska metoder",
    "areor_mellan_kurvor": "Areor mellan kurvor",
    "integraler_areor": "Integraler och areor",
    "integraler_storheter": "Integraler och storheter",
    "sannolikhetsfordelning": "Sannolikhetsfördelning",
    "skivmetoden": "Skivmetoden"
  },
  "5": {
    "imaginara_tal": "De reella talen och imaginära tal",
    "konjugat_raknesatt": "Konjugat, absolutbelopp och de fyra räknesätten",
    "komplexa_vektorer": "Komplexa tal som vektorer",
    "polar_form": "Komplexa tal på polär form",
    "mult_div_polar": "Multiplikation och division i polär form",
    "avlasa_rita": "Avläsa och rita i det komplexa talplanet",
    "de_moivre": "de Moivres formel",
    "ekvationen_zn": "Ekvationen zⁿ = a",
    "eulers_formel": "Eulers formel",
    "andragradsekv_komplexa": "Andragradsekvationer",
    "polynomdivision": "Polynomdivision",
    "faktorsatsen": "Faktorsatsen",
    "polynomekv_hogre": "Polynomekvationer av högre grad"
  }
};

window.SPARMATO2 = Object.fromEntries(
  Object.entries(window.OMRMATO2).map(([kap, omr]) => [
    kap,
    Object.fromEntries(Object.keys(omr).map(key => [key, ["2c"]]))
  ])
);

window.GRUPPMATO2 = {
  "1": [
    {
      "id": "enhetscirkeln_1_2",
      "namn": "1.2 Enhetscirkeln och formler",
      "omr": [
        "enhetscirkeln_trianglar",
        "enhetscirkeln_formler",
        "trig_identiteter",
        "additionsformler",
        "dubbla_vinkeln"
      ]
    },
    {
      "id": "trig_ekvationer_1_4",
      "namn": "1.4–1.5 Trigonometriska ekvationer och tillämpningar",
      "omr": [
        "trig_grundekvationer",
        "trig_ekv_formler",
        "trig_problemlosning_1"
      ]
    }
  ],
  "2": [
    {
      "id": "kurvor_2_1",
      "namn": "2.1 Trigonometriska kurvor",
      "omr": [
        "sinus_cosinuskurvor",
        "forskjutna_kurvor",
        "sinusformad_kurva",
        "tan_kurvan",
        "asinx_bcosx"
      ]
    },
    {
      "id": "radianer_2_2",
      "namn": "2.2 Radianbegreppet",
      "omr": [
        "radianbegreppet",
        "cirkelsektorn",
        "kurvor_radianer"
      ]
    },
    {
      "id": "derivator_2_3",
      "namn": "2.3–2.4 Derivator och tillämpningar",
      "omr": [
        "derivatan_sin_cos",
        "derivata_sammansatta",
        "trig_problemlosning_2"
      ]
    }
  ],
  "3": [
    {
      "id": "deriveringsregler_3_1",
      "namn": "3.1 Deriveringsregler",
      "omr": [
        "kort_om_derivator",
        "produktregeln",
        "kvotregeln",
        "exp_log_derivata",
        "forandringshastigheter"
      ]
    },
    {
      "id": "grafer_3_2",
      "namn": "3.2–3.3 Grafer och asymptoter",
      "omr": [
        "grafer_derivator",
        "olika_grafer",
        "kurvor_asymptoter",
        "sneda_asymptoter"
      ]
    },
    {
      "id": "problemlosning_3_5",
      "namn": "3.5 Tillämpningar och problemlösning",
      "omr": [
        "derivata_problemlosning"
      ]
    }
  ],
  "4": [
    {
      "id": "integraler_3_4",
      "namn": "3.4 Integraler",
      "omr": [
        "integraler_primitiva",
        "grafiska_metoder",
        "areor_mellan_kurvor",
        "integraler_areor",
        "integraler_storheter",
        "sannolikhetsfordelning"
      ]
    },
    {
      "id": "skivmetoden_3_6",
      "namn": "3.6 Skivmetoden",
      "omr": [
        "skivmetoden"
      ]
    }
  ],
  "5": [
    {
      "id": "komplexa_4_1",
      "namn": "4.1 Komplexa tal",
      "omr": [
        "imaginara_tal",
        "konjugat_raknesatt"
      ]
    },
    {
      "id": "polar_4_2",
      "namn": "4.2 Komplexa tal i polär form",
      "omr": [
        "komplexa_vektorer",
        "polar_form",
        "mult_div_polar",
        "avlasa_rita"
      ]
    },
    {
      "id": "moivre_4_3",
      "namn": "4.3 Potenser och rötter",
      "omr": [
        "de_moivre",
        "ekvationen_zn",
        "eulers_formel"
      ]
    },
    {
      "id": "polynom_4_4",
      "namn": "4.4 Polynomekvationer",
      "omr": [
        "andragradsekv_komplexa",
        "polynomdivision",
        "faktorsatsen",
        "polynomekv_hogre"
      ]
    }
  ]
};

/* Visa kursens pedagogiska underområden som egna träningskort. */
window.GRUPPMATO2 = {};
