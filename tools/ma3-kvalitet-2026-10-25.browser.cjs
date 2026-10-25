/* Fördjupad lokal kontroll: blandade pass, primitivformat och manuella facit.
   Kör endast mot lokala servrar; Supabase blockeras. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const out=process.env.REVIEW_OUT||'/tmp/ma3-kvalitet-extra';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS||'/tmp/ma3-c-deps',m[1],'package',m[2])});});
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8037');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(async()=>{session=null;syncOwner=null;await selectCourse('mato1');setTrack('1c');});
 const primitives=await page.evaluate(()=>{
  const failures=[];let checks=0;const ids=[];
  for(const q of window.BANKMATO1.filter(t=>t.spel!==false).flatMap(expandGameTask)){
   const plan=svarsPlan(q)||{delar:[{svar:[q.rättSvar],format:[q.svarFormat],enhet:[q.svarEnhet],tol:[q.tolerans]}]};
   for(const d of plan.delar)for(let j=0;j<d.svar.length;j++){
    const fmt=d.format[j];if(!['primitiv','primitiva'].includes(fmt))continue;
    ids.push(q.id);const f=d.svar[j],base=hogerled(String(f));
    for(const [input,want] of [[String(f),true],[`(${base})+7`,true],[`(${base})+x`,false]]){
     const got=delSvarRatt(input,f,d.enhet[j],d.tol[j],q,j,fmt);checks++;if(got!==want)failures.push({id:q.id,input,want,got});
    }
   }
  }
  // Skyddar tidigare regression där e^(2x) felaktigt förenklades vid jämförelsen.
  for(const [base,wrong] of [['3/2*e^(2*x)','3*e^(2*x)'],['e^x','2*e^x'],['2*e^(-x)','e^(-x)'],['2^x/ln(2)','2^x'],['3*x^2/2+2*e^x','3*x^2/2+e^x'],['e^(3*x)/3','e^(3*x)']])for(const format of ['primitiv','primitiva'])for(const [input,want] of [[`K+(${base})`,true],[`K+(${wrong})`,false]]){
   const facit=format==='primitiva'?base+'+C':base,got=formatRatt(input,facit,{format});checks++;if(got!==want)failures.push({input,facit,format,want,got});
  }
  return {checks,ids:[...new Set(ids)],failures};
 });
 const sessions=await page.evaluate(()=>{
  const oldRandom=Math.random,result=[];
  try{for(const area of ['derivata_potens','deriveringsregler','primitiva','primitiva_villkor','begreppet_derivata'])for(const level of [null,'2','3','4'])for(const seed of [17,43,101]){
   let s=seed;Math.random=()=>((s=(1664525*s+1013904223)>>>0)/4294967296);
   Object.assign(state,{focusArea:area,focusOmr:null,focusFamily:null,focusNiva:level,mixChapter:null,prov:null,felKo:[],sessionDone:0,passHistory:[],lastIds:[],senasteUrsprung:[],lastArea:null,passTyp:'vanligt'});
   localStorage.removeItem(seddaNyckel());
   const pool=availableTasks().filter(q=>q.omr===area&&(!level||levelOf(q)===level)),selected=[];
   for(let i=0;i<Math.min(12,pool.length);i++){
    const q=chooseTask();if(!q)throw Error('Tomt urval '+area);
    selected.push({id:q.id,parent:q.ursprungsId||q.id,level:levelOf(q),family:q.familj});
    noteraSedd(q.id);state.lastIds.push(q.id);state.passHistory.push({task:q});state.sessionDone++;
   }
   result.push({area,level,seed,pool:pool.length,selected});
  }}finally{Math.random=oldRandom;}
  return result;
 });
 const manualIds=['3.58','3.82','3.178','3.198','3.213','3.355','2.176','2.140','2.150','3.207'];
 const layouts=[];
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const id of manualIds){
  const status=await page.evaluate(id=>{const q=window.BANKMATO1.find(q=>q.id===id);state.currentTask=q;state.answered=false;state.partIndex=0;state.partResults=[];state.solutionShown=false;renderTraining();showSolution();return {latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.task .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent)};},id);
  layouts.push({id,width,...status});await page.locator('.task').screenshot({path:`${out}/manual-${id}-${width}.png`});
 }}
 const teacher=await browser.newPage();teacher.on('pageerror',e=>errors.push(e.message));
 await teacher.route('https://*.supabase.co/**',r=>r.abort());await teacher.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await teacher.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS||'/tmp/ma3-c-deps',m[1],'package',m[2])});});
 await teacher.goto(process.env.REVIEW_TEACHER_URL||'http://127.0.0.1:8038');await teacher.waitForFunction(()=>typeof renderMathInElement==='function'&&typeof uppgiftsText==='function');
 const manual=await page.evaluate(ids=>window.BANKMATO1.filter(q=>ids.includes(q.id)),manualIds);
 await teacher.evaluate(()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id="review" style="padding:12px;background:white;color:#243447"></main>';});
 for(const width of [390,1280]){await teacher.setViewportSize({width,height:1000});for(const q of manual){
  const status=await teacher.evaluate(q=>{const el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});return {latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent)};},q);
  layouts.push({app:'Uppgiftslabbet',id:q.id,width,...status});
 }}
 const result={primitives,sessions,layouts,errors};fs.writeFileSync(out+'/extra.json',JSON.stringify(result,null,2));
 console.log({primitiveChecks:primitives.checks,primitiveCards:primitives.ids.length,primitiveFailures:primitives.failures,sessions:sessions.length,draws:sessions.reduce((s,p)=>s+p.selected.length,0),layouts,errors});
 assert.deepEqual(primitives.failures,[]);assert.deepEqual(errors,[]);
 for(const s of sessions){assert.equal(new Set(s.selected.map(q=>q.id)).size,s.selected.length);if(s.level)assert.ok(s.selected.every(q=>q.level===s.level));}
 assert.ok(layouts.every(x=>!x.latex&&!x.wide&&!x.math.length));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
