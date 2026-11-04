# Fy1 – effekt och verkningsgrad med inre resistans, 2026-11-04

## Variation och omfattning

Baslinje `3600a68`. Familjen hade **14 huvuduppgifter**: nivå 1: 4, nivå 2: 8, nivå 3: 2. Fyra frågor (8.214/222/224/226) var talvarianter på I²r och två (8.234/240) på yttre effektandel. Dessa användbara rutinvarianter bevaras. Närliggande familj har 48 batteriuppgifter; de 14 var alltså ett snävt delområde, inte hela batteriträningen.

Nu **26 huvuduppgifter**: nivå 1: 6, nivå 2: 10, nivå 3: 8, nivå 4: 2. De **12 nya, 8.727–8.738**, varierar såväl representation som lösningsidé: energiflöde, omvänd effektbalans, tidsdiagram, jämförelse, parallellgren, lyftarbete, dimensionering, mätdata, två effektrötter, cellval med villkor, värme över tid och proportionalitet. Alla har en SVG-figur eller SVG-tabell. Det finns **29 spelbara kort** när 8.45 delas i fyra. Ingen nivå 5 har lagts till enbart för att fylla en kvot.

Alla 14 befintliga huvudfacit och 4 delkort är manuellt förbättrade enligt FACITMALL.md. Befintliga numeriska svar, frågor, nivåer och toleranser är bevarade. **Åtgärdade: 14. Nya: 12. Granskad – inget fel: inga hela uppgifter**, eftersom samtliga 14 behövde facitförbättring. De numeriska svaren var redan korrekta; detta är framför allt pedagogiska ändringar.

## Fynd och beslut

- **8.237:** ledtråden pekade mot yttre effekt trots att frågan gäller inre värme. Rättad. Jämförelser 8.215, 8.234, 8.240, 8.242 och 8.243 granskade: rätt effektandel och relevanta ledtrådar, inga motsvarande fel. Skilj alltid nämnaren total effekt från yttre effekt.
- **8.45:** fyra självständiga delkort får fullständiga svarsrader och egna ledtrådar. Egna givna värden är bevarade. Jämfört med de tidigare granskade 8.44, 8.93, 8.95, 8.162 och 8.164; inga ytterligare ändringar behövs där.
- **8.230:** undvik avrundat mellanled som skrivs med exakt likhetstecken; hela kvoten används fram till slutsvaret. Jämförelser 8.229, 8.231, 8.233, 8.238 och 8.409 använder full precision/korrekt ungefär-likhet efter föregående granskning.
- **8.729:** värme räknas för varje tidsintervall. Medelström ger fel vid I²r. Figuren är ett ström–tid-diagram, inte ett effektdiagram.
- **8.732:** polspänningen försörjer motorn; ems är inte motorens spänning. Godtar separata beräknade svar för g = 9,82, 9,81 och 9,8 via `svarTabell`. Inga standardkonstanter står i frågan.
- **8.735:** två strömmar är fysiskt möjliga, men bara den mindre ger den efterfrågade högre verkningsgraden. Facit visar båda grafiskt. Två namngivna svarsfält (Ω och %) och GeoGebra tillåtet.
- Alla uppgifter tillåter miniräknare. Endast nya 8.735 kräver GeoGebra. Avläsning av givna diagram/tabeller och direkt kvadratrotsomskrivning i 8.733 kräver inte grafverktyg.

## Kontroller

- Oberoende fysikmodeller för alla 26 huvudnycklar och 4 delkort i `tools/fysik1-efficiency-facit-2026-11-04.test.js`. Tidigare kopplings-, ems- och elektricitetsfördjupningstester passerar.
- Konsumentens verkliga rättningsfunktioner testas för alla 12 nya frågor, korrekta/felaktiga svar, enheter, procent, tabellvärden och två svarsfält: `tools/fysik1-efficiency-rattning-2026-11-04.test.js`.
- 30 facit med ledtrådar renderade vid 390 px med båda apparnas CSS: noll KaTeX-fel och noll överflödande rader. Samtliga 16 frågefigurer och den nya facitgrafen visuellt kontrollerade.
- SVG-validatorn används för alla 13 nya SVG:er. Grafetiketten i 8.735 flyttas från rutnätet efter kollisionssignal. Bakgrundsrektanglar ligger avsiktligt vid viewBox-kanten (INFO, ingen klippning av innehåll).
- Full bankvalidator: inga nya fynd jämfört med baslinjen. Fy1 har ett redan befintligt BROKEN_LATEX-fynd på 3.388 utanför denna omgång; övriga bankernas äldre fynd lämnas orörda. De två likhetsnotiserna i denna familj gäller de bevarade rutinvarianterna ovan. Inga ERROR/WARNING på ändrade/nya uppgifter.
- Redigeringsplanerna `efficiency.py` och `efficiency_figures.py` innehåller individuellt skrivna frågor och lösningar, inte automatiskt gissade facitrubriker.

