const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.join(__dirname,'..'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'uppgiftermato1.js'),'utf8'),ctx);
const bank=JSON.parse(JSON.stringify(ctx.window.BANKMATO1)),q=n=>bank.find(t=>t.id==='2.'+n),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} ≠ ${b}`);
test('20 självständiga C-uppgifter når båda spåren utan ID-kollisioner',()=>{
 assert.equal(new Set(bank.map(t=>t.id)).size,bank.length);
 for(let n=1201;n<=1220;n++){const t=q(n);assert.ok(t);assert.equal(t.traningsniva,3);assert.equal(t.niva,'C');assert.equal(t.omr,'naturliga_logaritmer');assert.deepEqual(t.kurs,['1b','1c']);assert.equal(t.spel,true);assert.equal(t.självrättning,true);assert.equal(t.geogebra,false);assert.match(t.s,/facit-svar/);assert.ok(!t.spelDelar);}
 assert.ok(bank.filter(t=>t.omr==='naturliga_logaritmer'&&t.traningsniva===3&&t.spel!==false).length>=20);
});
test('Logaritmekvationer behåller definitionsvillkor och samtliga rötter',()=>{
 const x=q(1201).rättSvar;assert.ok(x>1);near(Math.log(x-1)+Math.log(x+1),Math.log(8));
 const y=q(1204).rättSvar;assert.ok(y>0);near(Math.log(y+2),2*Math.log(y));
 assert.equal(q(1217).svarsstruktur,'mängd');assert.deepEqual(q(1217).rättSvar,['1','e^3']);for(const z of [1,Math.exp(3)])near(Math.log(z)**2-3*Math.log(z),0);
 const count=Array.from({length:9},(_,i)=>i).filter(x=>x>1&&x<7&&Math.log(x-1)+Math.log(7-x)>Math.log(8)+1e-12).length;assert.equal(q(1216).rättSvar,count);assert.equal(count,1);
 const z=q(1220).rättSvar;assert.ok(z>2);near(Math.log(z)-Math.log(z-2),Math.log(z+6)-Math.log(z));
});
test('Geometriska, sammansatta och parameterbaserade samband stämmer',()=>{
 near(Math.log(q(1203).rättSvar)-Math.log(4),Math.log(25)-Math.log(q(1203).rättSvar));
 assert.equal(q(1202).rättSvar,'e^3');near(Math.exp(1.5)**2,Math.exp(3));
 assert.equal(q(1205).rättSvar,3*Math.log(Math.exp(-1))+4);
 for(const a of [-2,0,3.5])near(q(1206).rättSvar,Math.log(Math.exp(2*a)/Math.exp(a-1)**2));
 const f=x=>Math.log(3*x-2);near(f(f((Math.E+2)/3)),0);assert.equal(q(1208).rättSvar,'(e+2)/3');
 near(Math.log((1+4)/2)-Math.log(4)/2,Math.log(5/4));assert.equal(q(1209).rättSvar,'ln(5/4)');
 const a=2/Math.log(3),b=1-a*Math.log(2);near(a*Math.log(q(1210).rättSvar)+b,9);
 const [u,v]=q(1214).rättSvar;near(Math.log(u)+Math.log(v),Math.log(12));near(Math.log(u)-Math.log(v),Math.log(3));
 near(Math.log(2+Math.exp(-4)-2)+4,0);assert.equal(q(1218).rättSvar,'2+e^(-4)');
 const perc=q(1219).rättSvar;near(Math.log((1+perc/100)*(1-perc/100)),Math.log(3/4));
});
test('Modellernas svar uppfyller givna villkor innan avrundning',()=>{
 const k=-Math.log((50-20)/60)/4,t=q(1211).rättSvar;near(20+60*Math.exp(-k*t),25);assert.equal(t.toFixed(2),'14.34');
 const t2=q(1212).rättSvar;near(100*Math.exp(.3*t2),400*Math.exp(.1*t2));assert.equal(t2.toFixed(2),'6.93');
 const value=q(1213).rättSvar;near((Math.log(value)-Math.log(10))/(Math.log(1000)-Math.log(10)),.75);assert.equal(value.toFixed(1),'316.2');
});
test('Flervalsresonemang skiljer verkliga definitionsmängder och korrekt logaritmlag',()=>{
 assert.deepEqual(q(1207).alternativ.map(a=>a.ratt),[false,false,true,false]);
 for(const x of [-10,-1,1])near(Math.log((x-2)**2),2*Math.log(2-x));
 assert.deepEqual(q(1215).alternativ.map(a=>a.ratt),[false,true,false,false]);
 for(const n of [1207,1215])assert.equal(q(n).miniräknare,false);
});
