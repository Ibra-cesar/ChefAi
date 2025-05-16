import { useState } from "react";
import InputForm from "./InputForm";
import IngredientsList from "./IngredientsList";
import { IngredientsSchema } from "./schema/schema";

const Input = () => {
  const [data, setData] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);

  const formHandler = (items: string) => {
    const parsed = IngredientsSchema.parse({ value: { ingredient: items } });
    
    if (!parsed.success) {
      setError(parsed.error);
      return false;
    }
    
    const normalize = parsed.data.ingredient;

    if (data.some((i) => i === normalize)) {
      setError("This ingredient is already exist!");
    }
    console.log(data);
    setData([...data, normalize]);
  };
  return (
    <>
      <InputForm onSubmit={formHandler} error={error} />
      <IngredientsList items={data} />
    </>
  );
};

export default Input;
