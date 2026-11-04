'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifter.js','utf8'),c);
const q=id=>c.window.BANK.find(q=>q.id===id),svg=t=>(t.match(/<svg[\s\S]*?<\/svg>/)||[])[0]||'';
test('Flygplansbildernas givna värden passar det enskilda kortet',()=>{
 const a=q('3.73'),b=q('3.93');
 for(const t of [a,b])for(const d of [t,...t.spelDelar]){
  assert.match(svg(d.t),/aircraft-side-profile/);
  assert.equal(d.miniräknare??t.miniräknare,true);
  assert.equal(d.geogebra??t.geogebra,false);
 }
 for(const i of [0,1]){assert.match(svg(a.spelDelar[i].t),/65 m\/s/);assert.doesNotMatch(svg(a.spelDelar[i].t),/800 m/)}
 assert.match(svg(a.spelDelar[2].t),/800 m/);assert.doesNotMatch(svg(a.spelDelar[2].t),/65 m\/s/);
 assert.match(svg(a.spelDelar[3].t),/800 m/);assert.doesNotMatch(svg(a.spelDelar[3].t),/2,5|2,641/);
 assert.match(svg(b.spelDelar[0].t),/1156 m/);assert.doesNotMatch(svg(b.spelDelar[0].t),/2,0 m\/s²/);
 assert.match(svg(b.spelDelar[1].t),/68 m\/s/);assert.doesNotMatch(svg(b.spelDelar[1].t),/1156 m/);
 assert.match(svg(b.spelDelar[2].t),/78 m\/s/);assert.doesNotMatch(svg(b.spelDelar[2].t),/68 m\/s|1156 m/);
});
test('Konstant acceleration anges och pilens fjäder är vänd i samtliga kopior',()=>{
 for(const id of ['3.88','3.93']){
  const t=q(id);for(const text of [t.t,t.spelIntro,...t.spelDelar.map(d=>d.t)])assert.match(text,/konstant acceleration/);
 }
 for(const text of [q('3.88').t,q('3.88').spelIntro,...q('3.88').spelDelar.map(d=>d.t)]){
  assert.doesNotMatch(text,/M163 140 L174 132/);
  assert.match(text,/M189 140 L178 132 L163 132 L171 140 L163 148 L178 148 Z/);
 }
});
test('Oberoende rörelseberäkningar ger fortsatt samma svar',()=>{
 const values={'3.73':[65/2.5,65**2/(2*2.5),Math.sqrt(2*2.5*800),65**2/(2*800)],'3.93':[68**2/(2*1156),68/2,78**2/4],'3.88':[55**2/1.2,55**2/1.2/9.82,1200/55]};
 for(const [id,x] of Object.entries(values))x.forEach((v,i)=>{
  const t=q(id),tol=Array.isArray(t.tolerans)?t.tolerans[i]:t.tolerans;
  assert.ok(Math.abs(t.rättSvar[i]-v)<=(tol||0)+1e-9,`${id} ${i}: ${v}`);
 });
});
