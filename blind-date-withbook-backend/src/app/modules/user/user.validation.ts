import { z } from "zod";

export const createUserValidation = z.object({
  email: z.string().email(),
});

export const loginUserValidation = z.object({
  email: z.string().email(),
});
