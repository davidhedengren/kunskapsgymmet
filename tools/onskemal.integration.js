'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {PGlite}=require(process.argv[2]||'@electric-sql/pglite');
const id=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
(async()=>{
 const db=new PGlite();let checks=0;const check=(a,b)=>{assert.deepEqual(a,b);checks++;};
 const rpc=async(name,p=[]) => (await db.query('select public.'+name+'('+p.map((_,i)=>'$'+(i+1)).join(',')+') as result',p)).rows[0].result;
 const uid=async n=>db.query("select set_config('request.jwt.claim.sub',$1,false)",[n?id(n):'']);
 try{
  await db.exec(`CREATE ROLE anon;CREATE ROLE authenticated;CREATE SCHEMA auth;
    CREATE TABLE auth.users(id uuid PRIMARY KEY,email text,raw_user_meta_data jsonb);
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
    CREATE FUNCTION public.kg_ar_admin() RETURNS boolean LANGUAGE sql AS $$SELECT auth.uid()='${id(1)}'::uuid$$;
    INSERT INTO auth.users VALUES('${id(1)}','admin@example.test','{"full_name":"Admin"}'),('${id(2)}','student@example.test','{"full_name":"Student"}'),('${id(3)}','teacher@example.test','{"full_name":"Teacher"}');
    GRANT USAGE ON SCHEMA public,auth TO authenticated,anon;`);
  const sql=fs.readFileSync(path.join(__dirname,'../sql/2026-10-13-onskemal.sql'),'utf8');await db.exec(sql);await db.exec(sql);
  await db.exec('SET ROLE authenticated');await uid(2);
  let first=await rpc('kg_skicka_onskemal',[id(10),'funktion',null,null,null,'  Bakåtknapp  ']);check(first.ok,true);
  check((await rpc('kg_skicka_onskemal',[id(10),'funktion',null,null,null,'Bakåtknapp'])).id,first.id);
  check((await rpc('kg_mina_onskemal')).length,1);check((await rpc('kg_mina_onskemal'))[0].beskrivning,'Bakåtknapp');
  await assert.rejects(rpc('kg_admin_onskemal'),e=>e.code==='42501');checks++;
  await assert.rejects(rpc('kg_admin_onskemal_status',[first.id,'atgardad','Otillåtet']),e=>e.code==='42501');checks++;
  await assert.rejects(db.query('select * from kg_private.onskemal'),/permission denied/);checks++;
  for(const params of [[id(11),'funktion',null,null,null,' '],[id(11),null,null,null,null,'Text'],[id(11),'fler_uppgifter','ma1',' ',null,'Text'],[id(11),'fler_uppgifter','ma1','Bråk','6','Text'],[id(11),'funktion','okand',null,null,'Text'],[id(11),'problem',null,null,null,'x'.repeat(2001)]]){await assert.rejects(rpc('kg_skicka_onskemal',params),e=>e.code==='22023');checks++;}
  const exercises=await rpc('kg_skicka_onskemal',[id(11),'fler_uppgifter','fy1','Rörelse','1','Fler diagram']);check(exercises.ok,true);
  await uid(3);check((await rpc('kg_mina_onskemal')).length,0);
  await rpc('kg_skicka_onskemal',[id(12),'problem','ma2',null,null,'Miniräknaren för stor']);
  await assert.rejects(rpc('kg_admin_onskemal'),e=>e.code==='42501');checks++;
  await uid(1);const list=await rpc('kg_admin_onskemal');check(list.length,3);check(list.find(x=>x.id===first.id).rapportor_namn,'Student');
  for(const comment of [null,'','   ']){check((await rpc('kg_admin_onskemal_status',[first.id,'atgardad',comment])).ok,true);await uid(2);const own=await rpc('kg_mina_onskemal');check(own.find(x=>x.id===first.id).status,'atgardad');check(own.find(x=>x.id===first.id).kommentar,null);await uid(1);}
  await rpc('kg_admin_onskemal_status',[first.id,'pagar','  Vi tittar på detta.  ']);await uid(2);check((await rpc('kg_mina_onskemal')).find(x=>x.id===first.id).kommentar,'Vi tittar på detta.');
  await uid(3);check((await rpc('kg_mina_onskemal')).length,1);check((await rpc('kg_mina_onskemal'))[0].kommentar,null);
  await uid(1);await assert.rejects(rpc('kg_admin_onskemal_status',[first.id,'okand',null]),e=>e.code==='22023');checks++;
  await assert.rejects(rpc('kg_admin_onskemal_status',[first.id,'avslutad','x'.repeat(1001)]),e=>e.code==='22023');checks++;
  await assert.rejects(rpc('kg_admin_onskemal_status',[99999,'avslutad',null]),e=>e.code==='22023');checks++;
  await uid(null);await assert.rejects(rpc('kg_mina_onskemal'),e=>e.code==='42501');checks++;
  await db.exec('RESET ROLE;SET ROLE anon;');await assert.rejects(rpc('kg_mina_onskemal'),/permission denied/);checks++;
  await assert.rejects(rpc('kg_skicka_onskemal',[id(13),'funktion',null,null,null,'Anon']),/permission denied/);checks++;
  await db.exec('RESET ROLE;SET ROLE authenticated;');await uid(2);
  for(let i=100;i<118;i++)await rpc('kg_skicka_onskemal',[id(i),'funktion',null,null,null,'Önskemål '+i]);
  await assert.rejects(rpc('kg_skicka_onskemal',[id(119),'funktion',null,null,null,'Gräns']),/for_manga/);checks++;
  check((await rpc('kg_skicka_onskemal',[id(10),'funktion',null,null,null,'Återförsök'])).id,first.id);
  await db.exec('RESET ROLE');await db.exec(sql);await uid(2);check((await rpc('kg_mina_onskemal')).length,20);
  console.log(JSON.stringify({postgresChecks:checks,migrationRuns:3,failures:0}));
 }finally{await db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
