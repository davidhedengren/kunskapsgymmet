# Adaptiviteten i Kunskapsgymmet – analys och förslag (2026-11-05)

Uppdrag från användaren: gå noggrant igenom adaptiviteten. Det ska verkligen kännas adaptivt, så att
eleven jobbar på sin nivå. Det här dokumentet beskriver hur motorn fungerar i dag, vad som brister
(med siffror från en simulering), och ett förslag i faser.

Simulatorn ligger i `tools/adaptiv-sim/` och kan köras om:

- `node tools/adaptiv-sim/sim.js 300 40` jämför motorerna under de första 40 uppgifterna i ett område.
- `node tools/adaptiv-sim/sim.js 150 100 40` jämför motorerna under uppgift 41–100.
- `node tools/adaptiv-sim/bankstat.js` visar hur nivåerna är fördelade i bankerna.

## 1. Så fungerar motorn i dag (`index.html`)

| Del | Funktion | Hur |
|---|---|---|
| Område | `chooseArea` | Behärskning · 0,5 + slump (0–1) + straff för senaste området. Slumpen dominerar. |
| Färskhet | `farskaUppgifter` | Sedda kort filtreras bort **innan** nivån väljs. |
| Upplåsning | `oppnaNivaer`/`nivaKlarad` | En nivå öppnas efter **3 rätt** utan ledtråd på nivån under, någonsin, i området. |
| ”Nådd nivå” | `naddNiva` | **2 rätt** utan ledtråd på nivån räcker. Nivån blir då passets tyngdpunkt (vikt 2,2). |
| Backning | `kamparPa` | Minst 2 fel av de 3 senaste på en nivå ger vikt 0,12. Två rätt på nivån eller lägre häver backningen. |
| Mix | `levelWeights`/`levelMix` | Vikter efter avstånd till högsta nådda nivå. Golv: minst 10 % på lägsta nivån. Uppvärmning: passets 2 första uppgifter ligger en nivå lägre. |
| Statistik | `updateLevelStat`, `updateMastery` | Glidande medelvärden av andel rätt per nivå, område och delmoment. |
| Kedjor | `kedjaStarta` | Deluppgifter visas alltid från a). Svårare delar kan hoppas över. |

## 2. Vad som brister

### 2.1 Upp- och nedflyttning bygger på antal, inte på träffsäkerhet

- Två rätt på en nivå gör den ”nådd” för alltid, eftersom historiken sparar 300 svar. Gissade flervalssvar räknas också.
- Därefter backar motorn bara tillfälligt, efter två fel av tre. Två rätt på en lägre nivå räcker för att gå tillbaka upp.
- En elev som klarar 35 % på nivå 4 pendlar därför mellan nivå 4 och nivå 3, i stället för att stanna på nivå 3.

### 2.2 Varje område börjar om från nivå 1

- Upplåsningen kräver 3 rätt per nivå i varje område. Förkunskap från andra områden används inte.
- En stark elev måste därför göra minst 6 lätta uppgifter i varje nytt område innan nivå 3 ens öppnas.
- I ett grundpass med 6–8 aktiva områden får varje område ungefär en uppgift per pass. Det tar då flera pass att komma upp i nivå i ett nytt område.

### 2.3 Färskhetsfiltret tvingar fram fel nivå

- Sedda kort tas bort före nivåvalet. När korten på elevens nivå tar slut ger motorn färska kort på fel nivå.
- En svag elev får då de svåra korten som är kvar, och en stark elev de lätta.
- Det slår hårt eftersom toppen är tunn i bankerna (se 2.5).

### 2.4 Statusetiketterna straffar den som jobbar på rätt nivå

