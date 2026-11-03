'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL);await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(async()=>{await selectCourse('ma2');state.track='2c';session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=id=>{Object.assign(state,{currentTask:state.data.bank.find(q=>q.id===id),answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()}});
 assert.equal(await p.evaluate(()=>availableTasks().some(q=>q.id==='3.495'||q.ursprungsId==='3.495')),false,'3.495 ska inte finnas i träning');
 for(const width of [390,1280]){await p.setViewportSize({width,height:900});for(const [id,good,bad] of [['3.327',['55','55°'],['35','90']],['3.2075',['57','57°'],['33','66']]]){
  for(const [want,values] of [[true,good],[false,bad]])for(const value of values){await p.evaluate(id=>prep(id),id);await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`${id} ${value}`)}
  await p.evaluate(id=>{prep(id);showSolution()},id);assert.equal(await p.locator('.task .katex-error').count(),0,id);assert.doesNotMatch(await p.locator('.task').innerText(),/komplementvinkel|supplementvinkel/i);
 }}assert.deepEqual(errors,[]);console.log('3.495 saknas i träningen och de förtydligade korten rättas på mobil och dator.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
