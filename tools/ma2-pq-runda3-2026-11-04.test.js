const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);
const bank=JSON.parse(JSON.stringify(c.window.BANKMA2)),get=id=>bank.find(q=>q.id===id),ids=require('./ma2-pq-runda3-2026-11-04.changes.json').map(q=>q.id);
const polynomials={
 '2.05':[-8,12,[2,6]],'2.163':[3,-18,[-6,3]],'2.245':[-5,6,[2,3]],'2.297':[-6,5,[1,5]],'2.302':[-6,8,[2,4]],'2.303':[-5,4,[1,4]],'2.485':[-13,36,[4,9]],'2.487':[-5,6,[2,3]],'2.523':[-7,10,[2,5]],'2.692':[4,-21,[-7,3]],'3.182':[-3,-40,[-5,8]],'3.187':[7,-120,[-15,8]],'3.493':[-2,-3,[-1,3]],'3.510':[4,-21,[-7,3]],'1.1096':[2,-15,[-5,3]]
};
test('16 huvudfacit och åtta självständiga delkort har steg, rubriker och svar',()=>{
 assert.equal(ids.length,16);let count=0;
 for(const id of ids){const q=get(id);for(const d of [q,...q.spelDelar||[]]){for(const re of [/facit-steglista/,/facit-rubrik/,/facit-svar/])assert.match(d.s,re,id);assert.equal(d.miniräknare??q.miniräknare,true,id);assert.equal(d.geogebra??q.geogebra,false,id);count++;}
  if(id!=='2.164')assert.match(q.s,/Pq-formeln/,id);
  assert.doesNotMatch(q.s,/faktorisera|faktorisering/i,id);
 }
 assert.equal(count,24);
 const a=get('2.05').spelDelar;
 assert.doesNotMatch(a[0].s,/största värde|Symmetrilinjen/);
 assert.doesNotMatch(a[1].s,/från a\)|nollställena 2 och 6/);
 assert.match(a[1].s,/frac\{b\}\{2a\}/);
 assert.doesNotMatch(get('2.245').spelDelar[0].s,/Pq-formeln|nollställe/);
 assert.doesNotMatch(get('2.297').spelDelar[1].s,/andra nollstället|Pq-formeln/);
 assert.match(get('2.297').spelDelar[2].fraga,/ena nollstället/);
 assert.deepEqual(get('2.05').traningsniva,[2,1,2]);assert.deepEqual(a.map(d=>d.traningsniva),[2,1,2]);
 for(const id of ['2.245','2.303'])assert.equal(get(id).familj,'Egenskaper och funktionsvärden');
});
test('Pq-rötterna verifieras genom insättning, summa och produkt',()=>{
 for(const[id,[p,q,roots]]of Object.entries(polynomials)){
  for(const x of roots)assert.equal(x*x+p*x+q,0,id);
  assert.equal(roots[0]+roots[1],-p,id);assert.equal(roots[0]*roots[1],q,id);
  assert.ok(get(id).s.includes(`p=${p}\\)`),id);assert.ok(get(id).s.includes(`q=${q}\\)`),id);
 }
});
test('Funktionsvärden, rötter och extremvärden motsvarar rättningsnycklarna',()=>{
 const g=x=>-x*x+8*x-12;assert.deepEqual(get('2.05').rättSvar,[['2','6'],'4','4']);for(const x of [2,6])assert.equal(g(x),0);assert.equal(g(4),4);for(const x of [3,5])assert.ok(g(x)<g(4));
 const f=x=>x*x-5*x+6;assert.equal(f(4),Number(get('2.245').rättSvar[0]));for(const x of get('2.245').rättSvar[1].map(Number))assert.equal(f(x),0);
 const h=x=>x*x-6*x+5;assert.deepEqual(get('2.297').rättSvar,[-3,'ja',5]);assert.equal(h(2),-3);assert.equal(h(1),0);assert.equal(h(5),0);
 const q=get('2.302'),[lo,hi,s,m]=q.rättSvar,ff=x=>x*x-6*x+8;assert.equal(ff(lo),0);assert.equal(ff(hi),0);assert.ok(lo<hi);assert.equal((lo+hi)/2,s);assert.equal(ff(s),m);assert.ok(ff(s-1)>m&&ff(s+1)>m);
 assert.equal(q.svarsstruktur,'ordnad');assert.deepEqual(q.svarEtiketter.slice(0,2),['Mindre nollstället','Större nollstället']);assert.match(q.t,/stigande ordning/);
 for(const x of get('2.303').rättSvar)assert.equal(x*x-4*x+3,x-1);
});
test('Substitution, bråk och givna rötter ger alla tillåtna svar',()=>{
 assert.deepEqual(get('2.485').rättSvar,[-3,-2,2,3]);for(const x of get('2.485').rättSvar)assert.equal(x**4-13*x*x+36,0);
 for(const x of get('2.487').rättSvar){assert.notEqual(x,0);assert.equal(x+6/x,5);}
 for(const x of get('2.523').rättSvar)assert.equal(x*x-7*x+10,0);
 const[p,r]=get('2.163').rättSvar.map(Number);assert.equal(9+3*p-18,0);assert.equal(r*r+p*r-18,0);assert.notEqual(r,3);
 for(const x of [-4,4])assert.equal(x*x-16,0);for(const x of [-5,0])assert.equal(x*x+5*x,0);for(const x of [-7,3])assert.equal(x*x+4*x-21,0);
 assert.match(get('2.692').s,/Bryt ut den gemensamma faktorn/);assert.match(get('2.692').s,/Kvadratrotsmetoden/);assert.equal(get('2.692').spel,false);
});
test('Båda heltalsparen och ordningen a>b kontrolleras',()=>{
 const q=get('2.164');assert.deepEqual(q.rättSvar,['-13,13',36]);const found=[];
 for(let r1=-40;r1<=40;r1++){const r2=r1+5;if(r1*r2===36)found.push([r1,r2]);}
 assert.deepEqual(found,[[-9,-4],[4,9]]);assert.deepEqual(found.map(([a,b])=>-(a+b)).sort((a,b)=>a-b),[-13,13]);
 const[a,b]=get('1.1096').rättSvar;assert.ok(a>b);assert.equal(a+b,-2);assert.equal(a*b,-15);for(const x of [-4,0,2])assert.equal((x+a)*(x+b),x*x-2*x-15);
});
test('Geometrimodellerna och den förkastade vinkelroten är korrekta',()=>{
 const x=8,A=x+20,B=2*x+10,E=x*x-10,C=180-E;assert.equal(A+B,E);assert.equal(A+B+C,180);assert.ok(C>90);assert.equal(2*(-5)+10,0);
 const[a,b]=get('3.187').rättSvar;assert.equal(b-a,7);assert.equal(a*a+b*b,17**2);assert.ok(a>0&&b>0);
 for(const t of get('3.493').rättSvar)assert.equal((t-3)**2+(2*t-1)**2,25);
 const bridge=Number(get('3.510').rättSvar),part=(bridge-4)/2;assert.ok(part>0);assert.equal(part*(part+4),3*7);assert.equal(get('3.510').svarEnhet,'m');
});
test('Sex metodjämförelser behåller lämplig faktorform eller kvadratkomplettering',()=>{
 for(const id of ['2.40','2.85','2.147','2.159','2.321','6.16'])assert.doesNotMatch(get(id).s,/Pq-formeln/);
 const f=x=>(x+3)*(x-5);assert.equal(f(1),-16);assert.equal(f(8),Number(get('2.40').rättSvar[1]));
 const g=x=>(x+2)*(x-8);assert.equal(g(0),-16);assert.equal(g(3),get('2.85').rättSvar);
 const h=x=>-.5*(x+2)*(x-4);assert.equal(h(0),4);assert.equal(h(1),4.5);assert.deepEqual(get('2.147').rättSvar,['1','4,5']);
 for(const x of [3,4])assert.equal(x*x-7*x+12,0);
 assert.deepEqual(get('2.321').rättSvar,['x=5',9]);for(const x of [-4,0,5,8])assert.equal(-x*x+10*x-16,-((x-5)**2)+9);
 const j=x=>2*(x-2)*(x-8);assert.equal(j(0),32);assert.equal(j(5),get('6.16').rättSvar);
});
