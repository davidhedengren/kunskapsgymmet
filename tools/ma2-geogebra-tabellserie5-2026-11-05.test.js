'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const ctx={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),ctx);const q=id=>ctx.window.BANKMA2.find(x=>x.id===id);
function stats(a){const m=a.reduce((s,x)=>s+x,0)/a.length;return [m,Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1))]}
test('Data och Sx bevarar frekvenserna och stämmer mot facit',()=>{
 for(const [id,data,idx] of [['4.349',[1,3,3,4,9],0],['4.349',[2,6,6,8,18],1],['4.350',[0,1,2,2,2,2,2,2,3,4],0],['4.350',[0,0,0,1,2,2,3,4,4,4],1],['4.351',[10,10,20,20,20,30,40,50],0]]){const calculated=stats(data),key=q(id).rättSvar[idx];calculated.forEach((x,i)=>assert.ok(Math.abs(x-key[i])<1e-8,id))}
});
test('Korten tillåter GeoGebra och visar hur deras data analyseras',()=>{
 for(const id of ['4.349','4.350','4.351'])for(const d of q(id).spelDelar){assert.equal(d.geogebra,true,id);assert.equal(d.miniräknare,true,id);assert.match(d.s,/GeoGebra/,id)}
 assert.doesNotMatch(q('4.349').spelDelar[0].s,/sträckorna B|Sx = 6/);assert.doesNotMatch(q('4.350').spelDelar[0].s,/grupp B|1,6997/);assert.match(q('4.351').spelDelar[3].s,/Q1 = 15 och Q3 = 35/);
});
