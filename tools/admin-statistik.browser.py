"""Adminöversikt med lokal RPC-fixture; inga produktionskonton eller skrivningar."""
from pathlib import Path
from datetime import date,timedelta
import json
from playwright.sync_api import sync_playwright
uid=lambda n:'00000000-0000-0000-0000-'+str(n).zfill(12)
days=[]
for i in range(30):
 day=(date(2026,10,11)-timedelta(days=29-i)).isoformat()
 days.append({'dag':day,'uppgifter':(i+1)*3,'ratt':(i+1)*2,'inloggningar':i%3,'aktiva':2,'aktiva_ids':[uid(2),uid(3 if i%2 else 4)],'nya':i%3,'aktiv_minuter':(i+1)*2,'ledtradar':1,'facit':0})
data={'idag':'2026-10-11','hamtad':'2026-10-11T10:00:00Z','forsta_aktivitet':'2026-09-12','dagar':days,'kurser':[{'kurs':'fy1','uppgifter':540,'ratt':430}], 'global':{'dagar':[{'dag':d['dag'],'uppgifter':d['uppgifter']+10} for d in days]}}
users=[{'user_id':uid(i),'namn':name,'epost':f'fixture{i}@example.test','xp':500,'uppgifter':40,'skapad':'2026-10-01T12:00:00Z','senast_sedd':'2026-10-11T10:00:00Z','online':i==2,'kurs':'fy1','uppgifter_idag':i,'uppgifter_7d':i*8,'aktiv_minuter_idag':8,'ratt_idag':i-1,'ratt_7d':i*6,'aktiv_idag':True} for i,name in [(2,'Elev Exempel'),(3,'Lärare Exempel'),(4,'Andra Eleven')]]
role='admin';installed=True;calls=[]
def rpc(route):
 name=route.request.url.split('/rpc/')[-1];calls.append(name)
 if name=='kg_ar_admin':value=role=='admin'
 elif name=='kg_admin_anvandare':value=users
 elif name=='kg_admin_felrapporter':value=[]
 elif name=='kg_admin_oversikt':
  if not installed:route.fulfill(status=404,json={'message':'not installed'});return
  value=data
 else:route.fulfill(status=403,json={'message':'blocked fixture endpoint'});return
 route.fulfill(status=200,json=value)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1440,'height':1100},accept_downloads=True)
 page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://*.supabase.co/rest/v1/rpc/**',rpc);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto('http://127.0.0.1:8082/index.html?kurs=fy1');page.wait_for_function('typeof kgStatPeriod==="function"')
 page.evaluate("session={access_token:'local-fixture',expires_at:Date.now()+3600000,user:{id:'admin-fixture'}}")
 page.evaluate('oppnaAdmin()');page.wait_for_selector('.kgstat-chart');assert page.locator('.kgstat-chart').count()==4
 assert page.locator('.kgstat-bar').count()==56
 assert '100' in page.locator('.kgstat-kort').nth(1).inner_text()
 page.screenshot(path='/tmp/kg-stat-desktop.png')
 page.get_by_role('button',name='30 dagar',exact=True).click();assert page.locator('.kgstat-bar').count()==120
 page.locator('.kgstat-chart').first.locator('button').nth(10).click();assert page.locator('input[type=date]').first.input_value()==days[10]['dag']
 page.locator('input[type=date]').nth(1).fill(days[9]['dag']);page.locator('input[type=date]').nth(1).dispatch_event('change')
 assert '+3' in page.locator('.kgstat-tabell tbody tr').nth(1).inner_text() # Oberoende skillnad från 33 respektive 30 uppgifter.
 with page.expect_download() as dl:page.get_by_role('button',name='Exportera dagsdata').click()
 path=dl.value.path();csv=Path(path).read_text(encoding='utf-8-sig');assert len(csv.splitlines())==31;assert 'alla_uppgifter;uppgifter;aktiva;nya' in csv
 page.get_by_role('button',name='Användare',exact=True).click();assert page.locator('details.admin-user').count()==3;assert page.locator('details.admin-user[open]').count()==0
 page.locator('details.admin-user summary').first.click();page.wait_for_timeout(50);assert page.locator('details.admin-user[open]').count()==1
 page.locator('#admin-sok').fill('Elev');assert page.locator('details.admin-user').count()==2;assert page.locator('details.admin-user[open]').count()==1
 page.screenshot(path='/tmp/kg-stat-users.png')
 page.get_by_role('button',name='Översikt',exact=True).click();page.set_viewport_size({'width':390,'height':844});page.screenshot(path='/tmp/kg-stat-mobile.png')
 assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
 page.locator('.kgstat-chart').first.scroll_into_view_if_needed();page.wait_for_timeout(100);assert page.locator('.kgstat-chart').first.evaluate('(e)=>e.querySelector("button:last-child").getBoundingClientRect().right<=e.getBoundingClientRect().right+1');page.screenshot(path='/tmp/kg-stat-mobile-chart.png')
 page.locator('.kgstat-tabell').scroll_into_view_if_needed();assert page.locator('.kgstat-tabellwrap').evaluate('(e)=>e.scrollWidth>e.clientWidth')
 page.set_viewport_size({'width':1440,'height':1100});page.evaluate("document.documentElement.dataset.theme='light'");page.locator('.kgstat-heading').first.scroll_into_view_if_needed();page.screenshot(path='/tmp/kg-stat-light.png')
 page.evaluate("document.documentElement.dataset.theme='dark'")
 # Ny öppning ska återställa användarkorten till stängda.
 page.evaluate("oppnaAdmin('anvandare')");assert page.locator('details.admin-user[open]').count()==0
 # Saknad migration ger begriplig hjälp; användarfliken fungerar fortfarande.
 installed=False;page.evaluate('oppnaAdmin()');assert '2026-10-11-admin-statistik.sql' in page.locator('#adminlista').inner_text()
 page.get_by_role('button',name='Användare',exact=True).click();assert page.locator('details.admin-user').count()==3
 # Lärare nekas också vid direkt anrop, inte bara i menyn.
 role='teacher';page.evaluate('stangAdmin()');page.wait_for_timeout(300);before=len(calls);page.evaluate('oppnaStatistik()');assert page.locator('#adminruta').count()==0
 assert calls[before:]==['kg_ar_admin']
 denied=page.evaluate("async()=>{try{await kgAdminRpc('kg_admin_oversikt');return false}catch(e){return true}}")
 assert denied
 assert not errors,errors
 print(json.dumps({'charts':4,'dailyRows':30,'csvRows':30,'collapsedUsers':3,'teacherDenied':True,'missingMigrationHandled':True,'javascriptErrors':errors}))
 browser.close()
