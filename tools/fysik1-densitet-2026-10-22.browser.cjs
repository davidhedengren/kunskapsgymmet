/* Lokal server på 8027. Testar riktiga svarsfält utan att skriva elevdata. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const out='/tmp/densitet-2026-10-22';fs.mkdirSync(out,{recursive:true});
const cases=[
 ['2.2',0,['11','10.5','10,50 g/cm³'],['10.500','12']],['2.2',1,['670','672 g','0.672 kg'],['672.00','680']],
 ['2.8',null,['8.5','8,5 g/cm³'],['85']],
 ['2.17',0,['240','240 cm³'],['24']],['2.17',1,['1.2','1,2 g/cm³'],['12']],['2.17',2,['1200','1200 kg/m³'],['1.2']],
 ['2.18',null,['8.26','300/(200/8.96+100/7.14)'],['8.25','8.27']],
 ['2.26',0,['130','125','125.0 cm³'],['125.00','124']],['2.26',1,['1050','1050 g'],['105']],['2.26',2,['8.4','8.400 g/cm³'],['8.4000','8.5']],['2.26',3,['8400','8.4e3 kg/m³'],['8400.0','8500']],
 ['2.27',0,['104','1/19.3/5000*10^7'],['103','105']],['2.27',1,['357','1/19.3/5000*10^7/0.29'],['356','359']],
 ['2.31',0,['10','10 g'],['20']],['2.31',1,['50','50 g'],['25']],['2.31',2,['2','2 g/cm³'],['0.5']],['2.31',3,['70','70 g'],['35']],
 ['2.38',0,['2000','1970','1968','1.968e3 kg'],['1967.5','1960']],['2.38',1,['2.0','1.97','1.968 ton'],['1.9675','1.96']],
 ['2.39',0,['40','40 g'],['20']],['2.39',1,['2','2 g/cm³'],['0.5']],
 ['2.42',0,['2.7','2,7 g/cm³'],['27']],['2.42',1,['565','565 g'],['56.5']],['2.42',2,['500','500 cm³'],['50']],['2.42',3,['7.5','7.5 g/cm³'],['0.75']],
 ['2.274',null,['711.3','4*pi/3*(2.7*8+7.8*19)'],['711.2','711.4']],
 ['2.52',0,['1330','15000/11.3'],['1320','1340']],['2.52',1,['6.82','(3*15000/11.3/(4*pi))^(1/3)'],['6.81','6.83']],['2.52',2,['8.59','(3*30000/11.3/(4*pi))^(1/3)'],['8.58','8.60']],
 ['2.53',null,['8210','8210 kg/m³'],['8030']],
 ['2.54',0,['50.2','450/8.96'],['50.1','50.3']],['2.54',1,['242','8.96*27'],['241','243']]
];
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[],issues=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../uppgifter.js','utf8'),c);
 await page.evaluate(bank=>{window.reviewBank=bank;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.reviewTask=(id,part)=>{const p=reviewBank.find(q=>q.id===id),q=part==null?p:expandGameTask(p)[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},Object.values(c.window)[0]);
 let checks=0,views=0;
 for(const width of [390,1280]){await page.setViewportSize({width,height:1100});await page.evaluate(()=>selectCourse('fy1'));
  for(const[id,part,good,bad]of cases.filter(row=>!process.env.REVIEW_ID||row[0]===process.env.REVIEW_ID)){
   for(const[input,want]of [...good.map(s=>[s,true]),...bad.map(s=>[s,false])]){
    const actual=await page.evaluate(([id,part,input])=>{reviewTask(id,part);document.getElementById('ans-0').value=input;checkAnswer();return window.result||state.partResults;},[id,part,input]);
    assert.ok(actual.length,id);assert.equal(actual.every(Boolean),want,`${id} ${part} ${input}: ${actual}`);checks++;
   }
   await page.evaluate(([id,part])=>{reviewTask(id,part);showSolution();scrollTo(0,0);},[id,part]);
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,formula:[...document.querySelectorAll('.katex-display')].some(e=>e.scrollWidth>e.clientWidth+2)}));
   if(status.latex||status.wide||status.formula)issues.push({id,part,width,...status});views++;
   await page.locator('.task').screenshot({path:`${out}/${id}-${part??'whole'}-${width}.png`});
  }
 }
 console.log(JSON.stringify({checks,views,issues,errors}));assert.deepEqual(issues,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
