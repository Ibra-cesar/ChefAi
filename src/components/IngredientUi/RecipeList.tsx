import { Button } from '../ui/Button';

const RecipeList = () => {
  return (
    <section className="flex items-center justify-center p-4 ">
      <div className="bg-gray-100 w-[37rem] md:w-[50rem] rounded-lg p-5 flex justify-center items-center gap-10 border-2 border-orange-400">
        <div className="md:w-[80%] w-[70%]">
          <h1 className="mb-2">SEND RECIPE</h1>
          <p className="text-gray-600">
            This is recipe is made by CLAUDE AI develop by Anthropic&copy; send
            the Ingredients to get the recipee from Chef Claude.
          </p>
        </div>
        <div className="md:w-[20%] w-[30%]">
          <Button variants="secondary" size="lg">
            Get Recipe
          </Button>
        </div>
      </div>
    </section>
  );
}

export default RecipeList