"""Faktisk rättning av #6.438 och fem analoger; inga XP- eller databasskrivningar."""
from pathlib import Path
import json,urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 s,h,b=cache[u];route.fulfill(status=s,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)

cases=[['6.438',0,x,ok] for x,ok in [('412',True),('412 Pa',True),('412,44 Pa',True),('0,412 kPa',True),('4.12e2 Pa',True),('413 Pa',False),('400 Pa',False),('412 kPa',False),('4120 Pa',False),('-412 Pa',False)]]
g=9.82
models=[('6.436',[998*g*10,101300+998*g*20,(350000-101300)/(998*g)]),('6.437',[101300+1025*g*55,1025*g*3200,999*101300/(1025*g)]),('6.444',[13600*g*.104,13600*g*.104+1060*g*1.37,13600*g*.104-1060*g*(1.75-1.37)]),('6.445',[1060*g*1.65,17200*.000094]),('6.464',[101300+13600*g*.180,101300-13600*g*.055,(175000-101300)/(13600*g)])]
for id,values in models:
 for i,value in enumerate(values):cases.extend([[id,i,str(value),True],[id,i,str(float(format(value,'.3g'))),True],[id,i,str(value*2),False]])
cases.extend([[id,i,str(value)+' k'+('N' if id=='6.445' and i==1 else 'm' if (id=='6.436' and i==2) or (id in ['6.437','6.464'] and i==2) else 'Pa'),False] for id,values in models for i,value in enumerate(values)])
cases.extend([['6.445',1,'1,6 N',True],['6.445',1,'1,7 N',False]])
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page()
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.goto('http://127.0.0.1:8072/index.html?kurs=fy1');page.evaluate("selectCourse('fy1')");page.wait_for_function('window.BANK && typeof window.nerdamer==="function"')
 checks=page.evaluate(r'''rows=>{finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};return rows.map(([id,i,input,want])=>{const q=expandGameTask(BANK.find(t=>t.id===id))[i];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewAttempt=null;renderTraining();document.getElementById('ans-0').value=input;checkAnswer();return{id,i,input,want,actual:window.reviewAttempt?.every(Boolean)};});}''',cases)
 views=[]
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1000})
  views+=page.evaluate(r'''()=>{const out=[];for(const id of ['6.438','6.436','6.437','6.444','6.445','6.464'])for(const q of expandGameTask(BANK.find(t=>t.id===id))){state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();out.push({id:q.id,katexErrors:document.querySelectorAll('.katex-error').length});}return out;}''')
 failures=[r for r in checks if r.get('actual')!=r['want']]+[r for r in views if r['katexErrors']]
 result={'checks':checks,'views':views,'failures':failures};print(json.dumps(result,ensure_ascii=False));Path('/tmp/felrapport-6-438.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
 b.close()
 if failures:raise SystemExit(1)
