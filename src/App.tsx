import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Hello, Sina!</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Label>Add Todo Item:</Label>
      <Input />
      <Button>Add</Button>
    </div>
  );
}

export default App;
