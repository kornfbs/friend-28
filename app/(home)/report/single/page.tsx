import { getTx28 } from '@/actions/user';
import SelectedUserReport from '@/components/my/selected_user_report';
import SingleReportComponent from '@/components/my/single_report';
import { createClient, supabase } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';
import React from 'react';


export const revalidate = 0;


async function SingleReport() {

    const { data: rows, error } = await supabase.from('user28').select();

    const select = async (user: User28) => {
        "use server"
        const supabase = createClient();
        const {data, error} = await supabase.from('tx28').select('*').eq('code', user.code).returns<Tx28[]>();
        if(data){
            return data;
        }else{
            return [];
        }


        // "use server"
        // const data = await getTx28(user.code);
        // return data;
    }


    if (!rows) {
        notFound();
    }

    return (
        <div>
            <SingleReportComponent users={rows} select={select} />
        </div>
    )
}

export default SingleReport