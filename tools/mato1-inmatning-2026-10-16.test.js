'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({window:{},rk:{ans:0},hjalp:{grader:true},state:{course:'mato1'},COURSES:{mato1:{subject:'Matematik'},fy1:{subject:'Fysik'}}});
vm.runInContext(html.slice(html.indexOf('const MATTEFUNKTIONER='),html.indexOf('function explicitMultiplikation(')),c);
for(const name of ['latexToPlain','normalizeDecimalComma','normalizeMathInput','explicitMultiplikation','isPureNumberExpression','tillNerdamer','numericValue','raknTolka','stadaSvar','numerisktSvar','sifferlage']){
 const start=html.indexOf(`function ${name}(`);assert.ok(start>=0,name);vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
}
const value=s=>c.numericValue(c.tillNerdamer(c.normalizeMathInput(s)));
test('Rotknappens √ stöder nästlade parenteser och fungerar som sqrt',()=>{
 for(const [input,want] of [['√((9/4))',1.5],['2√((9))',6],['√(1+√((9)))',2],['√((9)+(7))',4],['1/√((4))',.5],['√((2))',Math.SQRT2]])assert.ok(Math.abs(value(input)-want)<1e-12,input);
 assert.equal(c.normalizeMathInput('3√((x))/2-6/x²'),c.normalizeMathInput('3sqrt((x))/2-6/x^2'));
 for(const input of ['√((9/4)','√(9))','√()','√((4))+','√(alert(1))','√(x)'])assert.ok(Number.isNaN(value(input)),input);
});
test('Exakta svar behåller hela mobiltangentbordet trots ett numeriskt facit',()=>{
 for(const q of [{t:'Svara exakt.'},{t:'Ange x exakt eller med tre decimaler.'},{t:'Bestäm det exakta värdet.'}])assert.equal(c.sifferlage(.6931471805599453,null,'numeriskt',q),false);
 assert.equal(c.sifferlage(12,null,'numeriskt',{t:'Ange ett tal.'}),true);
 assert.equal(c.sifferlage(12,null,'uttryck',{t:'Bestäm derivatan.'}),false);
 assert.equal(c.sifferlage(12,'m','numeriskt',{t:'Ange längden.'}),false);
 c.state.course='fy1';assert.equal(c.sifferlage(12,null,'numeriskt',{t:'Beräkna farten.'}),false);
});
