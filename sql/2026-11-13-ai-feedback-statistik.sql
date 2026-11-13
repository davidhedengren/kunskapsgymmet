-- AI-feedback: mer statistik i adminvyn, 2026-11-13. Kör efter 2026-11-13-ai-feedback.sql.
-- Idempotent: kan köras om.
--
-- Varje lyckad granskning får några fält utan personuppgifter eller elevtext:
--   utfall    AI:ns bedömning av slutsvaret (ja/delvis/nej/saknas) eller 'oklar' (bilden gick inte att tolka)
--   feltyper  vilka feltyper AI:n hittade (metodfel, raknefel …)
--   kalla     'traning' (knappen efter Kontrollera) eller 'egen' (fristående sidan)
--   kurs, uppgift_id  vilken Kunskapsgymmet-uppgift granskningen gällde (bara från träningen)

ALTER TABLE public.kg_ai_granskning ADD COLUMN IF NOT EXISTS utfall text;
ALTER TABLE public.kg_ai_granskning ADD COLUMN IF NOT EXISTS helt_korrekt boolean;
ALTER TABLE public.kg_ai_granskning ADD COLUMN IF NOT EXISTS feltyper text[];
ALTER TABLE public.kg_ai_granskning ADD COLUMN IF NOT EXISTS kalla text;
ALTER TABLE public.kg_ai_granskning ADD COLUMN IF NOT EXISTS kurs text;
ALTER TABLE public.kg_ai_granskning ADD COLUMN IF NOT EXISTS uppgift_id text;

