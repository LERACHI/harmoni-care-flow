// src/integrations/supabase/client.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; 

if (!supabaseUrl || !supabaseKey) {
  console.error("ERRO CRÍTICO: Chaves do Supabase ausentes!");
  throw new Error(
    "As variáveis de ambiente do Supabase (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY) são obrigatórias e não foram carregadas. " +
    "Verifique o arquivo .env e reinicie o servidor de desenvolvimento."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);