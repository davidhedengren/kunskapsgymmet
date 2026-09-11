/* strukturmatf1.js — intern understruktur och elevsynliga träningsområden för Matematik – fördjupning nivå 1.
   OMR bevaras för bank/progression. GRUPPMATF1 definierar elevens större områden; familj är delmoment.
   Reviderad och avstämd mot MATF1000X 2026-09-10. */

window.KAPNAMNMATF1 = {
  "1": "Mängdlära och kombinatorik",
  "2": "Talbaser, kongruens, rekursion och bevis",
  "3": "Fördjupande problem med derivata och integraler",
  "4": "Differentialekvationer"
};

window.OMRMATF1 = {
  "1": {
    "mangder_venn": "Mängder, mängdoperationer och Venn-diagram",
    "additionsprincipen_mangder": "Additionsprincipen och inklusion–exklusion",
    "kombinatoriska_principer": "Multiplikationsprincipen och lådprincipen",
    "permutationer_kombinationer": "Permutationer och kombinationer",
    "binomialsatsen": "Binomialsatsen",
    "kombinatorik_sannolikhet": "Kombinatorik och sannolikhet"
  },
  "2": {
    "delbarhet": "Delbarhet, primtal och största gemensamma delare",
    "talbaser": "Tal i olika talbaser",
    "kongruens": "Kongruens och kongruensräkning",
    "talfoljder_sigma": "Talföljder och sigma-notation",
    "aritmetiska_geometriska": "Aritmetiska och geometriska talföljder",
    "rekursiva_talfoljder": "Rekursiva talföljder",
    "bevismetoder": "Bevismetoder – direkta, indirekta och induktionsbevis"
  },
  "3": {
    "partiell_integration": "Partiell integration",
    "generaliserade_integraler": "Generaliserade integraler",
    "derivata_tillampningar": "Tillämpningar av derivata",
    "fordjupad_analys": "Fördjupad analys och digitala verktyg"
  },
  "4": {
    "diffekv_grunder": "Differentialekvationer – begrepp och tolkning",
    "forsta_ordningen": "Första ordningens differentialekvationer",
    "andra_ordningen": "Andra ordningens differentialekvationer – homogena och inhomogena",
    "begynnelsevillkor": "Begynnelsevärdesproblem",
    "riktningsfalt_euler": "Riktningsfält och Eulers stegmetod",
    "modellering_digitalt": "Modellering och digitala metoder"
  }
};

window.GRUPPMATF1 = {
  "1": [
    {
      "id": "mangder_principer",
      "namn": "Mängder och kombinatoriska principer",
      "omr": [
        "mangder_venn",
        "additionsprincipen_mangder",
        "kombinatoriska_principer"
      ]
    },
    {
      "id": "urval_binomial",
      "namn": "Permutationer, kombinationer och sannolikhet",
      "omr": [
        "permutationer_kombinationer",
        "binomialsatsen",
        "kombinatorik_sannolikhet"
      ]
    }
  ],
  "2": [
    {
      "id": "talteori",
      "namn": "Talteori, talbaser och kongruens",
      "omr": [
        "delbarhet",
        "talbaser",
        "kongruens"
      ]
    },
    {
      "id": "talfoljder",
      "namn": "Talföljder, rekursion och bevis",
      "omr": [
        "talfoljder_sigma",
        "aritmetiska_geometriska",
        "rekursiva_talfoljder",
        "bevismetoder"
      ]
    }
  ],
  "3": [
    {
      "id": "integrationstekniker",
      "namn": "Exempel på integralfördjupning",
      "omr": [
        "partiell_integration",
        "generaliserade_integraler"
      ]
    },
    {
      "id": "fordjupad_analys",
      "namn": "Fördjupad derivata och analys",
      "omr": [
        "derivata_tillampningar",
        "fordjupad_analys"
      ]
    }
  ],
  "4": [
    {
      "id": "diffekv_forsta",
      "namn": "Differentialekvationer – grunder och första ordningen",
      "omr": [
        "diffekv_grunder",
        "forsta_ordningen",
        "begynnelsevillkor"
      ]
    },
    {
      "id": "diffekv_digitalt",
      "namn": "Andra ordningen, riktningsfält och digitala metoder",
      "omr": [
        "andra_ordningen",
        "riktningsfalt_euler",
        "modellering_digitalt"
      ]
    }
  ]
};

/* Visa kursens pedagogiska underområden som egna träningskort. */
window.GRUPPMATF1 = {};
