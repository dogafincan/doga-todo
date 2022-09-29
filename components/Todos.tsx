import useGetTodos from "../utils/useGetTodos";
import Todo from "./Todo";

// const initialTodos = [
//   { id: "1", title: "🍅 Tomato" },
//   { id: "2", title: "🥒 Cucumber" },
//   { id: "3", title: "🧀 Cheese" },
//   { id: "4", title: "🥬 Lettuce" },
//   { id: "5", title: "🥑 Avocado" },
//   { id: "6", title: "🥥 Coconut" },
// ];

const Todos = () => {
  const { status, data, error } = useGetTodos();
  if (status === "error") return <div>{`An error has occurred: ${error}`}</div>;
  if (status === "loading") return <div>Loading...</div>;

  return (
    <>
      {data?.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </>
  );
};

export default Todos;
