import { useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  
  async function handleSignUp(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    console.log(name, email, password)
    navigate('/')
  }
  return (
    <section className="flex flex-col p-5 justify-center items-center">
      <form onSubmit={handleSignUp}>
        <div className="mb-5 gap-3 flex flex-col">
          <h1>Name</h1>
          <input
            type="text"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <h1>Email</h1>
          <input
            type="email"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h1>Password</h1>
          <input
            type="password"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button size="lg">Sign In</Button>
      </form>
    </section>
  );
}

export default SignUpForm