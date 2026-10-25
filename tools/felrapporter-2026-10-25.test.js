const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
function bank(c){const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter'+c+'.js'),'utf8'),ctx);return JSON.parse(JSON.stringify(ctx.window['BANK'+c.toUpperCase()]));}
const ma1=bank('ma1'),ma4=bank('mato2'),q=(b,id)=>b.find(t=>t.id===id);
test('Jordmassans andel är liten men inte noll; grundpotensform prövas',()=>{
 const t=q(ma1,'0.1073'),ratio=8e9*70/5.97e24;
 assert.equal(Number(ratio.toPrecision(2)),t.rättSvar);
 assert.equal(t.svarFormat,'grundpotensform');assert.equal(t.miniräknare,true);assert.equal(t.geogebra,false);
});
test('Grundbegrepp är kortfattade och alla nödvändiga alternativ kan visas',()=>{
 for(const id of ['0.644','0.648','0.649']){const t=q(ma1,id);assert.match(t.t,/Välj ett alternativ/);assert.equal(t.alternativ.filter(a=>a.ratt).length,1);}
 assert.doesNotMatch(q(ma1,'0.649').s,/belopp|\|a\|/);assert.equal(q(ma1,'0.649').traningsniva,2);
 assert.equal(q(ma1,'1.963').rättSvar,'4x');assert.equal(q(ma1,'1.963').traningsniva,1);
});
test('Geometrisk area räknar positiva delareor, inte bara tecknad integral',()=>{
 const t=q(ma4,'3.22');assert.deepEqual(t.rättSvar,['5/2',8,2]);
 assert.equal(.5*1*1+.5*2*2,Number(t.rättSvar[0].split('/')[0])/2);
 assert.equal(2*.5*2*4,t.rättSvar[1]);assert.equal(-Math.cos(Math.PI)+Math.cos(0),t.rättSvar[2]);
 assert.match(t.spelDelar[2].s,/cos/);assert.doesNotMatch(t.s,/givna längder och vinklar/);
});
test('Reservoarens startvolym och nettotillflöde ger båda volymerna',()=>{
 const t=q(ma4,'3.51'),V=t=>120+1.5*t*t-6*t;
 assert.deepEqual(t.rättSvar,[2,V(2),V(8)]);assert.ok(V(1)>V(2)&&V(3)>V(2));
 assert.deepEqual(t.spelDelar.map(d=>d.traningsniva),[3,2,2]);assert.doesNotMatch(t.s,/givna längder och vinklar/);
});
test('Positiv rapport 2.141 behåller resonemang och korrekt omöjlighetsbevis',()=>{
 const t=q(ma4,'2.141');assert.equal(t.självrättning,false);assert.match(t.s,/oavsett/);
 for(const a of [-100,-1,0,3,100])assert.equal(Math.cos(0)-a*Math.sin(0),1);
});
test('Abstrakt kedjeregel ligger på nivå 4; svaren är självständigt beräknade',()=>{
 for(const id of ['2.263','2.225','2.193'])assert.equal(q(ma4,id).traningsniva,4);
 assert.equal(q(ma4,'2.263').rättSvar,2*4);assert.equal(q(ma4,'2.225').rättSvar,-4*5);
 assert.equal(q(ma4,'2.193').rättSvar,'-3/sqrt(10)');
 for(const id of ['2.143','2.453','2.256'])assert.equal(q(ma4,id).traningsniva,3);
});
test('Nya proportionella modeller prövar åtta olika situationer med korrekta mål',()=>{
 const answers=[300/(45/3+60/5),Math.min(Math.floor(2000/(750/12)),Math.floor(900/(300/12))),9/(3/1)+.5,(.8+.4)*(2.4/.8)-2.4,40000/.8,12*(80-25)/20,31-44*12/18,45-(10+60*(4*45/60)/6)];
 for(let i=0;i<8;i++){const t=q(ma1,'0.'+(1253+i));assert.ok(Math.abs(t.rättSvar-answers[i])<1e-10);assert.equal(t.traningsniva,3);assert.equal(t.miniräknare,true);assert.equal(t.geogebra,false);assert.match(t.s,/facit-svar/);}
 assert.equal(q(ma1,'8.18').rättSvar,210-(2*210)/3);
 assert.equal(ma1.filter(t=>t.omr==='proportionalitet_grunder'&&t.familj==='Proportionalitet i problemlösning'&&t.traningsniva===3).length,14);
});
