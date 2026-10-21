/* Kör mot lokal server på 8027. Inga elevdata eller rapportstatusar skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
fs.mkdirSync('/tmp/multimeter-1836',{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');

const banks={};for(const [name,file] of [['fy1','uppgifter.js'],['fy2','uppgifter2.js'],['matf1','uppgiftermatf1.js'],['mato2','uppgiftermato2.js']]){const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../../Uppgiftslabbet/'+file,'utf8'),c);banks[name]=Object.values(c.window)[0];}
await page.evaluate(banks=>{window.reviewBanks=banks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.reviewTask=(id,part)=>{const p=reviewBanks[state.course].find(q=>q.id===id),q=part==null?p:expandGameTask(p)[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},banks);
const tasks=banks.fy1.filter(q=>q.omr==='multimeter'),screens=new Set(['8.542','8.543','8.544','8.545','8.548','8.550','8.551','8.552','8.553','8.554','8.564','8.566','8.567','8.568','8.569','8.570','8.571','8.572','8.573']);
let checks=0,views=0;const issues=[];
await page.evaluate(()=>selectCourse('fy1'));
for(const width of [390,1280]){
 await page.setViewportSize({width,height:1000});
 for(const q of tasks){
  // Check all correct options together, every distractor separately, and missing selections in multi-select.
  const correct=q.alternativ.filter(a=>a.ratt).map(a=>a.txt);
  const cases=[[correct,true],...q.alternativ.filter(a=>!a.ratt).map(a=>[[a.txt],false])];
  if(correct.length>1)cases.push([[correct[0]],false]);
  for(const [selected,want]of cases){
   const result=await page.evaluate(([id,selected])=>{const q=reviewTask(id);state.altOrdningId=null;renderTraining();const a=altLista(q);for(const txt of selected){const i=a.findIndex(x=>x.txt===txt);if(i<0)throw Error('Missing alternative: '+txt);vaxlaAlt(i);}kollaAlt();return window.result;},[q.id,selected]);
   assert.ok(result&&result.length,q.id);assert.equal(result.every(Boolean),want,q.id+' '+selected.join(' | '));checks++;
  }
  await page.evaluate(id=>{reviewTask(id);showSolution();scrollTo(0,0);},q.id);
  const state=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));
  if(state.latex||state.wide)issues.push({id:q.id,width,...state});views++;
  if(screens.has(q.id))await page.locator('.task').screenshot({path:`/tmp/multimeter-1836/${q.id}-${width}.png`});
 }
}
const gallery=await browser.newPage({viewport:{width:1100,height:900}});
let html='<html><body style="margin:24px;font-family:sans-serif;display:grid;grid-template-columns:1fr 1fr;gap:24px">';
for(const id of ['8.553','8.566','8.567','8.568','8.569','8.570','8.571','8.572','8.573']){const q=tasks.find(q=>q.id===id);html+='<section><h2>'+id+'</h2>'+q.t.match(/<svg[\s\S]*?<\/svg>/)[0]+'</section>';}
await gallery.setContent(html+'</body></html>');await gallery.screenshot({path:'/tmp/multimeter-1836/figurer.png',fullPage:true});
const clipping=await gallery.evaluate(()=>[...document.querySelectorAll('svg')].flatMap(s=>[...s.querySelectorAll('text')].filter(t=>{const b=t.getBBox(),m=t.getCTM(),sm=s.getCTM().inverse(),p=s.createSVGPoint();p.x=b.x;p.y=b.y;const a=p.matrixTransform(sm.multiply(m));p.x=b.x+b.width;p.y=b.y+b.height;const z=p.matrixTransform(sm.multiply(m));const v=s.viewBox.baseVal;return a.x<v.x-.5||a.y<v.y-.5||z.x>v.x+v.width+.5||z.y>v.y+v.height+.5;}).map(t=>t.textContent)));
assert.deepEqual(clipping,[]);assert.deepEqual(issues,[]);assert.deepEqual(errors,[]);
const result={tasks:tasks.length,checks,views,widths:[390,1280],issues,errors,clippedLabels:clipping};fs.writeFileSync('/tmp/multimeter-1836/result.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
