import { nextAuthConfig } from "@/lib/nextAuthConfig"
import NextAuth from "next-auth"

export const handler = NextAuth(nextAuthConfig);

export const GET = handler;
export const POST = handler;