# Fy1 elektrisk effekt och energi – 2026-11-04

Hela familjen är synkroniserad från master: **80 huvudfacit och 78 delkort**, manuellt skrivna och kontrollerade. Facit följer den nya mallen med namngivna formelsteg, insättningar och kompletta svar. Missriktade ledtrådar är förbättrade. Frågor, figurer, nivåer och verktygsval bevaras.

8.659 har nu ett oavrundat rättningsmål, 500·√(0,50/400), i stället för 17,7. Det visade svaret är fortsatt 17,7 V. Verkliga rättningsfunktionen verifierar 20, 18, 17,7, 17,68 och 17,678, och avvisar felavrundningar och fel enhet.

[Alla 80 granskade ID, åtgärder och kommentarsförslag](https://github.com/davidhedengren/Uppgiftslabbet/blob/main/agent/FY1_ELEFFEKT_FACIT_2026-11-04.md). Alla 80 är pedagogiskt åtgärdade; listan ”Granskad – inget fel” är tom. Ingen kommentar eller rapportstatus har skickats till Supabase.

Kontroller: alla numeriska nycklar verifierade med oberoende fysikmodeller, kortens egna givna värden bevarade, 158 facit renderade vid mobilbredd med båda apparnas CSS utan formelfel eller överbredd. 25 befintliga frågefigurer samt utvalda facit är visuellt kontrollerade. Före synk var konsumentbanken identisk med senast publicerade master, inklusive parallellsessionens gravitationsgranskning. Bankcacheversionen är höjd.

Tester: `tools/fysik1-eleffekt-facit-2026-11-04.test.js` och `tools/fysik1-eleffekt-rattning-2026-11-04.test.js`.
