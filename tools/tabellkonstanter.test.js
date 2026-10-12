'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const c=vm.createContext({calls:[],delSvarDjup:0,delSvarRattBas:(input,answer,unit,tol)=>{
 c.calls.push({input,answer,unit,tol});const m=String(input).match(/^(-?\d+(?:\.\d+)?)\s*(.*)$/);return !!m&&(!m[2]||m[2]===unit)&&Math.abs(+m[1]-answer)<=(tol||0);
}});
for(const name of ['metadataForDel','expandGameTask','faltVarde','faltFlagga','svarsPlan','delSvarRatt']){
 const i=html.indexOf(`function ${name}(`);assert.ok(i>=0);vm.runInContext(html.slice(i,html.indexOf('\n}',i)+2),c);
}
const plain=v=>JSON.parse(JSON.stringify(v));
test('Tabellvärden hör till rätt fält och använder samma enhet och tolerans',()=>{
 const q={svarTabell:{1:[10.42259310815424]}};
 assert.equal(c.delSvarRatt('10.42 kN',10.43,'kN',.005,q,1,'numeriskt'),true);
 assert.equal(c.delSvarRatt('10.42',10.43,'kN',.005,q,1,'numeriskt'),true);
 assert.equal(c.delSvarRatt('10.42 kg',10.43,'kN',.005,q,1,'numeriskt'),false);
 assert.equal(c.delSvarRatt('10.42',10.43,'kN',.005,q,0,'numeriskt'),false);
 assert.equal(c.delSvarRatt('10.40',10.43,'kN',.005,q,1,'numeriskt'),false);
 assert.equal(c.delSvarRatt('0',10.43,'kN',.005,q,1,'numeriskt'),false);
 assert.ok(c.calls.filter(x=>x.answer===10.42259310815424).every(x=>x.unit==='kN'&&x.tol===.005));
});
test('Heluppgift och delkort behåller rätt tabellvariant utan att blanda fälten',()=>{
 const q={id:'x',rättSvar:[6771,10.43,11.78],svarTabell:{1:[10.42259310815424],2:[11.772432281428653]},
   svarEtiketter:['a','b','c'],självrättning:true,spelDelning:'deluppgifter',spelDelar:[{etikett:'a',t:'A'},{etikett:'b',t:'B'},{etikett:'c',t:'C'}]};
 const parts=c.expandGameTask(q);assert.equal(parts[0].svarTabell,undefined);
 assert.deepEqual(plain(parts[1].svarTabell),{0:[10.42259310815424]});
 assert.deepEqual(plain(parts[2].svarTabell),{0:[11.772432281428653]});
 assert.deepEqual(plain(c.svarsPlan(q).delar[1].svarTabell),plain(parts[1].svarTabell));
 assert.deepEqual(plain(c.svarsPlan(parts[2]).delar[0].svarTabell),plain(parts[2].svarTabell));
 const override={...q,spelDelar:[{etikett:'a',t:'A'},{etikett:'b',t:'B',rättSvar:9},{etikett:'c',t:'C'}]};
 assert.equal(c.expandGameTask(override)[1].svarTabell,undefined);
 override.spelDelar[1].svarTabell={0:[9.1]};assert.deepEqual(plain(c.expandGameTask(override)[1].svarTabell),{0:[9.1]});
});
