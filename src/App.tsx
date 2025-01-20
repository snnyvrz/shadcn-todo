import { AddTodoForm } from "./components/AddTodoForm";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <Navbar />
      <AddTodoForm />
    </div>
  );
}

export default App;
