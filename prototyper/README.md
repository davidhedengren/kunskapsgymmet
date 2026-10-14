# Lärar- och elevflöde – klickbar prototyp

Öppna `larare-elev.html` i en webbläsare. All HTML, CSS, JavaScript och exempeldata finns i samma fil. Inga API-anrop görs och inga riktiga konton påverkas. Prototypen är fristående från `index.html` och bevarar den granskade designen. Användaren godkände implementation och push 2026-10-14. Den riktiga vyn finns nu i `index.html`; här används fortfarande bara exempeldata.

## Prova detta

1. Lärare med grupper: växla mellan **Min undervisning** och **Träna själv**. Egen träning går via kurs → område → en fungerande exempeluppgift.
2. Öppna en grupp: **Översikt**, **Träningspass**, **Elever**. Kursen visas i gruppen och följer med när ett pass skapas. Gruppens statistik och passens deltagarstatus använder exempeldata.
3. Skapa ett pass och välj flera grupper. Överlappande elever räknas en gång. Elevens lista använder unika pass-ID:n.
4. Lägg till elever genom klassval. Flera klasser kan kombineras; befintliga medlemmar är ibockade. Sökning bevarar val. Att lägga till eleven ändrar inte klass eller andra gruppmedlemskap i prototypens modell.
5. Lärare vid första besöket: **Skapa min första grupp** → välj namn/kurs → importera klass → dela första passet.
6. Elev med pass: aktuella pass kommer först, egen träning direkt under. Elev utan pass: kursval direkt, ingen blockerande tom passlista.

Välj exempelroll i prototypfältet högst upp. Byte av exempelroll återställer demo-data; ingen data sparas efter omladdning. Den färdiga tjänsten ska behålla riktiga medlemskap och pass. Konto, kollegainbjudan och exempelstatistik illustrerar tänkt placering, inte nya produktionsfunktioner. Träningsvyn innehåller en exempeluppgift per ämne för att kunna prova vägen hela vägen fram till ett svar.

## Prototypens avgränsning

Den fristående prototypen ändrar ingen produktionsdata. Produktionsimplementationen dokumenteras i Uppgiftslabbets `agent/LARARFLÖDE_IMPLEMENTATION_2026-10-14.md`. Separeringen mellan klass och undervisningsgrupp visas i prototypen; den tidigare produktionskopplingen till topplisteklass behålls som en uttrycklig, valfri inställning i produktionen. Arkivering, komplett statistikberäkning, kollegainbjudan och eventuell automatisk klassimport ingår inte som färdig backend i denna prototyp.

## Kontroller

`tools/larare-arbetsflode-prototyp.browser.py` kör Chromium mot den lokala webbservern på port 8083. Verifierar tolv startsideslayouter (fyra exempelroller, 320/390/1440 px), lärarlägen, egen träning, ny grupp med kurs, klassimport, redan ibockade medlemmar, bibehållna andra medlemskap, unika mottagare/pass, elev med/utan tilldelat pass, smala grupp-/modalvyer och att inga externa anrop sker. Skärmbilder finns i `bilder/`.

Status 2026-10-14: **godkänd av användaren**. Knappen ”Träna själv” finns bredvid ”Skapa min första grupp”; den tidigare hjälpsentensen om att växla högst upp har tagits bort. Produktionsvyn använder befintliga RPC:er och kursstödet i `sql/2026-10-14-gruppkurs.sql`.
