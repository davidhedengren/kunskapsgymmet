-- Kunskapsgymmet: önskemål och allmänna problem, även utanför en uppgift.
-- Kräver auth.users och public.kg_ar_admin(). Kör hela filen i SQL Editor.
BEGIN;
CREATE SCHEMA IF NOT EXISTS kg_private;
CREATE TABLE IF NOT EXISTS kg_private.onskemal (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  request_id uuid NOT NULL,
  typ text NOT NULL CHECK (typ IN ('fler_uppgifter','funktion','problem')),
  kurs text,
  omrade text,
  niva text CHECK (niva IN ('1','2','3','4','5','blandad')),
  beskrivning text NOT NULL CHECK (char_length(beskrivning) BETWEEN 1 AND 2000),
  status text NOT NULL DEFAULT 'oppen' CHECK (status IN ('oppen','pagar','atgardad','avslutad')),
  kommentar text CHECK (char_length(kommentar) <= 1000),
  skapad timestamptz NOT NULL DEFAULT now(),
  granskad timestamptz,
  UNIQUE (user_id,request_id)
);
CREATE INDEX IF NOT EXISTS kg_onskemal_skapad_idx ON kg_private.onskemal(skapad DESC);
ALTER TABLE kg_private.onskemal ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON kg_private.onskemal FROM public,anon,authenticated;
REVOKE ALL ON SEQUENCE kg_private.onskemal_id_seq FROM public,anon,authenticated;

CREATE OR REPLACE FUNCTION public.kg_skicka_onskemal(p_request uuid,p_typ text,p_kurs text,p_omrade text,p_niva text,p_beskrivning text)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $fn$
DECLARE uid uuid:=auth.uid(); v_text text:=btrim(coalesce(p_beskrivning,'')); v_area text:=nullif(btrim(coalesce(p_omrade,'')),''); v_id bigint;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'kg:inloggning_kravs' USING ERRCODE='42501'; END IF;
  IF p_request IS NULL OR p_typ IS NULL OR p_typ NOT IN ('fler_uppgifter','funktion','problem')
    OR char_length(v_text) NOT BETWEEN 1 AND 2000 THEN
    RAISE EXCEPTION 'kg:ogiltigt_onskemal' USING ERRCODE='22023';
  END IF;
  IF p_kurs IS NOT NULL AND p_kurs NOT IN ('ma1','ma2','mato1','mato2','matf1','fy1','fy2','hist') THEN
    RAISE EXCEPTION 'kg:ogiltig_kurs' USING ERRCODE='22023';
  END IF;
  IF p_typ='fler_uppgifter' AND (p_kurs IS NULL OR v_area IS NULL OR char_length(v_area)>160 OR p_niva IS NULL OR p_niva NOT IN ('1','2','3','4','5','blandad')) THEN
    RAISE EXCEPTION 'kg:ange_omrade' USING ERRCODE='22023';
  END IF;
  -- Ett återförsök efter nätverksfel ska aldrig skapa samma inskick två gånger.
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(uid::text,0));
  SELECT o.id INTO v_id FROM kg_private.onskemal o WHERE o.user_id=uid AND o.request_id=p_request;
  IF v_id IS NOT NULL THEN RETURN jsonb_build_object('ok',true,'id',v_id); END IF;
  IF (SELECT count(*) FROM kg_private.onskemal o WHERE o.user_id=uid AND o.skapad>now()-interval '1 hour')>=20 THEN
    RAISE EXCEPTION 'kg:for_manga_onskemal' USING ERRCODE='22023';
  END IF;
  INSERT INTO kg_private.onskemal(user_id,request_id,typ,kurs,omrade,niva,beskrivning)
  VALUES(uid,p_request,p_typ,p_kurs,CASE WHEN p_typ='fler_uppgifter' THEN v_area END,CASE WHEN p_typ='fler_uppgifter' THEN p_niva END,v_text)
  RETURNING id INTO v_id;
  RETURN jsonb_build_object('ok',true,'id',v_id);
END $fn$;

CREATE OR REPLACE FUNCTION public.kg_mina_onskemal()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $fn$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'kg:inloggning_kravs' USING ERRCODE='42501'; END IF;
  RETURN coalesce((SELECT jsonb_agg(to_jsonb(r) ORDER BY r.skapad DESC,r.id DESC) FROM (
    SELECT o.id,o.typ,o.kurs,o.omrade,o.niva,o.beskrivning,o.status,o.kommentar,o.skapad,o.granskad
    FROM kg_private.onskemal o WHERE o.user_id=auth.uid() ORDER BY o.skapad DESC,o.id DESC LIMIT 1000
  ) r),'[]'::jsonb);
END $fn$;

CREATE OR REPLACE FUNCTION public.kg_admin_onskemal()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $fn$
BEGIN
  IF auth.uid() IS NULL OR NOT coalesce(public.kg_ar_admin(),false) THEN
    RAISE EXCEPTION 'kg:ej_admin' USING ERRCODE='42501';
  END IF;
  RETURN coalesce((SELECT jsonb_agg(to_jsonb(r) ORDER BY r.skapad DESC,r.id DESC) FROM (
    SELECT o.*,coalesce(nullif(u.raw_user_meta_data->>'full_name',''),nullif(u.raw_user_meta_data->>'name',''),u.email,'Okänd') AS rapportor_namn,
      u.email AS rapportor_epost
    FROM kg_private.onskemal o JOIN auth.users u ON u.id=o.user_id ORDER BY o.skapad DESC,o.id DESC LIMIT 1000
  ) r),'[]'::jsonb);
END $fn$;

CREATE OR REPLACE FUNCTION public.kg_admin_onskemal_status(p_id bigint,p_status text,p_kommentar text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $fn$
DECLARE v_comment text:=nullif(btrim(coalesce(p_kommentar,'')),'');
BEGIN
  IF auth.uid() IS NULL OR NOT coalesce(public.kg_ar_admin(),false) THEN
    RAISE EXCEPTION 'kg:ej_admin' USING ERRCODE='42501';
  END IF;
  IF p_status IS NULL OR p_status NOT IN ('oppen','pagar','atgardad','avslutad') OR char_length(v_comment)>1000 THEN
    RAISE EXCEPTION 'kg:ogiltig_granskning' USING ERRCODE='22023';
  END IF;
  UPDATE kg_private.onskemal SET status=p_status,kommentar=v_comment,granskad=now() WHERE id=p_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'kg:onskemal_saknas' USING ERRCODE='22023'; END IF;
  RETURN jsonb_build_object('ok',true);
END $fn$;
REVOKE ALL ON FUNCTION public.kg_skicka_onskemal(uuid,text,text,text,text,text),public.kg_mina_onskemal(),public.kg_admin_onskemal(),public.kg_admin_onskemal_status(bigint,text,text) FROM public,anon;
GRANT EXECUTE ON FUNCTION public.kg_skicka_onskemal(uuid,text,text,text,text,text),public.kg_mina_onskemal(),public.kg_admin_onskemal(),public.kg_admin_onskemal_status(bigint,text,text) TO authenticated;
NOTIFY pgrst,'reload schema';
COMMIT;
