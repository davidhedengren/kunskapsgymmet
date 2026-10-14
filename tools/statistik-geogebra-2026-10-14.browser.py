"""Exercise actual tool permissions and external GeoGebra links; no database writes."""
import json,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
scope=json.loads((Path(__file__).parents[2]/'Uppgiftslabbet/tools/fixtures/statistik-geogebra-2026-10-14.json').read_text());cache={};views=[];errors=[]
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30)as r:cache[u]=(r.status,r.read(),r.headers.get('Content-Type','application/javascript'))
 st,b,t=cache[u];route.fulfill(status=st,body=b,content_type=t)
with sync_playwright()as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);context=browser.new_context(viewport={'width':1280,'height':1100});context.route('https://*.supabase.co/**',lambda r:r.abort());context.route('https://cdn.jsdelivr.net/**',cdn);context.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));context.route('https://www.geogebra.org/**',lambda r:r.fulfill(status=200,body='<title>External GeoGebra test</title>'));page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.goto('http://127.0.0.1:8083/index.html');page.evaluate("selectCourse('ma2')");page.wait_for_function('window.BANKMA2&&typeof renderMathInElement==="function"');page.evaluate('''()=>{finishAttempt=parts=>{state.answered=true;window.outcome=parts;};window.review=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.outcome=null;renderTraining();};}''')
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for m in scope:
   count=page.evaluate('id=>expandGameTask(BANKMA2.find(q=>q.id===id)).length',m['id'])
   for part in range(count):
    result=page.evaluate('''([id,part])=>{const q=expandGameTask(BANKMA2.find(q=>q.id===id))[part];review(q);const a=document.querySelector('[data-hjalp=geogebra]');return{permission:q.geogebra,calculator:raknareTillaten(q),calcButton:!!document.querySelector('[data-hjalp=raknare]'),href:a?.getAttribute('href'),target:a?.target,rel:a?.rel,iframes:document.querySelectorAll('iframe[src*="geogebra"]').length,overflow:document.documentElement.scrollWidth>innerWidth+1,latex:document.querySelectorAll('.katex-error').length};}''',[m['id'],part]);expected=True;assert result['permission']and result['href']=='https://www.geogebra.org/classic?lang=sv';assert result['calculator']==expected and result['calcButton']==expected,(m,part,result);assert result['target']=='_blank' and 'noopener' in result['rel'];assert not result['iframes'] and not result['overflow'] and not result['latex'];views.append([m['id'],part,width,result])
 # A regular task has no GeoGebra button, and explicit false child permission overrides true parent.
 assert page.evaluate("()=>{review(BANKMA2.find(q=>q.id==='4.322'));return !document.querySelector('[data-hjalp=geogebra]');}")
 assert page.evaluate("()=>{const q=expandGameTask({id:'tools',geogebra:true,'miniräknare':false,spelDelning:'deluppgifter',spelDelar:[{t:'A',geogebra:false,'miniräknare':true},{t:'B'}]});return q[0].geogebra===false&&q[0]['miniräknare']===true&&q[1].geogebra===true&&q[1]['miniräknare']===false&&raknareTillaten(q[1])===true;}")
 page.evaluate("()=>review(expandGameTask(BANKMA2.find(q=>q.id==='4.328'))[2])")
 with page.expect_popup()as popup_info:page.locator('[data-hjalp=geogebra]').click()
 popup=popup_info.value;popup.wait_for_load_state();assert popup.url=='https://www.geogebra.org/classic?lang=sv';assert popup.evaluate('window.opener===null');assert page.evaluate('state.currentTask.id')=='4.328c';popup.close()
 # Switching to an SD card preserves calculator permission when GeoGebra is allowed.
 page.evaluate("()=>{review(expandGameTask(BANKMA2.find(q=>q.id==='4.328'))[0]);hjalpVaxla('raknare');review(expandGameTask(BANKMA2.find(q=>q.id==='4.328'))[2]);}");assert not page.locator('#rk-in').is_disabled();assert page.locator('#hm-raknare').evaluate('el=>!el.classList.contains("sparrad")');page.evaluate("hjalpVaxla('raknare')")
 page.evaluate("()=>{review(expandGameTask(BANKMA2.find(q=>q.id==='4.28'))[1]);document.getElementById('ans-0').value='3,8';checkAnswer();}");assert page.evaluate('outcome')==[True]
 # Explicit digital-work tasks from the first cross-course policy review.
 targets={'ma2':['1.342','2.757','4.287','4.292','5.181'],'mato1':['3.462','3.467','3.532','3.534','3.583','3.588','3.589','3.590','3.592'],'mato2':['2.573'],'matf1':['3.287']}
 for course,ids in targets.items():
  page.evaluate('async c=>await selectCourse(c)',course)
  for width in [390,1280]:
   page.set_viewport_size({'width':width,'height':1100})
   for id in ids:
    result=page.evaluate("""id=>{const q=state.data.bank.find(q=>q.id===id);review(q);return {geo:q.geogebra,calc:raknareTillaten(q),geoButton:!!document.querySelector('[data-hjalp=geogebra]'),calcButton:!!document.querySelector('[data-hjalp=raknare]')};}""",id);assert all(result.values()),(course,id,result);views.append([course,id,width,result])
 page.evaluate('async()=>await selectCourse("ma2")')
 # Given normal-distribution figures need ordinary arithmetic, not a new digital model.
 for id,answer in [('4.44','654,4'),('4.115','409')]:
  result=page.evaluate("""([id,answer])=>{const q=BANKMA2.find(q=>q.id===id);review(q);const geo=!!document.querySelector('[data-hjalp=geogebra]'),calc=!!document.querySelector('[data-hjalp=raknare]');document.getElementById('ans-0').value=answer;checkAnswer();return{geo,calc,outcome};}""",[id,answer]);assert result=={'geo':False,'calc':True,'outcome':[True]},(id,result);views.append(['ma2',id,page.viewport_size['width'],result])
 page.set_viewport_size({'width':390,'height':1100});page.evaluate("()=>review(expandGameTask(BANKMA2.find(q=>q.id==='4.328'))[2])");page.locator('.task').screenshot(path='/tmp/geogebra-tools-mobile.png')
 assert not errors,errors;Path('/tmp/geogebra-tools-browser.json').write_text(json.dumps({'views':views,'errors':errors},ensure_ascii=False,indent=2));print('PASS',len(views),'card views; external popup, permissions, calculator availability and Sx grading');browser.close()
