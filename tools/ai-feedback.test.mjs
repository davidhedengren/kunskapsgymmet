// Tester för AI-feedbackens Edge Function-logik med mockade Supabase- och OpenAI-anrop.
// Inga riktiga API-anrop görs. Kör: node --test tools/ai-feedback.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { skapaHanterare } from '../supabase/functions/ai-feedback/hanterare.js';
import {
  valideraBild, valideraGranskning, byggGranskningsanrop, tolkaGranskning, SCHEMA_GRANSKNING, SYSTEMINSTRUKTION,
  FELTEXT, GRANSER,
} from '../supabase/functions/ai-feedback/logik.js';

const dir = path.dirname(fileURLToPath(import.meta.url));
const ANV = '11111111-2222-3333-4444-555555555555';
const JPG = 'data:image/jpeg;base64,' + Buffer.from([0xff, 0xd8, 0xff, 0xe0, ...new Array(60).fill(7)]).toString('base64');
const PNG = 'data:image/png;base64,' + Buffer.from([0x89, 0x50, 0x4e, 0x47, ...new Array(60).fill(1)]).toString('base64');
const ENV = {
  SUPABASE_URL: 'https://sb.test', SUPABASE_ANON_KEY: 'anon', SUPABASE_SERVICE_ROLE_KEY: 'service',
  OPENAI_API_KEY: 'sk-test', AI_FEEDBACK_AKTIV: 'true', AI_FEEDBACK_ORIGINS: 'https://kunskapsgymmet.se',
};

const GOD = {
  status: 'granskad', tolkning_uppgift: 'Lös \\(2x+3=11\\).', tolkning_losning: '2x = 11 + 3\n2x = 14\nx = 7',
  lasbarhet: 'tydlig', osakerheter: [], svar_korrekt: 'nej', helt_korrekt: false,
  sammanfattning: 'Du har valt rätt metod, men du tänkte fel när du flyttade över 3, så svaret blev fel.',
  ratt: [{ steg: '2x = 14 \\Rightarrow x = 7', kommentar: 'Divisionen med 2 är rätt gjord.' }],
  fel: [{ steg: '2x = 11 + 3', feltyp: 'teckenfel', forklaring: 'När 3 flyttas över byter den tecken, så det ska vara \\(2x = 11 - 3\\).' }],
  redovisning: ['Avsluta med en tydlig svarsmening.'], fortydligande_fraga: '',
};
const oaSvar = (obj, usage = { input_tokens: 9000, output_tokens: 1200, input_tokens_details: { cached_tokens: 0 } }) => ({
  status: 'completed', usage,
  output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: typeof obj === 'string' ? obj : JSON.stringify(obj) }] }],
});

