import { supabase } from "@/utils/supabase/client"
import { notFound } from "next/navigation";
import dateFormat from "dateformat";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Props = {
    searchParams: {
        q: string,
    }
}


export default async function SearchPage({searchParams: { q }}: Props) {
    const { data:rows, error } = await supabase.from('tx28').select().eq('code', q);
    if(!rows) {
        notFound();
    }
    console.log(rows);

  return (
    <div className='p-3'><Table>
    <TableHeader>
        <TableRow>
            <TableHead>Row</TableHead>
            <TableHead className="text-center">Code</TableHead>
            <TableHead className='text-center'>Date</TableHead>
            <TableHead className="text-center">Amount</TableHead>

        </TableRow>
    </TableHeader>
    <TableBody>
        {rows.map((row, index) => (
            <TableRow key={row.created_at}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="text-center">{(row.code).toLocaleString()}</TableCell>
                <TableHead className='text-center'>{dateFormat(row.created_at, 'yyyy-mm-dd MM:HH')}</TableHead>
                <TableCell className="text-right">{(row.amount).toLocaleString()}</TableCell>
            </TableRow>

        ))}

    </TableBody>
</Table>
</div>  )
}
