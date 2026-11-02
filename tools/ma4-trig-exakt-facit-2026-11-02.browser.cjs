'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8222');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(async()=>{await selectCourse('mato2');session=null;syncOwner=null;arLarare=false;cheer=()=>{};});
 const plus='(sqrt(6)+sqrt(2))/4',minus='(sqrt(6)-sqrt(2))/4',neg='(sqrt(2)-sqrt(6))/4';
 const cases=[['1.20',['sqrt(3)/2*sin(x)+cos(x)/2','sqrt(2)/2*sin(x)-sqrt(2)/2*cos(x)','cos(x)/2-sqrt(3)/2*sin(x)','sqrt(3)/2*cos(x)+sin(x)/2']],['1.38',[plus,minus,minus,plus]],['1.41',[plus,plus,neg]],['1.145',[plus,plus,neg]]];
 for(const width of [390,1280])for(const [id,answers] of cases){
  await p.setViewportSize({width,height:900});await p.evaluate(id=>{beginSession();state.sessionTarget=30;visaUppgift(kedjaStarta(expandGameTask(state.data.bank.find(q=>q.id===id))[0]))},id);
  for(let i=0;i<answers.length;i++){
   await p.locator('#ans-0').fill(answers[i]);await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.partResults[0]),true,id+' '+i);
   await p.evaluate(()=>showSolution());const holder=p.locator('#solution-holder');assert.match(await holder.innerText(),/Svar/);assert.equal(await holder.locator('.katex-error').count(),0,id+' '+i);assert.doesNotMatch(await holder.innerText(),/periodiciteten|olikheter|ekvivalenskedja/i);
   if((id==='1.38'||id==='1.20')&&i===0)await p.locator('.task').screenshot({path:`/tmp/ma4-trig-facit-${id}-${width}.png`});
   if(i<answers.length-1)await p.evaluate(()=>kedjaFortsatt());
  }
 }
 await p.evaluate(()=>{beginSession();state.sessionTarget=30;visaUppgift(kedjaStarta(expandGameTask(state.data.bank.find(q=>q.id==='1.38'))[0]))});
 await p.locator('#ans-0').fill('(sqrt(6)-sqrt(2))/4');await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.partResults[0]),false,'fel tecken underkänns');
 await p.evaluate(()=>{beginSession();state.sessionTarget=30;visaUppgift(kedjaStarta(expandGameTask(state.data.bank.find(q=>q.id==='1.38'))[0]))});
 await p.locator('#ans-0').fill('sqrt(2)/4+sqrt(6)/4');await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.partResults[0]),true,'ekvivalent uttryck godkänns');
 assert.deepEqual(errors,[]);console.log('14 delfacit: korrekt svar och formaterad lösning på mobil och dator passerar.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
