# Öva på tidigare frågor under ett pass

Eleven kan klicka **Föregående** för att gå tillbaka till besvarade frågor i det
pågående passet. **Framåt** leder tillbaka genom frågorna till den pågående
frågan. Återbesök märks **Övning utan XP**.

Rättning och lösningsförslag fungerar även vid återbesök. De ger ingen XP och
ändrar inte serien, den adaptiva nivån, uppdrag, märken, provresultat,
passresultat eller försöksstatistik. Den centrala spärren i `finishAttempt`
gäller numeriska svar, flervalsfrågor, självbedömning och flerdelade frågor.

Den pågående frågans inmatning och svarstillstånd bevaras medan eleven går
bakåt. Det gäller även delresultat, valda alternativ, använd ledtråd och visat
facit. En omladdning återupptar den pågående frågan, med dess XP-spärr och
passets tidigare frågor. En redan räknad fråga kan inte ge nya belöningar vid
återupptagning. Historiken hör till det aktuella passet och återställs när ett
nytt pass börjar.

Kontroller:

- `node --test tools/pass-historik.test.js`
- `python tools/pass-historik.browser.py --port 8072` mot en lokal server.

Webbläsartestet använder Fysik 2 #1.3b och verklig rendering och rättning. Det
prövar rätt/fel vid återbesök, återställd inmatning, facit/ledtråd,
återupptagning och flera svarsformat. En anonym lokal testprofil används och
anrop till produktionsdatabasen blockeras. Mobilbredd 390 px och datorbredd
1174 px kontrolleras.
