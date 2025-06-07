import { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useRecipe } from "../utils/contexts/hooks/useRecipe";
import { useAuth } from "../utils/contexts/hooks/useAuth";
import LoadingContainer from "./ui/LoadingContainer";
import { useSideBar } from "../utils/contexts/hooks/useSideBar";
//import { Navigate } from "react-router-dom";

const SideBar = () => {
  const { recipes, fetchRecipes, loading, error, recipeToList } = useRecipe();
  const { user } = useAuth();
  const {isOpen, togle} = useSideBar()

  useEffect(() => {
    if(user){
      fetchRecipes();
    }
  }, [user ,fetchRecipes]);

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
            ${isOpen ? "translate-x-0" : "-translate-x-full"} rounded-r-md border-r-[1.5px] border-orange-500`}
      >
        <h2 className="text-xl font-semibold mb-5 text-center">SideBar</h2>
        {loading ? (
          <LoadingContainer />
        ) : error ? (
          <div className="text-red-500 text-center text-sm">{error}</div>
        ) : !user ? (
          //<Navigate to={"/sign-up"} replace />
          <h2 className="text-red-500 text-center text-sm">Unanouthorized!</h2>
        ) : recipes.length === 0 ? (
          <h2 className="text-black">Make a new Recipe now!</h2>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="my-3 hover:bg-orange-500 rounded text-black">
              <button className="hover:text-white tracking-wide text-[0.9rem] w-full h-[3rem]" onClick={() => recipeToList(recipe)}>{recipe.title}</button>
            </div>
          ))
        )}
      </aside>
    </>
  );
};

export default SideBar;