-- Anropas av Edge Function (service_role) efter en lyckad granskning.
CREATE OR REPLACE FUNCTION public.kg_ai_markera(p_granskning uuid, p_utfall text, p_helt_korrekt boolean,
                                                p_feltyper text[], p_kalla text, p_kurs text, p_uppgift text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS
$$
BEGIN
  UPDATE public.kg_ai_granskning SET
    utfall = CASE WHEN p_utfall IN ('ja','delvis','nej','saknas','oklar') THEN p_utfall END,
    helt_korrekt = p_helt_korrekt,
    feltyper = (SELECT array_agg(DISTINCT f) FROM unnest(coalesce(p_feltyper, '{}')) f
                 WHERE f IN ('metodfel','raknefel','teckenfel','enhetsfel','missuppfattning','ofullstandigt')),
    kalla = CASE WHEN p_kalla IN ('traning','egen') THEN p_kalla ELSE 'egen' END,
    kurs = CASE WHEN p_kurs ~ '^[a-z0-9]{1,12}$' THEN p_kurs END,
    uppgift_id = CASE WHEN p_uppgift ~ '^[A-Za-z0-9._#-]{1,40}$' THEN p_uppgift END
  WHERE id = p_granskning AND status = 'klar';
END;
$$;
REVOKE ALL ON FUNCTION public.kg_ai_markera(uuid, text, boolean, text[], text, text, text) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.kg_ai_markera(uuid, text, boolean, text[], text, text, text) TO service_role;

-- Utökad adminöversikt. Elevernas namn slås upp i klienten med kg_admin_anvandare().
CREATE OR REPLACE FUNCTION public.kg_ai_oversikt() RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS
$$
DECLARE k public.kg_ai_konfig; m date := public.kg_ai_denna_manad();
BEGIN
  IF NOT public.kg_ar_admin() THEN RAISE EXCEPTION 'kg:ej_admin'; END IF;
  SELECT * INTO k FROM public.kg_ai_konfig WHERE id;
  RETURN jsonb_build_object(
    'konfig', to_jsonb(k),
    'manad', (SELECT to_jsonb(x) FROM public.kg_ai_manad x WHERE manad = m),
    'tidigare', (SELECT coalesce(jsonb_agg(to_jsonb(x) ORDER BY x.manad DESC), '[]'::jsonb)
                   FROM (SELECT * FROM public.kg_ai_manad WHERE manad < m ORDER BY manad DESC LIMIT 12) x),
    'elever_manad', (SELECT count(DISTINCT user_id) FROM public.kg_ai_granskning WHERE manad = m AND status = 'klar'),
    'idag', (SELECT jsonb_build_object('granskningar', count(*), 'elever', count(DISTINCT user_id))
               FROM public.kg_ai_granskning WHERE dag = public.kg_ai_idag() AND status = 'klar'),
    'totalt', (SELECT jsonb_build_object('granskningar', count(*), 'elever', count(DISTINCT user_id),
                                         'kostnad_sek', coalesce(sum(kostnad_sek), 0),
                                         'forsta', min(skapad))
                 FROM public.kg_ai_granskning WHERE status = 'klar'),
    'misslyckade_manad', (SELECT count(*) FROM public.kg_ai_granskning WHERE manad = m AND status = 'fel'),
    -- de senaste 30 dagarna
    'dagar', (SELECT coalesce(jsonb_agg(jsonb_build_object('dag', dag, 'granskningar', n, 'elever', e, 'kostnad_sek', s)
                                        ORDER BY dag DESC), '[]'::jsonb)
                FROM (SELECT dag, count(*) n, count(DISTINCT user_id) e, sum(kostnad_sek) s
                        FROM public.kg_ai_granskning
                       WHERE status = 'klar' AND dag > public.kg_ai_idag() - 30 GROUP BY dag) t),
    'utfall', (SELECT coalesce(jsonb_object_agg(u, n), '{}'::jsonb)
                 FROM (SELECT coalesce(utfall, 'okant') u, count(*) n
                         FROM public.kg_ai_granskning WHERE manad = m AND status = 'klar' GROUP BY 1) t),
    'helt_korrekt_manad', (SELECT count(*) FROM public.kg_ai_granskning WHERE manad = m AND status = 'klar' AND helt_korrekt),
    'feltyper', (SELECT coalesce(jsonb_object_agg(f, n), '{}'::jsonb)
                   FROM (SELECT f, count(*) n FROM public.kg_ai_granskning, unnest(feltyper) f
                          WHERE manad = m AND status = 'klar' GROUP BY f) t),
    'kalla', (SELECT coalesce(jsonb_object_agg(kl, n), '{}'::jsonb)
                FROM (SELECT coalesce(kalla, 'okant') kl, count(*) n
                        FROM public.kg_ai_granskning WHERE manad = m AND status = 'klar' GROUP BY 1) t),
    'uppgifter', (SELECT coalesce(jsonb_agg(jsonb_build_object('kurs', kurs, 'uppgift', uppgift_id, 'n', n, 'elever', e)
                                            ORDER BY n DESC, uppgift_id), '[]'::jsonb)
                    FROM (SELECT kurs, uppgift_id, count(*) n, count(DISTINCT user_id) e
                            FROM public.kg_ai_granskning
                           WHERE status = 'klar' AND uppgift_id IS NOT NULL AND skapad > now() - interval '90 days'
                           GROUP BY kurs, uppgift_id ORDER BY count(*) DESC LIMIT 15) t),
    'elever', (SELECT coalesce(jsonb_agg(jsonb_build_object('user_id', user_id, 'manad', nm, 'totalt', nt,
                                                            'senast', senast, 'kostnad_sek', s)
                                         ORDER BY nm DESC, nt DESC), '[]'::jsonb)
                 FROM (SELECT user_id, count(*) FILTER (WHERE manad = m) nm, count(*) nt,
                              max(skapad) senast, sum(kostnad_sek) s
                         FROM public.kg_ai_granskning WHERE status = 'klar'
                        GROUP BY user_id ORDER BY count(*) FILTER (WHERE manad = m) DESC, count(*) DESC LIMIT 50) t));
END;
$$;
REVOKE ALL ON FUNCTION public.kg_ai_oversikt() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.kg_ai_oversikt() TO authenticated;
