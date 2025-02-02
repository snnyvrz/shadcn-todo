import { createContext, Reducer, type Dispatch } from "react";

interface AuthState {
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  isLoggedIn: localStorage.getItem("access_token") ? true : false,
};

type AuthActions = { type: "login"; payload: string } | { type: "logout" };

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}>({ state: initialAuthState, dispatch: () => {} });

export const authReducer: Reducer<AuthState, AuthActions> = (_, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("access_token", action.payload);
      return {
        isLoggedIn: true,
      };
    case "logout":
    default:
      localStorage.removeItem("access_token");
      return {
        isLoggedIn: false,
      };
  }
};
