'use server'

import prisma from "@/db";

interface cartDetailsParams {
    quantity: number,
    productId: number,
    userId: number,
}

export const getCartQuantity = async ({ userId, productId }: { userId: number, productId: number }) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId,
                productId
            }
        })
        if (cart) {
            return {
                success: true,
                quantity: cart.quantity
            }
        }

    } catch (error) {
        return {
            error: error,
            message: "Failed to get the quantity",
            success: false,
        }
    }
}

export const addToCart = async (cartDetails: cartDetailsParams) => {
    try {
        const addedCart = await prisma.cart.create({
            data: cartDetails
        })
        return {
            success: true,
            message: "Successfully Added to cart",
            addedCart
        }
    } catch (error) {
        console.log(error);
        return {
            error: error,
            message: "Failed to add the order",
            success: false,
        }
    }
}

export const updateCart = async (cartDetails: cartDetailsParams) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: cartDetails.userId,
                productId: cartDetails.productId
            }
        });
        if (cart) {
            const updatedCart = await prisma.cart.update({
                where: {
                    id: cart.id
                },
                data: cartDetails
            })
            return {
                success: true,
                message: "Successfully updated to cart",
                updatedCart
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: error,
            message: "Failed to add the order",
            success: false,
        }
    }
}

export const deleteCart = async (cartDetails: cartDetailsParams) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: cartDetails.userId,
                productId: cartDetails.productId
            }
        })
        if (cart) {
            const deletedCart = await prisma.cart.delete({
                where: {
                    id: cart.id
                }
            })
            return {
                success: true,
                message: "Successfully Deleted the cart",
                deletedCart
            }
        }
    } catch (error) {
        console.log(error);
        return {
            error: error,
            message: "Failed to add the order",
            success: false,
        }
    }
}

export const getCartItems = async (userId: number) => {
    // console.log(userId);
    try {
        const cartDetails = await prisma.cart.findMany({
            where: { userId }
        })
        // console.log(cartDetails);
        
        const populatedCartDetails = await Promise.all(
            cartDetails.map(async (cart) => {
                const product = await prisma.product.findUnique({
                    where: { id: cart.productId }
                });
                return {
                    id: cart.id,
                    productId: product?.id,
                    name: product?.name,
                    price: product?.price,
                    quantity: cart.quantity,
                    image: product?.imageUrl
                };
            })
        );

        return {
            success: true,
            message: "All cart Information along with populated product",
            cartItems: populatedCartDetails
        };
    } catch (error) {
        console.log(error);
        return {
            error: error,
            message: "Failed to add the order",
            success: false,
        }
    }
}