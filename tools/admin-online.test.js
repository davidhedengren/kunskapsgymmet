'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
function setup(){
  const c=vm.createContext({session:{user:{id:'admin'}},arAdmin:true,Date,
    document:{visibilityState:'visible',getElementById:()=>null},clearTimeout,setTimeout,
    kgAdminRpc:async()=>[],esc:x=>String(x).replaceAll('<','&lt;').replaceAll('>','&gt;')});
  const start=html.indexOf('const kgOnline='),end=html.indexOf("document.addEventListener('click',ev=>",start);
  vm.runInContext(html.slice(start,end),c);
  return c;
}
const rows=()=>[
  {user_id:'one',namn:'Åsa',online:true,senast_sedd:new Date().toISOString(),kurs:'fy1'},
  {user_id:'one',namn:'Åsa',online:true,senast_sedd:new Date().toISOString(),kurs:'fy1'},
  {user_id:'two',epost:'anna@example.test',online:true},
  {user_id:'old',namn:'Gammal signal',online:true,senast_sedd:new Date(Date.now()-125000).toISOString()},
  {user_id:'offline',namn:'Offline',online:false}
];
const plain=x=>JSON.parse(JSON.stringify(x));
test('Räknaren omfattar unika aktuella konton och sorterar namn',async()=>{
  const c=setup();c.kgAdminRpc=async name=>{assert.equal(name,'kg_admin_anvandare');return rows();};
  await c.kgOnlineHamta();
  assert.deepEqual(plain(c.kgOnlineLista().map(u=>u.namn)),['anna@example.test','Åsa']);
  assert.match(c.kgOnlineKnapp(),/>2<\/button>/);
});
test('Elever, vanliga lärare, utloggade och dolda flikar läser ingen adminnärvaro',async()=>{
  const c=setup();c.kgAdminRpc=()=>{throw Error('Otillåtet anrop');};
  c.arAdmin=false;await c.kgOnlineHamta();assert.equal(c.kgOnlineKnapp(),'');
  c.arAdmin=true;c.session=null;await c.kgOnlineHamta();assert.equal(c.kgOnlineKnapp(),'');
  c.session={user:{id:'admin'}};c.document.visibilityState='hidden';await c.kgOnlineHamta();
});
test('Samtidiga hämtningar delar ett anrop',async()=>{
  const c=setup();let done,calls=0;c.kgAdminRpc=()=>{calls++;return new Promise(ok=>done=ok);};
  const a=c.kgOnlineHamta(),b=c.kgOnlineHamta();done(rows());await Promise.all([a,b]);assert.equal(calls,1);
});
test('Svar från föregående konto får inte visas efter kontobyte',async()=>{
  const c=setup();let done;c.kgAdminRpc=()=>new Promise(ok=>done=ok);
  const p=c.kgOnlineHamta();c.session={user:{id:'student'}};c.arAdmin=false;c.kgOnlineRensa();
  done(rows());await p;assert.equal(c.kgOnlineLista(),null);assert.equal(c.kgOnlineKnapp(),'');
  assert.equal(vm.runInContext('kgOnline.users',c),null);
});
test('Nätverksfel visas som okänt antal och lyckad ny hämtning återställer listan',async()=>{
  const c=setup();c.kgAdminRpc=async()=>rows();await c.kgOnlineHamta();
  c.kgAdminRpc=async()=>{throw Error('Offline');};await c.kgOnlineHamta();
  assert.equal(c.kgOnlineLista(),null);assert.match(c.kgOnlineKnapp(),/>–<\/button>/);
  c.kgAdminRpc=async()=>[];await c.kgOnlineHamta();assert.deepEqual(plain(c.kgOnlineLista()),[]);
  assert.match(c.kgOnlineKnapp(),/>0<\/button>/);
});
test('Äldre närvarolista får inte visas som aktuell',async()=>{
  const c=setup();c.kgAdminRpc=async()=>rows();await c.kgOnlineHamta();
  vm.runInContext('kgOnline.hamtad=Date.now()-121000',c);assert.equal(c.kgOnlineLista(),null);
});
