'use strict';
/* Lägen per område (användarbeslut 2026-11-05): Behöver träning, På gång, Behärskar grunderna,
   Stark och Mycket stark, med krav på visad nivå. Ringarna är klara exakt när läget nåtts. */
const test=require('node:test'),assert=require('node:assert/strict');
const {nivamotor}=require('./nivamotor-hjalp.js');

/* lista: [nivå, antal rätt, antal försök]; rätt svar först inom varje nivå. */
function elev(lista,uppgifter){
  const history=[];
  for(const [L,r,n] of lista) for(let i=0;i<n;i++) history.push({id:`${L}-${i}`,ok:i<r,area:'X'});
  return nivamotor({cp:{areas:{},families:{},history,levels:{}},uppgifter});
}
const FALL=[
  ['5 av 10 på nivå 2',[[2,5,10]],'Behöver träning'],
  ['3 av 4 på nivå 2',[[2,9,12]],'På gång'],
  ['9 av 10 på nivå 1',[[1,9,10]],'På gång'],
  ['20 av 20 på nivå 1 (inget visat på nivå 2)',[[1,20,20]],'På gång'],
  ['9/10 på nivå 1 och 8/10 på nivå 2',[[1,9,10],[2,8,10]],'Behärskar grunderna'],
  ['3 av 4 på nivå 3',[[3,9,12]],'Stark'],
  ['3/4 på nivå 4 och 3/4 på nivå 5',[[3,4,4],[4,3,4],[5,3,4]],'Mycket stark'],
  ['4/4 på nivå 4 och 2/4 på nivå 5',[[3,4,4],[4,4,4],[5,2,4]],'Mycket stark'],
  ['6/8 på nivå 4 men inget på nivå 5',[[3,4,4],[4,6,8]],'Stark'],
];
for(const [namn,lista,vantat] of FALL)
  test(`${namn}: ${vantat}`,()=>assert.equal(elev(lista).lageFor('X').label,vantat));

test('Utan nivå 5 i området räcker nivå 4 för Mycket stark',()=>{
  const uppgifter=['1','2','3','4'].map(L=>({id:`${L}-0`,omr:'X',traningsniva:Number(L)}));
  assert.equal(elev([[3,4,4],[4,6,6]],uppgifter).lageFor('X').label,'Mycket stark');
});

test('Utan nivå 4–5 i området är Stark det högsta läget',()=>{
  const uppgifter=['1','2','3'].map(L=>({id:`${L}-0`,omr:'X',traningsniva:Number(L)}));
  assert.equal(elev([[3,12,12]],uppgifter).lageFor('X').label,'Stark');
});

test('Ringarna är klara exakt när läget nåtts',()=>{
  const finns=new Set(['1','2','3','4','5']);
  const grund={id:'grund',niv:['1','2']}, till={id:'till',niv:['3']}, utm={id:'utm',niv:['4','5']};
  const rank={'Behöver träning':1,'På gång':2,'Behärskar grunderna':3,'Stark':4,'Mycket stark':5};
  for(const [namn,lista] of FALL){
    const c=elev(lista), r=rank[c.lageFor('X').label];
    assert.equal(c.stegVarde('X',grund,finns)===1,r>=3,`${namn}: Grunderna`);
    assert.equal(c.stegVarde('X',till,finns)===1,r>=4,`${namn}: Tillämpning`);
    assert.equal(c.stegVarde('X',utm,finns)===1,r>=5,`${namn}: Utmaning`);
  }
});

test('Rätt utan ledtråd räknas per nivå vid varje svar',()=>{
  const c=nivamotor();
  c.formagaUppdatera({omr:'A',traningsniva:3},1);
  c.formagaUppdatera({omr:'A',traningsniva:3},.5);
  c.formagaUppdatera({omr:'A',traningsniva:2},1);
  assert.deepEqual({...c.cp.formaga.A.r},{3:1,2:1});
  assert.equal(c.formRatt(c.cp.formaga.A,'2'),2);
});

test('Sparad förmåga från före lägena får sin rätt-räkning ur historiken',()=>{
  const history=[{id:'2-0',ok:true,area:'X'},{id:'2-1',ok:true,area:'X',hint:true},{id:'3-0',ok:true,area:'X'}];
  const c=nivamotor({cp:{areas:{},families:{},history,levels:{},formaga:{X:{mu:.5,sd:.5,n:3}}}});
  assert.deepEqual({...c.formagaLas('X').r},{2:1,3:1});
});
