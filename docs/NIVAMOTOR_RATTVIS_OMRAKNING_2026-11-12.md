# Rättvis omräkning av äldre profiler, 12 november 2026

## Bakgrund

En elev hade 35/35 starka moment i Ma5 på startsidan på morgonen och 15/35 senare samma dag, utan att ha gjort några uppgifter. Han hade bara öppnat kursen. Läraren och eleven valde alternativ 2: samma regel överallt, men äldre svar ska räknas med, och ingen ska tappa ett läge utan att ha gjort något.

## Orsak

1. **Två regler.** Kursmätaren på startsidan räknade en kurs som inte var öppen ur sparad förmåga utan krav på visad nivå (`formRatt` gav `Infinity` när `r` saknades), eller ur andel rätt när förmåga saknades. Den regeln gällde före 2026-11-05. När kursen öppnades räknades den om med den nya regeln, alltså med krav på minst två rätt utan ledtråd på nivå 3 eller högre, och resultatet sparades.
2. **Avkortad historik.** Historiken sparar bara de 300 senaste svaren per kurs. Omräkningen läste bara historiken, så äldre svar på nivå 3–5 försvann för den som hade tränat länge.

## Ändring (`index.html`)

- `formagaRattvis(area, cp, aktiv)` räknar förmågan för både öppen och stängd kurs. `lageFor` och `omradeM` använder den via `formagaLas` (öppen kurs) och `formagaInaktiv` (stängd kurs).
- Nivåstatistiken (`cp.levels`) räknas med. Den har alla svar, men varje nivå börjar med upp till tre påhittade startsvar (`levelStats`, när kapitelöversikten ritas). Därför räknas bara svar utöver tre, och högst sex per nivå, som i den äldre reserven.
- Förmågan blir den med störst chans på nivå 3, bland det sparade värdet, nivåstatistiken och historiken. Historiken räknas bara i en öppen kurs, eftersom nivåerna slås upp i kursens bank. Antal rätt per nivå blir det största värdet. Omräkningen kan alltså inte sänka ett läge.
- Resultatet markeras med `v: 2` (`FORM_VERSION`) och görs en gång per område. Nya svar sparas med versionen. En stängd kurs räknas utan att något skrivs.
- Profiler som redan har räknats ner, som elevens Ma5, saknar `v` och räknas om nästa gång de läses.

## Kvar att veta

- Ett område utan förmåga och utan riktiga svar i nivåstatistiken visas fortfarande med andel rätt i en stängd kurs, eftersom inget annat underlag finns. Det är ovanligt.
- Ett område där eleven aldrig har visat nivå 3 blir inte "Stark" någonstans. Det är 2026-11-05-regeln, och den gäller nu också på startsidan.

## Test

`tools/nivamotor-rattvis-2026-11-12.test.js` (elevens fall, samma läge öppen och stängd, startvärden räknas inte, största värdet behålls, versionen sparas). Hjälpen `tools/nivamotor-hjalp.js` laddar de nya funktionerna. Övriga tester för nivåmotorn är gröna.
