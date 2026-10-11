# Miniräknarens storlek

Användarbeslut 2026-10-11: miniräknaren ska kunna förstoras och förminskas
genom att dra i hörnet.

## Beteende

- Dra i hörnet nere till höger för att ändra både bredd och höjd med mus eller finger.
- Hörnet är synligt även när räknaren är dockad. En storleksändring släpper
  loss fönstret; rubriken kan sedan användas för att flytta eller docka det igen.
- Efter användarens återkoppling samma dag har minimigränsen sänkts från
  300 px bredd och innehållsberoende höjd till **240 × 330 px**. Text, knappar
  och marginaler krymper samtidigt; det räcker inte att bara krympa fönstret.
  Tangenterna fyller tillgänglig höjd. På låga skärmar går innehållet att rulla.
- Fönstret hålls inom skärmen vid storleksändring och efter byte av skärmstorlek.
- Flytande storlek och position sparas i den befintliga lokala inställningen
  `kunskapsgymmet-hjalpmedel3` och återställs efter sidladdning och uppgiftsbyte.
  Dockade fönster använder fortfarande dockkolumnens layout.
- Hörnet kan fokuseras med Tab. Piltangenter ändrar storleken med 10 px,
  Shift + piltangent med 40 px.
- Behörigheten att använda räknare följer samma uppgiftsregler som tidigare;
  fysik tillåter alltid miniräknare.

## Verifiering

`python tools/miniraknare-storlek.browser.py` använder den lokala servern
på port 8082 och Chromium (`/usr/bin/chromium`). Testet kontrollerar riktiga
musdrag, pekgest, avbruten pekgest, tangentbordsändring, sparad storlek efter
omladdning, uppgiftsbyte, liten och låg skärm, större tangenter, beräkningen
6 × 7 = 42 samt fortsatt storleksändring av formelbladet. Inga produktionsanrop.

Ingen SQL eller ny datainsamling behövs för denna ändring.
