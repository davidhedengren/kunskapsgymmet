'use strict';
const {PGlite}=require('@electric-sql/pglite'),{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),migration=fs.readFileSync(path.join(root,'sql/2026-11-13-klasstopp-alla-utan-tak.sql'),'utf8');
test('Riktig PostgreSQL: All time räknar mer än 30000; periodtak och skydd bevaras',async()=>{
 const db=new PGlite();try{
 await db.exec(`create schema kg_private;create schema auth;
 create function auth.uid() returns uuid language sql as $$select '00000000-0000-0000-0000-000000000001'::uuid$$;
 create table public.kg_klass(id bigint primary key,namn text,larare boolean);
 create table kg_private.klassmedlem(klass_id bigint,user_id uuid);
 create table kg_private.state(id uuid,review_required boolean);
 create table kg_private.fixture_xp(user_id uuid,xp bigint,uppgifter bigint);
 create function kg_private.klass_start(text) returns timestamptz language sql as $$select null::timestamptz$$;
 create function kg_private.klass_period(uuid,timestamptz) returns table(xp bigint,uppgifter bigint) language sql as $$select xp,uppgifter from kg_private.fixture_xp where user_id=$1$$;
 create function kg_private.klass_tak(text) returns bigint language sql immutable as $$select case $1 when 'dag' then 400 when 'vecka' then 2000 when 'manad' then 6000 else 30000 end::bigint$$;
 insert into public.kg_klass values(1,'A',false),(2,'B',false),(9,'Lärare',true);`);
 for(const [n,klass,xp,review]of [[1,1,120001,false],[2,1,1,false],[3,2,40000,false],[4,2,40000,false],[5,2,999999,true],[6,9,999999,false]]){
  const id='00000000-0000-0000-0000-'+String(n).padStart(12,'0');await db.query('insert into kg_private.klassmedlem values($1,$2)',[klass,id]);await db.query('insert into kg_private.state values($1,$2)',[id,review]);await db.query('insert into kg_private.fixture_xp values($1,$2,1)',[id,xp]);
 }
 const old=fs.readFileSync(path.join(root,'sql/2026-10-11-klasstopp-summa.sql'),'utf8');const start=old.indexOf('CREATE OR REPLACE FUNCTION public.topplista_klasser'),end=old.indexOf('CREATE OR REPLACE FUNCTION kg_private.avgor_period');await db.exec(old.slice(start,end));
 const top=async period=>(await db.query('select public.topplista_klasser($1) as data',[period])).rows[0].data;
 const before={};for(const p of ['dag','vecka','manad','alla'])before[p]=await top(p);
 assert.equal(before.alla.rader[0].id,2);assert.equal(before.alla.tak,30000);
 await db.exec(migration);await db.exec(migration); // Omkörning ska vara säker.
 const after=await top('alla');assert.equal(after.tak,null);assert.equal(after.berakning,'summa');assert.equal(after.rader[0].id,1);assert.equal(after.rader[0].poang,120002);assert.equal(after.rader[1].poang,80000);assert.equal(after.rader[1].elever,2);assert.equal(after.rader.length,2);assert.equal(after.min_klass,1);
 for(const p of ['dag','vecka','manad'])assert.deepEqual(await top(p),before[p],p);
 assert.deepEqual((await db.query('select least(70001::bigint,kg_private.klass_tak($1)) as bidrag',['alla'])).rows,[{bidrag:70001}]);
 await assert.rejects(top('fel'),/Ogiltig period/);
 assert.equal((await db.query('select count(*)::int as antal from kg_private.fixture_xp')).rows[0].antal,6);
 }finally{await db.close()}
});
