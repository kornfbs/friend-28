'use client'

import { register } from "@/actions/user";
import { useFormState } from "react-dom";

import { Pencil } from "lucide-react";
type CreateProductState = {
	type?: string;
	message?: string;
	errors?: string | null;
}

const initialState: CreateProductState = {
	message: '',
	errors: null,
};

export default function SignupComponent() {
	const [state, formAction] = useFormState<any>(
		register as any,
		initialState
	);


	return (
		<div className="bg-gray-500 flex flex-col p-2 mb-4">
			<span className="flex items-center text-xl mb-3 p-2 rounded-sm bg-orange-500 text-white"> <Pencil className="mr-2" /> Register</span>
			<form action={formAction}>

				<div className="flex flex-col mb-3">
					<label htmlFor="name" className="text-sm mb-2">ชื่อ นามสกุล (ไม่ต้องมีคำนำหน้า นายก็ไม่ต้อง)</label>
					<input className="p-2 rounded-sm outline-none border-none font-light" type='text' id='name' name='name' />

				</div>
				<div className="flex flex-col mb-3">
					<label htmlFor="code" className="text-sm mb-2">เลขประจำตัว (ไม่ซ้ำกับคนอื่น)</label>
					<input type='text' className="p-2 rounded-sm outline-none border-none font-light" id='code' name='code' />
				</div>

				<div className="flex justify-end mb-3 mr-2">
					<button className="bg-orange-600 text-white p-2 border-none outline-none rounded-sm" type="submit">Save</button>
				</div>
			</form>
		</div>
	)
}