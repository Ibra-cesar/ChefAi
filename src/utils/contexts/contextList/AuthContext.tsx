import axios from "axios";
import React, { useCallback, useState, type ReactNode } from "react";

import { AuthContext } from "../Context";
import type { User } from "../../types";

interface AuthProviderProps {
  children: ReactNode;
}

const extractErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message;
  }
  return "Unknown Error Ocurred";
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const BASE_URL = "http://localhost:3000";

  const checkAuth = useCallback(async () => {
    try {
      setIsAuth(true);
      const res = await axios.get(`${BASE_URL}/api/v1/users/me`, {
        withCredentials: true,
        timeout: 10000,
      });

      if(res.data?.success && res.data?.data){
        setUser(res.data.data);
        setIsAuth(true);
      }else{
        setUser(null);
        setIsAuth(false);
      }
    } catch {
      // Handle error if needed, e.g., log or set error state
      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        await axios.post(
          `${BASE_URL}/api/v1/auth/sign-up`,
          { name, email, password },
          { withCredentials: true }
        );
        await checkAuth();
      } catch (error) {
        return extractErrorMessage(error);
      }
    },
    [checkAuth]
  );
  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        await axios.post(
          `${BASE_URL}/api/v1/auth/sign-in`,
          { email, password },
          { withCredentials: true }
        );
        await checkAuth();
      } catch (error) {
        return extractErrorMessage(error);
      }
    },
    [checkAuth]
  );
  const logOut = useCallback(async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/auth/sign-out`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      return extractErrorMessage(error);
    }
  }, []);

  const contextValue = React.useMemo(
    () => ({
      user,
      isAuth,
      loading,
      signUp,
      signIn,
      logOut,
      checkAuth,
    }),
    [user, isAuth, loading, signUp, signIn, logOut, checkAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
