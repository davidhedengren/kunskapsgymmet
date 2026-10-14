"""Independent SD parser checks and full answer entry for the two special Sx problems. No DB/XP writes."""
import json,math,statistics,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
models=json.loads((Path(__file__).parents[2]/'Uppgiftslabbet/tools/fixtures/statistik-sx-2026-10-14.json').read_text());cache={};checks=[];views=[];errors=[]
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30)as r:cache[u]=(r.status,r.read(),r.headers.get('Content-Type','application/javascript'))
 st,b,t=cache[u];route.fulfill(status=st,body=b,content_type=t)
with sync_playwright()as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1280,'height':1100});page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));page.on('pageerror',lambda e:errors.append(str(e)));page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.goto('http://127.0.0.1:8083/index.html');page.evaluate("selectCourse('ma2')");page.wait_for_function('window.BANKMA2&&typeof nerdamer==="function"&&typeof renderMathInElement==="function"')
 for m in models:
  for v,path in zip(m['datasets'],m['paths']):
   if path is None:continue
   sample=statistics.stdev(v);population=statistics.pstdev(v)
   result=page.evaluate('''([id,path,sample,population])=>{const q=BANKMA2.find(q=>q.id===id),read=(k)=>path.reduce((v,i)=>v[i],q[k]),f=read('rättSvar'),tol=read('tolerans'),t={...q,svarFormat:'numeriskt'};return {full:delSvarRatt(String(sample),f,null,tol,t,0,'numeriskt'),rounded:delSvarRatt(String(Math.round(sample*100)/100),f,null,tol,t,0,'numeriskt'),population:delSvarRatt(String(population),f,null,tol,t,0,'numeriskt'),gap:Math.abs(sample-population),tol};}''',[m['id'],path,sample,population]);assert result['full'];
   if m['id']not in ['4.365','4.366']:assert result['rounded'],(m['id'],result)
   if result['gap']>result['tol']:assert not result['population'],(m['id'],result)
   checks.append([m['id'],path,result])
 page.evaluate('''()=>{finishAttempt=parts=>{state.answered=true;window.outcome=parts;};window.review=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;window.outcome=null;renderTraining();};}''')
 for id,values,want in [('4.283',['66','sqrt(2400/49)'],[True,True]),('4.283',['66','7,00'],[True,True]),('4.283',['66','6,99'],[True,False]),('4.284',['46,79','53,21'],[True,True]),('4.284',['50-sqrt(72/7)','50+sqrt(72/7)'],[True,True]),('4.284',['50-sqrt(72/7);50+sqrt(72/7)',''],[True,True]),('4.284',['47','53'],[False,False]),('4.284',['46,79','46,79'],[True,False])]:
  result=page.evaluate('''([id,values])=>{review(BANKMA2.find(q=>q.id===id));values.forEach((v,i)=>document.getElementById('ans-'+i).value=v);for(let i=0;i<values.length&&!state.answered;i++)checkAnswer();return outcome;}''',[id,values]);assert result==want,(id,values,result,want);checks.append([id,values,result])
 ids=[m['id']for m in models]+['4.283','4.284','4.372','4.374','4.56','4.109']
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for id in ids:
   cards=page.evaluate('id=>expandGameTask(BANKMA2.find(q=>q.id===id)).length',id)
   for part in range(cards):
    page.evaluate('''([id,part])=>{review(expandGameTask(BANKMA2.find(q=>q.id===id))[part]);showSolution();document.activeElement.blur();}''',[id,part]);page.evaluate('document.fonts.ready');result=page.evaluate('''()=>({latex:document.querySelectorAll('.task .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1,wideMath:[...document.querySelectorAll('.task .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+2).length})''');assert not any(result.values()),(id,part,width,result);views.append([id,part,width,result])
    if width==390 and (id,part)in[('4.283',0),('4.284',0),('4.299',1),('4.365',0)]:page.locator('.task').screenshot(path=f'/tmp/sx-{id}-{part}-mobile.png')
 assert not errors,errors;Path('/tmp/sx-special-browser.json').write_text(json.dumps({'checks':checks,'views':views,'errors':errors},ensure_ascii=False,indent=2));print('PASS',len(checks),'independent parser/field checks;',len(views),'views');browser.close()
