"use client"
import { RecoilRoot } from "recoil"
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"

const Provieder = ({children}:{children : React.ReactNode}) => {
  return (
    <div>
        <RecoilRoot>
          <SessionProvider>
            {children}
          </SessionProvider>
            <Toaster />
        </RecoilRoot>
    </div>
  )
}

export default Provieder
