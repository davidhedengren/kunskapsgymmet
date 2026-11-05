'use strict';
/* Användarbeslut 2026-10-22: den som nått nivå 5 ska inte åka ner för ett enstaka fel.
   Sedan 2026-11-05 prövas beslutet mot nivåmotorn (docs/ADAPTIVITET_ANALYS_2026-11-05.md). */
const test=require('node:test'),assert=require('node:assert/strict');
const {nivamotor,nivaAndelar}=require('./nivamotor-hjalp.js');

/* En elev som klarat de flesta uppgifter upp till och med nivå 5 i området. */
function nattNiva5(){
  const history=[];
  for(const L of ['1','2','3','4','5']) for(let i=0;i<6;i++) history.push({id:`${L}-${i}`,ok:!(L==='5'&&i===2),area:'A'});
  const c=nivamotor({cp:{areas:{},families:{},history,levels:{}}});
  c.formagaLas('A');
  return c;
}
const svara=(c,L,ok)=>{
  c.formagaUppdatera({omr:'A',traningsniva:Number(L)},ok?1:0);
  if(ok) c.state.formFel=0; else {c.state.formFel++;c.state.formFelNiva=L;}
};

test('Den som nått nivå 5 tränar mest på nivå 5',()=>{
  const m=nivaAndelar(nattNiva5(),'A');
  assert.ok(m['5']>.5 && m['5']>m['4'] && m['4']>m['3'],JSON.stringify(m));
});

test('Ett fel på nivå 5 gör inte nivå 5 ovanlig',()=>{
  const c=nattNiva5();svara(c,'5',false);
  const m=nivaAndelar(c,'A');
  assert.ok(m['5']>.4 && m['5']>m['3'],JSON.stringify(m));
});

test('Ett fel på nivå 4 stänger inte nivå 5',()=>{
  const c=nattNiva5();svara(c,'4',false);
  assert.ok(nivaAndelar(c,'A')['5']>.35);
});

test('Två fel i rad ger en lättare uppgift, och ett rätt svar tar eleven tillbaka',()=>{
  const c=nattNiva5();svara(c,'5',false);svara(c,'5',false);
  const efter=nivaAndelar(c,'A');
  assert.ok(efter['5']<.3,JSON.stringify(efter));
  svara(c,'4',true);
  assert.ok(nivaAndelar(c,'A')['5']>.35);
});
