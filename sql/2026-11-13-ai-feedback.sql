-- AI-feedback på elevlösningar ("Få feedback på din lösning"), 2026-11-13.
-- Kör i Supabase → SQL Editor. Idempotent: kan köras om.
--
-- Säkerhetsmodell
-- * Alla tabeller har RLS påslaget utan policyer och inga rättigheter för anon/authenticated.
--   Elever kan alltså inte läsa eller ändra något direkt.
-- * Reservation och avräkning görs bara av Edge Function `ai-feedback` med service_role.
-- * Månadsbudgeten reserveras med EN villkorad UPDATE per anrop. Postgres låser raden och
--   omprövar villkoret efter varje samtidig uppdatering, så parallella anrop kan aldrig
--   tillsammans reservera mer än budgeten.
-- * En elevs anrop serialiseras med ett transaktionslås (pg_advisory_xact_lock), så parallella
--   granskningar inte kan kringgå dagsgränsen.
-- * Funktionen är avstängd tills kg_ai_konfig.aktiv sätts till true.

-- ---------------------------------------------------------------- konfiguration
CREATE TABLE IF NOT EXISTS public.kg_ai_konfig (
  id                     boolean PRIMARY KEY DEFAULT true CHECK (id),
  aktiv                  boolean NOT NULL DEFAULT false,
  manadsbudget_sek       numeric NOT NULL DEFAULT 150 CHECK (manadsbudget_sek >= 0 AND manadsbudget_sek < 200),
  usd_sek                numeric NOT NULL DEFAULT 12.0 CHECK (usd_sek > 0),    -- medvetet högt (marginal för kurs)
  granskningar_per_dag   integer NOT NULL DEFAULT 3 CHECK (granskningar_per_dag BETWEEN 0 AND 50),
  foljdfragor_per_gransk integer NOT NULL DEFAULT 2 CHECK (foljdfragor_per_gransk BETWEEN 0 AND 10),
  modell                 text    NOT NULL DEFAULT 'gpt-5.4-mini',
  pris_in_usd_mtok       numeric NOT NULL DEFAULT 0.75,   -- standardpris per 1 miljon indatatoken
  pris_cachad_usd_mtok   numeric NOT NULL DEFAULT 0.075,
  pris_ut_usd_mtok       numeric NOT NULL DEFAULT 4.50,   -- utdata inklusive resonemangstoken
  bild_tokens_max        integer NOT NULL DEFAULT 3000,   -- detail "high": högst 2 500 patchar × 1,2
  fasta_tokens           integer NOT NULL DEFAULT 600,    -- meddelandeformat, schema m.m.
  sakerhetsfaktor        numeric NOT NULL DEFAULT 1.25 CHECK (sakerhetsfaktor >= 1),
  avrakningsfaktor       numeric NOT NULL DEFAULT 1.05 CHECK (avrakningsfaktor >= 1),
  max_reservation_sek    numeric NOT NULL DEFAULT 1.50,   -- enskilt anrop får aldrig reservera mer
  kontext_timmar         integer NOT NULL DEFAULT 24,     -- textkontext för följdfrågor sparas så länge
  uppdaterad             timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.kg_ai_konfig (id) VALUES (true) ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------- månadsbudget
CREATE TABLE IF NOT EXISTS public.kg_ai_manad (
  manad        date PRIMARY KEY,                -- första dagen i månaden (Europe/Stockholm)
  reserverat   numeric NOT NULL DEFAULT 0 CHECK (reserverat >= 0),
  forbrukat    numeric NOT NULL DEFAULT 0 CHECK (forbrukat >= 0),
  anrop        integer NOT NULL DEFAULT 0,
  granskningar integer NOT NULL DEFAULT 0,
  foljdfragor  integer NOT NULL DEFAULT 0,
  nekade       integer NOT NULL DEFAULT 0
);

-- ---------------------------------------------------------------- granskningar och anrop
-- Inga bilder och inga namn sparas. kontext innehåller bara text som behövs för följdfrågor
-- (uppgiftens och lösningens tolkning samt återkopplingen) och töms efter kontext_timmar.
CREATE TABLE IF NOT EXISTS public.kg_ai_granskning (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL,
  skapad      timestamptz NOT NULL DEFAULT now(),
  dag         date NOT NULL,
  manad       date NOT NULL,
  status      text NOT NULL DEFAULT 'pagar' CHECK (status IN ('pagar','klar','fel')),
  foljdfragor integer NOT NULL DEFAULT 0,
  kostnad_sek numeric NOT NULL DEFAULT 0,
  kontext     jsonb
);
CREATE INDEX IF NOT EXISTS kg_ai_granskning_user_dag ON public.kg_ai_granskning (user_id, dag);

CREATE TABLE IF NOT EXISTS public.kg_ai_anrop (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  granskning_id  uuid NOT NULL REFERENCES public.kg_ai_granskning(id) ON DELETE CASCADE,
  user_id        uuid NOT NULL,
  typ            text NOT NULL CHECK (typ IN ('granskning','foljdfraga')),
  manad          date NOT NULL,
  skapad         timestamptz NOT NULL DEFAULT now(),
  reserverat_sek numeric NOT NULL,
  faktiskt_sek   numeric,
  in_tokens      integer,
  cachade_tokens integer,
  ut_tokens      integer,
  status         text NOT NULL DEFAULT 'reserverat' CHECK (status IN ('reserverat','avraknat'))
);
CREATE INDEX IF NOT EXISTS kg_ai_anrop_status ON public.kg_ai_anrop (status, skapad);
CREATE INDEX IF NOT EXISTS kg_ai_anrop_user ON public.kg_ai_anrop (user_id, status);

ALTER TABLE public.kg_ai_konfig     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kg_ai_manad      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kg_ai_granskning ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kg_ai_anrop      ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.kg_ai_konfig, public.kg_ai_manad, public.kg_ai_granskning, public.kg_ai_anrop FROM anon, authenticated, public;

-- ---------------------------------------------------------------- hjälpfunktioner
CREATE OR REPLACE FUNCTION public.kg_ai_idag() RETURNS date
LANGUAGE sql STABLE SET search_path = public AS
$$ SELECT (now() AT TIME ZONE 'Europe/Stockholm')::date $$;

CREATE OR REPLACE FUNCTION public.kg_ai_denna_manad() RETURNS date
LANGUAGE sql STABLE SET search_path = public AS
$$ SELECT date_trunc('month', now() AT TIME ZONE 'Europe/Stockholm')::date $$;

-- Konservativ övre gräns för ett anrop i SEK.
CREATE OR REPLACE FUNCTION public.kg_ai_reservationsbelopp(p_bilder integer, p_tecken integer, p_max_ut integer)
RETURNS numeric LANGUAGE sql STABLE SET search_path = public AS
$$
  SELECT ((greatest(p_bilder,0) * k.bild_tokens_max
           + ceil(greatest(p_tecken,0) / 2.0)          -- svensk text: minst 1 token per 2 tecken (i praktiken ~3–4)
           + k.fasta_tokens) * k.pris_in_usd_mtok
          + greatest(p_max_ut,0) * k.pris_ut_usd_mtok) / 1e6
         * k.usd_sek * k.sakerhetsfaktor
  FROM public.kg_ai_konfig k
$$;

-- Faktisk kostnad i SEK från rapporterad tokenförbrukning.
CREATE OR REPLACE FUNCTION public.kg_ai_faktisk_kostnad(p_in integer, p_cachade integer, p_ut integer)
RETURNS numeric LANGUAGE sql STABLE SET search_path = public AS
$$
  SELECT ((greatest(p_in - greatest(p_cachade,0),0) * k.pris_in_usd_mtok
           + greatest(p_cachade,0) * k.pris_cachad_usd_mtok
           + greatest(p_ut,0) * k.pris_ut_usd_mtok) / 1e6)
         * k.usd_sek * k.avrakningsfaktor
  FROM public.kg_ai_konfig k
$$;

-- Städning: reservationer som aldrig avräknats (avbruten funktion) räknas som förbrukade
-- med hela beloppet, och sparad textkontext tas bort när den gått ut.
CREATE OR REPLACE FUNCTION public.kg_ai_stada() RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS
$$
DECLARE r record;
BEGIN
  FOR r IN SELECT * FROM public.kg_ai_anrop
           WHERE status = 'reserverat' AND skapad < now() - interval '10 minutes'
           FOR UPDATE SKIP LOCKED LOOP
    UPDATE public.kg_ai_manad SET reserverat = greatest(reserverat - r.reserverat_sek, 0),
                                  forbrukat  = forbrukat + r.reserverat_sek
     WHERE manad = r.manad;
    UPDATE public.kg_ai_anrop SET status = 'avraknat', faktiskt_sek = r.reserverat_sek WHERE id = r.id;
    UPDATE public.kg_ai_granskning SET status = 'fel' WHERE id = r.granskning_id AND status = 'pagar';
  END LOOP;
  UPDATE public.kg_ai_granskning g SET kontext = NULL
   WHERE kontext IS NOT NULL
     AND skapad < now() - make_interval(hours => (SELECT kontext_timmar FROM public.kg_ai_konfig));
  DELETE FROM public.kg_ai_granskning WHERE skapad < now() - interval '400 days';
END;
$$;

-- ---------------------------------------------------------------- reservation (service_role)
-- p_typ 'granskning': ny granskning (p_granskning ignoreras). 'foljdfraga': p_granskning krävs.
CREATE OR REPLACE FUNCTION public.kg_ai_reservera(p_user uuid, p_typ text, p_granskning uuid,
                                                  p_bilder integer, p_tecken integer, p_max_ut integer)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS
$$
DECLARE
  k public.kg_ai_konfig;
  m date := public.kg_ai_denna_manad();
  d date := public.kg_ai_idag();
  belopp numeric;
  g public.kg_ai_granskning;
  ny_g uuid;
  ny_a uuid;
  antal integer;
BEGIN
  IF p_user IS NULL OR p_typ NOT IN ('granskning','foljdfraga') THEN
    RETURN jsonb_build_object('ok', false, 'fel', 'ogiltig_begaran');
  END IF;
  PERFORM public.kg_ai_stada();
  SELECT * INTO k FROM public.kg_ai_konfig WHERE id;
  IF NOT FOUND OR NOT k.aktiv THEN
    RETURN jsonb_build_object('ok', false, 'fel', 'avstangd');
  END IF;

  belopp := public.kg_ai_reservationsbelopp(p_bilder, p_tecken, p_max_ut);
  IF belopp IS NULL OR belopp <= 0 OR belopp > k.max_reservation_sek THEN
    RETURN jsonb_build_object('ok', false, 'fel', 'for_stor_begaran');
  END IF;

  -- En elev i taget: parallella anrop från samma konto väntar här.
  PERFORM pg_advisory_xact_lock(hashtext('kg_ai_' || p_user::text));

  IF EXISTS (SELECT 1 FROM public.kg_ai_anrop
             WHERE user_id = p_user AND status = 'reserverat') THEN
    RETURN jsonb_build_object('ok', false, 'fel', 'pagar_redan');
  END IF;

  IF p_typ = 'granskning' THEN
    SELECT count(*) INTO antal FROM public.kg_ai_granskning
     WHERE user_id = p_user AND dag = d AND status IN ('pagar','klar');
    IF antal >= k.granskningar_per_dag THEN
      RETURN jsonb_build_object('ok', false, 'fel', 'dagsgrans', 'grans', k.granskningar_per_dag);
    END IF;
  ELSE
    SELECT * INTO g FROM public.kg_ai_granskning WHERE id = p_granskning FOR UPDATE;
    IF NOT FOUND OR g.user_id <> p_user THEN
      RETURN jsonb_build_object('ok', false, 'fel', 'okand_granskning');
    END IF;
    IF g.status <> 'klar' OR g.kontext IS NULL THEN
      RETURN jsonb_build_object('ok', false, 'fel', 'granskning_ej_tillganglig');
    END IF;
    IF g.foljdfragor >= k.foljdfragor_per_gransk THEN
      RETURN jsonb_build_object('ok', false, 'fel', 'foljdgrans', 'grans', k.foljdfragor_per_gransk);
    END IF;
  END IF;

  INSERT INTO public.kg_ai_manad (manad) VALUES (m) ON CONFLICT (manad) DO NOTHING;

  -- Atomär reservation: lyckas bara om hela beloppet ryms i månadens budget.
  UPDATE public.kg_ai_manad
     SET reserverat = reserverat + belopp, anrop = anrop + 1
   WHERE manad = m AND reserverat + forbrukat + belopp <= k.manadsbudget_sek;
  IF NOT FOUND THEN
    UPDATE public.kg_ai_manad SET nekade = nekade + 1 WHERE manad = m;
    RETURN jsonb_build_object('ok', false, 'fel', 'budget_slut');
  END IF;

  IF p_typ = 'granskning' THEN
    INSERT INTO public.kg_ai_granskning (user_id, dag, manad) VALUES (p_user, d, m) RETURNING id INTO ny_g;
  ELSE
    ny_g := g.id;
    UPDATE public.kg_ai_granskning SET foljdfragor = foljdfragor + 1 WHERE id = g.id;
  END IF;
  INSERT INTO public.kg_ai_anrop (granskning_id, user_id, typ, manad, reserverat_sek)
  VALUES (ny_g, p_user, p_typ, m, belopp) RETURNING id INTO ny_a;

  RETURN jsonb_build_object('ok', true, 'anrop', ny_a, 'granskning', ny_g, 'reserverat_sek', belopp,
                            'modell', k.modell, 'kontext', CASE WHEN p_typ = 'foljdfraga' THEN g.kontext END,
                            'foljdfragor_kvar', CASE WHEN p_typ = 'foljdfraga'
                                                     THEN k.foljdfragor_per_gransk - g.foljdfragor - 1
                                                     ELSE k.foljdfragor_per_gransk END);
END;
$$;

-- ---------------------------------------------------------------- avräkning (service_role)
-- p_utfall: 'ok'         svar mottaget, tokenförbrukning rapporterad
--           'debiterat'  modellen svarade men svaret gick inte att använda (förbrukning rapporterad)
--           'ej_skickat' anropet nådde aldrig modellen (t.ex. ogiltig bild som stoppades före anrop)
--           'okand'      timeout/nätverksfel: förbrukningen okänd, hela reservationen räknas som förbrukad
CREATE OR REPLACE FUNCTION public.kg_ai_avrakna(p_anrop uuid, p_utfall text, p_in integer, p_cachade integer,
                                                p_ut integer, p_kontext jsonb)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS
$$
DECLARE a public.kg_ai_anrop; kost numeric;
BEGIN
  SELECT * INTO a FROM public.kg_ai_anrop WHERE id = p_anrop AND status = 'reserverat' FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('ok', false, 'fel', 'redan_avraknad'); END IF;

  kost := CASE
    WHEN p_utfall IN ('ok','debiterat') AND p_in IS NOT NULL AND p_ut IS NOT NULL
      THEN public.kg_ai_faktisk_kostnad(p_in, coalesce(p_cachade,0), p_ut)
    WHEN p_utfall = 'ej_skickat' THEN 0
    ELSE a.reserverat_sek END;

  UPDATE public.kg_ai_manad
     SET reserverat = greatest(reserverat - a.reserverat_sek, 0),
         forbrukat  = forbrukat + kost,
         granskningar = granskningar + CASE WHEN a.typ = 'granskning' AND p_utfall = 'ok' THEN 1 ELSE 0 END,
         foljdfragor  = foljdfragor  + CASE WHEN a.typ = 'foljdfraga' AND p_utfall = 'ok' THEN 1 ELSE 0 END
   WHERE manad = a.manad;

  UPDATE public.kg_ai_anrop
     SET status = 'avraknat', faktiskt_sek = kost, in_tokens = p_in, cachade_tokens = p_cachade, ut_tokens = p_ut
   WHERE id = a.id;

  IF a.typ = 'granskning' THEN
    UPDATE public.kg_ai_granskning
       SET status = CASE WHEN p_utfall = 'ok' THEN 'klar' ELSE 'fel' END,
           kostnad_sek = kostnad_sek + kost,
           kontext = CASE WHEN p_utfall = 'ok' THEN p_kontext END
     WHERE id = a.granskning_id;
  ELSE
    UPDATE public.kg_ai_granskning
       SET kostnad_sek = kostnad_sek + kost,
           foljdfragor = CASE WHEN p_utfall = 'ok' THEN foljdfragor ELSE greatest(foljdfragor - 1, 0) END,
           kontext = CASE WHEN p_utfall = 'ok' AND p_kontext IS NOT NULL THEN p_kontext ELSE kontext END
     WHERE id = a.granskning_id;
  END IF;
  RETURN jsonb_build_object('ok', true, 'kostnad_sek', kost);
END;
$$;

-- ---------------------------------------------------------------- elevens status (authenticated)
CREATE OR REPLACE FUNCTION public.kg_ai_status() RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS
$$
DECLARE k public.kg_ai_konfig; mm public.kg_ai_manad; anv integer := 0;
BEGIN
  SELECT * INTO k FROM public.kg_ai_konfig WHERE id;
  SELECT * INTO mm FROM public.kg_ai_manad WHERE manad = public.kg_ai_denna_manad();
  IF auth.uid() IS NOT NULL THEN
    SELECT count(*) INTO anv FROM public.kg_ai_granskning
     WHERE user_id = auth.uid() AND dag = public.kg_ai_idag() AND status IN ('pagar','klar');
  END IF;
  RETURN jsonb_build_object(
    'aktiv', coalesce(k.aktiv, false),
    'inloggad', auth.uid() IS NOT NULL,
    -- budgeten räknas som slut när inte ens ett litet anrop ryms
    'budget_slut', coalesce(mm.reserverat + mm.forbrukat, 0) + 0.5 > coalesce(k.manadsbudget_sek, 0),
    'per_dag', k.granskningar_per_dag,
    'kvar_idag', greatest(k.granskningar_per_dag - anv, 0),
    'foljdfragor', k.foljdfragor_per_gransk);
END;
$$;

-- ---------------------------------------------------------------- adminöversikt
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
                   FROM (SELECT * FROM public.kg_ai_manad WHERE manad < m ORDER BY manad DESC LIMIT 6) x),
    'dagar', (SELECT coalesce(jsonb_agg(jsonb_build_object('dag', dag, 'granskningar', n, 'elever', e, 'kostnad_sek', s)
                                        ORDER BY dag DESC), '[]'::jsonb)
                FROM (SELECT dag, count(*) n, count(DISTINCT user_id) e, sum(kostnad_sek) s
                        FROM public.kg_ai_granskning WHERE manad = m GROUP BY dag) t),
    'elever_manad', (SELECT count(DISTINCT user_id) FROM public.kg_ai_granskning WHERE manad = m));
