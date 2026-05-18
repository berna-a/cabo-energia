// Reexporta o cliente gerido pela Lovable Cloud para manter compatibilidade
// com o resto da app (LeadForm e afins).
import { supabase as cloudClient } from "@/integrations/supabase/client";

export const supabase = cloudClient;
export const isSupabaseConfigured = () => true;
