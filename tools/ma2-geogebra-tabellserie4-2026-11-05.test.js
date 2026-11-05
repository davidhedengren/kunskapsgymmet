'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const ctx={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),ctx);const q=id=>ctx.window.BANKMA2.find(x=>x.id===id);
function stats(a){const m=a.reduce((s,x)=>s+x,0)/a.length;return [m,Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1))]}
test('Fem tabelluppgifters medelvärde och Sx överensstämmer med facit och nyckel',()=>{
 for(const [id,data,idx] of [['4.343',[19.8,20,20,20.1,20.4],2],['4.344',[2,2,2,2,2],2],['4.345',[1,2,2,3,4,4,5],2],['4.346',[18,20,20,20,22],0],['4.346',[16,20,20,20,24],1],['4.347',[20,20,30,30,40,400],2]]){const actual=stats(data),key=q(id).rättSvar[idx];actual.forEach((x,i)=>assert.ok(Math.abs(x-key[i])<1e-8,id));assert.equal(q(id).spelDelar[idx].geogebra,true);assert.equal(q(id).spelDelar[idx].miniräknare,true)}
});
test('Alla fristående kort visar GeoGebra utan att tidigare delfacit ger senare resultat',()=>{
 for(const id of ['4.343','4.344','4.345','4.346','4.347'])for(const part of q(id).spelDelar){assert.match(part.s,/GeoGebra/,id);assert.equal(part.geogebra,true,id);assert.equal(part.miniräknare,true,id)}
 assert.doesNotMatch(q('4.346').spelDelar[0].s,/2,83|maskin B/i);assert.doesNotMatch(q('4.347').spelDelar[2].s,/4 000/);
});
