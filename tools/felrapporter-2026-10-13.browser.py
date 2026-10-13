"""Riktiga svarsfält och matematikbibliotek. Lokal granskning utan XP/DB-skrivningar."""
import json,urllib.request,sys
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 status,headers,body=cache[u];route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)
# Correct, alternate representations, and adjacent incorrect answers.
cases={
'matf1':[['1.15',0,['falskt'],[True]],['1.15',1,['sant'],[True]],['1.164',0,['36'],[True]],['1.164',0,['40'],[False]],['1.347',0,['59'],[True]],['1.347',0,['67'],[False]],['1.77',0,['5!'],[True]],['1.625',0,['6^4'],[True]],['1.727',0,['0.16'],[True]],['1.727',0,['15,5%'],[True]],['1.727',0,['0.15'],[False]],['1.548',0,['0.063'],[True]],['1.548',0,['0.062'],[False]],['1.548',0,['0.0625'],[True]],['1.548',0,['6.25%'],[True]],['1.548',0,['0.06'],[False]],['1.550',0,['0.313'],[True]],['1.550',0,['0.312'],[False]],['1.551',0,['0.938'],[True]],['1.551',0,['0.937'],[False]],['2.79',0,['2*2*2*3*3*5'],[True]],['2.79',0,['5·3²·2³'],[True]],['2.79',0,['360'],[False]],['2.79',0,['4*9*10'],[False]],['2.157',0,['2*2*3*3*3*7'],[True]],['2.209',0,['7*5*3*2*2*2'],[True]]],
'ma2':[['2.219',0,['lg8'],[True]],['2.219',0,['lg(8)'],[True]],['2.219',0,['lg9'],[False]],['2.217',0,['lg40'],[True]],['2.241',0,['lg9'],[True]],['2.26',0,['lg(x^2)'],[True]],['2.109',0,['lg(x^2)'],[True]],['2.250',0,['lg(2x^2)'],[True]],['1.54',0,['y=-2x+9'],[True]],['1.54',0,['y=-2x+1'],[False]],['1.347',0,['y=3x-1'],[True]],['1.347',0,['y=3x+9'],[False]],['2.57',0,['-3','2'],[True,True]],['2.57',0,['2','2'],[True,False]],['2.57',0,['x=2','x=-3'],[True,True]],['2.01',0,['-1.5','3.5'],[True,True]],['2.81',0,['-1','5'],[True,True]],['2.128',0,['-7','7'],[True,True]],['2.129',0,['-7','1'],[True,True]],['2.49',0,['4','-4'],[True,True]]],
'mato2':[['1.131',0,['5','53.1'],[True,True]],['1.131',1,['13','-67.4°'],[True,True]],['1.131',1,['-67.4','13'],[False,False]],['1.131',1,['13','67.4'],[True,False]],['1.81',0,['sqrt(2)','45°'],[True,True]],['1.81',0,['1.4142','45'],[False,True]],['1.81',1,['2','30'],[True,True]],['1.81',2,['2','-60'],[True,True]],['1.81',3,['5','53.1'],[True,True]],['1.59',1,['y=2'],[True]]],
'mato1':[['1.99',0,['4'],[True]],['1.518',0,['5'],[True]],['3.57',0,['3'],[True]],['3.799',0,['12'],[True]],['1.523',0,['3'],[True]],['3.812',0,['-6'],[True]],['4.495',0,['0°'],[True]]],
'ma1':[['7.490',0,['2.5 ton'],[True]],['7.163',0,['1051 kr'],[True]],['7.168',0,['4752 kr'],[True]],['7.163',0,['1051 kg'],[False]],['7.162',0,['14677.70 kr'],[True]],['7.162',0,['14677.69 kr'],[False]],['7.162',0,['14677.70 kg'],[False]],['7.165',0,['5230'],[True]],['7.167',0,['3820 kr'],[True]]]}
if '--course' in sys.argv:
 selected=sys.argv[sys.argv.index('--course')+1];cases={selected:cases[selected]}
