/* Kör mot lokala servrar. Ingen inloggning eller skrivning till Supabase. */
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),out=process.env.REVIEW_OUT||'/tmp/ma3-bankomgang';fs.mkdirSync(out,{recursive:true});
const courses=[process.env.REVIEW_COURSE||'mato1'];
const reviewedIds=process.env.REVIEW_IDS.split(',');
const bankFile=course=>({fy1:'uppgifter.js',fy2:'uppgifter2.js'}[course]||'uppgifter'+course+'.js');
const groups=courses.map(course=>{let c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,bankFile(course)),'utf8'),c);return {course,tasks:JSON.parse(JSON.stringify(Object.values(c.window).find(Array.isArray).filter(q=>reviewedIds.includes(q.id))))};});
const special=process.env.REVIEW_CASES_FILE?JSON.parse(fs.readFileSync(process.env.REVIEW_CASES_FILE,'utf8')):{};
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[],failures=[],views=[],structure=[];let checks=0;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto(process.env.REVIEW_URL||'http://localhost:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 for(const g of groups){
  assert.equal(g.tasks.length,reviewedIds.length);await page.evaluate(c=>selectCourse(c),g.course);
  for(const track of [...new Set(g.tasks.flatMap(q=>(q.kurs||[null])))]){
   const ids=await page.evaluate(({track,ids})=>{if(track)setTrack(track);const cards=getCards();return [...new Set(availableTasks().filter(q=>ids.includes(q.ursprungsId||q.id)&&cards.some(c=>c.kap===q.kap&&c.omr.includes(q.omr))).map(q=>q.ursprungsId||q.id))].sort();},{track,ids:g.tasks.map(q=>q.id)});
   assert.deepEqual(ids,g.tasks.filter(q=>q.spel!==false&&(!q.kurs||q.kurs.includes(track))).map(q=>q.id).sort());structure.push({track,ids});
  }
  g.parents=g.tasks;g.tasks=await page.evaluate(tasks=>tasks.flatMap(expandGameTask),g.tasks);
  await page.evaluate(tasks=>{window.reviewBank=tasks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.prepareReview=id=>{state.currentTask=reviewBank.find(q=>q.id===id);state.answered=false;state.solutionShown=false;state.hintVisible=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;state.altValda=new Set();state.altOrdningId=null;window.result=null;renderTraining();hjalpSynk();};},g.tasks);
  for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const q of g.tasks){const key=g.course+':'+q.id;if(process.env.REVIEW_ONLY&&!new RegExp(process.env.REVIEW_ONLY).test(key))continue;
   if(Array.isArray(q.självrättning)&&q.självrättning.includes(false)&&!process.env.REVIEW_RENDER_ONLY){
    // Blandad bedömning: testa endast automatdelen; resonemanget kräver fortfarande lärare/elevbedömning.
    for(let i=0;i<q.självrättning.length;i++)if(q.självrättning[i])for(const [value,expected] of [[String(q.rättSvar[i]),true],['987654321',false],...(key==='matf1:3.08'?[['1/25',true],['0.039',false],['0.041',false]]:[])]){
     const r=await page.evaluate(({id,i,value})=>{prepareReview(id);const q=state.currentTask;const fields=[...document.querySelectorAll('input[id^="ans-"],textarea[id^="ans-"]')];fields[i].value=value;return delSvarRatt(fields[i].value,q.rättSvar[i],Array.isArray(q.svarEnhet)?q.svarEnhet[i]:q.svarEnhet,Array.isArray(q.tolerans)?q.tolerans[i]:q.tolerans,q,i,Array.isArray(q.svarFormat)?q.svarFormat[i]:q.svarFormat);},{id:q.id,i,value});
     if(r!==expected)failures.push({key,width,value,expected,r,mixed:true});checks++;
    }
   }else if(q.självrättning===false||process.env.REVIEW_RENDER_ONLY){
    // Manuella uppgifter granskas visuellt; ingen påhittad automatpoäng.
   }else if(q.alternativ){
    for(let mask=1;mask<2**q.alternativ.length;mask++){
     const expected=q.alternativ.every((a,i)=>Boolean(mask&(1<<i))===a.ratt);
     const r=await page.evaluate(({id,mask,options})=>{prepareReview(id);options.forEach((a,i)=>{if(mask&(1<<i))vaxlaAlt(altLista(state.currentTask).findIndex(x=>x.txt===a.txt));});kollaAlt();return window.result;},{id:q.id,mask,options:q.alternativ});
     if(r?.every(Boolean)!==expected)failures.push({key,width,mask,expected,r});checks++;
    }
   }else{
    const correct=Array.isArray(q.rättSvar)?q.rättSvar.map(String):[String(q.rättSvar)];
    const cases=[[correct,true],[correct.map(()=> '987654321'),false]];
    
    if(q.svarsstruktur==='mängd')cases.push([[...correct].reverse(),true]);
    if(key==='mato2:6.07')cases.push([['0.52','2.62'],true],[['0.5','2.6'],true],[['pi/6','5*pi/6'],true],[['5π/6 rad','π/6 rad'],true]);
    if(q.svarsstruktur==='ordnad'&&new Set(correct).size>1)cases.push([[...correct].reverse(),false]);
    if(correct.length===1&&q.svarEnhet&&typeof q.rättSvar==='number')cases.push([[correct[0]+' '+q.svarEnhet],true],[[correct[0]+' kg'],false]);
    if(correct.length===1&&typeof q.rättSvar==='number'&&!Number.isInteger(q.rättSvar)&&!/(exakt|decimal|värdesiff)/i.test(q.t))cases.push([[(Math.round((q.rättSvar+Number.EPSILON)*100)/100).toFixed(2).replace('.',',')],q.svarFormat!=='decimalform'&&Number((Math.round((q.rättSvar+Number.EPSILON)*100)/100).toFixed(2))!==0]);
    if(special[key])for(const[i,inputs]of special[key].entries())for(const value of inputs)cases.push([Array.isArray(value)?value:[value],i===0]);
    for(const[values,expected]of cases){const r=await page.evaluate(({id,values})=>{prepareReview(id);const fields=[...document.querySelectorAll('input[id^="ans-"],textarea[id^="ans-"]')];if(fields.length!==values.length)return {fieldCount:fields.length};values.forEach((v,i)=>fields[i].value=v);for(let k=0;k<values.length&&!window.result;k++)checkAnswer();return window.result;},{id:q.id,values});
     if(!Array.isArray(r)||r.every(Boolean)!==expected)failures.push({key,width,values,expected,r});checks++;
    }
   }
   await page.evaluate(id=>{prepareReview(id);visaLedtrad();showSolution();},q.id);
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.task .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent),calculator:raknareTillaten(state.currentTask)}));
   if(status.latex||status.wide||status.math.length||status.calculator!==q.miniräknare)failures.push({key,width,...status});
   views.push({key,width,...status});await page.evaluate(()=>window.scrollTo(0,0));await page.locator('.task').screenshot({path:`${out}/${g.course}-${q.id}-${width}.png`});
  }}
 }
 let teacherViews=0; const tasks=[...new Map(groups.flatMap(g=>[...g.parents,...g.tasks]).map(q=>[q.id,q])).values()];
 if(process.env.REVIEW_TEACHER_URL){
 const teacher=await browser.newPage();teacher.on('pageerror',e=>errors.push(e.message));await teacher.route('https://*.supabase.co/**',r=>r.abort());await teacher.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await teacher.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
 await teacher.goto(process.env.REVIEW_TEACHER_URL);await teacher.waitForFunction(()=>typeof renderMathInElement==='function'&&typeof uppgiftsText==='function');
 await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;background:white;color:#243447"></main>';});
 for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const q of tasks){await teacher.evaluate(q=>{const el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});},q);const bad=await teacher.evaluate(()=>document.querySelectorAll('.katex-error').length||document.documentElement.scrollWidth>innerWidth+1||[...document.querySelectorAll('.katex-display')].some(e=>e.scrollWidth>e.clientWidth+1));if(bad)failures.push({app:'teacher',id:q.id,width});teacherViews++;}}
 }
 const figures=groups.flatMap(g=>g.tasks.flatMap(q=>(q.t.match(/<svg[\s\S]*?<\/svg>/g)||[]).map(svg=>({bank:bankFile(g.course),taskId:q.id,svg,paths:['t']}))));
 fs.writeFileSync(out+'/figures.json',JSON.stringify(figures));
 const gal=await browser.newPage({viewport:{width:1100,height:900}});for(let i=0;i<figures.length;i+=6){await gal.setContent('<body style="font-family:Arial;display:grid;grid-template-columns:1fr 1fr;gap:20px">'+figures.slice(i,i+6).map(q=>'<section><h3>'+q.bank+' '+q.taskId+'</h3>'+q.svg+'</section>').join('')+'</body>');await gal.screenshot({path:out+'/gallery-'+i+'.png',fullPage:true});}
 fs.writeFileSync(out+'/browser.json',JSON.stringify({checks,views,teacherViews,structure,failures,errors},null,2));console.log({checks,views:views.length,teacherViews,tracks:structure.length,figures:figures.length,failures,errors});assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
