'use client'

import { useState } from "react";
import { CircleX } from 'lucide-react';
import ConfirmDialog from "@/components/my/confirm_dialog";
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export const revalidate = 0;

function UserItem({ params }: Props) {
  const id = params.id;
  const [open, setOpen] = useState(false);
  const confirm = () => {
    alert('confirm');
  }
  return (
    <div className="bg-black">

      {/* <button onClick={() => setOpen(true)}>Open</button> */}

      <ConfirmDialog
          confirm={confirm}
          title="ยืนยันลบข้อมูลทั้งหมดออกจากตะกร้า"
          description="ข้อมูลทั้งหมดจะหายไป และต้องเลือกสินค้าใหม่"
          icon={CircleX}
          className="text-red-700 h-5 w-5"
        />
    </div>
  )
}

export default UserItem