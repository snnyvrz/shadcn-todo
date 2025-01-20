import { TodoCard } from "@/components/TodoCard";
import { TodoItems } from "@/mockData";
export interface TodoItem {
  title: string;
  dueDate: string;
  doneDate?: string;
}

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
