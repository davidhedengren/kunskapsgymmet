'use strict';
const {test}=require('node:test'), assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const bank=c.window.BANKMA2;
test('Diagrammens data och GeoGebras stickprovsstandardavvikelse stämmer',()=>{
 for(const [id,data] of [['4.451',[2,3,3,4,4,4,5,7]],['4.455',[0,0,0,0,1,1,1,1,1,1,2,2,2,3,4]],['4.456',[0.4,0.7,0.2,0.8,0.9,0.2]]]){
  const q=bank.find(x=>x.id===id),mean=data.reduce((a,b)=>a+b,0)/data.length,sd=Math.sqrt(data.reduce((a,b)=>a+(b-mean)**2,0)/(data.length-1));
  assert.ok(Math.abs(sd-q.rättSvar)<1e-8,id);assert.equal(q.geogebra,true,id);assert.match(q.s,/Envariabelanalys/);assert.match(q.s,/Raden s/);assert.match(q.s,/σ/);
 }
});
