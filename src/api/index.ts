import { useContext } from "react";
import { useNavigate } from "react-router";
import { AlertContext } from "@/lib/AlertContext";
import { useMutation } from "@tanstack/react-query";
import {
  AccessToken,
  APIError,
  SignInFormValues,
  type SignUpFormValues,
} from "./types";
import { AuthContext } from "@/lib/AuthContext";
import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const postForm = <R, T>(url: string) => {
  const ignite = async (data: T) => {
    const response = await axios.post<R>(url, data, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
    return response;
  };
  return ignite;
};

export const useSignUpMutation = () => {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: postForm<AccessToken, SignUpFormValues>("auth/signup"),
    onSuccess: async (response) => {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: {
          type_: "success",
          message: "Account created successfully",
        },
      });
      const access_token = response.data.access_token;
      authDispatch({ type: "login", payload: access_token });
      navigate("/");
    },
    onError: async (error: AxiosError<APIError>) => {
      if (error.response) {
        const data = error.response.data;
        alertDispatch({
          type: "SHOW_ALERT",
          payload: { type_: "error", message: data.detail },
        });
      } else {
        alertDispatch({
          type: "SHOW_ALERT",
          payload: {
            type_: "error",
            message: "An error occurred, please try again later",
          },
        });
      }
    },
  });

  return { isPending, mutate };
};

export const useSignInMutation = () => {
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: postForm<AccessToken, SignInFormValues>("auth/signin"),
    onSuccess: async (response) => {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: {
          type_: "success",
          message: "You successfully logged in",
        },
      });
      authDispatch({ type: "login", payload: response.data.access_token });
      navigate("/");
    },
    onError: async (error: AxiosError<APIError>) => {
      if (error.response) {
        const data = error.response.data;
        alertDispatch({
          type: "SHOW_ALERT",
          payload: { type_: "error", message: data.detail },
        });
      } else {
        alertDispatch({
          type: "SHOW_ALERT",
          payload: {
            type_: "error",
            message: "An error occurred, please try again later",
          },
        });
      }
    },
  });

  return { isPending, mutate };
};
