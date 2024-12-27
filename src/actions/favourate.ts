"use server"
import prisma from "@/db";

export const addFavourate = async (productId: number, userId: number) =>{
    try {
        const addedFavourate = await prisma.favourate.create({
            data: {
                productId,
                userId
            }
        });
        return {
            success: true,
            message: "Successfully Added the Favourate",
            addedFavourate
        }
    } catch (error) {
        return {
            error: error,
            message: "Failed to add the favourate",
            success: false,
        }
    }
}

export const removeFavourate = async (productId: number, userId: number) =>{
    try {
        const removedFavourate = await prisma.favourate.deleteMany({
            where: {
                productId,
                userId
            }
        });
        return {
            success: true,
            message: "Successfully Removed the Favourate",
            removedFavourate
        }
    } catch (error) {
        return {
            error: error,
            message: "Failed to remove the favourate",
            success: false,
        }
    }
}

export const getFavourates = async (userId: number) =>{
    try {
        const favourates = await prisma.favourate.findMany({
            where: { userId }
        });
        return {
            success: true,
            message: "all favourates fetched successfully",
            favourates
        }
    } catch (error) {
        return {
            error: error,
            message: "Failed to get the favourates",
            success: false,
        }
    }
}