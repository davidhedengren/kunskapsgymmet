"""Gasrapport 19:39: pröva riktiga svarsfält, delkort och heluppgift utan databas-/XP-skrivningar."""
import argparse
import json
import urllib.request
from decimal import Decimal, ROUND_HALF_UP
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--student-port', type=int, default=8083)
args = parser.parse_args()
CACHE = {}

# Oberoende relationer från uppgifternas givna värden, inte deras facit.
MODELS = [
    ('6.21', 0, lambda k: 150*(60+k)/(20+k), 1, 'bar'),
    ('6.21', 1, lambda k: 100*((60+k)/(20+k)-1), 1, '%'),
    ('6.19', 0, lambda k: 101.3*(45+k)/(18+k), 1, 'kPa'),
    ('6.20', 0, lambda k: 1.26*(28+k)/(8+k)-1.01, 3, 'bar'),
    ('6.50', 0, lambda k: 3*(30+k)/(12+k), 2, 'dm³'),
    ('6.84', 0, lambda k: 2*(-18+k)/(20+k), 2, 'liter'),
    ('6.214', 0, lambda k: 8*(100+k)/(10+k), 2, 'MPa'),
    ('6.221', 0, lambda k: 115*(70+k)/(20+k), 0, 'kPa'),
]

def rounded(value, decimals):
    return str(Decimal(str(value)).quantize(Decimal(10)**-decimals, rounding=ROUND_HALF_UP))

def cdn(route):
    url = route.request.url
    if url not in CACHE:
        with urllib.request.urlopen(url, timeout=30) as r:
            CACHE[url] = (r.status, dict(r.headers), r.read())
    status, headers, body = CACHE[url]
    route.fulfill(status=status, headers={k:v for k,v in headers.items() if k.lower() not in
                  ['content-encoding','content-length','transfer-encoding']}, body=body)

