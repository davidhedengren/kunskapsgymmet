"""Teknisk helbankskontroll: aktivt kort, facitsvar, enheter, felsvar och KaTeX. Ersätter inte manuell fysikgranskning. Kör lokal app; inga konton eller databasskrivningar."""
import argparse,json,urllib.request,os
from pathlib import Path
from playwright.sync_api import sync_playwright
arg=argparse.ArgumentParser();arg.add_argument('course',choices=['fy1','fy2','mato2'],nargs='?',default='fy1');arg.add_argument('--port',type=int,default=8072);arg.add_argument('--pass-name',default='before');a=arg.parse_args();key={'fy1':'BANK','fy2':'BANK2','mato2':'BANKMATO2'}[a.course];cache={}
def cdn(route):
 u=route.request.url
 if u not in cache:
  with urllib.request.urlopen(u,timeout=30) as r:cache[u]=(r.status,dict(r.headers),r.read())
 status,headers,body=cache[u];route.fulfill(status=status,headers={k:v for k,v in headers.items() if k.lower() not in ['content-encoding','content-length','transfer-encoding']},body=body)
with sync_playwright() as p:
 env=os.environ.copy();env.update({'PATH':'/usr/bin:/bin','XDG_CONFIG_HOME':'/tmp/bank-round-browser-config','XDG_CACHE_HOME':'/tmp/bank-round-browser-cache'})
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'],env=env);page=browser.new_page();page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')");page.route('https://cdn.jsdelivr.net/**',cdn);page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''));page.route('https://*.supabase.co/**',lambda r:r.abort())
 page.goto('http://127.0.0.1:'+str(a.port)+'/index.html?kurs='+a.course);page.evaluate('c=>selectCourse(c)',a.course);page.wait_for_function('key=>window[key]&&typeof numericValue==="function"',arg=key)
 cards=page.evaluate('key=>{window.auditBankCards=window[key].filter(q=>q.spel!==false).flatMap(expandGameTask);return auditBankCards;}',key);Path('/tmp/'+a.course+'-'+a.pass_name+'-cards.json').write_text(json.dumps(cards,ensure_ascii=False,indent=2));result={'course':a.course,'pass':a.pass_name,'cards':len(cards),'checks':[],'rows':[],'matherrors':[],'formulas':0}
 for start in range(0,len(cards),20):
  batch=page.evaluate(r'''start=>{
   const rows=[],checks=[],matherrors=[];let formulas=0;
   for(const q of auditBankCards.slice(start,start+20)){
    for(const text of [q.t,q.s,q.ledtrad,...(q.alternativ||[]).map(a=>a.txt)]){
     const el=document.createElement('div');el.innerHTML=text||'';renderMathInElement(el,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,errorCallback:m=>matherrors.push({id:q.id,message:String(m)})});formulas+=el.querySelectorAll('.katex').length;
    }
    const info=expectedAnswersForTask(q),layout=answerLayout(q);rows.push({id:q.id,fields:layout.n,answers:info.answers,auto:info.auto,kv:kvFacit(q)});
    if(arAlt(q))continue;
    const ds=layout.plan?layout.plan.delar.flatMap(d=>d.auto?d.svar.map((f,j)=>({f,u:d.enhet[j],tol:d.tol[j],fmt:d.format[j],i:j})):[]):info.answers.flatMap((f,i)=>layout.delAuto[i]?[{f,i,u:metadataForDel(q.svarEnhet,i,info.answers.length),tol:metadataForDel(q.tolerans,i,info.answers.length),fmt:metadataForDel(q.svarFormat,i,info.answers.length)}]:[]);
    for(const d of ds){
     const test=(input,want,kind)=>{try{checks.push({id:q.id,input,want,actual:delSvarRatt(input,d.f,d.u,d.tol,q,d.i,d.fmt),kind});}catch(e){checks.push({id:q.id,input,want,error:String(e),kind});}};
     const raw=String(d.f),plain=typeof d.f==='string'?latexToPlain(d.f):raw;test(raw,true,'facit');
     if(plain!==raw&&d.fmt!=='intervall'&&!/[<>]/.test(raw))test(plain,true,'utan LaTeX');
     if(d.u)test(raw+' '+d.u,true,'med enhet');
     if(typeof d.f==='number'&&Number.isFinite(d.f))test(String(d.f+Math.max(1,Math.abs(d.f)*.5,Math.abs(d.tol||0)*2)),false,'fel tal');
     if(typeof d.f==='string'&&d.fmt==='uttryck'&&/[x]/.test(plain)&&!/[=<>]/.test(hogerled(plain))&&!/primitiv/i.test(q.t))test('('+hogerled(plain)+')+1',false,'fel uttryck');
    }
   }
   return {rows,checks,matherrors,formulas};
  }''',start)
  for k in ['rows','checks','matherrors']:result[k]+=batch[k]
  result['formulas']+=batch['formulas']
  if start%200==0:
   failures=[c for c in result['checks'] if c.get('actual')!=c['want']];print(a.course,start+len(batch['rows']),'/'+str(len(cards)),'failures',len(failures),'KaTeX',len(result['matherrors']),flush=True);Path('/tmp/'+a.course+'-'+a.pass_name+'-browser.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
 Path('/tmp/'+a.course+'-'+a.pass_name+'-browser.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print('DONE',a.course,len(cards),'checks',len(result['checks']),'failures',len([c for c in result['checks'] if c.get('actual')!=c['want']]),'KaTeX',len(result['matherrors']),flush=True);browser.close()

 if result['matherrors'] or any(c.get('actual')!=c['want'] for c in result['checks']):raise SystemExit(1)
