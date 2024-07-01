import { z } from "zod";

export const passwordSchema = z
  .object({
    curPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type TPasswordSchema = z.infer<typeof passwordSchema>;
export type TPasswordErrors = z.inferFormattedError<typeof passwordSchema>;
