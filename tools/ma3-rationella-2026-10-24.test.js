// Regression för handskriven påfyllnad. Se agent/MA3_RATIONELLA_2026-10-24.md.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgiftermato1.js'),'utf8'),ctx);
const bank=JSON.parse(JSON.stringify(ctx.window.BANKMATO1)),q=id=>bank.find(t=>t.id===id);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);
test('Tolv skilda frågor, placerade i ordinarie områden och med fungerande metadata',()=>{
 const tasks=Array.from({length:12},(_,i)=>q('1.'+(913+i)));
 assert.equal(new Set(tasks.map(t=>t.t)).size,12);
 for(const t of tasks){assert.ok(['rationella_uttryck','rakna_rationella'].includes(t.omr));assert.deepEqual(t.kurs,['1b','1c']);assert.equal(t.miniräknare,true);assert.equal(t.geogebra,false);assert.equal(t.självrättning,true);assert.match(t.s,/facit-steglista/);assert.match(t.s,/facit-svar/);}
 assert.equal(tasks.filter(t=>t.t.includes('<svg')).length,5);
 assert.equal(tasks.filter(t=>t.t.includes('<table')).length,2);
 assert.deepEqual(tasks.map(t=>t.traningsniva),[1,1,3,2,2,2,1,1,4,3,2,3]);
});
test('Definitionsvillkor och parameterfrågor',()=>{
 assert.equal(q('1.913').rättSvar-3,0);
 assert.equal(q('1.914').rättSvar,(6-6)/(6+2));
 assert.deepEqual(q('1.915').rättSvar,[-1,2]);assert.equal(q('1.915').svarsstruktur,'mängd');
 assert.equal(-2-q('1.916').rättSvar,0);
 assert.equal(3**2+q('1.917').rättSvar*3-6,0);
 assert.deepEqual(q('1.918').alternativ.map(a=>a.ratt),[false,false,false,true]);
 assert.match(q('1.918').s,/x ≠ 4/);
});
test('Oberoende beräkningar för tillämpningar och algebra',()=>{
 for(const x of [3,5,7,11,25]){
  near((x+1)/5+(2*x-1)/5,3*x/5);
  near((3*x/4)/(x/2),q('1.920').rättSvar);
  const totalTime=6/x+6/(2*x);near(12/totalTime,4*x/3);
  near((400+8*x)/x-(400+8*2*x)/(2*x),200/x);
  near((1/x)/(1/x+1/6),6/(x+6));
  near((x+1)/(x-2)+(x-5)/(2-x),q('1.924').rättSvar/(x-2));
  const pieces=((x*x-1)/6)/((x+1)/3);near(pieces,(x-1)/2);assert.equal(Number.isInteger(pieces),true);
 }
 assert.equal(q('1.919').rättSvar,'3*x/5');assert.equal(q('1.921').rättSvar,'4*x/3');
 assert.equal(q('1.922').rättSvar,'200/n');assert.equal(q('1.923').rättSvar,'6/(x+6)');
 assert.match(q('1.920').t,/Svara exakt/);assert.equal(q('1.920').rättSvar,1.5);
});
test('Äldre modellkort har egna givna värden, enheter och rimliga delnivåer',()=>{
 for(const [id,total,time,answer,unit] of [['1.73',240,4,60,'km/h'],['1.78',600,5,120,'MB/s']]){
  const t=q(id);near(total/time,answer);assert.equal(t.rättSvar[1],answer);assert.equal(t.svarEnhet[1],unit);
  assert.deepEqual(t.spelDelar.map(d=>d.traningsniva),[2,1,3]);
  for(const d of t.spelDelar){assert.ok(d.t.includes(String(total)));assert.ok(d.t.includes(unit));assert.equal(d.miniräknare,true);assert.equal(d.geogebra,false);assert.match(d.s,/facit-svar/);}
 }
 assert.match(q('1.854').t,/Delningen går jämnt upp, utan någon rest/);
 assert.equal(q('1.854').rättSvar,'(x-1)/2');assert.equal(q('1.854').miniräknare,true);
});
