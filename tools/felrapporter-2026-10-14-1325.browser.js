'use strict';
// Verifiera appens verkliga svarsfält; inga profil- eller databasskrivningar.
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const keys={fy1:'BANK',ma1:'BANKMA1',ma2:'BANKMA2',mato1:'BANKMATO1',mato2:'BANKMATO2',matf1:'BANKMATF1'};
const cases={
 fy1:[['4.364',0,['8,9*10^23 kg'],[true]],['4.364',0,['8,9*10^22 kg'],[false]]],
 ma1:[['0.266',0,['3'],[true]],['0.266',0,['108'],[false]],['0.282',0,['12'],[true]],['0.265',0,['12'],[true]],
  ['1.09',0,['10X+3'],[true]],['1.09',0,['3+10X'],[true]],['1.09',0,['7X+5+3X-2'],[false]],['1.09',0,['10X+4'],[false]],['1.09',1,['5A-5'],[true]],['1.09',2,['Y+11'],[true]],
  ['1.02',0,['5X+4'],[true]],['1.03',0,['6X','2X+3'],[true,true]],['1.08',0,['3N+3'],[true]],['1.11',0,['4X+26'],[true]]],
 ma2:[['3.341',0,['5','7'],[true,true]],['3.341',0,['7','5'],[false,false]],['3.134',0,['7','-3'],[true,true]],['3.201',0,['-3','11'],[true,true]],['3.201',0,['11','-3'],[false,false]],['3.201',1,['2sqrt(61)'],[true]]],
 mato2:[['1.611',0,['2','720°','1'],[true,true,true]],['1.611',0,['-2','360°','0'],[false,false,false]]],
 matf1:[['1.680',0,['25/81'],[true]],['1.680',0,['0,309'],[true]],['1.680',0,['0,31'],[true]],['1.680',0,['30,9%'],[true]],['1.680',0,['31%'],[true]],['1.680',0,['0,308'],[false]],['1.680',0,['25/90'],[false]]],
 mato1:[['2.250',0,['3sqrt(x)/2+7/x^2-1/(2x*sqrt(x))'],[true]],['2.250',0,['1.5*sqrt(x)+7/x^2-0.5/(x*sqrt(x))'],[true]],['2.250',0,['(3x^3+14sqrt(x)-x)/(2x^2*sqrt(x))'],[true]],['2.250',0,[String.raw`\frac{3\sqrt{x}}{2}+\frac{7}{x^2}-\frac{1}{2\sqrt{x^3}}`],[true]],['2.250',0,['3sqrt(x)/2-7/x^2-1/(2x*sqrt(x))'],[false]]]
};
const derivatives={
 '2.82':['12x^3-10x','10x^4+3x^2-4'], '2.87':['2x^3-6x+8','21x^2-4x+1'],
 '2.92':['30x^5-12x^2','5x^4-10'],'2.97':['8x^3+9x^2-12x+1','18x-4'],
 '2.102':['28x^6-4x^3+3','30x^4+4x'],'2.107':['9x^2/2-x/2','-12x^5+20x^3-14x'],
 '2.112':['24x^7+3x^2','1/(2sqrt(x))'],'2.117':['3sqrt(x)/2','5x^(3/2)/2-1/sqrt(x)'],
 '2.122':['3-2/x^3','-4x-12/x^4'],'2.127':['5/(2sqrt(x))-1/x^2','3sqrt(x)+6/x^3'],
 '2.301':['6x-4','4x^3+5','-2/x^2'],'2.302':['18x^2-2x','3/(2sqrt(x))','2-2/x^3'],
 '2.303':['2x^3','1-5/x^2','3sqrt(x)/2'],'2.304':['40x^4-2','2/sqrt(x)','2x-9/x^4']
};
for(const[id,answers]of Object.entries(derivatives))answers.forEach((a,i)=>cases.mato1.push([id,i,[a],[true]]));
const analogues={
 fy1:[['4.9',0,['10,7 m/s²']],['4.9',1,['747 N']],['4.363',0,['0,21 m/s²']],['4.367',0,['4000 km']],['4.372',0,['3400 kg/m³']],['4.375',0,['0,31 m/s²']]],
 ma1:[['0.166',0,['D']],['0.169',0,['4']],['0.278',0,['D']],['0.284',0,['19']],['1.17',0,['7X-28']]],
 ma2:[['3.19',0,['7','8']],['3.50',0,['8','-6']],['3.75',0,['-2','-2']],['3.84',0,['10','-3']],['3.184',0,['-1','3']],['3.318',0,['1','5']],['3.343',0,['7','5']]],
 mato2:[['1.01',0,['5']],['1.17',1,['2pi/3']],['1.72',1,['pi']],['1.93',0,['4']],['1.59',1,['y=2']],['1.610',0,['5','120°','2']]],
 matf1:[['1.128',0,['5/14']],['1.197',0,['2/9']],['1.435',0,['19/33']],['1.681',0,['125/2197']],['1.681',1,['1685/2197']],['1.682',0,['1/143']],['1.682',1,['41/715']]],
 mato1:[['2.10',0,['15x^2-1/sqrt(x)']],['2.111',0,['33/4']],['2.212',0,['3sqrt(x)/2-6/x^2']],['2.393',0,['5/(2sqrt(x))']]]
};
for(const[c,rows]of Object.entries(analogues))for(const[id,i,a]of rows)cases[c].push([id,i,a,a.map(()=>true)]);
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({timezoneId:'Europe/Stockholm',viewport:{width:1280,height:1000}}),deps=process.env.KG_TEST_DEPS;
 if(deps)await context.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
  const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
  return r.fulfill({path:deps+'/'+m[1]+'/package/'+m[2]});
 });
 await context.route('https://*.supabase.co/**',r=>r.abort());await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await context.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 const page=await context.newPage(),errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.KG_TEST_URL||'http://127.0.0.1:8001');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(()=>{
  session=null;syncOwner=null;arLarare=false;arGruppLarare=false;
  finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
  window.reviewTask=(q,index=0)=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=index;state.altValda=new Set();window.reviewOutcome=null;renderTraining();};
 });
 for(const[course,rows]of Object.entries(cases)){
  await page.evaluate(c=>selectCourse(c),course);
  for(const source of ['delkort','heluppgift'])for(const[id,part,inputs,want]of rows){
   const result=await page.evaluate(({key,id,part,inputs,source})=>{
    const parent=window[key].find(q=>q.id===id),cards=expandGameTask(parent),split=source==='delkort'&&cards.length>1,q=split?cards[part]:parent;
    const offset=split?0:nastlat(q.rättSvar)?svarsPlan(q).rutor.findIndex(r=>r.del===part):part;
    reviewTask(q,offset);inputs.forEach((a,j)=>document.getElementById('ans-'+(offset+j)).value=a);
    checkAnswer();while(!state.answered&&state.partIndex>offset&&state.partIndex<offset+inputs.length)checkAnswer();
    return (window.reviewOutcome||state.partResults).slice(offset,offset+inputs.length);
   },{key:keys[course],id,part,inputs,source});
   assert.deepEqual(result,want,JSON.stringify({course,id,part,inputs,source}));checks.push({course,id,part,inputs,source,result});
  }
  for(const id of new Set(rows.map(r=>r[0])))for(const width of [390,1280]){
   await page.setViewportSize({width,height:1000});
   const view=await page.evaluate(({key,id})=>{
    const q=window[key].find(q=>q.id===id);
    return expandGameTask(q).map(card=>{
     reviewTask(card);showSolution();
     const text=document.querySelector('.tbody').cloneNode(true);text.querySelectorAll('.katex').forEach(e=>e.remove());
     return{id:card.id,katexErrors:document.querySelectorAll('.task .katex-error').length,
      raw:text.textContent,fields:document.querySelectorAll('[id^="ans-"]').length,expected:answerLayout(card).n};
    });
   },{key:keys[course],id});
   for(const card of view){assert.equal(card.katexErrors,0,card.id);assert.equal(card.fields,card.expected,card.id);assert.ok(!card.raw.includes('\\'),JSON.stringify(card));}
  }
 }
 assert.deepEqual(errors,[]);
 fs.writeFileSync(process.env.KG_TEST_OUTPUT||path.join(os.tmpdir(),'felrapporter-2026-10-14-1325-browser.json'),JSON.stringify(checks,null,2));
 console.log(JSON.stringify({checks:checks.length,pageErrors:errors.length,views:'mobile and desktop, all tested cards',realAnswerFields:true}));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1;});
