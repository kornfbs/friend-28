'use client'

import { deleteTx } from '@/actions/user';
import { CircleX } from 'lucide-react';


function DeleteTx({ id }: {id: number}) {
    
  return (
    <div><CircleX className="h-5 w-5 text-red-700" onClick={() => deleteTx(id)}/></div>
  )
}

export default DeleteTx