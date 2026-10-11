"""Verkliga svarsfält och statistikfigurer; inga resultat/databasskrivningar."""
import json
import urllib.request
cache={}
def cdn(route):
    url=route.request.url
    if url not in cache:
        with urllib.request.urlopen(url,timeout=30) as r:cache[url]=(r.status,dict(r.headers),r.read())
    status,headers,body=cache[url]
    route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ["content-encoding","content-length","transfer-encoding"]},body=body)
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.route('https://cdn.jsdelivr.net/**',cdn)
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.goto('http://127.0.0.1:8083/index.html?kurs=ma2')
    page.wait_for_function('typeof expandGameTask==="function" && typeof renderMathInElement==="function"')
    out=page.evaluate(r'''async()=>{
      await selectCourse('ma2');finishAttempt=r=>{window.reviewResult=r;state.answered=true;};
      const tests=[['2.711',0,['0,5','0,5','1'],true],['2.711',0,['1','0,5','0,5'],false],
        ['2.711',1,['8','7'],true],['2.711',1,['7','8'],false],
        ['2.407',0,['3','2'],true],['2.407',0,['2','3'],false],
        ['2.436',2,['-3','6'],true],['2.436',2,['6','-3'],false],
        ['1.313',1,['1','0,5'],true],['1.313',1,['0,5','1'],false],
        ['2.707',0,['110','7920'],true],['2.707',0,['7920','110'],false],
        ['2.718',0,['10','1','8'],true],['2.718',0,['8','1','10'],false],
        ['2.141',1,['1,5','-6,25'],true],['2.141',1,['-6,25','1,5'],false],
        ['2.146',2,['1','-4'],true],['2.146',2,['-4','1'],false],
        ['4.299',1,['0,23','0,65'],true],['4.299',1,['0,65','0,23'],false],
        ['4.302',0,['8','2,92'],true],['4.302',0,['2,92','8'],false],
        ['4.302',1,['8','2,61'],true],['4.302',1,['2,61','8'],false],
        ['4.95',0,['59'],true],['4.95',0,['59,1'],false],['4.95',1,['91'],true],['4.95',1,['91,1'],false],['4.95',2,['80%'],true],['4.95',2,['20'],false],
        ['4.50',0,['82'],true],['4.196',0,['54'],true],['4.214',0,['86'],true],
        ['4.300',0,['-0,99'],true],['4.300',0,['-0,98'],false],
        ['4.26',1,['30'],true],['4.87',2,['52,96'],true],['4.72',1,['58'],true],
        ['2.04',0,['-3','7'],true],['2.04',0,['7','-3'],true]];
      let out=[];
      for(const [id,part,values,want] of tests){const q=expandGameTask(window.BANKMA2.find(t=>t.id===id))[part];
        // Testa de numeriska fälten separat från elevens självbedömning av resonemang.
        q.manuellKomplettering=false;state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;
        renderTraining(); values.forEach((v,i)=>{document.getElementById('ans-'+i).value=v});
        for(let i=0;i<values.length&&!state.answered;i++)checkAnswer();
        out.push({id,part,values,want,actual:window.reviewResult?.every(Boolean),labels:q.svarEtiketter});
      }return out;
    }''')
    assert all(x['want']==x['actual'] for x in out),[x for x in out if x['want']!=x['actual']]
    views=[]
    for width in [390,1280]:
        page.set_viewport_size({'width':width,'height':1000})
        for id,part in [('4.50',0),('4.196',0),('4.214',0),('4.95',2),('4.300',1),('4.299',1),('4.136',0),('4.138',0),('4.139',0),('4.146',0),('4.162',0),('4.290',0),('4.303',0),('4.306',0),('2.711',0)]:
            page.evaluate('''args=>{state.currentTask=expandGameTask(window.BANKMA2.find(t=>t.id===args[0]))[args[1]];
              state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();}''',[id,part])
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(id,width)
            if id in ['4.50','4.196','4.214','4.95']:assert page.locator('.tbody svg').count()==1
            if id=='4.95':
                assert '10 %' in page.locator('.tbody').inner_text()
                assert '80' not in page.locator('.tbody').inner_text()
                assert page.evaluate('state.currentTask.traningsniva')==1
            if id=='2.711':assert page.evaluate('state.currentTask.svarEtiketter')==['a','b','c']
            if page.locator('.tbody table').count():
                assert page.evaluate('''()=>Array.from(document.querySelectorAll('.tbody table')).every(t=>
                  t.getBoundingClientRect().width<=t.parentElement.getBoundingClientRect().width+1 &&
                  Array.from(t.rows).every(r=>r.cells.length<=3))'''),(id,width)
            if id in ['4.50','4.196','4.214','4.95','4.300','2.711']:
                page.locator('.tbody').screenshot(path=f'/tmp/review-1618-{id}-{width}.png')
            page.evaluate('showSolution()');assert page.locator('.katex-error').count()==0,(id,width)
            assert page.evaluate("Array.from(document.querySelectorAll('.sol .katex-display')).every(e=>e.scrollWidth<=e.clientWidth+2)"),(id,width,'wide formula')
            views.append([id,part,width])
    physics=page.evaluate(r'''async()=>{
      await selectCourse('fy1');let out=[];
      for(const [id,part,inputs] of [['6.300',0,[['7856',true],['7856 Pa',true],['7,856 kPa',true],['7900',false],['7856 kPa',false]]],
        ['5.99',0,[['2,12',true],['2,12 m/s',true],['2,1213203436',true],['1,8',false]]]]){
        const q=expandGameTask(window.BANK.find(t=>t.id===id))[part];
        for(const [input,want] of inputs){state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];
          window.reviewResult=null;renderTraining();document.getElementById('ans-0').value=input;checkAnswer();
          out.push({id,input,want,actual:window.reviewResult?.every(Boolean)});}
      }return out;
    }''')
    assert all(x['want']==x['actual'] for x in physics),physics
    assert not errors,errors
    print(json.dumps({'mathAnswerChecks':len(out),'physicsAnswerChecks':len(physics),'views':len(views),'javascriptErrors':errors}))
    browser.close()
