import type { AuthOptions } from "next-auth"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter"

import {
  prisma
} from "@/lib/prisma"

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: "dd703c113eb45d100ef0",
      clientSecret: "ba1d2607cf62e0bed7017f7b46e26126f19f693e",
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          }
        })

        const isMatch = await compare(credentials.password, user?.password!)
        
        if (!isMatch) {
          return null
        }
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }

        return null
      }
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: "secret",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }

      return token
    },
    session: ({ session, token }) => {
      console.log("ses", session)

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }