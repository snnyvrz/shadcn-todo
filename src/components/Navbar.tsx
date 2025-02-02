import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "@/lib/AuthContext";

export const Navbar = () => {
  const { dispatch } = useContext(AuthContext);

  const {
    isPending,
    data,
    error,
    refetch: retry,
  } = useQuery<{ status: number; username: string }, { detail: string }>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("" + response.status);
      }

      return await response.json();
    },
  });

  const { refetch } = useQuery<{ access_token: string }>({
    queryKey: ["access_token"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      return data;
    },
    enabled: false,
  });

  if (error) {
    refetch();
    retry();
  }

  return (
    <NavigationMenu className="bg-primary text-white p-4 mb-4 max-w-full justify-between rounded-b-lg">
      <NavigationMenuList>
        <NavigationMenuItem>
          Hello,{" "}
          {isPending
            ? "Loading..."
            : data && data.username
            ? data.username
            : "Error"}
          !
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Button onClick={() => dispatch({ type: "logout" })}>
            <LogOut />
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
