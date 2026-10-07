'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const c=vm.createContext({
  stadaSvar:x=>String(x).trim(),hogerled:x=>x,
  rentNumerisktSvar:(a,f)=>Number(a.replace(',','.'))===Number(f),
});
for(const marker of ['const ENHET_ALIAS=','function formatRatt(','function enhetMedOrd(','function delSvarRattBas(']){
  const start=html.indexOf(marker);
  assert.ok(start>=0);
  const end=marker.startsWith('const')?html.indexOf(';',start)+1:html.indexOf('\n}',start)+2;
  vm.runInContext(html.slice(start,end),c);
}
const grade=(input,value,unit)=>c.delSvarRattBas(input,value,unit,1e-10,{},0,'decimalform');
test('Decimalform accepterar båda litersymbolerna och utskrivet liter',()=>{
  for(const unit of ['l','L'])for(const symbol of ['l','L','liter'])
    assert.equal(grade('0,75 '+symbol,0.75,unit),true,unit+' / '+symbol);
  assert.equal(grade('750 mL',750,'ml'),true);
  assert.equal(grade('750 ml',750,'mL'),true);
});
test('Mikroprefix kan skrivas med µ, μ eller u',()=>{
  for(const unit of ['µm','μm','um'])for(const symbol of ['µm','μm','um'])
    assert.equal(grade('0,095 '+symbol,0.095,unit),true,unit+' / '+symbol);
});
test('Tidsenheter kan skrivas som ord utan att olika tidsenheter blandas',()=>{
  assert.equal(grade('4 timmar',4,'h'),true);
  assert.equal(grade('4 h',4,'tim'),true);
  assert.equal(grade('300 minuter',300,'min'),true);
  assert.equal(grade('14 dagar',14,'dygn'),true);
  assert.equal(grade('1 sekund',1,'s'),true);
  assert.equal(grade('4 minuter',4,'h'),false);
  assert.equal(grade('14 timmar',14,'dygn'),false);
});
test('En omvandling kräver rätt prefix och storhet även när talet är rätt',()=>{
  for(const input of ['0,75 ml','0,75 m','0,75 kg','0,75 kL','0,75e0 L'])
    assert.equal(grade(input,0.75,'L'),false,input);
  for(const input of ['0,095 nm','0,095 mm','0,095 µg'])
    assert.equal(grade(input,0.095,'µm'),false,input);
  for(const input of ['850 MW','850 mW'])
    assert.equal(grade(input,850,'kW'),false,input);
  assert.equal(grade('850 kW',850,'kW'),true);
  assert.equal(grade('850 kw',850,'kW'),true);
  assert.equal(grade('0,75 L',0.5,'L'),false);
});
