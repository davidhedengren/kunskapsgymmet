'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

// Använd samma parser som appen, inklusive dess normalisering av elevsvar.
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const context=vm.createContext({});
for(const name of ['stadaSvar','forenklatPolynom','sammaForenkladePolynom']){
  const start=html.indexOf(`function ${name}(`);
  assert.ok(start>=0,`Saknar ${name}`);
  vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),context);
}
const correct=(answer,expected)=>context.sammaForenkladePolynom(answer,expected);

test('Stora variabelbokstäver godtas utan att förenklingskravet försvinner',()=>{
  for(const [answer,expected] of [['10X+3','10x+3'],['3+10X','10x+3'],['5A-5','5a-5'],['Y+11','y+11'],['X/3','x/3'],['3YX','3xy']])
    assert.ok(correct(answer,expected),answer);
  for(const [answer,expected] of [['10X+4','10x+3'],['7X+5+3X-2','10x+3'],['X+x','2x'],['3X/9','x/3'],['10Y+3','10x+3']])
    assert.equal(correct(answer,expected),false,answer);
});

test('Reducerade bråkkoefficienter och vanliga skrivsätt godkänns',()=>{
  for(const answer of ['x/3','(x)/3','x/(3)','(x)/(3)','(1/3)*x','(1/3)x','1/3*x','\\frac{x}{3}','Svar: x / 3'])
    assert.ok(correct(answer,'x/3'),answer);
  for(const answer of ['5x/2','(5x)/2','5/2*x','(5/2)*x','2,5x','2.5*x'])
    assert.ok(correct(answer,'5x/2'),answer);
  for(const answer of ['-x/6','−x/6','-(1/6)*x','-1/6*x','(-1/6)*x','(-x)/6','\\frac{-x}{6}'])
    assert.ok(correct(answer,'-x/6'),answer);
});
test('Oförkortade bråk och osamlade termer är inte färdiga svar',()=>{
  for(const [answer,expected] of [
    ['3x/9','x/3'],['2x/6','x/3'],['6x/8','3x/4'],['4/2','2'],
    ['x/1','x'],['2x+x','3x'],['x/6+x/6','x/3'],['0.5x/1.5','x/3'],
    ['4x/2+2x/4','5x/2'],['(2x+6)/2','x+3'],['(x+4)/2-x/2','2'],
    ['x/2/3','x/6'],['x/2*3','x/6']])
    assert.equal(correct(answer,expected),false,answer);
});
test('Fel värde, ogiltig syntax och farliga strängar underkänns',()=>{
  for(const answer of ['x/2','1/3','x/0','x/-3','x/3)','(x/3','x/(3','(x)/3)',
    'x//3','x/03','x/3+','x/3-','x/3+0','x^0/3','x^101/3','xx/3',
    'alert(1)','process.exit()','x/3;1','x'.repeat(301)])
    assert.equal(correct(answer,'x/3'),false,answer);
});
test('Tidigare heltals-, decimal- och polynomsvar fungerar som förut',()=>{
  for(const [answer,expected] of [
    ['3+x','x+3'],['2','2'],['0','0'],['2,5x','2.5*x'],
    ['-2x^2+3x-1','3x-1-2x²'],['3yx','3xy'],['2*x^2','2x²']])
    assert.ok(correct(answer,expected),answer);
  for(const [answer,expected] of [['x+x','2x'],['(x+3)','x+3'],['x*x','x²'],['x+0','x']])
    assert.equal(correct(answer,expected),false,answer);
});
test('Exakta rationella koefficienter jämförs utan avrundning',()=>{
  assert.ok(correct('x/2+1/3','1/3+0.5x'));
  assert.equal(correct('0.3333333333333333x','x/3'),false);
  assert.equal(correct('x/99999999999999999999','x/99999999999999999998'),false);
});
