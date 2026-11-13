// SQL-test för AI-feedbackens budget och gränser (sql/2026-11-13-ai-feedback.sql).
// Körs mot en riktig Postgres i WebAssembly (PGlite). PGlite ingår inte i repot:
//   npm i --no-save @electric-sql/pglite      (eller sätt PGLITE_MODUL till en sökväg)
//   node --test tools/ai-feedback-sql.test.mjs
// Saknas PGlite hoppas testet över.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
let PGlite = null;
try {
  const modul = process.env.PGLITE_MODUL
    ? pathToFileURL(path.join(process.env.PGLITE_MODUL, 'dist/index.js')).href
    : '@electric-sql/pglite';
  ({ PGlite } = await import(modul));
} catch (_) { /* hoppas över */ }

const hoppa = !PGlite && 'PGlite saknas (npm i --no-save @electric-sql/pglite)';
let db;
const U = (n) => `00000000-0000-0000-0000-${String(n).padStart(12, '0')}`;

async function nyDb() {
  const d = new PGlite();
  await d.exec(`
    DO $$ BEGIN
      CREATE ROLE anon NOLOGIN; CREATE ROLE authenticated NOLOGIN; CREATE ROLE service_role NOLOGIN;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    CREATE SCHEMA IF NOT EXISTS auth;
    CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS
      $$ SELECT nullif(current_setting('test.uid', true), '')::uuid $$;
    GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
    GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
    CREATE OR REPLACE FUNCTION public.kg_ar_admin() RETURNS boolean LANGUAGE sql STABLE AS
      $$ SELECT coalesce(current_setting('test.admin', true), '') = 'ja' $$;
  `);
  await d.exec(fs.readFileSync(path.join(dir, '../sql/2026-11-13-ai-feedback.sql'), 'utf8'));
  await d.exec(fs.readFileSync(path.join(dir, '../sql/2026-11-13-ai-feedback-statistik.sql'), 'utf8'));
  // Testerna prövar gränserna med små värden (standard i produktion: 10 per dag, 0 följdfrågor).
  await d.exec(`UPDATE kg_ai_konfig SET aktiv = true, granskningar_per_dag = 3, foljdfragor_per_gransk = 2`);
  return d;
}
const reservera = async (user, typ = 'granskning', g = null, bilder = 5, tecken = 8000, ut = 3500) =>
  (await db.query(`SELECT kg_ai_reservera($1,$2,$3,$4,$5,$6) AS r`, [user, typ, g, bilder, tecken, ut])).rows[0].r;
const avrakna = async (anrop, utfall, inT = 15000, cach = 0, utT = 2000, kontext = { uppgift: 'u', losning: 'l', aterkoppling: 'a', samtal: [] }) =>
  (await db.query(`SELECT kg_ai_avrakna($1,$2,$3,$4,$5,$6) AS r`, [anrop, utfall, inT, cach, utT, kontext])).rows[0].r;
const manad = async () => (await db.query(`SELECT * FROM kg_ai_manad`)).rows[0];

before(async () => { if (!hoppa) db = await nyDb(); });

test('avstängd funktion nekar utan att reservera', { skip: hoppa }, async () => {
  await db.exec(`UPDATE kg_ai_konfig SET aktiv = false`);
  assert.equal((await reservera(U(1))).fel, 'avstangd');
  await db.exec(`UPDATE kg_ai_konfig SET aktiv = true`);
});

test('reservationen är en konservativ övre gräns och avräknas mot faktisk förbrukning', { skip: hoppa }, async () => {
  db = await nyDb();
  const r = await reservera(U(1));
  assert.equal(r.ok, true);
  // 5 bilder × 3000 + 4000 + 600 token in, 3500 ut, 12 kr/USD, faktor 1,25
  const vantat = ((5 * 3000 + 4000 + 600) * 2 + 3500 * 10) / 1e6 * 12 * 1.25;
  assert.ok(Math.abs(Number(r.reserverat_sek) - vantat) < 1e-9, `${r.reserverat_sek} ≠ ${vantat}`);
  let m = await manad();
  assert.ok(Math.abs(Number(m.reserverat) - vantat) < 1e-9);
  const a = await avrakna(r.anrop, 'ok', 12000, 1000, 1800);
  const faktisk = ((11000 * 2 + 1000 * 0.1 + 1800 * 10) / 1e6) * 12 * 1.05;
  assert.ok(Math.abs(Number(a.kostnad_sek) - faktisk) < 1e-9);
  m = await manad();
  assert.equal(Number(m.reserverat), 0);
  assert.ok(Math.abs(Number(m.forbrukat) - faktisk) < 1e-9);
  assert.equal(m.granskningar, 1);
  assert.equal((await avrakna(r.anrop, 'ok')).fel, 'redan_avraknad', 'dubbel avräkning nekas');
});

