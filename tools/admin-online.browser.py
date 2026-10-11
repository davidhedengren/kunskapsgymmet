"""Adminnärvaro med lokala RPC-svar. Inga produktionskonton eller skrivningar."""
import json
from datetime import datetime, timezone, timedelta
from playwright.sync_api import sync_playwright

now=lambda age=0:(datetime.now(timezone.utc)-timedelta(seconds=age)).isoformat()
users=[{'user_id':'1','namn':'Åsa Exempel','online':True,'senast_sedd':now(),'kurs':'fy1'},
       {'user_id':'2','namn':'Anna <script>exempel</script>','online':True,'senast_sedd':now(),'kurs':'ma2'},
       {'user_id':'3','namn':'Offline Exempel','online':False,'senast_sedd':now(300)},
       {'user_id':'4','namn':'Utgången signal','online':True,'senast_sedd':now(125)}]
role='admin';fail=False;calls=[]
def rpc(route):
    name=route.request.url.split('/rpc/')[-1];calls.append(name)
    if name=='kg_ar_admin':route.fulfill(status=200,json=role=='admin');return
    if name=='kg_admin_anvandare':
        if fail:route.fulfill(status=503,json={'message':'test error'});return
        if role!='admin':route.fulfill(status=403,json={'message':'kg:ej_admin'});return
        route.fulfill(status=200,json=users);return
    route.fulfill(status=200,json=[])

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1000});errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.route('https://*.supabase.co/rest/v1/rpc/**',rpc)
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.goto('http://127.0.0.1:8083/index.html?kurs=fy1')
    page.wait_for_function('typeof kgOnlineHamta==="function"')
    page.evaluate('''async()=>{
      await selectCourse('fy1');profile.attempts=42;profile.xp=15000;
      session={access_token:'local-fixture',expires_at:Date.now()+3600000,user:{id:'admin-fixture',email:'admin@example.test'}};
      arLarare=true;await kontrolleraAdmin();await kgOnlineHamta();renderDashboard();
    }''')
    button=page.locator('#kg-online-knapp');assert button.inner_text()=='2'
    assert page.locator('.top-status .xppill').count()==1
    button.hover();page.wait_for_selector('#kg-online-panel')
    assert page.locator('.kg-online-lista li').count()==2
    assert 'Offline' not in page.locator('#kg-online-panel').inner_text()
    assert 'Utgången' not in page.locator('#kg-online-panel').inner_text()
    assert page.locator('#kg-online-panel script').count()==0
    assert '<script>exempel</script>' in page.locator('#kg-online-panel').inner_text()
    page.locator('#kg-online-panel').hover();page.wait_for_timeout(220)
    assert page.locator('#kg-online-panel').count()==1
    page.mouse.move(20,150);page.wait_for_timeout(250);assert page.locator('#kg-online-panel').count()==0
    button.click();page.mouse.move(20,150);page.wait_for_timeout(220)
    assert page.locator('#kg-online-panel').count()==1
    page.keyboard.press('Escape');assert page.locator('#kg-online-panel').count()==0
    assert button.evaluate('(e)=>e===document.activeElement')
    page.keyboard.press('Enter');assert page.locator('#kg-online-panel').count()==1
    page.locator('h1').first.click();assert page.locator('#kg-online-panel').count()==0
    # Kontrollera att XP, närvarocirkel och högermenyn inte krockar.
    layouts=[]
    for theme in ['dark','light']:
        page.evaluate('(theme)=>document.documentElement.dataset.theme=theme',theme)
        for width in [1440,1280,1121,900,700,600,430,390,360,320]:
            page.set_viewport_size({'width':width,'height':1000})
            button.click()
            quality=page.evaluate('''()=>{
              const elements=[...document.querySelectorAll('.topbar .brand,.topbar .top-status,.topbar .lararplats,.topbar .topppill:not(.lararpill),.topbar .konto,.topbar .iconbtn')]
                .filter(e=>e.getBoundingClientRect().width&&getComputedStyle(e).display!=='none').map(e=>e.getBoundingClientRect());
              const overlap=elements.some((a,i)=>elements.slice(i+1).some(b=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>1));
              const panel=document.getElementById('kg-online-panel').getBoundingClientRect();
              return{overflow:document.documentElement.scrollWidth>innerWidth,overlap,
                panelFits:panel.left>=0&&panel.right<=innerWidth&&panel.bottom<=innerHeight,
                wide:[...document.querySelectorAll('.topbar *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1)
                  .map(e=>[e.className,Math.round(e.getBoundingClientRect().right)])};
            }''')
            # Den äldre instrumentpanelen har redan breddöverskridanden vid vissa
            # storlekar (kontrollerat mot HEAD före ändringen). Testa de ändrade
            # toppmenyelementen och panelen utan att dölja ett nytt toppmenyfel.
            assert not quality['wide'] and not quality['overlap'] and quality['panelFits'],(theme,width,quality)
            layouts.append([theme,width])
            if width in [1440,390]:page.screenshot(path=f'/tmp/kg-online-{theme}-{width}.png')
            page.keyboard.press('Escape')
    # Förändringar i närvaron ska uppdatera både en öppen lista och cirkeln.
    users=users[:1];page.set_viewport_size({'width':1440,'height':1000});button.click()
    page.evaluate('kgOnlineHamta()');assert button.inner_text()=='1';assert page.locator('.kg-online-lista li').count()==1
    fail=True;page.evaluate('kgOnlineHamta()');assert button.inner_text()=='–'
    assert 'kunde inte hämtas' in page.locator('#kg-online-panel').inner_text()
    fail=False;button.click();page.wait_for_function("document.getElementById('kg-online-knapp').textContent==='1'")
    users=[];page.evaluate('kgOnlineHamta()');assert button.inner_text()=='0'
    assert 'Ingen är online' in page.locator('#kg-online-panel').inner_text()
    training_views=0
    for task_id in ['5.55','6.147']:
        for width in [1440,760,600,390,320]:
            page.set_viewport_size({'width':width,'height':1000})
            page.evaluate('''id=>{
              state.currentTask=expandGameTask(state.data.bank.find(t=>t.id===id))[0];
              state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];
              state.sessionTarget=6;state.sessionDone=0;renderTraining();window.scrollTo(0,0);
            }''',task_id)
            assert page.locator('.train-status #kg-online-knapp').count()==1
            button.click()
            geometry=page.evaluate('''()=>{
              const xp=document.getElementById('xpmeter').getBoundingClientRect(),
                b=document.getElementById('kg-online-knapp').getBoundingClientRect(),
                panel=document.getElementById('kg-online-panel').getBoundingClientRect();
              return xp.right<=b.left && Math.abs(xp.top+xp.height/2-b.top-b.height/2)<2
                && b.right<=innerWidth && panel.right<=innerWidth && panel.bottom<=innerHeight;
            }''')
            assert geometry,(task_id,width)
            if width==390:page.screenshot(path=f'/tmp/kg-online-training-{task_id}.png')
            page.keyboard.press('Escape');training_views+=1
    # Även utan tidigare uppgifter/XP ska admin se cirkeln.
    page.evaluate('profile.attempts=0;renderDashboard()');assert button.count()==1
    assert page.locator('.top-status .xppill').count()==0
    # Utloggning/kontobyte rensar visningsdata, även om rollen inte verifierats igen.
    page.evaluate("sparaSession({user:{id:'teacher-fixture'},access_token:'fixture',expires_at:Date.now()+3600000});renderDashboard()")
    assert button.count()==0;assert page.locator('#kg-online-panel').count()==0
    role='teacher';before=calls.count('kg_admin_anvandare');page.evaluate('kontrolleraAdmin()');page.evaluate('kgOnlineHamta()')
    assert calls.count('kg_admin_anvandare')==before;assert button.count()==0
    assert page.evaluate('kgOnline.users') is None
    # Utloggning ska rensa omedelbart, innan nätverksanropet är färdigt.
    role='admin';users=[{'user_id':'1','namn':'Åsa Exempel','online':True,'senast_sedd':now(),'kurs':'fy1'}]
    page.evaluate('''async()=>{
      sparaSession({user:{id:'admin-fixture'},access_token:'fixture',expires_at:Date.now()+3600000});
      await kontrolleraAdmin();await kgOnlineHamta();renderDashboard();
    }''')
    button.click();assert page.locator('.kg-online-lista li').count()==1
    cleared=page.evaluate('''()=>{
      window.onlineLogout=loggaUt();return kgOnline.users===null && !document.getElementById('kg-online-panel');
    }''')
    assert cleared;page.evaluate('window.onlineLogout');assert button.count()==0
    assert not errors,errors
    print(json.dumps({'layouts':len(layouts),'trainingViews':training_views,'hoverClickKeyboard':True,'refreshErrorRetry':True,
                      'teacherDenied':True,'accountChangeCleared':True,'logoutCleared':True,'javascriptErrors':errors}))
    browser.close()
