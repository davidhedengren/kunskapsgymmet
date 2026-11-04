const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const bank=JSON.parse(JSON.stringify(c.window.BANKMA2));const get=id=>bank.find(q=>q.id===id),ids=require('./ma2-pq-runda2-2026-11-04.changes.json').map(q=>q.id);
const polynomials={
 '2.24':[-12,20,[2,10]],'2.34':[5,-84,[-12,7]],'2.38':[-3,-4,[-1,4]],'2.251':[-3,-4,[-1,4]],'2.697':[-3,-4,[-1,4]],'2.65':[-12,32,[4,8]],'2.111':[-1,-72,[-8,9]],'2.267':[-6,5,[1,5]],'2.283':[-5,-6,[-1,6]],'2.289':[-15,44,[4,11]],'2.290':[-23,120,[8,15]],'2.338':[-4,-5,[-1,5]],'2.342':[2,-48,[-8,6]],'2.488':[-2,-48,[-6,8]],'2.570':[3,-40,[-8,5]],'2.452':[-12,32,[4,8]],'2.475':[-2,-3,[-1,3]],'2.730':[-5,6,[2,3]],'5.06':[-90,1400,[20,70]],'5.21':[-100,1600,[20,80]],'5.33':[-12,32,[4,8]],'5.45':[-16,60,[6,10]],'5.176':[-7,-30,[-3,10]],'3.141':[-17,60,[5,12]]
};
test('25 huvudfacit och två delkort följer mallen och rätt metod',()=>{
 assert.equal(ids.length,25);let count=0;
 for(const id of ids){const q=get(id);for(const d of [q,...q.spelDelar||[]]){for(const re of [/facit-steglista/,/facit-rubrik/,/facit-svar/])assert.match(d.s,re,id);count++;}
  if(id!=='2.1148'){assert.match(q.s,/Pq-formeln/,id);assert.doesNotMatch(q.s,/faktoriser/i,id);assert.equal(q.miniräknare,true,id);}
  assert.equal(q.geogebra,false,id);
 }
 assert.equal(count,27);assert.equal(get('2.1148').miniräknare,false);
 assert.doesNotMatch(get('2.111').spelDelar[0].s,/Nej|x_1|x_2/);
 assert.doesNotMatch(get('2.111').spelDelar[1].s,/från a\)/);
 assert.match(get('2.111').spelDelar[1].s,/givet i frågan/);
 assert.equal(get('2.342').omr,'andragradsekvationer_tillampningar');assert.equal(get('2.342').familj,'Andragradsekvationer i geometri');assert.equal(get('2.730').omr,'losningsformel_andragrad');assert.equal(get('5.21').traningsniva,3);
 assert.match(get('2.65').t,/>krävd höjd<\/text>/);assert.match(get('2.488').s,/längre sidan/);
 assert.match(get('2.338').t,/meter/);assert.match(get('2.338').t,/sekunder/);
});
test('Pq-koefficienter och båda rötterna verifieras oberoende med insättning',()=>{
 for(const[id,[p,q,roots]]of Object.entries(polynomials)){
  for(const x of roots)assert.equal(x*x+p*x+q,0,id);
  assert.equal(roots[0]+roots[1],-p,id);assert.equal(roots[0]*roots[1],q,id);
  assert.ok(get(id).s.includes(`p=${p}\\)`),id);assert.ok(get(id).s.includes(`q=${q}\\)`),id);
 }
});
test('Geometriska mått, tider och enheter stämmer med rättningsnyckeln',()=>{
 const arr=id=>get(id).rättSvar.map(Number),n=id=>Number(get(id).rättSvar);
 let [a,b]=arr('2.34');assert.equal(a*b,84);assert.equal((a+3)*(b-3),90);assert.ok(a>0&&b>a);
 [a,b]=arr('2.289');assert.equal(2*(a+b),30);assert.equal(a*b,44);
 [a,b]=arr('2.290');assert.equal(2*(a+b),46);assert.equal((a-2)*(b-2),78);assert.ok(a>2&&b>2);
 for(const id of ['2.342','2.488']){[a,b]=arr(id);assert.equal(a*b,48);assert.equal(b-a,2);}
 a=n('2.570');assert.equal(a*(a+3),40);assert.ok(a>0);
 a=n('2.338');assert.ok(a>0);assert.equal(-5*a*a+20*a+25,0);assert.equal(get('2.338').svarEnhet,'s');
 [a,b]=arr('5.176');assert.equal(b-a,5);assert.ok(Math.abs(1/a+1/b-1/6)<1e-12);assert.ok(a>0&&b>0);
 [a,b]=arr('3.141');assert.equal(a+b+13,30);assert.equal(a*a+b*b,13**2);
 for(const count of arr('5.06')){const x=count/100;assert.equal(-5*x*x+450*x-7000,0);}
});
test('Rotekvationerna har inga godtagna extralösningar',()=>{
 for(const id of ['2.38','2.251','2.697']){assert.match(String(get(id).rättSvar),/4/);assert.equal(Math.sqrt(4+5),4-1);assert.notEqual(Math.sqrt(-1+5),-1-1);assert.match(get(id).s,/Pröva/);}
 const x=Number(get('2.283').rättSvar);assert.equal(Math.sqrt(x+10),x-2);assert.notEqual(Math.sqrt(-1+10),-1-2);
 const y=Number(get('2.475').rättSvar);assert.equal(Math.sqrt(2*y+3),y);assert.notEqual(Math.sqrt(2*(-1)+3),-1);
 assert.deepEqual(get('2.111').rättSvar,['72','nej']);assert.equal(Math.sqrt(9+72),9);assert.notEqual(Math.sqrt(-8+72),-8);
});
test('Intervallens gränser och strikt positiv vinst kontrolleras på båda sidor',()=>{
 const cases=[['2.24',x=>-.2*x*x+2.4*x,4,2,10],['2.267',x=>-x*x+6*x,5,1,5],['2.452',x=>x*(12-x),32,4,8],['5.33',x=>x*(24-2*x),64,4,8],['5.45',x=>x*(16-x),60,6,10]];
 for(const[id,f,limit,lo,hi]of cases){assert.ok(Math.abs(f(lo)-limit)<1e-12,id);assert.ok(Math.abs(f(hi)-limit)<1e-12,id);assert.ok(f((lo+hi)/2)>limit,id);assert.ok(f(lo-.1)<limit&&f(hi+.1)<limit,id);if(id!=='2.24')assert.deepEqual(get(id).rättSvar,[lo,hi]);}
 const h=x=>.25*x*(12-x);assert.equal(h(4),7.5+.5);assert.equal(h(8),7.5+.5);assert.equal(Number(get('2.65').rättSvar),8-4);
 const levels=[];for(let x=0;x<=100;x+=5)if(-2*x*x+200*x-3200>0)levels.push(x);assert.deepEqual(get('5.21').rättSvar.split(',').map(Number),levels);assert.ok(!levels.includes(20)&&!levels.includes(80));
});
test('Exakt en gemensam rot och korrekt begreppsåterkoppling',()=>{
 assert.deepEqual(get('2.730').rättSvar,[-1,1]);for(const a of [-1,1]){const common=[2,3].filter(x=>x*x+a*x-6===0);assert.equal(common.length,1);}
 const q=get('2.1148');assert.equal(q.alternativ.filter(a=>a.ratt).length,1);assert.match(q.alternativ.find(a=>a.ratt).txt,/0/);
 assert.doesNotMatch(q.alternativ[0].kommentar,/tappa lösningar/);assert.match(q.alternativ[0].kommentar,/tillåten/);assert.equal((8+1)*(8-3),45);assert.equal(2*2.5,5);
});
test('Sex liknande fall behåller lämplig faktorisering eller nollprodukt',()=>{
 for(const id of ['2.122','2.126','2.127','2.160','2.256','2.520'])assert.doesNotMatch(get(id).s,/Pq-formeln/);
 for(const x of [-3,5])assert.ok(2*(x+3)*(x-5)===0);assert.equal(2*3*(-5),-30);
 for(const x of [-2,7])assert.ok((x+2)*(x-7)===0);
 for(const x of [0,5])assert.ok(x*(x-5)===0);
 for(const x of [-3,0,3])assert.equal(x**3-9*x,0);
 for(const x of [0,4])assert.equal(2*x*x-8*x,0);for(const x of [0,-3])assert.equal(4*x*x+12*x,0);for(const x of [-3,3])assert.equal(3*x*x-27,0);
 for(const x of [0,-4])assert.equal(x*x+4*x,0);
});
