import { columns } from "./columns";
import { DataTable } from "./data-table";

export interface TodoItem {
  title: string;
  dueDate: Date;
  done: boolean;
}

const TodoItems: TodoItem[] = [
  {
    title: "Buy groceries",
    dueDate: new Date(),
    done: false,
  },
  {
    title: "Walk the dog",
    dueDate: new Date(),
    done: false,
  },
  {
    title: "Do laundry",
    dueDate: new Date(),
    done: false,
  },
];

export const TodoList = () => {
  return (
    <div>
      <DataTable columns={columns} data={TodoItems} />
    </div>
  );
};
