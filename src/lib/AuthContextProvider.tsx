import { useReducer, type PropsWithChildren } from "react";
import { AuthContext, authReducer, initialAuthState } from "./AuthContext";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
