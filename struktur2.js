/* struktur2.js — intern understruktur och elevsynliga träningsområden för Fysik nivå 2.
   OMR bevaras för bank/progression. GRUPP2 definierar elevens större områden; familj är delmoment.
   Reviderad 2026-09-10. */

window.OMR2 = {
  "1": {
    "cirkel": "Cirkulär centralrörelse",
    "kast": "Kaströrelse"
  },
  "2": {
    "fjadrar": "Fjädrar",
    "svangningar": "Harmoniska svängningar",
    "pendlar": "Pendlar",
    "vagrorelser": "Vågrörelser",
    "ljudvagor": "Ljudvågor",
    "interferens": "Interferens",
    "ljud_horsel": "Ljud och hörsel",
    "extrema_frekvenser": "Ljud med extrema frekvenser"
  },
  "3": {
    "elektriska_falt": "Elektriska fält",
    "kondensatorer": "Kondensatorer",
    "magnetism": "Magnetism",
    "laddade_partiklar": "Laddade partiklar i magnetfält",
    "jordens_magnetfalt": "Jordens magnetfält",
    "induktion": "Induktion",
    "vaxelstrom": "Växelström",
    "vaxelstrom_spole_kondensator": "Växelström i spole och kondensator"
  },
  "4": {
    "em_vagor": "Elektromagnetiska vågor",
    "vagrorelselara": "Vågrörelselära",
    "temperaturstralning": "Temperaturstrålning",
    "straloptik": "Stråloptik",
    "ljus_partikelstrom": "Ljus är en partikelström",
    "partikelstralar": "Partikelstrålar",
    "atomstruktur": "Atomens elektronstruktur"
  },
  "5": {
    "avstandsmatning": "Avståndsmätning",
    "farg_ljusstyrka": "Färg och ljusstyrka",
    "exoplaneter": "Exoplaneter",
    "stjarnornas_utveckling": "Stjärnornas utveckling",
    "kosmologi": "Kosmologi",
    "framtiden": "Framtiden"
  },
  "6": {
    "tidsdilatation": "Tidsdilatation",
    "langdkontraktion": "Längdkontraktion",
    "tid_och_langd": "Tidsdilatation och längdkontraktion",
    "massa_och_energi": "Massa och energi",
    "relativistisk_energi": "Relativistisk rörelseenergi"
  }
};

window.KAPNAMN2 = {
  "1": "Rörelse och krafter",
  "2": "Ljud och andra mekaniska vågor",
  "3": "Elektromagnetism",
  "4": "Vågor och partiklar",
  "5": "Astrofysik",
  "6": "Relativitetsteori"
};

window.GRUPP2 = {
  "1": [
    {
      "id": "centralrorelse",
      "namn": "Centralrörelse",
      "omr": [
        "cirkel"
      ]
    },
    {
      "id": "tva_dimensioner",
      "namn": "Rörelse i två dimensioner",
      "omr": [
        "kast"
      ]
    }
  ],
  "2": [
    {
      "id": "svangningar",
      "namn": "Svängningar och pendlar",
      "omr": [
        "fjadrar",
        "svangningar",
        "pendlar"
      ]
    },
    {
      "id": "vagor_interferens",
      "namn": "Vågrörelser och interferens",
      "omr": [
        "vagrorelser",
        "interferens"
      ]
    },
    {
      "id": "ljud",
      "namn": "Ljudvågor och hörsel",
      "omr": [
        "ljudvagor",
        "ljud_horsel",
        "extrema_frekvenser"
      ]
    }
  ],
  "3": [
    {
      "id": "elektriska_falt",
      "namn": "Elektriska fält och kondensatorer",
      "omr": [
        "elektriska_falt",
        "kondensatorer"
      ]
    },
    {
      "id": "magnetism",
      "namn": "Magnetism och laddade partiklar",
      "omr": [
        "magnetism",
        "laddade_partiklar",
        "jordens_magnetfalt"
      ]
    },
    {
      "id": "induktion_vaxelstrom",
      "namn": "Induktion och växelström",
      "omr": [
        "induktion",
        "vaxelstrom",
        "vaxelstrom_spole_kondensator"
      ]
    }
  ],
  "4": [
    {
      "id": "ljus_vag",
      "namn": "Elektromagnetiska vågor och optik",
      "omr": [
        "em_vagor",
        "vagrorelselara",
        "straloptik",
        "temperaturstralning"
      ]
    },
    {
      "id": "ljus_materia",
      "namn": "Ljus, partiklar och atomstruktur",
      "omr": [
        "ljus_partikelstrom",
        "partikelstralar",
        "atomstruktur"
      ]
    }
  ],
  "5": [
    {
      "id": "stjarnor",
      "namn": "Stjärnor och astronomisk avståndsmätning",
      "omr": [
        "avstandsmatning",
        "farg_ljusstyrka",
        "exoplaneter",
        "stjarnornas_utveckling"
      ]
    },
    {
      "id": "kosmologi",
      "namn": "Kosmologi och universums utveckling",
      "omr": [
        "kosmologi",
        "framtiden"
      ]
    }
  ],
  "6": [
    {
      "id": "rel_tid_langd",
      "namn": "Tid, längd och referenssystem",
      "omr": [
        "tidsdilatation",
        "langdkontraktion",
        "tid_och_langd"
      ]
    },
    {
      "id": "rel_energi",
      "namn": "Massa och relativistisk energi",
      "omr": [
        "massa_och_energi",
        "relativistisk_energi"
      ]
    }
  ]
};
