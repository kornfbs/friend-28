import { getTxRange } from "@/actions/user";
import ReportAllComponent from "@/components/my/report_all";
import { createClient, supabase } from "@/utils/supabase/client"
import { notFound } from "next/navigation";
import { DateRange } from "react-day-picker";


async function ReportAll() {
    const { data, error } = await supabase.from('tx').select().returns<Tx[]>();
    if (!data) {
        notFound();
    }
   
    const calc = data.reduce((acc, curr) => acc += curr.amount!, 0);


    const getRange = async (range: DateRange) => {
        "use server"
        const from = range.from?.toISOString();
        const to = range.to?.toISOString();
        const supabase = createClient();
        const {data, error } = await supabase.from('tx').select().lte('transfered_at', to)
        .gte("transfered_at", from).returns<Tx[]>();
        if(data){
            return data;
        }else{
            return [];
        }
  
        // const data = await getTxRange(range);
        // return data;
    }



    return (
        <ReportAllComponent allTx={data} calc={calc} getRange={getRange} />
    )
}

export default ReportAll