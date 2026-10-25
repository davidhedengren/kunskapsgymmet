/* Granska facit, ledtråd och alternativ i verklig mobilrendering utan konto. */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage({viewport:{width:390,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join('/tmp/review-deps',m[1],'package',m[2])});});
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));
await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8057');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
await page.evaluate(c=>selectCourse(c),process.env.REVIEW_COURSE);
const ids=process.env.REVIEW_IDS.split(','),out=process.env.REVIEW_OUT;fs.mkdirSync(out,{recursive:true});
for(const id of ids){await page.evaluate(id=>{const q=availableTasks().find(q=>(q.ursprungsId||q.id)===id);if(!q)throw Error(id);state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.aktivRuta=0;state.altValda=new Set();state.altOrdningId=null;renderTraining();visaLedtrad();showSolution();},id);
const status=await page.evaluate(()=>({latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,math:[...document.querySelectorAll('.task .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent)}));assert.deepEqual(status,{latex:0,wide:false,math:[]},id);
await page.waitForTimeout(400);await page.evaluate(()=>scrollTo(0,0));
await page.locator('.task').screenshot({path:out+'/'+id+'.png',animations:'disabled'});
}assert.deepEqual(errors,[]);console.log({facitOchLedtrad:ids.length,errors});
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
