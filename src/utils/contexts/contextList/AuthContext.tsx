import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "../Context";
import type { SignInData, SignUpData, User } from "../../types";
import axios, { AxiosError } from "axios";
import { ToastError } from "../../Toast";

export const Axios = axios.create({
  baseURL: "https://chefai.duckdns.org/api/v1",
  withCredentials: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [checkedAuth, setCheckedAuth] = useState<boolean>(false);
  const [isAthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await Axios.get(`/users/me`);
        setUser(response.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          // Expected when user is not logged in; no need to log it
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
        setCheckedAuth(true);
      }
    };
    checkAuth();
  }, []);

  const signUp = useCallback(async (data: SignUpData): Promise<void> => {
    setLoading(true);
    try {
      const response = await Axios.post(`/auth/sign-up`, data);

      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      ToastError(error);
      setUser(null); // Reset user state on sign-up failure
      setIsAuthenticated(false);
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  },[]);

  const signIn = useCallback(async (data: SignInData): Promise<void> => {
    setLoading(false);
    try {
      const response = await Axios.post(
        `/auth/sign-in`,
        data
      );
      setUser(response.data.data);
      console.log("User signed in:", response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      ToastError(error);
      setIsAuthenticated(false);
      setUser(null); // Reset user state on sign-in failure
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    setLoading(true);

    try {
      await Axios.post(
        `/auth/sign-out`,
        {},
      );

      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      ToastError(error);
      console.error("Sign out failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      signUp,
      signIn,
      signOut,
      isAthenticated,
      checkedAuth
    }),
    [user, loading, signUp, signIn, signOut, isAthenticated, checkedAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
