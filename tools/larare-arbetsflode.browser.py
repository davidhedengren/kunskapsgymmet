"""Approved teacher/student workflow against index.html; isolated RPC fixtures."""
import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)));page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.goto('http://127.0.0.1:8083/index.html');page.wait_for_function('typeof larStartKlasser==="function"')
 page.evaluate('''()=>{
  window.fixtureCalls=[];window.fixtureFailure=false;
  window.fixtureGroups=[{id:11,namn:'NA26 <klass>',kurs:'fy1',kod:'ABC234',elever:1,aktiva:1,larare:['Lärare Test'],synlig:true},{id:12,namn:'Källklass',kod:'DEF234',elever:2,aktiva:1,larare:['Lärare Test']}];
  window.fixtureStudents=[{id:'a',klass:{id:41,namn:'NA26a'},namn:'Åsa <script>test</script>',medlem:false,grupper:[{id:12,namn:'Källklass'}]},{id:'b',klass:{id:42,namn:'NA26b'},namn:'Bo Test',medlem:false,grupper:[]},{id:'c',klass:{id:41,namn:'NA26a'},namn:'Cia Test',medlem:true,grupper:[{id:11,namn:'NA26'}]}];
  klassRpc=async(name,args={})=>{fixtureCalls.push([name,args]);
   if(name==='kg_lar_grupper')return {ok:true,kursstod:true,grupper:fixtureGroups};
   if(name==='kg_lar_grupp_skapa_kurs'){const g={id:30,namn:args.p_namn,kurs:args.p_kurs,kod:'GHI234',elever:0,aktiva:0,larare:['Lärare Test']};fixtureGroups.push(g);return{ok:true,...g};}
   if(name==='kg_prov_mina')return {ok:true,prov:[]};
   if(name==='kg_lar_elevlista')return{ok:true,klassimport:true,elever:fixtureStudents};
   if(name==='kg_lar_elever_lagg_till')return fixtureFailure?{ok:false,code:'kallklass'}:{ok:true,tillagda:args.p_elever.length};
   if(name==='kg_lar_elever')return{ok:true,elever:[{id:'c',klass:{id:41,namn:'NA26a'},namn:'Cia Test',vecka:12,vecka_ratt:10,senaste:12,senaste_ratt:10,uppgifter:42}]};
   if(name==='kg_lar_grupp_omraden')return{ok:true,omraden:{test:{m:0.65,elever:1,forsok:12,ratt:10}}};
   return{ok:true};};
  hamtaGlobalStatistik=async()=>({anvandare:280,uppgifter:23064});
  provKursData=async()=>({bank:[],kapitel:[{kap:'1',omraden:['test']}],namn:{test:'Testområde'},spar:null});
  provSkapaLaddaKurs=async()=>{provSkapa.kd={bank:[],kapitel:[],namn:{}};};
  session={access_token:'local-test',user:{id:'teacher',email:'teacher@example.test'}};
  larProfil={namn:'Lärare Test',skola:{id:10,namn:'Testskolan'}};arLarare=false;arGruppLarare=true;renderHome();
 }''')
 page.wait_for_selector('.larkort')
 page.evaluate('''()=>{
  window.fixturePasses=[{id:91,titel:'Laddning',kurs:'fy1',aktiv:true,grupper:[{id:11,namn:'NA26'},{id:12,namn:'Källklass'}],antal:30,kod:'FY1-TEST'},
   {id:92,titel:'Annan grupps pass',kurs:'ma2',aktiv:true,grupper:[{id:12,namn:'Källklass'}],antal:30},
   {id:93,titel:'Avslutat pass',kurs:'fy1',aktiv:false,grupper:[{id:11,namn:'NA26'}],antal:30}];
  window.fixtureAssigned=[];window.fixtureCourseFailure=false;
  const base=klassRpc;klassRpc=async(name,args={})=>{
   if(name==='kg_prov_mina')return{ok:true,prov:fixturePasses};
   if(name==='kg_prov_for_mig')return fixtureAssigned;
   if(name==='kg_lar_grupp_kurs'){
    if(fixtureCourseFailure)return{ok:false};
    fixtureGroups.find(g=>g.id===args.p_grupp).kurs=args.p_kurs;return{ok:true};
   }
   if(name==='kg_prov_sammanstallning')return{ok:true,prov:fixturePasses.find(p=>p.id===args.p_prov),elever:1,tranat:1,uppgifter:12,elevlista:[{namn:'Cia',klara:12}],omraden:{}};
   if(name==='kg_prov_skapa'){fixtureCalls.push([name,args]);return{ok:true,id:99,kod:'NYTT-PASS'};}
   return base(name,args);
  };
  profile.attempts=5;window.profileBefore=JSON.stringify(profile);
 }''')
 # Teacher modes preserve learning data and restore correctly through browser history.
 page.get_by_role('button',name='Träna själv',exact=True).click();page.wait_for_selector('.course-grid')
 assert page.locator('.xppill').count()==1
 assert page.locator('#provbanner').inner_text()==''
 page.get_by_role('button',name='Min undervisning',exact=True).click();page.wait_for_selector('.larkort')
 assert page.locator('.xppill').count()==0
 page.go_back();page.wait_for_selector('.course-grid');assert page.evaluate('larLage()')=='traning'
 page.go_forward();page.wait_for_selector('.larkort');assert page.evaluate('larLage()')=='undervisning'
 assert page.evaluate('JSON.stringify(profile)===profileBefore')
 # Own practice reaches the real course, independently of group/course choices.
 page.get_by_role('button',name='Träna själv',exact=True).click();page.locator('#course-fy1').click()
 page.wait_for_function('state.course==="fy1" && state.view==="dashboard"')
 page.get_by_role('button',name='Min undervisning',exact=True).click();page.wait_for_selector('.larkort')
 # Group overview, pass filtering and result drill-down.
 page.locator('.larkort').filter(has_text='NA26').click();page.wait_for_selector('.larstat')
 assert page.locator('#largruppkropp .larkort').count()==1
 page.locator('#largruppkropp .larkort').filter(has_text='Laddning').click();page.wait_for_selector('#provres-91 .provres-topp')
 assert page.locator('.provrad').count()==2
 assert page.locator('[data-pass-id="91"]').get_attribute('open') is not None
 assert page.get_by_text('Annan grupps pass',exact=True).count()==0
 page.get_by_role('button',name='Gruppens statistik per område',exact=True).click();page.wait_for_selector('#laromr .provres')
 assert page.evaluate('state.larKurs')=='fy1'
 # Course settings persist via the RPC; failure restores the previous selection.
 page.locator('.larinstallningar summary').click();course=page.locator('.larinstallningar select')
 page.evaluate('fixtureCourseFailure=true');course.select_option('ma2');page.wait_for_function('!document.querySelector(".larinstallningar select").disabled')
 assert course.input_value()=='fy1'
 page.evaluate('fixtureCourseFailure=false');course.select_option('ma2');page.wait_for_function('larGrupp().kurs==="ma2"')
 page.get_by_role('button',name='Skapa träningspass',exact=True).click();page.wait_for_selector('#prov-titel')
 assert page.evaluate('({kurs:provSkapa.kurs,grupper:provSkapa.grupper})')=={'kurs':'ma2','grupper':[11]}
 page.locator('#prov-titel').fill('Repetition')
 page.evaluate('()=>{provSkapa.omraden=["test"];provSkapa.grupper=[11,12];}')
 page.evaluate('''()=>{const base=klassRpc;klassRpc=(n,a)=>n==='kg_prov_skapa'?new Promise(resolve=>{window.finishCreation=()=>resolve(base(n,a));}):base(n,a);window.firstCreation=provSkapaSkicka();}''')
 page.evaluate('provSkapaSkicka()');assert page.evaluate('provSkapa.sparar')
 page.evaluate('finishCreation()');page.evaluate('firstCreation');page.wait_for_selector('.provklar')
 assert page.evaluate('fixtureCalls.filter(x=>x[0]==="kg_prov_skapa").length')==1
 args=page.evaluate('fixtureCalls.filter(x=>x[0]==="kg_prov_skapa").at(-1)[1]')
 assert args['p_grupper']==[11,12] and args['p_kurs']=='ma2' and args['p_titel']=='Repetition'
 # First-time teacher: exactly the requested paired actions, no old helper sentence.
 page.evaluate('()=>{fixtureGroups=[];larData.grupper=null;state.larGrupp=null;larStartKlasser();}')
 page.wait_for_selector('.larvalkommen h2')
 assert page.locator('.larvalkommen h2').inner_text()=='Välkommen till din undervisning'
 assert page.locator('.larvalkommen .larstart-knappar button:visible').all_text_contents()==['Skapa min första grupp','Träna själv']
 assert 'Vill du prova uppgifterna själv?' not in page.locator('body').inner_text()
 for theme in ['dark','light']:
  page.evaluate('(v)=>document.documentElement.dataset.theme=v',theme)
  for width in [1440,390,320]:
   page.set_viewport_size({'width':width,'height':1000});page.wait_for_timeout(450)
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('welcome',theme,width)
   if width in [1440,390]:page.screenshot(path=f'/tmp/kg-welcome-{theme}-{width}.png',full_page=True)
 page.locator('.larvalkommen').get_by_role('button',name='Träna själv',exact=True).click();page.wait_for_selector('.course-grid')
 page.get_by_role('button',name='Min undervisning',exact=True).click();page.get_by_role('button',name='Skapa min första grupp',exact=True).click()
 page.locator('#lar-nyklass').fill('Fysik TE26');page.locator('#lar-nykurs').select_option('fy1');page.locator('#lar-skapa-klass').click();page.wait_for_selector('.largrupp-topp')
 assert page.evaluate('larGrupp().kurs')=='fy1'
 assert page.locator('#largruppkropp .larkort').count()==0
 for width in [1440,390,320]:
  page.set_viewport_size({'width':width,'height':1000});page.wait_for_timeout(450)
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('group',width)
  if width in [1440,390]:page.screenshot(path=f'/tmp/kg-group-{width}.png',full_page=True)
 # Compatibility: older SQL offers name-only creation, never pretends to save a course.
 page.evaluate('()=>{const base=klassRpc;klassRpc=async(n,a)=>{const r=await base(n,a);if(n==="kg_lar_grupper")delete r.kursstod;return r;};larStartKlasser();}')
 page.wait_for_selector('#lar-nygrupp-form',state='attached');assert page.locator('#lar-nykurs').count()==0
 # Student passes are unique even with overlapping groups; empty start is immediate course selection.
 page.evaluate('''()=>{
  session={access_token:'local-student',user:{id:'student'}};arLarare=false;arGruppLarare=false;arAdmin=false;
  fixtureAssigned=[{id:91,titel:'Laddning',kurs:'fy1',antal:30,klara:4},{id:91,titel:'Laddning',kurs:'fy1',antal:30,klara:4},{id:92,titel:'Algebra',kurs:'ma2',antal:30}];
  state.course=null;provLista=null;renderHome();
 }''')
 page.wait_for_selector('.provkort');assert page.locator('.provkort').count()==2
 assert page.locator('.larlagen').count()==0
 assert page.get_by_role('heading',name='Dina träningspass').count()==1
 assert page.get_by_role('heading',name='Träna på egen hand').count()==1
 for width in [1440,390,320]:
  page.set_viewport_size({'width':width,'height':1000});page.wait_for_timeout(450)
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),('student',width)
  if width in [1440,390]:page.screenshot(path=f'/tmp/kg-student-{width}.png',full_page=True)
 page.evaluate('()=>{fixtureAssigned=[];provLista=null;renderHome();}');page.wait_for_selector('.course-grid')
 page.wait_for_function('Array.isArray(provLista)&&provLista.length===0')
 assert page.locator('.provkort').count()==0
 assert page.locator('#egen-traning-rubrik').is_hidden()
 assert page.get_by_role('button',name='Har du fått en kod av din lärare?').count()==1
 page.locator('#course-fy1').click();page.wait_for_function('state.view==="dashboard"&&state.course==="fy1"')
 # Late requests must not populate a different user's cards.
 page.evaluate('''()=>{
  const base=klassRpc;klassRpc=(n,a)=>n==='kg_prov_for_mig'?new Promise(resolve=>window.releasePasses=resolve):base(n,a);
  provLista=null;window.pendingPasses=provHamtaMina();session={user:{id:'another-student'}};
  releasePasses([{id:123,titel:'Old user pass'}]);
 }''')
 page.evaluate('pendingPasses');assert page.evaluate('provLista') is None
 page.evaluate('()=>{session=null;renderHome();}');assert page.locator('.larlagen').count()==0
 assert not errors,errors
 assert page.evaluate("!fixtureCalls.some(x=>['kg_admin_anvandare','kg_admin_oversikt'].includes(x[0]))")
 print('PASS: real teacher/practice navigation and browser history; group course/defaults/save error; scoped passes/results; first visit; 12 responsive layouts; legacy SQL; unique student passes; empty student start; stale-account response')
 b.close()
