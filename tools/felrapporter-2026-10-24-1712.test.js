const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
function bank(name){const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter'+name+'.js'),'utf8'),c);return c.window['BANK'+name.toUpperCase()];}
const ma4=bank('mato2'),q=id=>ma4.find(q=>q.id===id);
function integral(f,a,b){const n=2000,h=(b-a)/n;let sum=f(a)+f(b);for(let i=1;i<n;i++)sum+=(i%2?4:2)*f(a+i*h);return sum*h/3;}
test('Grafen i 3.91 följer funktionerna och skuggningen slutar vid första skärningen',()=>{
 const paths=[...q('3.91').t.matchAll(/<path d="([^"]+)"[^>]*>/g)];assert.equal(paths.length,3);
 const coords=p=>[...p[1].matchAll(/([\d.]+),([\d.]+)/g)].map(m=>m.slice(1).map(Number));
 const cos=coords(paths[1]),sin=coords(paths[2]);assert.equal(cos.length,121);assert.equal(sin.length,121);
 for(let i=0;i<=120;i++){const x=i/120*Math.PI/2;assert.ok(Math.abs((255-cos[i][1])*1.15/205-Math.cos(x))<1e-5);assert.ok(Math.abs((255-sin[i][1])*1.15/205-Math.sin(x))<1e-5);}
 assert.deepEqual(cos[60],sin[60]);assert.equal(Math.max(...coords(paths[0]).map(p=>p[0])),257.5);
 assert.ok(Math.abs(integral(x=>Math.cos(x)-Math.sin(x),0,Math.PI/4)-(Math.SQRT2-1))<1e-10);
});
test('Fem tidigare dubbletter har olika matematiska idéer och självständigt beräknade svar',()=>{
 assert.equal(q('3.57').rättSvar,4);assert.ok(Math.abs(integral(x=>Math.abs(Math.sin(x)),0,2*Math.PI)-4)<1e-9);
 assert.equal(q('3.63').rättSvar[2],1);assert.ok(Math.abs(integral(x=>1-Math.abs(x-1),0,2)-1)<1e-12);
 assert.equal(q('3.177').rättSvar,2);assert.ok(Math.abs(integral(x=>q('3.177').rättSvar-x*x,-1,1)-10/3)<1e-12);
 assert.equal(q('3.157').rättSvar,'1-ln(2)');assert.ok(Math.abs(integral(x=>Math.exp(x)-1,0,Math.log(2))-(1-Math.log(2)))<1e-12);
 assert.equal(q('3.417').rättSvar,'8/3');assert.ok(Math.abs(integral(x=>4-x*x-(x*x+2),-1,1)-8/3)<1e-12);
 for(const id of ['3.18','3.57','3.63','3.177'])assert.doesNotMatch(q(id).ledtrad,/asymptot|polynomdivision/);
});
test('Delkort visar hela V-grafen utan beroende av en osynlig del',()=>{
 const t=q('3.63');assert.equal(t.spelDelar.length,3);for(const d of t.spelDelar){assert.match(d.t,/<svg/);assert.match(d.t,/x-1/);assert.match(d.s,/facit-svar/);assert.ok(d.ledtrad);}
 for(const t of ma4.filter(t=>['3.57','3.63','3.177','3.157','3.417'].includes(t.id)))assert.ok(!t.geogebra||t.miniräknare);
 assert.equal(q('3.57').miniräknare,false);assert.equal(q('3.417').geogebra,false);
});
test('Tankens bild visar situationen; funktionsmodell och svar är bevarade',()=>{const t=bank('ma1').find(q=>q.id==='8.02');assert.equal(t.rättSvar,24+3*6);assert.match(t.t,/vattenyta/);assert.match(t.t,/<ellipse/);assert.match(t.t,/3 l\/min/);assert.match(t.t,/24 liter från början/);assert.equal(t.svarEnhet,'l');});
