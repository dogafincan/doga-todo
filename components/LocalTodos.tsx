import { memo } from "react";
import Todo from "@components/Todo";
import { LocalTodo, SetLocalTodos } from "@utils/types";

const LocalTodos = memo(function LocalTodos({
  localTodos,
  setLocalTodos,
}: {
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
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
          />
        );
      })}
    </>
  );
});

export default LocalTodos;
