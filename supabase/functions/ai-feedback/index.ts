// Supabase Edge Function: AI-feedback på elevlösningar ("Få feedback på din lösning").
// Distribueras med: supabase functions deploy ai-feedback
// Hemligheter (supabase secrets set ...): OPENAI_API_KEY, AI_FEEDBACK_AKTIV=true,
// valfritt AI_FEEDBACK_MODELL, AI_FEEDBACK_ORIGINS. SUPABASE_URL, SUPABASE_ANON_KEY och
// SUPABASE_SERVICE_ROLE_KEY finns automatiskt i Supabase Edge Functions.
// Se docs/AI_FEEDBACK.md.
import { skapaHanterare } from './hanterare.js';

const env = {
  SUPABASE_URL: Deno.env.get('SUPABASE_URL') ?? '',
  SUPABASE_ANON_KEY: Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  SUPABASE_SERVICE_ROLE_KEY: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  OPENAI_API_KEY: Deno.env.get('OPENAI_API_KEY') ?? '',
  AI_FEEDBACK_AKTIV: Deno.env.get('AI_FEEDBACK_AKTIV') ?? 'false',
  AI_FEEDBACK_MODELL: Deno.env.get('AI_FEEDBACK_MODELL') ?? 'gpt-6.1-sol',
  AI_FEEDBACK_ORIGINS: Deno.env.get('AI_FEEDBACK_ORIGINS') ?? '',
};

// Loggar aldrig bilder, uppgiftstext, elevens svar eller användar-id.
const logg = (...delar: unknown[]) => console.log('[ai-feedback]', ...delar);

Deno.serve(skapaHanterare({ env, fetchFn: fetch, logg }));
