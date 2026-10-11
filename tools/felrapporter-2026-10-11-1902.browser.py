"""Rapporter 19:02: verkliga svarsfält och självständiga kort, utan databas-/XP-skrivningar."""
import json, pathlib, urllib.request
from playwright.sync_api import sync_playwright
CACHE = {}
HALVES = [
    ['5.72',0,245.5,246,245,'N'], ['5.270',0,17.55,17.6,17.5,'kWh'],
    ['5.160',3,1.125,1.13,1.12,'m/s'], ['5.370',0,41.25,41.3,41.2,'m/s'],
    ['5.375',0,562.5,563,562,'N'], ['5.381',0,-2.835,-2.84,-2.83,'kg*m/s'],
    ['5.209',2,736.5,737,736,'J'], ['5.578',0,3525,3530,3520,'N'],
    ['5.505',2,76.25,76.3,76.2,'J'], ['5.509',1,370.5,371,370,'J'],
    ['5.514',3,4805,4810,4800,'N'], ['6.457',1,245.5,246,245,'Pa'],
    ['5.529',1,212.5,213,212,'J'], ['5.533',0,0.07365,0.0737,0.0736,'N'],
    ['5.418',1,0.002275,0.00228,0.00227,'J'], ['5.440',2,0.7875,0.788,0.787,'m/s'],
]
FULL = {
    'fy1':['5.224','6.105','5.55','5.485','5.508','5.514','5.537','5.543',
           '6.254','6.305','6.261','6.264','6.356','5.52','5.474','5.492','5.494'],
    'ma1':['0.987','0.988','0.989','0.990','0.991','0.992','0.993','0.994','0.995','0.996','0.997'],
}

