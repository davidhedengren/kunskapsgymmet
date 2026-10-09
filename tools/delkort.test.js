'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const c=vm.createContext({arAlt:()=>false});
vm.runInContext(html.slice(html.indexOf('const SVAR_ORD='),html.indexOf('function taggatAntalSvar(')),c);
for(const name of ['metadataForDel','expandGameTask','nastlat','faltVarde','faltFlagga','svarsPlan',
  'autoPerDel','expectedAnswersForTask','taggatAntalSvar','subtaskLetters','answerLayout']){
  const start=html.indexOf(`function ${name}(`);
  assert.ok(start>=0,`Saknar ${name}`);
  vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
}
function bank(file){const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);return Object.values(ctx.window).find(Array.isArray);}
const ma3=bank('uppgiftermato1.js'),ma5=bank('uppgiftermatf1.js');
const cards=id=>c.expandGameTask(ma3.find(q=>q.id===id));
const plain=x=>JSON.parse(JSON.stringify(x));

test('Ma2 3.158 har två namngivna numeriska vinkelfält utan LaTeX-krav',()=>{
  const q=bank('uppgifterma2.js').find(q=>q.id==='3.158');
  const layout=c.answerLayout(q);
  assert.equal(layout.n,2);assert.equal(layout.ordnad,true);
  assert.deepEqual(plain(q.rättSvar),[90,180-34-90]);
  assert.deepEqual(plain(q.svarEtiketter),['Vinkel ACB','Vinkel ABC']);
  assert.deepEqual(plain(q.svarEnhet),['°','°']);
  assert.deepEqual(plain(q.svarFormat),['numeriskt','numeriskt']);
});

test('Grafuppgiften 2.374 har tre självständiga kort utan gemensamt facit',()=>{
  const parts=cards('2.374');
  assert.equal(parts.length,3);
  assert.deepEqual(plain(parts[0].rättSvar),[-1,1]);
  assert.equal(c.answerLayout(parts[0]).n,2);
  assert.equal(parts[0].svarsstruktur,'mängd');
  for(const q of parts){assert.match(q.t,/<svg/);assert.ok(q.s&&q.ledtrad);}
  assert.doesNotMatch(parts[0].s,/maximipunkt|minimipunkt|växande|avtagande/);
  assert.doesNotMatch(parts[1].s,/maximipunkt|minimipunkt/);
  assert.equal(parts[1].självrättning,false);
  assert.equal(parts[2].självrättning,false);
});

test('2.562 använder uttrycksrättning som godtar en funktionsetikett',()=>{
  const q=ma3.find(q=>q.id==='2.562');
  assert.equal(q.svarFormat,'uttryck');
  assert.equal(q.rättSvar,'e^x+e');
  assert.equal(c.answerLayout(q).n,1);
});

test('Ma2 2.146 b har en symmetrilinje som ekvationssvar i ett eget kort',()=>{
  const q=bank('uppgifterma2.js').find(q=>q.id==='2.146');
  const [a,b,last]=c.expandGameTask(q);
  assert.equal(c.answerLayout(a).n,2);
  assert.equal(c.answerLayout(b).n,1);
  assert.equal(c.answerLayout(last).n,2);
  const roots=q.rättSvar[0].map(Number);
  assert.equal(b.rättSvar,`x=${(roots[0]+roots[1])/2}`);
  assert.match(b.t,/symmetrilinjens ekvation/);
  assert.match(b.t,/x=\\ldots/);
  assert.match(b.s,/x=1/);
  assert.doesNotMatch(b.s,/Minimipunkten/);
});
test('Rapporterade mittpunktsuppgifter visar namngivna koordinatfält i rätt ordning',()=>{
  const ma2=bank('uppgifterma2.js');
  for(const [id,expected] of [['3.184',[-1,3]],['3.343',[7,5]]]){
    const q=ma2.find(q=>q.id===id),layout=c.answerLayout(q);
    assert.equal(layout.n,2);
    assert.deepEqual(plain(q.rättSvar),expected);
    assert.deepEqual(plain(q.svarEtiketter),['x-koordinat','y-koordinat']);
    assert.match(q.t,/x-koordinaten i första svarsfältet och y-koordinaten i det andra/);
  }
});
test('Rotekvationen 2.70 har ett rent numeriskt rättningsvärde för sin enda giltiga rot',()=>{
  const q=bank('uppgifterma2.js').find(q=>q.id==='2.70');
  const x=q.rättSvar;
  assert.equal(typeof x,'number');
  assert.ok(x>=1);
  assert.ok(Math.abs(Math.sqrt(x+7)-(x-1))<1e-12);
  assert.equal(q.svarFormat,'numeriskt');
  assert.equal(c.answerLayout(q).n,1);
});

