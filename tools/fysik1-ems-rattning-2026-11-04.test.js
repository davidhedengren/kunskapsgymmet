'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['friAvrundningRatt','stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];
for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c);}
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1),c);
for(const name of names){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}

const bankContext={window:{}};
vm.runInNewContext(fs.readFileSync(process.env.FY1_BANK||path.join(__dirname,'../uppgifter.js'),'utf8'),bankContext);
const task=bankContext.window.BANK.find(q=>q.id==='8.225');
const mark=s=>c.friAvrundningRatt(s,task.rättSvar,task.svarEnhet,task,task.svarFormat);
test('8.225 godtar resistans med och utan enhet och avvisar ampere',()=>{
 assert.equal(task.svarEnhet,'Ω');
 for(const answer of ['7,3','7.30','7,3 Ω','7.3 ohm'])assert.equal(mark(answer),true,answer);
 for(const answer of ['7.3 A','8 Ω','7.2'])assert.equal(mark(answer),false,answer);
});