def cdn(route):
    url=route.request.url
    if url not in CACHE:
        with urllib.request.urlopen(url,timeout=30) as r:
            CACHE[url]=(r.status,dict(r.headers),r.read())
    status,headers,body=CACHE[url]
    route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in
                  ['content-encoding','content-length','transfer-encoding']},body=body)

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
    page.evaluate('finishAttempt=r=>{window.reviewResult=r;state.answered=true;}')
    checks=page.evaluate(r'''async halves=>{
      let out=[];const test=(id,part,input,want)=>{
        const q=expandGameTask(state.data.bank.find(t=>t.id===id))[part];
        state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;
        renderTraining();document.getElementById('ans-0').value=input;checkAnswer();
        out.push({course:state.course,id,part,input,want,actual:window.reviewResult?.every(Boolean)===true});
      };
      await selectCourse('fy1');
      const direct=[['5.224',0,[['1,45 N',true],['1.4456810962709665',true],['1,44',false]]],
        ['5.224',1,[['3,48',true],['3.48 m',true],['3,476910041971399',true],['3,47',false],['3,49',false],['3,48 cm',false]]],
        ['6.105',0,[['71,4',true],['71.4259476182508 m',true],['71,5',false],['71,3',false]]],
        ['5.55',0,[['0,025',true],['0.025 kg',true],['2,5e-2 kg',true],['25',false],['0,25',false],['0,025 N',false]]]];
      for(const[id,part,inputs]of direct)for(const[input,want]of inputs)test(id,part,input,want);
      for(const[id,part,raw,right,wrong,unit]of halves){test(id,part,String(raw)+' '+unit,true);test(id,part,String(right)+' '+unit,true);test(id,part,String(wrong)+' '+unit,false);}
      // Fem tryckanalogier, självständigt räknade från respektive givna data.
      for(const[id,raw,rounded,wrong]of [['6.254',29460/(1000*9.82),3,3.1],['6.305',3928/(1000*9.82),.4,.41],
        ['6.261',(179860-101300)/(1000*9.82),8,8.1],['6.264',24000/(870*9.82),2.81,2.82],['6.356',19640/(1000*9.82),2,2.01]]){
        test(id,0,String(raw),true);test(id,0,String(rounded)+' m',true);test(id,0,String(wrong),false);
      }
      await selectCourse('ma1');
      for(const[input,want]of [['3,1',true],['3.1 h',true],['3,125',true],['3,125 h',true],['3,2',false],['3,0',false]])test('0.992',0,input,want);
      for(const[id,raw,wrong]of [['0.987',21/(7/2)+5*(7/2),24],['0.988',40/2.5*6,95],['0.989',26.1/87*100,3],
        ['0.990',Math.round(100/(42/350)),834],['0.991',(6.8-.55*10)*2.5,3.3],['0.993',7.5/3*10,10],
        ['0.994',(12/8)*(20/(5/4)),16],['0.995',Math.round(42.195),43],['0.996',Math.round(1849/100)*100,1900],['0.997',.125*68,8.6]]){
        const value=Math.abs(raw-Math.round(raw))<1e-10?String(Math.round(raw)):String(Number(raw.toFixed(10)));
        test(id,0,value,true);test(id,0,value.replace('.',','),true);test(id,0,String(wrong),false);
      }
      return out;
    }''',HALVES)
    assert all(x['want']==x['actual'] for x in checks),[x for x in checks if x['want']!=x['actual']]
    views=[];quality_issues=[];short=[]
    for course,ids in FULL.items():
        page.evaluate('async c=>await selectCourse(c)',course)
        selected={id:None for id in ids}
        if course=='fy1':
            selected.update({id:[part] for id,part,*_ in HALVES if id not in ids})
        for width in [390,1280]:
            page.set_viewport_size({'width':width,'height':1000})
            for id,parts in selected.items():
                if parts is None:
                    parts=range(page.evaluate('id=>expandGameTask(state.data.bank.find(t=>t.id===id)).length',id))
                for part in parts:
                    page.evaluate('''([id,part])=>{state.currentTask=expandGameTask(state.data.bank.find(t=>t.id===id))[part];
                      state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();}''',[id,part])
                    quality=page.evaluate(r'''()=>({page:document.documentElement.scrollWidth<=innerWidth,
                      katex:document.querySelectorAll('.katex-error').length===0,
                      formulas:Array.from(document.querySelectorAll('.sol .katex-display')).every(e=>e.scrollWidth<=e.clientWidth+2),
                      raw:!/\[[(]/.test(document.querySelector('.sol')?.innerText||''),
                      table:Array.from(document.querySelectorAll('.tbody table')).every(e=>e.getBoundingClientRect().width<=e.parentElement.getBoundingClientRect().width+1)})''')
                    view={'course':course,'id':id,'part':part,'width':width};views.append(view)
                    if not all(quality.values()):quality_issues.append({**view,**quality})
                    if id in ['5.224','6.105','5.55','0.992','5.514']:
                        page.locator('.tshell').screenshot(path=f'/tmp/review-1902-{course}-{id}-{part}-{width}.png')
    # Efter ett felaktigt försök ska det korta facit också ha rätt avrundning.
    page.evaluate('async()=>await selectCourse("fy1")')
    for id,part,raw,right,wrong,unit in HALVES:
        page.evaluate('''([id,part])=>{state.currentTask=expandGameTask(state.data.bank.find(t=>t.id===id))[part];
          state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();
          document.getElementById('ans-0').value='-999';checkAnswer();}''',[id,part])
        shown=page.locator('#corr-0').inner_text()
        # Kontrollera det faktiskt visade värdet, även vid grundpotensform i KaTeX.
        rendered=page.locator('#corr-0 annotation[encoding="application/x-tex"]').all_text_contents()
        value=page.evaluate(r'''tex=>{
          let s=tex.replace(/\{,\}/g,'.').replace(/,/g,'.').replace(/−/g,'-');
          const power=s.match(/([-+]?\d+(?:\.\d+)?)\s*\\cdot\s*10\^\{([-+]?\d+)\}/);
          if(power)return Number(power[1])*10**Number(power[2]);
          return Number(s.match(/[-+]?\d+(?:\.\d+)?/)?.[0]);
        }''',rendered[0] if rendered else shown)
        assert abs(value-right)<1e-10,(id,shown,rendered,value,right)
        assert page.locator('.katex-error').count()==0
        short.append([id,part,shown])
    result={'answerChecks':len(checks),'views':len(views),'viewIssues':quality_issues,'shortDisplays':len(short),'javascriptErrors':errors}
    pathlib.Path('/tmp/1902-browser-result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(result,ensure_ascii=False))
    assert not quality_issues and not errors,result
    browser.close()
