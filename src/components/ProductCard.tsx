import { AlarmClock } from "lucide-react";
import AddToCartBtn from "./AddToCartBtn";
import Link from "next/link";
import FavourateBtn from "./FavourateBtn";

interface ProductDetailsParams {
    id: number
    imageUrl: string,
    time: string,
    name: string,
    quantity: string,
    price: number,
    category: string,
    inStock: number
}

const ProductCard = ({ product }: { product: ProductDetailsParams }) => {

    return (
        <div className="border shadow-md p-4 rounded-md flex flex-col gap-3 m-auto max-w-xs sm:max-w-sm md:max-w-md">
            <FavourateBtn  productId={product.id} />
            <Link  href={`/products/${product.id}`} >
                <img
                    width={100}
                    height={100}
                    src={product.imageUrl}
                    alt={product.name}
                    className="rounded-md mx-auto object-cover w-full h-48"
                />
                <div className="flex flex-col items-start gap-2">
                    <span className="rounded-md bg-slate-100 text-xs px-2 py-1 flex gap-1 items-center">
                        <AlarmClock className="w-3 h-3" />{product.time}
                    </span>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.quantity}</p>
                    <p>
                        <span className="font-semibold text-lg">₹{product.price}</span>{" "}
                        <s className="text-xs text-slate-500">₹{product.price}</s>
                    </p>
                </div>
            </Link>
                <AddToCartBtn productId={product.id} />
        </div>
    );

}

export default ProductCard
