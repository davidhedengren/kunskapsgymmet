'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {PGlite}=require(process.argv[2]||'@electric-sql/pglite');
const uid=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
(async()=>{
 const db=new PGlite();let checks=0;const check=(a,b)=>{assert.deepEqual(a,b);checks++;};
 try{
 await db.exec(`create role anon;create role authenticated;create schema auth;create schema kg_private;
 create table auth.users(id uuid primary key);
 create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create function public.kg_ar_admin() returns boolean language sql as $$select auth.uid()='${uid(2)}'::uuid$$;
 create function kg_private.prov_larare() returns boolean language sql as $$select auth.uid() in ('${uid(1)}'::uuid,'${uid(2)}'::uuid)$$;
 create function kg_private.lar_har_grupp(g bigint) returns boolean language sql as $$select (auth.uid()='${uid(1)}'::uuid and g=10) or public.kg_ar_admin()$$;
 create function kg_private.anv_namn(u uuid) returns text language sql as $$select 'Elev '||right(u::text,1)$$;
 create table kg_private.gruppmedlem(grupp_id bigint,user_id uuid,primary key(grupp_id,user_id));
 create table kg_private.xp_dag(user_id uuid,dag date,upp_start bigint,upp_slut bigint,primary key(user_id,dag));
 insert into auth.users select ('00000000-0000-0000-0000-'||lpad(n::text,12,'0'))::uuid from generate_series(1,6) n;`);
 await db.exec(fs.readFileSync(path.join(__dirname,'../sql/2026-11-03-fokus.sql'),'utf8'));
 const migration=fs.readFileSync(path.join(__dirname,'../sql/2026-11-04-fokus-uppgifter.sql'),'utf8');await db.exec(migration);await db.exec(migration);
 const today=(await db.query("select (now() at time zone 'Europe/Stockholm')::date::text d")).rows[0].d;
 await db.query('insert into kg_private.gruppmedlem values(10,$1),(10,$2),(10,$3),(20,$4)',[uid(3),uid(4),uid(5),uid(6)]);
 await db.query("insert into kg_private.xp_dag values($1,$5::date,480,500),($1,$5::date-1,400,480),($2,$5::date,40,40),($3,$5::date,100,109),($4,$5::date,0,999)",[uid(3),uid(4),uid(5),uid(6),today]);
 await db.query("insert into kg_private.fokus values($1,true,now()-interval '2 minutes',now(),$3,0,0),($2,false,now()-interval '1 minute',now(),$3,60,1)",[uid(3),uid(4),today]);
 const set=async n=>db.query("select set_config('request.jwt.claim.sub',$1,false)",[n?uid(n):'']);
 const rpc=async group=>(await db.query('select public.kg_lar_fokus($1) r',[group])).rows[0].r;
 for(const n of [null,3,6]){await set(n);check((await rpc(10)).ok,false);}
 await set(1);check((await rpc(20)).ok,false);
 const r=await rpc(10);check(r.ok,true);check(r.uppgifter_dag,today);check(r.elever.map(e=>e.uppgifter_idag),[20,0,9]);
 check(r.elever.map(e=>e.online),[true,true,false]);check(r.elever.map(e=>e.fokus),[true,false,null]);
 check(r.elever.some(e=>e.id===uid(6)),false);
 await db.query('update kg_private.xp_dag set upp_slut=505 where user_id=$1 and dag=$2',[uid(3),today]);check((await rpc(10)).elever[0].uppgifter_idag,25);
 await db.query('delete from kg_private.xp_dag where user_id=$1 and dag=$2',[uid(3),today]);check((await rpc(10)).elever[0].uppgifter_idag,0);
 await set(2);check((await rpc(20)).elever[0].uppgifter_idag,999);check((await rpc(99)).elever,[]);
 check((await db.query("select has_function_privilege('anon','public.kg_lar_fokus(bigint)','execute') ok")).rows[0].ok,false);
 check((await db.query("select has_function_privilege('authenticated','public.kg_lar_fokus(bigint)','execute') ok")).rows[0].ok,true);
 check((await db.query("select has_table_privilege('authenticated','kg_private.xp_dag','select') ok")).rows[0].ok,false);
 console.log(JSON.stringify({checks,failed:0}));
 }finally{await db.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
