# Uppdragsboken

Tränarens uppdragsrulle har ersatts av ett klickbart bokomslag. Boken öppnas i en dialog med ett uppslag: dagens fokus till vänster, övriga uppdrag till höger. På mobil visas sidorna under varandra med egen scroll; blädderknapparna finns kvar utanför pappersytan. Boken tar inte mer plats i kursvyn när den öppnas.

Eleven kan bläddra mellan senaste veckans dagar med knappar, piltangenter eller horisontellt svep, samt gå direkt till idag. Tomma dagar visar att inga uppdrag har sparats. Escape och stängknappen stänger boken och återställer fokus. Bakgrunden är inert medan dialogen är öppen. Omslaget öppnas och papperssidorna vänds med 3D-animationer; reducerad rörelse stänger av animationerna. Datumpositionen är bunden till konto och kurs. Boken stängs vid konto-, kurs- eller vybyte.

Den befintliga veckohistoriken, uppdragsdefinitionerna, XP-räknarna och serverstödet för äldre uppdrag används oförändrade. Tidigare dagars uppdrag startas fortfarande genom `uppdragStarta`, med halva belöningen och befintlig serverkontroll. Den redan tillagda SQL-migreringen `sql/2026-10-14-uppdragsbok.sql` har inte ändrats. Ingen uppgiftsbank eller självrättning ändras i denna leverans.

Vyn ligger i `uppdragsbok.js` och `uppdragsbok.css`. `index.html` laddar dem och kopplar de befintliga öppnings-, bläddrings- och startfunktionerna till vyn. Bokomslaget är en egen genererad bild, sparad som en transparent WebP på cirka 75 kB i `assets/uppdragsbok.webp`.

Verifiering:

```bash
node --test tools/*.test.js
python3 -m http.server 8001 --bind 127.0.0.1
# I en annan terminal:
node tools/uppdragsbok-vy.browser.js
```

Browserprovet använder Playwright och Chromium (`CHROME_PATH` kan ange binären). `KG_TEST_URL` kan ange en annan lokal testserver. Om CDN-filer finns lokalt kan `KG_TEST_DEPS` ange katalogen med `katex/package` och `nerdamer/package`; annars används appens vanliga CDN. Alla profiler och RPC-anrop i testet är isolerade testdata. Den äldre Python-ingången `tools/uppdragsbok.browser.py` kör samma uppdaterade browserprov.

Browserprovet bevarar den tidigare rullvyns kontroller av veckohistorik, kursgränser, engångsbelöningar, pass/återupptagning och serverstöd. Därutöver kontrolleras 12 öppna/stängda tillstånd vid 1440, 390 och 320 pixlar i båda teman, papperssidornas scroll, tangentbordsfokus, animationer, svep och stängning vid konto- och kursbyte. Sidans befintliga bredd får inte öka när boken öppnas; själva dialogen och papperssidorna ska helt rymmas inom skärmen.
