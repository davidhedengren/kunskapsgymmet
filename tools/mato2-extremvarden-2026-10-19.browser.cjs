/* Lokala servrar KG:8027, Uppgiftslabbet:8029; valfritt KG_TEST_URL/UL_TEST_URL.
   REVIEW_DEPS kan ange en lokal katalog med versionsbundna KaTeX/nerdamer-paket.
   Backend är blockerad och finishAttempt ersatt: inga XP eller elevdata skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const master=path.resolve(__dirname,'../../Uppgiftslabbet'),report=JSON.parse(fs.readFileSync(master+'/agent/MATO2_EXTREMVARDEN_2026-10-19.json','utf8'));
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const context=await browser.newContext({timezoneId:'Europe/Stockholm'}),errors=[];
 await context.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/),local=(process.env.REVIEW_DEPS||'/tmp/review-deps')+'/'+m[1]+'/package/'+m[2];return fs.existsSync(local)?r.fulfill({path:local}):r.continue();});
 await context.route('https://*.supabase.co/**',r=>r.abort());await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await context.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(process.env.KG_TEST_URL||'http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;await selectCourse('mato2');state.view='training';finishAttempt=r=>{state.answered=true;window.result=r;};
  window.reviewTask=(id,part)=>{const parent=BANKMATO2.find(q=>q.id===id),q=part==null?parent:expandGameTask(parent)[part];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};
 });
 let checks=0,views=0;const layoutIssues=[];
 async function check(id,part,inputs,want){const result=await page.evaluate(([id,part,inputs])=>{reviewTask(id,part);inputs.forEach((v,i)=>document.getElementById('ans-'+i).value=v);for(let i=0;i<12&&!state.answered;i++){const before=state.partIndex;checkAnswer();if(before===state.partIndex)break;}return window.result||state.partResults;},[id,part,inputs]);assert.ok(result.length,id+' no result');assert.equal(result.every(Boolean),want,id+' '+inputs+' '+JSON.stringify(result));checks++;}
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
 for(const [id,part,good,bad] of [
 ['2.265',0,[['1']],[['2']]],['2.265',1,[['1+ln2'],['1.69'],['1.69314718056']],[['1.70']]],
 ['2.265',2,[['2','5.922'],['5.922','2']],[['2','5.923']]],
 ['2.266',0,[['ln2','(1+ln2)/2'],['0.693','0.847']],[['0.847','0.693'],['0.694','0.847']]],
 ['2.266',1,[['0','1.594'],['1.594','0']],[['0','1.595']]],
 ['2.268',0,[['9.953'],['9.95']],[['9.96']]],
 ['2.268',1,[['0.451','2','2.215'],['2.215','0.451','2']],[['0.452','2','2.215']]],
 ['2.571',null,[['1/e','-1/e'],['0.368','-0.368']],[['0.367','-0.368'],['-0.368','0.368']]],
 ['2.582',null,[['1','e'],['1','2.718']],[['1','2.719'],['2.718','1']]],
 ['2.487',null,[['0']],[['1']]]
 ]){for(const x of good)await check(id,part,x,true);for(const x of bad)await check(id,part,x,false);}
  for(const id of report.reviewed){const count=await page.evaluate(id=>expandGameTask(BANKMATO2.find(q=>q.id===id)).length,id);for(const part of [null,...(count>1?Array.from({length:count},(_,i)=>i):[])]){
    await page.evaluate(([id,part])=>{const q=reviewTask(id,part);if(q.geogebra&&!q.miniräknare)throw Error(id+' tools');showSolution();scrollTo(0,0);},[id,part]);const status=await page.evaluate(layout);if(status.latex||status.wide||status.clipped||status.svg.length)layoutIssues.push({app:'KG',id,part,width,...status});views++;
  }}
  for(const id of ['2.265','2.266','2.268']){await page.evaluate(id=>{reviewTask(id);showSolution();},id);await page.locator('.task').screenshot({path:`/tmp/extrema-${id}-${width}.png`});}

 }
 const teacher=await context.newPage();teacher.on('pageerror',e=>errors.push(e.message));await teacher.goto((process.env.UL_TEST_URL||'http://127.0.0.1:8029')+'/index.html?kurs=mato2');await teacher.waitForFunction(()=>window.BANKMATO2&&typeof renderMathInElement==='function');
 await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;max-width:850px;margin:auto"></main>';});
 for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const id of report.reviewed){await teacher.evaluate(id=>{const q=BANKMATO2.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});},id);const status=await teacher.evaluate(layout);if(status.latex||status.wide||status.clipped||status.svg.length)layoutIssues.push({app:'UL',id,width,...status});views++;}}
 const result={checks,views,errors,layoutIssues};fs.writeFileSync('/tmp/mato2-extrema-browser.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));assert.deepEqual(errors,[]);assert.deepEqual(layoutIssues,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
function layout(){const svg=[];for(const s of document.querySelectorAll('svg:not(.katex svg)')){const v=s.viewBox.baseVal;if(!v?.width)continue;for(const t of s.querySelectorAll('text')){const b=t.getBBox();if(b.x<v.x-1||b.y<v.y-1||b.x+b.width>v.x+v.width+1||b.y+b.height>v.y+v.height+1)svg.push(t.textContent);}}
 return {latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;}),svg};}
