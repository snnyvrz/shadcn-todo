import { z } from "zod";

export const signUpFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(50),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*()]/, {
        message: "Password must contain at least one special character",
      }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export type SignUpFormValues = Omit<
  z.infer<typeof signUpFormSchema>,
  "confirm_password"
>;
export type SignInFormValues = z.infer<typeof signInFormSchema>;

export interface AccessToken {
  access_token: string;
}

export interface APIError {
  detail: string;
}
