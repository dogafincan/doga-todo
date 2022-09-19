import Todo from "./Todo";

const initialTodos = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function Todos() {
  return (
    <div className="flex flex-col space-y-2">
      {initialTodos.map((todo) => (
        // eslint-disable-next-line react/jsx-key
        <Todo todo={todo} />
      ))}
    </div>
  );
}