- ”Stark”, ”På gång” och ”Behöver träning” bygger på andel rätt, oavsett nivå (`updateMastery`).
- Jämviktsvärdet blir ungefär 0,65 vid 75 % rätt, alltså ”På gång”, och 0,85 vid 90 % rätt, alltså ”Stark”.
- En elev som tränar på rätt nivå och lyckas 3 av 4 gånger visas därför som ”På gång” för alltid. En elev som stannar på nivå 1 och lyckas 90 % visas som ”Stark”.
- Samma mått styr teknik- och tungt pass (`svagaInom`/`starkaInom`), så även de passen väljer områden på fel grund.

### 2.5 Innehållet sätter ett tak (`bankstat.js`)

Antal spelkort per träningsnivå. Delkort räknas för sig. ”Utan” anger antal områden som helt saknar nivån.

| Kurs | Nivå 1 | Nivå 2 | Nivå 3 | Nivå 4 | Nivå 5 | Områden utan nivå 4 | Områden utan nivå 5 |
|---|---|---|---|---|---|---|---|
| Fy1 | 1468 | 2686 | 1525 | 319 | 20 | 20 av 55 | 44 av 55 |
| Fy2 | 498 | 873 | 707 | 111 | 150 | 10 av 37 | 7 av 37 |
| Ma1 | 1429 | 2327 | 833 | 374 | 101 | 6 av 79 | 38 av 79 |
| Ma2 | 1237 | 1217 | 786 | 162 | 168 | 10 av 63 | 10 av 63 |
| Ma3c (mato1) | 329 | 1544 | 625 | 216 | 46 | 3 av 50 | 19 av 50 |
| Ma4 (mato2) | 1095 | 1316 | 638 | 165 | 48 | 4 av 49 | 25 av 49 |
| Ma5 (matf1) | 404 | 772 | 559 | 203 | 62 | 5 av 35 | 11 av 35 |

Där nivå 4 finns har ofta bara 1–7 kort, till exempel i 56 av Ma1:s 79 områden. Starka elever i Fy1 och Ma1 får därför slut på utmaningar oavsett hur bra motorn är. Längst ner finns ett liknande problem: för de svagaste eleverna är även nivå 1 för svår (cirka 55 % rätt i simuleringen).

### 2.6 Kedjor börjar alltid på del a

- I Fy1 är 55 % av spelkorten delkort i kedjor, och i Ma4 54 %. En kedja har i snitt 2,8–3,2 delar.
- I 480 av Fy1:s 1189 kedjor ligger del a lägre än kedjans svåraste del.
- Varje del räknas som en uppgift. Ett pass på 8 uppgifter är därför ofta bara 3 ursprungsuppgifter.
- En elev på nivå 3 får dessutom först lösa nivå 1-delarna.
- Varje del räknas också som oberoende evidens: en ”222”-kedja låser upp nästa nivå i ett enda svep.

### 2.7 Områdesvalet är nästan slumpmässigt

`chooseArea` väger behärskning med 0,5 mot en slumpterm mellan 0 och 1. Det tar inte hänsyn till:

- var eleven har mest att vinna,
- hur länge sedan området tränades (spridd repetition),
- vilket område klassen just börjat på (det nämns i passtexten men vägs inte in i valet).

## 3. Simulering

**Modell.** Simulerade elever med känd förmåga θ. Sannolikheten för rätt svar är P = c + (1 − c)·σ(1,7·(θ − b)).

- Varje kort har svårigheten b = nivåns svårighet + ett eget brus δ, där δ ~ N(0; 0,45) eftersom författarens nivå är grov.
- 15 % av korten är flerval med c = 0,25 (gissning). Övriga har c = 0.
- Eleven lär sig långsamt: θ ökar med 0,008 per uppgift.
- Varje pass har 8 uppgifter, och motorn är en exakt kopia av dagens nivåval.

**Mått.** En uppgift räknas som ”i zonen” när eleven har 60–90 % chans att lyckas, ”för lätt” över 90 % och ”för svår” under 60 %.

