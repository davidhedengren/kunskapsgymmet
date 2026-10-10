'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
const start=html.indexOf('const SI_PREFIX='),end=html.indexOf('\nfunction numerisktSvar(',start);vm.runInContext(html.slice(start,end),c);
for(const name of ['stadaSvar','hogerled','enhetMedOrd','delSvarRattBas']){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}
const grade=(answer,value,unit,tolerance=0)=>c.delSvarRattBas(answer,value,unit,tolerance,{t:''},0,'numeriskt');
test('Numeriska svar räknar hela prefixet innan någon enhet tas bort',()=>{
 for(const [value,unit,good,bad]of [[412.44,'Pa','0,412 kPa','412 kPa'],[180,'N','0,180 kN','180 kN'],[1200,'J','1,2 kJ','1200 kJ'],[40,'W','0,040 kW','40 kW'],[.002,'C','2 mC','0,002 mC'],[3,'m','0,003 km','3 km']]){
  const tol=value===412.44?.5:0;assert.equal(grade(good,value,unit,tol),true,good);assert.equal(grade(bad,value,unit,tol),false,bad);
 }
});
test('Rätt tryck i alternativa enheter och vetenskaplig notation godtas; fel dimension avvisas',()=>{
 for(const answer of ['412 Pa','412,44 Pa','4.12e2 Pa','0,412 kPa','412 pascal'])assert.equal(grade(answer,412.44,'Pa',.5),true,answer);
 for(const answer of ['412 N','412 W','413 Pa','-412 Pa','412 MPa'])assert.equal(grade(answer,412.44,'Pa',.5),false,answer);
});
