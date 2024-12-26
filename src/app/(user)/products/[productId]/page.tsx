
import React from 'react'
import { getAllProducts, getProductByCategory, getProductById } from '@/actions/product';
import AddToCartBtn from '@/components/AddToCartBtn';
import { Link, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';

const page = async ({ params, }: { params: Promise<{ productId: string }> }) => {
    const productId = (await params).productId;

    const res = await getProductById(parseInt(productId));
    const product = res.product;

    const res2 = await getProductByCategory(product?.category as string);
    const similarProducts = res2.products;

    const res3 = await getAllProducts();
    const allProducts = res3.products;

    return (
        <div>
            <div className='flex justify-center items-center gap-5'>
                <div className='w-1/2'>
                    <div className='p-5 rounded-md flex justify-center items-center'>
                        <img src={product?.imageUrl as string} alt="productImage" className='rounded-md shadow-xl' />
                    </div>
                    <div className='w-1/2'>
                        <h2>₹{product?.price}</h2>
                        <AddToCartBtn productId={product?.id as number} />
                    </div>
                </div>

                <div>

                    <div className='flex gap-5'><h1>{product?.name}</h1>
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative">
                            <Share />
                        </Button>
                    </div>
                    <div>
                        <p>{product?.description}</p>
                        <span>Net Quantity : {product?.quantity}</span>
                    </div>
                </div>
            </div>

            <div>
                <div className="p-4">
                    <h2 className="text-lg font-bold text-center md:text-left md:text-2xl mb-4">
                        Similar Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        {similarProducts.map((product) => (
                            <ProductCard key={product.id} product={product}></ProductCard>
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-bold text-center md:text-left md:text-2xl mb-4">
                        You might also like 
                    </h2>
                    <div className="flex gap-4 items-center justify-center overflow-hidden">
                        {allProducts.map((product) => (
                            <ProductCard key={product.id} product={product}></ProductCard>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page
