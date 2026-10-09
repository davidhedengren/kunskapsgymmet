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
 pg.goto('http://127.0.0.1:8072/');pg.wait_for_function('typeof oppnaFelrapportLogg==="function"');errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
 pg.evaluate("""()=>{
  session={user:{id:'admin'},access_token:'test'};arAdmin=true;arLarare=true;
  window.rpcCalls=[];window.reports=[{kurs:'fy1',uppgift:'6.338',antal:1,atgardad:false},{kurs:'fy1',uppgift:'5.55',antal:1,atgardad:false}];window.failSave=false;
  hamtaFelloggen=async(klara)=>structuredClone(reports.filter(r=>klara||!r.atgardad));uppdateraFelAntal=()=>{};
  fetch=async(url,opts)=>{const name=url.split('/').pop(),params=JSON.parse(opts.body);rpcCalls.push({name,params});
   if(name==='kg_felrapport_granska'){
    if(failSave)return {ok:false,status:404};
    await Promise.resolve();const r=reports.find(r=>r.kurs===params.p_kurs&&r.uppgift===params.p_uppgift);r.atgardad=true;r.status=params.p_status;r.ignorerad=params.p_status==='ignorerad';r.granskningskommentar=params.p_kommentar;
    return {ok:true,json:async()=>({ok:true})};
   }
   if(name==='kg_mina_felrapporter')return {ok:true,json:async()=>reports.map(r=>({kurs:r.kurs,uppgift:r.uppgift,status:r.status||'oppen',kommentar:r.granskningskommentar,granskad:r.atgardad?'2026-10-09T16:00:00Z':null}))};
   if(name==='kg_felrapport_granskningssvar')return {ok:true,json:async()=>({ok:true,lista:reports.filter(r=>r.atgardad).map(r=>({kurs:r.kurs,uppgift:r.uppgift,status:r.status,kommentar:r.granskningskommentar,granskad:'2026-10-09T16:00:00Z'}))})};
   throw Error('Oväntat anrop: '+name);
  };
 }""")
 pg.evaluate('oppnaFelrapportLogg()')
 pg.locator('.felpost').filter(has_text='#6.338').get_by_role('button',name='Granskad – inget fel').click()
 assert pg.locator('#felgranskningskommentar').is_visible()
 pg.locator('#felgranskning-spara').click();assert pg.locator('#felgranskning-fel').is_visible();assert pg.evaluate('rpcCalls.length')==0
 pg.get_by_role('button',name='Avbryt',exact=True).click();assert pg.locator('#felgranskning').count()==0;assert pg.evaluate('rpcCalls.length')==0
 comment='Gaslagen ger 0,0062325 m³ = 6,23 liter.\nVolymen ska anges i liter.'
 for width in [390,1174]:
  pg.set_viewport_size({'width':width,'height':1000});pg.evaluate("ignoreraFel('fy1','6.338')");pg.locator('#felgranskningskommentar').fill(comment);pg.wait_for_timeout(150)
  assert not pg.evaluate('document.documentElement.scrollWidth>innerWidth');pg.screenshot(path=f'/tmp/felkommentar-form-{width}.png',full_page=True)
  pg.get_by_role('button',name='Avbryt',exact=True).click()
 pg.evaluate("ignoreraFel('fy1','6.338');failSave=true");pg.locator('#felgranskningskommentar').fill(comment);pg.locator('#felgranskning-spara').click();pg.wait_for_timeout(100)
 assert pg.locator('#felgranskning-fel').inner_text()=='Återkoppling på felrapporter är inte aktiverad ännu.'
 assert pg.locator('#felgranskningskommentar').input_value()==comment and pg.locator('#felgranskning-spara').is_enabled()
 assert pg.evaluate("reports[0].atgardad") is False
 pg.evaluate("failSave=false;rpcCalls=[]");pg.evaluate('Promise.all([sparaFelGranskning(),sparaFelGranskning()])');assert pg.locator('#felgranskning').count()==0
 calls=pg.evaluate('rpcCalls');assert len(calls)==1 and calls[0]=={'name':'kg_felrapport_granska','params':{'p_kurs':'fy1','p_uppgift':'6.338','p_status':'ignorerad','p_kommentar':comment,'p_redigera':False}},calls
 # Åtgärdad använder samma formulär och en gemensam sparning.
 pg.evaluate("markeraFelAtgardad('fy1','5.55')");pg.locator('#felgranskningskommentar').fill('Frågan är förtydligad.');pg.locator('#felgranskning-spara').click();pg.wait_for_timeout(100)
 assert pg.evaluate('reports[1].status')=='atgardad'
 pg.evaluate('felloggVisaKlara=true;ritaFellogg()');assert comment in pg.locator('#felloggkropp').inner_text();assert 'kommentar från granskningen: '+comment in pg.evaluate('felloggText()')
 # Ett senare beslut får inte skriva över statusen på en äldre avslutad rapport.
 old=pg.evaluate("felKompletteraGranskningssvar([{kurs:'fy1',uppgift:'5.55',status:'ignorerad',atgardad:true}])");assert old[0]['status']=='ignorerad' and 'granskningskommentar' not in old[0]
 # Befintlig kommentar kan redigeras, statusen behålls.
 pg.locator('.felpost').filter(has_text='#6.338').get_by_role('button',name='Kommentera').click();assert pg.locator('#felgranskningskommentar').input_value()==comment
 malicious='<img src=x onerror="window.injected=true">\n6,23 liter är korrekt.'
 pg.locator('#felgranskningskommentar').fill(malicious);pg.locator('#felgranskning-spara').click();pg.wait_for_timeout(100)
 assert pg.locator('.fel-svar img').count()==0 and pg.evaluate('window.injected===true') is False
 # Eleven läser sparad status och kommentarer. Funktionen ändrar aldrig XP.
 pg.evaluate("stangFellogg();session={user:{id:'student'},access_token:'test'};arAdmin=false;arLarare=false;window.xpBefore=profile.xp;kontoMeny({stopPropagation(){},currentTarget:{getBoundingClientRect:()=>({bottom:50,right:390})}})");pg.get_by_role('button',name='Mina felrapporter',exact=True).click();pg.wait_for_timeout(150)
 assert malicious in pg.locator('#mina-felrapporter-lista').inner_text();assert pg.locator('#mina-felrapporter-lista img').count()==0
 assert pg.locator('#mina-felrapporter-lista .admin-rapportstatus').all_text_contents()==['Granskad – inget fel','Åtgärdad']
 for width in [390,1174]:
  pg.set_viewport_size({'width':width,'height':1000});pg.wait_for_timeout(150);assert not pg.evaluate('document.documentElement.scrollWidth>innerWidth');pg.screenshot(path=f'/tmp/felkommentar-elev-{width}.png',full_page=True)
 assert pg.evaluate('profile.xp===xpBefore') is True
 # Kontobyte tar bort gamla rapporter från DOM, även vid utloggning.
 pg.evaluate('sparaSession(null)');assert pg.locator('#mina-felrapporter').count()==0
 assert not errors,errors
 print(json.dumps({'formsAndStudentViews':4,'savedAndEdited':True,'cancelAndMissingMigration':True,'safeText':True,'duplicateSubmitPrevented':True,'xpUnchanged':True,'failures':[]}));browser.close()
