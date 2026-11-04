'use strict';
const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter.js'),'utf8'),c);
const all=c.window.BANK,qs=all.filter(x=>x.familj==='Effekt och verkningsgrad med inre resistans'),q=id=>qs.find(x=>x.id===id);
const near=(a,b)=>{if(Array.isArray(b)){assert.equal(a.length,b.length);b.forEach((v,i)=>near(a[i],v));}else assert.ok(Math.abs(a-b)<1e-10*Math.max(1,Math.abs(b)),`${a} vs ${b}`);};
const models={
 '8.214':2.6**2*.35,'8.215':10/12*100,'8.45':[12*3,3**2*.4,12*3-3**2*.4,(12*3-3**2*.4)/(12*3)*100],
 '8.222':1**2*1.1,'8.224':1.2**2*.9,'8.226':1.4**2*1.1,'8.228':9-.9*1.1,'8.230':9/1.3-1.1,
 '8.232':(9-.9*1)*1,'8.234':4/(4+.55)*100,'8.237':.5/(2+.5)*100,'8.240':5/(5+.45)*100,'8.242':.6/.2,'8.243':.85*.4/(1-.85),
 '8.727':500-100,'8.728':6*.4-2,'8.729':2**2*.5*10+.2**2*.5*50,
 '8.730':((12/(4+.2))**2*4)/((12/(4+1))**2*4),
 '8.731':((12/(1+1/(1/6+1/3)))/(1/6+1/3))**2/3/(12*(12/(1+1/(1/6+1/3))))*100,
 '8.732':8*9.82*3/(.75*10*2),'8.733':9/Math.sqrt(.5/.5)-.5,
 '8.734':1.5**2*((5.5-5)/(1-.5)),'8.735':[8/2**2,8/(6*2)*100],
 '8.736':(1.5/(1+.5/2))**2*1,'8.737':72/(60*2**2),'8.738':3
};
test('Samtliga 26 numeriska mål och fyra delkort har oberoende modeller',()=>{
 assert.equal(qs.length,26);assert.equal(Object.keys(models).length,26);
 for(const x of qs)near(x.rättSvar,models[x.id]);
 for(const[i,d]of q('8.45').spelDelar.entries())near(d.rättSvar,models['8.45'][i]);
 assert.equal(new Set(all.map(x=>x.id)).size,all.length);
});
test('Alla 30 facit följer mallen; nya frågor har figurer, verktyg och enheter',()=>{
 for(const x of qs)for(const d of [x,...x.spelDelar||[]]){
  assert.match(d.s,/facit-steglista/);assert.match(d.s,/facit-svar/);assert.match(d.s,/facit-rubrik">[^<]*\\\(/);assert.ok(d.ledtrad);
  assert.doesNotMatch(d.s,/undefined|None|<p><p>/);assert.notEqual(d.miniräknare,false);
 }
 for(let n=727;n<=738;n++){
  const x=q('8.'+n);assert.match(x.t,/<svg[^>]*role="img"/);assert.equal(x.miniräknare,true);assert.equal(x.geogebra,n===735);
  assert.equal(x.spel,true);assert.equal(x.manuellKomplettering,false);assert.doesNotMatch(x.t,/använd.*formeln|g\s*=\s*9/);
 }
 assert.doesNotMatch(q('8.237').ledtrad,/yttre/);assert.match(q('8.237').ledtrad,/inre/);
 for(const id of ['8.215','8.234','8.240','8.242','8.243'])assert.ok(q(id).ledtrad);
});
test('Två effektrötter, korrekt vald verkningsgrad och dimensioneringsgräns',()=>{
 for(const I of [2,4])assert.equal((6-I)*I,8);
 assert.ok(8/(6*2)>8/(6*4));assert.match(q('8.735').s,/<svg/);
 assert.equal(q('8.735').svarsstruktur,'ordnad');assert.deepEqual(Array.from(q('8.735').svarEnhet),['Ω','%']);
 assert.equal(q('8.735').svarEtiketter.length,2);
 const heat=R=>(9/(R+.5))**2*.5;near(heat(q('8.733').rättSvar),.5);assert.ok(heat(8.49)>.5);
 assert.ok(1/(1+.5/2)>=.70);assert.ok(1/(1+2*.5)<.70);
 const wrongAverage=((2*10+.2*50)/60)**2*.5*60;assert.notEqual(wrongAverage,q('8.729').rättSvar);
});
