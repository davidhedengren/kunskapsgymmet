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
  session={user:{id:'admin'},access_token:'test',refresh_token:'test-refresh',expires_at:Date.now()+3600000};arAdmin=true;arLarare=true;
  window.refreshCalls=0;
  window.rpcCalls=[];window.reports=[{kurs:'fy1',uppgift:'6.338',antal:1,atgardad:false,taggar:['facit'],kommentarer:['[Elev: Testelev] (utan kommentar)']},{kurs:'fy1',uppgift:'5.55',antal:1,atgardad:false}];window.failSave=false;window.delaySave=false;
  hamtaFelloggen=async(klara)=>structuredClone(reports.filter(r=>klara||!r.atgardad));uppdateraFelAntal=()=>{};
  fetch=async(url,opts)=>{
   if(url.includes('/auth/v1/token?')){refreshCalls++;return {ok:true,json:async()=>({access_token:'fresh-test',refresh_token:'test-refresh',expires_in:3600,user:{id:'admin'}})};}
   const name=url.split('/').pop(),params=JSON.parse(opts.body);rpcCalls.push({name,params});
   if(name==='kg_felrapport_granska'){
    if(failSave)return {ok:false,status:404,json:async()=>({code:'PGRST202'})};
    if(delaySave){await new Promise(resolve=>window.pendingSave=params.p_uppgift==='7.1'?window.completeA=resolve:window.completeB=resolve);}
    const r=reports.find(r=>r.kurs===params.p_kurs&&r.uppgift===params.p_uppgift);r.atgardad=true;r.status=params.p_status;r.ignorerad=params.p_status==='ignorerad';r.granskningskommentar=params.p_kommentar;
    return {ok:true,json:async()=>({ok:true})};
   }
   if(name==='kg_mina_felrapporter')return {ok:true,json:async()=>reports.map(r=>({kurs:r.kurs,uppgift:r.uppgift,status:r.status||'oppen',kommentar:r.granskningskommentar,granskad:r.atgardad?'2026-10-09T16:00:00Z':null}))};
   if(name==='kg_felrapport_granskningssvar')return {ok:true,json:async()=>({ok:true,lista:reports.filter(r=>r.atgardad).map(r=>({kurs:r.kurs,uppgift:r.uppgift,status:r.status,kommentar:r.granskningskommentar,granskad:'2026-10-09T16:00:00Z'}))})};
   throw Error('Oväntat anrop: '+name);
  };
 }""")
 pg.evaluate('oppnaFelrapportLogg()')
 def row(id):return pg.locator('.felpost').filter(has=pg.locator('.nr',has_text='#'+id))
 assert pg.locator('#fellogg [role=dialog]').count()==1 and pg.locator('#felgranskning').count()==0
 comment='Gaslagen ger 0,0062325 m³ = 6,23 liter.\nVolymen ska anges i liter.'
 row('6.338').locator('textarea').fill(comment);row('5.55').locator('textarea').fill('Utkast till nästa rapport.')
 for width in [390,1174]:
  pg.set_viewport_size({'width':width,'height':1000});pg.wait_for_timeout(150)
  assert not pg.evaluate('document.documentElement.scrollWidth>innerWidth');pg.screenshot(path=f'/tmp/felkommentar-inline-{width}.png',full_page=True)
 pg.evaluate('session.expires_at=Date.now()-1000;failSave=true');row('6.338').get_by_role('button',name='Granskad – inget fel').click();pg.wait_for_timeout(100)
 assert pg.evaluate('refreshCalls')==1 and pg.evaluate('session.access_token')=='fresh-test'
 assert 'Uppdatera Supabase' in row('6.338').locator('.felrad-fel').inner_text()
 assert row('6.338').locator('textarea').input_value()==comment and row('6.338').get_by_role('button',name='Åtgärdad',exact=True).is_enabled()
 assert pg.evaluate('reports[0].atgardad') is False
 pg.evaluate('failSave=false;rpcCalls=[];Promise.all([sparaFelGranskning(0,"ignorerad"),sparaFelGranskning(0,"ignorerad")])')
 calls=pg.evaluate('rpcCalls');assert len(calls)==1 and calls[0]['params']=={'p_kurs':'fy1','p_uppgift':'6.338','p_status':'ignorerad','p_kommentar':comment,'p_redigera':False},calls
 assert pg.locator('#fellogg [role=dialog]').count()==1 and pg.locator('#felgranskning').count()==0 and row('6.338').get_by_role('button',name='Spara kommentar').is_visible()
 assert row('5.55').locator('textarea').input_value()=='Utkast till nästa rapport.'
 # Tom kommentar är tillåten och sparas som null direkt med statusknappen.
 row('5.55').locator('textarea').fill('   ');row('5.55').get_by_role('button',name='Åtgärdad',exact=True).click();pg.wait_for_timeout(100)
 assert pg.evaluate('reports[1].status')=='atgardad' and pg.evaluate('reports[1].granskningskommentar') is None
 assert 'kommentar från granskningen: '+comment in pg.evaluate('felloggText()')
 # Ett senare beslut får inte skriva över statusen på en äldre avslutad rapport.
 old=pg.evaluate("felKompletteraGranskningssvar([{kurs:'fy1',uppgift:'5.55',status:'ignorerad',atgardad:true}])");assert old[0]['status']=='ignorerad' and 'granskningskommentar' not in old[0]
 malicious='<img src=x onerror="window.injected=true">\n6,23 liter är korrekt.'
 row('6.338').locator('textarea').fill(malicious);row('6.338').get_by_role('button',name='Spara kommentar').click();pg.wait_for_timeout(100)
 assert pg.evaluate('reports[0].status')=='ignorerad' and pg.evaluate('rpcCalls.at(-1).params.p_redigera') is True
 # Samtidigt sparande av två rader överlever omrendering och hindrar dubbelklick.
 pg.evaluate("reports.push({kurs:'fy1',uppgift:'7.1',antal:1,atgardad:false},{kurs:'fy1',uppgift:'7.2',antal:1,atgardad:false});felloggVisaKlara=true;ritaFellogg()")
 row('7.1').locator('textarea').fill('Första kommentaren.');row('7.2').locator('textarea').fill('Andra kommentaren.')
 pg.evaluate("()=>{delaySave=true;rpcCalls=[];window.saveA=sparaFelGranskning(2,'ignorerad');window.saveB=sparaFelGranskning(3,'atgardad');}")
 assert row('7.1').get_by_role('button',name='Åtgärdad',exact=True).is_disabled()
 pg.evaluate('completeB();window.saveB');assert row('7.1').locator('textarea').is_disabled()
 pg.evaluate('sparaFelGranskning(2,"ignorerad")');assert pg.evaluate('rpcCalls.length')==2
 pg.evaluate('completeA();window.saveA');assert row('7.1').locator('textarea').is_enabled()
 pg.evaluate('delaySave=false;stangFellogg();session={user:{id:"student"},access_token:"test",expires_at:Date.now()+3600000};arAdmin=false;arLarare=false;window.xpBefore=profile.xp;kontoMeny({stopPropagation(){},currentTarget:{getBoundingClientRect:()=>({bottom:50,right:390})}})')
 pg.get_by_role('button',name='Mina felrapporter',exact=True).click();pg.wait_for_timeout(150)
 assert malicious in pg.locator('#mina-felrapporter-lista').inner_text();assert pg.locator('#mina-felrapporter-lista img').count()==0
 assert pg.locator('#mina-felrapporter-lista .admin-rapportstatus').all_text_contents()==['Granskad – inget fel','Åtgärdad','Granskad – inget fel','Åtgärdad']
 no_comment=pg.locator('#mina-felrapporter-lista .admin-report').filter(has_text='#5.55');assert no_comment.locator('.fel-svar').count()==0 and 'Ingen kommentar' not in no_comment.inner_text()
 for width in [390,1174]:
  pg.set_viewport_size({'width':width,'height':1000});pg.wait_for_timeout(150);assert not pg.evaluate('document.documentElement.scrollWidth>innerWidth');pg.screenshot(path=f'/tmp/felkommentar-elev-inline-{width}.png',full_page=True)
 assert pg.evaluate('profile.xp===xpBefore') is True and pg.evaluate('window.injected===true') is False
 pg.evaluate('sparaSession(null)');assert pg.locator('#mina-felrapporter').count()==0
 assert not errors,errors
 print(json.dumps({'inlineAndStudentViews':4,'optionalComment':True,'draftsPreserved':True,'concurrentSave':True,'safeText':True,'xpUnchanged':True,'failures':[]}));browser.close()
