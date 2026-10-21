/* Kör mot lokal server på 8027. Inga elevdata eller rapportstatusar skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
fs.mkdirSync('/tmp/fellogg-2026-10-21-0910',{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');

await page.evaluate(()=>selectCourse('ma1'));
const result=await page.evaluate(()=>{
 const ids=['1.902','1.11','1.18','1.26','1.27','1.70'];
 return ids.map(id=>{const q=BANKMA1.find(q=>q.id===id);return {id,answer:q.rättSvar,upper:delSvarRatt(q.rättSvar.replaceAll('x','X'),q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)};});
});console.log(JSON.stringify(result));
{
 assert.ok(result.every(r=>r.upper));
 let checks=0;
 await page.evaluate(()=>{session=null;syncOwner=null;finishAttempt=r=>{state.answered=true;window.result=r;};});
 for(const width of [390,1280]){await page.setViewportSize({width,height:900});for(const r of result){for(const [input,want]of [[r.answer,true],[r.answer.replaceAll('x','X'),true],[r.answer.replaceAll('x','X')+'+1',false]]){
 const got=await page.evaluate(([id,input])=>{state.currentTask=BANKMA1.find(q=>q.id===id);state.view='training';state.answered=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();document.getElementById('ans-0').value=input;checkAnswer();return window.result||state.partResults;},[r.id,input]);assert.equal(got.every(Boolean),want,r.id+' '+input);checks++;
 }}}
 await page.evaluate(()=>{state.currentTask=BANKMA1.find(q=>q.id==='1.902');state.answered=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;window.result=null;renderTraining();});
 await page.locator('#ans-0').fill('');await page.locator('#ans-0').pressSequentially('6X+4');await page.locator('#kollaknapp').click();assert.deepEqual(await page.evaluate(()=>window.result),[true]);checks++;
 const guards=await page.evaluate(()=>[
 delSvarRatt('4X+3+2X+1','6x+4',null,null,{t:'Förenkla 4x+3+2x+1.'},0,'förenklat_polynom'),
 delSvarRatt('6y+4','6x+4',null,null,{t:'Förenkla 4x+3+2x+1.'},0,'förenklat_polynom')
 ]);assert.deepEqual(guards,[false,false]);assert.deepEqual(errors,[]);console.log(JSON.stringify({checks,guards:guards.length,errors}));
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
