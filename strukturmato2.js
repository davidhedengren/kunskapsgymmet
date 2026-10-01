/* strukturmato2.js — intern understruktur och elevsynliga träningsområden för Matematik – fortsättning nivå 2.
   OMR bevaras för bank/progression. GRUPPMATO2 definierar elevens större områden; familj är delmoment.
   Reviderad 2026-09-19: trigonometriska funktioner delade i grunder och fasförskjutning.
   Reviderad 2026-10-01: trigonometrin följer läroboken i två kapitel, Trigonometri och formler
   (gradmått) och Trigonometri och grafer (kurvor, radianer, derivator och tillämpningar).
   Inget område använder innehåll från ett senare avsnitt: kurvor i radianer ligger efter Radianbegreppet. */

window.KAPNAMNMATO2 = {
  "1": "Trigonometri och formler",
  "2": "Trigonometri och grafer",
  "3": "Derivata",
  "4": "Integraler",
  "5": "Komplexa tal"
};

window.OMRMATO2 = {
  "1": {
    "enhetscirkeln": "Enhetscirkeln",
    "trig_formler": "Trigonometriska formler",
    "trig_ekvationer": "Trigonometriska ekvationer"
  },
  "2": {
    "trig_funktioner": "Trigonometriska kurvor",
    "trig_fasforskjutning": "Fasförskjutning",
    "radianer": "Radianbegreppet",
    "trig_kurvor_radianer": "Trigonometriska kurvor i radianer",
    "trig_derivator": "De trigonometriska funktionernas derivator",
    "trig_modeller": "Tillämpningar och problemlösning"
  },
  "3": {
    "deriveringsregler": "Deriveringsregler",
    "kedjeregel_sammansatta": "Sammansatta funktioner och kedjeregeln",
    "derivator_specialfunktioner": "Derivata av exponential-, logaritm- och trigonometriska funktioner",
    "tillampningar_derivata": "Tillämpningar av derivata",
    "grafer_asymptoter": "Grafer och asymptoter"
  },
  "4": {
    "integralberakning": "Primitiva funktioner och integralberäkningar",
    "area_integraler": "Area med integraler",
    "integral_tillampningar": "Integraler i tillämpningar",
    "sannolikhetsintegraler": "Täthetsfunktioner och normalfördelning",
    "rotationsvolymer": "Rotationsvolymer"
  },
  "5": {
    "komplex_aritmetik": "Räkning med komplexa tal",
    "komplexa_talplanet": "Det komplexa talplanet",
    "polar_exponentiell": "Polär och exponentiell form",
    "potenser_rotter": "Potenser och rötter",
    "polynom_komplexa": "Polynom, polynomdivision och komplexa rötter"
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
      "id": "trig_formler_ekvationer",
      "namn": "Enhetscirkeln, formler och ekvationer",
      "omr": [
        "enhetscirkeln",
        "trig_formler",
        "trig_ekvationer"
      ]
    }
  ],
  "2": [
    {
      "id": "trig_grafer",
      "namn": "Kurvor, radianer, derivator och tillämpningar",
      "omr": [
        "trig_funktioner",
        "trig_fasforskjutning",
        "radianer",
        "trig_kurvor_radianer",
        "trig_derivator",
        "trig_modeller"
      ]
    }
  ],
  "3": [
    {
      "id": "deriveringsregler",
      "namn": "Deriveringsregler",
      "omr": [
        "deriveringsregler",
        "kedjeregel_sammansatta",
        "derivator_specialfunktioner"
      ]
    },
    {
      "id": "grafanalys_tillampningar",
      "namn": "Grafanalys och tillämpningar av derivata",
      "omr": [
        "grafer_asymptoter",
        "tillampningar_derivata"
      ]
    }
  ],
  "4": [
    {
      "id": "integral_area",
      "namn": "Integralberäkning och area",
      "omr": [
        "integralberakning",
        "area_integraler"
      ]
    },
    {
      "id": "integral_tillampningar",
      "namn": "Integraler i tillämpningar, sannolikhet och rotationsvolymer",
      "omr": [
        "integral_tillampningar",
        "sannolikhetsintegraler",
        "rotationsvolymer"
      ]
    }
  ],
  "5": [
    {
      "id": "komplex_grunder",
      "namn": "Komplexa tal och det komplexa talplanet",
      "omr": [
        "komplex_aritmetik",
        "komplexa_talplanet"
      ]
    },
    {
      "id": "komplex_polar",
      "namn": "Polär form, potenser, rötter och polynom",
      "omr": [
        "polar_exponentiell",
        "potenser_rotter",
        "polynom_komplexa"
      ]
    }
  ]
};

/* Visa kursens pedagogiska underområden som egna träningskort. */
window.GRUPPMATO2 = {};
