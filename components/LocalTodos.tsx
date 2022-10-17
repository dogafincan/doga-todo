import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import Todo from "@components/Todo";
import { ClearCompleted, LocalTodo, SetLocalTodos } from "@utils/types";

const LocalTodos = memo(function LocalTodos({
  localTodos,
  setLocalTodos,
  initialVisit,
  clearCompleted,
}: {
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
  clearCompleted: ClearCompleted;
}) {
  return (
    <AnimatePresence mode="popLayout">
      {localTodos.map((localTodo) => {
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
      })}
    </AnimatePresence>
  );
});

export default LocalTodos;