## Alla granskade uppgifter och kommentarsförslag

Förslagen nedan skickas inte automatiskt. Rapportstatusar i Supabase ändras inte av bankpushen.

| Uppgift | Utfall | Kommentar |
|---|---|---|
| 8.214 | Åtgärdad | Facit visar formel, insättning och svar för värmen inne i batteriet. |
| 8.215 | Åtgärdad | Facit visar varför strömmen förkortas bort i kvoten mellan yttre och total effekt. |
| 8.45 | Åtgärdad | Alla fyra delkort får egen stegvis lösning, svarsrad och uppgiftsspecifik ledtråd. |
| 8.222 | Åtgärdad | Den inre värmeeffekten förklaras med rätt resistans och enhet. |
| 8.224 | Åtgärdad | Kvadreringen av strömmen och insättningen visas tydligt. |
| 8.226 | Åtgärdad | Facit visar beräkningen av värmeeffekten i en namngiven formel. |
| 8.228 | Åtgärdad | Inre spänningsfall beräknas före polspänningen. |
| 8.230 | Åtgärdad | Yttre resistans bestäms utan att avrunda totalresistansen i förtid. |
| 8.232 | Åtgärdad | Polspänningen används för effekten som når den yttre kretsen. |
| 8.234 | Åtgärdad | Effektandelen härleds från samma ström i båda resistanserna. |
| 8.237 | Åtgärdad | Ledtråden är rättad till den inre effekten. Facit visar varför svaret är 20 % av totalen. |
| 8.240 | Åtgärdad | Facit förklarar kvoten mellan yttre och total effekt. |
| 8.242 | Åtgärdad | Facit skiljer 20 % av den yttre effekten från 20 % av den totala effekten. |
| 8.243 | Åtgärdad | Ekvationen för önskad verkningsgrad löses med tydliga mellanled. |
| 8.727 | Ny | Ny nivå 1: energiflöde och energibalans, 400 J till yttre kretsen. |
| 8.728 | Ny | Ny nivå 2: bestäm inre värmeeffekt från ems, ström och mottagen effekt, 0,40 W. |
| 8.729 | Ny | Ny nivå 3: två strömintervall ger sammanlagt 21 J värme. Medelströmmen får inte kvadreras. |
| 8.730 | Ny | Ny nivå 3: två batterier jämförs med samma last. Effekten med A är cirka 1,42 gånger effekten med B. |
| 8.731 | Ny | Ny nivå 3: följ effekten till en gren i en parallellkoppling. Andelen är 44,4 %. |
| 8.732 | Ny | Ny nivå 3: batteriförlust, motorverkningsgrad och lyftarbete kombineras. Cirka 16 s; vanliga g-värden godtas. |
| 8.733 | Ny | Ny nivå 3: dimensionera en resistor från en värmegräns. Minsta resistans är 8,5 Ω. |
| 8.734 | Ny | Ny nivå 3: bestäm inre resistans ur två mätningar och använd den vid en ny ström, 2,25 W. |
| 8.735 | Ny | Ny nivå 4: två möjliga belastningar ger 8 W. Grafen visar båda; 2,0 Ω ger bäst verkningsgrad, 66,7 %. |
| 8.736 | Ny | Ny nivå 4: välj cellkoppling utifrån krav på verkningsgrad. Parallellkoppling ger 1,44 W och uppfyller kravet. |
| 8.737 | Ny | Ny nivå 2: bestäm inre resistans från bildad värme under en bestämd tid, 0,30 Ω. |
| 8.738 | Ny | Ny nivå 1: oförändrad ström och tredubblad inre resistans ger tredubblad värmeeffekt. |
