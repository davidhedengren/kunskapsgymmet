'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');const html=fs.readFileSync('index.html','utf8'),c=vm.createContext({});vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['brakAv','rentBrakSvar','raknTolka','normalizeDecimalComma','explicitMultiplikation','isPureNumberExpression','numericValue','tillNerdamer','normalizeMathInput','rotListor','rotVarde','latexToPlain','helTalvarde','normaliseraGrundpotens','utanEnhet','rotListaRatt','formatRatt','enhetsJamforelse','rentNumerisktSvar','talAv','hogerled','naraNog','numerisktSvar','friAvrundningRatt','metadataForDel','expandGameTask','faltVarde','faltFlagga','svarsPlan','arLatexSvar','latexElevsvar','delSvarRatt','delSvarRattBas','stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex','grundpotensProvRatt','forkortatProvBrakRatt','rationelltProvTal','forenklatPolynom','sammaForenkladePolynom','algebraisktLika'];for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c)}let i=html.indexOf('const FORMEL_FN=');vm.runInContext(html.slice(i,html.indexOf(';',i)+1),c);for(const n of names){const a=html.indexOf(`function ${n}(`);assert.ok(a>=0,n);vm.runInContext(html.slice(a,html.indexOf('\n}',a)+2),c)}i=html.indexOf('const MATTEFUNKTIONER=');vm.runInContext(html.slice(i,html.indexOf(';',i)+1),c);
vm.runInContext('let delSvarDjup=0;',c);
const b={window:{}};vm.runInNewContext(fs.readFileSync(process.env.MA1_BANK||'uppgifterma1.js','utf8'),b);
const nr=q=>Number(q.id.split('.')[1]);
const qs=b.window.BANKMA1.filter(q=>q.kap===1 && q.id.startsWith('1.') && nr(q)>=1623 && nr(q)<=1674);
const fmt=q=>Array.isArray(q.svarFormat)?q.svarFormat[0]:q.svarFormat;
function grade(q,v){return c.delSvarRatt(v,q.rättSvar,q.svarEnhet,q.tolerans,q,0,fmt(q))}
const sv=x=>String(x).replace('.',',');
/* Ma1 kapitel 1, mängdträning 2026-11-06 (Uppgiftslabbet agent/MA1_KAP1_MANGDTRANING_2026-11-06.md):
   varje fristående kort godtar facit och underkänner fel värden och oförenklade uttryck. */
test('120 kort i 52 uppgifter: facit godtas, fel och oförenklade svar underkänns',()=>{
 assert.equal(qs.length,52);let count=0;
 for(const parent of qs){const cards=c.expandGameTask(parent);assert.equal(cards.length,(parent.spelDelar||[1]).length,parent.id);
 for(const q of cards){count++;assert.equal(Array.isArray(q.rättSvar),false,q.id);
  const v=q.rättSvar,f=fmt(q);
  if(f==='förenklat_polynom'){
   assert.equal(grade(q,v),true,q.id+' '+v);
   const termer=v.match(/[+-]?[^+-]+/g);
   if(termer.length>1) assert.equal(grade(q,termer.map(t=>/^[+-]/.test(t)?t:'+'+t).reverse().join('').replace(/^\+/,'')),true,q.id+' annan ordning');
   const fraga=(q.t.match(/\\\((.+?)\\\)/)||[])[1];
   if(fraga && /\(/.test(fraga)) assert.equal(grade(q,fraga.replace(/\^\{(\d+)\}/g,'^$1')),false,q.id+' oförenklat: '+fraga);
   assert.equal(grade(q,v.replace(/(\d+)/,(m)=>String(Number(m)+1))),false,q.id+' fel koefficient');
  } else {
   assert.equal(grade(q,sv(v)),true,q.id+' '+v);
   assert.equal(grade(q,'999999'),false,q.id+' felvärde');
   assert.equal(grade(q,sv(v+1)),false,q.id+' närliggande fel');
   if(v!==0) assert.equal(grade(q,sv(-v)),false,q.id+' fel tecken');
  }
 }}assert.equal(count,120);
});
test('ekvationssvar får skrivas som x = …',()=>{
 for(const parent of qs.filter(p=>/ekv/.test(p.omr))) for(const q of c.expandGameTask(parent)){
  const v=(q.s.match(/facit-svar"><strong>Svar:<\/strong> \\\(([a-z])=/)||[])[1];
  assert.ok(v,q.id);assert.equal(grade(q,`${v} = ${sv(q.rättSvar)}`),true,q.id);
 }
});
