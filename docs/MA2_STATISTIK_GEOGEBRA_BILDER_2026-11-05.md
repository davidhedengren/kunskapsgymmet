# Ma2 – statistikfacit med GeoGebra och skärmbilder, 5 november 2026

Användarens uppdrag gäller hela statistikbanken. Detta är en första manuell omgång, inte en slutgranskning av hela banken. Varje facit ska ge de faktiska stegen och avlästa värdena för just sin uppgift. En textsökning identifierade 396 tänkbara statistikuppgifter i Ma2 utifrån område/familj; sökningen är inte heltäckande och inkluderar även rena tolkningsuppgifter. Fortsätt med övriga kurser och uppgifter efter individuell bedömning.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.450 | Åtgärdad | Facit visar kalkylblad, Envariabelanalys och statistikpanelen. En riktig skärmbild visar att s = 2 är Sx och att σ är ett annat mått. |
| 4.452 | Åtgärdad | Alla sju stegtal matas in och s avläses; Sx är cirka 1,8 tusen steg. |
| 4.453 | Åtgärdad | Facit visar hur de 15 observationerna skrivs in med rätt antal av varje skostorlek, och att s ≈ 1,18. |
| 4.457 | Åtgärdad | Först bestäms x = 13; därefter matas de tre talen in och s = 4 avläses. |
| 4.459 | Åtgärdad | Äggvikterna matas in och både Medel och s läses av. Svaren är 61,4 g och 2,7 g. |
| 6.09 | Åtgärdad | Väntetiderna matas in; en verklig skärmbild visar s ≈ 1,633 och σ ≈ 1,414. |
| 4.05 | Åtgärdad | Huvudfacit och b-kortet jämför materialen i GeoGebra. Raden s motsvarar Sx; a avslöjar inte b. |
| 4.10 | Åtgärdad | Facit visar hur båda materialen analyseras och Medel, Median och s avläses. |
| 4.14 | Åtgärdad | Facit visar hur man jämför s före och efter att ett värde tas bort. Minsta s fås när 24 tas bort. |
| 4.28 | Åtgärdad | Huvudfacit och delkort visar Medel respektive s; a avslöjar inte b. |
| 4.348 | Åtgärdad | Huvudfacit och a/b-kort visar hur Medel och s avläses för respektive material. |

## Gränssnitt och bilder

GeoGebras svenska webbaserade Classic-kalkylblad kontrollerades 5 november 2026 genom att faktiskt mata in 4, 6, 8 respektive 4, 6, 6, 8. Markera cellerna → stapeldiagramknappen → Envariabelanalys → Σx för statistikpanelen. I den panel som visades heter stickprovsstandardavvikelsen **s**, medan **σ** är populationsmåttet. Facit förklarar att s motsvarar uppgifternas Sx och skiljer s från σ. Gränssnitt kan variera mellan versioner.

De två PNG-bilderna i `bilder/` är verkliga avgränsade skärmbilder av de två ifyllda statistikpanelerna, inte ritade efterbilder. De innehåller inga personuppgifter. Kopiera båda filerna vid synkning av banken. HTML-facit har alternativtext och bilderna kontrollerades i 390 px med båda apparnas CSS.

## Kontroller

Alla ursprungliga svar, toleranser, nivåer och självrättningsflaggor är oförändrade. Medelvärden, medianer och stickprovsstandardavvikelser räknades oberoende om med n−1. För 4.14 har alla sex möjliga borttagningar kontrollerats. De 18 huvud-/delfacit som berörs renderades i 390 px med båda apparnas CSS utan formelfel, trasiga bilder eller överströmmande formler. Regressionskontroller finns i `tools/ma2-geogebra-statistik-2026-11-05.test.js`. Ma2-valideraren ger samma 86 tidigare fynd som före ändringen.

Inga rapportstatusar eller kommentarer har skickats till appen. Tidigare manuell alternativuträkning i dessa facit har ersatts med den efterfrågade GeoGebra-metoden; bevara relevanta matematiska villkor och beräkningar där de behövs, till exempel bestämningen av x i 4.457.
