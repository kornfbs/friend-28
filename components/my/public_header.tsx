'use client'

import Image from 'next/image'
import Link from 'next/link'
import { KeyRound, Search, ListChecks } from 'lucide-react';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/public/images/logov2.png';
function PublicHeader() {
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

            <div className='flex items-center mb-3 mr-3'>
                <button onClick={() => router.push('/login')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1 mr-3'><KeyRound className='w-5 h-5 text-red-700' /></button>
                <button onClick={() => router.push('/report/single')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1 mr-3'><Search className='w-5 h-5' /></button>
                <button onClick={() => router.push('/report')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1'><ListChecks className='w-5 h-5' /></button>

            </div>



        </header>
    )
}

export default PublicHeader