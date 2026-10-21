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
const groups={fy1:['8.382','8.383','3.165','3.252','3.222','3.221','2.321','2.322','2.323','2.324','2.325','2.326'],matf1:['3.303','3.308','3.309'],mato2:['1.118']};
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const [course,ids] of Object.entries(groups)){
 await page.evaluate(c=>selectCourse(c),course);
 const cases=course==='fy1'?[
 ['2.321',null,['0.000075'],['0.075']],['2.322',null,['0.96'],['9600']],['2.323',null,['60'],['3600']],['2.324',null,['800'],['80']],['2.325',null,['420'],['42']],['2.326',null,['1200'],['1.2']],
 ['8.382',null,['A','a'],['B','C']],['8.383',null,['B','b'],['A','C']],
 ['3.165',0,['30.7','30.6875 m'],['31.7']],['3.165',1,['24.55 m/s'],['24.5']],
 ['3.252',null,['17.05','17.1 m/s'],['17.2']],['3.222',null,['3.33','10/3 s'],['3.34']],['3.221',1,['0.71','7/9.82 s'],['0.72']]
 ]:course==='matf1'?[
 ['3.303',null,['-0.67','-2/3 m/min'],['0.67']],['3.308',null,['-27','48-24*pi'],['27']],['3.309',null,['-7.5','-7.5 m/s'],['7.5']]]:[['1.118',0,['2*pi/3','2π/3 rad'],['120 rad']],['1.118',1,['4*pi cm'],['4*pi m']],['1.118',2,['12*pi cm²'],['12*pi cm']]];
 for(const [id,part,good,bad]of cases){for(const input of good)await check(id,part,input,true);for(const input of bad)await check(id,part,input,false);}
 if(course==='mato2'){await page.evaluate(()=>reviewTask('1.118',0));assert.equal(await page.locator('#svarsenhet-0').innerText(),'Svara i rad');await page.locator('#ans-0').fill('2π/3');assert.ok(await page.locator('#svarsenhet-0').isVisible());checks++;}
 for(const id of ids){const count=await page.evaluate(id=>expandGameTask(reviewBanks[state.course].find(q=>q.id===id)).length,id);for(const part of [null,...(count>1?Array.from({length:count},(_,i)=>i):[])]){await page.evaluate(([id,part])=>{reviewTask(id,part);showSolution();scrollTo(0,0);},[id,part]);const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;})}));if(status.latex||status.wide||status.clipped)issues.push({course,id,part,width,...status});views++;}
 if(['8.382','8.383','3.303','3.308','3.309','2.321','2.322','2.323','2.324','2.325','2.326'].includes(id)){await page.evaluate(id=>{reviewTask(id);showSolution();scrollTo(0,0);},id);await page.locator('.task').screenshot({path:`/tmp/1300-${course}-${id}-${width}.png`});}}
}}
console.log(JSON.stringify({checks,views,issues,errors}));assert.deepEqual(issues,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
