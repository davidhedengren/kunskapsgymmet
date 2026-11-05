'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(x=>x.id===id);
const ids=['4.05','4.10','4.14','4.28','4.348','4.450','4.452','4.453','4.457','4.459','6.09'];
test('Statistikfacit visar GeoGebras svenska arbetsgång och skillnaden mellan s och Sx',()=>{
 for(const id of ids){const x=q(id);assert.equal(x.geogebra,true,id);assert.equal(x.miniräknare,true,id);assert.match(x.s,/Envariabelanalys/,id);assert.match(x.s,/Σx/,id);assert.match(x.s,/(?:raden s|Raden s|s, som motsvarar Sx)/,id);}
 for(const [id,index] of [['4.05',1],['4.28',1],['4.348',0],['4.348',1]]){const d=q(id).spelDelar[index];assert.match(d.s,/Envariabelanalys/);assert.match(d.s,/raden s/i);}
 assert.doesNotMatch(q('4.05').spelDelar[0].s,/1,29|2,58/);assert.doesNotMatch(q('4.28').spelDelar[0].s,/3,8|3,795/);
});
test('Skärmbilderna finns och hör till respektive data',()=>{
 for(const [id,n] of [['4.450','4-6-8'],['6.09','4-6-6-8']]){const path=`bilder/geogebra-statistik-${n}-2026-11-05.png`;assert.ok(fs.statSync(path).size>1000,path);assert.ok(q(id).s.includes(path));}
});
test('Sx beräknas med n−1 och jämförs mot de bevarade nycklarna',()=>{
 const sx=v=>{const m=v.reduce((s,x)=>s+x,0)/v.length;return Math.sqrt(v.reduce((s,x)=>s+(x-m)**2,0)/(v.length-1));};
 const items=[['4.450',[4,6,8],2],['4.452',[6.2,8.5,7.1,9.8,5.4,10.3,7.7],1.80449175],['4.453',[38,38,38,39,39,39,39,40,40,40,40,40,41,41,42],1.183215957],['4.457',[5,9,13],4],['4.459',[62,57,65,61,59,63,60,64],2.669269563],['6.09',[4,6,6,8],1.632993161855452]];
 for(const [id,values,expected] of items)assert.ok(Math.abs(sx(values)-expected)<1e-8,id);
 const vals=[6,8,9,10,11,24],all=vals.map((_,i)=>sx(vals.filter((v,j)=>i!==j)));assert.equal(all.indexOf(Math.min(...all)),5);
});
