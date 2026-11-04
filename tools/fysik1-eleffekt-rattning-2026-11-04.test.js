'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];
for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c);}
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1),c);
for(const name of names){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}

const bankContext={window:{}};
vm.runInNewContext(fs.readFileSync(process.env.FY1_BANK||path.join(__dirname,'../uppgifter.js'),'utf8'),bankContext);
const task=bankContext.window.BANK.find(q=>q.id==='8.659');
const mark=s=>c.fysikVardesiffrorRatt(s,task.rättSvar,task.svarEnhet,task,0,task.svarFormat);
test('8.659 godtar korrekta avrundningar av oavrundad spänningsgräns',()=>{
 assert.ok(Math.abs(task.rättSvar-500*Math.sqrt(.5/400))<1e-12);
 for(const answer of ['20','18','17,7','17.68','17.678','17,678 V'])assert.equal(mark(answer),true,answer);
 for(const answer of ['17.70','17.700','17.6','17.679','17.68 A'])assert.equal(mark(answer),false,answer);
});
