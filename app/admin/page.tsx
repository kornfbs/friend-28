import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
//   const supabase = createClient()

//   const { data, error } = await supabase.auth.getUser()
//   if (error || !data?.user) {
//     redirect('/')
//   }
//   console.log(data.user);

  return <p>Hello Admin Hack</p>
}