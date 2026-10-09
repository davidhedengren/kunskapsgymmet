"""Hela Elektricitet: körbara kortkontrakt och faktisk visning. Fysik räknas separat."""
import json,os,urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 url=route.request.url
 if url not in cache:
  with urllib.request.urlopen(url,timeout=30) as r:cache[url]=(r.status,dict(r.headers),r.read())
 status,headers,body=cache[url]
 route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':1000})
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.goto('http://127.0.0.1:8072/index.html?kurs=fy1');page.evaluate("selectCourse('fy1')");page.wait_for_function('window.BANK && typeof window.nerdamer==="function"')
 selected=json.loads(os.environ.get('ELECTRICITY_IDS','null'))
 info=page.evaluate('''selected=>{
   const tasks=BANK.filter(q=>q.kap===8&&(!selected||selected.includes(q.id))),cards=tasks.flatMap(expandGameTask),failures=[];let checked=0;
   for(const q of cards){
    const answers=Array.isArray(q.rättSvar)?q.rättSvar:[q.rättSvar];
    answers.forEach((v,i)=>{if(typeof v!=='number')return;
     const unit=Array.isArray(q.svarEnhet)?q.svarEnhet[i]:q.svarEnhet, tol=Array.isArray(q.tolerans)?q.tolerans[i]:q.tolerans, format=Array.isArray(q.svarFormat)?q.svarFormat[i]:q.svarFormat;
     for(const [input,want] of [[String(v),true],[String(v===0?123:v*10),false]]){
      try{const actual=delSvarRatt(input,v,unit,tol,q,i,format);if(actual!==want)failures.push({id:q.id,type:'answer-contract',input,want,actual});checked++;}catch(e){failures.push({id:q.id,type:'exception',error:String(e)});}
     }
    });
   }
   return {parents:tasks.length,cards:cards.map(q=>q.id),numericContractChecks:checked,failures};
 }''',selected)
 failures=info.pop('failures');cards=info.pop('cards');views=0
 for theme,width in ([('light',390)] if os.environ.get('ELECTRICITY_BASELINE') else [('light',390),('dark',390),('light',1174),('dark',1174)]):
  page.set_viewport_size({'width':width,'height':1000});page.evaluate('t=>document.documentElement.dataset.theme=t',theme)
  for id in cards:
   try:
    page.evaluate('''id=>{const q=BANK.filter(q=>q.kap===8).flatMap(expandGameTask).find(q=>q.id===id);state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.altValda=new Set();renderTraining();showSolution();}''',id)
    page.wait_for_timeout(30)
    found=page.evaluate('''()=>({page:document.documentElement.scrollWidth>innerWidth,math:[...document.querySelectorAll('.sol .katex-display')].filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.textContent),errors:[...document.querySelectorAll('.katex-error')].map(e=>e.textContent)})''')
    if found['page'] or found['math'] or found['errors']:
     failures.append(dict(id=id,type='render',theme=theme,width=width,**found));page.screenshot(path=f'/tmp/electricity-{id}-{theme}-{width}.png',full_page=True)
    views+=1
   except Exception as e:failures.append(dict(id=id,type='render-exception',error=str(e)))
 print(json.dumps(dict(**info,cards=len(cards),views=views,failures=len(failures))))
 with open(os.environ.get('ELECTRICITY_OUTPUT','/tmp/electricity-browser.json'),'w') as f:json.dump(dict(**info,cards=len(cards),views=views,failures=failures),f,ensure_ascii=False,indent=2)
 b.close()
 if failures and not os.environ.get('ELECTRICITY_BASELINE'):raise SystemExit(1)
