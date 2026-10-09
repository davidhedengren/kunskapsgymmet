"""Fysik 1: hela laddningsområdet, avrundning/enheter, delkort och influens."""
import json
import urllib.request
from playwright.sync_api import sync_playwright

cache={}
def cdn(route):
    url=route.request.url
    if url not in cache:
        with urllib.request.urlopen(url,timeout=30) as r:cache[url]=(r.status,dict(r.headers),r.read())
    status,headers,body=cache[url]
    route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)

# Oberoende fysikvärden och naturliga elevsvar; inte skapade ur bankens rättSvar.
cases=[]
def numeric(id,part,good,bad):
    for x in good:cases.append([id,part,x,True])
    for x in bad:cases.append([id,part,x,False])
numeric('8.9',0,['-4,8','-4.806 µC','-4.806e-6 C'],['4.8','0','-48'])
numeric('8.297',0,['2e10','20000000000 elektroner'],['-2e10','2e9'])
numeric('8.298',0,['-1,6','-1.602e-9 C'],['1.6','0','-16'])
numeric('8.25',0,['5e10','4.99*10^10 elektroner'],['-5e10','5e9'])
numeric('8.35',0,['-1.92e-15','-1.9*10^-15 C'],['1.92e-15','0','-1.92e-14'])
numeric('8.35',1,['1.6e10','1.56*10^10 elektroner'],['-1.6e10','1.6e9'])
numeric('8.171',0,['2e10','1.9975e10 elektroner'],['-2e10','2e9'])
numeric('8.172',0,['3e10','2.996e10 elektroner'],['-3e10','3e9'])
numeric('8.173',0,['-800','-801 nC','-8.01e-7 C'],['800','-80'])
numeric('8.181',0,['4e10','3.995e10 elektroner'],['-4e10','4e9'])
numeric('8.182',0,['-0,64','-6.4e-7 C'],['0.64','-1.28'])
numeric('8.373',0,['2','2 elektroner'],['1','-2'])
numeric('8.375',0,['-4','-4.005 nC','-4.005e-9 C'],['4','-40'])
numeric('8.391',0,['3e10','2.996e10 elektroner'],['-3e10','1.5e10'])
numeric('8.391',1,['1.5e10','1.498e10 elektroner'],['-1.5e10','3e10'])
numeric('8.394',0,['6.24e18','6.24*10^18 elektroner'],['-6.24e18','6.24e17'])
numeric('8.475',0,['3.1e13','3.12e13 elektroner'],['-3.1e13','6.24e12'])
numeric('8.496',0,['2','2 elektroner'],['-2','8'])
numeric('8.499',0,['4','+4 nC','4e-9 C'],['-4','8'])
numeric('8.500',0,['3','+3 nC'],['-3','4'])
numeric('8.507',0,['20','20 cm','0.20 m'],['10','20 m'])
numeric('8.315',0,['3','3 µC','3e-6 C'],['-3','6'])
numeric('8.387',0,['3','3 nC','3e-9 C'],['6','12'])
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page()
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**',cdn)
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.goto('http://127.0.0.1:8072/index.html?kurs=fy1')
    page.evaluate("selectCourse('fy1')")
    page.wait_for_function('window.BANK && typeof window.nerdamer==="function"')
    result=page.evaluate('''cases=>cases.map(([id,part,input,want])=>{
      const q=expandGameTask(BANK.find(q=>q.id===id))[part];
      const actual=delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat);
      return {id,part,input,want,actual};
    })''',cases)
    failed=[x for x in result if x['want']!=x['actual']]
    assert not failed,failed
    counts=page.evaluate('''cases=>{
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      const prepare=q=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.altValda=new Set();window.reviewAttempt=null;renderTraining();};
      for(const [id,part,input,want] of cases){
        const q=expandGameTask(BANK.find(q=>q.id===id))[part];prepare(q);
        document.getElementById('ans-0').value=input;checkAnswer();
        if(window.reviewAttempt?.every(Boolean)!==want)throw Error('UI '+id+' '+input);
        if(document.getElementById('answer-zone')?.textContent.includes('Stämmer även din motivering?'))throw Error('Onödig manuell komplettering '+id);
      }
      const tasks=BANK.filter(q=>(q.omr==='laddning'||['8.315','8.387','8.388','8.389','8.390','8.507','8.508','8.509','8.510','8.511','8.512','8.513','8.514'].includes(q.id)));let alternatives=0;
      for(const parent of tasks)for(const q of expandGameTask(parent)){
        if(!arAlt(q))continue;
        for(let index=0;index<q.alternativ.length;index++){
          prepare(q);const opts=altLista(q);state.altValda=new Set([index]);const want=!!opts[index].ratt;kollaAlt();
          if(window.reviewAttempt?.every(Boolean)!==want)throw Error('Alternativ '+q.id+' '+index);alternatives++;
        }
      }
      const [a,b]=expandGameTask(BANK.find(q=>q.id==='8.25'));
      if(!b.t.includes('elektronerna')||b.traningsniva!==1||!arAlt(b))throw Error('8.25 b');
      if(a.s.includes('från håret till'))throw Error('Facitläcka 8.25 a');
      const [c,d]=expandGameTask(BANK.find(q=>q.id==='8.391'));
      if(!d.t.includes('−4,8 nC')||!d.t.includes('fördelas lika'))throw Error('8.391 b saknar information');
      if(c.s.includes('1{,}5'))throw Error('Facitläcka 8.391 a');
      if(expandGameTask(BANK.find(q=>q.id==='8.35'))[1].självrättning!==true)throw Error('8.35 b');
      return {parents:tasks.length,cards:tasks.flatMap(expandGameTask).length,alternatives};
    }''',cases)
    views=0
    ids=page.evaluate("BANK.filter(q=>(q.omr==='laddning'||['8.315','8.387','8.388','8.389','8.390','8.507','8.508','8.509','8.510','8.511','8.512','8.513','8.514'].includes(q.id))).map(q=>q.id)")
    for theme in ['light','dark']:
      page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
      for width in [390,1174]:
        page.set_viewport_size({'width':width,'height':1000})
        for task_id in ids:
          count=page.evaluate('id=>expandGameTask(BANK.find(q=>q.id===id)).length',task_id)
          for part in range(count):
            page.evaluate('''([id,i])=>{state.currentTask=expandGameTask(BANK.find(q=>q.id===id))[i];state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.altValda=new Set();renderTraining();showSolution();}''',[task_id,part])
            page.wait_for_timeout(70)
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(task_id,part,theme,width)
            assert page.locator('.katex-error').count()==0,(task_id,part)
            assert page.evaluate("[...document.querySelectorAll('.sol .katex-display')].every(e=>e.scrollWidth<=e.clientWidth+2)"),(task_id,part,width,'mattebredd')
            if task_id in ['8.9','8.35','8.391','8.501','8.503','8.504','8.505','8.506','8.511','8.512']:
              page.screenshot(path=f'/tmp/charge-fy1-{task_id}-{part}-{theme}-{width}.png',full_page=True)
            views+=1
    print(json.dumps(dict(numericChecks=len(cases),uiAttempts=len(cases),views=views,**counts,failures=[])));browser.close()
