/* Kör med lokala servrar: KG 8027, Uppgiftslabbet 8029.
   KG_TEST_URL/UL_TEST_URL kan ersätta adresserna. Supabase och XP-skrivningar blockeras. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),assert=require('node:assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..'),master=path.resolve(root,'../Uppgiftslabbet');
const report=JSON.parse(fs.readFileSync(master+'/agent/FELRAPPORTER_2026-10-17_1917.json','utf8'));
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});try{
 const context=await browser.newContext({viewport:{width:1280,height:1000},timezoneId:'Europe/Stockholm'});
 await context.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/),local='/tmp/quest-book-deps/'+m[1]+'/package/'+m[2];return fs.existsSync(local)?r.fulfill({path:local}):r.continue();});
 await context.route('https://*.supabase.co/**',r=>r.abort());await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));await context.route('https://fonts.gstatic.com/**',r=>r.abort());
 await context.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(process.env.KG_TEST_URL||'http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;arGruppLarare=false;await selectCourse('mato1');state.view='training';finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
  window.reviewTask=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.reviewOutcome=null;renderTraining();hjalpSynk();};
 });
 let checks=0,views=0;const layoutIssues=[];
 async function check(id,input,want){const result=await page.evaluate(([id,input])=>{reviewTask(BANKMATO1.find(q=>q.id===id));const e=document.getElementById('ans-0');if(!e)throw Error(id+' missing answer');e.value=input;checkAnswer();return (window.reviewOutcome||state.partResults)[0];},[id,input]);assert.equal(result,want,id+' '+input);checks++;}
 for(const [id,good,bad]of [['4.257','35,4','0'],['4.260','204','0'],['2.346','10,9','10,8'],['2.321','5,6 år','6'],['4.438','15,3 cm²','20 cm²'],['4.450','24,2 cm²','28 cm²'],['4.462','7,7 cm²','12 cm²'],['4.467','3,0 cm²','6 cm²'],['4.463','10,8 cm','15 cm']]){await check(id,good,true);await check(id,bad,false);}
 for(const input of ['y=1,386x+0,614','1.386*x+0.614','y=1.386*(x-1)+2'])await check('2.318',input,true);
 for(const input of ['1.386','y=1.387x+0.613','y=1.386x-0.614'])await check('2.318',input,false);
 for(const [id,input]of [['2.346','9*(ln(3))^2'],['2.346','10.8625406473'],['2.321','5.578588782855244'],['4.463','sqrt(117) cm']])await check(id,input,true);
 for(const [id,good,bad]of [['2.319','8,0 h','8,1'],['2.320','10,7 år','10,6'],['2.322','10,8 tidsenheter','10,7']]){await check(id,good,true);await check(id,bad,false);}
 for(const id of ['4.53','4.75','4.77','4.179','4.229','4.231','4.287','4.309','4.310','4.311','4.312','4.315','4.402','4.419','4.420','4.424']){
  const t=await page.evaluate(id=>{const q=BANKMATO1.find(q=>q.id===id);return {value:q.rättSvar,tol:q.tolerans,unit:q.svarEnhet};},id);
  const digits=Math.round(-Math.log10(2*t.tol)),good=Number(t.value.toFixed(digits));
  await check(id,good.toFixed(digits)+' '+t.unit,true);await check(id,(good+10**(-digits)).toFixed(digits),false);
 }
 // Every changed automatically marked single-answer card, with a deliberately wrong alternative.
 for(const item of report.changes){const fixture=await page.evaluate(id=>{const q=BANKMATO1.find(q=>q.id===id);return {auto:q.självrättning,answer:q.rättSvar};},item.id);if(!fixture.auto||fixture.answer==null||Array.isArray(fixture.answer))continue;
  await check(item.id,String(fixture.answer),true);
  if(typeof fixture.answer==='number')await check(item.id,String(fixture.answer+7),false);
 }
 const overflow=()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;})});
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:1000});
  for(const id of report.reviewed){const count=await page.evaluate(id=>expandGameTask(BANKMATO1.find(q=>q.id===id)).length,id);
   for(let part=0;part<count;part++){
    await page.evaluate(([id,part])=>{const q=expandGameTask(BANKMATO1.find(q=>q.id===id))[part];if(q.geogebra&&!q.miniräknare)throw Error(id+' tools');reviewTask(q);showSolution();scrollTo(0,0);},[id,part]);
    if(report.geometry[id]){const darkLines=await page.evaluate(()=>[...document.querySelectorAll('.task svg:not(.katex svg) text')].every(t=>getComputedStyle(t).fill==='rgb(36, 50, 71)'));assert.ok(darkLines,id+' figure contrast');}
    const status=await page.evaluate(overflow);if(status.latex||status.wide||status.clipped)layoutIssues.push({app:'KG',id,width,...status});views++;
   }
  }
  for(const id of ['4.53','4.257','4.287','4.402','4.467','3.859']){await page.evaluate(id=>{reviewTask(BANKMATO1.find(q=>q.id===id));},id);await page.locator('.task').screenshot({path:`/tmp/mato1-2026-10-17-${id}-${width}.png`});}
 }
 const teacher=await context.newPage();teacher.on('pageerror',e=>errors.push(e.message));await teacher.goto((process.env.UL_TEST_URL||'http://127.0.0.1:8029')+'/index.html?kurs=mato1');await teacher.waitForFunction(()=>window.BANKMATO1&&typeof renderMathInElement==='function');
 await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;max-width:850px;margin:auto"></main>';});
 for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const id of report.reviewed){await teacher.evaluate(id=>{const q=BANKMATO1.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});},id);const status=await teacher.evaluate(overflow);if(status.latex||status.wide||status.clipped)layoutIssues.push({app:'UL',id,width,...status});views++;}}
 assert.equal(errors.length,0,errors.join('\n'));const result={answerChecks:checks,views,errors,layoutIssues};fs.writeFileSync('/tmp/mato1-2026-10-17-browser.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));assert.equal(layoutIssues.length,0,"Formler ska rymmas");
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
