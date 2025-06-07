import { useEffect, useState } from "react";
import { useRecipe } from "../../utils/contexts/hooks/useRecipe";
import LoadingContainer from "../ui/LoadingContainer";
import { useAuth } from "../../utils/contexts/hooks/useAuth";

type Ingredient = {
  data: string[];
};

const RecipeList = ({ data }: Ingredient) => {
  const { generateRecipe, loading, error, recipes, selectRecipe } = useRecipe();
  const [showRecipe, setShowRecipe] = useState(false);
  const { fetchRecipes } = useRecipe();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user, fetchRecipes]);

  useEffect(() => {
    console.log("Recipes in RecipeList:", recipes);
  }, [recipes]);

  const generate = async () => {
    await generateRecipe(data);
    console.log(data);
    setShowRecipe(showRecipe);
  };
  return (
    <>
      {data.length > 0 && (
        <section className="lg:flex flex-col items-center justify-center p-4 ">
          <div className="bg-gray-100 md:w-[42.5rem] rounded-lg p-5 flex justify-center items-center gap-10 border-2 border-orange-400">
            <div className="md:w-[80%] w-[70%]">
              <h1 className="mb-2">SEND RECIPE</h1>
              <p className="text-gray-600">
                This is recipe is made by CLAUDE AI develop by Anthropic&copy;
                send the Ingredients to get the recipee from Chef Claude.
              </p>
            </div>
            <div className="md:w-[20%] w-[30%]">
              <button
                className="bg-orange-500 rounded-md sm:px-7 sm:py-2 px-3 py-3 sm:text-lg"
                onClick={generate}
              >
                Get Recipe
              </button>
            </div>
          </div>
        </section>
      )}
      {selectRecipe ? (
        <section className="flex flex-col justify-center w-full pt-10 px-10 gap-5">
          <h1 className="text-xl">Recipe List</h1>
          <h1 className="text-2xl">{selectRecipe.title}</h1>
          <p className="text-black text-lg tracking-wide my-3">
            {selectRecipe.description}
          </p>
          <h1 className="text-2xl">Ingredients: </h1>
          <ul className="mb-2">
            {selectRecipe.ingredients.map((ingredient, idx) => (
              <li key={idx} className="text-[1rem] ml-8 mb-3">
                {ingredient}
              </li>
            ))}
          </ul>
          <h1 className="text-2xl">Instructions: </h1>
          <ul className="mb-10">
            {selectRecipe.instruction.map((instruction, idx) => (
              <li key={idx} className="text-[1rem] ml-8 mb-3">
                {instruction}
              </li>
            ))}
          </ul>
          {error && <span>{error}</span>}
        </section>
      ) : recipes.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500">
          <p>
            No recipes yet. Add ingredients and click "Get Recipe" to see the
            magic!
          </p>
        </div>
      ) : (
        showRecipe &&
        (loading ? (
          <LoadingContainer />
        ) : (
          <section className='className="flex flex-col justify-center w-full pt-10 px-10"'>
            <h2>Recipe List</h2>
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <h2 className="text-black">{recipe.title}</h2>
                  <p>{recipe.description}</p>
                  <h2>Ingredients: </h2>
                  <ul>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                  <h2>Instruction: </h2>
                  <ul>
                    {recipe.instruction.map((instructions, idx) => (
                      <li key={idx}>{instructions}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {error && <span>{error}</span>}
          </section>
        ))
      )}
    </>
  );
};

export default RecipeList;
