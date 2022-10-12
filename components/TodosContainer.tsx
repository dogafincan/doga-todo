import { lazy, memo, useEffect } from "react";
import { motion } from "framer-motion";
import { LocalTodo, SetIsLoading, SetLocalTodos } from "@utils/types";
import useSession from "@utils/useSession";

const Todos = lazy(() => import("@components/Todos"));
const LocalTodos = lazy(() => import("@components/LocalTodos"));

const TodosContainer = memo(function TodosContainer({
  setIsLoading,
  localTodos,
  setLocalTodos,
}: {
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
}) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [setIsLoading, status]);

  return (
    <motion.ul className="space-y-4">
      {status === "authenticated" && (
        <Todos
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
        />
      )}
      {status === "unauthenticated" && (
        <LocalTodos localTodos={localTodos} setLocalTodos={setLocalTodos} />
      )}
    </motion.ul>
  );
});

export default TodosContainer;
