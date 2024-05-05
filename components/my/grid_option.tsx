import { imageUrl } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  id: string;
  className?: string;
  image?: string;
}


function GridOption({ title, id, className, image }: Props) {
  return (
    <Link
    className={cn('grid-option relative', className)}
    href={`/`}

      // href={{
      //   pathname: '/search',
      //   query: { q: title },
      // }}

    >
      <h2>{title}</h2>
      {image && (
        <Image
          src={image}
          // layout='fill'
          fill
          alt={title}
          className='object-cover rounded-md'
        />
      )}
    </Link>
  );
}

export default GridOption
