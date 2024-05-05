import GridOption from "@/components/my/grid_option";
const css = ['bg-blue-100 col-span-2 row-span-2', 'bg-red-100 col-span-2', 'bg-orange-100 h-64 col-span-2'];

export default async function Index() {

  return (
    <main className="flex-1">
      <div className='grid grid-cols-1 md:grid-cols-4 grid-flow-row-dense gap-3 m-3'>
        
          <GridOption
            // key={product.name}
            id='1'
            title=""
            image={'/images/full28.png'}
            className='bg-blue-100 h-64'
          />
          <GridOption
            // key={product.name}
            id='2'
            title=""
            image={'/images/28-4.png'}
            className='bg-blue-100 h-64'
          />
          <GridOption
            // key={product.name}
            id='3'
            title=""
            image={'/images/28-5.png'}
            className='bg-blue-100 h-64'
          />
      </div>
    </main>);
}
