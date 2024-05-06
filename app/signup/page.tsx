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

export const revalidate = 0;

export default async function Signup() {

  const { data: rows, error } = await supabase.from('user28').select();

  return (
    <div className="m-3" >
      <SignupComponent />

      <div className="bg-gray-500 flex flex-col p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ลำดับที่</TableHead>
              <TableHead className="text-left">เลขประจำตัว</TableHead>
              <TableHead className="text-left flex-1">ชื่อ สกุล</TableHead>
              <TableHead className="text-left">ลบ</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="font-light">{index + 1}</TableCell>
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