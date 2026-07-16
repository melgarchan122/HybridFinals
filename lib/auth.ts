import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { type AuthOptions } from "next-auth";

import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!validPassword) {
          return null;
        }

        console.log("LOGIN USER:", user);

        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT CALLBACK:", {
        token,
        user,
      });

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }) {
      console.log("SESSION CALLBACK:", {
        session,
        token,
      });

      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },

  // TEMPORARY TEST

  secret: process.env.NEXTAUTH_SECRET,
};
