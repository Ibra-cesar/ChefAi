import { useAuth } from "./contexts/hooks/useAuth";
import { Navigate } from "react-router-dom";
import type React from "react";
import LoadingContainer from "../components/ui/LoadingContainer";

interface AuthProps {
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ children }: AuthProps) => {
  const { isAthenticated, loading, checkedAuth } = useAuth();

  if (loading || !checkedAuth)
    return (
      <div className="flex items-center justify-center">
        <LoadingContainer />
      </div>
    );

  if (!isAthenticated) {
    console.log("user is not auth");
    return <Navigate to={"/sign-up"} />;
  }
  return <>{children}</>;
};
