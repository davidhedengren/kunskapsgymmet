'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])});});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8222');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(async()=>{await selectCourse('fy1');session=null;syncOwner=null;arLarare=false;cheer=()=>{};});
 for(const width of [390,1280]){
  await p.setViewportSize({width,height:900});
  for(const [id,x,y] of [['3.301','0','0'],['3.302','0','-2'],['3.303','0','3'],['3.304','6','4'],['3.305','6','1'],['3.306','-3','5'],['3.307','2','2'],['3.308','-2','-4']]){
   await p.evaluate(id=>{beginSession();state.sessionTarget=30;visaUppgift(kedjaStarta(expandGameTask(state.data.bank.find(q=>q.id===id))[0]));},id);
   assert.match(await p.locator('.task .tbody').innerText(),/x-komposanten/i,id);
   await p.locator('#ans-0').fill(x);await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.partResults[0]),true,id+' x');
   await p.evaluate(()=>showSolution());const solution=await p.locator('#solution-holder').innerText();assert.match(solution,/x-komposanter/i,id);assert.doesNotMatch(solution,/y-komposant|vektorform/i,id);
   if(id==='3.304')await p.locator('.task').screenshot({path:`/tmp/fy1-vektorer-${width}.png`});
   await p.evaluate(()=>kedjaFortsatt());assert.match(await p.locator('.task .tbody').innerText(),/y-komposanten/i,id);
   await p.locator('#ans-0').fill(y);await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.partResults[0]),true,id+' y');
  }
 }
 assert.deepEqual(errors,[]);console.log('8 vektorkedjor: lösning och korrekt x/y-rättning på mobil och dator passerar.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
