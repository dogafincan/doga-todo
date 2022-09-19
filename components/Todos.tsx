import Todo from "./Todo";

export default function Todos() {
  return (
    <div className="flex flex-col space-y-2">
      <Todo />
      <Todo />
      <Todo />
    </div>
  );
}
