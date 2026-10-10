'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const start=html.indexOf('const SI_PREFIX='),end=html.indexOf('\nfunction numerisktSvar(',start),c=vm.createContext({});
vm.runInContext(html.slice(start,end),c);
test('Elektriskt fält: N/C och V/m har samma dimension och skala',()=>{
 for(const unit of ['N/C','V/m'])for(const input of ['20000 N/C','20000 V/m','20 kN/C','20 kV/m','200 V/cm','0,2 kV/cm'])
  assert.equal(c.enhetsJamforelse(input,20000,unit,1e-8),true,input+' → '+unit);
 for(const input of ['20000 N','20000 V','20000 C','20000 V/cm','20 V/m','20000 C/N'])
  assert.equal(c.enhetsJamforelse(input,20000,'N/C',1e-8),false,input);
});
test('Laddning och spänning behåller prefix, Ah-omvandling och fysikalisk dimension',()=>{
 for(const [input,value,unit]of [['2 Ah',7200,'C'],['2 C',2,'A*s'],['3 µC',3e-6,'C'],['12 J/C',12,'V'],['12000 mV',12,'V'],['24 V*C',24,'J']])
  assert.equal(c.enhetsJamforelse(input,value,unit,Math.abs(value)*1e-8),true,input);
 for(const [input,value,unit]of [['2 A',2,'C'],['2 C',2,'V'],['12 J',12,'V'],['3 mC',3e-6,'C']])
  assert.equal(c.enhetsJamforelse(input,value,unit,Math.abs(value)*1e-8),false,input);
});
