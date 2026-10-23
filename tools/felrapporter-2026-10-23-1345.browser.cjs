/* Lokal konsumentkontroll utan konton eller skrivningar till Supabase. */
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),out=process.env.REVIEW_OUT||'/tmp/reports1345';fs.mkdirSync(out,{recursive:true});
const groups=[{course:'ma1',file:'uppgifterma1.js',key:'BANKMA1',ids:['3.114','0.1121','1.116','3.23','3.65','3.70','3.71','3.105']},{course:'fy2',file:'uppgifter2.js',key:'BANK2',ids:['3.426','5.360','5.361','5.323','5.314','5.324','2.498','5.356','5.357','5.358','5.362','5.365']}];
for(const g of groups){const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,g.file),'utf8'),c);g.tasks=c.window[g.key].filter(q=>g.ids.includes(q.id));assert.equal(g.tasks.length,g.ids.length);}
const inputs={
 'ma1:3.114':[['27','27 %','27.3','27.27 %','27.2727','300/11','(300/11) %','300/11 procent'],['27.2','28','12','27 kr','300/11 kr','300/12 %','300/0 %']],
 'ma1:3.23':[['12','12.2 %','12.1966'],['12.3','13','12 m']],
 'ma1:3.65':[['8','8.4','8.45 %','8.447177'],['8.5','8.44','9']],
 'ma1:3.70':[['56','56.3','56.25 %','225/4 %'],['56.2','36','56 m']],
 'ma1:3.71':[['56','56.3 %','56.25'],['56.2','25']],
 'ma1:3.105':[['4','4.5 %','4.47','4.46975'],['4.4','4.46','5']],
 'ma1:0.1121':[['(-2;-8)','(-1;-7)','(-0,5;-6,5)','(-1/2;-13/2)','(-7;-13)'],['(-8;-2)','(0;-6)','(2;-4)','(-2;-7)']],
 'ma1:1.116':[['10/3','20/6','x=10/3'],['3.33','-10/3']],
 'fy2:5.314':[['A'],['B','C','D']], 'fy2:5.324':[['D'],['A','B','C']],
 'fy2:5.323':[['10'],['100','5']],
 'fy2:5.360:0':[['2.3e29','2.31e29 W'],['2.31e28 W','2.31e29 J']],
 'fy2:5.360:1':[['-2.2','-2.21'],['2.2']],
 'fy2:5.361:0':[['1040','1038'],['104','10']],
 'fy2:5.361:1':[['2.2','2.22'],['4.4']],
 'fy2:2.498:0':[['0.249 m'],['0.041 m']],
 'fy2:2.498:1':[['0.041','0.0410 m','4.1 cm'],['0.249 m','0.041 kg']],
 'fy2:2.498:2':[['0.253 kg'],['2.53 kg']]
};
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[],issues=[],observed=[];let checks=0,views=0;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],'package',m[2])});});
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto(process.env.REVIEW_URL||'http://localhost:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 for(const g of groups){
  await page.evaluate(course=>selectCourse(course),g.course);
  const cards=await page.evaluate(tasks=>{window.reviewBank=tasks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.prepareReview=(id,part)=>{state.currentTask=expandGameTask(reviewBank.find(q=>q.id===id))[part];state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;state.altValda=new Set();state.altOrdningId=null;window.result=null;renderTraining();hjalpSynk();};return tasks.flatMap(q=>expandGameTask(q).map((t,i)=>({id:q.id,part:i,split:!!q.spelDelar,alternativ:t.alternativ})));},g.tasks);
  for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const card of cards){const key=g.course+':'+card.id+(card.split?':'+card.part:'');
   if(card.alternativ){for(const a of card.alternativ){const r=await page.evaluate(([id,part,text])=>{prepareReview(id,part);const i=altLista(state.currentTask).findIndex(x=>x.txt===text);vaxlaAlt(i);kollaAlt();return window.result;},[card.id,card.part,a.txt]);assert.equal(r.every(Boolean),a.ratt,key);checks++;}}
   else if(inputs[key])for(const [i,list]of inputs[key].entries())for(const v of list){const r=await page.evaluate(([id,part,v])=>{prepareReview(id,part);document.getElementById('ans-0').value=v;checkAnswer();return window.result;},[card.id,card.part,v]);assert.ok(r,key+' result');assert.equal(r.every(Boolean),i===0,key+' '+v+' '+r);checks++;}
   await page.evaluate(([id,part])=>{prepareReview(id,part);showSolution();},[card.id,card.part]);
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent)}));
   if(status.latex||status.wide||status.math.length)issues.push({key,width,...status});
   observed.push({key,width,calculator:await page.evaluate(()=>raknareTillaten(state.currentTask))});
   await page.locator('.task').screenshot({path:`${out}/${key.replaceAll(':','-')}-${width}.png`});views++;
  }}
 }
 const figures=groups.flatMap(g=>g.tasks.flatMap(q=>(q.t.match(/<svg[\s\S]*?<\/svg>/g)||[]).map(svg=>({bank:g.file,taskId:q.id,svg,paths:['t']}))));fs.writeFileSync(out+'/figures.json',JSON.stringify(figures));
 const gallery=await browser.newPage({viewport:{width:1100,height:1000}});await gallery.setContent('<body style="font-family:Arial;display:grid;grid-template-columns:1fr 1fr;gap:20px">'+figures.map(q=>'<section><h2>'+q.taskId+'</h2>'+q.svg+'</section>').join('')+'</body>');await gallery.screenshot({path:out+'/gallery.png',fullPage:true});
 fs.writeFileSync(out+'/browser.json',JSON.stringify({checks,views,issues,errors,observed},null,2));console.log({checks,views,issues,errors});assert.deepEqual(errors,[]);assert.deepEqual(issues,[]);
 for(const row of observed)assert.equal(row.calculator,!row.key.includes('0.1121'),row.key+' calculator');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
