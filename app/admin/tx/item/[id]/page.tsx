import TxItemComponent from '@/components/my/tx_item';
import { supabase } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';
import React from 'react'
type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };

export const revalidate = 0;

async function TxItem({params}: Props) {
    const id = params.id;
    const {data:tx, error} = await supabase.from('tx').select().eq('id', Number(id)).single();
    if(!tx){
       notFound();
    }

  return (
    <div><TxItemComponent tx={tx}/></div>
  )
}

export default TxItem