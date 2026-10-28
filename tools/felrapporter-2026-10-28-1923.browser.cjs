const {chromium}=require('playwright');
const assert=require('node:assert/strict'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://*.supabase.co/**',r=>r.abort());
  await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
  if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
   const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
   return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});
  });
  await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
  await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8217');
  await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
  await page.evaluate(()=>selectCourse('ma1'));
  await page.evaluate(()=>{
   session=null;syncOwner=null;arLarare=false;
   finishAttempt=r=>{state.answered=true;window.reviewResult=r;};
   window.prepareReview=id=>{
    state.currentTask=state.data.bank.find(q=>q.id===id);state.answered=false;state.noXp=false;
    state.solutionShown=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;
    state.altValda=new Set();state.altOrdningId=null;window.reviewResult=null;renderTraining();
   };
  });
  for(const width of [390,1280]){
   await page.setViewportSize({width,height:900});
   for(const answer of ['-1.44','-1,44 %','-1.4','-0.0144']){
    const r=await page.evaluate(answer=>{
     prepareReview('3.06');document.querySelector('#ans-0').value=answer;checkAnswer();
     const text=document.querySelector('#delfacit-0')?.innerText||'';
     const before=window.reviewResult;
     if(text.includes('Stämmer även resten'))bedomDel(0,true,0);
     return {before,text,after:window.reviewResult};
    },answer);
    assert.equal(r.before,null,answer);assert.match(r.text,/Stämmer även resten/,answer);
    assert.deepEqual(r.after,[true],answer);
   }
   for(const answer of ['x','1.44','0','-1.5','-0.0144 %']){
    const r=await page.evaluate(answer=>{
     prepareReview('3.06');document.querySelector('#ans-0').value=answer;checkAnswer();
     return {result:window.reviewResult,manual:document.querySelector('#delfacit-0')?.innerText||''};
    },answer);
    assert.deepEqual(r.result,[false],answer);assert.doesNotMatch(r.manual,/Stämmer även resten/,answer);
   }
   const reveal=await page.evaluate(()=>{
    prepareReview('3.06');showSolution();
    const canSelfGrade=[...document.querySelectorAll('#solution-holder button')].some(b=>/Jag hade rätt/.test(b.innerText));
    const noXp=state.noXp;giveUp();return {canSelfGrade,noXp,result:window.reviewResult};
   });
   assert.equal(reveal.canSelfGrade,false);assert.equal(reveal.noXp,true);assert.deepEqual(reveal.result,[false]);
   for(const [id,correct,wrong] of [
    ['3.58',['-1','-1 %','-0.01'],['x','1','0','-10']],
    ['3.190',['55','55 %','0.55'],['x','65','45','0']]
   ]){
    for(const answer of correct){
     const r=await page.evaluate(({id,answer})=>{
      prepareReview(id);document.querySelector('#ans-0').value=answer;checkAnswer();
      const text=document.querySelector('#delfacit-0')?.innerText||'';
      if(text.includes('Stämmer även resten'))bedomDel(0,true,0);
      return {text,result:window.reviewResult};
     },{id,answer});
     assert.match(r.text,/Stämmer även resten/,id+' '+answer);assert.deepEqual(r.result,[true],id+' '+answer);
    }
    for(const answer of wrong){
     const r=await page.evaluate(({id,answer})=>{prepareReview(id);document.querySelector('#ans-0').value=answer;checkAnswer();return window.reviewResult;},{id,answer});
     assert.deepEqual(r,[false],id+' '+answer);
    }
   }
  }
  await page.setViewportSize({width:390,height:900});
  await page.evaluate(()=>{prepareReview('3.06');showSolution();});
  await page.locator('.task').screenshot({path:'/tmp/fellogg-2026-10-28-ma1-306.png'});
  await page.evaluate(()=>selectCourse('ma2'));
  for(const answer of ['12.5','12,5 cm']){
   const result=await page.evaluate(answer=>{prepareReview('3.544');document.querySelector('#ans-0').value=answer;checkAnswer();return window.reviewResult;},answer);
   assert.deepEqual(result,[true],answer);
  }
  const bad=await page.evaluate(()=>{prepareReview('3.544');document.querySelector('#ans-0').value='16';checkAnswer();return window.reviewResult;});
  assert.deepEqual(bad,[false]);
  const quadrant=await page.evaluate(()=>{
   prepareReview('3.669');const q=state.currentTask;
   const alt=altLista(q),correct=alt.findIndex(a=>a.ratt);vaxlaAlt(correct);kollaAlt();
   return {result:window.reviewResult,labels:[...document.querySelectorAll('.task svg text')].map(e=>e.textContent.trim())};
  });
  assert.deepEqual(quadrant.result,[true]);assert.ok(!quadrant.labels.some(x=>['I','II','III','IV'].includes(x)));
  assert.deepEqual(errors,[]);console.log('Ma1 3.06: rätt/fel, manuell komplettering och facit utan XP; Ma2 3.544 och 3.669: rättning och figur kontrollerade.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
