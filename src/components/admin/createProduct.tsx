"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ChevronDown} from "lucide-react"
import { useState } from "react"
import { createProductAction } from "@/actions/product"
import { toast } from "sonner"


const CreateProduct = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [productDetails, setproductDetails] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        inStock: "",
        time: "",
        quantity: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
        const { id, value } = e.target;
        // console.log(`id is ${id} and value is ${value}`);

        setproductDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    };

    const addProductHandler = async () => {
        const actualProduct = {
            name: productDetails.name,
            description: productDetails.description,
            price: parseInt(productDetails.price),
            imageUrl: productDetails.imageUrl,
            category: productDetails.category,
            inStock: parseInt(productDetails.inStock),
            time: productDetails.time,
            quantity: productDetails.quantity,
        }
        const res = await createProductAction(actualProduct);
        if (!res.success) {
            console.log(res);
        }
        else{
            toast.success('Product Added Successfully');
        }
        setIsDialogOpen(false);
    }


    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline"  onClick={() => setIsDialogOpen(true)}>Add Product </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Create a brand new product to sell online.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                value={productDetails.name}
                                onChange={handleChange}
                                id="name"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={productDetails.description}
                                onChange={handleChange}
                                placeholder="Type your message here." className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price
                            </Label>
                            <Input
                                value={productDetails.price}
                                onChange={handleChange}
                                type="number"
                                id="price"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="imageUrl" className="text-right">
                                imageUrl
                            </Label>
                            <Input
                                value={productDetails.imageUrl}
                                onChange={handleChange}
                                id="imageUrl"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                category
                            </Label>
                            {/* Improve style of dropdown menu and use handleChange function to change category state variable */}

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex">
                                        <input type="text" readOnly value={"Category"} className="cursor-pointer" /> <ChevronDown className="ml-1 h-4 w-4" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    {/* dynamically get and set all the categories here */}

                                    <DropdownMenuItem
                                        id="fruit"
                                        textValue={productDetails.category}
                                        onClick={()=>{
                                            setproductDetails((prevDetails) => ({
                                                ...prevDetails,
                                                ['category']: 'fruit',
                                            })); 
                                            console.log(productDetails);
                                        }}
                                        >
                                        fruits
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                    id="vegetables"
                                    onClick={()=>{
                                        setproductDetails((prevDetails) => ({
                                            ...prevDetails,
                                            ['category']: 'vegetable',
                                        })); 
                                        console.log(productDetails);
                                    }}
                                    >
                                        vegetables
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="inStock" className="text-right">
                                inStock
                            </Label>
                            <Input
                            onClick={handleChange}
                                type="radio"
                                name="inStock"
                                id="inStock"
                                value={1}
                            />
                            <Label htmlFor="inStock" className="text-right">
                                Not in Stock
                            </Label>
                            <Input
                            onClick={handleChange}
                                type="radio"
                                name="inStock"
                                id="inStock"
                                value={0}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                time
                            </Label>
                            <Input
                                value={productDetails.time}
                                onChange={handleChange}
                                type="number"
                                id="time"
                                className="col-span-3"
                            />
                        </div> <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                quantity
                            </Label>
                            <Input
                                value={productDetails.quantity}
                                onChange={handleChange}
                                id="quantity"
                                className="col-span-3"
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button onClick={() => addProductHandler()}>Add Product</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default CreateProduct
