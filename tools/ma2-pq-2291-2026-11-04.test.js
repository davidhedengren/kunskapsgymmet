const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const c={window:{}};vm.runInNewContext(fs.readFileSync('uppgifterma2.js','utf8'),c);const q=id=>c.window.BANKMA2.find(q=>q.id===id);
test('2.291 visar pq-metoden med rätt tecken och tolkar båda rötterna',()=>{
 const t=q('2.291');assert.match(t.s,/Pq-formeln/);assert.match(t.s,/p=-17/);assert.match(t.s,/q=60/);assert.match(t.s,/12\{,\}25/);assert.match(t.s,/facit-rubrik/);assert.doesNotMatch(t.s,/Faktorisera/);
 const p=-17,v=60,roots=[-p/2-Math.sqrt((p/2)**2-v),-p/2+Math.sqrt((p/2)**2-v)];assert.deepEqual(Array.from(t.rättSvar),roots);assert.equal(roots[0]+roots[1],17);assert.equal(roots[0]*roots[1],60);
 assert.equal(t.svarsstruktur,'mängd');assert.equal(t.miniräknare,true);assert.equal(t.geogebra,false);
});
test('Fem liknande uppgifters numeriska villkor bevaras',()=>{
 for(const[id,pair]of [['2.288',[11,12]],['2.501',[5,13]],['2.502',[3,10]],['2.1075',[-9,9]],['2.1076',[5,-8]]])assert.deepEqual(Array.from(q(id).rättSvar),pair);
 assert.equal(11*12,132);assert.equal(5+13,18);assert.equal(5*13,65);assert.equal(3+10,13);assert.equal(3*10,30);for(const x of [-9,9])assert.equal(x*x,81);for(const x of [5,-8])assert.equal(x*(x+3),40);
});
