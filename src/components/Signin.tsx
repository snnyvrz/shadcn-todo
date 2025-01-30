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
import { Link } from "react-router";
import { useContext } from "react";
import { AlertContext } from "@/lib/AlertContext";
import { useSignInMutation } from "@/api";
import { signInFormSchema } from "@/api/types";

export const Signin = () => {
  const { isPending, mutate } = useSignInMutation();
  const { dispatch } = useContext(AlertContext);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInFormSchema>) => {
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              onChange={() => dispatch({ type: "HIDE_ALERT" })}
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
