
import React from 'react'
import { getAllProducts, getProductByCategory, getProductById } from '@/actions/product';
import AddToCartBtn from '@/components/AddToCartBtn';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import FavourateBtn from '@/components/FavourateBtn';
import Image from 'next/image';

const page = async ({ params, }: { params: Promise<{ productId: string }> }) => {
    const productId = (await params).productId;

    const res = await getProductById(parseInt(productId));
    const product = res.product;

    const res2 = await getProductByCategory(product?.category as string);
    const similarProducts = res2.products;

    const res3 = await getAllProducts();
    const allProducts = res3.products;

    return (
        <div className='flex flex-col gap-5 p-5'>
            <div className='flex justify-evenly items-center gap-5'>
                <div className='w-1/2 border rounded-md p-5 flex items-center justify-center flex-col gap-5'>
                    <div className='relative top-10 right-36'>
                    <FavourateBtn productId={product?.id} />
                    </div>
                    <div className='p-5 rounded-md flex justify-center items-center'>
                        <Image src={product?.imageUrl as string} alt="productImage" className='rounded-md shadow-xl w-72 h-auto' />
                    </div>
                    <div className='w-1/2'>
                        <h2 className='text-2xl font-bold'>₹{product?.price}</h2>
                        <AddToCartBtn productId={product?.id as number} />
                    </div>
                </div>

                <div className='w-1/2 flex flex-col gap-5 border rounded-md h-full p-5'>

                    <div className='flex gap-5'><h1 className='text-4xl font-bold'>{product?.name}</h1>
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative">
                            <Share className='text-4xl font-bold' />
                        </Button>
                    </div>
                    <div>
                        <p className='text-xl'>{product?.description}</p>
                        <span className='text-xl'>Net Quantity : {product?.quantity}</span>
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
