import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TodoItem } from "./ShowTodoItems";
import { DataTable } from "./TodoList/data-table";
import { doneColumns, todoColumns } from "./TodoList/columns";

type Status = "todo" | "done";

interface Props {
  title: Status;
  data: TodoItem[];
}

export const TodoCard = ({ title, data }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title.charAt(0).toUpperCase() + title.slice(1)}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={title === "todo" ? todoColumns : doneColumns}
          data={data}
        />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
