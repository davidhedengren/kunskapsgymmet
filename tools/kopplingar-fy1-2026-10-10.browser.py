"""Batterikopplingar och elektrisk energi: faktisk rättning med kortens givna data, enheter och avrundning."""
import json,os,urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 url=route.request.url
 if url not in cache:
  with urllib.request.urlopen(url,timeout=30) as r:cache[url]=(r.status,dict(r.headers),r.read())
 status,headers,body=cache[url]
 route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':1000})
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.goto('http://127.0.0.1:8072/index.html?kurs=fy1');page.evaluate("selectCourse('fy1')");page.wait_for_function('window.BANK && typeof window.nerdamer==="function"')
 page.evaluate("ids=>{const el=document.createElement('script');el.id='review-ids';el.type='application/json';el.textContent=JSON.stringify(ids);document.body.appendChild(el);}",page.evaluate("()=>BANK.filter(q=>q.omr==='kopplingar').map(q=>q.id)"))
 result=page.evaluate(r'''()=>{
 finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
 const prepare=(id,index=0)=>{const q=expandGameTask(BANK.find(q=>q.id===id))[index];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.altValda=new Set();window.reviewAttempt=null;renderTraining();return q;};
 let numeric=0,alternatives=0;const failures=[];
 const ids=JSON.parse(document.getElementById('review-ids').textContent),cases=[];
 const two=x=>Number(x.toPrecision(2));
 for(const id of ids)for(const[index,q]of expandGameTask(BANK.find(t=>t.id===id)).entries()){
  if(arAlt(q))continue; const vals=Array.isArray(q.rättSvar)?q.rättSvar:[q.rättSvar];
  if(!vals.every(x=>typeof x==='number'))continue;
  const units=Array.isArray(q.svarEnhet)?q.svarEnhet:vals.map(()=>q.svarEnhet);
  cases.push([id,index,vals.map(v=>String(v)),true]);
  cases.push([id,index,vals.map(v=>String(two(v))),true]);
  cases.push([id,index,vals.map((v,i)=>String(two(v))+(units[i]?' '+units[i]:'')),true]);
  cases.push([id,index,vals.map(v=>String(-v)),false]);
  cases.push([id,index,vals.map(v=>String(v*10)),false]);
  if(vals.length>1&&new Set(vals).size>1)cases.push([id,index,vals.slice().reverse().map(String),false]);
 }
 cases.push(['8.452',1,['15 °C'],true],['8.452',1,['15 K'],true],['8.452',1,['288 K'],false],['8.455',0,['11 kg/min'],true],['8.455',0,['11,4 kg'],false],['8.94',2,['2,9 månader'],true],['8.97',1,['2,5 kWh'],true],['8.97',1,['100 kWh'],false]);
 for(const[id,index,inputs,want]of cases){prepare(id,index);for(let j=0;j<inputs.length;j++){const el=document.getElementById('ans-'+j);if(!el){failures.push({id,index,missingField:j});continue;}el.value=inputs[j];}
 let attempts=0;while(!state.answered&&attempts++<inputs.length+1)checkAnswer();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,index,inputs,want,parts:window.reviewAttempt});numeric++;}
 for(const id of ids)for(let n=0;n<expandGameTask(BANK.find(q=>q.id===id)).length;n++){
 const q=prepare(id,n);if(!arAlt(q))continue;const list=altLista(q);const correct=list.map((v,i)=>v.ratt?i:-1).filter(i=>i>=0);
 for(const[choices,want]of[[correct,true],[[],false],[list.map((_,i)=>i),false]]){prepare(id,n);state.altValda=new Set(choices);kollaAlt();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,n,choices,want,parts:window.reviewAttempt});alternatives++;}
 }
 return{numeric,alternatives,failures};
 }''')
 print(json.dumps(result));open('/tmp/kopplingar-answer.json','w').write(json.dumps(result))
 b.close()
 if result['failures']:raise SystemExit(1)
