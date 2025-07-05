"use server";
import { hashPassword } from "@/lib/bcrypt";
import { RegisterSchema } from "@/schema";
import { db } from "@/lib/db";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await hashPassword(password);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      
    },
  });

  // TODO: Send verification token email

  return { success: "Account created! Please check your email to verify." };
};
