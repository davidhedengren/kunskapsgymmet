"""Pröva adminens riktiga rollbyte mot kontrollerade RPC-svar, utan produktionskonton."""
import json
import urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

cache = {}
users = [
    {'id': '00000000-0000-0000-0000-000000000002', 'namn': 'Felregistrerad Elev', 'epost': 'elev@example.test',
     'skola': 'Exempelskolan', 'aktiv': True, 'godkand': False, 'grupper': 1, 'elever': 3},
    {'id': '00000000-0000-0000-0000-000000000005', 'namn': 'Avstängd Elev', 'aktiv': False, 'godkand': False},
    {'id': '00000000-0000-0000-0000-000000000004', 'namn': 'Godkänd Lärare', 'aktiv': True, 'godkand': True}
]
calls = []
def cdn(route):
    url = route.request.url
    if url not in cache:
        with urllib.request.urlopen(url, timeout=30) as r:
            cache[url] = r.status, dict(r.headers), r.read()
    status, headers, body = cache[url]
    route.fulfill(status=status, headers={k:v for k,v in headers.items() if k.lower() not in
                  ['content-encoding','content-length','transfer-encoding']},body=body)
def rpc(route):
    name = route.request.url.rsplit('/',1)[-1]
    body = route.request.post_data_json or {}
    if name == 'kg_admin_larare':
        result = {'ok': True,'larare': users}
    elif name == 'kg_admin_larare_till_elev':
        calls.append(body)
        users[:] = [u for u in users if u['id'] != body['p_user']]
        result = {'ok': True,'roll': 'elev'}
    elif name == 'kg_min_larprofil':
        result = {'larare': False,'elev': True,'profil': None,'godkand': False}
    elif name in ['kg_admin_anvandare','kg_admin_felrapporter']:
        result = []
    else:
        result = {'ok': True}
    route.fulfill(status=200,content_type='application/json',body=json.dumps(result))

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page()
    page.route('https://cdn.jsdelivr.net/**',cdn)
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    # Samtliga Supabase-anrop fångas i testet; inga riktiga konton eller skrivningar används.
    page.route('**/rest/v1/rpc/**',rpc)
    page.goto('http://127.0.0.1:8072/index.html')
    page.wait_for_function('typeof kgAdminLarareTillElev === "function"')
    page.evaluate("""()=>{
      session={user:{id:'00000000-0000-0000-0000-000000000001'},access_token:'test-only'};
      arAdmin=true;giltigSession=async()=>true;
      kgAdminFlik='larare';document.body.classList.remove('password-locked');
    }""")
    await_result=page.evaluate('oppnaAdmin()')
    page.get_by_role('button',name='Gör till elev',exact=True).first.wait_for()
    assert page.get_by_role('button',name='Gör till elev',exact=True).count()==2
    dimensions=[]
    for width in [1174,390]:
        page.set_viewport_size({'width':width,'height':900})
        page.wait_for_timeout(100)
        dims=page.evaluate("""()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,
          buttons:[...document.querySelectorAll('.admin-lararknappar button')].map(e=>({
            text:e.textContent,width:e.getBoundingClientRect().width,
            visible:e.getBoundingClientRect().right<=innerWidth&&e.getBoundingClientRect().left>=0}))})""")
        assert not dims['overflow'] and all(x['visible'] for x in dims['buttons']),dims
        page.locator('#adminruta .modal-kort').screenshot(path=f'/tmp/kg-admin-elev-{width}.png')
        dimensions.append(dims)
    page.get_by_role('button',name='Gör till elev',exact=True).first.click()
    page.locator('#larbekrafta').get_by_role('button',name='Gör till elev',exact=True).click()
    page.wait_for_function("document.querySelector('#adminlista').textContent.includes('Avstängd Elev') && !document.querySelector('#adminlista').textContent.includes('Felregistrerad Elev')")
    assert calls==[{'p_user':'00000000-0000-0000-0000-000000000002'}],calls
    assert page.locator('#adminlista').get_by_role('button',name='Gör till elev',exact=True).count()==1
    # En redan inloggad elev hämtar den korrigerade rollen via närvarotimern.
    student=page.evaluate("""async()=>{
      stangAdmin();arAdmin=false;
      session={user:{id:'00000000-0000-0000-0000-000000000002'},access_token:'test-only'};
      arGruppLarare=true;arLarare=false;state.view='larare';
      profile.nyheter={...(profile.nyheter||{}),rollval:'larare'};
      const xp=profile.xp,attempts=profile.attempts;
      localStorage.setItem(GRUPPLARARE_KEY,'1');localStorage.setItem(LARARE_KEY,'1');
      await kgHeartbeat();
      return {elev:arElevRoll,larare:arNagonLarare(),view:state.view,
        cache:localStorage.getItem(GRUPPLARARE_KEY),oldCache:localStorage.getItem(LARARE_KEY),
        sameProgress:profile.xp===xp&&profile.attempts===attempts};
    }""")
    assert student=={'elev':True,'larare':False,'view':'home','cache':None,'oldCache':None,'sameProgress':True},student
    print(json.dumps({'rollChanges':len(calls),'screenChecks':dimensions,'student':student},ensure_ascii=False))
    browser.close()
