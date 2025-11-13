// https://react.dev/reference/react/createContext#usage

import type { User } from "@backend/types";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  signIn?: (email: string, password: string) => Promise<void>;
  signUp?: (email: string, password: string, username: string) => Promise<void>;
  signOut?: () => Promise<void>;
  getToken?: () => string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
