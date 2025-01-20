import { format } from "date-fns";
import { TodoItem } from "@/components/ShowTodoItems";

export const TodoItems: TodoItem[] = [
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
