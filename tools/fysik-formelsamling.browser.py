"""Kontrollerar alternativa tabellfacit i riktiga svarsfält utan XP/databasskrivningar."""
import json,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 status,headers,body=cache[u];route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)
# Values derived independently from the givens; include rounded values, alternate units,
# adjacent wrong values, wrong dimensions and an unaffected answer field.
cases=[['2.29',0,'8372000 J',True],['2.29',0,'8372001',False],['2.29',1,'2,33 kWh',True],['2.29',1,'2.34',False],['2.32',3,'1103.25 W',True],['2.32',3,'1104.25',False],['2.33',5,'2093000 J',True],['2.33',5,'2093001',False],['5.562',1,'501 N',True],['5.562',1,'503',False],['2.29',4,'0,800 J',True],['2.29',4,'0.801',True],['2.29',4,'0.802',False],['2.29',4,'0.8 N',False],
 ['4.74',1,'10,42 kN',True],['4.74',1,'10420 N',True],['4.74',1,'10.43',True],['4.74',1,'10.40',False],['4.74',1,'10.42 kg',False],
 ['4.74',2,'11,77',True],['4.74',2,'11.78 kN',True],['4.74',2,'11.76',False],['4.74',0,'10.42',False],
 ['4.740',0,'686 N',True],['4.740',0,'685',True],['4.740',0,'687',False],['4.740',0,'0',False],
 ['4.742',0,'1,63 N/kg',True],['4.742',0,'1.62',True],['4.742',0,'1.61',False],
 ['4.742',3,'25,95 N/kg',True],['4.742',3,'25.94',True],['4.742',3,'25.96',False],
 ['5.498',2,'26034',True],['5.498',2,'26047',True],['5.498',2,'26035',False],['5.498',2,'26046',False]]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1280,'height':1100});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://cdn.jsdelivr.net/**',cdn)
 page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
 page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.goto('http://127.0.0.1:8083/index.html?kurs=fy1');page.evaluate("selectCourse('fy1')")
 page.wait_for_function('window.BANK&&typeof nerdamer==="function"')
 page.evaluate('''()=>{
  finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
  window.reviewTask=(q,index)=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];
   state.partIndex=index;state.altValda=new Set();window.reviewOutcome=null;renderTraining();};
 }''')
 checks=[]
 for source in ['heluppgift','delkort']:
  for id,index,input,want in cases:
   result=page.evaluate('''([id,index,input,source])=>{
    const parent=BANK.find(q=>q.id===id),parts=expandGameTask(parent);
    const split=source==='delkort'&&parts.length>1,q=split?parts[index]:parent,field=split?0:index;
    const expected=Array.isArray(q.rättSvar)?q.rättSvar[field]:q.rättSvar;
    const unit=Array.isArray(q.svarEnhet)?q.svarEnhet[field]:q.svarEnhet;
    const tol=Array.isArray(q.tolerans)?q.tolerans[field]:q.tolerans;
    const fmt=Array.isArray(q.svarFormat)?q.svarFormat[field]:q.svarFormat;
    const direct=delSvarRatt(input,expected,unit,tol,q,field,fmt);
    reviewTask(q,field);const el=document.getElementById('ans-'+field);if(!el)throw Error('missing input '+id+' '+field);
    el.value=input;checkAnswer();const actual=state.partResults[field]??window.reviewOutcome?.[field];
    return {id,index,input,source,direct,actual};
   }''',[id,index,input,source]);checks.append(result)
   assert result['direct']==want and result['actual']==want,(result,want)
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':1100})
  for id in ['8.22','9.12','6.347','4.742','5.498']:
   page.evaluate('id=>{reviewTask(BANK.find(q=>q.id===id),0);showSolution();}',id)
   assert page.locator('.task .katex-error').count()==0,id
   page.locator('.task').screenshot(path=f'/tmp/formelsamling-{id}-{width}.png')
 assert not errors,errors
 report={'checks':len(checks),'views':10,'javascriptErrors':errors,'cases':checks}
 Path('/tmp/physics-formelsamling-browser.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
 print('PASS',len(checks),'riktiga svarsfält, 10 visningar, inga JavaScript-fel');browser.close()
