'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').replace(/\r\n/g,'\n');
function funktion(name){
  const m=new RegExp('(?:async )?function '+name+'\\(').exec(html);
  assert.ok(m,name);
  return html.slice(m.index,html.indexOf('\n}',m.index)+2);
}
function load(c,names){ for(const n of names) vm.runInContext(funktion(n),c); }

function uppgift(id,omr,familj,niva='1'){ return {id,omr,familj,niva}; }
function setup({admin=true}={}){
  const tasks=[
    uppgift('1.1137','forenkla_uttryck','Uttryck med parenteser'),
    uppgift('1.1136','forenkla_uttryck','Uttryck med parenteser'),
    {...uppgift('1.1156b','forenkla_uttryck','Uttryck med parenteser','3'),ursprungsId:'1.1156'},
    {...uppgift('1.1156a','forenkla_uttryck','Uttryck med parenteser','2'),ursprungsId:'1.1156'},
    uppgift('1.902','forenkla_uttryck','Förenkla uttryck'),
    uppgift('1.410','multiplicera_uttryck','Multiplicera in i en parentes'),
  ];
  const visade=[],toasts=[];
  const app={childNodes:['nod-a','nod-b'],replaceChildren:(...n)=>{app.childNodes=n;}};
  const c=vm.createContext({
    arAdmin:admin,app,toast:t=>toasts.push(t),esc:x=>String(x),
    state:{view:'training',currentTask:tasks[0],focusOmr:['forenkla_uttryck'],focusFamily:'Uttryck med parenteser',
      answered:false,passReview:false,passIndex:0,noXp:false,partResults:[],altValda:new Set()},
    availableTasks:()=>tasks,levelOf:t=>t.niva,getAreas:()=>[{key:'forenkla_uttryck'},{key:'multiplicera_uttryck'}],
    PASS_SVAR_FALT:['currentTask','answered','solutionShown','partResults','partIndex','noXp','aktivRuta','hintUsed',
      'hintVisible','altValda','altMiss','altOrdning','altOrdningId','ggForslag'],
    renderTraining:()=>visade.push(c.state.currentTask.id),tchatStang:()=>{},stangKalla:()=>{},
    window:{scrollTo:()=>{}},nextTask:()=>visade.push('nextTask'),document:{getElementById:()=>null},
  });
  load(c,['passSvarStatus','adminBladSortering','adminBladLista','adminBladStarta','adminBladVisa','adminBladGa',
    'adminBladGaTill','adminBladAvsluta','adminBladHtml']);
  return {c,visade,toasts,app};
}

test('Admin bläddrar i det valda delmomentet i ID-ordning utan att lämna det',()=>{
  const {c,visade}=setup();
  assert.deepEqual(c.adminBladLista().map(t=>t.id),['1.1136','1.1137','1.1156a','1.1156b']);
  c.adminBladGa(1);c.adminBladGa(1);c.adminBladGa(1);c.adminBladGa(1);
  assert.deepEqual(visade,['1.1156a','1.1156b','1.1156b','1.1156b']);
  c.adminBladGa(-1);
  assert.equal(c.state.currentTask.id,'1.1156a');
  assert.equal(c.state.noXp,true);assert.equal(c.state.answered,false);
});

test('Gå till ID hittar även uppgifter utanför urvalet och okända ID ger ett meddelande',()=>{
  const {c,toasts}=setup();
  c.adminBladGaTill('1.410');
  assert.equal(c.state.currentTask.id,'1.410');
  assert.equal(c.state.adminBlad.lista[c.state.adminBlad.i].id,'1.410');
  c.adminBladGaTill('1.1156');
  assert.equal(c.state.currentTask.id,'1.1156a');
  c.adminBladGaTill('9.999');
  assert.match(toasts.at(-1),/9\.999 finns inte/);
});

test('Tillbaka till passet återställer den pågående uppgiften och dess DOM',()=>{
  const {c,app}=setup();
  c.state.partResults=[true];c.state.hintUsed=true;
  c.adminBladGa(1);
  app.childNodes=['bläddrad'];
  c.adminBladAvsluta();
  assert.equal(c.state.adminBlad,null);
  assert.equal(c.state.currentTask.id,'1.1137');
  assert.deepEqual([...c.state.partResults],[true]);assert.equal(c.state.hintUsed,true);
  assert.deepEqual(app.childNodes,['nod-a','nod-b']);
});

test('Bläddringen och raden finns bara för admin',()=>{
  const {c,visade}=setup({admin:false});
  c.adminBladGa(1);c.adminBladGaTill('1.410');
  assert.deepEqual(visade,[]);assert.equal(c.state.adminBlad,undefined);
  assert.equal(c.adminBladHtml(),'');
  const a=setup();
  assert.match(a.c.adminBladHtml(),/Nästa →/);
});

test('Bläddrade svar och visningar registreras aldrig',()=>{
  assert.match(funktion('finishAttempt'),/if\(state\.adminBlad\) return finishAdminBlad\(delar\);/);
  const fa=funktion('finishAttempt');
  assert.ok(fa.indexOf('finishAdminBlad')<fa.indexOf('state.sessionDone++'),'spärren ligger före all registrering');
  assert.match(funktion('sparaPagaendePass'),/if\(state\.adminBlad\) return;/);
  assert.match(funktion('nextTask'),/if\(state\.adminBlad\) return adminBladAvsluta\(\);/);
  assert.match(funktion('beginSession'),/state\.adminBlad=null;/);
  assert.match(funktion('backToDashboard'),/state\.adminBlad=null;/);
});
