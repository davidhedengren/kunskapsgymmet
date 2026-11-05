'use strict';const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');const html=fs.readFileSync('index.html','utf8'),c=vm.createContext({});vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['brakAv','rentBrakSvar','raknTolka','normalizeDecimalComma','explicitMultiplikation','isPureNumberExpression','numericValue','tillNerdamer','normalizeMathInput','rotListor','rotVarde','latexToPlain','helTalvarde','normaliseraGrundpotens','utanEnhet','rotListaRatt','formatRatt','enhetsJamforelse','rentNumerisktSvar','talAv','hogerled','naraNog','numerisktSvar','friAvrundningRatt','metadataForDel','expandGameTask','faltVarde','faltFlagga','svarsPlan','arLatexSvar','latexElevsvar','delSvarRatt','delSvarRattBas','stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c)}let i=html.indexOf('const FORMEL_FN=');vm.runInContext(html.slice(i,html.indexOf(';',i)+1),c);for(const n of names){const a=html.indexOf(`function ${n}(`);assert.ok(a>=0,n);vm.runInContext(html.slice(a,html.indexOf('\n}',a)+2),c)}i=html.indexOf('const MATTEFUNKTIONER=');vm.runInContext(html.slice(i,html.indexOf(';',i)+1),c);
vm.runInContext('let delSvarDjup=0;',c);
const b={window:{}};vm.runInNewContext(fs.readFileSync(process.env.MA1_BANK||'uppgifterma1.js','utf8'),b);
const qs=b.window.BANKMA1.filter(q=>q.kap===0 && Number(q.id.split('.')[1])>=1266 && Number(q.id.split('.')[1])<=1301);
function grade(q,v){return c.delSvarRatt(v,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)}
test('108 fristående kort: korrekta svar, verktyg och ett svarsfält',()=>{
 assert.equal(qs.length,36);let count=0;
 for(const parent of qs){const cards=c.expandGameTask(parent);assert.equal(cards.length,3,parent.id);
 for(const [i,q] of cards.entries()) {count++;assert.equal(Array.isArray(q.rättSvar),false);assert.equal(c.svarsPlan(q).rutor.length,1);assert.equal(c.svarsPlan(q).delar[0].auto,true);assert.equal(q.rättSvar,parent.rättSvar[i]);assert.equal(q.miniräknare,parent.miniräknare);assert.equal(q.geogebra,false);
  assert.equal(grade(q,String(q.rättSvar)),true,q.id+' '+q.rättSvar);
  assert.equal(grade(q,'999999'),false,q.id+' felvärde');if(typeof q.rättSvar==='number') assert.equal(grade(q,String(q.rättSvar+1)),false,q.id+' närliggande fel');
  if(q.svarFormat==='bråk' && String(q.rättSvar).includes('/')){
   const [a,b]=q.rättSvar.split('/').map(Number);
   for(const v of [`${2*a}/${2*b}`,`(${a})/(${b})`,String.raw`\frac{${a}}{${b}}`]) assert.equal(grade(q,v),true,q.id+' '+v);
   assert.equal(grade(q,`${a+1}/${b}`),false,q.id+' fel täljare');
  }
  if(q.svarEnhet==='%'){
   assert.equal(grade(q,q.rättSvar+'%'),true,q.id+' procenttecken');
   assert.equal(grade(q,(q.rättSvar*100)+'%'),false,q.id+' fel procent');
   assert.equal(grade(q,q.rättSvar+' kr'),false,q.id+' fel enhet');
  }
 }}assert.equal(count,108);
});
