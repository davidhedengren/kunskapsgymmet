'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
function load(c,names){
 for(const name of names){
  const m=new RegExp('(?:async )?function '+name+'\\(').exec(html);
  assert.ok(m,name);vm.runInContext(html.slice(m.index,html.indexOf('\n}',m.index)+2),c);
 }
}
function setup(){
 const host={innerHTML:''},calls=[],messages=[],stored=new Map();
 const button={disabled:false,closest:()=>({querySelector:()=>({textContent:'Elev <Exempel>'})})};
 const c=vm.createContext({
  session:{user:{id:'admin'}},arAdmin:true,arLarare:false,arGruppLarare:true,arElevRoll:false,
  larProfil:{namn:'Elev Exempel'},larProfilHamtad:false,
  larData:{grupper:[{id:1}],elever:{test:1}},state:{view:'larare'},profile:{nyheter:{rollval:'larare'},xp:500},
  kgAdminFlik:'larare',kgAdminKlassData:{classes:[]},GRUPPLARARE_KEY:'group',LARARE_KEY:'teacher',
  esc:x=>String(x).replaceAll('<','&lt;').replaceAll('>','&gt;'),
  MOLN_PA:()=>true,document:{getElementById:id=>id==='adminlista'?host:null},
  localStorage:{setItem:(k,v)=>stored.set(k,v),removeItem:k=>stored.delete(k)},
  larBekrafta:async(...args)=>{calls.push(['confirm',...args]);return true;},
  klassRpc:async(name,params)=>{calls.push(['rpc',name,params]);return {ok:true};},
  kgAdminRitaLarare:async h=>{calls.push(['refresh',h]);},
  toast:t=>messages.push(t),uppdateraLararKnapp:()=>calls.push(['teacher-button']),
  markeraRollval:role=>{c.profile.nyheter.rollval=role;},goHome:()=>{c.state.view='home';}
 });
 load(c,['kgAdminLarareTillElev','hamtaLarprofil']);
 return {c,host,calls,messages,stored,button};
}
test('Admin flyttar ett konto, uppdaterar lärarlistan och behåller resultat',async()=>{
 const {c,calls,messages,button}=setup();await c.kgAdminLarareTillElev('student',button);
 assert.equal(calls[0][0],'confirm');assert.match(calls[0][2],/Elev &lt;Exempel&gt;/);
 assert.deepEqual(JSON.parse(JSON.stringify(calls[1])),['rpc','kg_admin_larare_till_elev',{p_user:'student'}]);
 assert.equal(calls[2][0],'refresh');assert.match(messages[0],/elevkonto/);
 assert.equal(c.profile.xp,500);assert.equal(button.disabled,false);assert.equal(c.kgAdminKlassData,null);
});
test('Avbrutet rollbyte och användare utan adminbehörighet gör inga anrop',async()=>{
 const {c,calls,button}=setup();c.larBekrafta=async()=>false;await c.kgAdminLarareTillElev('student',button);
 assert.equal(calls.length,0);assert.equal(button.disabled,false);
 c.arAdmin=false;c.larBekrafta=()=>{throw Error('Ska inte visas');};
 await c.kgAdminLarareTillElev('student',button);assert.equal(calls.length,0);
});
test('Rollbyte blockerar dubbelklick även medan bekräftelsen visas',async()=>{
 const {c,calls,button}=setup();let done;
 c.larBekrafta=()=>new Promise(resolve=>{done=resolve;});
 const first=c.kgAdminLarareTillElev('student',button);
 await c.kgAdminLarareTillElev('student',button);assert.equal(button.disabled,true);
 done(true);await first;assert.equal(calls.filter(x=>x[0]==='rpc').length,1);assert.equal(button.disabled,false);
});
test('Saknad migration eller avvisat rollbyte visas utan falskt framgångsbesked',async()=>{
 for(const result of [{saknas:true},{ok:false,code:'godkand_larare'},null]){
  const {c,calls,messages,button}=setup();c.klassRpc=async()=>result;await c.kgAdminLarareTillElev('student',button);
  assert.equal(messages.length,1);assert.doesNotMatch(messages[0],/nu ett elevkonto/);
  assert.equal(calls.filter(x=>x[0]==='refresh').length,0);assert.equal(button.disabled,false);
 }
});
test('Databasens elevroll tar bort cachad lärarvy utan att ändra träningsresultat',async()=>{
 const {c,stored}=setup();stored.set('group','1');stored.set('teacher','1');c.arLarare=true;
 c.klassRpc=async()=>({larare:false,elev:true,profil:null});
 await c.hamtaLarprofil();assert.equal(c.arElevRoll,true);assert.equal(c.arGruppLarare,false);assert.equal(c.arLarare,false);
 assert.equal(stored.size,0);assert.equal(c.larProfil,null);assert.equal(c.state.view,'home');
 assert.equal(c.profile.nyheter.rollval,'elev');assert.equal(c.profile.xp,500);assert.equal(c.larData.grupper,null);
});
test('Gammalt profilsvar får inte ändra ett nytt konto',async()=>{
 const {c}=setup();let done;c.klassRpc=()=>new Promise(resolve=>{done=resolve;});
 const pending=c.hamtaLarprofil();c.session={user:{id:'other'}};
 done({larare:false,elev:true,profil:null});await pending;
 assert.equal(c.arElevRoll,false);assert.equal(c.arGruppLarare,true);assert.equal(c.profile.nyheter.rollval,'larare');
});
test('Adminlistan erbjuder rollbyte för aktiva och avstängda felregistreringar',async()=>{
 const {c,host}=setup();load(c,['kgAdminRitaLarare']);
 c.klassRpc=async()=>({ok:true,larare:[
  {id:'student',namn:'Elev Exempel',aktiv:true},{id:'disabled',namn:'Elev Avstängd',aktiv:false},
  {id:'teacher',namn:'Godkänd Lärare',aktiv:true,godkand:true},{id:'admin',namn:'Admin Konto',aktiv:true}
 ]});
 await c.kgAdminRitaLarare(host);
 assert.equal((host.innerHTML.match(/>Gör till elev</g)||[]).length,2);
 assert.match(host.innerHTML,/Stäng av/);assert.match(host.innerHTML,/Aktivera/);
});
