'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
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
  await p.evaluate(async()=>{await selectCourse('fy1');session=null;syncOwner=null;arLarare=false;cheer=()=>{};});
  for(const width of [390,1280]){
   await p.setViewportSize({width,height:900});
   await p.evaluate(()=>{beginSession();state.sessionTarget=30;const q=state.data.bank.find(x=>x.id==='3.197');visaUppgift(kedjaStarta(expandGameTask(q)[0]));});
   let shown=await p.locator('.task .tbody').innerText();assert.match(shown,/27,0/);assert.match(shown,/5,0 s/);
   await p.locator('#ans-0').fill('0');await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.answered),true);
   await p.evaluate(()=>kedjaFortsatt());
   shown=await p.locator('.task .tbody').innerText();assert.match(shown,/29,0/);assert.match(shown,/27,0/);assert.match(shown,/5,0 s/);
   await p.locator('#ans-0').fill('0,4');await p.evaluate(()=>checkAnswer());assert.equal(await p.evaluate(()=>state.answered),true);
   await p.evaluate(()=>kedjaFortsatt());
   shown=await p.locator('.task .tbody').innerText();assert.match(shown,/23,0/);assert.match(shown,/27,0/);assert.match(shown,/5,0 s/);
   await p.locator('.task').screenshot({path:`/tmp/delfacitkedja-3197-${width}.png`});
  }
  const ids=['5.66','5.117','7.139','7.166','7.167','7.176','7.177','3.197','3.218','5.489','5.513','5.515','6.469','6.470','5.405'];
  const failures=await p.evaluate(ids=>{
   const text=html=>{const d=document.createElement('div');d.innerHTML=html||'';return (d.textContent||'').replace(/\s+/g,'')};
   const fails=[];
   for(const id of ids){const parent=state.data.bank.find(q=>q.id===id),parts=expandGameTask(parent),display=kedjaDelning(parts,parent);
    parts.forEach((part,i)=>{const original=text(part.t),shown=text(display.intro+display.delar[i]);
     if(original!==shown)fails.push({id,part:part.id,original:original.slice(0,220),shown:shown.slice(0,220)});
    });
   }
   return fails;
  },ids);
  assert.deepEqual(failures,[]);
  const safety=await p.evaluate(()=>{
   const parent={id:'safety',spelDelning:'deluppgifter',t:'hela frågan',s:'SVAR PÅ ALLA DELAR',spelDelar:[{etikett:'a',fraga:'Fråga a',s:'Svar a'},{etikett:'b',fraga:'Fråga b'}],spelIntro:'Givet'};
   const parts=expandGameTask(parent),hidden=expandGameTask({...parent,spelDelar:parent.spelDelar.map(d=>({...d,spel:false}))});
   return {solution:parts[1].s,parentSolution:delfacitText(parent,1),hidden:hidden.length};
  });
  assert.equal(safety.solution,'');assert.doesNotMatch(safety.parentSolution,/SVAR PÅ ALLA/);assert.equal(safety.hidden,0);
  const renamed=await p.evaluate(()=>{
   beginSession();const parent=state.data.bank.find(q=>q.id==='8.58');visaUppgift(kedjaStarta(expandGameTask(parent)[0]));
   const first={id:state.currentTask.id,label:document.querySelector('.kedja-nu .kedja-rubrik').textContent.trim()};
   kedjaSpara(state.currentTask,true);kedjaFortsatt();
   return {first,second:{id:state.currentTask.id,label:document.querySelector('.kedja-nu .kedja-rubrik').textContent.trim()},previous:document.querySelector('.kedja-klar .kedja-rubrik').textContent.trim()};
  });
  assert.equal(renamed.first.id,'8.58c');assert.match(renamed.first.label,/^a\)/);
  assert.equal(renamed.second.id,'8.58d');assert.match(renamed.second.label,/^b\)/);assert.equal(renamed.previous,'a)');
  await p.evaluate(async()=>{await selectCourse('mato2');beginSession();state.sessionTarget=30;});
  await p.evaluate(()=>{const q=state.data.bank.find(x=>x.id==='2.42');visaUppgift(kedjaStarta(expandGameTask(q)[0]));showSolution();});
  const visat=await p.locator('#solution-holder').innerText();
  assert.match(visat,/växande/i);assert.doesNotMatch(visat,/maximipunkt|minimipunkt/i);
  for(const [id,avoid] of [['2.117','b=2'],['2.229','b=-2'],['2.42','maximipunkt'],['2.77','maximipunkt'],['2.158','sqrt'],['2.253','maximipunkt'],['3.113','243'],['4.04','75'],['4.327','6√3']]){
   const r=await p.evaluate(id=>{const q=state.data.bank.find(x=>x.id===id),parts=expandGameTask(q);return {first:parts[0].s,later:parts.at(-1).s}},id);
   assert.ok(r.first);assert.ok(r.later);assert.ok(!r.first.includes(avoid),id+' '+avoid);
  }
  assert.deepEqual(errors,[]);console.log('Kedjor och delfacit: mobil/dator, 15 familjer, saknade delfacit och dolda delar kontrollerade.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
