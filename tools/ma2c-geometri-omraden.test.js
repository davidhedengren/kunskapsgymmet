'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const c=vm.createContext({window:{},state:{track:'2c',data:{}},getAreas:()=>[
 {key:'randvinkel_medelpunkt',kap:3,name:'Randvinklar och medelpunktsvinklar',families:new Set(['Randvinkel'])},
 {key:'kordasatsen_biskarningssatsen',kap:3,name:'Kordasatsen och bisektrissatsen',families:new Set(['Kordasatsen','Bisektrissatsen'])},
 {key:'likformighet',kap:3,name:'Likformighet',families:new Set(['Likformighet'])}
]});
vm.runInContext(fs.readFileSync(path.join(root,'strukturma2.js'),'utf8'),c);
const start=html.indexOf('function getCards(');
vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
c.state.data.grupp=c.window.GRUPPMA2;
// ST03: randvinklar ligger i 2c tillsammans med yttervinkelsatsen, men aldrig med kordasatsen.
test('Ma2c har två separata geometrikort med egna uppgiftspooler',()=>{
 c.state.track='2c';const cards=c.getCards(),r=cards.find(k=>k.name==='Yttervinkelsatsen och randvinklar'),b=cards.find(k=>k.name==='Kordasatsen och bisektrissatsen');
 assert.ok(r&&b);assert.deepEqual(Array.from(r.omr),['randvinkel_medelpunkt']);assert.deepEqual(Array.from(b.omr),['kordasatsen_biskarningssatsen']);
 assert.ok(!cards.some(k=>k.name==='Cirkelgeometri'));assert.equal(cards.length,3);
});
test('Ma2b behåller sitt samlade cirkelgeometrikort och andra kurser sina grupper',()=>{
 c.state.track='2b';assert.deepEqual(Array.from(c.getCards().find(k=>k.name==='Cirkelgeometri').omr),['randvinkel_medelpunkt','kordasatsen_biskarningssatsen']);
 assert.equal(c.getCards().length,2);
 c.state.track=null;c.state.data.grupp={3:[{id:'gemensam',namn:'Gemensam grupp',omr:['randvinkel_medelpunkt','kordasatsen_biskarningssatsen']}]};
 assert.equal(c.getCards().length,2);assert.equal(c.getCards()[0].name,'Gemensam grupp');c.state.data.grupp=c.window.GRUPPMA2;
});
