// PostgreSQL-integration mot lokal PGlite. Ingen produktionsdatabas används.
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {PGlite}=require(process.argv[2]||'@electric-sql/pglite');
const uid=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
(async()=>{
 const db=new PGlite();let checks=0;const check=(a,b)=>{assert.deepEqual(a,b);checks++;};
 try{
  await db.exec(`create role anon; create role authenticated; create schema auth; create schema kg_private;
    create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
    create function public.kg_ar_admin() returns boolean language sql as $$select auth.uid()='${uid(1)}'::uuid$$;
    create table public.fixture_users(user_id uuid,skapad timestamptz);
    create table public.fixture_days(uid uuid,day date,tasks integer,correct integer,minutes numeric,beats integer);
    create function public.kg_admin_anvandare() returns table(user_id uuid,skapad timestamptz) language sql as $$select * from public.fixture_users$$;
    create function public.kg_admin_anvandarstat(p_user uuid,p_days integer) returns jsonb language sql as $$
      select jsonb_build_object('dagar',coalesce((select jsonb_agg(jsonb_build_object('dag',day,'uppgifter',tasks,'ratt',correct,'aktiv_minuter',minutes,'heartbeat_antal',beats,'inloggningar',0)) from public.fixture_days where uid=p_user),'[]'::jsonb),
       'kurser',jsonb_build_array(jsonb_build_object('kurs','fy1','uppgifter',coalesce((select sum(tasks) from public.fixture_days where uid=p_user),0),'ratt',coalesce((select sum(correct) from public.fixture_days where uid=p_user),0))))$$;
    create function public.kg_statistik() returns jsonb language sql as $$select '{"dagar":[],"totalt":{"uppgifter":100}}'::jsonb$$;
    grant execute on function public.kg_statistik() to authenticated;`);
  const today=(await db.query("select (now() at time zone 'Europe/Stockholm')::date::text as day")).rows[0].day;
  // Konto skapat 22:30 UTC = nästa kalenderdag i Sverige i oktober.
  await db.query('insert into public.fixture_users values($1,$2::date::timestamp-interval \'90 minutes\'),($3,$2::date::timestamp-interval \'90 minutes\')',[uid(2),today,uid(3)]);
  await db.query('insert into public.fixture_days values($1,$3::date,10,8,12.5,10),($2,$3::date,20,10,7.5,20),($1,$3::date-1,4,4,3,4)',[uid(2),uid(3),today]);
  const migration=fs.readFileSync(path.join(__dirname,'../sql/2026-10-11-admin-statistik.sql'),'utf8');
  await db.exec(migration);await db.exec(migration); // Idempotens.
  const set=async id=>db.query("select set_config('request.jwt.claim.sub',$1,false)",[id||'']);
  const rpc=async name=>(await db.query('select public.'+name+'() as result')).rows[0].result;
  for(const id of [null,uid(2)]){
    await set(id);
    for(const name of ['kg_statistik','kg_admin_oversikt']){let denied=false;try{await rpc(name);}catch(e){denied=e.code==='42501';}check(denied,true);}
  }
  await set(uid(1));const overview=await rpc('kg_admin_oversikt');check(overview.dagar.length,30);
  const d=overview.dagar.find(d=>d.dag===today);check(d.uppgifter,30);check(d.ratt,18);check(d.aktiva,2);check(d.aktiv_minuter,20);check(d.nya,2);check(d.aktiva_ids.sort(),[uid(2),uid(3)]);check(overview.kurser[0].uppgifter,34);
  check((await rpc('kg_statistik')).totalt.uppgifter,100);
  for(const sql of ["select has_function_privilege('anon','public.kg_admin_oversikt()','execute') as ok","select has_function_privilege('authenticated','kg_private.kg_statistik_admin_source()','execute') as ok","select has_function_privilege('anon','public.kg_statistik()','execute') as ok"]){check((await db.query(sql)).rows[0].ok,false);}
  // Den andra kända RPC-formen: en JSON-array i stället för TABLE-rader.
  await db.exec('drop function public.kg_admin_anvandare(); create function public.kg_admin_anvandare() returns jsonb language sql as $$select jsonb_agg(to_jsonb(u)) from public.fixture_users u$$');
  check((await rpc('kg_admin_oversikt')).dagar.at(-1).aktiva,2);
  console.log(JSON.stringify({checks,failed:0}));
 }finally{await db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
