"use client"
import { Trash } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/actions/product";
import { toast } from "sonner";

const DeleteBtn = ({ id }: { id: number }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const deleteHandler = async ()=>{
        const res = await deleteProduct(id);
        if (!res.success) {
            console.log(res);
        }
        else{
            toast.success('Product Deleted Successfully');
        }
        setIsDialogOpen(false);
    }

    return (

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Trash />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are You sure You Want to delete this Product</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => deleteHandler()}>Delete Product</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default DeleteBtn
