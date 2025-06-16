import LoadingContainer from "../ui/LoadingContainer";
import { useRecipe } from "../../utils/contexts/hooks/useRecipe";
import { useNavigate, useParams } from "react-router-dom";

type Ingredient = {
  data: string[];
};

const RecipeList = ({ data }: Ingredient) => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { loading, generateRecipe, displayRecipes } = useRecipe();

  const generate = async () => {
    await generateRecipe(data);
    if (displayRecipes) {
      console.log(displayRecipes);
      // Navigate to the dashboard with the username and recipe IDs
      navigate(`/dashboard/${username}/${displayRecipes.id}`, {
        replace: true,
      });
    }
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
                disabled={loading}
              >
                {loading ? <LoadingContainer /> : "Generate Recipe"}
              </button>
            </div>
          </div>
        </section>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingContainer />
        </div>
      ) : (
        <section className="flex flex-col items-center justify-center p-10">
          {displayRecipes !== null ? (
              <div
                key={displayRecipes.id}
                className="text-black w-full md:w-[42.5rem] rounded-lg p-5 mb-5 shadow-lg border-2 border-orange-400"
              >
                <h2 className="text-xl font-bold mb-5">{displayRecipes.title}</h2>
                <p className="text-gray-700 mb-10">{displayRecipes.description}</p>
                <ul className="list-disc pl-5  mb-10">
                  <h2 className="text-black text-lg font-bold mb-5">
                    Ingredients:
                  </h2>
                  {displayRecipes.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-black text-sm mb-2">
                      {ingredient}
                    </li>
                  ))}
                </ul>
                <ul className="list-disc pl-5  mb-10">
                  <h2 className="text-black text-lg font-bold mb-5">
                    Instructions:{" "}
                  </h2>
                  {displayRecipes.instruction.map((instructions, index) => (
                    <li key={index} className="text-black text-sm mb-2">
                      {instructions}
                    </li>
                  ))}
                </ul>
              </div>
          ) : (
            <p className="text-black">
              Make the ingredient and generate the recipe!.
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default RecipeList;
