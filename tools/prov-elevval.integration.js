'use strict';
// Actual migration and existing pass RPCs in isolated PostgreSQL, no production data.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {PGlite}=require(process.argv[2]||'@electric-sql/pglite');
const uid=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
const sql=f=>fs.readFileSync(path.join(__dirname,'../sql/'+f+'.sql'),'utf8');
const fn=(s,n)=>{const a=s.indexOf('CREATE OR REPLACE FUNCTION '+n+'(');assert(a>=0,n);return s.slice(a,s.indexOf('$function$;',a)+12);};
(async()=>{
 const db=new PGlite();let checks=0;const check=(a,b)=>{assert.deepEqual(a,b);checks++;};
 try{
 await db.exec(`create role anon;create role authenticated;create schema auth;create schema kg_private;
 create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create table public.kg_klass(id bigint primary key,namn text,larare boolean default false);
 create table public.kg_grupp(id bigint primary key,namn text,kod text);
 create table kg_private.grupplarare(grupp_id bigint,user_id uuid);
 create table kg_private.gruppmedlem(grupp_id bigint,user_id uuid);
 create table kg_private.klassmedlem(klass_id bigint,user_id uuid);
 create table kg_private.larprofil(user_id uuid primary key,roll text,aktiv boolean);
 create table kg_private.state(id uuid primary key,data jsonb);
 create table auth.users(id uuid primary key,email text);
 create function public.kg_ar_admin() returns boolean language sql as $$select false$$;
 create function kg_private.prov_larare() returns boolean language sql as $$select exists(select 1 from kg_private.larprofil where user_id=auth.uid() and roll='larare' and aktiv)$$;
 create function kg_private.anv_namn(p_uid uuid) returns text language sql as $$select 'Elev '||right(p_uid::text,2)$$;`);
 const base=sql('2026-10-02-provtraning'),groups=sql('2026-10-03-larargrupper'),school=sql('2026-10-04-skolor-och-larare');
 await db.exec(base.slice(base.indexOf('create table'),base.indexOf('-- ---------------------------------------------------------------------\n-- Hjälp')));
 await db.exec(`alter table public.kg_provtraning add column grupper bigint[] not null default '{}';
 alter table public.kg_provtraning add column alla boolean not null default false;
 create table kg_private.provdold(prov_id bigint,user_id uuid,primary key(prov_id,user_id));`);
 for(const n of ['kg_private.lar_har_grupp','kg_private.prov_elev_kan','public.kg_prov_mina','public.kg_prov_sammanstallning','public.kg_prov_for_mig','public.kg_prov_rapportera']){
   // prov_json must exist before SQL-language for_mig is defined.
   if(n==='public.kg_prov_for_mig')await db.exec(fn(school,'kg_private.prov_json'));
   await db.exec(fn(groups,n));
 }
 await db.exec(fn(sql('2026-10-09-larare-till-elev'),'kg_private.prov_lar_kan'));
 for(const n of ['public.kg_prov_skapa','public.kg_prov_andra'])await db.exec(fn(school,n));
 await db.exec(fn(base,'public.kg_prov_anslut'));
 await db.exec(fn(groups,'kg_private.elev_forsok'));
 await db.exec(`insert into public.kg_grupp values(11,'NA26a','GRUPP1'),(12,'NA26b','GRUPP2'),(20,'Annan lärare','GRUPP3');
 insert into kg_private.larprofil values('${uid(1)}','larare',true),('${uid(2)}','larare',true),('${uid(9)}','larare',true);
 insert into kg_private.grupplarare values(11,'${uid(1)}'),(12,'${uid(1)}'),(20,'${uid(2)}');
 insert into kg_private.gruppmedlem values(11,'${uid(3)}'),(11,'${uid(4)}'),(12,'${uid(4)}'),(12,'${uid(5)}'),(20,'${uid(6)}'),(11,'${uid(9)}');`);
 const set=async n=>db.query("select set_config('request.jwt.claim.sub',$1,false)",[n?uid(n):'']);
 const call=async(q,args=[])=>(await db.query(q,args)).rows[0].r;
 const create=(ns,gs=[],title='Inför Prov v.48')=>call("select public.kg_prov_skapa_med_elever($1,'fy1',null,ARRAY['effekt'],ARRAY['E'],15,false,null,$2::bigint[],'PROV48',$3::uuid[]) r",[title,gs,ns?.map(n=>n===null?null:uid(n))]);
 const edit=(id,ns,gs=[])=>call("select public.kg_prov_andra_med_elever($1,'Uppdaterat pass',null,ARRAY['effekt'],ARRAY['E'],15,false,null,$2::bigint[],$3::uuid[]) r",[id,gs,ns.map(uid)]);
 const mine=()=>call('select public.kg_prov_for_mig() r');
 await set(1);
 const legacy=await call("select public.kg_prov_skapa('Äldre grupppass','fy1',null,ARRAY['effekt'],ARRAY['E'],15,false,null,ARRAY[11]::bigint[],'GAMMALT') r");
 const migration=sql('2026-10-16-traningspass-elevval');await db.exec(migration);await db.exec(migration);
 for(const n of [null,3]){await set(n);check((await create([3])).ok,false);check((await call('select public.kg_prov_elevval() r')).ok,false);}
 await set(1);check((await call('select public.kg_prov_elevval() r')).elever.map(e=>e.id),[3,4,5].map(uid));
 for(const ns of [[6],[9],[null],null,Array(501).fill(3)])check((await create(ns)).code,'elev_behorighet');
 check((await create([3],[20])).code,'okand_grupp');
 check((await call('select count(*)::int r from public.kg_provtraning')),1);
 const one=await create([3,3]);check(one.ok,true);
 check((await call('select elever r from public.kg_provtraning where id=$1',[one.id])),[uid(3)]);
 const many=await create([4,5]);const whole=await create([],[11]);const mixed=await create([4,5],[11]);
 const student=await call('select public.kg_lar_elev(12,$1) r',[uid(5)]);
 check(student.pass.map(p=>p.id).sort(),[many.id,mixed.id].sort());
 check(student.pass.every(p=>p.klara===0),true);
 await db.exec(migration);
 check(await call('select elever r from public.kg_provtraning where id=$1',[one.id]),[uid(3)]);
 await set(3);check((await mine()).map(p=>p.id).sort(),[legacy.id,one.id,whole.id,mixed.id].sort());
 await set(4);check((await mine()).map(p=>p.id).sort(),[legacy.id,many.id,whole.id,mixed.id].sort());
 await set(6);check(await mine(),[]);
 check((await call("select public.kg_prov_rapportera($1,1,1,'{}') r",[one.id])).code,'ej_deltagare');
 await set(3);check((await call("select public.kg_prov_rapportera($1,1,1,'{}') r",[one.id])).ok,true);
 await set(1);
 const summary=id=>call('select public.kg_prov_sammanstallning($1) r',[id]);
 check((await summary(one.id)).elever,1);check((await summary(many.id)).elever,2);check((await summary(mixed.id)).elever,4);
 let own=await call('select public.kg_prov_mina() r');let p=own.prov.find(p=>p.id===one.id);
 check(p.elever.map(e=>e.id),[uid(3)]);check(p.elevgrupper,[11]);check(p.grupper,[]);
 check((await edit(one.id,[3,6])).code,'elev_behorighet');check((await summary(one.id)).elever,1);
 await set(2);check((await edit(one.id,[6])).ok,false);check((await summary(one.id)).ok,false);
 await set(1);check((await edit(many.id,[5])).ok,true);
 await set(4);check((await mine()).some(p=>p.id===many.id),false);
 await set(5);check((await mine()).some(p=>p.id===many.id),true);
 // Adding a new group member must affect whole-group passes only.
 await db.exec(`insert into kg_private.gruppmedlem values(11,'${uid(7)}')`);await set(7);
 check((await mine()).map(p=>p.id).sort(),[legacy.id,whole.id,mixed.id].sort());
 // Existing code sharing still works, explicitly separate from automatic assignment.
 check((await call('select public.kg_prov_anslut($1) r',[one.kod])).ok,true);check((await mine()).some(p=>p.id===one.id),true);
 // Do not expose recipient names to students in prov_json.
 check((await mine()).some(p=>'elever' in p),false);
 await set(1);await db.exec(`update kg_private.larprofil set aktiv=false where user_id='${uid(1)}'`);
 check((await create([3])).ok,false);check((await edit(one.id,[3])).ok,false);
 for(const n of ['kg_prov_elevval()','kg_prov_skapa_med_elever(text,text,text,text[],text[],integer,boolean,date,bigint[],text,uuid[])','kg_prov_andra_med_elever(bigint,text,text,text[],text[],integer,boolean,date,bigint[],uuid[])']){
  check(await call("select has_function_privilege('anon',$1,'execute') r",['public.'+n]),false);
  check(await call("select has_function_privilege('authenticated',$1,'execute') r",['public.'+n]),true);
 }
 check(await call("select has_function_privilege('authenticated','kg_private.prov_valbara_elever(uuid[],uuid[])','execute') r"),false);
 console.log(JSON.stringify({checks,failed:0}));
 }finally{await db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
