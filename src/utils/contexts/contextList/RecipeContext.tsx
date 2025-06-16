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
  const [displayRecipes, setDisplayRecipes] = useState<Recipe | null>(null);
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
      setDisplayRecipes(response.data.data);
      console.log("Generated recipe:", response.data.data);
    } catch (error) {
      ToastError(error);
      setRecipes([]); // Reset recipe state on generation failure
      console.error("Failed to generate recipe:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const displayedRecipe = useCallback(async(recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId)
    if(recipe){
      setDisplayRecipes(recipe);
    }
  }, [recipes]);

  const ContextValue = useMemo(() => ({
    recipes,
    loading,
    generateRecipe,
    displayedRecipe,
    displayRecipes,
  }),[recipes, loading, generateRecipe, displayedRecipe, displayRecipes]);

  return(
    <RecipeContext.Provider value={ContextValue}>
      {children}
    </RecipeContext.Provider>
  )
}