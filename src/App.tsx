import Header from "./components/Header"
import IngredientsList from "./components/IngredientsList";
import Input from "./components/Input";

function App() {
  return (
    <main className="bg-white mx-auto my-22 md:w-[50rem] w-full border-4 border-gray-300 rounded-xl">
      <Header />
      <Input/>
      <IngredientsList/>
    </main>
  );
}

export default App
