'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');const c=vm.createContext({stadaSvar:x=>String(x).trim(),hogerled:x=>x,rentNumerisktSvar:(x,y,meta)=>Math.abs(Number(x.replace(',','.'))-Number(y))<=(meta.tolerans||0)});const start=html.indexOf('function formatRatt(');vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
const grade=x=>c.formatRatt(x,.12/.0043,{format:'temperaturandring',enhet:'K',tolerans:.7});
test('Temperaturändring godtar samma tal i kelvin och grader Celsius',()=>{for(const x of ['28','28 K','28 °C','28 ℃','27,9°C','2.8e1 K'])assert.equal(grade(x),true,x);});
test('Temperaturändring använder ingen 273-omvandling och godtar inte fel enhet',()=>{for(const x of ['301 K','28 V','28 A','28 °C extra','0 K','-28 K'])assert.equal(grade(x),false,x);assert.equal(c.formatRatt('28°C',28,{format:'temperaturandring',enhet:'V'}),false);});