END;
$$;

-- Admin kan slå på/av funktionen och ändra gränser utan SQL Editor.
CREATE OR REPLACE FUNCTION public.kg_ai_satt_konfig(p_aktiv boolean, p_budget numeric,
                                                    p_per_dag integer, p_foljd integer)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS
$$
BEGIN
  IF NOT public.kg_ar_admin() THEN RAISE EXCEPTION 'kg:ej_admin'; END IF;
  UPDATE public.kg_ai_konfig SET
    aktiv = coalesce(p_aktiv, aktiv),
    manadsbudget_sek = coalesce(p_budget, manadsbudget_sek),
    granskningar_per_dag = coalesce(p_per_dag, granskningar_per_dag),
    foljdfragor_per_gransk = coalesce(p_foljd, foljdfragor_per_gransk),
    uppdaterad = now()
  WHERE id;
  RETURN public.kg_ai_oversikt();
END;
$$;

-- ---------------------------------------------------------------- rättigheter
REVOKE ALL ON FUNCTION public.kg_ai_stada() FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.kg_ai_reservera(uuid, text, uuid, integer, integer, integer) FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.kg_ai_avrakna(uuid, text, integer, integer, integer, jsonb) FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.kg_ai_reservationsbelopp(integer, integer, integer) FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.kg_ai_faktisk_kostnad(integer, integer, integer) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.kg_ai_reservera(uuid, text, uuid, integer, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.kg_ai_avrakna(uuid, text, integer, integer, integer, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.kg_ai_stada() TO service_role;

REVOKE ALL ON FUNCTION public.kg_ai_status() FROM public;
GRANT EXECUTE ON FUNCTION public.kg_ai_status() TO anon, authenticated;
REVOKE ALL ON FUNCTION public.kg_ai_oversikt() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.kg_ai_oversikt() TO authenticated;
REVOKE ALL ON FUNCTION public.kg_ai_satt_konfig(boolean, numeric, integer, integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.kg_ai_satt_konfig(boolean, numeric, integer, integer) TO authenticated;
