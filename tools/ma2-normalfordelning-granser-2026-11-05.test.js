'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');let c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id),near=(a,b,t)=>assert.ok(Math.abs(a-b)<=t,`${a} mot ${b}`);
test('Uppgifterna visar GeoGebras inställningar och skiljer gräns från andel',()=>{
 for(const id of ['4.45','4.53','4.57','4.70','4.95','4.218','4.237']){const x=q(id);assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.match(x.s,/sannolikhetskalkylator/i,id);assert.match(x.s,/facit-svar/,id)}
 for(const [id,idx] of [['4.45',0],['4.45',1],['4.57',0],['4.57',1],['4.95',0],['4.95',1]])assert.match(q(id).spelDelar[idx].s,/sannolikhetskalkylator/i,id);
 assert.match(q('4.45').spelDelar[0].s,/0,90/);assert.match(q('4.45').spelDelar[1].s,/65 och 86/);assert.match(q('4.57').spelDelar[0].s,/0,08/);assert.match(q('4.57').spelDelar[1].s,/0,88/);
 assert.doesNotMatch(q('4.57').spelDelar[0].s,/81,4/);assert.doesNotMatch(q('4.95').spelDelar[0].s,/91,0|80 %/);assert.doesNotMatch(q('4.95').spelDelar[1].s,/59,0|80 %/);assert.match(q('4.95').spelDelar[2].t,/10 %/);
});
test('Oberoende numeriska percentiler och areor matchar nycklarna',()=>{
 const z90=1.2815515655446008,z08=-1.4050715603096329,z88=1.17498679206609;
 near(70.6+12*z90,q('4.45').rättSvar[0],.03);near(57.994314946920724,q('4.45').rättSvar[1],.01);
 near(50+9.4*z90,q('4.53').rättSvar,.05);near(72+8*z08,q('4.57').rättSvar[0],.05);near(72+8*z88,q('4.57').rättSvar[1],.05);
 near(64+9*z90,q('4.70').rättSvar,.05);near(75-12.5*z90,q('4.95').rättSvar[0],1e-9);near(75+12.5*z90,q('4.95').rättSvar[1],1e-9);assert.equal(q('4.95').rättSvar[2],80);
 near(60+8*z90,q('4.218').rättSvar,.05);near(84.13447460685429,q('4.237').rättSvar,.05);
});
