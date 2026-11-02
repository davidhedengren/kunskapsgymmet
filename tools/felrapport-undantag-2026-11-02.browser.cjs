'use strict';
const {chromium}=require('playwright'),path=require('node:path'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const simulate=!process.env.FEL_XP_TEST_EMAIL_FILE,email=simulate?'blocked@example.test':fs.readFileSync(process.env.FEL_XP_TEST_EMAIL_FILE,'utf8').trim();const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
 const p=await b.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.route('https://*.supabase.co/**',r=>r.abort());
 if(process.env.REVIEW_DEPS)await p.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:path.join(process.env.REVIEW_DEPS,m[1],m[2])})});
 await p.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await p.goto(process.env.REVIEW_URL||'http://127.0.0.1:8290');await p.waitForFunction(()=>typeof felHamtaAtgardade==='function');
 const out=await p.evaluate(async ({target,simulate})=>{
  if(simulate){const original=crypto.subtle.digest.bind(crypto.subtle);crypto.subtle.digest=async (alg,data)=>new TextDecoder().decode(data)===target?Uint8Array.from(FEL_BONUS_UNDANTAG.match(/../g),x=>parseInt(x,16)).buffer:original(alg,data);}
  saveProfile=()=>{};animeraXp=()=>{};cheer=()=>{};checkBadges=()=>{};felLasaKo=()=>[{kurs:'mato1',uppgift:'3.1202',skickad:true}];
  let calls=0;window.fetch=async(url)=>{calls++;return {ok:true,json:async()=>[{kurs:'mato1',uppgift:'3.1202'}]}};
  const reset=(user)=>{session=user?{user,access_token:'test'}:null;profile={xp:100,felBelonade:{},felFynd:0};localStorage.removeItem(FEL_BELONAD_KEY);calls=0;};
  reset({id:'target',email:target,user_metadata:{full_name:'Lars-Åke Andersson'}});await felHamtaAtgardade();const blocked={xp:profile.xp,found:profile.felFynd,calls};
  const reportSent=await felSkickaEn({kurs:'mato1',uppgift:'3.1202',enhet:'test'});
  reset({id:'other',email:'different@example.test',user_metadata:{full_name:'Lars-Åke Andersson'}});await felHamtaAtgardade();const other={xp:profile.xp,found:profile.felFynd,calls};
  reset(null);await felHamtaAtgardade();const guest={xp:profile.xp,found:profile.felFynd,calls};
  reset({id:'unknown'});await felHamtaAtgardade();const unknown={xp:profile.xp,calls};
  reset({id:'old',email:'different@example.test'});window.fetch=async()=>({ok:true,json:async()=>{session={user:{id:'new',email:target}};return [{kurs:'mato1',uppgift:'3.1202'}]}});await felHamtaAtgardade();const switched={xp:profile.xp};
  return {blocked,reportSent,other,guest,unknown,switched};
 },{target:email,simulate});
 assert.deepEqual(out.blocked,{xp:100,found:0,calls:0});assert.equal(out.reportSent,true);
 assert.deepEqual(out.other,{xp:150,found:1,calls:1});assert.deepEqual(out.guest,{xp:150,found:1,calls:1});assert.deepEqual(out.unknown,{xp:100,calls:0});assert.deepEqual(out.switched,{xp:100});assert.deepEqual(errors,[]);
 console.log('Kontoundantag, oförändrad XP för andra, rapportsändning och kontobyte passerar.');
 }finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
