'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');let c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id),near=(a,b,t)=>assert.ok(Math.abs(a-b)<=t,`${a} mot ${b}`);
const data=[['4.07',6,6.013851975373582,0],['4.19',6,6.008554555678332,null],['4.37',4,4.04348372460077,null],['4.51',4,4.009234650249055,1],['4.69',12,12.017109111356664,null],['4.304',3.2,3.2073877201992436,1],['4.2045',1,1.001425759279722,null]];
test('Mittintervallens standardavvikelser visar en direkt GeoGebra-metod',()=>{
 for(const[id,old,exact,idx]of data){const x=q(id),val=idx===null?x.rättSvar:x.rättSvar[idx],tol=idx===null?x.tolerans:x.tolerans[idx];assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.equal(val,old,id);near(val,exact,tol);assert.match(x.s,/Sannolikhetskalkylatorn/,id);assert.match(x.s,/tillfälligt μ = 0 och σ = 1/,id);assert.doesNotMatch(x.s,/justera.*tills|prova.*tills/i,id);assert.match(x.s,/facit-svar/,id)}
 assert.match(q('4.2045').s,/1 023 \/ 1 500 = 0,682/);assert.match(q('4.304').spelDelar[0].s,/24\.6\+37\.4/);assert.doesNotMatch(q('4.304').spelDelar[0].s,/3,21|2,3 %/);
 assert.match(q('4.07').spelDelar[1].s,/2,3/);assert.doesNotMatch(q('4.07').spelDelar[0].s,/Cirka 2,3/);
});
test('Mittvärde och båda svansar ger förväntade andelar och förväntat antal',()=>{
 near((22+38)/2,q('4.51').rättSvar[0],0);near((24.6+37.4)/2,q('4.304').rättSvar[0],1e-12);near((100-95.4)/2,q('4.07').rättSvar[1],1e-9);near(.023*200,q('4.304').rättSvar[2],q('4.304').tolerans[2]);
});
