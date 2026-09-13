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
  1: "Historiska källor",
  2: "Orsak och konsekvens",
  3: "Aktör och struktur",
  4: "Förändring och kontinuitet",
  5: "Historiebruk",
  6: "Belägg och historiska tolkningar"
};

/* Korta elevtexter som förklarar varför förmågan tränas. De används av
   gränssnittet men påverkar inte urval eller progression. */
var KAPINFOHIST = {
  1: "Läs, granska och använd källor för att besvara historiska frågor.",
  2: "Bygg förklaringar med flera orsaker och följ konsekvenser över tid.",
  3: "Undersök vad människor kunde påverka och vilka ramar de verkade inom.",
  4: "Se både det som förändrades och det som levde kvar — och motivera brytpunkter.",
  5: "Analysera hur det förflutna används i nutiden, av vem och med vilka följder.",
  6: "Pröva om slutsatser stöds av belägg och jämför konkurrerande tolkningar."
};

var OMRHIST = {
  1: {
    kk_grunder:  "Läsa och förstå en källa",
    kk_bedom:    "Granska en källa",
    kk_jamfora:  "Jämföra och pröva källor",
    kk_fraga:    "Välja källa till frågan"
  },
  2: {
    ok_typer:      "Sortera orsaker",
    ok_kedjor:     "Bygga en orsaksförklaring",
    ok_konsekvens: "Följa konsekvenser"
  },
  3: {
    as_aktor:    "Människors val och handlingsutrymme",
    as_struktur: "Samhällets ramar",
    as_samspel:  "Aktör och struktur i samspel"
  },
  4: {
    fk_forandring_kontinuitet: "Förändring och kontinuitet",
    fk_periodisering:           "Periodisering och brytpunkter"
  },
  5: {
    hb_identifiera: "Är det historiebruk?",
    hb_typer:       "Känna igen syften",
    hb_syfte:       "Analysera urval och följder"
  },
  6: {
    ha_belagg:   "Från belägg till slutsats",
    ha_tolkning: "Jämföra historiska tolkningar"
  }
};

var OMRINFOHIST = {
  kk_grunder:"Förstå vad källan är, vem som skapade den och vad den faktiskt säger.",
  kk_bedom:"Pröva äkthet, närhet, beroende, tendens och urval utan att döma ut källan.",
  kk_jamfora:"Följ uppgifter bakåt och avgör om källorna verkligen är oberoende.",
  kk_fraga:"Avgör vilken källa som kan besvara en viss fråga — och var gränsen går.",
  ok_typer:"Skilj långsiktiga villkor, utlösande faktorer, motiv och möjliggörare åt.",
  ok_kedjor:"Visa hur flera orsaker samverkar och väg deras betydelse.",
  ok_konsekvens:"Undersök följder för olika grupper, på kort och lång sikt.",
  as_aktor:"Bedöm vilka val en människa faktiskt hade i sin historiska situation.",
  as_struktur:"Se regler, ekonomi, normer och teknik som öppnar eller stänger möjligheter.",
  as_samspel:"Förklara både det historiska mönstret och människornas agerande i det.",
  fk_forandring_kontinuitet:"Jämför vad som förändrades med vad som bestod för olika grupper.",
  fk_periodisering:"Pröva brytpunkter och upptäck vad en periodindelning gör synligt.",
  hb_identifiera:"Avgör om det förflutna används för ett syfte i nutiden.",
  hb_typer:"Utgå från avsändare och syfte i stället för att bara memorera kategorier.",
  hb_syfte:"Analysera urval, budskap, målgrupp och möjliga konsekvenser.",
  ha_belagg:"Kontrollera steget mellan källmaterial och historisk slutsats.",
  ha_tolkning:"Väg tolkningar efter räckvidd, belägg och hur de möter invändningar."
};

/* Inga sammanslagna kort behövs här. Blandad träning görs i stället på
   kapitelnivå, så att eleven själv måste avgöra vilket verktyg som behövs. */
var GRUPPHIST = {};

/* Inga spårspecifika kapitelnamn (kursen har inga spår). */
var KAPNAMNHISTSPAR = null;

/* Gör namnen tillgängliga som window.X även om filen körs i modulläge. */
if(typeof window!=="undefined"){
  window.KAPNAMNHIST=KAPNAMNHIST;
  window.KAPINFOHIST=KAPINFOHIST;
  window.OMRHIST=OMRHIST;
  window.OMRINFOHIST=OMRINFOHIST;
  window.GRUPPHIST=GRUPPHIST;
  window.KAPNAMNHISTSPAR=KAPNAMNHISTSPAR;
}
