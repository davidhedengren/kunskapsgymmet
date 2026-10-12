"""Rapporter 09:58: oberoende beräkningar och verkliga svarsfält utan XP/databasskrivning."""
import argparse
import json
import math
import urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=8083)
args = parser.parse_args()
cache = {}


def cdn(route):
    url = route.request.url
    if url not in cache:
        with urllib.request.urlopen(url, timeout=30) as r:
            cache[url] = (r.status, dict(r.headers), r.read())
    status, headers, body = cache[url]
    route.fulfill(status=status, headers={k: v for k, v in headers.items()
                  if k.lower() not in ['content-encoding', 'content-length', 'transfer-encoding']}, body=body)


# (ID, oberoende svar, avrundade svar, enheter). Uttryck och val prövas separat.
models = [
    ('7.01', [1.8/12, 1.8/12*30], [.15, 4.5], ['kg', 'kg']),
    ('7.03', [2.45*100, 1250/1000, 32/10], [245, 1.25, 3.2], ['cm', 'm', 'cm']),
    ('7.06', [36*1.08], [38.88], ['m²']),
    ('7.07', [780+1250, (780+1250)*.06, (780+1250)*1.06], [2030, 121.8, 2151.8], ['kr']*3),
    ('7.08', [120*.75], [90], ['kg']), ('7.10', [2.5/10*18], [4.5], ['l']),
    ('3.81', [5000*.04], [200], ['kr']), ('3.85', [18000*.03], [540], ['kr']),
    ('3.87', [20000*1.02*.02], [408], ['kr']), ('3.112', [900000*.04/12], [3000], ['kr']),
    ('3.39', [16439.38/1.055**3], [14000], ['kr']), ('3.08', [(10500-10000)/10000*100], [5], ['%']),
    ('3.126', [((11255.09/10000)**.25-1)*100], [3.0], ['%']),
    ('3.80', [(27208.48/((20000*1.02+5000)*1.04)-1)*100], [3], ['%']),
    ('3.82', [(math.sqrt(1.21275/1.05)-1)*100], [7.47], ['%']),
    ('3.89', [384/12000*100], [3.2], ['%']), ('3.07', [(1-(178000/260000)**.2)*100], [7.3], ['%']),
    ('3.40', [1+.024, '12000*1.024^5', 12000*1.024**5], [1.024, '12000*1.024^5', 13510.80], ['', 'kr', 'kr']),
    ('3.127', [1350*120, 1350*120-120000, 780/1350*100], [162000, 42000, 57.8], ['kr', 'kr', '%']),
    ('3.25', [75*150/100, (135-75*150/100)/(75*150/100)*100], [112.5, 20], ['kr', '%']),
    ('3.26', [143-100, 250*143/100, 480*100/160], [43, 357.5, 300], ['%', 'kr', 'kr']),
    ('3.28', [2400*1.25, 1875/1.25, 1875-1875/1.25], [3000, 1500, 375], ['kr']*3),
    ('3.38', [99000/.18, ((680000/(99000/.18))**.25-1)*100], [550000, 5.45], ['kr', '%']),
    ('3.88', [1+.028, 8200*1.028**3, 8200*1.028**3-8200], [1.028, 8908.27, 708.27], ['', 'kr', 'kr']),
    ('3.223', [7500*1.018**2], [7772], ['kr']), ('3.203', [10000*1.025**5], [11314], ['kr']),
    ('3.217', [8000*1.03**2], [8487], ['kr']), ('3.518', [10000*1.03**5], [11593], ['kr']),
    ('3.519', [25000*1.02**10], [30475], ['kr']), ('3.520', [4000*1.045**3], [4565], ['kr']),
    ('3.84', [math.ceil(120/(.032-.025))], [17143], ['kr']),
]
g = 9.82
v = 4*math.pi*.03**3/3
physics = [
    ('6.470', [18000*g*(1-1000/7850), (70-1000*.03)*g, 70*g], [150000, 390, 690], ['N']*3),
    ('6.312', [2*g], [20], ['N']), ('6.359', [3*g], [29], ['N']),
    ('6.324', [2*g-7], [12.64], ['N']), ('6.468', [7870*v*g, (7870-1000)*v*g], [8.74, 7.63], ['N']*2),
    ('6.473', [(2700-850)*.02*.03*.05*g], [.545], ['N']),
]
choices = [('3.258', 'B', 'A'), ('3.256', 'A', 'B'), ('3.255', 'B', 'A'), ('3.83', 'A', 'B')]
cases = []
for course, rows in [('ma1', models), ('fy1', physics)]:
    for id, values, rounded, units in rows:
        for part, (value, right, unit) in enumerate(zip(values, rounded, units)):
            if isinstance(value, str):
                inputs = [('12000*1.024^5', True), ('12000·1,024^5 kr', True), ('12000*1.24^5', False)]
            else:
                inputs = [(str(value), True), (str(right), True), (str(right)+' '+unit, True),
                          (str(value)+' '+unit, True), (str(value*2), False)]
                if unit:
                    inputs.append((str(right)+' '+('N' if unit != 'N' else 'Pa'), False))
                if unit == '%':
                    inputs.extend([(str(value/100), True), (str(right/100)+' %', False)])
            cases.extend([[course, id, part, text, want] for text, want in inputs])