test('Ma2-geometrins delkort får egna facit och kan lösas utan föregående del',()=>{
  const ma2=bank('uppgifterma2.js');
  const geometryCards=id=>c.expandGameTask(ma2.find(q=>q.id===id));
  for(const id of ['3.03','3.05']){
    const [a,b]=geometryCards(id);
    assert.ok(a.s&&b.s,id);
    assert.notEqual(a.s,b.s,id);
  }
  assert.doesNotMatch(geometryCards('3.03')[0].s,/32/);
  assert.doesNotMatch(geometryCards('3.03')[1].s,/58/);
  assert.match(geometryCards('3.145')[1].t,/höjd är 6/);
  assert.match(geometryCards('3.177')[1].t,/0,4/);
  assert.match(geometryCards('3.181')[1].t,/x=30/);
  const centralAngle=geometryCards('3.417')[1];
  assert.match(centralAngle.t,/58/);
  assert.equal(centralAngle.traningsniva,1);
  assert.equal(Number(centralAngle.rättSvar),116);
});
test('Ma2-geometrins gemensamma figurer finns på vart och ett av delkorten',()=>{
  const ma2=bank('uppgifterma2.js');
  for(const id of ['3.132','3.145','3.151','3.175','3.176','3.177','3.181']){
    for(const card of c.expandGameTask(ma2.find(q=>q.id===id)))assert.match(card.t,/<svg\b/,`${id}: ${card.id}`);
  }
});

