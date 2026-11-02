'use strict';const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8294');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(async()=>{await selectCourse('ma1');session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=id=>{Object.assign(state,{currentTask:state.data.bank.find(q=>q.id===id),answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()};});
 for(const width of [390,1280]){await p.setViewportSize({width,height:900});
 for(const id of ['4.47','4.402','5.192','5.212','5.245','5.416','5.539']){
  const total=await p.evaluate(id=>{prep(id);return altLista(state.currentTask).length},id);assert.equal(total,({'5.212':2,'5.192':3}[id]||4));
  for(let i=0;i<total;i++){const r=await p.evaluate(({id,i})=>{prep(id);const list=altLista(state.currentTask),expected=list[i].ratt;vaxlaAlt(i);kollaAlt();const feedback=document.querySelector('#altkom-'+i);return {expected,result:window.testResult,errors:document.querySelectorAll('.katex-error').length,feedback:feedback?.hidden?'':feedback?.textContent}},{id,i});assert.deepEqual(r.result,[r.expected],`${id}, alternativ ${i}`);if(!r.expected)assert.ok(r.feedback?.length>20,`${id} saknar synlig återkoppling`);assert.equal(r.errors,0,id);}
 }

 }
 assert.deepEqual(errors,[]);console.log('Alla alternativ och svarsfält rättas på mobil och dator.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
