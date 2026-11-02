'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8290');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');await p.evaluate(async()=>{await selectCourse('mato1');session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.result=r};window.prep=id=>{Object.assign(state,{currentTask:state.data.bank.find(q=>q.id===id),answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.result=null;renderTraining()};});
 for(const width of [390,1280]){await p.setViewportSize({width,height:900});
  for(const id of ['3.1201','3.1202','3.1203','3.1204','3.1205','3.1206','3.1233','4.104']){
   await p.evaluate(id=>prep(id),id);const card=p.locator('.task');assert.equal(await card.locator('.katex-error').count(),0,id);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,id);
   if(id==='3.1202')await card.screenshot({path:`/tmp/fellogg0837-${id}-${width}.png`});
  }
  for(const [id,good,bad] of [
   ['4.104',['5.6','5,56','5.563','5.6 m','560 cm'],['5.5','5.57','5.8','5.6 s']],
   ['4.102',['23','23,4','23.44','23 m'],['22','23.5','24']],
   ['4.114',['69','68.8','68.83','69 m','70'],['68','68.7','80']],
   ['4.118',['16','15.7','15.68','16 m'],['15','15.6','15.69']],
   ['4.485',['34.0','34','34 m'],['33.9','34.1','35']],
   ['4.486',['16.3','16.3°'],['16.2','16.4','16']],
   ['4.474',['3*sqrt(3)/2','2.598'],['2.60','2.597']]
  ])for(const [expected,inputs] of [[true,good],[false,bad]])for(const value of inputs){
   await p.evaluate(id=>prep(id),id);await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());const result=await p.evaluate(()=>window.result);assert.deepEqual(result,[expected],`${id} ${value}`);
  }
  await p.evaluate(()=>prep('3.1233'));await p.locator('#ans-0').fill('4.5');await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.result),[true]);
  await p.evaluate(()=>prep('3.1233'));await p.locator('#ans-0').fill('5');await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.result),[false]);
 }
 assert.deepEqual(errors,[]);console.log('Figurer i mobil/dator och faktiska svar med avrundning, enheter, felvärden och nivåuppgift passerar.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
