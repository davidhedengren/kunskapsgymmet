'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');let c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id),near=(a,b,t)=>assert.ok(Math.abs(a-b)<=t,`${a} mot ${b}`);
test('Mittområdets andelar, GeoGebra-steg och svarsnycklar är begripliga',()=>{
 const data=[['4.38','0,023','0,977',30.023033449,49.976966551],['4.176','0,023','0,977',22.018426759,37.981573241],['4.177','0,16','0,84',64.033252701,75.966747299],['4.216','0,023','0,977',80.046066898,119.953933102],['4.231','0,159','0,841',53.009966106,66.990033894]];
 for(const[id,l,h,a,b]of data){const x=q(id);assert.match(x.t,/mittersta/,id);assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.match(x.s,/sannolikhetskalkylator/i,id);assert.ok(x.s.includes(l)&&x.s.includes(h),id);near(x.rättSvar[0],a,x.tolerans[0]);near(x.rättSvar[1],b,x.tolerans[1]);}
});
test('Antalet kattungar räknas med GeoGebras tillräckligt precisa andel',()=>{
 const x=q('4.44');assert.equal(x.geogebra,true);assert.equal(x.miniräknare,true);assert.equal(x.svarEnhet,'kattungar');assert.match(x.s,/0,8186/);assert.match(x.s,/654\{,\}9|654,9/);assert.equal(x.rättSvar,655);near(0.8185946141203636*800,x.rättSvar,.13);
});
