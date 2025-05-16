import { useState, type FormEvent } from "react";

interface PropsTypes {
  onSubmit: (text: string) => void;
  error: string | null
}

const InputForm = ({ onSubmit, error }: PropsTypes) => {
  const [input, setInput] = useState("");

  function formHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(input);
    setInput("")
    return;
  }

  return (
    <section className="flex flex-row items-center justify-center pt-20 w-full">
      <form action="/" onSubmit={formHandler}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="ingredients"
          placeholder="e.g 12 Eggs ..."
          className=" mr-5 border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
        />
        <button className=" px-2 sm:px-5 md:px-10 sm:text-[0.8rem] text-[0.7rem] tracking-[0.1rem] font-semibold">
          + Add ingredients
        </button>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </form>
    </section>
  );
};

export default InputForm;
