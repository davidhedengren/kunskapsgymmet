# Välj mottagare för träningspass

I formuläret **Nytt träningspass** kan läraren kryssa i en hel grupp eller öppna **Välj elever** och markera en eller flera elever. Samma val finns vid redigering. Start från en grupp förväljer hela gruppen; avmarkera gruppen för att börja med ett tomt elevurval. Avmarkering av en elev i en hel grupp omvandlar gruppens nuvarande medlemmar till individuella val.

Hela grupper och individuella elever kan kombineras. Samma elev räknas en gång även när urvalen överlappar. Hela grupper omfattar också framtida medlemmar; individuella urval omfattar bara de valda personerna. Lärarens gruppöversikt visar även egna pass till individuella elever i gruppen.

## Aktivering

1. Kör hela [2026-10-16-traningspass-elevval.sql](../sql/2026-10-16-traningspass-elevval.sql) i projektets Supabase SQL Editor. Den kräver de befintliga pass-, grupp- och lärarmigrationerna från 2–9 oktober. Körningen är transaktionell och kan upprepas.
2. Publicera den uppdaterade `index.html`. Tidigare klienter och befintliga pass fungerar med den nya SQL-versionen.
3. Verifiera med lärar-/testkonton: skapa till en elev, kontrollera elevens startsida och att en annan elev inte får passet automatiskt, redigera urvalet och öppna resultatlistan.

Klienten erbjuder elevval först när `kg_prov_elevval` uttryckligen returnerar stöd. Utan migrationen fungerar fortfarande hela grupper och den befintliga delningen med kod. Ett misslyckat sparande behåller formulärets val. Ett individuellt pass får inte sparas med en äldre RPC som tappar mottagarna.

## Datamodell och behörighet

- `kg_provtraning.elever` innehåller uttryckligt valda UUID:n. `grupper` behåller betydelsen hela grupper. Inga gruppmedlemskap eller klassval ändras.
- De nya skapa-/redigera-RPC:erna validerar eleverna och anropar befintliga passfunktioner i samma transaktion. Nya mottagare måste finnas i lärarens egna grupper. Tidigare mottagare kan behållas vid redigering. Redigering låser passraden.
- Elevens startsida och rapportering använder samma behörighetshjälpare. Lärarens resultatlista inkluderar individuella mottagare även innan de har börjat, samt tidigare resultat och kodanslutningar som förut.
- Mottagarnamn lämnas endast i lärarens API, aldrig i elevens passobjekt. Elevurvalets API returnerar namn och grupp-ID:n, inga mejladresser eller träningsresultat.
- Kod/länk är fortsatt en separat inbjudan: andra elever kan ansluta om läraren delar koden med dem. Individuellt urval begränsar automatisk tilldelning, inte den befintliga koddelningen.

## Lokal verifiering

`tools/prov-elevval.integration.js` kör den faktiska migrationen och befintliga pass-RPC:er i PGlite. Den kontrollerar en/flera/hela grupper, överlapp, elevsynlighet, rapportbehörighet, redigering, atomiska avslag, avaktiverad lärare, kodanslutning, migreringsupprepning och RPC-rättigheter.

`tools/prov-elevval.browser.py` testar den faktiska sidan med lokala RPC-fixtures: kryssrutor, överlappande grupper, tangentbord/fokus, bibehållen titel, sparfel, redigering, äldre SQL och sex layouter i ljust/mörkt tema. Ange `CHROMIUM_PATH` vid behov. Webbserver på port 8083 krävs.

Ingen produktionsdatabas har ändrats eller verifierats i denna molnmiljö. Git-publicering kör inte SQL-migrationen.
