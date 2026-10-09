'use strict';
// Kör med Node och @electric-sql/pglite: node tools/admin-elevroll.integration.js [modulens sökväg]
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {PGlite}=require(process.argv[2]||'@electric-sql/pglite');
const root=path.join(__dirname,'..');
const id=n=>'00000000-0000-0000-0000-'+String(n).padStart(12,'0');
(async()=>{
 const db=new PGlite();let checks=0;
 const check=(actual,want)=>{assert.deepEqual(actual,want);checks++;};
 const query=async(sql,params=[])=> (await db.query(sql,params)).rows;
 const uid=async n=>{await db.query("select set_config('request.jwt.claim.sub',$1,false)",[n?id(n):'']);};
 const rpc=async(name,params=[])=>{
  const marks=params.map((_,i)=>'$'+(i+1)).join(',');
  return (await query('select public.'+name+'('+marks+') as result',params))[0].result;
 };
 try{
  await db.exec(fs.readFileSync(path.join(__dirname,'fixtures/admin-elevroll.sql'),'utf8'));
  const migration=fs.readFileSync(path.join(root,'sql/2026-10-09-larare-till-elev.sql'),'utf8');
  await db.exec(migration);
  // Befintliga behörigheter och profilvisning fungerar före rollbytet.
  await uid(2);check((await rpc('kg_min_larprofil')).larare,true);
  const before=await query('select id,data from kg_private.state order by id');
  const accountsBefore=await query('select * from auth.users order by id');
  const membersBefore=await query('select * from kg_private.gruppmedlem order by grupp_id,user_id');
  const passesBefore=await query('select * from public.kg_provtraning order by id');
  const resultsBefore=await query('select * from kg_private.provresultat order by prov_id,user_id');

  await uid(3);check((await rpc('kg_admin_larare_till_elev',[id(2)])).code,'admin_kravs');
  await uid(null);check((await rpc('kg_admin_larare_till_elev',[id(2)])).code,'admin_kravs');
  check((await query('select aktiv from kg_private.larprofil where user_id=$1',[id(2)]))[0].aktiv,true);
  await uid(1);
  check((await rpc('kg_admin_larare_till_elev',[id(1)])).code,'eget_konto');
  check((await rpc('kg_admin_larare_till_elev',[id(4)])).code,'godkand_larare');
  check((await rpc('kg_admin_larare_till_elev',[id(999)])).code,'okant_konto');
  check((await rpc('kg_admin_larare_till_elev',[id(2)])).roll,'elev');
  check((await rpc('kg_admin_larare')).larare.some(x=>x.id===id(2)),false);
  check(await query('select roll,aktiv from kg_private.larprofil where user_id=$1',[id(2)]),[{roll:'elev',aktiv:false}]);
  check((await query('select count(*)::int as n from kg_private.grupplarare where user_id=$1',[id(2)]))[0].n,0);
  check((await query('select count(*)::int as n from public.kg_grupp'))[0].n,2);
  check((await query('select count(*)::int as n from kg_private.grupplarare where user_id=$1',[id(6)]))[0].n,1);
  check((await query('select count(*)::int as n from kg_private.klassmedlem where user_id=$1',[id(2)]))[0].n,0);
  check((await query('select skola_id from kg_private.elevskola where user_id=$1',[id(2)]))[0].skola_id,1);
  check(await query('select id,data from kg_private.state order by id'),before);
  check(await query('select * from auth.users order by id'),accountsBefore);
  check(await query('select * from kg_private.gruppmedlem order by grupp_id,user_id'),membersBefore);
  check(await query('select * from public.kg_provtraning order by id'),passesBefore);
  check(await query('select * from kg_private.provresultat order by prov_id,user_id'),resultsBefore);
  check((await rpc('kg_admin_larare_aktiv',[id(2),true])).ok,false);
  check((await rpc('kg_admin_larare_till_elev',[id(2)])).ok,true);
  // Även avstängd felregistrering kan bli elev; vanlig klass/skola bevaras.
  check((await rpc('kg_admin_larare_till_elev',[id(5)])).ok,true);
  check((await query('select skola_id from kg_private.elevskola where user_id=$1',[id(5)]))[0].skola_id,2);
  check((await query('select klass_id from kg_private.klassmedlem where user_id=$1',[id(5)]))[0].klass_id,2);

  await uid(2);const mine=await rpc('kg_min_larprofil');
  check(mine.elev,true);check(mine.larare,false);check(mine.profil,null);
  check((await rpc('kg_bli_larare',['Elev Exempel','Skola A'])).code,'elev');
  check((await query('select kg_private.prov_larare() as allowed'))[0].allowed,false);
  check((await query('select kg_private.prov_lar_kan(p) as allowed from public.kg_provtraning p where id=1'))[0].allowed,false);
  check((await query('select kg_private.lar_har_grupp(1) as allowed'))[0].allowed,false);
  await uid(6);check((await rpc('kg_bli_larare',['Lärare Exempel','Skola A'])).ok,true);
  check((await query('select kg_private.prov_lar_kan(p) as allowed from public.kg_provtraning p where id=1'))[0].allowed,true);
  await uid(7);check((await rpc('kg_bli_larare',['Ny Lärare','Ny Skola'])).ok,true);
  await uid(1);check((await query('select kg_private.prov_lar_kan(p) as allowed from public.kg_provtraning p where id=1'))[0].allowed,true);
  const privilege="select has_function_privilege($1,'public.kg_admin_larare_till_elev(uuid)','execute') as allowed";
  check((await query(privilege,['anon']))[0].allowed,false);
  check((await query(privilege,['authenticated']))[0].allowed,true);
  // Omsättning av migrationen får inte återställa elevrollen.
  await db.exec(migration);
  await uid(2);check((await rpc('kg_min_larprofil')).elev,true);
  console.log(JSON.stringify({postgresChecks:checks,failures:0,migrationRuns:2}));
 }finally{await db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
