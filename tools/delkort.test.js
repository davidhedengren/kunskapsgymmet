'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const c=vm.createContext({arAlt:()=>false});
vm.runInContext(html.slice(html.indexOf('const SVAR_ORD='),html.indexOf('function taggatAntalSvar(')),c);
for(const name of ['metadataForDel','expandGameTask','nastlat','faltVarde','faltFlagga','svarsPlan',
  'autoPerDel','expectedAnswersForTask','taggatAntalSvar','subtaskLetters','answerLayout']){
  const start=html.indexOf(`function ${name}(`);
  assert.ok(start>=0,`Saknar ${name}`);
  vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
}
function bank(file){const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);return Object.values(ctx.window).find(Array.isArray);}
const ma3=bank('uppgiftermato1.js'),ma5=bank('uppgiftermatf1.js');
const cards=id=>c.expandGameTask(ma3.find(q=>q.id===id));
const plain=x=>JSON.parse(JSON.stringify(x));

test('1.19 b frågar bara efter f(2) och har ett självrättande svarsfält',()=>{
  const [a,b]=cards('1.19');
  assert.equal(a.rättSvar,3);assert.equal(b.rättSvar,1);
  assert.equal(c.answerLayout(b).n,1);
  assert.equal(c.expectedAnswersForTask(b).auto,true);
  assert.equal(b.manuellKomplettering,false);
  assert.equal(b.svarFormat,'numeriskt');
});
test('Samma fel i 1.02 och 1.32 rättas utan att blanda delar eller facit',()=>{
  const [a,b]=cards('1.02');
  assert.equal(a.rättSvar,6);assert.equal(b.rättSvar,2);
  assert.equal(c.answerLayout(a).n,1);assert.equal(c.answerLayout(b).n,1);
  const [roots,interval]=cards('1.32');
  assert.deepEqual(plain(roots.rättSvar),[-1,3]);
  assert.equal(c.answerLayout(roots).n,2);
  assert.equal(interval.rättSvar,'x<-1 eller x>3');
  assert.match(interval.t,/Bestäm alla/);
  assert.equal(c.answerLayout(interval).n,1);
  assert.deepEqual(plain(roots.svarFormat),['numeriskt','numeriskt']);
});
test('Originalbladets manuellbedömda c-del finns kvar',()=>{
  for(const id of ['1.02','1.19','1.32']){
    const q=ma3.find(q=>q.id===id);
    assert.equal(q.rättSvar.length,3);
    assert.deepEqual(plain(q.självrättning),[true,true,false]);
    assert.deepEqual(plain(q.manuellKomplettering),[false,false,true]);
    assert.match(q.t,/c\)/);
  }
});
test('Intervallfrågorna ber om alla x-värden som rättaren förväntar sig',()=>{
  for(const id of ['1.27','1.32']){
    const q=ma3.find(q=>q.id===id);
    assert.match(q.t,/Bestäm alla/);
    assert.match(c.expandGameTask(q)[1].t,/Bestäm alla/);
    assert.doesNotMatch(q.t,/Bestäm ett intervall/);
  }
});
test('Delens etikett fungerar även när spelkorten börjar med b eller visas i annan ordning',()=>{
  const q={id:'test',svarEtiketter:['a','b','c'],rättSvar:[10,20,30],
    självrättning:[true,false,true],svarFormat:['heltal','uttryck','numeriskt'],
    tolerans:[0,0.1,0.2],rättSvar273:[11,null,31],svarEnhet:['m','s','N'],manuellKomplettering:[false,true,false],
    traningsniva:[1,2,3],arbetsinsats:[1,2,3],spelDelning:'deluppgifter',
    spelDelar:[{etikett:'c',t:'c'},{etikett:'b',t:'b'}]};
  const [last,middle]=c.expandGameTask(q);
  assert.equal(last.rättSvar,30);assert.equal(last.svarEnhet,'N');assert.equal(last.tolerans,0.2);
  assert.equal(last.rättSvar273,31);assert.equal(middle.rättSvar273,null);
  assert.equal(last.traningsniva,3);assert.equal(last.arbetsinsats,3);
  assert.equal(middle.rättSvar,20);assert.equal(middle.självrättning,false);
  assert.equal(middle.manuellKomplettering,true);
});
test('Gaslagens alternativa temperatursvar följer rätt delkort utan att ändra facit',()=>{
  const q=bank('uppgifter.js').find(q=>q.id==='6.38');
  const cards=c.expandGameTask(q);
  assert.deepEqual(plain(cards.map(x=>x.rättSvar)),[298.15,233.15,-78.15]);
  assert.deepEqual(plain(cards.map(x=>x.rättSvar273)),[298,233,-78]);
  for(const card of cards){
    assert.equal(c.answerLayout(card).n,1);
    assert.equal(c.expectedAnswersForTask(card).auto,true);
  }
});
test('Oförändrad delning med nästlade svar och metadata utan etiketter',()=>{
  const q={id:'test',rättSvar:[[2,3],4],självrättning:[true,true],
    svarFormat:[['heltal','heltal'],'numeriskt'],spelDelning:'deluppgifter',
    spelDelar:[{t:'a'},{t:'b'}]};
  const [a,b]=c.expandGameTask(q);
  assert.deepEqual(plain(a.rättSvar),[2,3]);assert.equal(b.rättSvar,4);
  assert.equal(c.answerLayout(a).n,2);assert.equal(c.answerLayout(b).n,1);
});
test('Variabelnamn i svarsetiketter ska inte förväxlas med delarnas a/b/c',()=>{
  for(const [file,id,expected] of [['uppgifterma1.js','1.20','4a-8'],
    ['uppgifterma2.js','2.261',23.21],['uppgifterma2.js','2.463',3]]){
    const q=bank(file).find(q=>q.id===id);
    assert.equal(c.expandGameTask(q)[0].rättSvar,expected,id);
  }
});
test('1.124 bevaras som läraruppgift utan omöjlig självrättning',()=>{
  const q=ma3.find(q=>q.id==='1.124');
  assert.equal(q.spel,false);assert.equal(q.självrättning,false);
  assert.equal(c.expectedAnswersForTask(q).auto,false);
  assert.match(q.t,/Skriv ett matematiskt villkor/);
  assert.match(q.s,/\\lim_/);
});
test('Numeriska termer har flera_delar och ordnade svar för Enter-flödet',()=>{
  for(const id of ['1.29','1.33','2.74','2.108','2.174']){
    const q=ma5.find(q=>q.id===id);
    assert.equal(q.svarstyp,'flera_delar',id);
    assert.equal(c.answerLayout(q).ordnad,true,id);
    assert.equal(c.answerLayout(q).n,q.rättSvar.length,id);
  }
});
test('Räknare tillåts för de granskade rekursionsuppgifterna',()=>{
  for(const id of ['2.466','2.469','2.74','2.108','2.130','2.173','2.174','2.177','2.201','2.202'])
    assert.equal(ma5.find(q=>q.id===id).miniräknare,true,id);
});
