'use strict';
/* Felrapport Ma2 1.1014 (2026-11-06): symbolknappen xⁿ skriver ^(), så svaret blev x^(3)+6x^(2)+11x+6.
   Förhandsvisningen såg ut exakt som facit, men formatet förenklat_polynom underkände exponenter i parentes. */
const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8').replace(/\r\n/g, '\n');
const kod = (n) => { const i = html.indexOf('function ' + n + '('); assert.ok(i >= 0, n); return html.slice(i, html.indexOf('\n}\n', i) + 2); };
const {samma} = new Function(kod('stadaSvar') + kod('forenklatPolynom') + kod('sammaForenkladePolynom') + 'return {samma:sammaForenkladePolynom};')();

test('Exponenter i parentes från potensknappen godtas', () => {
  const f = 'x^3+6x^2+11x+6';
  for (const a of ['x^(3)+6x^(2)+11x+6', 'x^( 3 )+6x^(2)+11x+6', 'x^3+6x^2+11x+6', 'x³+6x²+11x+6', 'x^{3}+6x^{2}+11x+6', 'x^3+6x^2+11x+6.', '6+11x+6x^(2)+x^(3)'])
    assert.equal(samma(a, f), true, a);
});

test('Fel och oförenklade svar underkänns fortfarande', () => {
  const f = 'x^3+6x^2+11x+6';
  for (const a of ['x^(3)+6x^(2)+12x+6', 'x^3+3x^2+3x^2+9x+2x+6', '(x+1)(x+2)(x+3)', 'x^(2)+6x^(2)+11x+6', 'x^(3)+6x^(2)+11x'])
    assert.equal(samma(a, f), false, a);
});
