'use strict';
const {chromium}=require('playwright'),path=require('node:path'),fs=require('node:fs'),assert=require('node:assert/strict');
const cases=require('./ma1-brak-rutin-2026-11-04.cases.json');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];let attempts=0,views=0;
 p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL);
 await p.waitForFunction(()=>typeof selectCourse==='function'||typeof väljKurs==='function');
 const kg=await p.evaluate(()=>typeof selectCourse==='function');
 if(kg){await p.waitForFunction(()=>typeof nerdamer==='function');await p.evaluate(async()=>{
  await selectCourse('ma1');session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};
  window.prep=id=>{const t=state.data.bank.find(q=>q.id===id);Object.assign(state,{currentTask:t,answered:false,noXp:false,solutionShown:false,hintUsed:false,hintVisible:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()};
 });}else{await p.evaluate(()=>{document.body.classList.remove('password-locked');document.getElementById('passwordGate').hidden=true});assert.equal(await p.evaluate(()=>väljKurs(KURSER.find(k=>k.id==='ma1'),document.querySelector('[data-kurs="ma1"]'))),true)}
 for(const width of [390,1280]){await p.setViewportSize({width,height:1000});
  for(const row of cases){const id=row.id;
   if(kg){for(const [want,values] of [[true,row.good],[false,row.bad]])for(const value of values){
    await p.evaluate(id=>prep(id),id);assert.equal(await p.locator('#ans-0').count(),1,id);await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());
    assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`${id}: ${value}`);attempts++;
   }
    await p.evaluate(id=>{prep(id);visaLedtrad();showSolution()},id);assert.equal(await p.locator('.task .katex-error').count(),0,id);
    assert.ok(await p.locator('.task .facit-rubrik').count(),id);
    const overflow=await p.locator('.task .katex-display').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+3).map(e=>e.textContent));
    assert.deepEqual(overflow,[],`${id} overflow @${width}`);
    if(width===390&&['1.1570','1.1577','1.1580','1.1589','1.1594'].includes(id))await p.locator('.task').screenshot({path:`/tmp/brakrutin-${id}-${width}.png`});
   }else{
    assert.equal(await p.evaluate(id=>{state.spår='1a';byggTräd();const q=variantBank().find(q=>q.id===id);if(!q)return false;state.omr=new Set([q.kap+':'+q.omr]);const pos=urval().findIndex(q=>q.id===id);rita(Math.floor(pos/UPPGIFTER_PER_SIDA));return pos>=0},id),true,id);
    const card=p.locator(`article.kort[data-id="${id}"]`);await card.scrollIntoViewIfNeeded();await card.locator('.facitknapp').click();assert.equal(await card.locator('.katex-error').count(),0,id);assert.ok(await card.locator('.facit-rubrik').count(),id);
   }views++;
  }
 }
 if(kg){
  const older=[['1.1364','10','4'],['1.270','9','18'],['1.271','30','9'],['1.272','8,6','7'],['1.1128','5x/2','3x'],['1.1129','x/2','2x'],['1.1130','5x/4','x/4']];
  for(const [id,good,bad] of older)for(const [want,value] of [[true,good],[false,bad]]){
   await p.evaluate(id=>prep(id),id);await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());
   assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`${id}: ${value}`);attempts++;
  }
 }
 assert.deepEqual(errors,[]);console.log(JSON.stringify({app:kg?'Kunskapsgymmet':'Uppgiftslabbet',attempts,views,errors}));
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
