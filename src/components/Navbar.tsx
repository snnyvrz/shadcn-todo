import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export const Navbar = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:8000");
        return await response.json();
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    },
  });

  if (isPending) {
    return (
      <NavigationMenu className="bg-primary text-white p-4 mb-4 max-w-full justify-between rounded-b-lg">
        <NavigationMenuList>
          <NavigationMenuItem>Loading...</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  if (error) {
    return (
      <NavigationMenu className="bg-primary text-white p-4 mb-4 max-w-full justify-between rounded-b-lg">
        <NavigationMenuList>
          <NavigationMenuItem>Error fetching user data</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return (
    <NavigationMenu className="bg-primary text-white p-4 mb-4 max-w-full justify-between rounded-b-lg">
      <NavigationMenuList>
        <NavigationMenuItem>Hello, {data.Hello}!</NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <LogOut />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
