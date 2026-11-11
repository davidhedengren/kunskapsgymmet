-- Kursen Artificiell intelligens nivå 1 (kurs-ID ai) i lärarvyn, 2026-11-11.
-- Kör i Supabase INNAN index.html med AI i lärarvyn publiceras.
--
-- Gruppkursfunktionerna (kg_lar_grupp_kurs, kg_lar_grupp_skapa_kurs) har en kurslista
-- som slutar med 'fy1','fy2'). Där läggs 'ai' till, så att en lärare kan skapa en
-- grupp med AI som kurs eller byta en grupps kurs till AI. Funktionerna letas upp
-- efter innehåll, inte efter namn, eftersom databasens version kan skilja sig från
-- filerna i sql/. Listor som redan har 'ai' eller som slutar med 'hist' berörs inte.
-- Träningspassen kräver ingen ändring: kg_prov godtar alla kurs-ID enligt
-- kurs ~ '^[a-z0-9]{2,8}$'.
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
      and p.prosrc like '%''fy1'',''fy2'')%'
  loop
    def := pg_catalog.pg_get_functiondef(r.f);
    ny := replace(def, '''fy1'',''fy2'')', '''fy1'',''fy2'',''ai'')');
    execute ny;
    n := n + 1;
    raise notice '% uppdaterad', r.f;
  end loop;
  raise notice '% funktioner uppdaterade', n;
end $$;
commit;

-- Kontroll: alla funktioner som har en kurslista med 'fy2'.
-- Väntat: alla tre har har_ai = true
-- (kg_lar_grupp_kurs, kg_lar_grupp_skapa_kurs, kg_skicka_onskemal).
select p.oid::regprocedure as funktion,
       p.prosrc like '%''ai''%' as har_ai
from pg_catalog.pg_proc p
join pg_catalog.pg_namespace s on s.oid = p.pronamespace
where s.nspname in ('public','kg_private')
  and p.prosrc like '%''fy2''%'
order by 1;
