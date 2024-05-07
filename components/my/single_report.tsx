'use client'

import { ChangeEvent, useState, useRef } from 'react'
import useOnclickOutside from 'react-cool-onclickoutside';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';

type Props = {
	users: User28[];
	select: (user: User28) => Promise<Tx28[]>;
}
function SingleReportComponent({ users, select }: Props) {
	const [searchUsers, setSearchUsers] = useState<User28[]>([]);
	const [returnTxs, setReturnTxs] = useState<Tx28[] | null>(null);
	const [selectedUser, setSelectedUser] = useState<User28 | null>(null);
	const [open, setOpen] = useState(false);
	const [sum, setSum] = useState(0);

	const refInput = useRef<HTMLInputElement | null>(null);

	const ref = useOnclickOutside(() => {
		setOpen(false);
	});

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value == '') return;
		const searchValue = users.filter(u => u.name.includes(value));
		setSearchUsers(searchValue);
		setOpen(true);
	}

	const setSearchClick = async (user: User28) => {
		setOpen(false);
		if (refInput !== null && refInput.current !== null) {
			refInput.current.value = '';
		}
		setSelectedUser(user);
		const txs = await select(user);
		const calcSum = txs.reduce((acc, curr) => acc += curr.amount, 0);
		setSum(calcSum);
		setReturnTxs(txs);
	}

	return (
		<div className='m-3'>
			<div className='relative'>
				<label htmlFor='search' className='font-light text:md mr-2'>Search</label>
				<input ref={refInput} className="bg-blue-300 px-2 py-1 outline-none border-none rounded-md text-gray-500" type='text' onChange={onChange} id='search' name='search' />
				{(open && searchUsers.length > 0) &&
					<div ref={ref} className='absolute top-10 left-14 bg-gray-200 w-100 z-50 p-3'>
						{searchUsers.map(user => <p key={user.name} className="bg-gray-500 text-white px-2 py-1 mb-3 rounded-md font-light" onClick={() => setSearchClick(user)}>{user.name}</p>)}
					</div>
				}
			</div>

			{returnTxs && (

				<div className='p-3'>
					<p className="text-xl mb-3">{selectedUser?.name}</p>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>#</TableHead>
								<TableHead className='text-left'>Transfer Date</TableHead>
								<TableHead className="text-center">Amount</TableHead>

							</TableRow>
						</TableHeader>
						<TableBody>
							{returnTxs.map((row, index) => (
								<TableRow key={row.created_at}>
									<TableCell className="text-left text-sm font-light">{index + 1}</TableCell>
									<TableCell className="text-left text-sm font-light">{format(row.transfered_at!, 'y-MM-dd HH:mm')}</TableCell>
									<TableCell className="text-right text-sm font-light">{(row.amount).toLocaleString()}</TableCell>
								</TableRow>

							))}
							<TableRow key={`sum-${sum}`}>
								<TableCell className="text-left text-sm font-light"></TableCell>
								<TableCell className="text-right">รวม</TableCell>
								<TableCell className="text-right">{(sum).toLocaleString()}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>)}
		</div>
	)
}

export default SingleReportComponent