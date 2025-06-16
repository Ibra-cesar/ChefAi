import Header from "../components/Header";
import Ingredient from "../components/IngredientUi/Ingredient";
import { Navbar } from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useSideBar } from "../utils/contexts/hooks/useSideBar";

const Dashboard = () => {
  const {isOpen} = useSideBar()
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen relative">
        <SideBar />
        <div className={`${isOpen ? "ml-[15.75rem]" : "ml-0"} flex-1 p-4`}>
          <div className="bg-white mx-auto my-22 md:w-[45rem] w-full border-4 border-orange-500  rounded-xl">
            <Header />
            <Ingredient />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
