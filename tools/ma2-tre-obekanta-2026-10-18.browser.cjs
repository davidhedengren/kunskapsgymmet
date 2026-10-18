/* Kör med lokal server på 8027, eller KG_TEST_URL. Inga elevdata skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/),file=(process.env.REVIEW_DEPS||'/tmp/review-deps')+'/'+m[1]+'/package/'+m[2];return fs.existsSync(file)?r.fulfill({path:file}):r.continue();});
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto(process.env.KG_TEST_URL||'http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;await selectCourse('ma2');state.view='training';finishAttempt=r=>{state.answered=true;window.result=r;};});
 let checks=0;
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:1000});
  for(const id of ['1.33','1.65','1.74','1.75','1.78','1.163','1.164','1.165','1.166','1.167','1.168','1.268','1.269','1.272']){
   for(const bad of [false,true]){
    const result=await page.evaluate(([id,bad])=>{
     const q=BANKMA2.find(q=>q.id===id);state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();
     const labels=[...document.querySelectorAll('.aline label')].map(e=>e.textContent.trim());
     const answers=q.rättSvar.map(String);if(bad)[answers[0],answers[1]]=[answers[1],answers[0]];
     answers.forEach((a,i)=>document.getElementById('ans-'+i).value=a);
     for(let i=0;i<3&&!state.answered;i++){const n=state.partIndex;checkAnswer();if(n===state.partIndex)break;}
     return {labels,result:window.result||state.partResults,expected:q.svarEtiketter,wide:document.documentElement.scrollWidth>innerWidth+1,latex:document.querySelectorAll('.katex-error').length};
    },[id,bad]);
    assert.deepEqual(result.labels,result.expected,id);assert.equal(result.wide,false,id);assert.equal(result.latex,0,id);
    if(bad)assert.equal(result.result[0],false,id);else assert.deepEqual(result.result,[true,true,true],id);checks++;
   }
  }
 }
 assert.deepEqual(errors,[]);console.log(JSON.stringify({checks,errors}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
