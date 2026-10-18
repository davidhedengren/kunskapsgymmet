/* Lokal server på 8027. Läser masterbanken; elevdata och nätverksskrivningar blockeras. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const master=__dirname+'/../../Uppgiftslabbet', report=JSON.parse(fs.readFileSync(master+'/agent/FELRAPPORTER_2026-10-18_2150.json'));
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage({viewport:{width:390,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;await selectCourse('mato2');state.view='training';finishAttempt=r=>{state.answered=true;window.result=r;};});
const c={window:{}};vm.runInNewContext(fs.readFileSync(master+'/uppgiftermato2.js','utf8'),c);
await page.evaluate(bank=>{window.reviewBank=bank;window.reviewTask=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();};},c.window.BANKMATO2);
let checks=0,views=0;const layout=[];
async function check(id,inputs,want=true){const actual=await page.evaluate(([id,inputs])=>{const [base,part]=id.split(':');const parent=reviewBank.find(q=>q.id===base);reviewTask(part===undefined?parent:expandGameTask(parent)[+part]);const plan=svarsPlan(state.currentTask);inputs.forEach((v,i)=>{const e=document.getElementById('ans-'+i);if(!e)throw Error(id+' missing field '+i);e.value=v;});for(let i=0;i<8&&!state.answered;i++){const prev=state.partIndex;checkAnswer();if(prev===state.partIndex)break;}return {result:window.result||state.partResults,plan};},[id,inputs]);if(want)assert.ok(actual.result.length>0&&actual.result.every(x=>x===true),id+' '+JSON.stringify({inputs,actual}));else assert.ok(actual.result.includes(false),id+' must reject '+inputs);checks++;}
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
for(const [id,value]of [['2.186','0,0199'],['2.186','1,99 cm/min'],['2.237','0,0170'],['2.237','1,7 cm/min'],['2.187:0','37,7'],['2.187:0','12*pi'],['2.187:1','15,1'],['2.206','18,8'],['2.206','6*pi'],['2.211','22,6'],['2.211','7.2*pi'],['4.91:0','1/2+sqrt(3)/2*i'],['4.91:1','4i'],['4.91:2','-81/2+81*sqrt(3)/2*i']])await check(id,[value]);
for(const [id,value]of [['2.186','1,99 cm/s'],['2.237','1,7 cm/s'],['2.187:0','37,8'],['2.206','18,9'],['2.211','22,7'],['4.91:1','2i']])await check(id,[value],false);
for(const [id,values]of [['2.78:0',['x=1','y=2']],['2.78:1',['x=-2','y=2']],['2.78:2',['x=0','y=x-1']]])await check(id,values);
await check('2.78:1',['x=-3','y=2'],false);
for(const item of report.changes){const status=await page.evaluate(id=>{const qs=expandGameTask(reviewBank.find(q=>q.id===id));return qs.map(q=>{reviewTask(q);showSolution();const svg=[];for(const s of document.querySelectorAll('.task svg:not(.katex svg)')){const v=s.viewBox.baseVal;for(const t of s.querySelectorAll('text')){const b=t.getBBox();if(b.x<v.x-1||b.y<v.y-1||b.x+b.width>v.x+v.width+1||b.y+b.height>v.y+v.height+1)svg.push(t.textContent);}}return {id:q.id,latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,svg,tools:q.geogebra&&!q.miniräknare};});},item.id);for(const s of status){if(s.latex||s.wide||s.svg.length||s.tools)layout.push({width,...s});views++;}}
}
const mc={window:{}};vm.runInNewContext(fs.readFileSync(master+'/uppgifterma2.js','utf8'),mc);
await page.evaluate(async bank=>{await selectCourse('ma2');state.view='training';state.data.bank=bank;window.reviewBank=bank;state.track='2b';if(availableTasks().some(q=>q.id==='1.272'))throw Error('1.272 leaked into 2b');state.track='2c';if(!availableTasks().some(q=>q.id==='1.272'))throw Error('1.272 missing in 2c');},mc.window.BANKMA2);
await check('2.257',['8','-3']);await check('2.257',['-3','8']);await check('2.257',['8','3'],false);await check('1.168',['4','3','2']);
assert.deepEqual(errors,[]);assert.deepEqual(layout,[]);console.log(JSON.stringify({checks,views,errors,layout}));
for(const id of []){await page.evaluate(id=>reviewTask(reviewBank.find(q=>q.id===id)),id);await page.locator('.task').screenshot({path:'/tmp/mato1-review-2026-10-18/'+id+'.png'});}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
