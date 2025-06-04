import useIsMobile from "../../utils/contexts/hooks/isMobile";


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
    </>
  );
};

export default IngredientsList;
