'use strict';
const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter.js'),'utf8'),c);
const qs=c.window.BANK.filter(q=>q.omr==='kopplingar'&&q.familj==='Blandade kopplingar'),q=id=>qs.find(q=>q.id===id);
const par=(a,b)=>1/(1/a+1/b),near=(a,b,id)=>{if(b===null)return;if(Array.isArray(b)){assert.equal(a.length,b.length,id);b.forEach((v,i)=>near(a[i],v,id));return;}assert.ok(Math.abs(a-b)<1e-10*Math.max(1,Math.abs(b)),`${id}: ${a} != ${b}`);};
test('Alla 26 huvudfacit och 37 delkort följer nya mallen',()=>{
 assert.equal(qs.length,26);assert.equal(qs.reduce((n,q)=>n+(q.spelDelar||[]).length,0),37);
 for(const q of qs){assert.equal(q.miniräknare,true,q.id);
  for(const d of [q,...q.spelDelar||[]]){
   const id=q.id+(d.etikett||'');assert.notEqual(d.miniräknare,false,id);
   assert.match(d.s,/facit-steglista/,id);assert.match(d.s,/facit-svar/,id);
   for(const [,s] of d.s.matchAll(/<li>([\s\S]*?)<\/li>/g))assert.match(s,/^<p class="facit-rubrik">/,id);
   assert.doesNotMatch(d.s,/<p><p>|undefined|None/,id);
   assert.ok(d.ledtrad,id+' ledtråd');
  }
 }
});
const p43=par(300,600),i43=12/(150+p43),p53=par(200,300),i53=12/(100+p53);
const models={
 '8.4':(12*par(200,300)/(120+par(200,300)))**2/300,
 '8.18':[[12/(100+200),12/100],((12/100)/(12/300))**2],
 '8.43':[p43,i43,i43*p43,i43*p43/300],
 '8.52':12*par(150+250,400)/(100+par(400,400))/(150+250)*250,
 '8.53':[p53,100+p53,i53,i53*p53],
 '8.54':[null,450-180-120,180/450*100,null],
 '8.87':[[6,6],[6/200,6/300],par(200,300)],
 '8.90':[12/100,[12/100*40,12/100*60],12/40,((12/40)/(12/100))**2],
 '8.123':[100+200,par(300,300),9/par(300,300)],
 '8.127':[par(90,90),90+par(90,90),9/(90+par(90,90))*90],
 '8.252':18*par(6,12)/(4+par(6,12)),
 '8.130':[.03*120,9-.03*120,(9-.03*120)/.03,9/.03],
 '8.133':[par(100,100),50+par(100,100),12/(50+par(100,100))*50],
 '8.253':8+(8/8+8/8)*5,
 '8.134':.008*600+(.008+.008*600/300)*150,
 '8.254':18*par(10,10)/(6+par(10,10)),
 '8.255':18/(7+par(12,12)),
 '8.154':12/(100+1/(1/200+1/300+1/600))*(1/(1/200+1/300+1/600))/600,
 '8.256':18*par(6,8)/(4+par(6,8))/6,
 '8.370':par(10,10)+4.7,
 '8.524':[.3*(10+30),1/(1/(12/.6-10)-1/30)],
 '8.526':[6/(1000+par(1000,1000))*par(1000,1000),6/(1000+par(1000,1000))*1000],
 '8.527':[Math.sqrt(25/4)*(4+2*.4),4/(4+2*.4)*100],
 '8.529':[(12-12/(6+3)*3)/(12/(6+3)*3/4),12/(6+3)+12/(6+3)*3/4]
};
test('Alla numeriska huvudnycklar verifieras med kretsarnas fysikmodeller',()=>{
 assert.equal(Object.keys(models).length,24);
 for(const[id,result]of Object.entries(models))near(q(id).rättSvar,result,id);
});
test('Delkortens egna mellanvärden och ordnade dubbelsvar bevaras',()=>{
 const overrides={'8.43':{2:.03429*200,3:6.86/300},'8.53':{3:.05455*120}};
 for(const x of qs){if(!models[x.id]||!x.spelDelar)continue;
  x.spelDelar.forEach((d,i)=>{const expected=overrides[x.id]?.[i]??models[x.id][i];if(typeof expected==='number'||Array.isArray(expected))near(d.rättSvar,expected,x.id+d.etikett);});
 }
 for(const[id,index,labels]of [['8.18',0,['0{,}040','0{,}120']],['8.87',1,['0{,}030','0{,}020']],['8.90',1,['4{,}8','7{,}2']]]){
  const d=q(id).spelDelar[index];assert.equal(d.svarsstruktur,'ordnad');
  const answer=d.s.match(/<p class="facit-svar">([\s\S]*?)<\/p>/)[1];for(const value of labels)assert.ok(answer.includes(value),id);
 }
});
test('Fristående begreppskort använder inga osynliga data eller kretsnamn',()=>{
 assert.doesNotMatch(q('8.54').spelDelar[3].s,/180|120|300/);
 for(const d of q('8.126').spelDelar.slice(1))assert.doesNotMatch(d.s,/\b(?:A|B)\b/);
 assert.doesNotMatch(q('8.130').spelDelar[3].s,/180|120|i c\)/);
 assert.equal(q('8.153').spel,false);
 assert.match(q('8.153').s,/I\/n/);assert.match(q('8.153').s,/nI/);
});
