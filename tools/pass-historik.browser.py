"""Testa navigation och belöningsspärr med det riktiga gränssnittet (anonym lokal profil)."""
import argparse, json, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8072);args=parser.parse_args()
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 st,h,b=cache[u];route.fulfill(status=st,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.route('https://cdn.jsdelivr.net/**',cdn)
 page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
 # Ingen testaktivitet skickas till produktionsdatabasen.
 page.route('**/*.supabase.co/**',lambda r:r.abort())
 page.goto(f'http://127.0.0.1:{args.port}/index.html?kurs=fy2');page.evaluate("selectCourse('fy2')")
 page.wait_for_function('window.BANK2&&typeof renderMathInElement==="function"')
 page.evaluate('''()=>{
  window.rpcCalls=[];kgRegistreraForsok=(...x)=>rpcCalls.push(['attempt',...x]);kgLoggaHandelse=(...x)=>rpcCalls.push(['event',...x]);
  window.testCards=availableTasks();window.first=testCards.find(q=>q.id==='1.3b');
  if(!first)throw Error('Den rapporterade frågan saknas');
  window.second=testCards.find(q=>q.id!==first.id&&!arAlt(q)&&expectedAnswersForTask(q).auto&&expectedAnswersForTask(q).answers.length===1);
  window.third=testCards.find(q=>q.id!==first.id&&q.id!==second.id&&!arAlt(q)&&expectedAnswersForTask(q).auto&&expectedAnswersForTask(q).answers.length===1&&q.ledtrad);
  window.testQueue=[first,second,third];window.realChoose=chooseTask;chooseTask=()=>testQueue.shift();
  beginSession();state.sessionTarget=8;nextTask();
  window.testSnapshot=()=>JSON.stringify({profile,done:state.sessionDone,xp:state.sessionXp,correct:state.sessionCorrect,
    errors:(state.sessionFel||[]).map(t=>t.id),rpc:rpcCalls,prov:state.prov,lastIds:state.lastIds});
 }''')
 assert page.locator('#pass-back').is_disabled()
 def answer_correct():
  page.evaluate('''()=>{
   const info=expectedAnswersForTask(state.currentTask);
   for(let i=0;i<info.answers.length;i++){
    const el=document.getElementById('ans-'+i);if(!el)throw Error('missing field '+i);
    el.value=String(info.answers[i]);checkAnswer();
   }
  }''')
 answer_correct();assert page.evaluate('state.sessionDone===1&&profile.xp>0&&rpcCalls.length===2')
 page.locator('#kollaknapp').click();page.locator('#ans-0').fill('redan skrivet')
 before=page.evaluate('testSnapshot()');page.locator('#pass-back').click()
 assert page.evaluate('state.passReview&&state.currentTask.id===first.id')
 assert 'Övning utan XP' in page.locator('.passnav').inner_text()
 answer_correct();assert page.evaluate('testSnapshot()')==before
 assert '0 XP' in page.locator('#answer-result').inner_text()
 page.locator('#pass-review-next').click();assert page.locator('#ans-0').input_value()=='redan skrivet'
 assert page.evaluate('!state.passReview&&state.currentTask.id===second.id&&!state.answered')
 # Fel vid återbesök ska inte heller försämra serien eller den adaptiva nivån.
 page.locator('#pass-back').click();page.locator('#ans-0').fill('123456789');page.locator('#kollaknapp').click()
 assert page.evaluate('testSnapshot()')==before
 for width in [1174,390]:
  page.set_viewport_size({'width':width,'height':1000});page.wait_for_timeout(200);page.evaluate('window.scrollTo(0,0)');page.screenshot(path=f'/tmp/pass-historik-{width}.png',full_page=True)
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 page.locator('#pass-forward').click();answer_correct();assert page.evaluate('state.sessionDone===2&&rpcCalls.length===4')
 page.locator('#kollaknapp').click();page.locator('#ans-0').fill('behåll detta')
 page.evaluate('visaLedtrad();showSolution()');before=page.evaluate('testSnapshot()')
 page.locator('#pass-back').click();page.locator('#pass-back').click();page.evaluate('showSolution();giveUp()')
 assert page.evaluate('testSnapshot()')==before
 page.locator('#pass-forward').click();page.locator('#pass-forward').click()
 assert page.locator('#ans-0').input_value()=='behåll detta'
 assert page.evaluate('state.noXp&&state.hintUsed&&state.solutionShown&&!state.passReview')
 assert page.locator('#solution-holder .sol').count()==1
 # Facit-/ledtrådsspärren finns även i det återupptagna passet.
 stored=page.evaluate('JSON.parse(localStorage.getItem(PASS_KEY))')
 page.reload();page.evaluate("selectCourse('fy2')");page.wait_for_function('window.BANK2&&typeof renderMathInElement==="function"')
 assert page.evaluate('d=>{const ok=aterupptaPass(d);renderTraining();return ok&&state.noXp&&state.hintUsed&&state.solutionShown&&state.sessionDone===2;}',stored)
 assert page.locator('#solution-holder .sol').count()==1
 # Flervals-, självbedömnings- och flerdelade frågor går genom samma riktiga spärr.
 page.evaluate('''()=>{
  window.rpcCalls=[];kgRegistreraForsok=(...x)=>rpcCalls.push(['attempt',...x]);kgLoggaHandelse=(...x)=>rpcCalls.push(['event',...x]);
  window.testSnapshot=()=>JSON.stringify({profile,done:state.sessionDone,xp:state.sessionXp,correct:state.sessionCorrect,
    errors:(state.sessionFel||[]).map(t=>t.id),rpc:rpcCalls,prov:state.prov,lastIds:state.lastIds});
 }''')
 page.evaluate("selectCourse('fy1')");page.wait_for_function('window.BANK&&state.course==="fy1"')
 cases=page.evaluate('''()=>{
  const alt=BANK.find(q=>arAlt(q)),manual=BANK.find(q=>!arAlt(q)&&!expectedAnswersForTask(q).auto),
    multi=BANK.find(q=>!arAlt(q)&&expectedAnswersForTask(q).auto&&expectedAnswersForTask(q).answers.length>1);
  return {alt:alt?.id,manual:manual?.id,multi:multi?.id};
 }''')
 assert all(cases.values()),cases
 for kind,task_id in cases.items():
  page.evaluate('''id=>{const t=BANK.find(q=>q.id===id);beginSession();state.sessionDone=1;
   state.passHistory=[{task:t,completed:true},{task:availableTasks()[0],completed:false}];state.passIndex=1;
   state.currentTask=state.passHistory[1].task;state.answered=false;renderTraining();passBakat();}''',task_id)
  before=page.evaluate('testSnapshot()')
  if kind=='alt':
   page.evaluate('()=>{const a=altLista(state.currentTask);a.forEach((x,i)=>{if(x.ratt)vaxlaAlt(i)});kollaAlt();}')
  elif kind=='manual':
   page.evaluate('showSolution();selfGrade(true)')
  else:answer_correct()
  assert page.evaluate('state.answered'),kind
  assert page.evaluate('testSnapshot()')==before,kind
  assert '0 XP' in page.locator('#answer-result').inner_text(),kind
 assert not errors,errors
 print(json.dumps({'reportedTask':'1.3b','normalAttempts':2,'reviewKinds':cases,'widths':[1174,390],
   'checks':'XP, profil, serie, nivå, passresultat, RPC, inmatning, ledtråd, facit och återupptagning','pageErrors':errors},ensure_ascii=False))
 browser.close()
