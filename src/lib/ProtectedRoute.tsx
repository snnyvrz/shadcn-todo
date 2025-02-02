import { useContext, type PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "./AuthContext";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const {
    state: { isLoggedIn },
  } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to="/signin" />;
};
