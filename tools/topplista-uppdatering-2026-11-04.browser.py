"""Real UI with local public-RPC fixtures. No production account or writes."""
from pathlib import Path
import json,threading,http.server,functools
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory=str(root)))
threading.Thread(target=server.serve_forever,daemon=True).start()
score=192;attempts=7;fail=False;hold=False;pending=[];calls=[]
def rpc(route):
 global hold
 fn=route.request.url.split('/rpc/')[-1];calls.append(fn)
 if fn=='topplista_klasser':
  if hold:pending.append(route);return
  if fail:route.fulfill(status=500,json={});return
  route.fulfill(json={'rader':[{'id':13,'namn':'Testklass','xp':score,'poang':score,'elever':16,'aktiva':4}], 'tak':400,'berakning':'summa'});return
 if fn=='topplista_klass_elever':route.fulfill(json={'rader':[{'namn':'Elev Ett','xp':score,'uppgifter':attempts}],'dolda':2,'dolda_aktiva':1});return
 if fn in ['topplista_period2','topplista_period']:route.fulfill(json={'rader':[{'namn':'Elev Ett','xp':score,'uppgifter':attempts,'totalxp':900}]});return
 route.fulfill(status=403,json={'message':'Blocked fixture endpoint'})
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  page=browser.new_page(viewport={'width':1440,'height':1000});errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.route('https://**/*',lambda r:r.abort());page.route('https://*.supabase.co/rest/v1/rpc/**',rpc)
  page.goto(f'http://127.0.0.1:{server.server_port}/index.html');page.wait_for_function('typeof oppnaTopplista==="function"')
  page.evaluate("session=null;state.minKlass=null;state.toppVy='klasser';oppnaTopplista('dag')")
  page.wait_for_selector('.klasslista .krad');assert '192' in page.locator('.krad .tvarde').inner_text()
  page.locator('.krad').click();page.wait_for_selector('.klasselever .kxp');assert '7 uppg.' in page.locator('.kuppg').inner_text()
  score=402;attempts=15
  page.get_by_role('button',name='Uppdatera',exact=True).click();page.wait_for_function("document.querySelector('.kxp')?.textContent==='402 XP'")
  assert page.locator('.krad').get_attribute('aria-expanded')=='true';assert '15 uppg.' in page.locator('.kuppg').inner_text()
  assert 'Uppdaterad' in page.locator('#topp-status').inner_text()
  # Automatic update without clicks, with open class retained.
  page.clock.install();page.evaluate('schemalaggTopplista()');score=460;attempts=18
  page.clock.fast_forward(30100);page.wait_for_function("document.querySelector('.kxp')?.textContent==='460 XP'")
  assert page.locator('.krad').get_attribute('aria-expanded')=='true'
  # Failed refresh keeps old results and communicates that they may be stale.
  fail=True;page.get_by_role('button',name='Uppdatera',exact=True).click()
  page.wait_for_function("document.querySelector('#topp-status').textContent.includes('Kunde inte uppdatera')")
  assert '460 XP' in page.locator('.kxp').inner_text();assert not page.locator('#topp-uppdatera').is_disabled();fail=False
  # A late old-period response cannot overwrite the newly selected period.
  hold=True;page.get_by_role('button',name='Uppdatera',exact=True).click();page.wait_for_timeout(20);assert pending
  hold=False;score=800;page.get_by_role('tab',name='Veckans bästa',exact=True).click()
  page.wait_for_function("document.querySelector('.krad .tvarde')?.textContent==='800XP'")
  pending.pop().fulfill(json={'rader':[{'id':13,'namn':'Gammal data','poang':9999}]})
  page.wait_for_timeout(50);assert 'Gammal data' not in page.locator('.klasslista').inner_text()
  # Re-open, close during a refresh: refresh must respect the latest click.
  page.locator('.krad').click();page.wait_for_selector('.klasselever .kxp')
  hold=True;page.get_by_role('button',name='Uppdatera',exact=True).click();page.wait_for_timeout(20)
  page.locator('.krad').click();hold=False
  pending.pop().fulfill(json={'rader':[{'id':13,'namn':'Testklass','poang':800,'elever':16,'aktiva':4}],'berakning':'summa','tak':2000})
  page.wait_for_function("!document.querySelector('#topp-uppdatera').disabled")
  assert page.locator('.krad').get_attribute('aria-expanded')=='false'
  # Visible tab resumes; hidden/other view does not poll.
  page.evaluate("Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'hidden'});document.dispatchEvent(new Event('visibilitychange'))")
  before=len(calls);page.clock.fast_forward(60100);assert len(calls)==before
  score=900
  page.evaluate("Object.defineProperty(document,'visibilityState',{configurable:true,get:()=> 'visible'});document.dispatchEvent(new Event('visibilitychange'))")
  page.wait_for_function("document.querySelector('.krad .tvarde')?.textContent==='900XP'")
  page.set_viewport_size({'width':390,'height':844});assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  page.screenshot(path='/tmp/topplista-uppdatering-mobil.png')
  page.evaluate("state.view='home'");before=len(calls);page.clock.fast_forward(60100);assert len(calls)==before
  # Individual tab uses the same refresh flow.
  page.evaluate("state.toppVy='elever';oppnaTopplista('dag')");page.wait_for_selector('.topprad .tuppg')
  score=1200;page.get_by_role('button',name='Uppdatera',exact=True).click()
  page.wait_for_function("document.querySelector('.tvarde')?.textContent==='1200XP'")
  assert not errors,errors
  assert not any(n in calls for n in ['kg_profile','kg_stat_forsok','kg_record_attempt'])
  print(json.dumps({'manual':True,'automatic':True,'expandedPreserved':True,'staleResponseIgnored':True,'failureKeepsData':True,'hiddenAndAwayNoPolling':True,'mobile':True,'writes':0,'errors':errors}))
  browser.close()
finally:server.shutdown()
