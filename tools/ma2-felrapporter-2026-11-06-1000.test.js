'use strict';
/* Felrapport Ma2 2026-11-06 10:00 (4.2122, 4.2123, 4.2124, 4.2126): "Ta bort 'använd geogebra' och gör det i alla
   uppgifter här. de ska inse det själva." Logg: agent/FELRAPPORTER_2026-11-06_1000.md */
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const c = {window: {}}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../uppgifterma2.js'), 'utf8'), c);
const bank = c.window.BANKMA2, byId = new Map(bank.map(u => [u.id, u]));
const ren = h => String(h || '').replace(/<[^>]+>/g, ' ');
const fragetexter = u => [u.t, u.spelIntro, ...(u.spelDelar || []).map(d => d.t || d.fraga)].map(ren).join(' ');

test('ingen uppmaning att använda GeoGebra i normalfördelning med digitala verktyg', () => {
  const omr = bank.filter(u => u.omr === 'normalfordelning_digitala_verktyg');
  assert.ok(omr.length >= 56);
  for (const u of omr) {
    const t = fragetexter(u);
    assert.doesNotMatch(t, /Använd GeoGebra|med GeoGebra|med hjälp av GeoGebra/, u.id);
  }
  assert.doesNotMatch(fragetexter(byId.get('4.2127')), /GeoGebra/);
});

/* Utvidgat samma dag till hela Ma2 (tools/ma2-geogebra-uppmaningar-2026-11-06.py). Läraren: "Om geogebra-taggen är på
   så får de själva förstå att de ska använda geogebra." Kvar står bara meningar där GeoGebra är situationen eller ämnet. */
const SITUATION = /ritar [^.]* i GeoGebra|GeoGebra visar|I GeoGebra syns|ritas i GeoGebra|Beskriv hur du i GeoGebra|hur bör GeoGebra användas|för in [^.]* i GeoGebra|analyserar [^.]* i GeoGebra|GeoGebra har anpassat|GeoGebra anpassar|Vilka värden ska du skriva in i GeoGebras|I GeoGebra har någon|hur man kan (?:göra|bestämma detta) i GeoGebra/;
test('ingen uppmaning att använda GeoGebra någonstans i Ma2-frågorna', () => {
  let kvar = 0;
  for (const u of bank) {
    const t = fragetexter(u).replace(/\s+/g, ' ');
    for (const m of t.match(/[^.?!]*GeoGebra[^.?!]*/g) || []) { assert.match(m, SITUATION, `${u.id}: ${m}`); kvar++; }
    assert.doesNotMatch(t, /Använd GeoGebra|Använd Sx i GeoGebra|med (?:hjälp av )?GeoGebra/, u.id);
  }
  assert.ok(kvar <= 15, `${kvar} omnämnanden`);
  assert.match(byId.get('4.28').t, /Talen är 6, 8, 9, 9, 11, 17\./);
  assert.match(ren(byId.get('4.05').t), /Ange vilket material, 1 eller 2, som har minst standardavvikelse\.\s+Använd Sx för spridningen/);
});

test('de rapporterade uppgifterna saknar uppmaningen, men verktyget är tillåtet och facit visar GeoGebra', () => {
  for (const id of ['4.2122', '4.2123', '4.2124', '4.2126']) {
    const u = byId.get(id);
    assert.doesNotMatch(u.t, /GeoGebra/, id);
    assert.equal(u.geogebra, true, id);
    assert.match(u.s, /GeoGebra/, id);
  }
  assert.match(byId.get('4.2126').t, /Hur stor får standardavvikelsen högst vara\? \(Svara i cl med två decimaler\.\)/);
});

test('frågor där GeoGebra är själva ämnet finns kvar', () => {
  const alla = bank.filter(u => u.omr === 'normalfordelning_digitala_verktyg').map(fragetexter).join(' ');
  assert.match(alla, /Vilka värden ska du skriva in i GeoGebras/);
  assert.match(alla, /I GeoGebra har någon räknat ut/);
  assert.match(alla, /Beskriv också hur man kan bestämma detta i GeoGebra/);   // 4.70: metoden är det som efterfrågas
});
