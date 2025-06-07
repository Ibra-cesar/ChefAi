import { createContext } from "react";
import type { AuthContextsType, RecipeContextType } from "../types";



export const AuthContext = createContext<AuthContextsType | undefined>(undefined);
export const RecipeContext = createContext<RecipeContextType | null>(null)

//Ui Context
export const SideBarContext = createContext<{isOpen: boolean; togle: () => void }>({isOpen: false, togle: ()=> {}})