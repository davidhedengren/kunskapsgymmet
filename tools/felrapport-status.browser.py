"""Granska rapporterade svar i faktiska spelkort, inklusive tecken och enheter."""
import json, math, urllib.request
from playwright.sync_api import sync_playwright
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 st,h,b=cache[u];route.fulfill(status=st,headers={k:v for k,v in h.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=b)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);pg=browser.new_page();pg.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");pg.route('https://cdn.jsdelivr.net/**',cdn);pg.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));pg.route('https://*.supabase.co/**',lambda r:r.abort())
 pg.goto('http://127.0.0.1:8072/');pg.wait_for_function('typeof oppnaFelrapportLogg==="function"')
 pg.evaluate("""()=>{hamtaFelloggen=async()=>[{kurs:'fy1',uppgift:'5.91',antal:1,atgardad:false},{kurs:'fy1',uppgift:'5.108',antal:1,atgardad:true,ignorerad:true},{kurs:'fy1',uppgift:'5.391',antal:1,atgardad:true,ignorerad:false},{kurs:'fy1',uppgift:'6.315',antal:1,atgardad:true}];uppdateraFelAntal=()=>{};}""")
 pg.evaluate('oppnaFelrapportLogg()')
 for width in [390,1174]:
  pg.set_viewport_size({'width':width,'height':900});pg.wait_for_timeout(300)
  assert pg.get_by_role('button',name='Granskad – inget fel',exact=True).count()==1
  assert pg.locator('.admin-rapportstatus').all_text_contents()==['Granskad – inget fel','Åtgärdad','Avslutad']
  assert not pg.evaluate('document.documentElement.scrollWidth>innerWidth')
  pg.screenshot(path=f'/tmp/felrapport-status-{width}.png',full_page=True)
 text=pg.evaluate('felloggText()');assert 'status: Granskad – inget fel' in text and 'status: Åtgärdad' in text and 'status: Avslutad' in text
 pg.evaluate("""()=>{session={user:{id:'admin'},access_token:'test',expires_at:Date.now()+3600000};window.calls=[];window.fetch=async(url,opts)=>{calls.push({url,body:JSON.parse(opts.body)});return {ok:true,json:async()=>({ok:true})};};}""")
 pg.get_by_role('button',name='Granskad – inget fel',exact=True).click();pg.wait_for_timeout(200)
 calls=pg.evaluate('calls');assert len(calls)==1 and calls[0]['url'].endswith('/kg_felrapport_granska') and calls[0]['body']['p_status']=='ignorerad',calls
 print(json.dumps({'views':2,'statusAndExport':True,'noRewardEndpoint':True}));browser.close()
