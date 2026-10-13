"""Kontrollerar ordningsantal i riktiga svarsfält utan XP eller Supabase-skrivningar."""
import json,urllib.request,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 status,h,b=cache[u];route.fulfill(status=status,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)
models=[('1.136',6,720,'6!'),('1.509',5,120,'5!'),('1.510',6,720,'6!'),('1.511',7,5040,'7!'),('1.70',7,5040,'7!'),('1.72',None,80640,'2*8!')]
rows=[]
for id,n,target,expression in models:
 good=[str(target),str(target)+',0',expression,expression+' = '+str(target),expression+' sätt',str(target)+' sätt',str(target)+' ordningar',f'n={target}',f'x={target}']
 if n:good+=['*'.join(str(i) for i in range(n,0,-1))]
 bad=[str(target+1),str(target+.01),expression+' = '+str(target+1),f'{target-1} = {target}',expression+'!',expression+'x',str(target)+' personer',str(target)+' kg']
 rows += [[id,input,True] for input in good]+[[id,input,False] for input in bad]
rows += [['1.136',input,ok] for input,ok in [('6*5*4*3*2*1=6!=720',True),('5!=720',False),('6!=720 sätt',True),('6! olika sätt',True),('720sätt',True),('6!!',False),('2.5!',False),('sin(0)=720',False),('lg720=720',False),('720==720',False)]]
url=sys.argv[sys.argv.index('--url')+1] if '--url' in sys.argv else 'http://127.0.0.1:8083/index.html'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page(viewport={'width':1280,'height':1100});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.goto(url);page.evaluate("selectCourse('matf1')");page.wait_for_function('window.BANKMATF1&&typeof nerdamer==="function"')
 checks=page.evaluate('''rows=>{
 finishAttempt=r=>{window.testResult=r;state.answered=true;};return rows.map(([id,input,want])=>{
  const q=BANKMATF1.find(q=>q.id===id);state.currentTask=q;state.answered=false;state.partResults=[];state.partIndex=0;state.solutionShown=false;window.testResult=null;renderTraining();
  const fields=document.querySelectorAll('[id^="ans-"]');if(fields.length!==1)throw Error(id+' fältantal '+fields.length);
  fields[0].value=input;checkAnswer();return{id,input,want,actual:window.testResult?.every(Boolean)};
 });}''',rows)
 for r in checks:assert r['actual']==r['want'],r
 views=[]
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for id,_,_,_ in models:
   view=page.evaluate('''id=>{const q=BANKMATF1.find(q=>q.id===id);state.currentTask=q;state.answered=false;state.partResults=[];state.partIndex=0;state.solutionShown=false;renderTraining();showSolution();return{id,fields:document.querySelectorAll('[id^="ans-"]').length,katexErrors:document.querySelectorAll('.task .katex-error').length};}''',id);views.append(dict(width=width,**view));assert view['fields']==1 and view['katexErrors']==0,view
   if id=='1.136':page.locator('.task').screenshot(path=f'/tmp/matf1-1.136-{width}.png')
 assert not errors,errors
 report={'url':url,'checks':checks,'views':views,'javascriptErrors':errors};Path('/tmp/antal-satt-browser.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print('PASS',len(checks),'riktiga svarsfält och',len(views),'mobil-/datorvisningar; inga JavaScript-fel');b.close()
