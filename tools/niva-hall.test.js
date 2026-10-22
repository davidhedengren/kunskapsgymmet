'use strict';
/* Användarbeslut 2026-10-22: den som nått nivå 5 ska inte åka ner för ett enstaka fel. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
const kod=n=>{const m=new RegExp('function '+n+'\\(').exec(html);assert.ok(m,n);return html.slice(m.index,html.indexOf('\n}',m.index)+2);};
const rad=n=>{const i=html.indexOf('const '+n+'=');assert.ok(i>=0,n);return html.slice(i,html.indexOf(';',i)+1).replace('const ','var ');};
function kontext(){
  const c=vm.createContext({});
  vm.runInContext(`var NIVAER=["1","2","3","4","5"];var state={passTyp:null};var PASS={};
    var cp={areas:{A:.8},families:{},levels:{A:{}},history:[]};function ensureCourseProfile(){return cp;}
    function getAreas(){return [{key:"A",kap:"1"}];}
    function nivaForId(id){return id.split("-")[0];}
    var behärskar = x => Math.max(0,Math.min(1,(x.s-.55)/.25)) * Math.max(0,Math.min(1,x.n/6));`,c);
  for(const n of ['NIVA_KRAV','LEDTRAD_VIKT','KAMPAR_VIKT','NIVA_GOLV','NADD_RATT','NIVA_TYNGD'])vm.runInContext(rad(n),c);
  for(const n of ['legacyLevelStat','storedLevelStat','nivaPrior','levelStats','updateLevelStat','scopeLevel','naddNiva','nivaKlarad','oppnaNivaer','kamparPa','levelWeights','levelMix'])vm.runInContext(kod(n),c);
  vm.runInContext(`for(const L of NIVAER){cp.levels.A[L]={s:.85,n:20};for(let i=0;i<4;i++)cp.history.push({id:L+"-"+i,ok:true,area:"A"});}`,c);
  return c;
}
const finns={1:true,2:true,3:true,4:true,5:true};
const svara=(c,L,ok)=>vm.runInContext(`updateLevelStat("A","${L}",${ok},1);cp.history.push({id:"${L}-x",ok:${ok},area:"A"});`,c);

test('Den som nått nivå 5 tränar mest på nivå 5',()=>{
  const m=kontext().levelMix(finns,'A');
  assert.ok(m['5']>.35 && m['5']>m['4'] && m['4']>m['3'],JSON.stringify(m));
});

test('Ett fel på nivå 5 sänker inte andelen nivå 5',()=>{
  const c=kontext();const fore=c.levelMix(finns,'A')['5'];
  svara(c,'5',false);assert.ok(c.levelMix(finns,'A')['5']>=fore);
});

test('Ett fel på nivå 4 stänger inte nivå 5',()=>{
  const c=kontext();svara(c,'4',false);
  assert.ok(c.levelMix(finns,'A')['5']>.25);
});

test('Två fel på nivå 5 ger en kort paus som slutar efter två rätt',()=>{
  const c=kontext();svara(c,'5',false);svara(c,'5',false);
  assert.ok(c.levelMix(finns,'A')['5']<.3);
  svara(c,'4',true);svara(c,'4',true);
  assert.ok(c.levelMix(finns,'A')['5']>.5);
});
