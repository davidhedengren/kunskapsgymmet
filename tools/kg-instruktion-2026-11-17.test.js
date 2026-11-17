'use strict';
/* Rättningsinstruktioner som bara visas i Kunskapsgymmet (språkgranskningen 2026-11-17).
   Bankens fält kgInstruktion (uppgift eller delkort) läggs sist i texten en gång per inläst bank.
   Uppgiftslabbet ignorerar fältet och visar frågan som på ett prov. */
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');

function fn(){
 const start=html.indexOf('function kgInstruktionerIn('),slut=html.indexOf('function expandGameTask(');
 assert.ok(start>0&&slut>start);
 const ctx={};vm.runInNewContext(html.slice(start,slut)+';this.f=kgInstruktionerIn;',ctx);return ctx.f;
}

test('instruktionen läggs sist i uppgiften och i delkorten, bara en gång',()=>{
 const f=fn();
 const bank=[
  {id:'1',t:'<p>Fråga?</p>',kgInstruktion:'Svara med tecken.'},
  {id:'2',t:'<p>Huvud</p>',spelDelar:[{t:'<p>A?</p>',kgInstruktion:'Höger är positiv.'},{fraga:'B?',kgInstruktion:'Svara exakt.'},{t:'<p>C?</p>'}]},
  {id:'3',t:'<p>Ingen</p>'}
 ];
 f(bank);f(bank);
 assert.equal(bank[0].t,'<p>Fråga?</p><p class="kg-instr">Svara med tecken.</p>');
 assert.equal(bank[1].t,'<p>Huvud</p>');
 assert.equal(bank[1].spelDelar[0].t,'<p>A?</p><p class="kg-instr">Höger är positiv.</p>');
 assert.equal(bank[1].spelDelar[1].fraga,'B?<p class="kg-instr">Svara exakt.</p>');
 assert.equal(bank[1].spelDelar[2].t,'<p>C?</p>');
 assert.equal(bank[2].t,'<p>Ingen</p>');
});

test('alla tre inläsningar av en bank går genom kgInstruktionerIn',()=>{
 assert.match(html,/const bank=kgInstruktionerIn\(window\[c\.globals\.bank\]\);/);
 assert.match(html,/const bank=kgInstruktionerIn\(window\[c\.globals\.bank\]\|\|\[\]\);/);
 assert.match(html,/return kgInstruktionerIn\(window\[k\.globals\.bank\]\|\|\[\]\);/);
 assert.match(html,/\.tbody p\.kg-instr\{/);
});

test('Fy1-banken har instruktioner som visas i Kunskapsgymmet',()=>{
 const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','uppgifter.js'),'utf8'),c);
 const b=fn()(c.window.BANK);
 const u=b.find(x=>x.id==='5.282');
 assert.match(u.t,/<p class="kg-instr">Höger räknas som positiv riktning\.<\/p>$/);
});
