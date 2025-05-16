import useIsMobile from "../hooks/isMobile";

interface PropsTypes {
  items: Array<string>;
}
const IngredientsList = ({ items }: PropsTypes) => {
  function capitalizedWord(text: string) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const isMobile = useIsMobile()
  if(isMobile === null){
    return <div>Loading ...</div>
  }
  return (
    <>
      <section className="flex flex-col justify-center w-full pt-10 px-10">
        <h1 className="">Ingredients List:</h1>
        <ul className="py-5 px-10">
          {items.map((item, idx) => (
            <li key={idx}>{capitalizedWord(item)}</li>
          ))}
        </ul>
        <p className="text-gray-500 mb-4 text-sm">
          Made by &copy;Ibrahim cesar :) as a simple project.
        </p>
      </section>

      <section className="flex items-center justify-center p-4 ">
        <div className="bg-gray-100 w-[37rem] md:w-[50rem] rounded-lg p-5 flex justify-center items-center gap-10 border-2 border-orange-400">
          <div className="md:w-[80%] w-[70%]">
            <h1 className="mb-2">SEND RECIPE</h1>
            <p className="text-gray-600">
              This is recipe is made by CLAUDE AI develop by Anthropic&copy;
              send the Ingredients to get the recipee from Chef Claude.
            </p>
          </div>
          <div className="md:w-[20%] w-[30%]">
            <button className="text-sm p-4 font-semibold tracking-wide mt-4">Send Recipee</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default IngredientsList;
