"""Rapportgranskning 16 oktober: riktiga svarsfält, biblioteken, hel-/delkort och mobil/dator.
Kör mot lokala servrar 8083 (Kunskapsgymmet) och 8085 (master). Inga DB- eller XP-skrivningar.
"""
import json,urllib.request,re
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
report=json.loads((ROOT.parent/'Uppgiftslabbet/agent/FELRAPPORTER_2026-10-16_0809.json').read_text())
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
 page.goto('http://127.0.0.1:8083/index.html');page.evaluate("selectCourse('ma2')")
 page.wait_for_function('window.BANKMA2&&typeof nerdamer==="function"&&typeof renderMathInElement==="function"')
 page.evaluate('''()=>{finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
 window.reviewTask=(q,index=0)=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=index;state.altValda=new Set();window.reviewOutcome=null;renderTraining();};}''')
 def check(id,part,inputs,want,whole=False):
  r=page.evaluate('''([id,part,inputs,whole])=>{
   const parent=BANKMA2.find(q=>q.id===id),cards=expandGameTask(parent),split=!whole&&cards.length>1,q=split?cards[part]:parent;
   const offset=split?0:(nastlat(q.rättSvar)?svarsPlan(q).rutor.findIndex(r=>r.del===part):part);
   reviewTask(q,offset);
   inputs.forEach((input,j)=>{const el=document.getElementById('ans-'+(offset+j));if(!el)throw Error(id+' missing field '+j);el.value=input;});
   checkAnswer();while(!state.answered&&state.partIndex>offset&&state.partIndex<offset+inputs.length){const before=state.partIndex;checkAnswer();if(state.partIndex===before)break;}
   return (window.reviewOutcome||state.partResults).slice(offset,offset+inputs.length);
  }''',[id,part,inputs,whole]);assert r==want,(id,part,inputs,whole,r,want);checks.append([id,part,inputs,whole,r])
 # Factored form: all natural function prefixes and factor orders; no expanded sums.
 factors={'2.572':'(x-1)(x-5)','2.86':'-2(x+2)(x-1)','2.105':'(x+1)(x-4)','2.144':'(x-1)(x-5)','2.167':'(x+1)(x-5)','2.305':'(x+4)(x-2)'}
 for id,expression in factors.items():
  for answer in [expression,'f(x)='+expression,'y='+expression,'\\(f(x)='+expression+'\\)']:check(id,0,[answer],[True])
  check(id,0,[expression+'+1'],[False])
 check('2.572',0,['(x-5)*(x-1)'],[True]);check('2.572',0,['x^2-6x+5'],[False]);check('2.572',0,['f(x)=x^2-6x+5'],[False])
 check('2.137',0,['y=(x+4)(x-3)'],[True]);check('2.137',1,['f(x)=x^2+x-12'],[True])
 # Logarithm values AND explicitly requested form.
 logs={'2.241':('lg9','2lg3'),'2.26':('lg(x^2)','lg(2x)+lg(5x)-lg10'),'2.109':('lg(x^2)','2lg(3x)-lg9'),'2.217':('lg40','lg5+lg8'),'2.219':('lg8','lg40-lg5'),'2.250':('lg(2x^2)','3lgx+lg4-lg(2x)'),'2.281':('lg5','lg(5x)-lgx'),'2.469':('lg25','lg(50x)-lg(2x)'),'2.529':('lg(25*x*y^2)','lg(50x)-lg2+2lgy')}
 for id,(answer,unchanged) in logs.items():
  for a,want in [(answer,True),('('+answer+')',True),(unchanged,False),(answer+'+0',False),('lg11',False)]:check(id,0,[a],[want])
 for a,want in [('lg(3^2)',True),('log(9)',True),('\\lg 9',True),('0.9542425094',False),('lg(9',False),('lg9)',False),('lg(ln9)',False),('lg(-9)',False)]:check('2.241',0,[a],[want])
 # Equations: = and ≈ are both natural prefixes for an approximate numerical result.
 for id,value,bad in [('2.14','5,2','5,1'),('2.56','4,00','4,01'),('2.221','9,0','8,9'),('2.223','6,6','6,5'),('2.249','3,8','3,9'),('2.279','6,5','6,4')]:
  for a in [value,'x='+value,'x≈'+value]:check(id,0,[a],[True])
  check(id,0,['x='+bad],[False])
 for whole in [False,True]:
  # Ordered point coordinates and named geometrical lengths.
  for id,part,good,bad in [('3.202',0,['4','3'],['3','4']),('3.05',0,['-1','6'],['6','-1']),('3.201',0,['-3','11'],['11','-3']),('3.408',1,['12','6'],['6','12']),('3.412',1,['3','6'],['6','3']),('3.412',2,['8','4'],['4','8']),('3.413',0,['4','-3','4','3'],['-3','4','3','4']),('3.413',1,['4','-3'],['-3','4']),('3.515',1,['(3,0)','1131'],['1131','(3,0)']),('2.709',0,['5','12','13'],['13','5','12'])]:
   check(id,part,good,[True]*len(good),whole);check(id,part,bad,[False]*len(bad),whole)
  # A set of dimensions stays unordered; duplicate dimensions do not pass.
  for id,sides in [('2.73',['5','12']),('2.113',['5','12']),('2.488',['6','8']),('2.503',['4','9']),('2.289',['4','11']),('2.342',['6','8'])]:
   check(id,0,sides[::-1],[True,True],whole);check(id,0,[sides[0],sides[0]],[True,False],whole)
  check('2.620',0,['-2<k<2'],[True],whole);check('2.620',0,['-2<=k<=2'],[False],whole)
  check('2.620',1,['1','3'],[True,True],whole);check('2.620',1,['3','1'],[False,False],whole)
  check('2.620',2,['2-2sqrt(5)','2+2sqrt(5)'],[True,True],whole)
  check('2.620',2,['-2.47','6.47'],[False,False],whole)
 check('4.140',0,['78 cm'],[True]);check('4.140',0,['0,78 m'],[True]);check('4.140',0,['78 m'],[False])
 for id,mean,sd in [('4.21','29','15'),('4.43','23','6'),('4.56','-90','12'),('4.90','17','3')]:
  check(id,0,[mean],[True]);check(id,1,[sd],[True]);check(id,1,['-1'],[False])
 check('2.505',0,['-28/5'],[True]);check('2.505',0,['-5,6'],[True]);check('2.505',0,['4'],[False])
 check('2.32',0,['(9+3sqrt(105))/16','(9-3sqrt(105))/16'],[True,True])
 check('2.32',0,['(9-3sqrt(105))/16','(9+3sqrt(105))/16'],[True,True])
 # A correct intermediate field must not reveal the remaining numeric answers.
 for id,part,values in [('3.412',2,['8','4']),('3.413',1,['4','-3']),('3.515',1,['(3,0)','1131']),('2.709',0,['5','12','13'])]:
  r=page.evaluate('''([id,part,values])=>{
   const q=expandGameTask(BANKMA2.find(q=>q.id===id))[part];reviewTask(q);
   const visible=[];
   values.forEach((a,i)=>{const field=document.getElementById('ans-'+i);if(field.disabled)throw Error('field still locked');field.value=a;checkAnswer();visible.push([...document.querySelectorAll('.delfacit')].filter(e=>!e.hidden).length);});
   return visible;
  }''',[id,part,values]);assert r==[0]*(len(values)-1)+[1],(id,r);checks.append([id,'manual-unlock',r])
 # Full-field labels must not degrade to a1/a2 or imply an unordered coordinate pair.
 for id,expected in [('3.202',['a) x-koordinat','a) y-koordinat']),('2.709',['a) Kortaste sidan','a) Mellersta sidan','a) Längsta sidan'])]:
  labels=page.evaluate('id=>{reviewTask(BANKMA2.find(q=>q.id===id));return [...document.querySelectorAll(".apart label")].map(e=>e.textContent)}',id)
  assert labels[:len(expected)]==expected,(id,labels)
 # Review all changed cards plus comparisons on narrow and large screens.
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for id in report['granskade']:
   card_count=page.evaluate('id=>expandGameTask(BANKMA2.find(q=>q.id===id)).length',id)
   for part in range(card_count):
    page.evaluate('([id,part])=>{reviewTask(expandGameTask(BANKMA2.find(q=>q.id===id))[part]);showSolution();}',[id,part])
    page.evaluate('document.fonts.ready');page.evaluate('scrollTo(0,0)')
    r=page.evaluate('''()=>({latex:document.querySelectorAll('.task .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;})})''')
    assert not r['latex'] and not r['overflow'] and not r['clipped'],('student',id,part,width,r)
    views.append(['student',id,part,width])
    if id in ['4.107','4.226','2.620','3.202','2.709','2.73','4.140','4.21'] and part==0:page.locator('.task').screenshot(path=f'/tmp/oct16-{id}-{width}.png')
 teacher=browser.new_page(viewport={'width':1280,'height':1100});setup(teacher,errors)
 teacher.goto('http://127.0.0.1:8085/index.html?kurs=ma2');teacher.wait_for_function('window.BANKMA2&&typeof renderMathInElement==="function"')
 teacher.evaluate("()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id=review style=\"padding:12px;max-width:850px;margin:auto\"></main>'}")
 for width in [390,1280]:
  teacher.set_viewport_size({'width':width,'height':1100})
  for id in report['granskade']:
   teacher.evaluate(r'''id=>{const q=BANKMA2.find(q=>q.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});}''',id)
   teacher.evaluate('document.fonts.ready')
   r=teacher.evaluate('''()=>({latex:document.querySelectorAll('#review .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1,clipped:[...document.querySelectorAll('.katex-display .base')].some(e=>{const a=e.getBoundingClientRect(),b=e.closest('.katex-display').getBoundingClientRect();return a.right>b.right+1||a.left<b.left-1;})})''')
   
   if r['overflow']:
    print('WIDE',id,teacher.evaluate("()=>[...document.querySelectorAll('#review *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,12).map(e=>[e.tagName,e.className,e.textContent.slice(0,120),e.getBoundingClientRect().width])"),flush=True);teacher.screenshot(path='/tmp/oct16-teacher-wide.png',full_page=True)
   assert not r['latex'] and not r['overflow'] and not r['clipped'],('teacher',id,width,r)
   views.append(['teacher',id,width])
 # Every leader ends exactly on its own analytic normal curve; equal mean/area and right ordering.
 for id,answer in [('4.107','C'),('4.226','A')]:
  geometry=page.evaluate('id=>{reviewTask(BANKMA2.find(q=>q.id===id));return [...document.querySelectorAll("[data-kurva]")].map(e=>({letter:e.dataset.kurva,sd:+e.dataset.standardavvikelse,points:e.getAttribute("points")}))}',id)
  import math
  for curve in geometry:
   pts=[tuple(map(float,p.split(','))) for p in curve['points'].split()]
   for x,y in pts:assert abs(y-(255-350/(curve['sd']*math.sqrt(2*math.pi))*math.exp(-((x-240)/40)**2/(2*curve['sd']**2))))<.006
  assert min(geometry,key=lambda x:x['sd'])['letter']==answer
 assert not errors,errors
 Path('/tmp/oct16-browser.json').write_text(json.dumps({'checks':checks,'views':views,'errors':errors},ensure_ascii=False,indent=2))
 print('PASS:',len(checks),'answer combinations;',len(views),'card/teacher views; zero JS/LaTeX/viewport errors.')
 browser.close()
