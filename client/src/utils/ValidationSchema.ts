import { z } from "zod";

export const RegisterSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" }),
    username: z
      .string({ required_error: "username is required" })
      .min(4, { message: "Must be 4 or more characters long" }),
});

export const LoginSchema = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Must be 6 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" }),
});


export type RegisterSchemaType = z.infer<typeof RegisterSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>