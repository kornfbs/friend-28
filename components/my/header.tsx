'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ClipboardPlus, Pencil, Search, ListChecks } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/public/images/logov2.png';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.log('no user')
      } else {
        setUser(data.user);
        console.log('header ', user);
      }
    }
    getUser();
    setIsMounted(true);
  }, [user]);

  if(!isMounted) return null;

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

      {user && (
        <div className='flex items-center mb-3 mr-3'>
          {/* <form onSubmit={handleSubmit} className='flex items-center h-[18px] w-[200px] gap-1 mr-3'>
     <input type='text' name='search' className='w-full border-none rounded-full text-sm  outline-none px-2 py-1 placeholder:font-kanit' placeholder='เลขประจำตัว' />
     <button type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1'><Search className='w-5 h-5' /></button>
 </form> */}
          <button onClick={() => router.push('/admin/signup')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1 mr-3'><Pencil className='w-5 h-5' /></button>
          <button onClick={() => router.push('/admin/upload')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1 mr-3'><ClipboardPlus className='w-5 h-5' /></button>
          <button onClick={() => router.push('/admin/tx/list')} type='submit' className='flex justify-center items-center bg-white rounded-full h-6 w-6 px-1'><ListChecks className='w-5 h-5' /></button>


        </div>


      )}

    </header>
  )
}

export default Header