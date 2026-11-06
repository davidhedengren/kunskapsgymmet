'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');const html=fs.readFileSync('index.html','utf8'),c=vm.createContext({});vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['brakAv','rentBrakSvar','raknTolka','normalizeDecimalComma','explicitMultiplikation','isPureNumberExpression','numericValue','tillNerdamer','normalizeMathInput','rotListor','rotVarde','latexToPlain','helTalvarde','normaliseraGrundpotens','utanEnhet','rotListaRatt','formatRatt','enhetsJamforelse','rentNumerisktSvar','talAv','hogerled','naraNog','numerisktSvar','friAvrundningRatt','metadataForDel','expandGameTask','faltVarde','faltFlagga','svarsPlan','arLatexSvar','latexElevsvar','delSvarRatt','delSvarRattBas','stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex','grundpotensProvRatt','forkortatProvBrakRatt','rationelltProvTal'];for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c)}let i=html.indexOf('const FORMEL_FN=');vm.runInContext(html.slice(i,html.indexOf(';',i)+1),c);for(const n of names){const a=html.indexOf(`function ${n}(`);assert.ok(a>=0,n);vm.runInContext(html.slice(a,html.indexOf('\n}',a)+2),c)}i=html.indexOf('const MATTEFUNKTIONER=');vm.runInContext(html.slice(i,html.indexOf(';',i)+1),c);
vm.runInContext('let delSvarDjup=0;',c);
const b={window:{}};vm.runInNewContext(fs.readFileSync(process.env.MA1_BANK||'uppgifterma1.js','utf8'),b);
const nr=q=>Number(q.id.split('.')[1]);
const qs=b.window.BANKMA1.filter(q=>q.kap===0 && nr(q)>=1302 && nr(q)<=1387);
const fmt=q=>Array.isArray(q.svarFormat)?q.svarFormat[0]:q.svarFormat;
function grade(q,v){return c.delSvarRatt(v,q.rättSvar,q.svarEnhet,q.tolerans,q,0,fmt(q))}
const sv=x=>String(x).replace('.',',');
/* Ma1 kapitel 0, mängdträning 2026-11-06 (Uppgiftslabbet agent/MA1_KAP0_MANGDTRANING_2026-11-06.md):
   varje fristående kort ska godta facit och underkänna fel värden, oförkortade bråk och fel form. */
test('208 kort i 86 uppgifter: facit godtas, fel underkänns',()=>{
 assert.equal(qs.length,86);let count=0;
 for(const parent of qs){const cards=c.expandGameTask(parent);assert.equal(cards.length,(parent.spelDelar||[1]).length,parent.id);
 for(const q of cards){count++;assert.equal(Array.isArray(q.rättSvar),false,q.id);assert.equal(q.miniräknare,false);
  const v=q.rättSvar,f=fmt(q);
  if(f==='grundpotensform'){
   const e=Math.floor(Math.log10(v)+1e-9),m=+(v/10**e).toPrecision(6);
   assert.equal(grade(q,sv(m)+'·10^'+e),true,q.id);assert.equal(grade(q,sv(m)+'*10^('+e+')'),true,q.id);
   assert.equal(grade(q,sv(v)),false,q.id+' inte grundpotensform');
  } else if(typeof v==='string'){
   const [a,d]=v.split('/').map(Number);
   assert.equal(grade(q,v),true,q.id+' '+v);assert.equal(grade(q,`${a+1}/${d}`),false,q.id+' fel täljare');
   if(f==='forkortat_brak') assert.equal(grade(q,`${2*a}/${2*d}`),false,q.id+' oförkortat');
  } else {
   assert.equal(grade(q,sv(v)),true,q.id+' '+v);assert.equal(grade(q,String(v)),true,q.id+' punkt');
   if(q.svarEnhet) assert.equal(grade(q,sv(v)+' '+q.svarEnhet),true,q.id+' med enhet');
   assert.equal(grade(q,'999999'),false,q.id+' felvärde');
   if(Math.abs(v)<1e6) assert.equal(grade(q,sv(+(v+1).toPrecision(12))),false,q.id+' närliggande fel');
   if(v!==0) assert.equal(grade(q,sv(-v)),false,q.id+' fel tecken');
  }
 }}assert.equal(count,208);
});
