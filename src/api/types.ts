import { z } from "zod";

export const signUpFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  confirm_password: z.string().min(8).max(50),
});

export const signInFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});
