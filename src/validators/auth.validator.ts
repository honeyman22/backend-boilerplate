import { GenderEnum } from "@prisma/client";
import * as z from "zod";

export const RegisterSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email is required." })
        .email("Invalid email format."),
      password: z.string({ required_error: "Password is required." }),
      name: z.string({ required_error: "Name is required." }),
      gender: z.nativeEnum(GenderEnum, {
        required_error: "Gender is required.",
      }),
      dateofbirth: z.string({ required_error: "DOB is required." }),
      country: z.string({ required_error: "Country is required." }),
    })
    .strict(),
});
export type UserRegistrationInputType = z.infer<typeof RegisterSchema>["body"];

export const LoginSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email is required." })
        .email("Invalid email format."),
      password: z.string({ required_error: "Password is required." }),
    })
    .strict(),
});
export type UserLoginSchemaInputType = z.infer<typeof LoginSchema>["body"];
