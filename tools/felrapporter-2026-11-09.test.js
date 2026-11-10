'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const load=f=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),c);return Object.values(c.window).find(Array.isArray)};
const banks={fy1:load('uppgifter.js'),ma2:load('uppgifterma2.js'),mato2:load('uppgiftermato2.js')},q=(b,id)=>banks[b].find(x=>x.id===id);
test('Mars: beräknade tabellalternativ och uttryckligt lokalt g; månen har data',()=>{
 const a=q('fy1','4.190'),b=q('fy1','4.470');assert.equal(a.rättSvar[0],78*3.71);assert.equal(a.svarTabell[0][0],78*3.72);assert.equal(b.rättSvar,1025*3.71/1000);assert.equal(b.svarTabell[0][0],1025*3.72/1000);
 for(const id of ['4.190','4.470','4.503'])assert.match(q('fy1',id).t,/3,71 m\/s² på Mars/);
 for(const id of ['4.187','4.215','4.472','4.498','4.900','4.901'])assert.match(q('fy1',id).t,/1,62 m\/s² på månen/);
});
test('Positionstidsgrafernas tidsaxel ligger vid nollposition',()=>{
 for(const [id,y]of [['3.452','108.333'],['3.453','161.667']]){const t=q('fy1',id).t;assert.ok(t.includes(`M65 ${y}H390`));assert.ok(!t.includes('M65 45V215H380'));}
 assert.equal(q('fy1','3.452').rättSvar,(10-(-20))/6);assert.equal(q('fy1','3.453').rättSvar,8+Math.abs(-4-8));
});
test('Medelvärde lika med median: alla exakta svar, ingen ordningsbetydelse',()=>{
 const t=q('ma2','4.279'),solutions=[];for(let x=-100;x<=100;x+=.5){const a=[3,7,8,12,x].sort((a,b)=>a-b);if(a.reduce((s,v)=>s+v,0)/5===a[2])solutions.push(x)}
 assert.deepEqual([...t.rättSvar],solutions);assert.equal(t.svarsstruktur,'mängd');assert.match(t.t,/exakt/);
});
test('Uttrycksformat är med på både huvuduppgift och funktionens delkort',()=>{
 for(const [id,i,format]of [['2.259',0,'faktoriserat'],['2.629',1,'uttryck']]){const t=q('ma2',id);assert.equal(t.svarFormat[i],format);assert.equal(t.spelDelar[i].svarFormat,format)}
 assert.match(q('ma2','1.123').spelDelar[0].fraga,/Vid.*x=2.*funktionsvärdet/);
});
test('Asymptot ger två namngivna svar, tangenten använder radianer',()=>{
 const t=q('mato2','2.52');assert.deepEqual([...t.rättSvar],[2,1]);assert.deepEqual([...t.svarEtiketter],['a','b']);assert.equal(t.svarsstruktur,'ordnad');assert.equal(t.geogebra,false);
 const x=4.302688671778498;assert.ok(Math.abs(Math.sin(x)-(x-2)*Math.cos(x))<1e-12);assert.equal(Math.round(Math.cos(x)*1000)/1000,q('mato2','1.345').rättSvar[0]);assert.match(q('mato2','1.345').t,/radianer/);assert.doesNotMatch(q('mato2','1.345').t,/360|circ/);
});
test('Femtegradsekvationen har exakt tre reella rötter',()=>{
 const t=q('mato2','4.333'),p=x=>x**5-4*x**3+x-1.5;for(const x of t.rättSvar)assert.ok(Math.abs(p(x))<.02);
 const u=Math.sqrt((6+Math.sqrt(31))/5),v=Math.sqrt((6-Math.sqrt(31))/5),cuts=[-10,-u,-v,v,u,10];let roots=0;for(let i=1;i<cuts.length;i++)if(p(cuts[i])*p(cuts[i-1])<0)roots++;assert.equal(roots,3);assert.match(t.t,/reella/);assert.equal(t.svarsstruktur,'mängd');
});
test('Väntetidsmodell och uttrycklig avrundning stämmer',()=>{
 const t=q('mato2','4.539');assert.equal(Math.round(20/Math.log(2)*10)/10,t.rättSvar);assert.equal(t.svarEnhet,'s');assert.match(t.t,/medeltiden.*m/);assert.doesNotMatch(t.t,/lambda/);assert.ok(t.tolerans<.01);
});
test('Lagerfrågorna har givna data, korrekt heltalsgräns och snäva antal',()=>{
 const t=q('ma2','5.28');assert.equal(t.rättSvar[1],Math.ceil(240+35*1.959963984540054));assert.equal(t.rättSvar[2],Math.round(.025*250));assert.equal(t.tolerans[1],0);assert.equal(t.tolerans[2],0);assert.match(t.spelDelar[1].fraga,/minsta antal hela/);assert.match(t.spelDelar[2].fraga,/2,5 %.*250/);assert.equal(t.geogebra,true);assert.equal(t.miniräknare,true);
 assert.equal(q('ma2','5.01').rättSvar[2],176000-10*2500-8*4000);
});