**Resultat.** Typiskt Fy1-område med 27, 49, 28, 6 och 0 kort på nivå 1–5. 150 simulerade elever per typ. Fas 1 och fas 3 beskrivs i avsnitt 4.

| Elev | Motor | I zonen, uppg. 1–40 | För lätt, uppg. 1–40 | I zonen, uppg. 41–100 | I zonen från uppgift |
|---|---|---|---|---|---|
| Svag (θ −1,3) | I dag | 44 % | 1 % | **18 %** | 6 |
| | Fas 1 | 60 % | 3 % | **71 %** | 5 |
| | Fas 1 + 3 | 79 % | 3 % | 79 % | 3 |
| Medel (θ 0,2) | I dag | 40 % | 49 % | 39 % | **14** |
| | Fas 1 | 54 % | 32 % | 52 % | **5** |
| | Fas 1 + 3 | 72 % | 23 % | 61 % | 3 |
| Stark (θ 0,9) | I dag | 26 % | **70 %** | 14 % | **27** |
| | Fas 1 | 51 % | 39 % | 38 % | **6** |
| | Fas 1 + 3 | 59 % | 37 % | 37 % | 3 |
| Mycket stark (θ 1,7) | I dag | 10 % | 90 % | 1 % | 37 |
| | Fas 1 | 26 % | 72 % | 12 % | 11 |

I ett område som har nivå 4–5 (25, 35, 30, 15 och 8 kort) ligger en mycket stark elev i zonen 48 % av tiden med fas 1, mot 13 % i dag. Taket i tabellen ovan beror alltså på innehållet.

## 4. Förslag

### Fas 1 – ny nivåmotor (störst effekt; ändrar bara `index.html`)

1. **Förmåga per område i stället för räknade rätt.**
   - Lagra `{mu, sd, n}` per område, alltså en skattad förmåga med osäkerhet.
   - Uppdatera med Bayes efter varje svar, på ett rutnät med 61 punkter, och lägg till ett litet processbrus så att skattningen kan följa elevens inlärning.
   - Rätt med ledtråd räknas som y = 0,5, och delvis rätt som andelen rätt.
   - Flervalskort får en gissningsgräns c = 1/antal alternativ.
   - Delkort i samma kedja vägs med 0,7, eftersom svaren hänger ihop.
2. **Förkunskap från andra områden.** Ett nytt område startar på elevens skattade förmåga i kursen, med mu ungefär kursmedelvärdet minus 0,3 och sd 0,7. Utan någon historik startar området på mu −0,6 och sd 1,1.
3. **Nivån väljs mot en målträffsäkerhet.**
   - Varje nivå får vikten exp(−((P̄ − mål)/0,1)²), där P̄ är den förväntade träffsäkerheten givet skattningen.
   - Målet beror på passtypen: grundpass 75 %, teknik 85 %, mängd 82 %, tungt 62 % och repetition 80 %.
   - Vid stor osäkerhet siktar motorn lägre, mot 60 %, eftersom sådana frågor säger mest om eleven. Det ger snabb placering.
4. **Mjuk färskhet.**
   - Kort från det egna passet visas aldrig igen.
   - Andra sedda kort straffas efter hur nyligen de visades, med faktorn (ålder/80)² · 0,8. De blir alltså gradvis tillgängliga igen i stället för att filtreras bort.
   - Ett kort på rätt nivå som eleven såg för länge sedan går före ett nytt kort på fel nivå.
5. **Dagsform.**
   - Passets första uppgift får målet 85 %, när nivån är känd.
   - Efter två fel i rad får nästa uppgift målet 88 %, alltså en uppgift som eleven sannolikt klarar.
   - Detta ersätter ”kämpar”-regeln, uppvärmningen och golvet på 10 %.
