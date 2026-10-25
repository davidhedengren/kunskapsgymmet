/* Verklig miniräknare, svarsruta och delkedja; inga externa skrivningar. */
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
   return r.fulfill({path:path.join(process.env.REVIEW_DEPS||'/tmp/review-deps',m[1],'package',m[2])});
  });
  await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
  await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8057');
  await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
  await page.evaluate(async()=>{await selectCourse('ma1');setTrack('1c');beginSession();session=null;syncOwner=null;arLarare=false;visaUppgift(state.data.bank.find(q=>q.id==='0.1073'));hjalpVaxla('raknare');});
  const calculations=[
   ['ma1 0.1073','8*10^9*70/(5.97*10^24)',8e9*70/5.97e24],
   ['fy1 4.736 b','6.67*10^(-11)*1.67*10^(-27)*9.11*10^(-31)/(5.3*10^(-11))^2',6.67e-11*1.67e-27*9.11e-31/(5.3e-11)**2],
   ['fy1 4.677 d','0.0378/(1.45*10^15)',.0378/1.45e15],
   ['fy1 8.22 a','8.99*10^9*(1.602*10^(-19))^2/0.01^2',8.99e9*(1.602e-19)**2/.01**2],
   ['fy1 8.35 a','-12000*1.602*10^(-19)',-12000*1.602e-19],
   ['fy1 8.327','2500*1.602*10^(-19)',2500*1.602e-19],
   ['small angle','sin(10^(-14))',Math.sin(1e-14*Math.PI/180)],
   ['sin 180','sin(180)',0],['cos 90','cos(90)',0],['tan 180','tan(180)',0],
   ['negative tiny','-7.2*10^(-100)',-7.2e-100]
  ];
  for(const[id,expression,value]of calculations){
   await page.locator('#rk-in').fill(expression);await page.locator('#rk-in').press('Enter');
   const r=await page.evaluate(()=>({display:document.querySelector('#rk-res').textContent,value:rk.ans,history:rkHistVarde(rk.hist.length-1)}));
   assert.ok(value===0?r.value===0:Math.abs((r.value-value)/value)<1e-12,id);
   const restored=await page.evaluate(s=>raknTolka(s),r.history);
   assert.ok(value===0?restored===0:Math.abs((restored-value)/value)<1e-9,id+' history');rows.push({id,...r});
  }
  await page.locator('#rk-in').fill('9.4*10^(-14)');await page.locator('#rk-in').press('Enter');
  await page.locator('.rk-infoga').click();assert.match(await page.locator('#ans-0').inputValue(),/9,4·10\^-14/);
  await page.evaluate(()=>checkAnswer());assert.match(await page.locator('#answer-result').textContent(),/Rätt!/);
  await page.evaluate(()=>hjalpVaxla('raknare'));
  const selection=await page.evaluate(()=>{
   const rows=[];
   for(const track of ['1a','1b','1c'])for(const family of [null,'Proportionalitet i problemlösning']){
    setTrack(track);beginSession();state.focusArea='proportionalitet_grunder';state.focusFamily=family;state.focusNiva='3';state.sessionDone=3;
    const eligible=availableTasks().filter(q=>q.omr===state.focusArea&&levelOf(q)==='3'&&(!family||q.familj===family));
    const selected=[];
    for(let i=0;i<Math.min(8,eligible.length);i++){
     const t=chooseTask();selected.push(t.id);state.passHistory.push({task:t});state.lastIds.push(t.id);noteraSedd(t.id);
    }
    rows.push({track,family,count:eligible.length,selected});
   }
   return rows;
  });
  for(const r of selection){assert.ok(r.count>=8);assert.equal(new Set(r.selected).size,8);}
  await page.evaluate(async()=>{await selectCourse('mato2');setTrack('2c');window.startChain=(id,index=0)=>{beginSession();state.sessionTarget=30;const q=state.data.bank.find(q=>q.id===id);visaUppgift(kedjaStarta(expandGameTask(q)[index]));};});
  for(const width of [390,1280]){
   await page.setViewportSize({width,height:1000});
   await page.evaluate(()=>startChain('3.51',1));
   assert.match(await page.locator('.kedja-sammanhang').textContent(),/3\.51 · Del 1 av 3/);
   assert.match(await page.locator('.kedja-nu').textContent(),/a\).*Svårare nivå/s);
   const before=await page.evaluate(()=>({xp:profile.xp,attempts:profile.attempts}));
   await page.getByRole('button',{name:'Hoppa över den här delen',exact:true}).click();
   assert.deepEqual(await page.evaluate(()=>({xp:profile.xp,attempts:profile.attempts})),before);
   assert.match(await page.locator('.kedja-sammanhang').textContent(),/Del 2 av 3/);
   assert.match(await page.locator('.kedja-klar').textContent(),/Överhoppad/);
   await page.locator('#ans-0').fill('114');await page.locator('#kollaknapp').click();
   assert.match(await page.locator('#answer-result').textContent(),/Rätt!/);
   await page.locator('#kollaknapp').click();assert.match(await page.locator('.kedja-sammanhang').textContent(),/Del 3 av 3/);
   await page.locator('#ans-0').fill('168');await page.locator('#kollaknapp').click();
   assert.match(await page.locator('#answer-result').textContent(),/Rätt!/);
   await page.evaluate(()=>startChain('3.22',2));
   assert.match(await page.locator('.kedja-sammanhang').textContent(),/3\.22 · Del 1 av 3/);
   assert.match(await page.locator('.kedja-nu').textContent(),/a\)/);
   await page.locator('#ans-0').fill('5/2');await page.locator('#kollaknapp').click();
   assert.match(await page.locator('#answer-result').textContent(),/Rätt!/);
   assert.equal(await page.locator('.katex-error').count(),0);
   fs.mkdirSync('/tmp/fellogg-0758',{recursive:true});await page.locator('.task').screenshot({path:'/tmp/fellogg-0758/kedja-'+width+'.png'});
  }
  const analogous=await page.evaluate(()=>state.data.bank.filter(q=>q.spelDelar?.length>1&&q.id!=='3.51'&&q.id!=='3.22').slice(0,5).map(q=>q.id));
  for(const id of analogous){const r=await page.evaluate(id=>{startChain(id,1);return {id:state.currentTask.ursprungsId,part:state.currentTask.deluppgift,html:document.querySelector('.kedja-sammanhang')?.textContent};},id);assert.equal(r.id,id);assert.equal(r.part,'a');rows.push(r);}
  // A skipped middle part must not discard a later easier part.
  const middle=await page.evaluate(()=>{
   startChain('3.51',0);const k=state.kedja;k.delar[1].extra=true;
   document.querySelector('#ans-0').value='2';checkAnswer();
   document.querySelector('#hoppaoverbtn').click();
   return {part:state.currentTask.deluppgift,done:k.gjorda.map(g=>[g.etikett,!!g.overhoppad])};
  });assert.equal(middle.part,'c');assert.deepEqual(middle.done,[['a',false],['b',true]]);
  // Exams keep the chosen independent card; no forced chain or optional skipping.
  const exam=await page.evaluate(()=>{state.prov=true;const t=expandGameTask(state.data.bank.find(q=>q.id==='3.51'))[1];return {id:kedjaStarta(t).id,chain:state.kedja,expected:t.id};});assert.equal(exam.id,exam.expected);assert.equal(exam.chain,null);
  assert.deepEqual(errors,[]);console.log(JSON.stringify({calculations:rows,analogous,middle,selection,errors},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
