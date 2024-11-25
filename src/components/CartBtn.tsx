"use client"

import { useRecoilState } from "recoil";
import { Button } from "./ui/button"
import { cartState } from "@/recoil/atom";
import { ShoppingCart } from "lucide-react";
import { useSession } from 'next-auth/react';


const CartBtn = () => {
    const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
    const session = useSession();

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
            // Implement cart functionality
            >
                <ShoppingCart className="h-5 w-5 text-gray-600" />
            </Button>
        </div>
    )
}

export default CartBtn
