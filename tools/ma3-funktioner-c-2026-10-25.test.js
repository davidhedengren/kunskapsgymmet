const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgiftermato1.js'),'utf8'),c);
const bank=JSON.parse(JSON.stringify(c.window.BANKMATO1)),q=n=>bank.find(x=>x.id==='1.'+n),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} ≠ ${b}`),value=(s,x=0)=>Function('x','return '+String(s).replace(/\^/g,'**').replace(/\bsqrt\(/g,'Math.sqrt('))(x);
test('16 nya och tre återanvända C-uppgifter ger 20 spelbara kort efter nivåkalibrering',()=>{
 for(const n of [183,233,274,...Array.from({length:16},(_,i)=>949+i)]){let t=q(n);assert.equal(t.traningsniva,3);assert.equal(t.omr,'funktioner');assert.equal(t.spel,true);assert.equal(t.självrättning,true);assert.equal(t.geogebra,false);assert.deepEqual(t.kurs,['1b','1c']);}
 assert.equal(q(430).traningsniva,2);assert.equal(q(430).rättSvar,3000);
 assert.equal(bank.filter(q=>q.omr==='funktioner'&&q.traningsniva===3&&q.spel!==false).length,20);
 for(const n of [274,949,963])assert.equal(q(n).svarsstruktur,'mängd');
 for(const n of [183,233,950,953,956,957])assert.equal(q(n).svarsstruktur,'ordnad');
});
test('Tidigare uppgifters exakta svar och nya svarsfält stämmer',()=>{
 const [x1,y1,x2,y2]=q(183).rättSvar.map(x=>value(x));assert.ok(x1<x2);for(const [x,y] of [[x1,y1],[x2,y2]]){near(x*x-4*x+5,y);near(2*x-1,y);}
 const [a,b]=q(233).rättSvar.map(x=>value(x));near(a+b,5);near(9*a+b,17);
 for(const a of q(274).rättSvar)near(a*a-16,0);
});
test('Sammansatta funktioner, modellvillkor och parametrar kontrolleras oberoende',()=>{
 const f=new Map([[-2,-1],[-1,0],[0,2],[1,0],[2,1]]);assert.deepEqual([...f.keys()].filter(x=>f.get(f.get(x))===0),q(949).rättSvar);
 assert.deepEqual(q(950).rättSvar,[-1,3,-1,8]);assert.deepEqual(q(953).rättSvar,[3-2*5,3-2*(-2)]);
 assert.equal(q(952).rättSvar,0);for(const x of [-2,0,3])near((2*(5-x)-3)-(5-(2*x-3)),-1);
 const [lo,hi]=q(956).rättSvar;near(lo*(20-lo),96);near(hi*(20-hi),96);assert.ok(10*(20-10)>96);assert.ok(7*(20-7)<96);
 const [a,b]=q(957).rättSvar,F=x=>x**3+a*x*x+b*x+4;for(const x of [-3,0,2])near(F(x)+F(-x),8);near(F(1),7);
 for(const x of [-2,0,1,3])near(value(q(958).rättSvar,2*x+1),x*x-2*x+4);
 for(const x of [-3,0,4])near(value(q(959).rättSvar,value(q(959).rättSvar,x)),4*x+3);assert.ok(value(q(959).rättSvar,0)<0);
});
test('Falska rötter, definitionsmängder och likvärdiga modeller skiljs åt',()=>{
 for(const [n,idx] of [[951,0],[954,1],[955,2],[961,3],[962,0]])assert.equal(q(n).alternativ.findIndex(x=>x.ratt),idx);
 for(const x of [0,1,2,3])near(x*(x-1)*(x-2)*(x-3),0);assert.notEqual(4*3*2*1,0);
 assert.ok((45-20)/10>2);assert.ok(2+(45-50)/6<2);
 for(const x of [-1.9,0,3.9])assert.ok(9-(x-1)**2>0);for(const x of [-2,4])near(9-(x-1)**2,0);
 for(const x of [-2,-1,0,1,2])near(Math.abs(x-2)+Math.abs(x+2),4);for(const x of [-3,3])assert.ok(Math.abs(x-2)+Math.abs(x+2)>4);
 for(const k of q(963).rättSvar)near((4-k)**2-16,0);
 const root=value(q(964).rättSvar);near(Math.sqrt(root+1),2-root);assert.ok(root<=2);assert.ok((5+Math.sqrt(13))/2>2);
});
test('Grafens skärningsantal använder ändpunkter en gång och rätt domän',()=>{
 assert.equal(q(960).rättSvar,1);
 const points=[[-2,1],[0,3],[2,-1],[4,1]];
 const intersections=k=>{const xs=[];for(let i=0;i<3;i++){const[a,b]=[points[i],points[i+1]];if(k>=Math.min(a[1],b[1])&&k<=Math.max(a[1],b[1]))xs.push(a[0]+(k-a[1])*(b[0]-a[0])/(b[1]-a[1]));}return new Set(xs.map(x=>x.toFixed(8))).size;};
 assert.equal(intersections(1),3);for(const k of [1.01,2,2.99,3,4])assert.ok(intersections(k)<3);
});
