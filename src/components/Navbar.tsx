import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  return (
    <NavigationMenu className="bg-primary text-white p-4 mb-4 max-w-full justify-start rounded-b-lg">
      <NavigationMenuList>
        <NavigationMenuItem>Hello, Sina!</NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
