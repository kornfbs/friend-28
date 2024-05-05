'use client'


import { CircleX } from 'lucide-react';
import { useState } from "react";
import { deleteUser } from "@/actions/user";
import ConfirmDialog from './confirm_dialog';


function DeleteUser({ id, name }: { id: number, name:string }) {
    const confirm = () => {
        // deleteUser(id);
        alert(id);
    }

    return (
        <ConfirmDialog
            icon={CircleX}
            confirm={confirm}
            title={`ลบ ${name} ?`}
            description=''
            className='h-5 w-5 text-red-700 mt-2'
        />

    )
}

export default DeleteUser
