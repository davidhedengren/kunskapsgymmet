const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgiftermato1.js'),'utf8'),c);
const bank=JSON.parse(JSON.stringify(c.window.BANKMATO1)),q=n=>bank.find(x=>x.id==='2.'+n),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} ≠ ${b}`);
test('20 nya C-kort, mängdträning bevarad och nivåer bedömda individuellt',()=>{
 for(let n=1221;n<=1240;n++){const t=q(n);assert.equal(t.omr,'derivata_potens');assert.equal(t.traningsniva,3);assert.equal(t.niva,'C');assert.deepEqual(t.kurs,['1b','1c']);assert.equal(t.spel,true);assert.equal(t.självrättning,true);assert.match(t.s,/facit-svar/);}
 assert.equal(q(217).traningsniva,2);assert.equal(q(212).traningsniva,3);assert.equal(q(250).traningsniva,3);
 assert.equal(bank.filter(q=>q.omr==='derivata_potens'&&q.traningsniva===3&&q.spel!==false).length,22);
});
test('Parameteruppgifterna uppfyller både funktions- och lutningsvillkor',()=>{
 let [a,n]=q(1221).rättSvar;near(a,6);near(a*n,9);
 n=q(1222).rättSvar;near(n*8**(n-1),16*n*2**(n-1));
 let [u,v]=q(1223).rättSvar;near(u+v,6);near(u/2-v,0);
 near(2*2-q(1224).rättSvar/4,0);
 const x=q(1225).rättSvar;near(1.5*Math.sqrt(x)-6/Math.sqrt(x),0);
 const k=q(1228).rättSvar;near(k/4,-3*2+9);near(-2*k/8,-3);
 n=q(1229).rättSvar;near(n*(n-1),20);assert.ok(n>=2);
 [a,n]=q(1235).rättSvar;near(-2*a-n,-7);near(-2*a/8-n/4,-1.25);
 near(2*Math.sqrt(q(1238).rättSvar),4);
});
test('Geometri, förändringshastighet och relativa ändringar är oberoende kontrollerade',()=>{
 const a=q(1227).rättSvar;near(Math.sqrt(a)/(a+9),1/(2*Math.sqrt(a)));
 assert.equal(q(1230).rättSvar,(1/(2*Math.sqrt(4)))/(1/(2*4**1.5)));
 const t=80/(20-10);near(q(1231).rättSvar,80/t**2);
 near(1/(2*Math.sqrt(q(1232).rättSvar)),(Math.sqrt(9)-Math.sqrt(1))/8);
 near(q(1233).rättSvar,(-(-1.5*120000*100**-2.5)*5)/(120000*100**-1.5)*100);
 near(q(1236).rättSvar,1-4);for(const x of [.01,.3,1,2,10])assert.ok(x*x-4*Math.sqrt(x)>=q(1236).rättSvar-1e-10);
 assert.equal(q(1239).svarsstruktur,'mängd');assert.deepEqual(q(1239).rättSvar,[-1,1]);for(const x of q(1239).rättSvar)near(3*x*x,3/x**2);
 for(const a of [.2,1,7]){const slope=-1/a**2,yIntercept=1/a-slope*a,xIntercept=-yIntercept/slope;near(q(1240).rättSvar,xIntercept*yIntercept/2);}
});
test('Grafiska slutsatser gäller på hela definitionsmängden',()=>{
 assert.deepEqual(q(1226).alternativ.map(x=>x.ratt),[false,false,true,false]);
 assert.deepEqual(q(1234).alternativ.map(x=>x.ratt),[false,false,false,true]);
 assert.deepEqual(q(1237).alternativ.map(x=>x.ratt),[false,false,true,false]);
 for(const x of [.01,.2,1,4,100]){assert.ok(2.5*x**1.5+2*x**-.5>0);assert.ok(5/x**2>0);assert.ok(.5*x**-.5+1.5*x**-2.5>0);assert.ok(-.25*x**-1.5-3.75*x**-3.5<0);}
});
