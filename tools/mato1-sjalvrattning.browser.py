"""Kontrollera den riktiga rättningen och renderingen i Chromium.
Kräver Python Playwright och Chromium. Starta först exempelvis
python -m http.server 8062, och kör sedan detta verktyg med --url.
"""
import argparse, json, os, urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--url', default='http://127.0.0.1:8062')
parser.add_argument('--chrome', default='/usr/bin/chromium')
parser.add_argument('--output', default='/tmp/mato1-browser.json')
parser.add_argument('--screenshots', default='/tmp/mato1-rendering')
args = parser.parse_args()
cache = {}
def cdn(route):
    url = route.request.url
    if url not in cache:
        with urllib.request.urlopen(url, timeout=30) as response:
            cache[url] = (response.status, dict(response.headers), response.read())
    status, headers, body = cache[url]
    route.fulfill(status=status, headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']}, body=body)

with sync_playwright() as playwright:
    env = os.environ.copy()
    env.update({'PATH':'/usr/bin:/bin','XDG_CONFIG_HOME':'/tmp/mato1-browser-config','XDG_CACHE_HOME':'/tmp/mato1-browser-cache'})
    browser = playwright.chromium.launch(executable_path=args.chrome, args=['--no-sandbox','--disable-dev-shm-usage'], env=env)
    page = browser.new_page()
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**', cdn)
    page.route('https://fonts.googleapis.com/**', lambda route:route.fulfill(status=200,content_type='text/css',body=''))
    page.goto(args.url.rstrip('/')+'/index.html?kurs=mato1')
    page.evaluate("selectCourse('mato1')")
    page.wait_for_function('window.BANKMATO1 && BANKMATO1.length>=2700 && typeof numericValue==="function"')
    total = page.evaluate('()=>{window.auditMatoCards=BANKMATO1.filter(q=>q.spel!==false).flatMap(expandGameTask);return auditMatoCards.length;}')
    result = {'cards':total,'checks':[],'matherrors':[],'formulas':0,'layoutErrors':[],'uiChecks':[]}
    for start in range(0,total,25):
        batch = page.evaluate(r'''start=>{
          const checks=[],matherrors=[],layoutErrors=[];let formulas=0;
          const test=(q,input,facit,unit,tol,idx,format,want,kind)=>{
            try{checks.push({id:q.id,input,want,actual:delSvarRatt(input,facit,unit,tol,q,idx,format),kind});}
            catch(e){checks.push({id:q.id,input,want,error:String(e),kind});}
          };
          for(const q of auditMatoCards.slice(start,start+25)){
            for(const text of [q.t,q.s,q.ledtrad,...(q.alternativ||[]).map(a=>a.txt)]){
              const el=document.createElement('div');el.innerHTML=text||'';
              renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,errorCallback:m=>matherrors.push({id:q.id,message:String(m)})});
              formulas+=el.querySelectorAll('.katex').length;
              for(const e of el.querySelectorAll('.katex-error'))matherrors.push({id:q.id,message:e.title});
            }
            if(arAlt(q))continue;
            const info=expectedAnswersForTask(q),layout=answerLayout(q);
            if(info.auto && layout.n!==info.answers.length)layoutErrors.push({id:q.id,fields:layout.n,answers:info.answers.length});
            const parts=layout.plan?layout.plan.delar.flatMap(d=>d.auto?d.svar.map((f,j)=>({f,u:d.enhet[j],tol:d.tol[j],fmt:d.format[j],i:j})):[]):info.answers.flatMap((f,i)=>layout.delAuto[i]?[{f,i,u:metadataForDel(q.svarEnhet,i,info.answers.length),tol:metadataForDel(q.tolerans,i,info.answers.length),fmt:metadataForDel(q.svarFormat,i,info.answers.length)}]:[]);
            for(const d of parts){
              const raw=String(d.f),plain=typeof d.f==='string'?latexToPlain(d.f):raw;
              test(q,raw,d.f,d.u,d.tol,d.i,d.fmt,true,'lagrat svar');
              if(plain!==raw && d.fmt!=='intervall' && !/[<>]/.test(raw))test(q,plain,d.f,d.u,d.tol,d.i,d.fmt,true,'utan LaTeX');
              if(d.u)test(q,raw+' '+d.u,d.f,d.u,d.tol,d.i,d.fmt,true,'med enhet');
              if(typeof d.f==='number'&&Number.isFinite(d.f))test(q,String(d.f+Math.max(1,Math.abs(d.f)*.5,Math.abs(d.tol||0)*2)),d.f,d.u,d.tol,d.i,d.fmt,false,'fel tal');
              if(d.fmt==='uttryck'&&/[x]/.test(plain)&&!/[=<>]/.test(hogerled(plain)))test(q,'('+hogerled(plain)+')+1',d.f,d.u,d.tol,d.i,d.fmt,false,'fel uttryck');
              if(d.fmt==='primitiv')for(const [s,want]of [['7+('+hogerled(plain)+')',true],['('+hogerled(plain)+')+K',true],['('+hogerled(plain)+')+x',false]])test(q,s,d.f,d.u,d.tol,d.i,d.fmt,want,'integrationskonstant');
              if(d.fmt==='faktoriserat'){
                test(q,nerdamer(tillNerdamer(normalizeMathInput(hogerled(plain)))).expand().toString(),d.f,d.u,d.tol,d.i,d.fmt,false,'utvecklad summa');
                test(q,'('+hogerled(plain)+')',d.f,d.u,d.tol,d.i,d.fmt,true,'extra parenteser');
              }
              if(!/^[A-F]$/.test(raw)&&/bestäm alla primitiva/i.test(q.t)){
                test(q,'K+('+hogerled(plain).replace(/\+C$/,'')+')',d.f,d.u,d.tol,d.i,d.fmt,true,'godtycklig konstant');
                test(q,hogerled(plain).replace(/\+C$/,''),d.f,d.u,d.tol,d.i,d.fmt,false,'konstant saknas');
              }
            }
          }
          return {checks,matherrors,layoutErrors,formulas};
        }''',start)
        for key in ['checks','matherrors','layoutErrors']:result[key]+=batch[key]
        result['formulas']+=batch['formulas']
        if start%200==0:print('Kontrollerade kort:',min(start+25,total),flush=True)
    focused = [
        ['1.129','2',True],['1.129','-2',False],['1.129','-1',False],
        ['1.113','(x+3)(x-3)',True],['1.113','-(3-x)*(x+3)',True],['1.113','(x*x-9)*1',False],['1.113','x^2-9',False],
        ['1.06','6*x*(x^2-4)',False],['1.06','6*(x+2)*x*(x-2)',True],
        ['1.819','4*(2+x)',True],['1.819','4*x+8',False],
        ['2.25a','f(h+a)-f(a)',True],['2.25a','f*h',False],['2.25a','h*f',False],['2.25a','f(a)-f(a+h)',False],
        ['2.25b','6,1',True],['2.25b','6',False],
        ['2.254a','5^x*ln(5)',False],['2.254a','5/e^x+6*e^(2*x)',True],['2.254b','11',True],
        ['2.309b','y-2=9*(x-2)',True],['2.309b','9',False],['2.309b','y=9*x-18',False],
        ['3.236','7-4/x+2*x*sqrt(x)',True],['3.236','-4/x+2*x^(3/2)+x',False],
        ['3.283','K+x^2+4*x^4',True],
        ['3.04a','K+x^3',True],['3.04a','x^3+2*K+7',True],['3.04a','x^3+K^2',False],['3.04a','x^3+sin(K)',False],['3.04a','x^3+0*K',False],['3.04a','x^3+7',False],['3.283','4*x^4+x^2+sin(x)',False],
        ['3.481a','3 s',True],['3.481a','44,19',False],['3.481b','44,19 m',True],
        ['4.448','150 grader',True],['4.448','30',False],
        ['1.32b','x>3 eller x<-1',True],['1.32b','x>3',False],
    ]
    result['checks']+=page.evaluate('''cases=>cases.map(([id,input,want])=>{const q=auditMatoCards.find(q=>q.id===id);return {id,input,want,kind:'regression',actual:delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)};})''',focused)
    new_ids = [f'1.{i}' for i in range(818,826)]+[f'2.{i}' for i in range(1107,1116)]+[f'3.{i}' for i in range(1150,1157)]+['4.493','4.494','4.495']
    sensitive = ['1.129','1.113','2.25a','2.25b','2.254a','2.254b','2.309a','2.309b','3.481a','3.481b','4.448']
    result['uiChecks']=page.evaluate(r'''ids=>{
      const out=[],oldFinish=finishAttempt;
      finishAttempt=r=>{window.auditAttempt=r;state.answered=true;};
      try{for(const id of ids){
        const q=auditMatoCards.find(q=>q.id===id);
        const run=correct=>{
          state.currentTask=q;state.track=q.kurs.includes('1c')?'1c':'1b';state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];state.altValda=new Set();window.auditAttempt=null;
          renderTraining();
          if(arAlt(q)){
            const a=altLista(q);state.altValda=new Set(correct?a.flatMap((v,i)=>v.ratt?[i]:[]):[a.findIndex(v=>!v.ratt)]);kollaAlt();
          }else{
            const values=expectedAnswersForTask(q).answers;
            values.forEach((v,i)=>{const el=document.getElementById('ans-'+i);if(!el)throw Error('Svarsfält saknas '+id+'/'+i);el.value=correct?String(v):'9999999';});
            for(let i=0;i<values.length+1&&!state.answered;i++)checkAnswer();
          }
          return window.auditAttempt;
        };
        const right=run(true),wrong=run(false);out.push({id,right,wrong,ok:!!right&&right.every(Boolean)&&!!wrong&&wrong.some(v=>!v)});
      }}finally{finishAttempt=oldFinish;}
      return out;
    }''',new_ids+sensitive)
    screenshot_dir=Path(args.screenshots);screenshot_dir.mkdir(parents=True,exist_ok=True)
    figure_ids=['1.820','1.821','3.1152','3.1153','3.1154','4.448','4.446','4.447','4.461','4.464']
    result['rendering']=[]
    for width in [1280,390]:
        page.set_viewport_size({'width':width,'height':900})
        for task_id in figure_ids+['2.254a','2.309b','3.481a','4.493']:
            page.evaluate('''id=>{state.currentTask=auditMatoCards.find(q=>q.id===id);state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();}''',task_id)
            page.wait_for_timeout(50)
            overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth')
            page.screenshot(path=str(screenshot_dir/f'{task_id}-{width}.png'),full_page=True)
            page.evaluate('showSolution()')
            result['rendering'].append({'id':task_id,'width':width,'overflow':overflow,'mathErrors':page.locator('.katex-error').count()})
            if width==390:page.screenshot(path=str(screenshot_dir/f'{task_id}-{width}-facit.png'),full_page=True)
    Path(args.output).write_text(json.dumps(result,ensure_ascii=False,indent=2))
    failures=[c for c in result['checks'] if c.get('actual')!=c['want']]
    print(json.dumps({'cards':total,'checks':len(result['checks']),'failures':failures,'matherrors':result['matherrors'],'layoutErrors':result['layoutErrors'],'uiFailures':[c for c in result['uiChecks'] if not c['ok']],'renderingErrors':[c for c in result['rendering'] if c['overflow'] or c['mathErrors']]},ensure_ascii=False,indent=2))
    browser.close()
    assert not failures and not result['matherrors'] and not result['layoutErrors']
    assert all(c['ok'] for c in result['uiChecks'])
    assert all(not c['overflow'] and not c['mathErrors'] for c in result['rendering'])
