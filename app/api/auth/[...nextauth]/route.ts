import NextAuth from "next-auth/next"
import {config} from "@/auth"
// Adjusted thie path to match the correct location


const handler = NextAuth(config);

export { handler as GET, handler as POST }