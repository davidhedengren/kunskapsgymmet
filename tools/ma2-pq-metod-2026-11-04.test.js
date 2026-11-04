const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);
const bank=JSON.parse(JSON.stringify(c.window.BANKMA2)),get=id=>bank.find(q=>q.id===id);
const ids=require('./ma2-pq-metod-2026-11-04.changes.json').map(q=>q.id);
const polys={
 '2.09':[-5,-14,[-2,7]],'2.73':[-17,60,[5,12]],'2.102':[10,-24,[-12,2]],
 '2.138':[1,-72,[-9,8]],'2.152':[3,-40,[-8,5]],'2.288':[1,-132,[-12,11]],'2.291':[-17,60,[5,12]],'2.502':[-13,30,[3,10]],
 '3.09':[2,-24,[-6,4]],'3.49':[5,-36,[-9,4]],'3.59':[3,-40,[-8,5]],'3.133':[5,-36,[-9,4]],'3.143':[-17,60,[5,12]],'3.168':[1,-30,[-6,5]],'3.179':[5,-84,[-12,7]],'3.204':[5,-84,[-12,7]],'3.2026':[5,-176,[-16,11]],
 '5.44':[3,-54,[-9,6]],'2.788':[-5,6,[2,3]],'2.790':[3,-40,[-8,5]],'2.791':[-4,3,[1,3]],'6.13':[-1,-6,[-2,3]],'6.19':[-21,38,[2,19]],'1.1210':[-1,-2,[-1,2]],'1.1212':[-10,21,[3,7]]
};
test('26 huvudfacit och tre delkort visar pq med egna steg och svarsrad',()=>{
 assert.equal(ids.length,26);let cards=0;
 for(const id of ids){const q=get(id);assert.ok(q,id);for(const d of [q,...q.spelDelar||[]]){
  for(const pattern of [/facit-steglista/,/facit-rubrik/,/facit-svar/,/Pq-formeln/,/Sätt in p och q/])assert.match(d.s,pattern,id);
  assert.doesNotMatch(d.s,/Faktorisera|faktorisering|nollprodukt/i,id);
  assert.doesNotMatch(d.ledtrad||'',/faktoriser/i,id);cards++;
 }assert.equal(q.miniräknare,true,id);assert.equal(q.geogebra,false,id);}
 assert.equal(cards,29);
 assert.match(get('2.121').spelIntro,/pq-formeln/);
 for(const d of get('2.121').spelDelar)assert.equal(d.traningsniva,2);
 for(const id of ['2.09','2.121'])assert.equal(get(id).omr,'losningsformel_andragrad');
 for(const id of ['2.138','2.152'])assert.equal(get(id).omr,'andragradsekvationer_tillampningar');
});
test('Båda rötterna verifieras genom insättning i de granskade polynomen',()=>{
 for(const [id,[p,q,roots]]of Object.entries(polys)){
  for(const x of roots)assert.equal(x*x+p*x+q,0,id);
  assert.equal(roots[0]+roots[1],-p,id);assert.equal(roots[0]*roots[1],q,id);
  assert.match(get(id).s,new RegExp('p='+p+'\\\\\\)'),id);
 }
 for(const [d,p,q]of [[0,-11,24],[1,8,15],[2,-3,-18]]){
  for(const x of get('2.121').rättSvar[d].map(Number))assert.equal(x*x+p*x+q,0);
 }
});
test('Modellerna och deras tillåtna rötter stämmer med rättningsnycklarna',()=>{
 const n=id=>Number(get(id).rättSvar),arr=id=>get(id).rättSvar.map(Number);
 assert.deepEqual(arr('2.73'),[5,12]);assert.equal(2*arr('2.73').reduce((a,b)=>a+b),34);assert.equal(arr('2.73').reduce((a,b)=>a*b),60);
 let x=n('2.102');assert.ok(x>0);assert.equal((12+2*x)*(8+2*x),192);
 assert.deepEqual(get('2.138').rättSvar.map(a=>a.map(Number)),[[8,9],[-9,-8]]);
 for(const id of ['2.152','2.288','2.291','2.502','5.44','1.1212']){
  const [a,b]=arr(id);assert.ok(a>0&&b>0,id);
  const sum={'2.152':13,'2.288':23,'2.291':17,'2.502':13,'5.44':15,'1.1212':10}[id];
  const product={'2.152':40,'2.288':132,'2.291':60,'2.502':30,'5.44':54,'1.1212':21}[id];
  assert.equal(a+b,sum,id);assert.equal(a*b,product,id);
 }
 for(const [id,a,product]of [['3.09',2,24],['3.49',5,36],['3.59',3,40],['3.133',5,36],['3.179',5,84],['3.204',5,84],['3.2026',5,176]]){x=n(id);assert.ok(x>0);assert.equal(x*(x+a),product,id);}
 x=n('3.168');assert.ok(x>1);assert.equal((x-1)*(x+2),28);
 assert.deepEqual(arr('3.143'),[5,12]);assert.equal(Math.hypot(...arr('3.143')),13);
 for(const x of arr('2.788'))assert.equal((x-1)**2-5*(x-1)+6,0);
 x=n('2.790');assert.equal(x*(x+3),40);assert.ok(x>0);
 for(const t of arr('2.791'))assert.equal(-5*t*t+20*t+1,16);
 x=n('6.13');assert.equal(Math.sqrt(x+6),x);assert.notEqual(Math.sqrt(-2+6),-2);
 x=n('6.19');assert.ok(x>0&&x<9);assert.equal((24-2*x)*(18-2*x),280);
 for(const x of arr('1.1210'))assert.equal(x*x,x+2);
});
test('Naturlig utbrytning, konjugatregeln och redan given produktform bevaras',()=>{
 for(const id of ['2.123','2.125','1.1042','1.1122','2.1142','2.1162'])assert.match(get(id).t+get(id).s,/faktor|produkt|konjugat/i,id);
 assert.match(get('2.501').s,/pq-formeln/i);assert.match(get('2.1076').s,/sqrt/);assert.deepEqual(get('2.1075').rättSvar,[-9,9]);
});
