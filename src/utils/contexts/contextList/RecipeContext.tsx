import { useCallback, useEffect, useMemo, useState } from "react";
import type { Recipe } from "../../types";
import { RecipeContext } from "../Context";
import { Axios } from "./AuthContext";
import { ToastError } from "../../Toast";
import { useAuth } from "../hooks/useAuth";

type RecipeProviderProps = {
  children: React.ReactNode;
};

export const RecipeProvider = ({children}: RecipeProviderProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { checkedAuth, isAthenticated } = useAuth();

  useEffect(() => {

    if (!checkedAuth || !isAthenticated) {
      console.log("User is not authenticated or auth check not completed");
      return;
    }

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await Axios.get("/recipes/all");
        setRecipes(response.data.data);
        console.log("Fetched recipes:", response.data.data);
      } catch (error) {
        ToastError(error);
        setRecipes([]); // Reset recipe state on fetch failure
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [checkedAuth, isAthenticated]);

  const generateRecipe = useCallback(async (ingredients: string[]) => {
    setLoading(true);
    try {
      const response = await Axios.post("/recipes/generate", { ingredients });
      setRecipes(prev => [...prev, response.data.data]);
      console.log("Generated recipe:", response.data.data);
    } catch (error) {
      ToastError(error);
      setRecipes([]); // Reset recipe state on generation failure
      console.error("Failed to generate recipe:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const ContextValue = useMemo(() => ({
    recipes,
    loading,
    generateRecipe,
  }),[recipes, loading, generateRecipe]);

  return(
    <RecipeContext.Provider value={ContextValue}>
      {children}
    </RecipeContext.Provider>
  )
}