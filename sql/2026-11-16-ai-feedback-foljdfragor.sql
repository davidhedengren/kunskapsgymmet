-- AI-feedback: följdfrågor på igen, 2026-11-16.
-- Användarbeslut: eleven ska kunna fråga vidare om var den tänkte fel och hur den ska motivera
-- ("Varför är det steget fel?", "Hur ska jag motivera det steget?"). Två följdfrågor per granskning.
-- Samma inställning finns i Kunskapsgymmets adminöversikt för AI-feedback ("Följdfrågor per granskning").
-- Kör i Supabase SQL Editor. Kräver sql/2026-11-13-ai-feedback.sql.

UPDATE public.kg_ai_konfig
   SET foljdfragor_per_gransk = 2
 WHERE id = true;

ALTER TABLE public.kg_ai_konfig ALTER COLUMN foljdfragor_per_gransk SET DEFAULT 2;
