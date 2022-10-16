import { memo, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import useGetTodos from "@utils/useGetTodos";
import Todo from "@components/Todo";
import InvisibleDiv from "@components/InvisibleDiv";
import {
  LocalTodo,
  SetIsLoading,
  SetLocalTodos,
  ClearCompleted,
  SetInvisibleDivs,
} from "@utils/types";

const Todos = memo(function Todos({
  setIsLoading,
  localTodos,
  setLocalTodos,
  initialVisit,
  clearCompleted,
  invisibleDivs,
  setInvisibleDivs,
}: {
  setIsLoading: SetIsLoading;
  localTodos: LocalTodo[];
  setLocalTodos: SetLocalTodos;
  initialVisit: boolean;
  clearCompleted: ClearCompleted;
  invisibleDivs: string[];
  setInvisibleDivs: SetInvisibleDivs;
}) {
  const { data, isFetched } = useGetTodos();
  const [entered, setentered] = useState(false);

  useEffect(() => {
    if (isFetched) setIsLoading(false);
  }, [isFetched, setIsLoading]);

  return (
    <>
      <AnimatePresence>
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
                invisibleDivs={invisibleDivs}
                setInvisibleDivs={setInvisibleDivs}
              />
            );
          })}
      </AnimatePresence>
      <AnimatePresence>
        {invisibleDivs.map((key) => {
          return (
            <InvisibleDiv
              key={key}
              invisibleDivs={invisibleDivs}
              setInvisibleDivs={setInvisibleDivs}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
});

export default Todos;
