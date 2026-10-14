'use strict';
// Verklig PostgreSQL via PGlite; bara lokala fixture-konton.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {PGlite}=require(process.argv[2]||'@electric-sql/pglite');
const uid=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
(async()=>{
 const db=new PGlite();let checks=0;const check=(a,b)=>{assert.deepEqual(a,b);checks++;};
 try{
 await db.exec(`create role anon;create role authenticated;create schema auth;create schema kg_private;
 create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create table auth.users(id uuid primary key,namn text);
 create table kg_private.larprofil(user_id uuid primary key,skola_id bigint,aktiv boolean);
 create table kg_private.elevskola(user_id uuid primary key,skola_id bigint);
 create table public.kg_grupp(id bigint primary key,namn text,klass_id bigint);
 create table kg_private.grupplarare(grupp_id bigint,user_id uuid,primary key(grupp_id,user_id));
 create table kg_private.gruppmedlem(grupp_id bigint references public.kg_grupp(id),user_id uuid references auth.users(id),primary key(grupp_id,user_id));
 create table kg_private.klassmedlem(user_id uuid primary key,klass_id bigint,satt timestamptz,satt_av uuid);
 create function kg_private.ar_larare(p_user uuid) returns boolean language sql as $$select p_user='${uid(8)}'::uuid$$;
 create function kg_private.anv_namn(p_user uuid) returns text language sql as $$select namn from auth.users where id=p_user$$;
 create function kg_private.prov_larare() returns boolean language sql as $$select kg_private.ar_larare(auth.uid()) or exists(select 1 from kg_private.larprofil where user_id=auth.uid() and aktiv)$$;
 create function kg_private.lar_har_grupp(p_grupp bigint) returns boolean language sql as $$select exists(select 1 from kg_private.grupplarare where grupp_id=p_grupp and user_id=auth.uid())$$;`);
 // Befintlig produktions-trigger ska även fungera när läraren väljer elever.
 const old=fs.readFileSync(path.join(__dirname,'../sql/2026-10-06-grupp-klass.sql'),'utf8');
 await db.exec(old.slice(old.indexOf('CREATE OR REPLACE FUNCTION kg_private.grupp_klass_ny_medlem()'),old.indexOf('-- ---------------------------------------------------------------------\n-- Veckospärren')));
 for(let n=1;n<=8;n++)await db.query('insert into auth.users values($1,$2)',[uid(n),['','Lärare Ett','Lärare Två','Åsa','Bo','Annan skola','Utan skola','Tidigare elev','Lärare Tre'][n]]);
 await db.query('insert into kg_private.larprofil values($1,10,true),($2,20,true),($3,10,true)',[uid(1),uid(2),uid(8)]);
 await db.query('insert into kg_private.elevskola values($1,10),($2,10),($3,20),($4,10)',[uid(3),uid(4),uid(5),uid(8)]);
 await db.exec("insert into public.kg_grupp values(11,'Mål',91),(12,'Källa',null),(13,'Annan kurs',null),(20,'Kollegans klass',null)");
 await db.query('insert into kg_private.grupplarare values(11,$1),(12,$1),(13,$1),(20,$2)',[uid(1),uid(2)]);
 await db.query('insert into kg_private.gruppmedlem values(12,$1),(13,$1),(13,$2),(20,$3)',[uid(3),uid(7),uid(5)]);
 const migration=fs.readFileSync(path.join(__dirname,'../sql/2026-10-14-larare-elevval.sql'),'utf8');await db.exec(migration);await db.exec(migration);
 const set=async n=>db.query("select set_config('request.jwt.claim.sub',$1,false)",[n?uid(n):'']);
 const roster=async g=>(await db.query('select public.kg_lar_elevlista($1) r',[g])).rows[0].r;
 const add=async(g,ns,from=null)=>(await db.query('select public.kg_lar_elever_lagg_till($1,$2::uuid[],$3) r',[g,ns?.map(n=>n===null?null:uid(n)),from])).rows[0].r;
 for(const n of [null,3,2]){await set(n);check((await roster(11)).ok,false);check((await add(11,[4])).ok,false);}
 await set(1);let r=await roster(11);check(r.elever.map(e=>e.id).sort(),[3,4,7].map(uid));check(r.elever[0].grupper.every(g=>g.id!==20),true);check(r.elever.some(e=>'epost'in e||'uppgifter'in e),false);
 check((await add(11,[4,5])).code,'elev_behorighet');check((await db.query('select count(*)::int n from kg_private.gruppmedlem where grupp_id=11')).rows[0].n,0);
 for(const ns of [null,[],[null],Array(501).fill(3)])check((await add(11,ns)).code,'elever');
 check((await add(11,[8])).code,'elev_behorighet');check((await add(11,[6])).code,'elev_behorighet');
 check((await add(11,[3],20)).code,'kallklass');check((await add(11,[3],11)).code,'kallklass');
 check((await add(11,[3,4],12)).code,'kallklass');check((await db.query('select count(*)::int n from kg_private.gruppmedlem where grupp_id=11')).rows[0].n,0);
 r=await add(11,[3,3],12);check(r,{ok:true,tillagda:1,valda:1,flyttade:1});
 check((await db.query('select grupp_id from kg_private.gruppmedlem where user_id=$1 order by grupp_id',[uid(3)])).rows.map(r=>r.grupp_id),[11,13]);
 check((await db.query('select klass_id from kg_private.klassmedlem where user_id=$1',[uid(3)])).rows[0].klass_id,91);
 check((await add(11,[4])).tillagda,1);check((await add(11,[4])).tillagda,0);
 check((await roster(11)).elever.find(e=>e.id===uid(4)).medlem,true);
 await db.query('update kg_private.larprofil set aktiv=false where user_id=$1',[uid(1)]);check((await roster(11)).ok,false);check((await add(11,[7])).ok,false);
 for(const sql of ["select has_function_privilege('anon','public.kg_lar_elevlista(bigint)','execute') ok","select has_function_privilege('anon','public.kg_lar_elever_lagg_till(bigint,uuid[],bigint)','execute') ok","select has_function_privilege('authenticated','kg_private.lar_valbar_elev(uuid)','execute') ok"]){check((await db.query(sql)).rows[0].ok,false);}
 console.log(JSON.stringify({checks,failed:0}));
 }finally{await db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
