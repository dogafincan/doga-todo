import { SelectedPick } from "@xata.io/client";
import { TodosRecord } from "../utils/xata";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

// const initialTodos = [
//   { id: "1", title: "🍅 Tomato" },
//   { id: "2", title: "🥒 Cucumber" },
//   { id: "3", title: "🧀 Cheese" },
//   { id: "4", title: "🥬 Lettuce" },
//   { id: "5", title: "🥑 Avocado" },
//   { id: "6", title: "🥥 Coconut" },
// ];

type TodosProps = {
  todos: Readonly<SelectedPick<TodosRecord, ["*"]>>[];
};

export default function Todos({ todos }: TodosProps) {
  console.log("rendered!");

  return (
    <>
      <AddTodo />
      {todos.map((todo) => {
        return <Todo key={todo.id} initialTodo={todo.title} />;
      })}
    </>
  );
}
