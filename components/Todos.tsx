import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import useGetTodos from "@utils/useGetTodos";
import Todo from "@components/Todo";
import {
  LocalTodo,
  SetIsLoading,
  SetLocalTodos,
  SignInStatus,
} from "@utils/types";

const Todos = memo(function Todos({
  setIsLoading,
  localTodos,
  setLocalTodos,
  signInStatus,
}: {
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  signInStatus: SignInStatus;
}) {
  const { data, isFetched } = useGetTodos();

  useEffect(() => {
    if (isFetched) setIsLoading(false);
  }, [isFetched, setIsLoading]);

  return (
    <motion.ul className="space-y-4">
      {signInStatus === "authenticated" &&
        Array.isArray(data) &&
        data?.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              localTodos={localTodos}
              setLocalTodos={setLocalTodos}
              signInStatus={signInStatus}
            />
          );
        })}
      {signInStatus === "unauthenticated" &&
        localTodos.map((localTodo) => {
          return (
            <Todo
              key={localTodo.id}
              todo={localTodo}
              localTodos={localTodos}
              setLocalTodos={setLocalTodos}
              signInStatus={signInStatus}
            />
          );
        })}
    </motion.ul>
  );
});

export default Todos;
