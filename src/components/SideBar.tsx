
import { Menu, X } from "lucide-react";
import { useRecipe } from "../utils/contexts/hooks/useRecipe";
import LoadingContainer from "./ui/LoadingContainer";
import { useSideBar } from "../utils/contexts/hooks/useSideBar";
import { Link, useParams } from "react-router-dom";
//import { Navigate } from "react-router-dom";

const SideBar = () => {
  const {username} = useParams();
  const { recipes, loading } = useRecipe();
  const { isOpen, togle } = useSideBar();

  return (
    <>
      <button
        className={`fixed top-4 left-4 z-50 text-black p-2 rounded"`}
        onClick={togle}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-0 left-0 bg-white text-black w-[18rem] h-screen p-5 overflow-y-auto z-40 duration-100
            ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } rounded-r-md border-r-[1.5px] border-orange-500`}
      >
        <h2 className="text-xl font-semibold mb-5 text-center">SideBar</h2>
        {loading ? (
          <LoadingContainer />
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes found</p>
        ) : (
          <ul className="space-y-3">
            {recipes?.map((recipe) => (
              <li key={recipe.id} className="hover:bg-gray-100 p-2 rounded">
                <Link to={`/dashboard/${username}/${recipe.id}`}>
                  {recipe.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
};

export default SideBar;
