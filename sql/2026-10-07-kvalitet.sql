-- =====================================================================
-- Kunskapsgymmet: kvalitetsgranskning av uppgiftsbankerna (admin)
-- Fynd som admin har bedömt som OK sparas här, så att de inte visas igen.
-- Signaturen beskriver fyndet; ändras uppgiften så att fyndet ser annorlunda
-- ut visas det på nytt. Kör hela filen i Supabase → SQL Editor. Den kan köras
-- om utan skada.
-- =====================================================================

begin;

create table if not exists kg_private.kvalitet_ok (
  kurs      text not null,
  uppgift   text not null,
  kontroll  text not null,
  signatur  text not null default '',
  satt      timestamptz not null default now(),
  satt_av   uuid,
  primary key (kurs, uppgift, kontroll)
);

CREATE OR REPLACE FUNCTION public.kg_admin_kvalitet_ok_lista()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  return jsonb_build_object('ok',true,'lista',coalesce((
    select jsonb_agg(jsonb_build_object('kurs',kurs,'uppgift',uppgift,'kontroll',kontroll,'signatur',signatur))
      from kg_private.kvalitet_ok), '[]'::jsonb));
end $function$;

CREATE OR REPLACE FUNCTION public.kg_admin_kvalitet_ok(p_kurs text, p_uppgift text, p_kontroll text, p_signatur text, p_ok boolean)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  if not coalesce(public.kg_ar_admin(),false) then return jsonb_build_object('ok',false,'code','admin_kravs'); end if;
  if coalesce(p_ok,true) then
    insert into kg_private.kvalitet_ok(kurs,uppgift,kontroll,signatur,satt,satt_av)
    values (p_kurs,p_uppgift,p_kontroll,coalesce(p_signatur,''),now(),auth.uid())
    on conflict (kurs,uppgift,kontroll) do update set signatur = excluded.signatur, satt = now(), satt_av = excluded.satt_av;
  else
    delete from kg_private.kvalitet_ok where kurs = p_kurs and uppgift = p_uppgift and kontroll = p_kontroll;
  end if;
  return jsonb_build_object('ok',true);
end $function$;

revoke all on function public.kg_admin_kvalitet_ok_lista() from public, anon;
revoke all on function public.kg_admin_kvalitet_ok(text,text,text,text,boolean) from public, anon;
grant execute on function public.kg_admin_kvalitet_ok_lista() to authenticated;
grant execute on function public.kg_admin_kvalitet_ok(text,text,text,text,boolean) to authenticated;

commit;
