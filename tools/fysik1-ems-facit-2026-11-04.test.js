'use strict';
const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter.js'),'utf8'),c);
const qs=c.window.BANK.filter(x=>x.familj==='Ems, polspänning och inre resistans'),q=id=>qs.find(x=>x.id===id);
test('48 huvudfacit och 48 delkort följer facitmallen och verktygsreglerna',()=>{
 assert.equal(qs.length,48);assert.equal(qs.reduce((n,x)=>n+(x.spelDelar||[]).length,0),48);
 for(const x of qs){assert.equal(x.miniräknare,true,x.id);assert.equal(x.geogebra,['8.10','8.13'].includes(x.id),x.id);
  for(const d of [x,...x.spelDelar||[]]){
   const id=x.id+(d.etikett||'');assert.notEqual(d.miniräknare,false,id);
   assert.match(d.s,/facit-steglista/,id);assert.match(d.s,/facit-svar/,id);assert.ok(d.ledtrad,id);
   assert.doesNotMatch(d.s,/undefined|None|<p><p>/,id);
   for(const[,step]of d.s.matchAll(/<li>([\s\S]*?)<\/li>/g))assert.match(step,/^<p class="facit-rubrik">/,id);
   if(id!=='8.95c')assert.match(d.s,/class="facit-rubrik">[^<]*\\\(/,id);
  }
 }
 assert.equal(q('8.13').spelDelar[0].geogebra,true);assert.equal(q('8.13').spelDelar[1].geogebra,false);
 assert.equal(q('8.10').spel,false);
});
test('Enheten i 8.225 är resistans; jämförelse med sju liknande nycklar',()=>{
 for(const id of ['8.225','8.209','8.235','8.238','8.241','8.399','8.400','8.401'])assert.equal(q(id).svarEnhet,'Ω',id);
 assert.match(q('8.225').s,/7\{,\}30\\ \\Omega/);
 assert.equal(q('8.225').rättSvar,12/1.5-.7);
});
test('Dubbelsvar är fullständiga, grafiska metoder har egna grafer',()=>{
 for(const[id,values]of [['8.162',['393{,}75','252','7{,}875','5{,}04']],['8.164',['4{,}09','1{,}39','3{,}75','3{,}46']],['8.525',['12','1']]]){
  const answers=[...q(id).s.matchAll(/class="facit-svar">([\s\S]*?)<\/p>/g)].map(x=>x[1]).join(' ');
  for(const v of values)assert.ok(answers.includes(v),id+': '+v);
 }
 for(const[id,part]of [['8.10',0],['8.10',2],['8.13',0]])assert.match(q(id).spelDelar[part].s,/<svg[^>]*role="img"/);
 assert.doesNotMatch(q('8.13').spelDelar[0].s,/0\{,\}9375/);
 assert.doesNotMatch(q('8.99').spelDelar[2].s,/6\{,\}0|6\\ \\Omega/);
 assert.doesNotMatch(q('8.525').s,/facit-mark/);
});
test('8.525 och regressionslinjen i 8.10 har oberoende numerisk kontroll',()=>{
 const iA=10/5,iB=9/3,r=(10-9)/(iB-iA),E=10+r*iA;
 assert.equal(q('8.525').rättSvar[0],E);assert.equal(q('8.525').rättSvar[1],r);
 for(const[i,u]of [[.25,1.42],[.6,1.28],[1.05,1.10],[1.5,.92]])assert.ok(Math.abs(1.52-.4*i-u)<1e-12);
 assert.equal(1.52/.4,3.8);assert.ok(Math.abs(1.5**2*.6/(.6+.6)**2-.9375)<1e-12);
});
