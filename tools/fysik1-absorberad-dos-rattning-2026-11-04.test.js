'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['normalizeDecimalComma','explicitMultiplikation','isPureNumberExpression','numericValue','tillNerdamer','normalizeMathInput','rotListor','rotVarde','latexToPlain','helTalvarde','normaliseraGrundpotens','utanEnhet','rotListaRatt','formatRatt','enhetsJamforelse','rentNumerisktSvar','talAv','hogerled','naraNog','numerisktSvar','friAvrundningRatt','metadataForDel','expandGameTask','faltVarde','faltFlagga','svarsPlan','arLatexSvar','latexElevsvar','delSvarRatt','delSvarRattBas','stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];
for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c);}
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1),c);
for(const name of names){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}

{const i=html.indexOf('const MATTEFUNKTIONER=');vm.runInContext(html.slice(i,html.indexOf(';',i)+1),c);}
const bankContext={window:{}};
vm.runInNewContext(fs.readFileSync(process.env.FY1_BANK||path.join(__dirname,'../uppgifter.js'),'utf8'),bankContext);
const q=id=>bankContext.window.BANK.find(x=>x.id===id);
const grade=(id,input,idx=0)=>{const t=q(id),multi=Array.isArray(t.rättSvar);return c.delSvarRatt(input,multi?t.rättSvar[idx]:t.rättSvar,multi?t.svarEnhet[idx]:t.svarEnhet,multi?t.tolerans[idx]:t.tolerans,t,idx,t.svarFormat||'numeriskt');};
test('Dosenheter och egna delkort rättas med konsumentens verkliga funktioner',()=>{
 const cases=[['9.152','0,5 mGy',true],['9.152','0,0005 Gy',true],['9.152','0,5 Gy',false],['9.153','8,4 mJ',true],['9.153','0,0084 J',true],['9.154','2,5 kg',true],['9.157','6,5 mGy',true],['9.158','0,006 Gy',true],['9.363','0,00048 K',true],['9.363','0,00048 °C',true],['9.363','273 K',false],['9.368','7,46e-7 Gy',true],['9.369','8,78e16',true],['9.383','3,012e6 Gy',true],['8.614','8 V',true],['8.615','45 mA',true],['8.619','1,8 W',true]];
 for(const[id,s,want]of cases)assert.equal(grade(id,s),want,id+' '+s);
 for(const[id,index,input]of [['9.97',1,'3,57 mGy'],['9.373',1,'0,101 J'],['9.373',2,'1,01 Gy'],['9.380',1,'2,1 J']]){
  const card=c.expandGameTask(q(id))[index];assert.ok(card);assert.equal(c.delSvarRatt(input,card.rättSvar,card.svarEnhet,card.tolerans,card,0,card.svarFormat),true,id+index);
 }
});
