import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(30, "Name must be at most 30 characters long"),
    email: z.email("Invalid email address"),
    password:z.string().min(8).max(30),
});

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password:z.string().min(8).max(30),
});