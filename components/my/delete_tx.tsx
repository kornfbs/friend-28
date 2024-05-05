'use client'

import { deleteTx } from '@/actions/user';
import { CircleX } from 'lucide-react';
import ConfirmDialog from './confirm_dialog';


function DeleteTx({ id }: { id: number }) {

  const confirm = () => {
    deleteTx(id);
  }

  return (
    <ConfirmDialog
      icon={CircleX}
      confirm={confirm}
      title='ลบ'
      description=''
      className='h-6 w-6 text-red-700'
    />
  )
}

export default DeleteTx


/*

        <MyConfirmDialog
          open={open}
          setOpen={setOpen}
          confirm={confirm}
          icon={CircleX}
          title='ลบ'
          description=''
          className='h-8 w-8 text-red-700'
          />
*/