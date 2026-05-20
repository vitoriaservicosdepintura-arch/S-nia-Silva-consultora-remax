import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function saveLead(lead: {
    nome: string;
    email: string;
    telefone: string;
    objetivo: string;
}) {
    const { error } = await supabase.from('leads').insert([lead]);
    if (error) throw error;
    return true;
}
