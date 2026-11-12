/* Kursen Artificiell intelligens nivå 1 (ai), 2026-11-11.
   Kör mot en lokal server i repots rot (python3 -m http.server 8027).
   Ingen inloggning och ingen skrivning till Supabase.
   Kontrollerar:
   - startsidan: AI ligger som eget ämne ovanför Historia och är öppen;
   - alla självrättande AI-uppgifter syns i kursens kort;
   - varje delkort: rätt svar godkänns, fel svar underkänns, negativa heltal
     godkänns med både − och -, varje felaktigt alternativ underkänns, alla rätta
     alternativ krävs vid ”Välj alla”, namnlistor (namnordning/namnmangd) godtar pilar
     och små bokstäver men inte fel ordning eller ett saknat element;
   - ledtråd och facit visas utan sidledsrullning i mobil- och datorbredd;
   - AI finns i lärarvyns kurslistor och träningspassen räknar alla uppgifter
     (databasen: sql/2026-11-11-ai1-larare.sql). */
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),out=process.env.REVIEW_OUT||'/tmp/ai1-kurs';fs.mkdirSync(out,{recursive:true});
const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'uppgifterai.js'),'utf8'),c);vm.runInNewContext(fs.readFileSync(path.join(root,'strukturai.js'),'utf8'),c);
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
   larare:!UTAN_LARARVY.has('ai')&&larKursAlternativ().includes('value="ai"')&&!larKursAlternativ().includes('value="hist"')}));
 assert.equal(hem.namn,'Artificiell intelligens nivå 1');
 assert.ok(hem.order.indexOf('ai')===hem.order.indexOf('hist')-1,'ai direkt före hist');
 assert.deepEqual(hem.grupper,['Matematik','Fysik','Artificiell intelligens','Historia']);
 assert.ok(hem.kort,'kurskortet visas');assert.equal(hem.under,false);assert.ok(hem.larare);
 await page.setViewportSize({width:1280,height:1400});await page.screenshot({path:out+'/startsida.png',fullPage:true});

 // Lärarvyn: träningspass kan välja alla tio områden
 const lar=await page.evaluate(async()=>{const kd=await provKursData('ai');const per=provRakna(kd,null,['E','C','A']);return {omr:Object.keys(per).length,alla:Object.values(per).reduce((x,o)=>x+o.alla,0)};});
 assert.deepEqual(lar,{omr:9,alla:spel.length});
 // Kursen och korten
 assert.equal(await page.evaluate(()=>selectCourse('ai')),true);
 const kurs=await page.evaluate(()=>{const cards=getCards();const ids=[...new Set(availableTasks().filter(q=>cards.some(c=>c.kap===q.kap&&c.omr.includes(q.omr))).map(q=>q.ursprungsId||q.id))].sort();
   return {ids,accent:accentKey(),kort:cards.map(c=>c.omr).flat().length};});
 assert.deepEqual(kurs.ids,spel.map(q=>q.id).sort());assert.equal(spel.length,bank.length);assert.equal(kurs.accent,'ai');assert.equal(kurs.kort,Object.values(c.window.OMRAI).reduce((x,o)=>x+Object.keys(o).length,0));
 await page.screenshot({path:out+'/kursvy.png',fullPage:true});

 const delar=await page.evaluate(t=>t.flatMap(expandGameTask),spel);
 await page.evaluate(tasks=>{window.reviewBank=tasks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};
   window.prepareReview=id=>{state.currentTask=reviewBank.find(q=>q.id===id);state.answered=false;state.solutionShown=false;state.hintVisible=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;state.altValda=new Set();state.altOrdningId=null;window.result=null;renderTraining();hjalpSynk();};},delar);
 const svara=values=>page.evaluate(values=>{const f=[...document.querySelectorAll('input[id^="ans-"],textarea[id^="ans-"]')];if(f.length!==values.length)return {falt:f.length};values.forEach((v,i)=>f[i].value=v);for(let k=0;k<values.length&&!window.result;k++)checkAnswer();return window.result;},values);
 const valj=(id,txt)=>page.evaluate(({id,txt})=>{prepareReview(id);const i=altLista(state.currentTask).findIndex(x=>x.txt===txt);vaxlaAlt(i);kollaAlt();return window.result;},{id,txt});
 let numeriska=0,alternativ=0,negativa=0,listor=0,flerfalt=0;
 const valjMask=(id,txts)=>page.evaluate(({id,txts})=>{prepareReview(id);for(const txt of txts){const i=altLista(state.currentTask).findIndex(x=>x.txt===txt);vaxlaAlt(i);}kollaAlt();return window.result;},{id,txts});
 const prova=async(q,values,ok,key,vad)=>{await page.evaluate(id=>prepareReview(id),q.id);const r=await svara(values);checks++;if(!Array.isArray(r)||r.every(Boolean)!==ok)failures.push({key,vad,values,ok,r});};
 const forsta=v=>String(v).split('|')[0];
 for(const width of [390,1280]){await page.setViewportSize({width,height:1000});
  for(const q of delar){const key=q.id+'@'+width;
   if(width===390){
    if(Array.isArray(q.alternativ)&&q.alternativ.length){alternativ++;
     const ratt=q.alternativ.filter(a=>a.ratt).map(a=>a.txt);
     let r=await valjMask(q.id,ratt);checks++;if(!Array.isArray(r)||!r.every(Boolean))failures.push({key,vad:'alla rätta',r});
     for(const a of q.alternativ.filter(a=>!a.ratt)){r=await valjMask(q.id,[a.txt]);checks++;if(!Array.isArray(r)||r.every(Boolean))failures.push({key,vad:'fel alternativ',txt:a.txt,r});}
     if(ratt.length>1){r=await valjMask(q.id,[ratt[0]]);checks++;if(!Array.isArray(r)||r.every(Boolean))failures.push({key,vad:'bara ett av flera rätta',r});}
    }else{
     const facit=Array.isArray(q.rättSvar)?q.rättSvar:[q.rättSvar];
     const fmt=Array.isArray(q.svarFormat)?q.svarFormat:[q.svarFormat];
     if(facit.length>1)flerfalt++;
     const rattSvar=facit.map(v=>typeof v==='number'?String(v):forsta(v));
     await prova(q,rattSvar,true,key,'rätt');
     // Fel i sista fältet ska underkännas.
     const sist=facit.length-1,fel=[...rattSvar];
     fel[sist]=typeof facit[sist]==='number'?String(facit[sist]+1):forsta(facit[sist]).split(', ').concat(['Z9']).join(', ');
     await prova(q,fel,false,key,'fel');
     for(let j=0;j<facit.length;j++){
      if(typeof facit[j]==='number'){numeriska++;if(facit[j]<0){negativa++;const v=[...rattSvar];v[j]='−'+Math.abs(facit[j]);await prova(q,v,true,key,'unicode-minus');v[j]=String(Math.abs(facit[j]));await prova(q,v,false,key,'utan minus');}continue;}
      listor++;
      const el=forsta(facit[j]).split(', ');
      const pil=[...rattSvar];pil[j]=el.map(x=>x.toLowerCase()).join(' → ');await prova(q,pil,true,key,'pilar och små bokstäver');
      if(new Set(el).size>1){const bak=[...rattSvar];bak[j]=[...el].reverse().join(', ');await prova(q,bak,fmt[j]==='namnmangd',key,'omvänd ordning');}
      if(el.length>1){const kort=[...rattSvar];kort[j]=el.slice(0,-1).join(', ');await prova(q,kort,false,key,'ett element för lite');}
     }
    }
   }
   await page.evaluate(id=>{prepareReview(id);visaLedtrad();showSolution();},q.id);
   const st=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1}));
   if(st.latex||st.wide)failures.push({key,...st});
   if(['1.01a','2.17a','3.05c','2.32a','3.07c','1.65b','1.68c','1.72a','2.78a','2.79c','2.86c','2.87c','1.78a','1.92a','2.101c','3.67b'].includes(q.id)){await page.evaluate(()=>window.scrollTo(0,0));await page.locator('.task').screenshot({path:`${out}/${q.id}-${width}.png`});}
  }}
 // Symbolraden: bara minustecken för AI
 const sym=await page.evaluate(()=>{const q=reviewBank.find(x=>!(Array.isArray(x.alternativ)&&x.alternativ.length)&&!Array.isArray(x.rättSvar));prepareReview(q.id);return [...document.querySelectorAll('.symtgt')].map(b=>b.textContent.trim());});
 assert.deepEqual(sym,['−']);
 const res={delkort:delar.length,numeriska,alternativ,negativa,listor,flerfalt,checks,failures,errors};
 fs.writeFileSync(out+'/browser.json',JSON.stringify(res,null,2));console.log({...res,failures:failures.slice(0,20)});
 assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
