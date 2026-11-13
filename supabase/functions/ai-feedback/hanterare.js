// HTTP-hanterare för Edge Function `ai-feedback`. Ren JavaScript så att den kan testas i Node
// med mockad fetch. index.ts kopplar den till Deno.serve.
import {
  GRANSER, FELTEXT, valideraGranskning, valideraFoljd, byggGranskningsanrop, byggFoljdanrop,
  tecken, antalBilder, tokenforbrukning, tolkaGranskning, tolkaFoljd, kontextFranGranskning, kontextMedFoljd,
} from './logik.js';

const MAX_KROPP = 9_000_000; // tecken (base64-bilder inräknade)

const STATUS = {
  ej_inloggad: 401, avstangd: 503, budget_slut: 402, dagsgrans: 429, foljdgrans: 429, pagar_redan: 409,
  okand_granskning: 404, granskning_ej_tillganglig: 410, for_stor_begaran: 413, modell_fel: 502, timeout: 504,
  ogiltigt_svar: 502, serverfel: 500,
};

export function skapaHanterare({ env, fetchFn = fetch, logg = () => {} }) {
  const tillatna = String(env.AI_FEEDBACK_ORIGINS || 'https://kunskapsgymmet.se,https://www.kunskapsgymmet.se')
    .split(',').map((s) => s.trim()).filter(Boolean);
  const lokal = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

  function cors(req) {
    const o = req.headers.get('origin') || '';
    const ok = tillatna.includes(o) || lokal.test(o);
    return {
      'Access-Control-Allow-Origin': ok ? o : tillatna[0] || 'null',
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Max-Age': '600',
      Vary: 'Origin',
    };
  }
  const svara = (req, status, kropp) => new Response(JSON.stringify(kropp), {
    status, headers: { ...cors(req), 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
  const fel = (req, kod, extra = {}) => svara(req, STATUS[kod] || 400, { ok: false, fel: kod, meddelande: FELTEXT[kod] || FELTEXT.serverfel, ...extra });

  async function rpc(namn, kropp) {
    const r = await fetchFn(`${env.SUPABASE_URL}/rest/v1/rpc/${namn}`, {
      method: 'POST',
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kropp),
    });
    if (!r.ok) throw new Error(`rpc ${namn}: ${r.status}`);
    return r.json();
  }

  // Identiteten tas alltid från token via Supabase Auth, aldrig från klientens uppgifter.
  async function anvandare(req) {
    const h = req.headers.get('authorization') || '';
    const m = /^Bearer\s+(\S+)$/i.exec(h);
    if (!m) return null;
    const r = await fetchFn(`${env.SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: env.SUPABASE_ANON_KEY, Authorization: `Bearer ${m[1]}` },
    });
    if (!r.ok) return null;
    const u = await r.json();
    return typeof u?.id === 'string' && u.id.length === 36 ? u.id : null;
  }

  async function openai(anrop) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), GRANSER.timeoutMs);
    try {
      const r = await fetchFn('https://api.openai.com/v1/responses', {
        method: 'POST', signal: ctrl.signal,
        headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(anrop),
      });
      let data = null;
      try { data = await r.json(); } catch (_) { /* tomt */ }
      return { http: r.status, data };
    } catch (e) {
      return { http: 0, data: null, avbrutet: e?.name === 'AbortError' };
    } finally {
      clearTimeout(t);
    }
  }

  // Avgör hur ett OpenAI-anrop ska avräknas mot budgeten.
  function utfall(res) {
    if (res.http === 200) return tokenforbrukning(res.data) ? 'debiterat' : 'okand';
    if (res.http === 0) return 'okand';                       // timeout/nätverk: kan ha debiterats
    if (res.http >= 400 && res.http < 500) return 'ej_skickat'; // nekat av API:t (ogiltig bild, kvot, nyckel)
    return 'okand';                                           // 5xx: räkna konservativt
  }

  async function avrakna(anropId, utf, res, kontext) {
    const t = res ? tokenforbrukning(res.data) : null;
    try {
      await rpc('kg_ai_avrakna', {
        p_anrop: anropId, p_utfall: utf, p_in: t?.in ?? null, p_cachade: t?.cachade ?? null, p_ut: t?.ut ?? null,
        p_kontext: kontext ?? null,
      });
    } catch (e) {
      // Reservationen ligger kvar och räknas som förbrukad av kg_ai_stada() efter 10 minuter.
      logg('avräkning misslyckades', String(e));
    }
  }

  return async function hantera(req) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    if (req.method !== 'POST') return fel(req, 'ogiltig_begaran');
    if (env.AI_FEEDBACK_AKTIV !== 'true' || !env.OPENAI_API_KEY) return fel(req, 'avstangd');
    const langd = Number(req.headers.get('content-length') || 0);
    if (langd > MAX_KROPP) return fel(req, 'for_stor_begaran');

    let anv;
    try { anv = await anvandare(req); } catch (_) { anv = null; }
    if (!anv) return fel(req, 'ej_inloggad');

    let kropp;
    try {
      const txt = await req.text();
      if (txt.length > MAX_KROPP) return fel(req, 'for_stor_begaran');
      kropp = JSON.parse(txt);
    } catch (_) { return fel(req, 'ogiltig_begaran'); }

    const typ = kropp?.typ;
    if (typ !== 'granska' && typ !== 'foljd') return fel(req, 'ogiltig_begaran');

    let v;
    if (typ === 'granska') {
      v = valideraGranskning(kropp);
    } else {
      v = valideraFoljd(kropp);
    }
    if (!v.ok) return fel(req, v.fel);

    // Bygg anropet först med en platshållarmodell, så att reservationen kan räknas på exakt innehåll.
    const modellUtkast = env.AI_FEEDBACK_MODELL || 'gpt-5.4-mini';
    let anrop = typ === 'granska' ? byggGranskningsanrop(modellUtkast, v) : byggFoljdanrop(modellUtkast, { samtal: [] }, v.fraga);
    // Följdfrågans kontext är okänd innan reservationen. Räkna med den största tillåtna kontexten.
    const extraTecken = typ === 'foljd' ? 12_000 : 0;

    let res0;
    try {
      res0 = await rpc('kg_ai_reservera', {
        p_user: anv, p_typ: typ === 'granska' ? 'granskning' : 'foljdfraga',
        p_granskning: typ === 'foljd' ? v.granskningId : null,
        p_bilder: antalBilder(anrop), p_tecken: tecken(anrop) + extraTecken, p_max_ut: anrop.max_output_tokens,
      });
    } catch (e) {
      logg('reservation misslyckades', String(e));
      return fel(req, 'serverfel'); // budgeten kan inte kontrolleras säkert: neka
    }
    if (!res0?.ok) return fel(req, res0?.fel || 'serverfel', res0?.grans != null ? { grans: res0.grans } : {});

    const modell = res0.modell || modellUtkast;
    if (typ === 'foljd') anrop = byggFoljdanrop(modell, res0.kontext, v.fraga);
    else anrop.model = modell;

    const res = await openai(anrop);
    if (res.http !== 200) {
      await avrakna(res0.anrop, utfall(res), res, null);
      logg('openai-fel', res.http, res.data?.error?.code || '');
      return fel(req, res.avbrutet ? 'timeout' : 'modell_fel');
    }

    if (typ === 'granska') {
      const g = tolkaGranskning(res.data);
      if (!g) { await avrakna(res0.anrop, utfall(res), res, null); return fel(req, 'ogiltigt_svar'); }
      await avrakna(res0.anrop, tokenforbrukning(res.data) ? 'ok' : 'okand', res, kontextFranGranskning(g));
      return svara(req, 200, { ok: true, granskningId: res0.granskning, feedback: g, foljdfragorKvar: res0.foljdfragor_kvar });
    }
    const f = tolkaFoljd(res.data);
    if (!f) { await avrakna(res0.anrop, utfall(res), res, null); return fel(req, 'ogiltigt_svar'); }
    await avrakna(res0.anrop, tokenforbrukning(res.data) ? 'ok' : 'okand', res, kontextMedFoljd(res0.kontext, v.fraga, f.svar));
    return svara(req, 200, { ok: true, svar: f.svar, foljdfragorKvar: Math.max(0, res0.foljdfragor_kvar) });
  };
}
