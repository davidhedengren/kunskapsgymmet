'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../uppdragsbok.js'),'utf8');
const dates=['2026-10-08','2026-10-09','2026-10-10','2026-10-11','2026-10-12','2026-10-13','2026-10-14'];
const row=(i)=>({text:'Klara fem uppgifter',typ:'alla',huvud:i===0,n:0,mal:5,klar:false});
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
function setup(){
  const today={lista:[0,1,2,3].map(row),klar:false};
  const c=vm.createContext({Date,Map,Set,profile:{xp:100,uppdragKlara:0,uppdragsVecka:{'2026-10-13':{kurser:{fy1:JSON.parse(JSON.stringify(today))}}}},
    state:{course:'fy1'},COURSES:{fy1:{name:'Fysik nivå 1'}},UPPDRAG_XP_PA:true,UPPDRAG_DAG_XP:100,
    uppdragNyckel:()=>dates.at(-1),uppdragVeckodagar:()=>dates,uppdragBokDatum:()=>c.datum,
    dagensUppdrag:()=>today,uppdragRetroTillatet:()=>true,uppdragXp:x=>x.huvud?100:50,esc:escape,uppdragIkon:()=>'<svg></svg>'});
  c.datum=dates.at(-1);c.today=today;vm.runInContext(source,c);return c;
}
test('Bokens datum, uppdrag och belöningar följer den valda kursen och dagen',()=>{
  const c=setup();let page=c.uppdragBokSidor();assert.equal(page.i,6);assert.match(page.html,/\+100 XP/);assert.match(page.html,/uppdragStarta\('2026-10-14',3\)/);
  c.datum=dates.at(-2);page=c.uppdragBokSidor();assert.equal(page.i,5);assert.match(page.html,/\+25 XP/);assert.match(page.html,/halva XP/);
  c.state.course='ma2';assert.match(c.uppdragBokSidor().html,/Inga uppdrag sparade/);
});
test('Att läsa historiken ändrar inte XP, framsteg eller uppdragens definitioner',()=>{
  const c=setup(),before=JSON.stringify({profile:c.profile,today:c.today});
  for(const date of dates){c.datum=date;c.uppdragBokSidor();}
  assert.equal(JSON.stringify({profile:c.profile,today:c.today}),before);
});
test('Slutförda uppdrag visas som klara och kan inte startas från boken',()=>{
  const c=setup();c.today.lista.forEach(x=>{x.klar=true;x.n=5;});c.today.klar=true;
  const page=c.uppdragBokSidor();assert.equal(page.status,'4 av 4 uppdrag klara');assert.match(page.html,/Alla uppdrag klara/);assert.match(page.html,/✓ Klart/);assert.doesNotMatch(page.html,/onclick="uppdragStarta/);
  assert.match(c.uppdragOmslag(c.today),/>4\/4<\/span>/);
  c.today.lista=c.today.lista.slice(0,2);assert.match(c.uppdragOmslag(c.today),/>2\/2<\/span>/);
});
test('Utan serverstöd går det att läsa äldre mål men startknapparna är spärrade',()=>{
  const c=setup();c.datum=dates.at(-2);c.uppdragRetroTillatet=()=>false;
  const page=c.uppdragBokSidor();assert.match(page.html,/Äldre uppdrag är inte aktiverade/);assert.equal((page.html.match(/ disabled/g)||[]).length,4);
});
test('Uppdragstext är HTML-säker och sparade on-uttryck används inte',()=>{
  const c=setup();c.today.lista[0].text='<img src=x onerror="alert(1)">';c.today.lista[0].on='evil()';
  const page=c.uppdragBokSidor();assert.doesNotMatch(page.html,/<img src=x|evil\(\)/);assert.match(page.html,/&lt;img src=x/);
});
test('Kursgränsen får ett läsbart uppslag och bokomslag, utan nya uppdrag',()=>{
  const c=setup();c.UPPDRAG_MAX_KURSER=3;c.dagensUppdrag=()=>({tak:true});
  assert.match(c.uppdragBokSidor().html,/redan uppdrag i 3 kurser/);
  assert.doesNotMatch(c.uppdragBokSidor().html,/onclick="uppdragStarta/);assert.match(c.uppdragOmslag({tak:true}),/aria-haspopup="dialog"/);
});
