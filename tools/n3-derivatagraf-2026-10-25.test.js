const {test}=require('node:test'),a=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../uppgiftermato1.js','utf8'),c);const bank=JSON.parse(JSON.stringify(c.window.BANKMATO1)),q=n=>bank.find(q=>q.id==='3.'+n);
test('Tretton självständiga kort med fullständiga lösningar och rätt område',()=>{for(let n=1233;n<=1245;n++){const t=q(n);a.equal(t.omr,'derivatan_och_grafen');a.equal(t.traningsniva,3);a.deepEqual(t.kurs,['1b','1c']);a.ok(t.spel&&t.självrättning);a.match(t.s,/facit-rubrik/);a.match(t.s,/facit-svar/);a.ok(t.s.length>400);a.equal(t.geogebra,false);}});
test('Transformeringar och teckenbyten har rätt extrempunkter',()=>{
 const d=x=>x<=4?x-2:10-2*x;let x=q(1233).rättSvar;a.equal(d(x)-1,0);a.ok(d(x-.01)>1&&d(x+.01)<1);
 x=q(1234).rättSvar;const g=t=>-2*(t-1)*(t-3);a.ok(g(x-.01)>0&&g(x+.01)<0);
 a.deepEqual(q(1236).rättSvar,[1,4]);a.equal(q(1237).rättSvar,3);a.equal(2*q(1239).rättSvar,2);
 a.deepEqual(q(1240).rättSvar,[1,5]);a.equal((7+1)/(5-1),2);
});
test('Grafiska slutledningar, nettförändring, tangent och vinst',()=>{
 a.equal(q(1241).rättSvar,2);a.equal(q(1243).rättSvar,2*3/2-2*1/2);
 a.equal(q(1244).rättSvar,'3*x-2');a.equal(3*2-2,4);a.equal(2+.5*q(1245).rättSvar,5);
 a.equal(q(1235).alternativ.findIndex(x=>x.ratt),2);a.equal(q(1238).alternativ.findIndex(x=>x.ratt),2);a.equal(q(1242).alternativ.findIndex(x=>x.ratt),1);
});
