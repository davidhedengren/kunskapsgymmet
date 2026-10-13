"""Verify terms, standalone spring cards and set punctuation with real inputs; no DB writes."""
import json,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,r.read(),r.headers.get('Content-Type','application/javascript'))
 st,b,t=cache[u];route.fulfill(status=st,body=b,content_type=t)
def configure(page,errors):
 page.on('pageerror',lambda e:errors.append(str(e)));page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
sets={'1.478':[3,4],'1.474':[1,3,5,7],'1.475':[2,3,4,5,6],'1.479':[1,2,3,4,5],'1.480':[1,3,5],'1.146':[1,2,5,6]}
eqs=['4.326','4.346','4.123','4.518','4.109','4.135','4.138','4.174'];proofs=['2.305','2.541','2.144','2.148','2.316','2.572','2.577'];springs=['4.64','4.20','4.63','4.65','4.73','4.181'];answers=[];views=[];errors=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1280,'height':1100});configure(page,errors);page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.goto('http://127.0.0.1:8083/index.html');page.evaluate("selectCourse('matf1')");page.wait_for_function('window.BANKMATF1&&typeof nerdamer==="function"&&typeof renderMathInElement==="function"')
 page.evaluate('''()=>{finishAttempt=parts=>{state.answered=true;window.outcome=parts;};window.review=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;window.outcome=null;renderTraining();};}''')
 def check(id,part,inputs,want):
  r=page.evaluate('''([id,part,inputs])=>{const bank=state.course==='fy1'?BANK:BANKMATF1;const q=expandGameTask(bank.find(x=>x.id===id))[part];review(q);inputs.forEach((value,i)=>{const field=document.getElementById('ans-'+i);if(!field||field.disabled)throw Error(id+' missing input '+i);field.value=value;document.getElementById('kollaknapp').click();});return window.outcome||state.partResults;}''',[id,part,inputs]);assert r[:len(want)]==want,(id,part,inputs,r,want);answers.append([id,part,inputs,r])
 for id,v in sets.items():
  joined=','.join(map(str,v));wrapped='{'+joined+'}'
  for a in [wrapped,wrapped+',',joined+',',wrapped+';',wrapped[:-1]+',}','{'+','.join(map(str,reversed(v)))+'},'] :check(id,0,[a],[True])
  for a in [wrapped[:-1]+',99},','{'+','.join(map(str,v[:-1]))+'},',wrapped+',,','{99},']:check(id,0,[a],[False])
 # Empty set, scalar and ordered pair remain separate formats.
 for a,want in [('{},',True),('∅,',True),(',',False),('{1},',False)]:
  r=page.evaluate("a=>delSvarRatt(a,'{}',null,null,{svarFormat:'mängd',t:'Bestäm mängden'},0,'mängd')",a);assert r==want,(a,r);answers.append(['empty',a,r])
 for id,inputs,want in [('4.326',['3'],[True]),('4.326',['y=3'],[True]),('4.326',['y(x)=3'],[True]),('4.326',['4'],[False]),('4.346',['2,5'],[True]),('4.109',['3','0'],[True,True]),('4.135',['3','1'],[True,True]),('4.518',['0','4','2'],[True]*3),('2.305',['B'],[True]),('2.305',['A'],[False]),('2.541',['A'],[True]),('2.572',['D'],[True]),('2.577',['C'],[True])]:check(id,0,inputs,want)
 # Save baseline comparisons when a checkout snapshot was supplied for this review.
 baseline=Path('/tmp/reports-2127-before-index.html');comparison=[]
 if baseline.exists():
  html=baseline.read_text();a=html.index('function formatRatt(');b=html.index('\n}',a)+2;page.evaluate('body=>{window.formatBefore=eval("("+body+")");}',html[a:b])
  for a in ['{3,4}', '{3,4},','3,4,','{3,4,}','{3,4,5},','{3},']:
   r=page.evaluate('a=>({before:formatBefore(a,"{3,4}",{format:"mängd",tolerans:null}),after:formatRatt(a,"{3,4}",{format:"mängd",tolerans:null})})',a);comparison.append([a,r])
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for id in list(sets)+eqs+proofs:
   q=page.evaluate('id=>BANKMATF1.find(x=>x.id===id)',id)
   if q.get('spel') is False:continue
   page.evaluate('id=>{review(expandGameTask(BANKMATF1.find(x=>x.id===id))[0]);showSolution();}',id);page.evaluate('document.fonts.ready');r=page.evaluate('''()=>({latex:document.querySelectorAll('.task .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1})''');assert not r['latex'] and not r['overflow'],(id,width,r);views.append(['student','matf1',id,width])
 page.evaluate("selectCourse('fy1')");page.wait_for_function('window.BANK&&state.course==="fy1"')
 for id in springs:
  cards=page.evaluate('id=>expandGameTask(BANK.find(x=>x.id===id)).map(q=>({a:q.rättSvar,u:q.svarEnhet}))',id)
  for part,card in enumerate(cards):
   check(id,part,[str(card['a']).replace('.',',')],[True]);check(id,part,[str(card['a']+1)],[False])
 check('4.64',2,['8 cm'],[True]);check('4.64',2,['8 m'],[False])
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for id in springs:
   n=page.evaluate('id=>expandGameTask(BANK.find(x=>x.id===id)).length',id)
   for part in range(n):
    page.evaluate('([id,part])=>{review(expandGameTask(BANK.find(x=>x.id===id))[part]);showSolution();}',[id,part]);page.evaluate('document.fonts.ready');r=page.evaluate('''()=>({latex:document.querySelectorAll('.task .katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1})''');assert not r['latex'] and not r['overflow'],(id,part,width,r);views.append(['student','fy1',id,part,width])
    if id=='4.64' and part==2 and width==390:page.locator('.task').screenshot(path='/tmp/reports-2127-spring-mobile.png')
 teacher=browser.new_page(viewport={'width':1280,'height':1100});configure(teacher,errors);teacher.goto('http://127.0.0.1:8085/index.html?kurs=matf1');teacher.wait_for_function('window.BANKMATF1&&typeof renderMathInElement==="function"');teacher.evaluate("()=>{document.body.classList.remove('password-locked');document.body.innerHTML='<main id=review style=\"padding:12px\"></main>'}")
 for width in [390,1280]:
  teacher.set_viewport_size({'width':width,'height':1100})
  for id in eqs+proofs+list(sets):
   r=teacher.evaluate(r'''id=>{const q=BANKMATF1.find(x=>x.id===id),el=document.getElementById('review');el.innerHTML=uppgiftsText(q)+q.s;renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false});return{latex:document.querySelectorAll('.katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1};}''',id);teacher.evaluate('document.fonts.ready');r=teacher.evaluate("()=>({latex:document.querySelectorAll('.katex-error').length,overflow:document.documentElement.scrollWidth>innerWidth+1})");
   if r['overflow']:
    print('WIDE',id,teacher.evaluate("()=>({sw:document.documentElement.scrollWidth,wide:[...document.querySelectorAll('#review *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,10).map(e=>[e.tagName,e.className,e.getBoundingClientRect().width,e.textContent.slice(0,70)])})"),flush=True);teacher.screenshot(path='/tmp/reports-2127-real-overflow.png',full_page=True)
   assert not r['latex'] and not r['overflow'],(id,width,r);views.append(['teacher','matf1',id,width])
 assert not errors,errors
 Path('/tmp/reports-2127-browser.json').write_text(json.dumps({'answers':answers,'views':views,'baseline':comparison,'errors':errors},ensure_ascii=False,indent=2));print('PASS',len(answers),'answer combinations,',len(views),'views; before/after:',comparison);browser.close()
