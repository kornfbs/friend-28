import { supabase } from "@/utils/supabase/client"
import { notFound } from "next/navigation";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getTx28 } from "@/actions/user";
import { format } from "date-fns";

type Props = {
    searchParams: {
        q: string,
    }
}

type Rows = {
    code: string;
    created_at: string;
    amount: number;
}

export const revalidate = 0;

export default async function SearchPage({ searchParams: { q } }: Props) {
    // await getTx28(q);
    const { data: rows, error } = await supabase.from('tx28').select().eq('code', q);

    if (!rows) {
        notFound();
    }

    const sum = rows.reduce((acc, curr) => acc += curr.amount, 0);

    return (
        <div className='p-3'>
            <p className="text-xl mb-3">List for {q}</p>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Row</TableHead>
                        <TableHead className='text-left'>Transfer Date</TableHead>
                        <TableHead className="text-center">Amount</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={row.created_at}>
                            <TableCell className="text-left text-sm font-light">{index + 1}</TableCell>
                            <TableCell className="text-left text-sm font-light">{format(row.created_at, 'y-MM-dd HH:mm')}</TableCell>
                            <TableCell className="text-right text-sm font-light">{(row.amount).toLocaleString()}</TableCell>
                        </TableRow>

                    ))}
                    <TableRow key={`sum-${sum}`}>
                        <TableCell className="text-left text-sm font-light"></TableCell>
                        <TableCell className="text-left text-sm font-light">รวม</TableCell>
                        <TableCell className="text-right">{(sum).toLocaleString()}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>)
}
