import { format } from "date-fns";
import { TodoCard } from "@/components/TodoCard";
export interface TodoItem {
  title: string;
  dueDate: string;
  doneDate?: string;
}

const TodoItems: TodoItem[] = [
  {
    title: "Buy groceries",
    dueDate: format(new Date(), "EEEE, dd/MM/yyyy"),
  },
  {
    title: "Walk the dog",
    dueDate: format(new Date(), "EEEE, dd/MM/yyyy"),
  },
  {
    title: "Do laundry",
    dueDate: format(new Date(), "EEEE, dd/MM/yyyy"),
    doneDate: format(new Date(), "EEEE, dd/MM/yyyy"),
  },
];

export const ShowTodoItems = () => {
  const todo = TodoItems.filter((item) => !item.doneDate);
  const done = TodoItems.filter((item) => item.doneDate);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-2 my-8">
      <TodoCard title="todo" data={todo} />
      <TodoCard title="done" data={done} />
    </div>
  );
};