else:selected='final'
keys={'matf1':'BANKMATF1','ma2':'BANKMA2','mato2':'BANKMATO2','mato1':'BANKMATO1','ma1':'BANKMA1'}
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=browser.new_page(viewport={'width':1280,'height':1100});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.goto('http://127.0.0.1:8083/index.html')
 page.evaluate('''()=>{finishAttempt=parts=>{state.answered=true;window.reviewOutcome=parts;};
 window.reviewTask=(q,index)=>{state.currentTask=q;state.answered=false;state.solutionShown=false;state.partResults=[];state.partIndex=index;state.altValda=new Set();window.reviewOutcome=null;renderTraining();};}''')
 checks=[];views=[]
 for course,rows in cases.items():
  page.evaluate('c=>selectCourse(c)',course);page.wait_for_function('key=>window[key]&&typeof nerdamer==="function"',arg=keys[course])
  for source in ['delkort','heluppgift']:
   for id,part,inputs,want in rows:
    result=page.evaluate('''([key,id,part,inputs,source])=>{
     const parent=window[key].find(q=>q.id===id),cards=expandGameTask(parent),split=source==='delkort'&&cards.length>1,q=split?cards[part]:parent;
     const offset=split?0:(nastlat(q.rättSvar)?svarsPlan(q).rutor.findIndex(r=>r.del===part):part);
     reviewTask(q,offset);const n=answerLayout(q).n;
     inputs.forEach((input,j)=>{const el=document.getElementById('ans-'+(offset+j));if(!el)throw Error('saknat fält '+id+' '+(offset+j));el.value=input;});
     checkAnswer();while(!state.answered&&state.partIndex>offset&&state.partIndex<offset+inputs.length)checkAnswer();
     const all=window.reviewOutcome||state.partResults;return{id,source,part,inputs,n,result:all.slice(offset,offset+inputs.length)};
    }''',[keys[course],id,part,inputs,source]);checks.append(dict(course=course,**result));assert result['result']==want,(course,result,want)
  # Rendering and independent-card checks for all changed tasks in this course.
  changed=json.loads((ROOT.parent/'Uppgiftslabbet/agent/FELRAPPORTER_2026-10-13.json').read_text())['changed']
  ids=[x['id'] for x in changed if x['course']==course]
  cardchecks=page.evaluate('''([key,ids])=>ids.flatMap(id=>expandGameTask(window[key].find(q=>q.id===id)).map(q=>{
   reviewTask(q,0);const expected=answerLayout(q).n,count=document.querySelectorAll('[id^="ans-"]').length;
   if(!arAlt(q)&&count!==expected)throw Error(id+' svarsfält '+count+'/'+expected);
   return{id,card:q.id,fields:count};
  }))''',[keys[course],ids]);views.extend(cardchecks)
  if course=='matf1':
   for width in [390,1280]:
    page.set_viewport_size({'width':width,'height':1100});page.evaluate('key=>{reviewTask(expandGameTask(window[key].find(q=>q.id==="1.164"))[0],0);showSolution();}',keys[course]);page.locator('.task').screenshot(path=f'/tmp/venn-1.164-{width}.png');assert page.locator('.task .katex-error').count()==0
  if course=='mato2':
   quick=page.evaluate('key=>{const q=expandGameTask(window[key].find(q=>q.id==="1.81"))[0];reviewTask(q,0);return visatSvar(q.rättSvar[0],q.tolerans[0],q.svarFormat[0]);}',keys[course])
   assert '\\sqrt{2}' in quick,quick
   for width in [390,1280]:
    page.set_viewport_size({'width':width,'height':1100})
    for id in ['1.59','1.131','1.149','1.81']:
     page.evaluate('([key,id])=>{reviewTask(expandGameTask(window[key].find(q=>q.id===id))[0],0);showSolution();}',[keys[course],id]);assert page.locator('.task .katex-error').count()==0,id;page.locator('.task').screenshot(path=f'/tmp/oct13-{id}-{width}.png')
 assert not errors,errors
 Path('/tmp/oct13-browser-'+selected+'.json').write_text(json.dumps({'checks':checks,'cardViews':views,'javascriptErrors':errors},ensure_ascii=False,indent=2));print('PASS',len(checks),'svarskombinationer',len(views),'delkort och helkort,',(2 if 'matf1' in cases else 0)+(8 if 'mato2' in cases else 0),'mobil-/datorbilder; inga JavaScript-fel');browser.close()
