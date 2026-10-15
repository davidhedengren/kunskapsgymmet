'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const h=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8'),c=vm.createContext({window:{},COURSES:{mato2:{subject:'Matematik'}},state:{course:'mato2'}});
vm.runInContext(h.slice(h.indexOf('const MATTEFUNKTIONER='),h.indexOf('function explicitMultiplikation(')),c);
for(const f of ['latexToPlain','normalizeDecimalComma','normalizeMathInput','explicitMultiplikation','tillNerdamer','stadaSvar','hogerled','polartSvarVarde','polartSvarRatt','numerisktSvar','sifferlage']){
 const i=h.indexOf('function '+f+'(');assert.ok(i>=0,f);vm.runInContext(h.slice(i,h.indexOf('\n}',i)+2),c);
}
test('Negativt argument har rätt imaginärdel i Euler-, trigonometrisk och gradnotation',()=>{
 for(const s of ['2e^(-i*pi/6)','2(cos(-pi/6)+i sin(-pi/6))','2(cos(330°)+i sin(330°))','2exp(-iπ/6)','2(cos(330^\\circ)+i sin(330^\\circ))']){
  const v=c.polartSvarVarde(s);assert.ok(v,s);assert.ok(Math.abs(v.re-Math.sqrt(3))<1e-12,s);assert.ok(Math.abs(v.im+1)<1e-12,s);
  assert.equal(c.polartSvarRatt(s,'2e^(-i*pi/6)'),true,s);
 }
 for(const s of ['2e^(i*pi/6)','2(cos(pi/6)+i sin(pi/6))','2(cos(30°)+i sin(30°))'])assert.equal(c.polartSvarRatt(s,'2e^(-i*pi/6)'),false,s);
});
test('Begärt argumentintervall skiljs från ekvivalenta vinklar utan intervallkrav',()=>{
 assert.equal(c.polartSvarRatt('3e^(-i*pi/2)','3e^(i*3*pi/2)'),true);
 assert.equal(c.polartSvarRatt('3e^(-i*pi/2)','3e^(i*3*pi/2)',true),false);
 assert.equal(c.polartSvarRatt('3e^(i*3*pi/2)','3e^(i*3*pi/2)',true),true);
 assert.equal(c.polartSvarRatt('2e^(2i*pi)','2',true),false);
 assert.equal(c.polartSvarRatt('2e^(0i)','2',true),true);
});
test('Reella slutresultat får förenklas men rektangulärt komplext svar ersätter inte polär form',()=>{
 assert.equal(c.polartSvarRatt('10','10*(cos(0)+i*sin(0))'),true);
 assert.equal(c.polartSvarRatt('-8','8e^(i*pi)'),true);
 assert.equal(c.polartSvarRatt('10*(cos(2*pi)+i*sin(2*pi))','10'),true);
 assert.equal(c.polartSvarRatt('sqrt(3)-i','2e^(-i*pi/6)'),false);
 assert.equal(c.polartSvarRatt('-2*(cos(5*pi/6)+i*sin(5*pi/6))','2e^(-i*pi/6)'),false);
});
test('Parsern konsumerar hela svaret och avvisar kod, okända variabler och ogiltig aritmetik',()=>{
 for(const s of ['alert(1)','2e^(i*x)','2e^(i*pi/6))','2/0','sqrt(-1)+','2e^(i*pi/6);1','2cos(pi/6)+i sin(pi/3)','process.exit()'])
  assert.equal(c.polartSvarRatt(s,'2e^(i*pi/6)'),false,s);
});
test('Symboliskt svarsformat får texttangentbord även när facit råkar vara reellt',()=>{
 assert.equal(c.sifferlage(10,null,'polar'),false);assert.equal(c.sifferlage(10,null,'uttryck'),false);
 assert.equal(c.sifferlage(10,null,'numeriskt'),true);assert.equal(c.sifferlage(10,null),true);
});
test('Alla 23 polära facit stämmer mot oberoende beräknade real- och imaginärdelar',()=>{
 const bankContext={window:{}};vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../uppgiftermato2.js'),'utf8'),bankContext);
 const bank=Object.values(bankContext.window).find(Array.isArray),a=1.5*(Math.sqrt(6)-Math.sqrt(2)),b=1.5*(Math.sqrt(6)+Math.sqrt(2));
 const answers={
  '4.09':[[a,b],[0,4],[10,0],[-2,0]],'4.117':[[0,8],[Math.sqrt(3),-1],[-8,0]],
  '4.12':[[2,2],[0,-3],[-1,-Math.sqrt(3)]],'4.24':[[1,1],[-1,1],[0,-2]],
  '4.48':[[1,1],[-1,1],[-Math.sqrt(3),-1],[0,2]],'4.61':[[a,b],[0,4],[0,10]],
  '4.64':[[Math.sqrt(3),1],[-1,-1],[0,3]]
 };
 for(const [id,expected] of Object.entries(answers)){
  const q=bank.find(t=>t.id===id);assert.equal(q.rättSvar.length,expected.length,id);
  q.rättSvar.forEach((s,i)=>{const v=c.polartSvarVarde(s);assert.ok(v,id+' '+i);assert.ok(Math.abs(v.re-expected[i][0])<1e-10,id+' real '+i);assert.ok(Math.abs(v.im-expected[i][1])<1e-10,id+' imag '+i);});
 }
});
