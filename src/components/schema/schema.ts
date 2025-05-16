import { form, type Infer } from "../../utils/inputValidators";

export const IngredientsSchema = form.object({
    ingredient: form.string().nonNumber().min(2).max(100).transform((val) => val.trim().toLowerCase())
})

export type IngredientsSchema = Infer<typeof IngredientsSchema>