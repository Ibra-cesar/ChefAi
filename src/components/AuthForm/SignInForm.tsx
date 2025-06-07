import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { signInForm, type SignInForm } from "../../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../utils/contexts/hooks/useAuth";
import LoadingContainer from "../ui/LoadingContainer";

const SignInForm = () => {
  const {signIn, error, loading} = useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });
  const navigate = useNavigate();

  const handleSignIn: SubmitHandler<SignInForm> = async (data) => {
    try {
      await signIn(data)
      navigate('/dashboard', {replace: true})
    } catch (error) {
      setError("root", {
        message: `Form subbmission failed, ${error}`,
      });
    }
  };
  return (
    <section className="flex flex-col p-5 justify-center items-center">
      <form onSubmit={handleSubmit(handleSignIn)}>
        <div className="mb-5 gap-3 flex flex-col">
          <h1 className="text-gray-700 text-sm font-thin">Email</h1>
          <input
            {...register("email")}
            type="email"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            required
          />
          {errors.email && (
            <span className=" text-red-500 text-sm">
              {errors.email.message}
            </span>
          )}
          <h1 className="text-gray-700 text-sm font-thin">Password</h1>
          <input
            {...register("password")}
            type="password"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            required
          />
        </div>
        {errors.email && (
          <span className=" text-red-500 text-sm">{errors.email.message}</span>
        )}
        {error && <span className=" text-red-500 text-sm">{error}</span>}
        <Button variants="secondary" size="lg" disabled={loading}>
          {loading ? <LoadingContainer /> : "log-in"}
        </Button>
      </form>
    </section>
  );
};

export default SignInForm;
