import { useEffect } from "react";
import { motion } from "framer-motion";
import useSession from "@utils/useSession";
import useGetTodos from "@utils/useGetTodos";
import Todo from "@components/Todo";
import { LocalTodo, SetLoading, SetLocalTodos } from "@utils/types";

const Todos = ({
  setLoading,
  localTodos,
  setLocalTodos,
}: {
  setLoading: SetLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
}) => {
  const { session } = useSession();
  const { data, isFetched } = useGetTodos();

  useEffect(() => {
    if (isFetched) setLoading(false);
  }, [isFetched, setLoading]);

  return (
    <motion.ul className="space-y-4">
      {session
        ? Array.isArray(data) &&
          data?.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                localTodos={localTodos}
                setLocalTodos={setLocalTodos}
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
              />
            );
          })}
    </motion.ul>
  );
};

export default Todos;
