import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { useAuth } from "../utils/contexts/hooks/useAuth";
import LoadingContainer from "./ui/LoadingContainer";

const Routes = {
  SignUp: '/sign-up',
  Dashboard: '/dashboard',
  SignIn: '/log-in',
} as const;

export const Navbar = () => {
  const { user, signOut, loading, error } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isSignup = location.pathname === Routes.SignUp;
  const isDashboard = location.pathname === Routes.Dashboard;
  const isSignin = location.pathname === Routes.SignIn;

  const handleLogout = async () => {
    await signOut();
    navigate("/log-in");
  };
  return (
    <header>
      <nav
        className={`h-[5rem] ${
          isSignup || isSignin ? "" : "fixed right-0 left-0"
        } p-5 rounded-b-md text-black flex gap-10 justify-end items-center`}
      >
        {isSignup && (
          <Button variants="secondary" size="lg">
            <Link to={"/log-in"}>Login</Link>
          </Button>
        )}
        {isDashboard && (
          user ? (
          <>
            <h2 className=" text-black">Hi, {user.name}</h2>
            <Button
              variants="secondary"
              size="md"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? <LoadingContainer /> : error ? `${error}` : "LogOut"}
            </Button>
          </>) : (<Navigate to={'/log-in'}/>)
        )}
        {isSignin && (
          <Button variants="secondary" size="lg">
            <Link to={"/sign-up"}>SignUp</Link>
          </Button>
        )}
      </nav>
    </header>
  );
};
