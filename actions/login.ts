"use server";

import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ADMINLOGIN_REDIRECT,
  DEFAULT_STAFFLOGIN_REDIRECT,
  DEFAULT_SUPERADMINLOGIN_REDIRECT,
} from "@/routes";
import { AuthError } from "next-auth";
import { getUserEmail } from "@/data/user";
import { comparePasswords } from "@/lib/bcrypt";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  // Step 1: Verify Password First
  const isValidPassword = await comparePasswords(password, existingUser.password);
  if (!isValidPassword) {
    return { error: "Invalid credentials!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Determine redirect based on role
    const roleRedirects = {
      SUPER_ADMIN: DEFAULT_SUPERADMINLOGIN_REDIRECT,
      GP_ADMIN: DEFAULT_ADMINLOGIN_REDIRECT,
      GP_STAFF: DEFAULT_STAFFLOGIN_REDIRECT,
      default: DEFAULT_LOGIN_REDIRECT,
    };

    const redirectUrl =
      roleRedirects[existingUser.role as keyof typeof roleRedirects] ||
      roleRedirects.default;

    return { success: "Login successful!", redirectUrl };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Authentication failed!" };
      }
    }
    throw error;
  }
};
