"""Faktiska svarsfält och musdragning i fem riktiga PDF-formelblad; ingen XP/DB."""
from pathlib import Path
import json,math,urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 s,h,b=cache[u];route.fulfill(status=s,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)
rows=[]
for id,expr,n in [('1.510','6!',720),('1.509','5!',120),('1.511','7!',5040),('1.512','8!/5!',336),('1.513','4!/2!',12),('1.514','4!',24),('1.528','9!/(2!*7!)',36)]:
 rows += [['matf1',id,0,s,ok] for s,ok in [(expr,True),(str(n),True),(str(n+1),False),(expr+'+1',False)]]
rows += [['matf1','1.510',0,s,ok] for s,ok in [('(3+3)!',True),('6!!',False),('2.5!',False),('6!x',False)]]
for G in [6.67e-11,6.674e-11]:
 models=[('4.346',0,G*50*80/1.5**2*1e9,3),('4.9',0,G*4e24/(5e6)**2,3),('4.9',1,G*4e24/(5e6)**2*70,3),('4.363',0,4*math.pi*G*3200*240000/3,2),('4.364',0,6.6*(3e6)**2/G,2),('4.367',0,math.sqrt(G*1.2e24/5)/1000,2),('4.372',0,3*.21/(4*math.pi*G*220000),2),('4.375',0,4*math.pi*G*4000*280000/3,2)]
 for id,i,n,sf in models:
  rows += [['fy1',id,i,str(n),True],['fy1',id,i,format(n,f'.{sf}g'),True],['fy1',id,i,str(n*2),False]]
rows += [['fy1','4.346',0,s,ok] for s,ok in [('118,58 nN',True),('119 nN',True),('0,119 µN',True),('118 nN',False),('120 nN',False),('119 N',False)]]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page(viewport={'width':1280,'height':1000})
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.goto('http://127.0.0.1:8072/index.html?kurs=matf1');page.wait_for_function('typeof window.nerdamer==="function"')
 checks=page.evaluate(r'''async rows=>{finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};const results=[];for(const [course,id,i,input,want] of rows){await selectCourse(course);const BANK=window[COURSES[course].globals.bank];const q=expandGameTask(BANK.find(t=>t.id===id))[i];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewAttempt=null;renderTraining();document.getElementById('ans-0').value=input;checkAnswer();results.push({course,id,i,input,want,actual:window.reviewAttempt?.every(Boolean)});}return results;}''',rows)
 views=[]
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1000})
  views+=page.evaluate(r'''async ()=>{const out=[];for(const [course,ids] of [['matf1',['1.510','1.509','1.511','1.512','1.513','1.514','1.528']],['fy1',['4.346','4.9','4.363','4.364','4.367','4.372','4.375']]]){await selectCourse(course);const BANK=window[COURSES[course].globals.bank];for(const id of ids)for(const q of expandGameTask(BANK.find(t=>t.id===id))){state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();out.push({course,id:q.id,katexErrors:document.querySelectorAll('.katex-error').length});}}return out;}''')
 pans=[]
 page.set_viewport_size({'width':1280,'height':1000})
 for course in ['matf1','ma1','ma2','mato1','mato2']:
  page.evaluate("""async course=>{await selectCourse(course);let f=document.getElementById('hm-formel')||hjalpSkapaFormel();f.hidden=false;f.classList.remove('dockad');Object.assign(f.style,{left:'20px',top:'20px',width:'500px',height:'600px'});hjalp.zoom=2;return formelRita();}""",course)
  box=page.locator('#hp-sidor');assert box.locator('canvas').count()>0,course
  box.evaluate('(e)=>{e.scrollLeft=100;e.scrollTop=200;}')
  rect=box.bounding_box();x=rect['x']+200;y=rect['y']+200
  before=box.evaluate('(e)=>[e.scrollLeft,e.scrollTop]')
  page.mouse.move(x,y);page.mouse.down();page.mouse.move(x-60,y-80,steps=6);page.mouse.up()
  after=box.evaluate('(e)=>[e.scrollLeft,e.scrollTop]')
  clean=box.evaluate('(e)=>!e.classList.contains("drar")')
  pans.append({'course':course,'before':before,'after':after,'clean':clean,'ok':after[0]>=before[0]+59 and after[1]>=before[1]+79 and clean})
  # Vanlig hjulrullning och zoom fungerar efter dragningen.
  page.mouse.wheel(0,100);page.wait_for_timeout(150)
  assert box.evaluate('(e)=>e.scrollTop')>after[1]
  page.evaluate('formelZoomaTill(1)');assert not box.evaluate('(e)=>e.classList.contains("panbar")')
  page.evaluate('clearTimeout(formelSkarpTimer)')
 page.screenshot(path='/tmp/formel-dragning-1011.png')
 failures=[r for r in checks if r.get('actual')!=r['want']]+[r for r in views if r['katexErrors']]+[r for r in pans if not r['ok']]
 result={'checks':checks,'views':views,'pans':pans,'failures':failures};Path('/tmp/felrapporter-2026-10-11.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps({'checks':len(checks),'views':len(views),'pans':pans,'failures':failures},ensure_ascii=False))
 b.close()
 if failures:raise SystemExit(1)