test('1.19 b frågar bara efter f(2) och har ett självrättande svarsfält',()=>{
  const [a,b]=cards('1.19');
  assert.equal(a.rättSvar,3);assert.equal(b.rättSvar,1);
  assert.equal(c.answerLayout(b).n,1);
  assert.equal(c.expectedAnswersForTask(b).auto,true);
  assert.equal(b.manuellKomplettering,false);
  assert.equal(b.svarFormat,'numeriskt');
});
test('Samma fel i 1.02 och 1.32 rättas utan att blanda delar eller facit',()=>{
  const [a,b]=cards('1.02');
  assert.equal(a.rättSvar,6);assert.equal(b.rättSvar,2);
  assert.equal(c.answerLayout(a).n,1);assert.equal(c.answerLayout(b).n,1);
  const [roots,interval]=cards('1.32');
  assert.deepEqual(plain(roots.rättSvar),[-1,3]);
  assert.equal(c.answerLayout(roots).n,2);
  assert.equal(interval.rättSvar,'x<-1 eller x>3');
  assert.match(interval.t,/Bestäm alla/);
  assert.equal(c.answerLayout(interval).n,1);
  assert.deepEqual(plain(roots.svarFormat),['numeriskt','numeriskt']);
});
test('Originalbladets manuellbedömda c-del finns kvar',()=>{
  for(const id of ['1.02','1.19','1.32']){
    const q=ma3.find(q=>q.id===id);
    assert.equal(q.rättSvar.length,3);
    assert.deepEqual(plain(q.självrättning),[true,true,false]);
    assert.deepEqual(plain(q.manuellKomplettering),[false,false,true]);
    assert.match(q.t,/c\)/);
  }
});
test('Intervallfrågorna ber om alla x-värden som rättaren förväntar sig',()=>{
  for(const id of ['1.27','1.32']){
    const q=ma3.find(q=>q.id===id);
    assert.match(q.t,/Bestäm alla/);
    assert.match(c.expandGameTask(q)[1].t,/Bestäm alla/);
    assert.doesNotMatch(q.t,/Bestäm ett intervall/);
  }
});
test('Delens etikett fungerar även när spelkorten börjar med b eller visas i annan ordning',()=>{
  const q={id:'test',svarEtiketter:['a','b','c'],rättSvar:[10,20,30],
    självrättning:[true,false,true],svarFormat:['heltal','uttryck','numeriskt'],
    tolerans:[0,0.1,0.2],rättSvar273:[11,null,31],svarEnhet:['m','s','N'],manuellKomplettering:[false,true,false],
    traningsniva:[1,2,3],arbetsinsats:[1,2,3],spelDelning:'deluppgifter',
    spelDelar:[{etikett:'c',t:'c'},{etikett:'b',t:'b'}]};
  const [last,middle]=c.expandGameTask(q);
  assert.equal(last.rättSvar,30);assert.equal(last.svarEnhet,'N');assert.equal(last.tolerans,0.2);
  assert.equal(last.rättSvar273,31);assert.equal(middle.rättSvar273,null);
  assert.equal(last.traningsniva,3);assert.equal(last.arbetsinsats,3);
  assert.equal(middle.rättSvar,20);assert.equal(middle.självrättning,false);
  assert.equal(middle.manuellKomplettering,true);
});
test('Gaslagens alternativa temperatursvar följer rätt delkort utan att ändra facit',()=>{
  const q=bank('uppgifter.js').find(q=>q.id==='6.38');
  const cards=c.expandGameTask(q);
  assert.deepEqual(plain(cards.map(x=>x.rättSvar)),[310.15,255.15,-78.15]);
  assert.deepEqual(plain(cards.map(x=>x.rättSvar273)),[310,255,-78]);
  for(const card of cards){
    assert.equal(c.answerLayout(card).n,1);
    assert.equal(c.expectedAnswersForTask(card).auto,true);
  }
});
test('Oförändrad delning med nästlade svar och metadata utan etiketter',()=>{
  const q={id:'test',rättSvar:[[2,3],4],självrättning:[true,true],
    svarFormat:[['heltal','heltal'],'numeriskt'],spelDelning:'deluppgifter',
    spelDelar:[{t:'a'},{t:'b'}]};
  const [a,b]=c.expandGameTask(q);
  assert.deepEqual(plain(a.rättSvar),[2,3]);assert.equal(b.rättSvar,4);
  assert.equal(c.answerLayout(a).n,2);assert.equal(c.answerLayout(b).n,1);
});
test('Variabelnamn i svarsetiketter ska inte förväxlas med delarnas a/b/c',()=>{
  for(const [file,id,expected] of [['uppgifterma1.js','1.20','4a-8'],
    ['uppgifterma2.js','2.261',23.21],['uppgifterma2.js','2.463',3]]){
    const q=bank(file).find(q=>q.id===id);
    assert.equal(c.expandGameTask(q)[0].rättSvar,expected,id);
  }
});
test('Ma2 2.164 har en rotmängd för p och ett separat numeriskt svar för q',()=>{
  const q=bank('uppgifterma2.js').find(q=>q.id==='2.164');
  const pairs=[];
  for(let a=-36;a<=36;a++)for(let b=a+1;b<=36;b++){
    if(b-a===5&&a*b===36)pairs.push([a,b]);
  }
  const ps=pairs.map(([a,b])=>-(a+b)).sort((a,b)=>a-b);
  assert.deepEqual(String(q.rättSvar[0]).split(',').map(Number).sort((a,b)=>a-b),ps);
  assert.ok(pairs.every(([a,b])=>a*b===q.rättSvar[1]));
  assert.deepEqual(plain(q.svarEtiketter),['p','q']);
  assert.deepEqual(plain(q.svarFormat),['lösningsmängd','numeriskt']);
  const layout=c.answerLayout(q);
  assert.equal(layout.n,2);assert.equal(layout.ordnad,true);
  assert.deepEqual(plain(layout.delAuto),[true,true]);
  assert.doesNotMatch(q.s,/4\{,\}9/,'Rötterna 4 och 9 får inte se ut som decimaltalet 4,9');
});
test('1.124 bevaras som läraruppgift utan omöjlig självrättning',()=>{
  const q=ma3.find(q=>q.id==='1.124');
  assert.equal(q.spel,false);assert.equal(q.självrättning,false);
  assert.equal(c.expectedAnswersForTask(q).auto,false);
  assert.match(q.t,/Skriv ett matematiskt villkor/);
  assert.match(q.s,/\\lim_/);
});
test('Numeriska termer har flera_delar och ordnade svar för Enter-flödet',()=>{
  for(const id of ['1.29','1.33','2.74','2.108','2.174']){
    const q=ma5.find(q=>q.id===id);
    assert.equal(q.svarstyp,'flera_delar',id);
    assert.equal(c.answerLayout(q).ordnad,true,id);
    assert.equal(c.answerLayout(q).n,q.rättSvar.length,id);
  }
});
test('Räknare tillåts för de granskade rekursionsuppgifterna',()=>{
  for(const id of ['2.466','2.469','2.74','2.108','2.130','2.173','2.174','2.177','2.201','2.202'])
    assert.equal(ma5.find(q=>q.id===id).miniräknare,true,id);
});