for id, right, wrong in choices:
    cases += [['ma1', id, 0, right, True], ['ma1', id, 0, wrong, False]]
cases += [['ma1', '7.01', 0, '150 g', True], ['ma1', '7.01', 1, '4500 g', True],
          ['ma1', '7.03', 0, '2,45 m', False], ['ma1', '7.03', 2, '32 mm', False],
          ['ma1', '7.10', 0, '4,5 liter', True], ['ma1', '3.39', 0, '14000 kronor', True]]
for id, right in [('3.223', 7772), ('3.203', 11314), ('3.217', 8487), ('3.518', 11593), ('3.519', 30475), ('3.520', 4565), ('3.39', 14000)]:
    cases += [['ma1', id, 0, str(right-1)+' kr', False], ['ma1', id, 0, str(right+1)+' kr', False]]
cases += [['ma1', '3.126', 0, '3,1 %', False], ['ma1', '3.82', 0, '7,48 %', False],
          ['ma1', '3.40', 2, '13510,79 kr', False], ['ma1', '3.88', 1, '8908,28 kr', False],
          ['ma1', '3.88', 2, '708,26 kr', False]]
cases += [['fy1', '6.470', 2, text, want] for text, want in
          [('690 N', True), ('6,9e2 N', True), ('6,9x10^2 N', True), ('6,9x10^+2 N', True),
           ('0,690 kN', True), ('687,4 N', True), ('680 N', False), ('700 N', False), ('690 kN', False)]]

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1280, 'height': 1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**', cdn)
    page.route('https://*.supabase.co/**', lambda r: r.abort())
    page.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, content_type='text/css', body=''))
    page.goto(f'http://127.0.0.1:{args.port}/index.html?kurs=ma1')
    page.wait_for_function('typeof renderMathInElement==="function" && typeof window.nerdamer==="function"')
    page.evaluate('finishAttempt=r=>{window.reviewResult=r;state.answered=true;}')
    checks = page.evaluate('''async rows=>{let out=[];for(const[course,id,part,input,want]of rows){
      if(state.course!==course)await selectCourse(course);
      state.currentTask=expandGameTask(state.data.bank.find(q=>q.id===id))[part];
      state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;
      renderTraining();document.getElementById('ans-0').value=input;checkAnswer();
      out.push({course,id,part,input,want,actual:window.reviewResult?.every(Boolean)===true});}
      return out;}''', cases)
    failures = [x for x in checks if x['want'] != x['actual']]
    Path('/tmp/review-0958-checks.json').write_text(json.dumps(checks, ensure_ascii=False, indent=2))
    assert not failures, failures

    # Verifiera även metadata på hela flerdelsuppgifter, inte bara efter delning.
    full_cases = [[course, id, [str(x)+' '+unit if unit else str(x) for x, unit in zip(values, units)]]
                  for course, rows in [('ma1', models), ('fy1', physics)]
                  for id, values, _, units in rows if len(values)>1]
    full = page.evaluate('''async rows=>{let out=[];for(const[course,id,values]of rows){
      if(state.course!==course)await selectCourse(course);state.currentTask=state.data.bank.find(q=>q.id===id);
      state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];window.reviewResult=null;renderTraining();
      values.forEach((v,i)=>document.getElementById('ans-'+i).value=v);
      for(let i=0;i<values.length&&!state.answered;i++)checkAnswer();
      out.push({course,id,values,actual:window.reviewResult?.every(Boolean)===true});}return out;}''', full_cases)
    assert all(x['actual'] for x in full), full

    views = []
    all_ids = {'ma1': [x[0] for x in models]+[x[0] for x in choices]+['3.86'], 'fy1': [x[0] for x in physics]}
    for course, ids in all_ids.items():
        page.evaluate('async c=>await selectCourse(c)', course)
        for width in [390, 1280]:
            page.set_viewport_size({'width': width, 'height': 1000})
            cards = page.evaluate('''ids=>ids.flatMap(id=>expandGameTask(state.data.bank.find(q=>q.id===id)).map((_,i)=>[id,i]))''', ids)
            for id, part in cards:
                page.evaluate('''x=>{state.currentTask=expandGameTask(state.data.bank.find(q=>q.id===x[0]))[x[1]];
                  state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];renderTraining();showSolution();}''', [id, part])
                bad = page.evaluate("Array.from(document.querySelectorAll('.sol .katex-display')).filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.querySelector('annotation')?.textContent)")
                views.append({'course': course, 'id': id, 'part': part, 'width': width, 'wide': bad,
                              'katexErrors': page.locator('.katex-error').count()})
                if id in ['7.01', '3.126', '3.40', '3.258', '3.223', '6.470']:
                    page.locator('.tshell').screenshot(path=f'/tmp/review-0958-{course}-{id}-{part}-{width}.png')
    result = {'checks': checks, 'full': full, 'views': views, 'javascriptErrors': errors}
    Path('/tmp/review-0958.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
    assert not errors, errors
    assert all(not v['wide'] and not v['katexErrors'] for v in views), [v for v in views if v['wide'] or v['katexErrors']]
    print(json.dumps({'actualAnswerFields': len(checks), 'wholeQuestionChecks': len(full), 'views': len(views), 'javascriptErrors': errors}))
    browser.close()
