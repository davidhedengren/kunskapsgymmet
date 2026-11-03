'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await browser.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL);await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(()=>{session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=id=>{Object.assign(state,{currentTask:state.data.bank.find(q=>q.id===id),answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()}});
 for(const width of [390,1280]){await p.setViewportSize({width,height:900});
  for(const [course,id] of [['ma2','2.1091'],['mato1','2.1152']]){
   await p.evaluate(course=>selectCourse(course),course);await p.evaluate(id=>prep(id),id);
   assert.equal(await p.locator('.task .katex-error').count(),0,id);
   if(id==='2.1091'){
    const annotations=await p.locator('.task .katex annotation').allTextContents();assert.ok(annotations.includes('0<x<4'),JSON.stringify(annotations));assert.ok(annotations.includes('0<x<2'),JSON.stringify(annotations));
    await p.locator('.task').screenshot({path:`/tmp/olikhet21091-after-kg-${width}.png`});
   }
   for(let i=0;i<4;i++){
    const result=await p.evaluate(({id,i})=>{prep(id);const expected=altLista(state.currentTask)[i].ratt;vaxlaAlt(i);kollaAlt();const el=document.querySelector('#altkom-'+i);return {expected,result:window.testResult,feedback:el?.hidden?'':el?.textContent}},{id,i});
    assert.deepEqual(result.result,[result.expected],`${id} alternativ ${i}`);if(!result.expected)assert.ok(result.feedback?.trim().length>0,`${id} feedback`);
   }
   await p.evaluate(id=>{prep(id);showSolution()},id);assert.equal(await p.locator('.task .katex-error').count(),0,id+' facit');
   if(id==='2.1091')assert.ok((await p.locator('.task .katex annotation').allTextContents()).includes('0<x<4'),'Hela intervallet ska visas i facit');
  }
  for(const [course,id,expression] of [['ma1','1.06','1<x\\le7'],['ma1','1.52','1<x<5'],['ma1','1.53','-4<x\\le6'],['ma2','2.201',null],['mato1','1.27',null]]){
   await p.evaluate(course=>selectCourse(course),course);await p.evaluate(id=>{prep(id);showSolution()},id);assert.equal(await p.locator('.task .katex-error').count(),0,`${id} facit`);
   if(expression){const values=await p.locator('.task .katex annotation').allTextContents();assert.ok(values.includes(expression),`${id}: ${JSON.stringify(values)}`);}
  }
 }
 assert.deepEqual(errors,[]);console.log('Olikheter syns och alla alternativ rättas på mobil och dator.');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
