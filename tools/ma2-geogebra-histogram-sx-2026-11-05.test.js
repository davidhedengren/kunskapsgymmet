'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');const ctx={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),ctx);const q=id=>ctx.window.BANKMA2.find(x=>x.id===id);
function mean(a){return a.reduce((x,y)=>x+y,0)/a.length}function sd(a){const m=mean(a);return Math.sqrt(a.reduce((sum,x)=>sum+(x-m)**2,0)/(a.length-1))}
test('Viktade mittpunkter och Sx stämmer med svarsnycklarna',()=>{
 const samples=[['4.364',[...Array(4).fill(6.5),...Array(8).fill(7),...Array(10).fill(7.5),...Array(6).fill(8),...Array(2).fill(8.5)],2],['4.365',[...Array(4).fill(45),...Array(10).fill(55),...Array(12).fill(65),...Array(4).fill(75)],0],['4.366',[...Array(6).fill(2.5),...Array(14).fill(7.5),...Array(8).fill(12.5),...Array(2).fill(17.5)],0]];
 for(const [id,a,i] of samples){assert.equal(a.length,30);assert.ok(Math.abs(mean(a)-q(id).rättSvar[i][0])<1e-8,id);assert.ok(Math.abs(sd(a)-q(id).rättSvar[i][1])<1e-8,id);assert.match(q(id).spelDelar[i].s,/Envariabelanalys/);assert.equal(q(id).spelDelar[i].geogebra,true);assert.equal(q(id).spelDelar[i].miniräknare,true)}
});
test('Golfstickprovet har 9 av 12 observationer i intervallet',()=>{const a=[276,279,279,277,278,278,280,282,285,272,279,278],m=mean(a),s=sd(a);assert.equal(a.filter(x=>x>=m-s&&x<=m+s).length,9);assert.equal(q('4.306').rättSvar[0],75);assert.match(q('4.306').spelDelar[0].s,/Envariabelanalys/);assert.match(q('4.306').spelDelar[1].s,/inte säkert/)});
