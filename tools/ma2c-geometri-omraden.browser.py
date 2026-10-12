"""Kontroll av områdeskort, genomgångar, urval och bevarad progression; inga svar skickas."""
import argparse
import json
import urllib.request
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


with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1280, 'height': 1000})
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://cdn.jsdelivr.net/**', cdn)
    page.route('https://*.supabase.co/**', lambda r: r.abort())
    page.route('https://fonts.googleapis.com/**', lambda r: r.fulfill(status=200, content_type='text/css', body=''))
    page.goto(f'http://127.0.0.1:{args.port}/index.html?kurs=ma2')
    page.wait_for_function('typeof renderMathInElement==="function" && typeof window.nerdamer==="function"')
    result = page.evaluate('''async()=>{
      await selectCourse('ma2');setTrack('2c');
      const cp=ensureCourseProfile();
      cp.areas={randvinkel_medelpunkt:.82,kordasatsen_biskarningssatsen:.4};
      cp.families={'Randvinkel och medelpunktsvinkel':.75,'Bisektrissatsen':.65};
      cp.levels={randvinkel_medelpunkt:{E:{n:4,s:.75}},kordasatsen_biskarningssatsen:{E:{n:2,s:.5}}};
      // Fullständigt sparad nivåprofil; passöppning ska inte behöva initiera gamla nivåfält.
      for(const area of Object.keys(cp.levels))for(const L of ['1','2','3','4','5'])
        cp.levels[area][L]={s:.72,n:5};
      cp.sedda={};
      cp.history=[{id:'fixture-rand',area:'randvinkel_medelpunkt',ok:true,at:Date.now()},
                  {id:'fixture-korda',area:'kordasatsen_biskarningssatsen',ok:false,at:Date.now()}];
      const saved=JSON.stringify(cp),xp=profile.xp;
      const all=getCards(),keys=['randvinkel_medelpunkt','kordasatsen_biskarningssatsen'];
      const cards=keys.map(area=>all.find(k=>k.omr.length===1&&k.omr[0]===area));
      if(cards.some(k=>!k)||all.some(k=>k.name==='Cirkelgeometri'))throw Error('Ma2c saknar uppdelningen');
      const details=cards.map(k=>{
        const pool=cardTaskPool(k),lessons=kunskapSteg(3,k.key);
        if(!pool.length||pool.some(q=>q.omr!==k.omr[0]))throw Error('Fel uppgiftsurval');
        if(!lessons.length||lessons.some(g=>g.omr!==k.omr[0]))throw Error('Fel genomgångsurval');
        return{name:k.name,key:k.key,area:k.omr[0],pool:pool.length,
          families:cardFamilies(k).map(f=>f.family),mastery:cardStatus(k).m,
          lessons:lessons.map(g=>g.genomgang.rubrik)};
      });
      if(!details[1].families.includes('Bisektrissatsen'))throw Error('Bisektrissatsen saknas');
      const sessions=cards.map(k=>{startCard(k.key);const t=state.currentTask;
        if(!t||t.omr!==k.omr[0]||state.focusOmr.length!==1)throw Error('Passet blandar områden');
        return{card:k.name,task:t.id,area:t.omr};});
      setTrack('2b');const combined=getCards().find(k=>k.name==='Cirkelgeometri');
      if(!combined||combined.omr.length!==2)throw Error('Ma2b ändrades');
      const b={mastery:cardStatus(combined).m,lessons:kunskapSteg(3,combined.key).length};
      setTrack('2a');if(getCards().some(k=>k.omr.some(o=>keys.includes(o))))throw Error('Fel områden i Ma2a');
      setTrack('2c');
      if(saved!==JSON.stringify(ensureCourseProfile())||xp!==profile.xp)throw Error('Progression ändrades');
      state.openChapters=new Set(['3']);renderDashboard();
      return{cards:details,sessions,b,progressionPreserved:true};
    }''')
    assert [c['mastery'] for c in result['cards']] == [.82, .4], result
    assert abs(result['b']['mastery']-.61) < 1e-12, result
    views = []
    for width in [390, 1280]:
        page.set_viewport_size({'width': width, 'height': 1000})
        page.evaluate('renderDashboard()')
        for name in ['Randvinklar och medelpunktsvinklar', 'Kordasatsen och bisektrissatsen']:
            button = page.locator('.omr-oppna').filter(has_text=name)
            assert button.count() == 1 and button.is_visible(), (name, width)
            # Knappens klickyta och statusens tooltip kan vara bredare än texten.
            # Mät själva titeln, utan dessa avsiktliga överlägg.
            assert button.locator('.area-txt strong').evaluate('(e)=>e.scrollWidth<=e.clientWidth+2'), (name, width)
        page.locator('.chapter').filter(has_text='Randvinklar och medelpunktsvinklar').screenshot(path=f'/tmp/ma2c-geometri-{width}.png')
        views.append(width)
    assert not errors, errors
    print(json.dumps({**result, 'views': views, 'javascriptErrors': errors}, ensure_ascii=False))
    browser.close()
