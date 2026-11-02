'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8294');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await p.evaluate(()=>{session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=({id,part})=>{let t=state.data.bank.find(q=>q.id===id);if(part!=null)t=expandGameTask(t)[part];Object.assign(state,{currentTask:t,answered:false,noXp:false,solutionShown:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()};});
 for(const width of [390,1280]){
  await p.setViewportSize({width,height:900});await p.evaluate(async()=>selectCourse('mato1'));
  const tests=[
   ['2.302',0,['18x^2-2x',"f'(x)=18x^2-2x",'f′(x)=18x^2-2x','18x²−2x','2x(9x-1)'],['18x^2+2x',"f''(x)=18x^2-2x","g'(x)=18x^2-2x","f'(y)=18x^2-2x"]],
   ['2.302',1,['1.5/sqrt(x)',"f'(x)=3/(2sqrt(x))"],['1.5*sqrt(x)']],
   ['2.302',2,['2-2/x^3',"f'(x)=2-2x^(-3)"],['2+2/x^3']],
   ['2.92',0,['30x^5-12x^2',"f'(x)=30x^5-12x^2"],['30x^5+12x^2']],
   ['2.92',1,['5x^4-10',"g'(x)=5x^4-10"],["f'(x)=5x^4-10"]],
   ['2.107',0,['4.5x^2-0.5x'],['4.5x^2+0.5x']],
   ['2.112',0,['24x^7+3x^2'],['24x^7+3x']],
   ['2.308',null,['40x^3-18x',"f''(x)=40x^3-18x"],['40x^3+18x']],
   ['2.674',null,['2','x=2'],['-2','0']],['2.1206',null,['2'],['0','-2']],
   ['2.1233',null,['7.5','7,5 %'],['-7.5','8.5']],['3.1227',null,['8'],['7','9']]
  ];
  for(const [id,part,good,bad] of tests)for(const [want,inputs] of [[true,good],[false,bad]])for(const value of inputs){
   await p.evaluate(({id,part})=>prep({id,part}),{id,part});await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`${id} ${part} ${value}`);
  }
  for(const [values,want] of [[['6','760'],true],[['760','6'],false]]){
   const result=await p.evaluate(values=>{prep({id:'3.518',part:null});values.forEach((v,i)=>document.getElementById('ans-'+i).value=v);for(let i=0;i<values.length&&!window.testResult;i++)checkAnswer();return window.testResult},values);
   assert.ok(Array.isArray(result)&&result.length>0);assert.equal(result.every(Boolean),want,`3.518 ${values}`);
  }
  await p.evaluate(async()=>selectCourse('ma1'));
  for(const [id,good,bad] of [['5.272',['800'],['24','80']],['5.485',['400','400 kr'],['80','4000']],['5.486',['360','360 kr'],['120','3600']],['5.490',['0,0005'],['0,0004','0,0006']]])for(const [want,inputs] of [[true,good],[false,bad]])for(const value of inputs){
   await p.evaluate(id=>prep({id,part:null}),id);await p.locator('#ans-0').fill(value);await p.evaluate(()=>checkAnswer());assert.deepEqual(await p.evaluate(()=>window.testResult),[want],`${id} ${value}`);
  }
  for(const id of ['5.272','5.485','5.486','5.490']){await p.evaluate(id=>{prep({id,part:null});showSolution()},id);assert.equal(await p.locator('.task .katex-error').count(),0,id);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,id);}
 }
 await p.evaluate(async()=>selectCourse('mato1'));
 for(const [value,want] of [['18x^2-2x',true],["f'(x)=18x^2-2x",true],['18x^2+2x',false]]){
  const result=await p.evaluate(value=>{const saved=window.nerdamer;try{window.nerdamer=undefined;prep({id:'2.302',part:0});document.getElementById('ans-0').value=value;checkAnswer();return window.testResult}finally{window.nerdamer=saved}},value);
  assert.deepEqual(result,[want],`Utan algebra-bibliotek: ${value}`);
 }
 assert.deepEqual(errors,[]);console.log('Derivatans likvärdiga svar och felsvar samt riskuppgifter rättas på mobil och dator.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
