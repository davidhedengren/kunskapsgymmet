/* Kör mot lokal server på 8027. Inga elevdata eller rapportstatusar skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
fs.mkdirSync('/tmp/fellogg-2026-10-21-1741',{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');

const banks={};for(const [name,file] of [['fy1','uppgifter.js'],['fy2','uppgifter2.js'],['matf1','uppgiftermatf1.js'],['mato2','uppgiftermato2.js']]){const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../../Uppgiftslabbet/'+file,'utf8'),c);banks[name]=Object.values(c.window)[0];}
await page.evaluate(banks=>{window.reviewBanks=banks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.reviewTask=(id,part)=>{const p=reviewBanks[state.course].find(q=>q.id===id),q=part==null?p:expandGameTask(p)[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},banks);
let checks=0,views=0;const issues=[];
async function check(id,part,input,want){const actual=await page.evaluate(([id,part,input])=>{reviewTask(id,part);document.getElementById('ans-0').value=input;checkAnswer();return window.result||state.partResults;},[id,part,input]);assert.ok(actual.length);assert.equal(actual.every(Boolean),want,id+' '+input+' '+actual);checks++;}
const cases={fy2:[['3.346',0,['0,000634','6.34e-4','0.00063','0.0006342971320037988'],['-0.000634','0.00634']],['3.346',1,['4,53','4.5','4.533334921301312'],['-4.53','45.3']],['3.354',0,['5263','5264','5260','5.3e3'],['526','5.26']],['3.354',1,['118','118.42','118.43','118.42027970072643'],['119.25','5.26e3']],['3.354',2,['8','8.0'],['5','9']],['3.121',null,['13.536','13.54','13.5','0.013536 J'],['135.36','13.536 J']]],matf1:[['1.137',null,['60','6!/(3!*2!)'],['720']],['1.152',null,['120','5!'],['720']],['1.40',null,['45360'],['362880']],['1.73',null,['15120'],['362880']]]};
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
for(const [course,tasks]of Object.entries(cases)){await page.evaluate(c=>selectCourse(c),course);
for(const [id,part,good,bad]of tasks){for(const input of good)await check(id,part,input,true);for(const input of bad)await check(id,part,input,false);
await page.evaluate(([id,part])=>{reviewTask(id,part);showSolution();scrollTo(0,0);},[id,part]);
const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));if(status.latex||status.wide)issues.push({id,width,...status});views++;
await page.locator('.task').screenshot({path:`/tmp/fellogg-2026-10-21-1741/${course}-${id}-${part}-${width}.png`});
}}
await page.evaluate(()=>selectCourse('fy1'));
for(const want of [true,false]){
 const actual=await page.evaluate(want=>{const q=reviewTask('8.559');const choices=altLista(q);vaxlaAlt(choices.findIndex(a=>want?a.ratt:a.txt==='4000 µA'));kollaAlt();return window.result;},want);
 assert.equal(actual.every(Boolean),want);checks++;
}
await page.evaluate(()=>{reviewTask('8.559');scrollTo(0,0);});await page.locator('.task').screenshot({path:`/tmp/fellogg-2026-10-21-1741/fy1-8.559-${width}.png`});views++;
}
// Exercise the real shuffle, cached display order, and pinned alternatives with deterministic randomness.
const shuffle=await page.evaluate(()=>{
 const original=Math.random;let seed=171;Math.random=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
 try{const q=reviewBanks.fy1.find(x=>x.id==='8.559'),seen=new Set();
 for(let n=0;n<200;n++)seen.add(altOrdna(q).indexOf(q.alternativ.findIndex(a=>a.ratt)));
 state.altOrdningId=null;const one=altLista(q).map(a=>a.txt).join('|'),two=altLista(q).map(a=>a.txt).join('|');
 const pinned={...q,id:'test-pinned',alternativ:[...q.alternativ,{txt:'Sist',ratt:false,sist:true}]};
 return {positions:[...seen].sort(),cached:one===two,pinned:altOrdna(pinned).at(-1)===q.alternativ.length};
 }finally{Math.random=original;}
});assert.deepEqual(shuffle.positions,[0,1,2,3,4]);assert.equal(shuffle.cached,true);assert.equal(shuffle.pinned,true);
// All new figures together, on white like the task's figure container, for visual inspection.
const gallery=await browser.newPage({viewport:{width:1120,height:900}});
let content='<html><body style="font-family:sans-serif;margin:20px;display:grid;grid-template-columns:repeat(2,1fr);gap:24px">';
for(const [course,ids]of Object.entries({fy2:['3.346','3.354','3.121','3.118','3.122'],matf1:['1.137','1.152','1.40','1.73','1.26']}))for(const id of ids){const q=banks[course].find(p=>p.id===id);content+='<section><h2>'+course+' '+id+'</h2>'+q.t.match(/<svg[\s\S]*?<\/svg>/)[0]+'</section>';}
await gallery.setContent(content+'</body></html>');await gallery.screenshot({path:'/tmp/fellogg-2026-10-21-1741/figurer.png',fullPage:true});
const clipping=await gallery.evaluate(()=>[...document.querySelectorAll('svg')].flatMap(s=>[...s.querySelectorAll('text')].filter(t=>{const b=t.getBBox(),v=s.viewBox.baseVal;return b.x<v.x-.5||b.y<v.y-.5||b.x+b.width>v.x+v.width+.5||b.y+b.height>v.y+v.height+.5;}).map(t=>t.textContent)));assert.deepEqual(clipping,[]);
console.log(JSON.stringify({checks,views,shuffle,issues,errors}));assert.deepEqual(issues,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
