"use server"
import prisma from "@/db"
import bcrypt from "bcrypt"
const saltRound = 10;

interface userDetailsParams{
    name : string,
    phone : number,
    email : string,
    password : string
    city : string,
    address : string
}

export const addUser = async (userDetails : userDetailsParams)=>{
    console.log(userDetails);
    const {name,phone,email,password,city,address} = userDetails;
    try {
        const existingUserWithEmail = await prisma.user.findUnique({
            where : {email}
        });

        if(existingUserWithEmail) return {
            message : "User with this email already exists",
            success : false
        }

        const hashedPassword = await bcrypt.hash(password,saltRound);

        const newUser = await prisma.user.create({
            data : {name,phone,email,password : hashedPassword,city,address}
        });
        return {
            message : "successfully Added the User",
            success : true,
            newUser
        }
    }catch (error) {
        return {
            error : error,
            message : "Failed to add the User",
            success : false,
        }
    }
}

export const updateUser = async(id:number, userDetails : userDetailsParams)=>{
    try {
        const updatedUser = await prisma.user.update({
            where : {id},
            data : userDetails
        })
        return {
            message : "user updated Successfully",
            success : true,
            updatedUser
        }
    } catch (error) {
        console.log(error);
        return {
            message : "Failed to add the User",
            success : false,
        }
    }
}

