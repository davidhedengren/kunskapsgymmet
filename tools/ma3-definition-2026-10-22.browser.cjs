/* Lokal kontroll utan konton eller skrivningar till Supabase.
   REVIEW_URL (standard localhost:8027), REVIEW_DEPS (lokala katex/nerdamer-paket). */
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),ctx={window:{}};vm.runInNewContext(fs.readFileSync(root+'/uppgiftermato1.js','utf8'),ctx);
const tasks=ctx.window.BANKMATO1.filter(q=>/^2\.114[4-9]$/.test(q.id)),out=process.env.REVIEW_OUT||'/tmp/ma3-definition';fs.mkdirSync(out,{recursive:true});assert.equal(tasks.length,6);
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto(process.env.REVIEW_URL||'http://localhost:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');await page.evaluate(()=>selectCourse('mato1'));
 await page.evaluate(tasks=>{window.reviewBank=tasks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.prepareReview=id=>{state.currentTask=expandGameTask(reviewBank.find(q=>q.id===id))[0];state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;state.altValda=new Set();state.altOrdningId=null;window.result=null;renderTraining();hjalpSynk();};},tasks);
 const inputs={'2.1144':[['0.2','0,2','1/5'],['4.2','4']],'2.1145':[['-0.3','-0,3','-3/10'],['0.3','5']],'2.1146':[['0','0.0'],['7','1']],'2.1148':[['2.5','2,5','5/2','3'],['2.6','2.49']]};let checks=0;const issues=[];
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const q of tasks){
  if(q.alternativ){for(const a of q.alternativ){const r=await page.evaluate(([id,text])=>{prepareReview(id);const i=altLista(state.currentTask).findIndex(x=>x.txt===text);if(i<0)throw Error('Missing alternative');vaxlaAlt(i);kollaAlt();return window.result;},[q.id,a.txt]);assert.equal(r.every(Boolean),a.ratt);checks++;}}
  else for(const [i,list]of inputs[q.id].entries())for(const v of list){const r=await page.evaluate(([id,v])=>{prepareReview(id);document.getElementById('ans-0').value=v;checkAnswer();return window.result;},[q.id,v]);assert.equal(r.every(Boolean),i===0,q.id+' '+v+' '+r);checks++;}
  await page.evaluate(id=>{prepareReview(id);showSolution();},q.id);
  const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent)}));if(status.latex||status.wide||status.math.length)issues.push({id:q.id,width,...status});await page.locator('.task').screenshot({path:`${out}/card-${q.id}-${width}.png`});
 }}
 let teacherViews=0;
 if(process.env.REVIEW_TEACHER_URL){
 const teacher=await browser.newPage();teacher.on('pageerror',e=>errors.push(e.message));await teacher.route('https://*.supabase.co/**',r=>r.abort());await teacher.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await teacher.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
 await teacher.goto(process.env.REVIEW_TEACHER_URL);await teacher.waitForFunction(()=>typeof renderMathInElement==='function'&&typeof uppgiftsText==='function');
 await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;background:white;color:#243447"></main>';});
 for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const q of tasks){await teacher.evaluate(q=>{const el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});},q);const bad=await teacher.evaluate(()=>document.querySelectorAll('.katex-error').length||document.documentElement.scrollWidth>innerWidth+1||[...document.querySelectorAll('.katex-display')].some(e=>e.scrollWidth>e.clientWidth+1));if(bad)issues.push({app:'teacher',id:q.id,width});teacherViews++;}}
 }
 const figures=tasks.filter(q=>q.t.includes("<svg")).map(q=>({bank:'uppgiftermato1.js',taskId:q.id,svg:q.t.match(/<svg[\s\S]*?<\/svg>/)[0],paths:['t']}));fs.writeFileSync(out+'/figures.json',JSON.stringify(figures));
 const gallery=await browser.newPage({viewport:{width:1050,height:1200}});await gallery.setContent('<body style="font-family:Arial;display:grid;grid-template-columns:1fr 1fr;gap:20px">'+figures.map(q=>'<section><h2>'+q.taskId+'</h2>'+q.svg+'</section>').join('')+'</body>');await gallery.screenshot({path:out+'/gallery.png',fullPage:true});
 const clipped=await gallery.evaluate(()=>[...document.querySelectorAll('svg')].flatMap(s=>[...s.querySelectorAll('text')].filter(t=>{const b=t.getBBox(),v=s.viewBox.baseVal;return b.x<0||b.y<0||b.x+b.width>v.width||b.y+b.height>v.height;}).map(t=>t.textContent)));
 const result={checks,views:tasks.length*2,teacherViews,issues,errors,clipped};fs.writeFileSync(out+'/browser.json',JSON.stringify(result,null,2));console.log(result);assert.deepEqual(errors,[]);assert.deepEqual(issues,[]);assert.deepEqual(clipped,[]);
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
