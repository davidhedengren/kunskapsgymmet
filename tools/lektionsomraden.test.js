'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
function setup(track){
 const c=vm.createContext({window:{},state:{track,data:{}},Set});
 vm.runInContext(fs.readFileSync(path.join(root,'strukturma2.js'),'utf8'),c);
 c.state.data.grupp=c.window.GRUPPMA2;
 c.getAreas=()=>Object.entries(c.window.OMRMA2).flatMap(([kap,areas])=>Object.entries(areas)
  .filter(([key])=>c.window.SPARMA2[kap][key].includes(c.state.track))
  .map(([key,name])=>({key,name,kap:Number(kap),families:new Set([key+' variant'])})));
 for(const name of ['getCards','hittaTraningskort']){
  const i=html.indexOf('function '+name+'(');vm.runInContext(html.slice(i,html.indexOf('\n}',i)+2),c);
 }
 return c;
}
function gemensamt(c,track){
 const cards=c.getCards();
 assert.deepEqual(Array.from(cards).flatMap(k=>Array.from(k.omr)).sort(),c.getAreas().map(a=>a.key).sort());
 assert.ok(!cards.some(k=>['g:ekvationssystem','g:andragradsekvationer','g:lages_spridningsmatt'].includes(k.key)));
 const legacy=c.hittaTraningskort('g:ekvationssystem');
 assert.ok(legacy.omr.includes('substitutionsmetoden'));
 assert.equal(legacy.omr.includes('ekvationssystem_tre_obekanta'),track==='2c');
 assert.equal(c.hittaTraningskort('g:okand'),null);
 assert.equal(c.hittaTraningskort('okand'),null);
 return cards;
}
for(const track of ['2a','2b'])test('Ma'+track+': varje område visas exakt en gång och metoder får egna kort',()=>{
 const c=setup(track),cards=gemensamt(c,track);
 for(const key of ['substitutionsmetoden','additionsmetoden','faktorisering','nollproduktmetoden','standardavvikelse','ladagram']){
  assert.deepEqual(Array.from(cards.find(k=>k.key===key).omr),[key]);
 }
 const rules=cards.find(k=>k.name==='Konjugatregeln och kvadreringsreglerna');
 assert.deepEqual(Array.from(rules.omr),['konjugatregeln','kvadreringsreglerna']);
 c.state.data.grupp={};assert.equal(c.hittaTraningskort('g:ekvationssystem'),null);
});
// ST03: Ma2c har ett kort per avsnitt i planeringen, med delmoment inuti.
test('Ma2c: ett kort per planeringsavsnitt och äldre kortnycklar fungerar',()=>{
 const c=setup('2c'),cards=gemensamt(c,'2c');
 assert.ok(cards.length>=25&&cards.length<=32,'antal kort '+cards.length);
 const omrFor=namn=>Array.from(cards.find(k=>k.name===namn).omr);
 assert.deepEqual(omrFor('Lösa linjära ekvationssystem'),['linjara_ekvationssystem','grafisk_losning_ekvationssystem','substitutionsmetoden','additionsmetoden']);
 assert.deepEqual(omrFor('Uttryck med parenteser och faktorisering'),['multiplicera_parenteser','konjugatregeln','kvadreringsreglerna','faktorisering']);
 assert.deepEqual(omrFor('Logaritmer'),['logaritmbegreppet','logaritmlagar']);
 for(const key of ['funktionsskrivsatt_rep','standardavvikelse','regressionsanalys_olika_modeller'])
  assert.deepEqual(Array.from(cards.find(k=>k.key===key).omr),[key]);
 // ST01: randvinklar och kordasatsen ligger i olika kort i 2c.
 assert.deepEqual(omrFor('Yttervinkelsatsen och randvinklar'),['yttervinkelsatsen','randvinkel_medelpunkt']);
 assert.deepEqual(omrFor('Kordasatsen och bisektrissatsen'),['kordasatsen_biskarningssatsen']);
 assert.ok(!cards.some(k=>k.key==='g:konjugat_kvadrering'));
 // Sparade uppdrag med tidigare kortnycklar.
 assert.deepEqual(Array.from(c.hittaTraningskort('substitutionsmetoden').omr),['substitutionsmetoden']);
 assert.deepEqual(Array.from(c.hittaTraningskort('g:konjugat_kvadrering').omr),['konjugatregeln','kvadreringsreglerna']);
 assert.deepEqual(Array.from(c.hittaTraningskort('g:randvinkel_medelpunkt').omr),['randvinkel_medelpunkt']);
 c.state.data.grupp={};assert.equal(c.hittaTraningskort('g:ekvationssystem'),null);
});
