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

export default function Todos() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setTodos([...todos, todo]);
    setTodo("");
  }

  return (
    <>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          id="todo"
          name="todo"
          className="h-20 rounded-3xl text-2xl py-3.5 px-8 shadow dark:shadow-none"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Add todo..."
        />
      </form>
    </>
  );
}
