import { supabase } from "@/utils/supabase/client";
import { notFound } from "next/navigation";

async function SelectedUserReport({ txs }: { txs: Tx28[] }) {
   
    return (
        <div>
            <p>from selected report</p>
        </div>
    )
}

export default SelectedUserReport