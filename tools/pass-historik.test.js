'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
function load(c,names){for(const name of names){const m=new RegExp('function '+name+'\\(').exec(html);assert.ok(m,name);vm.runInContext(html.slice(m.index,html.indexOf('\n}',m.index)+2),c);}}
function setup(){
 const tasks=[{id:'one'},{id:'two'},{id:'live'}],nodes=[{value:'redan inskrivet'}],box={innerHTML:''},button={textContent:''},stored=new Map(),calls=[];
 const state={course:'fy1',passCourse:'fy1',sessionDone:2,sessionTarget:8,sessionXp:40,sessionCorrect:1,
  passHistory:tasks.map((task,i)=>({task,completed:i<2})),passIndex:2,passReview:false,passLive:null,currentTask:tasks[2],
  answered:false,solutionShown:true,noXp:true,partResults:[true],partIndex:1,aktivRuta:1,hintUsed:true,hintVisible:true,
  altValda:new Set([0]),altMiss:null,altOrdning:[0,1],altOrdningId:'live',lastIds:['one','two','live']};
 const profile={xp:200,attempts:10,correct:6,run:2,today:3,history:[{id:'one',ok:true}]};
 const app={childNodes:nodes,replaceChildren(...ns){this.childNodes=ns;}};
 const c=vm.createContext({state,profile,app,Set,PASS_KEY:'pass',syncOwner:'user',COURSES:{fy1:{}},PASS:{},
  document:{getElementById:id=>id==='answer-result'?box:id==='kollaknapp'?button:null},
  localStorage:{setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)},
  availableTasks:()=>tasks,tchatStang:()=>{},stangKalla:()=>{},renderSessionDone:()=>calls.push('report'),
  renderTraining:()=>{app.childNodes=[{value:'övning'}];},nextTask:()=>calls.push('new-task'),
  kgRegistreraForsok:()=>{throw Error('Övning ska inte registreras');},kgLoggaHandelse:()=>{throw Error('Övning ska inte loggas');},
  saveProfile:()=>{throw Error('Övning ska inte spara profil');},touchDay:()=>{throw Error('Övning ska inte räknas');}
 });
 vm.runInContext(html.match(/const PASS_SVAR_FALT=\[[\s\S]*?\];/)[0],c);
 load(c,['passSvarStatus','passNavigationHtml','passVisa','passBakat','passFramat','finishPassReview','finishAttempt','sparaPagaendePass','rensaPagaendePass','aterupptaPass']);
 return{c,state,profile,app,nodes,box,button,stored,calls,tasks};
}
test('Bakåt och framåt bevarar pågående inmatning, delresultat, ledtråd och visat facit',()=>{
 const {c,state,app,nodes}=setup();c.passBakat();assert.equal(state.currentTask.id,'two');assert.equal(state.passReview,true);assert.equal(state.noXp,true);assert.equal(state.answered,false);
 c.passBakat();assert.equal(state.currentTask.id,'one');c.passFramat();assert.equal(state.currentTask.id,'two');c.passFramat();
 assert.equal(state.currentTask.id,'live');assert.equal(state.passReview,false);assert.equal(app.childNodes[0],nodes[0]);assert.equal(app.childNodes[0].value,'redan inskrivet');
 assert.equal(state.noXp,true);assert.equal(state.solutionShown,true);assert.equal(state.hintUsed,true);assert.equal(state.partResults[0],true);assert.equal(state.partIndex,1);
});
test('Rätt, fel och delvis rätt på tidigare frågor ändrar inga resultat och ger inga belöningar',()=>{
 for(const result of [true,false,[true,false],[true,true]]){
  const {c,state,profile,box}=setup(),before=JSON.stringify(profile);c.passBakat();c.finishAttempt(result);
  assert.equal(JSON.stringify(profile),before);assert.equal(state.sessionDone,2);assert.equal(state.sessionXp,40);assert.equal(state.sessionCorrect,1);
  assert.match(box.innerHTML,/0 XP/);assert.match(box.innerHTML,/Passets resultat ändras inte/);assert.equal(state.answered,true);
 }
});
test('En redan räknad fråga kan inte räknas igen även om svarslåset tappas',()=>{
 const {c,state,profile}=setup(),before=JSON.stringify(profile);state.passIndex=0;state.currentTask=state.passHistory[0].task;state.passReview=false;state.answered=false;
 c.finishAttempt(true);assert.equal(JSON.stringify(profile),before);assert.equal(state.sessionDone,2);assert.equal(state.passReview,true);
});
test('Pass sparas med den pågående frågan medan eleven övar på en tidigare fråga',()=>{
 const {c,stored}=setup();c.passBakat();c.sparaPagaendePass();const d=JSON.parse(stored.get('pass'));
 assert.equal(d.uppgift,'live');assert.equal(d.uppgiftStatus.answered,false);assert.equal(d.uppgiftStatus.noXp,true);assert.equal(d.uppgiftStatus.solutionShown,true);
 assert.deepEqual(d.passHistorik.map(x=>x.klar),[true,true,false]);assert.equal(d.done,2);assert.equal(d.xp,40);
});
test('Omladdning bevarar XP-spärren för visat facit och använd ledtråd',()=>{
 const {c,state,stored}=setup();state.sessionDone=0;state.passHistory=[state.passHistory[2]];state.passIndex=0;
 c.sparaPagaendePass();const d=JSON.parse(stored.get('pass'));assert.ok(d);assert.equal(c.aterupptaPass(d),true);
 assert.equal(state.passReview,false);assert.equal(state.noXp,true);assert.equal(state.solutionShown,true);assert.equal(state.hintUsed,true);
});
test('Återupptaget pass visar en tidigare besvarad sista fråga utan ny XP',()=>{
 const {c,state,profile,calls}=setup(),before=JSON.stringify(profile);
 assert.equal(c.aterupptaPass({kurs:'fy1',uppgift:'two',done:2,target:8,xp:40,ratt:1,lastIds:['one','two']}),true);
 assert.equal(state.passReview,true);c.finishAttempt(true);assert.equal(JSON.stringify(profile),before);assert.equal(state.sessionDone,2);
 c.passFramat();assert.deepEqual(calls,['new-task']);assert.equal(state.passReview,false);
});
test('Avslutat återupptaget pass går till passrapporten utan en extra fråga',()=>{
 const {c,calls}=setup();c.aterupptaPass({kurs:'fy1',uppgift:'two',done:2,target:2,lastIds:['one','two']});c.passFramat();assert.deepEqual(calls,['report']);
});
test('Navigation kan inte gå före första frågan, in i en annan kurs eller ändra avslutat pass',()=>{
 const {c,state}=setup();state.passIndex=0;assert.match(c.passNavigationHtml(),/id="pass-back"[^>]*disabled/);c.passBakat();assert.equal(state.currentTask.id,'live');
 state.course='fy2';assert.equal(c.passNavigationHtml(),'');c.passVisa(1);assert.equal(state.currentTask.id,'live');
 state.course='fy1';state.passAvslutat=true;c.passVisa(1);assert.equal(state.currentTask.id,'live');
});
