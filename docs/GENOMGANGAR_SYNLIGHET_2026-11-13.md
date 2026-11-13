# Genomgångarna syns tydligare i kursvyn (2026-11-13)

Användaren tyckte att genomgångarna var lite dolda. De låg i en liten knapp i kapitelraden, ”Det här behöver
du kunna 0/16”. Tre skisser jämfördes:

- A: samma knapp med nytt namn
- B: ett eget kort först i kapitlet
- C: B och dessutom en länk på varje områdeskort

Användaren valde C. Om korten blir för röriga är B reservalternativet: ta då bort `omradeGenomgang` ur
områdeskorten.

## Så ser det ut

- **Kapitelkortet** (`chapterKnowledge`, klassen `kap-kunskap`) ligger först i kapitlets rutnät, före
  områdena. Det har samma form som ”Blandat” men accentfärg. Rubriken är ”Genomgångar”, och undertexten är
  ”Det här behöver du kunna i <kapitel> · n korta genomgångar”. Kortet visar också en stapel och en kvot.
  Kapitelraden har inte längre någon genomgångsknapp. Kortet blir guldfärgat när alla genomgångar är lästa.
- **Länken på områdeskortet** (`omradeGenomgang`, klassen `omr-gg`) öppnar `oppnaKunskap(kap, kort)`, alltså
  bara områdets egna genomgångar. Länken är en egen knapp ovanför kortets klickyta, så att ett klick inte startar
  träningen. Texten är ”3 genomgångar”, ”2/5 genomgångar lästa” eller ”Genomgångarna lästa” (guld). Områden
  utan genomgångar får ingen länk.
- **Uppdatering efter läsning:** `uppdateraKunskapsindikator` uppdaterar kvot, stapel och etikett på
  kapitelkortet och ritar om länkarna i kapitlet.
- Rutan som öppnas heter fortfarande ”Det här behöver du kunna”, alltså samma ord som undertexten.

## Kontroll

`tools/genomgangar-kort-2026-11-13.browser.cjs` testar Fy1 i dator, mobil och ljust tema. Kunskapsgymmets
övriga testfiler (`tools/*.test.js`) ger samma resultat som före ändringen. Tio filer var röda redan före
ändringen och berörs inte.

## Ändring samma dag: bara boksymbol på områdeskorten

Användaren ville ha renare kort. Områdeskortet visar nu bara en boksymbol (34 × 34 px, samma storlek som
punktträningsknappen, placerad före den) i stället för texten ”3 genomgångar” eller ”2/5 genomgångar lästa”.
Symbolen har accentfärg och blir guldfärgad när områdets genomgångar är lästa. Antalet lästa står i `title`
och `aria-label`, till exempel ”Genomgångar i Densitet · 2 av 5 lästa”. Framsteget för hela kapitlet syns på
genomgångskortet högst upp. Testet kontrollerar att symbolen inte har någon synlig text.
