/* Lokal server på 8027. Läser masterbanken; elevdata och nätverksskrivningar blockeras. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const master=__dirname+'/../../Uppgiftslabbet', report=JSON.parse(fs.readFileSync(master+'/agent/MATO1_GRANSKNING_2026-10-18.json'));
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;await selectCourse('mato1');state.view='training';finishAttempt=r=>{state.answered=true;window.result=r;};});
const c={window:{}};vm.runInNewContext(fs.readFileSync(master+'/uppgiftermato1.js','utf8'),c);
await page.evaluate(bank=>{window.reviewBank=bank;window.reviewTask=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();};},c.window.BANKMATO1);
let checks=0,views=0;const layout=[];
async function check(id,inputs,want=true){const actual=await page.evaluate(([id,inputs])=>{reviewTask(reviewBank.find(q=>q.id===id));const plan=svarsPlan(state.currentTask);inputs.forEach((v,i)=>{const e=document.getElementById('ans-'+i);if(!e)throw Error(id+' missing field '+i);e.value=v;});for(let i=0;i<8&&!state.answered;i++){const prev=state.partIndex;checkAnswer();if(prev===state.partIndex)break;}return {result:window.result||state.partResults,plan};},[id,inputs]);if(want)assert.ok(actual.result.length>0&&actual.result.every(x=>x===true),id+' '+JSON.stringify({inputs,actual}));else assert.ok(actual.result.includes(false),id+' must reject '+inputs);checks++;}
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
for(const [id,values]of [['1.43',['(x+2)/(x+4)','-4','1']],['1.48',['2+x','2','-1']],['1.53',['(x+1)/(2*(x-3))','3','0']],['1.580',['(x+2)*(x-2)*(x+1)*(x-1)','2','1','-1','-2']],['1.571',['3h+6','6']],['1.254',['2,50','1']],['1.255',['-2/3','-3']],['1.45',['x<1 eller x>5']],['1.45',['x>5 eller x<1']],['1.539',['C']],['4.452',['3']],['4.454',['1']],['4.458',['-2']],['3.819',['5,33']],['3.820',['1,33']]])await check(id,values);
for(const [id,values]of [['1.43',['(x+2)/(x+4)','0','1']],['1.45',['x<=1 eller x>=5']],['1.539',['B']],['4.452',['4']],['4.454',['15']],['4.458',['2']],['3.819',['5,34']],['3.820',['1,34']]])await check(id,values,false);
for(const item of report.changes){const status=await page.evaluate(id=>{const qs=expandGameTask(reviewBank.find(q=>q.id===id));return qs.map(q=>{reviewTask(q);showSolution();const svg=[];for(const s of document.querySelectorAll('.task svg:not(.katex svg)')){const v=s.viewBox.baseVal;for(const t of s.querySelectorAll('text')){const b=t.getBBox();if(b.x<v.x-1||b.y<v.y-1||b.x+b.width>v.x+v.width+1||b.y+b.height>v.y+v.height+1)svg.push(t.textContent);}}return {id:q.id,latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,svg,tools:q.geogebra&&!q.miniräknare};});},item.id);for(const s of status){if(s.latex||s.wide||s.svg.length||s.tools)layout.push({width,...s});views++;}}
}
assert.deepEqual(errors,[]);assert.deepEqual(layout,[]);console.log(JSON.stringify({checks,views,errors,layout}));
for(const id of ['3.390','3.377','4.179','4.229','4.453','4.455']){await page.evaluate(id=>reviewTask(reviewBank.find(q=>q.id===id)),id);await page.locator('.task').screenshot({path:'/tmp/mato1-review-2026-10-18/'+id+'.png'});}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
