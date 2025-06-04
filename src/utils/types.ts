export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextsType {
  user: User | null;
  isAuth: boolean
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
