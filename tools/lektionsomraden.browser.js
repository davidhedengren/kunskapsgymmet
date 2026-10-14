'use strict';
// Isolerad gästprofil. Inga svar skickas till databasen.
const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const ctx=await browser.newContext({viewport:{width:1280,height:1000},timezoneId:'Europe/Stockholm'});
 const deps=process.env.KG_TEST_DEPS;
 if(deps)await ctx.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
  const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
  return r.fulfill({path:deps+'/'+m[1]+'/package/'+m[2]});
 });
 await ctx.route('https://*.supabase.co/**',r=>r.abort());
 await ctx.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await ctx.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(process.env.KG_TEST_URL||'http://127.0.0.1:8011');
 await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function'&&typeof renderMathInElement==='function');
 await page.evaluate(async()=>{session=null;syncOwner=null;arLarare=false;arGruppLarare=false;await selectCourse('ma2');});
 const tracks=[];
 for(const track of ['2a','2b','2c']){
  tracks.push(await page.evaluate(track=>{
   setTrack(track);const check=(v,m)=>{if(!v)throw Error(m);};
   const cards=getCards(),areas=getAreas();
   check(JSON.stringify(cards.flatMap(k=>k.omr).sort())===JSON.stringify(areas.map(a=>a.key).sort()),'Tappat eller dubblerat område');
   const cp=ensureCourseProfile();cp.areas={substitutionsmetoden:.82,additionsmetoden:.34,konjugatregeln:.7,kvadreringsreglerna:.3};
   cp.families={'Lösa med substitutionsmetoden':.66};
   cp.history=[{id:'fixture',area:'substitutionsmetoden',family:'Lösa med substitutionsmetoden',ok:true,at:Date.now()}];
   const snapshot=()=>JSON.stringify({areas:cp.areas,families:cp.families,history:cp.history,xp:profile.xp});
   const before=snapshot();const details=[];
   for(const k of cards){
    const pool=cardTaskPool(k);check(pool.length>0,'Tomt kort '+k.name);
    const lessons=kunskapSteg(k.kap,k.key);
    check(lessons.every(l=>genomgangPassarKort(l.genomgang,k)),'Fel genomgång '+k.name);
    startCard(k.key);check(state.currentTask&&k.omr.includes(state.currentTask.omr),'Fel träningsurval '+k.name);
    check(state.focusOmr.every(o=>k.omr.includes(o)),'För brett pass '+k.name);
    details.push({key:k.key,name:k.name,kap:k.kap,omr:k.omr,count:pool.length,families:cardFamilies(k),lessons:lessons.map(l=>l.genomgang.rubrik)});
   }
   check(before===snapshot(),'Sparat resultat förändrat');
   check(cardStatus(cards.find(k=>k.key==='substitutionsmetoden')).m===.82,'Fel substitutionsresultat');
   check(cardStatus(cards.find(k=>k.key==='additionsmetoden')).m===.34,'Fel additionsresultat');
   check(cardStatus(cards.find(k=>k.key==='g:konjugat_kvadrering')).m===.5,'Fel samlat regelresultat');
   for(const gs of Object.values(state.data.grupp))for(const g of gs.filter(g=>g.historisk)){
    const old=hittaTraningskort('g:'+g.id);if(!old)continue;
    check(!cards.some(k=>k.key===old.key),'Historiskt kort synligt');
    startCard(old.key);check(old.omr.includes(state.currentTask.omr),'Äldre pass tappat urval');
   }
   startCardFamily('g:ekvationssystem','Lösa med substitutionsmetoden');
   check([].concat(state.currentTask.familj).includes('Lösa med substitutionsmetoden'),'Äldre punktpass');
   startCardLevel('g:ekvationssystem','2');check(levelOf(state.currentTask)==='2','Äldre nivåpass');
   return {track,cards:details};
  },track));
 }
 // Både dagens och arkiverade uppdrag ska räkna rätt delområden och ge XP en gång.
 const quests=await page.evaluate(()=>{
  const check=(v,m)=>{if(!v)throw Error(m);};
  const today=uppdragNyckel(),yesterday=uppdragVeckodagar().at(-2);
  const row=()=>({typ:'omrade',kort:'g:ekvationssystem',mal:2,n:0,klar:false,huvud:true});
  profile.uppdrag={nyckel:today,kurser:{ma2:{lista:[row()],klar:false}}};
  profile.uppdragsVecka={[yesterday]:{nyckel:yesterday,kurser:{ma2:{lista:[row()],klar:false}}}};
  state.uppdragsDag={datum:yesterday,kurs:'ma2',agare:ggAgare()};state.noXp=false;state.sessionXp=0;
  const current=profile.uppdrag.kurser.ma2,old=profile.uppdragsVecka[yesterday].kurser.ma2;
  const xp=profile.xp;
  uppdragSvar({omr:'faktorisering'},true,false);check(current.lista[0].n===0&&old.lista[0].n===0,'Orelaterad uppgift räknades');
  uppdragSvar({omr:'substitutionsmetoden'},false,false);check(current.lista[0].n===0,'Felaktigt svar räknades');
  uppdragSvar({omr:'substitutionsmetoden'},true,false);check(current.lista[0].n===1&&old.lista[0].n===1,'Första framsteg saknas');
  uppdragSvar({omr:'additionsmetoden'},true,false);check(current.klar&&old.klar,'Kan inte slutföra äldre grupp');
  check(profile.xp-xp===300,'Fel XP för huvuduppdrag + bonus, idag och igår');
  uppdragSvar({omr:'additionsmetoden'},true,false);check(profile.xp-xp===300,'Dubbel XP');
  return {today:true,archived:true,xpOnce:true};
 });
 await page.evaluate(()=>{cheerQueue.length=0;dismissCheer();});
 for(const width of [390,1280]){
  await page.setViewportSize({width,height:1000});
  await page.evaluate(()=>{state.openChapters=new Set(['1','2','3','4']);renderDashboard();});
  await page.waitForTimeout(350);
  for(const name of ['Substitutionsmetoden','Additionsmetoden','Konjugatregeln och kvadreringsreglerna','Standardavvikelse']){
   const button=page.locator('.omr-oppna').filter({hasText:name});assert.equal(await button.count(),1);assert.ok(await button.isVisible());
  }
  await page.screenshot({path:'/tmp/lektionstruktur/ma2-'+width+'.png'});
 }
 assert.deepEqual(errors,[]);
 fs.writeFileSync('/tmp/lektionstruktur/ma2-browser.json',JSON.stringify({tracks,quests},null,2));
 console.log(JSON.stringify({tracks:tracks.map(t=>({track:t.track,cards:t.cards.length,pool:t.cards.reduce((s,k)=>s+k.count,0)})),quests,errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
