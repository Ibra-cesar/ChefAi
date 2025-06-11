export interface User {
  id: string;
  name: string;
  email: string;
}

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};
export type SignInData = {
  email: string;
  password: string;
};
export interface AuthContextsType {
  user: User | null;
  loading: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  isAthenticated: boolean;
  checkedAuth: boolean
}

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instruction: string[];
};

export interface RecipeContextType {
  recipes: Recipe[];
  loading: boolean;
  generateRecipe: (ingredient: string[]) => Promise<void>;
}
