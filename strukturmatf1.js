/* strukturmatf1.js — kapitel, moment och elevsynliga grupper för Matematik – fördjupning nivå 1 (Ma5).
   Moment (OMR) = en lektion i Planering Ma5 VT22 (kapitel 1, 2 och 4) och Planering Ma5 NA16D 2018/19
   (kapitel 3); familj är delmoment. Grafteori saknar uppgifter i banken och har därför inget moment.
   Gamla namn sparas i uppgifternas omrTidigare/familjTidigare. Reviderad 2026-10-01. */

window.KAPNAMNMATF1 = {
  "1": "Mängdlära och kombinatorik",
  "2": "Talbaser, kongruens, rekursion och bevis",
  "3": "Fördjupande problem med derivata och integraler",
  "4": "Differentialekvationer"
};

window.OMRMATF1 = {
  "1": {
    "ladprincipen": "Lådprincipen",
    "mult_add_principen": "Multiplikationsprincipen och additionsprincipen",
    "permutationer": "Permutationer",
    "kombinationer": "Kombinationer",
    "kombinatorik_sannolikhet": "Sannolikhetslära och kombinatorik",
    "binomialsatsen": "Binomialsatsen",
    "mangdlara_grund": "Mängdlära – grundbegrepp",
    "mangdoperatorer": "Mängdoperatorer",
    "venndiagram": "Venndiagram"
  },
  "2": {
    "delbarhet_primtal": "Delbarhet och primtal",
    "gemensamma_faktorer": "Gemensamma och icke gemensamma faktorer",
    "kongruens": "Kongruens och moduloräkning",
    "talbaser": "Talsystem med olika baser",
    "inledning_talfoljder": "Inledning talföljder",
    "rekursionsformler": "Rekursionsformler",
    "aritm_geom_talfoljder": "Aritmetiska och geometriska talföljder",
    "talfoljder_tillampningar": "Tillämpningar av talföljder",
    "induktionsbevis": "Induktionsbevis",
    "direkta_bevis": "Direkta bevis",
    "indirekta_bevis": "Indirekta bevis"
  },
  "3": {
    "repetition_derivator": "Repetition derivator",
    "linjar_approximation": "Tangenter och linjär approximation",
    "forandringshastigheter": "Förändringshastigheter och derivator",
    "integraler_area": "Primitiva funktioner, integraler och area",
    "partiell_integration": "Partiell integration",
    "generaliserade_integraler": "Generaliserade integraler"
  },
  "4": {
    "vad_ar_diffekv": "Vad är en differentialekvation?",
    "verifiering": "Verifiering av en lösning",
    "homogena_forsta": "Differentialekvationen y' + ay = 0",
    "homogena_andra": "Differentialekvationen y'' + ay' + by = 0",
    "inhomogena_forsta": "Inhomogena differentialekvationer av första ordningen",
    "inhomogena_andra": "Inhomogena differentialekvationer av andra ordningen",
    "forandringsmodeller": "Förändringsmodeller – blandning, avsvalning och fritt fall",
    "riktningsfalt_euler": "Riktningsfält och Eulers stegmetod",
    "tillvaxt_begransning": "Tillväxt med begränsningar"
  }
};

window.GRUPPMATF1 = {
  "1": [
    {
      "id": "kombinatorik_1_1",
      "namn": "1.1 Kombinatorik",
      "omr": [
        "ladprincipen",
        "mult_add_principen",
        "permutationer",
        "kombinationer",
        "kombinatorik_sannolikhet",
        "binomialsatsen"
      ]
    },
    {
      "id": "mangdlara_1_2",
      "namn": "1.2 Mängdlära",
      "omr": [
        "mangdlara_grund",
        "mangdoperatorer",
        "venndiagram"
      ]
    }
  ],
  "2": [
    {
      "id": "talteori_2_1",
      "namn": "2.1 Talteori",
      "omr": [
        "delbarhet_primtal",
        "gemensamma_faktorer",
        "kongruens",
        "talbaser"
      ]
    },
    {
      "id": "talfoljder_2_2",
      "namn": "2.2 Talföljder",
      "omr": [
        "inledning_talfoljder",
        "rekursionsformler",
        "aritm_geom_talfoljder",
        "talfoljder_tillampningar"
      ]
    },
    {
      "id": "bevis_2_3",
      "namn": "2.3 Bevis",
      "omr": [
        "induktionsbevis",
        "direkta_bevis",
        "indirekta_bevis"
      ]
    }
  ],
  "3": [
    {
      "id": "derivator_3_1",
      "namn": "3.1 Derivator",
      "omr": [
        "repetition_derivator",
        "linjar_approximation",
        "forandringshastigheter"
      ]
    },
    {
      "id": "integraler_3_2",
      "namn": "3.2 Integraler",
      "omr": [
        "integraler_area",
        "partiell_integration",
        "generaliserade_integraler"
      ]
    }
  ],
  "4": [
    {
      "id": "diffekv_4_1",
      "namn": "4.1 Differentialekvationer",
      "omr": [
        "vad_ar_diffekv",
        "verifiering",
        "homogena_forsta",
        "homogena_andra",
        "inhomogena_forsta",
        "inhomogena_andra"
      ]
    },
    {
      "id": "modeller_4_2",
      "namn": "4.2 Modeller med differentialekvationer",
      "omr": [
        "forandringsmodeller",
        "riktningsfalt_euler",
        "tillvaxt_begransning"
      ]
    }
  ]
};

/* Visa kursens pedagogiska underområden som egna träningskort. */
window.GRUPPMATF1 = {};
