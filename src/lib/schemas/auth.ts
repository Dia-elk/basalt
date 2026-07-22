import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
  terms: z.boolean().refine((v) => v === true, {
    error: "You must accept the terms to continue",
  }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const paymentSchema = z.object({
  cardholderName: z.string().min(2, "Enter the name on the card"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .regex(/^[\d\s]{13,19}$/, "Enter a valid card number"),
  expiry: z
    .string()
    .min(1, "Expiry is required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
  cvc: z
    .string()
    .min(1, "CVC is required")
    .regex(/^\d{3,4}$/, "Enter a valid CVC"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
