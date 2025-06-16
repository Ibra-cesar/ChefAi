import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInFormSchema, type signInFormSchemaTypes } from "../../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../utils/contexts/hooks/useAuth";
import LoadingContainer from "../ui/LoadingContainer";

const SignInForm = () => {
  const {signIn, isAthenticated, loading, user} = useAuth()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<signInFormSchemaTypes>({
    resolver: zodResolver(signInFormSchema),
  });
  const navigate = useNavigate();

  if (isAthenticated) return <Navigate to="/dashboard" replace />;

  const handleSignIn: SubmitHandler<signInFormSchemaTypes> = async (data) => {
    try {
      await signIn(data)
      if (user) {
        navigate(`/dashboard/${user.name}`, { replace: true })
      }
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
        {errors.password && (
          <span className=" text-red-500 text-sm">{errors.password.message}</span>
        )}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center">
        <Button variants="secondary" size="lg" disabled={loading}>
          {loading ? <LoadingContainer /> : "log-in"}
        </Button>
        <Link to={"/sign-up"} className="text-blue-500 ml-3 text-sm hover:underline">
          Don't have an account? Sign Up
        </Link>
        </div>
      </form>
    </section>
  );
};

export default SignInForm;
