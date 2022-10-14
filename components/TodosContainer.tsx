import { lazy, memo, useEffect } from "react";
import { LocalTodo, SetIsLoading, SetLocalTodos } from "@utils/types";
import useSession from "@utils/useSession";

const Todos = lazy(() => import("@components/Todos"));
const LocalTodos = lazy(() => import("@components/LocalTodos"));

const TodosContainer = memo(function TodosContainer({
  setIsLoading,
  localTodos,
  setLocalTodos,
  initialVisit,
}: {
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
}) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, setIsLoading]);

  return (
    <ul className="space-y-4">
      {status === "authenticated" ? (
        <Todos
          setIsLoading={setIsLoading}
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          initialVisit={initialVisit}
        />
      ) : status === "unauthenticated" || initialVisit ? (
        <LocalTodos
          localTodos={localTodos}
          setLocalTodos={setLocalTodos}
          initialVisit={initialVisit}
        />
      ) : null}
    </ul>
  );
});

export default TodosContainer;
