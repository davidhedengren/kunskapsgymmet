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
for(const track of ['2a','2b','2c'])test('Ma'+track+': varje område visas exakt en gång och metoder får egna kort',()=>{
 const c=setup(track),cards=c.getCards();
 assert.deepEqual(Array.from(cards).flatMap(k=>Array.from(k.omr)).sort(),c.getAreas().map(a=>a.key).sort());
 for(const key of ['substitutionsmetoden','additionsmetoden','faktorisering','nollproduktmetoden','standardavvikelse','ladagram']){
  assert.deepEqual(Array.from(cards.find(k=>k.key===key).omr),[key]);
 }
 const rules=cards.find(k=>k.name==='Konjugatregeln och kvadreringsreglerna');
 assert.deepEqual(Array.from(rules.omr),['konjugatregeln','kvadreringsreglerna']);
 assert.ok(!cards.some(k=>['g:ekvationssystem','g:andragradsekvationer','g:lages_spridningsmatt'].includes(k.key)));
 const legacy=c.hittaTraningskort('g:ekvationssystem');
 assert.ok(legacy.omr.includes('substitutionsmetoden'));
 assert.equal(legacy.omr.includes('ekvationssystem_tre_obekanta'),track==='2c');
 assert.equal(c.hittaTraningskort('g:okand'),null);
 assert.equal(c.hittaTraningskort('okand'),null);
 c.state.data.grupp={};assert.equal(c.hittaTraningskort('g:ekvationssystem'),null);
});
