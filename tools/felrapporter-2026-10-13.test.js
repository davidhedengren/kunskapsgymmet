'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const c=vm.createContext({window:{},hjalp:{grader:true},state:{lastIds:[],passHistory:[],currentTask:{}},SEDDA_KARENS_MAX:250,MANGD_FORMAT:new Set(['mängd']),arAlt:()=>false});
vm.runInContext(html.slice(html.indexOf('const MATTEFUNKTIONER='),html.indexOf('function explicitMultiplikation(')),c);
vm.runInContext(html.slice(html.indexOf('const SVAR_ORD='),html.indexOf('function taggatAntalSvar(')),c);
for(const name of ['latexToPlain','normalizeDecimalComma','normalizeMathInput','explicitMultiplikation','isPureNumberExpression','tillNerdamer','numericValue','raknTolka','primtalsfaktoriseringRatt','stadaSvar','naraNog','hogerled','taltolk','formatRatt','visatFacitTal','visatFacitUttryck','visatSvar','uppgiftsAlder','farskaUppgifter','metadataForDel','expandGameTask','nastlat','faltVarde','faltFlagga','svarsPlan','autoPerDel','expectedAnswersForTask','taggatAntalSvar','subtaskLetters','answerLayout','samlatMangdsvarTillatet','checkAnswer']){
 const start=html.indexOf(`function ${name}(`);assert.ok(start>=0,name);vm.runInContext(html.slice(start,html.indexOf('\n}',start)+2),c);
}
const value=s=>c.numericValue(c.tillNerdamer(c.normalizeMathInput(s)));
function bank(file){const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);return Object.values(context.window).find(Array.isArray);}
const m5=bank('uppgiftermatf1.js'),m4=bank('uppgiftermato2.js'),m2=bank('uppgifterma2.js');
const plain=v=>JSON.parse(JSON.stringify(v));
test('LaTeX-logaritmer med och utan parenteser får samma värde som elevsvaret',()=>{
 for(const [latex,input] of [['\\(\\lg8\\)','lg8'],['\\lg40','lg(40)'],['\\lg9','lg 9'],['\\lg(x^2)','lg(x^2)']])assert.equal(c.normalizeMathInput(c.latexToPlain(latex)),c.normalizeMathInput(input));
 assert.ok(Math.abs(value(c.latexToPlain('\\lg8'))-Math.log10(8))<1e-12);
 assert.notEqual(value(c.latexToPlain('\\lg8')),value('lg9'));
});
test('Primtalsfaktorisering godtar upprepade faktorer, potenser och ändrad ordning',()=>{
 const cases=[['2.79',360,'2*2*2*3*3*5'],['2.157',756,'7*3*3*3*2*2'],['2.209',840,'7*5*3*2*2*2']];
 for(const [id,n,repeated] of cases){const q=m5.find(q=>q.id===id);assert.equal(q.svarFormat,'primtalsfaktorisering');
  for(const input of [q.rättSvar,repeated,`${n}=${repeated}`,`(${repeated})`])assert.equal(c.primtalsfaktoriseringRatt(input,q.rättSvar),true,input);
  for(const input of [String(n),`${n/2}*2`,'2^0*'+repeated,'2^-1*'+repeated,'1*'+repeated,repeated+'+0',repeated+'/1','2.0*'+repeated,'361='+repeated,repeated+'*',repeated+'x'])assert.equal(c.primtalsfaktoriseringRatt(input,q.rättSvar),false,input);
 }
 for(const input of ['2³·3²·5','2^{3}\\cdot3^{2}\\cdot5','(2*3)^2*2*5','5 × 3² × 2³'])assert.equal(c.primtalsfaktoriseringRatt(input,'2^3*3^2*5'),true,input);
});
test('Halva avrundningssteg godtar bara den korrekt avrundade sannolikheten',()=>{
 for(const [facit,yes,no] of [['1/16','0.063','0.062'],['5/16','0.313','0.312'],['15/16','0.938','0.937'],['1/8','13%','12%'],['1/400000000000','2.5e-12','0']]){
  assert.equal(c.formatRatt(yes,facit,{format:'sannolikhet'}),true,yes);assert.equal(c.formatRatt(no,facit,{format:'sannolikhet'}),false,no);
 }
 for(const input of ['0,155','0.16','15.5%','1.6e-1'])assert.equal(c.formatRatt(input,.83**10,{format:'sannolikhet'}),true,input);
 for(const input of ['0.15','0.06','101%','-0.063'])assert.equal(c.formatRatt(input,input==='0.06'?'1/16':.83**10,{format:'sannolikhet'}),false,input);
 assert.equal(c.formatRatt('0.063','1/16',{format:'sannolikhet',tolerans:.00001}),false);
});
test('Decimalsträngar i sannolikhetsfacit visas avrundade och exakta bråk bevaras',()=>{
 c.state.currentTask={t:'Bestäm sannolikheten.'};assert.equal(c.visatSvar('0.1551604119',null,'sannolikhet'),'0,1552');
 assert.equal(c.visatSvar('1/16',null,'sannolikhet'),'1/16');assert.equal(c.visatSvar('0.0000001234567',null,'sannolikhet'),'1,235e-7');
 c.state.currentTask={t:'Svara med tre värdesiffror.'};assert.equal(c.visatSvar('0.1551604119',null,'sannolikhet'),'0,155');
});
test('Vinkeldelkort har separata ordnade R/v-fält med grader och angiven precision',()=>{
 for(const id of ['1.131','1.81']){const q=m4.find(q=>q.id===id),cards=c.expandGameTask(q);assert.equal(cards.length,q.rättSvar.length);
  cards.forEach((card,i)=>{assert.equal(c.answerLayout(card).n,2);assert.deepEqual(plain(card.svarEtiketter),['R','v']);assert.deepEqual(plain(card.svarEnhet),[null,'°']);assert.equal(card.tolerans[1],.05);assert.match(card.t,/grader/);assert.match(card.t,/en decimal/);assert.deepEqual(plain(card.rättSvar),plain(q.rättSvar[i]));});
 }
});
test('Namngivna fält rättas i ordning också inne i heluppgiftens del; rötter förblir oordnade',()=>{
 const run=(q,inputs)=>{c.state={currentTask:q,answered:false,partIndex:0,partResults:[]};let result;
 c.document={getElementById:id=>({value:inputs[+id.split('-')[1]]})};c.delSvarRatt=(a,b,u,tol)=>Math.abs(Number(a)-Number(b))<=(tol||1e-8);
 c.markPart=()=>{};c.facitText=()=>'';c.gaVidare=()=>{};c.finishAttempt=r=>{result=r;};c.toast=()=>{};
 c.checkAnswer();return result||c.state.partResults;};
 const parent=m4.find(q=>q.id==='1.131');assert.deepEqual(plain(run(parent,['5','53.1'])),[true,true]);assert.deepEqual(plain(run(parent,['53.1','5'])),[false,false]);
 const roots=m2.find(q=>q.id==='2.57');assert.deepEqual(plain(run(roots,['-3','2'])),[true,true]);assert.deepEqual(plain(run(roots,['2','2'])),[true,false]);
});
test('Urvalet förbrukar hela poolen före repetition och balanserar alla följande varv',()=>{
 for(const n of [1,2,3,8,65]){
  const pool=Array.from({length:n},(_,i)=>({id:String(i)})),h={seq:0,ids:{}},counts=new Map();c.state={lastIds:[],passHistory:[]};let last;
  for(let j=0;j<3*n;j++){
   const eligible=c.farskaUppgifter(pool,h);assert.ok(eligible.length);const t=eligible[0];
   if(j<n)assert.equal(counts.has(t.id),false);if(n>1)assert.notEqual(t.id,last);
   counts.set(t.id,(counts.get(t.id)||0)+1);last=t.id;c.state.passHistory.push({task:t,completed:false});c.state.lastIds.push(t.id);c.state.lastIds=c.state.lastIds.slice(-60);h.ids[t.id]=++h.seq;
   const sizes=pool.map(t=>counts.get(t.id)||0);assert.ok(Math.max(...sizes)-Math.min(...sizes)<=1);
  }
 }
 assert.deepEqual(plain(c.farskaUppgifter([],{seq:0,ids:{}})),[]);
});
