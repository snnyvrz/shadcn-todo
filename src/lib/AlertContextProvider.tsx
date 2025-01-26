import { useReducer, type PropsWithChildren } from "react";
import { AlertContext, alertReducer, initialAlertState } from "./AlertContext";

export const AlertContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(alertReducer, initialAlertState);

  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};
