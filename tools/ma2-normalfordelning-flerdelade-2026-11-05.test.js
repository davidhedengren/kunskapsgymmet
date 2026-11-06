'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');let c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id),near=(a,b,t)=>assert.ok(Math.abs(a-b)<=t,`${a} mot ${b}`);
test('Varje beräkningsdel har konkreta GeoGebra-steg och fristående kort',()=>{
 for(const id of ['4.26','4.27','4.66','4.106']){let x=q(id);assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.match(x.s,/GeoGebra/,id);assert.match(x.s,/facit-svar/,id)}
 const a=q('4.26');assert.match(a.spelDelar[0].s,/0,0502/);assert.doesNotMatch(a.spelDelar[0].s,/30 gösar/);assert.match(a.spelDelar[1].t,/5,02 %/);assert.doesNotMatch(a.spelDelar[1].s,/huvuduppgiften|från a\)/);assert.match(a.spelDelar[2].s,/variera/);
 // Felrapport 2026-11-06 10:00: frågan säger inte längre "med hjälp av GeoGebra" (eleverna ska inse verktyget själva); facit visar fortfarande GeoGebra.
 const b=q('4.27');assert.match(b.t,/Uppskatta standardavvikelsen\./);assert.doesNotMatch(b.t,/GeoGebra/);assert.match(b.spelDelar[0].s,/tillfällig standardavvikelse 1/);assert.match(b.spelDelar[1].fraga,/standardavvikelsen är 3,0 g/);assert.doesNotMatch(b.spelDelar[0].s,/2,28/);
 assert.match(q('4.66').spelDelar[1].s,/80-60/);assert.doesNotMatch(q('4.66').spelDelar[0].s,/95,4/);assert.match(q('4.106').s,/slumpvariation/);
});
test('Faktiska svanssannolikheter, percentil och skattat antal är korrekta',()=>{
 near(.05020624699305143*100,q('4.26').rättSvar[0],.01);near(.0502*600,q('4.26').rättSvar[1],.2);
 near((90-84)/(85.99539331016783-84),q('4.27').rättSvar[0],.01);near(.02275013194817921*100,q('4.27').rättSvar[1],.005);
 near(.9544997361036416*100,q('4.66').rättSvar[1],.05);near(.10263725183213579*100,10.26,.01);near(299.34560880854417,299.3,.05);
});
