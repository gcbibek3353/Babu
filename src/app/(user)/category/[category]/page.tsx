import { getProductByCategory } from '@/actions/product';
import ProductCard from '@/components/ProductCard';
import React from 'react'

const page = async ({ params, }: { params: Promise<{ category: string }> }) => {
  const category = (await params).category;

    const res = await getProductByCategory(category);
    const products = res.products;
    if(!products) return <div>loading...</div>

  
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-center md:text-left md:text-4xl mb-4'>
        {category}
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  )
}

export default page
