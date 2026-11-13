-- All time high för klasser ska räkna hela varje elevs samlade XP.
-- Kör hela filen i Supabase SQL Editor. Kan köras igen.
-- Kräver befintlig kg_private.klass_tak och 2026-10-11-klasstopp-summa.sql.
-- PostgreSQL LEAST(xp, NULL) = xp: den nuvarande summan blir obegränsad
-- för perioden 'alla'. Dag/vecka/månad och deras medaljer ändras inte.
-- Inga elev-XP eller gamla medaljer skrivs om. Endast beräkningsgränsen ändras.
begin;
CREATE OR REPLACE FUNCTION kg_private.klass_tak(p_period text)
 RETURNS bigint
 LANGUAGE sql
 IMMUTABLE
 SET search_path TO ''
AS $function$
  select case p_period
    when 'dag' then 400
    when 'vecka' then 2000
    when 'manad' then 6000
    when 'alla' then null
    else 30000
  end::bigint
$function$;
commit;
