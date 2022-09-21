import { useState } from "react";
import Todo from "./Todo";

const initialTodos = [
  "🍅 Tomato",
  "🥒 Cucumber",
  "🧀 Cheese",
  "🥬 Lettuce",
  "🥑 Avocado",
  "🥥 Coconut",
];

let counter = 0;

export default function Todos() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setTodos([todo, ...todos]);
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
      {todos.map((todo, index) => {
        counter++;
        return <Todo key={counter} initialTodo={todo} />;
      })}
    </>
  );
}
