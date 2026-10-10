"""Återstående Coulombuppgifter: faktisk rättning av egna kortdata och ordnade fält."""
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
 result=page.evaluate(r'''()=>{
 finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
 const prepare=(id,index=0)=>{const q=expandGameTask(BANK.find(q=>q.id===id))[index];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.altValda=new Set();window.reviewAttempt=null;renderTraining();return q;};
 let numeric=0,alternatives=0;const failures=[];
 const cases=[
 ['8.22',0,['2,3*10^-24 N'],true],['8.22',1,['1,9*10^-60 N'],true],['8.22',1,['0 N'],false],['8.22',1,['1,9*10^-59 N'],false],['8.22',2,['1,2*10^36'],true],
 ['8.24',1,['87 µN'],true],['8.24',1,['8,7 µN'],false],['8.32',0,['6 cm'],true],['8.33',0,['84 µN'],true],['8.33',1,['150 µN'],true],['8.33',2,['172 µN','61°'],true],['8.33',2,['61','172'],false],
 ['8.34',0,['8 cm'],true],['8.58',0,['14 nC'],true],['8.58',1,['8,7*10^10'],true],['8.119',0,['2 nC'],true],['8.119',1,['22 µN'],true],
 ['8.311',0,['0,20 m'],true],['8.312',0,['0,75 N'],true],['8.121',1,['100 µN','29 µN'],true],['8.121',1,['29 µN','100 µN'],false],['8.121',2,['129 µN'],true],['8.313',0,['0 N'],true],['8.313',0,['1 N'],false],['8.159',0,['42 µN'],true],['8.159',2,['11 µN'],true],
 ['8.314',0,['0,50 m'],true],['8.160',0,['200 µN'],true],['8.160',1,['169 µN'],true],['8.160',2,['262 µN','40°'],true],['8.161',0,['58 N'],true],['8.161',1,['5 µC'],true],['8.161',2,['90 N'],true],
 ['8.316',0,['-0,00035 N'],true],['8.316',0,['0,00035 N'],false],['8.317',0,['1 µC'],true],['8.318',0,['0,90 N'],true],['8.174',0,['-40 pC'],true],['8.174',0,['40 pC'],false],['8.320',0,['0,39 m'],true],
 ['8.476',0,['1,0*10^13'],true],['8.477',0,['-7,3 µC'],true],['8.477',0,['7,3 µC'],false],['8.478',0,['14400 N'],true],['8.478',1,['0,82 m'],true],['8.479',0,['0,13 µC'],true],['8.479',1,['1,3 µC'],true],['8.480',0,['3,1*10^-8 N'],true],['8.481',0,['1,6*10^-7 N'],true],
 ['8.482',0,['0,115 N'],true],['8.482',1,['0,017 m'],true],['8.483',0,['49 N/m'],true],['8.483',1,['5200 N/m'],true],['8.484',0,['0,95 m'],true],['8.485',0,['0,0090 N'],true],['8.485',1,['0,0090 m/s²'],true],['8.486',0,['0,056 N'],true],['8.486',1,['2,9'],true],['8.487',0,['0,026 m'],true],
 ['8.488',0,['15 nC'],true],['8.488',1,['10 nC'],true],['8.489',0,['10 nC'],true],['8.489',0,['-10 nC'],false],['8.490',0,['0,0045 N'],true],['8.491',0,['3,2*10^17 m/s²'],true],['8.491',1,['1,7*10^14 m/s²'],true],['8.492',0,['100 nC'],true],['8.493',0,['0,50 µC'],true],['8.493',1,['1 µC'],true],['8.494',0,['33 nC'],true]];
 for(const[id,index,inputs,want]of cases){prepare(id,index);for(let j=0;j<inputs.length;j++){const el=document.getElementById('ans-'+j);if(!el){failures.push({id,index,missingField:j});continue;}el.value=inputs[j];}
 let attempts=0;while(!state.answered&&attempts++<inputs.length+1)checkAnswer();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,index,inputs,want,parts:window.reviewAttempt});numeric++;}
 for(const id of ['8.24','8.32','8.34','8.120','8.121','8.122','8.159','8.319'])for(let n=0;n<expandGameTask(BANK.find(q=>q.id===id)).length;n++){
 const q=prepare(id,n);if(!arAlt(q))continue;const list=altLista(q);const correct=list.map((v,i)=>v.ratt?i:-1).filter(i=>i>=0);
 for(const[choices,want]of[[correct,true],[[],false],[list.map((_,i)=>i),false]]){prepare(id,n);state.altValda=new Set(choices);kollaAlt();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,n,choices,want,parts:window.reviewAttempt});alternatives++;}
 }
 return{numeric,alternatives,failures};
 }''')
 print(json.dumps(result));open('/tmp/coulomb-rest-answer.json','w').write(json.dumps(result))
 for id,index in [('8.33',2),('8.120',0),('8.121',1),('8.122',0),('8.160',2),('8.316',0),('8.317',0),('8.319',0),('8.482',0),('8.482',1),('8.483',0),('8.488',0),('8.489',0)]:
  page.evaluate("x=>{state.currentTask=expandGameTask(BANK.find(q=>q.id===x[0]))[x[1]];state.answered=false;state.solutionShown=false;renderTraining();showSolution();document.querySelectorAll('.toast').forEach(e=>e.remove());}",[id,index]);page.wait_for_timeout(500);page.screenshot(path=f'/tmp/coulomb-rest-{id}-{index}.png',full_page=True)
 b.close()
 if result['failures']:raise SystemExit(1)
