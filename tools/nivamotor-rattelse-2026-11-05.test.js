'use strict';
/* Rättelser av nivåmotorn 2026-11-05 kväll efter elevrapporter (se docs/ADAPTIVITET_ANALYS_2026-11-05.md, avsnitt 9):
   1. samma uppgifter hela tiden: färskhet per nivå och ursprungsuppgift,
   2. inga svårare uppgifter: uppåt efter två rätt på en nivå,
   3. "Behöver träning" efter ett enda fel: krav på minst 6 svar och sänkt gräns. */
const test = require('node:test'), assert = require('node:assert/strict');
const {nivamotor} = require('./nivamotor-hjalp.js');

const kort = [1, 2, 3, 4, 5].flatMap(L => Array.from({length: 4}, (_, i) => ({id: `${L}-${i}`, omr: 'A', traningsniva: L})));

test('Ett kort räknas som sett när ett annat delkort ur samma ursprungsuppgift visats', () => {
  const delar = ['a', 'b', 'c'].map(e => ({id: `9.1${e}`, ursprungsId: '9.1', omr: 'A', traningsniva: 2}));
  const c = nivamotor({uppgifter: delar});
  const h = {seq: 10, ids: {'9.1a': 8}};
  const u = c.ursprungsAlder(h, delar);
  assert.equal(c.kortAlder(h, delar[2], u), 2);
  assert.equal(c.nivaHink(delar, h, u).farsk < .01, true);
});

test('Inom en nivå väljs bara osedda kort; en nyss genomgången nivå väger lite', () => {
  const c = nivamotor({uppgifter: kort});
  const niva2 = kort.filter(t => t.traningsniva === 2);
  const h = {seq: 20, ids: {'2-0': 19, '2-1': 18}};
  const hink = c.nivaHink(niva2, h, c.ursprungsAlder(h, niva2));
  assert.equal(hink.farsk, 1);
  assert.deepEqual(hink.kandidater.map(t => t.id), ['2-2', '2-3']);
  const alla = {seq: 20, ids: {'2-0': 19, '2-1': 18, '2-2': 17, '2-3': 16}};
  const genomgangen = c.nivaHink(niva2, alla, c.ursprungsAlder(alla, niva2));
  assert.ok(genomgangen.farsk < .02, String(genomgangen.farsk));          // 4 uppgifter sedan: nästan noll
  assert.deepEqual(genomgangen.kandidater.map(t => t.id), ['2-2', '2-3']);   // de som visades längst tillbaka, inte de två senaste
  const lange = {seq: 300, ids: {'2-0': 19, '2-1': 18, '2-2': 17, '2-3': 16}};
  assert.equal(c.nivaHink(niva2, lange, c.ursprungsAlder(lange, niva2)).farsk, .6); // länge sedan: åter aktuell
});

test('Tre rätt i rad, de två senaste på nivå 2: prova nivå 3', () => {
  const cp = {areas: {}, families: {}, levels: {}, history: [{area: 'A', id: '1-0', ok: true}, {area: 'A', id: '2-0', ok: true}, {area: 'A', id: '2-1', ok: true}]};
  const c = nivamotor({cp, uppgifter: kort});
  assert.equal(c.uppatNiva('A', cp), '3');
  cp.history[2].hint = true; assert.equal(c.uppatNiva('A', cp), null);
  cp.history[2].hint = false; cp.history[1].ok = false; assert.equal(c.uppatNiva('A', cp), null);
  cp.history[1].ok = true; c.state.passTyp = 'teknik'; assert.equal(c.uppatNiva('A', cp), null);
  c.state.passTyp = null; cp.history.push({area: 'A', id: '3-0', ok: true});
  assert.equal(c.uppatNiva('A', cp), '3');                                   // 2 och 3: lägsta av de två senaste är 2
  cp.history.push({area: 'A', id: '3-1', ok: true});
  assert.equal(c.uppatNiva('A', cp), '4');
});

test('Ett eller några få fel i ett nytt område ger inte "Behöver träning"', () => {
  for (const svar of [[[2, 0]], [[1, 0]], [[2, 0], [2, 0]], [[2, 1], [3, 0], [2, 0]]]) {
    const cp = {areas: {}, families: {}, history: [], levels: {}, formaga: {B: {mu: .3, sd: .4, n: 30, r: {}}}};
    const c = nivamotor({cp, uppgifter: kort});
    for (const [L, ok] of svar) { c.formagaUppdatera({omr: 'A', traningsniva: L, id: `${L}-0`}, ok, cp); cp.history.push({area: 'A', id: `${L}-0`, ok: !!ok}); }
    assert.equal(c.lageFor('A').label, 'På gång', JSON.stringify(svar));
  }
});

test('Med underlag: få rätt ger "Behöver träning", 3 av 4 på nivå 1–2 ger "På gång"', () => {
  const elev = (mon) => {
    const history = mon.map((ok, i) => ({area: 'A', id: `${1 + (i % 2)}-${i % 4}`, ok: !!ok}));
    return nivamotor({cp: {areas: {}, families: {}, history, levels: {}}, uppgifter: kort}).lageFor('A').label;
  };
  assert.equal(elev([0, 0, 1, 0, 0, 1, 0, 0, 0, 1]), 'Behöver träning');
  assert.equal(elev([1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1]), 'På gång');
});
