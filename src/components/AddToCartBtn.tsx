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
    const userId = session.status === "authenticated" ? session.data?.user.id : null;

    useEffect(() => {
        const fetchData = async () => {
            if (!userId || !productId) return;
            try {
                const res = await getCartQuantity({ userId, productId });
                if (res) setQuantity(res.quantity || 0);
            } catch (error) {
                console.error("Failed to fetch cart data:", error);
            }
        };

        fetchData();
    }, [userId, productId]);
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

// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "./ui/button";
// import { toast } from "sonner";
// import { Minus, Plus } from "lucide-react";
// import { addToCart, deleteCart, getCartQuantity, updateCart } from "@/actions/cart";
// import { useSession } from "next-auth/react";

// const AddToCartBtn = ({ productId }: { productId: number }) => {
//     const [quantity, setQuantity] = useState(0);
//     const session = useSession();
//     const userId = session.status === "authenticated" ? session.data?.user.id : null;

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!userId || !productId) return;
//             try {
//                 const res = await getCartQuantity({ userId, productId });
//                 if (res) setQuantity(res.quantity || 0);
//             } catch (error) {
//                 console.error("Failed to fetch cart data:", error);
//             }
//         };

//         fetchData();
//     }, [userId, productId]);

//     const cartHandler = async (operation) => {
//         try {
//             const newQuantity = operation === "increment" ? quantity + 1 : quantity - 1;
//             setQuantity(newQuantity);

//             if (newQuantity === 0) {
//                 await deleteCart({ quantity: newQuantity, productId, userId });
//             } else if (quantity === 0) {
//                 await addToCart({ quantity: newQuantity, productId, userId });
//             } else {
//                 await updateCart({ quantity: newQuantity, productId, userId });
//             }
//         } catch (error) {
//             console.error("Cart operation failed:", error);
//             toast.error("Failed to update cart. Please try again.");
//         }
//     };

//     if (session.status !== "authenticated") {
//         return (
//             <Button onClick={() => toast.error("You are not logged in")} className="w-full border rounded-md">
//                 Add to cart
//             </Button>
//         );
//     }

//     return (
//         <div>
//             {quantity > 0 ? (
//                 <div className="flex gap-3 items-center justify-center">
//                     <Button size="icon" onClick={() => cartHandler("decrement")}>
//                         <Minus className="h-4 w-4" />
//                     </Button>
//                     {quantity}
//                     <Button size="icon" onClick={() => cartHandler("increment")}>
//                         <Plus className="h-4 w-4" />
//                     </Button>
//                 </div>
//             ) : (
//                 <Button onClick={() => cartHandler("increment")} className="w-full border rounded-md">
//                     Add to cart
//                 </Button>
//             )}
//         </div>
//     );
// };

// export default AddToCartBtn;

