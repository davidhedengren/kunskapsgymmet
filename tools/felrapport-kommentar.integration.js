'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {PGlite}=require(process.argv[2]||'@electric-sql/pglite');
const root=path.join(__dirname,'..'),id=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
(async()=>{
 const db=new PGlite();let checks=0;
 const check=(a,b)=>{assert.deepEqual(a,b);checks++;};
 const rows=async(sql,params=[])=>(await db.query(sql,params)).rows;
 const uid=async n=>{await db.query("select set_config('request.jwt.claim.sub',$1,false)",[n?id(n):'']);};
 const rpc=async(name,p=[])=> (await rows('select public.'+name+'('+p.map((_,i)=>'$'+(i+1)).join(',')+') as result',p))[0].result;
 try{
  await db.exec(fs.readFileSync(path.join(__dirname,'fixtures/felrapport-kommentar.sql'),'utf8'));
  const migration=fs.readFileSync(path.join(root,'sql/2026-10-09-felrapport-kommentar.sql'),'utf8');await db.exec(migration);await db.exec(migration);
  for(const user of [3,4])await db.query('insert into kg_felrapport(kurs,uppgift,anvandare) values($1,$2,$3)',['fy1','6.338',id(user)]);
  await db.query('insert into kg_felrapport(kurs,uppgift,anvandare,atgardad,ignorerad) values($1,$2,$3,true,true)',['fy1','6.338',id(3)]);
  await db.query('insert into kg_felrapport(kurs,uppgift,anvandare) values($1,$2,$3)',['fy1','5.55',id(3)]);
  await db.query("insert into kg_felrapport(kurs,uppgift,enhet) values('fy1','6.338','anon-device')");
  const comment='Volymen är 6,23 liter. <b>Detta är vanlig text.</b>';
  for(const user of [null,3,5]){await uid(user);check((await rpc('kg_felrapport_granska',['fy1','6.338','ignorerad',comment])).code,'larare_kravs');check((await rpc('kg_felrapport_granskningssvar')).code,'larare_kravs');}
  await uid(1);
  check((await rows("select nullif(btrim('   '),'') as blank"))[0].blank,null);
  check((await rpc('kg_felrapport_granska',['fy1','6.338','atgardad','x'.repeat(1001)])).code,'kommentar');
  check((await rpc('kg_felrapport_granska',['fy1','6.338','oppen',comment])).code,'status');
  check((await rpc('kg_felrapport_granska',['fy1','9999','ignorerad',comment])).code,'ingen_rapport');
  check((await rpc('kg_felrapport_granska',['fy1','6.338','ignorerad',comment])).antal,3);
  check((await rows('select count(*)::int n from kg_felrapport where granskningskommentar=$1',[comment]))[0].n,3);
  check((await rows('select count(*)::int n from kg_felrapport where atgardad and ignorerad is not true and anvandare=$1',[id(3)]))[0].n,0);
  check((await rows('select count(*)::int n from kg_felrapport where granskningskommentar is null and atgardad'))[0].n,1);
  check((await rpc('kg_felrapport_granskningssvar')).lista[0].kommentar,comment);
  await uid(3);let mine=await rpc('kg_mina_felrapporter');check(mine.length,3);check(mine.filter(x=>x.kommentar===comment).length,1);check(mine.find(x=>x.uppgift==='5.55').status,'oppen');
  await uid(4);mine=await rpc('kg_mina_felrapporter');check(mine.length,1);check(mine[0].kommentar,comment);
  await uid(null);check(await rpc('kg_mina_felrapporter'),[]);
  await uid(2);check((await rpc('kg_felrapport_granska',['fy1','5.55','atgardad','Frågan har förtydligats.'])).antal,1);
  check((await rows('select count(*)::int n from kg_felrapport where atgardad and ignorerad is not true and anvandare=$1',[id(3)]))[0].n,1);
  check((await rpc('kg_felrapport_granska',['fy1','5.55','ignorerad','Försök byta beslut'])).code,'ingen_rapport');
  check((await rpc('kg_felrapport_granska',['fy1','5.55','atgardad','Förtydligad kommentar.',true])).antal,1);
  check((await rows('select count(*)::int n from kg_felrapport where atgardad and ignorerad is not true and anvandare=$1',[id(3)]))[0].n,1);
  check((await rows('select count(*)::int n from kg_private.audit'))[0].n,2);
  // En ny öppen rapport ska inte ärva tidigare besked eller ändra tidigare beslut.
  await db.query('insert into kg_felrapport(kurs,uppgift,anvandare) values($1,$2,$3)',['fy1','6.338',id(4)]);
  await uid(1);
  check((await rpc('kg_felrapport_granska',['fy1','6.338','ignorerad','Redigerad tidigare kommentar.',true])).antal,4);
  check((await rows("select count(*)::int n from kg_felrapport where kurs='fy1' and uppgift='6.338' and atgardad is not true"))[0].n,1);
  check((await rows('select count(*)::int n from kg_private.audit'))[0].n,2);
  check((await rpc('kg_felrapport_granska',['fy1','6.338','atgardad','Ny rapport: felet är rättat.'])).antal,1);
  await uid(3);check((await rpc('kg_mina_felrapporter')).filter(x=>x.uppgift==='6.338').every(x=>x.status==='ignorerad'),true);
  await uid(4);mine=await rpc('kg_mina_felrapporter');check(mine.map(x=>x.status).sort(),['atgardad','ignorerad']);
  await db.query('insert into kg_felrapport(kurs,uppgift,anvandare) values($1,$2,$3)',['fy1','rollback',id(3)]);
  await db.exec("create or replace function public.kg_synka_felstatus(p_kurs text,p_uppgift text,p_status text) returns void language plpgsql security definer as $$begin if p_uppgift='rollback' then raise exception 'audit failure';end if;insert into kg_private.audit values(p_kurs,p_uppgift,p_status);end;$$;");
  await uid(1);await assert.rejects(rpc('kg_felrapport_granska',['fy1','rollback','atgardad','Testa återställning']),/audit failure/);checks++;
  check((await rows("select atgardad,granskningskommentar from kg_felrapport where uppgift='rollback'"))[0],{atgardad:false,granskningskommentar:null});
  await uid(4);
  await db.query('insert into kg_felrapport(kurs,uppgift,anvandare) values($1,$2,$3)',['fy1','utan-kommentar',id(4)]);
  await uid(1);check((await rpc('kg_felrapport_granska',['fy1','utan-kommentar','ignorerad','   '])).ok,true);
  check((await rows("select granskningskommentar,atgardad,ignorerad from kg_felrapport where uppgift='utan-kommentar'"))[0],{granskningskommentar:null,atgardad:true,ignorerad:true});
  check((await rpc('kg_felrapport_granska',['fy1','5.55','atgardad',null,true])).ok,true);
  check((await rows("select granskningskommentar from kg_felrapport where uppgift='5.55'"))[0].granskningskommentar,null);
  await uid(4);
  // Verifiera funktionen med faktiska databasroller, inte enbart huvudrollen.
  await db.exec('grant usage on schema public,auth to authenticated;set role authenticated;');
  check((await rpc('kg_mina_felrapporter')).length,3);
  await assert.rejects(db.query('select * from public.kg_felrapport'),/permission denied/);checks++;
  await uid(3);check((await rpc('kg_felrapport_granska',['fy1','5.55','atgardad','Otillåtet'])).code,'larare_kravs');
  await db.exec('reset role;set role anon;');
  await assert.rejects(rpc('kg_mina_felrapporter'),/permission denied/);checks++;
  await db.exec('reset role;');
  console.log(JSON.stringify({checks,failures:[]}));
 }finally{await db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
