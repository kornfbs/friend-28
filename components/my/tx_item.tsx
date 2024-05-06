'use client'

import { deleteTx } from "@/actions/user";
import { imageUrl } from "@/lib/constant";
import dateFormat from "dateformat";
import Image from "next/image";
import { CircleX } from 'lucide-react';
import { useState } from "react";

function TxItemComponent({ tx }: { tx: Tx}) {
    const [open, setOpen] = useState(false);
    const confirm = () => {
        deleteTx(tx.id!);
        setOpen(false);

    }
    return (
        <div className="bg-gray-500 p-2 m-3">
            <div className="aspect-square w-full relative">
                <Image
                    src={imageUrl(tx.image ?? '/images/logov2.png')}
                    fill
                    alt="tx-image"
                    objectFit="contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="mt-3 flex gap-3"><span className="text-md font-light bg-white rounded-md px-2 py-1">{tx.code} {tx.name}</span> </div>
            <div className="mt-3 flex gap-3"><span className="text-md font-light bg-white rounded-md px-2 py-1">{dateFormat(tx.created_at!, 'yyyy-mm-dd HH:MM')} </span><span className="text-md font-light bg-white rounded-md px-2 py-1">{(tx.amount!).toLocaleString()}</span></div>

            <div className="flex justify-end mb-3 mr-2">
                <button onClick={() => setOpen(true)} className="bg-orange-600 text-white p-2 border-none outline-none rounded-sm" type="submit">Delete</button>
            </div>
        </div>
    )
}

export default TxItemComponent