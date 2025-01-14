"use client"
import { cartState } from '@/recoil/atom';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useRecoilState } from 'recoil';
import { Button } from './ui/button';
import Link from 'next/link';
import { CreditCard, Minus, Plus, Trash2 } from 'lucide-react';
import { Separator } from './ui/separator';
import { useEffect, useState } from 'react';
import { deleteCart, getCartItems, updateCart } from '@/actions/cart';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


const initialCartItems = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 299.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Headphones",
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Smartphone",
    },
    {
        id: 3,
        name: "Laptop",
        price: 1299.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80&text=Laptop",
    },
];

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useRecoilState(cartState);
  const [cartItems, setCartItems] = useState(initialCartItems);

  const session = useSession();
  const userId = session.data?.user?.id;
  // console.log(userId);
  
  const fetchCartItems = async ()=>{
      // console.log(userId);
      const res = await getCartItems(userId);  // Instead of using 1 get the userId of user which is logged in
      if(!res.success){
        setCartItems([]);
        return;
      }
      setCartItems(res.cartItems);
    }
    
    useEffect(()=>{
      fetchCartItems();   // This should update whenever user adds or removes from cart // i.e dependent on AddToCartBtn.tsx component
    },[userId])

    // const totalItems = cartItems.reduce(
    //     (sum, item) => sum + item.quantity,
    //     0
    // );

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const cartHandler = async (id :  number, productId : number, operation : string) =>{
      if(operation == "increment"){
        const newQuantity = cartItems.find((item ) => item.id === id).quantity + 1;
        const newCartItems = cartItems.map((item ) => item.id === id ? { ...item, quantity: newQuantity } : item);
        setCartItems(newCartItems);
        await updateCart({ quantity: newQuantity, productId, userId });
      }
      else if(operation == "decrement"){
        const newQuantity = cartItems.find((item ) => item.id === id).quantity - 1;
        if(newQuantity == 0){
          const newCartItems = cartItems.filter((item ) => item.id !== id);
          setCartItems(newCartItems);
          await deleteCart({ quantity: newQuantity, productId: id, userId });
        }
        else{
          const newCartItems = cartItems.map((item ) => item.id === id ? { ...item, quantity: newQuantity } : item);
          setCartItems(newCartItems);
          await updateCart({ quantity: newQuantity, productId, userId });
        }
      }
      else if(operation == "delete"){
        const newCartItems = cartItems.filter((item ) => item.id !== id);
        setCartItems(newCartItems);
        await deleteCart({ quantity: 0, productId, userId });
      }
    }

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="mt-8 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-semibold">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500">
                    Rs.{item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => cartHandler(item.id,item.productId, "decrement")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => cartHandler(item.id,item.productId, "increment")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-4 text-red-500"
                      onClick={() => cartHandler(item.id,item.productId, "delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="font-semibold">
                  Rs.{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total:</span>
            <span>Rs.{totalPrice.toFixed(2)}</span>
          </div>
          <Link href={"/checkout"}>
            <Button
              className="w-full mt-8"
              onClick={() => {
                setIsCartOpen(false);
              }}
            >
              <CreditCard /> Pay ₹{totalPrice.toFixed(2)}
            </Button>
          </Link>
        </SheetContent>
      </Sheet>
    )
}

export default Cart
