'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ClipboardPlus, Pencil, Search } from 'lucide-react';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/public/images/logov2.png';
function Header() {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const term = e.currentTarget.search.value;
        console.log('term: ', term);
        router.push(`/search?q=${term}`);
    }


    return (
        <header className='flex justify-between bg-[#151F42] items-end'>
            <Link href='/'>
                <Image src={logo}
                    width={80}
                    height={80}
                    alt='logo'
                />
            </Link>
            {/* <div className='flex gap-3'>
        <div className='flex' onClick={() => router.push('itemtx')} >
          <div className='h-10 w-10 mr-3 flex relative cursor-pointer'>
            <ClipboardPlus  className='text-white h-5 w-5 sticky' />
          </div>
        </div>

        <div className='flex'>
          <div className='h-10 w-10 mr-3 flex relative cursor-pointer'>
            <Bell className='text-white h-5 w-5 sticky' />
          </div>
        </div>
      </div> */}
            <div className='flex items-center mb-3 mr-3'>
                <form onSubmit={handleSubmit} className='flex items-center h-[18px] w-[200px] gap-1 mr-3'>
                    <input type='text' name='search' className='w-full border-none rounded-full text-sm  outline-none px-2 py-1 placeholder:font-kanit' placeholder='เลขประจำตัว' />
                    <button type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1'><Search className='w-5 h-5' /></button>
                </form>
                <button onClick={()=> router.push('/signup')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1 mr-3'><Pencil className='w-5 h-5' /></button>
                <button onClick={()=> router.push('/upload')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1'><ClipboardPlus className='w-5 h-5' /></button>

            </div>
        </header>
    )
}

export default Header