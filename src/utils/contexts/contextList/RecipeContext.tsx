import { useCallback, useMemo, useState, type ReactNode } from "react";
import { type Recipe } from "../../types";
import axios from "axios";
import { extractErrorMessage } from "../../getErrorMessage";
import { RecipeContext } from "../Context";

interface RecipeProps {
  children: ReactNode;
}

export const RecipeProvider = ({ children }: RecipeProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const BASE_URL = "http://localhost:5000/api/v1/recipes";

  const generateRecipe = useCallback(async (ingredients: string[]) => {
    setError("");

    try {
      const res = await axios.post(`${BASE_URL}/generate`, { ingredients }, {
        withCredentials: true,
      });
      console.log(res)
      setRecipes(res.data.data);
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecipes = useCallback(async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/all`, {
        withCredentials: true,
      });
      console.log(resp)
      setRecipes(resp.data.data);
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const recipeToList = useCallback(async (recipe: Recipe) => {
    try {
      setSelectedRecipe(recipe);
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      recipes,
      loading,
      fetchRecipes,
      recipeToList,
      generateRecipe,
      error,
      selectRecipe,
    }),
    [
      recipes,
      loading,
      fetchRecipes,
      recipeToList,
      error,
      generateRecipe,
      selectRecipe,
    ]
  );

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};
