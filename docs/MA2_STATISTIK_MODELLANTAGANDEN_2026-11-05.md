# Ma2 – modellantaganden och sammanslagna material, 5 november 2026

Fem uppgifter har granskats. Tre har åtgärdats och två befanns korrekta. I de sammanslagna materialen preciseras gruppstorleken och att spridningen är Sx. Bussuppgiften kräver en angiven fördelningsmodell för att sannolikheterna ska kunna bestämmas.

| Uppgift | Bedömning | Förslag på kommentar |
|---|---|---|
| 4.102 | Åtgärdad | Frågan anger nu 25 elever per klass och Sx. Facit visar att sammanslagen Sx är cirka 4,95 poäng, alltså ungefär 5. |
| 4.114 | Åtgärdad | Frågan anger nu 12 värden per grupp. Facit visar hur spridningen inom och mellan grupperna ger Sx ≈ 11,33. |
| 4.213 | Åtgärdad | Normalfördelning anges nu som modell. Facit visar i GeoGebra att risken för en försening över åtta minuter är cirka 0,0032 % för buss 1 och 20,23 % för buss 2. |
| 4.65 | Granskad – inget fel | Lådagrammet ger stöd för att Q troligen har större spridning; frågan anger att jämförelsen är sannolik, inte säker. |
| 4.121 | Granskad – inget fel | En mindre standardavvikelse innebär inte att varje enskilt värde ligger närmare medelvärdet än varje värde i en annan grupp. |

Äldre loggposter från 2026-10-11 och 2026-10-14 angav att 4.102, 4.114 och 4.213 inte hade fel. Den nya självständiga granskningen ersätter den bedömningen: ett sammanslaget Sx beror på gruppstorlek (för två lika stora grupper med två värden var blir 4.102 cirka 2,89), och medelvärde och standardavvikelse bestämmer inte ensamma sannolikheten för en viss svans. 4.114:s tidigare påstående om hur de flesta värden ligger följde inte heller enbart av parametrarna. För 4.213 betyder negativ tidsavvikelse att bussen är före tidtabellen, vilket gör normalmodellen begriplig. Tidigare rätta svarsalternativ bevaras; GeoGebra och miniräknare tillåts nu för 4.213. Även 4.102 och 4.114 tillåter GeoGebra och miniräknare, och facit visar vad som kan matas in.

Oberoende normalfördelnings- och stickprovskontroller finns i `tools/ma2-statistik-modellantaganden-2026-11-05.test.js`. Tidigare regressioner passerar, och de tre ändrade faciten har renderats i mobilbredd med båda apparnas CSS. Ingen rapportstatus har ändrats. Statistikbanken är inte färdiggranskad.
