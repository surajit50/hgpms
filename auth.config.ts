import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schema";
import { getUserEmail } from "@/data/user";
import { comparePasswords } from "@/lib/bcrypt";

import { UserRole } from "@prisma/client";
import { db } from "./lib/db";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await comparePasswords(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.gpId = user.gpId;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.role = token.role;
        session.user.gpId = token.gpId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
