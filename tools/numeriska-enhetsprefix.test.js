'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
const start=html.indexOf('const SI_PREFIX='),end=html.indexOf('\nfunction numerisktSvar(',start);vm.runInContext(html.slice(start,end),c);
for(const name of ['stadaSvar','hogerled','enhetMedOrd','delSvarRattBas']){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}
for(const name of ['naraNog','talAv','rentNumerisktSvar']){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}
const grade=(answer,value,unit,tolerance=0)=>c.delSvarRattBas(answer,value,unit,tolerance,{t:''},0,'numeriskt');
test('Numeriska svar räknar hela prefixet innan någon enhet tas bort',()=>{
 for(const [value,unit,good,bad]of [[412.44,'Pa','0,412 kPa','412 kPa'],[180,'N','0,180 kN','180 kN'],[1200,'J','1,2 kJ','1200 kJ'],[40,'W','0,040 kW','40 kW'],[.002,'C','2 mC','0,002 mC'],[3,'m','0,003 km','3 km']]){
  const tol=value===412.44?.5:0;assert.equal(grade(good,value,unit,tol),true,good);assert.equal(grade(bad,value,unit,tol),false,bad);
 }
});
test('Rätt tryck i alternativa enheter och vetenskaplig notation godtas; fel dimension avvisas',()=>{
 for(const answer of ['412 Pa','412,44 Pa','4.12e2 Pa','0,412 kPa','412 pascal','4.12x10^+02 Pa','4.12*10^(+2) Pa','4.12x10^-1 kPa'])assert.equal(grade(answer,412.44,'Pa',.5),true,answer);
 for(const answer of ['412 N','412 W','413 Pa','-412 Pa','412 MPa'])assert.equal(grade(answer,412.44,'Pa',.5),false,answer);
 for(const answer of ['4.12x10^+02 kPa','4.12*10^+02 kPa','4.12x10^-1 MPa'])assert.equal(grade(answer,412.44,'Pa',.5),false,answer);
});
test('Bokstaven x fungerar som gånger i numerisk grundpotensform, med rätt prefix och dimension',()=>{
 const meta={format:'numeriskt',enhet:'Pa',tolerans:50};
 for(const answer of ['1,72x10^4','1.72 X 10^(4) Pa','1,72x10⁴ Pa','1,72x10^1 kPa','1.72x10^+04 Pa','1.72*10^(+4) Pa'])
  assert.equal(c.rentNumerisktSvar(answer,1060*9.82*1.65,meta),true,answer);
 for(const answer of ['1,72x10^3 Pa','1,72x10^4 kPa','1,72x10^4 N','1,72x10^','17200x','1,72x10^4+1','1,72xx10^4','1,72x10^4x'])
  assert.equal(c.rentNumerisktSvar(answer,1060*9.82*1.65,meta),false,answer);
 assert.equal(c.rentNumerisktSvar('1.6x10^+00 kN',1.6168,{...meta,enhet:'N',tolerans:.05}),false);
 assert.equal(c.rentNumerisktSvar('5.52x10^-01 km',.551845,{...meta,enhet:'m',tolerans:.0005}),false);
});
