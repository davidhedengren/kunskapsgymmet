'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id);
test('4.87 beskriver vardera svans och delkorten kan lösas separat',()=>{
 const a=q('4.87');assert.match(a.t,/5 % som är kortare/);assert.match(a.t,/5 % som är längre/);assert.match(a.spelDelar[1].fraga,/5 %.*kortare/);assert.match(a.spelDelar[2].fraga,/5 %.*längre/);assert.doesNotMatch(a.spelDelar[1].s,/52,96|52\{,\}96/);assert.doesNotMatch(a.spelDelar[2].s,/47,04|47\{,\}04/);for(const d of a.spelDelar){assert.match(d.s,/GeoGebra/);assert.match(d.s,/facit-svar/);}assert.equal(a.geogebra,true);assert.equal(a.miniräknare,true);
 const z=1.6448536269514722;assert.ok(Math.abs((50-z*1.8)-a.rättSvar[1])<a.tolerans[1]);assert.ok(Math.abs((50+z*1.8)-a.rättSvar[2])<a.tolerans[2]);
});
test('Liknande frågor anger mittområdet eller svansarna och bevarar svaren',()=>{
 for(const id of ['4.72','4.215']){const a=q(id);assert.match(a.t,/mittersta 68,2 %/);assert.match(a.spelDelar[0].fraga,/nedre/);assert.match(a.spelDelar[1].fraga,/övre/);}
 assert.match(q('4.117').t,/10 % som går snabbare/);assert.match(q('4.2125').t,/5 % av förpackningarna/);
 assert.deepEqual(Array.from(q('4.51').rättSvar),[30,4]);assert.equal((22+38)/2,30);assert.equal((38-30)/2,4);
 for(const [id,lo,hi] of [['4.72',42,58],['4.215',41,47],['4.117',59.7,80.3]])assert.deepEqual(Array.from(q(id).rättSvar),[lo,hi]);
 assert.equal(q('4.2125').rättSvar,486.8);
});
