import { createContext } from "react";
import type { AuthContextsType } from "../types";


export const AuthContext = createContext<AuthContextsType | undefined>(undefined);