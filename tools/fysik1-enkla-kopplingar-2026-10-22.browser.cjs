/* Lokal kontroll av riktiga svarsfält. Inga konton, XP eller elevdata skrivs.
   Starta lokal HTTP-server på 8027. REVIEW_DEPS pekar på lokala katex/nerdamer-paket. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const out=process.env.REVIEW_OUT||'/tmp/enkla-kopplingar';fs.mkdirSync(out,{recursive:true});
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../uppgifter.js'),'utf8'),c);
const tasks=c.window.BANK.filter(q=>/^8\.(?:58\d|59\d|60\d|61\d)$/.test(q.id)),ids=tasks.map(q=>q.id);
assert.equal(tasks.length,40);
const record={};
// Required precision is read from the question, not its tolerance.
for(const q of tasks){const m=q.t.match(/med (\d+) decimal/);record[q.id]={places:m?Number(m[1]):q.t.includes('avrundat till heltal')?0:null};}
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(tasks=>{window.reviewBank=tasks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.prepareReview=id=>{const cards=expandGameTask(reviewBank.find(p=>p.id===id));if(cards.length!==1)throw new Error('Expected standalone card '+id);const q=cards[0];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return {q,layout:answerLayout(q)};};},tasks);
 await page.evaluate(()=>selectCourse('fy1'));
 let checks=0,views=0;const issues=[];
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
  for(const q of tasks){
   const {layout}=await page.evaluate(id=>prepareReview(id),q.id),values=[q.rättSvar].flat(),units=[q.svarEnhet].flat(),places=record[q.id].places;
   assert.equal(layout.n,values.length,q.id);if(values.length>1){assert.equal(layout.ordnad,true);assert.deepEqual(layout.etiketter,Array.from(q.svarEtiketter));}
   const exact=values.map(String),rounded=values.map(v=>places===null?String(Number(v.toPrecision(12))):v.toFixed(places));
   const good=[exact,rounded,rounded.map((v,i)=>v.replace('.',',')+' '+units[i])];
   // Converted units exercise the real parser, in addition to unitless inputs.
   if(units.every(u=>['A','mA','V','W','mW','Ω'].includes(u)))good.push(values.map((v,i)=>({A:(v*1000)+' mA',mA:(v/1000)+' A',V:(v*1000)+' mV',W:(v*1000)+' mW',mW:(v/1000)+' W','Ω':(v/1000)+' kΩ'})[units[i]]));
   const bad=[values.map(v=>String(v*1.2+1)),rounded.map((v,i)=>v+' '+(units[i]==='V'?'A':'V'))];
   if(values.length>1&&values[0]!==values[1])bad.push([...rounded].reverse());
   for(const [list,want]of [[good,true],[bad,false]])for(const input of list){
    const result=await page.evaluate(([id,values])=>{prepareReview(id);values.forEach((v,i)=>{document.getElementById('ans-'+i).value=v;checkAnswer();});return window.result||state.partResults;},[q.id,input]);
    assert.equal(result.length,input.length,q.id+' field count');assert.equal(result.every(Boolean),want,q.id+' '+JSON.stringify(input)+' '+result);checks++;
   }
   await page.evaluate(id=>{prepareReview(id);showSolution();scrollTo(0,0);},q.id);
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,mathOverflow:[...document.querySelectorAll('.katex-display')].filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent)}));
   if(status.latex||status.wide||status.mathOverflow.length)issues.push({id:q.id,width,...status});views++;
   if(['8.580','8.588','8.600','8.605','8.608','8.612','8.614','8.617'].includes(q.id))await page.locator('.task').screenshot({path:`${out}/card-${q.id}-${width}.png`});
  }
 }
 let teacherViews=0;
 if(process.env.REVIEW_TEACHER_URL){
  const teacher=await browser.newPage();teacher.on('pageerror',e=>errors.push('teacher: '+e.message));
  await teacher.route('https://*.supabase.co/**',r=>r.abort());await teacher.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
  if(process.env.REVIEW_DEPS)await teacher.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
  await teacher.goto(process.env.REVIEW_TEACHER_URL);await teacher.waitForFunction(()=>window.BANK&&typeof renderMathInElement==='function'&&typeof uppgiftsText==='function');
  await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;color:#243447;background:white"></main>';});
  for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const id of ids){
   await teacher.evaluate(id=>{const q=BANK.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});},id);
   const status=await teacher.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,figures:document.querySelectorAll('#review svg[role="img"]').length,mathOverflow:[...document.querySelectorAll('.katex-display')].filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent)}));
   if(status.latex||status.wide||status.mathOverflow.length||status.figures!==1)issues.push({app:'teacher',id,width,...status});teacherViews++;
  }}
 }
 const figures=tasks.map(q=>({bank:'uppgifter.js',taskId:q.id,svg:q.t.match(/<svg[\s\S]*?<\/svg>/)[0],paths:['t']}));
 // Eight smaller contact sheets preserve label sizes for human inspection.
 const gallery=await browser.newPage({viewport:{width:1100,height:900}}),clipping=[];
 for(let n=0;n<8;n++){
  await gallery.setContent('<html><body style="margin:24px;font-family:sans-serif;display:grid;grid-template-columns:1fr 1fr;gap:24px">'+figures.slice(n*5,n*5+5).map(q=>'<section><h2>'+q.taskId+'</h2>'+q.svg+'</section>').join('')+'</body></html>');
  await gallery.screenshot({path:`${out}/figures-${n+1}.png`,fullPage:true});
  clipping.push(...await gallery.evaluate(()=>[...document.querySelectorAll('svg')].flatMap(s=>[...s.querySelectorAll('text')].filter(t=>{const b=t.getBBox(),v=s.viewBox.baseVal;return b.x<v.x-.5||b.y<v.y-.5||b.x+b.width>v.x+v.width+.5||b.y+b.height>v.y+v.height+.5;}).map(t=>t.textContent))));
 }
 fs.writeFileSync(out+'/figures.json',JSON.stringify(figures));
 const result={ids,checks,views,teacherViews,widths:[390,1280],issues,errors,clippedLabels:clipping};fs.writeFileSync(out+'/browser.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 assert.deepEqual(errors,[]);assert.deepEqual(issues,[]);assert.deepEqual(clipping,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
