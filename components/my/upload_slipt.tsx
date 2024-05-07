'use client'

import { updateSlipt } from '@/actions/user';
import { useFormState } from 'react-dom';
import { ClipboardPlus } from 'lucide-react';
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import useOnclickOutside from "react-cool-onclickoutside";

const InitApiReturn: ApiReturn = {
	message: '',
	errors: null,
};




function UploadSliptComponent({ users }: { users: User28[] }) {
	const [state, formAction] = useFormState<any>(
		updateSlipt as any,
		InitApiReturn
	);
	const [searchUsers, setSearchUsers] = useState<User28[]>([]);
	const [selectedUser, setSelectedUser] = useState<User28>();
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date>();

	const inputRef = useRef<HTMLInputElement | null>(null);

	const ref = useOnclickOutside(() => {
		setOpen(false);
	});

	// useEffect(() => {
	// 	document.body.addEventListener('click', (event) => {
	// 		if(ref.current && !event.composedPath().includes(ref.current)){
	// 			setOpen(false);
	// 		}
	// 	});
	// }, []);


	const onChange = () => { }
	const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value == '') return;
		const searchValue = users.filter(u => u.name.includes(value));
		setSearchUsers(searchValue);
		setOpen(true);
	}

	const setSearchClick = (user: User28) => {
		setSelectedUser(user);
		setOpen(false);
		if (inputRef !== null && inputRef.current !== null) {
			inputRef.current.value = '';
		}
	}

	return (
		<div className="bg-gray-500 p-2 m-3">
			<span className="flex items-center text-xl mb-3 p-2 rounded-sm bg-orange-500 text-white"> <ClipboardPlus className="mr-2" /> Upload slipt</span>

			<form action={formAction}>
				<input type="text" name="transferDate" onChange={onChange} value={String(date) ?? ''} hidden />
				<input type="text" name="code" onChange={onChange} value={selectedUser?.code ?? ''} hidden />

				{/* // search and result */}
				<div className='flex justify-between items-center gap-3 mb-4 md:w-1/2 lg:w-1/2'>
					<div className='relative'>
						<label className="mb-2 text-[16px] font-light">Search...</label>
						<input ref={inputRef} type="text" onChange={onSearchChange} className='w-full px-2 py-1 rounded-md border-none outline-none' name="search" />

						{(open && searchUsers.length > 0) &&
							<div ref={ref} className='absolute top-20 left-0 bg-white w-100 p-3'>
								{searchUsers.map(user => <p key={user.name} className="bg-gray-500 text-white px-2 py-1 mb-3 rounded-md font-light" onClick={() => setSearchClick(user)}>{user.name}</p>)}
							</div>
						}

					</div>
					{selectedUser &&
						<div >
							<label className="mb-2 text-[16px] font-light text-center">{selectedUser.code}</label>
							<input onChange={onChange} readOnly className='w-full px-2 py-1 disabled text-center rounded-md border-none outline-none' type="text" value={selectedUser.name} />
						</div>
					}
				</div>

				{/* //date and amount */}
				<div className='flex justify-between md:flex-col items-start gap-3 mb-4 md:w-1/3 lg:w-1/4'>
					<div>
						<label htmlFor="amount"><span className="mb-2 mr-2 text-[16px] font-light">วันที่โอน</span></label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[240px] justify-start text-left font-normal",
										!date && "text-muted-foreground"
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "PPP") : <span>เลือกวัน</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 bg-white" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div >
						<label htmlFor="amount"><span className="mb-2 text-[16px] font-light">ยอดเงินที่โอน</span></label>
						<input type="number" className="px-2 py-1.5 w-full rounded-md border-none outline-none" name="amount" />
					</div>
				</div>

				{/* //text area - remark */}
				<div className='flex flex-col md:w-1/2 lg:w-1/4'>
					<label htmlFor="remark"><span className="mb-2 mr-2 text-[16px] font-light">หมายเหตุ</span></label>
					<textarea rows={5} className="px-2 py-2 rounded-md border-none outline-none mb-3" name="remark" />
				</div>

				{/* // image */}

				<div>
					<label htmlFor="image" className="block mb-2">
						ภาพใบโอนเงิน
					</label>
					<input type="file" accept="image/*" id="image" name="image" />

				</div>
				<div className="flex justify-end" ><button className="p-3 rounded-md bg-orange-500 text-white" type="submit">บันทึก</button></div>
			</form>
		</div>
	)
}

export default UploadSliptComponent