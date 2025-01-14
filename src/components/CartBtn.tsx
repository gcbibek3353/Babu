"use client"

import { useRecoilState } from "recoil";
import { Button } from "./ui/button"
import { cartState } from "@/recoil/atom";
import { ShoppingCart } from "lucide-react";
import { useSession } from 'next-auth/react';
import { getCartItems } from "@/actions/cart";
import { useEffect, useState } from "react";


const CartBtn = () => {
    const [, setIsCartOpen] = useRecoilState(cartState);
    const [cartItemsNumber,setCartItemsNumber] = useState<number>(0);
    const session = useSession();
    const userId = session.data?.user?.id;

    const fetchCartItems = async ()=>{
          const res = await getCartItems(userId); 
          if(!res.success){
            return;
          }
          setCartItemsNumber(res.cartItems?.length);
        }
        
        useEffect(()=>{
          fetchCartItems();
        },[userId])

    if(session.status === "unauthenticated"){
        return <></>
    }

    return (
        <div>
            <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
            >
                <div className="h-5 w-5 bg-red-600 rounded-full absolute left-6 bottom-6 text-white text-center">{cartItemsNumber}</div>
                <ShoppingCart className="h-5 w-5 text-gray-600" />
            </Button>
        </div>
    )
}

export default CartBtn
