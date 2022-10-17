import { lazy, memo, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { LayoutGroup, m } from "framer-motion";
import { LocalTodo, SetIsLoading, SetLocalTodos } from "@utils/types";
import useSession from "@utils/useSession";
import useClearCompletedTodos from "@utils/useClearCompletedTodos";

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
  const { clearCompletedTodos } = useClearCompletedTodos();

  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, setIsLoading]);

  const clearCompleted = useDebouncedCallback(() => {
    if (status === "authenticated") {
      clearCompletedTodos.mutate();
    } else if (status === "unauthenticated" || initialVisit) {
      setLocalTodos(localTodos.filter((localTodo) => !localTodo.isCompleted));
    }
  }, 1000);

  return (
    <LayoutGroup>
      <m.ul
        layout
        transition={{ duration: 0.2 }}
        className="min-h-max space-y-4"
      >
        {status === "authenticated" ? (
          <Todos
            setIsLoading={setIsLoading}
            localTodos={localTodos}
            setLocalTodos={setLocalTodos}
            initialVisit={initialVisit}
            clearCompleted={clearCompleted}
          />
        ) : status === "unauthenticated" || initialVisit ? (
          <LocalTodos
            localTodos={localTodos}
            setLocalTodos={setLocalTodos}
            initialVisit={initialVisit}
            clearCompleted={clearCompleted}
          />
        ) : null}
      </m.ul>
    </LayoutGroup>
  );
});

export default TodosContainer;
