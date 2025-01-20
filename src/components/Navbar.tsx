import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  return (
    <NavigationMenu className="bg-primary text-white p-4 mb-4 max-w-full justify-between rounded-b-lg">
      <NavigationMenuList>
        <NavigationMenuItem>Hello, Sina!</NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <LogOut />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
