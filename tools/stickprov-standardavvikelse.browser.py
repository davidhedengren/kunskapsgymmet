"""Stickprovsgranskning: riktiga fält, korrekt/felaktigt mått och alla granskade kort. Ingen XP/DB."""
import json,urllib.request,pathlib
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 status,headers,body=cache[u];route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)
def scope():
 # Granskningsloggen är reproducerbart kontrakt, utan fullständiga bankobjekt.
 p=pathlib.Path(__file__).resolve().parents[2]/'Uppgiftslabbet/agent/STICKPROV_STANDARDAVVIKELSE_2026-10-11.json'
 if p.exists():return json.loads(p.read_text())['reviewed']
 return [{'course':{'uppgifter.js':'fy1','uppgifterma1.js':'ma1','uppgifterma2.js':'ma2','uppgiftermatf1.js':'matf1'}[r['file']],'id':r['id']} for r in json.loads(pathlib.Path('/tmp/stickprov-review-scope.json').read_text())]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
 page.goto('http://127.0.0.1:8083/index.html?kurs=ma2');page.wait_for_function('typeof renderMathInElement==="function" && typeof expandGameTask==="function"')
 page.evaluate('finishAttempt=r=>{window.reviewResult=r;state.answered=true;}')
 checks=page.evaluate(r'''async()=>{
 const groups={ma2:[['4.28',1,['3,5'],true],['4.28',1,['sqrt(12)'],true],['4.28',1,['3,4'],false],['4.28',1,['3,6'],false],['4.28',1,['3,79473319'],false],
 ['4.299',1,['0,23','0,65'],true],['4.299',1,['0,226691175','0,651707161'],true],['4.299',1,['0,25','0,71'],false],['4.299',1,['0,65','0,23'],false],['4.299',1,['0,24','0,65'],false],
 ['4.302',0,['8','2,92'],true],['4.302',0,['8','2,915475947'],true],['4.302',0,['8','2,93'],false],['4.302',0,['8','3,37'],false],['4.302',1,['8','2,61'],true],['4.302',1,['8','2,60'],false],
 ['4.241',0,['0','4','0','4'],true],['4.241',0,['4','0','4','0'],false],['4.241',1,['1,26','1,79'],true],['4.241',1,['1,79','1,26'],false],['4.241',1,['1,41','2'],false],
 ['5.94',0,['21','0,32'],true],['5.94',0,['21','0,28'],false],['5.71',0,['21','0,71','21','1,41'],true],['5.71',0,['21','0,63','21','1,26'],false],['4.306',0,['75%'],true]],
 ma1:[['5.571',0,['32','28','20','50,0%'],true],['5.571',0,['32','28','20','50'],true],['5.571',0,['32','28','20','47,5'],false],['5.571',0,['28','32','20','50'],false],['5.99',0,['30','33','27'],true],['5.99',0,['33','30','27'],false],
 ['5.102',0,['ja'],true],['5.102',0,['nej'],false],['5.102',1,['nej'],true],['5.102',2,['ja'],true],['5.97',0,['falskt'],true],['5.97',1,['sant'],true],['5.174',0,['B'],true],['5.180',0,['A'],true],['5.545',0,['D'],true]],
 fy1:[['2.175',0,['5140'],true],['2.175',0,['5142,857142857 kg'],true],['2.175',0,['5,14e3 kg'],true],['2.175',0,['5150'],false],['2.175',0,['5140 g'],false]],
 matf1:[['1.103',0,['28/55'],true],['1.103',0,['50,9%'],true],['1.103',0,['0,5091'],true],['1.103',0,['0,25'],false]]};let out=[];
 for(const[course,tests]of Object.entries(groups)){await selectCourse(course);const bank=state.data.bank;
 for(const[id,part,values,want]of tests){const q=expandGameTask(bank.find(t=>t.id===id))[part];q.manuellKomplettering=false;
 state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;renderTraining();values.forEach((v,i)=>document.getElementById('ans-'+i).value=v);
 for(let i=0;i<values.length&&!state.answered;i++)checkAnswer();out.push({course,id,part,values,want,actual:window.reviewResult?.every(Boolean)===true});
 }}return out;
 }''')
 assert all(x['want']==x['actual'] for x in checks),[x for x in checks if x['want']!=x['actual']]
 views=[];issues=[];contract=[]
 for course in ['ma1','ma2','fy1','matf1']:
  page.evaluate('async c=>await selectCourse(c)',course);ids=[r['id'] for r in scope() if r['course']==course]
  # Här är frågorna självständigt bedömda i masterloggen; detta kontrollerar parser-/fältkontrakt.
  contract+=page.evaluate(r'''ids=>{let out=[];
  for(const id of ids)for(const q0 of expandGameTask(state.data.bank.find(t=>t.id===id))){const q={...q0,manuellKomplettering:false};let layout=answerLayout(q);
   if(!layout.info.auto||layout.delAuto.some(x=>!x))continue;
   const values=layout.plan?layout.plan.rutor.map(r=>layout.plan.delar[r.del].svar[r.plats]):layout.info.answers;
   if(!values.length||values.some(v=>v==null||Array.isArray(v)))continue;
   state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;renderTraining();
   values.forEach((v,i)=>document.getElementById('ans-'+i).value=String(v));for(let i=0;i<values.length&&!state.answered;i++)checkAnswer();
   out.push({id:q.id,values,correct:window.reviewResult?.every(Boolean)===true});
  }return out;}''',ids)
  for width in [390,1280]:
   page.set_viewport_size({'width':width,'height':1000})
   for id in ids:
    count=page.evaluate('id=>expandGameTask(state.data.bank.find(t=>t.id===id)).length',id)
    for part in range(count):
     page.evaluate('''x=>{state.currentTask=expandGameTask(state.data.bank.find(t=>t.id===x[0]))[x[1]];state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();}''',[id,part])
     quality=page.evaluate(r'''()=>({page:document.documentElement.scrollWidth<=innerWidth,katex:document.querySelectorAll('.katex-error').length===0,formulas:Array.from(document.querySelectorAll('.sol .katex-display')).every(e=>e.scrollWidth<=e.clientWidth+2),raw:!/\[[(]/.test(document.querySelector('.sol')?.innerText||''),table:Array.from(document.querySelectorAll('.tbody table')).every(e=>e.getBoundingClientRect().width<=e.parentElement.getBoundingClientRect().width+1)})''')
     view={'course':course,'id':id,'part':part,'width':width};views.append(view)
     if not all(quality.values()):issues.append({**view,**quality})
     if (id,part) in [('5.571',0),('5.545',0),('4.28',1),('4.241',1),('4.299',1),('2.175',0)]:page.locator('.tshell').screenshot(path=f'/tmp/stickprov-{course}-{id}-{part}-{width}.png')
 result={'directChecks':len(checks),'contractChecks':len(contract),'contractFailures':[x for x in contract if not x['correct']],'views':len(views),'viewIssues':issues,'javascriptErrors':errors};pathlib.Path('/tmp/stickprov-browser-result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False))
 assert not result['contractFailures'] and not issues and not errors,result
 browser.close()
