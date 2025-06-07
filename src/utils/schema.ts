import { z } from "zod";


export const IngredientsSchema = z.object({
  ingredient: z
    .string()
    .min(2)
    .max(100)
    .refine(
      (val) => {
        // Must contain at least one letter
        const hasLetters = /[a-zA-Z]/.test(val);
        // Must NOT be only numbers or gibberish like '1.2.3'
        const notJustNumbers = !/^\d+(\.\d+)?$/.test(val);
        // Reject strings with only symbols
        const notSymbolsOnly = /[a-zA-Z0-9]/.test(val);

        return hasLetters && notJustNumbers && notSymbolsOnly;
      },
      {
        message:
          "Expected result like '1 egg', 'eggs', or '1/2 cup' — not just numbers or symbols",
      }
    ),
});

export type IngredientsSchemaType = z.infer<typeof IngredientsSchema>

export const signUpForm = z.object({
  name: z
    .string()
    .min(2)
    .max(100)
    .toLowerCase(),
  password: z
    .string()
    .min(8)
    .max(16),
  email: z.string().email(),
});

export type SignUpForm = z.infer<typeof signUpForm>

export const signInForm = z.object({
  name: z
    .string()
    .min(2, { message: "Password must atleast 2 characters." })
    .max(100, { message: "Password must least than 100 characters." })
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must atleast 2 characters." })
    .max(16, { message: "Password must least than 16 characters." }),
  email: z.string().email({ message: "Invalid Email." }),
});