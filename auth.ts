import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const config = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user }) {
      const prismaUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!prismaUser) {
        token.id = user.id;
        return token;
      }
      if (!prismaUser.username) {
        await prisma.user.update({
          where: {
            id: prismaUser.id,
          },
          data: {
            username: prismaUser.name?.split(" ").join("").toLowerCase(),
          },
        });
      }

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        username: prismaUser.username,
        picture: prismaUser.image,
      };
    },
  },
} satisfies NextAuthOptions;

export default NextAuth(config);

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
// import NextAuth, { NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma";
// import GoogleProvider from "next-auth/providers/google";
// import {
//     GetServerSidePropsContext,
//     NextApiRequest,
//     NextApiResponse,
// } from "next";


// export const config = {
//     pages: {
//         signIn: "/login",
//     },
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),

//     ],
//     session:{
//         strategy:"jwt",
//     },
//     callbacks:{
//       async session({ session, token }) {
//         if (token) {
//             session.user.id = token.id;
//             session.user.name = token.name;
//             session.user.email = token.email;
//             session.user.image = token.picture;
//             session.user.username = token.username;
//         }
//         return session;
//       },
//       async jwt({ token, user }) {
//         const prismaUser = await prisma.user.findFirst({
//             where: {
//                 email: token.email
//             }
//         });
//         if (!prismaUser ) {
//             token.id = user.id;
//         }
//         if (prismaUser && !prismaUser.username) {
//             await prisma.user.update({
//                 where: {
//                     id: prismaUser.id
//                 },
//                 data: {
//                     username: prismaUser.name?.split("").join("").toLocaleLowerCase(),
//                 }
//             });
//         }
//         return {
//             id: prismaUser?.id || token.id,
//             name: prismaUser?.name || token.name,
//             email: prismaUser?.email || token.email,
//             username: prismaUser?.username || token.username,
//             picture: prismaUser?.image || token.picture,
//         }
        
//       }
//     }
// } satisfies NextAuthOptions;


// export default NextAuth(config);

// export function auth(
//     ...args:
//     |[GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     |[NextApiRequest, NextApiResponse]
//     |[]
// ){
//     const [req, res] = args as [NextApiRequest, NextApiResponse];
//     return NextAuth(req, res, config);
// }

