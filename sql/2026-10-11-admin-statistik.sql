-- Adminöversikt. Kräver befintlig adminstatistik v8: kg_admin_anvandare(),
-- kg_admin_anvandarstat(uuid,integer), kg_ar_admin() och kg_statistik().
-- Samlar redan registrerad data; inga IP-adresser eller nya elevhändelser lagras.
BEGIN;
CREATE SCHEMA IF NOT EXISTS kg_private;

-- Säkerställ adminbehörighet även om en äldre global statistik-RPC ännu används.
-- Bevara dess signatur och resultattyp. Klass-/gruppstatistik berörs inte.
DO $do$
DECLARE ret text; body text;
BEGIN
  IF to_regprocedure('kg_private.kg_statistik_admin_source()') IS NULL THEN
    IF to_regprocedure('public.kg_statistik()') IS NULL THEN
      RAISE EXCEPTION 'Installera befintlig statistik innan denna migrering.';
    END IF;
    SELECT pg_catalog.pg_get_function_result('public.kg_statistik()'::regprocedure) INTO ret;
    ALTER FUNCTION public.kg_statistik() SET SCHEMA kg_private;
    ALTER FUNCTION kg_private.kg_statistik() RENAME TO kg_statistik_admin_source;
    body := CASE WHEN ret ILIKE 'TABLE(%' OR ret ILIKE 'SETOF %'
      THEN 'return query select * from kg_private.kg_statistik_admin_source();'
      ELSE 'return kg_private.kg_statistik_admin_source();' END;
    EXECUTE format($f$CREATE FUNCTION public.kg_statistik() RETURNS %s
      LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $b$
      BEGIN
        IF auth.uid() IS NULL OR NOT coalesce(public.kg_ar_admin(),false) THEN
          RAISE EXCEPTION 'kg:ej_admin' USING ERRCODE='42501';
        END IF;
        %s
      END $b$;$f$,ret,body);
  END IF;
END $do$;
REVOKE ALL ON FUNCTION kg_private.kg_statistik_admin_source() FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION public.kg_statistik() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.kg_statistik() TO authenticated;

CREATE OR REPLACE FUNCTION public.kg_admin_oversikt()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $fn$
DECLARE result jsonb; legacy jsonb; users jsonb;
BEGIN
  IF auth.uid() IS NULL OR NOT coalesce(public.kg_ar_admin(),false) THEN
    RAISE EXCEPTION 'kg:ej_admin' USING ERRCODE='42501';
  END IF;
  -- Hanterar såväl TABLE/SETOF-rader som en RPC som returnerar en JSON-array.
  SELECT coalesce(jsonb_agg(to_jsonb(u)), '[]'::jsonb) INTO users
    FROM public.kg_admin_anvandare() u;
  IF jsonb_array_length(users)=1 AND jsonb_typeof(users->0)='array' THEN users:=users->0; END IF;
  SELECT to_jsonb(s) INTO legacy FROM public.kg_statistik() s;

  WITH account AS MATERIALIZED (
    SELECT x->>'user_id' AS uid, (x->>'skapad')::timestamptz AS created
    FROM jsonb_array_elements(users) x
  ), detail AS MATERIALIZED (
    SELECT a.*, to_jsonb(public.kg_admin_anvandarstat(a.uid::uuid,30)) AS data FROM account a
  ), activity AS MATERIALIZED (
    SELECT a.uid, (d->>'dag')::date AS day,
      coalesce((d->>'uppgifter')::bigint,0) AS tasks,
      coalesce((d->>'ratt')::bigint,0) AS correct,
      coalesce((d->>'inloggningar')::bigint,0) AS logins,
      coalesce((d->>'aktiv_minuter')::numeric,0) AS minutes,
      coalesce((d->>'heartbeat_antal')::bigint,0) AS beats,
      coalesce((d->>'ledtradar')::bigint,0) AS hints,
      coalesce((d->>'facit')::bigint,0) AS solutions
    FROM detail a CROSS JOIN LATERAL jsonb_array_elements(coalesce(a.data->'dagar','[]'::jsonb)) d
  ), dates AS (
    SELECT ((now() AT TIME ZONE 'Europe/Stockholm')::date - n) AS day FROM generate_series(0,29) n
  ), daily AS (
    SELECT d.day,
      coalesce(sum(a.tasks),0) AS tasks, coalesce(sum(a.correct),0) AS correct,
      coalesce(sum(a.logins),0) AS logins, coalesce(sum(a.minutes),0) AS minutes,
      coalesce(sum(a.hints),0) AS hints,coalesce(sum(a.solutions),0) AS solutions,
      coalesce(jsonb_agg(DISTINCT a.uid) FILTER (WHERE a.tasks>0 OR a.logins>0 OR a.beats>0),'[]'::jsonb) AS active_ids,
      count(DISTINCT a.uid) FILTER (WHERE a.tasks>0 OR a.logins>0 OR a.beats>0) AS active,
      (SELECT count(*) FROM account u WHERE (u.created AT TIME ZONE 'Europe/Stockholm')::date=d.day) AS new_users
    FROM dates d LEFT JOIN activity a ON a.day=d.day GROUP BY d.day
  ), courses AS (
    SELECT k->>'kurs' AS course, sum(coalesce((k->>'uppgifter')::bigint,0)) AS tasks,
      sum(coalesce((k->>'ratt')::bigint,0)) AS correct
    FROM detail a CROSS JOIN LATERAL jsonb_array_elements(coalesce(a.data->'kurser','[]'::jsonb)) k GROUP BY k->>'kurs'
  )
  SELECT jsonb_build_object(
    'idag',(now() AT TIME ZONE 'Europe/Stockholm')::date,'hamtad',now(),
    'forsta_aktivitet',(SELECT min(day) FROM activity WHERE tasks>0 OR beats>0 OR logins>0),
    'dagar',coalesce((SELECT jsonb_agg(jsonb_build_object(
      'dag',d.day,'uppgifter',d.tasks,'ratt',d.correct,'inloggningar',d.logins,
      'aktiv_minuter',d.minutes,'ledtradar',d.hints,'facit',d.solutions,
      'aktiva',d.active,'aktiva_ids',d.active_ids,'nya',d.new_users) ORDER BY d.day) FROM daily d),'[]'::jsonb),
    'kurser',coalesce((SELECT jsonb_agg(jsonb_build_object('kurs',course,'uppgifter',tasks,'ratt',correct) ORDER BY tasks DESC) FROM courses),'[]'::jsonb),
    'global',coalesce(legacy,'{}'::jsonb)
  ) INTO result;
  RETURN result;
END $fn$;
REVOKE ALL ON FUNCTION public.kg_admin_oversikt() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.kg_admin_oversikt() TO authenticated;
NOTIFY pgrst, 'reload schema';
COMMIT;
