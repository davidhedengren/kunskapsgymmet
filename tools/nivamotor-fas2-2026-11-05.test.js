'use strict';
/* Nivåmotorn fas 2 (användarbeslut 2026-11-05, docs/ADAPTIVITET_ANALYS_2026-11-05.md avsnitt 7):
   etiketter, ringar och områdesval bygger på förmågan i stället för andel rätt. */
const test=require('node:test'),assert=require('node:assert/strict');
const {nivamotor}=require('./nivamotor-hjalp.js');

/* Elev A tränar på nivå 3 och klarar 3 av 4. Elev B gör bara nivå 1 och klarar 9 av 10. */
function elever(){
  const hA=[],hB=[];
  for(let i=0;i<12;i++) hA.push({id:`3-${i}`,ok:i%4!==3,area:'X',at:1});
  for(let i=0;i<10;i++) hB.push({id:`1-${i}`,ok:i!==4,area:'X',at:1});
  return [nivamotor({cp:{areas:{X:.65},families:{},history:hA,levels:{}}}),
          nivamotor({cp:{areas:{X:.85},families:{},history:hB,levels:{}}})];
}

test('Den som klarar 3 av 4 på nivå 3 visas som starkare än den som nöter nivå 1',()=>{
  const [a,b]=elever();
  const mA=a.omradeM('X'), mB=b.omradeM('X');
  assert.ok(mA>=.78,`nivå 3-eleven: ${mA.toFixed(2)} (Stark)`);
  assert.ok(mB<.78,`nivå 1-eleven: ${mB.toFixed(2)} (inte Stark)`);
  assert.ok(mA>mB);
});

test('Ringarna: grunderna är klara för nivå 3-eleven, tillämpningen fylls i takt med förmågan',()=>{
  const [a,b]=elever();
  const finns=new Set(['1','2','3','4']);
  const grund={id:'grund',niv:['1','2']}, till={id:'till',niv:['3']}, utm={id:'utm',niv:['4','5']};
  assert.ok(a.stegVarde('X',grund,finns)>=.95,'grunderna klara');
  assert.ok(a.stegVarde('X',till,finns)>b.stegVarde('X',till,finns),'tillämpning');
  assert.ok(a.stegVarde('X',utm,finns)<.95,'utmaningen är inte klar');
  assert.equal(a.stegVarde('Y',grund,finns),0,'otränat område');
  assert.equal(a.stegVarde('X',utm,new Set(['1','2'])),null,'nivåer som saknas räknas inte');
});

test('Områdesvalet väljer oftast det område som behöver mest träning',()=>{
  const history=[];
  for(let i=0;i<10;i++){ history.push({id:`2-s${i}`,ok:i<3,area:'SVAG',at:Date.now()}); history.push({id:`3-k${i}`,ok:true,area:'STARK',at:Date.now()}); }
  const c=nivamotor({cp:{areas:{},families:{},history,levels:{}},state:{lastArea:null}});
  const pool=[{omr:'SVAG'},{omr:'STARK'}];
  let svag=0; for(let i=0;i<400;i++){ c.state.lastArea=null; if(c.chooseArea(pool)==='SVAG') svag++; }
  assert.ok(svag/400>.8,`svaga området valdes ${svag} av 400`);
  // Samma område två gånger i rad undviks, så det starka området får också plats i passet.
  let stark=0; for(let i=0;i<400;i++){ c.state.lastArea='SVAG'; if(c.chooseArea(pool)==='STARK') stark++; }
  assert.ok(stark/400>.5,`efter det svaga valdes det starka ${stark} av 400`);
});

test('Lektionsområdet och områden som vilat länge får förtur',()=>{
  const gammal=Date.now()-20*864e5, ny=Date.now();
  const history=[];
  for(let i=0;i<8;i++){ history.push({id:`3-a${i}`,ok:true,area:'VILAT',at:gammal}); history.push({id:`3-b${i}`,ok:true,area:'NYSS',at:ny}); }
  const c=nivamotor({cp:{areas:{},families:{},history,levels:{}},state:{lastArea:null}});
  let vilat=0; for(let i=0;i<400;i++) if(c.chooseArea([{omr:'VILAT'},{omr:'NYSS'}])==='VILAT') vilat++;
  assert.ok(vilat/400>.65,`området som vilat valdes ${vilat} av 400`);
});

test('En annan kurs läses bara ur sparad förmåga',()=>{
  const c=nivamotor();
  const annan={areas:{Q:.4},formaga:{Z:{mu:1.5,sd:.4,n:10}}};
  assert.ok(c.omradeM('Z',annan)>.9);
  assert.equal(c.omradeM('Q',annan),.4,'äldre andel rätt när förmåga saknas');
  assert.equal(c.omradeHar('saknas',annan),false);
});
