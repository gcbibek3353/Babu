import { getProductByCategory } from '@/actions/product';
import React from 'react'

const page = async ({ params, }: { params: Promise<{ category: string }> }) => {
  const category = (await params).category;

  try {
    const res = await getProductByCategory(category);
    const products = res.products;
    console.log(products);
    
  } catch (error) {
    console.error("Failed to fetch category wise products:", error);
  }
  
  return (
    <div>
      Category wise products 
    </div>
  )
}

export default page
