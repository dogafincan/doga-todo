import { memo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import useGetTodos from "@utils/useGetTodos";
import Todo from "@components/Todo";
import {
  LocalTodo,
  SetIsLoading,
  SetLocalTodos,
  ClearCompleted,
} from "@utils/types";

const Todos = memo(function Todos({
  setIsLoading,
  localTodos,
  setLocalTodos,
  initialVisit,
  clearCompleted,
}: {
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
  clearCompleted: ClearCompleted;
}) {
  const { data, isFetched } = useGetTodos();

  useEffect(() => {
    if (isFetched) setIsLoading(false);
  }, [isFetched, setIsLoading]);

  return (
    <AnimatePresence mode="popLayout">
      {Array.isArray(data) &&
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
        })}
    </AnimatePresence>
  );
});

export default Todos;
