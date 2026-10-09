"""Riktad granskning av fem felrapporter med riktiga spelkort och rättningskod."""
import json
import urllib.request
from playwright.sync_api import sync_playwright

cache = {}
def cdn(route):
    url = route.request.url
    if url not in cache:
        with urllib.request.urlopen(url, timeout=30) as response:
            cache[url] = (response.status, dict(response.headers), response.read())
    status, headers, body = cache[url]
    route.fulfill(status=status, headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']}, body=body)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page()
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**', cdn)
    page.route('https://fonts.googleapis.com/**', lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.route('https://*.supabase.co/**', lambda r:r.abort())
    page.goto('http://127.0.0.1:8072/index.html?kurs=mato1')
    page.evaluate("selectCourse('mato1')")
    page.wait_for_function('window.BANKMATO1 && typeof window.nerdamer==="function"')
    page.evaluate("window.reviewCards=BANKMATO1.flatMap(expandGameTask)")
    cases = [
        ['2.562', 'e^x+e', True], ['2.562', "f'(x)=e^x+e", True],
        ['2.562', "f'(x) = e + e^x", True], ['2.562', 'e*(e^(x-1)+1)', True],
        ['2.562', 'e^x+1', False], ['2.562', "f'(x)=e^x+1", False],
        ['2.562', 'e^x+e*x', False], ['2.562', "f'(x)=e^x+e=1", False],
        ['3.1151', '8x', True], ['3.1151', "f''(x)=8x", True],
        ['3.1151', "f''(x) = 4*2*x", True], ['3.1151', '8', False],
        ['3.1151', "f''(x)=8", False], ['3.1151', '8x+1', False],
        ['2.610', '2', True], ['2.610', 'x=2', True], ['2.610', '-2', False],
    ]
    checks = page.evaluate('''cases=>cases.map(([id,input,want])=>{
      const q=reviewCards.find(q=>q.id===id);
      return {id,input,want,actual:delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)};
    })''', cases)
    assert all(c['actual']==c['want'] for c in checks), checks
    # Varje grafkort har figuren och endast den aktuella delens facit.
    page.evaluate(r'''()=>{
      const parts=expandGameTask(BANKMATO1.find(q=>q.id==='2.374'));
      if(parts.length!==3)throw Error('Delkort saknas');
      for(const q of parts)if(!q.t.includes('<svg') || !q.s || !q.ledtrad)throw Error('Ofullständigt delkort');
      if(/maximipunkt|minimipunkt|växande|avtagande/.test(parts[0].s))throw Error('Facitläcka i a');
      if(/maximipunkt|minimipunkt/.test(parts[1].s))throw Error('Facitläcka i b');
      if(!parts[2].s.includes('(-1,') || !parts[2].s.includes('(1,'))throw Error('Fel koordinater');
      if(answerLayout(parts[0]).n!==2 || parts[0].självrättning!==true)throw Error('Fel svarsfält i a');
      if(parts[1].självrättning!==false || parts[2].självrättning!==false)throw Error('Manuell bedömning saknas');
    }''')
    attempts = page.evaluate('''cases=>{
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      return cases.map(([id,input,want])=>{
        const q=reviewCards.find(q=>q.id===id);
        state.currentTask=q;state.answered=false;state.solutionShown=false;
        state.partResults=[];state.partIndex=0;window.reviewAttempt=null;
        renderTraining();document.getElementById('ans-0').value=input;checkAnswer();
        return {id,input,want,actual:window.reviewAttempt?.every(Boolean)};
      });
    }''', cases)
    assert all(c['actual']==c['want'] for c in attempts), attempts
    # Nollställena i grafuppgiften får anges i båda ordningarna.
    roots = page.evaluate('''()=>{
      const out=[],q=reviewCards.find(q=>q.id==='2.374a');
      for(const values of [[-1,1],[1,-1],[-1,-1],[0,1]]){
        state.currentTask=q;state.answered=false;state.solutionShown=false;
        state.partResults=[];state.partIndex=0;window.reviewAttempt=null;renderTraining();
        values.forEach((v,i)=>document.getElementById('ans-'+i).value=String(v));
        for(let i=0;i<3&&!state.answered;i++)checkAnswer();
        out.push({values,actual:window.reviewAttempt?.every(Boolean)});
      }
      return out;
    }''')
    assert [r['actual'] for r in roots]==[True,True,False,False], roots
    views = 0
    for theme in ['dark', 'light']:
        page.evaluate('t=>document.documentElement.dataset.theme=t', theme)
        for width in [390, 1174]:
            page.set_viewport_size({'width':width,'height':1000})
            for task_id in ['2.374a','2.374b','2.374c','2.610','2.562','3.1151']:
                page.evaluate('''id=>{state.currentTask=reviewCards.find(q=>q.id===id);
                  state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;renderTraining();showSolution();}''', task_id)
                page.wait_for_timeout(350)
                assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'), (task_id,theme,width)
                assert page.locator('.katex-error').count()==0, task_id
                if task_id=='2.610':
                    assert page.locator('.fig svg polyline').get_attribute('stroke')=='#1d4ed8'
                page.screenshot(path=f'/tmp/reported-1859-{task_id}-{theme}-{width}.png',full_page=True)
                views += 1
    page.evaluate("selectCourse('fy1')")
    page.wait_for_function('window.BANK')
    gas_cases = [['6,23',True],['6.2325',True],['6,23 liter',True],['6.23 l',True],
                 ['0,0062325 m³',True],['6232,5 ml',True],['6,22',False],['6,24',False],
                 ['0,0062325',False],['6232,5',False],['-6,23',False]]
    gas = page.evaluate('''cases=>{
      const q=BANK.find(q=>q.id==='6.338');
      if(Math.abs(q.rättSvar-0.250*8.31*300/100000*1000)>1e-12)throw Error('Fel gasvolym');
      return cases.map(([input,want])=>({input,want,actual:delSvarRatt(input,q.rättSvar,q.svarEnhet,q.tolerans,q,0,q.svarFormat)}));
    }''', gas_cases)
    assert all(c['actual']==c['want'] for c in gas), gas
    gas_attempts = page.evaluate('''()=>{
      const q=BANK.find(q=>q.id==='6.338');
      return [['6,23',true],['6,23 liter',true],['6,24',false]].map(([input,want])=>{
        state.currentTask=q;state.answered=false;state.solutionShown=false;
        state.partResults=[];state.partIndex=0;window.reviewAttempt=null;renderTraining();
        document.getElementById('ans-0').value=input;checkAnswer();
        return {input,want,actual:window.reviewAttempt?.every(Boolean)};
      });
    }''')
    assert all(c['actual']==c['want'] for c in gas_attempts), gas_attempts
    for width in [390,1174]:
        page.set_viewport_size({'width':width,'height':1000})
        page.evaluate("state.currentTask=BANK.find(q=>q.id==='6.338');state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=0;renderTraining();showSolution();")
        assert not page.evaluate('document.documentElement.scrollWidth>innerWidth')
        assert page.locator('.katex-error').count()==0
        views += 1
    print(json.dumps({'gradingChecks':len(checks)+len(gas)+len(roots),'uiAttempts':len(attempts)+len(roots)+len(gas_attempts),'views':views,'failures':[]}))
    browser.close()
