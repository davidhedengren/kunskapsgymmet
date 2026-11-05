'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),ctx);const get=id=>ctx.window.BANKMA2.find(q=>q.id===id);
function mean(a){return a.reduce((x,y)=>x+y,0)/a.length}function sx(a){let m=mean(a);return Math.sqrt(a.reduce((sum,x)=>sum+(x-m)**2,0)/(a.length-1))}
test('Värden och Sx för ändrade datamaterial stämmer oberoende av facit',()=>{
 for(const [data,m,s] of [[[12,16,18,21,23],18,4.3011626],[[12,16,18,21,23,18],18,3.8470768],[[2,5,8,11],6.5,3.8729833],[[-2,-11,-20,-29],-15.5,11.6189500],[[7,9,10,10,14],10,2.5495098],[[7,9,10,10,14,10],10,2.2803509],[[4,6,6,9,10],7,2.4494897],[[4,6,6,9,10,6,8],7,2.081666],[[...Array(5).fill(120),...Array(10).fill(150),...Array(5).fill(210)],157.5,33.5410197]]){assert.ok(Math.abs(mean(data)-m)<1e-7);assert.ok(Math.abs(sx(data)-s)<1e-7)}
});
test('Facit visar GeoGebra och delkort har egen förklaring utan svar i tidigare del',()=>{
 for(const id of ['4.46','4.97','4.157','4.371','4.373']){const q=get(id);assert.equal(q.geogebra,true,id);assert.equal(q.miniräknare,true,id);assert.match(q.s,/Envariabelanalys/,id)}
 for(const id of ['4.371','4.373'])for(const d of get(id).spelDelar){assert.equal(d.geogebra,true,id);assert.equal(d.miniräknare,true,id);assert.ok(d.s.length>100,id)}
 assert.doesNotMatch(get('4.371').spelDelar[0].s,/2,0817|Mindre/);assert.doesNotMatch(get('4.373').spelDelar[0].s,/Medianen|Typvärdet/);
 assert.match(get('4.97').s,/avrunda för tidigt/);assert.doesNotMatch(get('4.97').s,/3\\cdot3\{,\}87\\approx11\{,\}62/);
});
