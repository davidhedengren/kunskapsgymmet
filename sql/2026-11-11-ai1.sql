-- Kursen Artificiell intelligens nivå 1 (kurs-ID ai), 2026-11-11, version 2.
-- Kördes i Supabase 2026-11-11.
--
-- Lägger till 'ai' i alla kurslistor som slutar med 'fy2','hist'), i de funktioner
-- som finns i databasen. Funktionerna letas upp efter innehåll, inte efter namn:
-- version 1 föll på att kg_private.uppdragsbok_delta (sql/2026-10-14-uppdragsbok.sql)
-- inte finns i databasen. Resultat 2026-11-11: kg_skicka_onskemal uppdaterad.
-- Gruppkursfunktionerna (kg_lar_grupp_kurs, kg_lar_grupp_skapa_kurs) har en lista
-- utan 'hist' och ändras inte; AI finns, liksom Historia, ännu inte i lärarvyn.
-- Kan köras igen.
begin;
do $$
declare r record; def text; ny text; n int := 0;
begin
  for r in
    select p.oid::regprocedure as f
    from pg_catalog.pg_proc p
    join pg_catalog.pg_namespace s on s.oid = p.pronamespace
    where s.nspname in ('public','kg_private')
      and p.prokind = 'f'
      and p.prosrc like '%''fy2'',''hist'')%'
  loop
    def := pg_catalog.pg_get_functiondef(r.f);
    ny := replace(def, '''fy2'',''hist'')', '''fy2'',''hist'',''ai'')');
    execute ny;
    n := n + 1;
    raise notice '% uppdaterad', r.f;
  end loop;
  raise notice '% funktioner uppdaterade', n;
end $$;
commit;

-- Kontroll: alla funktioner som har en kurslista med 'fy2'.
-- Väntat: kg_skicka_onskemal true, de två gruppkursfunktionerna false.
select p.oid::regprocedure as funktion,
       p.prosrc like '%''ai''%' as har_ai
from pg_catalog.pg_proc p
join pg_catalog.pg_namespace s on s.oid = p.pronamespace
where s.nspname in ('public','kg_private')
  and p.prosrc like '%''fy2''%'
order by 1;
