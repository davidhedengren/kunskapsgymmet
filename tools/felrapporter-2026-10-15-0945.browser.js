'use strict';
// Verifiera appens verkliga svarsfält; inga profil- eller databasskrivningar.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const keys={ma2:'BANKMA2',mato2:'BANKMATO2',fy1:'BANK'};
const cases={
 ma2:[['4.296',1,['8,5','12,5'],[true,true]],['4.296',1,['8,6','12,5'],[false,true]]],
 mato2:[['4.117',0,['8e^(i*pi/2)'],[true]],['4.117',1,['2(cos(-π/6)+i sin(-π/6))'],[true]],['4.117',1,['2e^(i*11π/6)'],[true]],['4.117',1,['2(cos(330°)+i sin(330°))'],[true]],['4.117',1,['2e^(iπ/6)'],[false]],['4.117',1,['sqrt(3)-i'],[false]],['4.117',2,['-8'],[true]],
 ['4.09',0,['6e^(i*5pi/12)'],[true]],['4.09',1,['4(cos(pi/2)+i sin(pi/2))'],[true]],['4.09',2,['10'],[true]],['4.09',2,['10(cos(2pi)+i sin(2pi))'],[true]],['4.09',2,['10e^(i*pi)'],[false]],['4.09',3,['-2'],[true]],
 ['4.12',0,['2sqrt(2)e^(i*pi/4)'],[true]],['4.12',1,['3e^(i*3pi/2)'],[true]],['4.12',2,['2e^(i*4pi/3)'],[true]],['4.24',1,['sqrt(2)e^(i*3pi/4)'],[true]],['4.24',1,['sqrt(2)e^(-i*5pi/4)'],[false]],['4.48',2,['2e^(i*7pi/6)'],[true]],['4.61',2,['10e^(i*pi/2)'],[true]],['4.64',1,['sqrt(2)e^(i*5pi/4)'],[true]],['4.409',0,['2π/3'],[true]],['4.452',0,['6'],[true]],['4.452',1,['2π/3'],[true]],['1.37',2,['π/3'],[true]]],
 fy1:[['3.298',0,['3 m/s'],[true]],['3.298',0,['7 m/s'],[false]],['4.536',1,['0.054'],[true]],['4.669',1,['56'],[true]]]
};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
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
    checkAnswer();for(let step=0;step<inputs.length&&!state.answered&&state.partIndex>offset&&state.partIndex<offset+inputs.length;step++){if(document.querySelector(".delfacit:not([hidden]) .aacts"))break;checkAnswer();}
    return (window.reviewOutcome||state.partResults).slice(offset,offset+inputs.length);
   },{key:keys[course],id,part,inputs,source});
   assert.deepEqual(result,want,JSON.stringify({course,id,part,inputs,source}));checks.push({course,id,part,inputs,source,result});
  }
  for(const id of new Set([...rows.map(r=>r[0]),...(course==='mato2'?['4.247','4.250','4.10']:[])]))for(const width of [390,1280]){
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

 let uiChecks=0;
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:1000});
  await page.evaluate(()=>selectCourse('mato2'));
  for(const id of ['4.247','4.250']){
   await page.evaluate(id=>reviewTask(window.BANKMATO2.find(q=>q.id===id)),id);
   await page.waitForTimeout(100);
   assert.equal(await page.locator('#ans-0').evaluate(e=>e.tagName),'TEXTAREA');
   await page.locator('#ans-0').focus();await page.locator('.symrad button[title="Pi"]').click();
   assert.equal(await page.locator('#ans-0').inputValue(),'π');
   await page.locator('#ans-0').fill('');await page.locator('.symrad button[title="Roten ur"]').click();
   await page.locator('#ans-0').press('2');assert.equal(await page.locator('#ans-0').inputValue(),'√2');uiChecks++;
  }
  await page.evaluate(()=>reviewTask(expandGameTask(window.BANKMATO2.find(q=>q.id==='4.09'))[2]));
  assert.equal(await page.locator('#ans-0').getAttribute('inputmode'),'text');uiChecks++;
  await page.evaluate(()=>reviewTask(expandGameTask(window.BANKMATO2.find(q=>q.id==='4.10'))[0]));
  assert.equal(await page.locator('.tbody circle[r="91.9"]').getAttribute('fill'),'none');
  await page.screenshot({path:'/tmp/reports-20261015/cirkel-'+width+'.png'});uiChecks++;
  await page.evaluate(()=>selectCourse('ma2'));
  await page.evaluate(()=>reviewTask(expandGameTask(window.BANKMA2.find(q=>q.id==='4.296'))[1]));
  await page.waitForTimeout(100);
  assert.equal(await page.locator('label[for="ans-0"]').innerText(),'Nedre kvartil (Q₁)');
  assert.equal(await page.locator('label[for="ans-1"]').innerText(),'Övre kvartil (Q₃)');
  await page.locator('#ans-0').fill('8,5');await page.locator('#kollaknapp').click();
  assert.equal(await page.evaluate(()=>state.partResults[0]),true);assert.ok(await page.locator('#ans-1').isEnabled());
  assert.equal(await page.locator('.delfacit:not([hidden])').count(),0);
  await page.locator('#ans-1').fill('12,5');await page.locator('#kollaknapp').click();
  assert.deepEqual(await page.evaluate(()=>state.partResults),[true,true]);
  assert.equal(await page.locator('.delfacit:not([hidden])').count(),1);uiChecks++;
  await page.evaluate(()=>reviewTask(window.BANKMA2.find(q=>q.id==='4.52')));
  assert.match(await page.locator('.tbody').innerText(),/minst spridning/);uiChecks++;
  await page.evaluate(()=>selectCourse('fy1'));
  await page.evaluate(()=>reviewTask(window.BANK.find(q=>q.id==='3.298')));
  assert.match(await page.locator('.tbody svg').textContent(),/Båt/);
  assert.equal(await page.locator('.task .katex-error').count(),0);
  await page.screenshot({path:'/tmp/reports-20261015/bat-'+width+'.png'});uiChecks++;
 }
 // Komplexa polära talsvar behöver inte det externa algebrabiblioteket.
 await page.evaluate(()=>{window.nerdamer=undefined;});
 assert.equal(await page.evaluate(()=>formatRatt('2(cos(-π/6)+i sin(-π/6))','2e^(-i*pi/6)',{format:'polar'})),true);
 assert.equal(await page.evaluate(()=>formatRatt('2(cos(π/6)+i sin(π/6))','2e^(-i*pi/6)',{format:'polar'})),false);

 assert.deepEqual(errors,[]);
 fs.writeFileSync(process.env.KG_TEST_OUTPUT||path.join(os.tmpdir(),'felrapporter-2026-10-15-0945-browser.json'),JSON.stringify(checks,null,2));
 console.log(JSON.stringify({checks:checks.length,pageErrors:errors.length,views:'mobile and desktop, all tested cards',realAnswerFields:true,uiChecks}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
