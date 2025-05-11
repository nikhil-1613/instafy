import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const config = {
    pages:{
        signIn: "/login",
    },
    adapter:PrismaAdapter({}),
}satisfies NextAuthOptions;


