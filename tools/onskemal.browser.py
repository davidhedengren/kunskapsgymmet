"""Local RPC fixture for standalone requests; never writes production data."""
import json,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
rows=[];calls=[];fail_send=False;cache={};layouts=[]
def rpc(route):
 global fail_send
 req=route.request;name=req.url.rsplit('/',1)[-1];body=req.post_data_json or {};owner='admin' if req.headers.get('authorization')=='Bearer token-admin' else 'student';calls.append([name,body,owner])
 if name=='kg_skicka_onskemal':
  if fail_send:route.fulfill(status=500,json={'message':'failure'});return
  old=next((r for r in rows if r['request_id']==body['p_request'] and r['owner']==owner),None)
  if not old:
   old=dict(id=len(rows)+1,owner=owner,request_id=body['p_request'],typ=body['p_typ'],kurs=body['p_kurs'],omrade=body['p_omrade'],niva=body['p_niva'],beskrivning=body['p_beskrivning'],status='oppen',kommentar=None,skapad='2026-10-13T13:00:00Z',rapportor_namn='Elev <script>test</script>',rapportor_epost='student@example.test');rows.append(old)
  route.fulfill(status=200,json={'ok':True,'id':old['id']});return
 if name=='kg_mina_onskemal':route.fulfill(status=200,json=[r for r in rows if r['owner']==owner]);return
 if name=='kg_admin_onskemal':route.fulfill(status=200 if owner=='admin' else 403,json=rows if owner=='admin' else {'message':'kg:ej_admin'});return
 if name=='kg_admin_onskemal_status':
  r=next(r for r in rows if r['id']==body['p_id']);r['status']=body['p_status'];r['kommentar']=body['p_kommentar'];route.fulfill(status=200,json={'ok':True});return
 if name=='kg_ar_admin':route.fulfill(status=200,json=owner=='admin');return
 route.fulfill(status=200,json=[])
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,r.read(),r.headers.get('Content-Type','application/javascript'))
 st,b,t=cache[u];route.fulfill(status=st,body=b,content_type=t)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.context.grant_permissions(['clipboard-read','clipboard-write'],origin='http://127.0.0.1:8083');page.on('pageerror',lambda e:errors.append(str(e)));page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://*.supabase.co/rest/v1/rpc/**',rpc);page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''));page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.goto('http://127.0.0.1:8083/index.html');page.wait_for_function('typeof kgOnskemalOppna==="function"')
 page.evaluate("()=>{session={user:{id:'student',email:'student@example.test'},access_token:'token-student'};giltigSession=async()=>true;arAdmin=false;profile.namn='Elev';state.course=null;state.currentTask=null;renderHome();}")
 def menu():page.locator('.konto').first.click()
 menu();assert page.get_by_role('button',name='Skicka in önskemål',exact=True).count()==1;assert page.get_by_role('button',name='Inskickade önskemål',exact=True).count()==0
 page.get_by_role('button',name='Skicka in önskemål',exact=True).click();assert page.evaluate('state.currentTask') is None
 before=len(calls);page.locator('#kg-onskemal-text').fill('   ');page.get_by_role('button',name='Skicka',exact=True).click();assert len(calls)==before
 assert 'Beskriv' in page.locator('#kg-onskemal-fel').inner_text()
 page.locator('#kg-onskemal-typ').select_option('fler_uppgifter');page.locator('#kg-onskemal-kurs').select_option('fy1');page.locator('#kg-onskemal-omrade').fill('Rörelse');page.locator('#kg-onskemal-niva').select_option('1');page.locator('#kg-onskemal-text').fill('Fler diagram med momentanhastighet')
 for theme in ['dark','light']:
  page.evaluate('(t)=>document.documentElement.dataset.theme=t',theme)
  for width in [360,390,1280]:
   page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(350)
   fits=page.locator('#kg-onskemal-ruta').evaluate('e=>{const r=e.querySelector(".modal-kort").getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.top>=0&&r.bottom<=innerHeight+1&&e.scrollWidth<=innerWidth+1;}');assert fits,(theme,width);layouts.append([theme,width,'form']);page.screenshot(path=f'/tmp/onskemal-form-{theme}-{width}.png')
 fail_send=True;request=page.evaluate('kgOnskemalRequest');page.get_by_role('button',name='Skicka',exact=True).click();page.wait_for_function('!document.getElementById("kg-onskemal-skicka").disabled');assert page.locator('#kg-onskemal-text').input_value()=='Fler diagram med momentanhastighet';assert 'inte' in page.locator('#kg-onskemal-fel').inner_text();assert not rows
 fail_send=False;page.get_by_role('button',name='Skicka',exact=True).click();page.wait_for_selector('[role="status"]');assert len(rows)==1 and rows[0]['request_id']==request
 page.get_by_role('button',name='Mina önskemål',exact=True).click();page.wait_for_selector('.kg-onskemal-post');assert 'Fler diagram' in page.locator('.kg-onskemal-post').inner_text();assert page.locator('.kg-onskemal-edit').count()==0
 page.keyboard.press('Escape');assert page.locator('#kg-onskemal-ruta').count()==0
 # General app problem without any course/task context.
 page.evaluate('kgOnskemalOppna()');page.locator('#kg-onskemal-typ').select_option('problem');page.locator('#kg-onskemal-kurs').select_option('');page.locator('#kg-onskemal-text').fill('Miniräknaren tar för stor plats');page.get_by_role('button',name='Skicka',exact=True).click();page.wait_for_selector('[role="status"]');assert rows[1]['kurs'] is None and rows[1]['typ']=='problem';page.keyboard.press('Escape')
 # Admin sees an inline editor and may save without a comment.
 page.evaluate("async()=>{session={user:{id:'admin',email:'admin@example.test'},access_token:'token-admin'};arAdmin=true;kgAdminHamtaOversikt=async()=>{};await oppnaAdmin('onskemal');}");page.wait_for_selector('.kg-onskemal-edit');assert page.locator('.kg-onskemal-post').count()==2
 assert page.locator('#adminlista script').count()==0;assert '<script>test</script>' in page.locator('#adminlista').inner_text()
 edits=page.locator('.kg-onskemal-edit');edits.first.locator('select').select_option('atgardad');edits.first.get_by_role('button',name='Spara',exact=True).click();page.wait_for_function('kgOnskemalLista.some(r=>r.status==="atgardad")');page.wait_for_selector('.kg-onskemal-edit');assert rows[0]['kommentar'] is None
 edits=page.locator('.kg-onskemal-edit');edits.first.locator('select').select_option('pagar');edits.first.locator('textarea').fill('Vi tittar på detta.');edits.first.get_by_role('button',name='Spara',exact=True).click();page.wait_for_function('kgOnskemalLista.some(r=>r.kommentar==="Vi tittar på detta.")');page.locator('.kg-onskemal-toolbar select').select_option('alla');assert page.locator('.kg-onskemal-post').count()==2
 # Draft survives changing filters.
 page.locator('.kg-onskemal-edit').first.locator('textarea').fill('Utkast');page.locator('.kg-onskemal-toolbar select').select_option('pagar');page.locator('.kg-onskemal-toolbar select').select_option('alla');assert page.locator('.kg-onskemal-edit').first.locator('textarea').input_value()=='Utkast'
 for width in [390,1280]:
  page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(350);assert page.locator('#adminlista').evaluate('e=>e.scrollWidth<=e.clientWidth+1');layouts.append(['light',width,'admin']);page.screenshot(path=f'/tmp/onskemal-admin-{width}.png')
 page.get_by_role('button',name='Kopiera logg',exact=True).click();page.wait_for_function("document.querySelector('.kg-onskemal-toolbar button').textContent==='Kopierat'");copied=page.evaluate('navigator.clipboard.readText()');assert 'Inskickade önskemål · Kunskapsgymmet' in copied and 'Vi tittar på detta.' in copied and 'Utkast' not in copied
 # Switching account clears admin drafts/list/modal; own receipt includes status/reply.
 page.evaluate("()=>{sparaSession({user:{id:'student'},access_token:'token-student'});arAdmin=false;kgOnskemalMina();}");page.wait_for_selector('.kg-onskemal-post');assert page.locator('.kg-onskemal-edit').count()==0;assert 'Vi tittar på detta.' in page.locator('#kg-onskemal-ruta').inner_text();assert page.evaluate('kgOnskemalLista.length')==0
 assert not errors,errors
 Path('/tmp/onskemal-browser.json').write_text(json.dumps({'calls':calls,'layouts':layouts,'javascriptErrors':errors},ensure_ascii=False,indent=2));print('PASS',len(layouts),'layouts;',len(calls),'local RPC calls; no production writes');browser.close()