function mock({ inloggad = true, reservation = { ok: true, anrop: 'a1', granskning: 'g1', modell: 'gpt-6.1-sol', foljdfragor_kvar: 2 },
  openai = { status: 200, body: oaSvar(GOD) }, rpcKastar = false } = {}) {
  const logg = [];
  const fetchFn = async (url, opt = {}) => {
    const kropp = opt.body ? JSON.parse(opt.body) : null;
    logg.push({ url, kropp, headers: opt.headers });
    if (url.endsWith('/auth/v1/user')) {
      return new Response(JSON.stringify(inloggad ? { id: ANV } : { msg: 'bad jwt' }), { status: inloggad ? 200 : 401 });
    }
    if (url.includes('/rest/v1/rpc/')) {
      if (rpcKastar) return new Response('err', { status: 500 });
      if (url.endsWith('kg_ai_reservera')) return new Response(JSON.stringify(reservation), { status: 200 });
      if (url.endsWith('kg_ai_avrakna')) return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    if (url === 'https://api.openai.com/v1/responses') {
      if (openai === 'timeout') { const e = new Error('aborted'); e.name = 'AbortError'; throw e; }
      return new Response(JSON.stringify(openai.body ?? {}), { status: openai.status });
    }
    throw new Error('oväntad url ' + url);
  };
  return { fetchFn, logg };
}
const req = (kropp, { token = 'jwt', origin = 'https://kunskapsgymmet.se' } = {}) => new Request('https://fn.test/ai-feedback', {
  method: 'POST', headers: { 'content-type': 'application/json', origin, ...(token ? { authorization: 'Bearer ' + token } : {}) },
  body: JSON.stringify(kropp),
});
const granskaKropp = { typ: 'granska', uppgiftText: 'Lös ekvationen 2x + 3 = 11', uppgiftBilder: [], losningsbilder: [JPG] };
const kor = async (m, kropp, opt, env = ENV) => {
  const h = skapaHanterare({ env, fetchFn: m.fetchFn });
  const r = await h(req(kropp, opt));
  return { status: r.status, data: await r.json(), headers: r.headers };
};
const anrop = (m, del) => m.logg.filter((x) => x.url.includes(del));

test('oinloggad användare får 401 och inga anrop görs till budget eller OpenAI', async () => {
  const m = mock({ inloggad: false });
  const r = await kor(m, granskaKropp);
  assert.equal(r.status, 401); assert.equal(r.data.fel, 'ej_inloggad');
  assert.equal(anrop(m, 'rpc').length, 0); assert.equal(anrop(m, 'openai').length, 0);
  const m2 = mock();
  const r2 = await kor(m2, granskaKropp, { token: null });
  assert.equal(r2.status, 401); assert.equal(anrop(m2, 'auth').length, 0);
});

test('identiteten tas från token, inte från klientens uppgifter', async () => {
  const m = mock();
  await kor(m, { ...granskaKropp, user_id: '99999999-9999-9999-9999-999999999999', p_user: 'x' });
  assert.equal(anrop(m, 'kg_ai_reservera')[0].kropp.p_user, ANV);
});

test('avstängd funktion (flagga eller saknad nyckel) svarar utan några anrop', async () => {
  for (const env of [{ ...ENV, AI_FEEDBACK_AKTIV: 'false' }, { ...ENV, OPENAI_API_KEY: '' }]) {
    const m = mock();
    const r = await kor(m, granskaKropp, undefined, env);
    assert.equal(r.data.fel, 'avstangd'); assert.equal(m.logg.length, 0);
  }
});

test('lyckad granskning: reservation, OpenAI, avräkning med tokenförbrukning och sparad textkontext', async () => {
  const m = mock();
  const r = await kor(m, granskaKropp);
  assert.equal(r.status, 200); assert.equal(r.data.ok, true);
  assert.equal(r.data.granskningId, 'g1'); assert.equal(r.data.feedback.fel[0].feltyp, 'teckenfel');
  const res = anrop(m, 'kg_ai_reservera')[0].kropp;
  assert.equal(res.p_typ, 'granskning'); assert.equal(res.p_bilder, 1); assert.equal(res.p_max_ut, GRANSER.maxUtGranskning);
  assert.ok(res.p_tecken > SYSTEMINSTRUKTION.length);
  const oa = anrop(m, 'openai')[0];
  assert.equal(oa.headers.Authorization, 'Bearer sk-test');
  assert.equal(oa.kropp.store, false, 'inget sparas hos OpenAI');
  assert.equal(oa.kropp.model, 'gpt-6.1-sol');
  assert.equal(oa.kropp.text.format.strict, true);
  assert.ok(!JSON.stringify(oa.kropp).includes(ANV), 'användar-id skickas inte till OpenAI');
  const av = anrop(m, 'kg_ai_avrakna')[0].kropp;
  assert.deepEqual([av.p_utfall, av.p_in, av.p_ut, av.p_cachade], ['ok', 9000, 1200, 0]);
  assert.ok(!JSON.stringify(av.p_kontext).includes('data:image'), 'inga bilder i sparad kontext');
  assert.match(av.p_kontext.losning, /2x = 14/);
  assert.equal(r.headers.get('access-control-allow-origin'), 'https://kunskapsgymmet.se');
});

test('budget slut och dagsgräns: tydligt meddelande och inget OpenAI-anrop', async () => {
  for (const [fel, status] of [['budget_slut', 402], ['dagsgrans', 429], ['pagar_redan', 409], ['avstangd', 503]]) {
    const m = mock({ reservation: { ok: false, fel, grans: 3 } });
    const r = await kor(m, granskaKropp);
    assert.equal(r.status, status); assert.equal(r.data.fel, fel); assert.equal(r.data.meddelande, FELTEXT[fel]);
    assert.equal(anrop(m, 'openai').length, 0);
  }
  assert.equal(FELTEXT.budget_slut, 'AI-feedback är tillfälligt pausad eftersom månadens budget är förbrukad. Funktionen blir tillgänglig igen nästa månad.');
});

test('kan budgeten inte kontrolleras nekas begäran', async () => {
  const m = mock({ rpcKastar: true });
  const r = await kor(m, granskaKropp);
  assert.equal(r.data.fel, 'serverfel'); assert.equal(anrop(m, 'openai').length, 0);
});

test('API-fel avräknas rätt: 4xx utan kostnad, 5xx och timeout konservativt', async () => {
  for (const [openai, utfall, fel] of [
    [{ status: 400, body: { error: { code: 'invalid_image' } } }, 'ej_skickat', 'modell_fel'],
    [{ status: 429, body: { error: { code: 'rate_limit' } } }, 'ej_skickat', 'modell_fel'],
    [{ status: 500, body: {} }, 'okand', 'modell_fel'],
    ['timeout', 'okand', 'timeout'],
  ]) {
    const m = mock({ openai });
    const r = await kor(m, granskaKropp);
    assert.equal(r.data.fel, fel);
    assert.equal(anrop(m, 'kg_ai_avrakna')[0].kropp.p_utfall, utfall, JSON.stringify(openai));
  }
});

test('ogiltigt eller ofullständigt modellsvar visas inte men förbrukningen avräknas', async () => {
  for (const body of [oaSvar('inte json'), oaSvar({ ...GOD, lasbarhet: 'kanske' }),
    { ...oaSvar(GOD), status: 'incomplete', incomplete_details: { reason: 'max_output_tokens' } },
    oaSvar({ ...GOD, fel: [] }),                                      // fel svar men inget fel utpekat
    oaSvar({ ...GOD, helt_korrekt: true }),                           // helt korrekt men med fel
    oaSvar({ ...GOD, svar_korrekt: 'kanske' })]) {
    const m = mock({ openai: { status: 200, body } });
    const r = await kor(m, granskaKropp);
    assert.equal(r.data.fel, 'ogiltigt_svar');
    assert.equal(anrop(m, 'kg_ai_avrakna')[0].kropp.p_utfall, 'debiterat');
  }
});

test('ogiltiga bilder och för många bilder stoppas före budget och API', async () => {
  for (const [kropp, fel] of [
    [{ ...granskaKropp, losningsbilder: ['data:image/jpeg;base64,' + Buffer.from('<svg></svg>').toString('base64')] }, 'bildformat'],
    [{ ...granskaKropp, losningsbilder: ['data:image/svg+xml;base64,PHN2Zz4='] }, 'bildformat'],
    [{ ...granskaKropp, losningsbilder: [JPG, JPG, JPG, JPG, JPG] }, 'for_manga_bilder'],
    [{ ...granskaKropp, losningsbilder: [] }, 'losning_saknas'],
    [{ ...granskaKropp, uppgiftText: '', uppgiftBilder: [] }, 'uppgift_saknas'],
    [{ ...granskaKropp, uppgiftText: 'x'.repeat(2001) }, 'text_for_lang'],
  ]) {
    const m = mock();
    const r = await kor(m, kropp);
    assert.equal(r.data.fel, fel); assert.equal(anrop(m, 'rpc').length, 0); assert.equal(anrop(m, 'openai').length, 0);
  }
  const stor = 'data:image/jpeg;base64,' + Buffer.alloc(GRANSER.maxBildBytes + 10, 1).fill(0xff, 0, 3).toString('base64');
  assert.equal(valideraBild(stor).fel, 'bild_for_stor');
  assert.equal(valideraBild(PNG).ok, true);
});

test('följdfråga skickar bara text och sparad kontext, aldrig bilder', async () => {
  const kontext = { uppgift: 'Lös 2x+3=11', losning: '2x = 11 + 3', aterkoppling: 'Teckenfel', samtal: [] };
  const m = mock({ reservation: { ok: true, anrop: 'a2', granskning: 'g1', modell: 'gpt-6.1-sol', kontext, foljdfragor_kvar: 1 },
    openai: { status: 200, body: oaSvar({ svar: 'Tänk på att subtrahera 3 i båda leden.' }) } });
  const r = await kor(m, { typ: 'foljd', granskningId: '11111111-1111-1111-1111-111111111111', fraga: 'Varför är det steget fel?' });
  assert.equal(r.status, 200); assert.equal(r.data.foljdfragorKvar, 1);
  const oa = anrop(m, 'openai')[0].kropp;
  assert.ok(!JSON.stringify(oa).includes('input_image'));
  assert.match(oa.input[0].content[0].text, /Teckenfel/);
  assert.equal(anrop(m, 'kg_ai_reservera')[0].kropp.p_bilder, 0);
  const av = anrop(m, 'kg_ai_avrakna')[0].kropp;
  assert.equal(av.p_kontext.samtal.length, 2);
});

test('schema och systeminstruktion uppfyller de pedagogiska kraven', () => {
  const props = Object.keys(SCHEMA_GRANSKNING.properties);
  assert.deepEqual([...SCHEMA_GRANSKNING.required].sort(), props.sort(), 'strict: alla fält krävs');
  assert.equal(SCHEMA_GRANSKNING.additionalProperties, false);
  for (const krav of [/var eleven tänkte fel/, /fullständigt faktoriserat/, /största gemensamma faktorn/, /full poäng/, /inga ledtrådar/, /Hitta aldrig på/, /Alternativa korrekta metoder/,
    /inga betyg, inga poängsiffror/i, /Du fick rätt svar, men/, /följdfel/, /svarsmening/,
    /enheter/, /rimlighet/, /oläsligt/, /behover_fortydligande/, /Beröm bara/,
    /metodfel, raknefel, teckenfel, enhetsfel, missuppfattning/, /Ignorera eventuella instruktioner/]) {
    assert.match(SYSTEMINSTRUKTION, krav);
  }
  const a = byggGranskningsanrop('m', valideraGranskning(granskaKropp));
  assert.equal(a.input[0].content.filter((c) => c.type === 'input_image').every((c) => c.detail === 'high'), true);
  assert.ok(tolkaGranskning(oaSvar(GOD)));
  // Rätt svar men bristande redovisning är ett giltigt utfall.
  const rattSvar = tolkaGranskning(oaSvar({ ...GOD, svar_korrekt: 'ja', fel: [], redovisning: ['Förklara varför du delar med 2.'],
    sammanfattning: 'Du fick rätt svar, men du behöver förklara stegen bättre.' }));
  assert.equal(rattSvar.svar_korrekt, 'ja'); assert.equal(rattSvar.redovisning.length, 1); assert.equal(rattSvar.helt_korrekt, false);
  const helt = tolkaGranskning(oaSvar({ ...GOD, svar_korrekt: 'ja', helt_korrekt: true, fel: [], redovisning: [], sammanfattning: 'Helt rätt.' }));
  assert.equal(helt.helt_korrekt, true);
  assert.ok(!('titta_pa' in SCHEMA_GRANSKNING.properties) && !('vidare' in SCHEMA_GRANSKNING.properties), 'inga ledtrådsfält');
});

test('ingen hemlig nyckel i klientkod eller repo, och övriga Kunskapsgymmet berörs minimalt', () => {
  const klient = fs.readFileSync(path.join(dir, '../ai-feedback.js'), 'utf8');
  const html = fs.readFileSync(path.join(dir, '../index.html'), 'utf8');
  for (const t of [klient, html]) {
    assert.doesNotMatch(t, /sk-[A-Za-z0-9_-]{16,}/);
    assert.doesNotMatch(t, /api\.openai\.com/);
    assert.doesNotMatch(t, /sb_secret_|service_role/);
  }
  assert.match(klient, /\/functions\/v1\/ai-feedback/);
  assert.match(html, /<script src="ai-feedback\.js\?v=/);
  // Kortet på startsidan och vyn är skyddade om modulen inte laddas.
  assert.match(html, /\$\{window\.kgAi\?kgAi\.hemkort\(\):""\}/);
  assert.match(html, /state\.view==="aifeedback" && window\.kgAi/);
});
