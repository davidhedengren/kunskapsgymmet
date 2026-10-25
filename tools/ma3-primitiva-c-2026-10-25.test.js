const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgiftermato1.js'),'utf8'),c);
const bank=JSON.parse(JSON.stringify(c.window.BANKMATO1)),q=n=>bank.find(x=>x.id==='3.'+n),near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} ≠ ${b}`);
const value=(expression,x,C=0)=>Function('x','C','return '+expression.replace(/\^/g,'**').replace(/\bsqrt\(/g,'Math.sqrt(').replace(/\be\b/g,'Math.E'))(x,C);
test('18 nya C-kort ger 20 spelbara nivå 3-uppgifter i primitiva funktioner',()=>{
 for(let n=1215;n<=1232;n++){let t=q(n);assert.equal(t.omr,'primitiva');assert.equal(t.traningsniva,3);assert.equal(t.niva,'C');assert.deepEqual(t.kurs,['1b','1c']);assert.equal(t.spel,true);assert.equal(t.självrättning,true);assert.equal(t.geogebra,false);assert.match(t.s,/facit-svar/);}
 assert.equal(bank.filter(q=>q.omr==='primitiva'&&q.traningsniva===3&&q.spel!==false).length,20);
 for(const n of [1217,1218,1220,1221,1229])assert.equal(q(n).svarFormat,'primitiva');
 assert.equal(q(236).svarFormat,'primitiv');assert.equal(q(284).svarFormat,'primitiva');
});
test('Alla fem algebraiska integrationssvar ger ursprunglig funktion efter derivering',()=>{
 const originals={1217:x=>(x*x-1)**2/(x*x),1218:x=>(x+1)**2/Math.sqrt(x),1220:x=>(Math.exp(x)-2)**2,1221:x=>(2*x*x-3)*(x*x+1)/(x*x),1229:x=>(Math.sqrt(x)-1/Math.sqrt(x))*(x+2)};
 for(const [n,f] of Object.entries(originals))for(const x of [.4,.8,1.3,2.7])for(const C of [-7,0,11]){
  const F=u=>value(q(n).rättSvar,u,C),h=1e-5;
  near((F(x+h)-F(x-h))/(2*h),f(x),1e-5);
  near(F(x)-value(q(n).rättSvar,x,0),C);
 }
});
test('Parametrar, konstanta skillnader och skalning uppfyller ursprungsvillkoren',()=>{
 let [a,b]=q(1215).rättSvar;for(const x of [-2,0,1,3])near(3*(x-1)**2+2*a*x+b,3*x*x+2);
 near(q(1216).rättSvar,(3*9-4*3+2)-(3*9-4*3+6));
 [a,b]=q(1219).rättSvar;for(const x of [.2,1,4])near(1.5*a*Math.sqrt(x)-b/x**2,3*Math.sqrt(x)-2/x**2);
 [a,b]=q(1222).rättSvar;for(const x of [-2,0,3])near((x+a)**2+b,x*x+2*x);
 near(value(q(1223).rättSvar,0),((2/3)*9**1.5-(2/3)*1**1.5)/8);
 near(q(1224).rättSvar,48);near(q(1227).rättSvar,3**2-1);
 const k=q(1230).rättSvar;for(const x of [-3,-1,.5,2])near(k*(2*x)**3/3-k*x**3/3,7*x**3);
});
test('Begreppsalternativ och extrema värden är korrekta',()=>{
 assert.deepEqual(q(1225).alternativ.map(x=>x.ratt),[false,true,false,false]);
 assert.deepEqual(q(1226).alternativ.map(x=>x.ratt),[false,false,false,true]);
 assert.deepEqual(q(1228).alternativ.map(x=>x.ratt),[false,false,true,false]);
 for(const C of [-100,0,30]){const K=C-1/3;for(const x of [-3,0,4])near((x-1)**3/3+C,x**3/3-x*x+x+K);}
 near(value(q(1231).rättSvar,0),(-1/3+1)-(1/3-1));
 const F=x=>x**4-6*x*x;near(q(1232).rättSvar,F(0)-F(Math.sqrt(3)));
 for(const x of [-10,-3,-1,0,1,3,10]){near(F(x),(x*x-3)**2-9);assert.ok(F(x)>=-9);}
});
