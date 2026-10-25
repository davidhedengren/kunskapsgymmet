/* Läs de kort som faktiskt är tillgängliga per kurs/spår, utan konto. */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage();
  await page.route('https://*.supabase.co/**',r=>r.abort());
  await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
  await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{
   const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);
   return r.fulfill({path:path.join('/tmp/review-deps',m[1],'package',m[2])});
  });
  await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8057');
  await page.waitForFunction(()=>typeof selectCourse==='function');
  const snapshot=[];
  for(const course of ['ma1','ma2','mato1','mato2','matf1','fy1','fy2']){
   const result=await page.evaluate(async course=>{
    if(!await selectCourse(course,{render:false,record:false}))throw new Error(course);
    const tracks=COURSES[course].tracks?.length?COURSES[course].tracks:[null],rows=[];
    const template=t=>String(t||'').replace(/<svg[\s\S]*?<\/svg>/g,'').replace(/<[^>]+>/g,' ').replace(/\d+(?:[.,]\d+)?/g,'#').replace(/\s+/g,' ').trim();
    const stats=tasks=>{
     const level3=tasks.filter(q=>levelNumber(q)===3),families={},familiesLevels={};
     for(const q of tasks)for(const f of [q.familj].flat().filter(Boolean)){
      familiesLevels[f]||=[0,0,0,0,0];familiesLevels[f][levelNumber(q)-1]++;
     }
     for(const q of level3)for(const f of [q.familj].flat().filter(Boolean))families[f]=(families[f]||0)+1;
     const templates={};for(const q of level3){const s=template(q.t);(templates[s]||=[]).push(q.id);}
     return {ids:tasks.map(q=>String(q.id)).sort(),levels:[1,2,3,4,5].map(n=>tasks.filter(q=>levelNumber(q)===n).length),parents12:new Set(tasks.filter(q=>levelNumber(q)<=2).map(q=>q.ursprungsId||q.id)).size,parents3:new Set(level3.map(q=>q.ursprungsId||q.id)).size,
      families3:families,familiesLevels,templates3:Object.keys(templates).length,largestTemplate3:Math.max(0,...Object.values(templates).map(a=>a.length)),
      repeatedTemplates3:Object.entries(templates).filter(([_,ids])=>ids.length>=3).map(([text,ids])=>({text,ids})),
      figures3:level3.filter(q=>/<svg|<img/.test(q.t)).length,
      formats3:level3.reduce((a,q)=>{const k=q.alternativ?'alternativ':q.självrättning===false?'manuell':String(q.svarstyp||q.svarFormat);a[k]=(a[k]||0)+1;return a;},{}),
      tasks3:level3.map(q=>({id:q.id,parent:q.ursprungsId||q.id,family:q.familj,text:template(q.t),answer:q.rättSvar,figure:/<svg|<img/.test(q.t)}))};
    };
    for(const track of tracks){state.track=track;const tasks=availableTasks();
     for(const c of getCards()){
      const subset=tasks.filter(q=>q.kap===c.kap&&c.omr.includes(q.omr));
      rows.push({course,track,key:c.key,name:c.name,chapter:c.kap,areas:c.omr,...stats(subset),subareas:c.omr.map(omr=>({key:omr,name:areaName(omr),...stats(subset.filter(q=>q.omr===omr))}))});
     }
    }
    return rows;
   },course);
   snapshot.push(...result);console.log(course,result.length);
  }
  const out=process.env.REVIEW_OUT||'/tmp/nivainventering-2026-10-25.json';fs.writeFileSync(out,JSON.stringify({date:'2026-10-25',rows:snapshot},null,2));
  console.log(out);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
