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

import DeleteTx from "@/components/mycomponents/delete_tx";

type Props = {
	searchParams: {
		q: string,
	}
}

export const dynamic = 'force-dynamic';

export default async function TxList() {

	let { data: tx, error } = await supabase
		.from('tx')
		.select('*');

	if (!tx) {
		notFound();
	}
	console.log("tx views ", tx);
	return (
		<div className='p-3'><Table>
			<TableHeader>
				<TableRow>
					<TableHead>Code</TableHead>
					<TableHead className="text-center">Name</TableHead>
					<TableHead className='text-center'>Date</TableHead>
					<TableHead className="text-center">Amount</TableHead>
					<TableHead className="w-[80px]">Delete</TableHead>


				</TableRow>
			</TableHeader>
			<TableBody>
				{tx.map((row, index) => (
					<TableRow key={row.id}>
						<TableCell>{row.code}</TableCell>
						<TableCell className="text-center">{row.name}</TableCell>
						<TableHead className='text-center'>{dateFormat(row.created_at, 'yyyy-mm-dd MM:HH')}</TableHead>
						<TableCell className="text-center">{(row.amount).toLocaleString()}</TableCell>
						<TableCell className="w-[80px] text-center"><DeleteTx id={Number(row.id)} /></TableCell>

					</TableRow>
				))}

			</TableBody>
		</Table>
		</div>)
}
