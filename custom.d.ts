import type { Database as DB } from '@/types/supabase';


declare global {
    type Database = DB;
    type User28 = DB["public"]["Tables"]["user28"]["Row"];
    type Tx28 = DB["public"]["Tables"]["tx28"]["Row"];
    type Tx = DB['public']['Views']['tx']['Row'];
    type ApiReturn = {
        type?: string;
        message?: string;
        errors?: string | null;
    }
    
    
    
}

export default global;