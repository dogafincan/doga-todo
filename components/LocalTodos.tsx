import { memo } from "react";
import Todo from "@components/Todo";
import { LocalTodo, SetLocalTodos } from "@utils/types";

const LocalTodos = memo(function LocalTodos({
  localTodos,
  setLocalTodos,
  initialVisit,
}: {
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
}) {
  return (
    <>
      {localTodos.map((localTodo) => {
        return (
          <Todo
            key={localTodo.id}
            todo={localTodo}
            localTodos={localTodos}
            setLocalTodos={setLocalTodos}
            initialVisit={initialVisit}
          />
        );
      })}
    </>
  );
});

export default LocalTodos;
