"""Verkliga drag och beräkningar i Chromium; inga produktionsanrop."""
import json
from playwright.sync_api import sync_playwright

URL = 'http://127.0.0.1:8082/index.html?kurs=fy1'

def open_calculator(page):
    page.evaluate("""() => {
      state.view='training'; state.currentTask={id:'local-fixture',miniräknare:true};
      hjalp.raknare=true; hjalpSynk();
    }""")
    page.wait_for_selector('#hm-raknare')
    page.wait_for_timeout(300)

def drag(page, selector, dx, dy):
    b=page.locator(selector).bounding_box()
    x,y=b['x']+b['width']/2,b['y']+b['height']/2
    page.mouse.move(x,y); page.mouse.down()
    page.mouse.move(x+dx,y+dy,steps=8); page.mouse.up()

def bounds(page):
    return page.locator('#hm-raknare').bounding_box()

def within_screen(page):
    r=bounds(page); v=page.viewport_size
    assert r['x']>=7 and r['y']>=7,r
    assert r['x']+r['width']<=v['width']-7,r
    assert r['y']+r['height']<=v['height']-7,r

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    context=browser.new_context(viewport={'width':1440,'height':1100})
    page=context.new_page(); errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.goto(URL); open_calculator(page)
    handle='#hm-raknare .hmf-storlek'
    assert page.locator(handle).is_visible() # Tillgängligt även när räknaren är dockad.
    original=bounds(page)
    drag(page,handle,-100,-40)
    smaller=bounds(page); assert smaller['width']<original['width']-80,(original,smaller)
    assert page.evaluate('hjalp.dock.raknare===false')
    drag(page,handle,150,140)
    larger=bounds(page); assert larger['width']>smaller['width']+140
    assert larger['height']>smaller['height']+130
    within_screen(page)
    assert not page.evaluate('document.body.classList.contains("hm-drar")')
    # Tangenterna använder den nya höjden; ingen tom yta under tangentbordet.
    assert page.locator('.rk-tangenter button').first.bounding_box()['height']>44
    for key in ['rensa','6','×','7','lika']:
        page.locator(f'.rk-tangenter button[data-v="{key}"]').click()
    assert '42' in page.locator('#rk-res').inner_text()
    page.screenshot(path='/tmp/kg-raknare-stor.png')
    saved=page.evaluate('JSON.parse(localStorage.getItem(HJALP_KEY)).pos.raknare')
    page.reload(); open_calculator(page)
    restored=bounds(page)
    assert abs(restored['width']-saved['w'])<=1
    assert abs(restored['height']-saved['h'])<=1
    # Tillgängligt tangentbordsalternativ: 10 px, eller 40 px med Shift.
    page.locator(handle).focus();page.keyboard.press('Shift+ArrowRight')
    assert abs(bounds(page)['width']-restored['width']-40)<=1
    page.keyboard.press('ArrowLeft')
    assert abs(bounds(page)['width']-restored['width']-30)<=1
    # Uppgiftsbyte/omritning behåller storleken.
    before=bounds(page);page.evaluate('hjalpSynk()');assert bounds(page)==before
    drag(page,handle,-700,-700);assert bounds(page)['width']==240 and bounds(page)['height']==330
    assert page.locator('.rk-tangenter button').first.bounding_box()['height']<36
    assert page.locator('.rk-kropp').evaluate('(e)=>e.scrollHeight<=e.clientHeight+1')
    # Skärmen och alla tangenter ryms vid minsta storlek på en hög skärm.
    page.locator('.rk-tangenter button[data-v="lika"]').click()
    for key in ['rensa','8','×','9','lika']:
        page.locator(f'.rk-tangenter button[data-v="{key}"]').click()
    assert '72' in page.locator('#rk-res').inner_text()
    assert page.locator('#rk-in').is_visible()
    page.screenshot(path='/tmp/kg-raknare-liten.png')
    # Även den kompakta storleken ska överleva omladdning, utan gammal höjdgräns.
    page.reload();open_calculator(page)
    assert bounds(page)['width']==240 and bounds(page)['height']==330,bounds(page)
    page.evaluate('hjalp.dock.raknare=true;hjalpLayout()')
    assert page.locator('#hm-raknare').evaluate('(e)=>Number(e.style.getPropertyValue("--rk-skala"))')==1
    page.evaluate('hjalp.dock.raknare=false;hjalpLayout()')
    page.wait_for_timeout(250) # Den befintliga öppningsanimationen skalar tillfälligt till 98 %.
    assert bounds(page)['width']==240 and bounds(page)['height']==330,bounds(page)
    page.set_viewport_size({'width':390,'height':650});page.wait_for_timeout(200);within_screen(page)
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.screenshot(path='/tmp/kg-raknare-mobil.png')
    page.evaluate("document.documentElement.dataset.theme='light'")
    page.screenshot(path='/tmp/kg-raknare-ljus.png')
    page.set_viewport_size({'width':900,'height':360});page.wait_for_timeout(200);within_screen(page)
    page.locator('.rk-tangenter button[data-v="lika"]').click()
    # Formelbladets fristående storleksändring ska fortfarande fungera.
    page.set_viewport_size({'width':1440,'height':1100});page.wait_for_timeout(200)
    page.evaluate("""() => {
      const f=hjalpSkapaFormel(); hjalp.dock.formel=false;
      hjalp.pos.formel={x:50,y:50,w:500,h:600}; hjalpPlacera(f);
    }""")
    page.wait_for_timeout(300)
    fb=page.locator('#hm-formel').bounding_box();drag(page,'#hm-formel .hmf-storlek',-80,-90)
    fa=page.locator('#hm-formel').bounding_box()
    assert abs(fa['width']-fb['width']+80)<=1 and abs(fa['height']-fb['height']+90)<=1,(fb,fa)
    # Riktig pekgest på pekskärm, inklusive pointercancel-städning.
    touch_context=browser.new_context(viewport={'width':390,'height':844},has_touch=True,is_mobile=True)
    touch=touch_context.new_page();touch.route('https://*.supabase.co/**',lambda r:r.abort())
    touch.on('pageerror',lambda e:errors.append(str(e)))
    touch.goto(URL);open_calculator(touch);cdp=touch_context.new_cdp_session(touch)
    b=touch.locator(handle).bounding_box();x,y=b['x']+14,b['y']+14;old=bounds(touch)
    cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x-60,'y':y-50}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchCancel','touchPoints':[]})
    assert bounds(touch)['width']<old['width']-50
    assert not touch.evaluate('document.body.classList.contains("hm-drar")')
    assert not touch.locator('#hm-raknare').evaluate('(e)=>e.classList.contains("drar")')
    within_screen(touch)
    assert not errors,errors
    print(json.dumps({'mouseResize':True,'touchResize':True,'savedSize':True,'keyboardResize':True,
      'viewportBounds':True,'calculatorResult':42,'formulaResize':True,'javascriptErrors':errors}))
    browser.close()
