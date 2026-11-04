'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter.js'),'utf8'),c);
const qs=c.window.BANK.filter(q=>q.omr==='kopplingar'&&q.familj==='Elektrisk effekt och energi'),q=id=>qs.find(x=>x.id===id);
const near=(a,b,id)=>{if(b===null)return;if(Array.isArray(b)){assert.equal(a.length,b.length,id);b.forEach((v,i)=>near(a[i],v,id));return;}assert.ok(Math.abs(a-b)<1e-10*Math.max(1,Math.abs(b)),`${id}: ${a} != ${b}`);};
const plift=3*.6*3.5,wlift=.7*9.82*.5,pwire=18**2*(1.7e-8*7/(Math.PI*(.001628/2)**2)),ein=2.3*.0135*4.2*3600,eout=1.6*.018*2.4*3600;
// Independent formula models from the question givens, not values read from the answer key.
const models={
 '8.3':[6/330,36/330],'8.5':[.12*.3*365*24,.12*.3*365*24*2.5,null],'8.6':[.18**2*1500,Math.sqrt(20/800)],
 '8.14':[1.5*.05*1000,1.5/.05],'8.15':[800*1.7,22.5*9,22.5*9/(800*1.7)*100],
 '8.27':[2*3600,9*7200/1000,2/.15],'8.36':[470*.025,470*.025**2],'8.37':[5*2.2*80/60,3.7*4,null],
 '8.39':[1.8*3.5,1.8*3.5*30,1.8*3.5*30*2.5,1800/230],'8.46':[.2,null],'8.63':[21/12,144/21],
 '8.75':[230/52,230**2/52],'8.193':12*2,'8.77':[1500/230,230**2/1500,1500*(115/230)**2],'8.194':100*30,
 '8.89':[12/600*1000,12**2/600,12**2/600*300,(12/600)**2*400*300],
 '8.92':[plift,wlift,wlift/plift*100],'8.94':[(.06-.009)*4*365,(.06-.009)*4*365*2.5,45/((.06-.009)*4*365*2.5)*12],
 '8.96':[230*10,null,null],'8.97':[60/18*100,2*100/80,60/(18+2*100/80)*100],
 '8.98':[.05*200,[100e6/400e3,(100e6/400e3)**2*10/1e6],[100e6/20e3,(100e6/20e3)**2*10/1e6],null],
 '8.109':6500*1.5/1000,'8.111':[6/.25,6*.25],'8.112':[42000/4500,4500/.22/3600],
 '8.128':[230/20,230**2/15/20,null],'8.156':[2*3600,3.7*7200/1000,2/.45],
 '8.202':.08*5,'8.203':144/7,'8.183':230*1.8,'8.184':12*4.5,'8.205':.07*4,'8.185':1.8*2.5,'8.186':4.5/.75,'8.206':Math.sqrt(24*6),'8.187':1520/2.5/230,
 '8.396':4.6*(20/19)**2,'8.445':[230*16*45*60,230*16*45*60/(120*2.7)/3600],
 '8.446':[300e3*30e3,300e3*30e3*.52,300e3*30e3*.52*45*365.25*86400],
 '8.447':1500*736*.8/2000,'8.448':230*1.7/1000*24*2,'8.449':[12*55/1000,12*55/72],
 '8.450':(230*.26-9)/1000*4*365*2,'8.451':.475*4180*68/(230*1.1),'8.452':[eout/ein*100,(ein-eout)/(.015*975)],
 '8.453':16*3.6e6/340,'8.454':12*23*180/334000/917/.52*1000,'8.455':240*21.5*60/(4180*6.5),
 '8.456':[(750e3/12e3)**2*3,(750e3/50e3)**2*3],'8.457':.12*4180*70/.85/480/12,
 '8.458':.5*4180*80/(230**2/100),'8.459':230**2/(109*4180*29/1500),'8.460':.06*2500*72/(230**2/900),
 '8.461':[pwire,pwire/1000*360*2],'8.462':[230/1.5,(.72*2100*18+.72*334000)/(230*1.5)],
 '8.463':(1.5**2/18)*Math.PI*(.0005/2)**2/1.7e-8,
 '8.528':[(12/(36/3+36/6))**2*(36/3),(12/(36/3+36/6))**2*(36/6)],
 '8.581':3/.95,'8.583':60/230,'8.585':24*1.25,'8.586':36/11,'8.587':.345**2*12.5,'8.588':8.5**2/5400*1000,'8.589':.86**2*370,'8.591':4.5*.12,
 '8.592':(3/24)*550,'8.594':[6*1.55,12*1.55],'8.595':(30/680)**2*82,
 '8.596':Math.min(Math.sqrt(.5/220),Math.sqrt(.5/470))*1000,'8.597':10/(6.3+8.6),'8.598':1.2/.56+.56*15,
 '8.600':[Math.sqrt(5*55),8.4/Math.sqrt(5/55)],'8.601':6/4.5*15,'8.602':5/(10/15),'8.603':.25/.045**2,
 '8.605':[5/Math.sqrt(8.4/55),Math.sqrt(8.4*55)],'8.606':6/15*4.5,'8.607':25/10,'8.618':(12-6)/(3/6),
 '8.658':[36**2/(24+48),36**2/24],'8.659':Math.min(Math.sqrt(.25/100),Math.sqrt(.5/400))*500
};
test('Alla 80 huvudnycklar stämmer med oberoende beräkningar',()=>{
 assert.equal(qs.length,80);assert.equal(Object.keys(models).length,80);
 for(const x of qs)near(x.rättSvar,models[x.id],x.id);
});
test('78 delkort följer sina egna data eller ärver rätt delnyckel',()=>{
 const own={'8.3':{1:6*.0182},'8.5':{1:315.4*2.5},'8.15':{2:203/1360*100},'8.92':{2:3.44/6.3*100},'8.94':{1:74.5*2.5,2:45/186*12},'8.445':{1:9.9e6/(120*2.7)/3600},'8.446':{2:4.7e9*45*365.25*86400},'8.452':{1:221/(.015*975)},'8.461':{1:.0185*360*2}};
 let count=0;for(const x of qs)for(const[i,d]of (x.spelDelar||[]).entries()){
  count++;const value=own[x.id]?.[i]??models[x.id][i];if(value===null)continue;
  near(d.rättSvar??x.rättSvar[i],value,x.id+d.etikett);
 }
 assert.equal(count,78);
});
test('Alla facit har specifika steg, formler, svar och tillåten miniräknare',()=>{
 for(const x of qs){assert.equal(x.miniräknare,true,x.id);assert.equal(x.geogebra,false,x.id);
  for(const d of [x,...x.spelDelar||[]]){const id=x.id+(d.etikett||'');assert.notEqual(d.miniräknare,false,id);
   assert.match(d.s,/facit-steglista/,id);assert.match(d.s,/facit-svar/,id);assert.doesNotMatch(d.s,/undefined|None|<p><p>/,id);
   for(const[,step]of d.s.matchAll(/<li>([\s\S]*?)<\/li>/g))assert.match(step,/^<p class="facit-rubrik">/,id);
   assert.ok(d.ledtrad,id);if(!['8.5c','8.37c','8.46b','8.96c','8.98d'].includes(id))assert.match(d.s,/class="facit-rubrik">[^<]*\\\(/,id);
  }
 }
});
test('Hela dubbelsvar och rätt enhetsbyten, inga onödiga formelledningar',()=>{
 for(const[id,values]of [['8.98',['250','0{,}625','5000','250']],['8.594',['9{,}3','18{,}6']],['8.600',['16{,}6','27{,}9']],['8.605',['12{,}8','21{,}5']],['8.658',['18','54']]]){
  const answers=[...q(id).s.matchAll(/class="facit-svar">([\s\S]*?)<\/p>/g)].map(x=>x[1]).join(' ');for(const v of values)assert.ok(answers.includes(v),id+': '+v);
 }
 for(const i of [1,2]){const s=q('8.98').spelDelar[i].s;assert.match(s,/\\mathrm W/);assert.match(s,/\\mathrm\{MW\}/);}
 for(const[id,i]of [['8.39',0],['8.97',1],['8.446',1],['8.449',1],['8.461',1]])assert.doesNotMatch(q(id).spelDelar[i].ledtrad,/P=UI/,id);
 assert.doesNotMatch(q('8.603').ledtrad,/två effekter/);
 assert.notEqual(q('8.659').rättSvar,17.7);
});
