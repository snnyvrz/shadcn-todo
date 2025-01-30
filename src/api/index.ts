import { z } from "zod";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AlertContext } from "@/lib/AlertContext";
import { useMutation } from "@tanstack/react-query";
import { signInFormSchema, signUpFormSchema } from "./types";

const ignite = async (
  path: string,
  method: "POST" | "GET",
  mode: "json" | "x-www-form-urlencoded",
  values: Record<string, string>
) => {
  const options =
    method === "POST"
      ? mode === "x-www-form-urlencoded"
        ? {
            method: "POST",
            body: new URLSearchParams(values),
            headers: {
              "content-type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        : {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "content-type": "application/json; charset=UTF-8" },
          }
      : undefined;
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${path}`,
    options
  );
  return response;
};

export const useSignUpMutation = () => {
  const { dispatch } = useContext(AlertContext);

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (
      values: Omit<z.infer<typeof signUpFormSchema>, "confirm_password">
    ) => {
      const response = await ignite(
        "auth/signup",
        "POST",
        "x-www-form-urlencoded",
        values
      );
      return response;
    },
    onSuccess: async (response) => {
      if (response.ok) {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            type_: "success",
            message: "Account created successfully",
          },
        });
        navigate("/");
      } else {
        const data = await response.json();
        dispatch({
          type: "SHOW_ALERT",
          payload: { type_: "error", message: data.detail },
        });
      }
    },
  });

  return { isPending, mutate };
};

export const useSignInMutation = () => {
  const { dispatch } = useContext(AlertContext);

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (values: z.infer<typeof signInFormSchema>) => {
      const response = await ignite(
        "auth/signin",
        "POST",
        "x-www-form-urlencoded",
        values
      );
      return response;
    },
    onSuccess: async (response) => {
      if (response.ok) {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            type_: "success",
            message: "You successfully logged in",
          },
        });
        navigate("/");
      } else {
        const data = await response.json();
        dispatch({
          type: "SHOW_ALERT",
          payload: { type_: "error", message: data.detail },
        });
      }
    },
  });

  return { isPending, mutate };
};
