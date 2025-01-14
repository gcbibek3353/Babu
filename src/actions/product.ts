"use server"
import prisma from "@/db";

interface productDetailsParams{
    name : string
    description : string
    price : number
    imageUrl : string
    category : string
    inStock : number
    time : string
    quantity : string
}

export const getAllProducts = async ()=>{
    try {
        const products = await prisma.product.findMany({});
        return {
            success : true,
            message : "Successfully fetched all the products",
            products
        }
    } catch (error) {
        console.log(error);
        return {
            message : "Failed to get all the products",
            success : false,
        }
    }
}

export const getProductById = async (id:number)=>{
    console.log(id);
    try {
        const product = await prisma.product.findUnique({
            where : {
                id : id
            }
        });
        return {
            success : true,
            message : "Successfully fetched product using given Id",
            product
        }
    } catch (error) {
        console.log(error);
        return {
            message : "Failed to get the product",
            success : false,
        }
    }
}

export const deleteProduct = async (id : number)=>{
    try {
        const deletedProduct = await prisma.product.delete({
            where : {id}
        })
        return {
            message : "Product deleted Successfully",
            success : true,
            deletedProduct
        }
    } catch (error) {
        console.log(error);
        return {
            error : error,
            message : "Failed to delete the product",
            success : false,
        }
    }
}

export const updateProduct = async (id : number, data : productDetailsParams)=>{
    try{
        const updatedProduct = await prisma.product.update({
            where : {id : id},
            data : data
        })
        return {
            success : true,
            message : "Product updated successfully",
            updatedProduct
        }
    }catch (error) {
        console.log(error);
        return {
            error : error,
            message : "Failed to delete the product",
            success : false,
        }
    }

}

export const createProductAction = async (productDetails : productDetailsParams)=>{
    try {
        const {name ,description, price ,imageUrl,category,inStock,time,quantity} = productDetails;
        const newProduct = await prisma.product.create({
            data : {name ,description, price ,imageUrl,category,inStock,time,quantity}
        });
        return {
            message : "successfully Added the product",
            success : true,
            newProduct
        }
        
    } catch (error) {
        console.log(error);
        return {
            message : "Failed to add the product",
            success : false,
        }
    }
}

export const getProductByCategory = async (category : string)=>{
    try {
        const products = await prisma.product.findMany({
            where : {
                category : category
            }
        });
        return {
            success : true,
            message : "Successfully fetched product using given Id",
            products
        }
    } catch (error) {
        console.log(error);
        return {
            message : "Failed to get the product",
            success : false,
        }
    }
}

