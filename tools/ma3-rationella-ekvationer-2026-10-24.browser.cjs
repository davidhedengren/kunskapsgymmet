/* Kör mot lokala servrar. Ingen inloggning eller skrivning till Supabase. */
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),out=process.env.REVIEW_OUT||'/tmp/ma3-rationella-ekvationer';fs.mkdirSync(out,{recursive:true});
const courses=['mato1'];
const reviewedIds=Array.from({length:8},(_,i)=>'1.'+(933+i));
const groups=courses.map(course=>{let c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'uppgifter'+course+'.js'),'utf8'),c);return {course,tasks:JSON.parse(JSON.stringify(c.window['BANK'+course.toUpperCase()].filter(q=>reviewedIds.includes(q.id))))};});
const special={'mato1:1.937':[['6 timmar','6 h'],['8 h']], 'mato1:1.940':[['a=4'],['2']]};
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[],failures=[],views=[],structure=[];let checks=0;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto(process.env.REVIEW_URL||'http://localhost:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 for(const g of groups){
  assert.ok(g.tasks.length>=8);await page.evaluate(c=>selectCourse(c),g.course);
  for(const track of ['1b','1c']){
   const ids=await page.evaluate(({track,ids})=>{setTrack(track);const cards=getCards();return [...new Set(availableTasks().filter(q=>ids.includes(q.ursprungsId||q.id)&&cards.some(c=>c.kap===q.kap&&c.omr.includes(q.omr))).map(q=>q.ursprungsId||q.id))].sort();},{track,ids:g.tasks.map(q=>q.id)});
   assert.deepEqual(ids,g.tasks.filter(q=>q.kurs.includes(track)).map(q=>q.id).sort());structure.push({track,ids});
  }
  await page.evaluate(tasks=>{window.reviewBank=tasks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.prepareReview=id=>{state.currentTask=reviewBank.find(q=>q.id===id);state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;state.altValda=new Set();state.altOrdningId=null;window.result=null;renderTraining();hjalpSynk();};},g.tasks);
  for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const q of g.tasks){const key=g.course+':'+q.id;if(process.env.REVIEW_ONLY&&!new RegExp(process.env.REVIEW_ONLY).test(key))continue;
   if(q.alternativ){
    for(let mask=1;mask<2**q.alternativ.length;mask++){
     const expected=q.alternativ.every((a,i)=>Boolean(mask&(1<<i))===a.ratt);
     const r=await page.evaluate(({id,mask,options})=>{prepareReview(id);options.forEach((a,i)=>{if(mask&(1<<i))vaxlaAlt(altLista(state.currentTask).findIndex(x=>x.txt===a.txt));});kollaAlt();return window.result;},{id:q.id,mask,options:q.alternativ});
     if(r?.every(Boolean)!==expected)failures.push({key,width,mask,expected,r});checks++;
    }
   }else{
    const correct=Array.isArray(q.rättSvar)?q.rättSvar.map(String):[String(q.rättSvar)];
    const cases=[[correct,true],[correct.map(()=> '987654321'),false]];
    if(q.id==='1.939')cases.push([['4 cm','6 cm'],true],[['6 cm','4 cm'],true],[['4 m','6 m'],false]);
    if(q.svarsstruktur==='mängd')cases.push([[...correct].reverse(),true]);
    if(key==='mato2:6.07')cases.push([['0.52','2.62'],true],[['0.5','2.6'],true],[['pi/6','5*pi/6'],true],[['5π/6 rad','π/6 rad'],true]);
    if(q.svarsstruktur==='ordnad'&&new Set(correct).size>1)cases.push([[...correct].reverse(),false]);
    if(correct.length===1&&q.svarEnhet&&typeof q.rättSvar==='number')cases.push([[correct[0]+' '+q.svarEnhet],true],[[correct[0]+' kg'],false]);
    if(correct.length===1&&typeof q.rättSvar==='number'&&!Number.isInteger(q.rättSvar)&&!/exakt/.test(q.t))cases.push([[q.rättSvar.toFixed(2).replace('.',',')],true]);
    if(special[key])for(const[i,inputs]of special[key].entries())for(const value of inputs)cases.push([[value],i===0]);
    for(const[values,expected]of cases){const r=await page.evaluate(({id,values})=>{prepareReview(id);const fields=[...document.querySelectorAll('input[id^="ans-"]')];if(fields.length!==values.length)return {fieldCount:fields.length};values.forEach((v,i)=>fields[i].value=v);for(let k=0;k<values.length&&!window.result;k++)checkAnswer();return window.result;},{id:q.id,values});
     if(!Array.isArray(r)||r.every(Boolean)!==expected)failures.push({key,width,values,expected,r});checks++;
    }
   }
   await page.evaluate(id=>{prepareReview(id);showSolution();},q.id);
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.task .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent),calculator:raknareTillaten(state.currentTask)}));
   if(status.latex||status.wide||status.math.length||status.calculator!==q.miniräknare)failures.push({key,width,...status});
   views.push({key,width,...status});await page.evaluate(()=>window.scrollTo(0,0));await page.locator('.task').screenshot({path:`${out}/${g.course}-${q.id}-${width}.png`});
  }}
 }
 const figures=groups.flatMap(g=>g.tasks.flatMap(q=>(q.t.match(/<svg[\s\S]*?<\/svg>/g)||[]).map(svg=>({bank:'uppgifter'+g.course+'.js',taskId:q.id,svg,paths:['t']}))));
 fs.writeFileSync(out+'/figures.json',JSON.stringify(figures));
 const gal=await browser.newPage({viewport:{width:1100,height:900}});for(let i=0;i<figures.length;i+=6){await gal.setContent('<body style="font-family:Arial;display:grid;grid-template-columns:1fr 1fr;gap:20px">'+figures.slice(i,i+6).map(q=>'<section><h3>'+q.bank+' '+q.taskId+'</h3>'+q.svg+'</section>').join('')+'</body>');await gal.screenshot({path:out+'/gallery-'+i+'.png',fullPage:true});}
 fs.writeFileSync(out+'/browser.json',JSON.stringify({checks,views,structure,failures,errors},null,2));console.log({checks,views:views.length,tracks:structure.length,figures:figures.length,failures,errors});assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
