import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const GramPanchayatSchema = z.object({
  name: z.string().min(1, {
    message: "Gram Panchayat name is required",
  }),
  district: z.string().min(1, {
    message: "District is required",
  }),
  state: z.string().min(1, {
    message: "State is required",
  }),
  contact: z.string().min(10, {
    message: "Contact number must be at least 10 digits",
  }),
  adminEmail: z.string().email({
    message: "Admin email is required",
  }),
  adminName: z.string().min(1, {
    message: "Admin name is required",
  }),
  adminPassword: z.string().min(6, {
    message: "Admin password must be at least 6 characters",
  }),
});

export const StaffCreateSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phone: z.string().optional(),
  role: z.enum(["GP_STAFF", "GP_ADMIN"], {
    message: "Role must be either GP_STAFF or GP_ADMIN",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const StaffUpdateSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phone: z.string().optional(),
  role: z.enum(["GP_STAFF", "GP_ADMIN"], {
    message: "Role must be either GP_STAFF or GP_ADMIN",
  }),
  status: z.enum(["ACTIVE", "INACTIVE"], {
    message: "Status must be either ACTIVE or INACTIVE",
  }),
});

export const StaffQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  role: z.enum(["GP_STAFF", "GP_ADMIN"]).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});
