'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8294');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(async()=>{await selectCourse('mato1');session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=(id,part=null)=>{let t=state.data.bank.find(q=>q.id===id);if(part!==null)t=expandGameTask(t)[part];Object.assign(state,{currentTask:t,answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()};});
 for(const width of [390,1280]){
 await p.setViewportSize({width,height:900});
 for(const [id,part,good,bad] of [['3.132',0,['5','5 m'],['1.3333','13']],['3.132',1,['13','13 m'],['4','5']],['3.500',null,['58.67','58,7','58,6667','176/3','176/3 tkr','58.67 tkr','58.67 tusen kronor','58667 kr','58666,67 kronor'],['58.6','58.67 kr','58667','58.67 m']],['3.486',null,['270.75','270,8 Mkr','270,75 miljoner kronor','270752 tkr'],['270,75 kr','270,8 kr','270.7']]]){
  for(const [want,values] of [[true,good],[false,bad]])for(const value of values){await p.evaluate(([id,part])=>prep(id,part),[id,part]);await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`${width} ${id}/${part} ${value}`);}
 }
 await p.evaluate(()=>{beginSession();state.sessionTarget=30;const q=state.data.bank.find(x=>x.id==='3.132');visaUppgift(kedjaStarta(expandGameTask(q)[0]));});
 assert.equal(await p.evaluate(()=>state.currentTask.id),'3.132a');
 await p.locator('#ans-0').fill('5 m');await p.evaluate(()=>{window.testResult=null;checkAnswer()});assert.deepEqual(await p.evaluate(()=>window.testResult),[true]);
 await p.evaluate(()=>{kedjaSpara(state.currentTask,true);kedjaFortsatt()});assert.equal(await p.evaluate(()=>state.currentTask.id),'3.132b');
 await p.locator('#ans-0').fill('13 m');await p.evaluate(()=>{window.testResult=null;checkAnswer()});assert.deepEqual(await p.evaluate(()=>window.testResult),[true]);
 const res=await p.evaluate(()=>{prep('3.731');document.querySelector('#ans-0').value='15';checkAnswer();document.querySelector('#ans-1').value='Stenens sträcka mellan 1 och 2 sekunder';checkAnswer();return {b:document.querySelector('#delfacit-1').innerText,wide:document.documentElement.scrollWidth>innerWidth+1,latex:document.querySelectorAll('.katex-error').length}});
 assert.match(res.b,/sträcka stenen faller/i);assert.match(res.b,/15 m/);assert.equal(res.latex,0);assert.equal(res.wide,false);
 const graph=await p.evaluate(()=>{prep('2.85');document.querySelector('#ans-0').value='-1';document.querySelector('#ans-1').value='1';checkAnswer();checkAnswer();return document.querySelector('#delfacit-2').innerText});
 assert.match(graph,/växande/i);assert.doesNotMatch(graph,/lösning för den här delen saknas/i);
 const signs=await p.evaluate(()=>{prep('3.359');document.querySelector('#ans-0').value='-1';document.querySelector('#ans-1').value='3';checkAnswer();checkAnswer();return document.querySelector('#delfacit-2').innerText});
 assert.match(signs,/positiv/i);assert.doesNotMatch(signs,/maximipunkt|minimipunkt|−22/);
 const extrema=await p.evaluate(()=>{bedomDel(2,true,1);checkAnswer();return document.querySelector('#delfacit-3').innerText});assert.match(extrema,/maximipunkt/i);assert.match(extrema,/minimipunkt/i);
 for(const id of ['2.85','2.90','2.95','2.100','2.105','2.110','2.115','2.120','3.359','3.365','3.369']){
  const v=await p.evaluate(id=>{prep(id);const q=state.currentTask;return {b:delfacitText(q,1),c:delfacitText(q,2)}},id);
  assert.doesNotMatch(v.b,/lösning för den här delen saknas/);assert.ok(v.b.length>60,id);if(id.startsWith('3.'))assert.doesNotMatch(v.c,/lösning för den här delen saknas/);
 }
 for(const id of ['3.500','3.486','3.731']){await p.evaluate(id=>{prep(id);showSolution()},id);assert.equal(await p.locator('.katex-error').count(),0,id);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,id);const clipped=await p.evaluate(()=>[...document.querySelectorAll('.task .katex-display')].some(d=>[...d.querySelectorAll('.base')].some(b=>b.getBoundingClientRect().width>d.getBoundingClientRect().width+2)));assert.equal(clipped,false,`${id} matematiken ryms inte`);}
 }
 assert.deepEqual(errors,[]);console.log('Samtliga rapporter och separata delfacit passerar på mobil och dator.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
