/* Kursen Artificiell intelligens nivå 1 (ai), 2026-11-11.
   Kör mot en lokal server i repots rot (python3 -m http.server 8027).
   Ingen inloggning och ingen skrivning till Supabase.
   Kontrollerar:
   - startsidan: AI ligger som eget ämne ovanför Historia och är öppen;
   - alla självrättande AI-uppgifter syns i kursens kort;
   - varje delkort: rätt svar godkänns, fel svar underkänns, negativa heltal
     godkänns med både − och -, varje felaktigt alternativ underkänns;
   - ledtråd och facit visas utan sidledsrullning i mobil- och datorbredd;
   - AI finns inte i lärarvyns kurslistor (gruppkurs saknas i databasen). */
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),out=process.env.REVIEW_OUT||'/tmp/ai1-kurs';fs.mkdirSync(out,{recursive:true});
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'uppgifterai.js'),'utf8'),c);
const bank=JSON.parse(JSON.stringify(c.window.BANKAI)),spel=bank.filter(q=>q.spel!==false);
(async()=>{const browser=await chromium.launch(process.env.CHROMIUM?{executablePath:process.env.CHROMIUM}:{});try{
 const page=await browser.newPage(),errors=[],failures=[];let checks=0;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
 await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
 await page.goto(process.env.REVIEW_URL||'http://localhost:8027');await page.waitForFunction(()=>typeof selectCourse==='function');

 // Startsidan (inloggningsrutan hoppas över)
 await page.evaluate(()=>renderHome());
 const hem=await page.evaluate(()=>({order:COURSE_ORDER,grupper:kursgrupper().map(g=>g.amne),
   kort:!!document.getElementById('course-ai'),under:!!COURSES.ai.under,namn:COURSES.ai.name,
   larare:typeof UTAN_LARARVY!=='undefined'&&UTAN_LARARVY.has('ai')}));
 assert.equal(hem.namn,'Artificiell intelligens nivå 1');
 assert.ok(hem.order.indexOf('ai')===hem.order.indexOf('hist')-1,'ai direkt före hist');
 assert.deepEqual(hem.grupper,['Matematik','Fysik','Artificiell intelligens','Historia']);
 assert.ok(hem.kort,'kurskortet visas');assert.equal(hem.under,false);assert.ok(hem.larare);
 await page.setViewportSize({width:1280,height:1400});await page.screenshot({path:out+'/startsida.png',fullPage:true});

 // Kursen och korten
 assert.equal(await page.evaluate(()=>selectCourse('ai')),true);
 const kurs=await page.evaluate(()=>{const cards=getCards();const ids=[...new Set(availableTasks().filter(q=>cards.some(c=>c.kap===q.kap&&c.omr.includes(q.omr))).map(q=>q.ursprungsId||q.id))].sort();
   return {ids,accent:accentKey(),kort:cards.map(c=>c.omr).flat().length};});
 assert.deepEqual(kurs.ids,spel.map(q=>q.id).sort());assert.equal(kurs.accent,'ai');assert.equal(kurs.kort,10);
 await page.screenshot({path:out+'/kursvy.png',fullPage:true});

 const delar=await page.evaluate(t=>t.flatMap(expandGameTask),spel);
 await page.evaluate(tasks=>{window.reviewBank=tasks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};
   window.prepareReview=id=>{state.currentTask=reviewBank.find(q=>q.id===id);state.answered=false;state.solutionShown=false;state.hintVisible=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;state.altValda=new Set();state.altOrdningId=null;window.result=null;renderTraining();hjalpSynk();};},delar);
 const svara=values=>page.evaluate(values=>{const f=[...document.querySelectorAll('input[id^="ans-"],textarea[id^="ans-"]')];if(f.length!==values.length)return {falt:f.length};values.forEach((v,i)=>f[i].value=v);for(let k=0;k<values.length&&!window.result;k++)checkAnswer();return window.result;},values);
 const valj=(id,txt)=>page.evaluate(({id,txt})=>{prepareReview(id);const i=altLista(state.currentTask).findIndex(x=>x.txt===txt);vaxlaAlt(i);kollaAlt();return window.result;},{id,txt});
 let numeriska=0,alternativ=0,negativa=0;
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
  for(const q of delar){const key=q.id+'@'+width;
   if(width===390){
    if(Array.isArray(q.alternativ)&&q.alternativ.length){alternativ++;
     for(const a of q.alternativ){const r=await valj(q.id,a.txt);checks++;if(!Array.isArray(r)||r.every(Boolean)!==a.ratt)failures.push({key,txt:a.txt,ratt:a.ratt,r});}
    }else{numeriska++;
     const v=q.rättSvar;assert.ok(Number.isInteger(v),key);
     const fall=[[String(v),true],[String(v+1),false]];
     if(v<0){negativa++;fall.push(['−'+Math.abs(v),true],[String(Math.abs(v)),false]);}
     for(const[x,ok]of fall){await page.evaluate(id=>prepareReview(id),q.id);const r=await svara([x]);checks++;if(!Array.isArray(r)||r.every(Boolean)!==ok)failures.push({key,x,ok,r});}
    }
   }
   await page.evaluate(id=>{prepareReview(id);visaLedtrad();showSolution();},q.id);
   const st=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));
   if(st.latex||st.wide)failures.push({key,...st});
   if(['1.32a','2.68a','3.56a','3.60a'].includes(q.id)){await page.evaluate(()=>window.scrollTo(0,0));await page.locator('.task').screenshot({path:`${out}/${q.id}-${width}.png`});}
  }}
 // Symbolraden: bara minustecken för AI
 const sym=await page.evaluate(()=>{const q=reviewBank.find(x=>!(Array.isArray(x.alternativ)&&x.alternativ.length));prepareReview(q.id);return [...document.querySelectorAll('.symtgt')].map(b=>b.textContent.trim());});
 assert.deepEqual(sym,['−']);
 const res={delkort:delar.length,numeriska,alternativ,negativa,checks,failures,errors};
 fs.writeFileSync(out+'/browser.json',JSON.stringify(res,null,2));console.log({...res,failures:failures.slice(0,20)});
 assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
