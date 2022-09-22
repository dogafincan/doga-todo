import { useState } from "react";
import Todo from "./Todo";

const initialTodos = [
  { id: "1", title: "🍅 Tomato" },
  { id: "2", title: "🥒 Cucumber" },
  { id: "3", title: "🧀 Cheese" },
  { id: "4", title: "🥬 Lettuce" },
  { id: "5", title: "🥑 Avocado" },
  { id: "6", title: "🥥 Coconut" },
];

export default function Todos({ todos }: any) {
  const [todo, setTodo] = useState("");
  // const [todos, setTodos] = useState(initialTodos);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    // setTodos([todo, ...todos]);
    setTodo("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          className="h-20 rounded-3xl py-3.5 px-8 text-2xl shadow dark:border dark:border-slate-50/10 dark:bg-neutral-700/40 dark:shadow-none"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Add todo..."
        />
      </form>
      {todos.map((todo: { id: string; title: string }) => {
        return <Todo key={todo.id} initialTodo={todo.title} />;
      })}
    </>
  );
}
