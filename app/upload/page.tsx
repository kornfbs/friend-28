import UploadSliptComponent from "@/components/my/upload_slipt"
import { supabase } from "@/utils/supabase/client"
import { Users } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0;
async function UploadSlipt() {
  const { data:users, error } = await supabase.from('user28').select();

  if (!users) {
    notFound();
  }
  return (
    <div><UploadSliptComponent users={users} /></div>
  )
}

export default UploadSlipt

