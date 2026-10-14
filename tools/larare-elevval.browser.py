"""Teacher home, class creation, roster/moves and class statistics. Local fixtures only."""
import json
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page(viewport={'width':1280,'height':1000});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)));page.route('https://*.supabase.co/**',lambda r:r.abort());page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,body=''))
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
 page.goto('http://127.0.0.1:8083/index.html');page.wait_for_function('typeof larStartKnappar==="function"')
 page.evaluate('''()=>{
  window.fixtureCalls=[];window.fixtureFailure=false;
  window.fixtureGroups=[{id:11,namn:'NA26 <klass>',kod:'ABC234',elever:1,aktiva:1,larare:['Lärare Test'],synlig:true},{id:12,namn:'Källklass',kod:'DEF234',elever:2,aktiva:1,larare:['Lärare Test']}];
  window.fixtureStudents=[{id:'a',namn:'Åsa <script>test</script>',medlem:false,grupper:[{id:12,namn:'Källklass'}]},{id:'b',namn:'Bo Test',medlem:false,grupper:[]},{id:'c',namn:'Cia Test',medlem:true,grupper:[{id:11,namn:'NA26'}]}];
  klassRpc=async(name,args={})=>{fixtureCalls.push([name,args]);
   if(name==='kg_lar_grupper')return {ok:true,grupper:fixtureGroups};
   if(name==='kg_lar_grupp_skapa'){const g={id:30,namn:args.p_namn,kod:'GHI234',elever:0,aktiva:0,larare:['Lärare Test']};fixtureGroups.push(g);return{ok:true,...g};}
   if(name==='kg_lar_elevlista')return{ok:true,elever:fixtureStudents};
   if(name==='kg_lar_elever_lagg_till')return fixtureFailure?{ok:false,code:'kallklass'}:{ok:true,tillagda:args.p_elever.length};
   if(name==='kg_lar_elever')return{ok:true,elever:[{id:'c',namn:'Cia Test',vecka:12,vecka_ratt:10,senaste:12,senaste_ratt:10,uppgifter:42}]};
   if(name==='kg_lar_grupp_omraden')return{ok:true,omraden:{test:{m:0.65,elever:1,forsok:12,ratt:10}}};
   return{ok:true};};
  hamtaGlobalStatistik=async()=>({anvandare:280,uppgifter:23064});
  provKursData=async()=>({bank:[],kapitel:[{kap:'1',omraden:['test']}],namn:{test:'Testområde'},spar:null});
  provSkapaLaddaKurs=async()=>{provSkapa.kd={bank:[],kapitel:[],namn:{}};};
  session={access_token:'local-test',user:{id:'teacher',email:'teacher@example.test'}};
  larProfil={namn:'Lärare Test',skola:{id:10,namn:'Testskolan'}};arLarare=false;arGruppLarare=true;renderHome();
 }''')
 for theme in ['dark','light']:
  page.evaluate('(theme)=>document.documentElement.dataset.theme=theme',theme)
  for width in [1280,900,600,390,320]:
   page.set_viewport_size({'width':width,'height':1000});page.evaluate('renderHome()')
   assert page.get_by_role('button',name='Mina klasser',exact=True).count()==1
   assert page.get_by_role('button',name='Skapa träningspass till eleverna',exact=True).count()==1
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),(theme,width)
   page.wait_for_timeout(500)
   assert page.evaluate("()=>{const card=document.querySelector('.larstart').getBoundingClientRect(),stats=document.getElementById('kg-globalstats').getBoundingClientRect();return card.bottom<stats.top;}")
   if width in [1280,390]:page.screenshot(path=f'/tmp/larstart-{theme}-{width}.png')
 # Direct create-pass action opens existing creation form, not merely the pass list.
 page.get_by_role('button',name='Skapa träningspass till eleverna',exact=True).click();page.wait_for_selector('#prov-titel');assert page.evaluate('state.larFlik')=='pass'
 page.evaluate('renderHome()');page.get_by_role('button',name='Mina klasser',exact=True).click();page.wait_for_selector('#lar-nyklass');assert page.locator('.larkort').count()==2
 page.locator('#lar-nyklass').fill('Ny klass');page.get_by_role('button',name='Skapa klass',exact=True).click();page.wait_for_selector('.largrupp-topp h2');assert page.locator('.largrupp-topp h2').inner_text()=='Ny klass'
 page.get_by_role('button',name='← Mina klasser',exact=True).click();page.locator('.larkort').filter(has_text='NA26').click();page.wait_for_selector('.larstat');assert '12' in page.locator('.larstat').inner_text()
 page.get_by_role('button',name='Klassens statistik per område',exact=True).click();page.wait_for_selector('#laromr');page.wait_for_function("document.getElementById('laromr').textContent.includes('Testområde')")
 page.get_by_role('button',name='Lägg till / flytta elever',exact=True).click();page.wait_for_selector('.larelevval');assert page.locator('.larelevval script').count()==0
 assert page.locator('.larelevval input:disabled').count()==1
 page.locator('.larelevval input[value=a]').check();page.get_by_role('searchbox',name='Sök elev').fill('Bo');assert page.locator('.larelevval label:visible').count()==1
 page.locator('.larelevval input[value=b]').check();assert page.locator('#larelevval-status').inner_text()=='2 elever valda'
 page.get_by_role('searchbox',name='Sök elev').fill('');assert page.locator('.larelevval input[value=a]').is_checked()
 # Error retains selection, then add preserves other groups by default.
 page.locator('#lar-flytta-fran').select_option('12');page.evaluate('fixtureFailure=true');page.locator('#lar-elevval-spara').click();page.wait_for_function("document.getElementById('larelevval-status').textContent.includes('Dina val är kvar')");assert page.locator('.larelevval input[value=a]').is_checked()
 page.evaluate('fixtureFailure=false');page.locator('#lar-flytta-fran').select_option('');page.locator('#lar-elevval-spara').click();page.wait_for_selector('.larstat')
 assert page.evaluate("fixtureCalls.filter(x=>x[0]==='kg_lar_elever_lagg_till').at(-1)[1]")=={'p_grupp':11,'p_elever':['a','b'],'p_fran':None}
 # Explicit move sends only the selected source, and single checkbox works by keyboard.
 page.get_by_role('button',name='Lägg till / flytta elever',exact=True).click();page.wait_for_selector('.larelevval');page.locator('.larelevval input[value=a]').focus();page.keyboard.press('Space');page.locator('#lar-flytta-fran').select_option('12');page.locator('#lar-elevval-spara').click();page.wait_for_selector('.larstat')
 assert page.evaluate("fixtureCalls.filter(x=>x[0]==='kg_lar_elever_lagg_till').at(-1)[1]")=={'p_grupp':11,'p_elever':['a'],'p_fran':12}
 for width in [1280,390,320]:
  page.set_viewport_size({'width':width,'height':1000});page.get_by_role('button',name='Lägg till / flytta elever',exact=True).click();page.wait_for_selector('.larelevval')
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1'),width
  if width!=320:page.screenshot(path=f'/tmp/larelevval-{width}.png')
 # Student/anonymous gates and late role detection on home.
 page.evaluate('()=>{arGruppLarare=false;arLarare=false;renderHome();}');assert page.locator('.larstart').count()==0
 page.evaluate('()=>{arGruppLarare=true;uppdateraLararKnapp();}');assert page.locator('.larstart').count()==1
 page.evaluate('()=>{session=null;renderHome();}');assert page.locator('.larstart').count()==0
 assert page.evaluate("!fixtureCalls.some(x=>['kg_admin_anvandare','kg_admin_oversikt'].includes(x[0]))")
 assert not errors,errors;print('PASS: teacher/student/anonymous, 10 home layouts, class creation, statistics, selection/filter, retry, add/move, keyboard and 3 roster layouts');b.close()
