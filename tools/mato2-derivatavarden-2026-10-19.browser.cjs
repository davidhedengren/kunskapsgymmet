/* Lokala servrar KG:8027, Uppgiftslabbet:8029; valfritt KG_TEST_URL/UL_TEST_URL.
   REVIEW_DEPS kan ange en lokal katalog med versionsbundna KaTeX/nerdamer-paket.
   Backend är blockerad och finishAttempt ersatt: inga XP eller elevdata skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const master=path.resolve(__dirname,'../../Uppgiftslabbet'),report=JSON.parse(fs.readFileSync(master+'/agent/MATO2_DERIVATAVARDEN_2026-10-19.json','utf8'));
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
 for(const [id,good,bad] of [
 ['2.417',['3','3.0'],['2.99','3.01']],
 ['2.418',['2/e','0,736','0.7357588823'],['0.735','0.737']],
 ['2.419',['-2,507','-2.5066199999'],['-2.506','-2.508','2.507']],
 ['2.423',['0'],['0.001','1']],['2.424',['2','2.0'],['1.99','2.01']],
 ['2.425',['6π','18,85','18.84955592'],['18.84','18.86']]
 ]){for(const x of good)await check(id,null,[x],true);for(const x of bad)await check(id,null,[x],false);}
 const rounding=await page.evaluate(()=>{
 const cases=[
 ['3',Math.PI,'',{},true],['3.1',Math.PI,'',{},true],['3.14',Math.PI,'',{},true],['3.1416',Math.PI,'',{},true],['3.15',Math.PI,'',{},false],
 ['3.2',Math.PI,'',{},false],['0',.014,'',{},false],['0.01',.014,'',{},true],
 ['-3.1',-Math.PI,'',{},true],['-3.2',-Math.PI,'',{},false],
 ['3.14',Math.PI,'',{t:'Svara exakt.'},false],['3.1',Math.PI,'',{t:'Svara med två decimaler.'},false],
 ['3.1 m',Math.PI,'m',{},true],['314 cm',Math.PI,'m',{},true],['3.1 s',Math.PI,'m',{},false],
 ['1.2e-18',1.234e-18,'C',{},true],['1,2·10^-18 C',1.234e-18,'C',{},true],['1.3e-18',1.234e-18,'C',{},false],
 ['3',3.49,'',{},true],['4',3.49,'',{},false],['4',4.49,'',{},true],
 ['2.9',3,'',{},false],['3.1+1',Math.PI,'',{},false]
 ];return cases.map(([a,f,u,t,want])=>({a,f,want,got:delSvarRatt(a,f,u,0,t,0,'numeriskt')}));
 });for(const c of rounding){assert.equal(c.got,c.want,JSON.stringify(c));checks++;}
  for(const id of report.reviewed){const count=await page.evaluate(id=>expandGameTask(BANKMATO2.find(q=>q.id===id)).length,id);for(const part of [null,...(count>1?Array.from({length:count},(_,i)=>i):[])]){
    await page.evaluate(([id,part])=>{const q=reviewTask(id,part);if(q.geogebra&&!q.miniräknare)throw Error(id+' tools');showSolution();scrollTo(0,0);},[id,part]);const status=await page.evaluate(layout);if(status.latex||status.wide||status.clipped||status.svg.length)layoutIssues.push({app:'KG',id,part,width,...status});views++;
  }}

 }
 const teacher=await context.newPage();teacher.on('pageerror',e=>errors.push(e.message));await teacher.goto((process.env.UL_TEST_URL||'http://127.0.0.1:8029')+'/index.html?kurs=mato2');await teacher.waitForFunction(()=>window.BANKMATO2&&typeof renderMathInElement==='function');
 await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;max-width:850px;margin:auto"></main>';});
 for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const id of report.reviewed){await teacher.evaluate(id=>{const q=BANKMATO2.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});},id);const status=await teacher.evaluate(layout);if(status.latex||status.wide||status.clipped||status.svg.length)layoutIssues.push({app:'UL',id,width,...status});views++;}}
 const result={checks,views,errors,layoutIssues};fs.writeFileSync('/tmp/mato2-derivatavarden-browser.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));assert.deepEqual(errors,[]);assert.deepEqual(layoutIssues,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
function layout(){const svg=[];for(const s of document.querySelectorAll('svg:not(.katex svg)')){const v=s.viewBox.baseVal;if(!v?.width)continue;for(const t of s.querySelectorAll('text')){const b=t.getBBox();if(b.x<v.x-1||b.y<v.y-1||b.x+b.width>v.x+v.width+1||b.y+b.height>v.y+v.height+1)svg.push(t.textContent);}}
 return {latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;}),svg};}
