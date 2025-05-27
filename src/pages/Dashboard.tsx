import Header from '../components/Header';
import Ingredient from '../components/IngredientUi/Ingredient';

const Dashboard = () => {
  return (
    <main className="bg-white mx-auto my-22 md:w-[50rem] w-full border-4 border-gray-300 rounded-xl">
      <Header />
      <Ingredient />
    </main>
  );
}

export default Dashboard