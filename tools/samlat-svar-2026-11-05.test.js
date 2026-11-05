'use strict';
/* Felrapporter 2026-11-05 21:56: svar med namngivna fält skrivna samlat i första fältet ("a=2, b=3", "(4, 7)")
   fördelas på fälten, och kapslade etiketter visas per fält. */
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8').replace(/\r\n/g, '\n');
const kod = (n) => { const i = html.indexOf('function ' + n + '('); assert.ok(i >= 0, n); return html.slice(i, html.indexOf('\n}\n', i) + 2); };
const {samlatOrdnatSvar} = new Function(kod('stadaSvar') + kod('samlatOrdnatSvar') + 'return {samlatOrdnatSvar};')();
const f = (v, e, d = 0) => JSON.parse(JSON.stringify(samlatOrdnatSvar(v, e, d)));

test('Namngivna värden fördelas på fälten med samma namn', () => {
  assert.deepEqual(f('a=2, b=3', ['a', 'b']), [{i: 0, v: '2'}, {i: 1, v: '3'}]);
  assert.deepEqual(f('a=2 och b=3', ['a', 'b']), [{i: 0, v: '2'}, {i: 1, v: '3'}]);
  assert.deepEqual(f('b = 3; a = 2', ['a', 'b']), [{i: 1, v: '3'}, {i: 0, v: '2'}]);
  assert.deepEqual(f('x=3, y=0,5', ['x', 'y']), [{i: 0, v: '3'}, {i: 1, v: '0,5'}]);
  assert.deepEqual(f('a = −5, b = 4', ['a', 'b']), [{i: 0, v: '-5'}, {i: 1, v: '4'}]);
});

test('En punkt i x-fältet delas på x och y', () => {
  assert.deepEqual(f('(4,7)', ['x', 'y']), [{i: 0, v: '4'}, {i: 1, v: '7'}]);
  assert.deepEqual(f('(4; 7,5)', ['x', 'y']), [{i: 0, v: '4'}, {i: 1, v: '7,5'}]);
  assert.deepEqual(f('(-1.5, 2)', ['x', 'y']), [{i: 0, v: '-1.5'}, {i: 1, v: '2'}]);
});

test('Inget fördelas när namn eller fält inte stämmer', () => {
  for (const [v, e] of [['4', ['x', 'y']], ['a=2, c=3', ['a', 'b']], ['(4,7)', ['a', 'b']], ['a=2, b=3', [['a'], 'b']], ['a=2, a=3', ['a', 'b']]])
    assert.equal(samlatOrdnatSvar(v, e, 0), null, v);
  assert.equal(samlatOrdnatSvar('a=2, b=3', ['a', 'b'], 1), null);   // första delen är redan rättad
});

test('Kapslade etiketter visas per fält', () => {
  assert.match(html, /if\(Array\.isArray\(layout\.etiketter\[del\]\)\) return String\(layout\.etiketter\[del\]\[plan\?plan\.rutor\[i\]\.plats:0\]\?\?""\);/);
});
