import { nextAuthConfig } from "@/lib/nextAuthConfig"
import NextAuth from "next-auth"

export const handler = NextAuth(nextAuthConfig);

export {handler as GET,handler as POST};