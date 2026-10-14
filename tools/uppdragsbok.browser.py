"""Real app: bounded parchment, weekly navigation and historical quest sessions. Local data only."""
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':1440,'height':1000});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.emulate_media(reduced_motion='reduce')
 page.goto('http://127.0.0.1:8083/index.html');page.wait_for_function('typeof uppdragBokDatum==="function"')
 page.evaluate('''async()=>{session=null;syncOwner=null;arLarare=false;arGruppLarare=false;await selectCourse('fy1');}''')
 page.wait_for_selector('.pt-uppfall')
 page.locator('.pt-uppfall summary').focus();page.keyboard.press('Enter');page.wait_for_selector('.pt-uppfall[open]')
 page.wait_for_function('localStorage.getItem("kunskapsgymmet-uppdrag-visning:guest")==="1"')
 for theme in ['dark','light']:
  page.evaluate('(t)=>document.documentElement.dataset.theme=t',theme)
  for width in [1440,390,320]:
   page.mouse.move(0,0);page.set_viewport_size({'width':width,'height':1000})
   for opened in [False,True]:
    page.evaluate('document.querySelector(".pt-uppfall").open=false');page.wait_for_timeout(100)
    height=page.locator('.pt').bounding_box()['height']
    page.evaluate('(v)=>document.querySelector(".pt-uppfall").open=v',opened);page.wait_for_timeout(300)
    assert abs(page.locator('.pt').bounding_box()['height']-height)<1,(theme,width,opened)
    assert page.locator('.pt-upp-innehall').evaluate('(e)=>!e.clientWidth||e.scrollWidth<=e.clientWidth+1')
    assert page.locator('.pt-uppfall').evaluate('(e)=>e.getBoundingClientRect().right<=innerWidth+1')
    assert page.locator('.pt-uppfall').evaluate('(e)=>getComputedStyle(e,"::before").content')=='""'
    if opened:
     assert page.locator('.pt-upp-innehall').evaluate('(e)=>e.scrollHeight>e.clientHeight')
     page.locator('.pt-upp-innehall').evaluate('(e)=>{e.scrollTop=e.scrollHeight;}')
     assert page.locator('.pt-upp-innehall').evaluate('(e)=>e.scrollTop>0')
     if width>760:assert page.locator('.pt-uppfall').evaluate('(e)=>e.getBoundingClientRect().bottom<=e.closest(".pt-topp").getBoundingClientRect().bottom+1')
    if width in [1440,390]:page.screenshot(path=f'/tmp/quest-book-{theme}-{width}-{opened}.png',full_page=True)
 # Archive known yesterday, do not fabricate missing days.
 page.evaluate('''()=>{
  window.questYesterday=uppdragVeckodagar().at(-2);window.questToday=uppdragNyckel();
  const row=(typ,main=false)=>({typ,huvud:main,text:'Klara fem uppgifter',mal:5,n:0,klar:false});
  profile.uppdrag={nyckel:questYesterday,kurser:{fy1:{lista:[row('alla',true),row('utanhjalp'),row('serie'),row('dagsmal')],klar:false}}};
  profile.uppdragsVecka={};state.ptOppen=true;renderDashboard();
 }''')
 if page.locator('.pt-uppfall').get_attribute('open') is None:page.locator('.pt-uppfall summary').click()
 page.wait_for_selector('.pt-uppfall[open]')
 page.get_by_role('button',name='Föregående dag').click();assert page.evaluate('uppdragBokDatum()')==page.evaluate('questYesterday')
 assert '+50 XP' in page.locator('.pt-upp-innehall').inner_text()
 assert page.locator('.pt-upp-innehall .pt-uppxp').all_text_contents()==['+50 XP','+25 XP','+25 XP','+25 XP']
 page.get_by_role('button',name='Föregående dag').click();assert 'Inga uppdrag sparade' in page.locator('.pt-upp-innehall').inner_text()
 for _ in range(4):page.get_by_role('button',name='Föregående dag').click()
 assert page.get_by_role('button',name='Föregående dag').is_disabled()
 page.get_by_role('button',name='Till dagens uppdrag').click();assert page.get_by_role('button',name='Nästa dag').is_disabled()
 page.get_by_role('button',name='Föregående dag').click();page.locator('.pt-uppgo').first.click()
 page.wait_for_function('state.view==="training"')
 assert page.evaluate('state.uppdragsDag.datum')==page.evaluate('questYesterday')
 assert page.evaluate('JSON.parse(localStorage.getItem(PASS_KEY)).uppdragsDag.datum')==page.evaluate('questYesterday')
 page.evaluate('''()=>{const saved=lasPagaendePass();state.uppdragsDag=null;aterupptaPass(saved);}''')
 assert page.evaluate('state.uppdragsDag.datum')==page.evaluate('questYesterday')
 page.evaluate('continueSession()');assert page.evaluate('state.uppdragsDag.datum')==page.evaluate('questYesterday')
 page.evaluate('''()=>{
  window.beforeRetro=profile.uppdragRetroXp;window.beforeXp=profile.xp;
  for(let i=0;i<5;i++)uppdragTidigareSvar(state.currentTask,true,false);
 }''')
 assert page.evaluate('profile.uppdragRetroXp-beforeRetro')==175
 page.evaluate('uppdragTidigareSvar(state.currentTask,true,false)');assert page.evaluate('profile.uppdragRetroXp-beforeRetro')==175
 page.evaluate('startPass("grund")');assert page.evaluate('state.uppdragsDag') is None
 # Login without migrated SQL can read the log, but cannot start/reward an older set.
 page.evaluate('''()=>{
  session={access_token:'local-test',user:{id:'fixture-student'}};
  uppdragBokVal.set(uppdragBokNyckel(),questYesterday);state.ptOppen=true;renderDashboard();
  const u=profile.uppdragsVecka[questYesterday].kurser.fy1;u.lista[0].klar=false;u.lista[0].betald=false;u.lista[0].n=0;u.klar=false;renderDashboard();
 }''')
 page.wait_for_selector('.pt-uppfall');page.evaluate('document.querySelector(".pt-uppfall").open=true')
 assert page.locator('.pt-uppgo').first.is_disabled()
 page.evaluate('''()=>{uppdragSattRetroStod({uppdragsbok:true},session.user.id);renderDashboard();}''')
 page.evaluate('document.querySelector(".pt-uppfall").open=true');assert not page.locator('.pt-uppgo').first.is_disabled()
 page.locator('.pt-uppgo').first.click();page.wait_for_function('state.view==="training"')
 assert page.evaluate('state.uppdragsDag.agare')=='fixture-student'
 # Persist log and presentation preference through a full reload.
 page.evaluate('''()=>{session=null;syncOwner=null;saveProfile();localStorage.setItem('kunskapsgymmet-uppdrag-visning:guest','1');}''')
 page.reload();page.wait_for_function('typeof uppdragBokDatum==="function"');page.evaluate('''async()=>{await selectCourse('fy1');state.ptOppen=true;renderDashboard();}''')
 page.wait_for_selector('.pt-uppfall[open]');assert page.evaluate('!!profile.uppdragsVecka[uppdragVeckodagar().at(-2)]')
 assert not errors,errors
 print('PASS: 12 bounded parchment states, own scroll, keyboard, day navigation/empty history, half XP once, real historical session/resume, default normal session, SQL capability gate, reload/log persistence')
 b.close()
