/* Lokal server på 8027; inga elevdata eller rapportstatusar skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
const banks={};for(const name of ['matf1']){const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../../Uppgiftslabbet/uppgifter'+name+'.js','utf8'),c);banks[name]=Object.values(c.window)[0];}
await page.evaluate(banks=>{window.reviewBanks=banks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.reviewTask=(id,part)=>{const p=reviewBanks[state.course].find(q=>q.id===id),q=part==null?p:expandGameTask(p)[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},banks);
let checks=0,views=0;const layout=[];
async function check(id,part,input,want){const actual=await page.evaluate(([id,part,input])=>{reviewTask(id,part);document.getElementById('ans-0').value=input;checkAnswer();return window.result||state.partResults;},[id,part,input]);assert.ok(actual.length>0,id+' tom rättning');assert.equal(actual.every(Boolean),want,id+' '+input+' '+actual);checks++;}
await page.evaluate(()=>selectCourse('matf1'));
const oldContext={window:{}};vm.runInNewContext(require('child_process').execFileSync('git',['show','366227a:uppgiftermatf1.js'],{cwd:__dirname+'/..',encoding:'utf8',maxBuffer:40e6}),oldContext);const before=Object.values(oldContext.window)[0].find(q=>q.id==='3.277');
const baseline=await page.evaluate(old=>{const i=reviewBanks.matf1.findIndex(q=>q.id==='3.277'),current=reviewBanks.matf1[i];reviewBanks.matf1[i]=old;reviewTask('3.277',null);const formula=[...document.querySelectorAll('.katex')].find(k=>k.querySelector('annotation')?.textContent.includes('prime(36)'));const raised=!!formula?.querySelector('.katex-html .msupsub');reviewBanks.matf1[i]=current;return raised;},before);assert.equal(baseline,false);
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
await check('3.277',null,'6,05',true);await check('3.277',null,'6,5',false);
for(const id of ['3.26','3.116','3.277','3.278','3.326','3.327','3.328','3.329']){const v=await page.evaluate(id=>{reviewTask(id,null);showSolution();const primes=[...document.querySelectorAll('.katex')].filter(k=>k.querySelector('annotation')?.textContent.includes('prime'));return {id,primes:primes.length,raised:primes.every(k=>!!k.querySelector('.katex-html .msupsub')),latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display')].some(d=>[...d.querySelectorAll('.base')].some(b=>b.getBoundingClientRect().width>d.getBoundingClientRect().width+2))};},id);assert.ok(v.primes>0,id);assert.equal(v.raised,true,id);if(v.latex||v.wide||v.clipped)layout.push(v);views++;}
await page.evaluate(()=>reviewTask('3.277',null));await page.locator('.task').screenshot({path:'/tmp/fellogg-2026-10-20-1305/3.277-'+width+'.png'});
}
assert.deepEqual(errors,[]);assert.deepEqual(layout,[]);console.log(JSON.stringify({baseline,checks,views,errors,layout}));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
