import SignInForm from "../components/AuthForm/SignInForm";
import Header from "../components/Header";

const LoginPage = () => {
  return (
    <>
      <main className="bg-white mx-auto my-22 md:w-[35rem] sm:w-[25rem] border-4 border-orange-500 rounded-xl">
        <Header />
        <SignInForm />
      </main>
    </>
  );
};

export default LoginPage;
