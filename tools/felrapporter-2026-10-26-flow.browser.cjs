/* Verklig delkedja, sparning/omladdning, manuell bedömning och svarsformat. */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage(),errors=[],rows=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://*.supabase.co/**',r=>r.abort());
  await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
  await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
   const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
   return r.fulfill({path:path.join('/tmp/review-deps',m[1],'package',m[2])});
  });
  await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
  await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8057');
  await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
  await page.evaluate(async()=>{await selectCourse('fy1');session=null;syncOwner=null;arLarare=false;});
  for(const width of [390,1280]){
   await page.setViewportSize({width,height:1000});
   await page.evaluate(()=>{beginSession();state.sessionTarget=30;const parts=expandGameTask(state.data.bank.find(q=>q.id==='3.93'));visaUppgift(kedjaStarta(parts[2]));});
   assert.match(await page.locator('.kedja-sammanhang').textContent(),/Del 1 av 3/);
   await page.locator('#ans-0').fill('2');await page.evaluate(()=>checkAnswer());
   assert.equal(await page.evaluate(()=>state.answered),true);
   await page.evaluate(()=>kedjaFortsatt());
   const saved=await page.evaluate(()=>{sparaPagaendePass();return lasPagaendePass();});
   assert.equal(saved.kedja.aktuell,'3.93b');assert.equal(saved.kedja.gjorda[0].svar,'2');
   await page.reload();await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
   const after=await page.evaluate(async saved=>{await selectCourse('fy1');session=null;syncOwner=null;state.adminBlad=null;assertResume=aterupptaPass(saved);renderTraining();return {ok:assertResume,xp:state.sessionXp,done:state.sessionDone,id:state.currentTask.id};},saved);
   assert.equal(after.ok,true);assert.equal(after.id,'3.93b');assert.equal(after.xp,saved.xp);assert.equal(after.done,saved.done);
   assert.match(await page.locator('.kedja-sammanhang').textContent(),/Del 2 av 3/);
   assert.match(await page.locator('.kedja-klar').textContent(),/Ditt svar: 2/);
   await page.locator('#ans-0').fill('34 s');await page.evaluate(()=>checkAnswer());
   assert.equal(await page.evaluate(()=>state.answered),true);
   const completed=await page.evaluate(()=>{sparaPagaendePass();return lasPagaendePass();});
   await page.evaluate(d=>{state.kedja=null;aterupptaPass(d);renderTraining();},completed);
   assert.equal(await page.locator('.kedja-klar').count(),1,'Den aktuella delen ska inte visas två gånger');
   const before=await page.evaluate(()=>({xp:state.sessionXp,done:state.sessionDone}));
   await page.evaluate(()=>passFramat());
   assert.equal(await page.evaluate(()=>state.currentTask.id),'3.93c');
   assert.deepEqual(await page.evaluate(()=>({xp:state.sessionXp,done:state.sessionDone})),before);
   const old={...saved};delete old.kedja;
   await page.evaluate(d=>{state.kedja=null;aterupptaPass(d);renderTraining();},old);
   assert.match(await page.locator('.kedja-klar').textContent(),/svaret finns inte/);
   assert.equal(await page.evaluate(()=>state.sessionXp),saved.xp);
   const malicious=JSON.parse(JSON.stringify(saved));malicious.kedja.gjorda[0].svar='<img src=x onerror="window.injected=true">';
   await page.evaluate(d=>{state.kedja=null;aterupptaPass(d);renderTraining();},malicious);
   assert.equal(await page.locator('.kedja-svar img').count(),0);
   rows.push({width,id:'3.93',reload:true,oldSave:true,noDuplicateXp:true});
  }
  for(const id of ['3.89','3.90','3.91','3.119','3.155']){
   const r=await page.evaluate(id=>{beginSession();state.sessionTarget=30;const parts=expandGameTask(state.data.bank.find(q=>q.id===id));visaUppgift(kedjaStarta(parts.at(-1)));const first=state.currentTask;document.querySelector('#ans-0').value=(first.svarVardesiffror?first.rättSvar.toPrecision(first.svarVardesiffror):String(first.rättSvar));checkAnswer();kedjaFortsatt();const saved=lasPagaendePass();state.kedja=null;aterupptaPass(saved);renderTraining();return {id,part:state.currentTask.deluppgift,previous:state.kedja.gjorda.length,firstOk:saved.kedja.gjorda[0].ok,xp:state.sessionXp===saved.xp};},id);
   assert.equal(r.part,'b');assert.equal(r.previous,1);assert.equal(r.firstOk,true);assert.equal(r.xp,true);rows.push(r);
  }
  await page.evaluate(async()=>{await selectCourse('ma1');setTrack('1c');beginSession();state.currentTask=expandGameTask(state.data.bank.find(q=>q.id==='2.180'))[2];state.kedja=null;state.answered=false;state.solutionShown=false;renderTraining();});
  assert.equal(await page.evaluate(()=>expectedAnswersForTask(state.currentTask).auto),false);
  await page.evaluate(()=>showSolution());
  const buttons=await page.locator('.task button').allTextContents();assert.ok(buttons.some(s=>/Jag hade rätt/i.test(s)));assert.ok(buttons.some(s=>/Jag behöver träna mer/i.test(s)));
  await page.evaluate(()=>selfGrade(true));assert.equal(await page.evaluate(()=>state.answered),true);
  const formats=await page.evaluate(()=>{
   const rows=[];
   for(const [a,f,ok]of [['x^3-512=0','x^3=512',true],['x^2=512','x^3=512',false],['512','x^3=512',false],['3x+1=7','2x+1=7',false],['7=2x+1','2x+1=7',true],['y-1=3(x-2)','y=3x-5',true],['2x^2-8=0','x^2=4',true],['2x^2-9=0','x^2=4',false],['y=-1.5x+4','y=4-3x/2',true],['pi/3','π/3',true]])rows.push({a,f,ok,result:formatRatt(a,f,{format:'uttryck'})});
   for(const [a,f,ok]of [['omöjligt','ingen lösning',true],['omöjligt','ingen korrelation',false],['ingen reell lösning','ingen lösning',true],['3;1;1;2','1;2;3',true],['3;1;1;4','1;2;3',false]])rows.push({a,f,ok,result:f.includes(';')?formatRatt(a,f,{format:'mängd',tolerans:0}):textSvarRatt(a,f)});
   return rows;
  });
  for(const r of formats)assert.equal(r.result,r.ok,JSON.stringify(r));
  assert.equal(await page.evaluate(()=>KG_TEST_ANSWER_CHECKER()),true);assert.equal(await page.evaluate(()=>KG_TEST_MA4_SVAR()),true);assert.deepEqual(errors,[]);console.log({chains:rows,formats:formats.length,manual:true,errors});
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