test('dagsgräns 3 granskningar, misslyckade räknas inte, parallellt anrop nekas', { skip: hoppa }, async () => {
  db = await nyDb();
  const u = U(2);
  const r1 = await reservera(u);
  assert.equal((await reservera(u)).fel, 'pagar_redan', 'samma elev kan inte starta två samtidigt');
  await avrakna(r1.anrop, 'ok');
  const r2 = await reservera(u); await avrakna(r2.anrop, 'okand');          // misslyckad: räknas inte
  const r3 = await reservera(u); await avrakna(r3.anrop, 'ok');
  const r4 = await reservera(u); await avrakna(r4.anrop, 'ok');
  const r5 = await reservera(u);
  assert.equal(r5.ok, false); assert.equal(r5.fel, 'dagsgrans'); assert.equal(r5.grans, 3);
  assert.equal((await reservera(U(3))).ok, true, 'andra elever påverkas inte');
});

test('följdfrågor: högst 2, bara egen granskning, misslyckad följdfråga återförs', { skip: hoppa }, async () => {
  db = await nyDb();
  const u = U(4);
  const g = await reservera(u); await avrakna(g.anrop, 'ok');
  assert.equal((await reservera(U(5), 'foljdfraga', g.granskning, 0, 2000, 1200)).fel, 'okand_granskning', 'annan elev');
  const f1 = await reservera(u, 'foljdfraga', g.granskning, 0, 2000, 1200);
  assert.equal(f1.ok, true); assert.equal(f1.foljdfragor_kvar, 1); assert.equal(f1.kontext.uppgift, 'u');
  await avrakna(f1.anrop, 'okand', null, null, null, null);                 // misslyckades: återförs
  const f2 = await reservera(u, 'foljdfraga', g.granskning, 0, 2000, 1200); await avrakna(f2.anrop, 'ok');
  const f3 = await reservera(u, 'foljdfraga', g.granskning, 0, 2000, 1200); await avrakna(f3.anrop, 'ok');
  assert.equal((await reservera(u, 'foljdfraga', g.granskning, 0, 2000, 1200)).fel, 'foljdgrans');
});

test('samtidiga anrop kan aldrig tillsammans överskrida månadsbudgeten', { skip: hoppa }, async () => {
  db = await nyDb();
  await db.exec(`UPDATE kg_ai_konfig SET manadsbudget_sek = 3, granskningar_per_dag = 50`);
  const enskild = Number((await db.query(`SELECT kg_ai_reservationsbelopp(5,8000,3500) b`)).rows[0].b);
  const res = await Promise.all(Array.from({ length: 40 }, (_, i) => reservera(U(100 + i))));
  const ok = res.filter((r) => r.ok).length;
  assert.equal(ok, Math.floor(3 / enskild), `${ok} reservationer lyckades`);
  assert.ok(res.filter((r) => !r.ok).every((r) => r.fel === 'budget_slut'));
  const m = await manad();
  assert.ok(Number(m.reserverat) + Number(m.forbrukat) <= 3 + 1e-9);
  assert.equal(m.nekade, 40 - ok);
});

test('budget slut: även följdfrågor nekas; ingen reservation görs', { skip: hoppa }, async () => {
  db = await nyDb();
  const u = U(7);
  const g = await reservera(u); await avrakna(g.anrop, 'ok');
  await db.exec(`UPDATE kg_ai_manad SET forbrukat = 150`);
  assert.equal((await reservera(U(8))).fel, 'budget_slut');
  assert.equal((await reservera(u, 'foljdfraga', g.granskning, 0, 2000, 1200)).fel, 'budget_slut');
  assert.equal(Number((await manad()).reserverat), 0);
});

test('för stor begäran nekas; budgeten får inte sättas till 200 kr eller mer', { skip: hoppa }, async () => {
  db = await nyDb();
  assert.equal((await reservera(U(9), 'granskning', null, 200, 8000, 3500)).fel, 'for_stor_begaran');
  await assert.rejects(db.exec(`UPDATE kg_ai_konfig SET manadsbudget_sek = 200`));
});

