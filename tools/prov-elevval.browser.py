"""Real app recipient controls with isolated RPCs; desktop/mobile and save/edit failures."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),args=['--no-sandbox'])
    page=b.new_page(viewport={'width':1280,'height':900});errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.goto('http://127.0.0.1:8083/index.html');page.wait_for_function('typeof provSkapaStart==="function"')
    page.evaluate('''()=>{
      window.calls=[];window.oldServer=false;window.failSave=false;
      window.students=[{id:'a',namn:'Alva <Berg>',grupper:[11]},{id:'b',namn:'Bo Test',grupper:[11,12]},{id:'c',namn:'Cia Test',grupper:[12]}];
      klassRpc=async(n,a={})=>{calls.push([n,a]);
        if(n==='kg_lar_grupper')return{ok:true,grupper:[{id:11,namn:'NA26a',elever:2,kurs:'fy1'},{id:12,namn:'NA26b',elever:2,kurs:'fy1'}]};
        if(n==='kg_prov_elevval')return oldServer?{saknas:true}:{ok:true,elevval:true,elever:students};
        if(n==='kg_prov_mina')return{ok:true,prov:[]};
        if(n.includes('_skapa')||n.includes('_andra'))return failSave?{ok:false}:{ok:true,id:91,kod:'PROV48'};
        return{ok:true};};
      provSkapaLaddaKurs=async()=>{provSkapa.kd={bank:[],kapitel:[],namn:{effekt:'Effekt'}};};
      session={access_token:'fixture',user:{id:'teacher'}};arGruppLarare=true;arLarare=false;
      larProfil={namn:'Lärare'};renderHome();oppnaProvLarare();
    }''')
    page.wait_for_selector('#provlarare-kropp')
    page.evaluate("provSkapaStart({kurs:'fy1',grupper:[11]})");page.wait_for_selector('#prov-titel')
    page.locator('#prov-titel').fill('Inför Prov v.48')
    page.get_by_role('button',name='Välj elever',exact=True).first.click()
    assert page.locator('[data-prov-elev=a]').is_checked()
    page.locator('[data-prov-elev=b]').uncheck()
    assert page.evaluate('provSkapa.grupper')==[]
    assert page.evaluate('provSkapa.elever')==['a']
    assert page.locator('#prov-titel').input_value()=='Inför Prov v.48'
    assert page.locator('#prov-elever-11').inner_text().find('Alva <Berg>')>=0
    page.locator('[data-prov-elev=b]').focus();page.keyboard.press('Space')
    assert page.evaluate('provSkapa.elever')==['a','b']
    assert page.locator('[data-prov-elev=b]').evaluate('(el)=>el===document.activeElement')
    page.locator('[data-prov-grupp="12"]').check()
    page.get_by_role('button',name='Välj elever',exact=True).click()
    page.locator('[data-prov-elev=b][data-grupp="12"]').uncheck()
    assert page.evaluate('provSkapa.grupper')==[]
    assert sorted(page.evaluate('provSkapa.elever'))==['a','c']
    assert not page.locator('[data-prov-elev=b][data-grupp="11"]').is_checked()
    page.locator('[data-prov-grupp="11"]').check()
    assert page.evaluate('provSkapa.grupper')==[11]
    assert page.evaluate('provSkapa.elever')==['c']
    page.locator('[data-prov-grupp="11"]').uncheck()
    assert not page.locator('[data-prov-elev=a]').is_checked()
    for theme in ['light','dark']:
        page.evaluate('(t)=>document.documentElement.dataset.theme=t',theme)
        for width in [1280,390,320]:
            page.set_viewport_size({'width':width,'height':900})
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(theme,width)
            if width in [1280,390]:
                page.locator('#prov-mottagare').scroll_into_view_if_needed()
                page.screenshot(path=f'/tmp/prov-elevval-{theme}-{width}.png')
    page.evaluate("provSkapa.omraden=['effekt'];failSave=true")
    page.get_by_role('button',name='Skapa träningspass',exact=True).click()
    page.wait_for_function('!provSkapa.sparar')
    assert page.evaluate('provSkapa.elever')==['c']
    page.evaluate('failSave=false')
    page.get_by_role('button',name='Skapa träningspass',exact=True).click();page.wait_for_selector('.provklar')
    args=page.evaluate("calls.filter(x=>x[0]==='kg_prov_skapa_med_elever').at(-1)[1]")
    assert args['p_elever']==['c'] and args['p_grupper']==[]
    assert 'Cia Test får passet individuellt' in page.locator('.provklar').inner_text()
    page.evaluate("provSkapaStart({redigera:{id:91,kurs:'fy1',titel:'Inför Prov v.48',omraden:['effekt'],elever:[{id:'a',namn:'Alva <Berg>'}],grupper:[]}})")
    page.wait_for_selector('#prov-titel');assert page.evaluate('provSkapa.elever')==['a']
    page.get_by_role('button',name='Välj elever',exact=True).first.click()
    assert page.locator('[data-prov-elev=a]').is_checked()
    page.locator('[data-prov-elev=b]').check()
    # Keep a real area in the stubbed course structure when testing save.
    page.evaluate("provSkapa.omraden=['effekt']")
    page.get_by_role('button',name='Spara ändringar',exact=True).click()
    page.wait_for_function("calls.some(x=>x[0]==='kg_prov_andra_med_elever')")
    assert page.evaluate("calls.find(x=>x[0]==='kg_prov_andra_med_elever')[1].p_elever")==['a','b']
    # Legacy backend keeps the original class pass RPC and hides unavailable controls.
    page.evaluate("oldServer=true;provSkapaStart({kurs:'fy1',grupper:[11]})")
    page.wait_for_selector('#prov-titel');assert page.get_by_role('button',name='Välj elever',exact=True).count()==0
    page.locator('#prov-titel').fill('Hela klassen');page.evaluate("provSkapa.omraden=['effekt']")
    page.get_by_role('button',name='Skapa träningspass',exact=True).click();page.wait_for_selector('.provklar')
    assert 'p_elever' not in page.evaluate("calls.filter(x=>x[0]==='kg_prov_skapa').at(-1)[1]")
    assert page.evaluate("provTillGrupp({grupper:[],elevgrupper:[11]},11)")
    assert not errors,errors
    print('PASS: single/multiple/whole group, overlap, keyboard, save failure, edit, legacy SQL, six layouts; no JS errors')
    b.close()