cases = []
for id, part, model, decimals, unit in MODELS:
    values = [model(k) for k in [273.15, 273]]
    for value in values:
        r = rounded(value, decimals)
        for answer in [str(value), r, r.replace('.',','), r+' '+unit]:
            cases.append([id, part, answer, True])
    step = 10**-decimals
    for answer in [str(min(values)-2*step), str(max(values)+2*step), rounded(values[0], decimals)+' m']:
        cases.append([id, part, answer, False])

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width':1280,'height':1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**', cdn)
    page.route('https://*.supabase.co/**', lambda r:r.abort())
    page.route('https://fonts.googleapis.com/**', lambda r:r.fulfill(status=200, content_type='text/css', body=''))
    page.goto(f'http://127.0.0.1:{args.student_port}/index.html?kurs=fy1')
    page.wait_for_function('typeof expandGameTask==="function" && typeof renderMathInElement==="function"')
    page.evaluate('async()=>{await selectCourse("fy1");finishAttempt=r=>{window.reviewResult=r;state.answered=true;};}')
    results = page.evaluate('''cases=>cases.map(([id,part,input,want])=>{
      const q=expandGameTask(state.data.bank.find(t=>t.id===id))[part];
      state.currentTask=q;state.answered=false;state.solutionShown=false;
      state.partIndex=0;state.partResults=[];window.reviewResult=null;renderTraining();
      const fields=document.querySelectorAll('[id^="ans-"]');
      if(fields.length!==1)throw Error(id+' fel antal fält: '+fields.length);
      document.getElementById('ans-0').value=input;checkAnswer();
      return{id,part,input,want,actual:window.reviewResult?.every(Boolean)===true};
    })''', cases)
    assert all(r['want']==r['actual'] for r in results), [r for r in results if r['want']!=r['actual']]
    # Samma metadata ska fungera när hela uppgiften rättas tillsammans.
    parent_inputs = [['170,5 bar','13,6 %'],['170.5','13.7'],
                     [str(MODELS[0][2](273.15)),str(MODELS[1][2](273.15))],
                     [str(MODELS[0][2](273)),str(MODELS[1][2](273))]]
    parents = page.evaluate('''inputs=>inputs.map(answers=>{
      const q=state.data.bank.find(t=>t.id==='6.21');
      state.currentTask=q;state.answered=false;state.solutionShown=false;
      state.partIndex=0;state.partResults=[];window.reviewResult=null;renderTraining();
      answers.forEach((v,i)=>document.getElementById('ans-'+i).value=v);
      checkAnswer();checkAnswer();
      return{answers,actual:window.reviewResult};
    })''', parent_inputs)
    assert all(r['actual']==[True,True] for r in parents), parents
    # Sex liknande flerdelsuppgifter: egna samband och båda temperaturskalorna.
    g=9.82
    parent_models = [
        ('6.4', lambda k:[101+15*g/.002/1000,
             1.2*101/(101+15*g/.002/1000)*(80+k)/(20+k),
             (1.2-1.2*101/(101+15*g/.002/1000)*(80+k)/(20+k))*1000/20], [1,3,1]),
        ('6.22', lambda k:[1.29-600/2200,(15+k)*1.29/(1.29-600/2200)-k], [3,1]),
        ('6.54', lambda k:[101/54,(-18+k)/(20+k),2*101/54*(-18+k)/(20+k)], [2,2,2]),
        ('6.201', lambda k:[16*8.31*(10+k)/35000,(10+k)*.5*100/35-k], [3,1]),
        ('6.213', lambda k:[230*(38+k)/(15+k),100*(1-(15+k)/(38+k))], [1,2]),
        ('6.513', lambda k:[8e6*(100+k)/(10+k),240000*(-25+k)/(20+k),
                             101000*(100+k)/(17+k),115000*(70+k)/(20+k)], None),
    ]
    parent_cases=[]
    for id,model,decimals in parent_models:
        for k in [273.15,273]:
            values=model(k)
            parent_cases.append([id,[str(v) for v in values],True])
            answers=[rounded(v,d) for v,d in zip(values,decimals)] if decimals else [f'{v:.3g}' for v in values]
            parent_cases.append([id,answers,True])
        wrong=[str(v) for v in model(273.15)]
        wrong[-1]='-999999'
        parent_cases.append([id,wrong,False])
    analogue_results=page.evaluate('''cases=>cases.map(([id,answers,want])=>{
      state.currentTask=state.data.bank.find(t=>t.id===id);state.answered=false;state.solutionShown=false;
      state.partIndex=0;state.partResults=[];window.reviewResult=null;renderTraining();
      answers.forEach((v,i)=>document.getElementById('ans-'+i).value=v);
      for(let i=0;i<answers.length;i++)checkAnswer();
      return{id,answers,want,actual:window.reviewResult?.every(Boolean)===true};
    })''',parent_cases)
    assert all(r['actual']==r['want'] for r in analogue_results), [r for r in analogue_results if r['actual']!=r['want']]
    views = []
    for width in [390,1280]:
        page.set_viewport_size({'width':width,'height':1000})
        for id, part, *_ in MODELS:
            page.evaluate('''([id,part])=>{
              state.currentTask=expandGameTask(state.data.bank.find(t=>t.id===id))[part];
              state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];
              renderTraining();showSolution();
            }''', [id,part])
            quality = page.evaluate('''()=>({
              katex:document.querySelectorAll('.katex-error').length===0,
              page:document.documentElement.scrollWidth<=innerWidth,
              formulas:Array.from(document.querySelectorAll('.sol .katex-display')).every(e=>e.scrollWidth<=e.clientWidth+2)
            })''')
            assert all(quality.values()), (id,part,width,quality)
            views.append([id,part,width])
    assert not errors, errors
    print(json.dumps({'answerChecks':len(results),'parentChecks':len(parents)+len(analogue_results),
                      'views':len(views),'javascriptErrors':errors},ensure_ascii=False))
    browser.close()
