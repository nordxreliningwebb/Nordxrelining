import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ubaolkuyccfyurphdmgf.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_CfltW1c2YJf0V9jC3poE9Q_FmaBjxCI";

if (!supabaseServiceKey && process.env.NODE_ENV === 'production') {
  console.warn("VARNING: SUPABASE_SERVICE_ROLE_KEY saknas i produktionsmiljön!");
}

// Denna klient bypassar all RLS-säkerhet.
// FÅR ABSOLUT INTE importeras i client components. Endast för server-side logik (API, Server Actions) där systemåtgärder krävs.
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey || "sb_publishable_dummy_key_for_build"
);

// Denna klient används för att utföra anrop som respekterar RLS (Row-Level Security)
// genom att skicka med inloggad användares accessToken.
export const createSessionClient = (accessToken: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
};
