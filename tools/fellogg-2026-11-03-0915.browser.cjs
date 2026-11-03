'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL);await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(()=>{session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=({id,part})=>{let t=state.data.bank.find(q=>q.id===id);if(part!=null)t=expandGameTask(t)[part];Object.assign(state,{currentTask:t,answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()}});
 for(const width of [390,1280]){await p.setViewportSize({width,height:900});
  for(const [course,id,part] of [['ma2','3.691',null],['ma2','4.514',null],['ma2','3.2064',null],['mato1','4.23',null],['mato1','4.108',null],['mato1','4.249',null]]){
   await p.evaluate(course=>selectCourse(course),course);await p.evaluate(v=>prep(v),{id,part});await p.locator('.task').screenshot({path:`/tmp/fellogg0915-${course}-${id}-${width}.png`});assert.equal(await p.locator('.task .katex-error').count(),0,id);
  }
  await p.evaluate(()=>selectCourse('ma2'));
  for(const id of ['3.52','3.77','3.151','3.35','3.153']){
   await p.evaluate(id=>prep({id,part:null}),id);const labels=await p.locator('.task svg text').allTextContents();for(const label of ['A','B','C'])assert.ok(labels.includes(label),`${id}: ${label} saknas`);
  }
  for(const [course,id,part,good,bad] of [
   ['ma2','3.691',null,['12','12 cm'],['8','13']],['ma2','4.514',null,['166','166 cm'],['164','168']],['ma2','6.10',null,['68','68 %','68,3'],['50','95']],['ma2','3.2064',null,['125','125°'],['55','77']],
   ['ma1','5.554',null,['1,5','1.5'],['1,6','3']],['mato1','4.274',null,['1066,5','1066,53','1067'],['1066,9','1050']],['mato1','4.23',null,['37,4'],['43','25']]
  ]){await p.evaluate(course=>selectCourse(course),course);for(const [want,values] of [[true,good],[false,bad]])for(const value of values){await p.evaluate(v=>prep(v),{id,part});await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`${course} ${id} ${value}`)}}
  await p.evaluate(()=>selectCourse('ma1'));
  for(const part of [0,1])for(let i=0;i<2;i++){
   const result=await p.evaluate(({part,i})=>{prep({id:'5.97',part});const a=altLista(state.currentTask),expected=a[i].ratt;vaxlaAlt(i);kollaAlt();return {expected,result:window.testResult}},{part,i});assert.deepEqual(result.result,[result.expected],`5.97 del ${part} alternativ ${i}`);
  }
  await p.evaluate(()=>selectCourse('mato2'));
  for(const [value,want] of [['1/cos(x)^2',true],['1+tan(x)^2',true],['1/cos(x)',false],['-1/cos(x)^2',false]]){
   await p.evaluate(()=>prep({id:'2.17',part:1}));await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`2.17 b ${value}`);
  }
  await p.evaluate(()=>{prep({id:'2.17',part:1});showSolution()});assert.equal(await p.locator('.task .katex-error').count(),0,'2.17 b facit');assert.match(await p.locator('.task').innerText(),/kvotregeln/);
 }
 assert.deepEqual(errors,[]);console.log('Rapporterade svar och figurer kontrollerade på mobil och dator.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
