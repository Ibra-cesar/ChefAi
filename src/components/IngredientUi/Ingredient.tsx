import { useState } from "react";
import IngredientsList from "./IngredientsList";
import { IngredientsSchema } from "../../utils/schema";
import IngredientForm from "./IngredientForm";
import RecipeList from "./RecipeList";

const Ingredient = () => {
  const [data, setData] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);

  const formHandler = (items: string ) => {
    const parsed = IngredientsSchema.safeParse({ ingredient: items });
    
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return false;
    }
    
    const normalize = parsed.data.ingredient;

    if (data.includes(normalize)) {
      setError("This ingredient is already exist!");
      return;
    }else{
      setError(null)
      const newData = [...data, normalize];
      setData(newData);
      console.log(data);
    }
  };
  return (
    <>
      <IngredientForm onSubmit={formHandler} error={error} />
      <IngredientsList items={data} />
      <RecipeList data={data}/>
    </>
  );
};

export default Ingredient;
