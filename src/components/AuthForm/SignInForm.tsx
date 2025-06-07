import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(name, email, password);
    navigate("/");
  }
  return (
    <section className="flex flex-col p-5 justify-center items-center">
      <form onSubmit={handleSignIn}>
        <div className="mb-5 gap-3 flex flex-col">
          <h1 className="text-gray-700 text-sm font-thin">Email</h1>
          <input
            type="email"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h1 className="text-gray-700 text-sm font-thin">Password</h1>
          <input
            type="password"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button variants="secondary" size="lg">
          Sign In
        </Button>
      </form>
    </section>
  );
};

export default SignInForm;
