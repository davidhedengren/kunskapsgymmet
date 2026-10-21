/* Kör mot lokal server på 8027. Inga elevdata eller rapportstatusar skrivs. */
'use strict';
const {chromium}=require('playwright'),fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
fs.mkdirSync('/tmp/fellogg-2026-10-21-0910',{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});try{
const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/(katex|nerdamer)@/,r=>{const m=new URL(r.request().url()).pathname.match(/^\/npm\/(katex|nerdamer)@[^/]+\/(.+)$/);return r.fulfill({path:'/tmp/review-deps/'+m[1]+'/package/'+m[2]});});
await page.route('https://*.supabase.co/**',r=>r.abort());await page.route('https://fonts.googleapis.com/**',r=>r.fulfill({body:''}));
await page.addInitScript(()=>localStorage.setItem('kunskapsgymmet-beta-info','2'));await page.goto('http://127.0.0.1:8027');await page.waitForFunction(()=>typeof selectCourse==='function'&&typeof nerdamer==='function');
const banks={};for(const name of ['matf1','mato2']){const c={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/../../Uppgiftslabbet/uppgifter'+name+'.js','utf8'),c);banks[name]=Object.values(c.window)[0];}
await page.evaluate(banks=>{window.reviewBanks=banks;session=null;syncOwner=null;arLarare=false;finishAttempt=r=>{state.answered=true;window.result=r;};window.reviewTask=(id,part)=>{const p=reviewBanks[state.course].find(q=>q.id===id),q=part==null?p:expandGameTask(p)[part];state.view='training';state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.aktivRuta=0;state.altValda=new Set();window.result=null;renderTraining();hjalpSynk();return q;};},banks);
let checks=0,views=0;const layout=[];
async function check(id,part,input,want){const actual=await page.evaluate(([id,part,input])=>{reviewTask(id,part);const values=Array.isArray(input)?input:[input];values.forEach((v,i)=>{const field=document.getElementById('ans-'+i);if(!field)throw Error(id+' missing field '+i);field.value=v;});for(let i=0;i<values.length&&!state.answered;i++)checkAnswer();return window.result||state.partResults;},[id,part,input]);assert.ok(actual.length>0,id+' tom rättning');assert.equal(actual.every(Boolean),want,id+' '+input+' '+actual);checks++;}
await page.evaluate(()=>selectCourse('matf1'));
// Independent substitution into each original second-order equation.
const ode=await page.evaluate(()=>{
 const equations={'4.04':[-12,32,'0'],'4.53':[-5,6,'0'],'4.73':[1,-6,'0'],'4.74':[5,6,'0'],'4.97':[3,-4,'0'],'4.10':[4,4,'0'],'4.54':[-4,4,'0'],'4.75':[6,9,'0'],'4.99':[8,16,'0'],'4.55':[0,9,'0'],'4.101':[0,16,'0'],'4.13':[4,13,'0'],'4.77':[2,5,'0'],'4.27':[-3,2,'6'],'4.28':[1,-2,'4*x'],'4.29':[-5,6,'3*e^x'],'4.30':[-3,2,'e^x'],'4.31':[0,4,'8*cos(x)'],'4.79':[1,-2,'8'],'4.103':[0,-1,'4*e^(2*x)'],'4.105':[0,1,'3*x-2'],'4.151':[0,-1,'6'],'4.152':[-3,2,'e^(4*x)'],'4.155':[0,4,'cos(x)']};
 return Object.entries(equations).map(([id,[a,b,rhs]])=>{
  const q=reviewBanks.matf1.find(q=>q.id===id),s=tillNerdamer(normalizeMathInput(q.rättSvar.replaceAll('C_1','(2)').replaceAll('C_2','(3)'))),f=nerdamer(s),d=nerdamer.diff(f,'x'),dd=nerdamer.diff(d,'x');
  const r=nerdamer(`(${dd})+(${a})*(${d})+(${b})*(${f})-(${rhs})`).expand();
  return {id,residual:[-.5,0,.4].map(x=>Number(r.sub('x',x).evaluate().text('decimals')))};
 });
});for(const row of ode)assert.ok(row.residual.every(x=>Math.abs(x)<1e-8),JSON.stringify(row));
const old={window:{}};vm.runInNewContext(require('child_process').execFileSync('git',['show','53af1bb:uppgiftermatf1.js'],{cwd:__dirname+'/..',encoding:'utf8',maxBuffer:40e6}),old);
// Baslinjen reproduceras med gamla format; nytt format får inte ärva uttrycksgenvägar.
const baseline=await page.evaluate(old=>{
 return ['4.04','4.53','4.27','4.160'].map((id,i)=>{const q=old.find(t=>t.id===id),s=['D*e^(4*x)+C*e^(8*x)','C*e^(2*x)+D*e^(3*x)','D*e^x+C*e^(2*x)+3',"y'+2y=6"][i];return {id,accepted:delSvarRatt(s,q.rättSvar,null,null,q,0,q.svarFormat)};});
},Object.values(old.window)[0]);assert.ok(baseline.every(x=>!x.accepted),JSON.stringify(baseline));
for(const [id,ans]of [['4.04','D*e^(4*x)+C*e^(8*x)'],['4.04','C1e^8x+C2e^4x'],['4.04','A*e^(4*x)-2*B*e^(8*x)'],['4.53','C*e^(3*x)+D*e^(2*x)'],['4.27','(C+D)*e^x+(C-D)*e^(2*x)+3'],['4.27','C*e^x+D*e^(2*x)+3+5*e^x'],['4.160',"y'+2y=6"],['4.160',"2y'+4y=12"],['4.160',"6=2y+y′"]])await check(id,null,ans,true);
for(const [id,ans]of [['4.04','C*e^(4*x)+C*e^(8*x)'],['4.04','C*e^(4*x)'],['4.04','C^2*e^(4*x)+D*e^(8*x)'],['4.04','C*e^(4*x)+D*e^(7*x)'],['4.27','C*e^x+D*e^(2*x)+2'],['4.27','C*e^x+D*e^(2*x)+3+x'],['4.160',"y'+2y=5"],['4.160',"y*y'+2y^2=6y"],['4.160','u+2y=6'],['4.160','6']])await check(id,null,ans,false);
for(const q of banks.matf1.filter(q=>q.svarFormat==='diffekv_losning'))await check(q.id,null,q.rättSvar.replaceAll('C_1','D').replaceAll('C_2','C'),true);
for(const id of ['3.01','3.02','3.14','3.15','3.30','3.31']){
 const q=banks.matf1.find(q=>q.id===id);await check(id,null,q.rättSvar.replace(/C/g,'K'),true);await check(id,null,q.rättSvar.replace(/\+C/g,''),false);
}
for(const [id,input,want]of [['4.102','e^(-2*x)*(2*cos(3*x)+4*sin(3*x)/3)',true],['4.102','e^(-2*x)*(C*cos(3*x)+D*sin(3*x))',false],['3.03','x*ln(x)-x+K',true],['3.03','x*ln(x)-x',false],['3.248','188,50 cm²/s',true],['3.248','1,88 dm²/s',true],['3.248','188 cm/s',false],['3.261','11310 cm²/s',true],['3.261','1,131 m²/s',true],['3.263','108 cm³/s',true],['3.263','108 cm²/s',false],['3.113','0,06 dm/s',true],['3.47','0,375 m/s',true],['3.66','18 cm²/s',true],['3.275','-1',true],['3.284','-1',true]])await check(id,null,input,want);
for(const [id,part,input]of [['1.161',0,'{7;5}'],['1.161',1,'{3;1}'],['1.161',2,'{11}'],['4.134',0,'-1'],['4.134',1,'2'],['4.134',2,'1'],['4.172',0,'2'],['4.172',1,'0'],['4.172',2,'-1'],['4.46',0,'ja'],['4.46',1,'nej'],['4.46',2,'ja'],['4.46',3,'nej']])await check(id,part,input,true);
for(const q of banks.matf1.filter(q=>(q.kap===3&&Number(q.id.split('.')[1])>=330)||(q.kap===4&&Number(q.id.split('.')[1])>=569))){await check(q.id,null,Array.isArray(q.rättSvar)?q.rättSvar.map(String):String(q.rättSvar),true);await check(q.id,null,Array.isArray(q.rättSvar)?q.rättSvar.map(()=> '999'):'999',false);}
// Real controls: symbol insertion and explicit convergence choices.
await page.evaluate(()=>reviewTask('1.161',0));await page.locator('#ans-0').focus();await page.getByTitle('Vänster mängdklammer',{exact:true}).click();await page.locator('#ans-0').pressSequentially('5;7');await page.getByTitle('Höger mängdklammer',{exact:true}).click();assert.equal(await page.locator('#ans-0').inputValue(),'{5;7}');
const choices=await page.evaluate(()=>{reviewTask('3.60',null);return {alt:arAlt(state.currentTask),rows:altRader(state.currentTask)};});assert.equal(choices.alt,true);assert.deepEqual(choices.rows.filter(x=>x.ratt).map(x=>x.txt),['Divergerar']);
for(const id of ['1.161','1.05','1.07','1.09','1.12','1.14']){
 const failures=await page.evaluate(id=>{reviewTask(id,id==='1.161'?0:null);const failures=[];for(const svg of document.querySelectorAll('.task svg')){const circles=[...svg.querySelectorAll('circle')];for(const label of svg.querySelectorAll('text')){const i=['A','B','C'].indexOf(label.textContent.trim());if(i<0||!circles[i])continue;const c=circles[i],box=label.getBBox(),cx=+c.getAttribute('cx'),cy=+c.getAttribute('cy'),r=+c.getAttribute('r');for(const x of [box.x,box.x+box.width])for(const y of [box.y,box.y+box.height])if(Math.hypot(x-cx,y-cy)>r)failures.push(label.textContent);}}return failures;},id);assert.deepEqual(failures,[],id);
}
// Same-area selection, two complete eight-task sessions: no repeat before pool exhaustion.
const selection=await page.evaluate(()=>{
 return ['repetition_derivator','verifiering'].map(area=>{state.focusArea=area;state.focusOmr=null;state.focusFamily=null;state.focusNiva=null;state.prov=null;localStorage.removeItem(seddaNyckel());const ids=[];for(let pass=0;pass<2;pass++){beginSession();for(let i=0;i<8;i++){const t=chooseTask();ids.push(t.id);state.lastIds.push(t.id);state.passHistory.push({task:t});noteraSedd(t.id);state.sessionDone++;}}return {area,ids,size:availableTasks().filter(t=>t.omr===area).length};});
});for(const s of selection)assert.equal(new Set(s.ids).size,16,JSON.stringify(s));
assert.equal(await page.evaluate(()=>availableTasks().some(q=>['4.106','4.386'].includes(q.id))),false);
const reported='4.386 4.106 4.27 4.134 4.04 4.53 1.161 4.514 4.160 4.46 3.227 3.212 3.03 3.113 3.47 3.248 3.263 3.261 3.275 3.60 3.66 3.284 3.277'.split(' ');
const ids=[...new Set([...reported,'1.05','1.07','1.09','1.12','1.14',...banks.matf1.filter(q=>(q.kap===3&&Number(q.id.split('.')[1])>=330)||(q.kap===4&&Number(q.id.split('.')[1])>=569)).map(q=>q.id)])];
for(const width of [390,1280]){await page.setViewportSize({width,height:1000});for(const id of ids){
const q=banks.matf1.find(q=>q.id===id),parts=q.spelDelning==='deluppgifter'?q.spelDelar.map((_,i)=>i):[null];
for(const part of parts){const v=await page.evaluate(([id,part])=>{reviewTask(id,part);showSolution();return {id,part,latex:document.querySelectorAll('.katex-error').length,wide:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display')].some(d=>[...d.querySelectorAll('.base')].some(b=>b.getBoundingClientRect().width>d.getBoundingClientRect().width+2))};},[id,part]);if(v.latex||v.wide||v.clipped)layout.push({...v,width});views++;}}
for(const id of ['3.113','1.161','4.53','3.60']){await page.evaluate(id=>reviewTask(id,id==='1.161'?0:null),id);await page.locator('.task').screenshot({path:'/tmp/fellogg-2026-10-21-0910/'+id+'-'+width+'.png'});}}
await page.evaluate(()=>selectCourse('mato2'));for(const id of ['2.222','2.259'])await check(id,null,id==='2.222'?'1 cm/s':'4 cm/s',true);
const output={baseline,ode,checks,views,selection,errors,layout};fs.writeFileSync('/tmp/fellogg-2026-10-21-0910/browser.json',JSON.stringify(output,null,2));console.log(JSON.stringify(output));assert.deepEqual(errors,[]);assert.deepEqual(layout,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