6. **Upplåsning och tränarens kommentarer härleds ur skattningen.** En nivå räknas som öppen när eleven har minst 35 % chans att lyckas, och som nådd vid minst 70 %. Kommentarerna ”Nu öppnas nivå 4” och ”Vi tar ett par lite enklare” fungerar då som i dag.
7. **Migrering.**
   - Befintliga `cp.levels[omr][L] = {s, n}` räknas om till mu och sd en gång, med högst 6 pseudosvar per nivå.
   - Det gamla fältet ligger kvar, så att en återgång är möjlig.
8. **Tester.** Simulatorn blir ett regressionstest. Kraven:
   - En stark elev placeras inom 8 uppgifter.
   - Ett nytt område med förkunskap placeras inom 4 uppgifter.
   - Andelen uppgifter i zonen är minst lika hög som i dag för alla elevtyper.

### Fas 2 – kedjor, områdesval och etiketter

1. **Kedjor startar vid rätt del.** Delar som är långt under elevens nivå (P̄ över 93 %) visas hopfällda som ”under din nivå”. Det går, eftersom delkorten redan är självbärande: varje del har samma inledning och sina egna mellanresultat.
2. **Områdesval efter behov.** Poängen bygger på:
   - hur mycket eleven har kvar att vinna, mätt mot kursmålet,
   - tid sedan området senast tränades (spridd repetition),
   - lektionsområdet (`traningsOmraden().nytt`),
   - en liten slumpterm.
3. **Statusetiketter och ringar från förmågan i stället för andel rätt.**
   - ”Grunderna klara” när eleven har minst 85 % chans på nivå 2 och sd är högst 0,5.
   - ”Tillämpning” när eleven har minst 75 % chans på nivå 3.
   - ”Utmaning” när eleven har minst 65 % chans på nivå 4.
   - Teknik- och tungt pass väljer områden efter samma mått.
4. **Synlig återkoppling**, till exempel: ”Uppgifterna väljs så att du klarar ungefär 3 av 4. Din nivå i området just nu: 3,2.”

### Fas 3 – kalibrerad svårighet per kort

- Tabellen `kg_handelse` innehåller redan uppgifts-ID, nivå, rätt eller fel och ledtråd för varje svar.
- Ett skript räknar fram varje korts svårighet b. Resultatet krymps mot nivåns b när det finns få svar per kort.
- Svårigheterna läggs i en fil per kurs (t.ex. `svarighet-fy1.js`) som laddas med banken. Inget anrop sker under träningen.
- Motorn väljer sedan kortet närmast målet, inte bara nivån. Det ger 10–20 procentenheter fler uppgifter i zonen (tabellen ovan).
- Samma data visar också felnivåsatta kort som läraren bör nivåsätta om, till exempel en nivå 2-uppgift som bara 30 % klarar.

### Fas 4 – innehåll (kan inte lösas av motorn)

- **Nivå 4–5 där det saknas.** Prioritera Fy1 och Ma1, där 20 respektive 6 områden helt saknar nivå 4 och många har högst 7 kort.
- **Ett golv för de svagaste.** Stegvisa kort på nivå 1 med mycket stöd, eller ett automatiskt förslag om genomgång efter två fel på lägsta nivån. `hittaGenomgangForslag` finns redan.

## 5. Risker och beslut som behövs

- **Elevernas upplevelse.** Med målet 75 % får eleverna fler fel än i dag. I dag ligger starka elever på 90–96 % rätt; med förslaget blir det 81–85 %.
  - Det är meningen: det är så eleven jobbar på sin nivå.
  - Men tränarens texter och XP behöver kännas belönande även vid fel. XP per nivå finns redan.
- **Målvärdet** (75 %) är ett beslut för läraren. Ett mål på 70–80 % brukar rekommenderas för övning.
- **Befintliga elevers nivåer** räknas om vid migreringen. Några kommer att se en annan nivå i området än tidigare.

## 6. Fas 1 genomförd 2026-11-05

Användaren godkände fas 1 med målet 75 %. Ändringen ligger i `index.html`, i blocket ”Nivåmotorn”, och i `chooseTask`, `finishAttempt`, `beginSession` och `passNivaSpann`.

