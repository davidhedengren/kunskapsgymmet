'use strict';
/* Fy2 kap 5 (2026-10-23): parsec, ljusår och AE räknas om, även med prefix (kpc). */
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({});
vm.runInContext(html.slice(html.indexOf('const SI_PREFIX='),html.indexOf('\nfunction numerisktSvar(')),c);
const names=['stadaSvar','enhetMedOrd','skrivetMattal','fysikVardesiffror','fysikVardesiffrorRatt','formelTokens','arEnhetsord','delaEnhet','formelLatex'];
for(const name of ['ENHETSBASER','ENHETSORD']){const i=html.indexOf('const '+name+'=');vm.runInContext(html.slice(i,html.indexOf('\n',i)),c);}
vm.runInContext(html.slice(html.indexOf('const FORMEL_FN='),html.indexOf(';',html.indexOf('const FORMEL_FN='))+1),c);
for(const name of names){const s=html.indexOf(`function ${name}(`);vm.runInContext(html.slice(s,html.indexOf('\n}',s)+2),c);}
const grade=(s,f,u,n=2)=>c.fysikVardesiffrorRatt(s,f,u,{t:'Bestäm avståndet.',svarVardesiffror:n},0,'numeriskt');

test('Parsec, kiloparsec, ljusår och AE',()=>{
  for(const s of ['1000 pc','1000','1 kpc','1,0 kpc','3300 ljusår','3,3·10^3 ljusår'])assert.equal(grade(s,1000,'pc'),true,s);
  for(const s of ['100 pc','1 Mpc','1000 ljusår','1000 m'])assert.equal(grade(s,1000,'pc'),false,s);
  for(const s of ['13 ljusår','13','4,0 pc'])assert.equal(grade(s,4*3.2616,'ljusår'),true,s);
  for(const s of ['206000 AE','206265 AU','2,06·10^5 AU','1,0 pc'])assert.equal(grade(s,206264.8,'AU',4),true,s);
  assert.equal(grade('206000 AE',206264.8,'AE',4),true);
});

test('Bågsekunder och bågminuter',()=>{
  for(const s of ['0,05″','0,050 bågsekunder','0,05','50 mas'.replace('50 mas','0,05 ″')])assert.equal(grade(s,0.05,'″'),true,s);
  for(const s of ['22,6″','23 bågsekunder','0,38′'])assert.equal(grade(s,22.55,'″'),true,s);
  for(const s of ['0,5″','22,6°'])assert.equal(grade(s,s.startsWith('0,5')?0.05:22.55,'″'),false,s);
});
