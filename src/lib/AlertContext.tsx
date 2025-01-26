import { createContext, type Dispatch } from "react";

interface AlertState {
  show: boolean;
  type_: "success" | "error";
  message: string;
}

type AlertActions =
  | { type: "SHOW_ALERT"; payload: Omit<AlertState, "show"> }
  | { type: "HIDE_ALERT" };

export const initialAlertState: AlertState = {
  show: false,
  type_: "success",
  message: "",
};

export const AlertContext = createContext<{
  state: AlertState;
  dispatch: Dispatch<AlertActions>;
}>({
  state: initialAlertState,
  dispatch: () => {},
});

export const alertReducer = (state: AlertState, action: AlertActions) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        show: true,
        type_: action.payload.type_,
        message: action.payload.message,
      };
    case "HIDE_ALERT":
      return initialAlertState;
    default:
      return state;
  }
};
