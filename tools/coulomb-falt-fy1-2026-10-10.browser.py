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
 const prepare=(id,index)=>{const q=expandGameTask(BANK.find(q=>q.id===id))[index];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.altValda=new Set();window.reviewAttempt=null;renderTraining();return q;};
 const cases=[['8.71',1,'0 N',true],['8.71',1,'84,3 µN',false],['8.68',1,'260 µN',true],['8.68',1,'-260 µN',false],['8.57',1,'86 µN',true],['8.74',1,'0,00022 N',true],['8.70',0,'4,9 mm',true],['8.70',0,'0,0049 m',true],['8.70',0,'4,9 m',false],['8.67',0,'+4 µC',true],['8.67',0,'-4 µC',false],['8.72',1,'0,00013 N',true],['8.72',2,'0,0022 N',true],['8.21',1,'0,24 mN',true],['8.21',2,'0,060 mN',true],['8.23',1,'0,00014 N',true],['8.321',0,'20000 N/C',true],['8.321',0,'20 kN/C',true],['8.321',0,'20000 V/m',true],['8.321',0,'20000 N',false],['8.322',0,'0,012 N',true],['8.323',0,'4,3 µC',true],['8.326',0,'30000 N/C',true],['8.327',0,'4,0*10^-16 N',true],['8.327',0,'4,0*10^-13 N',false],['8.328',0,'3,1 µC',true],['8.329',0,'280 V',true],['8.330',0,'4,0*10^-13 N',true],['8.331',0,'0,00072 N',true]];
 const failures=[];let numeric=0,alternatives=0;
 for(const[id,index,input,want]of cases){prepare(id,index);document.getElementById('ans-0').value=input;checkAnswer();const actual=window.reviewAttempt?.every(Boolean);if(actual!==want)failures.push({id,index,input,want,actual,parts:window.reviewAttempt});numeric++;}
 for(const id of ['8.21','8.23','8.57','8.67','8.68','8.71','8.74','8.324','8.325'])for(let n=0;n<expandGameTask(BANK.find(q=>q.id===id)).length;n++){
  const q=prepare(id,n);if(!arAlt(q))continue;
  for(let i=0;i<q.alternativ.length;i++){prepare(id,n);const opts=altLista(q);state.altValda=new Set([i]);kollaAlt();if(window.reviewAttempt?.every(Boolean)!==!!opts[i].ratt)failures.push({id,n,i,type:'alternative'});alternatives++;}
 }
 let limitedUnitConversions=0;
 for(const id of ['8.326','8.333','8.336','8.337','8.343','8.341']){
  const q=prepare(id,0);const other=q.svarEnhet==='N/C'?'V/m':'N/C';
  for(const [unit,want]of [[other,true],['N',false]]){
   prepare(id,0);document.getElementById('ans-0').value=String(q.rättSvar)+' '+unit;checkAnswer();
   if(window.reviewAttempt?.every(Boolean)!==want)failures.push({id,type:'limited-unit-conversion',unit,want,parts:window.reviewAttempt});limitedUnitConversions++;
  }
 }
 return{numeric,alternatives,limitedUnitConversions,failures};
 }''')
 print(json.dumps(result));open('/tmp/fy1-coulomb-falt-20261010-answer.json','w').write(json.dumps(result))
 for id,index in [('8.57',1),('8.67',0),('8.68',1),('8.70',0),('8.71',1),('8.72',1),('8.21',1),('8.23',2),('8.329',0)]:
  page.evaluate("x=>{state.currentTask=expandGameTask(BANK.find(q=>q.id===x[0]))[x[1]];state.answered=false;state.solutionShown=false;renderTraining();showSolution();}",[id,index]);page.wait_for_timeout(500);page.screenshot(path='/tmp/fy1-20261010-'+id+'.png',full_page=True)
 b.close()
 if result['failures']:raise SystemExit(1)
