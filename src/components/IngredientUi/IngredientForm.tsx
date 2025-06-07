import { useState, type FormEvent } from "react";
interface PropsTypes {
  onSubmit: (text: string) => void;
  error: string | null
}

const IngredientForm = ({ onSubmit, error }: PropsTypes) => {
  const [input, setInput] = useState("");

  function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(input);
    setInput("")
    return;
  }

  return (
    <section className="flex flex-row mx-7 justify-center pt-20 ">
      <form action="/" onSubmit={formHandler}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="ingredients"
          placeholder="e.g 12 Eggs ..."
          className=" mr-5 border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
        />
        <button className="px-7 py-2 bg-orange-500 text-lg tracking-wide rounded-md mt-10">Add Recipe</button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </section>
  );
};

export default IngredientForm;
