'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const c=vm.createContext({stadaSvar:x=>String(x).trim()});
const start=html.indexOf('const SI_PREFIX=');
vm.runInContext(html.slice(start,html.indexOf('\nfunction numerisktSvar(',start)),c);
for(const name of ['enhetMedOrd','delSvarRattBas']){
 const p=html.indexOf(`function ${name}(`);assert.ok(p>=0);
 vm.runInContext(html.slice(p,html.indexOf('\n}',p)+2),c);
}
const grade=(input,format='numeriskt',value=75.53846153846153,tol=1.13)=>
 c.delSvarRattBas(input,value,'%',tol,{},0,format);
test('Procentenheten godtar procenttal och motsvarande andel utan procenttecken',()=>{
 for(const format of ['numeriskt','procent'])
  for(const input of ['75,54 %','76%','76 procent','76','0,76'])
   assert.equal(grade(input,format),true,format+' / '+input);
});
test('Ett explicit procenttal får inte skalas hundra gånger till',()=>{
 for(const format of ['numeriskt','procent'])
  for(const input of ['0,76 %','7553,85 %','46 %','75,54 W','76 /'])
   assert.equal(grade(input,format),false,format+' / '+input);
});
test('Små procenttal och toleransen jämförs i procentenheten',()=>{
 assert.equal(grade('0,76 %','numeriskt',0.755,0.01),true);
 assert.equal(grade('0,0076','numeriskt',0.755,0.01),true);
 assert.equal(grade('76 %','numeriskt',0.755,0.01),false);
 assert.equal(grade('78 %'),false);
});