- **Förmåga per område.** Den lagras i `cp.formaga[omr] = {mu, sd, n, at}` och följer med profilen till molnet.
  - Nivåernas svårighet är `FORM_B`: −1,5, −0,75, 0, 0,75 och 1,5 för nivå 1–5.
  - Uppdateringen sker med Bayes på ett rutnät, med processbrus 0,012 och sd mellan 0,3 och 1,4.
- **Ett svar per kort.**
  - Rätt räknas som 1, fel som 0 och delvis rätt som andelen rätt. Rätt med ledtråd räknas som hälften.
  - Om lösningen visades före svaret räknas det som 0.
  - Flervalskort med ett rätt alternativ får gissningschansen 1/antal alternativ.
  - Delkort i en kedja vägs med 0,7.
- **Målchans per passtyp:** grund 75 %, teknik 85 %, mängd 82 %, tungt 62 % och repetition 80 %.
  - Vid stor osäkerhet sänks målet mot 60 %.
  - Passets första uppgift får minst 85 % när eleven har gjort minst 6 uppgifter i området.
  - Efter två helt fel svar i rad i passet får nästa uppgift minst 88 %.
- **Målkurvan är asymmetrisk**, med bredden 0,15 under målet och 0,09 över. En lite för svår uppgift är bättre än en för lätt. Det gör också att den som nått nivå 5 inte åker ner för ett enstaka fel, enligt beslutet 2026-10-22 (`tools/niva-hall.test.js`).
- **Nytt område.** Startvärdet är elevens förmåga i kursens andra områden, minus 0,3, med sd 0,75. Startvärdet sparas först när eleven svarar.
- **Gamla profiler.** Områdets svar i historiken spelas upp en gång. Saknas historik används den gamla nivåstatistiken, med högst 6 svar per nivå. `cp.levels` och `cp.areas` uppdateras som förut, så att ringar och etiketter fungerar tills fas 2 är byggd.
- **Mjuk färskhet** (`mjukaUppgifter`, `formFarskhet`). Provträningen behåller den hårda färskheten.
- **Tränarens kommentarer.**
  - En nivå räknas som öppen vid minst 35 % chans att lyckas.
  - ”Nu öppnas nivå X” visas bara första gången nivån öppnas i området, med minnet i `cp.nivaOppnad`.
  - ”Vi tar ett par lite enklare” visas efter två fel i rad.
- **Borttaget:** `nivaKlarad`, `oppnaNivaer`, `kamparPa`, `naddNiva`, `levelWeights`, `levelMix`, uppvärmningen, golvet på 10 % och passtypernas nivåvikter.
- **Tester.**
  - `tools/nivamotor-2026-11-05.test.js` simulerar elever med de riktiga funktionerna. Kraven är placering inom 8 uppgifter och minst 45 % i zonen för en medelelev, minst 40 % för en stark elev och minst 55 % för en svag elev efter uppgift 40. Dessutom prövas omräkning av gamla profiler, startvärde i nytt område och vikterna för ledtråd, flerval och delkort.
  - `tools/niva-hall.test.js` prövar nu beslutet 2026-10-22 mot nivåmotorn.
  - De övriga node-testerna har samma fel som före ändringen: `admin-online`, `felrapporter-2026-10-25`, `ma3-sinus-c`, `ma3-funktioner-c` och `delkort`.
- **Kontroll i webbläsaren** (Fy1, utan inloggning, med databasanrop blockerade):
  - En elev med bara rätt svar gick från nivå 2 till nivå 3 på uppgift 2, nivå 4 på uppgift 8 och nivå 5 på uppgift 10.
  - Ett nytt område startade på nivå 3.
  - Två fel i rad gav en lätt uppgift, och därefter kom eleven tillbaka till nivå 3.
  - Konsolen var fri från fel.
