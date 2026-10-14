'use strict';
// Verifiera appens verkliga svarsfält; inga profil- eller databasskrivningar.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
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
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.KG_TEST_URL||'http://127.0.0.1:8001');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');

 await page.emulateMedia({reducedMotion:'reduce'});
 await page.evaluate(async()=>{
  session=null;syncOwner=null;arLarare=false;arGruppLarare=false;await selectCourse('mato2');
  window.savedNerdamer=window.nerdamer;
  finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
  window.reviewTask=(q,index=0)=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=index;state.altValda=new Set();state.aktivRuta=index;window.reviewOutcome=null;renderTraining();};
 });
 const rows=[['1.37',2,'π/3'],['1.37',2,'pi/3'],['1.37',2,'2π/6'],['1.37',2,'π÷3'],
  ['1.01',1,'π/2'],['1.13',2,'-π/6'],['1.14',2,'-π/2'],['1.17',1,'2π/3'],['1.17',2,'π/6'],['1.30',0,'π/2']];
 let checks=0,buttonChecks=0;
 for(const loaded of [true,false]){
  await page.evaluate(loaded=>window.nerdamer=loaded?window.savedNerdamer:undefined,loaded);
  assert.equal(await page.evaluate(()=>typeof window.nerdamer==='function'),loaded);
  for(const [id,part,input]of rows)for(const [value,want]of [[input,true],['12345',false]]){
   const result=await page.evaluate(({id,part,value})=>{
    const parent=window.BANKMATO2.find(q=>q.id===id),cards=expandGameTask(parent),split=cards.length>1,q=split?cards[part]:parent;
    const offset=split?0:nastlat(q.rättSvar)?svarsPlan(q).rutor.findIndex(r=>r.del===part):part;
    reviewTask(q,offset);document.getElementById('ans-'+offset).value=value;checkAnswer();
    return (window.reviewOutcome||state.partResults)[offset];
   },{id,part,value});assert.equal(result,want,JSON.stringify({loaded,id,part,value}));checks++;
  }
  // Riktig knappinmatning i uppgiftens tredje svarsfält, på dator och mobil.
  for(const width of [1280,390]){
   await page.setViewportSize({width,height:1000});
   await page.evaluate(()=>{cheerQueue.length=0;dismissCheer();reviewTask(window.BANKMATO2.find(q=>q.id==='1.37'),0);});
   await page.waitForTimeout(100);
   await page.locator('#ans-0').fill('2');await page.locator('#kollaknapp').click();
   await page.locator('#ans-1').fill('1');await page.locator('#kollaknapp').click();
   await page.locator('#ans-2').focus();
   await page.locator('.symrad button[title="Pi"]').click();
   await page.locator('.symrad button[title="Bråkstreck"]').click();
   await page.locator('#ans-2').press('3');
   assert.equal(await page.locator('#ans-2').inputValue(),'π/3');
   await page.locator('#kollaknapp').click();
   assert.equal(await page.evaluate(()=>(window.reviewOutcome||state.partResults)[2]),true);
   assert.equal(await page.locator('#ans-0').inputValue(),'2');
   assert.equal(await page.locator('#ans-1').inputValue(),'1');buttonChecks++;
  }
 }
 assert.deepEqual(errors,[]);
 console.log(JSON.stringify({checks,buttonChecks,algebraLibrary:'available and unavailable',views:'desktop and mobile',errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
