import { useContext } from "react";
import { RecipeContext } from "../Context";

export const useRecipe = () => {
  const ctx = useContext(RecipeContext);
  if (!ctx) throw new Error("useRecipe must bbe use within an Recipe Provider");
  return ctx;
};
