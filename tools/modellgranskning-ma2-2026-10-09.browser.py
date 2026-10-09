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
    reviewed=['1.37','1.38','1.39','1.64','1.80','1.117','1.138','1.223','1.234','1.271','1.325','1.326']
    # Förväntade värden beräknade oberoende från villkoren i uppgifterna.
    vectors={'1.37':[8,4],'1.39':[28,24],'1.80':[33,53],'1.117':[192,72,36],'1.223':[20,10,15]}
    attempts=page.evaluate('''vectors=>{
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      let count=0;
      for(const [id,values] of Object.entries(vectors)){
        for(const [input,want] of [[values,true],[[values[0]+1,...values.slice(1)],false],[[...values].reverse(),false]]){
          const q=BANKMA2.find(q=>q.id===id);
          state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;window.reviewAttempt=null;renderTraining();
          if(answerLayout(q).n!==values.length)throw Error('Layout '+id);
          input.forEach((v,i)=>document.getElementById('ans-'+i).value=String(v));
          for(let i=0;i<5&&!state.answered;i++)checkAnswer();
          if(window.reviewAttempt?.every(Boolean)!==want)throw Error('Rättning '+id+' '+input);count++;
        }
      }return count;
    }''',vectors)
    checks=[['1.37',0,'8 kg',True],['1.138',0,'200 min',True],['1.138',0,'100',False],
      ['1.234',0,'105 kr',True],['1.234',0,'60',False],
      ['1.271',0,'13 kr/km',True],['1.271',0,'120',False],['1.271',1,'120 kr',True],
      ['1.271',1,'13',False],['1.271',2,'406 kr',True],['1.271',2,'286',False],
      ['1.325',0,'4 kg',True],['1.325',0,'6 kg',False],['1.326',0,'1 km/h',True],['1.326',0,'2',False]]
    # 1.37 har flera samtidiga fält; övriga testas som verkliga delkort.
    page.evaluate('''checks=>{
      for(const [id,i,input,want] of checks){const q=expandGameTask(BANKMA2.find(q=>q.id===id))[i];
        const multi=Array.isArray(q.rättSvar),answer=multi?q.rättSvar[0]:q.rättSvar;
        if(delSvarRatt(input,answer,multi?q.svarEnhet[0]:q.svarEnhet,multi?q.tolerans?.[0]:q.tolerans,q,0,multi?q.svarFormat[0]:q.svarFormat)!==want)throw Error(id+' '+input);}
      const taxi=expandGameTask(BANKMA2.find(q=>q.id==='1.271'));
      if(taxi.map(q=>q.traningsniva).join()!=='3,2,1')throw Error('Taxinivåer');
      if(!taxi[1].t.includes('13 kr')||!taxi[2].t.includes('120+13x'))throw Error('Tidigare resultat saknas');
      if(taxi[0].s.includes('120')||taxi[1].s.includes('406'))throw Error('Facitläcka');
      const mobile=expandGameTask(BANKMA2.find(q=>q.id==='1.138'));
      state.currentTask=mobile[1];state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;renderTraining();
      document.getElementById('ans-0').value='B';checkAnswer();
      if(state.answered||!document.getElementById('answer-zone').textContent.includes('Stämmer även din motivering?'))throw Error('Motiveringskontroll');
    }''',checks)
    alternatives=page.evaluate('''()=>{
      const q=expandGameTask(BANKMA2.find(q=>q.id==='1.234'))[1];
      if(!arAlt(q))throw Error('Förklaringsalternativ saknas');
      for(let choice=0;choice<3;choice++){
        state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;state.altValda=new Set();window.reviewAttempt=null;renderTraining();
        const options=altLista(q);state.altValda=new Set([choice]);kollaAlt();
        if(window.reviewAttempt?.every(Boolean)!==options[choice].ratt)throw Error('Alternativ '+choice);
      }return 3;
    }''')
    views=0
    for theme in ['light','dark']:
      page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
      for width in [390,1174]:
        page.set_viewport_size({'width':width,'height':1000})
        for task_id in reviewed:
          count=page.evaluate('id=>expandGameTask(BANKMA2.find(q=>q.id===id)).length',task_id)
          for part in range(count):
            page.evaluate('''([id,i])=>{state.currentTask=expandGameTask(BANKMA2.find(q=>q.id===id))[i];state.altValda=new Set();
              state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;renderTraining();showSolution();}''',[task_id,part])
            page.wait_for_timeout(300)
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(task_id,part,theme,width)
            assert page.locator('.katex-error').count()==0,(task_id,part)
            assert page.evaluate("[...document.querySelectorAll('.sol .katex-display')].every(e=>e.scrollWidth<=e.clientWidth+2)"),(task_id,part,'facit',width)
            page.screenshot(path=f'/tmp/models-ma2-{task_id}-{part}-{theme}-{width}.png',full_page=True);views+=1
    print(json.dumps({'reviewed':len(reviewed),'uiAttempts':attempts,'answerChecks':len(checks),'alternativeAttempts':alternatives,'views':views,'failures':[]}))
    browser.close()
