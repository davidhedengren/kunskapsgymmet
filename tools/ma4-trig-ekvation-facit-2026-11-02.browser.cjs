'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8222');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');await p.evaluate(async()=>{await selectCourse('mato2');session=null;syncOwner=null;arLarare=false;cheer=()=>{};});
 const cases=[['1.16',4],['1.68',4],['1.69',4],['1.132',3],['1.299',4]];
 for(const width of [390,1280])for(const [id,n] of cases){await p.setViewportSize({width,height:900});for(let i=0;i<n;i++){
  await p.evaluate(({id,i})=>{beginSession();state.sessionTarget=30;const q=state.data.bank.find(q=>q.id===id);visaUppgift(expandGameTask(q)[i]);showSolution()}, {id,i});
  const sol=p.locator('#solution-holder');assert.match(await sol.innerText(),/Svar/,id+i);assert.equal(await sol.locator('.katex-error').count(),0,id+i);
  if(id==='1.16'||id==='1.68'||id==='1.69')assert.match(await sol.innerText(),/där/);
  if(id==='1.132'&&i===1)await p.locator('.task').screenshot({path:`/tmp/ma4-ekvation-${width}.png`});
 }}
 for(const [id,parts] of [['1.132',[[150,30],[225,135],[315,135]]],['1.299',[[150,30],[210,150],[315,135],[300,240,120,60]]]])for(let i=0;i<parts.length;i++){
  await p.evaluate(({id,i})=>{beginSession();state.sessionTarget=30;visaUppgift(expandGameTask(state.data.bank.find(q=>q.id===id))[i])},{id,i});
  for(let j=0;j<parts[i].length;j++)await p.locator('#ans-'+j).fill(String(parts[i][j]));const outcome=await p.evaluate(()=>{const before={id:state.currentTask.id,answered:state.answered,pending:state.samladKomplettering,values:[...document.querySelectorAll('[id^=ans-]')].map(e=>e.value)};checkAnswer();return {before,after:state.partResults,now:state.currentTask.id}});assert.deepEqual(outcome.after,parts[i].map(()=>true),id+' '+i+' '+JSON.stringify(outcome));
 }
 for(const [i,answer] of [[0,'180n'],[1,'180+360n'],[2,'60+180n']]){
  await p.evaluate(i=>{beginSession();state.sessionTarget=30;visaUppgift(expandGameTask(state.data.bank.find(q=>q.id==='1.16'))[i])},i);
  await p.locator('#ans-0').fill(answer);await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.partResults[0]),true,'1.16 '+i);
 }
 assert.deepEqual(errors,[]);console.log('19 delfacit visas och alla sju vinkelsvar rättas utan hänsyn till ordning.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
