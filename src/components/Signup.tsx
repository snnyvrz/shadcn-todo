import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { AlertContext } from "@/lib/AlertContext";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  confirm_password: z.string().min(8).max(50),
});

export const Signup = () => {
  const { dispatch } = useContext(AlertContext);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      });
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center z-0">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onChange={() => dispatch({ type: "HIDE_ALERT" })}
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit" disabled={isPending}>
                  Sign Up
                </Button>
              </form>
            </Form>
            <div className="flex flex-row gap-2 mt-4 text-center">
              <p>Already a member?</p>
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
