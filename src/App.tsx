import { AddTodoForm } from "@/components/AddTodoForm";
import { Navbar } from "@/components/Navbar";
import { ShowTodoItems } from "@/components/ShowTodoItems";

function App() {
  return (
    <main className="max-w-screen-lg mx-auto">
      <Navbar />
      <AddTodoForm />
      <ShowTodoItems />
    </main>
  );
}

export default App;
