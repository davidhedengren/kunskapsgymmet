/* Lokal testmiljö; ingen elevdata, XP eller rapportstatus skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const out='/tmp/review2114';fs.mkdirSync(out,{recursive:true});
const context={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../uppgifter.js','utf8'),context);const bank=context.window.BANK;
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
 await page.evaluate(bank=>{window.reviewBank=bank;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.prepareReview=(id,part)=>{const q=expandGameTask(reviewBank.find(p=>p.id===id))[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},bank);
 await page.evaluate(()=>selectCourse('fy1'));
 const cases=[
  {id:'5.386',part:0,good:['9','9,00 Ns','8.99568 Ns','9 N·s'],bad:['8.76','-9','0.23568','450']},
  {id:'5.386',part:1,good:['450','450 N','0.45 kN'],bad:['438','9','449']},
  {id:'8.150',part:0,good:['5','5 V','5000 mV'],bad:['12','7','-5']},
  {id:'8.150',part:1,good:['7','7 V','7000 mV'],bad:['0','12','-7']},
  {id:'8.150',part:2},
  {id:'8.150',part:3,good:[['0','-5','-12'],['0 V','-5 V','-12 V'],['0','-5000 mV','-12 V']],bad:[['-12','-5','0'],['12','7','0'],['0','5','12'],['0','-5','0']]}
 ];let checks=0,views=0;const issues=[];
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
  for(const item of cases){
   const q=await page.evaluate(([id,part])=>prepareReview(id,part),[item.id,item.part]);
   assert.equal(q.miniräknare,true);assert.equal(q.geogebra,false);
   if(item.id==='5.386')assert.equal(q.traningsniva,item.part===0?5:2);
   if(item.id==='8.150'){assert.equal((q.t.match(/<svg/g)||[]).length,1);assert.match(q.t,/C är ansluten till batteriets minuspol/);}
   if(item.part===3){assert.deepEqual(q.svarEtiketter,['A','B','C']);assert.equal(q.svarsstruktur,'ordnad');}
   if(q.svarstyp==='alternativ')for(const a of q.alternativ){
    const result=await page.evaluate(([id,part,txt])=>{const q=prepareReview(id,part);state.altOrdningId=null;renderTraining();vaxlaAlt(altLista(q).findIndex(a=>a.txt===txt));kollaAlt();return window.result;},[item.id,item.part,a.txt]);assert.equal(result.every(Boolean),a.ratt,item.id+' '+a.txt);checks++;
   }else for(const[list,want]of [[item.good,true],[item.bad,false]])for(const input of list){
    const values=Array.isArray(input)?input:[input];
    const result=await page.evaluate(([id,part,values])=>{prepareReview(id,part);values.forEach((v,i)=>{document.getElementById('ans-'+i).value=v;checkAnswer();});return window.result||state.partResults;},[item.id,item.part,values]);
    assert.equal(result.length,values.length,item.id+' '+JSON.stringify(input));assert.equal(result.every(Boolean),want,item.id+' '+JSON.stringify(input)+' '+result);checks++;
   }
   await page.evaluate(([id,part])=>{prepareReview(id,part);showSolution();scrollTo(0,0);},[item.id,item.part]);
   const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,mathOverflow:[...document.querySelectorAll('.katex-display')].filter(el=>el.scrollWidth>el.clientWidth+1).map(el=>el.textContent)}));
   if(status.latex||status.wide||status.mathOverflow.length)issues.push({id:item.id,part:item.part,width,...status});views++;
   await page.locator('.task').screenshot({path:`${out}/${item.id}-${item.part}-${width}.png`});
  }
 }
 const gallery=await browser.newPage({viewport:{width:1100,height:900}});let html='<html><head><style>svg{max-width:100%;height:auto}</style></head><body style="margin:24px;font-family:sans-serif;display:grid;grid-template-columns:1fr 1fr;gap:24px">';
 const figures=[];for(const id of ['5.386','8.150','8.49','8.117','8.144','8.148','8.149']){
  const q=bank.find(q=>q.id===id);for(const [kind,text]of [['fråga',q.t],['facit',id==='5.386'?q.spelDelar[0].s:'']])for(const m of text.matchAll(/<svg[\s\S]*?<\/svg>/g)){
   html+='<section><h2>'+id+' '+kind+'</h2>'+m[0]+'</section>';figures.push({bank:'uppgifter.js',taskId:id,svg:m[0],paths:[kind]});
  }
 }
 await gallery.setContent(html+'</body></html>');await gallery.screenshot({path:out+'/figurer.png',fullPage:true});
 const clipping=await gallery.evaluate(()=>[...document.querySelectorAll('svg')].flatMap(s=>[...s.querySelectorAll('text')].filter(t=>{const b=t.getBBox(),v=s.viewBox.baseVal;return b.x<v.x-.5||b.y<v.y-.5||b.x+b.width>v.x+v.width+.5||b.y+b.height>v.y+v.height+.5;}).map(t=>t.textContent)));
 assert.deepEqual(errors,[]);assert.deepEqual(issues,[]);assert.deepEqual(clipping,[]);
 const result={checks,views,widths:[390,1280],issues,errors,clippedLabels:clipping};fs.writeFileSync(out+'/browser.json',JSON.stringify(result,null,2));fs.writeFileSync(out+'/figures.json',JSON.stringify(figures));console.log(JSON.stringify(result));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
