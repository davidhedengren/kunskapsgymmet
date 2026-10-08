'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const c=vm.createContext({});
for(const name of ['stadaSvar','taltolk','talAv','helTalvarde','skalaAv']){
  const start=html.indexOf(`function ${name}(`);
  vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
}
test('Längdskala kan anges som tal, procent, bråk eller förhållande',()=>{
  for(const input of ['2','200%','200 %','2/1','2:1','2,0'])assert.equal(c.skalaAv(input),2,input);
  for(const input of ['1:2','1/2','50%','0,5'])assert.equal(c.skalaAv(input),.5,input);
  for(const input of ['200','2%','1:2'])assert.notEqual(c.skalaAv(input),2,input);
});
test('Ogiltiga och ofullständiga skalor blir inte ett giltigt tal',()=>{
  for(const input of ['2:','2/','2:0','200%%','x','2:1:1'])assert.ok(!Number.isFinite(c.skalaAv(input)),input);
});
