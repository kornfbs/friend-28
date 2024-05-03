const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/slipt28/`;

export function imageUrl(image: string){
    return `${url}${image}`;
}

