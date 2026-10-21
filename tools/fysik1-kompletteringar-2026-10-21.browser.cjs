/* Kör mot lokal server på 8027. Inga elevdata eller rapportstatusar skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
fs.mkdirSync('/tmp/fy1-komplettering',{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');

const banks={};for(const [name,file] of [['fy1','uppgifter.js'],['fy2','uppgifter2.js'],['matf1','uppgiftermatf1.js'],['mato2','uppgiftermato2.js']]){const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../../Uppgiftslabbet/'+file,'utf8'),c);banks[name]=Object.values(c.window)[0];}
await page.evaluate(banks=>{window.reviewBanks=banks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.reviewTask=(id,part)=>{const p=reviewBanks[state.course].find(q=>q.id===id),q=part==null?p:expandGameTask(p)[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},banks);
const batches={medicin:{ids:Array.from({length:8},(_,i)=>'9.'+(436+i)),numeric:{
 '9.437':{good:['62.5','62,5 %','0.625'],bad:['37.5','0.625 %','500']},
 '9.438':{good:['3.2','3,2 Gy','3200 mGy'],bad:['6.4','0.8','-3.2']},
 '9.439':{good:['3','3 h','180 min'],bad:['6','1.5','3 s']},
 '9.440':{good:['720','720 MBq','0.72 GBq'],bad:['45','180','360']},
 '9.441':{good:['120','180-60','5!'],bad:['100','119','180','60']}
}},standard:{ids:Array.from({length:8},(_,i)=>'9.'+(444+i)),numeric:{'9.448':{good:['21','7*3','3*(3+4)','21.0'],bad:['7','9','24','20.99']}}}};
const batchName=process.argv[2]||'medicin',batch=batches[batchName];assert.ok(batch,batchName);
let checks=0,views=0;const issues=[];await page.evaluate(()=>selectCourse('fy1'));
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
 for(const id of batch.ids){const q=banks.fy1.find(q=>q.id===id);assert.ok(q,id);
  if(q.svarstyp==='alternativ'){
   for(const a of q.alternativ){const result=await page.evaluate(([id,txt])=>{const q=reviewTask(id);state.altOrdningId=null;renderTraining();vaxlaAlt(altLista(q).findIndex(a=>a.txt===txt));kollaAlt();return window.result;},[id,a.txt]);assert.equal(result.every(Boolean),a.ratt,id+' '+a.txt);checks++;}
  }else{
   const data=batch.numeric[id];assert.ok(data,id);
   for(const [list,want]of [[data.good,true],[data.bad,false]])for(const input of list){const result=await page.evaluate(([id,input])=>{reviewTask(id);document.getElementById('ans-0').value=input;checkAnswer();return window.result||state.partResults;},[id,input]);assert.ok(result.length,id);assert.equal(result.every(Boolean),want,id+' '+input+' '+result);checks++;}
  }
  await page.evaluate(id=>{reviewTask(id);showSolution();scrollTo(0,0);},id);
  const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));if(status.latex||status.wide)issues.push({id,width,...status});views++;
  await page.locator('.task').screenshot({path:`/tmp/fy1-komplettering/${batchName}-${id}-${width}.png`});
 }
}
if(batchName==='standard')for(const width of [390,1280]){
 await page.setViewportSize({width,height:1000});
 for(const item of [{id:'9.261',good:['1','+1 e'],bad:['2']},{id:'9.262',good:['0','0 e'],bad:['1']},{id:'9.263',good:['2','2 e'],bad:['1']},{id:'9.264',good:['-1','-1 e'],bad:['1']},{id:'9.265',good:['1','1 e'],bad:['-1']},{id:'9.329',part:0,good:['3','3.0'],bad:['2']},{id:'9.329',part:1,good:['0','0.0'],bad:['1']}]){
  for(const [list,want]of [[item.good,true],[item.bad,false]])for(const input of list){const result=await page.evaluate(([id,part,input])=>{reviewTask(id,part);document.getElementById('ans-0').value=input;checkAnswer();return window.result||state.partResults;},[item.id,item.part,input]);assert.ok(result.length,item.id);assert.equal(result.every(Boolean),want,item.id+' '+input);checks++;}
  await page.evaluate(([id,part])=>{reviewTask(id,part);showSolution();},[item.id,item.part]);
  const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));if(status.latex||status.wide)issues.push({id:item.id,part:item.part,width,...status});views++;
  await page.locator('.task').screenshot({path:`/tmp/fy1-komplettering/${batchName}-${item.id}-${item.part??'root'}-${width}.png`});
 }
}
const gallery=await browser.newPage({viewport:{width:1100,height:900}});let html='<html><body style="margin:24px;font-family:sans-serif;display:grid;grid-template-columns:1fr 1fr;gap:24px">';
for(const id of batch.ids){const q=banks.fy1.find(q=>q.id===id);html+='<section><h2>'+id+'</h2>'+q.t.match(/<svg[\s\S]*?<\/svg>/)[0]+'</section>';}
await gallery.setContent(html+'</body></html>');await gallery.screenshot({path:`/tmp/fy1-komplettering/${batchName}-figurer.png`,fullPage:true});
const clipping=await gallery.evaluate(()=>[...document.querySelectorAll('svg')].flatMap(s=>[...s.querySelectorAll('text')].filter(t=>{const b=t.getBBox(),v=s.viewBox.baseVal;return b.x<v.x-.5||b.y<v.y-.5||b.x+b.width>v.x+v.width+.5||b.y+b.height>v.y+v.height+.5;}).map(t=>t.textContent)));
assert.deepEqual(issues,[]);assert.deepEqual(errors,[]);assert.deepEqual(clipping,[]);const result={batch:batchName,ids:batch.ids,checks,views,widths:[390,1280],issues,errors,clippedLabels:clipping};fs.writeFileSync(`/tmp/fy1-komplettering/${batchName}-result.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
