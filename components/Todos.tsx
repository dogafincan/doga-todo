import { memo, useEffect } from "react";
import useGetTodos from "@utils/useGetTodos";
import Todo from "@components/Todo";
import { LocalTodo, SetIsLoading, SetLocalTodos } from "@utils/types";

const Todos = memo(function Todos({
  setIsLoading,
  localTodos,
  setLocalTodos,
  isLocal,
}: {
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  isLocal: boolean;
}) {
  const { data, isFetched } = useGetTodos();

  useEffect(() => {
    if (isFetched) setIsLoading(false);
  }, [isFetched, setIsLoading]);

  return (
    <>
      {Array.isArray(data) &&
        data?.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              localTodos={localTodos}
              setLocalTodos={setLocalTodos}
              isLocal={isLocal}
            />
          );
        })}
    </>
  );
});

export default Todos;
