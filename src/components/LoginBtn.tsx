"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";

import {
    LogOut,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LoginBtn = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className='relative'
                    >
                        <CircleUserRound className='h-6 w-6 text-gray-600' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>
                        <User />
                        <span>Profile</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut />
                        <span onClick={()=>signOut()}>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div>
            <Button onClick={() => signIn()}>
                LogIn
            </Button>
        </div>
    )
}

export default LoginBtn
