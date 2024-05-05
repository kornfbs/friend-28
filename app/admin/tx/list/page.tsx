import { supabase } from "@/utils/supabase/client"
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

import DeleteTx from "@/components/my/delete_tx";
import { getTx } from "@/actions/user";
import Link from "next/link";
import { notFound } from "next/navigation";

// export const dynamic = 'force-dynamic';
export const revalidate = 0;
export default async function TxList() {
	// await getTx();

	let { data: tx, error } = await supabase
		.from('tx')
		.select('*');

	if (!tx) {
		notFound();
	}

	if (error) {
		console.log(error);
	}

	return (
		<div className='p-3'>
			<p className="text-xl mb-3">List all transactions</p>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-left">Name</TableHead>
						<TableHead className='text-left'>Date</TableHead>
						<TableHead className="text-left">Amount</TableHead>
						<TableHead className="w-[80px] text-center">Delete</TableHead>


					</TableRow>
				</TableHeader>
				<TableBody>
					{tx.map((row, index) => (
						<TableRow key={row.id} >
							<TableCell className="text-left text-sm font-light">{row.name}</TableCell>
							<TableHead className="text-left text-sm font-light">{dateFormat(row.created_at, 'yyyy-mm-dd MM:HH')}</TableHead>
							<TableCell className="text-right text-sm font-light">
								<Link href={`/admin/tx/item/${row.id}`} className="bg-blue-400 rounded-lg px-2">{(row.amount).toLocaleString()}</Link></TableCell>
							<TableCell className="w-[80px] flex justify-center"><DeleteTx id={row.id} /></TableCell>
						</TableRow>
					))}

				</TableBody>
			</Table>
		</div>
	)
}
