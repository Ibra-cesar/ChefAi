import SignUpForms from "../components/AuthForm/SignUpForm";
import Header from "../components/Header";

const SignUpPage = () => {
  return (
    <>
      <main className="bg-white mx-auto my-22 md:w-[35rem] sm:w-[25rem] border-4 border-orange-500 rounded-xl">
        <Header />
        <SignUpForms />
      </main>
    </>
  );
};

export default SignUpPage;
