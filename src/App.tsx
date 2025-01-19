import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

function App() {
  return (
    <div className="mx-auto p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Hello, Sina!</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default App;
