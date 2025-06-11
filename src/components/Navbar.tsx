import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/Button";
import { useAuth } from "../utils/contexts/hooks/useAuth";
import LoadingContainer from "./ui/LoadingContainer";

export const Navbar = () => {
  const { signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { username } = useParams();

  const handleLogout = async () => {
    await signOut();
    navigate("/log-in");
  };
  return (
    <header>
      <nav
        className={`h-[5rem] "fixed right-0 left-0"
         p-5 rounded-b-md text-black flex gap-10 justify-end items-center`}
      >
        <h2>{username}</h2>
        <Button
          variants="secondary"
          size="lg"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? <LoadingContainer /> : "Log Out"}
        </Button>
      </nav>
    </header>
  );
};
