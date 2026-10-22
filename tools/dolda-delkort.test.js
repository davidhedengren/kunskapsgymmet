'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
const kod=n=>{const m=new RegExp('function '+n+'\\(').exec(html);assert.ok(m,n);return html.slice(m.index,html.indexOf('\n}',m.index)+2);};
const c=vm.createContext({});
for(const n of ['metadataForDel','expandGameTask'])vm.runInContext(kod(n),c);
const bank=(()=>{const w={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifterma2.js'),'utf8'),w);return w.window.BANKMA2;})();

const uppgift=(dolda=[])=>({id:'9.1',spelDelning:'deluppgifter',svarEtiketter:['a','b','c','d'],
  rättSvar:[3,3,[4,1.79],7],tolerans:[0,0,[0,0.005],0],svarFormat:['numeriskt','numeriskt',['numeriskt','numeriskt'],'numeriskt'],
  spelIntro:'<p>Intro</p>',spelDelar:['a','b','c','d'].map((e,i)=>({etikett:e,fraga:`<p>Del ${e}</p>`,...(dolda.includes(i)?{spel:false}:{})}))});

test('Dolda delkort visas inte och övriga får sin egen svarmetadata',()=>{
  const k=c.expandGameTask(uppgift([0,1,3]));
  assert.equal(k.length,1);assert.equal(k[0].id,'9.1c');
  assert.deepEqual(JSON.parse(JSON.stringify(k[0].rättSvar)),[4,1.79]);
  assert.match(k[0].t,/Del c/);
  const tva=c.expandGameTask(uppgift([1]));
  assert.deepEqual(JSON.parse(JSON.stringify(tva.map(q=>q.id))),['9.1a','9.1c','9.1d']);assert.equal(tva[2].rättSvar,7);
});

test('Uppgifter utan dolda delar fungerar som förut',()=>{
  assert.equal(c.expandGameTask(uppgift()).length,4);
  const en={id:'9.2',spelDelning:'deluppgifter',spelDelar:[{etikett:'a',fraga:'x'}],rättSvar:5};
  assert.deepEqual(JSON.parse(JSON.stringify(c.expandGameTask(en).map(q=>q.id))),['9.2']);
  assert.deepEqual(JSON.parse(JSON.stringify(c.expandGameTask({id:'9.3',rättSvar:1}).map(q=>q.id))),['9.3']);
});

test('Standardavvikelseområdet visar inga kort om median, typvärde, variationsbredd eller kvartilavstånd',()=>{
  const kort=bank.filter(t=>t.omr==='standardavvikelse'&&t.spel!==false).flatMap(t=>c.expandGameTask(t));
  const ord=q=>{const d=q.t.includes('spel-en-del')?q.t.split('spel-en-del')[1]:q.t;return d.replace(/<[^>]+>/g,' ').toLowerCase();};
  const fel=kort.filter(q=>/median|typvärde|variationsbredd|kvartilavstånd/.test(ord(q))&&!/standardavvikelse|\bsx\b|spridning|jämnast/.test(ord(q)));
  /* 4.461 jämför med flit standardavvikelse och variationsbredd. */
  assert.deepEqual(JSON.parse(JSON.stringify(fel.map(q=>q.id).filter(id=>id!=='4.461'))),[]);
  assert.equal(bank.flatMap(t=>t.spelDelar||[]).filter(d=>d.spel===false).length,67);
});
