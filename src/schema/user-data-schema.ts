import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const userDataSchema = z.object({
  avatar: z.instanceof(File).optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .refine(isValidPhoneNumber, "Invalid phone number")
    .transform((value) => parsePhoneNumber(value).formatInternational()),
});

export type TUserDataSchema = z.infer<typeof userDataSchema>;
export type TUserDataErrors = z.inferFormattedError<typeof userDataSchema>;
