'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:390,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
  const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])});});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8217');
 await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 const labels=await p.evaluate(()=>[svarsstegsText({svarEtiketter:['a','b']},0,2),svarsstegsText({svarEtiketter:['u','v','w']},0,3)]);
 assert.deepEqual(labels,['Deluppgift a av 2','Svar 1 av 3']);
 await p.evaluate(async()=>{await selectCourse('ma2');session=null;syncOwner=null;arLarare=false;cheer=()=>{};beginSession();state.sessionTarget=30;const q=state.data.bank.find(x=>x.id==='2.436');visaUppgift(kedjaStarta(expandGameTask(q)[0]));});
 for(const [index,answer] of [[0,'-3'],[1,'0']]){
  assert.equal(await p.locator('.task table').count(),1);assert.equal(await p.evaluate(()=>state.kedja.index),index);
  const text=await p.locator('.task .tbody').innerText();assert.doesNotMatch(text,/f\(2\)\s*=\s*[-−]3/);
  await p.locator('#ans-0').fill(answer);await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.answered),true);
  assert.equal(await p.evaluate(()=>state.partResults[0]),true);await p.evaluate(()=>kedjaFortsatt());
 }
 assert.equal(await p.locator('.task table').count(),1);assert.equal(await p.evaluate(()=>state.kedja.index),2);
 assert.match(await p.locator('#partlabel').innerText(),/Svar 1 av 2/);
 await p.locator('#ans-0').fill('-3');await p.evaluate(()=>checkAnswer());
 assert.match(await p.locator('#partlabel').innerText(),/Svar 2 av 2/);
 await p.locator('#ans-1').fill('6');await p.evaluate(()=>checkAnswer());
 assert.deepEqual(await p.evaluate(()=>state.partResults),[true,true]);await p.locator('.task').screenshot({path:'/tmp/delkort-tabell-2436.png'});
 await p.evaluate(()=>{state.kedja=null;const q=state.data.bank.find(x=>x.id==='2.436');visaUppgift(expandGameTask(q)[2]);});
 await p.locator('#ans-0').fill('6');await p.evaluate(()=>checkAnswer());await p.locator('#ans-1').fill('-3');await p.evaluate(()=>checkAnswer());
 assert.deepEqual(await p.evaluate(()=>state.partResults),[false,false]);
 await p.evaluate(async()=>{await selectCourse('mato2');beginSession();const q=state.data.bank.find(x=>x.id==='3.116');visaUppgift(kedjaStarta(expandGameTask(q)[0]));});
 assert.match(await p.locator('.task .tbody').innerText(),/Figuren hör till del a/);assert.equal(await p.locator('.task svg').count()>0,true);
 assert.deepEqual(errors,[]);console.log('Ma2 2.436: tabellen visas en gång, samtliga svar rättas och koordinatordning bevaras. Ma4 3.116: figuren är märkt för a.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
