/* struktur.js — intern understruktur och elevsynliga träningsområden för Fysik nivå 1.
   OMR bevaras för bank/progression; tidigare dubbla nyckeln "blandat" är separerad i kapitel 4 och 5.
   GRUPP definierar elevens större områden; familj är delmoment. Reviderad 2026-09-07. */

window.OMR = {
  "2": {
    "enheter": "Måttenheter och prefix",
    "densitet": "Densitet",
    "matnogg": "Mätnoggrannhet"
  },
  "3": {
    "hastighet": "Hastighet och medelhastighet",
    "diagram": "Rörelsediagram",
    "konstacc": "Konstant acceleration"
  },
  "4": {
    "newton": "Kraftresultant och Newtons lagar",
    "gravitation": "Tyngdkraft och normalkraft",
    "fjadrar": "Fjädrar och Hookes lag",
    "friktion": "Friktion och lutande plan",
    "moment": "Kraftmoment och tyngdpunkt",
    "ritakrafter": "Rita krafter",
    "blandat_kraft": "Blandat – rörelse och kraft"
  },
  "5": {
    "arbete": "Arbete och energi",
    "effekt": "Effekt och verkningsgrad",
    "rorelsemangd": "Rörelsemängd och kollisioner",
    "blandat_energi": "Blandat – energi, rörelsemängd och kraft"
  },
  "6": {
    "tryck": "Tryck och kraft",
    "vatsketryck": "Vätsketryck och lufttryck",
    "arkimedes": "Arkimedes princip",
    "gaslagen": "Allmänna gaslagen"
  },
  "7": {
    "varme": "Värmeöverföring och temperatur",
    "fasandring": "Fasändringar"
  },
  "8": {
    "laddning": "Laddning och Coulombs lag",
    "kretsar": "Ström, spänning och Ohms lag",
    "kopplingar": "Elektriska kopplingar",
    "ems": "Ems, polspänning och effekt",
    "falt": "Elektriska fält",
    "potential": "Potential och potentialvandring"
  },
  "9": {
    "nuklider": "Isotoper och nuklider",
    "karnreaktioner": "Kärnreaktioner",
    "aktivitet": "Aktivitet och halveringstid",
    "stralning": "Strålning och stråldoser"
  }
};

window.KAPNAMN = {
  "2": "Fysikens grunder",
  "3": "Rörelse",
  "4": "Kraft",
  "5": "Energi och rörelsemängd",
  "6": "Tryck",
  "7": "Värme och temperatur",
  "8": "Elektricitet",
  "9": "Partikel- och kärnfysik"
};

window.GRUPP = {
  "2": [
    {
      "id": "matning_densitet",
      "namn": "Mätning, enheter och densitet",
      "omr": [
        "enheter",
        "matnogg",
        "densitet"
      ]
    }
  ],
  "3": [
    {
      "id": "hastighet_diagram",
      "namn": "Hastighet och rörelsediagram",
      "omr": [
        "hastighet",
        "diagram"
      ]
    }
  ],
  "4": [
    {
      "id": "newton_kraftdiagram",
      "namn": "Newtons lagar och kraftdiagram",
      "omr": [
        "newton",
        "ritakrafter",
        "blandat_kraft"
      ]
    }
  ],
  "5": [
    {
      "id": "energi_rorelsemangd",
      "namn": "Energi, effekt och rörelsemängd",
      "omr": [
        "arbete",
        "effekt",
        "rorelsemangd",
        "blandat_energi"
      ]
    }
  ],
  "6": [
    {
      "id": "tryck_flytkraft",
      "namn": "Tryck och flytkraft",
      "omr": [
        "tryck",
        "vatsketryck",
        "arkimedes"
      ]
    }
  ],
  "7": [
    {
      "id": "varme_fas",
      "namn": "Värme och fasövergångar",
      "omr": [
        "varme",
        "fasandring"
      ]
    }
  ],
  "8": [
    {
      "id": "laddning_falt",
      "namn": "Laddning, elektriska fält och potential",
      "omr": [
        "laddning",
        "falt",
        "potential"
      ]
    },
    {
      "id": "kretsar",
      "namn": "Elektriska kretsar och energikällor",
      "omr": [
        "kretsar",
        "kopplingar",
        "ems"
      ]
    }
  ],
  "9": [
    {
      "id": "karnfysik",
      "namn": "Kärnfysik och radioaktivitet",
      "omr": [
        "nuklider",
        "karnreaktioner",
        "aktivitet",
        "stralning"
      ]
    }
  ]
};

