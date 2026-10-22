'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const out='/tmp/review-2026-10-22';fs.mkdirSync(out,{recursive:true});
const banks={};for(const [b,file]of [['fy1','uppgifter.js'],['fy2','uppgifter2.js'],['ma2','uppgifterma2.js']]){const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../'+file,'utf8'),c);banks[b]=Object.values(c.window)[0];}
const cases=[
 ['ma2','4.117',1,['80.3','80,25'],['59.7','90']],
 ['fy1','5.123',0,['254.83 N'],['221.08']],
 ['fy1','5.225',0,['0.462 kW'],['461.686 kW']],
 ['fy1','5.117',1,['52500 N'],['8750 N']],
 ['fy1','5.95',0,['9.4*10^3 J','9400 J','9.4 kJ'],['9.4 J','9300 J']],
 ['fy1','5.97',0,['3.6 J'],['7.2 J']],
 ['fy1','5.14',0,['24 kg m/s','24 kg·m/s','24 N s'],['24 m/s','24 J']],
 ['fy1','5.382',1,['0.0200 s','20.0 ms'],['0.0116 s']],
 ['fy1','5.396',0,['33.7 N'],['32.7 N']],
 ['fy1','5.395',1,['22.6 N'],['22.2 N']],
 ['fy1','9.415',0,['4.1e-16 J','4.142e-16 J'],['4.1418e-16 J','4.0e-16 J']],
 ['fy1','9.415',1,['7e5 m/s','7.000e5 m/s'],['6.9999e5 m/s','7.1e5 m/s']],
 ['fy1','2.2',0,['11','10.5','10.50'],['10.500','12']],
 ['fy1','2.2',1,['670','672.0','0.672 kg'],['672.00','673']],
 ['fy2','1.2',0,['7','7.000'],['7.0000','7.01']],
 ['fy2','1.3',0,['35','34.56'],['34.558','34.55']],
 ['fy2','1.3',1,['3.1','3.142'],['3.1416','3.141']],
 ['fy2','1.4',0,['86','86.40'],['86.400','86.5']],
 ['fy2','1.4',1,['16','15.55'],['15.552','15.56']],
 ['fy2','1.6',0,['23','22.50'],['22.500','22.51']]
];
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[],issues=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(banks=>{window.reviewBanks=banks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.prepareReview=(bank,id,part)=>{const q=expandGameTask(reviewBanks[bank].find(p=>p.id===id))[part];state.course=bank;state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},banks);
 await page.evaluate(()=>selectCourse('fy1'));let checks=0,views=0;
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
  for(const [bank,id,part,good,bad]of cases){
   for(const [list,want]of [[good,true],[bad,false]])for(const answer of list){
    const result=await page.evaluate(([bank,id,part,answer])=>{prepareReview(bank,id,part);document.getElementById('ans-0').value=answer;uppdateraFormelvisning(0);checkAnswer();return window.result||state.partResults;},[bank,id,part,answer]);
    assert.equal(result.length,1,id+' '+answer);assert.equal(result[0],want,bank+' '+id+' '+answer+' '+result);checks++;
   }
   const q=await page.evaluate(([bank,id,part])=>{const q=prepareReview(bank,id,part);showSolution();scrollTo(0,0);return q;},[bank,id,part]);
   assert.equal(q.miniräknare,true,bank+' '+id+' calculator');assert.equal(q.geogebra,bank==='ma2',bank+' '+id+' geogebra');
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,mathOverflow:[...document.querySelectorAll('.katex-display')].filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent)}));
   if(status.latex||status.wide||status.mathOverflow.length)issues.push({bank,id,part,width,...status});views++;
   if(['4.117','5.123','9.415'].includes(id))await page.locator('.task').screenshot({path:`${out}/${bank}-${id}-${part}-${width}.png`});
  }
  await page.evaluate(()=>{prepareReview('fy1','5.14',0);document.getElementById('ans-0').value='24 kg m/s';uppdateraFormelvisning(0);});
  await page.locator('.task').screenshot({path:`${out}/enhet-${width}.png`});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(issues,[]);const result={checks,views,widths:[390,1280],errors,issues};fs.writeFileSync(out+'/browser.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
