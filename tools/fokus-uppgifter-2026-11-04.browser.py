"""Just nu: verklig UI med lokala RPC-fixtures, inga produktionsskrivningar."""
from pathlib import Path
import json,threading,http.server,functools,datetime
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(root)))
threading.Thread(target=server.serve_forever,daemon=True).start()
count=20;legacy=False;failure=False;calls=[]
def rpc(route):
 name=route.request.url.split('/rpc/')[-1];calls.append(name)
 if name!='kg_lar_fokus':route.fulfill(status=403,json={});return
 if failure:route.fulfill(status=500,json={});return
 now=datetime.datetime.now(datetime.timezone.utc).isoformat()
 rows=[{'id':'3','namn':'Aktiv Elev','online':True,'fokus':True,'sedan':now,'senast':now,'byten':0,'borta_sek':0,'uppgifter_idag':count},
 {'id':'4','namn':'Utflikad Elev','online':True,'fokus':False,'sedan':now,'senast':now,'byten':1,'borta_sek':60,'uppgifter_idag':0},
 {'id':'5','namn':'Frånvarande Elev','online':False,'fokus':None,'sedan':None,'senast':None,'byten':0,'borta_sek':0,'uppgifter_idag':9}]
 if legacy:
  for r in rows:r.pop('uppgifter_idag')
 route.fulfill(json={'ok':True,'nu':now,'elever':rows})
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  page=browser.new_page(viewport={'width':1440,'height':1000});errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.route('https://**/*',lambda r:r.abort());page.route('https://*.supabase.co/rest/v1/rpc/**',rpc)
  page.goto(f'http://127.0.0.1:{server.server_port}/index.html');page.wait_for_function('typeof larRitaGrupp==="function"')
  page.evaluate("""session={access_token:'fixture',expires_at:Date.now()/1000+3600,user:{id:'teacher-fixture'}};
   state.larGrupp=10;state.larGruppFlik='live';state.larElev=null;state.view='larare';
   larData.grupper=[{id:10,namn:'Testgrupp',kod:'ABCDEF',larare:['Testlärare'],kurs:'fy1'}];
   app.innerHTML='<main class="shell"><div id="larkropp"></div></main>';larRitaGrupp();""")
  page.wait_for_selector('.larlive-uppgifter')
  assert page.locator('.larlive-uppgifter').all_text_contents()==['0','20','9']
  assert 'alla kurser' in page.locator('#larlive').inner_text()
  page.clock.install();page.evaluate('larLiveStoppa();larRitaLive()');count=27
  page.clock.fast_forward(8200);page.wait_for_function("Array.from(document.querySelectorAll('.larlive-uppgifter')).some(e=>e.textContent==='27')")
  for w in [1440,390,320]:
   page.set_viewport_size({'width':w,'height':900})
   assert page.locator('.larlive-uppgifter').first.is_visible()
   assert page.get_by_role('columnheader',name='Uppgifter i dag').is_visible()
   
   if not page.evaluate('document.documentElement.scrollWidth<=innerWidth'):
    print(page.evaluate("Array.from(document.querySelectorAll('main *')).filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>[e.tagName,e.id,e.className,e.getBoundingClientRect().width]).slice(0,25)"))
    page.screenshot(path='/tmp/justnu-overflow.png')
    raise AssertionError(w)
  page.screenshot(path='/tmp/justnu-uppgifter-mobil.png')
  failure=True;page.evaluate('larRitaLive()');page.wait_for_function("document.querySelector('#larlive').textContent.includes('Senaste hämtningen misslyckades')")
  assert '27' in page.locator('.larlive-uppgifter').all_text_contents();failure=False
  legacy=True;page.evaluate('larRitaLive()');page.wait_for_function("document.querySelector('#larlive').textContent.includes('behöver aktiveras')")
  assert page.locator('.larlive-uppgifter').all_text_contents()==['–','–','–']
  assert not errors,errors
  page.evaluate('larLiveStoppa()')
  print(json.dumps({'todayCounts':True,'zeroDistinctFromMissing':True,'pollingUpdates':True,'mobile320':True,'networkFailureKeepsData':True,'legacySQL':True,'errors':errors}))
  browser.close()
finally:server.shutdown()
