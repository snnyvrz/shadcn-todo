import { TodoCard } from "@/components/TodoCard";

export const ShowTodoItems = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mx-2 my-8">
      <TodoCard title="To Do" />
      <TodoCard title="Done" />
    </div>
  );
};
