'use strict';
/* Kvalitetsgranskningen (admin) 2026-11-27: kontrollen "Facit godkänns inte" gav över 1 600 falsklarm.
   - Fysik med svarVardesiffror lagrar rättSvar oavrundat (122.75, 8.253850129198966) och rättningen godtar
     n−2 till n+2 värdesiffror. Kontrollen provade maskinvärdet med 16 siffror; nu provas facit avrundat till
     det rekommenderade antalet värdesiffror, så som eleven skriver det.
   - Namnlistor i ordning (namnordning) och mängder (namnmangd) provas inte "omkastade" med "x = ".
   - Namnlistor med alternativ ("R, B, E, L6|R, B, E, 5") provas med ett alternativ.
   Dessutom: ett gradtecken i ett vinkeluttryck ändrar inte svaret (Ma2 3.67), utom med sin/cos/tan.
   Uppgiftslabbet: agent/KVALITETSRAPPORT_2026-11-27.md. Kontrollen har körts i webbläsaren över alla kurser. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const kod = (n) => { const i = html.indexOf('function ' + n + '('); assert.ok(i >= 0, n); return html.slice(i, html.indexOf('\n}', i) + 2); };

test('kvFacit provar fysikfacit med rekommenderat antal värdesiffror', () => {
  const k = kod('kvFacit');
  assert.match(k, /fysikVardesiffror\(q,d\.i\)/);
  assert.match(k, /toPrecision\(nVs\)/);
});

test('kvFacit provar inte namnlistor omkastade och delar upp alternativ', () => {
  const k = kod('kvFacit');
  assert.match(k, /\["namnordning","namnmangd"\]\.includes\(d\.fmt\)\) try\{/);
  assert.match(k, /d\.v\.split\("\|"\)\[0\]/);
});

test('Gradtecken i vinkeluttryck: rättningen och självtestet', () => {
  const k = kod('formatRatt');
  assert.match(k, /a\.includes\("°"\) && !f\.includes\("°"\) && !\/sin\|cos\|tan\/i\.test\(a\)/);
  assert.match(html, /namn:"vinkeluttryck med gradtecken", got:formatRatt\("y=45°-x\/2","y=45-x\/2",\{format:"uttryck"\}\), want:true/);
  assert.match(html, /namn:"gradtecken i sinus tas inte bort".*want:false/);
});

/* Omgång 2 (samma dag): pluralkontrollen gäller bara fristående delkort; granskade miniräknaruppgifter;
   krockkontrollen förstår vita kanter, ellipser, nodetiketter och bakgrundsrutor. */
test('kvPlural: bara fristående delkort (kedjan visar hela uppgiften)', () => {
  assert.match(kod('kvPlural'), /if\(t\.kgFristaendeDelar!==true\) return \[\];/);
});

test('KV_RAKNARE_GRANSKADE har de 42 granskade uppgifterna från 2026-11-27', () => {
  const lista = html.slice(html.indexOf('const KV_RAKNARE_GRANSKADE='), html.indexOf(']);', html.indexOf('const KV_RAKNARE_GRANSKADE=')));
  for (const id of ['ma1:0.1085', 'ma1:0.1386', 'ma2:3.163', 'mato1:4.574', 'mato2:6.02', 'matf1:1.801']) assert.ok(lista.includes(`"${id}"`), id);
  assert.ok(!lista.includes('"mato1:1.980"'), '1.980 har fått miniräknare i stället');
});

test('kvFigur: vit kant, ellipser, nodetiketter, bakgrundsrutor och dolda konturer', () => {
  const k = kod('kvFigur');
  assert.match(k, /if\(t\.kant\) return;/);
  assert.match(k, /!kopia\(el\)/);
  assert.match(k, /\(x-c\.c\.x\)\/c\.rx,\(y-c\.c\.y\)\/c\.ry/);
  assert.match(k, /const nod=/);
  assert.match(k, /rutaBakom\(t,c\.ord\)/);
  assert.match(k, /const dold=fyllda\.some/);
});
