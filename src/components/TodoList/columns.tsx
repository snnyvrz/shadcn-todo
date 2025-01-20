import { ColumnDef } from "@tanstack/react-table";
import { type TodoItem } from "../ShowTodoItems";
import { Button } from "../ui/button";
import { Check, Trash, X } from "lucide-react";

export const todoColumns: ColumnDef<TodoItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    id: "check",
    cell: () => {
      return (
        <Button variant="ghost">
          <Check />
        </Button>
      );
    },
  },
  {
    id: "delete",
    cell: () => {
      return (
        <Button variant="ghost">
          <Trash />
        </Button>
      );
    },
  },
];

export const doneColumns: ColumnDef<TodoItem>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      return <div className="text-gray-500 line-through">{title}</div>;
    },
  },
  {
    accessorKey: "doneDate",
    header: "Done Date",
    cell: ({ row }) => {
      const doneDate = row.original.dueDate;
      return <div className="text-gray-500 line-through">{doneDate}</div>;
    },
  },
  {
    id: "uncheck",
    cell: () => {
      return (
        <Button variant="ghost">
          <X />
        </Button>
      );
    },
  },
];
