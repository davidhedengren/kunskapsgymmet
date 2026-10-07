'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
function setup(){
  const badge={},attributes={},menu={};
  const c=vm.createContext({
    session:{user:{id:'admin',email:'admin@example.test'}},arAdmin:true,arLarare:true,
    felOppnaAntal:null,felAntalHamtar:false,MOLN_PA:()=>true,
    esc:x=>String(x).replaceAll('&','&amp;').replaceAll('"','&quot;'),
    hamtaFelloggen:async()=>[{},{}],
    document:{visibilityState:'visible',querySelectorAll:selector=>selector==='.konto'
      ?[{querySelector:()=>badge,setAttribute:(k,v)=>attributes[k]=v}]:[menu]}
  });
  for(const name of ['kontoFelNotisAntal','uppdateraFelNotis','uppdateraFelAntal','kontoKnapp','kgHeartbeat']){
    const m=new RegExp(`(?:async )?function ${name}\\(`).exec(html);
    vm.runInContext(html.slice(m.index,html.indexOf('\n}',m.index)+2),c);
  }
  return {c,badge,attributes,menu};
}
test('Hämtade öppna rapporter syns direkt på avatar och i öppen meny',async()=>{
  const {c,badge,attributes,menu}=setup();
  await c.uppdateraFelAntal();
  assert.equal(badge.hidden,false);
  assert.equal(badge.textContent,'2');
  assert.equal(attributes['aria-label'],'Konto – 2 öppna felrapporter');
  assert.equal(menu.textContent,'Felrapporter (2)');
  assert.match(c.kontoKnapp(),/class="konto-notis" aria-hidden="true">2/);
});
test('Noll öppna rapporter döljer den röda siffran',async()=>{
  const {c,badge,attributes}=setup();
  c.hamtaFelloggen=async()=>[];
  await c.uppdateraFelAntal();
  assert.equal(badge.hidden,true);
  assert.equal(attributes['aria-label'],'Konto');
});
test('Lärare utan adminbehörighet får ingen avatar-notis',async()=>{
  const {c,badge}=setup();
  c.arAdmin=false;
  await c.uppdateraFelAntal();
  assert.equal(c.felOppnaAntal,2);
  assert.equal(badge.hidden,true);
  assert.match(c.kontoKnapp(),/class="konto-notis" aria-hidden="true" hidden/);
});
test('Elev och utloggad användare hämtar inte felrapporter',async()=>{
  const {c}=setup();
  c.hamtaFelloggen=async()=>{throw new Error('Ska inte anropas');};
  c.arAdmin=c.arLarare=false;
  await c.uppdateraFelAntal();
  assert.equal(c.felOppnaAntal,null);
  c.session=null;c.arAdmin=true;
  await c.uppdateraFelAntal();
  assert.equal(c.kontoFelNotisAntal(),0);
});
test('Stora antal visas som 99+ och hela antalet läses av skärmläsare',()=>{
  const {c,badge,attributes}=setup();
  c.felOppnaAntal=123;
  c.uppdateraFelNotis();
  assert.equal(badge.textContent,'99+');
  assert.equal(attributes['aria-label'],'Konto – 123 öppna felrapporter');
});
test('Nätverksfel bevarar senast kända antal och tillåter nästa hämtning',async()=>{
  const {c}=setup();
  c.felOppnaAntal=3;
  c.hamtaFelloggen=async()=>{throw new Error('Offline');};
  await c.uppdateraFelAntal();
  assert.equal(c.felOppnaAntal,3);
  assert.equal(c.felAntalHamtar,false);
});
test('Svar från tidigare konto får inte användas efter kontobyte',async()=>{
  const {c}=setup();let done;
  c.hamtaFelloggen=()=>new Promise(ok=>{done=ok;});
  const pending=c.uppdateraFelAntal();
  c.session={user:{id:'other'}};
  done([{},{}]);await pending;
  assert.equal(c.felOppnaAntal,null);
});
test('Närvarotimern uppdaterar notisen endast för synlig adminsession',async()=>{
  const {c}=setup();let calls=0;
  c.uppdateraFelAntal=()=>calls++;c.giltigSession=async()=>false;
  await c.kgHeartbeat();
  assert.equal(calls,1);
  c.document.visibilityState='hidden';await c.kgHeartbeat();
  c.document.visibilityState='visible';c.arAdmin=false;await c.kgHeartbeat();
  assert.equal(calls,1);
});
