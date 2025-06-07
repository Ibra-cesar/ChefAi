import axios from "axios";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../Context";
import type { SignInData, SignUpData, User } from "../../types";
import { extractErrorMessage } from "../../getErrorMessage";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const BASE_URL = "http://localhost:5000/api/v1";

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BASE_URL}/users/me`,{withCredentials: true});
      setUser(response.data.data);
    } catch (error) {
      setError(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const signUp = async (data: SignUpData): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/auth/sign-up`, data, {
        withCredentials: true,
      });

      setUser(response.data);
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (data: SignInData): Promise<void> => {
    setLoading(false);
    setError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/sign-in`,
        data,
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${BASE_URL}/auth/sign-out`,
        {},
        { withCredentials: true }
      );

      setUser(null);
    } catch (error) {
      const message = extractErrorMessage(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuth(); // Wait for `checkAuth` to complete
    };

    initializeAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true }); // Redirect to dashboard if user is logged in
    }
  }, [user, navigate]); 

  const contextValue = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
