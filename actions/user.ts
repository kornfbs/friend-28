'use server'

import { supabase } from "@/utils/supabase/server";
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
];

export async function register(prevState: any, formData: FormData) {

    const name = formData.get('name');
    const code = formData.get('code');

    const { data, error } = await supabase.from('user28').insert({
        name, code
    });

    revalidatePath('/signup');

}

export async function updateSlipt(prevState: any, formData: FormData) {
   
    const schema = z.object({
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
    });

    if (!validatedFields.success) {
        console.log("Validate error");
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Product.',
        };
    }
    const { code, amount, image } = validatedFields.data;

    //save image to storage and get image url path
    try {
        const fileExtend = image.name.split('.')[1];
        const fileName = `${uuidv4()}.${fileExtend}`;
        const { data, error } = await supabase.storage
            .from('slipt28')
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
                image: path,
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

    redirect(`/search?q=${code}`);

}

export async function deleteTx(id: number) {

   await supabase.from('tx28').delete().eq('id', id);
        
    revalidatePath('/admin/tx/liss');

}
