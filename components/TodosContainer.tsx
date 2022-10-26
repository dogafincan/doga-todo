import { memo, useReducer } from "react";
import { useDebouncedCallback } from "use-debounce";
import Todos from "@/components/Todos";
import LocalTodos from "@/components/LocalTodos";
import useSession from "@/utils/useSession";
import useClearCompletedTodos from "@/utils/useClearCompletedTodos";
import { LocalTodo } from "@/utils/types";
import localTodosReducer from "@/utils/todosReducer";

const TodosContainer = memo(function TodosContainer({
  initialVisit,
  initialLocalTodos,
}: {
  initialVisit: boolean;
  initialLocalTodos: LocalTodo[];
}) {
  const { status } = useSession();
  const { clearCompletedTodos } = useClearCompletedTodos();
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
      {status === "authenticated" ? (
        <Todos initialVisit={initialVisit} clearCompleted={clearCompleted} />
      ) : status === "unauthenticated" || initialVisit ? (
        <LocalTodos
          initialVisit={initialVisit}
          clearCompleted={clearCompleted}
          localTodos={localTodos}
          localTodosDispatch={localTodosDispatch}
        />
      ) : null}
    </section>
  );
});

export default TodosContainer;
