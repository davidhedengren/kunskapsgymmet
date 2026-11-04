'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifter.js','utf8'),c);const B=c.window.BANK,q=id=>B.find(x=>x.id===id);
const ids=B.filter(x=>x.familj==='Absorberad dos (Gy)').map(x=>x.id).concat(['8.614','8.615','8.619','8.608','8.609','8.611','8.612','8.613']);
test('28 huvudfacit och 11 delkort följer mallen och har relevanta verktyg',()=>{
 assert.equal(ids.length,28);let count=0;
 for(const id of ids){const t=q(id);for(const d of [t,...(t.spelDelar||[])]){
  count++;assert.match(d.s,/facit-steglista/,id);assert.match(d.s,/facit-rubrik/,id);assert.match(d.s,/facit-svar/,id);assert.match(d.s,/class="facit-rubrik">[^<]*\\\(/,id);
  assert.doesNotMatch(d.s,/<p><div|None|null/,id);assert.ok(d.ledtrad,id);
  assert.equal(d.miniräknare??t.miniräknare,true,id);assert.equal(d.geogebra??t.geogebra,false,id);
 }}assert.equal(count,39);
});
test('Alla numeriska uppgifter och egna kortvärden kontrolleras oberoende',()=>{
 const day=86400,e=1.602e-19,lambda=Math.log(2)/(14.3*day),N=1.31e6/lambda*(1-2**(-10/14.3));
 const cases={'8.608':300,'8.609':.4,'8.611':11,'8.612':10,'8.613':12,'8.614':12/(100+1/(1/300+1/600))*200,'8.615':(9/300+9/600)*1000,'8.619':(12/(20+1/(1/30+1/60)))**2*20,
 '9.152':.03/60*1000,'9.153':3.5*2.4,'9.154':4.5/1.8,'9.157':.0065*1000,'9.158':6/1000,'9.44':[.003/60*1e6,50],
 '9.168':1.5*4.2,'9.173':.012/60*1000,'9.97':[.25/70,.25/70*1000],'9.362':.25*75,'9.363':2/4180,
 '9.365':[2000*.3/(100e3*e),2000/4180],'9.368':57.4e3*day*.5*122e3*e/65,'9.369':4500*5/(1.6e6*e),
 '9.373':[N,N*700e3*e,N*700e3*e/.1],'9.380':[1.7/.12,1.7/.12*.15],'9.383':(334+4.18*100+2260)*1000};
 const near=(a,b,id)=>assert.ok(Math.abs(a-b)<=Math.abs(b)*1e-12+1e-15,`${id}: ${a} != ${b}`);
 for(const[id,v]of Object.entries(cases))[v].flat().forEach((x,i)=>near([q(id).rättSvar].flat()[i],x,id));
 for(const[id,i,v]of [['9.44',0,50],['9.44',1,50],['9.97',0,.25/70],['9.97',1,3.57],['9.365',0,600/(100e3*e)],['9.365',1,2000/4180],['9.373',0,N],['9.373',1,8.97e11*700e3*e],['9.373',2,1.01],['9.380',0,1.7/.12],['9.380',1,2.1]])near(q(id).spelDelar[i].rättSvar,v,id+i);
});
test('Begreppsalternativ, avrundning och egna givna data bevaras',()=>{
 for(const[id,txt]of [['9.155','gray (Gy)'],['9.156','1 J/kg'],['9.167','Bq mäter aktivitet och Gy mäter absorberad dos.']]){
  assert.equal(q(id).alternativ.filter(a=>a.ratt).length,1);assert.equal(q(id).alternativ.find(a=>a.ratt).txt,txt);
 }
 assert.match(q('9.380').s,/2,13 J/);assert.doesNotMatch(q('9.380').s,/2\{,\}12\\/);
 assert.match(q('9.380').spelDelar[1].s,/14\\,\\mathrm\{J\/kg\}/);
 assert.doesNotMatch(q('9.373').spelDelar[0].s,/0\{,\}101|1\{,\}01/);
 assert.doesNotMatch(q('9.365').spelDelar[0].s,/0\{,\}478/);
 assert.doesNotMatch(q('9.155').ledtrad,/gray|Gy/);
});
