"""Hela Elektricitet: körbara kortkontrakt och faktisk visning. Fysik räknas separat."""
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
  let numeric=0,alternatives=0;
  const cases=[['8.78',0,'16 C',true],['8.78',0,'12 C',false],['8.79',0,'1,5 h',true],['8.79',0,'1,667 h',false],['8.197',0,'140 C',true],['8.191',0,'2,3 A',true],['8.465',0,'324000 C',true],['8.470',1,'17 K',true],['8.143',2,'43',true],['8.146',2,'3,13 %',true],['8.515',0,'20 µJ',true],['8.515',0,'-20 µJ',false],['8.250',0,'2,1 A',true],['8.251',0,'1,8 A',true],['8.51',3,'160 Ω',true],['8.304',0,'0,22 N',true],['8.306',0,'27,5 cm',true],['8.306',0,'28 cm',true],['8.306',0,'0,275 m',true],['8.306',0,'27,5 m',false],['8.307',0,'0,60 N',true],['8.308',0,'0,13 N',true],['8.308',0,'0,51 N',false]];
  for(const [id,index,input,want] of cases){
   const q=prepare(id,index);document.getElementById('ans-0').value=input;checkAnswer();
   if(window.reviewAttempt?.every(Boolean)!==want)throw Error('UI '+id+' '+input+' '+JSON.stringify(window.reviewAttempt));numeric++;
  }
  for(const [id,index,values] of [['8.49',1,['3 V','6 V']],['8.103',1,['4 V','8 V']],['8.117',1,['1,4 W','1,2 W','0,2 W']],['8.144',2,['10 V','0 V']],['8.149',2,['4 V','-8 V']],['8.150',3,['0 V','-5 V','-12 V']],['8.40',2,['0,088 W','0,132 W']],['8.131',2,['2 V','3 V','5 V']],['8.16',0,['50 mA','5 mA']],['8.19',1,['30 mA','20 mA']],['8.136',1,['2 A','1 A']],['8.141',1,['16 V','8 V']]]){
   prepare(id,index);values.forEach((v,i)=>{document.getElementById('ans-'+i).value=v;checkAnswer();});
   if(!window.reviewAttempt?.every(Boolean))throw Error('Ordnade fält '+id+' '+JSON.stringify(window.reviewAttempt));numeric++;
   prepare(id,index);values.slice().reverse().forEach((v,i)=>{document.getElementById('ans-'+i).value=v;checkAnswer();});
   if(window.reviewAttempt?.every(Boolean)!==false)throw Error('Omvänd ordning godkänd '+id);numeric++;
  }
  for(const id of ['5.364','8.303','8.309','8.73','8.144','8.150','8.151','8.124','8.125','8.132','8.516','8.517'])for(let n=0;n<expandGameTask(BANK.find(q=>q.id===id)).length;n++){
   const q=prepare(id,n);if(!arAlt(q))continue;
   for(let i=0;i<q.alternativ.length;i++){
    prepare(id,n);const opts=altLista(q);state.altValda=new Set([i]);kollaAlt();
    if(window.reviewAttempt?.every(Boolean)!==!!opts[i].ratt)throw Error('Alternativ '+id+' '+n+' '+i);alternatives++;
   }
  }
  return {numeric,alternatives};
 }''')
 print(json.dumps(result))
 for id in ['8.49','8.515','8.516','8.517','8.20','8.64','8.140','8.244','8.62','8.16','8.245','8.136','8.141','8.73','8.306','8.307','8.308','8.309']:
  page.evaluate("id=>{state.currentTask=expandGameTask(BANK.find(q=>q.id===id))[0];state.answered=false;state.solutionShown=false;renderTraining();showSolution();}",id)
  page.wait_for_timeout(500)
  page.screenshot(path='/tmp/electricity-visual-'+id+'.png',full_page=True)
 b.close()
