const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgiftermato1.js'),'utf8'),ctx);const bank=JSON.parse(JSON.stringify(ctx.window.BANKMATO1)),q=n=>bank.find(t=>t.id==='4.'+n),sin=x=>Math.sin(x*Math.PI/180),cos=x=>Math.cos(x*Math.PI/180),near=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} ≠ ${b}`),heron=(a,b,c)=>{const p=(a+b+c)/2;return Math.sqrt(p*(p-a)*(p-b)*(p-c));};
test('18 nya C-kort, minst 20 i området, Ma3c och miniräknare',()=>{
 for(let n=549;n<=566;n++){const t=q(n);assert.equal(t.omr,'cosinussatsen');assert.equal(t.traningsniva,3);assert.deepEqual(t.kurs,['1c']);assert.equal(t.spel,true);assert.equal(t.miniräknare,true);assert.equal(t.geogebra,false);assert.equal(t.självrättning,true);assert.match(JSON.stringify(t),/<svg/);}
 assert.ok(bank.filter(t=>t.omr==='cosinussatsen'&&t.traningsniva===3&&t.spel!==false).length>=20);
});
test('Parameteruppgifter prövas mot originalvillkor och triangelolikhet',()=>{
 let x=q(549).rättSvar;near(x*x+(x+3)**2-2*x*(x+3)*cos(60),49);assert.ok(x>0&&2*x+3>7);
 x=q(550).rättSvar;near(5*x*x-4*x*x*cos(120),196);assert.ok(3*x>14&&x<14);
 x=q(561).rättSvar;near(x*x+(x+1)**2-2*x*(x+1)*cos(120),(x+2)**2);assert.ok(x>1);
 const area=6*Math.sqrt(3),a=q(558).rättSvar;near(heron(a,Math.sqrt(12),2*Math.sqrt(12)),area);
});
test('Areor och höjder kontrolleras med Heron, median med Apollonios',()=>{
 near(q(551).rättSvar,heron(5,7,8));near(q(555).rättSvar,2*heron(8,9,10)/10);
 near(q(552).rättSvar,Math.sqrt((2*10**2+2*12**2-14**2)/4));
 near((q(556).rättSvar+6)**2+8**2,11**2);assert.ok(q(556).rättSvar>0);
});
test('Färdvägar, bisektris och gemensam diagonal kontrolleras oberoende',()=>{
 near(q(553).rättSvar,Math.hypot(3+4*cos(60),4*sin(60)));
 near(q(554).rättSvar,Math.hypot(6-4*cos(75),4*sin(75)));
 const angle=q(557).rättSvar;near(25+49-70*cos(angle),52);
 // Bisektrislängden l² = bc(1-a²/(b+c)²), oberoende av facits deltriangelmetod.
 near(q(559).rättSvar,Math.sqrt(120*(1-196/484)));
});
test('Vinkelgräns, diagonaler, femhörning och klockvisare',()=>{
 let v=q(560).rättSvar;assert.equal(v,96);assert.ok(Math.sqrt(74-70*cos(v))>9);assert.ok(Math.sqrt(74-70*cos(v-1))<9);
 near(q(562).rättSvar,Math.hypot(7+5*cos(60),5*sin(60)));
 near(q(563).rättSvar,5*Math.hypot(6*sin(72),6-6*cos(72)));
 near(q(564).rättSvar,Math.hypot(8*sin(70)-12*sin(120),-8*cos(70)+12*cos(120)));
 let d1=Math.hypot(8-11*cos(60),11*sin(60)),d2=Math.hypot(8-11*cos(120),11*sin(120));near(q(565).rättSvar,100*(d2-d1)/d1);
 // Höjdfotens koordinat följer också av differensen mellan två Pythagorasuttryck.
 const AH=q(566).rättSvar;near(15**2-10**2,(7+AH)**2-AH**2);assert.ok(AH>0);
});
test('SVG-trianglarnas sidor och vinklar stämmer med deras matematiska koordinater',()=>{
 for(let n=549;n<=566;n++){
 const svg=Object.values(q(n)).filter(v=>typeof v==='string').join('');const m=svg.match(/data-angles="([^"]+)" data-lengths="([^"]+)" points="([^"]+)"/);if(!m)continue;
 const angles=m[1].split(',').map(Number),lengths=m[2].split(',').map(Number),P=m[3].split(' ').map(p=>p.split(',').map(Number));const measured=P.map((p,i)=>Math.hypot(p[0]-P[(i+1)%3][0],p[1]-P[(i+1)%3][1]));
 for(let i=1;i<3;i++)assert.ok(Math.abs(measured[i]/measured[0]-lengths[i]/lengths[0])<1e-6);
 for(let i=0;i<3;i++){let u=P[(i+1)%3].map((x,j)=>x-P[i][j]),v=P[(i+2)%3].map((x,j)=>x-P[i][j]);let angle=Math.acos((u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)))*180/Math.PI;assert.ok(Math.abs(angle-angles[i])<1e-5,`${n} vinkel ${i}`);}
 }
});
test('Sammansatta figurer har gemensam skala, rätt diagonaler och regelbunden femhörning',()=>{
 const polygon=n=>{const m=Object.values(q(n)).filter(v=>typeof v==='string').join('').match(/<polygon points="([^"]+)"/);assert.ok(m);return m[1].split(' ').map(x=>x.split(',').map(Number));};
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);let P=polygon(557),sides=[6,8,7,5];for(let i=0;i<4;i++)assert.ok(Math.abs(dist(P[i],P[(i+1)%4])/sides[i]-28)<1e-5);
 P=polygon(562);near(dist(P[0],P[2]),308);assert.ok(Math.abs(dist(P[1],P[3])-220)<1e-5);for(let j=0;j<2;j++)near(P[0][j]+P[2][j],P[1][j]+P[3][j]);
 P=polygon(563);for(let i=0;i<5;i++){assert.ok(Math.abs(dist(P[i],[260,195])-130)<1e-5);assert.ok(Math.abs(dist(P[i],P[(i+1)%5])-260*sin(36))<1e-5);}
});
