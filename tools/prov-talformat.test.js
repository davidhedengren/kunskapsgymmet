'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),c=vm.createContext({state:{currentTask:null},MANGD_FORMAT:new Set()});
for(const name of ['stadaSvar','hogerled','latexToPlain','rationelltProvTal','exempelBrakRatt','negativtTalparRatt','forkortatProvBrakRatt','grundpotensProvRatt','metadataForDel','expandGameTask','visatFacitTal','visatFacitUttryck','visatSvar']){
 const start=html.indexOf(`function ${name}(`);assert.ok(start>=0,name);
 vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
}
test('Öppna bråkexempel godtar hela intervallet men aldrig gränserna',()=>{
 const bounds={min:'3/5',max:'2/3'};
 for(const x of ['5/8','31/50','13/20','0,625','.625','(5/8)','(5)/(8)','\\frac{5}{8}','Svar: 0.65'])assert.ok(c.exempelBrakRatt(x,bounds),x);
 for(const x of ['3/5','2/3','6/10','0,6','0.7','5/0','abc','5/8)','(5/8','5/8;0.7'])assert.equal(c.exempelBrakRatt(x,bounds),false,x);
 assert.equal(c.exempelBrakRatt('60000000000000000000/100000000000000000000',bounds),false);
 assert.ok(c.exempelBrakRatt('60000000000000000001/100000000000000000000',bounds));
});
test('Felmeddelandet visar begärd talform och markerar öppna svar som exempel',()=>{
 assert.equal(c.visatSvar(.00062,1e-9,'grundpotensform'),'\\(6{,}2\\cdot10^{-4}\\)');
 assert.equal(c.visatSvar(62000000,1e-9,'grundpotensform'),'\\(6{,}2\\cdot10^{7}\\)');
 assert.equal(c.visatSvar('19/30',1e-9,'brak_i_intervall'),'Till exempel 19/30');
 assert.equal(c.visatSvar('(-2,-8)',1e-9,'negativt_talpar'),'Till exempel (-2;-8)');
 assert.equal(c.visatSvar(12,1e-9,'numeriskt'),'12');
});
test('Alla giltiga negativa talpar godtas, även decimaler och bråk',()=>{
 for(const x of ['(-2;-8)','(-1,-7)','-3;-9','(-0,5;-6,5)','(-1/2;-13/2)','(−2;−8)','(-7;-13)','(-0.25;-6.25)'])assert.ok(c.negativtTalparRatt(x,{skillnad:6}),x);
 for(const x of ['(2;−4)','(0;-6)','(-8;-2)','(-2;-7)','(-2;-8;−14)','(-2;-8)','(-2;-8))','(-2;-8;)','(-2;)','(-2;-8]','(−1/0;−7)']){
  if(x==='(-2;-8)')continue;
  assert.equal(c.negativtTalparRatt(x,{skillnad:6}),false,x);
 }
});
test('Begärd enklaste bråkform godtar vanliga bråkskrivsätt',()=>{
 for(const x of ['5/6','(5/6)','(5)/(6)','\\frac{5}{6}','\\dfrac{5}{6}','Svar: 5/6'])assert.ok(c.forkortatProvBrakRatt(x,'5/6'),x);
 for(const x of ['10/12','0.83333333333333','4/6','5/0','5/6)','(5/6','5/(6','5/6;5/6','5/06'])assert.equal(c.forkortatProvBrakRatt(x,'5/6'),false,x);
 assert.ok(c.forkortatProvBrakRatt('-1/2','-1/2'));
});
test('Grundpotensform godtar både tangentbord, LaTeX och upphöjda tecken',()=>{
 for(const x of ['6,2*10^-4','6.2*10^(-4)','6,2·10^{-4}','6.2e-4','6,2E-4','6,2×10⁻⁴','6.2\\cdot10^{-4}','6{,}2\\cdot10^{-4}','Svar: 6.2e-4'])assert.ok(c.grundpotensProvRatt(x,.00062),x);
 for(const x of ['0.00062','62e-5','0.62e-3','6.2e-3','6.2*10^(-4','6.2*10^-4)','6.2*10^-4+1','6.2e-4000','Infinity'])assert.equal(c.grundpotensProvRatt(x,.00062),false,x);
 assert.ok(c.grundpotensProvRatt('6,2×10⁷',62000000));
});
test('Tabellens delkort har egna klickbara resonemang och egen numerisk del',()=>{
 const bank={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifterma1.js'),'utf8'),bank);
 const originals=bank.window.BANKMA1.filter(q=>q.kallaProv?.uppgift===23);
 assert.equal(originals.length,3);
 for(const q of originals){
  const [a,b]=c.expandGameTask(q);
  assert.equal(a.svarstyp,'alternativ');assert.equal(a.alternativ.filter(x=>x.ratt).length,1);assert.equal(b.alternativ,undefined);
  assert.equal(typeof b.rättSvar,'number');assert.match(a.t,/<table/);assert.match(b.t,/<table/);
  assert.equal(b.svarEnhet,'min');assert.notEqual(a.s,b.s);
 }
});
