"""Verklig rättning, avrundat kortfacit och stickprov; inga databas-/XP-skrivningar."""
import json,urllib.request
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
    page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.route('https://cdn.jsdelivr.net/**',cdn)
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.goto('http://127.0.0.1:8083/index.html?kurs=fy1')
    page.wait_for_function('typeof expandGameTask==="function" && typeof renderMathInElement==="function"')
    physics=page.evaluate(r'''async()=>{
      await selectCourse('fy1');finishAttempt=r=>{window.reviewResult=r;state.answered=true;};let out=[];
      const tests=[['5.575',0,[['30',true],['30,0',true],['30 N',true],['0,0300 kN',true],['31',false]]],
        ['5.497',1,[['17700',true],['1,77e4 J',true],['17,7 kJ',true],['17676',true],['17750',false]]],
        ['5.14',0,[['24,0',true],['25',false]]],['5.20',1,[['120',true],['130',false]]],
        ['5.42',0,[['79500 J',true],['80000',false]]],['5.46',0,[['1,20e3 J',true],['1201',true],['1210',false]]],
        ['5.145',0,[['1470',true],['1480',false]]],['5.67',0,[['10,0 kJ',true],['10 J',false]]]];
      for(const [id,part,inputs]of tests){const q=expandGameTask(window.BANK.find(t=>t.id===id))[part];
        for(const [input,want]of inputs){state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;
          renderTraining();document.getElementById('ans-0').value=input;checkAnswer();out.push({id,part,input,want,actual:window.reviewResult?.every(Boolean)});
        }}return out;
    }''')
    assert all(x['want']==x['actual'] for x in physics),physics
    short_answers=[]
    for id,part,expected in [('5.575',0,'30,0'),('5.497',1,r'1{,}77\cdot10^{4}'),('5.14',0,'24,0'),('5.20',1,'120'),('5.42',0,r'7{,}95\cdot10^{4}'),('5.46',0,r'1{,}20\cdot10^{3}'),('5.145',0,r'1{,}47\cdot10^{3}'),('5.67',0,'10,0')]:
        page.evaluate('''x=>{state.currentTask=expandGameTask(window.BANK.find(t=>t.id===x[0]))[x[1]];
          state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();
          document.getElementById('ans-0').value='-999';checkAnswer();}''',[id,part])
        if '\\' in expected:
            actual=page.locator('#corr-0 annotation[encoding="application/x-tex"]').text_content()
            assert actual==expected,(id,actual,expected)
        else:assert expected in page.locator('#corr-0').inner_text(),(id,expected)
        assert page.locator('.katex-error').count()==0
        short_answers.append(id)
    math_checks=page.evaluate(r'''async()=>{
      await selectCourse('ma2');let out=[];
      const tests=[['5.94',['21,00','0,32'],true],['5.94',['21','0,316227766'],true],['5.94',['21','0,28'],false],
        ['5.94',['21','0,33'],false],['5.71',['21,00','0,71','21,00','1,41'],true],
        ['5.71',['21','0,63','21','1,26'],false],['5.162',['42'],true],['5.162',['42 °C'],true],['5.162',['30'],false],
        ['5.92',['-1','40','47'],true],['5.90',['-4','64 W','6'],true],['5.121',['5'],true],['5.121',['5 månader'],true],
        ['5.110',['5','0,63','5','2'],true]];
      for(const [id,values,want]of tests){const q=window.BANKMA2.find(t=>t.id===id);
        state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;
        renderTraining();values.forEach((v,i)=>document.getElementById('ans-'+i).value=v);
        for(let i=0;i<values.length&&!state.answered;i++)checkAnswer();out.push({id,values,want,actual:window.reviewResult?.every(Boolean)});
      }return out;
    }''')
    assert all(x['want']==x['actual'] for x in math_checks),math_checks
    views=[]
    for course,ids in [('fy1',[('5.575',0),('5.575',1),('5.575',2),('5.497',1)]),('ma2',[('5.94',0),('5.71',0),('5.162',0),('5.92',0),('5.90',0),('5.121',0),('5.66',0),('5.110',0),('4.306',0),('4.299',1)])]:
        page.evaluate('async c=>await selectCourse(c)',course)
        for width in [390,1280]:
            page.set_viewport_size({'width':width,'height':1000})
            for id,part in ids:
                page.evaluate('''x=>{const bank=x[2]==='fy1'?window.BANK:window.BANKMA2;
                  state.currentTask=expandGameTask(bank.find(t=>t.id===x[0]))[x[1]];state.answered=false;state.solutionShown=false;
                  state.partIndex=0;state.partResults=[];renderTraining();showSolution();}''',[id,part,course])
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(id,part,width,'page width')
                assert page.locator('.katex-error').count()==0,(id,part,width)
                assert page.evaluate("Array.from(document.querySelectorAll('.sol .katex-display')).every(e=>e.scrollWidth<=e.clientWidth+2)"),(id,part,width,'wide formula')
                assert page.evaluate("Array.from(document.querySelectorAll('.tbody table')).every(e=>e.getBoundingClientRect().width<=e.parentElement.getBoundingClientRect().width+1)"),(id,part,width,'table')
                if id in ['5.94','5.162','5.497','5.575'] and part<2:
                    page.locator('.tshell').screenshot(path=f'/tmp/review-1749-{course}-{id}-{part}-{width}.png')
                views.append([course,id,part,width])
    assert not errors,errors
    print(json.dumps({'physicsChecks':len(physics),'shortAnswerDisplays':len(short_answers),'mathChecks':len(math_checks),'views':len(views),'javascriptErrors':errors}))
    browser.close()
