/* =====================================================================
   strukturhist.js  —  Historia nivå 1, Kunskapsgymmet

   Kapitlen är FÖRMÅGOR, inte epoker. Epokerna är innehållet som
   uppgifterna utspelar sig i; gymmet består av det eleven ska kunna
   göra med innehållet.

   Progressionen inom varje förmåga ligger i uppgiftens niva:
     E = nivå 1  identifiera / benämna
     C = nivå 2  jämföra och välja
     A = nivå 3  väga argument mot varandra
   ===================================================================== */

var KAPNAMNHIST = {
  1: "Källkritik",
  2: "Orsak och konsekvens",
  3: "Aktör och struktur",
  4: "Förändring och kontinuitet",
  5: "Historiebruk",
  6: "Historisk argumentation"
};

var OMRHIST = {
  1: {
    kk_akthet:        "Äkthet och tillkomst",
    kk_narhet:        "Närhet i tid och rum",
    kk_beroende:      "Beroende och tradering",
    kk_tendens:       "Tendens och urval",
    kk_anvandbarhet:  "Källans användbarhet"
  },
  2: {
    ok_typer:         "Bakgrund, utlösande faktor, konsekvens",
    ok_kedjor:        "Orsaker som samverkar",
    ok_konsekvens:    "Konsekvenser på kort och lång sikt"
  },
  3: {
    as_aktor:         "Aktörens handlingsutrymme",
    as_struktur:      "Strukturella villkor",
    as_samspel:       "Samspelet aktör och struktur"
  },
  4: {
    fk_forandring:    "Vad förändras?",
    fk_kontinuitet:   "Vad består?",
    fk_periodisering: "Periodisering och brytpunkter"
  },
  5: {
    hb_identifiera:   "Är det historiebruk?",
    hb_typer:         "Typer av historiebruk",
    hb_syfte:         "Syfte och avsändare"
  },
  6: {
    ha_tolkning:      "Perspektiv och tolkning",
    ha_belagg:        "Från belägg till slutsats",
    ha_jamfora:       "Jämföra historikers argument"
  }
};

/* Inga sammanslagna kort ännu — varje område är sitt eget kort. */
var GRUPPHIST = {};

/* Inga spårspecifika kapitelnamn (kursen har inga spår). */
var KAPNAMNHISTSPAR = null;

/* Gör namnen tillgängliga som window.X även om filen körs i modulläge. */
if(typeof window!=="undefined"){
  window.KAPNAMNHIST=KAPNAMNHIST;
  window.OMRHIST=OMRHIST;
  window.GRUPPHIST=GRUPPHIST;
  window.KAPNAMNHISTSPAR=KAPNAMNHISTSPAR;
}
