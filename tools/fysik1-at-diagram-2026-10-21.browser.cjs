/* Kör mot lokal server på 8027. Inga elevdata eller rapportstatusar skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
fs.mkdirSync('/tmp/fellogg-2026-10-21-0910',{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');

const banks={};for(const [name,file] of [['fy1','uppgifter.js'],['fy2','uppgifter2.js'],['matf1','uppgiftermatf1.js'],['mato2','uppgiftermato2.js']]){const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../../Uppgiftslabbet/'+file,'utf8'),c);banks[name]=Object.values(c.window)[0];}
await page.evaluate(banks=>{window.reviewBanks=banks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.reviewTask=(id,part)=>{const p=reviewBanks[state.course].find(q=>q.id===id),q=part==null?p:expandGameTask(p)[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},banks);
let checks=0,views=0;const issues=[];
async function check(id,part,input,want){const actual=await page.evaluate(([id,part,input])=>{reviewTask(id,part);document.getElementById('ans-0').value=input;checkAnswer();return window.result||state.partResults;},[id,part,input]);assert.ok(actual.length);assert.equal(actual.every(Boolean),want,id+' '+input+' '+actual);checks++;}
const cases=[['3.455',['-2','-2 m/s²'],['2']],['3.456',['18','6*3'],['6']],['3.457',['3','3 s'],['0']],['3.458',['11','3+8'],['3']],['3.459',['9','9 m/s'],['8']],['3.460',['34,5','34.5 m'],['15','36']]];
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>selectCourse('fy1'));
for(const [id,good,bad]of cases){for(const input of good)await check(id,null,input,true);for(const input of bad)await check(id,null,input,false);
await page.evaluate(id=>{reviewTask(id);showSolution();scrollTo(0,0);},id);
const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));if(status.latex||status.wide)issues.push({id,width,...status});views++;
await page.locator('.task').screenshot({path:`/tmp/at-${id}-${width}.png`});
}}
console.log(JSON.stringify({checks,views,issues,errors}));assert.deepEqual(issues,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
