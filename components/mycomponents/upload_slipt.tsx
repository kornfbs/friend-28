'use client'

import { updateSlipt } from '@/actions/user';
import React from 'react'
import { useFormState } from 'react-dom';
import { ClipboardPlus} from 'lucide-react';

const InitApiReturn: ApiReturn = {
    message: '',
    errors: null,
};

function UploadSliptComponent() {


    const [state, formAction] = useFormState<any>(
        updateSlipt as any,
        InitApiReturn
    );

    return (
        <div className="bg-gray-500 p-2 m-3">
            <span className="flex items-center text-xl mb-3 p-2 rounded-sm bg-orange-500 text-white"> <ClipboardPlus className="mr-2"/> Upload slipt</span>

            <form action={formAction}>
                <div className="mb-2 flex flex-col">
                    <label htmlFor="code"><span className="mb-2 mr-2 text-[16px] font-light">เลขประจำตัว</span></label>
                    <input type="text" className="px-2 py-1 rounded-md border-none outline-none mb-3" name="code" />
                </div>

                <div className="mb-2 flex flex-col">
                    <label htmlFor="amount"><span className="mb-2 mr-2 text-[16px] font-light">ยอดเงินที่โอน</span></label>
                    <input type="number" className="px-2 py-1 rounded-md border-none outline-none mb-3" name="amount" />
                </div>

                <div className="mb-3 flex flex-col">
                    <label htmlFor="image" className="block mb-2">
                        ภาพใบโอนเงิน
                    </label>
                    <input type="file" accept="image/*" id="image" name="image" />

                </div>
                <div className="flex justify-end" ><button className="p-3 rounded-md bg-orange-500 text-white" type="submit">บันทึก</button></div>
            </form>
        </div>
    )
}

export default UploadSliptComponent