'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({window:{},hjalp:{grader:true},delSvarDjup:0});
vm.runInContext(html.slice(html.indexOf('const MATTEFUNKTIONER='),html.indexOf('function explicitMultiplikation(')),c);
for(const name of ['latexToPlain','normalizeDecimalComma','normalizeMathInput','explicitMultiplikation','isPureNumberExpression','tillNerdamer','numericValue','raknTolka','stadaSvar','antalSattRatt','arLatexSvar','latexElevsvar','delSvarRatt']){
 const i=html.indexOf(`function ${name}(`);assert.ok(i>=0,name);vm.runInContext(html.slice(i,html.indexOf('\n}',i)+2),c);
}
c.delSvarRattBas=()=>{throw Error('Sätt får inte gå vidare till allmän numerisk tolerans');};
const check=(s,n)=>c.delSvarRatt(s,n,null,0,{},0,'antal_satt');
test('Antal ordningar godtar tal, fakultet, produkt och likhetskedjor',()=>{
 for(const s of ['720','720,0','720 sätt','720sätt','720 ordningar','720 olika sätt','6!','6! sätt','6! ordningar','(3+3)!','6*5*4*3*2*1','6·5·4·3·2·1','6! = 720','720=6!','6!=6*5*4*3*2*1=720','6! sätt = 720 sätt','svar: 720','antal sätt = 6! = 720','n=720','x=720','\\(6!=720\\)'])assert.equal(check(s,720),true,s);
});
test('Varje led måste vara korrekt; avrundade och bråkiga antal underkänns',()=>{
 for(const s of ['721','720.01','720.00001','719.99999','720 personer','720 kg','720 procent','720!','5!','7!','6!!','(-6)!','2.5!','6!x','720x','6!=721','5!=720','120=720','6!=','720==720','=720','sin(0)=720','lg(720)=720','720/0','720+','720<script>bad</script>','n=5!=720'])assert.equal(check(s,720),false,s);
});
test('Fem andra ordningssituationer har samma exakta svarsregler',()=>{
 for(const [expression,count]of [['5!',120],['7!',5040],['2*8!',80640],['4!',24],['8!/5!',336]]){
  for(const s of [expression,String(count),`${expression}=${count}`,`${expression} sätt`])assert.equal(check(s,count),true,s);
  for(const s of [String(count+1),String(count+.01),`${expression}=${count+1}`])assert.equal(check(s,count),false,s);
 }
 assert.equal(check('0',0),true);assert.equal(check('0!=0',0),false);
 assert.equal(check('1',-1),false);assert.equal(check('1',1.5),false);assert.equal(check('1',Infinity),false);
});
test('Fysik och andra numeriska enheter behåller tidigare rättningsväg',()=>{
 const seen=[];c.delSvarRattBas=(...args)=>{seen.push(args);return true;};
 for(const [format,unit]of [['numeriskt','N'],['numeriskt',null],['grader','°'],['uttryck',null]])assert.equal(c.delSvarRatt('720.01',720,unit,.05,{},0,format),true);
 assert.equal(seen.length,4);
});
