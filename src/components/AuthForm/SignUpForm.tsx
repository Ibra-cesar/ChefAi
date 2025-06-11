import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/Button";
import { signUpForm, type SignUpForm } from "../../utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingContainer from "../ui/LoadingContainer";
import { useAuth } from "../../utils/contexts/hooks/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SignUpForms = () => {
  const navigate = useNavigate()
  const { isAthenticated, signUp, loading, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  if (isAthenticated) return <Navigate to="/dashboard" replace />;

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      await signUp(data);
      if (user) {
        navigate(`/dashboard/${user.name}`, { replace: true });
      }
    } catch (error) {
      setError("root", {
        message: `Form subbmission failed, ${error}`,
      })
    }
  };
  return (
    <section className="flex flex-col p-5 justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 gap-3 flex flex-col">
          <h1 className="text-gray-700 text-sm font-thin">Name</h1>
          <input
            {...register("name")}
            placeholder="Name"
            type="text"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            required
          />
          {errors.name && (
            <span className=" text-red-500 text-sm">
              {errors.name.message}
            </span>
          )}
          <h1 className="text-gray-700 text-sm font-thin">Email</h1>
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
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
            placeholder="Password"
            className="border text-black w-[15rem]  sm:w-[20rem] md:w-[30rem] h-[2.5rem] rounded-md p-2.5"
            required
          />
          {errors.password && (
            <span className=" text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        <div>
        <Button
          type="submit"
          variants="secondary"
          size="lg"
          disabled={loading}
        >
          {loading ? <LoadingContainer /> : "SignUp"}
        </Button>
        <Link to={"/log-in"} className="text-blue-500 ml-3 hover:underline">
          Already have an account? Log In
        </Link>
        </div>
      </form>
    </section>
  );
};

export default SignUpForms;
