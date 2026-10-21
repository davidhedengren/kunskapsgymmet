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
const groups={fy1:['2.327','2.328','2.329','2.330','2.331','2.332','2.333','2.334']};
const cases=[['2.175',['5140','2/0.0014*3.60'],['51400']],['2.176',['322','45*19.3/2.7'],['321']],['2.177',['4.29','3.4*11.3/8.96'],['4.28']],['2.178',['9.62','86.28/28.32*4*pi*0.91^3/3'],['9.61']],['2.179',['6.33','8.96*pi*(1.75^2-1.25^2)*150/1000'],['6.32']],['2.284',['0.6','0.60'],['0.3']],['2.285',['2.7','54/20'],['54/60']],['2.287',['210','120/40*70'],['120']],['2.190',['0.853','(89.22-35)/(98.44-35)*0.998'],['0.9']],['2.194',['94.1','80/850000*1000000'],['9.41']],['2.327',['B','b'],['A','C']],['2.328',['1.2','1,2 g/cm³'],['1.65']],['2.329',['1.5','3/2'],['0.5','2/3']],['2.330',['40','40%'],['60']],['2.331',['C','c'],['A','B','D']],['2.332',['40','40%'],['60']],['2.333',['100','100 µm'],['0.1']],['2.334',['4','4 cm³'],['16','20']]];
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>selectCourse('fy1'));
for(const [id,good,bad]of cases){for(const input of good)await check(id,null,input,true);for(const input of bad)await check(id,null,input,false);
await page.evaluate(id=>{reviewTask(id);showSolution();scrollTo(0,0);},id);
const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));if(status.latex||status.wide)issues.push({id,width,...status});views++;
await page.locator('.task').screenshot({path:`/tmp/density-${id}-${width}.png`});
}}
console.log(JSON.stringify({checks,views,issues,errors}));assert.deepEqual(issues,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
