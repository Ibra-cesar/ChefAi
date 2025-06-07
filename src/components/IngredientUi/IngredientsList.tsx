import useIsMobile from "../../utils/contexts/hooks/isMobile";
import trashIcon from "../../assets/icons8-trash.svg"


interface PropsTypes {
  items: Array<string>;
  onDelete: (idx: number) => void
}
const IngredientsList = ({ items, onDelete }: PropsTypes) => {
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
            <>
              <li key={idx} className="flex justify-between items-center bg-gray-200 w-full h-[3rem] px-2 rounded-lg border border-orange-500">
                {capitalizedWord(item)}
                <button className="bg-orange-500 p-2 rounded-lg" onClick={() => onDelete(idx)}>
                  <img src={trashIcon} alt="trash-icon-delete" width={18} />
                </button>
              </li>
            </>
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
