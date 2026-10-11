"""Kontrollerar riktiga fysikkort, svar och alternativ utan att skriva resultat."""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1280,'height':1000});errors=[]
    page.add_init_script("localStorage.setItem('kunskapsgymmet-beta-info','2')")
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.route('https://*.supabase.co/**',lambda r:r.abort())
    page.route('https://fonts.googleapis.com/**',lambda r:r.fulfill(status=200,content_type='text/css',body=''))
    page.goto('http://127.0.0.1:8082/index.html?kurs=fy1')
    page.wait_for_function('typeof expandGameTask==="function"')
    checks=page.evaluate(r'''async()=>{
      await selectCourse('fy1'); finishAttempt=r=>{window.reviewResult=r;state.answered=true;};
      const out=[];
      for(const [id,values] of [['3.311',[1.5,50,45]],['3.131',[80,96,23.6,87.3]],
        ['3.173',[6.3]],['3.184',[0,0.6]],['3.300',[3,4,5]],['3.310',[82]],['3.313',[-70,240,240]]]){
        const task=window.BANK.find(t=>t.id===id),cards=expandGameTask(task);
        cards.forEach((q,i)=>{
          for(const [input,want] of [[String(values[i]),true],[String(values[i]+10),false]]){
            state.currentTask=q;state.answered=false;state.solutionShown=false;state.partIndex=0;state.partResults=[];
            window.reviewResult=null;renderTraining();document.getElementById('ans-0').value=input;checkAnswer();
            out.push({id,i,input,want,actual:window.reviewResult?.every(Boolean)});
          }
        });
      }
      return out;
    }''')
    assert all(x['want']==x['actual'] for x in checks),checks
    views=[]
    for width in [390,1280]:
        page.set_viewport_size({'width':width,'height':1000})
        for i in range(3):
            page.evaluate('''i=>{state.currentTask=expandGameTask(window.BANK.find(t=>t.id==='3.311'))[i];
              state.answered=false;state.solutionShown=false;renderTraining();}''',i)
            assert page.locator('.tbody svg').count()==1
            assert page.locator('.tbody svg [data-vektor]').count()==3
            assert 'överfarten' not in page.locator('.tbody').inner_text()
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
            if i==2:
                assert '50 s' in page.locator('.tbody').inner_text()
                assert '60 m' not in page.locator('.tbody').inner_text()
            page.locator('.tbody').screenshot(path=f'/tmp/simmare-1131-{width}-{i}.png')
            page.evaluate('showSolution()');assert page.locator('.katex-error').count()==0
            views.append({'width':width,'del':i,'svg':True})
    # Blanda alternativen som i spelet; lokalisera med text, inte listans ordning.
    page.evaluate('''()=>{state.currentTask=window.BANK.find(t=>t.id==='8.503');
      state.altOrdningId=null;state.altValda=new Set();state.answered=false;state.solutionShown=false;
      window.reviewResult=null;renderTraining();}''')
    assert page.locator('.alt').count()==5
    page.get_by_role('button',name='De rör sig inte eftersom de sitter fast i metallkulan.').click()
    page.locator('#altknapp').click();assert page.evaluate('window.reviewResult.every(Boolean)') is False
    assert 'kan röra sig genom metallen' in page.locator('.alt.fel .kommentar').inner_text()
    page.evaluate('''()=>{state.altValda=new Set();state.answered=false;state.solutionShown=false;
      window.reviewResult=null;renderTraining();}''')
    page.get_by_role('button',name='De flyttar sig mot sidan längst från staven.').click()
    page.locator('#altknapp').click();assert page.evaluate('window.reviewResult.every(Boolean)') is True
    page.evaluate('showSolution()');assert not errors,errors
    print(json.dumps({'answerChecks':len(checks),'swimmerViews':len(views),'fifthOptionRejected':True,
      'correctOptionAccepted':True,'javascriptErrors':errors}))
    browser.close()
