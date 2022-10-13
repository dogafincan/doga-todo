import { lazy, memo, useEffect } from "react";
import { m } from "framer-motion";
import { LocalTodo, SetIsLoading, SetLocalTodos } from "@utils/types";
import useSession from "@utils/useSession";

const Todos = lazy(() => import("@components/Todos"));
const LocalTodos = lazy(() => import("@components/LocalTodos"));

const TodosContainer = memo(function TodosContainer({
  setIsLoading,
  localTodos,
  setLocalTodos,
  isLocal,
}: {
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  isLocal: boolean;
}) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, setIsLoading]);

  return (
    <m.ul className="space-y-4">
      {status === "authenticated" ? (
        <Todos
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          isLocal={isLocal}
        />
      ) : status === "unauthenticated" || isLocal ? (
        <LocalTodos
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          isLocal={isLocal}
        />
      ) : null}
    </m.ul>
  );
});

export default TodosContainer;
