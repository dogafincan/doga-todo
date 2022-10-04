import { Dispatch, SetStateAction, useEffect } from "react";
import { motion } from "framer-motion";
import useGetTodos from "@utils/useGetTodos";
import Todo from "@components/Todo";

// const initialTodos = [
//   { id: "1", title: "🍅 Tomato" },
//   { id: "2", title: "🥒 Cucumber" },
//   { id: "3", title: "🧀 Cheese" },
//   { id: "4", title: "🥬 Lettuce" },
//   { id: "5", title: "🥑 Avocado" },
//   { id: "6", title: "🥥 Coconut" },
// ];

const Todos = ({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data, isFetched } = useGetTodos();

  useEffect(() => {
    if (isFetched) setLoading(false);
  }, [isFetched, setLoading]);

  return (
    <motion.ul className="space-y-4">
      {data?.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })}
    </motion.ul>
  );
};

export default Todos;
