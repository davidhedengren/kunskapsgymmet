'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const data={window:{}};
for(const file of ['uppgiftermatf1.js','typuppgifter-matf1.js'])
  vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),data);
const bank=Object.values(data.window).find(Array.isArray);
const tutorials=Object.values(data.window).find(x=>x && x['matf1-stars-1']);
const kort={kap:1,key:'kombinationer',omr:['kombinationer'],name:'Kombinationer'};
function setup(){
  const c=vm.createContext({state:{course:'matf1',track:null,data:{bank}},
    profile:{genomgangar:{}},getCards:()=>[kort],harKunskapKort:()=>true,
    typData:()=>tutorials,genomgangPassarKort:g=>g.omr==='kombinationer',
    genomgangOmr:g=>[g.omr],familyName:x=>x,chapterName:()=> 'Kombinatorik',
    fokusNycklar:()=>['kombinationer'],
    todayKey:()=> '2026-10-08',areaName:()=> 'Kombinationer',ggNyckel:id=>id});
  for(const name of ['metadataForDel','expandGameTask','kunskapSteg','genomgangMetoderForSvar',
    'metodGenomgang','fastnatOmrade','hittaGenomgangForslag']){
    const start=html.indexOf(`function ${name}(`);
    assert.ok(start>=0,name);
    vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
  }
  c.availableTasks=()=>bank.filter(t=>t.spel!==false).flatMap(c.expandGameTask);
  c.cardTaskPool=()=>c.availableTasks().filter(t=>t.omr==='kombinationer');
  c.cp={history:[]};c.ensureCourseProfile=()=>c.cp;
  c.ggLast=id=>!!c.profile.genomgangar[id];
  return c;
}
test('Genomgångarnas metodtaggar överlever kunskapssidans datamodell',()=>{
  const c=setup(),rows=c.kunskapSteg(1,kort.key).filter(s=>s.familj.startsWith('matf1-stars-'));
  assert.equal(rows.length,4);
  for(const row of rows)assert.deepEqual(Array.from(row.metoder),['stars_and_bars']);
});
function history(c,ids){
  c.cp.history=ids.map((id,i)=>({id,at:Date.now()-(ids.length-i)*1000,ok:false,
    area:'kombinationer',family:bank.find(t=>t.id===id.replace(/[a-z]$/,''))?.familj}));
}
test('Äldre historik utan metodfält kopplas till taggade original och delkort',()=>{
  const c=setup();
  for(const id of ['1.301','1.125a','1.125b','1.125:b'])
    assert.deepEqual(Array.from(c.genomgangMetoderForSvar({id})),['stars_and_bars']);
  assert.deepEqual(Array.from(c.genomgangMetoderForSvar({id:'1.522'})),[]);
  assert.deepEqual(Array.from(c.genomgangMetoderForSvar({id:'saknas'})),[]);
});
test('Två fel på stars and bars ger den första metodgenomgången i tränaren',()=>{
  const c=setup();history(c,['1.125a','1.301']);
  const proposal=c.hittaGenomgangForslag(bank.find(t=>t.id==='1.301'),c.cp);
  assert.equal(proposal.familj,'matf1-stars-1');
  assert.match(proposal.rubrik,/Stars and bars/);
});
test('Vanliga kombinationsfel eller bara ett metodfel ger inte stars and bars',()=>{
  for(const ids of [['1.521','1.522'],['1.301','1.521']]){
    const c=setup();history(c,ids);
    const proposal=c.hittaGenomgangForslag(bank.find(t=>t.id==='1.301'),c.cp);
    assert.ok(proposal);assert.equal(proposal.familj,'matf1-grund-1-08');
  }
});
test('Ett fel, gamla fel och rätta metodsvar startar ingen rekommendation',()=>{
  for(const variant of ['ett','gamla','ratta','annatOmrade']){
    const c=setup();history(c,variant==='ett'?['1.301']:['1.301','1.302']);
    if(variant==='gamla')c.cp.history.forEach(h=>h.at-=15*864e5);
    if(variant==='ratta')c.cp.history.forEach(h=>h.ok=true);
    if(variant==='annatOmrade')c.cp.history.forEach(h=>h.area='permutationer');
    assert.equal(c.hittaGenomgangForslag(bank.find(t=>t.id==='1.301'),c.cp),null);
  }
});
test('48 timmars paus gäller efter visat förslag eller läst metodgenomgång',()=>{
  const c=setup();history(c,['1.301','1.302']);const task=bank.find(t=>t.id==='1.301');
  assert.equal(c.hittaGenomgangForslag(task,c.cp).familj,'matf1-stars-1');
  assert.equal(c.hittaGenomgangForslag(task,c.cp),null);
  c.profile.ggForslagVisade={};c.profile.genomgangar['matf1-stars-1']=Date.now();
  assert.equal(c.hittaGenomgangForslag(task,c.cp),null);
});
test('Tränarens översikt prioriterar återkommande metodfel framför områdets standard',()=>{
  const c=setup();history(c,['1.301','1.302','1.522','1.125b','1.521']);
  assert.equal(c.fastnatOmrade().familj,'matf1-stars-1');
  assert.equal(c.fastnatOmrade().namn,'stars and bars');
  c.profile.ptFastAvvisad={'matf1|kombinationer':'2026-10-08'};
  assert.equal(c.fastnatOmrade(),null);
});
test('Enstaka metodfel i översikten tar inte över vanliga kombinationsfel',()=>{
  const c=setup();history(c,['1.521','1.522','1.301','1.523','1.524']);
  assert.equal(c.fastnatOmrade().familj,'matf1-grund-1-08');
});
test('Delkort ärver metoder, men kan få egna metodtaggar',()=>{
  const c=setup(),t=bank.find(t=>t.id==='1.125');
  for(const d of c.expandGameTask(t))assert.deepEqual(Array.from(d.metoder),['stars_and_bars']);
  const changed={...t,spelDelar:t.spelDelar.map((d,i)=>({...d,metoder:i?[]:['annan_metod']}))};
  const [a,b]=c.expandGameTask(changed);
  assert.deepEqual(Array.from(a.metoder),['annan_metod']);assert.deepEqual(Array.from(b.metoder),[]);
});
