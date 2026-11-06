'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict');
const cases=[
 ['4.257',[['5,9'],['5,90 mm'],['0,59 cm']],[['5,95'],['6']]],
 ['4.2148',[['50','54'],['54','50'],['5 cm','54 mm']],[['50','50'],['52','54']]],
 ['4.2149',[['210'],['210 g'],['0,210 kg']],[['200'],['205']]],
 ['4.2150',[['5'],['5 ml'],['0,005 L']],[['495'],['10'],['500']]],
 ['4.2151',[['27'],['27 min'],['1620 s']],[['25'],['26']]]
];
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({reducedMotion:'reduce'}),errors=[];let attempts=0; p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL);await p.waitForFunction(()=>typeof selectCourse==='function'||typeof väljKurs==='function');
 const kg=await p.evaluate(()=>typeof selectCourse==='function');
 if(kg){await p.waitForFunction(()=>typeof nerdamer==='function');await p.evaluate(async()=>{await selectCourse('ma2');session=null;syncOwner=null;arLarare=false;cheer=()=>{};finishAttempt=r=>{state.answered=true;window.testResult=r};window.prep=id=>{const t=state.data.bank.find(q=>q.id===id);Object.assign(state,{currentTask:t,answered:false,noXp:false,solutionShown:false,hintUsed:false,hintVisible:false,partIndex:0,partResults:[],aktivRuta:0,altValda:new Set(),altOrdningId:null,kedja:null,samladKomplettering:false});window.testResult=null;renderTraining()}})}
 else{await p.evaluate(()=>{document.body.classList.remove('password-locked');document.getElementById('passwordGate').hidden=true});assert.equal(await p.evaluate(()=>väljKurs(KURSER.find(k=>k.id==='ma2'),document.querySelector('[data-kurs="ma2"]'))),true)}
 for(const width of [390,1280]){await p.setViewportSize({width,height:1000});for(const [id,good,bad] of cases){let card;
  if(kg){for(const [wanted,answers] of [[true,good],[false,bad]])for(const values of answers){await p.evaluate(id=>prep(id),id);for(let i=0;i<values.length;i++)await p.locator('#ans-'+i).fill(values[i]);await p.evaluate(n=>{for(let i=0;i<n&&!window.testResult;i++)checkAnswer()},values.length);const result=await p.evaluate(()=>window.testResult);assert.ok(Array.isArray(result),`${id} ${values}: ${JSON.stringify(result)}`);assert.equal(result.every(Boolean),wanted,`${id} ${values}: ${result}`);attempts++;}
   await p.evaluate(id=>{prep(id);visaLedtrad();showSolution()},id);card=p.locator('.task');
  }else{assert.ok(await p.evaluate(id=>{state.spår='2c';byggTräd();const q=variantBank().find(q=>q.id===id);if(!q)return false;state.omr=new Set([q.kap+':'+q.omr]);const pos=urval().findIndex(q=>q.id===id);rita(Math.floor(pos/UPPGIFTER_PER_SIDA));return pos>=0},id));card=p.locator(`article.kort[data-id="${id}"]`);await card.scrollIntoViewIfNeeded();await card.locator('.facitknapp').click()}
  await card.locator('img').evaluateAll(es=>Promise.all(es.map(e=>e.decode().catch(()=>{throw new Error('Bild saknas: '+e.src)}))));assert.equal(await card.locator('.katex-error').count(),0,id);
  assert.deepEqual(await card.locator('.facit-matte .katex-display').evaluateAll(es=>es.filter(e=>e.scrollWidth>e.clientWidth+4).map(e=>e.textContent)),[],`${id}: lång formel @${width}`);
  if(width===390)await card.screenshot({path:`/tmp/medel-${kg?'kg':'ul'}-${id}.png`});
 }}
 let olderImageChecks=0;
 if(!kg)for(const id of ['4.07','4.261','4.285','4.124','4.51']){
  await p.evaluate(id=>{const q=variantBank().find(q=>q.id===id);state.omr=new Set([q.kap+':'+q.omr]);rita(Math.floor(urval().findIndex(q=>q.id===id)/UPPGIFTER_PER_SIDA))},id);
  const card=p.locator(`article.kort[data-id="${id}"]`);await card.locator('.facitknapp').click();
  const images=card.locator('img');assert.ok(await images.count()>0,id);
  await images.evaluateAll(es=>Promise.all(es.map(e=>e.decode())));olderImageChecks++;
 }
 assert.deepEqual(errors,[]);console.log(JSON.stringify({app:kg?'KG':'UL',views:10,olderImageChecks,attempts,errors}));
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
