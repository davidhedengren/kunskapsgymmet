"""Granska rapporterade svar i faktiska spelkort, inklusive tecken och enheter."""
import json, math, urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 st,h,b=cache[u];route.fulfill(status=st,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);pg=browser.new_page();pg.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");pg.route('https://cdn.jsdelivr.net/**',cdn);pg.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));pg.route('https://*.supabase.co/**',lambda r:r.abort())
 pg.goto('http://127.0.0.1:8072/index.html?kurs=fy1');pg.evaluate("selectCourse('fy1')");pg.wait_for_function('window.BANK && typeof renderMathInElement==="function"')
 cases=[['30500',True],['30 500',True],['30 500 kg',True],['3,05*10^4',True],['3.05e4',True],['3,05·10⁴ kg',True],['3,05*10^4 kg',True],['30,5 ton',True],['30549,898167',True],['30600',False],['3,06*10^4',False],['3050',False],['3,05',False],['-30500',False]]
 checks=pg.evaluate('''cases=>{const q=expandGameTask(BANK.find(q=>q.id==='6.422'))[1];if(Math.abs(q.rättSvar-300000/9.82)>1e-9)throw Error('fel massa');return cases.map(([input,want])=>({input,want,actual:delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)}));}''',cases)
 assert all(x['want']==x['actual'] for x in checks),[x for x in checks if x['want']!=x['actual']]
 attempts=pg.evaluate('''()=>{finishAttempt=parts=>{window.__parts=parts;state.answered=true;};const out=[];for(const [input,want] of [['30500',true],['3,05*10^4 kg',true],['30600',false]]){state.currentTask=expandGameTask(BANK.find(q=>q.id==='6.422'))[1];state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;window.__parts=null;renderTraining();document.querySelector('#ans-0').value=input;checkAnswer();out.push({input,want,actual:window.__parts?.every(Boolean)});}return out;}''')
 assert all(x['want']==x['actual'] for x in attempts),attempts
 for width in [390,1174]:
  pg.set_viewport_size({'width':width,'height':1000});pg.evaluate('''()=>{state.currentTask=expandGameTask(BANK.find(q=>q.id==='6.422'))[1];state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;renderTraining();showSolution();}''');pg.evaluate('document.fonts.ready');pg.wait_for_timeout(100)
  result=pg.evaluate('''()=>({overflow:document.documentElement.scrollWidth>innerWidth,errors:document.querySelectorAll('.katex-error').length,wide:[...document.querySelectorAll('.sol .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+2).length,fields:document.querySelectorAll('input[id^=ans-]').length})''');assert not result['overflow'] and not result['errors'] and not result['wide'] and result['fields']==1,result
 print(json.dumps({'gradingChecks':len(checks),'uiAttempts':len(attempts),'views':2,'failures':[]}));browser.close()
