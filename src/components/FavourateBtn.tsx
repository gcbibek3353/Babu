"use client"
import { addFavourate, getFavourates, removeFavourate } from '@/actions/favourate';
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const FavourateBtn = ({ productId }: { productId: number }) => {
    const [isFavourate, setIsFavourate] = React.useState(false);
    const session = useSession();
    const userId = session.status === "authenticated" ? session.data?.user.id : null;

    useEffect(() => {
        // get if the product is favourate or not and setIsfavoutate accordingly
        const userFavourates = async () => {
            const res = await getFavourates(userId);
            if (res.success) {
                const favourates = res.favourates;
                const isFavourate = favourates.some((favourate) => favourate.productId === productId);
                setIsFavourate(isFavourate);
            }
        }
        userFavourates();
    }, [userId, productId]);

    const favourateHandler = async () => {
        if (isFavourate) {
            await removeFavourate(productId, userId);
            setIsFavourate(!isFavourate);
        } else {
            await addFavourate(productId, userId);
            setIsFavourate(!isFavourate);
        }
    }


    return (
        <div className="absolute cursor-pointer text-sm bg-white flex items-center justify-center rounded-full p-1" >
            {userId ?
            <button className={isFavourate ? "text-yellow-300" : "text-black"} onClick={favourateHandler}>
                <Star />
            </button>
            :
            <button onClick={() => toast.error("You are not logged in")}>
                <Star />
            </button>}
        </div>
    )
}

export default FavourateBtn
