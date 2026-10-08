'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const context=vm.createContext({window:{},hjalp:{grader:true},rk:{ans:42}});
vm.runInContext(html.slice(html.indexOf('const MATTEFUNKTIONER='),html.indexOf('function explicitMultiplikation(')),context);
for(const name of ['latexToPlain','normalizeDecimalComma','normalizeMathInput','explicitMultiplikation','isPureNumberExpression','tillNerdamer','numericValue','raknTolka']){
 const start=html.indexOf(`function ${name}(`);assert.ok(start>=0,name);
 vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),context);
}
const value=s=>context.numericValue(context.tillNerdamer(context.normalizeMathInput(s)));
test('Exakta tal kan beräknas utan det externa algebrabiblioteket',()=>{
 for(const [input,expected] of [['pi/4',Math.PI/4],['π/4',Math.PI/4],['sqrt(2)',Math.SQRT2],['√2',Math.SQRT2],['(3+\\sqrt(33))/2',(3+Math.sqrt(33))/2],['(3+\\sqrt{33})/2',(3+Math.sqrt(33))/2],['e',Math.E],['1/e',1/Math.E],['13/16',13/16],['-1/e',-1/Math.E],['2sqrt(2)',2*Math.SQRT2],['2,5',2.5],['sin(pi/2)',1],['ln(e)',1],['lg(100)',2],['log(100)',2],['1*10^-3',.001]])
  assert.ok(Math.abs(value(input)-expected)<1e-12,input);
});
test('Självrättning kräver korrekt syntax och tar inte räknarens Ans',()=>{
 for(const input of ['pi/4)','(pi/4','sqrt(2','1/0','sqrt(-1)','x','Ans','alert(1)','1;2','2+','process.exit()'])assert.ok(Number.isNaN(value(input)),input);
});
test('Vetenskaplig notation värderas som tiopotenser även i symbolisk rättning',()=>{
 for(const [input,expected]of [['1.3470919421487604e+27',1.3470919421487604e27],['2,0206e+27',2.0206e27],['3E-19',3e-19],['-1.5e+22',-1.5e22],['2e3+4e2',2400]])
  assert.ok(Math.abs(value(input)/expected-1)<1e-12,input);
 assert.equal(value('2e^0'),2);
});
test('Räknarens gradläge och automatiska slutparentes fungerar fortfarande',()=>{
 assert.equal(context.raknTolka('sin(90)'),1);
 assert.equal(context.raknTolka('(2+3'),5);
 assert.throws(()=>context.raknTolka('(2+3',{strict:true}));
 assert.equal(context.raknTolka('log(100)'),2);
 assert.equal(context.raknTolka('Ans+1'),43);
});

for(const name of ['normalizeAnswer','algebraicallyEquivalent','oneAnswerCorrect','firstNumber']){
 const start=html.indexOf(`function ${name}(`);assert.ok(start>=0,name);
 vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),context);
}
test('Små talsvar behåller sin storlek även när algebrabiblioteket avrundar till noll',()=>{
 // Efterlikna bibliotekets avrundning; den får inte bestämma numeriska talsvar.
 context.window.nerdamer=()=>({evaluate(){return this},text(){return '0'},toString(){return '0'}});
 try{
  assert.ok(Math.abs(value('3.6e-47')/3.6e-47-1)<1e-12);
  for(const input of ['3.6e-47','3,6*10^(-47)','36e-48','3.612509042e-47'])
   assert.equal(context.oneAnswerCorrect(input,'3.6e-47',{tolerans:0.05e-47},0),true,input);
  for(const input of ['1.8e-47','0','-3.6e-47','3.7e-47','36e-47'])
   assert.equal(context.oneAnswerCorrect(input,'3.6e-47',{tolerans:0.05e-47},0),false,input);
  assert.equal(context.algebraicallyEquivalent('1.8e-47','3.6e-47'),false);
  assert.equal(context.algebraicallyEquivalent('3.6e-47','0'),false);
  assert.equal(context.algebraicallyEquivalent('36e-48','3.6e-47'),true);
 }finally{delete context.window.nerdamer;}
});
