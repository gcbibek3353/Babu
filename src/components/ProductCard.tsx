import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { addToCart, getCartQuantity } from "@/actions/cart";
import { Minus, Plus,AlarmClock } from "lucide-react";
import AddToCartBtn from "./AddToCartBtn";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/nextAuthConfig";

interface ProductDetailsParams {
    id : number
    imageUrl: string,
    time : string,
    name: string,
    quantity : string,
    price: number,
    category: string,
    inStock: number
}

const ProductCard = ({ product }: { product: ProductDetailsParams }) => {

    // const session = getServerSession(nextAuthConfig);
    // console.log(session);
    
    // const [quantity, setQuantity] = useState(0);

    // const session = useSession();
    // const userId = session.data?.user.id;
    // const productId = product.id;

    // console.log(session);
    
    // if(!userId) setQuantity(0);

    //  useEffect(()=>{
    //         const getCartData = async ()=>{
    //             const res = await getCartQuantity({userId,productId});
    //             if(!res){
    //                 setQuantity(0);
    //                 return;
    //             }
    //             setQuantity(res.quantity);
    //         }
    //         getCartData();
    //     },[quantity])


    return (
        <div className="border shadow-md p-4 rounded-md flex flex-col gap-3 m-auto max-w-xs sm:max-w-sm md:max-w-md">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="rounded-md mx-auto object-cover w-full h-48"
            />
            <div className="flex flex-col items-start gap-2">
                <span className="rounded-md bg-slate-100 text-xs px-2 py-1 flex gap-1 items-center">
                    <AlarmClock className="w-3 h-3" />{product.time} min
                </span>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.quantity}</p>
                <p>
                    <span className="font-semibold text-lg">₹{product.price}</span>{" "}
                    <s className="text-xs text-slate-500">₹{product.price}</s>
                </p>
                <AddToCartBtn productId={product.id} />
            </div>
        </div>
    );

}

export default ProductCard
