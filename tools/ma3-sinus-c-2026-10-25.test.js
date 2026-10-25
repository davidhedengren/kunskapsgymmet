const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgiftermato1.js'),'utf8'),ctx);const bank=JSON.parse(JSON.stringify(ctx.window.BANKMATO1)),q=n=>bank.find(t=>t.id==='4.'+n),s=x=>Math.sin(x*Math.PI/180),c=x=>Math.cos(x*Math.PI/180),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} ≠ ${b}`),heron=(a,b,c)=>{const p=(a+b+c)/2;return Math.sqrt(p*(p-a)*(p-b)*(p-c));};
test('18 granskade C-kort, minst 20 i området, tydliga svarsfält och rätt verktyg',()=>{
 for(const n of [52,...Array.from({length:17},(_,i)=>532+i)]){const t=q(n);assert.equal(t.omr,'sinussatsen');assert.equal(t.traningsniva,3);assert.deepEqual(t.kurs,['1c']);assert.equal(t.spel,true);assert.equal(t.miniräknare,true);assert.equal(t.geogebra,false);}
 assert.ok(bank.filter(t=>t.omr==='sinussatsen'&&t.traningsniva===3&&t.spel!==false).length>=20);assert.equal(q(536).svarsstruktur,'mängd');assert.equal(q(52).alternativ.findIndex(x=>x.ratt),2);assert.ok(20*s(42)/12>1);
});
test('Omväg, area, omkrets och sidförhållanden kontrolleras i ursprungliga villkor',()=>{
 const a=80*s(40)/s(75),b=80*s(65)/s(75);near(q(532).rättSvar+80,a+b);
 near(q(533).rättSvar,heron(60,60*s(55)/s(50),60*s(75)/s(50)));
 const u=q(534).rättSvar;near(u/s(35),(20-u)/s(65));const v=q(535).rättSvar;near(v*(1+s(45)/s(75)+s(60)/s(75)),36);
 const equal=40/(2+s(40)/s(70));near(q(539).rättSvar,heron(equal,equal,40-2*equal));
 const x=q(547).rättSvar;near((x+2)/s(30),2*x/s(80));const z=q(548).rättSvar;near(heron(z,z*s(70)/s(35),z*s(75)/s(35)),60);
});
test('Båda sinusgrenarna, gränsfall och trianglarnas existens kontrolleras',()=>{
 for(const B of q(536).rättSvar){near(s(B),.75);assert.ok(30+B<180);}near(q(536).rättSvar.reduce((a,b)=>a+b),180);
 near(q(537).rättSvar,10*s(40));near(q(542).rättSvar,20);
 // Två möjliga baslängder ur cosinussatsens andragradsekvation, oberoende av invers sinus.
 const roots=[10*c(30)+Math.sqrt(49-100*s(30)**2),10*c(30)-Math.sqrt(49-100*s(30)**2)];near(q(538).rättSvar,Math.max(...roots.map(x=>heron(7,10,x))));
 const cc=q(543).rättSvar;near(100,196+cc*cc-28*cc*c(35));const Bcos=(100+cc*cc-196)/(20*cc);assert.ok(Bcos<0);
 const C=q(544).rättSvar;near(s(50)/s(130-C),2);assert.ok(C>0&&C<130);assert.equal(q(546).rättSvar,1);
});
test('Höjd och bisektriser stämmer även med koordinatmetod',()=>{
 const height=30/(1/Math.tan(40*Math.PI/180)-1/Math.tan(65*Math.PI/180));near(q(540).rättSvar,height);
 const AC=10*s(80)/s(40),BC=10*s(60)/s(40),AD=10*AC/(AC+BC);near(q(541).rättSvar,Math.hypot(AC*c(60)-AD,AC*s(60)));
 near(q(545).rättSvar,50*s(30)/s(100));
});
test('Alla triangelvinklar och sidproportioner mäts från SVG-koordinaterna',()=>{
 for(const n of Array.from({length:17},(_,i)=>532+i)){
 const fig=q(n).figur||q(n).text;const str=JSON.stringify(q(n));const clean=JSON.parse(str);const svg=Object.values(clean).filter(v=>typeof v==='string').join('');
 const m=svg.match(/data-angles="([^"]+)" data-lengths="([^"]+)" points="([^"]+)"/);assert.ok(m,`figur ${n}`);const angles=m[1].split(',').map(Number),lengths=m[2].split(',').map(Number),P=m[3].split(' ').map(p=>p.split(',').map(Number));
 const measured=P.map((p,i)=>Math.hypot(p[0]-P[(i+1)%3][0],p[1]-P[(i+1)%3][1]));for(let i=1;i<3;i++)assert.ok(Math.abs(measured[i]/measured[0]-lengths[i]/lengths[0])<1e-6);
 for(let i=0;i<3;i++){let u=P[(i+1)%3].map((x,j)=>x-P[i][j]),v=P[(i+2)%3].map((x,j)=>x-P[i][j]);let angle=Math.acos((u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)))*180/Math.PI;assert.ok(Math.abs(angle-angles[i])<1e-5,`vinkel ${n} ${i}`);}
 }
});
