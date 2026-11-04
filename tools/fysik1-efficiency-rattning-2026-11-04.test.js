'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['metadataForDel','expandGameTask','faltVarde','faltFlagga','svarsPlan','arLatexSvar','latexElevsvar','delSvarRatt','delSvarRattBas','stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];
for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c);}
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1),c);
for(const name of names){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}

const bankContext={window:{}};
vm.runInNewContext(fs.readFileSync(process.env.FY1_BANK||path.join(__dirname,'../uppgifter.js'),'utf8'),bankContext);
const q=id=>bankContext.window.BANK.find(x=>x.id===id);
const grade=(id,input,idx=0)=>{const t=q(id),multi=Array.isArray(t.rättSvar);return c.delSvarRatt(input,multi?t.rättSvar[idx]:t.rättSvar,multi?t.svarEnhet[idx]:t.svarEnhet,multi?t.tolerans[idx]:t.tolerans,t,idx,'numeriskt');};
test('Alla tolv nya uppgifter rättas med riktiga enhets- och precisionsfunktioner',()=>{
 const cases=[['8.727',['400','0,4 kJ'],['500 J']],['8.728',['0,40 W','400 mW'],['2.4 W']],['8.729',['21 J'],['7.5 J']],['8.730',['1,4','1.417'],['1.19']],['8.731',['44,4 %'],['66.7 %']],['8.732',['16 s','15.71','15.70','15.68'],['13.09 s']],['8.733',['8.5 ohm'],['8 Ω']],['8.734',['2,25 W'],['1.5 W']],['8.735',['2 Ω'],['0.5 Ω']],['8.736',['1,44 W'],['2.25 W']],['8.737',['0,30 Ω'],['1.2 Ω']],['8.738',['3'],['9']]];
 for(const[id,yes,no]of cases){for(const s of yes)assert.equal(grade(id,s),true,id+' '+s);for(const s of no)assert.equal(grade(id,s),false,id+' '+s);}
 assert.equal(grade('8.735','66.7 %',1),true);assert.equal(grade('8.735','33.3 %',1),false);
 assert.equal(grade('8.728','0.4 A'),false);
});
test('8.735 har två ordnade namngivna fält; 8.45 har fyra fristående kort',()=>{
 const plan=c.svarsPlan(q('8.735'));
 assert.equal(plan.delar.length,2);assert.equal(plan.delar[0].enhet[0],'Ω');assert.equal(plan.delar[1].enhet[0],'%');
 const cards=c.expandGameTask(q('8.45'));assert.equal(cards.length,4);
 for(const card of cards){assert.ok(card.t);assert.ok(card.s.includes('facit-steglista'));assert.ok(card.ledtrad);}
});
