"""Nio felrapporter: faktisk kortvisning/rättning utan XP eller databas, samt fem analoger per fel.
Kör mot lokal server på 8072; externa bibliotek hämtas med verifierad TLS.
"""
import json,urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 s,h,b=cache[u];route.fulfill(status=s,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)
cases={'fy1':[['5.564',1,['11200','11 200 W','11,2 kW','11100']],['6.241',0,['48,0','48.0 kg','48,1']],['6.65',0,['135,60','135.6 kPa','135,61']],['6.553',0,['2','dubbelt','dubbelt så stort','hälften']]],'ma2':[['2.378',0,['5,64','x=5,64','x≈5,64','lg(20/3)/lg(1.4)']],['2.137',1,['x^2+x-12','f(x)=x^2+x-12','y=x^2+x-12']],['2.731',0,['sqrt(3)+sqrt(2)','x=sqrt(3)+sqrt(2)']],[ '2.137',0,['(x+4)*(x-3)','f(x)=(x+4)(x-3)','y=(x+4)(x-3)']]],'matf1':[['1.565',0,['8','7']]]}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page()
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 all=[];view_checks=[]
 analogue_ids={'fy1':['5.563','5.565','5.566','5.567','5.568','6.240','6.242','6.243','6.244','6.245','6.66','6.67','6.68','6.69','6.70','6.552','6.534','6.42','6.95','6.94'],'ma2':['2.375','2.377','2.379','2.381','2.382','2.141','2.144','2.145','2.139','2.143','3.22','3.26','3.52','3.60','3.81','2.32','2.132','2.193','2.198','2.242'],'matf1':['1.169','1.566','1.567','1.614','1.784']}
 analogue_checks=[]
 for course,rows in cases.items():
  page.goto('http://127.0.0.1:8072/index.html?kurs='+course);page.evaluate('c=>selectCourse(c)',course);page.wait_for_function('g=>Array.isArray(window[g]) && window[g].length>0',arg={'fy1':'BANK','ma2':'BANKMA2','matf1':'BANKMATF1'}[course]);page.evaluate('g=>window.BANK=window[g]',{'fy1':'BANK','ma2':'BANKMA2','matf1':'BANKMATF1'}[course]);page.wait_for_function('typeof BANK!=="undefined" && BANK.length>0 && typeof window.nerdamer==="function"')
  out=page.evaluate('''rows=>rows.flatMap(([id,i,inputs])=>{const q=expandGameTask(BANK.find(t=>t.id===id))[i]; const f=Array.isArray(q.rättSvar)?q.rättSvar[0]:q.rättSvar;return inputs.map(input=>({id,i,input,expected:f,format:q.svarFormat,tol:q.tolerans,ok:delSvarRatt(input,f,Array.isArray(q.svarEnhet)?q.svarEnhet[0]:q.svarEnhet,Array.isArray(q.tolerans)?q.tolerans[0]:q.tolerans,q,0,Array.isArray(q.svarFormat)?q.svarFormat[0]:q.svarFormat)}));})''',rows)
  all+=out
  analogues=page.evaluate(r'''ids=>{finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};const out=[];for(const id of ids)for(const q of expandGameTask(BANK.find(t=>t.id===id))){const info=expectedAnswersForTask(q);if(!info.auto||arAlt(q))continue;state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewAttempt=null;renderTraining();const vals=info.answers;for(let j=0;j<vals.length;j++){const el=document.getElementById('ans-'+j);if(el)el.value=String(vals[j]);}let n=0;while(!state.answered&&n++<vals.length+1)checkAnswer();out.push({id:q.id,ok:window.reviewAttempt?.every(Boolean),parts:window.reviewAttempt});}return out;}''',analogue_ids[course])
  analogue_checks+=analogues
  # Exercise actual answer fields, including unordered roots and wrong-answer correction.
  ui=page.evaluate(r'''rows=>{finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};const results=[];for(const[id,i,inputs]of rows){for(const input of inputs){const q=expandGameTask(BANK.find(t=>t.id===id))[i];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewAttempt=null;renderTraining();const values=Array.isArray(q.rättSvar)?q.rättSvar:[q.rättSvar];for(let j=0;j<values.length;j++){const el=document.getElementById('ans-'+j);if(el)el.value=j===0?input:String(values[j]);}let n=0;while(!state.answered&&n++<values.length+1)checkAnswer();results.push({id,i,input,ok:window.reviewAttempt?.every(Boolean),raw:window.reviewAttempt});}}return results;}''',rows)
  all += [dict(x,ui=True) for x in ui]
  if course=='ma2':
   extra=page.evaluate(r'''()=>{const q=BANK.find(t=>t.id==='2.731');state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();document.getElementById('ans-0').value='0';document.getElementById('ans-1').value='1';checkAnswer();return {id:'2.731',correctionKatex:document.querySelectorAll('[id^="corr-"] .katex').length,correctionErrors:document.querySelectorAll('[id^="corr-"] .katex-error').length};}''')
   all.append(extra)
   roots=page.evaluate(r'''()=>{const out=[];for(const[values,want]of[[['sqrt(3)-sqrt(2)','sqrt(3)+sqrt(2)'],true],[['x=sqrt(3)+sqrt(2)','x=sqrt(3)-sqrt(2)'],true],[['sqrt(3)+sqrt(2)','sqrt(3)+sqrt(2)'],false],[['0','1'],false]]){state.currentTask=BANK.find(t=>t.id==='2.731');state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewAttempt=null;renderTraining();values.forEach((v,i)=>document.getElementById('ans-'+i).value=v);checkAnswer();out.push({id:'2.731',values,want,ok:window.reviewAttempt?.every(Boolean)});}return out;}''')
   analogue_checks+=roots
  for width in [390,1280]:
   page.set_viewport_size({'width':width,'height':1000})
   view_checks += page.evaluate(r'''rows=>rows.map(([id,i])=>{const q=expandGameTask(BANK.find(t=>t.id===id))[i];state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();const host=document.getElementById('qtext')||document.querySelector('.qtext');return{id,i,katexErrors:document.querySelectorAll('.katex-error').length,fields:document.querySelectorAll('[id^="ans-"]').length};})''',rows)
  # Screenshot of corrected root answer was inspected separately.
 bad={'11100','48,1','135,61','hälften','7'}
 failures=[x for x in all if 'ok' in x and x['ok']!=(x['input'] not in bad)]
 failures += [x for x in view_checks if x['katexErrors']]
 failures += [x for x in analogue_checks if x.get('ok')!=x.get('want',True)]
 failures += [x for x in all if 'correctionKatex' in x and (x['correctionKatex']<2 or x['correctionErrors'])]
 print(json.dumps({'checks':len(all),'views':view_checks,'analogueChecks':analogue_checks,'failures':failures,'results':all},ensure_ascii=False,indent=2));open('/tmp/reports-after.json','w').write(json.dumps(all))
 b.close()
 if failures:raise SystemExit(1)
