'use strict';
// Kunskapsgymmets vy av en bank: kgInstruktion läggs sist i texten, som kgInstruktionerIn i Kunskapsgymmets index.html.
// Användarbeslut 2026-11-23: svarsinstruktioner (avrundning, exakt svar, svarsform) och tabellvärden står bara i
// kgInstruktion, inte i uppgiftstexten. Tester som kontrollerar vad eleven ser i Kunskapsgymmet läser den här vyn.
module.exports = function kgVy(ctx) {
  for (const v of Object.values(ctx.window || {})) {
    if (!Array.isArray(v)) continue;
    for (const t of v) {
      if (t && t.kgInstruktion && typeof t.t === 'string') t.t += ' ' + t.kgInstruktion;
      for (const d of (t && t.spelDelar) || []) {
        if (!d || !d.kgInstruktion) continue;
        if (typeof d.t === 'string' && d.t) d.t += ' ' + d.kgInstruktion;
        else if (d.fraga != null) d.fraga = String(d.fraga) + ' ' + d.kgInstruktion;
      }
    }
  }
  return ctx;
};
