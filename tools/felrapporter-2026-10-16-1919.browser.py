"""Mato1-rapporter 16 oktober kl. 19:19: riktiga svarsfält, biblioteken, hel-/delkort och mobil/dator.
Kör mot lokala servrar 8083 (Kunskapsgymmet) och 8085 (master). Inga DB- eller XP-skrivningar.
"""
import json,urllib.request,re
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
report=json.loads((ROOT.parent/'Uppgiftslabbet/agent/FELRAPPORTER_2026-10-16_1919.json').read_text())
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.read(),r.headers.get('Content-Type','application/javascript'))
 b,t=cache[u];route.fulfill(status=200,body=b,content_type=t)
def setup(page,errors):
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://cdn.jsdelivr.net/**',cdn)
 page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
checks=[];views=[];errors=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1280,'height':1100});setup(page,errors)
 page.goto('http://127.0.0.1:8083/index.html');page.evaluate("selectCourse('mato1')")
 page.wait_for_function('window.BANKMATO1&&typeof nerdamer==="function"&&typeof renderMathInElement==="function"')
 page.evaluate('''()=>{finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
 window.reviewTask=(q,index=0)=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=index;state.altValda=new Set();window.reviewOutcome=null;renderTraining();};}''')
 def check(id,part,inputs,want,whole=False):
  r=page.evaluate('''([id,part,inputs,whole])=>{
   const parent=BANKMATO1.find(q=>q.id===id),cards=expandGameTask(parent),split=!whole&&cards.length>1,q=split?cards[part]:parent;
   const offset=split?0:(nastlat(q.rättSvar)?svarsPlan(q).rutor.findIndex(r=>r.del===part):part);
   reviewTask(q,offset);
   inputs.forEach((input,j)=>{const el=document.getElementById('ans-'+(offset+j));if(!el)throw Error(id+' missing field '+j);el.value=input;});
   checkAnswer();while(!state.answered&&state.partIndex>offset&&state.partIndex<offset+inputs.length){const before=state.partIndex;checkAnswer();if(state.partIndex===before)break;}
   return (window.reviewOutcome||state.partResults).slice(offset,offset+inputs.length);
  }''',[id,part,inputs,whole]);assert r==want,(id,part,inputs,whole,r,want);checks.append([id,part,inputs,whole,r])
 # Actual unsorted solution sets, including the reported 11-first answer.
 sets={'2.530':['-1','11'],'2.531':['-1.4','1.4'],'2.576':['-1','9'],'2.416':['-2','2'],'2.42':['-1','3'],'2.182':['1','3'],'2.422':['-1','1'],'2.423':['0','2']}
 for id,answers in sets.items():
  for values in [answers,answers[::-1],['x='+a for a in answers[::-1]]]:check(id,0,values,[True,True])
  check(id,0,[answers[0],answers[0]],[True,False])
 # Unicode square root, parenthesized roots, derivative prefixes and negative controls.
 roots={('2.212',0):'3√x/2-6/x^2',('2.10',0):'15x^2-1/√x',('2.250',0):'3√x/2+7/x^2-1/(2x√x)',('2.393',0):'5/(2√x)',('2.117',0):'3√x/2',('2.117',1):'(5x^2-2)/(2√x)',('2.127',0):'5/(2√x)-1/x^2',('2.127',1):'3√x+6/x^3'}
 for (id,part),answer in roots.items():
  for whole in [False,True]:
   for a in [answer,answer.replace('√x','√(x)'),answer.replace('√x','√((x))'),answer.replace('√x','sqrt(x)'),"f'(x)="+answer.replace('√x','√((x))')]:check(id,part,[a],[True],whole)
   check(id,part,[answer+'+1'],[False],whole)
 # Press the real square-root button, then type nested parentheses.
 r=page.evaluate('''()=>{reviewTask(BANKMATO1.find(q=>q.id==='2.212'));const e=document.getElementById('ans-0');e.value='3';e.focus();e.setSelectionRange(1,1);state.aktivRuta=0;}''')
 page.locator('.symrad button[title="Roten ur"]').click();assert page.locator('#ans-0').input_value()=='3√'
 page.locator('#ans-0').press_sequentially('((x))/2-6/x^2');page.locator('#kollaknapp').click();assert page.evaluate('window.reviewOutcome')==[True]
 checks.append(['2.212','real-root-button',True])
 for a,want in [('3√((x))/2+6/x^2',False),('3√((x))/2-6/x^3',False),('1,5√x-6/x²',True),('3/2√x-6/x²',True)]:check('2.212',0,[a],[want])
 # Exact and rounded alternatives must both pass; an adjacent wrong rounding must fail.
 for id,good,bad in [('1.579','1.732','1.733'),('2.810','2.646','2.645'),('4.474','2.598','2.599')]:
  check(id,0,[good],[True]);check(id,0,[bad],[False])
 for id,a in [('1.579','√((3))'),('2.810','√((7))'),('4.474','3√((3))/2')]:check(id,0,[a],[True])
 check('1.586',0,['-3+√(5.5)','-3-√((5.5))'],[True,True]);check('1.586',0,['-0.654','-5.346'],[False,False])
 check('2.823',0,['4.7','11/3'],[True,True]);check('2.823',0,['4.7','3.667'],[True,True]);check('2.823',0,['4.7','3.666'],[True,False])
 for a in ['ln2','ln(2)','x=ln(2)','0.693','x≈0,693']:check('2.826',0,[a,'-4'],[True,True])
 check('2.826',0,['0.694','-4'],[False,True]);check('2.826',0,['-4','ln2'],[False,False])
 check('2.816',0,['ln2','ln3'],[True,True]);check('2.816',0,['ln(3)','ln(2)'],[True,True]);check('2.816',0,['0.693','1.099'],[False,False])
 # Time/percentage units and the independently found incorrect answer in 2.321.
 for a in ['3.82','3,82 %','3.8%']:check('2.571',0,[a],[True])
 check('2.571',0,['3.9%'],[False])
 for a in ['5.6','5,6 år']:check('2.321',0,[a],[True])
 check('2.321',0,['6'],[False]);check('2.321',0,['5.5'],[False])
 for id,good,bad in [('3.655','100 bakterier/h','100 bakterier/min'),('3.656','164.9 individer/år','164.8 individer/år'),('2.753','-2 g/h','2 g/h'),('2.757','30 bakterier/h','30 bakterier/min')]:
  check(id,0,[good],[True]);check(id,0,[bad],[False])
 keyboard_ids=['2.826','2.816','1.579','2.810','4.474','2.823','1.586','2.212']
 for id in keyboard_ids:
  modes=page.evaluate('''id=>{reviewTask(BANKMATO1.find(q=>q.id===id));return [...document.querySelectorAll('[id^="ans-"]')].map(e=>e.inputMode)}''',id)
  assert modes and all(m=='text' for m in modes),(id,modes)
 # Review the ordinary decimal keyboard too, so the fix remains bounded.
 assert page.evaluate('sifferlage(12,null,"numeriskt",{t:"Beräkna medelvärdet."})') is True
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for id in report['granskade']:
   count=page.evaluate('id=>expandGameTask(BANKMATO1.find(q=>q.id===id)).length',id)
   for part in range(count):
    page.evaluate('''([id,part])=>{const q=expandGameTask(BANKMATO1.find(q=>q.id===id))[part];if(q.geogebra&&!q['miniräknare'])throw Error(id+' tool implication');reviewTask(q);showSolution();scrollTo(0,0);}''',[id,part]);page.evaluate('document.fonts.ready')
    r=page.evaluate('''()=>({latex:document.querySelectorAll('.task .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;})})''')
    assert not r['latex'] and not r['overflow'] and not r['clipped'],(id,part,width,r);views.append(['student',id,part,width])
    if id in report['rapporter'] or id=='2.321':page.locator('.task').screenshot(path=f'/tmp/mato1-1919-{id}-{part}-{width}.png')
 # Master rendering, including hidden manual model-evaluation task and solutions.
 teacher=browser.new_page(viewport={'width':1280,'height':1100});setup(teacher,errors)
 teacher.goto('http://127.0.0.1:8085/index.html?kurs=mato1');teacher.wait_for_function('window.BANKMATO1&&typeof renderMathInElement==="function"')
 teacher.evaluate("()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id=review style=\"padding:12px;max-width:850px;margin:auto\"></main>'}")
 for width in [390,1280]:
  teacher.set_viewport_size({'width':width,'height':1100})
  for id in report['granskade']:
   teacher.evaluate(r'''id=>{const q=BANKMATO1.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});}''',id);teacher.evaluate('document.fonts.ready')
   r=teacher.evaluate('''()=>({latex:document.querySelectorAll('#review .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;})})''')
   assert not r['latex'] and not r['overflow'] and not r['clipped'],('master',id,width,r);views.append(['teacher',id,width])
 assert not errors,errors
 Path('/tmp/mato1-1919-browser.json').write_text(json.dumps({'checks':checks,'views':views,'errors':errors},ensure_ascii=False,indent=2))
 print('PASS:',len(checks),'answer combinations;',len(views),'student/teacher views; exact mobile keyboards and real √ button; no JS/LaTeX errors.')
 browser.close()
