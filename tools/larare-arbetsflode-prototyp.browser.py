"""Review the isolated, offline workflow prototype. No production API calls."""
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parents[1];out=root/'prototyper'/'bilder';out.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1440,'height':1100});errors=[];network=[]
 page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:network.append(r.url))
 page.goto('http://127.0.0.1:8083/prototyper/larare-elev.html')
 for scenario in ['teacher','newteacher','student','empty']:
  page.locator('#scenario').select_option(scenario)
  for width in [1440,390,320]:
   page.set_viewport_size({'width':width,'height':1100})
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(scenario,width,page.evaluate("[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>[e.tagName,e.className,Math.round(e.getBoundingClientRect().width)])"))
   if width in [1440,390]:page.screenshot(path=str(out/f'{scenario}-{width}.png'),full_page=True)
 page.set_viewport_size({'width':1280,'height':1000});page.locator('#scenario').select_option('teacher')
 # Teacher mode switch gives direct access to own course selection and exercise.
 page.get_by_label('Arbetsläge').get_by_role('button',name='Träna själv',exact=True).click();assert page.locator('h1').inner_text()=='Träna själv.'
 page.screenshot(path=str(out/'egen-traning.png'),full_page=True)
 page.locator('.practice-grid .card').first.get_by_role('button').click();page.get_by_role('button',name='Börja träna →').first.click();page.get_by_label('Ditt svar').fill('5');page.get_by_role('button',name='Kontrollera',exact=True).click();assert 'Rätt!' in page.locator('#feedback').inner_text()
 page.get_by_role('button',name='Min undervisning',exact=True).click();assert page.locator('h1').inner_text()=='Din undervisning, samlad.'
 page.get_by_role('button',name='Öppna grupp →').first.click();page.screenshot(path=str(out/'gruppoversikt.png'),full_page=True)
 # One pass shared with two overlapping groups has unique recipients.
 page.get_by_role('button',name='+ Skapa träningspass',exact=True).click();page.locator('#pass-name').fill('Extra repetition');page.locator('input[name=pass-group][value="3"]').check();assert page.locator('#pass-audience').inner_text()=='2 grupper · 14 unika elever'
 page.screenshot(path=str(out/'skapa-pass.png'),full_page=True)
 page.get_by_role('button',name='Skapa och dela pass',exact=True).click();assert page.locator('h3').filter(has_text='Extra repetition').count()==1
 assert page.evaluate('myPasses().filter(p=>p.title==="Extra repetition").length')==1
 # Import classes, skip already checked members, no change to original class/other group.
 page.get_by_role('button',name='Elever',exact=True).click();page.get_by_role('button',name='+ Lägg till elever',exact=True).click()
 assert page.locator('#roster input:checked:disabled').count()==12
 page.locator('#class-select').select_option('NA26b');assert page.locator('#selection-count').inner_text()=='4 nya elever valda'
 page.locator('#class-select').select_option('TE26a');assert page.locator('#selection-count').inner_text()=='12 nya elever valda'
 page.locator('#class-select').select_option('NA26b');assert page.locator('#selection-count').inner_text()=='12 nya elever valda'
 page.locator('#student-search').fill('Mira');page.locator('#roster input[value="13"]').uncheck();assert page.locator('#selection-count').inner_text()=='11 nya elever valda'
 page.locator('#student-search').fill('');page.screenshot(path=str(out/'klassimport.png'),full_page=True)
 page.get_by_role('button',name='Lägg till valda elever',exact=True).click()
 assert page.evaluate('group().ids.length')==23;assert page.evaluate('students.find(s=>s.id===14).klass')=='NA26b';assert page.evaluate('groups.find(g=>g.id===3).ids.includes(14)')
 # First-time teacher: course is required and carried into group/pass.
 page.locator('#scenario').select_option('newteacher');page.get_by_role('button',name='Skapa min första grupp',exact=True).click();page.locator('#group-name').fill('Fysik TE26a');page.locator('#group-course').select_option(label='Fysik nivå 1');page.get_by_role('button',name='Skapa och lägg till elever →',exact=True).click();page.locator('#class-select').select_option('TE26a');page.get_by_role('button',name='Lägg till valda elever',exact=True).click();assert page.evaluate('group().course')=='Fysik nivå 1'
 page.get_by_role('button',name='Översikt',exact=True).click();page.get_by_role('button',name='+ Skapa träningspass',exact=True).click();assert page.locator('[role=dialog] .tag').inner_text()=='Fysik nivå 1';page.keyboard.press('Escape')
 # Empty student page reaches exercise without a pass or group-setup detour.
 page.locator('#scenario').select_option('empty');page.locator('.practice-grid .card').first.get_by_role('button').click();page.get_by_role('button',name='Börja träna →').first.click();assert page.get_by_label('Ditt svar').count()==1
 page.locator('#scenario').select_option('student');assert page.locator('.grid.two .card').count()==2 # same pass via two groups stays one card
 page.get_by_role('button',name='Fortsätt →',exact=True).click();page.get_by_label('Ditt svar').fill('5');page.get_by_role('button',name='Kontrollera',exact=True).click();page.get_by_role('button',name='← Till min träning').click();assert '9 av 20' in page.locator('.grid.two .card').first.inner_text()
 # Group overview, roster and modal fit a narrow screen too.
 page.locator('#scenario').select_option('teacher');page.set_viewport_size({'width':320,'height':900});page.get_by_role('button',name='Öppna grupp →').first.click();assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
 page.get_by_role('button',name='Elever',exact=True).click();page.get_by_role('button',name='+ Lägg till elever',exact=True).click();assert page.locator('.modal').evaluate('(el)=>el.scrollWidth<=el.clientWidth+1')
 assert not errors,errors;assert all(u.startswith('http://127.0.0.1:8083/') for u in network),network
 print('PASS: 12 layouts; teacher mode switch and self-practice; onboarding; course inheritance; unique pass recipients; class import; checked members; student with/without pass; no external requests')
 browser.close()
