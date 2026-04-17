import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

if (url && anonKey) {
  client = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
} else if (typeof window !== "undefined") {
  // eslint-disable-next-line no-console
  console.warn(
    "[CABO ENERGIA] Supabase não está configurado. Define VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = client;
export const isSupabaseConfigured = () => client !== null;
