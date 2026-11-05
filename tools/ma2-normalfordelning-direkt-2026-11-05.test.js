'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');let c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id);const close=(a,b,t)=>assert.ok(Math.abs(a-b)<=t,`${a} jämfört med ${b}`);
test('GeoGebra hittar en jämförelsegräns direkt utan prövning av parametrar',()=>{
 for(const id of ['4.13','4.104','4.287','4.260','4.263','4.2046']){const x=q(id);assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.match(x.s,/Sannolikhetskalkylatorn/,id);assert.doesNotMatch(x.s,/justera.*tills|prova.*tills/i,id);assert.match(x.s,/facit-svar/,id)}
 const a=q('4.13');assert.match(a.spelDelar[1].s,/tillfällig standardavvikelse/);assert.doesNotMatch(a.spelDelar[0].s,/6,24|6\{,\}24/);assert.match(a.spelDelar[1].s,/0,90/);assert.match(q('4.104').s,/0,80/);
});
test('Faktorer och bevarade eller förbättrade svarsnycklar stämmer oberoende',()=>{
 const z90=1.2815515655446008,z80=.8416212335729144,z84=.9944578832097528,z022=-2.0140908120181393,z05=-1.6448536269514726,z99=2.3263478740408408;
 close(8/z90,6.24,.005);close(74-12*z80,63.9,.01);let sd=20/(z99-z05),mu=240-z05*sd;close(sd,5.04,.005);close(mu,248.3,.05);
 close(q('4.260').rättSvar,20/z84,1e-12);close((58-72)/z022,6.95,.005);assert.ok(Math.abs((58-72)/z022-q('4.2046').rättSvar)<=q('4.2046').tolerans);
 const zA=.9998150936147446,zB=-2.0009293881015715,s=30/(zA-zB),m=520-zA*s;assert.ok(Math.abs(s-q('4.263').rättSvar[1])<=q('4.263').tolerans[1]);assert.ok(Math.abs(m-q('4.263').rättSvar[0])<=q('4.263').tolerans[0]);
});
test('Övre intervallgränser beskrivs självständigt i befintliga delkort',()=>{
 for(const id of ['4.72','4.87'])assert.match(q(id).spelDelar.at(-1).fraga,/intervall/);
 assert.match(q('4.87').spelDelar[2].fraga,/5 %.*längre/);
});
