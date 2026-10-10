"""Coulomb och fält: faktisk rättning; enhetsgranskning märks separat."""
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
 const cases=[['8.11',0,'4 kV/m',true],['8.11',1,'20 µN',true],['8.29',1,'3000 N/C',true],['8.30',0,'58 kV/m',true],['8.47',0,'5000 N/C',true],['8.47',1,'8,8*10^14 m/s²',true],['8.47',2,'1,8 mm',true],['8.48',0,'4,0 cm',true],['8.48',0,'0,04 m',true],['8.59',1,'8,8 kV/m',true],['8.60',1,'1,9 µN',true],['8.69',1,'9,8 ng',true],['8.102',0,'2,4 kV/m',true],['8.104',2,'3,2*10^-5 N',true],['8.104',2,'-3,2*10^-5 N',false],['8.104',3,'16000 m/s²',true],['8.105',0,'0,015 m',true],['8.106',0,'140000 V/m',true],['8.106',1,'35000 N/C',true],['8.114',0,'42 V',true],['8.115',2,'9,0*10^5 V/m',true],['8.115',3,'2,2*10^5 V/m',true],['8.168',0,'3 kV/m',true],['8.170',1,'1,2 mg',true],['8.337',0,'4,3*10^5 N/C',true],['8.339',0,'5,0 µC',true],['8.339',0,'-5,0 µC',false],['8.340',0,'-3 µC',true],['8.340',0,'3 µC',false],['8.348',0,'3,6*10^6 N/C',true],['8.349',0,'3,5*10^15 m/s²',true],['8.350',0,'1900 N/C',true],['8.357',0,'0 N/C',true],['8.357',0,'599200 N/C',false]];
 for(const[id,index,input,want]of cases){prepare(id,index);document.getElementById('ans-0').value=input;checkAnswer();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,index,input,want,parts:window.reviewAttempt});numeric++;}
 for(const id of ['8.11','8.29','8.47','8.60','8.69','8.100','8.101','8.105','8.115','8.168','8.170','8.344','8.354'])for(let n=0;n<expandGameTask(BANK.find(q=>q.id===id)).length;n++){
 const q=prepare(id,n);if(!arAlt(q))continue;const list=altLista(q);const correct=list.map((v,i)=>v.ratt?i:-1).filter(i=>i>=0);
 for(const [choices,want] of [[correct,true],[correct.filter((_,i)=>i!==0),false],[list.map((_,i)=>i),false]]){prepare(id,n);state.altValda=new Set(choices);kollaAlt();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,n,choices,want,parts:window.reviewAttempt});alternatives++;}
 }
 return{numeric,alternatives,failures};
 }''')
 print(json.dumps(result));open('/tmp/falt-hela-answer.json','w').write(json.dumps(result))
 for id,index in [('8.47',0),('8.47',2),('8.48',0),('8.60',0),('8.100',0),('8.106',0),('8.115',0),('8.348',0),('8.354',0),('8.357',0),('8.350',0)]:
  page.evaluate("x=>{state.currentTask=expandGameTask(BANK.find(q=>q.id===x[0]))[x[1]];state.answered=false;state.solutionShown=false;renderTraining();showSolution();}",[id,index]);page.wait_for_timeout(500);page.screenshot(path=f'/tmp/falt-hela-{id}-{index}.png',full_page=True)
 b.close()
 if result['failures']:raise SystemExit(1)
