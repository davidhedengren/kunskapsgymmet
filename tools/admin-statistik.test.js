'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const c=vm.createContext({Intl,Date,Set,kgAdminTal:n=>String(n),kgAdminMin:n=>Math.round(n)+' min'});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../admin-statistik.js'),'utf8'),c);
test('Kalenderdagar flyttas utan lokal tidszon eller sommartidsfel',()=>{
 for(const [a,n,b]of [['2026-03-29',-1,'2026-03-28'],['2026-10-25',1,'2026-10-26'],['2026-01-01',-1,'2025-12-31']])assert.equal(c.kgStatDatumOffset(a,n),b);
});
test('Skillnader hanterar noll och saknade värden utan falska procentsatser',()=>{
 assert.equal(c.kgStatDelta(12,10),'+2 (+20 %)');assert.equal(c.kgStatDelta(0,10),'−10 (−100 %)');
 assert.equal(c.kgStatDelta(3,0),'+3');assert.equal(c.kgStatDelta(0,0),'0');assert.equal(c.kgStatDelta(null,10),'Underlag saknas');
 assert.equal(c.kgStatDelta(12.5,10,'min'),'+2.5 min (+25 %)');
});
test('Aktiva konton dedupliceras medan aktiv tid divideras med aktiva kontodagar',()=>{
 const days=[{dag:'2026-10-09',uppgifter:10,nya:1,aktiva:2,aktiva_ids:['a','b'],aktiv_minuter:10},{dag:'2026-10-10',uppgifter:20,nya:2,aktiva:2,aktiva_ids:['a','c'],aktiv_minuter:30}];
 const p=c.kgStatPeriod(days,'2026-10-10',2);assert.equal(p.uppgifter,30);assert.equal(p.aktiva.size,3);assert.equal(p.nya,3);assert.equal(p.snitt,10);assert.equal(p.komplett,true);
 assert.equal(c.kgStatPeriod(days,'2026-10-10',3).komplett,false);
});
test('Anonyma uppgifter och inloggade uppgifter blandas inte ihop med konton',()=>{
 const days=c.kgStatNormalisera({global:{dagar:[{dag:'2026-10-10',uppgifter:50}]},dagar:[{dag:'2026-10-10',uppgifter:30,aktiva:3,aktiv_minuter:60},{dag:'2026-10-09',uppgifter:0,aktiva:0}]});
 assert.equal(days[0].alla_uppgifter,50);assert.equal(days[0].uppgifter,30);assert.equal(days[0].snitt_minuter,20);assert.equal(days[1].snitt_minuter,null);assert.equal(days[1].alla_uppgifter,null);
});
test('Analysfilen innehåller oberoende periodtal och inga personuppgifter',()=>{
 const dagar=Array.from({length:15},(_,i)=>({dag:c.kgStatDatumOffset('2026-10-11',i-14),uppgifter:i+1,ratt:i,nya:1,aktiva:2,aktiva_ids:['hemligt-id','andra-id'],aktiv_minuter:20}));
 const data={idag:'2026-10-11',forsta_aktivitet:'2026-09-01',dagar,global:{dagar:dagar.map(d=>({dag:d.dag,uppgifter:d.uppgifter+10})),epost:'ska-aldrig-exporteras'},kurser:[{kurs:'fy1',uppgifter:30,ratt:20,user_id:'person-id'}]};
 const out=c.kgStatAnalysData(data,[{online:true,namn:'HEMLIGT NAMN',epost:'privat@example.test',user_id:'hemligt-id'}],[{status:'oppen',text:'privat rapporttext'}],'2026-10-11','2026-10-10');
 assert.equal(out.sjudagarsjamforelse.senaste.uppgifter,77); // 8 + ... + 14.
 assert.equal(out.sjudagarsjamforelse.foregaende.uppgifter,28); // 1 + ... + 7.
 assert.equal(out.sjudagarsjamforelse.skillnad.uppgifter,49);
 assert.equal(out.sjudagarsjamforelse.senaste.unika_aktiva_konton,2);
 assert.equal(out.sjudagarsjamforelse.aterkommande_konton,2);
 assert.equal(out.vald_dagsjamforelse.skillnad_a_minus_b.uppgifter,1);
 assert.equal(out.dagsdata[0].alla_uppgifter,11);assert.equal(out.konton.registrerade,1);
 assert.equal(out.felrapporter.oppna_i_adminlistan,1);
 assert.doesNotMatch(JSON.stringify(out),/hemligt-id|andra-id|HEMLIGT NAMN|privat@example|person-id|privat rapporttext|ska-aldrig-exporteras/);
});
test('Analysfilen skiljer saknad historik från noll och väger tid rätt',()=>{
 const out=c.kgStatAnalysData({idag:'2026-10-11',dagar:[{dag:'2026-10-11',uppgifter:0,aktiva:0}]});
 assert.equal(out.dagsdata[0].uppgifter,0);assert.equal(out.dagsdata[0].alla_uppgifter,null);
 assert.equal(out.dagsdata[0].snitt_minuter,null);assert.equal(out.sjudagarsjamforelse.senaste.uppgifter,null);
 assert.equal(out.sjudagarsjamforelse.aterkommande_konton,null);assert.equal(out.vald_dagsjamforelse.b,null);
});
