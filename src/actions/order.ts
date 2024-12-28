"use server"
import prisma from "@/db";

interface orderDetailsParams {
    productId: number
    userId: number
    quantity: number
    total_amount: number
    address: string
}

// enum status {
//     "processing",
//     "cancelled",
//     "shipped",
//     "delivered"
//   }

export const addOrder = async (orderDetails: orderDetailsParams) => {
    try {
        const addedOrder = await prisma.order.create({
            data: orderDetails
        })
        return {
            success: true,
            message: "Successfully Added the Order",
            addedOrder
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

export const getOrders = async () => {
    try {
        const orders = await prisma.order.findMany();
        return {
            success: true,
            message: "all orders fetched successfully",
            orders
        }
    } catch (error) {
        console.log(error);
        return {
            error: error,
            message: "Failed to get the orders",
            success: false,
        }
    }
}

export const getOrderById = async (id: number) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id }
        })
        return {
            success: true,
            message: "order with given id fetched successfully",
            order
        }
    } catch (error) {
        console.log(error);
        return {
            error: error,
            message: "Failed to get the order",
            success: false,
        }
    }
}

// don't use any type , use correct type
export const updateOrderStatus = async (id: number, status) => {
    try {
        const updatedOrder = await prisma.order.update({
            where : {id},
            data : {
                status : status
            }
        })
        return {
            message : "order Status updated Successfully",
            success : true,
            updatedOrder
        }

    } catch (error) {
        console.log(error);
        return {
            error: error,
            message: "Failed to update order status",
            success: false,
        }
    }
}