import { lazy, memo, useReducer } from "react";
import { useDebouncedCallback } from "use-debounce";
import useSession from "@/utils/useSession";
import useClearCompletedTodos from "@/utils/useClearCompletedTodos";
import localTodosReducer from "@/utils/todosReducer";
import { initialLocalTodos } from "@/utils/initialLocalTodos";

const Todos = lazy(() => import("@/components/Todos"));
const LocalTodos = lazy(() => import("@/components/LocalTodos"));

const TodosContainer = memo(function TodosContainer() {
  const { status } = useSession();
  const { clearCompletedTodos } = useClearCompletedTodos();
  const [localTodos, localTodosDispatch] = useReducer(
    localTodosReducer,
    initialLocalTodos
  );

  // Marking a todo as completed triggers the debounced function below.
  // Debouncing the function allows the user to mark multiple todos as
  // completed in one go without layout shifts.
  const clearCompleted = useDebouncedCallback(() => {
    if (status === "authenticated") {
      clearCompletedTodos.mutate();
    } else if (status === "unauthenticated") {
      localTodosDispatch({ type: "filtered" });
    }
  }, 1000);

  return (
    <section className="min-h-screen-dynamic space-y-4 pb-52">
      {status === "authenticated" ? (
        <Todos clearCompleted={clearCompleted} />
      ) : status === "unauthenticated" ? (
        <LocalTodos
          clearCompleted={clearCompleted}
          localTodos={localTodos}
          localTodosDispatch={localTodosDispatch}
        />
      ) : null}
    </section>
  );
});

export default TodosContainer;
