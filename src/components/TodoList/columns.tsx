import { ColumnDef } from "@tanstack/react-table";
import { type TodoItem } from ".";

export const columns: ColumnDef<TodoItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "done",
    header: "Done",
  },
];
