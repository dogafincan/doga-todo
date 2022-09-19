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
  return (
    <div className="lg:w-2/3 p-20 lg:rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full">
      <div className="flex flex-col space-y-2">
        {initialTodos.map((todo) => (
          // eslint-disable-next-line react/jsx-key
          <Todo todo={todo} />
        ))}
      </div>
    </div>
  );
}
