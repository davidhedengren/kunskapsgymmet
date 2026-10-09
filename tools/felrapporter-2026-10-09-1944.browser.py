"""Fyra rapporter: numeriska vinkelsvar och läsbara enhetscirklar."""
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
    angle_cases=[['90','56',True],['90°','56°',True],['90 grader','56 grader',True],
                 ['90,0','56,0',True],['56','90',False],['90','55',False],['89','56',False]]
    angles=page.evaluate('''cases=>{
      const q=BANKMA2.find(q=>q.id==='3.158'),layout=answerLayout(q);
      if(layout.n!==2 || !layout.ordnad)throw Error('Två ordnade svarsfält krävs');
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      return cases.map(([a,b,want])=>{
        state.currentTask=q;state.answered=false;state.solutionShown=false;
        state.partResults=[];state.partIndex=0;window.reviewAttempt=null;renderTraining();
        if(!document.body.textContent.includes('Vinkel ACB')||!document.body.textContent.includes('Vinkel ABC'))throw Error('Svarsetiketter saknas');
        document.getElementById('ans-0').value=a;document.getElementById('ans-1').value=b;
        for(let i=0;i<3&&!state.answered;i++)checkAnswer();
        return {a,b,want,actual:window.reviewAttempt?.every(Boolean)};
      });
    }''',angle_cases)
    assert all(c['want']==c['actual'] for c in angles),angles
    page.evaluate("selectCourse('mato1')")
    page.wait_for_function('window.BANKMATO1')
    cases=[['4.412','-0,707',True],['4.412','-sqrt(2)/2',True],['4.412','0,707',False],
           ['4.422','0,77',True],['4.422','0,64',False],['4.445','0',True],['4.445','1',False]]
    checks=page.evaluate('''cases=>cases.map(([id,input,want])=>{const q=BANKMATO1.find(q=>q.id===id);
      return {id,input,want,actual:delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)};
    })''',cases)
    assert all(c['want']==c['actual'] for c in checks),checks
    # Markeringarnas vinklar och radier verifieras från koordinaterna.
    page.evaluate('''()=>{
      for(const [id,angle] of [['4.412',225],['4.422',50],['4.445',180]]){
        const el=document.createElement('div');el.innerHTML=BANKMATO1.find(q=>q.id===id).t;
        const [circle,point]=el.querySelectorAll('circle');
        const x=+point.getAttribute('cx')-Number(circle.getAttribute('cx'));
        const y=Number(circle.getAttribute('cy'))-Number(point.getAttribute('cy'));
        const actual=(Math.atan2(y,x)*180/Math.PI+360)%360;
        if(Math.abs(actual-angle)>.1 || Math.abs(Math.hypot(x,y)-Number(circle.getAttribute('r')))>.1)throw Error('Fel geometri '+id);
      }
    }''')
    views=0
    for theme in ['light','dark']:
        page.evaluate('theme=>document.documentElement.dataset.theme=theme',theme)
        for width in [390,1174]:
            page.set_viewport_size({'width':width,'height':1000})
            for task_id in ['3.158','4.412','4.422','4.445']:
                page.evaluate('''id=>{state.currentTask=(id==='3.158'?BANKMA2:BANKMATO1).find(q=>q.id===id);
                  state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;
                  renderTraining();showSolution();}''',task_id)
                page.wait_for_timeout(350)
                assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(task_id,theme,width)
                assert page.locator('.katex-error').count()==0,task_id
                assert page.evaluate("[...document.querySelectorAll('.sol .katex-display')].every(e=>e.scrollWidth<=e.clientWidth+2)"),(task_id,'för bred facitformel',width)
                if task_id!='3.158':
                    contrast=page.evaluate(r'''()=>{
                      const luminance=color=>{const c=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
                      const svg=document.querySelector('.fig svg'),bg=luminance(getComputedStyle(svg.querySelector('rect')).fill);
                      return [...svg.querySelectorAll('line,circle,text')].map(el=>{
                        const s=getComputedStyle(el),color=el.tagName==='text'||el.getAttribute('r')==='4'?s.fill:s.stroke;
                        const fg=luminance(color);return (Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05);
                      });
                    }''')
                    assert min(contrast)>=4.5,(task_id,theme,contrast)
                page.screenshot(path=f'/tmp/reported-1944-{task_id}-{theme}-{width}.png',full_page=True)
                views+=1
    print(json.dumps({'angleUiAttempts':len(angles),'trigChecks':len(checks),'geometryChecks':3,'views':views,'failures':[]}))
    browser.close()
