"""Real answer fields, empty-set button, alternatives, selection and new figure layouts. No production writes."""
import json,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
cache={};answers=[];views=[];errors=[]
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,r.read(),r.headers.get('Content-Type','application/javascript'))
 st,b,t=cache[u];route.fulfill(status=st,body=b,content_type=t)
def configure(page):
 page.on('pageerror',lambda e:errors.append(str(e)));page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1280,'height':1100});configure(page);page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.goto('http://127.0.0.1:8083/index.html');page.evaluate("selectCourse('mato1')");page.wait_for_function('window.BANKMATO1&&typeof nerdamer==="function"&&typeof renderMathInElement==="function"')
 page.evaluate('''()=>{finishAttempt=parts=>{state.answered=true;window.outcome=parts;};window.review=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.altValda=new Set();state.altOrdningId=null;window.outcome=null;renderTraining();};}''')
 roots={'1.451':[-3,3],'1.20':[-2,8],'1.30':[3,5],'1.95':[-5,5],'1.237':[-4,4],'1.25':[-5,9]}
 for id,a in roots.items():
  for inputs,want in [([str(a[0]),str(a[1])],True),([str(a[1]),str(a[0])],True),([f'{a[0]};{a[1]}',''],True),([f'x={a[1]} eller x={a[0]}',''],True),(['',f'{{{a[0]},{a[1]}}}'],True),([f'{a[0]},{a[1]}',''],True),([str(a[0]),''],False),([f'{a[0]};{a[0]}',''],False),([f'{a[0]};{a[1]};99',''],False),([f'{a[0]};99',''],False),([f'{a[0]};{a[1]}N',''],False)]:
   r=page.evaluate('''([id,inputs])=>{review(BANKMATO1.find(q=>q.id===id));inputs.forEach((a,i)=>document.getElementById('ans-'+i).value=a);document.getElementById('kollaknapp').click();return outcome;}''',[id,inputs]);assert (r==[True,True])==want,(id,inputs,r,want);answers.append([id,inputs,r])
 for input,want in [('±3',True),('x=+-3',True),('3 eller -3',True),('3,3',False),('x=3 y=-3',False)]:
  r=page.evaluate('''a=>{review(BANKMATO1.find(q=>q.id==='1.451'));document.getElementById('ans-0').value=a;checkAnswer();return outcome;}''',input);assert (r==[True,True])==want,(input,r);answers.append(['1.451',input,r])
 # Ordered coordinates keep distinct fields; combined values must not complete the task.
 r=page.evaluate("()=>{const q=BANKMATO1.find(q=>q.id==='1.65');review(q);document.getElementById('ans-0').value='3;2';checkAnswer();return {result:outcome,combined:samlatMangdsvarTillatet(q,answerLayout(q))};}");assert not r['combined'] and r['result']!=[True,True];answers.append(['coordinates',r])
 page.evaluate("selectCourse('matf1')");page.wait_for_function('window.BANKMATF1')
 # The actual symbol button inserts at the selected position, focuses the field and submits.
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  page.evaluate("()=>review(expandGameTask(BANKMATF1.find(q=>q.id==='1.06'))[1])");button=page.get_by_role('button',name='∅',exact=True);assert button.get_attribute('title')=='Tomma mängden';button.click();assert page.locator('#ans-0').input_value()=='∅';page.locator('#kollaknapp').click();assert page.evaluate('outcome')==[True];answers.append(['empty-button',width,True])
  page.evaluate("()=>{review(expandGameTask(BANKMATF1.find(q=>q.id==='1.06'))[1]);const el=document.getElementById('ans-0');el.value='{}';el.focus();el.setSelectionRange(0,2);}");button.click();assert page.locator('#ans-0').input_value()=='∅';assert page.evaluate('document.activeElement.id')=='ans-0'
 for id in ['1.06','1.787','1.788','1.789','1.781']:
  for a,want in [('∅',True),('{}',True),('tomma mängden',True),('{0}',False)]:
   r=page.evaluate('''([id,a])=>{const parent=BANKMATF1.find(q=>q.id===id);const cards=expandGameTask(parent);const card=cards.find(q=>q.rättSvar==='{}')||parent;review(card);const info=expectedAnswersForTask(card);info.answers.forEach((value,i)=>{document.getElementById('ans-'+i).value=value==='{}'?a:value;checkAnswer();});return outcome||state.partResults;}''',[id,a]);assert bool(r) and (all(r)==want),(id,a,r);answers.append([id,a,r])
 # Five related combinatorial tasks retain their mathematical answer (independent counts).
 for id,a in [('1.21',33649),('1.24',10000),('1.25',2100),('1.26',622080),('1.27',2598960)]:
  for input,want in [(str(a),True),(str(a+1),False)]:
   r=page.evaluate('''([id,a])=>{review(BANKMATF1.find(q=>q.id===id));document.getElementById('ans-0').value=a;checkAnswer();return outcome;}''',[id,input]);assert r==[want],(id,input,r);answers.append([id,input,r])
 for id,expression in [('1.21','23!/(5!*18!)'),('1.24','10^4'),('1.25','5*10*6*7'),('1.26','3!*6!*4!*3!'),('1.27','52!/(5!*47!)')]:
  r=page.evaluate("""([id,a])=>{review(BANKMATF1.find(q=>q.id===id));document.getElementById('ans-0').value=a;checkAnswer();return outcome;}""",[id,expression]);assert r==[True],(id,expression,r);answers.append([id,expression,r])
 for id in ['1.20','3.329']:
  for selected in [[0],[1],[2],[3],[0,1]]:
   r=page.evaluate('''([id,selected])=>{review(BANKMATF1.find(q=>q.id===id));selected.forEach(i=>document.getElementById('alt-'+state.altOrdning.indexOf(i)).click());document.getElementById('altknapp').click();return outcome;}''',[id,selected]);assert r==[selected==[0]],(id,selected,r);answers.append([id,selected,r])
 approx=['3.277','3.278','3.280','3.281','3.324','3.325','3.326','3.327','3.328','3.99','3.18','3.08','3.64','3.26','3.116','3.41','3.42','3.63']
 for id in approx:
  q=page.evaluate('id=>BANKMATF1.find(q=>q.id===id)',id)
  # Mixed manual explanation in #3.08: review its self-contained numeric card.
  a=q['rättSvar'][0] if isinstance(q['rättSvar'],list) else q['rättSvar']
  for input,want in [(str(a).replace('.',','),True),(str(float(a)+2),False)]:
   r=page.evaluate('''([id,a])=>{const q=expandGameTask(BANKMATF1.find(q=>q.id===id))[0];review(q);document.getElementById('ans-0').value=a;checkAnswer();return outcome||state.partResults;}''',[id,input]);assert r[0]==want,(id,input,r);answers.append([id,input,r])
 # Actual eligible pool, three complete passes, no ID repetition before the first pass is exhausted.
 pool=page.evaluate("()=>availableTasks().filter(q=>q.omr==='linjar_approximation').map(q=>q.id)");assert all('3.'+str(i) in pool for i in range(324,330)),pool
 r=page.evaluate('''ids=>{const pool=ids.map(id=>({id})),h={seq:0,ids:{}},counts={};state.passHistory=[];state.lastIds=[];let previous;for(let i=0;i<3*pool.length;i++){const t=farskaUppgifter(pool,h)[0];if(i<pool.length&&counts[t.id])throw Error('Early repetition');if(t.id===previous)throw Error('Consecutive repetition');counts[t.id]=(counts[t.id]||0)+1;state.passHistory.push({task:t});state.lastIds.push(t.id);h.ids[t.id]=++h.seq;previous=t.id;}return counts;}''',pool);assert set(r.values())=={3};answers.append(['pool',len(pool),r])
 figids=['1.20','3.26','3.116','3.277','3.278','3.280','3.281']+['3.'+str(i)for i in range(324,330)]
 for theme in ['dark','light']:
  page.evaluate('(t)=>document.documentElement.dataset.theme=t',theme)
  for width in [390,1280]:
   page.set_viewport_size({'width':width,'height':1200})
   for id in figids:
    page.evaluate('id=>{review(BANKMATF1.find(q=>q.id===id));showSolution();document.activeElement.blur();}',id);page.evaluate('document.fonts.ready');r=page.evaluate('''()=>({latex:document.querySelectorAll('.task .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1,wideMath:[...document.querySelectorAll('.task .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+2).length})''');assert not any(r.values()),(id,theme,width,r);views.append([id,theme,width,r])
 teacher=browser.new_page(viewport={'width':1280,'height':1100});configure(teacher);teacher.goto('http://127.0.0.1:8085/index.html?kurs=matf1');teacher.wait_for_function('window.BANKMATF1&&typeof renderMathInElement==="function"');teacher.evaluate("()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id=review style=\"padding:12px;background:white;color:#173548\"></main>'}")
 for width in [390,1280]:
  teacher.set_viewport_size({'width':width,'height':1100})
  for id in figids:
   teacher.evaluate(r'''id=>{const q=BANKMATF1.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;if(q.alternativ&&!q.alternativ.every(a=>uppgiftsText(q).includes(a.txt)))throw Error('Missing alternatives '+id);renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});}''',id);r=teacher.evaluate('''()=>({latex:document.querySelectorAll('.katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1})''');assert not any(r.values()),(id,width,r);views.append(['teacher',id,width,r])
 teacher.set_viewport_size({'width':1500,'height':1800});teacher.evaluate('''ids=>{document.getElementById('review').innerHTML='<div style="display:grid;grid-template-columns:repeat(3,470px);gap:15px">'+ids.map(id=>{const q=BANKMATF1.find(q=>q.id===id);return'<section><b>'+id+'</b>'+q.t.match(/<svg[\\s\\S]*?<\\/svg>/)[0]+'</section>';}).join('')+'</div>';}''',figids);teacher.screenshot(path='/tmp/oct14-figures.png',full_page=True)
 assert not errors,errors;Path('/tmp/oct14-browser-results.json').write_text(json.dumps({'answers':answers,'views':views,'errors':errors},ensure_ascii=False,indent=2));print('PASS',len(answers),'answer/selection checks;',len(views),'views; eligible pool',len(pool));browser.close()
