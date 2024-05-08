'use server'

import { createClient } from "@/utils/supabase/server";
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DateRange } from "react-day-picker";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export async function register(prevState: any, formData: FormData) {
    const supabase = createClient();
    const name = formData.get('name');
    const code = formData.get('code');

    const { data, error } = await supabase.from('user28').insert({
        name, code
    });

    revalidatePath('/signup');

}

export async function updateSlipt(prevState: any, formData: FormData) {
    const supabase = createClient();

    // console.log(formData.get('code'));
    // console.log(formData.get('transferDate'));
    // console.log(formData.get('amount'));
    // console.log(formData.get('remark'));

    const schema = z.object({
        remark: z.string(),
        transferDate: z.string({
            required_error: "Transfer date is required"
        }),
        code: z.string().optional(),
        amount: z.number().min(0),
        image: z
            .any()
            .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
            .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                'Only .jpg, .jpeg, .png and .webp formats are supported.'
            ),
    });

    const validatedFields = schema.safeParse({
        code: formData.get('code'),
        amount: Number(formData.get('amount')),
        image: formData.get('image'),
        remark: formData.get('remark'),
        transferDate: formData.get('transferDate')
    });

    if (!validatedFields.success) {
        console.log("Validate error");
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
        };
    }
    const { code, amount, transferDate, remark, image } = validatedFields.data;

    //save image to storage and get image url path
    try {
        const fileExtend = image.name.split('.')[1];
        const fileName = `${uuidv4()}.${fileExtend}`;
        const { data, error } = await supabase.storage
            .from('myupload')
            .upload(fileName, image, {
                cacheControl: '3600',
                upsert: false,
            });

        const path = data?.path;
        //save paht to image if path valid
        if (path !== null || path !== undefined) {
            const { data, error } = await supabase.from('tx28').insert({
                code,
                amount,
                transfered_at: new Date(transferDate),
                image: path,
                remark,
            })
            //const { data, error } = await supabase.rpc('hello_world');
            if (error) {
                console.log(error);
            }

        }
    } catch (e) {
        return {
            type: 'error',
            message: 'Failed to Upload Image.',
        };
    }

    redirect(`/admin/search?q=${code}`);

}

export async function deleteTx(id: number) {
    const supabase = createClient();

    await supabase.from('tx28').delete().eq('id', id);
    redirect('/admin/tx/list');
}

export async function deleteUser(id: number) {
    const supabase = createClient();

    await supabase.from('user28').delete().eq('id', id);
    revalidatePath('/signup');

}

export async function getTx() {
    const supabase = createClient();


    const tx = await supabase.from('tx').select('*');
    return tx;
}

export async function getTx28(id: string) {
    const supabase = createClient();
    const {data, error} = await supabase.from('tx28').select('*').eq('code', id).returns<Tx28[]>();
    if(data){
        return data;
    }else{
        return [];
    }
}

export async function getTxRange(range: DateRange) {
    const from = range.from?.toISOString();
    const to = range.to?.toISOString();
    const supabase = createClient();
    const {data, error } = await supabase.from('tx').select().lte('transfered_at', to)
    .gte("transfered_at", from).returns<Tx[]>();

    if(data){
        return data;
    }else{
        return [];
    }
}

export async function getUser28(id: string) {
    const supabase = createClient();
    return await supabase.from('user28').select('*');

}

