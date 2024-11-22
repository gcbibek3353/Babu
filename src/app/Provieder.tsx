"use client"
import { RecoilRoot } from "recoil"
import { Toaster } from "@/components/ui/sonner"

const Provieder = ({children}:{children : React.ReactNode}) => {
  return (
    <div>
        <RecoilRoot>
            {children}
            <Toaster />
        </RecoilRoot>
    </div>
  )
}

export default Provieder
