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
test('Räknarens gradläge och automatiska slutparentes fungerar fortfarande',()=>{
 assert.equal(context.raknTolka('sin(90)'),1);
 assert.equal(context.raknTolka('(2+3'),5);
 assert.throws(()=>context.raknTolka('(2+3',{strict:true}));
 assert.equal(context.raknTolka('log(100)'),2);
 assert.equal(context.raknTolka('Ans+1'),43);
});
