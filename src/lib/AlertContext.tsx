import { createContext, type Dispatch } from "react";

interface AlertState {
  show: boolean;
  type_: "success" | "error";
  message: string;
  progress: number;
}

type AlertActions =
  | { type: "SHOW_ALERT"; payload: Omit<AlertState, "show" | "progress"> }
  | { type: "HIDE_ALERT" }
  | { type: "SET_PROGRESS"; payload: number };

export const initialAlertState: AlertState = {
  show: false,
  type_: "success",
  message: "",
  progress: 100,
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
        progress: 100,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        show: false,
        progress: 0,
      };
    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};
