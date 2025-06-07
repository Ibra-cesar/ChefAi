import { useAuth } from "./contexts/hooks/useAuth";
import { Navigate } from "react-router-dom";
import type React from "react";
import LoadingContainer from "../components/ui/LoadingContainer";

interface AuthProps {
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ children }: AuthProps) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <LoadingContainer />
      </div>
    );

  if (!user) {
    console.log("user is not auth");
    return <Navigate to={"/sign-up"} />;
  }
  return <>{children}</>;
};
