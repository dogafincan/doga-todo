import { useEffect } from "react";
import { motion } from "framer-motion";
import useGetTodos from "@utils/useGetTodos";
import Todo from "@components/Todo";
import { LocalTodo, SetLoading, SetLocalTodos } from "@utils/types";

const Todos = ({
  setLoading,
  localTodos,
  setLocalTodos,
  isLoggedIn,
}: {
  setLoading: SetLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  isLoggedIn: boolean;
}) => {
  const { data, isFetched } = useGetTodos();

  useEffect(() => {
    if (isFetched) setLoading(false);
  }, [isFetched, setLoading]);

  return (
    <motion.ul className="space-y-4">
      {isLoggedIn
        ? Array.isArray(data) &&
          data?.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                localTodos={localTodos}
                setLocalTodos={setLocalTodos}
                isLoggedIn={isLoggedIn}
              />
            );
          })
        : localTodos.map((localTodo) => {
            return (
              <Todo
                key={localTodo.id}
                todo={localTodo}
                localTodos={localTodos}
                setLocalTodos={setLocalTodos}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
    </motion.ul>
  );
};

export default Todos;
