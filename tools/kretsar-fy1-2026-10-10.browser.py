"""Kretsar och resistans: faktisk rättning med kortens givna data, enheter och avrundning."""
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
 ['8.1',0,['5,8'],true],['8.1',0,['33,9'],false],['8.188',0,['1,3 A'],true],['8.188',0,['1300 mA'],true],
 ['8.8',0,['0,57 Ω'],true],['8.8',1,['5,7 V'],true],['8.8',2,['57 W'],true],
 ['8.28',0,['0,196 mm²'],true],['8.28',1,['0,70 Ω'],true],['8.28',2,['2,1 V'],true],
 ['8.38',0,['3,8 mA'],true],['8.38',1,['460 Ω'],true],['8.61',0,['54 mΩ'],true],['8.61',1,['8,1 mV'],true],
 ['8.76',0,['2,3 mA','230 mA'],true],['8.76',0,['230 mA','2,3 mA'],false],
 ['8.80',0,['0,000001 m²'],true],['8.80',0,['0,001 m²'],false],['8.80',1,['0,17 Ω'],true],['8.80',2,['0,34 Ω'],true],['8.80',3,['0,085 Ω'],true],
 ['8.82',0,['48 Ω'],true],['8.196',0,['0,80 mm²'],true],['8.198',0,['10 m'],true],['8.200',0,['0,34 Ω'],true],
 ['8.84',0,['2,0 A'],true],['8.84',1,['0,52 Ω'],true],['8.84',2,['0,95 V','11,0 V'],true],['8.84',2,['1,032 V','10,968 V'],false],
 ['8.113',0,['0,80 mm'],true],['8.157',0,['880 Ω'],true],['8.157',1,['29,5'],true],['8.157',2,['7,7 A'],true],
 ['8.158',0,['3 V'],true],['8.158',1,['100 Ω'],true],['8.201',0,['4'],true],['8.175',0,['0,4 A'],true],['8.176',0,['36 Ω'],true],['8.177',0,['0,14 Ω'],true],['8.178',0,['4'],true],['8.179',0,['0,30 A'],true],['8.180',0,['160 Ω'],true],['8.204',0,['4'],true],
 ['8.410',0,['16 Ω'],true],['8.411',0,['1,0e-7 Ωm'],true],['8.411',0,['0,10 µΩm'],true],['8.412',0,['74 m'],true],['8.413',0,['0,052 Ω'],true],['8.414',0,['0,47 mm'],true],['8.415',0,['44 %'],true],['8.415',0,['0,44'],true],['8.415',0,['0,44 %'],false],
 ['8.416',0,['11,25 Ω'],true],['8.416',1,['3,75 Ω'],true],['8.417',0,['189 Ω'],true],['8.418',0,['0,13 Ω'],true],['8.419',0,['0,040 Ω'],true],['8.420',0,['50 Ωm'],true],['8.421',0,['0,55 Ω'],true],['8.422',0,['0,14 mΩ'],true],['8.422',0,['0,00014 Ω'],true],['8.422',0,['0,14 Ω'],false],['8.423',0,['1,3 Ω'],true],
 ['8.424',0,['2,56 m'],true],['8.424',1,['0,235 mm'],true],['8.425',0,['39 V'],true],['8.426',0,['8,7 m'],true],['8.427',0,['13 mV'],true],['8.428',0,['3,0 A'],true],['8.429',0,['47 m'],true],['8.430',0,['1,6 mm'],true],['8.431',0,['58 m'],true],['8.432',0,['0,26 mV'],true],['8.433',0,['1,0 A'],true],['8.434',0,['930 kg'],true],
 ['8.435',0,['1,7 V'],true],['8.435',1,['4,3 A'],true],['8.436',0,['0,14 Ω'],true],['8.436',1,['58 mV'],true],['8.437',0,['15 V'],true],['8.438',0,['370 m'],true],['8.439',0,['6,3 Ω'],true],
 ['8.440',0,['28 K'],true],['8.440',0,['28 °C'],true],['8.440',0,['28'],true],['8.440',0,['301 K'],false],['8.440',0,['28 V'],false],['8.441',0,['0,0043 1/K'],true],['8.442',0,['2400 °C'],true],['8.442',0,['2400 K'],false],['8.443',0,['40,4 °C'],true],['8.443',0,['40,0 °C'],false],['8.444',0,['9,3 %'],true],['8.472',0,['41 µV'],true],['8.473',0,['15 pA'],true],['8.473',1,['4,7e7'],true],['8.474',0,['16 Ω'],true]];
 for(const[id,index,inputs,want]of cases){prepare(id,index);for(let j=0;j<inputs.length;j++){const el=document.getElementById('ans-'+j);if(!el){failures.push({id,index,missingField:j});continue;}el.value=inputs[j];}
 let attempts=0;while(!state.answered&&attempts++<inputs.length+1)checkAnswer();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,index,inputs,want,parts:window.reviewAttempt});numeric++;}
 for(const id of ['8.8','8.76','8.82','8.158','8.195'])for(let n=0;n<expandGameTask(BANK.find(q=>q.id===id)).length;n++){
 const q=prepare(id,n);if(!arAlt(q))continue;const list=altLista(q);const correct=list.map((v,i)=>v.ratt?i:-1).filter(i=>i>=0);
 for(const[choices,want]of[[correct,true],[[],false],[list.map((_,i)=>i),false]]){prepare(id,n);state.altValda=new Set(choices);kollaAlt();if((window.reviewAttempt?.every(Boolean)===true)!==want)failures.push({id,n,choices,want,parts:window.reviewAttempt});alternatives++;}
 }
 return{numeric,alternatives,failures};
 }''')
 print(json.dumps(result));open('/tmp/kretsar-answer.json','w').write(json.dumps(result))
 for id,index in [('8.84',2),('8.158',0),('8.410',0),('8.422',0),('8.424',0),('8.440',0),('8.473',1)]:
  page.evaluate("x=>{state.currentTask=expandGameTask(BANK.find(q=>q.id===x[0]))[x[1]];state.answered=false;state.solutionShown=false;renderTraining();showSolution();document.querySelectorAll('.toast').forEach(e=>e.remove());}",[id,index]);page.wait_for_timeout(500);page.screenshot(path=f'/tmp/kretsar-{id}-{index}.png',full_page=True)
 b.close()
 if result['failures']:raise SystemExit(1)
