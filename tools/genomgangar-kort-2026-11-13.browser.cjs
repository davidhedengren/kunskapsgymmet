/* Genomgångarna i kursvyn (2026-11-13, alternativ B): ett eget kort först i varje öppet kapitel, inga
   länkar på områdeskorten. Kör mot en lokal server i repots rot
   (python3 -m http.server 8027). Ingen inloggning och ingen skrivning till Supabase.
   Kontrollerar: kortet ligger först i kapitlet och inte i kapitelraden, områdeskorten har ingen
   genomgångslänk, läsningen uppdaterar kvot och stapel och gör kortet guldfärgat, kapitelkortet
   öppnar hela kapitlet, områdeskortet startar träningen, och sidan rullar inte i sidled i dator,
   mobil och ljust tema. Skärmbilder sparas i REVIEW_OUT. */
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
 assert.equal(kap.chips.length,0,'ingen genomgångslänk på områdeskorten');
 // Läs två genomgångar och uppdatera kapitelkortet
 await p.evaluate(()=>{const kort=getCards().find(k=>k.name==='Densitet');const st=kunskapSteg(kort.kap,kort.key);
   profile.genomgangar ||= {};st.slice(0,2).forEach(x=>profile.genomgangar[ggNyckel(x.familj)]=Date.now());uppdateraKunskapsindikator(kort.kap);});
 const upp=await p.evaluate(()=>({kvot:document.querySelector('.chapter.open .kap-kunskap .kvot').textContent,bar:document.querySelector('.chapter.open .gg-bar i').style.getPropertyValue('--p')}));
 assert.equal(upp.kvot,'2/16');assert.equal(upp.bar,'13%');
 // Alla lästa: kortet blir guldfärgat
 await p.evaluate(()=>{const kap=document.querySelector('.chapter.open .kap-kunskap').dataset.kap;kunskapSteg(kap).forEach(x=>profile.genomgangar[ggNyckel(x.familj)]=Date.now());uppdateraKunskapsindikator(kap);});
 assert.equal(await p.evaluate(()=>document.querySelector('.chapter.open .kap-kunskap').classList.contains('klar')),true);
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
