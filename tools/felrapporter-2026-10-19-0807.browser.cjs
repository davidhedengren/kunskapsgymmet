/* Starta en lokal server på port 8027. Inga elevdata skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;await selectCourse('mato2');state.view='training';finishAttempt=r=>{state.answered=true;window.result=r;};});
const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../../Uppgiftslabbet/uppgiftermato2.js','utf8'),c);
await page.evaluate(bank=>{window.reviewBank=bank;window.reviewTask=(id,part)=>{const parent=reviewBank.find(q=>q.id===id);const q=part==null?parent:expandGameTask(parent)[part];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q.t;};},c.window.BANKMATO2);
let checks=0,views=0;const layout=[];
async function check(id,part,inputs,want){const actual=await page.evaluate(([id,part,inputs])=>{reviewTask(id,part);inputs.forEach((v,i)=>{document.getElementById('ans-'+i).value=v;});for(let i=0;i<8&&!state.answered;i++){const before=state.partIndex;checkAnswer();if(before===state.partIndex)break;}return window.result||state.partResults;},[id,part,inputs]);assert.ok(actual.length>0,id+' tom rättning');assert.equal(actual.every(Boolean),want,id+' '+inputs+' '+JSON.stringify(actual));checks++;}
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
await check('4.179',0,['x^3-8'],true);await check('4.179',0,['-8+x^3'],true);await check('4.179',0,['(x-2)(x^2+2x+4)'],false);
await check('4.179',1,['x^3+x^2+x+1'],true);await check('4.179',1,['1+x+x^2+x^3'],true);await check('4.179',1,['(x+2)(x^2-x+3)-5'],false);await check('4.179',1,['x^3+x^2+x-5'],false);
for(const [part,answers]of [[0,['4i','-4i']],[1,['3+2i','3-2i']],[2,['-2+2i','-2-2i']]]){await check('4.144',part,answers,true);await check('4.144',part,[...answers].reverse(),true);await check('4.144',part,['0','0'],false);}
// Klicka på de riktiga knapparna och skicka svaret i de två rotfälten.
await page.evaluate(()=>reviewTask('4.144',0));
for(const [field,prefix] of [[0,'4'],[1,'-4']]){const input=page.locator('#ans-'+field);await input.fill(prefix);await input.focus();await page.locator('.symrad button').filter({hasText:/^i$/}).click();assert.equal(await input.inputValue(),prefix+'i');}
await page.evaluate(()=>{for(let j=0;j<3&&!state.answered;j++)checkAnswer();});assert.deepEqual(await page.evaluate(()=>window.result),[true,true]);checks++;
await page.evaluate(()=>reviewTask('4.144',0));await page.locator('#ans-0').focus();await page.locator('.symrad button').filter({hasText:/^e$/}).click();assert.equal(await page.locator('#ans-0').inputValue(),'e');checks++;
for(const [id,part]of [['4.144',0],['4.144',1],['4.144',2],['4.179',0],['4.179',1],['4.49',null],['4.178',null],['4.16',null],['4.84',0],['4.95',0],['4.40',null],['4.74',null],['4.143',null],['4.401',null],['4.402',null]]){const status=await page.evaluate(([id,part])=>{const text=reviewTask(id,part);showSolution();return {id,part,text,latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display')].some(d=>[...d.querySelectorAll('.base')].some(b=>b.getBoundingClientRect().width>d.getBoundingClientRect().width+2)),symbols:[...document.querySelectorAll('.symrad button')].map(b=>b.textContent)};},[id,part]);if(id==='4.179'){assert.ok(!status.text.replace(/<[^>]+>/g,'').includes('='));assert.ok(!status.text.includes('x^3+x^2+x+1'));}if(id==='4.144'){assert.ok(status.symbols.includes('i'));assert.ok(status.symbols.includes('e'));}if(status.latex||status.wide||status.clipped)layout.push(status);views++;}
}
assert.deepEqual(errors,[]);assert.deepEqual(layout,[]);console.log(JSON.stringify({checks,views,errors,layout}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
