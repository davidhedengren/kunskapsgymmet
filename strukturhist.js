/* =====================================================================
   strukturhist.js  —  Historia nivå 1, Kunskapsgymmet

   Kapitlen är FÖRMÅGOR, inte epoker. Epokerna är innehållet som
   uppgifterna utspelar sig i; gymmet består av det eleven ska kunna
   göra med innehållet.

   Områdena är elevens synliga träningsingångar. I källkritiken är de
   därför arbetsformer (lära verktyg, bedöma, jämföra, koppla källa till
   frågeställning) snarare än ett enda källkritiskt kriterium per kort.
   Vilka kriterier en uppgift faktiskt tränar ligger i uppgiftens
   `kriterier` och kan användas diagnostiskt utan att ge eleven ledtråden.

   Progressionen lagras fortfarande med de interna koderna E/C/A för att
   vara kompatibel med den gemensamma motorn:
     E = nivå 1  identifiera / tillämpa ett tydligt verktyg
     C = nivå 2  jämföra / välja mellan rimliga bedömningar
     A = nivå 3  väga belägg och argument mot varandra

   Koderna är svårighetsgrader i motorn, inte betygssteg. I gränssnittet
   visas endast Nivå 1, Nivå 2 och Nivå 3.
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
    kk_grunder:  "Källkritiska verktyg",
    kk_bedom:    "Bedöma en källa",
    kk_jamfora:  "Jämföra och pröva källor",
    kk_fraga:    "Källa och frågeställning"
  },
  2: {
    ok_typer:      "Bakgrund och utlösande faktor",
    ok_kedjor:     "Samverkande orsaker",
    ok_konsekvens: "Konsekvenser – för vem och när?"
  },
  3: {
    as_aktor:    "Handlingsutrymme och val",
    as_struktur: "Strukturer som möjliggör och begränsar",
    as_samspel:  "Aktör och struktur tillsammans"
  },
  4: {
    fk_forandring_kontinuitet: "Förändring och kontinuitet",
    fk_periodisering:           "Periodisering och brytpunkter"
  },
  5: {
    hb_identifiera: "Känna igen historiebruk",
    hb_typer:       "Syfte och typer av historiebruk",
    hb_syfte:       "Analysera historiebruk"
  },
  6: {
    ha_belagg:   "Belägg och slutsats",
    ha_tolkning: "Tolkningar och argument"
  }
};

/* Inga sammanslagna kort behövs här. Blandad träning görs i stället på
   kapitelnivå, så att eleven själv måste avgöra vilket verktyg som behövs. */
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
