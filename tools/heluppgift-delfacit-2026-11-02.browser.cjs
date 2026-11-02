'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
  const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])});});
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8222');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(()=>{session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};
  window.prep=id=>{state.currentTask=state.data.bank.find(q=>q.id===id);Object.assign(state,{answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()};});
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:900});await page.evaluate(()=>selectCourse('ma1'));
  let a=await page.evaluate(()=>{prep('2.201');document.querySelector('#ans-0').value='linjär';checkAnswer();return document.querySelector('#delfacit-0').innerText});
  assert.match(a,/linjär/i);assert.doesNotMatch(a,/exponentiell|förändringsfaktor/i);
  await page.locator('.task').screenshot({path:`/tmp/heluppgift-delfacit-${width}.png`});
  const done=await page.evaluate(()=>{bedomDel(0,true,0);document.querySelector('#ans-1').value='exponentiell';checkAnswer();
   const b=document.querySelector('#delfacit-1').innerText;bedomDel(1,true,1);document.querySelector('#ans-2').value='5*3^x';checkAnswer();return {b,result:window.testResult};});
  assert.match(done.b,/exponentiell/i);assert.doesNotMatch(done.b,/y\s*=\s*5/i);assert.deepEqual(done.result,[true,true,true]);
  const vectors=await page.evaluate(()=>{prep('4.22');document.querySelector('#ans-0').value='13';checkAnswer();return document.querySelector('#delfacit-0').innerText});
  assert.match(vectors,/summans längd/i);assert.doesNotMatch(vectors,/differensen/i);
  const vectorDone=await page.evaluate(()=>{bedomDel(0,true,0);document.querySelector('#ans-1').value='13';checkAnswer();const b=document.querySelector('#delfacit-1').innerText;bedomDel(1,true,1);return {b,result:window.testResult};});
  assert.match(vectorDone.b,/vinkelrät/i);assert.deepEqual(vectorDone.result,[true,true]);
  await page.evaluate(()=>selectCourse('matf1'));
  const first=await page.evaluate(()=>{prep('4.138');document.querySelector('#ans-0').value='0';document.querySelector('#ans-1').value='2';checkAnswer();checkAnswer();return document.querySelector('#delfacit-2').innerText});
  assert.match(first,/underifrån/i);assert.doesNotMatch(first,/ovanifrån/i);
  const last=await page.evaluate(()=>{bedomDel(2,true,1);checkAnswer();const c=document.querySelector('#delfacit-3').innerText;bedomDel(3,true,2);return {c,result:window.testResult}});
  assert.match(last.c,/ovanifrån/i);assert.deepEqual(last.result,[true,true,true,true]);
 }
 const guard=await page.evaluate(()=>delfacitText({rättSvar:[1,2],svarsstruktur:'ordnad',s:'HELA LÖSNINGEN'},0));assert.doesNotMatch(guard,/HELA LÖSNINGEN/);
 for(const [course,id] of [['ma1','2.62'],['ma1','2.232'],['ma1','2.248'],['mato1','3.1149']]){
  await page.evaluate(course=>selectCourse(course),course);
  const layout=await page.evaluate(id=>answerLayout(state.data.bank.find(q=>q.id===id)),id);
  assert.equal(layout.flersvar,true,id);assert.equal(layout.ordnad,false,id);
 }
 for(const [course,id,answers] of [
  ['ma1','2.62',['3','-3']],['ma1','2.232',['f(x)=-3x+4','f(x)=3x-2']],
  ['ma1','2.248',['f(x)=-2x+12','f(x)=2x+8']],['mato1','3.1149',['2','-2']]
 ]){
  await page.evaluate(course=>selectCourse(course),course);
  const result=await page.evaluate(({id,answers})=>{prep(id);answers.forEach((a,i)=>document.querySelector('#ans-'+i).value=a);checkAnswer();
   const before={result:window.testResult,pending:state.samladKomplettering,shown:document.querySelector('#samlad-komplettering')?.innerText||''};
   bedomSamladKomplettering(true);return {before,after:window.testResult};},{id,answers});
  assert.equal(result.before.pending,true,id);assert.equal(result.before.result,null,id);assert.match(result.before.shown,/Stämmer även resten/i,id);
  assert.deepEqual(result.after,[true,true],id);
 }
 await page.evaluate(()=>selectCourse('ma1'));
 const rejected=await page.evaluate(()=>{prep('2.62');document.querySelector('#ans-0').value='-3';document.querySelector('#ans-1').value='3';checkAnswer();bedomSamladKomplettering(false);return window.testResult});
 assert.deepEqual(rejected,[false,false]);
 assert.equal(await page.evaluate(()=>document.querySelector('#part-0').classList.contains('no')&&!document.querySelector('#part-0').classList.contains('ok')),true);
 const navigation=await page.evaluate(()=>{prep('2.62');const live=state.currentTask,previous=state.data.bank.find(q=>q.id==='2.79');
  Object.assign(state,{passHistory:[{task:previous,completed:true},{task:live,completed:false}],passIndex:1,passCourse:state.course,passReview:false,passLive:null,passAvslutat:false,adminBlad:null});
  document.querySelector('#ans-0').value='-3';document.querySelector('#ans-1').value='3';checkAnswer();
  checkAnswer();showSolution();const pending={flag:state.samladKomplettering,noXp:state.noXp,result:window.testResult,snapshot:passSvarStatus().samladKomplettering};
  passBakat();const previousState={id:state.currentTask.id,pending:state.samladKomplettering,shown:!!document.querySelector('#samlad-komplettering')};
  passFramat();const restored={id:state.currentTask.id,pending:state.samladKomplettering,shown:!!document.querySelector('#samlad-komplettering')};
  bedomSamladKomplettering(true);return {pending,previousState,restored,result:window.testResult};});
 assert.deepEqual(navigation.pending,{flag:true,noXp:false,result:null,snapshot:true});
 assert.deepEqual(navigation.previousState,{id:'2.79',pending:false,shown:false});
 assert.deepEqual(navigation.restored,{id:'2.62',pending:true,shown:true});assert.deepEqual(navigation.result,[true,true]);
 const resumed=await page.evaluate(()=>{prep('2.62');state.samladKomplettering=true;state.partResults=[true,true];const ok=aterupptaPass({kurs:state.course,uppgift:'2.62'});return {ok,pending:state.samladKomplettering,results:state.partResults,answered:state.answered};});
 assert.deepEqual(resumed,{ok:true,pending:false,results:[],answered:false});
 const wrong=await page.evaluate(()=>{prep('2.62');document.querySelector('#ans-0').value='-3';document.querySelector('#ans-1').value='4';checkAnswer();return {result:window.testResult,pending:state.samladKomplettering}});
 assert.deepEqual(wrong.result,[true,false]);assert.equal(wrong.pending,false);
 await page.evaluate(()=>selectCourse('ma1'));
 assert.equal(await page.evaluate(()=>expectedAnswersForTask(state.data.bank.find(q=>q.id==='2.79')).auto),false);
 assert.deepEqual(errors,[]);console.log('Tre heluppgifter: separata facit och fullständig rättning på mobil och dator passerar.');
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
