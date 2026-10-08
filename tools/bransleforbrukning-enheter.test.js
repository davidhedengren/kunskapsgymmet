'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const start=html.indexOf('const SI_PREFIX=');
const end=html.indexOf('\nfunction numerisktSvar(',start);
assert.ok(start>=0 && end>start);
const c=vm.createContext({});
vm.runInContext(html.slice(start,end),c);
const grade=(input)=>c.enhetsJamforelse(input,6.8,'liter per 100 km',1e-6);
test('Liter per 100 km accepterar vanliga symboler och utskriven enhet',()=>{
  for(const input of ['6,8 liter per 100 km','6.8 l/100km','6,8 L / 100 km','6.8 liter/100 km'])
    assert.equal(grade(input),true,input);
  assert.equal(grade('6,8'),true);
});
test('Förbrukning jämförs med korrekt skala och dimension',()=>{
  assert.equal(grade('0,068 l/km'),true);
  for(const input of ['6.8 l/km','6.8 l','6.8 km','6.8 l/100m','6.9 l/100km'])
    assert.equal(grade(input),false,input);
});
test('Befintliga SI-prefix och härledda enheter behåller sin skala',()=>{
  assert.equal(c.enhetsJamforelse('1,035 kW',1035,'W',1e-10),true);
  assert.equal(c.enhetsJamforelse('1035 mW',1035,'W',1e-10),false);
  assert.equal(c.enhetsJamforelse('1 liter',1,'dm³',1e-10),true);
});
