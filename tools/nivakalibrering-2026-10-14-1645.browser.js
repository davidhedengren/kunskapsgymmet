'use strict';
// Verifiera appens verkliga svarsfält; inga profil- eller databasskrivningar.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const keys={fy1:'BANK',ma2:'BANKMA2'};
const cases={
 fy1:[['4.533',0,['0.18'],[true]],['4.536',0,['0.53'],[true]],['4.536',1,['0.054'],[true]],['4.669',0,['4.22'],[true]],['4.669',1,['56'],[true]],['4.669',2,['3.99'],[true]]],
 ma2:[['3.487',0,['6'],[true]],['3.488',0,['8.49'],[true]],['3.489',0,['6.9'],[true]],['3.491',0,['70'],[true]],['3.492',0,['2sqrt(2)','-2sqrt(2)'],[true,true]],['3.497',0,['36'],[true]],['3.498',0,['4.8'],[true]],['3.498',1,['3.6'],[true]],['3.531',0,['8'],[true]]]
};
for(const rows of Object.values(cases))for(const [id,part,inputs]of rows.slice())rows.push([id,part,inputs.map(()=> '12345'),inputs.map(()=>false)]);
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({timezoneId:'Europe/Stockholm',viewport:{width:1280,height:1000}}),deps=process.env.KG_TEST_DEPS;
 if(deps)await context.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
  const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
  return r.fulfill({path:deps+'/'+m[1]+'/package/'+m[2]});
 });
 await context.route('https://*.supabase.co/**',r=>r.abort());await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await context.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 const page=await context.newPage(),errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.KG_TEST_URL||'http://127.0.0.1:8001');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(()=>{
  session=null;syncOwner=null;arLarare=false;arGruppLarare=false;
  finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
  window.reviewTask=(q,index=0)=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=index;state.altValda=new Set();window.reviewOutcome=null;renderTraining();};
 });
 for(const[course,rows]of Object.entries(cases)){
  await page.evaluate(c=>selectCourse(c),course);
  await page.evaluate(course=>{
   const bank=course==='fy1'?window.BANK:window.BANKMA2;
   const expected=course==='fy1'?{'4.536':[2,3],'4.669':[2,4,3],'4.533':[3]}:{'3.487':[3],'3.488':[3],'3.489':[3],'3.491':[4],'3.492':[3],'3.497':[4],'3.498':[3],'3.531':[2]};
   for(const [id,levels]of Object.entries(expected)){
    const cards=expandGameTask(bank.find(q=>q.id===id));
    if(JSON.stringify(cards.map(levelOf))!==JSON.stringify(levels.map(String)))throw Error('Fel faktisk nivå '+id);
    if(course==='fy1'&&cards.some(q=>q.miniräknare!==true))throw Error('Spärrad miniräknare '+id);
   }
  },course);
  for(const source of ['delkort','heluppgift'])for(const[id,part,inputs,want]of rows){
   const result=await page.evaluate(({key,id,part,inputs,source})=>{
    const parent=window[key].find(q=>q.id===id),cards=expandGameTask(parent),split=source==='delkort'&&cards.length>1,q=split?cards[part]:parent;
    const offset=split?0:nastlat(q.rättSvar)?svarsPlan(q).rutor.findIndex(r=>r.del===part):part;
    reviewTask(q,offset);inputs.forEach((a,j)=>document.getElementById('ans-'+(offset+j)).value=a);
    checkAnswer();while(!state.answered&&state.partIndex>offset&&state.partIndex<offset+inputs.length)checkAnswer();
    return (window.reviewOutcome||state.partResults).slice(offset,offset+inputs.length);
   },{key:keys[course],id,part,inputs,source});
   assert.deepEqual(result,want,JSON.stringify({course,id,part,inputs,source}));checks.push({course,id,part,inputs,source,result});
  }
  for(const id of new Set(rows.map(r=>r[0])))for(const width of [390,1280]){
   await page.setViewportSize({width,height:1000});
   const view=await page.evaluate(({key,id})=>{
    const q=window[key].find(q=>q.id===id);
    return expandGameTask(q).map(card=>{
     reviewTask(card);showSolution();
     const text=document.querySelector('.tbody').cloneNode(true);text.querySelectorAll('.katex').forEach(e=>e.remove());
     return{id:card.id,katexErrors:document.querySelectorAll('.task .katex-error').length,
      raw:text.textContent,fields:document.querySelectorAll('[id^="ans-"]').length,expected:answerLayout(card).n};
    });
   },{key:keys[course],id});
   for(const card of view){assert.equal(card.katexErrors,0,card.id);assert.equal(card.fields,card.expected,card.id);assert.ok(!card.raw.includes('\\'),JSON.stringify(card));}
  }
 }
 assert.deepEqual(errors,[]);
 fs.writeFileSync(process.env.KG_TEST_OUTPUT||path.join(os.tmpdir(),'nivakalibrering-2026-10-14-1645-browser.json'),JSON.stringify(checks,null,2));
 console.log(JSON.stringify({checks:checks.length,pageErrors:errors.length,views:'mobile and desktop, all tested cards',realAnswerFields:true}));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
