const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/myupload/`;

export function imageUrl(image: string){
    return `${url}${image}`;
}

