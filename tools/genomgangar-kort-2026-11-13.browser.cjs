/* Genomgångarna i kursvyn (2026-11-13, alternativ C): ett eget kort först i varje öppet kapitel och en
   boksymbol på varje områdeskort som har genomgångar (bara symbol sedan 2026-11-13). Kör mot en lokal server i repots rot
   (python3 -m http.server 8027). Ingen inloggning och ingen skrivning till Supabase.
   Kontrollerar: kortet ligger först i kapitlet och inte i kapitelraden, länkarna visar rätt antal,
   länken öppnar områdets genomgångar utan att starta träningen, läsningen uppdaterar kvot, stapel och
   länkar, kapitelkortet öppnar hela kapitlet, resten av områdeskortet startar träningen, och sidan
   rullar inte i sidled i dator, mobil och ljust tema. Skärmbilder sparas i REVIEW_OUT. */
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs');
const out=process.env.REVIEW_OUT||'/tmp/genomgangar-kort';fs.mkdirSync(out,{recursive:true});
const URL=process.env.REVIEW_URL||'http://localhost:8027';
async function sida(b,w,h,tema){
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});const fel=[];p.on('pageerror',e=>fel.push(e.message));
  await p.route('https://*.supabase.co/**',r=>r.abort());await p.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
  await p.addInitScript(t=>{localStorage.setItem('kunskapsgymmet-beta-info','2');if(t)localStorage.setItem('kunskapsgymmet-tema',t);},tema||null);
  await p.goto(URL);await p.waitForFunction(()=>typeof selectCourse==='function');
  if(tema==='light')await p.evaluate(()=>{document.documentElement.dataset.theme='light';document.documentElement.classList.remove('dark');});
  await p.evaluate(()=>selectCourse('fy1'));await p.waitForTimeout(600);
  return {p,fel};
}
(async()=>{const b=await chromium.launch();
 // Funktion
 const {p,fel}=await sida(b,1280,1000);
 const kap=await p.evaluate(()=>({rad:!!document.querySelector('.chapter-row .kap-kunskap'),kort:document.querySelectorAll('.chapter.open .area-grid > .kap-kunskap').length,
   forst:document.querySelector('.chapter.open .area-grid').firstElementChild.className,chips:[...document.querySelectorAll('.chapter.open .omr-gg')].map(c=>c.getAttribute('aria-label'))}));
 assert.equal(kap.rad,false,'ingen knapp kvar i kapitelraden');assert.equal(kap.kort,1);assert.match(kap.forst,/kap-kunskap/);
 assert.deepEqual(kap.chips.map(c=>c.match(/(\d+) av (\d+) lästa/).slice(1).join('/')),['0/3','0/2','0/5','0/6']);
 assert.equal(await p.evaluate(()=>document.querySelector('.chapter.open .omr-gg').textContent.trim()),'','bara boksymbol, ingen text');
 // Klick på länken öppnar områdets genomgång och startar inte träningen
 await p.click('.chapter.open .area:nth-of-type(1) .omr-gg');await p.waitForTimeout(300);
 const efter=await p.evaluate(()=>({modal:!!document.getElementById('kunskapsruta'),kort:state.kunskap?.kortNyckel,steg:state.kunskap?.steg.length,vy:state.view}));
 assert.equal(efter.modal,true);assert.equal(efter.steg,3);assert.equal(efter.vy,'dashboard');
 await p.screenshot({path:`${out}/c-modal.png`});
 await p.evaluate(()=>stangKunskap());
 // Läs två genomgångar i Densitet och uppdatera
 await p.evaluate(()=>{const kort=getCards().find(k=>k.name==='Densitet');const st=kunskapSteg(kort.kap,kort.key);
   profile.genomgangar ||= {};st.slice(0,2).forEach(x=>profile.genomgangar[ggNyckel(x.familj)]=Date.now());uppdateraKunskapsindikator(kort.kap);});
 const upp=await p.evaluate(()=>({kvot:document.querySelector('.chapter.open .kap-kunskap .kvot').textContent,bar:document.querySelector('.chapter.open .gg-bar i').style.getPropertyValue('--p'),
   chips:[...document.querySelectorAll('.chapter.open .omr-gg')].map(c=>c.getAttribute('aria-label'))}));
 assert.equal(upp.kvot,'2/16');assert.equal(upp.bar,'13%');assert.match(upp.chips[2],/2 av 5 lästa/);
 // Läs alla i Måttenheter: guld
 await p.evaluate(()=>{const kort=getCards().find(k=>k.name==='Måttenheter och prefix');kunskapSteg(kort.kap,kort.key).forEach(x=>profile.genomgangar[ggNyckel(x.familj)]=Date.now());uppdateraKunskapsindikator(kort.kap);});
 assert.match(await p.evaluate(()=>document.querySelector('.chapter.open .omr-gg.klar')?.getAttribute('aria-label')),/Måttenheter och prefix · 3 av 3 lästa/);
 // Klick på kapitelkortet öppnar hela kapitlets genomgångar
 await p.click('.chapter.open .kap-kunskap');await p.waitForTimeout(300);
 assert.equal(await p.evaluate(()=>state.kunskap?.steg.length),16);await p.evaluate(()=>stangKunskap());
 // Klick på resten av områdeskortet startar fortfarande träningen
 await p.click('.chapter.open .area:nth-of-type(2) strong');await p.waitForTimeout(400);
 assert.notEqual(await p.evaluate(()=>state.view),'dashboard');
 assert.deepEqual(fel,[]);await p.close();
 // Skärmbilder: dator mörkt (med läst framsteg), mobil, ljust
 for(const [w,h,namn,tema] of [[1280,1080,'dator',null],[390,1400,'mobil',null],[1280,1080,'ljus','light']]){
   const {p,fel}=await sida(b,w,h,tema);
   await p.evaluate(()=>{profile.genomgangar ||= {};for(const n of ['Densitet','Måttenheter och prefix']){const kort=getCards().find(k=>k.name===n);
     kunskapSteg(kort.kap,kort.key).slice(0,n==='Densitet'?2:9).forEach(x=>profile.genomgangar[ggNyckel(x.familj)]=Date.now());}renderDashboard?.();});
   await p.waitForTimeout(500);
   const rorelse=await p.$('.chapter:not(.open) .chapter-head');if(rorelse){await rorelse.click();await p.waitForTimeout(300);}
   const y=await p.evaluate(()=>document.querySelector('.chapter').getBoundingClientRect().top+scrollY-110);await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(300);
   const bred=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(bred,false,namn);
   await p.screenshot({path:`${out}/c-${namn}.png`});assert.deepEqual(fel,[]);await p.close();
 }
 console.log('alla kontroller OK');await b.close();})().catch(e=>{console.error(e);process.exitCode=1;});
