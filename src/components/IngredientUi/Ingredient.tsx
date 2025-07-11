import { useState } from "react";
import IngredientsList from "./IngredientsList";
import { IngredientsSchema } from "../../utils/schema";
import IngredientForm from "./IngredientForm";
import RecipeList from "./RecipeList";

const Ingredient = () => {
  const [data, setData] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);

  const formHandler = (items: string) => {
    const parsed = IngredientsSchema.safeParse({ ingredient: items });

    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return false;
    }

    const normalize = parsed.data.ingredient;

    if (data.includes(normalize)) {
      setError("This ingredient is already exist!");
      return;
    } else {
      setError(null);
      setData([...data, normalize]); // Add the new ingredient to the existing list
      console.log(data);
    }
  };

  const handleDelete = (index: number) => {
    setData((prev) => prev.filter((_, idx) => idx !== index)); // Remove the ingredient at the given index
    console.log(data);
  };

  return (
    <>
      <IngredientForm onSubmit={formHandler} error={error} />
      <IngredientsList onDelete={handleDelete} items={data} />
      <RecipeList data={data} />
    </>
  );
};

export default Ingredient;
