import { createClient } from "@supabase/supabase-js";

const fallbackSupabaseUrl = "https://lheuyymjpykkwwmulmwn.supabase.co";
const fallbackSupabaseAnonKey = "sb_publishable_eYFxj-SEqQJZDFnYJx-xgQ_qFI3v7ed";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;
