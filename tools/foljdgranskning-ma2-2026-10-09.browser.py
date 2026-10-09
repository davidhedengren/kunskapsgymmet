"""Ma2: följdgranskning av svarsfält, delkort, facit och nivåer."""
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
    reviewed=['1.26','1.27','1.30','1.59','1.92','1.206','1.224','1.228','1.231','1.296','1.297','1.298','1.300','1.301','1.302','1.305','2.11','2.248','2.361','2.363','2.365','3.523','3.524','3.525','3.526','3.528']
    expected={'1.26':[3,3],'1.27':[2,-1],'1.59':[4,2],'1.92':[4,3],
      '1.206':[1,2],'1.224':[2,3],'1.231':[4,3],'1.305':[2,2],
      '1.296':[5,13],'1.297':[12,12],'1.298':[15,15],'1.300':[15,10],
      '1.301':[12,8],'1.302':[15,7],'3.528':[10,14]}
    attempts=page.evaluate('''expected=>{
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      const out=[];
      for(const [id,values] of Object.entries(expected)){
        const q=BANKMA2.find(q=>q.id===id);
        for(const [a,b,want] of [[...values,true],[values[0]+1,values[1],false],
           ...(values[0]!==values[1]?[[values[1],values[0],false]]:[])]){
          if(answerLayout(q).n!==2||!answerLayout(q).ordnad)throw Error('Layout '+id);
          state.currentTask=q;state.answered=false;state.solutionShown=false;
          state.partResults=[];state.partIndex=0;window.reviewAttempt=null;renderTraining();
          for(const label of q.svarEtiketter)if(!document.body.textContent.includes(label))throw Error('Label '+id);
          document.getElementById('ans-0').value=String(a);document.getElementById('ans-1').value=String(b);
          for(let i=0;i<3&&!state.answered;i++)checkAnswer();
          const actual=window.reviewAttempt?.every(Boolean);if(actual!==want)throw Error(id+' '+a+','+b);out.push({id,a,b,want});
        }
      }return out.length;
    }''',expected)
    checks=[['1.30',0,'3',True],['1.30',0,'a=3',True],['1.30',0,'6',False],
      ['2.11',0,'1,2',True],['2.11',1,'345,6',True],['2.11',1,'346',False],
      ['2.248',0,'1',True],['2.248',1,'8',True],['2.248',2,'2',True],['2.248',2,'100',False],
      ['2.361',0,'2',True],['2.361',1,'>1',True],['2.361',1,'<1',False],
      ['2.363',0,'3',True],['2.363',1,'0,5',True],['2.363',1,'1/2',True],['2.363',2,'avtagande',True],['2.363',2,'växande',False],
      ['2.365',0,'2',True],['2.365',1,'6',True],['2.365',1,'12',False],
      ['3.523',0,'10 cm',True],['3.523',0,'5',False],['3.524',0,'21,4 m',True],['3.524',0,'21,5',False],
      ['3.525',0,'ja',True],['3.525',0,'nej',False],['3.526',0,'8 cm',True],['3.526',0,'3',False]]
    page.evaluate('''checks=>{
      for(const [id,i,input,want] of checks){const q=expandGameTask(BANKMA2.find(q=>q.id===id))[i];
        if(delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)!==want)throw Error(id+' '+input);}
      const cards=id=>expandGameTask(BANKMA2.find(q=>q.id===id));
      if(!cards('2.11')[1].t.includes('1,2'))throw Error('Faktor saknas');
      for(const id of ['2.361','2.363','2.365'])for(const q of cards(id))
        if(!q.s||q.s===BANKMA2.find(t=>t.id===id).s)throw Error('Gemensamt facit '+q.id);
      for(const q of cards('2.363'))if(!q.t.includes('f(x)'))throw Error('Formel saknas');
      if(cards('2.365')[0].s.includes('C=6')||cards('2.365')[0].s.includes('(0,6)'))throw Error('Facitläcka');
      if(cards('2.365')[1].niva!=='E'||cards('2.365')[1].traningsniva!==2||!cards('2.365')[1].t.includes('2^x'))throw Error('Självständigt b-kort');
      if(!svarsPlan(BANKMA2.find(q=>q.id==='3.525')).delar[0].manuell)throw Error('Motivering måste bedömas manuellt');
    }''',checks)
    # Grafikens linjer verifieras oberoende mot axlarnas skala.
    geometry=page.evaluate(r'''()=>{
      const expected={'1.206':[1,2],'1.224':[2,3],'1.231':[4,3],'1.305':[2,2]};
      for(const [id,answer] of Object.entries(expected)){
        const el=document.createElement('div');el.innerHTML=BANKMA2.find(q=>q.id===id).t;
        const svg=el.querySelector('svg');let lines;
        if(id==='1.231')lines=[...svg.querySelectorAll('path')].map(p=>{const n=p.getAttribute('d').match(/-?[\d.]+/g).map(Number);return [n[0],n[1],...n.slice(-2)];});
        else lines=[...svg.querySelectorAll('line')].filter(l=>['#B43123','#2A5D9E','#555','#888'].includes(l.getAttribute('stroke'))).map(l=>['x1','y1','x2','y2'].map(a=>+l.getAttribute(a)));
        const [[m,b],[n,c]]=lines.map(([x1,y1,x2,y2])=>{const m=(y2-y1)/(x2-x1);return [m,y1-m*x1];});
        const x=(c-b)/(m-n),y=m*x+b;
        const axes={'1.206':[178.18,226.67,358/11,310/12],'1.224':[127.56,268,358/9,31],
          '1.231':[122,221.6666667,37,242/12],'1.305':[60,270,50,40]};
        const [ox,oy,sx,sy]=axes[id];
        if(Math.abs((x-ox)/sx-answer[0])>.005||Math.abs((oy-y)/sy-answer[1])>.005)throw Error('Graf '+id);
      }
      const el=document.createElement('div');el.innerHTML=BANKMA2.find(q=>q.id==='1.228').t;
      const lines=[...el.querySelectorAll('line')].filter(l=>['#B43123','#2A5D9E'].includes(l.getAttribute('stroke')));
      const slopes=lines.map(l=>(+l.getAttribute('y2')-Number(l.getAttribute('y1')))/(+l.getAttribute('x2')-Number(l.getAttribute('x1'))));
      if(Math.abs(slopes[0]-slopes[1])>1e-10||lines[0].getAttribute('y1')===lines[1].getAttribute('y1'))throw Error('Parallella linjer');
      return 5;
    }''')
    # Ett korrekt ja-svar ska fortfarande kräva egen bedömning av motiveringen.
    page.evaluate('''()=>{
      state.currentTask=BANKMA2.find(q=>q.id==='3.525');state.answered=false;state.solutionShown=false;
      state.partResults=[];state.partIndex=0;renderTraining();document.getElementById('ans-0').value='ja';checkAnswer();
      if(state.answered||!document.getElementById('answer-zone').textContent.includes('Stämmer även din motivering?'))throw Error('Motiveringen hoppades över');
    }''')
    views=0
    for theme in ['light','dark']:
      page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
      for width in [390,1174]:
        page.set_viewport_size({'width':width,'height':1000})
        for task_id in (os.environ.get('REVIEW_IDS','').split(',') if os.environ.get('REVIEW_IDS') else reviewed):
          count=page.evaluate('id=>expandGameTask(BANKMA2.find(q=>q.id===id)).length',task_id)
          for part in range(count):
            page.evaluate('''([id,i])=>{state.currentTask=expandGameTask(BANKMA2.find(q=>q.id===id))[i];
              state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;
              renderTraining();showSolution();}''',[task_id,part])
            page.wait_for_timeout(300)
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(task_id,part,theme,width)
            assert page.locator('.katex-error').count()==0,(task_id,part)
            assert page.evaluate("[...document.querySelectorAll('.sol .katex-display')].every(e=>e.scrollWidth<=e.clientWidth+2)"),(task_id,part,'facit',width)
            page.screenshot(path=f'/tmp/follow-ma2-{task_id}-{part}-{theme}-{width}.png',full_page=True)
            views+=1
    print(json.dumps({'reviewed':len(reviewed),'uiAttempts':attempts,'answerChecks':len(checks),'geometryChecks':geometry,'views':views,'failures':[]}))
    browser.close()
