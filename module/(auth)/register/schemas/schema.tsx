import { z } from "zod";

export const registerSchema = z
  .object({
    User: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // error will appear on confirmPassword field
  });

export type RegisterValidator = z.infer<typeof registerSchema>;