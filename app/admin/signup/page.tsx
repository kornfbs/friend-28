import SignupComponent from "@/components/my/signup_component";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { supabase } from "@/utils/supabase/client";
import DeleteUser from "@/components/my/delete_user";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Signup() {

  const { data: rows, error } = await supabase.from('user28').select().order('id', { ascending: false });
  if(!rows){
    notFound();
  }

  return (
    <div className="m-3" >
      <SignupComponent />

      <div className="bg-gray-500 flex flex-col p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead  className="text-left text-white">ลำดับที่</TableHead>
              <TableHead className="text-left text-white">เลขประจำตัว</TableHead>
              <TableHead className="text-left text-white flex-1">ชื่อ สกุล</TableHead>
              <TableHead className="text-left text-white">ลบ</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="font-light">{rows.length - index}</TableCell>
                <TableCell className="text-left font-light">{row.code}</TableCell>
                <TableCell className="text-left font-light flex-1">{row.name}</TableCell>
                <TableCell className="text-left"><DeleteUser id={row.id} name={row.name}/></TableCell>
            </TableRow>            
          ))}

          </TableBody>
        </Table>
      </div>

    </div>
  )
}