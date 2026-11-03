'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL);await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(async()=>{await selectCourse('ma1');session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=()=>{Object.assign(state,{currentTask:state.data.bank.find(q=>q.id==='1.1311'),answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()}});
 for(const width of [390,1280]){await p.setViewportSize({width,height:900});for(const [value,want] of [['-2',true],['−2',true],['-2,0',true],['2',false],['-1',false],['0',false]]){await p.evaluate(()=>prep());await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.testResult),[want],value)}
  await p.evaluate(()=>{prep();showSolution()});assert.match(await p.locator('.task').innerText(),/Nivå 2/);assert.match(await p.locator('.task').innerText(),/Ställ uttrycken lika/);assert.equal(await p.locator('.task .katex-error').count(),0);
 }assert.deepEqual(errors,[]);console.log('Nivå, facit och sex rättningsförsök fungerar på mobil och dator.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
