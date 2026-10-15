-- Startsidans "registrerade användare" ska räkna samma konton som adminvyn.
-- Tidigare räknade kg_public_stats() alla konton i auth.users, även konton som
-- bara hör till Uppgiftslabbet. Nu används samma villkor som kg_admin_anvandare():
-- kontot har Kunskapsgymmet-användning, närvaro, aktivitet idag eller skapades
-- från Kunskapsgymmet. Lösta uppgifter och aktiva användare är oförändrade.
-- Funktionen returnerar bara totalsiffror, inga personuppgifter.
BEGIN;

CREATE OR REPLACE FUNCTION public.kg_public_stats()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'auth'
AS $function$
  select jsonb_build_object(
    'users', (
      select count(*) from auth.users u
      where exists (select 1 from public.app_anvandning a
                    where a.user_id = u.id and a.app = 'kunskapsgymmet')
         or exists (select 1 from public.kg_narvaro n where n.user_id = u.id)
         or exists (select 1 from public.kg_dagstat d
                    where d.user_id = u.id
                      and d.dag = (now() at time zone 'Europe/Stockholm')::date)
         or coalesce(u.raw_user_meta_data->>'app','') = 'kunskapsgymmet'
    ),
    'attempts',   coalesce((select sum(attempts) from public.kg_usage_stats), 0),
    'active_7d',  (select count(*) from public.kg_usage_stats where last_active_at >= now() - interval '7 days'),
    'active_30d', (select count(*) from public.kg_usage_stats where last_active_at >= now() - interval '30 days')
  );
$function$;

COMMIT;

-- Återställning till tidigare version vid behov: ersätt 'users'-raden med
--   'users', (select count(*) from auth.users),
