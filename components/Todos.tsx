import { memo, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AnimatePresence, m } from "framer-motion";
import Todo from "@components/Todo";
import useSession from "@utils/useSession";
import useGetTodos from "@utils/useGetTodos";
import useClearCompletedTodos from "@utils/useClearCompletedTodos";
import { LocalTodo, SetIsLoading, SetLocalTodos } from "@utils/types";
import AddTodoForm from "@components/AddTodoForm";

const Todos = memo(function Todos({
  isLoading,
  setIsLoading,
  localTodos,
  setLocalTodos,
  initialVisit,
}: {
  isLoading: boolean;
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
}) {
  const { status } = useSession();
  const { clearCompletedTodos } = useClearCompletedTodos();
  const { data, isFetched } = useGetTodos();

  useEffect(() => {
    if (isFetched) setIsLoading(false);
  }, [isFetched, setIsLoading]);

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
    <div className="min-h-screen-dynamic space-y-4">
      <AddTodoForm
        isLoading={isLoading}
        localTodos={localTodos}
        setLocalTodos={setLocalTodos}
        initialVisit={initialVisit}
      />
      <m.ul
        layout
        initial={false}
        transition={{ duration: 0.4 }}
        animate={{
          height: `calc(96px*${
            status === "authenticated" && data ? data.length : localTodos.length
          })`,
        }}
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {status === "authenticated"
            ? data &&
              data?.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    localTodos={localTodos}
                    setLocalTodos={setLocalTodos}
                    initialVisit={initialVisit}
                    clearCompleted={clearCompleted}
                  />
                );
              })
            : status === "unauthenticated" || initialVisit
            ? localTodos.map((localTodo) => {
                return (
                  <Todo
                    key={localTodo.id}
                    todo={localTodo}
                    localTodos={localTodos}
                    setLocalTodos={setLocalTodos}
                    initialVisit={initialVisit}
                    clearCompleted={clearCompleted}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </m.ul>
    </div>
  );
});

export default Todos;
