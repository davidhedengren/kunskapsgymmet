# Instruktioner för alla AI-agenter

Läs `CLAUDE.md`. Uppgiftslabbet är master för de gemensamma bankerna.

Före ändringar i uppgifter eller självrättning ska du läsa:

- `../Uppgiftslabbet/agent/ARBETSINSTRUKTION.md`
- `../Uppgiftslabbet/agent/FELMONSTER_OCH_BESLUT.md`
- Tidigare granskningsloggar för berörda uppgifts-ID:n och de tester som registret länkar.

Om masterrepon inte finns bredvid detta repo, använd motsvarande filer i
masterrepons checkout eller på GitHub:
https://github.com/davidhedengren/Uppgiftslabbet/tree/main/agent

Sök efter liknande fel (minst fem jämförelser när relevanta uppgifter finns).
Återställ inte en tidigare rättning utan att läsa motiveringen och självständigt
verifiera att ett nytt beslut behövs. Dokumentera skälet i masterrepons logg och
uppdatera regressionstesterna. Ta inte bort eller försvaga tester för att dölja
ett återkommande fel. Kopiera inte bankfiler innan båda repona jämförts.

Nya felmönster dokumenteras i masterrepons register, inte i en separat konkurrerande kopia.

Fysik får alltid använda miniräknare enligt användarbeslut 2026-10-09.
Använd `miniräknare:true` även för fysikens enkla begreppskort. Beslutet
finns i masterrepots `agent/PEDAGOGISKA_REGLER.md`; nivå bedöms separat.
