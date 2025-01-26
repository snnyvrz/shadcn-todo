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
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AlertContext } from "@/lib/AlertContext";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

export const Signin = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AlertContext);

  const { isPending, mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("http://localhost:8000/signin", {
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
            message: "You successfully logged in",
          },
        });
        navigate("/");
      } else {
        const data = await response.json();
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            type_: "error",
            message: data.detail,
          },
        });
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Button className="w-full" type="submit" disabled={isPending}>
                Sign In
              </Button>
            </form>
          </Form>
          <div className="flex flex-row gap-2 mt-4 text-center">
            <p>Not a member yet?</p>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
