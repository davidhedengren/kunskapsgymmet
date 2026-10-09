"""Ma2: varierade grafer, tydliga svarsfält och självständiga delkort."""
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
    cases=[['1.29','6','5',True],['1.29','x=6','y=5',True],['1.29','5','6',False],
      ['1.299','10','6',True],['1.299','6','10',False],
      ['1.226','-2','1',True],['1.226','2','3',False],
      ['1.303','1','4',True],['1.303','2','3',False],
      ['1.304','3','-1',True],['1.304','2','3',False]]
    results=page.evaluate('''cases=>{
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      return cases.map(([id,a,b,want])=>{
        const q=BANKMA2.find(q=>q.id===id),layout=answerLayout(q);
        if(layout.n!==2||!layout.ordnad)throw Error('Svarsfält '+id);
        state.currentTask=q;state.answered=false;state.solutionShown=false;
        state.partResults=[];state.partIndex=0;window.reviewAttempt=null;renderTraining();
        if(id==='1.299'&&!document.body.textContent.includes('Antal hoodies'))throw Error('Etikett saknas');
        document.getElementById('ans-0').value=a;document.getElementById('ans-1').value=b;
        for(let i=0;i<3&&!state.answered;i++)checkAnswer();
        return {id,a,b,want,actual:window.reviewAttempt?.every(Boolean)};
      });
    }''',cases)
    assert all(x['want']==x['actual'] for x in results),results
    page.evaluate('''()=>{
      const cards=expandGameTask(BANKMA2.find(q=>q.id==='2.12'));
      if(cards.length!==3)throw Error('Delkort');
      for(const [i,input,want] of [[0,'2',true],[1,'1,5',true],[1,'1.5',true],[1,'50',false],[2,'växande',true]]){
        const q=cards[i];if(delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)!==want)throw Error('2.12 '+input);
        if(!q.t.includes('h(x)'))throw Error('Funktion saknas i delkort');
      }
      const geo=expandGameTask(BANKMA2.find(q=>q.id==='3.529'));
      if(geo[0].traningsniva!==4||geo[1].traningsniva!==5)throw Error('Nivå');
      if(!delSvarRatt('60',geo[0].rättSvar,geo[0].svarEnhet,geo[0].tolerans,geo[0],0,geo[0].svarFormat))throw Error('Area');
      for(const id of ['1.226','1.303','1.304']){
        const q=BANKMA2.find(q=>q.id===id),el=document.createElement('div');el.innerHTML=q.t;
        const lines=[...el.querySelectorAll('.systemlinje')].map(l=>{
          const x1=+l.getAttribute('x1'),y1=+l.getAttribute('y1'),x2=+l.getAttribute('x2'),y2=+l.getAttribute('y2');
          const m=(y2-y1)/(x2-x1);return [m,y1-m*x1];
        });
        const [[m,b],[n,c]]=lines,x=(c-b)/(m-n),y=m*x+b;
        if(Math.abs((x-172)/32-q.rättSvar[0])>1e-8||Math.abs((216-y)/32-q.rättSvar[1])>1e-8)throw Error('Fel figur '+id);
      }
    }''')
    views=0
    for theme in ['light','dark']:
      page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
      for width in [390,1174]:
        page.set_viewport_size({'width':width,'height':1000})
        for task_id in ['1.29','1.299','1.226','1.303','1.304','2.12','3.529']:
          page.evaluate('''id=>{const q=BANKMA2.find(q=>q.id===id);
            state.currentTask=id==='2.12'?expandGameTask(q)[1]:id==='3.529'?expandGameTask(q)[0]:q;
            state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;
            renderTraining();showSolution();}''',task_id)
          page.wait_for_timeout(350)
          assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(task_id,theme,width)
          assert page.locator('.katex-error').count()==0,task_id
          assert page.evaluate("[...document.querySelectorAll('.sol .katex-display')].every(e=>e.scrollWidth<=e.clientWidth+2)"),(task_id,'facit',width)
          page.screenshot(path=f'/tmp/reported-2049-{task_id}-{theme}-{width}.png',full_page=True)
          views+=1
    print(json.dumps({'uiAttempts':len(results),'cardChecks':6,'geometryChecks':3,'views':views,'failures':[]}))
    browser.close()
