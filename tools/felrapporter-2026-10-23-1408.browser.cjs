/* Lokal konsumentkontroll utan konton eller skrivningar till Supabase. */
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),out=process.env.REVIEW_OUT||'/tmp/reports1408';fs.mkdirSync(out,{recursive:true});
const groups=[{course:'ma1',file:'uppgifterma1.js',key:'BANKMA1',ids:['3.175','3.35','3.108','3.134','3.138','3.168','3.72','3.27','4.116','0.1127','1.1187','1.1194','3.408']},{course:'fy1',file:'uppgifter.js',key:'BANK',ids:['3.84','3.16','3.18','3.26','3.33','3.34']}];
const selectedParts={'3.84':0,'3.16':1,'3.18':0,'3.26':1,'3.33':0,'3.34':1};
for(const g of groups){const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,g.file),'utf8'),c);g.tasks=c.window[g.key].filter(q=>g.ids.includes(q.id));assert.equal(g.tasks.length,g.ids.length);}
const inputs={
 'ma1:3.175':[['186','190','185.7','185.71','185.714','186 %','1300/7 %'],['185','185.6','186 kr','65']],
 'ma1:3.35':[['37','36.6','36.56 %','36.5641'],['36.5','36.57','0']],
 'ma1:3.108':[['1.44','1.4 %','1.44 %'],['1.45','24','0']],
 'ma1:3.134':[['6','6.2','6.23 %','6.22549'],['6.22','6.3','32']],
 'ma1:3.138':[['11','10.6','10.56 %','10.5573'],['10.5','10.55','36']],
 'ma1:3.168':[['23','22.9','22.93 %','22.92553'],['22.92','22.8','21']],
 'ma1:3.408':[['10','10 %'],['19','9.5']],
 'fy1:3.84:0':[['2.5','2,5','2.5 m/s²','2.5m/s2','2.5 m/s^2','250 cm/s²'],['2.5 m/s','-2.5','25','2.5 s']],
 'fy1:3.16:1':[['1.5','1.5 m/s²','1.5m/s2','150 cm/s²'],['1.5 m/s','-1.5','15']],
 'fy1:3.18:0':[['1.5','1.5 m/s²','1.5 m/s^2'],['1.5 m/s','-1.5','3']],
 'fy1:3.26:1':[['2','2 m/s²','200 cm/s²'],['2 m/s','-2','4']],
 'fy1:3.33:0':[['0.5','0.5 m/s²','0.5 m/s^2'],['0.5 m/s','-0.5','3']],
 'fy1:3.34:1':[['-0.5','-0.5 m/s²','-50 cm/s²'],['0.5','-0.5 m/s','-5']]
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
  const chosen=g.course==='fy1'?cards.filter(c=>selectedParts[c.id]===c.part):cards;
  for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const card of chosen){const key=g.course+':'+card.id+(card.split?':'+card.part:'');
   const isAlt=await page.evaluate(([id,part])=>{prepareReview(id,part);return arAlt(state.currentTask);},[card.id,card.part]);
   if(isAlt){
    assert.equal(await page.locator('.altlista .alt').count(),card.alternativ.length,key+' visible options');
    for(let mask=1;mask<2**card.alternativ.length;mask++){
     const expected=card.alternativ.every((a,i)=>Boolean(mask&(1<<i))===a.ratt);
     const r=await page.evaluate(([id,part,mask,options])=>{prepareReview(id,part);options.forEach((a,i)=>{if(mask&(1<<i))vaxlaAlt(altLista(state.currentTask).findIndex(x=>x.txt===a.txt));});kollaAlt();return window.result;},[card.id,card.part,mask,card.alternativ]);
     assert.equal(r.every(Boolean),expected,key+' selection '+mask);checks++;
    }
   }
   else if(inputs[key])for(const [i,list]of inputs[key].entries())for(const v of list){const r=await page.evaluate(([id,part,v])=>{prepareReview(id,part);document.getElementById('ans-0').value=v;checkAnswer();return window.result;},[card.id,card.part,v]);assert.ok(r,key+' result');assert.equal(r.every(Boolean),i===0,key+' '+v+' '+r);checks++;}
   await page.evaluate(([id,part])=>{prepareReview(id,part);showSolution();},[card.id,card.part]);
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent)}));
   if(status.latex||status.wide||(g.course==='ma1'&&!['4.116','1.1187'].includes(card.id)&&status.math.length))issues.push({key,width,...status});
   observed.push({key,width,calculator:await page.evaluate(()=>raknareTillaten(state.currentTask))});
   await page.locator('.task').screenshot({path:`${out}/${key.replaceAll(':','-')}-${width}.png`});views++;
  }}
 }
 const figures=groups.flatMap(g=>g.tasks.filter(q=>['3.84'].includes(q.id)&&g.course==='fy1').flatMap(q=>(q.t.match(/<svg[\s\S]*?<\/svg>/g)||[]).map(svg=>({bank:g.file,taskId:q.id,svg,paths:['t']}))));fs.writeFileSync(out+'/figures.json',JSON.stringify(figures));
 const gallery=await browser.newPage({viewport:{width:1100,height:1000}});await gallery.setContent('<body style="font-family:Arial;display:grid;grid-template-columns:1fr 1fr;gap:20px">'+figures.map(q=>'<section><h2>'+q.taskId+'</h2>'+q.svg+'</section>').join('')+'</body>');await gallery.screenshot({path:out+'/gallery.png',fullPage:true});
 fs.writeFileSync(out+'/browser.json',JSON.stringify({checks,views,issues,errors,observed},null,2));console.log({checks,views,issues,errors});assert.deepEqual(errors,[]);assert.deepEqual(issues,[]);
 for(const row of observed)assert.equal(row.calculator,!['ma1:0.1127','ma1:1.1194'].includes(row.key),row.key+' calculator');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
