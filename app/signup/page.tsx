import SignupComponent from "@/components/mycomponents/signup_component";
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

export const dynamic = 'force-dynamic';

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
              <TableHead className="text-left">ชื่อ สกุล</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-left">{row.name}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </div>

    </div>
  )
}