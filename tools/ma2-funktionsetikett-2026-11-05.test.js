'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const html=fs.readFileSync('index.html','utf8');
const c=vm.createContext({stadaSvar:x=>String(x).trim(),normalizeMathInput:x=>String(x).toLowerCase().replace(/(\d)([a-z])/g,'$1*$2'),algebraisktLika:(a,b)=>a.replace(/\s/g,'')===b.replace(/\s/g,'')});
let i=html.indexOf('function formatRatt(');vm.runInContext(html.slice(i,html.indexOf('\n}',i)+2),c);
test('Funktionsetikett med och utan argument accepterar samma namn och variabel',()=>{
 const grade=(a,f)=>c.formatRatt(a,f,{format:'uttryck'});
 assert.equal(grade('V(t)=2500-40t','V=2500-40t'),true);
 assert.equal(grade('V=2500-40t','V(t)=2500-40t'),true);
 assert.equal(grade('W(t)=2500-40t','V=2500-40t'),false);
 assert.equal(grade('V(x)=2500-40t','V=2500-40t'),false);
 assert.equal(grade('V(t)=2500-20t','V=2500-40t'),false);
});
