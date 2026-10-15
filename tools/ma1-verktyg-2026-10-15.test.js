'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(__dirname+'/../index.html','utf8');
function source(name){const start=html.indexOf('function '+name+'(');assert.ok(start>=0,name);return html.slice(start,html.indexOf('\n}',start)+2);}
const c=vm.createContext({window:{},COURSES:{ma1:{subject:'Matematik'}},state:{course:'ma1'},FORMELBLAD:{},hjalp:{}});
vm.runInContext(fs.readFileSync(__dirname+'/../uppgifterma1.js','utf8'),c);
for(const name of ['metadataForDel','expandGameTask','raknareTillaten','hjalpKnappar'])vm.runInContext(source(name),c);
// Symbolerna påverkar inte behörigheterna i de riktiga HTML-knapparna.
c.HJALP_IKON={raknare:''};
const q=id=>{const found=c.window.BANKMA1.find(q=>q.id===id);assert.ok(found,id);return found;};
test('Alla faktiskt expanderade Ma1-kort visar verktyg enligt egna behörigheter',()=>{
 let count=0;
 for(const parent of c.window.BANKMA1)for(const task of c.expandGameTask(parent)){
  count++;assert.equal(c.raknareTillaten(task),task.miniräknare,task.id);
  const buttons=c.hjalpKnappar(task);assert.equal(buttons.includes('data-hjalp="raknare"'),task.miniräknare,task.id);
  assert.equal(buttons.includes('data-hjalp="geogebra"'),task.geogebra,task.id);
  if(task.geogebra)assert.equal(task.miniräknare,true,task.id);
 }assert.ok(count>3968);
});
test('Ett spärrat delkort ärver inte GeoGebra eller miniräknare från heluppgiften',()=>{
 const cards=c.expandGameTask(q('6.69'));assert.equal(cards.length,3);
 assert.equal(cards[0].geogebra,true);assert.equal(cards[1].geogebra,true);
 assert.equal(cards[2].geogebra,false);assert.equal(c.raknareTillaten(cards[2]),false);
 assert.ok(!c.hjalpKnappar(cards[2]).includes('data-hjalp="raknare"'));
 for(const id of ['2.36','2.38','2.188'])assert.equal(c.expandGameTask(q(id))[0].geogebra,false,id);
});
