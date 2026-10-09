"""Ma2: modeller, enheter, begripliga facit och fristående kort."""
import json
import os
import urllib.request
from playwright.sync_api import sync_playwright

cache={}
def cdn(route):
    url=route.request.url
    if url not in cache:
        with urllib.request.urlopen(url,timeout=30) as r:cache[url]=(r.status,dict(r.headers),r.read())
    status,headers,body=cache[url]
    route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page()
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**',cdn)
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.goto('http://127.0.0.1:8072/index.html?kurs=ma2')
    page.evaluate("selectCourse('ma2')")
    page.wait_for_function('window.BANKMA2 && typeof window.nerdamer==="function"')
    cases=[['2.19',0,'(x-3)^2+4',True],['2.19',0,'4+(3-x)^2',True],['2.19',0,'(x-3)²+4',True],['2.19',0,'((x-3)^2)+4',True],['2.19',0,r'\left(x-3\right)^{2}+4',True],['2.19',0,'x^2-6x+13',False],['2.19',0,'(x-3)^2+5',False],
      ['2.71',0,'(x+2)^2-3',True],['2.71',0,'x^2+4x+1',False],
      ['2.88',0,'2(x-2)^2-5',True],['2.88',0,'-5+2*(2-x)^2',True],['2.88',0,'2x^2-8x+3',False],['2.88',1,'x=2',True],['2.88',1,'-2',False],
      ['2.190',0,'(x+3)^2-7',True],['2.190',0,'x^2+6x+2',False],
      ['2.194',0,'(x+5)^2-4',True],['2.194',0,'x^2+10x+21',False],
      ['2.195',0,'f(x)=(x+3)^2-11',True],['2.195',0,'x^2+6x-2',False],['2.195',1,'-11',True],['2.195',1,'-3',False],
      ['2.19',0,'x^2-6x+13+0*(x-3)^2',False],['2.19',0,'((x-3)^2+4)^2',False]]
    result=page.evaluate('''cases=>cases.map(([id,part,input,want])=>{
      const q=expandGameTask(BANKMA2.find(q=>q.id===id))[part];
      const actual=delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat);
      return {id,part,input,want,actual};
    })''',cases)
    assert all(x['want']==x['actual'] for x in result),result
    # Kontrollera via samma knapp som eleven använder; inga poäng skrivs till servern.
    page.evaluate('''cases=>{
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      for(const [id,part,input,want] of cases){
        state.currentTask=expandGameTask(BANKMA2.find(q=>q.id===id))[part];state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewAttempt=null;renderTraining();
        document.getElementById('ans-0').value=input;checkAnswer();
        if(window.reviewAttempt?.every(Boolean)!==want)throw Error('UI '+id+' '+input);
      }
      for(const [id,given] of [['2.88','(x-2)^2'],['2.195','(x+3)^2']]){
        const q=expandGameTask(BANKMA2.find(q=>q.id===id))[1];
        if(!q.t.includes(given)||q.traningsniva!==1)throw Error('Delkort '+id);
      }
    }''',cases)
    views=0
    for theme in ['light','dark']:
      page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
      for width in [390,1174]:
        page.set_viewport_size({'width':width,'height':1000})
        for task_id in ['2.19','2.71','2.88','2.190','2.194','2.195']:
          count=page.evaluate('id=>expandGameTask(BANKMA2.find(q=>q.id===id)).length',task_id)
          for part in range(count):
            page.evaluate('''([id,i])=>{state.currentTask=expandGameTask(BANKMA2.find(q=>q.id===id))[i];state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();}''',[task_id,part])
            page.wait_for_timeout(300)
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(task_id,part,theme,width)
            assert page.locator('.katex-error').count()==0,(task_id,part)
            assert page.evaluate("[...document.querySelectorAll('.sol .katex-display')].every(e=>e.scrollWidth<=e.clientWidth+2)"),(task_id,part,width)
            page.screenshot(path=f'/tmp/square-ma2-{task_id}-{part}-{theme}-{width}.png',full_page=True);views+=1
    print(json.dumps({'checks':len(cases),'uiAttempts':len(cases),'views':views,'failures':[]}));browser.close()
