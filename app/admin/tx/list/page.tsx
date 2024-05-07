import { supabase } from "@/utils/supabase/client"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import DeleteTx from "@/components/my/delete_tx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";

// export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TxList() {
	// await getTx();

	// let { data, count, error } = await supabase
	// 	.from('tx')
	// 	.select('*', {count: 'exact'} );


	const { data: tx, error } = await supabase
		.from('tx')
		.select('*');

	if (!tx) {
		notFound();
	}

	const sum = tx.reduce(
		(acc, curr) => acc + curr.amount!,
		0,);


	if (error) {
		console.log(error);
	}

	return (

		<div className='p-3'>
			<p className="text-xl mb-3">List all transactions</p>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[30px] text-left">#</TableHead>

						<TableHead className="text-left">Name</TableHead>
						<TableHead className='text-left'>Input</TableHead>

						<TableHead className='text-left'>Transfer</TableHead>
						<TableHead className="text-left">Amount</TableHead>
						<TableHead className="w-[80px] text-center">Delete</TableHead>


					</TableRow>
				</TableHeader>
				<TableBody>
					{tx.map((row, index) => (
						<TableRow key={row.id} >
							<TableCell className="w-[30px] text-left text-sm font-light">{index + 1}</TableCell>
							<TableCell className="text-left text-sm font-light">{row.name!}</TableCell>
							<TableCell className="text-left text-sm font-light">{format(row.created_at!, 'y-MM-dd HH:mm')}</TableCell>
							<TableCell className="text-left text-sm font-light">{format(row.transfered_at!, 'y-MM-dd HH:mm')}</TableCell>

							<TableCell className="text-right text-sm font-light">
								<Link href={`/admin/tx/item/${row.id}`} className="bg-blue-400 rounded-lg px-2">{(row.amount!).toLocaleString()}</Link></TableCell>
							<TableCell className="w-[80px] flex justify-center"><DeleteTx id={row.id!} /></TableCell>
						</TableRow>
					))}
					<TableRow key={`sum-${sum}`} >
						<TableCell className="w-[30px] text-left text-sm font-light"></TableCell>
						<TableCell className="text-left text-sm font-light"></TableCell>
						<TableCell className="text-left text-sm font-light"></TableCell>
						<TableCell className="text-left text-sm font-light">รวม</TableCell>

						<TableCell className="text-right"> {(sum).toLocaleString()}
						</TableCell>
						<TableCell className="w-[80px] flex justify-center"></TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}
