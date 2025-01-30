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
import { useSignUpMutation } from "@/api";
import { useContext } from "react";
import { AlertContext } from "@/lib/AlertContext";
import { signUpFormSchema } from "@/api/types";

export const Signup = () => {
  const { dispatch } = useContext(AlertContext);
  const { mutate, isPending } = useSignUpMutation();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    mutate({ username: values.username, password: values.password });
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
