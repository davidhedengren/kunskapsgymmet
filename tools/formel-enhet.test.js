'use strict';
/* Felrapport fy1 5.14 (2026-10-22): "Så läses ditt svar" visade "kg m/s" som variablerna k·g·m delat med s. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
const kod=n=>{const m=new RegExp('function '+n+'\\(').exec(html);assert.ok(m,n);return html.slice(m.index,html.indexOf('\n}',m.index)+2);};
const rad=n=>{const i=html.indexOf('const '+n+'=');assert.ok(i>=0,n);return html.slice(i,html.indexOf('\n',i)).replace('const ','var ');};
const c=vm.createContext({});
for(const n of ['ENHETSBASER','ENHETSORD'])vm.runInContext(rad(n),c);
for(const n of ['arEnhetsord','delaEnhet','formelBehovs'])vm.runInContext(kod(n),c);

test('En avslutande enhet tolkas som enhet',()=>{
  for(const [svar,tal,latex] of [['24 kg m/s','24','\\mathrm{kg\\,m/s}'],['24 kg·m/s','24','\\mathrm{kg\\cdot{}m/s}'],['3,0 m/s','3,0','\\mathrm{m/s}'],
    ['9.4*10^3 J','9.4*10^3','\\mathrm{J}'],['5 m/s^2','5','\\mathrm{m/s^{2}}'],['2,5 kWh','2,5','\\mathrm{kWh}'],['20 °C','20','\\mathrm{°C}'],['0,2 mm','0,2','\\mathrm{mm}']]){
    const d=c.delaEnhet(svar);assert.ok(d,svar);assert.equal(d.tal,tal);assert.equal(d.latex,latex);
  }
});

test('Matematiska uttryck påverkas inte',()=>{
  for(const svar of ['2 x','3x','x^2+3x','2 a + b','3 y/x','5'])assert.equal(c.delaEnhet(svar),null,svar);
});

test('Förhandsvisningen behövs inte för ett enkelt tal med enhet',()=>{
  for(const svar of ['24 kg m/s','3,0 m/s','1,5 N/m','2 kg'])assert.equal(c.formelBehovs(svar),false,svar);
  for(const svar of ['5 m/s^2','9.4*10^3 J','x^2+3x','3/4'])assert.equal(c.formelBehovs(svar),true,svar);
});
