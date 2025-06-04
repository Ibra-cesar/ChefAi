import { useAuth } from "./contexts/hooks/useAuth";
import { Navigate } from "react-router-dom";
import type React from "react";
import { useEffect, useState } from "react";

interface AuthProps {
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ children }: AuthProps) => {
  const { isAuth, loading, checkAuth } = useAuth();
  const [hasChecked, setHasChecked] = useState<boolean>(false)

  useEffect(() => {
    async function Users(){
      await checkAuth()
      setHasChecked(true)
    }
    Users()
  },[checkAuth])

  if (!hasChecked || loading) return <p className="text-black">Loading...</p>;

  if (!isAuth) {
    console.log("user is not auth")
    return <Navigate to={"/sign-up"}/>;
  }
  return <>{children}</>;
};
