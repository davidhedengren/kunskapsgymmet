'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');let c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id),near=(a,b,t)=>assert.ok(Math.abs(a-b)<=t,`${a} mot ${b}`);
test('Facit visar hur eleven matar in sannolikhet eller gräns',()=>{
 for(const id of ['4.81','4.89','4.116','4.117','4.151','4.152','4.178','4.2086']){let x=q(id);assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.match(x.s,/sannolikhetskalkylator/i,id);assert.match(x.s,/facit-svar/,id)}
 for(const id of ['4.116','4.117','4.151'])for(const d of q(id).spelDelar){assert.match(d.s,/sannolikhetskalkylator/i,id);assert.match(d.s,/efter likhetstecknet/i,id)}
 assert.match(q('4.116').spelDelar[0].s,/0,10/);assert.match(q('4.116').spelDelar[1].s,/0,90/);assert.doesNotMatch(q('4.116').spelDelar[0].s,/64,0/);
 assert.match(q('4.151').spelDelar[0].s,/0,95/);assert.match(q('4.151').spelDelar[1].s,/0,20/);assert.doesNotMatch(q('4.151').spelDelar[0].s,/57,2/);
 assert.match(q('4.178').s,/Öppet åt höger/);assert.match(q('4.2086').s,/55 och 62/);
});
test('Oberoende percentiler och sannolikheter matchar de bevarade svaren',()=>{
 const z90=1.2815515655446008,z95=1.6448536269514726,z20=-.8416212335729144;
 near(65.0551,q('4.81').rättSvar,.1);near(93.3193,q('4.89').rättSvar,.1);near(52-9.4*z90,q('4.116').rättSvar[0],.05);near(52+9.4*z90,q('4.116').rättSvar[1],.05);
 near(70-8*z90,q('4.117').rättSvar[0],.05);near(70+8*z90,q('4.117').rättSvar[1],.05);near(67.3+12*z95,q('4.151').rättSvar[0],.05);near(67.3+12*z20,q('4.151').rättSvar[1],.05);
 near(84.1345,q('4.152').rättSvar,.05);near(6.68072,q('4.178').rättSvar[0],.03);near(97,q('4.178').rättSvar[1],.001);near(61.4717,q('4.2086').rättSvar,.05);
});
