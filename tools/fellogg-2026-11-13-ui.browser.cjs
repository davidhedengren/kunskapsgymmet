'use strict';
const{chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage({viewport:{width:390,height:1000},reducedMotion:'reduce'}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('https://*.supabase.co/**',r=>r.abort());await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8817');await p.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');await p.evaluate(()=>selectCourse('fy1'));
 const report=await p.evaluate(()=>{
  session=null;arAdmin=true;cheer=()=>{};
  const ids=['4.933','4.938','4.939','4.940','4.947','4.948'];const checked=[];
  for(const id of ids){
   const parent=state.data.bank.find(t=>t.id===id),parts=expandGameTask(parent);state.adminBlad={};
   const before=JSON.stringify(state.kedja);const html=adminBladDelarHtml(parts[1]);const d=document.createElement('div');d.innerHTML=html;
   if(d.querySelectorAll('svg').length!==1)throw Error(id+' ska ha en gemensam figur');
   if(d.querySelectorAll('.kedja-fraga').length!==parts.length)throw Error('Delar saknas '+id);
   if(!d.querySelector('.kedja-nu .kedja-rubrik').textContent.startsWith('b)'))throw Error('Fel aktuell del');
   if(before!==JSON.stringify(state.kedja))throw Error('Bläddring ändrade elevkedjan');
   checked.push({id,parts:parts.length,figures:1});
  }
  // Sätt upp en riktig pågående kedja och gå sedan till adminvyn.
  state.adminBlad=null;state.focusNiva=['2'];state.focusArea='kraftvektorer';state.focusOmr=null;state.focusFamily=null;
  let t=expandGameTask(state.data.bank.find(t=>t.id==='4.948'))[1];t=kedjaStarta(t);
  Object.assign(state,{view:'training',currentTask:t,answered:false,partResults:[],partIndex:0,altValda:new Set(),sessionDone:2,sessionXp:0,sessionTarget:8,passReview:false,passHistory:[]});renderTraining();
  return checked;
 });
 // Verklig adminnavigering: visa alla delarna, besvara b och gå tillbaka till passet.
 const original=await p.evaluate(()=>({id:state.currentTask.id,kedja:JSON.stringify(state.kedja),done:state.sessionDone,tbody:document.querySelector('.task .tbody').innerHTML}));
 await p.evaluate(()=>adminBladGaTill('4.948b'));
 assert.equal(await p.locator('.task .tbody svg').count(),1);assert.equal(await p.locator('.task .tbody .kedja-del').count(),4);
 assert.match(await p.locator('.task .tbody .kedja-nu').innerText(),/^b\)/);assert.match(await p.locator('.task .tbody').innerText(),/Du svarar på del b\)/);
 for(const width of[390,1280]){await p.setViewportSize({width,height:1000});await p.evaluate(()=>document.fonts.ready);await p.locator('.task').screenshot({path:'/tmp/review1113-admin-'+width+'.png'});}
 await p.locator('#ans-0').fill('0 N');await p.evaluate(()=>{for(let i=0;i<3&&!state.answered&&!state.samladKomplettering;i++)checkAnswer()});await p.getByRole('button',{name:'Ja, den stämmer',exact:true}).click();assert.equal(await p.evaluate(()=>state.answered),true);assert.equal(await p.evaluate(()=>state.sessionDone),original.done);
 await p.evaluate(()=>adminBladAvsluta());assert.deepEqual(await p.evaluate(()=>({id:state.currentTask.id,kedja:JSON.stringify(state.kedja),done:state.sessionDone,tbody:document.querySelector('.task .tbody').innerHTML})),original);
 // Även när samma del som i det sparade passet besvaras får dess kedja inte ändras.
 await p.evaluate(()=>adminBladGaTill('4.948a'));await p.locator('#ans-0').fill('70 N');await p.evaluate(()=>checkAnswer());await p.getByRole('button',{name:'Ja, den stämmer',exact:true}).click();assert.equal(await p.evaluate(()=>state.answered),true);await p.evaluate(()=>adminBladAvsluta());
 assert.deepEqual(await p.evaluate(()=>({id:state.currentTask.id,kedja:JSON.stringify(state.kedja),done:state.sessionDone,tbody:document.querySelector('.task .tbody').innerHTML})),original);
 // Klasstopplistan visar verkligt tak från RPC-svaret, även före SQL-migreringen.
 const foot=await p.evaluate(()=>{const base={rader:[{id:1,namn:'Klass A',poang:120002,elever:2,aktiva:2}],summa:true};return{
  uncapped:klassListaHTML({...base,tak:null},'alla'),old:klassListaHTML({...base,tak:30000},'alla'),day:klassListaHTML({...base,tak:400},'dag')};});
 assert.match(foot.uncapped,/utan tak per elev/);assert.doesNotMatch(foot.uncapped,/högst 0|30000/);assert.match(foot.old,/högst 30000 XP/);assert.match(foot.day,/högst 400 XP/);
 assert.deepEqual(errors,[]);console.log(JSON.stringify({groups:report,adminAnswer:true,restoredPass:true,leaderboardTexts:3,errors},null,2));
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
