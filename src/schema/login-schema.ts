import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.string().optional(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TLoginErrors = z.inferFormattedError<typeof loginSchema>;
