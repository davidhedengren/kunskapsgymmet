'use strict';
const {chromium}=require('playwright'),path=require('path'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://*.supabase.co/**',r=>r.abort());
  if(process.env.REVIEW_DEPS)await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
   const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
   return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])});
  });
  await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
  await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8217');
  await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
  let totalGroups=0,totalParts=0;
  for(const course of ['ma1','ma2','mato1','mato2','matf1','fy1','fy2']){
   await page.evaluate(course=>selectCourse(course),course);
   const report=await page.evaluate(()=>{
    const contents=html=>{const d=document.createElement('div');d.innerHTML=html||'';
     return {text:(d.textContent||'').replace(/\s+/g,''),figures:[...d.querySelectorAll('svg,img')].map(x=>x.outerHTML)};};
    let groups=0,parts=0,missing=[];
    for(const parent of state.data.bank){
     if(parent.spel===false||parent.spelDelning!=='deluppgifter'||!Array.isArray(parent.spelDelar))continue;
     const cards=expandGameTask(parent);if(cards.length<2||!cards[0].ursprungsId)continue;
     groups++;const layout=kedjaDelning(cards,parent);
     let shown=layout.intro;
     cards.forEach((card,i)=>{parts++;const before=contents(card.t),after=contents(layout.intro+layout.delar[i]);
      // I en pågående kedja behålls tidigare frågor på skärmen och nästa
      // del kan därför använda kortvarianten utan att repetera gemensamma block.
      shown+=i===0?layout.delar[i]:layout.kort[i];const accumulated=contents(shown);
      let from=0;for(const ch of before.text){from=accumulated.text.indexOf(ch,from);if(from<0)break;from++;}
      const figureGone=before.figures.some(f=>!accumulated.figures.includes(f));
      if(before.text!==after.text||JSON.stringify(before.figures)!==JSON.stringify(after.figures)||from<0||figureGone)missing.push(card.id);
     });
    }
    return {groups,parts,missing};
   });
   assert.deepEqual(report.missing,[],`${course}: kortens text och figurer måste bevaras`);
   totalGroups+=report.groups;totalParts+=report.parts;console.log(course,report.groups,report.parts);
  }
  assert.ok(totalGroups>3000);assert.ok(totalParts>8000);assert.deepEqual(errors,[]);
  console.log(`Kontrollerade ${totalParts} delkort i ${totalGroups} kedjor.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
