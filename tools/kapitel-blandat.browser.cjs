'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs');
const out='/tmp/kapitel-blandat-2026-10-22';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function');
 await page.evaluate(()=>{session=null;syncOwner=null;arLarare=false;noteNewLevel=()=>{};});
 const reports=[];
 for(const course of process.env.UI_ONLY?[]:['fy1','fy2','ma1','ma2','mato1','mato2','matf1','hist'].filter(c=>!process.env.REVIEW_COURSE||c===process.env.REVIEW_COURSE)){
  const ok=await page.evaluate(c=>selectCourse(c,{render:false}),course);assert.equal(ok,true,course);
  const report=await page.evaluate(()=>{
   const result={course:state.course,tracks:[],issues:[],selected:0};
   const oldNext=nextTask;nextTask=()=>{};
   try{for(const track of COURSES[state.course].tracks.length?COURSES[state.course].tracks:[null]){
    state.track=track;const all=availableTasks(),chapters=[...new Set(getCards().map(k=>String(k.kap)))];result.tracks.push({track,chapters:chapters.length});
    for(const kap of chapters){
     startChapter(kap);const expected=all.filter(t=>String(t.kap)===kap),areas=[...new Set(expected.map(t=>t.omr||'ovrigt'))];
     const seen=new Set(),pickedAreas=new Set();
     for(let i=0;i<Math.min(expected.length,Math.max(8,areas.length));i++){
      const t=chooseTask();if(!t){result.issues.push({kap,track,reason:'empty'});break;}
      if(String(t.kap)!==kap||!expected.some(x=>x.id===t.id))result.issues.push({kap,track,reason:'outside',id:t.id});
      if(seen.has(t.id))result.issues.push({kap,track,reason:'repeat',id:t.id});
      seen.add(t.id);pickedAreas.add(t.omr||'ovrigt');state.passHistory.push({task:t,completed:true});state.sessionDone++;result.selected++;
     }
     if(pickedAreas.size!==areas.length)result.issues.push({kap,track,reason:'missing-area',got:pickedAreas.size,want:areas.length});
    }
   }}finally{nextTask=oldNext;}
   return result;
  });assert.deepEqual(report.issues,[],course);reports.push(report);
 }
 // Verkliga knappar i båda vyerna, mobil/dator, ljus/mörk färg.
 const theme=process.env.REVIEW_THEME||'dark';await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});await page.evaluate(()=>selectCourse('ma2'));
  for(const picker of [false,true]){
   await page.evaluate(picker=>{state.openChapters=new Set(getCards().map(k=>String(k.kap)));if(picker)showAreaPicker();else renderDashboard();},picker);
   const expected=await page.evaluate(()=>new Set(getCards().map(k=>String(k.kap))).size);
   assert.equal(await page.locator('.chapter-mix').count(),expected);
   assert.equal(await page.locator('.chapter-body .area-grid').evaluateAll(grids=>grids.every(g=>g.lastElementChild?.classList.contains('chapter-mix'))),true);
   const button=page.locator('.chapter-mix').first(),kap=await button.getAttribute('data-mix-chapter');
   await button.scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/${picker?'picker':'dashboard'}-${width}-${theme}.png`});
   await button.focus();await page.keyboard.press('Enter');
   const state1=await page.evaluate(()=>({view:state.view,mix:state.mixChapter,kap:String(state.currentTask.kap),stored:JSON.parse(localStorage.getItem(PASS_KEY)).mixChapter}));
   assert.deepEqual(state1,{view:'training',mix:kap,kap,stored:kap});
   const restored=await page.evaluate(()=>{const d=lasPagaendePass();state.mixChapter=null;const ok=aterupptaPass(d);return {ok,mix:state.mixChapter};});assert.deepEqual(restored,{ok:true,mix:kap});
   const more=await page.evaluate(()=>{continueSession();return {mix:state.mixChapter,kap:String(state.currentTask.kap)};});assert.deepEqual(more,{mix:kap,kap});
   await page.evaluate(()=>startCard(getCards()[0].key));assert.equal(await page.evaluate(()=>state.mixChapter),null);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  }
 }
 console.log(JSON.stringify({reports,errors}));assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
