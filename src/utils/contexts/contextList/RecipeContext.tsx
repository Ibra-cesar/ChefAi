import { useCallback, useMemo, useState, type ReactNode } from "react";
import { type Recipe } from "../../types";
import axios from "axios";
import { extractErrorMessage } from "../../getErrorMessage";
import { useAuth } from "../hooks/useAuth";
import { RecipeContext } from "../Context";

interface RecipeProps {
  children: ReactNode;
}

export const RecipeProvider = ({ children }: RecipeProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { user } = useAuth();

  const fetchRecipes = useCallback(async () => {
    if (!user) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    const BASE_URL = `http://localhost:3000`;
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/recipes/`, {
        withCredentials: true,
      });
      setRecipes(res.data.data);
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [user]);
  const recipeToList = useCallback((recipe: Recipe) => {
    setRecipes((prevRecipe) => [recipe, ...prevRecipe]);
  }, []);

  const contextValue = useMemo(
    () => ({
      recipes,
      loading,
      fetchRecipes,
      recipeToList,
      error,
    }),
    [recipes, loading, fetchRecipes, recipeToList, error]
  );

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};
