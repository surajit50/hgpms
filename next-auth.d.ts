// types/next-auth.d.ts
import { UserRole } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

// Extend the built-in session user type
declare module "next-auth" {
  /**
   * Represents the user object in the session
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: UserRole;

    stripeId?: string | null;
    gpId?: string | null; // Gram Panchayat ID
  }

  /**
   * Extends the default session to include custom properties
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
      stripeId?: string | null;
      gpId?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the JWT token to include custom properties
   */
  interface JWT {
    id: string;
    role: UserRole;

    stripeId?: string | null;
    gpId?: string | null;
  }
}

if (passwordsMatch) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    stripeId: user.stripeId || null,
    gpId: user.gpId || null,
    // optionally add default values for any missing fields
    // isTwoFactorEnabled: false,
  } as any; // <-- not ideal but works for small apps
}
