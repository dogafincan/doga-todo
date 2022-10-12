import { memo } from "react";
import Todo from "@components/Todo";
import { LocalTodo, SetLocalTodos } from "@utils/types";

const LocalTodos = memo(function LocalTodos({
  localTodos,
  setLocalTodos,
  isLocal,
}: {
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  isLocal: boolean;
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
            isLocal={isLocal}
          />
        );
      })}
    </>
  );
});

export default LocalTodos;
