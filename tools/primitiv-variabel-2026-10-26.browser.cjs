/* Testar faktisk rättningskod. Ingen elevdata läses eller skrivs. */
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage();await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS||'/tmp/ma3-c-deps',m[1],'package',m[2])});});
await page.goto(process.env.REVIEW_URL||'http://127.0.0.1:8037');await page.waitForFunction(()=>typeof nerdamer==='function'&&typeof formatRatt==='function');
const result=await page.evaluate(()=>{
let checks=0;const failures=[];
const check=(input,facit,format,want)=>{const got=formatRatt(input,facit,{format});checks++;if(got!==want)failures.push({input,facit,format,want,got});};
// Tidigare exponentregression: simplify får inte tappa den varierande faktorn.
for(const [base,wrong]of [['3/2*e^(2*x)','3*e^(2*x)'],['e^x','2*e^x'],['2*e^(-x)','e^(-x)'],['2^x/ln(2)','2^x'],['3*x^2/2+2*e^x','3*x^2/2+e^x'],['e^(3*x)/3','e^(3*x)']])for(const format of ['primitiv','primitiva']){
 const facit=base+(format==='primitiva'?'+C':'');check('K+('+base+')',facit,format,true);check('K+('+wrong+')',facit,format,false);
}
// Samma fria-konstant-kontrakt för x och t, i båda formaten.
for(const v of ['x','t'])for(const base of [v+'^3',`e^(${v})`,`${v}*sin(3*${v})/3+cos(3*${v})/9`])for(const format of ['primitiv','primitiva']){
 const all=format==='primitiva',facit=base+(all?'+C':'');
 for(const input of [base+'+K','K+('+base+')',base+'+2K+7',base+'+C'])check(input,facit,format,true);
 for(const input of [base,base+'+7'])check(input,facit,format,!all);
 for(const input of [base+'+'+v,base+'+'+v+'+K','2*('+base+')+K'])check(input,facit,format,false);
 if(all)for(const input of [base+'+K^2',base+'+sin(K)'])check(input,facit,format,false);
}
return {checks,failures};});console.log(JSON.stringify(result,null,2));assert.deepEqual(result.failures,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
