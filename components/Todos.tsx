import { SelectedPick } from "@xata.io/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TodosRecord } from "../utils/xata";
import Todo from "./Todo";

// const initialTodos = [
//   { id: "1", title: "🍅 Tomato" },
//   { id: "2", title: "🥒 Cucumber" },
//   { id: "3", title: "🧀 Cheese" },
//   { id: "4", title: "🥬 Lettuce" },
//   { id: "5", title: "🥑 Avocado" },
//   { id: "6", title: "🥥 Coconut" },
// ];

type Todo = Readonly<SelectedPick<TodosRecord, ["*"]>>;

export default function Todos() {
  const fetchTodos = () => axios.get("/api/todos").then((res) => res.data);
  const { status, data, error } = useQuery(["todos"], fetchTodos);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      {data.map((todo: Todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </>
  );
}
