"""Individual statistics → weakest-area pass; actual UI, isolated fixture accounts."""
import os
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),args=['--no-sandbox'])
    page=b.new_page(viewport={'width':1280,'height':900});errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.goto('http://127.0.0.1:8083/index.html');page.wait_for_function('typeof larRitaElev==="function"')
    page.evaluate('''()=>{
      window.calls=[];window.legacy=false;window.courseFailure=false;window.onlyThin=false;
      window.groups=[{id:11,namn:'Fysik NA26a',kurs:'fy1',elever:2,larare:['Lärare']}];
      window.roster=[{id:'a',namn:'Alva <Berg>',grupper:[11]},{id:'b',namn:'Bo Test',grupper:[11]}];
      window.kd={bank:['a','b','c','d','e','f','thin'].map(omr=>({id:omr,omr,niva:'E'})),kap:{1:'Kapitel'},namn:{a:'Arbete',b:'Effekt',c:'Energi',d:'Densitet',e:'Tryck',f:'Enheter',thin:'Ett försök',empty:'Tomt område'},kapitel:[{kap:'1',omraden:['a','b','c','d','e','f','thin','empty']}]};
      window.student=(id)=>({ok:true,namn:roster.find(e=>e.id===id).namn,uppgifter:40,dagar:{},kurser:[
        {kurs:'fy1',forsok:25,ratt:12,vecka:5,omraden:onlyThin?[{omr:'thin',m:.1,f:1,r:0}]:[
          {omr:'f',m:.9,f:4,r:3},{omr:'a',m:.4,f:4,r:2},{omr:'e',m:.7,f:2,r:1},
          {omr:'c',m:.3,f:5,r:2},{omr:'b',m:.2,f:5,r:1},{omr:'d',m:.6,f:5,r:3},
          {omr:'thin',m:.01,f:1,r:0},{omr:'obsolete',m:.01,f:9,r:0},{omr:'empty',m:.01,f:5,r:0}]},
        {kurs:'ma2',forsok:4,ratt:2,omraden:[{omr:'a',m:.8,f:4,r:2}]}],pass:[]});
      klassRpc=async(n,a={})=>{calls.push([n,a]);
        if(n==='kg_lar_grupper')return{ok:true,grupper:groups};
        if(n==='kg_lar_elev')return student(a.p_user);
        if(n==='kg_prov_elevval')return legacy?{saknas:true}:{ok:true,elevval:true,elever:roster};
        if(n==='kg_prov_mina')return{ok:true,prov:[]};
        if(n==='kg_prov_skapa_med_elever')return{ok:true,id:91,kod:'TESTPASS'};
        return{ok:true};};
      provKursData=async(kurs)=>{if(courseFailure)throw Error('fixture load failure');return kd;};
      session={access_token:'fixture',user:{id:'teacher'}};arGruppLarare=true;arLarare=false;
      larProfil={namn:'Lärare'};renderHome();
      window.openStudent=id=>{state.larGrupp=11;state.larElev=id;oppnaLarare('grupper');};
      openStudent('a');
    }''')
    button='Skapa träningspass med de svagaste områdena'
    page.get_by_role('button',name=button,exact=True).first.wait_for()
    assert page.get_by_role('button',name=button,exact=True).count()==2
    for theme in ['light','dark']:
        page.evaluate('(t)=>document.documentElement.dataset.theme=t',theme)
        for width in [1280,390,320]:
            page.set_viewport_size({'width':width,'height':900});page.wait_for_timeout(250)
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(theme,width)
            if width==390:
                page.get_by_role('button',name=button,exact=True).first.scroll_into_view_if_needed()
                page.screenshot(path=f'/tmp/elev-svagaste-{theme}-{width}.png')
    page.get_by_role('button',name=button,exact=True).first.click();page.wait_for_selector('#prov-titel')
    assert page.evaluate('provSkapa.kurs')=='fy1'
    assert page.evaluate('provSkapa.elever')==['a']
    assert page.evaluate('provSkapa.grupper')==[]
    assert page.evaluate('provSkapa.omraden')==['a','b','c','d','e']
    assert 'Alva <Berg>' in page.locator('.prov-valda').inner_text()
    assert not page.locator('[data-prov-grupp="11"]').is_checked()
    # The teacher can still change the selection and extent before saving.
    page.locator('#prov-titel').fill('Alvas repetition')
    page.evaluate("provVaxlaOmrade('e');provSkapa.antal=15")
    page.get_by_role('button',name='Skapa träningspass',exact=True).click();page.wait_for_selector('.provklar')
    args=page.evaluate("calls.filter(c=>c[0]==='kg_prov_skapa_med_elever').at(-1)[1]")
    assert args['p_elever']==['a'] and args['p_grupper']==[] and args['p_kurs']=='fy1'
    assert args['p_omraden']==['a','b','c','d'] and args['p_antal']==15
    # Second course uses its own course and relatively weakest areas, even if all are strong.
    page.evaluate("openStudent('b')");page.get_by_role('button',name=button,exact=True).nth(1).click()
    page.wait_for_selector('#prov-titel')
    assert page.evaluate('provSkapa.elever')==['b'] and page.evaluate('provSkapa.kurs')=='ma2'
    assert page.evaluate('provSkapa.omraden')==['a']
    # Thin history and unavailable course data must not produce an empty/obsolete pass.
    page.evaluate("onlyThin=true;openStudent('a')")
    page.wait_for_selector('#larkurs-1 .larkolumner')
    assert page.locator('#larkurs-0').get_by_role('button',name=button,exact=True).count()==0
    page.evaluate("courseFailure=true;openStudent('a')")
    page.wait_for_selector('#larkurs-1 .larkolumner')
    assert page.get_by_role('button',name=button,exact=True).count()==0
    # A late response for Alva cannot overwrite Bo or preselect Alva for Bo's pass.
    page.evaluate('''()=>{onlyThin=false;courseFailure=false;
      const base=klassRpc;klassRpc=(n,a={})=>n==='kg_lar_elev'&&a.p_user==='a'?new Promise(resolve=>{window.finishAlva=()=>resolve(student('a'));}):base(n,a);
      openStudent('a');openStudent('b');}''')
    page.wait_for_selector('#larkurs-1 .larkolumner');page.evaluate('finishAlva()')
    assert page.locator('.larelev-topp h2').inner_text()=='Bo Test'
    page.get_by_role('button',name=button,exact=True).first.click();page.wait_for_selector('#prov-titel')
    assert page.evaluate('provSkapa.elever')==['b']
    # Missing SQL must never silently fall back to assigning the whole class.
    page.evaluate("legacy=true;openStudent('b')")
    page.get_by_role('button',name=button,exact=True).first.click();page.wait_for_selector('#prov-titel')
    page.locator('#prov-titel').fill('Bo repetition')
    before=page.evaluate("calls.filter(c=>c[0].includes('_skapa')).length")
    page.get_by_role('button',name='Skapa träningspass',exact=True).click()
    assert page.evaluate("calls.filter(c=>c[0].includes('_skapa')).length")==before
    assert page.locator('#prov-titel').is_visible()
    assert not errors,errors
    print('PASS: weakest five/current areas, one recipient, editable save, two courses, thin history, load failure, stale student response, legacy SQL and six layouts')
    b.close()
