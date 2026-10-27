/* Kontrollera att olikheter inte tolkas som HTML och döljer resten av facit. */
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://*.supabase.co/**',r=>r.abort());
  await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
  if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
   const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
   return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});
  });
  await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
  await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8057');
  await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
  await page.evaluate(()=>selectCourse('mato2'));
  const results=await page.evaluate(()=>{
   session=null;syncOwner=null;arLarare=false;
   return ['3.11b','3.179'].map(id=>{
    const parent=state.data.bank.find(q=>q.id===(id==='3.11b'?'3.11':id));
    state.currentTask=expandGameTask(parent).find(q=>q.id===id);state.answered=false;
    state.solutionShown=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;
    state.altValda=new Set();state.altOrdningId=null;renderTraining();showSolution();
    const task=document.querySelector('.task');
    return {id,text:task.innerText,math:task.querySelectorAll('.katex').length,errors:task.querySelectorAll('.katex-error').length};
   });
  });
  assert.match(results[0].text,/trianglarnas areor/);
  assert.match(results[0].text,/geometriska arean är\s+1/);
  assert.match(results[1].text,/ligger/);
  assert.match(results[1].text,/Därmed är/);
  assert.ok(results.every(r=>r.math>0&&r.errors===0));assert.deepEqual(errors,[]);
  console.log('Båda faciten visas fullständigt med renderad matematik.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
