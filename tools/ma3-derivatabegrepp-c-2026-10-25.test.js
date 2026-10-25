const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgiftermato1.js'),'utf8'),c);
const bank=JSON.parse(JSON.stringify(c.window.BANKMATO1)),q=n=>bank.find(x=>x.id==='2.'+n),near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} ≠ ${b}`);
test('18 nya C-kort ger 20 i derivatabegreppet, utan ändrade äldre nivåer',()=>{
 for(let n=1241;n<=1258;n++){const t=q(n);assert.equal(t.omr,'begreppet_derivata');assert.equal(t.traningsniva,3);assert.equal(t.niva,'C');assert.deepEqual(t.kurs,['1b','1c']);assert.equal(t.spel,true);assert.equal(t.självrättning,true);assert.equal(t.geogebra,false);}
 assert.ok(bank.filter(q=>q.omr==='begreppet_derivata'&&q.traningsniva===3&&q.spel!==false).length>=20);
 for(const n of [1241,1242,1247,1254])assert.equal(q(n).tolerans,.005);
 for(const n of [1256,1257])assert.equal(q(n).tolerans,.05);
});
test('Enheter, lokala approximationer och procent beräknas oberoende',()=>{
 near(q(1241).rättSvar,-((2-3.2)/(3-1))*(10/60)/2.6*100);
 near(q(1242).rättSvar,((1.514-1.486)/(5.1-4.9))/1.5*100);
 near(q(1246).rättSvar,(120-85)*(103-100));
 near(q(1247).rättSvar,(12+3.6*(2.1-2))*1000/210);
 near(q(1252).rättSvar,((9-5)/(12-8))*1000);
 near(q(1256).rättSvar,((18-6)/(250-50))*90*(20/60));
 near(q(1257).rättSvar,1.8*(40-2*(45/60))+32);
});
test('Derivata, medelhastighet, parametrar och relativ rörelse skiljs åt',()=>{
 assert.equal(q(1243).rättSvar,'sqrt(7)');near(3*Math.sqrt(7)**2,(4**3-1**3)/(4-1));
 assert.equal(q(1244).rättSvar,-1);const f=x=>1.5*x*x-x+3;near(f(0),3);near(f(2),7);near(3*2-1,5);
 assert.deepEqual(q(1245).rättSvar,[50+(5-4)*10,50+(5-2)*10]);
 near(2*4**2,8*4);near(q(1250).rättSvar,4*4-8);
 const K=x=>.2*x*x+30*x+500;near(q(1251).rättSvar,(K(60)-K(50))-(.4*50+30)*(60-50));
 const [a,b]=q(1253).rättSvar;near(a+b,1);near(a,2);
 const t=q(1254).rättSvar;near(10*Math.exp(.02*t),8*Math.exp(.04*t));assert.ok(t>0);
});
test('Begreppsalternativ och grafiska jämförelser är matematiskt riktiga',()=>{
 assert.deepEqual(q(1248).alternativ.map(x=>x.ratt),[false,true,false,false]);
 const f=x=>Math.abs(x-2)+3;for(const h of [.1,.01,.001]){near((f(2+h)-f(2-h))/(2*h),0);near((f(2+h)-f(2))/h,1);near((f(2-h)-f(2))/(-h),-1);}
 assert.deepEqual(q(1249).alternativ.map(x=>x.ratt),[false,false,true,false]);
 const T=t=>20+20*Math.exp(-.3*t),slope=-6*Math.exp(-.9),estimate=3+(25-T(3))/slope,actual=Math.log(4)/.3;assert.ok(estimate<actual);assert.ok(T(estimate)>25);
 assert.deepEqual(q(1255).alternativ.map(x=>x.ratt),[false,false,false,true]);
 // En konstant och en asymmetrisk kurva visar varför mittpunkten inte måste vara stationär.
 const asymmetric=x=>3+x*(4-x)*(x+1),d=x=>-3*x*x+6*x+4;near(asymmetric(0),asymmetric(4));assert.notEqual(d(2),0);assert.ok(d(0)>0&&d(4)<0);
 assert.equal(q(1258).alternativ.filter(x=>x.ratt).length,1);assert.match(q(1258).alternativ.find(x=>x.ratt).txt,/inget extremställe/);for(const x of [0,.5,1.5,2])assert.ok(3*(x-1)**2>0);
});
test('Tangentfigurers faktiska koordinater följer de angivna funktionerna',()=>{
 for(const [n,xmax,ymin,ymax,fun,slope] of [
  [1241,4,0,5,x=>.15*(x-2)**2-.6*(x-2)+2.6,-.6],
  [1249,6,20,40,x=>20+20*Math.exp(-.3*x),-6*Math.exp(-.9)],
  [1250,5,0,50,x=>2*x*x,8],
  [1252,16,0,14,x=>.015*(x-10)**2+(x-10)+7,1],
  [1256,300,0,24,x=>12+.06*(x-150)+.00002*(x-150)**2,.06],
  [1258,2,0,4,x=>(x-1)**3+2,0]]){
  const lines=[...q(n).t.matchAll(/<polyline points="([^"]+)"/g)].map(m=>m[1].split(' ').map(s=>s.split(',').map(Number)));
  const undo=([X,Y])=>[(X-65)/370*xmax,(250-Y)/200*(ymax-ymin)+ymin];
  for(const point of lines[0].filter((_,i)=>i%20===0)){const [x,y]=undo(point);near(y,fun(x),.002);}
  const [a,b]=lines[1].map(undo);near((b[1]-a[1])/(b[0]-a[0]),slope,.0001);
 }
});
