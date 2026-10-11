"""Riktiga svarsfält, fem analoger och facitvisning; inga databas-/XP-skrivningar.

Kör med --port för den lokala Kunskapsgymmet-servern (standard 8083).
"""
import argparse
import json
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
        with urllib.request.urlopen(url, timeout=30) as response:
            cache[url] = (response.status, dict(response.headers), response.read())
    status, headers, body = cache[url]
    route.fulfill(status=status, headers={k: v for k, v in headers.items()
                  if k.lower() not in ['content-encoding', 'content-length', 'transfer-encoding']}, body=body)


g = 9.82
# Egna beräkningar från frågornas givna data, inklusive b-kortets 17,2 kPa.
models = [
    ('6.445', [1060*g*1.65, 17200*.000094], ['Pa', 'N']),
    ('6.436', [998*g*10, 101300+998*g*20, (350000-101300)/(998*g)], ['Pa', 'Pa', 'm']),
    ('6.437', [101300+1025*g*55, 1025*g*3200, 999*101300/(1025*g)], ['Pa', 'Pa', 'm']),
    ('6.438', [1.2*g*35], ['Pa']),
    ('6.444', [13600*g*.104, 13600*g*.104+1060*g*1.37,
               13600*g*.104-1060*g*(1.75-1.37)], ['Pa', 'Pa', 'Pa']),
    ('6.464', [101300+13600*g*.180, 101300-13600*g*.055,
               (175000-101300)/(13600*g)], ['Pa', 'Pa', 'm'])]
cases = []
for id, values, units in models:
    for part, (value, unit) in enumerate(zip(values, units)):
        precision = 2 if id == '6.445' and part == 1 else 3
        sci = format(value, f'.{precision-1}e').replace('e', 'x10^')
        rounded = str(float(format(value, f'.{precision}g')))
        cases.extend([[id, part, text, True] for text in
                      [str(value), rounded+' '+unit, sci, sci+' '+unit,
                       sci.replace('x', 'X')+' '+unit, sci.replace('x', '*'),
                       sci.replace('x', '*')+' '+unit, sci.replace('x', '×')+' '+unit]])
        cases.extend([[id, part, text, False] for text in
                      [str(value*2)+' '+unit, sci+' k'+unit,
                       sci+' '+('N' if unit != 'N' else 'Pa'), sci+'+1 '+unit]])
cases.extend([['6.445', 0, text, True] for text in
              ['17200', '17 200 Pa', '17,2 kPa', '1.72e4', '1,72e4 Pa',
               '1,72*10^4', '1,72·10^4', '1,72×10^4', '1,72x10^4',
               '1,72x10⁴ Pa', '1,72 X 10^(4) Pa', '1,72x10^1 kPa']])
cases.extend([['6.445', 0, text, False] for text in
              ['17100 Pa', '17300 Pa', '172 Pa', '17200 kPa', '1.72e3 Pa',
               '17200 N', '1,72x10^', '17200x', '1,72xx10^4', '1,72x10^4x']])

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1280, 'height': 1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**', cdn)
    page.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, content_type='text/css', body=''))
    page.route('https://*.supabase.co/**', lambda r: r.abort())
    page.goto(f'http://127.0.0.1:{args.port}/index.html?kurs=fy1')
    page.wait_for_function('typeof renderMathInElement==="function" && typeof window.nerdamer==="function"')
    page.evaluate("async()=>await selectCourse('fy1')")
    checks = page.evaluate(r'''rows=>{
      finishAttempt=parts=>{window.reviewAttempt=parts;state.answered=true;};
      return rows.map(([id,i,input,want])=>{
        state.currentTask=expandGameTask(BANK.find(t=>t.id===id))[i];
        state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];
        window.reviewAttempt=null;renderTraining();
        document.getElementById('ans-0').value=input;checkAnswer();
        return{id,i,input,want,actual:window.reviewAttempt?.every(Boolean)};
      });}''', cases)
    failures = [r for r in checks if r.get('actual') != r['want']]
    assert not failures, failures

    # Kortfacit efter felaktigt svar ska visa tre värdesiffror, inte fullprecision.
    page.evaluate('''()=>{
      state.currentTask=expandGameTask(BANK.find(t=>t.id==='6.445'))[0];
      state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];
      renderTraining();document.getElementById('ans-0').value='0';checkAnswer();}''')
    short = page.locator('#corr-0 annotation[encoding="application/x-tex"]').text_content()
    assert short == r'1{,}72\cdot10^{4}', short

    views = []
    for width in [390, 1280]:
        page.set_viewport_size({'width': width, 'height': 1000})
        for id, values, _ in models:
            for part in range(len(values)):
                page.evaluate('''x=>{
                  state.currentTask=expandGameTask(BANK.find(t=>t.id===x[0]))[x[1]];
                  state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];
                  renderTraining();showSolution();}''', [id, part])
                assert page.locator('.katex-error').count() == 0, (id, part, width)
                assert page.evaluate("Array.from(document.querySelectorAll('.sol .katex-display')).every(e=>e.scrollWidth<=e.clientWidth+2)"), (id, part, width)
                if id == '6.445':
                    page.locator('.tshell').screenshot(path=f'/tmp/review-6445-{part}-{width}.png')
                views.append([id, part, width])
    assert not errors, errors
    result = {'checks': checks, 'shortAnswer': short, 'views': views, 'javascriptErrors': errors}
    Path('/tmp/felrapport-6-445.json').write_text(json.dumps(result, ensure_ascii=False, indent=2))
    print(json.dumps({'actualAnswerFields': len(checks), 'shortAnswer': short,
                      'views': len(views), 'javascriptErrors': errors}))
    browser.close()
