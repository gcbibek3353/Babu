"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { addToCart, deleteCart, getCartQuantity, updateCart } from "@/actions/cart";
import { useSession } from "next-auth/react";


const AddToCartBtn = ({ productId }: { productId: number }) => {
    const [quantity, setQuantity] = useState(0);
    const session = useSession();
    const userId = session.data?.user.id;

    if(!(session.status === "authenticated")){
        return <Button onClick={()=>toast.error("You are not logged in")} className="w-full border rounded-md">
        Add to cart
    </Button>
    }

    // const userId = 1; // get this data from the session when nextAuth is implemented

    // useEffect(()=>{
    //     const getCartData = async ()=>{
    //         const res = await getCartQuantity({userId,productId});
    //         console.log(res?.quantity);
            
    //         if(res){
    //             setQuantity(res?.quantity);
    //         }
    //     }
    // },[quantity])

    const cartHandler = async (operation: string, operation2: string) => {
        if (operation == "add") {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            const res = await addToCart({ quantity: newQuantity, productId, userId });
        }
        if (operation == "update") {
            if (operation2 == "increment") {
                const newQuantity = quantity + 1;
                setQuantity(newQuantity);
                const res = await updateCart({ quantity: newQuantity, productId, userId });
            }
            else if (operation2 == "decrement") {
                const newQuantity = quantity - 1;
                setQuantity(newQuantity);
                if (quantity == 1) {
                    const res = await deleteCart({ quantity: newQuantity, productId, userId })
                }
                else {
                    const res = await updateCart({ quantity: newQuantity, productId, userId });
                }
            }
        }
    }

    return (
        <div >
            {
                (quantity > 0)
                    ?
                    <div className="flex gap-3 items-center justify-center">
                        <Button
                            size="icon"
                            onClick={() => cartHandler("update", "decrement")}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        {quantity}
                        <Button
                            size="icon"
                            onClick={() => cartHandler("update", "increment")}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    :
                    <Button onClick={() => cartHandler("add", "increment")} className="w-full border rounded-md">
                        Add to cart
                    </Button>
            }
        </div>
    )
}

export default AddToCartBtn
