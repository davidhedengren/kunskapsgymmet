/* Lokala servrar KG:8027, Uppgiftslabbet:8029; valfritt KG_TEST_URL/UL_TEST_URL.
   REVIEW_DEPS kan ange en lokal katalog med versionsbundna KaTeX/nerdamer-paket.
   Backend är blockerad och finishAttempt ersatt: inga XP eller elevdata skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const master=path.resolve(__dirname,'../../Uppgiftslabbet'),report=JSON.parse(fs.readFileSync(master+'/agent/FELRAPPORTER_2026-10-19_2044.json','utf8'));
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
 const radianTasks=[['1.166',[['π/6','3π/4','5π/4','5π/3']]],['1.27',[['π/6','3π/4']]],['1.449',[['π/12']]],['1.451',[['5π/6']]],['1.458',[['5π/12']]],['1.46',[['π','3π/2','5π']]]];
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
  for(const [id,[answers]] of radianTasks){for(let part=0;part<answers.length;part++){
   const p=answers.length===1?null:part;
   for(const suffix of ['',' rad',' radianer'])await check(id,p,[answers[part]+suffix],true);
   for(const input of ['0',answers[part]+' °',answers[part]+' m',answers[part]+' rad/s',answers[part]+'+1 rad'])await check(id,p,[input],false);
  }}
  for(const input of ['pi/6','(pi)/(6)','\\frac{\\pi}{6}','2π/12','0,5236'])await check('1.166',0,[input],true);
  await check('1.166',null,['π/6 rad','3π/4 rad','5π/4 rad','5π/3 rad'],true);
  await check('1.166',null,['3π/4','π/6','5π/4','5π/3'],false);
  for(const input of ['80,2°','80.2140913'])await check('1.27',3,[input],true);await check('1.27',3,['80,3°'],false);
  for(const [id,part,good,bad] of [
   ['2.187',0,['37,7','37.70 km','12π km','12*pi'],['38','37,6 km','37.7 km²']],
   ['2.187',1,['15,1','4.8π km²/min'],['15','15,2','15.1 km/min']],
   ['2.180',null,['0,80','0.796','2.5/pi m/min','80 cm/min'],['0.79','0.81','0.8 m/s']],
   ['2.182',null,['0,16','1/(2π)','0.16 cm/min'],['0.15','0.17','0.16 cm/s']],
   ['2.188',0,['0,80','5/(2π) m/s'],['0.79','0.81','0.8 m/min']],
   ['2.188',1,['20','20 m²/s'],['19','20 m/s']],
   ['2.231',null,['0,0398','0.5/(4π)','0.0398 m/min'],['0.0397','0.0399','0.04','0.0398 m/s']],
   ['2.249',null,['0,622','500/(256*pi)','0.622 cm/s'],['0.621','0.623','0.62','0.622 cm/min']],
   ['2.456',null,['18,8','6π','18.8495559 cm³/s'],['18.9','19','18.8 cm²/s']],
   ['2.186',null,['0,0199','1.99 cm/min'],['0.0198','1.99 cm/s']],
   ['2.237',null,['0,0170','1.70 cm/min'],['0.0169','1.7 cm/s']],
   ['2.206',null,['18,8','6π'],['18.9','18.7']],['2.211',null,['22,6','7.2π'],['22.7','22.5']],
   ['2.420',null,['ln3','x=ln(3)','1,10','1.0986122887'],['1','1.09','1.11','(1.10,0)']],
   ['2.421',null,['3','x=3','(3,0)'],['2','2.999','(3,1)']],['2.422',null,['4','a=4','x=4'],['3','4.001','a=5']],
   ['2.487',null,['0','x=0'],['1','-1']]
  ]){for(const input of good)await check(id,part,[input],true);for(const input of bad)await check(id,part,[input],false);}
  // π-knappen i det riktiga fältet, även utan algebrabibliotek.
  await page.evaluate(()=>reviewTask('1.166',0));await page.locator('#ans-0').focus();await page.locator('.symrad button').filter({hasText:/^π$/}).click();await page.locator('#ans-0').pressSequentially('/6 rad');await page.locator('#kollaknapp').click();assert.deepEqual(await page.evaluate(()=>window.result),[true]);checks++;
  const nerd=await page.evaluate(()=>{window.savedNerdamer=window.nerdamer;window.nerdamer=undefined;return true;});
  if(nerd){for(const input of ['π/6 rad','pi/6 radianer','2π/12'])await check('1.166',0,[input],true);await check('1.166',0,['π/3 rad'],false);await page.evaluate(()=>window.nerdamer=window.savedNerdamer);}
  for(const id of ['2.407','2.408']){await check(id,null,['C'],true);await check(id,null,['A'],false);}
  for(const id of report.reviewed){const count=await page.evaluate(id=>expandGameTask(BANKMATO2.find(q=>q.id===id)).length,id);for(const part of [null,...(count>1?Array.from({length:count},(_,i)=>i):[])]){
    await page.evaluate(([id,part])=>{const q=reviewTask(id,part);if(q.geogebra&&!q.miniräknare)throw Error(id+' tools');showSolution();scrollTo(0,0);},[id,part]);const status=await page.evaluate(layout);if(status.latex||status.wide||status.clipped||status.svg.length)layoutIssues.push({app:'KG',id,part,width,...status});views++;
  }}
  for(const id of ['1.166','2.188','2.231','2.249','2.456','2.420','2.421']){await page.evaluate(id=>reviewTask(id),id);await page.locator('.task').screenshot({path:`/tmp/oct19-${id}-${width}.png`});}
 }
 const teacher=await context.newPage();teacher.on('pageerror',e=>errors.push(e.message));await teacher.goto((process.env.UL_TEST_URL||'http://127.0.0.1:8029')+'/index.html?kurs=mato2');await teacher.waitForFunction(()=>window.BANKMATO2&&typeof renderMathInElement==='function');
 await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;max-width:850px;margin:auto"></main>';});
 for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const id of report.reviewed){await teacher.evaluate(id=>{const q=BANKMATO2.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});},id);const status=await teacher.evaluate(layout);if(status.latex||status.wide||status.clipped||status.svg.length)layoutIssues.push({app:'UL',id,width,...status});views++;}}
 const result={checks,views,errors,layoutIssues};fs.writeFileSync('/tmp/oct19-2044-browser.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));assert.deepEqual(errors,[]);assert.deepEqual(layoutIssues,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
function layout(){const svg=[];for(const s of document.querySelectorAll('svg:not(.katex svg)')){const v=s.viewBox.baseVal;if(!v?.width)continue;for(const t of s.querySelectorAll('text')){const b=t.getBBox();if(b.x<v.x-1||b.y<v.y-1||b.x+b.width>v.x+v.width+1||b.y+b.height>v.y+v.height+1)svg.push(t.textContent);}}
 return {latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;}),svg};}
