const {chromium}=require('playwright');
const assert=require('node:assert/strict'),path=require('node:path');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:390,height:900}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
  const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
  return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])});
 });
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8217');
 await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(()=>{session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.testResult=r};
  window.prep=id=>{state.currentTask=state.data.bank.find(q=>q.id===id);Object.assign(state,{answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null});window.testResult=null;renderTraining()};
 });
 await p.evaluate(()=>selectCourse('mato1'));
 const symboler=await p.evaluate(()=>{prep('1.93');return [...document.querySelectorAll('.symrad button')].map(x=>x.textContent.trim())});
 for(const symbol of ['≠','≤','≥'])assert.ok(symboler.includes(symbol),symbol);
 for(const answer of ['saknar lösning','ingen lösning','omöjligt','∅']){
  let ok=await p.evaluate(answer=>{prep('1.150');document.querySelector('#ans-0').value=answer;checkAnswer();return window.testResult},answer);
  assert.deepEqual(ok,[true],answer);
 }
 for(const [answer,ok] of [['x≠2',true],['x!=2',true],['alla reella tal utom 2',true],['x<2 eller x>2',true],['2',false],['x=2',false],['x≠3',false],['alla reella tal',false]]){
  const r=await p.evaluate(answer=>{prep('1.93');document.querySelector('#ans-0').value='x+2';checkAnswer();document.querySelector('#ans-1').value=answer;checkAnswer();return state.partResults[1]},answer);
  assert.equal(r,ok,answer);
 }
 for(const [answer,ok] of [['x≠3',true],['alla reella tal utom 3',true],['3',false],['x≠2',false]]){
  const r=await p.evaluate(answer=>{prep('1.98');document.querySelector('#ans-0').value='x+3';checkAnswer();document.querySelector('#ans-1').value=answer;checkAnswer();return state.partResults[1]},answer);
  assert.equal(r,ok,answer);
 }
 for(const answer of ['x(x-2)/(x+2)','(x^2-2x)/(x+2)','(x*x-2*x)/(2+x)']){
  const r=await p.evaluate(answer=>{prep('1.966');document.querySelector('#ans-0').value=answer;checkAnswer();document.querySelector('#ans-1').value='2';document.querySelector('#ans-2').value='-2';checkAnswer();return window.testResult},answer);
  assert.deepEqual(r,[true,true,true],answer);
 }
 for(const answer of ['-9≤g(7)≤6','-9<=g(7)<=6','[-9,6]']){
  assert.deepEqual(await p.evaluate(answer=>{prep('2.221');document.querySelector('#ans-0').value=answer;checkAnswer();return window.testResult},answer),[true],answer);
 }
 await p.evaluate(()=>{prep('4.470')});
 const color=await p.locator('.task svg circle').first().evaluate(el=>getComputedStyle(el).stroke);
 assert.notEqual(color,'rgb(234, 240, 249)');
 await p.locator('.task').screenshot({path:'/tmp/fellogg1101-4.470-after.png'});
 await p.evaluate(()=>{prep('1.907')});await p.locator('.task').screenshot({path:'/tmp/fellogg1101-1.907-after.png'});
 await p.evaluate(()=>{prep('1.895')});await p.locator('.task').screenshot({path:'/tmp/fellogg1101-1.895-after.png'});
 await p.evaluate(()=>{prep('1.866')});await p.locator('.task').screenshot({path:'/tmp/fellogg1101-1.866-after.png'});
 await p.evaluate(()=>selectCourse('mato2'));
 const leak=await p.evaluate(()=>{prep('2.106');visaDelfacit(0,0);return document.querySelector('#delfacit-0').innerText});
 assert.match(leak,/växer/);assert.doesNotMatch(leak,/minimipunkt|maximipunkt|avtar/);
 for(const id of ['2.04','2.05','2.163','2.162','2.15']){
  const isolated=await p.evaluate(id=>{prep(id);return state.currentTask.spelDelar.map((part,i)=>delfacitText(state.currentTask,i)===part.s)},id);
  assert.ok(isolated.every(Boolean),id);
 }
 const incomplete=await p.evaluate(()=>{prep('2.190');const e=document.querySelector('#ans-0');e.value='cos(x';uppdateraFormelvisning(0);const warning=document.querySelector('#fv-0').innerText;checkAnswer();return {warning,parts:state.partResults,index:state.partIndex}});
 assert.match(incomplete.warning,/Kontrollera parenteserna/i);assert.match(incomplete.warning,/cos\(x/);assert.deepEqual(incomplete.parts,[]);assert.equal(incomplete.index,0);
 for(const id of ['2.190','2.93']){
  const q=await p.evaluate(id=>{prep(id);return state.currentTask},id);
  assert.equal(q.spelDelar.length,4);
 }
 await p.evaluate(()=>selectCourse('ma2'));
 for(const [answer,expected] of [['(5,7)',true],['5;7',true],['(7,5)',false],['(5,8)',false]]){
  const got=await p.evaluate(answer=>{prep('3.263');document.querySelector('#ans-0').value=answer;checkAnswer();return window.testResult},answer);
  assert.deepEqual(got,[expected],answer);
 }
 await p.evaluate(()=>selectCourse('ma1'));
 let placeholders=await p.evaluate(()=>{prep('4.101');return [...document.querySelectorAll('#answer-zone input')].map(e=>e.placeholder)});
 assert.ok(placeholders.every(x=>x==='Ditt svar'));
 for(const [answer,expected] of [['4.8',true],['4.7693',true],['4.7',false],['4.9',false]]){
  const got=await p.evaluate(answer=>{prep('4.50');document.querySelector('#ans-0').value=answer;checkAnswer();return window.testResult},answer);
  assert.deepEqual(got,[expected],answer);
 }
 assert.deepEqual(errors,[]);await b.close();console.log('Fellogg 1 november: faktiska svar, facit per del, parentesvarning, koordinater och avrundning passerar.');
})().catch(e=>{console.error(e);process.exitCode=1});
