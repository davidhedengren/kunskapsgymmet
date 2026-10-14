'use strict';
// Verifiera appens verkliga svarsfält; inga profil- eller databasskrivningar.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const keys={fy1:'BANK'};
const cases={fy1:[]};
const data={
 '3.143':{id:'3.143',rättSvar:[12,12,13]},
 '3.192':{id:'3.192',rättSvar:[10.18,5.53,1.15,-1.16,6.2,8.52]},
 '3.197':{id:'3.197',rättSvar:[0,.4,-.8,-5.4,-7.4]},
 '3.386':{id:'3.386',rättSvar:[1.887,32.75,193.85,9.69]}
};
for(const q of Object.values(data))for(const [i,a]of q.rättSvar.entries()){
 cases.fy1.push([q.id,i,[String(a)],[true]]);
 cases.fy1.push([q.id,i,[String(a+10)],[false]]);
}
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
 fs.writeFileSync(process.env.KG_TEST_OUTPUT||path.join(os.tmpdir(),'felrapporter-2026-10-14-1634-browser.json'),JSON.stringify(checks,null,2));
 console.log(JSON.stringify({checks:checks.length,pageErrors:errors.length,views:'mobile and desktop, all tested cards',realAnswerFields:true}));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
