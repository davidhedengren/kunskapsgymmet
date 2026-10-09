'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
function setup(extra={}){
 const c=vm.createContext({arAdmin:true,session:{},MOLN_PA:()=>true,SUPABASE_URL:'https://example.test',sbHeaders:()=>({}),fetch:async()=>({ok:true,json:async()=>[{kurs:'fy1',uppgift:'5.91',atgardad:true}]}),kgAdminRpc:async()=>[],felKompletteraGranskningssvar:async x=>x,felloggData:[{kurs:'fy1',uppgift:'5.91'}],sparaFelGranskning:()=>{},...extra});
 for(const name of ['kgAdminStatusText','felloggStatus','hamtaFelloggen','ignoreraFel']){
  const m=new RegExp(`(?:async )?function ${name}\\(`).exec(html);const end=html.indexOf('\n',m.index);const one=html.slice(m.index,end);
  vm.runInContext(one.endsWith('}')?one:html.slice(m.index,html.indexOf('\n}',m.index)+2),c);
 }return c;
}
test('Rättad, granskad utan fel och okänd äldre avslutning hålls isär',()=>{
 const c=setup();
 assert.equal(c.kgAdminStatusText(c.felloggStatus({atgardad:true,ignorerad:true})),'Granskad – inget fel');
 assert.equal(c.kgAdminStatusText(c.felloggStatus({atgardad:true,ignorerad:false})),'Åtgärdad');
 assert.equal(c.kgAdminStatusText(c.felloggStatus({atgardad:true})),'Avslutad');
 assert.equal(c.felloggStatus({atgardad:false}),'oppen');
});
test('Äldre loggar får explicit status från audit, men nya öppna rapporter förblir öppna',async()=>{
 const c=setup({kgAdminRpc:async()=>[{kurs:'fy1',uppgift:'5.91',status:'ignorerad'}]});
 assert.equal((await c.hamtaFelloggen(true))[0].status,'ignorerad');
 c.fetch=async()=>({ok:true,json:async()=>[{kurs:'fy1',uppgift:'5.91',atgardad:false}]});
 assert.equal(c.felloggStatus((await c.hamtaFelloggen(true))[0]),'oppen');
});
test('Motstridiga eller saknade auditdata visas inte som rättat eller utan fel',async()=>{
 const c=setup({kgAdminRpc:async()=>[{kurs:'fy1',uppgift:'5.91',status:'ignorerad'},{kurs:'fy1',uppgift:'5.91',status:'atgardad'}]});
 assert.equal(c.felloggStatus((await c.hamtaFelloggen(true))[0]),'avslutad');
 c.kgAdminRpc=async()=>{throw Error('offline')};
 assert.equal(c.felloggStatus((await c.hamtaFelloggen(true))[0]),'avslutad');
});
test('Statusknappen sparar direkt från samma rapportrad',()=>{
 const calls=[];const c=setup({sparaFelGranskning:(...args)=>calls.push(args)});
 c.ignoreraFel('fy1','5.91');assert.deepEqual(calls,[[0,'ignorerad']]);
});
