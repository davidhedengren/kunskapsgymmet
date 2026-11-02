'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8222');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(()=>{session=null;syncOwner=null;arLarare=false;cheer=()=>{};});
 for(const width of [390,1280])for(const [course,id,a,bv] of [['ma2','1.104','-5','y=-2x+3'],['ma2','1.76','850-32t','10'],['ma2','1.234','105',null],['mato1','2.20','1.5*e^(0.5*x)','1.5*x+3']]){
  await p.setViewportSize({width,height:900});await p.evaluate(async course=>{await selectCourse(course);beginSession();state.sessionTarget=30},course);
  await p.evaluate(id=>{const q=state.data.bank.find(x=>x.id===id);visaUppgift(kedjaStarta(expandGameTask(q)[0]));visaLedtrad()},id);
  let h=await p.locator('#ledtrad-holder').innerText();
  if(id==='1.104'){assert.match(h,/tre första/);assert.doesNotMatch(h,/k\s*=|m\s*=|−2|\b3\b/);}
  if(id==='1.76'){assert.match(h,/början/);assert.doesNotMatch(h,/850|32/);}
  if(id==='1.234'){assert.match(h,/Sätt in fem/);assert.doesNotMatch(h,/konstantterm|fast avgift|oberoende/i);}
  if(id==='2.20'){assert.match(h,/multiplicerar/);assert.doesNotMatch(h,/tangent/);}
  await p.locator('#ans-0').fill(a);await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.partResults[0]),true,id+' a');
  if(id==='1.104'){await p.evaluate(()=>showSolution());const sol=await p.locator('#solution-holder').innerText();assert.doesNotMatch(sol,/y\s*=\s*[−-]2x\s*\+\s*3/);}
  await p.evaluate(()=>{kedjaFortsatt();visaLedtrad()});h=await p.locator('#ledtrad-holder').innerText();
  if(id==='1.104')assert.match(h,/riktningskoefficienten/);
  if(id==='1.76')assert.match(h,/530/);
  if(id==='2.20')assert.match(h,/tangentpunkten/);
  if(id==='1.234')assert.match(h,/oberoende/);
  if(bv===null)await p.evaluate(()=>{vaxlaAlt(altLista(state.currentTask).findIndex(a=>a.ratt));kollaAlt()});
  else{await p.locator('#ans-0').fill(bv);await p.evaluate(()=>checkAnswer());}if(bv===null){assert.equal(await p.evaluate(()=>state.answered),true,id+' b');assert.equal(await p.locator('.alt.ratt').count(),1);}else assert.equal(await p.evaluate(()=>state.partResults[0]),true,id+' b');
 }
 assert.deepEqual(errors,[]);console.log('Fyra uppgifter: relevanta delledtrådar och rättning på mobil och dator passerar.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
