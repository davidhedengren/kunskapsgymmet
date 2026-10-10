"""Faktisk rättning av #5.385 och fem analoger; inga XP- eller databasskrivningar."""
from pathlib import Path
import json,urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 s,h,b=cache[u];route.fulfill(status=s,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)

cases=[['5.385',0,x,ok] for x,ok in [('180',True),('180 N',True),('180,0 N',True),('0,180 kN',True),('1.80e2 N',True),('-180 N',False),('20 N',False),('1800 N',False),('0,180 N',False),('179 N',False)]]
for id,i,value,wrong in [('5.381',0,-2.835,2.835),('5.381',1,-2.84/.055,2.84/.055),('5.382',0,.420*18/650,.420*18/650*2),('5.382',1,.420*(18+13)/650,.420*(18-13)/650),('5.383',0,75*(15+2.6)/.15,75*(15-2.6)/.15),('5.384',0,.145*(55+45),.145*(55-45)),('5.384',1,14.5/.002,14.5/.02),('5.393',0,.06*(50+20)/84,.06*(50-20)/84)]:
 cases.extend([[id,i,str(value),True],[id,i,str(wrong),False]])
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page()
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.goto('http://127.0.0.1:8072/index.html?kurs=fy1');page.evaluate("selectCourse('fy1')");page.wait_for_function('window.BANK && typeof window.nerdamer==="function"')
 checks=page.evaluate(r'''rows=>{finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};return rows.map(([id,i,input,want])=>{const q=expandGameTask(BANK.find(t=>t.id===id))[i];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewAttempt=null;renderTraining();document.getElementById('ans-0').value=input;checkAnswer();return{id,i,input,want,actual:window.reviewAttempt?.every(Boolean)};});}''',cases)
 views=[]
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1000})
  views+=page.evaluate(r'''()=>{const out=[];for(const id of ['5.385','5.381','5.382','5.383','5.384','5.393'])for(const q of expandGameTask(BANK.find(t=>t.id===id))){state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();out.push({id:q.id,katexErrors:document.querySelectorAll('.katex-error').length});}return out;}''')
 failures=[r for r in checks if r.get('actual')!=r['want']]+[r for r in views if r['katexErrors']]
 result={'checks':checks,'views':views,'failures':failures};print(json.dumps(result,ensure_ascii=False));Path('/tmp/felrapport-5-385.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
 b.close()
 if failures:raise SystemExit(1)
