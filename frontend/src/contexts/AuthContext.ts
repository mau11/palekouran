// https://react.dev/reference/react/createContext#usage

import { createContext } from "react";
import type { User } from "@apiTypes";
import type { Session } from "@utils/types";

export type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: Boolean;
  handleSignOut: () => Promise<void>;
  handleAuthSuccess: (session: Session, user: User) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
