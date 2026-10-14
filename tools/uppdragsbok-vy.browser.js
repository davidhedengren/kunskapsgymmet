'use strict';
/* Riktig bokvy och samma historik-/XP-kontroller som den tidigare rullvyn.
   Alla profiler och RPC-anrop är lokala testdata. Kör mot en lokal server. */
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const url=process.env.KG_TEST_URL||'http://127.0.0.1:8001';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},timezoneId:'Europe/Stockholm'});
 const deps=process.env.KG_TEST_DEPS;
 if(deps)await context.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
   const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
   return r.fulfill({path:deps+'/'+m[1]+'/package/'+m[2]});
 });
 await context.route('https://*.supabase.co/**',r=>r.abort());
 await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await context.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(url);await page.waitForFunction(()=>typeof uppdragBokDatum==='function'&&typeof nerdamer==='function'&&typeof renderMathInElement==='function');
 await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;arGruppLarare=false;await selectCourse('fy1');});
 assert.equal(await page.locator('.ub-omslag-progress').innerText(),'0/4');
 // Räknaren följer verkligt slutförda mål och vald kurs i båda tränarvyerna.
 await page.evaluate(()=>{window.savedQuests=JSON.stringify(profile.uppdrag);const u=profile.uppdrag.kurser.fy1;u.lista.forEach((x,i)=>{x.typ='alla';x.mal=i+1;x.n=0;x.klar=false;});state.noXp=false;uppdragSvar(state.data.bank[0],true,false);renderDashboard();});
 assert.equal(await page.locator('.ub-omslag-progress').innerText(),'1/4');
 await page.evaluate(()=>{window.savedSession={task:state.currentTask,target:state.sessionTarget,done:state.sessionDone};state.currentTask=state.data.bank[0];state.sessionTarget=8;state.sessionDone=1;state.ptOppen=false;renderDashboard();});
 assert.equal(await page.locator('.pt-liten .ub-omslag-progress').innerText(),'1/4');
 await page.evaluate(()=>{profile.uppdrag=JSON.parse(savedQuests);state.currentTask=savedSession.task;state.sessionTarget=savedSession.target;state.sessionDone=savedSession.done;state.ptOppen=true;renderDashboard();});
 const open=async()=>{await page.locator('.ub-omslag,.pt-upp-oppna').first().click();await page.locator('#uppdragsbok[open]').waitFor();};
 await page.emulateMedia({reducedMotion:'reduce'});
 // Tangentbord öppnar omslaget. Bakgrunden är inert och fokus återgår vid stängning.
 await page.locator('.ub-omslag').focus();await page.keyboard.press('Enter');await page.locator('#uppdragsbok[open]').waitFor();
 assert.equal(await page.evaluate(()=>document.activeElement.className),'ub-stang');
 await page.keyboard.press('Shift+Tab');assert.ok(await page.evaluate(()=>document.activeElement.closest('#uppdragsbok')!==null));
 await page.keyboard.press('Escape');assert.equal(await page.locator('#uppdragsbok').count(),0);
 assert.equal(await page.evaluate(()=>document.activeElement.className),'ub-omslag');
 // Samma 12 öppna/stängda tillstånd som tidigare: två teman, tre bredder.
 let states=0;
 for(const theme of ['dark','light'])for(const width of [1440,390,320]){
  await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);await page.setViewportSize({width,height:844});
  // Låt kurskortets befintliga responsiva animation bli klar innan dess
  // höjd jämförs med samma kort bakom den öppnade dialogen.
  await page.waitForTimeout(350);
  const height=await page.locator('.pt').evaluate(e=>e.getBoundingClientRect().height);
  // Den befintliga sidans bredd ska inte öka när boken öppnas. Själva
  // dialogen och papperssidorna måste rymmas helt även vid 320 pixlar.
  const baselineWidth=await page.evaluate(()=>Math.max(innerWidth,document.documentElement.scrollWidth));
  assert.ok(await page.locator('.ub-omslag img').evaluate(e=>e.complete&&e.naturalWidth===480));states++;
  await open();
  assert.ok(Math.abs(await page.locator('.pt').evaluate(e=>e.getBoundingClientRect().height)-height)<1);
  assert.ok(await page.evaluate(limit=>document.documentElement.scrollWidth<=limit+1,baselineWidth));
  assert.ok(await page.locator('#uppdragsbok').evaluate(e=>{const b=e.getBoundingClientRect();return b.left>=0&&b.right<=innerWidth&&b.top>=0&&b.bottom<=innerHeight;}));
  assert.ok(await page.locator('.ub-spread').evaluate(e=>e.scrollWidth<=e.clientWidth+1));
  if(width<641){
    assert.ok(await page.locator('.ub-spread').evaluate(e=>e.scrollHeight>e.clientHeight));
    await page.locator('.ub-spread').evaluate(e=>{e.scrollTop=e.scrollHeight;});
    assert.ok(await page.locator('.ub-spread').evaluate(e=>e.scrollTop>0));
  }
  assert.equal(await page.locator('.ub-flip,.ub-opening-cover').count(),0);
  if(width!==320)await page.screenshot({path:`/tmp/quest-book-${theme}-${width}.png`});
  states++;await page.getByRole('button',{name:'Stäng uppdragsboken',exact:true}).click();
 }
 // Rädda gårdagen, läs tomma dagar och kontrollera att bläddring är helt utan XP.
 await page.evaluate(()=>{
  window.questYesterday=uppdragVeckodagar().at(-2);window.questToday=uppdragNyckel();
  const row=(typ,main=false)=>({typ,huvud:main,text:'Klara fem uppgifter',mal:5,n:0,klar:false});
  profile.uppdrag={nyckel:questYesterday,kurser:{fy1:{lista:[row('alla',true),row('utanhjalp'),row('serie'),row('dagsmal')],klar:false}}};
  profile.uppdragsVecka={};state.ptOppen=true;renderDashboard();
 });
 await open();const before=await page.evaluate(()=>JSON.stringify({xp:profile.xp,dagar:profile.uppdragDagar,klara:profile.uppdragKlara,arkiv:profile.uppdragsVecka}));
 await page.keyboard.press('ArrowLeft');assert.equal(await page.evaluate(()=>uppdragBokDatum()),await page.evaluate(()=>questYesterday));
 assert.deepEqual(await page.locator('.ub-xp').allTextContents(),['+50 XP','+25 XP','+25 XP','+25 XP']);
 await page.getByRole('button',{name:'Föregående dag',exact:true}).click();assert.match(await page.locator('#uppdragsbok').innerText(),/Inga uppdrag sparade/);
 for(let i=0;i<4;i++)await page.getByRole('button',{name:'Föregående dag',exact:true}).click();
 assert.ok(await page.getByRole('button',{name:'Föregående dag',exact:true}).isDisabled());
 await page.getByRole('button',{name:'Till dagens uppdrag',exact:true}).click();assert.ok(await page.getByRole('button',{name:'Nästa dag',exact:true}).isDisabled());
 assert.equal(await page.evaluate(()=>JSON.stringify({xp:profile.xp,dagar:profile.uppdragDagar,klara:profile.uppdragKlara,arkiv:profile.uppdragsVecka})),before);
 // Riktiga animationer har två papperssidor, inert kopia och städas vid snabba klick.
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});
 await page.getByRole('button',{name:'Stäng uppdragsboken',exact:true}).click();await open();
 assert.equal(await page.locator('.ub-opening-cover').count(),1);
 await page.waitForFunction(()=>document.querySelector('.ub-opening-cover')===null);
 await page.getByRole('button',{name:'Föregående dag',exact:true}).click();
 assert.equal(await page.locator('.ub-flip').count(),1);assert.ok(await page.locator('.ub-flip').evaluate(e=>e.inert));
 await page.waitForTimeout(180);await page.screenshot({path:'/tmp/quest-book-turn.png'});
 await page.keyboard.press('ArrowLeft');assert.equal(await page.locator('.ub-flip').count(),1);
 await page.waitForFunction(()=>document.querySelector('.ub-flip')===null);
 await page.getByRole('button',{name:'Till dagens uppdrag',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.ub-flip')===null);
 await page.emulateMedia({reducedMotion:'reduce'});
 // Gammalt uppdrag startar rätt pass; återupptagning och halva XP fungerar en gång.
 await page.getByRole('button',{name:'Föregående dag',exact:true}).click();await page.locator('.ub-trana').first().click();
 await page.waitForFunction(()=>state.view==='training');assert.equal(await page.locator('#uppdragsbok').count(),0);
 assert.equal(await page.evaluate(()=>state.uppdragsDag.datum),await page.evaluate(()=>questYesterday));
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem(PASS_KEY)).uppdragsDag.datum),await page.evaluate(()=>questYesterday));
 await page.evaluate(()=>{const saved=lasPagaendePass();state.uppdragsDag=null;aterupptaPass(saved);});
 assert.equal(await page.evaluate(()=>state.uppdragsDag.datum),await page.evaluate(()=>questYesterday));
 await page.evaluate(()=>continueSession());assert.equal(await page.evaluate(()=>state.uppdragsDag.datum),await page.evaluate(()=>questYesterday));
 await page.evaluate(()=>{window.beforeRetro=profile.uppdragRetroXp;for(let i=0;i<5;i++)uppdragTidigareSvar(state.currentTask,true,false);});
 assert.equal(await page.evaluate(()=>profile.uppdragRetroXp-beforeRetro),175);
 await page.evaluate(()=>uppdragTidigareSvar(state.currentTask,true,false));assert.equal(await page.evaluate(()=>profile.uppdragRetroXp-beforeRetro),175);
 await page.evaluate(()=>startPass('grund'));assert.equal(await page.evaluate(()=>state.uppdragsDag),null);
 // Serverstödet och kontogränsen finns kvar. Att byta konto stänger föregående bok.
 await page.evaluate(()=>{
  session={access_token:'local-test',user:{id:'fixture-student'}};uppdragBokVal.set(uppdragBokNyckel(),questYesterday);state.ptOppen=true;renderDashboard();
  const u=profile.uppdragsVecka[questYesterday].kurser.fy1;u.lista[0].klar=false;u.lista[0].betald=false;u.lista[0].n=0;u.klar=false;
 });
 await open();assert.ok(await page.locator('.ub-trana').first().isDisabled());
 await page.evaluate(()=>{uppdragSattRetroStod({uppdragsbok:true},session.user.id);uppdragBokRita(0);});
 assert.equal(await page.locator('.ub-trana').first().isDisabled(),false);
 await page.locator('.ub-trana').first().click();await page.waitForFunction(()=>state.view==='training');
 assert.equal(await page.evaluate(()=>state.uppdragsDag.agare),'fixture-student');
 await page.evaluate(()=>{state.ptOppen=true;renderDashboard();});await open();
 await page.evaluate(()=>{session=null;syncOwner=null;afterRender();});assert.equal(await page.locator('#uppdragsbok').count(),0);
 // Ny kurs använder sin egen datumposition och stänger den föregående vyn.
 await open();await page.evaluate(async()=>{await selectCourse('ma2');});assert.equal(await page.locator('#uppdragsbok').count(),0);
 await open();assert.equal(await page.evaluate(()=>uppdragBokDatum()),await page.evaluate(()=>questToday));
 await page.keyboard.press('Escape');await page.evaluate(async()=>{await selectCourse('fy1');saveProfile();});
 // Profilen överlever omladdning; boken väntar på klick och visas med rätt kurs.
 await page.reload();await page.waitForFunction(()=>typeof uppdragBokDatum==='function');await page.evaluate(async()=>{await selectCourse('fy1');state.ptOppen=true;renderDashboard();});
 assert.equal(await page.locator('#uppdragsbok').count(),0);await open();
 assert.ok(await page.evaluate(()=>!!profile.uppdragsVecka[uppdragVeckodagar().at(-2)]));
 await page.getByRole('button',{name:'Föregående dag',exact:true}).click();assert.match(await page.locator('.ub-kurs').innerText(),/Fysik nivå 1/);
 // Pekgest bläddrar, medan vertikal scroll inte byter datum.
 const day=await page.evaluate(()=>uppdragBokDatum());
 await page.locator('.ub-spread').dispatchEvent('pointerdown',{pointerType:'touch',clientX:180,clientY:120});
 await page.locator('.ub-spread').dispatchEvent('pointerup',{pointerType:'touch',clientX:175,clientY:250});assert.equal(await page.evaluate(()=>uppdragBokDatum()),day);
 await page.locator('.ub-spread').dispatchEvent('pointerdown',{pointerType:'touch',clientX:180,clientY:120});
 await page.locator('.ub-spread').dispatchEvent('pointerup',{pointerType:'touch',clientX:260,clientY:125});assert.notEqual(await page.evaluate(()=>uppdragBokDatum()),day);
 assert.deepEqual(errors,[]);console.log(JSON.stringify({states,pageErrors:errors.length,history:true,halfXpOnce:true,keyboard:true,animations:true,accountIsolation:true,reload:true,touch:true}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