test('Fysikrapport 5.133 a visar bara givna massor och hastighet',()=>{
  const [a,b,c]=cxtPhysicsCards('5.133');
  assert.match(a.t,/1500 kg/);assert.match(a.t,/800 kg/);assert.match(a.t,/25 m\/s/);
  assert.doesNotMatch(a.t,/22 kW|60 m|broms/);
  assert.equal(a.rättSvar,(1500+800)*25);
  assert.equal(b.rättSvar,22000/25);
  assert.equal(c.rättSvar,(1500+800)*25**2/2/60);
  assert.equal(c.tolerans,0.005);
  assert.match(c.t,/två decimaler/);
});
test('Fysikrapport 5.575 får separata givna data och metoder för varje del',()=>{
  const [a,b,last]=cxtPhysicsCards('5.575');
  assert.match(a.t,/120 W/);assert.match(a.t,/4,0 m\/s/);assert.doesNotMatch(a.t,/60 kg|4,0°/);
  assert.equal(a.rättSvar,120/4);
  assert.match(b.t,/30 N/);assert.match(last.t,/30 N/);
  const gravity=60*9.82*Math.sin(4*Math.PI/180);
  assert.ok(Math.abs(b.rättSvar-(30+gravity)*3)<1e-9);
  assert.ok(Math.abs(last.rättSvar-(30/4**2*3**2+gravity)*3)<1e-9);
});
test('Fysikrapport 6.506 d anger klotform och hela massan som heliumet ska bära',()=>{
  const d=cxtPhysicsCards('6.506')[3];
  assert.match(d.t,/klotformad/);assert.match(d.t,/hölje, korg och nät/i);assert.match(d.t,/196 kg/);
  const expected=Math.cbrt(3*(7700+196)/(4*Math.PI*(1.29-.179)));
  assert.ok(Math.abs(d.rättSvar-expected)<1e-9);
});
test('Bollstudsens golvimpuls inkluderar tyngdkraftens impuls under kontakten',()=>{
  const [impulse,force]=cxtPhysicsCards('5.386');
  const change=1.2*(2.1-(-5.2));
  const floorImpulse=change+1.2*9.82*0.020;
  assert.ok(Math.abs(impulse.rättSvar-floorImpulse)<1e-10);
  // Del b är ett fristående kort med den uttryckligen givna impulsen 9,00 Ns.
  assert.ok(Math.abs(force.rättSvar-9.00/0.020)<1e-10);
  assert.ok(impulse.rättSvar>change);
  assert.match(force.t,/9,00 Ns/);
  assert.match(force.t,/20,0 ms/);
  assert.equal(impulse.svarEnhet,'Ns');
  assert.equal(force.svarEnhet,'N');
});
test('Batterikortet och handens bromskort innehåller givna data från sina egna delar',()=>{
  const battery=cxtPhysicsCards('8.465')[1];
  assert.match(battery.t,/90 Ah/);assert.match(battery.t,/24 timmar/);
  assert.equal(battery.rättSvar,90/24);
  assert.equal(c.answerLayout(battery).n,1);
  const hand=cxtPhysicsCards('5.515')[3];
  assert.match(hand.t,/7,0 kg/);assert.match(hand.t,/10,0 m\/s/);
  assert.match(hand.t,/2,00 cm/);
  assert.equal(hand.rättSvar,7*10**2/(2*.02));
});
test('Rekylkort anger samma hastighetsreferens som rörelsemängdsberäkningen',()=>{
  const [pistol,boat]=cxtPhysicsCards('5.412');
  assert.match(pistol.t,/mätt från marken/);
  assert.match(boat.t,/mätt från bryggan/);
  assert.ok(Math.abs(pistol.rättSvar-.03*175/3)<1e-10);
  assert.ok(Math.abs(boat.rättSvar-5.3*10/59)<1e-10);
  const astronaut=cxtPhysicsCards('5.423')[0];
  assert.match(astronaut.t,/8,00 m\/s mätt från skeppet/);
  assert.ok(Math.abs(astronaut.rättSvar-12*8/75)<1e-10);
});
test('Friktion, nedsänkt is och solpanelernas återbetalning kan lösas från egna delkort',()=>{
  const friction=cxtPhysicsCards('5.514')[1];
  assert.match(friction.t,/1250 kg/);
  assert.match(friction.t,/4,24 kN/);
  assert.ok(Math.abs(friction.rättSvar-4240/(1250*9.82))<friction.tolerans);
  const ice=cxtPhysicsCards('6.483')[1];
  assert.match(ice.t,/0,90 kg/);
  assert.match(ice.t,/917 kg\/m³/);
  assert.match(ice.t,/1000 kg\/m³/);
  assert.ok(Math.abs(ice.rättSvar-1000*(.90/917)*9.82)<1e-10);
  const panels=cxtPhysicsCards('5.600')[3];
  assert.match(panels.t,/2600 kWh per år/);
  assert.match(panels.t,/64 000 kr/);
  assert.match(panels.t,/0,95 kr\/kWh/);
  assert.ok(Math.abs(panels.rättSvar-64000/(2600*.95))<1e-10);
});
test('Värmekorten använder samma svarsenheter som självrättningen',()=>{
  const [mass,energy,time]=cxtPhysicsCards('7.36');
  assert.equal(mass.svarEnhet,'kg');assert.match(mass.t,/Svara i kg/);
  assert.equal(energy.svarEnhet,'kJ');assert.match(energy.t,/Svara i kJ/);
  assert.equal(time.svarEnhet,'min');assert.match(time.t,/Svara i min/);
  assert.match(time.t,/868 320 J/);assert.doesNotMatch(time.t,/1005|12 m³/);
});
function cxtPhysicsCards(id){return c.expandGameTask(bank('uppgifter.js').find(q=>q.id===id));}


test('Mato1:s reviderade tangent, exponentialfunktion och integral har korrekta svarsfält',()=>{
 for(const [id,values]of [['2.254',[2,1]],['2.309',[2,2]],['3.481',[1,2]]]){
  const qs=cards(id);assert.equal(qs.length,2);
  qs.forEach((q,i)=>{assert.equal(q.traningsniva,values[i]);assert.equal(c.answerLayout(q).n,1);assert.equal(c.expectedAnswersForTask(q).auto,true);assert.equal(c.answerLayout(q).blandad,false);});
 }
 assert.deepEqual(plain(cards('3.481').map(q=>q.manuellKomplettering)),[false,false]);
 assert.deepEqual(plain(cards('2.254').map(q=>q.rättSvar)),['6e^(2x)+5e^(-x)',11]);
 assert.deepEqual(plain(cards('2.309').map(q=>q.rättSvar)),[9,'y=9x-16']);
});
