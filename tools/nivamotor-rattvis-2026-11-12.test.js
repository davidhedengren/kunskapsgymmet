'use strict';
/* Rättvis omräkning av äldre profiler (användarbeslut 2026-11-12).
   En elev hade 35/35 starka moment i Ma5 på startsidan och 15/35 efter att bara ha öppnat kursen.
   Orsaker: kursmätaren räknade en stängd kurs med den gamla regeln, och omräkningen när kursen
   öppnades läste bara de 300 senaste svaren i historiken. Nu räknas öppen och stängd kurs med samma
   funktion, nivåstatistikens svar utöver startvärdena räknas med, och omräkningen sänker aldrig ett läge. */
const test=require('node:test'),assert=require('node:assert/strict');
const {nivamotor}=require('./nivamotor-hjalp.js');

/* Nivåstatistik med påhittade startvärden (tre svar per nivå) och, om riktig=true,
   14 svar på nivå 3 varav 90 % rätt, alltså 11 riktiga svar utöver startvärdet. */
function niva(riktig){
  const lv={"1":{s:.9,n:3},"2":{s:.9,n:3},"3":{s:.75,n:3},"4":{s:.6,n:3},"5":{s:.5,n:3}};
  if(riktig){ lv["2"]={s:.92,n:20}; lv["3"]={s:.9,n:14}; }
  return lv;
}
/* Historiken har bara kvar några svar på nivå 1–2 i området (resten har trillat ut ur de 300). */
const kortHistorik=()=>[1,2,1,2].map((L,i)=>({id:`${L}-${i}`,ok:true,area:'X',at:1}));

test('Elevens fall: ett område som räknats ner ur avkortad historik återfår "Stark"',()=>{
  const cp={areas:{X:.9},families:{},history:kortHistorik(),levels:{X:niva(true)},
    formaga:{X:{mu:-.3,sd:.7,n:4,r:{"1":2,"2":2},at:1}}};
  const c=nivamotor({cp});
  assert.equal(c.lageFor('X').label,'Stark');
  assert.equal(c.cp.formaga.X.v,c.FORM_VERSION,'omräkningen sparas och görs en gång');
  assert.ok(c.cp.formaga.X.r["3"]>=2,'svaren på nivå 3 i nivåstatistiken räknas');
});

test('Samma läge i stängd och öppen kurs, och öppnandet sänker inget',()=>{
  const profil=()=>({areas:{X:.9},families:{},history:kortHistorik(),levels:{X:niva(true)},formaga:{X:{mu:1.2,sd:.5,n:20,at:1}}});
  const annan=profil();
  const stangd=nivamotor().lageFor('X',annan);        // kursen är inte öppen
  assert.equal(annan.formaga.X.v,undefined,'en stängd kurs skrivs inte om');
  const c=nivamotor({cp:profil()});
  const oppen=c.lageFor('X');
  assert.equal(stangd.label,oppen.label);
  assert.ok(oppen.rank>=stangd.rank);
});

test('Påhittade startvärden räknas inte som visad nivå 3, varken öppen eller stängd',()=>{
  const profil=()=>({areas:{X:.9},families:{},history:[],levels:{X:niva(false)},formaga:{X:{mu:1.2,sd:.5,n:20,at:1}}});
  const c=nivamotor({cp:profil()});
  assert.notEqual(c.lageFor('X').label,'Stark');
  assert.notEqual(nivamotor().lageFor('X',profil()).label,'Stark');
  assert.equal(c.formFranNivastatistik(profil(),'X',{mu:0,sd:1}),null,'tre svar per nivå är bara startvärden');
});

test('Omräkningen tar det största av sparat värde, nivåstatistik och historik',()=>{
  const sparad={mu:1.4,sd:.4,n:30,r:{"3":5},at:1};
  const cp={areas:{X:.9},families:{},history:kortHistorik(),levels:{X:niva(true)},formaga:{X:{...sparad}}};
  const c=nivamotor({cp});
  const ny=c.formagaLas('X');
  assert.ok(ny.mu>=sparad.mu-1e-12 && ny.n>=sparad.n);
  assert.ok(ny.r["3"]>=5);
});

test('Nya svar sparas med versionen, så de inte räknas om',()=>{
  const c=nivamotor({cp:{areas:{},families:{},history:[],levels:{}}});
  c.formagaUppdatera({omr:'X',traningsniva:3},1);
  assert.equal(c.cp.formaga.X.v,c.FORM_VERSION);
  const efter=JSON.stringify(c.cp.formaga.X);
  assert.equal(JSON.stringify(c.formagaLas('X')),efter);
});
