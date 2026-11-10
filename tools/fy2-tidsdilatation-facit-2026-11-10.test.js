'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter2.js'),'utf8'),c);const bank=c.window.BANK2,qs=bank.filter(q=>q.omr==='tidsdilatation'),q=id=>bank.find(q=>q.id===id),g=b=>1/Math.sqrt(1-b*b);
test('Alla 34 huvudfacit och GPS-delarna har konkreta rubriker och svarsrad',()=>{assert.equal(qs.length,34);for(const q of qs)for(const s of [q.s,...(q.spelDelar||[]).map(d=>d.s)]){assert.equal((s.match(/<li>/g)||[]).length,(s.match(/class="facit-rubrik"/g)||[]).length,q.id);assert.match(s,/class="facit-svar"/,q.id);assert.doesNotMatch(s,/Tänk så här:|Kontroll och insikt:|Börja med att skriva upp|Välj sedan ett fysikaliskt samband/,q.id)}for(const q of qs){assert.equal(q.miniräknare,true,q.id);assert.equal(q.geogebra,false,q.id)}});
test('Samtliga numeriska svar följer självständigt uppställda samband',()=>{
 const c=299792458,t=15000/(.995*c),tau=t/g(.995);
 const expected={'6.1':g(150e6/c),'6.2':g(.6),'6.3':c*Math.sqrt(1-1/4),'6.4':Math.sqrt(1-1/25),'6.5':6*g(.5),'6.7':Math.sqrt(1-(2.6/4.4)**2),'6.10':2*g(.94)/g(.75),'6.23':2.2*g(.998),'6.25':5/g(.7),'6.26':5*g(.7),'6.59':5*g(.8),'6.60':2*g(.95),'6.61':Math.sqrt(3)/2,'6.301':g(.8),'6.302':100*2**(-tau/1.56e-6),'6.303':Math.sqrt(3)/2,'6.305':8-8/g(.6),'6.307':Math.sqrt(1-1/1.25**2),'6.320':g(.6),'6.321':g(.8),'6.322':g(.99),'6.323':2*g(.6),'6.324':2.2*g(.98),'6.327':g(.9),'6.328':5*2,'6.329':g(.8)};
 for(const [id,v] of Object.entries(expected))assert.ok(Math.abs(q(id).rättSvar-v)<=.009*Math.abs(v),`${id}: äldre avrundat mål ska stämma inom sin visade precision`);
});
test('GPS härleds som tidsförlust och ger signalavstånd, inte garanterat positionsfel',()=>{
 const loss=86400*(3870/299800000)**2/2;assert.ok(Math.abs(loss-7.2e-6)<1e-8);assert.ok(Math.abs(299800000*loss-2160)<5);
 assert.match(q('6.55').spelDelar[0].s,/t-\\tau/);assert.match(q('6.55').spelDelar[1].s,/enskilt signalavstånd/);
});
