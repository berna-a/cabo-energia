import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// CABO ENERGIA — cliente Supabase apontando para o projeto próprio do cliente.
// A publishable key é pública por design (protegida por RLS no servidor).
const SUPABASE_URL = "https://egzsxtgtleyjesvnioct.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_mDlZf3Zm5F0gjhz4xLtcNg_Eb1alnby";

const client: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false },
});

export const supabase = client;
export const isSupabaseConfigured = () => true;
