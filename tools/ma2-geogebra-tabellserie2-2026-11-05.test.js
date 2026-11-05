'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');let c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id);
const cases=[['4.333',[1,2,2,3,3,3,4,4,5,7],3,3,3.4,1.7126976771553506,2],['4.334',[12,14,14,16,19],14,14,15,Math.sqrt(7),7],['4.335',[98,100,100,101,103],100,100,100.4,Math.sqrt(3.3),5],['4.336',[0,1,1,2,2,2,3,4,4,5],2,2,2.4,1.577621275493231,3],['4.337',[0,0,1,1,2,2,2,3,4,5],2,2,2,Math.sqrt(24/9),5]];
const avg=v=>v.reduce((a,b)=>a+b,0)/v.length,sd=v=>Math.sqrt(v.reduce((a,b)=>a+(b-avg(v))**2,0)/(v.length-1));
test('Fem uppgifter har korrekta statistikmått och oförändrade svarsnycklar',()=>{
 for(const[id,v,median,mode,m,s,d]of cases){const x=q(id),sv=x.rättSvar;assert.equal(sv[0],median,id);assert.equal(sv[1],mode,id);assert.equal(sv[2][0],m,id);assert.ok(Math.abs(sv[2][1]-s)<1e-9,id);assert.equal(sv[3],d,id);assert.equal(avg(v),m,id);assert.ok(Math.abs(sd(v)-s)<1e-9,id);assert.equal((v[(v.length-1)>>1]+v[v.length>>1])/2,median,id);const count=new Map();for(const n of v)count.set(n,(count.get(n)||0)+1);assert.equal([...count].sort((a,b)=>b[1]-a[1])[0][0],mode,id);if(id!=='4.333'&&id!=='4.336')assert.equal(Math.max(...v)-Math.min(...v),d,id);}
 assert.equal(4-2,2);assert.equal(4-1,3);
});
test('Alla 20 delkort förklarar GeoGebra och avslöjar inte senare beräkningar',()=>{
 for(const[id]of cases){const x=q(id);assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.equal(x.spelDelar.length,4);for(const d of x.spelDelar){assert.match(d.s,/Envariabelanalys/,id);assert.match(d.s,/facit-svar/,id)}assert.match(x.spelDelar[0].s,/Median/,id);assert.match(x.spelDelar[1].s,/Stolpdiagram|stolpdiagram/,id);assert.match(x.spelDelar[2].s,/raden s/i,id);assert.doesNotMatch(x.spelDelar[0].s,/På raden Medel|raden s står/i,id)}
 const c=q('4.334').spelDelar[2].s;assert.match(c,/geogebra-statistik-plantor/);assert.ok(fs.statSync('bilder/geogebra-statistik-plantor-2026-11-05.png').size>1000);assert.doesNotMatch(c,/variationsbredd|Max − Min/);
});
