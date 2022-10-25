import { memo, useReducer } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AnimatePresence, m } from "framer-motion";
import Todo from "../components/Todo";
import useSession from "../utils/useSession";
import useGetTodos from "../utils/useGetTodos";
import useClearCompletedTodos from "../utils/useClearCompletedTodos";
import { LocalTodo } from "../utils/types";
import AddTodoForm from "../components/AddTodoForm";
import localTodosReducer from "../utils/todosReducer";

const Todos = memo(function Todos({
  initialLocalTodos,
  initialVisit,
}: {
  initialLocalTodos: LocalTodo[];
  initialVisit: boolean;
}) {
  const { status } = useSession();
  const { clearCompletedTodos } = useClearCompletedTodos();
  const { data } = useGetTodos();
  const [localTodos, localTodosDispatch] = useReducer(
    localTodosReducer,
    initialLocalTodos
  );

  const clearCompleted = useDebouncedCallback(() => {
    if (status === "authenticated") {
      clearCompletedTodos.mutate();
    } else if (status === "unauthenticated" || initialVisit) {
      localTodosDispatch({ type: "filtered" });
    }
  }, 1000);

  return (
    <section className="min-h-screen-dynamic space-y-4 pb-52">
      <AddTodoForm
        localTodosDispatch={localTodosDispatch}
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
                    localTodosDispatch={localTodosDispatch}
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
                    localTodosDispatch={localTodosDispatch}
                    initialVisit={initialVisit}
                    clearCompleted={clearCompleted}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </m.ul>
    </section>
  );
});

export default Todos;
