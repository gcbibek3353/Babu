import { getAllProducts } from '@/actions/product';
import Navbar from '@/components/Navbar';
import React from 'react'

const products = [
    {
      name : "apple",
      category : "fruit",
      price : 200
    },
    {
      name : "potato",
      category : "vegetable",
      price : 400
    },
  ]

const layout = async({children}:{children : React.ReactNode}) => {
  const res = await getAllProducts();
  if(!res.success || !res.products?.length) return 
  <div>
   No Products found
  </div>

  return (
    <div>
       <Navbar products={res.products} />
      {children}
    </div>
  )
}

export default layout
