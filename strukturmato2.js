/* strukturmato2.js — intern understruktur och elevsynliga träningsområden för Matematik – fortsättning nivå 2.
   OMR bevaras för bank/progression. GRUPPMATO2 definierar elevens större områden; familj är delmoment.
   Reviderad 2026-09-07. */

window.KAPNAMNMATO2 = {
  "1": "Trigonometri",
  "2": "Derivata",
  "3": "Integraler",
  "4": "Komplexa tal"
};

window.OMRMATO2 = {
  "1": {
    "enhetscirkeln": "Enhetscirkeln",
    "trig_formler": "Trigonometriska formler",
    "trig_ekvationer": "Trigonometriska ekvationer",
    "trig_funktioner": "Trigonometriska funktioner",
    "radianer": "Radianer",
    "trig_modeller": "Tillämpningar och modeller"
  },
  "2": {
    "deriveringsregler": "Deriveringsregler",
    "kedjeregel_sammansatta": "Sammansatta funktioner och kedjeregeln",
    "derivator_specialfunktioner": "Derivata av exponential-, logaritm- och trigonometriska funktioner",
    "tillampningar_derivata": "Tillämpningar av derivata",
    "grafer_asymptoter": "Grafer och asymptoter"
  },
  "3": {
    "integralberakning": "Primitiva funktioner och integralberäkningar",
    "area_integraler": "Area med integraler",
    "integral_tillampningar": "Integraler i tillämpningar",
    "sannolikhetsintegraler": "Täthetsfunktioner och normalfördelning",
    "rotationsvolymer": "Rotationsvolymer"
  },
  "4": {
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
      "id": "trig_samband",
      "namn": "Enhetscirkeln, radianer och trigonometriska samband",
      "omr": [
        "enhetscirkeln",
        "radianer",
        "trig_formler"
      ]
    },
    {
      "id": "trig_funktioner_modeller",
      "namn": "Trigonometriska funktioner och modeller",
      "omr": [
        "trig_funktioner",
        "trig_modeller"
      ]
    }
  ],
  "2": [
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
  "3": [
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
      "namn": "Integraler i tillämpningar och rotationsvolymer",
      "omr": [
        "integral_tillampningar",
        "rotationsvolymer"
      ]
    }
  ],
  "4": [
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
      "namn": "Polär form, potenser och rötter",
      "omr": [
        "polar_exponentiell",
        "potenser_rotter"
      ]
    }
  ]
};