test('oavräknade reservationer räknas som förbrukade efter 10 minuter och kontext rensas', { skip: hoppa }, async () => {
  db = await nyDb();
  const r = await reservera(U(10));
  await db.exec(`UPDATE kg_ai_anrop SET skapad = now() - interval '11 minutes'`);
  await db.exec(`SELECT kg_ai_stada()`);
  const m = await manad();
  assert.equal(Number(m.reserverat), 0);
  assert.ok(Math.abs(Number(m.forbrukat) - Number(r.reserverat_sek)) < 1e-9, 'hela reservationen räknas');
  const g = await reservera(U(11)); await avrakna(g.anrop, 'ok');
  await db.exec(`UPDATE kg_ai_granskning SET skapad = now() - interval '25 hours'`);
  await db.exec(`SELECT kg_ai_stada()`);
  const k = (await db.query(`SELECT kontext FROM kg_ai_granskning WHERE id = $1`, [g.granskning])).rows[0];
  assert.equal(k.kontext, null);
});

test('elever kan inte läsa tabellerna eller anropa reservationen direkt', { skip: hoppa }, async () => {
  db = await nyDb();
  await db.exec(`SET ROLE authenticated`);
  try {
    await assert.rejects(db.query(`SELECT * FROM kg_ai_granskning`));
    await assert.rejects(db.query(`SELECT * FROM kg_ai_manad`));
    await assert.rejects(db.query(`SELECT kg_ai_reservera($1,'granskning',null,1,10,10)`, [U(12)]));
    await assert.rejects(db.query(`SELECT kg_ai_avrakna($1,'ok',1,0,1,null)`, [U(12)]));
    await assert.rejects(db.query(`UPDATE kg_ai_konfig SET manadsbudget_sek = 199`));
    await assert.rejects(db.query(`SELECT kg_ai_oversikt()`), /ej_admin/);
    const s = (await db.query(`SELECT kg_ai_status() s`)).rows[0].s;
    assert.equal(s.aktiv, true); assert.equal(s.per_dag, 3);
  } finally { await db.exec(`RESET ROLE`); }
});

test('adminöversikt och inställningar kräver admin', { skip: hoppa }, async () => {
  db = await nyDb();
  await db.exec(`SET test.admin = 'ja'`);
  const o = (await db.query(`SELECT kg_ai_satt_konfig(false, 120, 2, 1) o`)).rows[0].o;
  assert.equal(o.konfig.aktiv, false); assert.equal(Number(o.konfig.manadsbudget_sek), 120);
  await db.exec(`SET test.admin = ''`);
  await assert.rejects(db.query(`SELECT kg_ai_satt_konfig(true, 150, 3, 2)`), /ej_admin/);
});

test('statistik: utfall, feltyper, källa och uppgift sparas och summeras i adminöversikten', { skip: hoppa }, async () => {
  db = await nyDb();
  const markera = (g, utfall, helt, fel, kalla, kurs, upp) =>
    db.query(`SELECT kg_ai_markera($1,$2,$3,$4,$5,$6,$7)`, [g, utfall, helt, fel, kalla, kurs, upp]);
  const g1 = await reservera(U(20)); await avrakna(g1.anrop, 'ok');
  await markera(g1.granskning, 'delvis', false, ['ofullstandigt', 'hackat'], 'traning', 'ma1', '2.15');
  const g2 = await reservera(U(21)); await avrakna(g2.anrop, 'ok');
  await markera(g2.granskning, 'ja', true, [], 'egen', 'DROP TABLE', "x'; --");
  const g3 = await reservera(U(20)); await avrakna(g3.anrop, 'okand');           // misslyckad räknas inte
  await markera(g3.granskning, 'ja', true, [], 'traning', 'ma1', '2.15');
  await db.exec(`SET test.admin = 'ja'`);
  const o = (await db.query(`SELECT kg_ai_oversikt() o`)).rows[0].o;
  await db.exec(`SET test.admin = ''`);
  assert.equal(o.totalt.granskningar, 2); assert.equal(o.totalt.elever, 2);
  assert.deepEqual(o.utfall, { delvis: 1, ja: 1 });
  assert.equal(o.helt_korrekt_manad, 1);
  assert.deepEqual(o.feltyper, { ofullstandigt: 1 }, 'okända feltyper filtreras bort');
  assert.deepEqual(o.kalla, { traning: 1, egen: 1 });
  assert.deepEqual(o.uppgifter.map((u) => [u.kurs, u.uppgift, u.n]), [['ma1', '2.15', 1]], 'ogiltig kurs/uppgift sparas inte');
  assert.equal(o.misslyckade_manad, 1);
  assert.equal(o.elever.length, 2); assert.equal(o.idag.granskningar, 2);
  await db.exec(`SET ROLE authenticated`);
  try { await assert.rejects(db.query(`SELECT kg_ai_markera($1,'ja',true,'{}','egen',null,null)`, [g1.granskning])); }
  finally { await db.exec(`RESET ROLE`); }
});
