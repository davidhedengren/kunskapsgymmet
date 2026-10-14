'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
class Clock extends Date{constructor(...a){super(...(a.length?a:['2026-10-14T12:00:00Z']));}static now(){return new Clock().getTime();}}
const plain=x=>JSON.parse(JSON.stringify(x));
function setup(){
 const c=vm.createContext({Date:Clock,Map,Set,session:null,profile:{xp:100,uppdragRetroXp:0,uppdragKlara:2,uppdragHuvud:1,uppdragDagar:0,uppdragsVecka:{}},
 state:{course:'fy1',sessionXp:0,hintUsed:false,noXp:false,uppdragsDag:{agare:'guest',kurs:'fy1',datum:'2026-10-13'}},
 todayKey:()=> '2026-10-14',uppdragNyckel:()=> '2026-10-14',ggAgare:()=> 'guest',MOLN_PA:()=>true,
 getCards:()=>[{key:'kraft',omr:['kraft']}],levelOf:t=>t.niva,uppdragXp:x=>x.huvud?100:50,UPPDRAG_DAG_XP:100,toast:()=>{}});
 vm.runInContext(html.slice(html.indexOf('function uppdragVeckodagar(){'),html.indexOf('function dagensUppdrag(){')),c);
 return c;
}
const row=(typ='alla',extra={})=>({typ,mal:5,n:0,klar:false,betald:false,text:'Klara fem',...extra});
function day(c,rows){c.profile.uppdragsVecka['2026-10-13']={kurser:{fy1:{lista:rows,klar:false,bonusBetald:false}}};return c.profile.uppdragsVecka['2026-10-13'].kurser.fy1;}
test('Rollover preserves yesterday, marks already awarded tasks and prunes expired days',()=>{
 const c=setup();c.profile.uppdrag={nyckel:'2026-10-13',kurser:{fy1:{lista:[row('alla',{klar:true,n:5,betald:undefined})],klar:true}}};
 c.profile.uppdragsVecka['2026-10-01']={kurser:{}};
 const current=c.uppdragDag();assert.equal(current.nyckel,'2026-10-14');
 assert.equal(c.profile.uppdragsVecka['2026-10-13'].kurser.fy1.lista[0].betald,true);
 assert.equal(c.profile.uppdragsVecka['2026-10-13'].kurser.fy1.bonusBetald,true);
 assert.equal(c.profile.uppdragsVecka['2026-10-01'],undefined);
 c.profile=plain(c.profile);assert.equal(c.uppdragDag(),c.profile.uppdragsVecka['2026-10-14']);assert.equal(c.profile.xp,100);
});
test('Older set gives 50 + 25 + 25 + 25 + 50 XP exactly once',()=>{
 const c=setup(),u=day(c,[row('alla',{huvud:true}),row('utanhjalp'),row('serie'),row('dagsmal')]);
 for(let i=0;i<5;i++)c.uppdragTidigareSvar({omr:'kraft'},true,false);
 assert.equal(c.profile.xp,275);assert.equal(c.profile.uppdragRetroXp,175);assert.equal(c.state.sessionXp,175);
 assert.ok(u.lista.every(x=>x.klar&&x.betald));assert.ok(u.klar&&u.bonusBetald);
 c.uppdragTidigareSvar({},true,false);assert.equal(c.profile.xp,275);
 assert.deepEqual([c.profile.uppdragKlara,c.profile.uppdragHuvud,c.profile.uppdragDagar],[2,1,0]);
});
test('Only selected owner/course/day progresses; reviews and missing SQL never earn backlog XP',()=>{
 for(const change of [c=>{c.state.noXp=true;},c=>{c.state.uppdragsDag=null;},c=>{c.state.uppdragsDag.agare='other';},c=>{c.state.uppdragsDag.kurs='ma2';},c=>{c.state.uppdragsDag.datum='2026-10-01';},c=>{c.session={user:{id:'login'}};}]){
  const c=setup(),u=day(c,[row()]);change(c);c.uppdragTidigareSvar({},true,false);assert.equal(u.lista[0].n,0);assert.equal(c.profile.xp,100);
 }
});
test('Correct region, level, family, hint and repaired-error criteria are required',()=>{
 const c=setup(),u=day(c,[row('niva',{kort:'kraft',niva:['3']}),row('familj',{familj:'f'}),row('utanledtrad',{kort:'kraft'}),row('laga')]);
 c.state.hintUsed=true;c.uppdragTidigareSvar({omr:'annat',niva:'2',familj:'x'},true,false);assert.deepEqual(plain(u.lista.map(x=>x.n)),[0,0,0,0]);
 c.state.hintUsed=false;c.uppdragTidigareSvar({omr:'kraft',niva:'3',familj:['f']},true,true);assert.deepEqual(plain(u.lista.map(x=>x.n)),[1,1,1,1]);
});
test('Wrong answer resets an unfinished series without advancing other goals',()=>{
 const c=setup(),u=day(c,[row('serie',{n:3}),row('alla',{n:2})]);c.uppdragTidigareSvar({},false,false);
 assert.deepEqual(plain(u.lista.map(x=>x.n)),[0,2]);assert.equal(c.profile.xp,100);
});
