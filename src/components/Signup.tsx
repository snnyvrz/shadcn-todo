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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { AlertCircle, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  confirm_password: z.string().min(8).max(50),
});

export const Signup = () => {
  const [showAlert, setShowAlert] = useState("");
  const [progress, setProgress] = useState(90);

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
        navigate("/");
      } else {
        const data = await response.json();
        setShowAlert(data.detail);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  useEffect(() => {
    if (showAlert) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev > -20 ? prev - 1 : 90));
      }, 100);

      if (progress === 0) {
        setShowAlert("");
        setProgress(90);
      }

      return () => clearInterval(interval);
    }
  }, [showAlert, progress]);

  return (
    <>
      <div className="fixed top-4 flex items-center justify-center w-screen z-10">
        <Alert
          className="max-w-lg shadow-lg p-0"
          hidden={!showAlert}
          variant="destructive"
        >
          <Button
            className="absolute top-0 right-0 hover:bg-red-100"
            variant="ghost"
            onClick={() => setShowAlert("")}
          >
            <CircleX className="stroke-red-500 w-4 h-4" />
          </Button>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="m-4">Error</AlertTitle>
          <AlertDescription className="mb-4">{showAlert}</AlertDescription>
          <Progress
            value={progress}
            className="w-full bg-red-200"
            indicatorColor="bg-red-500"
          />
        </Alert>
      </div>
      <div className="min-h-screen flex items-center justify-center z-0">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl onChange={() => setShowAlert("")}>
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
                      <FormControl onChange={() => setShowAlert("")}>
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
                      <FormControl onChange={() => setShowAlert("")}>
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
          </CardContent>
        </Card>
      </div>
    </>
  );
};
